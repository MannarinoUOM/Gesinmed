$(document).ready(function(){
    CargarCirugias("");
});

function CargarCirugias(Cirugia) {
    $("#txt_cirugias_edicion").val("");
    $("#editando_id_cirugia").val("0");
    var json = JSON.stringify({ "Id": 0, "estado": true, "Cirugia_id": 0, "Cirugia": Cirugia });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Quirofano/Quirofano_.asmx/Cirugia_Planificar_Cirugia_Combo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirugia_Cargado_todos_Cirugias_List,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function ListaCirugia_Cargado_todos_Cirugias_List(Resultado) {
    var Lista = Resultado.d;
    $("#select_cirugias").empty();
    $("#select_cirugias").append($("<option></option>").val("0").html("Nueva Cirugía"));
    $.each(Lista, function (index, Cirugia) {
        $("#select_cirugias").append($("<option></option>").val(Cirugia.id).html(Cirugia.cirugia));
    });
}


$("#btn_cirugia_cancelar").click(function () {
    $("#editando_id_cirugia").val("0");
    $("#txt_cirugias_edicion").val("");
    $("#txt_filtro_cirugia").val("");
    $("#select_cirugias").prop("selectedIndex", 0);
});


$("#btn_cirugia_eliminar").click(function () {
    EliminarCirugia();
});


function EliminarCirugia() {
    var r = confirm("¿Realmente desea eliminar ese tipo de cirugía");
    if (r == true) {
        var json = JSON.stringify({ "Id": $("#editando_id_cirugia").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Eliminar_Cirugia_PlanificarCirugia",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                LimpiarControles();
                alert("Cirugía dada de baja.");
            },
            error: errores
        });
    }
}

function LimpiarControles(){
    $("#editando_id_cirugia").val("0");
    $("#txt_cirugias_edicion").val("");
    $("#select_cirugias").prop("selectedIndex", 0);
    $("#btn_cirugia_guardar").show();
}


$("#btn_cirugia_cancelar").click(function () {
    LimpiarControles();
});


$("#txt_filtro_cirugia").change(function () {
    if ($(this).val().trim().length > 2) CargarCirugias($(this).val().trim().toLowerCase());
});


$("#select_cirugias").change(function () {
    if ($("#select_cirugias :selected").val() == "0") {
        $("#editando_id_cirugia").val("0");
        $("#txt_cirugias_edicion").val("");
    }
    else {
        $("#editando_id_cirugia").val($("#select_cirugias :selected").val());
        $("#txt_cirugias_edicion").val($("#select_cirugias :selected").html());
    }
});