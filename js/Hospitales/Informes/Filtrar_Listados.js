var GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    GET[decode(arguments[1])] = decode(arguments[2]);
});

if (GET["informe"] != "" && GET["informe"] != null) {
   var informe = GET["informe"];
}

switch (informe) {
    case "admision":
        parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Informes</strong>";
        $("#titulo").html("Informes Admisión");

        $('#CbotipoListado').append('<option value="1">Informe Fallecidos</option>');
        $('#CbotipoListado').append('<option value="0">Egresos Mensuales</option>');
        $('#CbotipoListado').append('<option value="13">Egresos Diarios</option>');
        $('#CbotipoListado').append('<option value="2">Egresos Por Servicio</option>');
        $('#CbotipoListado').append('<option value="3">Ingresos Mensuales</option>');
        $('#CbotipoListado').append('<option value="11">Ingresos Por Día</option>');
        $('#CbotipoListado').append('<option value="15">Egresos Por Seccional Institución</option>');
        $('#CbotipoListado').append('<option value="16">Egresos Por Seccional Institución Por Mes</option>');
        break;
    case "guardia":

        parent.document.getElementById("DondeEstoy").innerHTML = "Guardia > <strong>Informes</strong>";
        $("#titulo").html("Informes Guardia");

        $('#CbotipoListado').append('<option value="4">Pacientes Guardia Por Especialidad</option>');
        $('#CbotipoListado').append('<option value="17">Cantidad De Pacientes De Guardia</option>');
        $('#CbotipoListado').append('<option value="18">Cantidad De Consultas De Guardia Por Medicos</option>');
        $('#CbotipoListado').append('<option value="19">Cantidad De Consultas De Guardia Por Secconal y Obra Social</option>');
        $('#CbotipoListado').append('<option value="20">Cantidad De Pacientes Por Guardia</option>');

        break;

    case "quirofano":
        parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > <strong>Informes</strong>";
        $("#titulo").html("Informes Quirófano");

        $('#CbotipoListado').append('<option value="8">Cirugias Realizadas por Seccional</option>');
        $('#CbotipoListado').append('<option value="9">Cirugias Realizadas por Especialidad</option>');
        break;

    case "consultorio":
        parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Informes</strong>";
        $("#titulo").html("Informes Consultorio");

        $('#CbotipoListado').append('<option value="6">Pacientes Atendidos</option>');
        $('#CbotipoListado').append('<option value="7">Porcentaje Ocupacional</option>');
        $('#CbotipoListado').append('<option value="10">Distribución de Consultas Médicas Externas</option>');
        break;
}



$("#txtDesde").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
     maxDate: '0m',
    onClose: function (selectedDate) {
        $("#txtHasta").datepicker("option", "minDate", selectedDate);
//        $("#txtHasta").datepicker("option", "changeMonth", false);
//        $("#txtHasta").datepicker("option", "changeYear", false);
//    changeMonth: false,
//    changeYear: false
        }
});

$("#txtHasta").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    maxDate: '0m',
  //  showButtonPanel: true,
//    showAnim: "",
//    DisplayMode: 'yy' ,
    onClose: function (selectedDate) {
        $("#txtDesde").datepicker("option", "maxDate", selectedDate);
       // $("#txtDesde").datepicker("option", "changeMonth", false);
//     changeMonth: false,
//    changeYear: false
        }

});


$("#txtHasta").keydown(function () {
    return false;
});
$("#txtDesde").keydown(function () {
    return false;
});

$("#btnListar").click(function () {
    if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") {
        alert("Ingrese un Rango de Fecha");
        return;
    }

    var filto = $("#CbotipoListado").val();

    switch (filto) {
        case "0":
            $.fancybox({
                'href': "../Impresiones/Listado_Egresos_Mensuales.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;
        case "1":
            $.fancybox({
                'href': "../Impresiones/Listado_Informe_Fallecidos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;
        case "2":
            $.fancybox({
                'href': "../Impresiones/Listado_Egresos_Por_Servicio.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "3":
            $.fancybox({
                'href': "../Impresiones/Listados_Ingresos_Por_Mes.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "4":
            $.fancybox({
                'href': "../Impresiones/Listados_Pacientes_Guardia_X_Especilidad.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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

            break;

        case "6":
            $.fancybox({
                'href': "../Impresiones/Listados_Pacientes_Atendidos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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

            break;

        case "7":
            $.fancybox({
                'href': "../Impresiones/Listados_Informes_Porcentaje_Ocupacional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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

            break;

        case "8":
            $.fancybox({
                'href': "../Impresiones/Listados_Quirofano_Cirugias_Realizadas_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "9":
            $.fancybox({
                'href': "../Impresiones/Listados_Quirofano_Cirugias_Realizadas_Especialidad.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "10":
            $.fancybox({
                'href': "../Impresiones/Listados_Distribucion_De_Consultas_Medicas_Externas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "11":
            $.fancybox({
                'href': "../Impresiones/Listados_Ingresos_Por_Dia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "12":
            $.fancybox({
                'href': "../Impresiones/Listados_Informes_Porcentaje_Ocupacional_Agrupado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "13":
            $.fancybox({
                'href': "../Impresiones/Listado_Egresos_Diarios.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "14":
            $.fancybox({
                'href': "../Impresiones/Listados_Egresos_Por_Servicios_Mes.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "15":
            $.fancybox({
                'href': "../Impresiones/Listados_Egresos_Por_Seccional_Institucion.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "16":
            $.fancybox({
                'href': "../Impresiones/Listados_Egresos_Por_Seccional_Institucion_X_Mes.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "17":
            $.fancybox({
                'href': "../Impresiones/Listados_Cantidad_De_Pacientes_De_Guardia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;


        case "18":
            $.fancybox({
                'href': "../Impresiones/Listados_Cantidad_De_Consultas_De_Guardia_Por_Medicos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;

        case "19":
            $.fancybox({
                'href': "../Impresiones/Listados_Cantidad_De_Consultas_De_Guardia_X_Seccional_Obra_Social.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;
        

        case "20":
            $.fancybox({
                'href': "../Impresiones/Listados_Cantidad_De_Pacietes_Por_Guardia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '100%',
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
            break;
    }

});

$("#CbotipoListado").change(function () {
    if ($("#CbotipoListado").val() == 5) {
        document.location = "../Informes/Informes_de_Produccion.aspx";
    }
});