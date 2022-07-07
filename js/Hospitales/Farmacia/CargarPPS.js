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
            'href': '../Impresiones/PPS_Print.aspx?Id=' + Pedido_Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'preload': true,
            'onComplete' : function f()
            {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function(){jQuery.fancybox.hideActivity();
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
    ListaMonoDrogras();
    var Query = {};
    $("#btnConfirmarPedido").attr("disabled", true);
    Query = GetQueryString();
    Pedido_Id = Query['Id'];
    if (Pedido_Id > 0) {
        LoadPedido();
        List_Depositos();
        Cargar_Medicamentos();
        $("#btnImprimir").show();
        $("#CargadoPedido").html(Pedido_Id);
    }
    else {
        $("#btnImprimir").hide();
        List_Depositos();
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


function ListaMonoDrogras() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/MonoDrogas",
        data: '{Numero: "' + 0 + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var MonoDrogas = Resultado.d;
            $('#cbo_Monodroga').empty();
            $('#cbo_Monodroga').append('<option value="0">Seleccione Monodroga...</option>');
            $.each(MonoDrogas, function (index, mono) {
                $('#cbo_Monodroga').append(
              $('<option></option>').val(mono.numero).html(mono.nombre)
            );
            });
        },
        error: errores
    });
}

$('#cbo_Monodroga').change(function () {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista_by_Mono",
        data: '{MonoId: "' + $("#cbo_Monodroga :selected").val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        error: errores
    });
});

$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {
        Get_StockbyId(mapped[selection]);
        $("#txt_Medicamento").val(selection); //nom
        $("#Medicamento_val").html(mapped[selection]); //id
    },
    minLength: 4,
    items: 10
});



function CargarPlantilla() {
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/ListPlantillaforPedido",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarPlantilla_Cargado,
        error: errores
    });
}

function CargarPlantilla_Cargado(Resultado) {
    var Plantilla = Resultado.d;
    if (Plantilla.length > 0) {
        var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
        Contenido = "";
        var i = 0;
        $.each(Plantilla, function (index, Detalle) {
            objMedicamento = {};
            objMedicamento.Insumo_Id = Detalle.DET_INS_ID;
            objMedicamento.Deposito_Id = 1;
            objMedicamento.Cantidad = Detalle.DET_CANTIDAD;
            objMedicamento.StockMinimo = Detalle.STO_MINIMO;
            objMedicamento.Stock = Detalle.STO_CANTIDAD;
            objMedicamento.Estado = 1;
            objMedicamento.Nombre = Detalle.REM_NOMBRE;
            objMedicamentos[i] = objMedicamento;
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.REM_NOMBRE + " </td><td> " + Detalle.DET_CANTIDAD + " </td></tr>";
            Total = Total + 1;
            i = i + 1;
        });
        var Pie = "</tbody></table>";
        $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
    }
}


function RemoveClass() {
    $("#controlcantidad").removeClass("error");
}

function LoadPedido() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_PPS_Cab",
        data: '{Id: "' + Pedido_Id + '"}',
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
    var PedidoCab = {};
    PedidoCab = Resultado.d;
    $("#cbo_Servicio").val(PedidoCab.Servicio_Id);
    $("#CargadoServicio").html(PedidoCab.Servicio);
    $("#CargadoNumero").html(Pedido_Id);
    $("#CargadoFecha").html(PedidoCab.Fecha);
    Servicio_Id_Aux = PedidoCab.Servicio_Id;
    LoadDetalles();
    EstaPendiente();
}

function EstaPendiente() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/PedidoPendiente",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: EstaPendiente_Cargado,
        error: errores
    });
}

function EstaPendiente_Cargado(Resultado) {
    var EstaPendiente = Resultado.d;
    if (EstaPendiente) { //El Pedido Esta Pendiente
        $("#btnConfirmarPedido").show();
        $("#btnImprimir").show();
    }
    else { //Pedido Completo
        $("#btnConfirmarPedido").hide();
        $("#btnImprimir").show();
        alert("El pedido ya ha sido entregado.");
    }
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
        url: "../Json/Farmacia/Farmacia.asmx/List_PPS_Det",
        data: '{Id: "' + Pedido_Id + '"}',
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
        objMedicamento.Insumo_Id = Detalle.DET_INS_ID;
        objMedicamento.Deposito_Id = 1;
        objMedicamento.Cantidad = Detalle.DET_CANTIDAD;
        objMedicamento.StockMinimo = Detalle.STO_MINIMO;
        objMedicamento.Stock = Detalle.STO_CANTIDAD;
        objMedicamento.Estado = 1;
        objMedicamento.Nombre = Detalle.REM_NOMBRE + " " + Detalle.REM_GRAMAJE + " " + Detalle.MEDIDA + " - " + Detalle.PRESENTACION;
        objMedicamento.Monodroga = Detalle.MONODROGA;
        objMedicamentos[i] = objMedicamento;
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.REM_NOMBRE + " " + Detalle.REM_GRAMAJE + " " + Detalle.MEDIDA + " - " + Detalle.PRESENTACION + " </td><td> " + Detalle.DET_CANTIDAD + " </td></tr>";
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

function List_Depositos() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamento_Deposito",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Depositos_Cargado,
        error: errores
    });
}

function List_Depositos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Deposito) {
        $("#cbo_Deposito").append($("<option></option>").val(Deposito.Id).html(Deposito.Deposito));
    });

}

function Get_Insumo_by_Id(Id) {
    $.ajax({
        type: "POST",
        data: "{Id: '" + Id + "'}",
        url: "../Json/Farmacia/Farmacia.asmx/Get_Insumo_by_Id",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Get_Insumo_by_Id_Cargado,
        error: errores
    });
}

function Get_Insumo_by_Id_2(Id) {
    $.ajax({
        type: "POST",
        data: "{Id: '" + Id + "'}",
        url: "../Json/Farmacia/Farmacia.asmx/Get_Insumo_by_Id",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Get_Insumo_by_Id_Cargado_2,
        error: errores
    });
}

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
    $("#btnConfirmarPedido").attr("disabled", true);
    if (Insumo != null) {
        $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
        $("#stock_minimo").html(Insumo.STO_MINIMO);
        $("#precio").html(parseFloat(Insumo.REM_PRECIO));
        $("#cbo_Deposito").val(Insumo.STO_DEP_ID);
    }
    else {
        $("#stock_medicamento").html('0');
        $("#stock_minimo").html('0');
        $("#precio").html(parseFloat('0'));
        $("#cbo_Deposito").val('0');
    }
    $("#cbo_Deposito").attr('disabled', 'disabled');
}

function Get_Insumo_by_Id_Cargado(Resultado) {
    Insumo = Resultado.d;
    $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
    $("#stock_minimo").html(Insumo.STO_MINIMO);
    $("#precio").html(parseFloat(Insumo.REM_PRECIO));
    $("#cbo_Deposito").val(Insumo.STO_DEP_ID);
    $("#cbo_Deposito").attr('disabled', 'disabled');
}

$("#btnAgregarMedicamento").click(function () {
    var valid = $("#frm_Cantidad").valid();
    if (valid && $("#Medicamento_val").html() != '0') {
        RemoveClass();
        Codigo = $("#Medicamento_val").html();
        if (Existe(Codigo)) return;
        Nombre = $("#txt_Medicamento").val();
        Cantidad = parseInt($("#cantidad").val());
        StockMinimo = $("#stock_minimo").html();
        Stock = $("#stock_medicamento").html();
        Precio = $("#precio").html();
        var Deposito = $("#cbo_Deposito :selected").val();
        var Cual = Total;
        if (Editando == 1) {
            Cual = EditandoPos;
        }
        else {
            Total = Total + 1;
            Cual = Total;
        }
        objMedicamento = {};
        objMedicamento.Insumo_Id = Codigo;
        objMedicamento.Deposito_Id = Deposito;
        objMedicamento.Cantidad = Cantidad;
        objMedicamento.StockMinimo = StockMinimo;
        objMedicamento.Stock = Stock;
        objMedicamento.Estado = 1;
        objMedicamento.Nombre = Nombre;
        objMedicamento.Precio = Precio;
        objMedicamento.Monodroga = $("#cbo_Monodroga :selected").val();
        objMedicamentos[Cual] = objMedicamento;
        RenderizarTabla();
        Editando = 0;
        EditandoPos = -1;
        LimpiarCampos();
    }
});

function Existe(Algo) {
    for (var i = 0; i <= Total; i++) {
        if (objMedicamentos[i].Insumo_Id == Algo && objMedicamentos[i].Estado == 1 && Editando != 1) {
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
    $("#txt_Medicamento").val('');
    $("#cbo_Medicamento").val('');
    $("#Medicamento_val").html('0');
    $("#cbo_Deposito").removeAttr("disabled"); 
    $("#txt_Medicamento").removeAttr("disabled");
    $("#cantidad").val('0');
    $("#stock_minimo").html('0');
    $("#stock_medicamento").html('0');
    $("#precio").html('0');
}

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td></tr>";
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
    Get_StockbyId(objMedicamentos[Nro].Insumo_Id);
    $("#cbo_Deposito").val(objMedicamentos[Nro].Deposito_Id);
    $("#cbo_Deposito").attr('disabled', 'disabled');
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    $("#txt_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#txt_Medicamento").attr('disabled', 'disabled');
    $("#Medicamento_val").html(objMedicamentos[Nro].Insumo_Id);
    $("#cbo_Monodroga").val(objMedicamentos[Nro].Monodroga);
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
    var json = JSON.stringify({ "PedidoId": Pedido_Id });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/Farmacia.asmx/Delete_PPS_Det",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Insert_Detalles,
            error: errores
        });
    }

    function Insert_Detalles() {
        var json = JSON.stringify({ "IdPedido": Pedido_Id, "objMedicamentos": objMedicamentos, "Modifica": Pedido_Id });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/Farmacia.asmx/Insert_PPS_Det",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Insert_PPS_Det_Cargado,
            error: errores
        });
    }

function Insert_Pedido() {
    var f = {};
    f.Servicio_Id = $("#cbo_Servicio :selected").val();
    f.Pedido_Id = Pedido_Id;
    var json = JSON.stringify({ "f": f });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Insert_PPS_Cab",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_PPS_Cab_Cargado,
        error: errores
    });

}

function Insert_PPS_Cab_Cargado(Resultado) {
    var IdPedido = Resultado.d;
    if (Pedido_Id == undefined) Pedido_Id = -1;
    var json = JSON.stringify({ "IdPedido": IdPedido, "objMedicamentos": objMedicamentos, "Modifica": Pedido_Id });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Insert_PPS_Det",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_PPS_Det_Cargado,
        error: errores
    });
}

function Insert_PPS_Det_Cargado(Resultado) {
    var Id = Resultado.d;
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/PPS_Print.aspx?Id=' + Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "CargarPPS.aspx";
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
        window.location = "BuscarPPS.aspx";
    });