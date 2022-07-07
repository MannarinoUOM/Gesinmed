

$(document).ready(function () {
    $("#txtDesde").val(FechaActual());
    $("#txtHasta").val(FechaActual());
    $("#txtDesde").mask("99/99/9999", { placeholder: "-" });
    $("#txtHasta").mask("99/99/9999", { placeholder: "-" });
    $("#txtDesde").datepicker();
    $("#txtHasta").datepicker();
});

function Validar() {
    if ($("#txtDesde").val().trim().length == 0) { alert("Ingrese fecha desde."); return false; }
    if ($("#txtHasta").val().trim().length == 0) { alert("Ingrese fecha hasta."); return false; }
    return true;
}

$("#btnImprimir").click(function () {
    if (!Validar()) return false;
    Imprimir();
});

function Imprimir() {
        $.fancybox({
            'autoDimensions': false,
            'href': '../Impresiones/Impresiones_Guardia_Consumo.aspx?Desde=' + $("#txtDesde").val() + "&Hasta=" + $("#txtHasta").val(),
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