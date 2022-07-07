var oTabla;
var Cantidad_Estado = [0, 0]; //Entregados,Pendientes

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

$("#btn_Libres").click(function () {
    $(".reff").removeClass("reff_activo");
    $("#btn_Libres").addClass("reff_activo");
    Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#cbo_Servicio :selected").val(), $("#txtNroPedido").val().trim());
});

$("#btn_SobreT").click(function () {
    $(".reff").removeClass("reff_activo");
    $("#btn_SobreT").addClass("reff_activo");
    Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#cbo_Servicio :selected").val(), $("#txtNroPedido").val().trim());
});

$("#btn_Todos").click(function () {
    $(".reff").removeClass("reff_activo");
    $("#btn_Todos").addClass("reff_activo");
    Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#cbo_Servicio :selected").val(), $("#txtNroPedido").val().trim());
});


function Contadores() {
    $("#btn_Libres").html("Pendientes (" + Cantidad_Estado[0] + ")");
    $("#btn_SobreT").html("Entregados (" + Cantidad_Estado[1] + ")");
    var Totales = Cantidad_Estado[0] + Cantidad_Estado[1];
    $("#btn_Todos").html("Todos (" + Totales + ")");
}

$(document).ready(function () {
    InitControls();
});

//Buscar Cabecera
function Buscar_Pedidos(Desde, Hasta, Servicio, NroPedido) {
    if (Desde.length == 0) Desde = "01/01/1900";
    if (Hasta.length == 0) Hasta = "01/01/1900";
    if (NroPedido.length == 0) NroPedido = 0;
    if (Servicio.length == 0) Servicio = 0;

    Cantidad_Estado = [0, 0]; //Entregados,Pendientes
    var Pendiente = 0;
    if ($("#btn_Todos").hasClass("reff_activo")) Pendiente = 0;
    if ($("#btn_Libres").hasClass("reff_activo")) Pendiente = 1;
    if ($("#btn_SobreT").hasClass("reff_activo")) Pendiente = 2;

    var json = JSON.stringify({ "Desde": Desde, "Hasta": Hasta, "ServicioId": Servicio, "NroPedido": NroPedido, "Pendiente": Pendiente }); //Solo los que estan pedientes de pedir
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_PED_LIST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Pedidos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $.each(Pedidos, function (index, exp) {
                var Clase = " background-color: #F4FA58;";
                if (!exp.PED_PENDIENTE) { Cantidad_Estado[1]++; Clase = " background-color: #58FA58;"; } //Entregados
                else Cantidad_Estado[0]++;

                Tabla_Datos += "<tr style='"+Clase+"' class='tr_CAB' data-id='" + exp.PED_COM_ID + "'><td style='display:none;'><td>" + exp.PED_COM_ID + "</td><td>" + exp.PED_COM_FECHA + "</td><td>" + exp.SERV_DESCRIPCION + "</td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#cabecera").html(Tabla_Datos + Tabla_Fin);
            $("#lbl_CantidadReg").html(Pedidos.length);
        },
        beforeSend: function () {
            $("#cargando").show();
            $(".datosEXP").hide();
            $("#TablaPedidos").hide();
            $("#TablaDetalles").hide();
            $("#lbl_CantidadReg").html("0");
            //$(".input-exp").val("");
        },
        complete: function () {
            $("#cargando").hide();
            MostrarTablas(true);
            Contadores();
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
        $("#btn_VerHistorial").hide();
    }
    else {
        $(".cabecera").hide();
        $(".detalles").show();
        $("#btn_VerHistorial").show();
    }
}

var G_NroPedido = 0;

$(document).on("click", ".tr_CAB", function () {
    Buscar_PedidosDET($(this).data("id"));
    G_NroPedido = $(this).data("id");
    
});


function Buscar_PedidosDET(NroPedido) {
    if (NroPedido.length == 0) { alert("Ingrese Nro. de Pedido."); return false; }

    var json = JSON.stringify({ "NroPedido": NroPedido });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_ENT_LIST_DET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Pedidos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $.each(Pedidos, function (index, exp) {
                Tabla_Datos += "<tr class='trow' title='" + exp.PED_COM_DET_OBS + "' data-placement='bottom' data-id='" + exp.PED_COM_DET_ID + "'><td style='display:none;'><input style='display:none;' data-pedido='" + exp.PED_COM_DET_ID + "' data-id='" + exp.PED_COM_DET_ID + "' id='chk" + exp.PED_COM_DET_ID + "' class='checks' type='checkbox' value='" + exp.PED_COM_DET_ID + "'/></td><td>" + exp.PED_COM_ID + "</td><td>" + exp.PED_COM_FECHA + "</td><td>" + exp.SERV_DESCRIPCION + "</td><td id='COM_ADM_INS_PEDIR_INS_NOM" + exp.PED_COM_DET_ID + "'>" + exp.PED_COM_DET_INS_DESC + "</td><td id='PED_COM_DET_CANTIDAD" + exp.PED_COM_DET_ID + "'>" + exp.PED_COM_DET_CANTIDAD + "</td><td id='COM_ADM_INS_PEDIR_CANT_PED" + exp.PED_COM_DET_ID + "' data-id=" + exp.PED_COM_DET_ID + " class='cant_pedida numero' maxlength='5' contenteditable>" + exp.COM_ADM_INS_PEDIR_CANT_PED + "</td><td class='SALDO' data-id='" + exp.PED_COM_DET_ID + "' id='SALDO" + exp.PED_COM_DET_ID + "'>" + exp.SALDO + "</td><td style='display:none;' id='PED_COM_DET_INS_ID" + exp.PED_COM_DET_ID + "'>" + exp.PED_COM_DET_INS_ID + "</td></tr>";
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
    html: true,
    selector: ".trow",
    container: 'body'
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


function ValidarCantidadPedida(index) {
    if ($("#COM_ADM_INS_PEDIR_CANT_PED" + index).html() == 0) return false;
    if (($("#PED_COM_DET_CANTIDAD" + index).html() - $("#COM_ADM_INS_PEDIR_CANT_PED" + index).html()) < 0) { alert("La cantidad pedida supera a la cantidad solicitada."); return false; }
    return true;
}

$(document).on('focus', '.cant_pedida', function () {
    $(this).selectText();
});


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
        "sScrollY": "340px",
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
                    {"sTitle": "Servicio", "sWidth": "40px"} // 3rd column width and so on 
                ]
    });
}

function LoadDataTableDET() {
    oTabla = $('#detalles').DataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "300px",
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
                    {"sTitle": "Servicio", "sWidth": "40px" }, // 3rd column width and so on 
                    {"sTitle": "Insumo", "sWidth": "250px" },
                    { "sTitle": "Cantidad<br>Pedida", "sWidth": "40px" },
                    { "sTitle": "Cantidad<br>Entregada", "sWidth": "40px" },
                    { "sTitle": "Cantidad<br>Pendiente", "sWidth": "40px" }
                ]
    });
}



$("#btnBuscar").click(function () {
    NroEntregaCAB = 0;
    Cant_Cero_Todos = true;
    Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#cbo_Servicio :selected").val(), $("#txtNroPedido").val().trim());
});
////Opciones Pie////

//Confirmar pedido//
var objPedidosDet;
var NroEntregaCAB = 0;

$("#btnPedir").click(function () {
    if (confirm("¿Desea confirmar la entrega?")) {
        if ($(".trow").length == 0) { alert("No hay insumos a entregar."); return false; }
        CargarDetalles();
    }
});

function CargarDetalles() {
    objPedidosDet = [];
    $(".trow").each(function (index, item) {
        if (ValidarRow(item)) {
            if (ValidarDetalle(item)) objPedidosDet.push(LoadData(this));
            else return false;
        }

        if (index == $(".trow").length - 1) {
            if (objPedidosDet.length == 0) { alert("No hay insumos a entregar."); return false; }
            COM_ADM_ENT_CAB_INSERT(); //Inserto cabecera y luego detalles en entregas...
        }
    });
}

function ValidarRow(item) {
    var index = $(item).data("id");
    if ($("#COM_ADM_INS_PEDIR_CANT_PED" + index).html() == undefined) { return false; } //No guardo en lista si no es cantidad mayor a cero
    if ($("#COM_ADM_INS_PEDIR_CANT_PED" + index).html() == "0") { return false; }
    return true;
}

function ValidarDetalle(item) {
    var index = $(item).data("id");
    if ($("#COM_ADM_INS_PEDIR_CANT_PED" + index).html() == "0") { alert("Complete Cantidad."); return false; }
    return true;
}

function LoadData(row) {
    var objDet = {};
    var idx = $(row).data("id");
    objDet.COM_ADM_ENT_PED_COM_DET_ID = $("#chk" + idx).data("pedido");
    objDet.COM_ADM_ENT_CANT_ENT = $("#COM_ADM_INS_PEDIR_CANT_PED" + idx).html();
    objDet.SALDO = $("#SALDO" + idx).html();
    objDet.COM_ADM_INS_PEDIR_INS_ID = $("#PED_COM_DET_INS_ID" + idx).html();
    objDet.COM_ADM_INS_PEDIR_INS_NOM = $("#COM_ADM_INS_PEDIR_INS_NOM" + idx).html();
    return objDet;
}

function LoadDataCAB() {
    var objCAB = {};
    objCAB.COM_ADM_ENT_CAB_ID = NroEntregaCAB;
    objCAB.COM_ADM_ENT_CAB_PED_ID = G_NroPedido; 
    return objCAB;
}


function COM_ADM_ENT_CAB_INSERT() {
    var json = JSON.stringify({ "oData": LoadDataCAB() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_ENT_CAB_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            NroEntregaCAB = Resultado.d;
            if (NroEntregaCAB > 0) COM_ADM_ENT_DET_INSERT();
            else { alert("Error al grabar cabecera."); return false; }
        },
        error: errores
    });
}

function COM_ADM_ENT_DET_INSERT() {
    var json = JSON.stringify({ "objPedidos": objPedidosDet, "NroEntregaCAB": NroEntregaCAB });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_ENT_DET_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            Print("../Impresiones/Compras/Administracion_Entregas.aspx?ENT_ID=" + NroEntregaCAB);
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

$("#btnVolver").click(function () {
    $("#btnBuscar").click();
});

$("#btnImprimirPedido").click(function () {
    Print("../Impresiones/PedidosCompras_Print.aspx?PED_ID=" + G_NroPedido);
});

function Print(url) {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
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

    $("#EntregasModal").on('show', function () {
        var json = JSON.stringify({ "PEDIDO_CAB_ID": G_NroPedido });
        $.ajax({
            type: "POST",
            url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_ENT_DETALLE_BY_PEDIDO_ID",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Entregas = Resultado.d;
                var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%; font-size:11px;'><thead><tr><th>Fecha</th><th>Usuario</th><th>Insumo</th><th>Cantidad<br>Entregada</th></tr></thead><tbody>";
                var Contenido = "";
                $.each(Entregas, function (index, Entrega) {
                    Contenido = Contenido + "<tr class='tr_historial' id='tr" + index + "' data-id=" + Entrega.COM_ADM_ENT_DET_CAB_ID + "><td>" + Entrega.COM_ADM_ENT_FEC + " </td><td>" + Entrega.COM_ADM_ENT_USU + " </td><td>" + Entrega.COM_ADM_ENT_INS + " </td><td> " + Entrega.COM_ADM_ENT_CANT_ENT + " </td></tr>";
                });
                var Pie = "</tbody></table>";
                $("#TablaEntregas_div").html(Encabezado + Contenido + Pie);
            },
            error: errores
        });
    });

    $(document).on('click', '.tr_historial', function () {
        var ENT_ID = $(this).data("id");
        if (ENT_ID > 0) Print("../Impresiones/Compras/Administracion_Entregas.aspx?ENT_ID=" + ENT_ID);
        else alert("Error al imprimir.");
    });