$(document).ready(function () {
    $("#txtNroBono").mask("9?99999999", { placeholder: "-" });
    Cargar_Usuarios();
});


$("#btn_Cancelar").click(function () {
    CancelarBono();
});

function CancelarBono() {

    var json = JSON.stringify({
        "NroBono": $('#txt_NroBono').val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/CancelarBonoSN",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CancelarBono_Cancelado,
        error: errores
    });
}

function CancelarBono_Cancelado(Resultado) {
    var usuarios = Resultado.d;
    alert("Bono Cancelado");
    self.location = "CancelarBonoSN.aspx";
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

//btn_Cancelar

$("#btn_BuscarBono").click(function () {
    var json = JSON.stringify({
        "NroBono": $('#txt_NroBono').val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/BuscarBonoResumenSN",
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