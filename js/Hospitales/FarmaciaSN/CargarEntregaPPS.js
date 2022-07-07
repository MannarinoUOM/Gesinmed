var Pedido_Id = 0;
var Servicio_Id_Aux;
var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var objMedicamentos2 = {};
var Entregados = {};
var objEntregados = new Array();
var objEntregados2 = {};
var Contenido = "";
var Pendiente;
var Egr_Id = 0;
var NroEntrega = 0;
var RemitoId = "Provisorio";

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

//$.validator.addMethod("greaterThan",
//    function (value, min) {
//        return parseInt(value) > parseInt($(min).val());
//    }
//);

$(document).ready(function () {
    $("#frm_Cantidad").validate({
        rules: {
            'cantidadent': { required: true, number: true, range: [1, 9999] }
        },
        messages: {
            'cantidadent': { required: '', number: '', range: '' }
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
    $("#btnConfirmarEntrega").attr("disabled", true);
    var Query = {};
    Query = GetQueryString();
    Pedido_Id = Query['Id'];
    Cargar_Medicamentos(false);
    $("#cbo_Medicamento").attr('disabled', 'disabled');
    $("#cantidad").attr('readonly', true);
    if (Pedido_Id > 0) {
        LoadPedido();
    }
});

function RemoveClass() {
    $("#controlcantidadent").removeClass("error");
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
        $("#btnConfirmarEntrega").show();
        //$("#btnImprimir").show();
    }
    else { //Pedido Completo
        $("#btnConfirmarEntrega").hide();
        //$("#btnImprimir").show();
    }
}

function LoadPedido() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Buscar_PPS_by_PedidoId",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedido_Cargado,
        error: errores,
        beforeSend: function () {
            $("#cargando2").show();
            $("#cont_datospac").hide();
        },
        complete: function () {
            $("#cargando2").hide();
            $("#cont_datospac").show();
            $('#desdeaqui').click();
        }
    });
}

function LoadPedido_Cargado(Resultado) {
    var PedidoCab = {};
    PedidoCab = Resultado.d;
    $("#CargadoServicio").html(PedidoCab.Servicio);
    $("#CargadoNumero").html(PedidoCab.Pedido_Id);
    $("#CargadoFecha").html(PedidoCab.Fecha);
    Servicio_Id_Aux = PedidoCab.Servicio_Id;
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    LoadDetalles();
    EstaPendiente();//Verifico si el pedido esta pendiente
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function LoadDetalles() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/BuscarPPP_byPedidoid_Det",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedidoDet_Cargado,
        error: errores
    });
}

function LoadPedidoDet_Cargado(R) {
    var Detalles = R.d;
    Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {
        Get_StockbyId(Detalle.Insumo_Id);
        var json = JSON.stringify({ "DetalleId": Detalle.Pedido_Id, "InsumoId": Detalle.Insumo_Id });
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/Buscar_Egr_Det",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Ent = Resultado.d;
                if (Ent != null) {
                    $("#CargadoEntrega").html(Ent.RED_REM_ID);
                    $("#btnHistorial").show();
                    var Saldo = parseInt(Detalle.Cantidad) - parseInt(Ent.CANTIDAD);
                    Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a></td><td> " + Detalle.Nombre + "-" + Detalle.Gramaje + Detalle.Medida + "-" + Detalle.Presentacion + " </td><td> " + Detalle.Cantidad + " </td><td> " + Ent.CANTIDAD + " </td><td> " + Saldo + " </td><td> " + Detalle.EnStock + " </td><td> " + Ent.OBSERVACIONES + " </td></tr>";
                }
                else {
                    Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a></td><td> " + Detalle.Nombre + "-" + Detalle.Gramaje + Detalle.Medida + "-" + Detalle.Presentacion + " </td><td> " + Detalle.Cantidad + " </td><td> " + '0' + " </td><td> " + parseInt(Detalle.Cantidad) + " </td><td> " + Detalle.EnStock + " </td><td> " + ' ' + " </td></tr>";
                }
                Detalle.Nombre = Detalle.Nombre + "-" + Detalle.Gramaje + Detalle.Medida + "-" + Detalle.Presentacion;
                objMedicamentos[i] = Detalle;
                if (i == Detalles.length - 1) {
                    Contenido = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Pedido</th><th>Entregado</th><th>Saldo</th><th>En Stock</th><th>Observaciones</th></tr></thead><tbody>" + Contenido + "</tbody></table>";
                    $("#TablaMedicamentos").html(Contenido);
                }
                objMedicamentos[i].Estado = 1;
                objEntregados[i] = Ent;
                Total = Total + 1;
                i = i + 1;
            },
            error: errores,
            beforeSend: function () {
                $("#cargando").show();
                $("#TablaMedicamentos").hide();
            },
            complete: function () {
                $("#cargando").hide();
                $("#TablaMedicamentos").show();
            }
        });
    });
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#cbo_Medicamento").attr('disabled', 'disabled');
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    Get_StockbyId(objMedicamentos[Nro].Insumo_Id);
    $("#cbo_Medicamento option[value=" + objMedicamentos[Nro].Insumo_Id + "]").attr("selected", true);
    $("#cantidadent").val("0");
    $("#txt_CantidadAnterior").val('0');
    $("#Observaciones").val("");
    if (objEntregados[Nro].CANTIDAD >= 0) {
        $("#txt_CantidadAnterior").val(objEntregados[Nro].CANTIDAD);
        $("#cantidadent").val(objEntregados[Nro].CANTIDAD);
        $("#Observaciones").val(objEntregados[Nro].OBSERVACIONES);
        var StockFut = parseInt($("#stock_medicamento").html()) - objEntregados[Nro].CANTIDAD;
        $("#stock_futuro").html(StockFut);
    }
}

$("#EntregasModal").on('show', function () {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/VerHistorialdeEntrega",
        data: '{RemitoId: "' + $("#CargadoEntrega").html() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Entregas = Resultado.d;
            var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro. Entrega</th><th>Fecha</th><th>Usuario</th></tr></thead><tbody>";
            var Contenido = "";
            $.each(Entregas, function (index, Entrega) {
                Contenido = Contenido + "<tr onclick=LoadRemito(" + Entrega.NRO_ENTREGA + ")><td>" + Entrega.NRO_ENTREGA + " </td><td> " + Entrega.FECHA + " </td><td>" + Entrega.USUARIO + " </td></tr>";
            });
            var Pie = "</tbody></table>";
            $("#TablaEntregas_div").html(Encabezado + Contenido + Pie);
        },
        error: errores
    });
});

function LoadRemito(Entrega) {
    $.fancybox(
                {
                    'autoDimensions': false,
                    'href': '../Impresiones/EntregasPPPImpresion.aspx?Id=' + $("#CargadoEntrega").html() + "&Nro=" + Entrega,
                    'width': '75%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false
//                    'onClosed': function () {
//                        window.location.href = "EntregasPPS.aspx";
//                    }
                });
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

function Eliminar(Nro) {
    objMedicamentos[Nro].Estado = 0;
    LimpiarCampos();
    Editando = 0;
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
    RenderizarTabla();
}

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

$("#cbo_Medicamento").change(function () {
    Get_StockbyId($('#cbo_Medicamento option:selected').val());
});

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

function Get_Insumo_by_Id_Cargado(Resultado) {
    var Insumo = Resultado.d;
    if (Insumo != null)
        $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
    else $("#stock_medicamento").html('0');
}

$("#btnAgregarMedicamento").click(function () {
    var valid = $("#frm_Cantidad").valid();
    if (valid) {
        RemoveClass();
        var cant = parseInt($("#cantidadent").val()) + parseInt($("#txt_CantidadAnterior").val());
        var stock = parseInt($("#stock_medicamento").html());
        if (parseInt($("#cantidad").val()) >= cant) {
            if (parseInt($("#cantidadent").val()) <= stock) {
                Codigo = $("#cbo_Medicamento :selected").val();
                Nombre = $("#cbo_Medicamento :selected").text();
                Cantidad = parseInt($("#cantidad").val());

                //Cant_Ent = parseInt($("#cantidadent").val());
                Cant_Ent = cant;
                Observaciones = $("#Observaciones").val().trim().toUpperCase();
                EnStock = $("#stock_medicamento").html();
                var Estado = 1;
                var Cual = Total;
                if (Editando == 1) {
                    Cual = EditandoPos;
                }
                else {
                    Total = Total + 1;
                    Cual = Total;
                }
                Detalle_Id = objMedicamentos[Cual].Detalle_Id;
                objMedicamento = {};
                Entregados = {};

                objMedicamento.Insumo_Id = Codigo;
                objMedicamento.Cantidad = Cantidad;
                objMedicamento.Estado = Estado;
                objMedicamento.Nombre = Nombre;
                objMedicamento.EnStock = EnStock;
                objMedicamentos[Cual] = objMedicamento;
                Entregados.Cant_Entrega = parseInt($("#cantidadent").val()); //Lo que entrego del insumo en la entrega
                Entregados.CANTIDAD = Cant_Ent;
                Entregados.INSUMO_ID = Codigo;
                Entregados.RED_DET_ID = Detalle_Id;
                Entregados.OBSERVACIONES = Observaciones;
                Entregados.RED_REM_ID = Pedido_Id;
                objEntregados[Cual] = Entregados;
                RenderizarTabla();
                Editando = 0;
                EditandoPos = -1;
                $("#btnConfirmarEntrega").removeAttr("disabled");
                LimpiarCampos();
            }
            else alert("No hay suficiente stock.");
        }
        else alert("Cantidad Entregada Supera a Cantidad Pedida");
    }
});

$("#btnCancelarMedicamento").click(function () {
    LimpiarCampos();
    Editando = 0;
    EditandoPos = -1;
});

function LimpiarCampos() {
    $("#stock_medicamento").html("");
    $("#stock_futuro").html("");
    $("#Observaciones").val("");
    $("#cantidadent").val("");
    $("#cbo_Medicamento").val("0");
    $("#cantidad").val("");
    $("#txt_CantidadAnterior").val("0");
}

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Pedido</th><th>Entregado</th><th>Saldo</th><th>En Stock</th><th>Observaciones</th></tr></thead><tbody>";
    Contenido = "";

    for (var i = 0; i <= Total; i++) {
        if (objEntregados[i] != null) {
            var saldo = objMedicamentos[i].Cantidad - objEntregados[i].CANTIDAD;
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a></td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> " + objEntregados[i].CANTIDAD + " </td><td> " + saldo + " </td><td> " + objMedicamentos[i].EnStock + " </td><td> " + objEntregados[i].OBSERVACIONES + " </td></tr>";
        }
        else
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a></td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> " + '0' + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> " + objMedicamentos[i].EnStock + " </td><td> " + '' + " </td></tr>";
    }

    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

$("#btnConfirmarEntrega").click(function () {
    if (confirm("¿Desea confirmar la entrega?")) {
        VerificarPendiente();
        Insert_Egr_Cab();
    }
});

function VerificarPendiente() {
    var Pedido = 0;
    var Entregado = 0;
    for (var k = 0; k <= Total; k++) {
        Pedido = Pedido + parseInt(objMedicamentos[k].Cantidad);
        if (objEntregados[k] != null)
            Entregado = Entregado + parseInt(objEntregados[k].CANTIDAD);
        else
            Entregado = Entregado + 0;
    }
    if (Entregado >= Pedido) Pendiente = false;
    else Pendiente = true;
}

function Insert_Egr_Cab() {
    var f = {};
    f.REM_SER_ID = Servicio_Id_Aux;
    f.PED_ID = Pedido_Id;

    var json = JSON.stringify({ "f": f });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Insert_Egr_Cab",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetNroEntregaForRemito,
        error: errores
    });
}

function GetNroEntregaForRemito(Resultado) {
    Egr_Id = Resultado.d;
    if (Egr_Id > 0) {
        var json = JSON.stringify({ "RemitoId": Egr_Id });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/Farmacia.asmx/GetNroEntregaforRemito",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Insert_Remitos_Cab_Cargado,
            error: errores
        });
    }
}

function Insert_Remitos_Cab_Cargado(Resultado) {
    var n = Resultado.d; 
        var json = JSON.stringify({ "objEntregados": objEntregados, "Tipo": "PPS", "NroEnt": n });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/Farmacia.asmx/Insert_Egr_Det",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: LastNroEntrega,
            error: errores
        });
}

function LastNroEntrega () {
    var json = JSON.stringify({ "RemitoId": Egr_Id });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/GetLastEntregaId",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Egr_Det_Cargado,
        error: errores
    });
}


function Insert_Egr_Det_Cargado(Resultado) {
    NroEntrega = Resultado.d; //Es el numero de entrega de la entrega en cuestion
    var json = JSON.stringify({ "Id": Pedido_Id, "Pendiente": Pendiente });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/UpdatePedidoPendiente",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Print,
        error: errores
    });
}

    function Print() {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/EntregasPPPImpresion.aspx?Id=' + Egr_Id + "&Nro=" + NroEntrega,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "EntregasPPS.aspx";
            }
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
            beforeSend: function(){
                $("#stock_medicamento").html('0');
            },
            error: errores
        });
    }

    function Get_StockbyId_Cargado(Resultado) {
        var Insumo = Resultado.d;
        $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
    }