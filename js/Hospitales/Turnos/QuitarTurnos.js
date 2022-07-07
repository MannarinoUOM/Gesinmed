var i = 0;
var posEliminar = 0;
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

Cargar_Especialidades(true, 0, true);

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#txtFechaInicio").datepicker();
$("#txtFechaFin").datepicker();


function Quitar(id) {
    posEliminar = id;
    var json = JSON.stringify
    ({ 
    "horaInicio": $('#txtHoraInicio').val(),
    "horaFin": $('#txtHoraFin').val(),
    "desde": $('#txtFechaInicio').val(),
    "hasta": $('#txtFechaFin').val(),
    "Medico": $('#cbo_Medico option:selected').val(),
    "Especialidad": $('#cbo_Especialidad option:selected').val(),
    "Todos": $('#cbo_Turnos option:selected').val()
});

$.ajax({
    type: "POST",
    url: "../Json/Turnos/QuitarTurnos.asmx/QuitarlosTurnos",
    data: json,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: Quitar_Completo,
    error: errores
});
    
}

function Quitar_Completo() {
    alert("Los turnos se han eliminado correctamente.");
}

$('#btn_QuitarTurnos').click(function () {
    if (confirm("¿Desea eliminar los turnos?")) {
        //$('#OpcionesModal').modal('hide')
        if ($('#cbo_Especialidad option:selected').val() == 0) { $("#Controlcbo_Especialidad").addClass("error"); return false; }
        if ($('#cbo_Medico option:selected').val() == 0) { $("#Controlcbo_Medico").addClass("error"); return false; }
        if ($('#txtFechaInicio').val() == '') { $("#ControlFechas").addClass("error"); return false; }
        if ($('#txtFechaFin').val() == '') { $("#ControlFechas").addClass("error"); return false; }
        //if (fecha1esmayora2()) { alert("La Fecha de inicio tiene que ser menor a la fecha final"); $("#ControlFechas").addClass("error"); return false; }

        Quitar(1);
    }
});

function fecha1esmayora2() {
    var fechaInicio = document.getElementById("txtFechaInicio");
    var fechaFin = document.getElementById("txtFechaFin");

    var anio = parseInt(fechaInicio.value.substring(6, 10));
    var mes = fechaInicio.value.substring(3, 5);
    var dia = fechaInicio.value.substring(0, 2);
    var c_anio = parseInt(fechaFin.value.substring(6, 10));
    var c_mes = fechaFin.value.substring(3, 5);
    var c_dia = fechaFin.value.substring(0, 2);

    if (c_anio * 10000 + c_mes * 1000 + c_dia > anio * 10000 + mes * 1000 + dia)
        return (false);
    else {
        return (true);
    }
}


$(document).ready(function () {

    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });

    $("#txtHoraInicio").mask("99:99", { placeholder: "-" });
    $("#txtHoraFin").mask("99:99", { placeholder: "-" });

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val(d);
    $("#txtFechaFin").val(fecha_ultimo_dia_mes(mm, yyyy));
});


$("#cbo_Especialidad").change(function () {
    $("#Controlcbo_Especialidad").removeClass("error");
});

$("#cbo_Medico").change(function () {
    $("#Controlcbo_Medico").removeClass("error");
});


$("#txtHoraInicio").change(function () {
    VerificarHora(txtHoraInicio);
});

$("#txtHoraFin").change(function () {
    VerificarHora(txtHoraFin);
});

function VerificarHora(ObjHora) {

    ErrorHora = false;
    var hora = $('#' + ObjHora).val();
    if ($('#' + ObjHora).val().length == 5) {

        var h1 = hora.charAt(0);
        var h2 = hora.charAt(1);
        var dp = hora.charAt(2);
        var m1 = hora.charAt(3);

        if ((h1 == 2 && h2 > 3) || (h1 > 2)) { ErrorHora = true; }
        if (m1 > 5) { ErrorHora = true; }
        if (dp != ":") { ErrorHora = true; }
        if (ErrorHora) {
            $('#' + ObjHora).val("");
        }
    }
}