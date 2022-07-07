var tipo = 1;
var filtro = 1;

$(document).ready(function () {
    parent.document.getElementById("DondeEstoy").innerHTML = "Turnos > <strong>Informes de Producción </strong>";
    $("#titulo").html("Infromes de Producción");
});

$("#rdoTurnos").click(function () {
    $("#rdoTurnos").attr('checked', true);
    $("#rdoHc").attr('checked', false);
    $("#rdoIcd10").attr('checked', false);
    $("#cboAgruparPeriodo").attr('disabled', false);
    $("#cboAgruparPeriodo").attr('checked', false);
    $("#cboAgruparMedico").attr('disabled', true);
    $("#cboAgruparMedico").attr('checked', false);
    $("#cboInformeDia").attr('disabled', false);
    $("#cboInformeDia").attr('checked', true);
    tipo = 1;
});

$("#rdoIcd10").click(function () {
    $("#rdoIcd10").attr('checked', true);
    $("#rdoHc").attr('checked', false);
    $("#rdoTurnos").attr('checked', false);
    $("#cboAgruparPeriodo").attr('disabled', true);
    $("#cboAgruparPeriodo").attr('checked', false);
    $("#cboAgruparMedico").attr('disabled', false);
    $("#cboAgruparMedico").attr('checked', true);
    $("#cboInformeDia").attr('disabled', true);
    $("#cboInformeDia").attr('checked', false);
    tipo = 3;
});

$("#rdoHc").click(function () {
    $("#rdoHc").attr('checked', true);
    $("#rdoTurnos").attr('checked', false);
    $("#rdoIcd10").attr('checked', false);
    $("#cboAgruparPeriodo").attr('disabled', false);
    $("#cboAgruparPeriodo").attr('checked', false);
    $("#cboAgruparMedico").attr('disabled', true);
    $("#cboAgruparMedico").attr('checked', false);
    $("#cboInformeDia").attr('disabled', false);
    $("#cboInformeDia").attr('checked', true);
    tipo= 2;
});

$("#cboInformeDia").click(function () {
    $("#cboInformeDia").attr('checked', true);
    $("#cboAgruparMedico").attr('checked', false);
    $("#cboAgruparPeriodo").attr('checked', false);
    filtro = 1;
});

$("#cboAgruparMedico").click(function () {
    $("#cboAgruparMedico").attr('checked', true);
    $("#cboInformeDia").attr('checked', false);
    $("#cboAgruparPeriodo").attr('checked', false);
    filtro = 2;
});

$("#cboAgruparPeriodo").click(function () {
    $("#cboAgruparPeriodo").attr('checked', true);
    $("#cboInformeDia").attr('checked', false);
    $("#cboAgruparMedico").attr('checked', false);
    filtro = 3;
});

$("#txtDesde").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    maxDate: '0m',
    onClose: function (selectedDate) {

        // $("#txtHasta").datepicker("option", "minDate", selectedDate);
        // $("#txtHasta").datepicker("option", "maxDate", selectedDate.Year);
           $("#txtHasta").datepicker("option", "minDate", selectedDate);
    }
});

$("#txtHasta").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    maxDate: '0m',
    onClose: function (selectedDate) {
        $("#txtDesde").datepicker("option", "maxDate", selectedDate);
        /////////////////////////////////////////////////////////////////////
    }
});

$("#txtHasta").keydown(function () {
    return false;
});
$("#txtDesde").keydown(function () {
    return false;
});


$("#btnBuscar").click(function () {
    //    alert(tipo + "/" + filtro);
    if ($("#txtDesde").val() == "")
    { alert("Ingrese fecha Desde"); return; }

    if ($("#txtHasta").val() == "")
    { alert("Ingrese fecha Hasta"); return; }

    switch (tipo) {
        case 1:
            if (filtro == 1) {

                $.fancybox({
                    'autoDimensions': false,
                    'href': "../Impresiones/Listado_Informe_De_Produccion_X_Dia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                    'width': '75%',
                    'height': '75%',
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
            else {

                $.fancybox({
                    'autoDimensions': false,
                    'href': "../Impresiones/Listado_Informe_De_Produccion.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                    'width': '75%',
                    'height': '75%',
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
            break;

        case 2:
            if (filtro == 1) {

                $.fancybox({
                    'autoDimensions': false,
                    'href': "../Impresiones/Listados_Usuarios_Apertura_HC_X_Dia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                    'width': '75%',
                    'height': '75%',
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
            else {

                $.fancybox({
                    'autoDimensions': false,
                    'href': "../Impresiones/Listados_Usuarios_Apertura_HC.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                    'width': '75%',
                    'height': '75%',
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
            break;

        case 3:
            if (filtro == 1) {

                $.fancybox({
                    'autoDimensions': false,
                    'href': "../Impresiones/Listados_Informes_De_Produccion_Ranking_ICD10_Ambulatorio_X_Medico.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                    'width': '75%',
                    'height': '75%',
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
            } else {

                $.fancybox({
                    'autoDimensions': false,
                    'href': "../Impresiones/Listados_Informes_De_Produccion_Ranking_ICD10_Ambulatorio_X_Medico.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                    'width': '75%',
                    'height': '75%',
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
            break;
    }

});
 