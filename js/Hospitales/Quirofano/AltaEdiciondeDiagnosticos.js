$(document).ready(function () {
    CargarDiagnosticos("");
});


function CargarDiagnosticos(Diagnostico) {
    $("#txt_diagnosticos_edicion").val("");
    $("#editando_id_diagnostico").val("0");
    var json = JSON.stringify({ "Id": 0, "estado": true, "Cirugia_id": 0, "Diagnostico": Diagnostico });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Quirofano/Quirofano_.asmx/Diagnostico_Planificar_Cirugia_Combo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirugia_Cargado_todos,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function ListaCirugia_Cargado_todos(Resultado) {
    var Lista = Resultado.d;
    $("#select_diagnosticos").empty();
    $("#select_diagnosticos").append($("<option></option>").val("0").html("Nuevo diagnóstico"));
    $.each(Lista, function (index, Cirugia) {
        $("#select_diagnosticos").append($("<option></option>").val(Cirugia.id).html(Cirugia.diagnostico));
    });
}



$("#btn_diagnostico_guardar").click(function () {

    var id = $("#editando_id_diagnostico").val();
    var Diagnostico = $("#txt_diagnosticos_edicion").val().trim().toUpperCase();

    if (Diagnostico.trim() == "") {
        alert("Falta Cargar el diagnóstico");
        return;
    }

    var json = JSON.stringify({ "Id": id, "Diagnostico": Diagnostico });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Guardar_Diagnostico_PlanificarCirugia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Diagnóstico guardado correctamente.");
            LimpiarControles();
        },
        error: errores
    });
});


$("#btn_diagnostico_eliminar").click(function () {

    var r = confirm("¿Realmente desea eliminar ese diagnóstico");
    if (r == true) {
        var json = JSON.stringify({ "Id": $("#editando_id_diagnostico").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Eliminar_Diagnostico_PlanificarCirugia",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                alert("Diagnóstico eliminado correctamente.");
                LimpiarControles();
            },
            error: errores
        });
    }
});

function LimpiarControles() {
    $("#editando_id_diagnostico").val("0");
    $("#txt_diagnosticos_edicion").val("");
    $("#select_diagnosticos").prop("selectedIndex", 0);
    $("#txt_filtro_diagnostico").val("");
    $("#select_diagnosticos").empty();
    $("#btn_diagnostico_guardar").show();
}

$("#btn_diagnostico_cancelar").click(function () {
    LimpiarControles();
});

$("#select_diagnosticos").change(function () {
    if ($("#select_diagnosticos :selected").val() == "0") {
        $("#editando_id_diagnostico").val("0");
        $("#txt_diagnosticos_edicion").val("");
        $("#btn_diagnostico_guardar").show();
    }
    else {
        $("#editando_id_diagnostico").val($("#select_diagnosticos :selected").val());
        $("#txt_diagnosticos_edicion").val($("#select_diagnosticos :selected").html());
    }
});

$("#txt_filtro_diagnostico").change(function () {
    if ($(this).val().trim().length > 2)
    CargarDiagnosticos($(this).val().trim().toLowerCase());
});