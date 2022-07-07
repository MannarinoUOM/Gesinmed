$(document).ready(function () {
    $("#txtHC").mask("9?9999999999", { placeholder: "" });
});

$("#txtHC").change(function () {
    if ($(this).val().trim().length > 0)
        Cargar_Paciente_NHC($(this).val().trim());
    else { alert("Paciente no encontrado."); LimpiarControles(); return; }
});


$("#txtHC").keydown(function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 9) { e.preventDefault(); }
    if (keyCode == 13) {
        if ($(this).val().trim().length > 0)
            Cargar_Paciente_NHC($(this).val().trim());
        else { alert("Paciente no encontrado."); LimpiarControles(); return; }
    }
});


function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var paciente = Resultado.d;
            if (paciente.length == 0) { alert("Paciente no encontrado."); LimpiarControles(); return; }
            $.each(paciente, function (index, obj) {
                $("#lblNHC").html(obj.Paciente);
                $("#NHC").val(obj.documento); //ID Interno del Pac
                $("#btn_Guardar").show();
            });
        },
        error: errores
    });
}

function LimpiarControles() {
    $("#lblNHC").html('');
    $("#txtHC").val('');
    $("#NHC").val('0');
    $("#txtHC").focus();
    $("#btn_Guardar").hide();
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btn_Guardar").click(function () {
    if (confirm("¿Desea continuar con el proceso? La HC será eliminada del sistema.")) {
        if (Validar()) { $("#btn_Guardar").attr("disabled", true); EliminarHC(); }
        else alert("Verifique los datos ingresados.");
    }
});

function EliminarHC() {
    var json = JSON.stringify({ "PacienteId": parseInt($("#NHC").val().trim()) });
    $.ajax({
        type: "POST",
        url: "../Json/Administracion/Administracion.asmx/EliminarHC",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == true) alert("Historia clinica eliminada.");
        },
        complete: function () {
            window.location = "admin_EliminarHC.aspx";
        },
        error: errores
    });
}

function Validar() {
    if (parseInt($("#NHC").val().trim()) > 0) return true;
    else return false;
}