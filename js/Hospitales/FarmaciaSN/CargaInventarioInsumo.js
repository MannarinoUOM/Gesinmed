


$(document).ready(function () {
    $("#fecha").datepicker();
    $("#hora").mask("99:99", { placeholder: "-" });
    $("#fecha").mask("99/99/9999", { placeholder: "-" });
    $("#fecha").val(FechaActual());
    var Digital = new Date();
    var hours = Digital.getHours();
    var minutes = Digital.getMinutes();
    if (minutes <= 9) minutes = "0" + minutes;
    if (hours <= 9) hours = "0" + hours;
    $("#hora").val(hours + ":" + minutes);
    Cargar_Medicamentos(false);
    $("#frm_Medicamentos").validate({
        rules: {
            'fecha': { required: true, dateES: true },
            'cantidad': { required: true, number: true, range: [1, 99999] },
            'hora': { required: true }
        },
        messages: {
            'fecha': { required: '', dateES: '' },
            'cantidad': { required: '', number: '', range: '' },
            'hora': { required: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            $("#controlfecha").removeClass("error");
            $("#controlcantidad").removeClass("error");
            $("#controlhora").removeClass("error");
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
});


function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function Cargar_Medicamentos(Todos) {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista",
        data: '{Todos: "' + Todos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        error: errores
    });
}

function Cargar_Medicamentos_Cargado(Resultado) {
    var Medicamento = Resultado.d;
    $.each(Medicamento, function (index, Medicamento) {
        if (Medicamento.Medida != null) {
            var Medida = Medicamento.Medida;
        }
        else {
            var Medida = '';
        }
        $('#cbo_Medicamento').append(
              $('<option></option>').val(Medicamento.REM_ID).html(Medicamento.REM_NOMBRE + ' - ' + Medicamento.REM_GRAMAJE + Medida + ' - ' + Medicamento.Presentacion)
            );
    });

}

$("#btnCargar").click(function () {
    if ($("#frm_Medicamentos").valid() && $("#Medicamento_val").html() != "0") {
        $("#controlfecha").removeClass("error");
        $("#controlcantidad").removeClass("error");
        $("#controlhora").removeClass("error");
        var f = {};
        f.CodigoMovimiento = 3; //1 ingreso, 2 egreso, 3 inventario
        f.Descripcion = "Cargo de Inventario de Insumo " + $("#Medicamento_val").html();
        f.InsumoId = $("#Medicamento_val").html();
        f.Cantidad = $("#cantidad").val();
        f.Fecha = $("#fecha").val() + " " + $("#hora").val();
        f.PedidoId = 0;
        f.PedidoTipo = 6; //Inventario
        var json = JSON.stringify({ "m": f });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/Farmacia.asmx/InsertMovimientoCtaCteInsumos",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: InsertMovimientoCtaCteInsumos_Cargado,
            error: errores
        });
    }
});

function InsertMovimientoCtaCteInsumos_Cargado() {
    alert("Carga Inventario Correcta");
}