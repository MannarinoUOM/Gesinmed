$(document).ready(function () {
    $(".HC").mask("9?9999999999", { placeholder: "" });
});

$(".HC").change(function () {
    if ($(this).val().trim().length > 0)
        Cargar_Paciente_NHC($(this).val().trim(), $(this).attr("rel"));
    else { alert("Paciente no encontrado."); LimpiarControles($(this).attr("rel")); return; }
});


$(".HC").keydown(function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 9) { e.preventDefault(); }
    if (keyCode == 13) {
        if ($(this).val().trim().length > 0)
            Cargar_Paciente_NHC($(this).val().trim(), $(this).attr("rel"));
        else { alert("Paciente no encontrado."); LimpiarControles($(this).attr("rel")); return; }
    }
});


function Cargar_Paciente_NHC(NHC, Rel) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var paciente = Resultado.d;
            if (paciente.length == 0) { alert("Paciente no encontrado."); LimpiarControles(Rel); return; }
            $.each(paciente, function (index, obj) {
                $("#lbl" + Rel).html(obj.Paciente);
                $("#hc" + Rel).val(obj.documento); //ID Interno del Pac
                if (Rel == "Origen") { $("#txtDestino").removeAttr("disabled"); $("#txtDestino").focus(); }
                if (Rel == "Destino") { if ($("#hc" + Rel).val() == $("#hcOrigen").val()) { alert("El Nro. de HC Origen es igual al Nro. de HC Destino. \nVerique los datos."); $("#btn_Guardar").hide(); return; } $("#btn_Guardar").show(); }
            });
        },
        error: errores
    });
}

function LimpiarControles(Rel) {
    if (Rel == "Origen") { $("#txtDestino").attr("disabled", true);LimpiarControles("Destino"); }
    $("#lbl" + Rel).html('');
    $("#txt" + Rel).val('');
    $("#hc" + Rel).val('0');
    $("#txt" + Rel).focus();
    $("#btn_Guardar").hide();
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btn_Guardar").click(function () {
    if (confirm("¿Desea continuar con el proceso? La HC de Origen será eliminada del sistema.")) {
        if (Validar()) { $("#btn_Guardar").attr("disabled",true); Pasaje(); }
        else alert("Verifique los datos ingresados.");
    }
});

function Pasaje() {
    var json = JSON.stringify({ "Origen": parseInt($("#hcOrigen").val().trim()), "Destino": parseInt($("#hcDestino").val().trim()) });
    $.ajax({
        type: "POST",
        url: "../Json/Administracion/Administracion.asmx/PasajedeHC",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            
            if (Resultado.d == true) alert("Pasaje realizado.");
            else alert("Ha ocurrido un error durante el pasaje, comuniquese con Sistemas.");
            document.location = "PasajedeHC.aspx";
        },
        error: errores
    });
}

function Validar() {
    if (parseInt($("#hcOrigen").val().trim()) > 0 && parseInt($("#hcDestino").val().trim()) > 0) return true;
    else return false;
}