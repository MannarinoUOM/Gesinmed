$(document).ready(function () {
    var parts = FechaActual().split('/');
    $("#txtAño").val(parts[2]);
    $("#txtMes").val(parts[1]);
});

$("#btnBuscar").click(function () {
    var Periodo = "01/" + $("#txtMes :selected").val() + "/" + $("#txtAño").val();
    if ($("#rdDetallado").is(":checked"))
        var url = "../Impresiones/ImpresionLiquidacionDetallado_Medicos.aspx?Periodo=" + Periodo;
    if ($("#rdDetallado_Ambu_Int").is(":checked"))
        var url = "../Impresiones/ImpresionLiquidacionAmbu_Inter_Medicos.aspx?Periodo=" + Periodo;
    if ($("#rdConsolidado").is(":checked"))
        var url = "../Impresiones/LiquidacionConsolidado_Medicos.aspx?Periodo=" + Periodo;
    Ventana(url);
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