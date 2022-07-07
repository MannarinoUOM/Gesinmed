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
var Desde = "";
var Hasta = "";

$("#cantidad").keydown(function (e) {
    if (e.keyCode == 9) {
        e.preventDefault();
        $("#txtObservaciones").focus();
    }
});

$("#txtObservaciones").keydown(function (e) {
    if (e.keyCode == 9) {
        e.preventDefault();
        $("#btnAgregarMedicamento").focus();
    }
});


function List_Proveedores(Todos) {
    $.ajax({
        type: "POST",
        data: '{Todos: "' + Todos + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Proveedores_Cargado,
        error: errores,
        complete: function () {
            $("#desdeaqui").show();
            $("#btnRemitos").show();
        }
    });
}

function List_Proveedores_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Proveedor) {
        $("#cbo_Proveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
    });

}

$("#btnAltaInsumos").fancybox({
    'hideOnContentClick': true,
    'width': '75%',
    'height': '75%',
    'autoScale': false,
    'transitionIn': 'none',
    'transitionOut': 'none',
    'type': 'iframe',
    'onClosed': function () {
        Cargar_Medicamentos();
    }
});


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
    List_Servicios();
    List_Proveedores('S');
    var Query = {};
    $("#btnConfirmarPedido").attr("disabled", true);
    Query = GetQueryString();
    Pedido_Id = Query['Id'];

    if (Pedido_Id > 0) {
        LoadPedido();
        Cargar_Medicamentos();
        $("#btnImprimir").show();
        $("#CargadoPedido").html(Pedido_Id);
        Desde = Query['Desde'];
        Hasta = Query['Hasta'];
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
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_INS_LIST_COMBO",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado
    });
}

function Cargar_Medicamentos_Cargado(Resultado) {
    var Medicamentos = Resultado.d;
    $.each(Medicamentos, function (i, item) {
        if (i == 0) {
            sourceArr.length = 0;
        }
        str = item.COM_ADM_INS_INS_DESC;
        mapped[str] = item.COM_ADM_INS_INS_ID;
        sourceArr.push(str);
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

function LoadPedido() {
    var json = JSON.stringify({ "PED_COM_ID": Pedido_Id, "FechaDesde": null, "FechaHasta": null, "ServicioId": 0 });
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
    Controles_Pedido_Pendiente(PedidoCab.PED_COM_PENDIENTE);
}

function Controles_Pedido_Pendiente(Pendiente) {
    //Si el pedido esta pendiente (no se pidio) se puede modificar el detalle.
    if (Pendiente) {
        $(".pedido").show();
        $(".datos").removeAttr("disabled");
    }
    else {
        $(".pedido").hide();
        $(".datos").attr("disabled", true);
    }
}

$("#btnImprimir").click(function () {
    Print();
});

function LoadDetalles() {
    $("#cargando2").hide();
    $("#cont_datospac").show();
    $('#desdeaqui').click();
    $("#cbo_Medicamento").focus();
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
        objMedicamento.PED_COM_DET_ID = Detalle.PED_COM_DET_ID
        objMedicamento.PED_COM_DET_INS_ID = Detalle.PED_COM_DET_INS_ID;
        objMedicamento.PED_COM_DET_CANTIDAD = Detalle.PED_COM_DET_CANTIDAD;
        objMedicamento.PED_COM_DET_OBS = Detalle.PED_COM_DET_OBS;
        objMedicamento.Estado = 1;
        objMedicamento.PED_COM_DET_INS_DESC = Detalle.PED_COM_DET_INS_DESC;
        objMedicamentos[i] = objMedicamento;
        Contenido = Contenido + "<tr class='tr_det' title='" + Detalle.PED_COM_DET_OBS + "'><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.PED_COM_DET_INS_DESC + " </td><td> " + Detalle.PED_COM_DET_CANTIDAD + " </td></tr>";
        Total = Total + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

$('body').tooltip({
    selector: '.tr_det',
    html: true
});

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
    $("#cbo_Servicio").append($("<option></option>").val("0").html("Seleccione Servicio..."));
    $.each(Lista, function (index, Servicio) {
        $("#cbo_Servicio").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
    });

}

$("#btnAgregarMedicamento").click(function () {
    if ($("#cantidad").val().trim().length == 0) $("#cantidad").val("0");
    if ($("#Medicamento_val").html() <= 0) { alert("Ingrese Insumo."); $("#cbo_Medicamento").focus(); return false; }
    if ($("#cantidad").val().trim() <= 0) { alert("Ingrese cantidad correcta."); $("#cantidad").focus(); return false; }
    

    Codigo = $("#Medicamento_val").html();
    if (Existe(Codigo)) return;
    Nombre = $("#cbo_Medicamento").val();
    Cantidad = parseInt($("#cantidad").val());
    Importe = parseFloat($("#importe").val());
    var Cual = Total;
    if (Editando == 1) {
        Cual = EditandoPos;
    }
    else {
        Total = Total + 1;
        Cual = Total;
    }
    objMedicamento = {};

    objMedicamento.PED_COM_DET_ID = 0;
    objMedicamento.PED_COM_DET_INS_ID = Codigo;
    objMedicamento.PED_COM_DET_CANTIDAD = Cantidad;
    objMedicamento.PED_COM_DET_PRV_ID = 0;
    objMedicamento.Estado = 1;
    objMedicamento.PED_COM_DET_INS_DESC = Nombre;
    objMedicamento.PED_COM_DET_OBS = $("#txtObservaciones").val().trim().toUpperCase();
    objMedicamentos[Cual] = objMedicamento;
    RenderizarTabla();
    Editando = 0;
    EditandoPos = -1;
    LimpiarCampos();
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
    $("#txtObservaciones").val('');
    $("#cbo_Medicamento").removeAttr("disabled");
    $("#cantidad").val('');
    $("#cbo_Medicamento").focus();
}

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr class='tr_det' title='" + objMedicamentos[i].PED_COM_DET_OBS + "'><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].PED_COM_DET_INS_DESC + " </td><td> " + objMedicamentos[i].PED_COM_DET_CANTIDAD + " </td></tr>";
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
    $("#txtObservaciones").val(objMedicamentos[Nro].PED_COM_DET_OBS);
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
    var json = JSON.stringify({ "objPedidos": objMedicamentos, "NroPedidoCab": Pedido_Id });
    $.ajax({
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_PED_DET_INSERT",
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
    var json = JSON.stringify({ "cab": p });
    $.ajax({
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_PED_CAB_INSERT",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: COM_ADM_PED_CAB_INSERT_Cargado,
        error: errores
    });

}

function COM_ADM_PED_CAB_INSERT_Cargado(Resultado) {
    var IdPedido = Resultado.d;
    if (IdPedido > 0) {
        var json = JSON.stringify({ "objPedidos": objMedicamentos, "NroPedidoCab": IdPedido });
        $.ajax({
            data: json,
            url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_PED_DET_INSERT",
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
                window.location.href = "Administracion_Pedidos_Compras.aspx";
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

$("#btnVolver").click(function () {
    if (Pedido_Id > 0)
        window.location = "Administracion_Pedidos_Compras_Buscar.aspx?Desde=" + Desde + "&Hasta=" + Hasta;
    else window.location = "Administracion_Pedidos_Compras.aspx";
});


$("#btnPedidos").click(function () {
    window.location = "Administracion_Pedidos_Compras_Buscar.aspx";
});

$('#desdeaqui').click(function () {
    if ($("#cbo_Servicio :selected").val() == 0) { alert("Seleccione Servicio."); return false; }

    $("#CargadoServicio").html($("#cbo_Servicio :selected").html());
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    $("#cbo_Medicamento").focus();
    CargarPlantilla();
});

function CargarPlantilla() {
    var json = JSON.stringify({ "SRV_ID": $("#cbo_Servicio :selected").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_FAR_INSUMOS_SERV_LIST_BY_SRVID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (i, item) {
                var obj = {};
                obj.PED_COM_DET_CANTIDAD = item.COM_ISE_CANT;
                obj.PED_COM_DET_INS_DESC = item.COM_ISE_INS_DESC;
                obj.PED_COM_DET_INS_ID = item.COM_ISE_INS_ID;
                obj.Estado = 1;
                obj.PED_COM_DET_OBS = "";
                objMedicamentos[i] = obj;
                Total++;
                if (i == lista.length - 1) RenderizarTabla();
            });
        },
        error: errores
    });
}