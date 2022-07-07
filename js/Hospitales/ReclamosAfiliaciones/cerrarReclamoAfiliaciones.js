var id = 0;
var ruta = "";
var servId = 0;
var estado = 0;

$(document).ready(function () {
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["id"] != "" && GET["id"] != null) {
        id = GET["id"];
        traer(GET["id"]);
    }

});



function traer(idReclamo) {

    var obj = {};
    obj.afiliado = "";
    obj.nhc = "";
    obj.dni = "";
    obj.fechaReclamo = "";
    obj.fechaResolucion = "";
    obj.estado = 0;
    obj.reclamoId = idReclamo;
    obj.unoTdos = 1;

    var json = JSON.stringify({ "obj": obj });
    $.ajax({
        type: "POST",
        url: "../Json/reclamoAfiliacion.asmx/ReclamoAfiliacionBuscar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (resultado) {
            var lista = resultado.d;
            if (lista.length == 0) { alert("No se encontraron resultados"); } else { cargarDatos(lista); }
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function cargarDatos(lista) {
    $("#txtTitulo").val(lista[0].titulo);
    $("#txtServicio").val(lista[0].servDescripcion);
    servId = lista[0].servId;
    $("#txtReclamo").val(lista[0].reclamoDescripcion);
    $("#txtSoluccion").val(lista[0].resolucion);
    //$("#adjunto").attr("src", "../ErroresAfiliaciones/" + lista[0].adjunto);
    //ruta = lista[0].adjunto;
    ruta = "../ErroresAfiliaciones/" + lista[0].adjunto;
    $("#afiliadoID").val(lista[0].afiliadoId);
    estado = lista[0].estado;
    $("#nReclamo").val(lista[0].reclamoId);
    if (estado == 1) {
        $("#txtSoluccion").attr('disabled', true);
        $("#btnCerrarReclamo").hide();
        $("#btnGuardar").hide();
    }
}

$("#btnVerAdjunto").click(function () {
    $.fancybox({
        'href': "../Reclamos/reclamoVerAdjunto.aspx?ruta=" + ruta,
        'width': '80%',
        'height': '80%',
        'autoScale': false,
        'transitionIn': 'elastic',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'preload': true,
        'onComplete': function f() {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function () {
                jQuery.fancybox.hideActivity();
            });
        }
    });
});

$("#btnGuardar").click(function () {
    if ($("#txtSoluccion").val().trim().length <= 0) { alert("Ingrese la evolución del reclamo."); return false; }
    //if ($("#txtSoluccion").val().trim().length > 0) { estado = 1; }
    var json = JSON.stringify({ "IdReclamo": id, "titulo": $("#txtTitulo").val(), "servicio": servId, "telefono": 0, "reclamo": $("#txtSoluccion").val(), "afiliadoID": $("#afiliadoID").val(), "estado": estado });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/reclamoAfiliacion.asmx/InsertarErrorAfiliacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == -1) { alert("Ocurrio un error al guardar el reclamo."); } else { id = Resultado.d; alert("Reclamo guardado."); }
        },
        error: errores
    });
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnImprmir").click(function () {
    //$("#ReclamoId").val(Resultado.d);
    //$(document).location('../Impresiones/reclamos/reclamoImpresion.aspx?id=' + id + '&estado=' + 0);
    $.fancybox({
        'href': '../Impresiones/reclamosAfiliaciones/reclamoAfiliacionImpresion.aspx?id=' + id + '&estado=' + estado,
        'width': '80%',
        'height': '80%',
        'autoScale': false,
        'transitionIn': 'elastic',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'preload': true,
        'onComplete': function f() {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function () {
                jQuery.fancybox.hideActivity();
            });
        }
    });
});

$("#btnCerrarReclamo").click(function () {
    if ($("#txtSoluccion").val().trim().length <= 0) { alert("Ingrese la evolución del reclamo."); return false; }


    var r = confirm("ATENCION!!! una vez cerrado el reclamo no se podrá editar más! desea cerrarlo de todas maneras?")

    if (r) {
        var json = JSON.stringify({ "IdReclamo": id, "soluccion": $("#txtSoluccion").val() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/reclamoAfiliacion.asmx/ReclamoAfiliacionCerrar",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d == -1) { alert("Ocurrio un error al cerrar el reclamo."); } else {
                    alert("Reclamo cerrardo.");
                    $("#txtSoluccion").attr('disabled', true);
                    $("#btnCerrarReclamo").hide();
                    $("#btnGuardar").hide();
                    estado = 1;
                }
            },
            error: errores
        });
    }
});