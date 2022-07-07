var listaPedido = new Array();
var cargar = 0;
var fechaAseguir = "";
var pedido = {};
//var idNutricionAcompañante = 0;

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
if (GET["como"] != "" && GET["como"] != null) {
  var  como = GET["como"];
 // alert(como);
}
if (GET["indiceAseguir"] != "" && GET["indiceAseguir"] != null) {
    var indiceAseguir = GET["indiceAseguir"];
    //  alert(idInternacion);
}

if (GET["fechaAseguir"] != "" && GET["fechaAseguir"] != null) {
    var fechaAseguir = GET["fechaAseguir"];
    //  alert(idInternacion);
}

if (GET["idInternacion"] != "" && GET["idInternacion"] != null) {
    var idInternacion = GET["idInternacion"];
}

if (GET["Aalmuerzo"] != "" && GET["Aalmuerzo"] != null) {
    var Aalmuerzo = GET["Aalmuerzo"];
}

if (GET["Acena"] != "" && GET["Acena"] != null) {
    var Acena = GET["Acena"];
}

if (GET["AIdAlmuerzo"] != "" && GET["AIdAlmuerzo"] != null) {
    var AIdAlmuerzo = GET["AIdAlmuerzo"];
}

if (GET["AidCena"] != "" && GET["AidCena"] != null) {
    var AidCena = GET["AidCena"];
}
////////////////////////////////////////////////////////////////////////COMIDAS
if (GET["cargarAux"] != "" && GET["cargarAux"] != null) {
    var cargarAux = GET["cargarAux"];
}
if (GET["cargar"] != "" && GET["cargar"] != null) {
    cargar = GET["cargar"];
}
if (GET["idNutricionAcompañante"] != "" && GET["idNutricionAcompañante"] != null) {
     idNutricionAcompañante = GET["idNutricionAcompañante"];
//    alert(idNutricionAcompañante);
}
cargarCombos();

function cargarCombos() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/cargarComboMenus",
        contentType: "application/json; charset=utf-8",
        complete:cargarListaYcombos,
        success: exito,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function exito(resultado) {
    var M = resultado.d;

    $.each(M, function (index, res) {
        var D = {};
        D.id = res.id;
        D.apodo = res.apodo;
        D.descripcion = res.descripcion;
        //lista.push(D);
        if (res.id != 30)
            $("#cboAlmuerzo").append(new Option(res.apodo, res.id));

        if (res.id != 29)
        $("#cboCena").append(new Option(res.apodo, res.id));
    });

    $("#cboAlmuerzo").append(new Option("Seleccione", 0));
    $("#cboAlmuerzo").val(0);
    //$("#txtTipificacion").val("");
    $("#cboCena").append(new Option("Seleccione", 0));
    $("#cboCena").val(0);
}


$("#btnAgregar").click(function () {

    if ($("#cboAlmuerzo").val() == 0)
    { alert("Seleccione un Almuerzo"); return; }


    if ($("#cboCena").val() == 0)
    { alert("Seleccione una Cena"); return; }


    pedido.almuerzo = $('#cboAlmuerzo :selected').html();
    pedido.almuerzoId = $('#cboAlmuerzo :selected').val();

    pedido.cena = $('#cboCena :selected').html();
    pedido.cenaId = $('#cboCena :selected').val();

    if (listaPedido.length > 0) {
        listaPedido.pop(pedido);
        listaPedido.push(pedido);
    } else {
        listaPedido.push(pedido);
    }

    cargarLista(listaPedido);

});


function cargarLista(list) {

    $("#Resultado").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width:440px; overflow:scroll:auto; text-align:left'>CÓDIGO ALMUERZO</th><th style='width:440px; overflow:scroll:auto; text-align:left'>CÓDIGO CENA</th></tr>";
    var Contenido = "";
    $.each(list, function (index, p) {
        

            Contenido = Contenido + "<tr><td style='cursor:auto ; width: 440px; text-transform: uppercase;'>" + p.almuerzo + " </td><td style='cursor:auto; width: 440px;'> " + p.cena + " </td></td>";
  
    });
    var Pie = "</tbody></table>";
    $("#Resultado").html(Encabezado + Contenido + Pie);

}

$("#btnGuardar").click(function () {
    if (listaPedido.length <= 0) {
        alert("Cargue Algún Pedido");
        return false;
    } else {

        pedido.almuerzo = $('#cboAlmuerzo :selected').html();
        pedido.almuerzoId = $('#cboAlmuerzo :selected').val();

        pedido.cena = $('#cboCena :selected').html();
        pedido.cenaId = $('#cboCena :selected').val();


        //alert(idNutricionAcompañante + " / " + idInternacion + " / " + fechaAseguir + " / " + pedido.almuerzo + " / " +
        //        pedido.almuerzoId + " / " + pedido.cena + " / " +
        //        pedido.cenaId);
        //idNutricionAcompañante = 0;
       // alert(idNutricionAcompañante);
        var json = JSON.stringify({
            "id": idNutricionAcompañante,
            "idInternacion": idInternacion,
            "fechaCarga": fechaAseguir,
            "idAlmuerzo": pedido.almuerzoId,
            "codAlmuerzo": pedido.almuerzo,
            "tipificacionAlmuerzo": "",
            "idCena": pedido.cenaId,
            "codCena": pedido.cena,
            "tipificacionCena": ""
        });
        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/InternacionNutricionGuardarComidasAcompañante",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                //cargar = 1;
               
                var r = resultado.d;
                idNutricionAcompañante = r;
                //alert(idNutricionAcompañante);
            },
            error: errores
        });
        //alert(cargarAux);
        document.location = "../AtInternados/Nutricion.aspx?AIdalmuerzo=" + $('#cboAlmuerzo :selected').val() + "&Aalmuerzo=" + $('#cboCena :selected').html() + "&AIdcena=" + $('#cboCena :selected').val() + "&Acena=" + $('#cboCena :selected').html() + "&como=" + como + "&indiceAseguir=" + indiceAseguir + "&check=" + 1 + "&fecha=" + fechaAseguir + "&mostrarBoton=" + 1 + "&idInternacion=" + idInternacion + "&cargarAux=" + cargarAux + "&idNutricionAcompañante=" + idNutricionAcompañante;
    }
});

$("#btnCancelar").click(function () {
    //alert(cargarAux);
    document.location = "../AtInternados/Nutricion.aspx?AIdalmuerzo=" + $('#cboAlmuerzo :selected').val() + "&Aalmuerzo=" + $('#cboCena :selected').html() + "&AIdcena=" + $('#cboCena :selected').val() + "&Acena=" + $('#cboCena :selected').html() + "&como=" + como + "&indiceAseguir=" + indiceAseguir + "&check=" + 1 + "&fecha=" + fechaAseguir + "&mostrarBoton=" + 1 + "&idInternacion=" + idInternacion + "&cargarAux=" + cargarAux + "&idNutricionAcompañante=" + idNutricionAcompañante;
});

function cargarListaYcombos() {
    $("#Resultado").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><th style='width:257px;'>CÓDIGO ALMUERZO</th><th style='width:207px;'>CÓDIGO CENA</th></tr></thead><tbody>";
    var Contenido = "";
    
    if (cargar == 1) {
        Contenido = Contenido + "<tr><td style='cursor:auto ; width: 257px; text-transform: uppercase;'>" + Aalmuerzo + " </td><td style='cursor:auto; width: 123px; text-transform: uppercase;'> " + Acena + " </td>";
        $("#cboAlmuerzo").val(AIdAlmuerzo);
        $("#cboCena").val(AidCena);
    } else {Contenido = "";}

    var Pie = "</tbody></table>";
    $("#Resultado").html(Encabezado + Contenido + Pie);
    cargar = 0;
}
