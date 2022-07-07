function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$(document).ready(function () {
    Cargar_Especialidades(true, 0, true);
    Cargar_Medicos_por_Especialidad(0);
    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val(p);
    $("#txtFechaFin").val(d);
});

$(function () {
    $("#txtFechaInicio").datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: '-14Y',
        maxDate: '0m',
        onClose: function (selectedDate) {
            $("#txtFechaFin").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#txtFechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: '0m',
        maxDate: '+14Y',
        onClose: function (selectedDate) {
            $("#txtFechaInicio").datepicker("option", "maxDate", selectedDate);
        }
    });
});

function Cargar_Especialidades(Todos, Id, SoloTurnos) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargadas,
        error: errores
    });
}

function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $('#cbo_Especialidad').append('<option value="0">Especialidad</option>');
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
    });
}

$('#cbo_Especialidad').change(function () {
    Cargar_Medicos_por_Especialidad($(this).val());
});

function Cargar_Medicos_por_Especialidad(Especialidad) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivos",
        data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        error: errores
    });

}

function Medicos_por_Especialidad_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $('#cbo_Medico').empty();
    $('#cbo_Medico').append('<option value="0">Medicos</option>');
    $.each(Medicos, function (index, medicos) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
    });
}

$("#btnImprimir").click(function () {
    var url = "../Impresiones/Reportes_TurnosMedicos.aspx?Desde=" + $("#txtFechaInicio").val() + "&Hasta=" + $("#txtFechaFin").val() + "&MedId=" + $('#cbo_Medico :selected').val() + "&EspId=" + $('#cbo_Especialidad :selected').val();
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
