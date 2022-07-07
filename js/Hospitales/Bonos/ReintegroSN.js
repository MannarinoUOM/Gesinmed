$(document).ready(function () {
    $("#txtNroBono").mask("9?99999999", { placeholder: "-" });
});



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
        "NroBono": $('#txtNroBono').val(),
        "Cual": cual,
        "Cantidad": $("#txt_monto").val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Bonos/Reintegro.asmx/Reintegrar_X_SN",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CancelarBono_Cancelado,
        error: errores
    });
}

function CancelarBono_Cancelado(Resultado) {
    var usuarios = Resultado.d;
    alert("Reintegro Correcto");
    self.location = "ReintegroSN.aspx";
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

//btn_Cancelar

$("#btn_BuscarBono").click(function () {
    var json = JSON.stringify({
        "NroBono": $('#txtNroBono').val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Bonos/Reintegro.asmx/Reintegro_Estado_SN",
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