var tipo = 1;
var idsSeccionales = "0";
var idsEspecialidades = "0";
var idsMedicos = "0";
var idsCirugias = "0";
var clase = "";
var orden = 1;
var PDF = 0;

parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Quirofano</strong>";

$("#txtDesde").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //maxDate: '0m',
    onClose: function (selectedDate) {
        $("#txtHasta").datepicker("option", "minDate", selectedDate);
    }
});

$("#txtHasta").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    // maxDate: '0m',
    onClose: function (selectedDate) {
        $("#txtDesde").datepicker("option", "maxDate", selectedDate);
    }
});
$(".fechas").mask("99/99/9999", { placeholder: "-" });


var date = new Date();
var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
var PDia = "0" + primerDia.getDate();
var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
var mes = (date.getMonth() + 1);
var ano = date.getFullYear();
//document.write("<br>El primer día es: " + primerDia.getDate());
//document.write("<br>El ultimo día es: " + ultimoDia.getDate());
if (mes.toString().length < 2) { mes = "0" + mes; }
//alert(PDia);
//alert(ultimoDia.getDate());
//alert(ano);
//alert(mes);

$("#txtDesde").val(PDia + "/" + mes + "/" + ano);
$("#txtHasta").val(ultimoDia.getDate() + "/" + mes + "/" + ano);

cargarSeccionales();

function cargarSeccionales() {
    var json = JSON.stringify({ "tipo": tipo });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/QuirofanoReporte.asmx/TraerFiltros",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarFiltros,
        error: errores,
        complete: cargarEspecialidades
    });
}

function cargarEspecialidades() {
    var json = JSON.stringify({ "tipo": tipo });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/QuirofanoReporte.asmx/TraerFiltros",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarFiltros,
        error: errores,
        complete: cargarMedicos
    });
}


function cargarMedicos() {
    var json = JSON.stringify({ "tipo": tipo });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/QuirofanoReporte.asmx/TraerFiltros",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarFiltros,
        error: errores,
        complete: Cirugias
    });
}

function Cirugias() {
    var json = JSON.stringify({ "tipo": tipo });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/QuirofanoReporte.asmx/TraerFiltros",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarFiltros,
        error: errores
    });
}
function CargarFiltros(resultado) {
    var tabla = "";
    switch (tipo) {
        case 1:
            tabla = "Seccionales";
            break;
        case 2:
            tabla = "Especialidad";
            break;
        case 3:
            tabla = "Medicos";
            break;
        case 4:
            tabla = "Cirugias";
            break;
    }

    var lista = resultado.d;
    
    $("#" + tabla).empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;overflow:auto'><thead><tr><th></th></tr></thead><tbody>";
    var Contenido = "";
    $.each(lista, function (index, item) {
        if (index == 0) {

            Contenido = Contenido + "<tr style='height:20px;'><td style='width:2%'><input type='checkbox' checked='checked'  id='" + item.id + "' onChange='Seleccionar(" + item.id + ")' disabled='disabled'/></td>" +
        "<td style='cursor:auto;width:82%; text-align:left'><label for='" + item.id + "'><strong>" + item.nombre + "</strong></label></td>"
        } else {

            Contenido = Contenido + "<tr style='height:20px;'><td style='width:2%'><input type='checkbox' class='" + tabla + "' name='" + tabla + "' id='" + item.id + "'  onChange='Seleccionar(" + item.id + ")'/></td>" +
        "<td style='cursor:auto;width:82%; text-align:left'><label for='" + item.id + "'><strong>" + item.nombre + "</label></strong></td>"
        }
    });
    var Pie = "</tbody></table>";
    $("#" + tabla).html(Encabezado + Contenido + Pie);
    tipo = tipo + 1;
}
function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function Seleccionar(id) {
        switch (id) {
            case 1000000000:
                $(".Seccionales").attr('checked', false);
                $("#" + id).attr('disabled', true);
                idsSeccionales = "0";
                break;
            case 2000000000:
                $(".Especialidad").attr('checked', false);
                $("#" + id).attr('disabled', true);
                idsEspecialidades = "0";
                break;

            case 3000000000:
                $(".Medicos").attr('checked', false);
                $("#" + id).attr('disabled', true);
                idsMedicos = "0";
                break;
            case 4000000000:
                $(".Cirugias").attr('checked', false);
                $("#" + id).attr('disabled', true);
                idsCirugias = "0";
                break;
        }
    
        switch ($("#" + id).attr('class')) {
            case "Seccionales":
                if (!$(".Seccionales").is(':checked')) {
                    $("#1000000000").attr('checked', true);
                    $("#1000000000").attr('disabled', true);
                    idsSeccionales = "0";
                }
                if ($(".Seccionales").is(':checked')) {
                    $("#1000000000").removeAttr('checked');
                    $("#1000000000").attr('disabled', false);
                }
                break;

            case "Especialidad":
                if (!$(".Especialidad").is(':checked')) {
                    $("#2000000000").attr('checked', true);
                    $("#2000000000").attr('disabled', true);
                    idsEspecialidades = "0";
                }
                if ($(".Especialidad").is(':checked')) {
                    $("#2000000000").removeAttr('checked');
                    $("#2000000000").attr('disabled', false);
                }
                break;

            case "Medicos":
                if (!$(".Medicos").is(':checked')) {
                    $("#3000000000").attr('checked', true);
                    $("#3000000000").attr('disabled', true);
                    idsMedicos = "0";
                }
                if ($(".Medicos").is(':checked')) {
                    $("#3000000000").removeAttr('checked');
                    $("#3000000000").attr('disabled', false);
                }
                break;
            case "Cirugias":
                if (!$(".Cirugias").is(':checked')) {
                    $("#4000000000").attr('checked', true);
                    $("#4000000000").attr('disabled', true);
                    idsCirugias = "0";
                }
                if ($(".Cirugias").is(':checked')) {
                    $("#4000000000").removeAttr('checked');
                    $("#4000000000").attr('disabled', false);
                }
                break;
        }
    }

    $(".orden").click(function () {

        switch ($(this).attr('id')) {
            case "porSeccional":
                orden = 1;
                break;
            case "porEspecialidad":
                orden = 2;
                break;
            case "porCirujano":
                orden = 3;
                break;
            case "porAnestesista":
                orden = 4;
                break;
        }
    });
    var excel = 0;
    $("#btnExcel").click(function () {
        excel = 1;
        $("#btnBuscar").click();
    });
    $("#btnBuscar").click(function () {
        if (excel == 1) { PDF = 0; } else { PDF = 1; }
        if ($("#txtDesde").val() == "") { alert("Ingrese fecha desde."); return false; }
        if ($("#txtHasta").val() == "") { alert("Ingrese fecha hasta."); return false; }

        $(".Seccionales").each(function (index, item) {
            if ($(this).is(':checked')) { idsSeccionales = idsSeccionales + "," + $(this).attr('id') + ","; }
        });
        $(".Especialidad").each(function (index, item) {
            if ($(this).is(':checked')) { idsEspecialidades = idsEspecialidades + "," + $(this).attr('id') + ","; }
        });
        $(".Medicos").each(function (index, item) {
            if ($(this).is(':checked')) { idsMedicos = idsMedicos + "," + $(this).attr('id') + ","; }
        });
        $(".Cirugias").each(function (index, item) {
            if ($(this).is(':checked')) { idsCirugias = idsCirugias + "," + $(this).attr('id') + ","; }
        });

        $(".listado").each(function (index, item) {
            if ($(this).is(':checked')) {
                imprimir($(this).attr('id'));
            }
        });
        //             alert(idsSeccionales + "/" + idsEspecialidades + "/" + idsMedicos + "/" + idsCirugias);
        excel = 0;
    });

function imprimir(listado) {
    switch (listado) {
        case "CirugiasRealizadas":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + orden + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasporEspecialidad(Horas)":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_Horario_De_Cirugias.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + orden + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasporProfesional(Horas)":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_Horario_De_Cirugias_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + orden + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasSuspendidas":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_De_Cirugias_Suspendidas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + orden + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "Exrtasutilizadosporaciente":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Protesis_Y_Extras_Consumidos_Por_Cirugia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + orden + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasreservadasnoCerradas":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_De_Cirugias_Reservadas_No_Cerradas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + orden + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasporSeccional":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 1 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasporEspecialidad":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 2 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasporEspecialidad(Horas)2":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_Horario_De_Cirugias_x_Especialidad_Medico.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 1 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasporProfesional":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 3 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasporProfesional(Horas)2":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_Horario_De_Cirugias_x_Especialidad_Medico.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 2 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasporMedico(Mensual)":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 3 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasporEspecialida(Mensual)":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 2 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "RankingInsumos(Mensual)":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Cantidad_De_Insumos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 1 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasSuspendidas2":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Quirofano_Reportes_Motivos_De_Cirugias_Suspendidas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 2 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasporTipodeAnestesia":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Tipos_De_Anestesias.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 2 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "CirugiasporTipodePractica":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Cirugias_Realizadas_Por_Practicas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 2 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "RankingCirugias":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Ranking_De_Cirugias.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 2 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
        case "RankingInsumos":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Ranking_De_Consumos_De_Quirofano.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 2 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;

        case "RankingdeProtesisyExtras":
            $.fancybox({
                'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Ranking_Protesis_Y_Extras_Consumidos_Por_Cirugia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF + "&seccionales=" + idsSeccionales + "&especialidades=" + idsEspecialidades + "&medicos=" + idsMedicos + "&cirugias=" + idsCirugias, //
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
                        idsSeccionales = "0";
                        idsEspecialidades = "0";
                        idsMedicos = "0";
                        idsCirugias = "0";
                    });
                }
            });
            break;
    } 
} 