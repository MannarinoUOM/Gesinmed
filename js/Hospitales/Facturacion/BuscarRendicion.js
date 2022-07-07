$(document).ready(function () {
    List_Seccionales();
    List_ObraSociales(true);
    List_Centro();
    var parts = FechaActual().split('/');
    $("#txtAnioDesde").val(parts[2]);
    $("#txtAnioHasta").val(parts[2]);
    $("#txtMesHasta").val(parts[1]);
    $("#txtRendicion").mask("9?9999999999", { placeholder: "-" });
});

function List_Seccionales() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Seccionales_Cargado,
        error: errores
    });
}

function List_Seccionales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Seccional) {
        $("#cbo_Seccional").append($("<option></option>").val(Seccional.Nro).html(Seccional.Seccional));
    });

}

function List_ObraSociales(Todas) {
    var json = JSON.stringify({ "Todas": Todas });
    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/ListObraSociales",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_ObraSociales_Cargado,
        error: errores
    });
}

function List_ObraSociales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Institucion").append($("<option></option>").val(0).html(""));
    $.each(Lista, function (index, Obra) {
        $("#cbo_Institucion").append($("<option></option>").val(Obra.id).html(Obra.OS));
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_Centro() {
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/Centro.asmx/CentroUnico",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Centro_Cargado,
        error: errores
    });
}


function List_Centro_Cargado(Resultado) {
    var Centro = Resultado.d;
    $("#cbo_Centro").append($("<option></option>").val(Centro.Id).html(Centro.RazonSocial));
}



function List_Rendiciones() {

var Ambulatorio = false;
if ($("#rdAmbulatorio").is(":checked")) Ambulatorio = true;

var Internacion = false;
if ($("#rdInternacion").is(":checked")) Internacion = true;

var FechaDesde = "01/" + $("#txtMesDesde :selected").val() + "/" + $("#txtAnioDesde").val();
var FechaHasta = "01/" + $("#txtMesHasta :selected").val() + "/" + $("#txtAnioHasta").val();

var json = JSON.stringify({ "NroRendicion": $("#txtRendicion").val(), "SeccionalId": $("#cbo_Seccional :selected").val(), "Institucion": $("#cbo_Institucion :selected").val(),
"Ambulatorio":Ambulatorio , "Internacion":Internacion, "FechaDesde": FechaDesde,"FechaHasta": FechaHasta});
    $.ajax({
        type: "POST",
        data : json,
        url: "../Json/Facturacion/Facturacion.asmx/List_Rendiciones",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Rendiciones_Cargado,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaPartes_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaPartes_div").show();
        }
    });
}

function List_Rendiciones_Cargado(Resultado) {
    var Lista = Resultado.d;
    //var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Fec.Practica</th><th>Fec.Rendicion</th><th>Cantidad</th><th>Tipo</th><th>Codigo</th><th>Practica</th></tr></thead><tbody>";
    if (Lista != null) {
        var Contenido = "";
        var i = 0;
        $("#trx").empty();
        var size = Lista.length;
        $.each(Lista, function (index, Detalle) {
            //alert(Contenido);
            Contenido = Contenido + "<tr onclick=VerDetalles('"+Detalle.NroRendicion+"');><td></td><td> " + Detalle.NroRendicion + " </td><td> " + Detalle.FechaFacturacion + " </td><td> " + Detalle.Año + " </td><td> " + Detalle.Mes + " </td><td> " + Detalle.Seccional + " </td></tr>";
            //alert(Contenido);
            i = i + 1;
        });
        $("#trx").html(Contenido);
    }
    var Pie = "</tbody></table>";
}

$("#btnBuscar").click(function () {
    List_Rendiciones();
});

function VerDetalles(Nro) {
    var Ambulatorio = $("#rdAmbulatorio").is(":checked");
    window.location = "Facturacion.aspx?Rendicion="+Nro+"&Ambu="+Ambulatorio;
}