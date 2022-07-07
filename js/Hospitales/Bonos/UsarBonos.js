$(document).ready(function () {
    $("#txtFecha").datepicker();
    $("#txtFecha").val(FechaActual()); 
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtNroBono").mask("9?99999999", { placeholder: "-" });
    Cargar_Usuarios();
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

$("#btn_Usar").click(function () {
    UsarBono();
});

function UsarBono() {

    var json = JSON.stringify({
        "fecha": $('#txtFecha').val(),
        "Usuario": $('#cbo_Usuarios option:selected').val(),
        "NroBono": $('#txtNroBono').val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/UsarElBono",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: UsarBono_Usado,
        error: errores
    });
}

function UsarBono_Usado(Resultado) {
    var usuarios = Resultado.d;
    alert("Bono Usado");
    self.location = "UsarBono.aspx";
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

//btn_Cancelar

$("#btn_BuscarBono").click(function () {
    var json = JSON.stringify({
        "fecha": $('#txtFecha').val(),
        "Usuario": $('#cbo_Usuarios option:selected').val(),
        "NroBono": $('#txtNroBono').val()
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