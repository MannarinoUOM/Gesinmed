$(document).ready(function () {
    $("#txtFecha").datepicker();
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

$("#btn_Cancelar").click(function () {
    CancelarBono();
});

$("#btn_1").click(function () {
    Reintegrar(1,1);
});

$("#btn_2").click(function () {
    Reintegrar(2, 2);
});

$("#btn_3").click(function () {
    Reintegrar(3, 3);
});

$("#btn_4").click(function () {
    Reintegrar(4, 4);
});



function Reintegrar(cual, cantidad) {
    
    var json = JSON.stringify({
        "Fecha": $('#txtFecha').val(),
        "Usuario": $('#cbo_Usuarios option:selected').val(),
        "NroBono": $('#txtNroBono').val(),
        "Cual": cual,
        "Cantidad": $("#txt_monto").val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Bonos/Reintegro.asmx/Reintegrar_X",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CancelarBono_Cancelado,
        error: errores
    });
}

function CancelarBono_Cancelado(Resultado) {
    var usuarios = Resultado.d;
    alert("Reintegro Correcto");
    self.location = "Reintegro.aspx";
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

//btn_Cancelar

$("#btn_BuscarBono").click(function () {
    var json = JSON.stringify({
        "Fecha": $('#txtFecha').val(),
        "Usuario": $('#cbo_Usuarios option:selected').val(),
        "NroBono": $('#txtNroBono').val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Bonos/Reintegro.asmx/Reintegro_Estado",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Bono_Resumen,
        error: errores
    });
});

function Bono_Resumen(Resultado) {
    var Bono = Resultado.d;
    if (Bono.bono_Id != null && Bono.bono_Id != '') {

        $("#CargadoApellido").html(Bono.paciente);
        $("#CargadoNHC").html(Bono.cuil);
        $("#CargadoMedico").html(Bono.medico);
        $("#CargadoEspecialidad").html(Bono.especialidad);
        $("#CodBarraNum").html(Bono.bono_Id);
        $("#CargadoDNI").html(Bono.documento);
        $(".contenedor_2").height(380);
        $("#DatosaCancelar").show();     

    }
    else {
        alert("Bono no Encontrado");
        return false;
    }
}