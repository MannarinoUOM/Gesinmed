parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Edición de Horarios para Turnos</strong>";

function CargarDatos() {
    $.ajax({
        type: "POST",
        url: "../Json/Administracion/Administracion.asmx/Cargar_Configuracion_Turnos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarDatos_Cargados,
        error: errores
    });
}


function CargarDatos_Cargados(Resultado) {
    var Config = Resultado.d;

    $("#txtTurnosmin").val(Config.minturnos);
    $("#txtTurnosmax").val(Config.maxturnos);
    $("#txtagendaabierta").val(Config.agenda);
    $("#txtHoraPersonal").val(Config.HorariosTurnosPersonales);
    $("#txtHoraTelefonico").val(Config.HorariosTurnosTelefonicos);
    $("#txtTelefono").val(Config.Telefono);
}


$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    CargarDatos();

});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnActualizar").click(function () {
    var json = JSON.stringify({
        "HorarioMin": $("#txtTurnosmin").val(),
        "HorarioMax": $("#txtTurnosmax").val(),
        "AgendaAbierta": $("#txtagendaabierta").val(),
        "HoraAtencionPersonal": $("#txtHoraPersonal").val(),
        "HorarioAtencion": $("#txtHoraTelefonico").val(),
        "Telefono": $("#txtTelefono").val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Guardar_ConfTurnos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Datos Actualizados");
        },
        error: errores
    });
});