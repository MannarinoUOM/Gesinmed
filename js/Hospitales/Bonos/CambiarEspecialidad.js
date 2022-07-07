$(document).ready(function () {
    $("#txtNroBono").mask("9?99999999", { placeholder: "-" });
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtFecha").datepicker();
    Cargar_Especialidades(false, 0, false);
});



function Validar() {
    if ($('#txtFecha').val().trim().length == 0) { alert("Ingrese fecha del bono."); return false; }
    if ($('#txtNroBono').val().trim().length == 0) { alert("Ingrese numero de bono."); return false; }
    return true;
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btn_BuscarBono").click(function () {
    if (!Validar()) return false;
    var json = JSON.stringify({
        "fecha": $('#txtFecha').val().trim(),
        "Usuario": 0,
        "NroBono": $('#txtNroBono').val().trim()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/BuscarBonoResumen",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Bono_Resumen,
        error: errores
    });
});

function Bono_Resumen(Resultado) {
    var Bono = Resultado.d;
    if (Bono.comentario_turno != null && Bono.comentario_turno != '') {
        $("#CargadoApellido").html(Bono.apellido);
        $("#CargadoNHC").html(Bono.cuil);
        $("#CargadoMedico").html(Bono.medico);
        $("#CargadoEspecialidad").html(Bono.especialidad);
        $("#CodBarraNum").html(Bono.comentario_turno);
        $("#CargadoDNI").html(Bono.documento);
        $(".contenedor_2").height(380);
        $("#DatosaCancelar").show();
    }
    else {
        alert("Bono no Encontrado");
        return false;
    }
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


$("#btnConfirmar").click(function () {
    if ($("#cbo_Especialidad :selected").val() == "0") { alert("Ingrese Especialidad."); return false; }

    var json = JSON.stringify({
        "NroBono": $('#txtNroBono').val().trim(),
        "EspecialidadNueva": $("#cbo_Especialidad :selected").val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/CambiarEspecialidad",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == 1) { alert("El bono se ha modificado correctamente."); document.location = "CambiarEspecialidad.aspx"; }
        },
        error: errores
    });
});