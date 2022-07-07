var listaEspecialidades = [];
var idsEspecialidades = "0";
var date = new Date();
var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
var desde = "";
var hasta = "";
var mes = "";
var tipo = 0;

//parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Endoscopia</strong>";

var GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    GET[decode(arguments[1])] = decode(arguments[2]);
});

$("#titulo").html(GET["titulo"]);
tipo = GET["tipo"];
if (tipo == 2) {
    $("#agrupadoPor").hide();
    $("#filtroEspecialidad").hide();
    $("#contenedorFiltros").css('height', '114px');
}

$("#txtDesde").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    maxDate: '0m',
    onClose: function (selectedDate) {
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

    }
});
mes = date.getMonth() + 1;
desde = ("00" + primerDia.getDate()).toString().substring(4, 1) + "/" + ("00" + mes).toString().substring(4, 1) + "/" + date.getFullYear();
hasta = ultimoDia.getDate().toString() + "/" + ("00" + mes).toString().substring(4, 1) + "/" + date.getFullYear();

$("#txtDesde").mask("99/99/9999", { placeholder: "-" });
$("#txtHasta").mask("99/99/9999", { placeholder: "-" });
$("#txtDesde").val(desde);
$("#txtHasta").val(hasta);
$(".seleccion").click(function () {
    if ($(this).is(':checked') && ($(this).attr('id') != "0")) {
        $("#0").attr('disabled', false);
        $("#0").attr('checked', false);
    } else {
        if (!$(".seleccion").is(':checked')) {
            $("#0").attr('disabled', true);
            $("#0").attr('checked', true);
        }
    }
});

$("#0").click(function () {
    $(".seleccion").attr('checked', false);
    $("#0").attr('disabled', true);
    idsEspecialidades = "0";
});


$("#btnListarPDF").click(function () {
    if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") { alert("Ingese un rango de fecha."); return false; }

    switch (tipo) {
        case "1":
            listaEspecialidades.length = 0;
            $(".seleccion").each(function (index, item) {
                if ($(this).is(':checked')) { listaEspecialidades.push($(this).attr('id')); }
            });
            if (listaEspecialidades.length == 0) { idsEspecialidades = "0"; } else {
                idsEspecialidades = listaEspecialidades.join(',');
            }

            $.fancybox({
                'href': "../Impresiones/ReportesEndoscoppia/Reportes_Endoscopia_Endoscopias_Seccional_Especialidad_Profesional_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + $("#cboAgrupado").val() + "&PDF=" + 1 + "&seccionales=" + 0 + "&especialidades=" + idsEspecialidades + "&medicos=" + 0 + "&cirugias=" + 0, //
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
                'href': "../Impresiones/ReportesEndoscoppia/Reportes_Endoscopias_Ranking_Procedimientos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val()  + "&PDF=1", //
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
$("#btnListarExcel").click(function () {
    if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") { alert("Ingese un rango de fecha."); return false; }

    switch (tipo) {
        case "1":

            listaEspecialidades.length = 0;
            $(".seleccion").each(function (index, item) {
                if ($(this).is(':checked')) { listaEspecialidades.push($(this).attr('id')); }
            });
            if (listaEspecialidades.length == 0) { idsEspecialidades = "0"; } else {
                idsEspecialidades = listaEspecialidades.join(',');
            }

            $.fancybox({
                'href': "../Impresiones/ReportesEndoscoppia/Reportes_Endoscopia_Endoscopias_Seccional_Especialidad_Profesional_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + $("#cboAgrupado").val() + "&PDF=" + 0 + "&seccionales=" + 0 + "&especialidades=" + idsEspecialidades + "&medicos=" + 0 + "&cirugias=" + 0, //
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
                'href': "../Impresiones/ReportesEndoscoppia/Reportes_Endoscopias_Ranking_Procedimientos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=0", //
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

$("#btnVolver").click(function () {
    document.location = "../Informes/ReportesDeEndoscopia.aspx";
});