var G_PedCAB = 0;
var G_PDT_ID = 0;
var G_ExpId = 0;
var G_Query = 0;
var G_ESTADO = 0;
var cantidadPedidaO;
var cantidadRecibidaO;
var cantidadInsumos = 0;
var ordenes;
///Autocomplete
var sourceArr = [];
var mapped = {};

$("#btn_Todos").click(function () {
    G_ESTADO = 0; //TODOS
    CargarOrdenCompra(0);
    $(".controles").removeClass("reff_activo");
    $(this).addClass("reff_activo");
    $("#btnLimpiarCAB").click();
});

$("#btn_Libres").click(function () {
    G_ESTADO = 2; //Recibidos
    CargarOrdenCompra(0);
    $(".controles").removeClass("reff_activo");
    $(this).addClass("reff_activo");
    $("#btnLimpiarCAB").click();
});

$("#btn_Pendientes").click(function () {
    G_ESTADO = 1; //Pendientes
    CargarOrdenCompra(0);
    $(".controles").removeClass("reff_activo");
    $(this).addClass("reff_activo");
    $("#btnLimpiarCAB").click();
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

$("#PDT_INS_NOM").typeahead({
    source: sourceArr,
    updater: function (selection) {
        $("#PDT_INS_NOM").val(selection); //nom
        $("#PDT_INS_ID").val(mapped[selection]); //id
        $("#PDT_CANTIDAD").focus();
        return selection;
    },
    minLength: 4,
    items: 10
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
            if (G_Query == 1) {
                $("#txtOrdenCompraBuscar").val(G_PedCAB);
                $("#txtDesde").val("");
                $("#txtHasta").val("");
                CargarOrdenCompra(G_PedCAB);
            }
            else $("#btnBuscar").click(); //Si no hay una consulta busco por default
        }
    });
}

function List_Proveedores_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Proveedor").append($("<option></option>").val("0").html("Seleccione Proveedor..."));
    $("#cbo_ProveedorBuscar").append($("<option></option>").val("0").html("TODOS"));
    $.each(Lista, function (index, Proveedor) {
        $("#cbo_Proveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
        $("#cbo_ProveedorBuscar").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
    });

}

function InitControls() {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.date').mask("99/99/9999", { placeholder: "-" });
    $('#EXP_PED_FECHA').datepicker();
    $("#btnEliminarCAB").hide();
    $("#btnCopiar").hide();
    $("#btnVerDetallesPedido").hide();
    $("#contDET").hide();
    $("#btnLimpiarCAB").html("Deseleccionar");
    $("#btnLimpiarCAB").hide();

    $(function () {
        $("#txtDesde").datepicker({
            onClose: function (selectedDate) {
                $("#txtHasta").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#txtHasta").datepicker({
            onClose: function (selectedDate) {
                $("#txtDesde").datepicker("option", "maxDate", selectedDate);
            }
        });
    });

    $("#EXP_PED_FECHA").val(FechadelDia());

    $("#txtDesde").val(FechaPrimerDiaMes());
    $("#txtHasta").val(FechadelDia());
    List_Proveedores(false);
    Cargar_Medicamentos(false);
}

function FechaPrimerDiaMes() {
    var currentDt = new Date();
    var dd = '01';

    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;

    var yyyy = currentDt.getFullYear();
    var d = dd + '/' + mm + '/' + yyyy;
    return d;
}

function FechadelDia() {
    var currentDt = new Date();
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;

    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;

    var yyyy = currentDt.getFullYear();
    var d = dd + '/' + mm + '/' + yyyy;
    return d;
}

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


$(document).ready(function () {
    InitControls();


    window.setInterval(function () {
        verificarEstado();
    }, 5000);


    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    if (GET["G_PedCAB"] != "" && GET["G_PedCAB"] != null) {
        G_PedCAB = GET["G_PedCAB"]; //Orden compra CAB
        G_Query = 1;
    }
    else {
        G_PedCAB = 0;
        G_Query = 0;

    }


    if (GET["Desde"] != "" && GET["Desde"] != null) {
        $("#txtDesde").val(GET["Desde"]);
        $("#txtHasta").val(GET["Hasta"]);
        CargarOrdenCompra(0);
    }

});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarOrdenCompra(ORD_CAB_ID, Estado) {
    if (ORD_CAB_ID == 0) ORD_CAB_ID = $("#txtOrdenCompraBuscar").val().trim();
    if ($("#txtOrdenCompraBuscar").val().trim().length == 0) ORD_CAB_ID = 0;

    var PRV_ID = 0;
    if ($("#cbo_ProveedorBuscar :selected").val() != undefined) PRV_ID = $("#cbo_ProveedorBuscar :selected").val();


    //aca
    if ($("#txtDesde").val().trim().length == 0) {
        $("#txtDesde").val(FechadelDia());
        $("#txtHasta").val(FechadelDia());
        $("#cbo_ProveedorBuscar").val("0");
    }

    var json = JSON.stringify({ "ORD_CAB_ID": ORD_CAB_ID, "Desde": $("#txtDesde").val(), "Hasta": $("#txtHasta").val(), "ProveedorId": PRV_ID, "Estado": G_ESTADO });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ORDEN_CAB_LIST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaPedidosdiv").hide();
        },
        success: function (Resultado) {
            ordenes = ""; //se vacia la lista de ids de ordenes para verificar actualizacion y remarcar estado de la orden
            var cabeceras = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            Tabla_Titulo = "<table id='TablaPedidos' class='table table-condensed'><thead><tr><th>Nro. Orden de Compra</th><th>Fecha</th><th>Proveedor</th><th>Total</th><th>Usuario</th></tr></thead><tbody>";
            $.each(cabeceras, function (index, exp) {

                ordenes += exp.ORDEN_COM_CAB_ID + ",";
                var pend = "pendiente";
                if (exp.PENDIENTE) pend = "";
                Tabla_Datos += "<tr class='tr_CAB " + pend + "' id='tr" + exp.ORDEN_COM_CAB_ID + "' onclick='AbrirOrdenCompra(" + exp.ORDEN_COM_CAB_ID + ")'>" +
                "<td>" + exp.TIPO_ORDEN + "-" + exp.ORDEN_COM_CAB_ID + "</td>" +
                "<td id='ORD_CAB_FECHA" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_FECHA + "</td>" +
                "<td id='ORD_PRV_NOMBRE" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_PRV_NOMBRE + "</td>" +
                "<td class='TOTAL'>$" + parseFloat(exp.ORDEN_COM_CAB_TOTAL).toFixed(2) + "</td>" +
                "<td>" + exp.ORDEN_COM_CAB_USU_NOMBRE + "</td>" +
                "<td style='display:none;' id='ORD_CAB_PRV_ID" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_PRV_ID + "</td>" +
                "<td style='display:none;' id='ORDEN_COM_CAB_SECTOR" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_SECTOR + "</td><td style='display:none' id='tipoOrden"+ exp.ORDEN_COM_CAB_ID +"'>"+ exp.TIPO_ORDEN +"</td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaPedidosdiv").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        complete: function () {
            $(".pendiente").css("background-color", "yellow");
            if (ORD_CAB_ID > 0) {
                $("#txtDesde").val("");
                $("#txtHasta").val("");
                $("#cbo_ProveedorBuscar").val("0");
                console.log(ordenes);
            }
            if (G_Query == 1 && G_PedCAB > 0) {
                AbrirOrdenCompra(G_PedCAB);
                $("#btnVerDetallesPedido").click();
            }
            CalcularTotal();
            $("#cargando").hide();
            $("#TablaPedidosdiv").show();
        },
        error: errores
    });
}

function CalcularTotal() {
    var Total = 0;
    $(".TOTAL").each(function () {
        var T = $(this).html().toString().replace("$", "");
        if ($.isNumeric(T)) Total += parseFloat(T);
        else Total += 0;
    });
    $("#Total").html("Importe Total: $"+Total.toFixed(2));
}

$("#btnBuscar").click(function () {
    CargarOrdenCompra(0);
    //$("#btnLimpiarCAB").click();
});

function AbrirOrdenCompra(ORD_CAB_ID) {
    $(".tr_CAB").css("background-color", "white");
    G_PedCAB = ORD_CAB_ID;
    $(".DCAB").attr("disabled", true);

    $("#ORDEN_COMPRA_CAB").val(ORD_CAB_ID);
    $("#ORD_CAB_FECHA").val($("#ORD_CAB_FECHA" + ORD_CAB_ID).html());
    $("#EXP_PED_FECHA").val($("#ORD_CAB_FECHA" + ORD_CAB_ID).html());

    $("#txtDesde").val($("#ORD_CAB_FECHA" + ORD_CAB_ID).html());
    $("#txtHasta").val($("#ORD_CAB_FECHA" + ORD_CAB_ID).html());
    $("#txtOrdenCompraBuscar").val(ORD_CAB_ID);


    $("#cbo_Proveedor").val($("#ORD_CAB_PRV_ID" + ORD_CAB_ID).html());
    $("#cbo_ProveedorBuscar").val($("#ORD_CAB_PRV_ID" + ORD_CAB_ID).html());

    $("#EXP_PED_FECHA").attr("disabled", true);
    $("#cbo_Proveedor").attr("disabled", true);

    $(".pendiente").css("background-color", "yellow");
    $("#tr" + ORD_CAB_ID).css("background-color", "grey");

    $("#btnLimpiarCAB").html("Deseleccionar");
    $("#btnLimpiarCAB").show();

    $("#btnGuardarCAB").hide();
    $("#btnEliminarCAB").show();
    $("#btnVerDetallesPedido").show();
}

$("#btnLimpiarCAB").click(function () {
    $(".datoCAB").val("");
    $(".DCAB").removeAttr("disabled");
    $(".datoCAB").removeAttr("checked");
    $("#ORDEN_COMPRA_CAB").val("");
    $(".tr_CAB").css("background-color", "white");
    $(".pendiente").css("background-color", "yellow");
    $("#btnEliminarCAB").hide();
    $("#btnCopiar").hide();
    $("#btnVerDetallesPedido").hide();
    $("#cbo_Rubro").val("");
    $("#cbo_Proveedor").val("0");
    $("#cbo_ProveedorBuscar").val("0");

    $("#EXP_PED_FECHA").val(FechadelDia());

    //$("#btnGuardarCAB").show();
    $("#EXP_PED_FECHA").removeAttr("disabled");
    $("#cbo_Proveedor").removeAttr("disabled");
    $("#btnLimpiarCAB").hide();

    $("#txtDesde").val(FechaPrimerDiaMes());
    $("#txtHasta").val(FechadelDia());
    $("#txtOrdenCompraBuscar").val("");

    G_PedCAB = 0;
});


$("#btnEliminarCAB").click(function () {
    if (confirm("¿Desea dar de baja la orden de compra?")) {
        EliminarPedido(G_PedCAB);
    }
});

function EliminarPedido(OrdenCabID) {
    var json = JSON.stringify({ "ORD_CAB_ID": OrdenCabID });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ORDEN_CAB_DAR_BAJA",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == 1) { alert("Existen remitos para esta orden de compra y no puede ser eliminada!"); }
            if (Resultado.d == 0) {
                alert("Orden de compra dada de baja.");
                window.location = "Administracion_Generar_OrdenCompra.aspx?Desde=" + $("#txtDesde").val() + "&Hasta=" + $("#txtHasta").val();
            }
        },
        error: errores
    });
}

function CargarObjCAB() {
    var PedidoCAB = {};
    if ($("#ORDEN_COMPRA_CAB").val().trim().length == 0) PedidoCAB.ORDEN_COM_CAB_ID = 0;
    else PedidoCAB.ORDEN_COM_CAB_ID = $("#ORDEN_COMPRA_CAB").val();
    PedidoCAB.ORDEN_COM_CAB_FECHA = $("#EXP_PED_FECHA").val();
    PedidoCAB.ORDEN_COM_CAB_PRV_ID = $("#cbo_Proveedor :selected").val();
    return PedidoCAB;
}

function ValidarCAB() {
    if ($("#EXP_PED_FECHA").val().trim().length == 0) { alert("Ingrese fecha de pedido."); return false; }
    if ($("#cbo_Proveedor :selected").val() == 0) { alert("Ingrese Proveedor."); return false; }
    return true;
}

$("#btnGuardarCAB").click(function () {
    return false;
    if (!ValidarCAB()) return false; //Validar datos ingresados para CAB

    var json = JSON.stringify({ "cab": CargarObjCAB() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ORDEN_CAB_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            G_PedCAB = Resultado.d;
            if (G_PedCAB > 0) {
                alert("Guardado.");
                window.location = "Administracion_Generar_OrdenCompra.aspx?G_PedCAB=" + G_PedCAB;
            }
            else alert("Error al grabar cabecera.");
        },
        error: errores
    });
});

function CargarDetallesORD(ORD_CAB_ID) {
    var json = JSON.stringify({ "ORD_CAB_ID": ORD_CAB_ID });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ORDEN_DET_LIST_BY_CAB",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            cantidadInsumos = Resultado.d.length;
            var cabeceras = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            Tabla_Titulo = "<table id='TablaPedidoDetalles' class='table table-condensed' style='font-size:11px; text-align:center;'><thead><tr><th>Nro. Orden de Compra</th><th>Insumo</th><th>Cantidad</th><th>Precio<br>Unitario</th><th>Total</th></tr></thead><tbody>";
            $.each(cabeceras, function (index, exp) {
                Tabla_Datos += "<tr class='tr_DET' id='tr" + exp.COM_ADM_INS_PEDIR_ID + "' onclick='MostrarDetalle(" + exp.COM_ADM_INS_PEDIR_ID + ")'>" +
                "<td>" + exp.TIPO_ORDEN_COMPRA + "-" + G_PedCAB + "</td>" +
                "<td id='ORD_DET_INS_NOM" + exp.COM_ADM_INS_PEDIR_ID + "'>" + exp.PED_COM_DET_INS_DESC + "</td>" +
                "<td id='ORD_DET_CANT" + exp.COM_ADM_INS_PEDIR_ID + "'>" + exp.COM_ADM_INS_PEDIR_CANT_PED + "</td>" +
                "<td style='display:none;' id='ORD_DET_INS_ID" + exp.COM_ADM_INS_PEDIR_ID + "'>" + exp.PED_COM_DET_INS_ID + "</td>" +
                "<td style='display:none;' id='PED_ID" + exp.COM_ADM_INS_PEDIR_ID + "'>" + exp.COM_ADM_INS_PEDIR_PED_ID + "</td>" +
                "<td id='PRECIO_COMPRA_ACTUAL" + exp.COM_ADM_INS_PEDIR_ID + "'>$" + parseFloat(exp.PRECIO_COMPRA_ACTUAL).toFixed(2) + "</td>" +
                "<td class='TOTAL_DET'>$" + parseFloat(exp.TOTAL).toFixed(2) + "</td>" +
                "<td id='REMITO" + exp.COM_ADM_INS_PEDIR_ID + "' style='display:none' >" + exp.REMITO + "</td>" +
                "<td id='CANTIDAD_TOTAL_RECIBIDA" + exp.COM_ADM_INS_PEDIR_ID + "' style='display:none' >" + exp.CANTIDAD_TOTAL_RECIBIDA + "</td>" +
                "<td id='CANTIDAD_PEDIDA_ORIGINAL" + exp.COM_ADM_INS_PEDIR_ID + "' style='display:none' >" + exp.COM_ADM_INS_PEDIR_CANT_PED + "</td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaPedidoDetalles").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        complete: function () {
            CalcularTotalDet();
        },
        error: errores
    });
}

function CalcularTotalDet() {
    Total_Det = 0;
    $(".TOTAL_DET").each(function () {
        var t = $(this).html().toString().replace("$", "");
        if ($.isNumeric(t)) Total_Det += parseFloat(t);
        else Total_Det += 0;
    });
    $("#TotalDetalle").html("Importe Total: $" + Total_Det.toFixed(2));
}

//Opciones CAB//
$("#btnVerDetallesPedido").click(function () {
    if ($("#ORDEN_COMPRA_CAB").val() > 0) {
        MostrarBotonesDet($("#ORDEN_COMPRA_CAB").val());
        CargarDetallesORD($("#ORDEN_COMPRA_CAB").val());
        VerPantallaDetalles();
    }
});

function MostrarBotonesDet(ORDEN_COMPRA_CAB) {
    if ($("#tr" + ORDEN_COMPRA_CAB).hasClass("pendiente")) //Ya fue recibida
    {
        $(".detalle").hide();
        $(".datos_det").attr("disabled", true);
    }
    else {
        $(".detalle").show();
      //  $(".datos_det").removeAttr("disabled");
    }

}

function VerPantallaDetalles() {
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top + 810 }, 500);
    $("#contCAB").hide();
    $("#contDET").show();
    $("#btnImprimir").show();
}

function MostrarDetalle(PDT_ID) {

    //alert($("#ORD_DET_CANT" + PDT_ID).html());

    // if ($("#REMITO" + PDT_ID).html() > 0) { alert("Insumo con remito. No se puede editar"); return false; }


    var json = JSON.stringify({ "PDT_ID": PDT_ID });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/Actualizar_Estado_Orden_Compra",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
//            cantidadInsumos = Resultado.d.length;
//            alert(cantidadInsumos);
            var cabeceras = Resultado.d;

            $.each(cabeceras, function (index, exp) {

                cantidadRecibidaO = exp.CANTIDAD_TOTAL_RECIBIDA;
                $("#CANTIDAD_TOTAL_RECIBIDA" + PDT_ID).html(exp.CANTIDAD_TOTAL_RECIBIDA);
                cantidadPedidaO = exp.COM_ADM_INS_PEDIR_CANT_PED;
                $("#CANTIDAD_PEDIDA_ORIGINAL" + PDT_ID).html(exp.COM_ADM_INS_PEDIR_CANT_PED);


                //                cantidadRecibidaO = $("#CANTIDAD_TOTAL_RECIBIDA" + PDT_ID).html();
                //                cantidadPedidaO = $("#CANTIDAD_PEDIDA_ORIGINAL" + PDT_ID).html();
                if ($("#CANTIDAD_TOTAL_RECIBIDA" + PDT_ID).html() == $("#CANTIDAD_PEDIDA_ORIGINAL" + PDT_ID).html()) { alert("No se puede editar, insumo ya recibido"); return false; } else { $(".datos_det").removeAttr("disabled"); }

                G_PDT_ID = PDT_ID;
                $(".tr_DET").css("background-color", "white");
                $("#tr" + PDT_ID).css("background-color", "grey");
                $("#PDT_INS_ID").val($("#ORD_DET_INS_ID" + PDT_ID).html());
                $("#PDT_CANTIDAD").val($("#ORD_DET_CANT" + PDT_ID).html());
                $("#PDT_INS_NOM").val($("#ORD_DET_INS_NOM" + PDT_ID).html());
                $("#PDT_PRECIO").val($("#PRECIO_COMPRA_ACTUAL" + PDT_ID).html());
                $("#PED_ID").val($("#PED_ID" + PDT_ID).html());

            });
        },
        complete: function () {
        },
        error: errores
    });

}

$("#btnLimpiarDET").click(function () {
    $(".tr_DET").css("background-color", "white");
    $(".detalles").val("");
    $(".detalles").removeAttr("checked");
    $(".detalles").html("");
    G_PDT_ID = 0;
    $(".datos_det").attr("disabled",true);
});

$("#PDT_CANTIDAD").keypress(function (event) {
    if (event.which == 13) {
        $("#btnGuardarDET").click();
    }
});

function CargarObjDet() {
    var DET = {};
    DET.COM_ADM_INS_PEDIR_ID = G_PDT_ID;
    DET.COM_ADM_INS_PEDIR_ORD_CAB_ID = G_PedCAB; //ORDEN DE COMPRA CAB
    if ($("#PED_ID").val().trim().length == 0) DET.COM_ADM_INS_PEDIR_PED_ID = 0;
    else DET.COM_ADM_INS_PEDIR_PED_ID = $("#PED_ID").val(); //Pedido ID (no hay pedido previo a la orden)
    DET.COM_ADM_INS_PEDIR_PRV_ID = $("#cbo_Proveedor :selected").val(); //$("#PDT_INS_ID").val();
    DET.COM_ADM_INS_PEDIR_CANT_PED = $("#PDT_CANTIDAD").val().trim();
    DET.COM_ADM_INS_PEDIR_INS_NOM = $("#PDT_INS_NOM").val();
    DET.COM_ADM_INS_PEDIR_INS_ID = $("#PDT_INS_ID").val();
    DET.COM_ADM_INS_PEDIR_USU_ID = 0;
    //DET.COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL = $("#PRECIO_COMPRA_ACTUAL" + G_PDT_ID).html().toString().replace("$", "");
    DET.COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL = $("#PDT_PRECIO").val().toString().replace("$", "");
    DET.TIPO_ORDEN_COMPRA = $("#tipoOrden" + G_PedCAB).html();
    return DET;
}

function ValidarDET() {
    if (G_PedCAB <= 0) { alert("Seleccione Pedido."); return false; }
    if ($("#PDT_INS_ID").val().length == 0) { alert("Seleccione Insumo."); return false; }
    if ($("#PDT_INS_NOM").val().length == 0) { alert("Seleccione Insumo."); return false; }   
    if ($("#PDT_CANTIDAD").val().trim().length == 0) { alert("Ingrese Cantidad."); return false; }
    if ($("#PDT_PRECIO").val().trim().length == 0) {alert("Ingrese el valor."); return false;}
    return true;
}

$("#btnGuardarDET").click(function () {
    if (!ValidarDET()) return false;

    //if ($("#PDT_CANTIDAD").val() > cantidadPedidaO) { }
    if ($("#PDT_CANTIDAD").val() < cantidadRecibidaO) { alert("No puede pedir menos de lo ya recibido."); return false; }

    var json = JSON.stringify({ "det": CargarObjDet() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_INS_PEDIR_INSERT_DET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d > 0) {
                CargarDetallesORD(G_PedCAB);
                $("#btnLimpiarDET").click(); //Limpiar Campos
            }
            else alert("Error al guardar detalle.");
        },
        error: errores
    });
});


$("#btnEliminarDET").click(function () {
    if (confirm("¿Desea eliminar insumo?")) {
        if (G_PDT_ID <= 0) { alert("Seleccione insumo."); return false; }
        var json = JSON.stringify({ "DET_ID": G_PDT_ID });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_INS_PEDIR_DELETE_BY_ID",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                CargarDetallesORD(G_PedCAB);
                $("#btnLimpiarDET").click(); //Limpiar Campos
            },
            error: errores
        });
    }
});


function VerPantallaCabecera() {
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 840 }, 500);
    $("#contCAB").show();
    $("#contDET").hide();
}

///Botones de barra inferior///

$("#btnVerCAB").click(function () {
    $("#btnLimpiarDET").click();
    VerPantallaCabecera();
});

$("#btnImprimir").click(function () {
    Print("../Impresiones/Compras/Administracion_OrdenCompra.aspx?ORD_CAB_ID=" + G_PedCAB);
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

$("#txtDesde, #txtHasta").change(function () {
    $("#txtOrdenCompraBuscar").val("");
    $("#cbo_ProveedorBuscar").val("0");
});

$("#btnCerrar").click(function () {
    //    alert(G_PedCAB);
    //    return false;
    var json = JSON.stringify({ "G_PedCAB": G_PedCAB });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_MARCAR_CLOSE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            alert("Orden Cerrada!");
            $("#tr" + G_PedCAB).css("background-color", "rgb(255, 255, 0)");
        },
        error: errores
    });
});

$("#btnEliminar").click(function () {
    if (G_PDT_ID == 0) { alert("Seleccione un insumo para eliminar."); return false; }
    if (cantidadInsumos == 1) { alert("Elimine la orden de compra."); return false; }
    if (cantidadRecibidaO > 0) { alert("No se puede eliminar este insumo ya que posee entregas."); return false; }
    //alert(G_PDT_ID);

    var r = confirm("Desea eliminar el insumo de la orden de compra? ya no se podra recuperar.");
    if (r) {
        var json = JSON.stringify({ "G_PDT_ID": G_PDT_ID });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_ELIMINAR_INSUMO",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                alert("Insumo Eliminado!");
                $("#btnVerDetallesPedido").click();
                $("#PDT_INS_ID").val(0);
                $("#PDT_INS_NOM").val("");
                $("#PDT_CANTIDAD").val("");
                $("#PDT_PRECIO").val("");
            },
            error: errores
        });
    }
});

function verificarEstado() {
    var json = JSON.stringify({ "ordenes": ordenes });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/Verificar_Estado_Orden_Compra_Cabecera",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $.each(Resultado.d, function (index, item) {
                //alert(item.ORDEN_COM_CAB_ID);
                if (!item.PENDIENTE) { $("#tr" + item.ORDEN_COM_CAB_ID).addClass("pendiente"); $("#tr" + item.ORDEN_COM_CAB_ID).css("background-color", "#ffff00"); }
                //Tabla_Datos += "<tr class='tr_CAB " + pend + "' id='tr" + exp.ORDEN_COM_CAB_ID
            });
        },
        error: errores
    });
}