var sourceArr = [];
var mapped = {};
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var Pedido_Id = 0;
var Servicio_Id_Aux = 0;
var Insumo;
var Contenido;

function Print() {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/PedidosCompras_Print.aspx?PED_ID=' + Pedido_Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'preload': true,
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            }

        });
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




function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$(document).ready(function () {
    $("#frm_Cantidad").validate({
        rules: {
            'cantidad': { required: true, number: true, range: [1, 99999] }
        },
        messages: {
            'cantidad': { required: '', number: '', range: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            RemoveClass();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });

    List_Servicios();
    var Query = {};
    $("#btnConfirmarPedido").attr("disabled", true);
    Query = GetQueryString();
    Pedido_Id = Query['Id'];
    if (Pedido_Id > 0) {
        LoadPedido();
        Cargar_Medicamentos();
        $("#btnImprimir").show();
        $("#CargadoPedido").html(Pedido_Id);
    }
    else {
        $("#btnImprimir").hide();
        Cargar_Medicamentos();
        $("#CargadoNumero").html("Provisorio");
        $("#CargadoFecha").html(FechaActual());
    }
});

function Cargar_Medicamentos() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista_Combo",
        data: '{Todos: "' + false + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado
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
        if (i == Medicamentos.length - 1) $("#cbo_Medicamento").removeAttr("disabled");
    });
}

$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {
        $("#txt_Medicamento").val(selection); //nom
        $("#Medicamento_val").html(mapped[selection]); //id
        $("#cantidad").focus();
        return selection;
    },
    minLength: 4,
    items: 10
});

function RemoveClass() {
    $("#controlcantidad").removeClass("error");
}

function LoadPedido() {
    var json = JSON.stringify({"PED_COM_ID": Pedido_Id, "FechaDesde": null, "FechaHasta": null, "ServicioId": 0});
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/COMPRAS_PED_CAB_LIST_BY_ID",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedido_Cargado,
        error: errores,
        beforeSend: function () {
            $("#cargando2").show();
            $("#cont_datospac").hide();
        }
    });
}

function LoadPedido_Cargado(Resultado) {
    var List = Resultado.d;
    var PedidoCab = {};
    PedidoCab = List[0];
    $("#cbo_Servicio").val(PedidoCab.PED_COM_SERV_ID);
    $("#CargadoServicio").html(PedidoCab.PED_COM_SERV_DESC);
    $("#CargadoNumero").html(Pedido_Id);
    $("#CargadoFecha").html(PedidoCab.PED_COM_FECHA);
    Servicio_Id_Aux = PedidoCab.PED_COM_SERV_ID;
    LoadDetalles();
}

$("#btnImprimir").click(function () {
    Print();
});

function LoadDetalles() {
    $("#cargando2").hide();
    $("#cont_datospac").show();
    $('#desdeaqui').click();
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/COMPRAS_PED_DET_LIST_BY_ID",
        data: '{PED_COM_ID: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedidoDet_Cargado,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaMedicamentos").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaMedicamentos").show();
        },
        error: errores
    });
}

function LoadPedidoDet_Cargado(R) {
    var Detalles = R.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
    Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {
        objMedicamento = {};
        objMedicamento.PED_COM_DET_INS_ID = Detalle.PED_COM_DET_INS_ID;
        objMedicamento.PED_COM_DET_CANTIDAD = Detalle.PED_COM_DET_CANTIDAD;
        objMedicamento.Estado = 1;
        objMedicamento.PED_COM_DET_INS_DESC = Detalle.PED_COM_DET_INS_DESC;
        objMedicamentos[i] = objMedicamento;
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.PED_COM_DET_INS_DESC + " </td><td> " + Detalle.PED_COM_DET_CANTIDAD + " </td></tr>";
        Total = Total + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    var queryObj = {};
    for (var i = 0; i < querystring.length; i++) {
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        queryObj[name] = value;
    }
    return queryObj;
}

function List_Servicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Cargado,
        error: errores
    });
}

function List_Servicios_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Servicio) {
        $("#cbo_Servicio").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
    });

}

$("#btnAgregarMedicamento").click(function () {
    var valid = $("#frm_Cantidad").valid();
    if (valid && $("#Medicamento_val").html() != '0') {
        RemoveClass();
        Codigo = $("#Medicamento_val").html();
        if (Existe(Codigo)) return;
        Nombre = $("#cbo_Medicamento").val();
        Cantidad = parseInt($("#cantidad").val());
        var Cual = Total;
        if (Editando == 1) {
            Cual = EditandoPos;
        }
        else {
            Total = Total + 1;
            Cual = Total;
        }
        objMedicamento = {};
        objMedicamento.PED_COM_DET_INS_ID = Codigo;
        objMedicamento.PED_COM_DET_CANTIDAD = Cantidad;
        objMedicamento.Estado = 1;
        objMedicamento.PED_COM_DET_INS_DESC = Nombre;
        objMedicamentos[Cual] = objMedicamento;
        RenderizarTabla();
        Editando = 0;
        EditandoPos = -1;
        LimpiarCampos();
    }
});

function Existe(Algo) {
    for (var i = 0; i <= Total; i++) {
        if (objMedicamentos[i].PED_COM_DET_INS_ID == Algo && objMedicamentos[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado el Medicamento Nro: " + Algo);
            LimpiarCampos();
            $("#cbo_Medicamento").focus();
            return true;
        }
    }
    return false;
}

function LimpiarCampos() {
    if (objMedicamento.length > 0)
        $("#btnConfirmarPedido").removeAttr("disabled");
    $("#cbo_Medicamento").val('');
    $("#cbo_Medicamento").val('');
    $("#Medicamento_val").html('0');
    $("#cbo_Medicamento").removeAttr("disabled");
    $("#cantidad").val('0');
}

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].PED_COM_DET_INS_DESC + " </td><td> " + objMedicamentos[i].PED_COM_DET_CANTIDAD + " </td></tr>";
        }

    }
    if (objMedicamentos.length > 0) $("#btnConfirmarPedido").removeAttr("disabled");
    else $("#btnConfirmarPedido").attr("disabled", true);
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#btnConfirmarPedido").attr("disabled", true);
    $("#cantidad").val(objMedicamentos[Nro].PED_COM_DET_CANTIDAD);
    $("#cbo_Medicamento").val(objMedicamentos[Nro].PED_COM_DET_INS_DESC);
    $("#cbo_Medicamento").attr('disabled', 'disabled');
    $("#Medicamento_val").html(objMedicamentos[Nro].PED_COM_DET_INS_ID);
    $("#cantidad").focus();
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");

}

$("#btnCancelarMedicamento").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    if (objMedicamentos.length > 0) $("#btnConfirmarPedido").removeAttr("disabled");
    LimpiarCampos();
});

function Eliminar(Nro) {
    objMedicamentos[Nro].Estado = 0;
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
    RenderizarTabla();
    if (objMedicamentos.length > 0) $("#btnConfirmarPedido").removeAttr("disabled");
    else $("#btnConfirmarPedido").attr("disabled", true);
    LimpiarCampos();
}

$("#btnConfirmarPedido").click(function () {
    if (confirm("¿Desea confirmar el pedido?")) {
        if (objMedicamentos.length > 0) {
            if (Pedido_Id > 0) Delete_Detalles();
            else Insert_Pedido();
        }
        else alert("No hay Medicamentos en la Lista");
    }
});

function Delete_Detalles() {
    var json = JSON.stringify({ "Pedido_Id": Pedido_Id });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/PED_COM_DET_DELETE",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Detalles,
        error: errores
    });
}

function Insert_Detalles() {
    var json = JSON.stringify({ "objMedicamentos": objMedicamentos, "Pedido_Id": Pedido_Id });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/PED_COM_DET_INSERT",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: PED_COM_DET_INSERT_Cargado,
        error: errores
    });
}

function Insert_Pedido() {
    var p = {};
    p.PED_COM_SERV_ID = $("#cbo_Servicio :selected").val();
    p.PED_COM_ID = Pedido_Id;
    p.PED_COM_BAJA = false;
    p.PED_COM_ESTADO = 0; 
    var json = JSON.stringify({ "p": p });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/PED_COM_CAB_INSERT",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: PED_COM_CAB_INSERT_Cargado,
        error: errores
    });

}

function PED_COM_CAB_INSERT_Cargado(Resultado) {
    var IdPedido = Resultado.d;
    if (IdPedido > 0) {
        var json = JSON.stringify({ "objMedicamentos": objMedicamentos, "Pedido_Id": IdPedido });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/Farmacia.asmx/PED_COM_DET_INSERT",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: PED_COM_DET_INSERT_Cargado,
            error: errores
        });
    }
}

function PED_COM_DET_INSERT_Cargado(Resultado) {
    var Id = Resultado.d;
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/PedidosCompras_Print.aspx?PED_ID=' + Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "PedidosCompras.aspx";
            },
            'preload': true,
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            }
        });
}

$("#btnPedidos").click(function () {
    window.location = "PedidosCompras_Buscar.aspx";
});