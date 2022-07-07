var ConInv = true;



$(document).ready(function () {
    $("#frm_Main").validate({
        rules: {
            'desde': { required: true, dateES: true },
            'hasta': { required: true, dateES: true }
        },
        messages: {
            'desde': { required: '', dateES: '' },
            'hasta': { required: '', dateES: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            $("#controldesde").removeClass("error");
            $("#controlhasta").removeClass("error");
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }
    });
    InitControls();
});

function InitControls() {
    Cargar_Medicamentos(false);
    List_Rubros();
    $("#desde").datepicker();
    $("#hasta").datepicker();
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    $("#hasta").mask("99/99/9999", { placeholder: "-" });
    $("#btnPrint").hide();
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#desde").val(p);
    $("#hasta").val(d);
}


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

function List_Rubros() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamentos_Rubro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Rubros_Cargado,
        error: errores
    });
}

function List_Rubros_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Rubro) {
        if (Rubro.Id == 0) Rubro.Rubro = "TODOS";
        $("#cbo_Rubro").append($("<option></option>").val(Rubro.Id).html(Rubro.Rubro));
    });

}

function Listar() {
    var Insumo = $("#cbo_Medicamento :selected").val();
    var Inv = false;
    if ($("#chk_Inventario").is(":checked"))
    Inv = true;
    var json = JSON.stringify({ "InsumoId": Insumo, "Desde": $("#desde").val(), "Hasta": $("#hasta").val(), "Inventario": Inv });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/List_Mov_by_Insumo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Mov_by_Insumo_Cargado,
        error: errores,
        beforeSend: function () {
            $("#TablaPedidos_div").hide();
            $("#cargando").show();
        },
        complete: function () {
            $("#TablaPedidos_div").show();
            $("#cargando").hide();
        }
    });
}


function ListabyRubro() {
    var RubroId = $("#cbo_Rubro :selected").val();
    var Inv = false;
    if ($("#chk_Inventario").is(":checked"))
        Inv = true;
    var json = JSON.stringify({ "RubroId": RubroId, "Desde": $("#desde").val(), "Hasta": $("#hasta").val(), "Inventario": Inv });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/List_Mov_by_Rubro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Mov_by_Rubro_Cargado,
        error: errores,
        beforeSend: function () {
            $("#TablaPedidos_div").hide();
            $("#cargando").show();
        },
        complete: function () {
            $("#TablaPedidos_div").show();
            $("#cargando").hide();
        }
    });
}

function List_Mov_by_Rubro_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista.length > 0) {
        $("#TablaPedidos_div").empty();
        PrintByRubro();
    }
}

$("#cbo_Rubro").change(function () {
    if ($("#cbo_Rubro :selected").val() != "0") {
        $("#cbo_Medicamento").attr("disabled", "disabled");
        $("#btnPrint").hide();
    }
    else $("#cbo_Medicamento").removeAttr("disabled");
});

$("#cbo_Medicamento").change(function () {
    if ($("#cbo_Medicamento :selected").val() != "0")
        $("#cbo_Rubro").attr("disabled", "disabled");
    else $("#cbo_Rubro").removeAttr("disabled");
});

function List_Mov_by_Insumo_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Fecha</th><th>Hora</th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    if (Lista.length == 0) Contenido = "<tr><td></td><td>" + '' + " </td><td> " + '' + " </td><td>" + '<b>***INSUMO SIN MOVIMIENTOS***</b>' + " </td><td> " + '' + " </td></tr>";
    var Cuenta = 0;
    var i = -1;
    var Invent = "";
    $.each(Lista, function (index, Detalle) {
        if (Detalle.IdInventario == 0) {
            Invent = "<tr id='trinv'><td></td><td>" + '' + " </td><td> " + '' + " </td><td>" + '<b>***INSUMO SIN INVENTARIO***</b>' + " </td><td> " + '' + " </td></tr>";
            ConInv = false;
        }
        else {
            Invent = "";
            ConInv = true;
        }
        Contenido = Contenido + "<tr><td></td><td>" + Detalle.Fecha + " </td><td> " + Detalle.Hora + " </td><td>" + Detalle.Insumo + " </td><td> " + Detalle.Cantidad + " </td></tr>";
        Cuenta = Cuenta + Detalle.Cantidad;
        i = i + 1;
        $("#btnPrint").show();
        if (i == Lista.length - 1) Contenido = Contenido + "<tr><td></td><td>" + '' + " </td><td> " + '' + " </td><td>" + '<b>TOTAL</b>' + " </td><td> " + Cuenta + " </td></tr>";
    });
    var Pie = "</tbody></table>";
    if ($("#chk_Inventario").is(":checked") == false)
        $("#TablaPedidos_div").html(Encabezado + Contenido + Pie);
    else $("#TablaPedidos_div").html(Encabezado + Invent + Contenido + Pie);
}

$("#btnBuscar").click(function () {
    if ($("#frm_Main").valid()) {
        $("#controldesde").removeClass("error");
        $("#controlhasta").removeClass("error");
        if ($("#cbo_Rubro :selected").val() != "0" || $("#cbo_Medicamento :selected").val() != "0") {
            if ($("#cbo_Rubro :selected").val() != "0")
                ListabyRubro();
            if ($("#cbo_Medicamento :selected").val() != "0")
                Listar();
        }
        else alert('Seleccione Insumo o Rubro');
    }
});


$("#btnPrint").click(function () {
    var InsumoId = $("#cbo_Medicamento :selected").val();
    var Desde = $("#desde").val();
    var Hasta = $("#hasta").val();
    var Inventario = false;
    if ($("#chk_Inventario").is(":checked"))
        Inventario = true;
    $.fancybox(
        {
            'autoDimensions': false,
            'href': "../Impresiones/ImpresionCtaCteInsumo.aspx?InsumoId=" + InsumoId + "&Desde=" + Desde + "&Hasta=" + Hasta + "&Inventario=" + Inventario + "&ConInv=" + ConInv,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
});

    function PrintByRubro() {
        var RubroId = $("#cbo_Rubro :selected").val();
        var Desde = $("#desde").val();
        var Hasta = $("#hasta").val();
        var Inventario = false;
        if ($("#chk_Inventario").is(":checked"))
            Inventario = true;
     $.fancybox(
        {
            'autoDimensions': false,
            'href': "../Impresiones/InsumoCtaCteRubro.aspx?RubroId=" + RubroId + "&Desde=" + Desde + "&Hasta=" + Hasta + "&ConInv=" + Inventario,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
}
