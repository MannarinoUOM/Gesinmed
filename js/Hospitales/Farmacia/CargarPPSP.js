var sourceArr = [];
var mapped = {};
var listaPedido = {};
var editando = 0;
var indice = 0;
var servicioId = 0;

var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var Pedido_Id = 0;
var Servicio_Id_Aux = 0;
var Insumo;
var Contenido;

var rubroId = 0;
var servicioId = 0;
var existe = false;
var listaPedidoAUX = [];

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
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            }

        });
}


//$(".numero").keydown(function (e) {
//    alert();
//    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//            (e.keyCode == 65 && e.ctrlKey === true) ||
//            (e.keyCode >= 35 && e.keyCode <= 40)) {
//        return;
//    }
//    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//        e.preventDefault();
//    }
//});




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
    //$("#btnConfirmarPedido").attr("disabled", true);
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
       // if (i == Medicamentos.length - 1) $("#cbo_Medicamento").removeAttr("disabled");
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
    //$("#btnConfirmarPedido").attr("disabled", true);
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

//$("#btnAgregarMedicamento").click(function () {
//    //    var valid = $("#frm_Cantidad").valid();
//    //    if (valid && $("#Medicamento_val").html() != '0') {
//    //        RemoveClass();
//    //        Codigo = $("#Medicamento_val").html();
//    //        if (Existe(Codigo)) return;
//    //        Nombre = $("#txt_Medicamento").val();
//    //        Cantidad = parseInt($("#cantidad").val());
//    //        StockMinimo = $("#stock_minimo").html();
//    //        Stock = $("#stock_medicamento").html();
//    //        Precio = $("#precio").html();
//    //        var Deposito = $("#cbo_Deposito :selected").val();
//    //        var Cual = Total;
//    //        if (Editando == 1) {
//    //            Cual = EditandoPos;
//    //        }
//    //        else {
//    //            Total = Total + 1;
//    //            Cual = Total;
//    //        }
//    //        objMedicamento = {};
//    //        objMedicamento.Insumo_Id = Codigo;
//    //        objMedicamento.Deposito_Id = Deposito;
//    //        objMedicamento.Cantidad = Cantidad;
//    //        objMedicamento.StockMinimo = StockMinimo;
//    //        objMedicamento.Stock = Stock;
//    //        objMedicamento.Estado = 1;
//    //        objMedicamento.Nombre = Nombre;
//    //        objMedicamento.Precio = Precio;
//    //        objMedicamento.Monodroga = $("#cbo_Monodroga :selected").val();
//    //        objMedicamentos[Cual] = objMedicamento;
//    //        RenderizarTabla();
//    //        Editando = 0;
//    //        EditandoPos = -1;
//    //        LimpiarCampos();
//    //    }
//    if (editando == 1) { 
//    
//    }
//});

//function Existe(Algo) {
//    for (var i = 0; i <= Total; i++) {
//        if (objMedicamentos[i].Insumo_Id == Algo && objMedicamentos[i].Estado == 1 && Editando != 1) {
//            alert("Ya ha cargado el Medicamento Nro: " + Algo);
//            LimpiarCampos();
//            $("#cbo_Medicamento").focus();
//            return true;
//        }
//    }
//    return false;
//}

function LimpiarCampos() {
    if (objMedicamento.length > 0)
    //$("#btnConfirmarPedido").removeAttr("disabled");
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
    //if (objMedicamentos.length > 0) $("#btnConfirmarPedido").removeAttr("disabled");
    //else $("#btnConfirmarPedido").attr("disabled", true);
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    //$("#btnConfirmarPedido").attr("disabled", true);
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
    editando = 0;
    $("#btnAgregarMedicamento").attr('value', 'Aceptar');
    $("#btnCancelarMedicamento").attr('value', 'Cancelar');
    $("#cbo_Medicamento").val("");
    $("#cbo_Medicamento").attr('disabled', false);
    $("#txt_Medicamento").val("");
    $("#Medicamento_val").html("");
    $("#stock_minimo").val("");
    //    Editando = 0;
    //    EditandoPos = -1;
    //    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    //    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    //    if (objMedicamentos.length > 0) $("#btnConfirmarPedido").removeAttr("disabled");
    //    LimpiarCampos();
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
        //        if (objMedicamentos.length > 0) {
        //            if (Pedido_Id > 0) Delete_Detalles();
        //            else Insert_Pedido();
        //        }
        //        else alert("No hay Medicamentos en la Lista");
        var total = 0;
        $.each(listaPedido, function (index, item) {
            //alert(listaPedido[index].idPlantilla);

            //alert($("#pedido" + listaPedido[index].id).val());
            listaPedido[index].cantidad = $("#pedido" + listaPedido[index].idPlantilla).val();
            if (listaPedido[index].cantidad == "")
                listaPedido[index].cantidad = 0;

            total = total + listaPedido[index].cantidad;
        });
        if (total <= 0) { alert("Ingrese alguna cantidad para el pedido."); return false; }
        Insert_Pedido();
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
    var json = JSON.stringify({ "IdPedido": Pedido_Id, "objMedicamentos": listaPedido, "Modifica": Pedido_Id });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/PPSP.asmx/Insert_PPS_Det",
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
    var json = JSON.stringify({ "IdPedido": IdPedido, "objMedicamentos": listaPedido, "Modifica": Pedido_Id });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/PPSP.asmx/Insert_PPS_Det",
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
                window.location.href = "CargarPPSP.aspx";
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
    window.location = "BuscarPPS.aspx?plantilla=1";
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#cbo_Servicio").change(function () {
    servicioId = $(this).val();
    CargarCoMboRubros(servicioId);
});

function CargarCoMboRubros(id) {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/PPSP.asmx/TraerRubrosCombo",
        data: '{servicioId: "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var lista = resultado.d;
            $("#cbo_Rubro").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cbo_Rubro").append(new Option(item.descripcion, item.id));
            });
        },
        error: errores
    });
}

$("#cbo_Rubro").change(function () {
    if ($(this).val() == 0) {
        $("#cbo_Medicamento").val("");
        $("#txt_Medicamento").val("");
        $("#Medicamento_val").html("");
        $("#stock_minimo").val("");

        $("#cbo_Medicamento").attr('disabled', true);
        $("#stock_minimo").attr('disabled', true);
        $("#btnCancelarMedicamento").attr('disabled', true);
        $("#btnAgregarMedicamento").attr('disabled', true);
    } else {
        $("#cbo_Medicamento").attr('disabled', false);
        $("#stock_minimo").attr('disabled', false);
        $("#btnCancelarMedicamento").attr('disabled', false);
        $("#btnAgregarMedicamento").attr('disabled', false);

    }
    rubroId = $(this).val();
    var json = JSON.stringify({ "servicioId": servicioId, "rubroId": rubroId });
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/PPSP.asmx/TraerPlantilla",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            listaPedido = resultado.d;
            //////////////////////comparar

            cargarTabla(listaPedido);
        },
        complete: function () {
            //$('.numero3').mask("9999",{ placeholder: " " });
        },
        error: errores
    });
});

function cargarTabla(lista) {
   // alert(lista.length + " / " + listaPedidoAUX.length);
    $.each(listaPedidoAUX, function (index1, item1) {   
        $.each(lista, function (index2, item2) {
            if (item1.idPlantilla == item2.idPlantilla) {
                
                item2.stock_actual = item1.stock_actual;
                item2.pedido = item1.pedido;
            }
        });
    });
    $("#TablaMedicamentos").empty();
    var Contenido = "";
    var Pie = "";
    var Encabezado = "";
    //var cont = lista.length - 1;
    Encabezado = ""; // "<table class='table' style='width: 100%;'><thead><tr><th style='width:63%'>Insumo</th><th>Pedido</th><th>Stock Actual</th><th>Stock Minimo</th></tr></thead><tbody>"
    $.each(lista, function (index, item) {
        //alert(item.pedido);
        Contenido = Contenido + "<tr style='width:100%' id='" + item.idPlantilla + "'>" +
        "<td style='width:3%; text-align:center'><b>" + (index + 1) + "</b></td>" +
        "<td style='cursor:auto;width:9%'><a id='Editar" + item.idPlantilla + "' onclick='Edita(" + item.idPlantilla + ");' class='btn btn-mini' rel='tooltip' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + item.idPlantilla + "'onclick='Eliminar(" + index + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Insumo' style='float:right'><i class='icon-remove-circle icon-white'></i></a></td>" +
        "<td style='cursor:auto;width:63%'> " + item.servicio + " </td>" +
        "<td style='cursor:auto; width:8%; text-align:center'><input id='pedido" + item.idPlantilla + "' style='text-align:center; margin-bottom:3px' type='text' class='input-mini numero2 agregar' value='" + item.pedido + "' tabindex='" + index + "' maxlength='4'/></td>" +
        "<td style='cursor:auto; width:8%; text-align:center'><input id='actual" + item.idPlantilla + "' onkeyup='calcular(" + item.idPlantilla + ")' style='text-align:center; margin-bottom:3px' type='text' class='input-mini numero2 c_txt_actual' value='" + item.stock_actual + "' maxlength='4'/></td>" +
        "<td style='cursor:auto; width:8%; text-align:center'><input id='minimo" + item.idPlantilla + "' style='text-align:center; margin-bottom:3px' type='text' class='input-mini' value='" + item.stock_minimo + "' disabled='disabled'/></td>"
        // cont--;
    });
    Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
    // restablecerControles();

}

$('#TablaMedicamentos input').live('focus', function () {
   // alert("asdasd");
    $('#TablaMedicamentos').scrollTo(this, 100);
});

$.fn.scrollTo = function (elemento, speed) {
  //  alert("asdasd");
    $(this).animate({
        scrollTop: $(this).scrollTop() - $(this).offset().top + $(elemento).offset().top - 50
    }, speed == undefined ? 1000 : speed);
};

function Eliminar(index) {
    indice = index
    //listaPedido.splice(indice, 1);

    objMedicamento = {};
    objMedicamento.idPlantilla = listaPedido[indice].idPlantilla;
    objMedicamento.insumoId = listaPedido[indice].insumoId;
    objMedicamento.stock_minimo = 0;
    objMedicamento.servicio = listaPedido[indice].servicio;
    objMedicamento.ruboId = $("#cbo_Rubro").val();
    objMedicamento.servicioId = servicioId;

    var json = JSON.stringify({ "insumo": objMedicamento, "qHace": 1 });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/PPSP.asmx/GuardarActualizarBorrarPlantilla",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            listaPedido.splice(indice, 1);
            cargarTabla(listaPedido);
            //$("#" + index).hide();
        },
        complete: function () {
            $("#cbo_Medicamento").val("");
            $("#txt_Medicamento").val("");
            $("#Medicamento_val").html("");
            $("#stock_minimo").val("");
        },
        error: errores
    });


    //listaPedido[indice].stock_minimo = $("#stock_minimo").val();
    //cargarTabla(listaPedido);
    editando = 0;
 }
 function Edita(index) {
     $("#btnAgregarMedicamento").attr('value', 'Aceptar Edición');
     $("#btnCancelarMedicamento").attr('value', 'Cancelar Edición');


     indice = index;

     editando = 1;

     $.each(listaPedido, function (index, item) {
         if (item.idPlantilla == indice) {
            // alert(item.stock_minimo);
                 $("#cbo_Medicamento").val(item.servicio);
                 $("#cbo_Medicamento").attr('disabled', true);
                 $("#stock_minimo").val(item.stock_minimo);
         }
     });
//    $("#cbo_Medicamento").val(listaPedido[indice].servicio);
//    $("#cbo_Medicamento").attr('disabled', true);
//    $("#stock_minimo").val(listaPedido[indice].stock_minimo);
}

$("#btnAgregarMedicamento").click(function () {/////////////////////////////////////

    if (editando == 1) {

        //        $.each(listaPedido, function (index, item) {
        //            if (listaPedido[index].insumoId == $("#Medicamento_val").html()) {
        //                alert("El insumo ya existe en la plantilla.");
        //                $("#cbo_Medicamento").val("");
        //                $("#cbo_Medicamento").attr('disabled', false);
        //                $("#txt_Medicamento").val("");
        //                $("#Medicamento_val").html("");
        //                $("#stock_minimo").val("");
        //                existe = true;
        //                return false;
        //            }
        //        });
        //        if (existe == true) { existe = false; return false; }
        //        if ($("#Medicamento_val").html() == "0") {
        //            alert("Ingrese un insumo valido.");
        //            $("#cbo_Medicamento").val("");
        //            $("#txt_Medicamento").val("");
        //            $("#Medicamento_val").html("");
        //            $("#stock_minimo").val("");
        //            return false;
        //        }
        if ($("#stock_minimo").val() == 0) { alert("Ingrese un Stock Minimo."); editando = 0; return false; }
        objMedicamento = {};
        $.each(listaPedido, function (index, item) {
            if (item.idPlantilla == indice) {
                objMedicamento.idPlantilla = item.idPlantilla;
                objMedicamento.insumoId = item.insumoId;
                objMedicamento.servicio = item.servicio;
            }
        });
        //        objMedicamento.idPlantilla = listaPedido[indice].idPlantilla;
        //        objMedicamento.insumoId = listaPedido[indice].insumoId;
        objMedicamento.stock_minimo = $("#stock_minimo").val();
        //        objMedicamento.servicio = listaPedido[indice].servicio;
        objMedicamento.ruboId = $("#cbo_Rubro").val();
        objMedicamento.servicioId = servicioId;

        var json = JSON.stringify({ "insumo": objMedicamento, "qHace": 0 });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/PPSP.asmx/GuardarActualizarBorrarPlantilla",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                $("#minimo" + indice).val(objMedicamento.stock_minimo);
                //alert($("#actual" + indice).val() + "/" + objMedicamento.stock_minimo);
                if ($("#actual" + indice).val() <= objMedicamento.stock_minimo) {
                    $("#pedido" + indice).val(objMedicamento.stock_minimo - $("#actual" + indice).val());
                } else {
                    $("#actual" + indice).val("0");
                    $("#pedido" + indice).val("0");
                }
                //listaPedido.slice(indice, 1);
                //alert($("#minimo" + indice).val());
                //alert($("#minimo" + 1).val());
                //                alert(indice);
                //                return false;
                //cargarTabla(listaPedido); ////////////////////////////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            },
            complete: function () {
                $("#cbo_Medicamento").val("");
                $("#cbo_Medicamento").attr('disabled', false);
                $("#txt_Medicamento").val("");
                $("#Medicamento_val").html("");
                $("#stock_minimo").val("");
                $("#btnAgregarMedicamento").attr('value', 'Aceptar');
                $("#btnCancelarMedicamento").attr('value', 'Cancelar');
            },
            error: errores
        });


        listaPedido[indice].stock_minimo = $("#stock_minimo").val();

        //cargarTabla(listaPedido);
        editando = 0;
    } else {//////////////////////////////////////////////////////////////////
       // $("#btnConfirmarPedido").hide();
        $.each(listaPedido, function (index, item) {
            if (listaPedido[index].insumoId == $("#Medicamento_val").html()) {
                alert("El insumo ya existe en la plantilla.");
                $("#cbo_Medicamento").val("");
                $("#cbo_Medicamento").attr('disabled', false);
                $("#txt_Medicamento").val("");
                $("#Medicamento_val").html("");
                $("#stock_minimo").val("");
                existe = true;
                return false;
            }
        });
        if (existe == true) { existe = false; return false; }
        if ($("#Medicamento_val").html() == "0") {
            alert("Ingrese un insumo valido.");
            $("#cbo_Medicamento").val("");
            $("#txt_Medicamento").val("");
            $("#Medicamento_val").html("");
            $("#stock_minimo").val("");
            return false;
        }
        if ($("#stock_minimo").val() == 0) { alert("Ingrese un Stock Minimo."); return false; }
        objMedicamento = {};
        objMedicamento.idPlantilla = 0;
        objMedicamento.insumoId = $("#Medicamento_val").html();
        objMedicamento.stock_minimo = $("#stock_minimo").val();
        objMedicamento.stock_actual = 0;
        objMedicamento.pedido = 0;
        objMedicamento.servicio = $("#txt_Medicamento").val();
        objMedicamento.ruboId = $("#cbo_Rubro").val();
        objMedicamento.servicioId = servicioId;

        //        alert(o bjMedicamento.idInsumo + "/" + objMedicamento.servicioId + "/" + objMedicamento.ruboId)

        //        return false;
        var json = JSON.stringify({ "insumo": objMedicamento, "qHace": 0 });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/PPSP.asmx/GuardarActualizarBorrarPlantilla",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                listaPedido.push(objMedicamento);
                cargarTabla(listaPedido);
            },
            complete: function () {
                $("#cbo_Medicamento").val("");
                $("#txt_Medicamento").val("");
                $("#Medicamento_val").html("");
                $("#stock_minimo").val("");
            },
            error: errores
        });
    }
    indice = 0;
});


//$(".calcular").live('keypress',function (e) {   
//     alert($(this).val());
//       
// });

$("#TablaMedicamentos")

function calcular(id) {

   //alert($("#actual" + id).val().length);return false;
    if ($("#actual" + id).val().length == 0) {$("#actual" + id).val("0"); }
    var pedido = $("#pedido" + id).val();
    var minimo = $("#minimo" + id).val();
    var actual = $("#actual" + id).val();    
    //alert("minimo:" + minimo);
    //alert("actual:" + actual);
    if (minimo >= actual) {
        $("#pedido" + id).val(minimo - actual)
    } else { alert("Stock actual ingresado mayor al minimo."); $("#pedido" + id).val(0); $("#actual" + id).val(0); }

}

$(".c_txt_actual").live("focusout", function () {
    
    var id = $(this).attr("id").replace("actual", "");
    // alert($("#actual" + id).val());
    if ($("#actual" + id).val().length == 0) { $("#actual" + id).val("0"); }
    var pedido = $("#pedido" + id).val();
    var minimo = $("#minimo" + id).val();
    var actual = $("#actual" + id).val();
    //alert("minimo:" + minimo);
    //alert("actual:" + actual);
    if (actual == 0) { return false; }
    if (parseInt(minimo) >= parseInt(actual)) {
        $("#pedido" + id).val(minimo - actual)


        $.each(listaPedidoAUX, function (index, item) {
            //alert(id + " / " + item.idPlantilla);
            if (id == item.idPlantilla) { listaPedidoAUX.splice(index, 1); }
        });
        objMedicamento = {};
        objMedicamento.idPlantilla = id;
        objMedicamento.stock_minimo = minimo;
        objMedicamento.stock_actual = actual;
        objMedicamento.pedido = $("#pedido" + id).val();
        listaPedidoAUX.push(objMedicamento);
        //$.each(listaPedidoAUX, function (index, item) { alert("recorriendo"); });

    } else {
        alert("Stock actual ingresado mayor al minimo."); $("#pedido" + id).val(0); $("#actual" + id).val(0);
        $("#actual" + id).focus();
        return;
    }



});

$(".numero2").live('keydown', function (e) {
//    alert(e.keyCode);
//    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
//            (e.keyCode == 65 && e.ctrlKey === true) ||
//            (e.keyCode >= 35 && e.keyCode <= 40)) {
//        //alert(e.keyCode);
//        return;
//    }
//        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && (e.keyCode == 189 || e.keyCode == 190)) {
//           // alert();
//            //e.preventDefault();
//        }
//    if ($.inArray(e.keyCode, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]) == -1) {
//        //alert();
//        e.preventDefault();
    //    }
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$("#btnImprimir2").click(function () {
//    var json = JSON.stringify({ "servicioId": servicioId, "rubroId": rubroId });
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/../Impresiones/PlanillaPPSP.aspx?servicioId=' + servicioId + "&rubroId=" + rubroId + "&PDF=1",
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
});

$(".agregar").live('keyup', function (e) {
    //alert(e.keyCode);

    // alert($("#actual" + id).val());
    var id = $(this).attr("id").replace("pedido", "");
    // if ($("#pedido" + id).val().length == 0) { $("#pedido" + id).val("0"); }
    var pedido = $("#pedido" + id).val();
    var minimo = $("#minimo" + id).val();
    var actual = $("#actual" + id).val();
    //alert("minimo:" + minimo);
    //alert("actual:" + actual);
    //if (actual == 0) { return false; }
    //    if (parseInt(minimo) >= parseInt(actual)) {
    //        $("#pedido" + id).val(minimo - actual)


    $.each(listaPedidoAUX, function (index, item) {
        //alert(id + " / " + item.idPlantilla);
        if (id == item.idPlantilla) { listaPedidoAUX.splice(index, 1); }
    });
    objMedicamento = {};
    objMedicamento.idPlantilla = id;
    objMedicamento.stock_minimo = minimo;
    objMedicamento.stock_actual = actual;
    objMedicamento.pedido = $("#pedido" + id).val();
    //alert(objMedicamento.idPlantilla + " / " + objMedicamento.stock_minimo + " / " + objMedicamento.stock_actual + " / " + objMedicamento.pedido);
    listaPedidoAUX.push(objMedicamento);
    //$.each(listaPedidoAUX, function (index, item) { alert("recorriendo"); });

    //    } else {
    //        alert("Stock actual ingresado mayor al minimo."); $("#pedido" + id).val(0); $("#actual" + id).val(0);
    //        $("#actual" + id).focus();
    //        return;
    //    }
});