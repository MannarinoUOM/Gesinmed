$(document).ready(function () {
    List_Seccionales();
    List_ObraSociales(true);

    $("#txtDesde").datepicker();
    $("#txtHasta").datepicker();
    $("#txtDesde").val(FechaActual());
    $("#txtHasta").val(FechaActual());
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
    alert('Error: ' + msg.responseText);
}

$("#btnBuscar").click(function () {
    if (($("#cbo_Seccional :selected").val() != "0") || ($("#cbo_Institucion :selected").val() != "0")) {
    var Practica = false;
    if ($("#rdPracticas").is(":checked")) Practica = true;
    var json = JSON.stringify({ "Seccional": $("#cbo_Seccional :selected").val(), "Institucion": $("#cbo_Institucion :selected").val()
    , "Practica": Practica,"FechaDesde": $("#txtDesde").val(), "FechaHasta": $("#txtHasta").val()});
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_PracticasFaltantes",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_PracticasFaltantes_Cargado,
        error: errores
    });
    }
    else alert("Elija Una Seccional o Una Institución");
});

function List_PracticasFaltantes_Cargado(Resultado) {

        var Lista = Resultado.d;
        if (Lista != null) {
            var Contenido = "";
            var i = 0;
            $("#trx").empty();
            var size = Lista.length;
            $.each(Lista, function (index, Detalle) {
                Contenido = Contenido + "<tr><th></th><td> " + Detalle.NroParte + " </td><td> " + Detalle.Fecha + " </td><td> " + Detalle.NHC + " </td><td> " + Detalle.Afiliado + " </td><td> " + Detalle.Codigo + " </td><td> " + Detalle.Practica + " </td></tr>";
                i = i + 1;
                if (i == size) {
                    $("#tabla").show();
                    $("#cargando").hide();
                }
            });
            $("#trx").html(Contenido);
        }
        else {
            $("#tabla").show();
            $("#cargando").hide();
            $("#trx").html("<tr>Sin Datos</tr>");
        }
        var Pie = "</tbody></table>";

}

$("#btnPrint").click(function () {
if (($("#cbo_Seccional :selected").val() != "0") || ($("#cbo_Institucion :selected").val() != "0")) {
    var Practica = false; var Seccional = "";
    if ($("#rdPracticas").is(":checked")) Practica = true;
    if ($("#cbo_Seccional :selected").val() != "0") Seccional = $("#cbo_Seccional :selected").text();
    if ($("#cbo_Institucion :selected").val() != "0") Seccional = $("#cbo_Institucion :selected").text();
    var url = "../Impresiones/ImpresionPracMod_SinConvenio.aspx?SeccionalId=" + $("#cbo_Seccional :selected").val() + "&InstitucionId="
    + $("#cbo_Institucion :selected").val() + "&Practica=" + Practica + "&Desde=" + $("#txtDesde").val() + "&Hasta=" + $("#txtHasta").val() + "&Seccional=" + Seccional;
    Ventana(url);
}
else alert("Elija Una Seccional o Una Institución");
});

function Ventana(url) {

    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
}