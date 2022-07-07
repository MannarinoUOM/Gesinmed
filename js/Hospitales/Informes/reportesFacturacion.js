var GET = {};
var titulo = "";
var tipo = "";

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    GET[decode(arguments[1])] = decode(arguments[2]);
});

$(document).ready(function () {
    if (GET["titulo"] != "" && GET["titulo"] != null) {
        titulo = GET["titulo"];
        $("#titulo").html(titulo.replace(/_/g, " "));
    }

    if (GET["tipo"] != "" && GET["tipo"] != null) {
        tipo = parseInt(GET["tipo"]);
    }

    //prepara filtros segùn informe
    switch (tipo) {
        case 1:
            $("#group1").hide();
            $("#group2").hide();
            $("#group3").hide();

            //            $("#lbl1").html("Insumo");
            //            $("#lbl2").html("Porcentaje");
            //            $("#lbl3").html("Patología");

            //cargarCombo("cbo3", "../Json/reportesCompras.asmx/ReportesComprasTraerPatologias", 1, "");
            //cargarCombo("cbo1", "../Json/reportesCompras.asmx/ReportesComprasTraerInsumos", 1, "");
            break;

        case 2:
            $("#group1").show();
            $("#group2").hide();
            $("#group3").hide();
            $("#btnEXECL").hide();

            $("#span_btnPDF").html("&nbsp;Generar Excel");

            $("#lbl1").html("Seccional");
            cargarCombo("cbo1", "../Json/DarTurnos.asmx/List_Seccionales", 2, "");

            break;
    }
});  // fin ready

$(".buscar").click(function () {
    var comprobar = [];
    var PDF = "";

    $(".fechaMask").each(function () {
        if ($(this).val() == "") { comprobar.push(1); }
    });
    if (comprobar.length >= 1) { alert("Ingrese un rango de fechas."); return false; }

    switch ($(this).attr('id')) {
        case "btnEXECL":
            PDF = 0;
            break;

        case "btnPDF":
            PDF = 1;
            break;
    }


    switch (tipo) {
        case 1:
            imprimir("../Impresiones/ReportesFacturacion/FACT_INFORMES_CANTIDAD_PAC_ATENDIDOS_SEC_ESP.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, 0);
            break;

        case 2:
            GenerarExcel();
            //imprimir("../Impresiones/ReportesFacturacion/FACT_INFORMES_FACTURACION_AMBULATORIA_SECCIONAL.aspx?Desde=" + $("#txtDesde").val() + "&Hasta=" + $("#txtHasta").val() + "&Seccional=" + $("#cbo1 :selected").val() + "&PDF=" + PDF, 0);
            break;
    }
});

function GenerarExcel() {
    var json = JSON.stringify({ "Seccional": $("#cbo1 :selected").val(), "Desde": $("#txtDesde").val(), "Hasta": $("#txtHasta").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/FACT_REPORTES_RENDICION_SEC_FECHA",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#descargar_archivo").hide();
            $("#btnPDF").hide();
        },
        success: function (Resultado) {
            alert("Archivo generado");
            $("#descargar_archivo").show();
            $("#btnPDF").show();
        }
    });
}

$("#descargar_archivo").click(function (e) {
    e.stopPropagation();
});

$("#btnVolver").click(function () {
    document.location = "../Informes/ReportesDeFacturacion.aspx";
});