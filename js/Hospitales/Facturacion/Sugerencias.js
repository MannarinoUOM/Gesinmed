var EditandoId = 0;

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).ready(function () {
    Sugerencia_Listar();
});


function Sugerencia_Listar() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/Sugerencia_Listar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var Practicas = Resultado.d;
            var Tabla_Datos = "";

            $("#TablaResultados").empty();

            $.each(Practicas, function (index, practicas) {
                Tabla_Datos = Tabla_Datos + "<tr";
                Tabla_Datos = Tabla_Datos + " onclick=Editar(" + practicas.Codigo + ");";
                Tabla_Datos = Tabla_Datos + "><td id='Prac" + practicas.Codigo + "'>" + practicas.Descripcion + "</td></tr>";
            });

            $("#TablaResultados").html(Tabla_Datos);

        },
        error: errores
    });
}

function Guardar() {
    if ($("#txtSugerencias").val().length > 0) {
        var json = JSON.stringify({ "Codigo": EditandoId, "Descripcion": $("#txtSugerencias").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/AltasNomencladores.asmx/Sugerencia_Guardar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Practicas_Guardar_Guardadas,
            error: errores
        });
    }
    else alert('Ingrese Sugerencia');
}

function Practicas_Guardar_Guardadas() {
    Limpiar();
    alert("Sugerencia Guardada");
    Sugerencia_Listar();
}

function Editar(Id) {
    EditandoId = Id;
    $("#txtSugerencias").val($("#Prac" + Id).html());
    $("#btnEliminar").show();
    $("#btnAgregarPractica").html("Modificar");
}

function Limpiar() {
    $("#txtSugerencias").val('');
}

$("#btn_Cancelar").click(function () {
    EditandoId = 0;
    $("#btnEliminar").hide();
    $("#btnAgregarPractica").html("Guardar");
    Limpiar();
});


$("#btnAgregarPractica").click(function () {
    Guardar();
    $("#btnAgregarPractica").html("Guardar");
});


$("#btnEliminar").click(function () {
    Eliminar();
    Limpiar();
    Sugerencia_Listar();
    $("#btnAgregarPractica").html("Guardar");
});


function Eliminar() {
        var json = JSON.stringify({ "Codigo": EditandoId });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/AltasNomencladores.asmx/Sugerencia_Eliminar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                alert("Eliminado");
            },
            error: errores
        });

    }

