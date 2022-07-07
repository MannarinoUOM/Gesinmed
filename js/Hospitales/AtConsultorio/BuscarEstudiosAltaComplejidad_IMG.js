var NHC = 0;
var UOMID = 0;
var MedicoId = 0;

$(document).ready(function () {
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
    }

    if (GET["UOMID"] != "" && GET["UOMID"] != null) {
        UOMID = GET["UOMID"];
        $("#txtNHC").val(UOMID);
        $("#btnBuscar").click();
    }

    if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
        MedicoId = GET["MedicoId"];
    }

    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });

    $("#txtFechaInicio").datepicker();
    $("#txtFechaFin").datepicker();

});

$(".fecha").keydown(function (e) { return false; });

$("#btnBuscar").click(function () {
    BuscarOrdesnesdeEstudios();
});

//$("#btnVolver").click(function () {
//    self.location = "EstudiosAltaComplejidad.aspx?ID=" + NHC + "&MedicoId=" + MedicoId;
//});

function BuscarOrdesnesdeEstudios() {

 if ($("#txtFechaInicio").val().trim().length <= 0) { alert("Ingrese fehca de desde."); return false; }
 if ($("#txtFechaFin").val().trim().length <= 0) { alert("Ingrese fehca de hasta."); return false; }

    var json = JSON.stringify({
        "nhc": $("#txtNHC").val(),
        "Afiliado": $("#txtAfiliado").val().trim(),
        "fechainicio": $("#txtFechaInicio").val(),
        "fechafinal": $("#txtFechaFin").val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/Imagenes/altaComplejidadIMG.asmx/BuscarOrdesnesdeEstudios_AltaComplejidad_IMG",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: BuscarOrdesnesdeEstudios_Cargado,
        error: errores
    });
}

function BuscarOrdesnesdeEstudios_Cargado(Resultado) {
    var Busquedas = Resultado.d;
    var PError = false;
    var Datos = "";
    $.each(Busquedas, function (index, busqueda) {
        //  Datos = Datos + " onclick='imprimir(" + busqueda.NHC + "," + busqueda.protocolo + "," + busqueda.medicoid + ");' >";
        Datos = Datos + "<tr ";
        Datos = Datos + " onclick='imprimir(" + busqueda.protocolo + ");' >";
        Datos = Datos + "<td>" + busqueda.fechaingreso + "</td>";
        Datos = Datos + "<td>" + busqueda.HC_UOM + "</td>";
        Datos = Datos + "<td>" + busqueda.paciente + "</td>";
        Datos = Datos + "<td>" + busqueda.medico + "</td>";
        Datos = Datos + "<td id='"+ busqueda.protocolo +"'>" + busqueda.medicoid + "</td></tr>";
    });
    
    $('#TablaResultado').html(Datos);
}

function Cargar_Paciente_NHC(NHC, Protocolo, MedicoId) {
    self.location = "EstudiosAltaComplejidad.aspx?MedicoId=" + MedicoId + "&NHC=" + NHC + "&EstId=" + Protocolo;
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function imprimir(proto) {
    $.fancybox({
        'href': "../Impresiones/altaComplejidadIMG/EstudioAltaComplejidad_IMG.aspx?Id=" + proto + "&IntId=" + 0 + "&medicoId=" + $("#" + proto).html(),
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
}