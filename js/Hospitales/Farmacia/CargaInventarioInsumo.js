var sourceArr = [];
var mapped = {};

function List_by_Monodroga(MonoId) {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista_by_Mono",
        data: '{MonoId: "' + MonoId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        beforeSend: function () {
            $("#cbo_Medicamento").attr("disabled", true);
        },
        complete: function () {
            $("#cbo_Medicamento").removeAttr("disabled");
        },
        error: errores
    });
}

function List_Lotes_by_Insumo(Id) {
    $.ajax({
        type: "POST",
        data: "{Id: '" + Id + "'}",
        url: "../Json/Farmacia/Farmacia.asmx/List_Lotes_by_Insumo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Lotes_by_Insumo_Cargado,
        error: errores
    });
}

function List_Lotes_by_Insumo_Cargado(Resultado) {
    var Lotes = Resultado.d;
    $("#cbo_Lotes").empty();
    $("#cbo_Lotes").append($("<option></option>").val('').html('LOTE'));
    $("#cbo_Lotes").append($("<option></option>").val('0').html('Lote sin asignar...'));
    $.each(Lotes, function (index, Lote) {
        $("#cbo_Lotes").append($("<option></option>").val(Lote.NROLOTE).html(Lote.NROLOTE));
    });
}

$("#cbo_Lotes").change(function () {
    $("#lote").val($("#cbo_Lotes :selected").val());
  //  alert($(this).val());
    if ($(this).val() != "ENT. POR SUPERVISIÓN" && $(this).val() != "LOTE PRIORITARIO") {
        $("#btnEliminar").show();
    } else {
        $("#btnEliminar").hide();
    }
    InsumoStockInfo();
});


$("#btnEliminar").click(function () {
    var json = JSON.stringify({ "STO_INS_ID": $("#Medicamento_val").html(), "NRO_LOTE": $("#lote").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/DarBajaInsumo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == 1) { alert("Lote eliminado"); location.reload(); } else { alert("No se pudo eliminar el lote."); }
        },
        error: errores
    });
});

$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {
        Get_StockbyId(mapped[selection]);
        $("#txt_Medicamento").val(selection); //nom
        $("#Medicamento_val").html(mapped[selection]); //id
        List_Lotes_by_Insumo(mapped[selection]);
    },
    minLength: 4,
    items: 10
});

function Get_StockbyId(Id) {
    $.ajax({
        type: "POST",
        data: "{Id: '" + Id + "'}",
        url: "../Json/Farmacia/Farmacia.asmx/Get_StockbyId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Get_StockbyId_Cargado,
        error: errores
    });
}

function Get_StockbyId_Cargado(Resultado) {
    var Insumo = Resultado.d;
    $("#cbo_Medicamento").val($("#txt_Medicamento").val());
}

$(document).ready(function () {
    $("#fecha").datepicker();
    $("#FechaVto").datepicker();
    $("#hora").mask("99:99", { placeholder: "-" });
    $("#fecha").mask("99/99/9999", { placeholder: "-" });
    $("#FechaVto").mask("99/99/9999", { placeholder: "-" });
    $("#fecha").val(FechaActual());
    $("#FechaVto").val(FechaActual());
    var Digital = new Date();
    var hours = Digital.getHours();
    var minutes = Digital.getMinutes();
    if (minutes <= 9) minutes = "0" + minutes;
    if (hours <= 9) hours = "0" + hours;
    $("#hora").val(hours + ":" + minutes);
    List_by_Monodroga(0);
    //Cargar_Medicamentos(false);
    $("#frm_Medicamentos").validate({
        rules: {
            'fecha': { required: true, dateES: true },
           // 'cantidad': { required: true, number: true, range: [1, 999999] },
            'hora': { required: true },
            'lote': { required: true }
        },
        messages: {
            'fecha': { required: '', dateES: '' },
            'cantidad': { required: '', number: '', range: '' },
            'hora': { required: '' },
            'lote': { required: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            $("#controlfecha").removeClass("error");
            $("#controlcantidad").removeClass("error");
            $("#controlhora").removeClass("error");
            $("#controllote").removeClass("error");
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
});


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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
    var Medicamentos = Resultado.d;
    $.each(Medicamentos, function (i, item) {
        if (Medicamentos[i].Medida != null) {
            var Medida = Medicamentos[i].Medida;
        }
        else {
            var Medida = '';
        }
        if (Medicamentos[i].Presentacion != null) {
            var Presentacion = Medicamentos[i].Presentacion;
        }
        else {
            var Presentacion = '';
        }
        if (i == 0) {
            sourceArr.length = 0;
        }
        str = Medicamentos[i].REM_NOMBRE + ' - ' + Medicamentos[i].REM_GRAMAJE + Medida + ' - ' + Presentacion;
        mapped[str] = item.REM_ID;
        sourceArr.push(str);
    });
}

var mensaje_de_carga = 0;
$("#btnCargar").click(function () {

    //alert();

    if ($("#Medicamento_val").html() == "0") { alert("Ingrese Insumo."); return false; }

    if ($("#lote").val().trim().length == "0" && $("#newLot").val().trim().length == "0") { alert("Ingrese Lote."); return false; }


    //alert($("#newLot").val().trim().length);

    // cuando das de alta un lote le tenes que poner cantida para que funcoione la validacion que pidio miguel
    if ($("#newLot").val().trim().length > 0 && $("#cantidad").val().trim().length == "0") { alert("Ingrese Cantidad."); return false; }

    //    if ($("#cantidad").val().trim().length == "0") { alert("Ingrese Cantidad."); return false; }


    if ($("#frm_Medicamentos").valid() && $("#Medicamento_val").html() != "0") {
        $("#controlfecha").removeClass("error");
        $("#controlcantidad").removeClass("error");
        $("#controlhora").removeClass("error");
        $("#controllote").removeClass("error");
        var f = {};
        f.CodigoMovimiento = 3; //1 ingreso, 2 egreso, 3 inventario
        f.Descripcion = "Carga de Inventario de Insumo - Nro. Lote " + $("#lote").val();
        f.InsumoId = $("#Medicamento_val").html();


        if (($("#cantidad").val().trim().length == "0") || ($("#cantidad").val() == "0")) { f.Cantidad = 0; mensaje_de_carga = 1; } else { f.Cantidad = $("#cantidad").val(); mensaje_de_carga = 0; }



        f.Fecha = $("#fecha").val() + " " + $("#hora").val();
        f.PedidoId = 0;
        f.PedidoTipo = 6; //Inventario


        if ($("#newLot").val().trim().length != "0") { f.NroLote = $("#newLot").val().trim().toUpperCase(); }
        else
        { f.NroLote = $("#lote").val().trim().toUpperCase(); }



        //        alert(f.NroLote);
        //        return false;


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
    if (mensaje_de_carga == 1) { alert("el cambio de la fecha de vencimiento fue realizado con éxito"); } else {
        alert("Carga Inventario Correcta");
    }
    LimpiarControles();
}

function LimpiarControles() {
    $("#Medicamento_val").html('0');
    $("#cantidad").val('');
    $("#cbo_Medicamento").val('');
    $("#txt_Medicamento").val('');
    var Digital = new Date();
    var hours = Digital.getHours();
    var minutes = Digital.getMinutes();
    if (minutes <= 9) minutes = "0" + minutes;
    if (hours <= 9) hours = "0" + hours;
    $("#hora").val(hours + ":" + minutes);
    $("#lote").val('');
    $("#cbo_Lotes").empty();
    $("#FechaVto").val('');
    $("#newLot").val('');
}

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$("#btnCancelar").click(function () {
    LimpiarControles();
});


function InsumoStockInfo() {
    var json = JSON.stringify({ "IdInsumo": $("#Medicamento_val").html(), "NroLote": $("#lote").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Insumo_StockInfo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var obj = Resultado.d;
            $("#FechaVto").val(obj.STO_VENCIMIENTO);
            $("#fecha").val(obj.STO_VENCIMIENTO);
           // alert();
        },
        error: errores
    });
}

$("#newLot").change(function () {
    if ($(this).val().length > 0) {
        $("#fecha").attr('disabled', false);
        $("#hora").attr('disabled', false);
        $("#cbo_Lotes").val(null);
    } else {
        $("#fecha").val(FechaActual());
        $("#fecha").attr('disabled', true);
        var Digital = new Date();
        var hours = Digital.getHours();
        var minutes = Digital.getMinutes();
        if (minutes <= 9) minutes = "0" + minutes;
        if (hours <= 9) hours = "0" + hours;
        $("#hora").val(hours + ":" + minutes);
        $("#hora").attr('disabled', true);
        $("#cbo_Lotes").val(null);
         }
});

$("#btnHabilitarFecha").click(function () { $("#fecha").attr('disabled', false); });

$("#fecha").change(function () {
 
    $("#fecha").attr('disabled', true);
});
