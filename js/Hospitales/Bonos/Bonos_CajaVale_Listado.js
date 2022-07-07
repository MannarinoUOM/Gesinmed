$(document).ready(function () {

    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").datepicker();
    $("#txtFechaInicio").datepicker();

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val(p);
    $("#txtFechaFin").val(d);
});

$("#btnPrint").click(function () {
    if ($("#txtFechaInicio").val().length == 0) { alert("Ingrese fecha desde."); return false; }
    if ($("#txtFechaFin").val().length == 0) { alert("Ingrese fecha hasta."); return false; }
    Ventana("../Impresiones/Bono_ListadoValeCaja.aspx?Desde=" + $('#txtFechaInicio').val() + "&Hasta=" + $('#txtFechaFin').val());
});

function Ventana(url) {
    $.fancybox({
            'autoDimensions': false,
            'href': url,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
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