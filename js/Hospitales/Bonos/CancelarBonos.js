$(document).ready(function () {
    $("#txtFecha").datepicker();
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtNroBono").mask("9?99999999", { placeholder: "-" });
    //Cargar_Usuarios();
});

function Cargar_Usuarios() {
    $.ajax({
        type: "POST",
        url: "../Json/Usuarios/Usuarios.asmx/Lista_T",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Usuarios_Cargados,
        error: errores
    });
}

function Cargar_Usuarios_Cargados(Resultado) {
    var usuarios = Resultado.d;
    $('#cbo_Usuarios').empty();
    $.each(usuarios, function (index, usuario) {
        $('#cbo_Usuarios').append(
              $('<option></option>').val(usuario.id).html(usuario.nombre)
            );
    });
}

function Validar() {
    if ($('#txtFecha').val().trim().length == 0) { alert("Ingrese fecha de emision."); return false; }
    if ($('#txtNroBono').val().trim().length == 0) { alert("Ingrese numero de bono."); return false; }
    if ($("#txtObservaciones").val().trim().length == 0) { alert("Ingrese motivo de cancelación."); return false; }
    return true;
}

$("#btn_Cancelar").click(function () {
    if (!Validar()) return false;
    CancelarBono();
});

function CancelarBono() {
    if (confirm("¿Desea cancelar el bono?")) {
        var json = JSON.stringify({
            "fecha": $('#txtFecha').val().trim(),
            "Usuario": 0,
            "NroBono": $('#txtNroBono').val().trim(),
            "Observacion": $("#txtObservaciones").val().trim().toUpperCase()
        });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Administracion/Administracion.asmx/CancelarBono",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: CancelarBono_Cancelado,
            error: errores
        });
    }
}

function CancelarBono_Cancelado(Resultado) {
    var usuarios = Resultado.d;
    alert("El bono ha sido cancelado.");
    self.location = "CancelarBono.aspx";
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

//btn_Cancelar

$("#btn_BuscarBono").click(function () {
    if (!Validar()) return false;
    var json = JSON.stringify({
        "fecha": $('#txtFecha').val().trim(),
        //"Usuario": $('#cbo_Usuarios option:selected').val(),
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