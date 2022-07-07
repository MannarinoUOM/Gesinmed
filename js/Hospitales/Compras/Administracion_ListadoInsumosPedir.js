var oTabla;

$.fn.selectText = function () {
    var doc = document;
    var element = this[0];
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};


$(document).ready(function () {
    InitControls();
});

//Buscar Cabecera
function Buscar_Pedidos(Desde, Hasta, Servicio, NroPedido) {
    if (Desde.length == 0) Desde = "01/01/1900";
    if (Hasta.length == 0) Hasta = "01/01/1900";
    if (NroPedido.length == 0) NroPedido = 0;
    if (Servicio.length == 0) Servicio = 0;

    var json = JSON.stringify({ "Desde": Desde, "Hasta": Hasta, "ServicioId": Servicio, "NroPedido": NroPedido, "Todos": false }); //Solo los que estan pedientes de pedir
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_LIST_DET_ORDEN",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Pedidos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $.each(Pedidos, function (index, exp) {
                Tabla_Datos += "<tr class='tr_CAB' data-id='" + exp.PED_COM_ID + "'><td style='display:none;'><td>" + exp.PED_COM_ID + "</td><td>" + exp.PED_COM_FECHA + "</td><td>" + exp.SERV_DESCRIPCION + "</td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#cabecera").html(Tabla_Datos + Tabla_Fin);
            $("#lbl_CantidadReg").html(Pedidos.length);
        },
        beforeSend: function () {
            $("#cargando").show();
            $(".datosEXP").hide();
            $("#TablaPedidos").hide();
            $("#3").hide();
            $("#lbl_CantidadReg").html("0");
            //$(".input-exp").val("");
            $("#TablaDetalles").hide();
        },
        complete: function () {
            $("#cargando").hide();
            MostrarTablas(true);

            $(".datosEXP").show();
            $(".sorting_asc").click();
            $(".sorting_desc").click();
        },
        error: errores
    });
}

function MostrarTablas(Cab) {
    if (Cab) {
        $(".cabecera").show();
        $(".detalles").hide();
    }
    else {
        $(".cabecera").hide();
        $(".detalles").show();
    }
}

$(document).on("click", ".tr_CAB", function () {
    Buscar_PedidosDET($(this).data("id"));
    $("#nroPedido").val($(this).data("id"));
});


function Buscar_PedidosDET(NroPedido) {
    if (NroPedido.length == 0) {alert("Ingrese Nro. de Pedido.");return false;}

    var json = JSON.stringify({ "NroPedido": NroPedido });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_LIST_DET_ORDEN_DET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Pedidos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $.each(Pedidos, function (index, exp) {
                var _Urg = "No";
                if (exp.Urgente) _Urg = "Si";
                List_Proveedores(exp.PED_COM_DET_ID);

                Tabla_Datos += "<tr class='trow' title='" + exp.PED_COM_DET_OBS + "' data-placement='bottom' data-id='" + exp.PED_COM_DET_ID + "'>" +
                "<td style='display:none; padding:0px 0px 0px 0px'><input style='display:none;' data-pedido='" + exp.PED_COM_DET_ID + "' data-id='" + exp.PED_COM_DET_ID + "' id='chk" + exp.PED_COM_DET_ID + "' class='checks' type='checkbox' value='" + exp.PED_COM_DET_ID + "'/></td>" +
                "<td style='padding:0px 0px 0px 0px' ><select id='TIPO_PEDIDO" + exp.PED_COM_DET_ID + "' style='width:50px; margin-bottom:0px; margin-top:0px' class='btn-mini' >" +
                "<option value='A'>A</option>" +
                "<option value='I'>I</option>" +
                "<select/></td>" +
                "<td style='padding:0px 0px 0px 0px' >" + exp.PED_COM_ID + "</td><td>" + exp.PED_COM_FECHA + "</td>" +
                "<td style='padding:0px 0px 0px 0px' >" + exp.SERV_DESCRIPCION + "</td>" +
                "<td style='padding:0px 0px 0px 0px'  id='COM_ADM_INS_PEDIR_INS_NOM" + exp.PED_COM_DET_ID + "'>" + exp.PED_COM_DET_INS_DESC + "</td>" +
                "<td style='padding:0px 0px 0px 0px'  id='PED_COM_DET_CANTIDAD" + exp.PED_COM_DET_ID + "'>" + exp.PED_COM_DET_CANTIDAD + "</td>" +
                "<td style='padding:0px 0px 0px 0px' id='COM_ADM_INS_PEDIR_CANT_PED" + exp.PED_COM_DET_ID + "' data-id=" + exp.PED_COM_DET_ID + " class='cant_pedida numero' maxlength='5' contenteditable>" + exp.COM_ADM_INS_PEDIR_CANT_PED + "</td>" +
                "<td style='padding:0px 0px 0px 0px'  class='SALDO' data-id='" + exp.PED_COM_DET_ID + "' id='SALDO" + exp.PED_COM_DET_ID + "'>" + exp.SALDO + "</td>";
                //Tabla_Datos += "<td class='ULTIMO_PRECIO' data-id='" + exp.PED_ULTIMO_PRECIO + "' id='ULTIMO_PRECIO" + exp.PED_COM_DET_ID + "'>$" + exp.PED_ULTIMO_PRECIO + "</td>" + "<td class='PRECIO_COMPRA_ACTUAL numero' data-id='" + exp.PED_COM_DET_ID + "' id='PRECIO_COMPRA_ACTUAL" + exp.PED_COM_DET_ID + "' contenteditable>" + exp.PRECIO_COMPRA_ACTUAL + "</td>";
                Tabla_Datos += "<td  style='padding:0px 0px 0px 0px' class='ULTIMO_PRECIO' data-id='" + exp.PED_ULTIMO_PRECIO + "' id='ULTIMO_PRECIO" + exp.PED_COM_DET_ID + "'>$" + exp.PRECIO_COMPRA_ACTUAL + "</td>" +
                "<td style='padding:0px 0px 0px 0px' class='PRECIO_COMPRA_ACTUAL numero' data-id='" + exp.PED_COM_DET_ID + "' id='PRECIO_COMPRA_ACTUAL" + exp.PED_COM_DET_ID + "' contenteditable>" + exp.PED_ULTIMO_PRECIO + "</td>";
                Tabla_Datos += "<td style='padding:0px 0px 0px 0px' class='TOTAL' data-id='" + exp.TOTAL + "' id='TOTAL" + exp.PED_COM_DET_ID + "'>$" + exp.TOTAL + "</td>" +
                "<td style='display:none; padding:0px 0px 0px 0px'' id='PED_COM_DET_INS_ID" + exp.PED_COM_DET_ID + "'>" + exp.PED_COM_DET_INS_ID + "</td>" +
                "<td style='display:none; padding:0px 0px 0px 0px'' id='PED_COM_DET_PRV_ID" + exp.PED_COM_DET_ID + "'>" + exp.PED_COM_DET_PRV_ID + "</td>" +
                "<td style='padding:0px 0px 0px 0px'><div  style='width:50px; margin-bottom:0px; margin-top:0px' class='span5' id='div_cbo_PRV" + exp.PED_COM_DET_ID + "'></div></td><td style='padding:0px 0px 0px 0px'></td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#detalles").html(Tabla_Datos + Tabla_Fin);
            $("#lbl_CantidadReg").html(Pedidos.length);
        },
        beforeSend: function () {
            $("#cargando").show();
            $(".datosEXP").hide();
            $("#TablaPedidos").hide();
            $("#TablaDetalles").hide();
            $("#lbl_CantidadReg").html("0");
        },
        complete: function () {
            $("#cargando").hide();
            MostrarTablas(false);
            $(".datosEXP").show();
            $(".sorting_asc").click();
            $(".sorting_desc").click();
        },
        error: errores
    });
}

$('body').tooltip({
    html:true,
    selector: ".trow",
    container: 'body'
});

$(document).on('change', '.combo_prv', function () {
    var index = $(this).data("id");
    $("#PED_COM_DET_PRV_ID" + index).html($(this).val());
});


$(document).on("focusout", "tr.trow td.cant_pedida", function (e) {
    var index = $(this).data("id");
    if (!ValidarCantidadPedida(index)) {
        $("#COM_ADM_INS_PEDIR_CANT_PED" + index).html("0");
        e.preventDefault();
    }
    else {
        var solicitado = $("#PED_COM_DET_CANTIDAD" + index).html();
        var pedido = $(this).html();
        $("#SALDO" + index).html(solicitado - pedido);
        if (ValidarCantidadPedida(index)) {
            $("#TOTAL" + index).html(parseFloat($("#PRECIO_COMPRA_ACTUAL" + index).html() * $("#COM_ADM_INS_PEDIR_CANT_PED" + index).html()).toFixed(2));
            CalcularTotal();
        }
        else $("#TOTAL" + index).html("0");
    }
});

$(document).on("focusout", "tr.trow td.PRECIO_COMPRA_ACTUAL", function (e) {
    var index = $(this).data("id");
    if (!ValidarPrecioCompraAct(index)) {
        $("#PRECIO_COMPRA_ACTUAL" + index).html("0");
        e.preventDefault();
    }
    else {
        $("#TOTAL" + index).html(parseFloat($("#PRECIO_COMPRA_ACTUAL" + index).html() * $("#COM_ADM_INS_PEDIR_CANT_PED" + index).html()).toFixed(2));
        CalcularTotal();
    }
});

function ValidarPrecioCompraAct(index) {
    if ($("#PRECIO_COMPRA_ACTUAL" + index).html() == 0) return false;
    if ($("#PRECIO_COMPRA_ACTUAL" + index).html().length <= 0) return false;
    return true;
}

//Admite solo numeros en cantidad a pedir//
$(document).on("keydown", ".PRECIO_COMPRA_ACTUAL", function (e) {
    if ($(this).html().trim().length >= 12) e.preventDefault();

    if ($.inArray(e.which, [46, 8, 9, 27, 13, 110,190]) !== -1 ||
            (e.which == 65 && e.ctrlKey === true) ||
            (e.which >= 35 && e.which <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.which < 48 || e.which > 57)) && (e.which < 96 || e.which > 105)) {
        e.preventDefault();
    }
});

//Admite solo numeros en cantidad a pedir//
$(document).on("keydown", "tr.trow td.cant_pedida", function (e) {
    if ($(this).html().trim().length >= 6) e.preventDefault();

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function CalcularTotal() {
    Total = 0;
    $(".TOTAL").each(function () {
        if ($.isNumeric($(this).html())) Total += parseFloat($(this).html());
        else Total += 0;
    });
    $("#Total").html("Importe Total: $" + Total.toFixed(2));
}

function ValidarCantidadPedida(index) {
    if ($("#COM_ADM_INS_PEDIR_CANT_PED" + index).html() == 0)  return false; 
    if (($("#PED_COM_DET_CANTIDAD" + index).html() - $("#COM_ADM_INS_PEDIR_CANT_PED" + index).html()) < 0) { alert("La cantidad pedida supera a la cantidad solicitada."); return false; }
    return true;
}

$(document).on('focus', '.cant_pedida', function () {
    $(this).selectText();
});

$(document).on('focus', '.PRECIO_COMPRA_ACTUAL', function () {
    $(this).selectText();
});

function List_Proveedores(index) {
    $.ajax({
        type: "POST",
        data: '{Todos: "' + false + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            var select_new = "";
            select_new += "<select class='combo_prv span4' data-id=" + index + " id='cbo_PRV" + index + "' style=' margin-bottom:0px; margin-top:0px'>";
            select_new += "<option value='0'>Seleccione Proveedor...</option>";
            $.each(Lista, function (i, Proveedor) {
                if ($("#PED_COM_DET_PRV_ID" + index).html() == Proveedor.Id)
                    select_new += "<option selected value=" + Proveedor.Id + ">" + Proveedor.Nombre + "</option>";
                else select_new += "<option value=" + Proveedor.Id + ">" + Proveedor.Nombre + "</option>";
            });
            select_new += "</select>";
            $("#div_cbo_PRV" + index).html(select_new);
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function List_Servicios() { 
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Cargado,
        complete: function () {
            $("#btnBuscar").click();
        },
        error: errores
    });
}

function List_Servicios_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Servicio").append($("<option></option>").val("0").html("TODOS"));
    $.each(Lista, function (index, Servicio) {
        $("#cbo_Servicio").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
    });

}

function InitControls() {
    $('.date').mask("99/99/9999", { placeholder: "-" });
    $('.date').datepicker();
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaDesde").val(p);
    $("#txtFechaHasta").val(d);
    List_Servicios();
    LoadDataTable();
    LoadDataTableDET();
    
}

function LoadDataTable() {
    oTabla = $('#cabecera').DataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "220px",
        "sScrollX": "100%",
        "sScrollXInner": "400%",
        "sScrollYInner": "100%",
        "bScrollCollapse": true,
        fixedHeader: {
            header: true,
            footer: false
        },
        "language": {
            "zeroRecords": "No se encontró ningún resultado"
        },
        "bAutoWidth": false, // Disable the auto width calculation 
        "aoColumns": [
                    { "sTitle": "Nro.<br>Ped.", "sWidth": "15px" }, // 1st column width 
                    {"sTitle": "Fecha<br>Pedido", "sWidth": "20px" }, // 2nd column width 
                    {"sTitle": "Servicio", "sWidth": "40px" } // 3rd column width and so on 
                ]
    });
}

function LoadDataTableDET() {
    oTabla = $('#detalles').DataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "190px",
        "sScrollX": "100%",
        "sScrollXInner": "400%",
        "sScrollYInner": "100%",
        "bScrollCollapse": true,
        fixedHeader: {
            header: true,
            footer: false
        },
        "language": {
            "zeroRecords": "No se encontró ningún resultado"
        },
        "bAutoWidth": false, // Disable the auto width calculation 
        "aoColumns": [
                    { "sTitle": "Tipo O.<br> de Compra", "sWidth": "15px"}, 
                    {"sTitle": "Nro.<br>Ped.", "sWidth": "15px" }, // 1st column width 
                    {"sTitle": "Fecha<br>Pedido", "sWidth": "20px" }, // 2nd column width 
                    {"sTitle":"Servicio", "sWidth": "40px" }, // 3rd column width and so on 
                    {"sTitle":"Insumo","sWidth": "250px" },
                    {"sTitle":"Cantidad<br>Solicitada", "sWidth": "40px" },
                    {"sTitle": "Cantidad<br>Pedida", "sWidth": "40px" },
                    { "sTitle": "Saldo", "sWidth": "40px" },
                    { "sTitle": "Ultimo Precio<br>de Compra", "sWidth": "40px" },
                    { "sTitle": "Precio de<br>Compra Actual", "sWidth": "40px" },
                    { "sTitle": "Total", "sWidth": "40px" },
                    { "sTitle": "Proveedor", "sWidth": "300px" }
                ]
                
//               ,"rowDefs": [{
//                "targets": '_all',
//                "createdCell": function (td, cellData, rowData, row, col) {
//                    $(td).css('padding', '0px')
//                }
//            }]
    });
}



$("#btnBuscar").click(function () {
    Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#cbo_Servicio :selected").val(), $("#txtNroPedido").val().trim());
});
////Opciones Pie////

//Confirmar pedido//
var objPedidosDet;

$("#btnPedir").click(function () {
    if (confirm("¿Desea confirmar lo pedido?")) {
        if ($(".trow").length == 0) { alert("No hay insumos pedidos."); return false; }
        CargarDetalles();
    }
});

function CargarDetalles() {
    objPedidosDet = [];
    $(".trow").each(function (index, item) {
        var valida_row = ValidarRow(item);
        if (valida_row) {
            if (ValidarDetalle(item)) objPedidosDet.push(LoadData(this));
            else return false;
        }

        if (index == $(".trow").length - 1) {
            if (objPedidosDet.length == 0) { alert("No hay insumos pedidos."); return false; }
            RealizarOrdenesCompra();
        }
    });
}

function ValidarRow(item) {
    var index = $(item).data("id");
    var valida = true;
    if ($("#COM_ADM_INS_PEDIR_CANT_PED" + index).html() == undefined && $("#PED_COM_DET_PRV_ID" + index).html() == undefined) { valida = false; }
    if ($("#COM_ADM_INS_PEDIR_CANT_PED" + index).html() == "0" && $("#PED_COM_DET_PRV_ID" + index).html() == "0") { valida = false; }
    return valida;    
}

function ValidarDetalle(item) {
    var index = $(item).data("id");
    if ($("#COM_ADM_INS_PEDIR_CANT_PED" + index).html() != "0" && $("#PED_COM_DET_PRV_ID" + index).html() == "0") { alert("Complete Proveedor."); return false; }
    //if ($("#PED_COM_DET_PRV_ID" + index).html() != "0" && $("#COM_ADM_INS_PEDIR_CANT_PED" + index).html() == "0") { alert("Complete Cantidad."); return false; }
    return true;
}

function LoadData(row) {
    var objDet = {};
    var idx = $(row).data("id");

    objDet.COM_ADM_INS_PEDIR_PRV_ID = $("#PED_COM_DET_PRV_ID" + idx).html();
    objDet.COM_ADM_INS_PEDIR_ID = 0;
    objDet.COM_ADM_INS_PEDIR_ORD_CAB_ID = 0;
    objDet.COM_ADM_INS_PEDIR_PED_ID = $("#chk" + idx).data("pedido");
    objDet.PED_COM_DET_CANTIDAD = $("#PED_COM_DET_CANTIDAD" + idx).html();
    objDet.COM_ADM_INS_PEDIR_CANT_PED = $("#COM_ADM_INS_PEDIR_CANT_PED" + idx).html();
    objDet.SALDO = $("#SALDO" + idx).html();
    objDet.COM_ADM_INS_PEDIR_INS_ID = $("#PED_COM_DET_INS_ID"+idx).html();
    objDet.COM_ADM_INS_PEDIR_INS_NOM = $("#COM_ADM_INS_PEDIR_INS_NOM" + idx).html();
    objDet.COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL = $("#PRECIO_COMPRA_ACTUAL" + idx).html();
    objDet.TIPO_ORDEN_COMPRA = $("#TIPO_PEDIDO" + idx + " option:selected").val();
    return objDet;
}

function RealizarOrdenesCompra() {
    var json = JSON.stringify({ "objPedidos": objPedidosDet, "NroOrdenCAB": 0 });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_INS_PEDIR_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            alert("Pedido realizado.");
            $("#btnBuscar").click();
        },
        error: errores
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

$(".busqueda").change(function () {
    $("#btnBuscar").click();
});


$("#btnExcel").click(function () {
    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': "../Impresiones/Compras/COM_ADM_LIST_DET_ORDEN_DET.aspx?NroPedido=" + $("#nroPedido").val(),
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
});