var G_PedCAB = 0;
var G_PDT_ID = 0;
var G_ExpId = 0;
var G_Query = 0;
var estado = 3; //1 todos, 2 recibidas, 3 pendientes


///Autocomplete
var sourceArr = [];
var mapped = {};

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

    $("#btnBuscar").click();
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
    $("#btnRecibir").hide();

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

    $("#txtDesde").val(PrimerDia());
    $("#txtHasta").val(FechadelDia());
    List_Proveedores(false);
    Cargar_Medicamentos(false);
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

function PrimerDia() {
    var currentDt = new Date();
    var dd = currentDt.getDate();
//    dd = (dd < 10) ? '0' + dd : dd;

    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;

    var yyyy = currentDt.getFullYear();
    var d = '01' + '/' + mm + '/' + yyyy;
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

function CargarOrdenCompra(ORD_CAB_ID) {
    //alert(ORD_CAB_ID);
    if (ORD_CAB_ID == 0) ORD_CAB_ID = $("#txtOrdenCompraBuscar").val().trim();
    if ($("#txtOrdenCompraBuscar").val().trim().length == 0) ORD_CAB_ID = 0;

    var PRV_ID = 0;
    if ($("#cbo_ProveedorBuscar :selected").val() != undefined) PRV_ID = $("#cbo_ProveedorBuscar :selected").val();

    if ($("#txtOrdenCompraBuscar").val().trim().length > 0) { PRV_ID = 0; }

    if ($("#txtDesde").val().trim().length == 0 && $("#txtHasta").val().trim().length == 0 && $("#cbo_ProveedorBuscar").val() == 0 && $("#txtOrdenCompraBuscar").val().trim().length == 0)
    {return false;}

    var desde = "01/01/1900";
    var hasta = "01/01/1900";

    if ($("#txtOrdenCompraBuscar").val().trim().length == 0) {
        desde = $("#txtDesde").val();
        hasta = $("#txtHasta").val();
    } else {
         desde = "01/01/1900";
         hasta = "01/01/1900";
     }

     var json = JSON.stringify({ "ORD_CAB_ID": ORD_CAB_ID, "Desde": desde, "Hasta": hasta, "ProveedorId": PRV_ID, "Tipo": 1 });
     $.ajax({
         type: "POST",
         data: json,
         url: "../Json/Compras/ComprasInternacion.asmx/COM_ORDEN_CAB_LIST",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (Resultado) {
             var cabeceras = Resultado.d;
             var Tabla_Titulo = "";
             var Tabla_Datos = "";
             var Tabla_Fin = "";
             var color = "";
             Tabla_Titulo = "<table id='TablaPedidos' class='table table-condensed'><thead><tr>" +
            "<th>Nro. <br /> de expediente</th><th>Nro. <br /> de pedido</th><th>Nro. Orden <br /> de Compra</th><th>Fecha de orden <br /> de compra</th><th>Proveedor</th><th>Usuario</th></tr></thead><tbody>";
             $.each(cabeceras, function (index, exp) {
                 //alert(exp.PENDIENTE);
                 switch (estado) {
                     //todas     
                     case 1:
                         var pend = "pendiente";
                         //color = "#FA5858"; //"#0080FF";
                         color = "#FFFFFF";
                         if (!exp.PENDIENTE) pend = "";
                         Tabla_Datos += "<tr style='background-color:" + color + "' class='tr_CAB " + pend + "' id='tr" + exp.ORDEN_COM_CAB_ID + "' onclick='AbrirOrdenCompra(" + exp.ORDEN_COM_CAB_ID + ")'>" +
                "<td>" + exp.EXP_ID + "</td><td>" + exp.EXP_PED_ID + "</td><td>" + "I-" + exp.ORDEN_COM_CAB_ID + "</td><td id='ORD_CAB_FECHA" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_FECHA + "</td><td id='ORD_PRV_NOMBRE" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_PRV_NOMBRE + "</td><td>" + exp.ORDEN_COM_CAB_USU_NOMBRE + "</td><td style='display:none;' id='ORD_CAB_PRV_ID" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_PRV_ID + "</td><td style='display:none;' id='ORDEN_COM_CAB_SECTOR" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_SECTOR + "</td><td id='estado" + exp.ORDEN_COM_CAB_ID + "' style='display:none'>" + estado + "</td></tr>";
                         break;
                     //recibidas     
                     case 2:
                         var pend = "pendiente";
                         color = "rgb(255, 255, 0)";
                         if (exp.PENDIENTE) {
                             Tabla_Datos += "<tr style='background-color:" + color + "' class='tr_CAB " + pend + "' id='tr" + exp.ORDEN_COM_CAB_ID + "' onclick='AbrirOrdenCompra(" + exp.ORDEN_COM_CAB_ID + ")'>" +
                "<td>" + exp.EXP_ID + "</td><td>" + exp.EXP_PED_ID + "</td><td>" + "I-" + exp.ORDEN_COM_CAB_ID + "</td><td id='ORD_CAB_FECHA" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_FECHA + "</td><td id='ORD_PRV_NOMBRE" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_PRV_NOMBRE + "</td><td>" + exp.ORDEN_COM_CAB_USU_NOMBRE + "</td><td style='display:none;' id='ORD_CAB_PRV_ID" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_PRV_ID + "</td><td style='display:none;' id='ORDEN_COM_CAB_SECTOR" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_SECTOR + "</td><td id='estado" + exp.ORDEN_COM_CAB_ID + "' style='display:none'>" + estado + "</td></tr>";
                         }
                         break;
                     //pendientes      
                     case 3:
                         if (!exp.PENDIENTE) {
                             //color = "#FA5858";
                             color = "#FFFFFF";
                             pend = "";
                             Tabla_Datos += "<tr style='background-color:" + color + "' class='tr_CAB " + pend + "' id='tr" + exp.ORDEN_COM_CAB_ID + "' onclick='AbrirOrdenCompra(" + exp.ORDEN_COM_CAB_ID + ")'>" +
                "<td>" + exp.EXP_ID + "</td><td>" + exp.EXP_PED_ID + "</td><td>" + "I-" + exp.ORDEN_COM_CAB_ID + "</td><td id='ORD_CAB_FECHA" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_FECHA + "</td><td id='ORD_PRV_NOMBRE" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_PRV_NOMBRE + "</td><td>" + exp.ORDEN_COM_CAB_USU_NOMBRE + "</td><td style='display:none;' id='ORD_CAB_PRV_ID" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_PRV_ID + "</td><td style='display:none;' id='ORDEN_COM_CAB_SECTOR" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_SECTOR + "</td><td id='estado" + exp.ORDEN_COM_CAB_ID + "' style='display:none'>" + estado + "</td></tr>";
                         }
                         break;
                     //anuladas      
                     case -1:
                         if (!exp.PENDIENTE) {
                             //color = "#FA5858";
                             color = "#FF0000";
                             pend = "";
                             Tabla_Datos += "<tr style='background-color:" + color + "' class='tr_CAB " + pend + "' id='tr" + exp.ORDEN_COM_CAB_ID + "' onclick='AbrirOrdenCompra(" + exp.ORDEN_COM_CAB_ID + ")'>" +
                "<td>" + exp.EXP_ID + "</td><td>" + exp.EXP_PED_ID + "</td><td>" + "I-" + exp.ORDEN_COM_CAB_ID + "</td><td id='ORD_CAB_FECHA" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_FECHA + "</td><td id='ORD_PRV_NOMBRE" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_PRV_NOMBRE + "</td><td>" + exp.ORDEN_COM_CAB_USU_NOMBRE + "</td><td style='display:none;' id='ORD_CAB_PRV_ID" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_PRV_ID + "</td><td style='display:none;' id='ORDEN_COM_CAB_SECTOR" + exp.ORDEN_COM_CAB_ID + "'>" + exp.ORDEN_COM_CAB_SECTOR + "</td><td id='estado" + exp.ORDEN_COM_CAB_ID + "' style='display:none'>" + estado + "</td></tr>";
                         }
                         break;
                 }

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
             }
             if (G_Query == 1 && G_PedCAB > 0) {
                 AbrirOrdenCompra(G_PedCAB);
                 $("#btnVerDetallesPedido").click();
             }
         },
         error: errores
     });
}


$(".reff").click(function () {
    switch ($(this).attr('id')) {
        case "btn_Todos":
            $(".reff").removeClass("reff_activo");
            $(this).addClass("reff_activo");
            estado = 1;
            $("#btnBuscar").click();
            break;
        case "btn_Recibidas":
            $(".reff").removeClass("reff_activo");
            $(this).addClass("reff_activo");
            estado = 2;
            $("#btnBuscar").click();
            break;
        case "btn_Pendientes":
            $(".reff").removeClass("reff_activo");
            $(this).addClass("reff_activo");
            estado = 3;
            $("#btnBuscar").click();
            break;
    }
});


// marcar desmarcar recibida
$("#btnRecibir").click(function () {
    var r = "";
    if (parseInt($("#estado" + G_PedCAB).html()) == 2) { r = confirm("Esta seguro que quiere marcar la orden de compra como NO recibida?"); }

    if (parseInt($("#estado" + G_PedCAB).html()) != 2) { r = confirm("Esta seguro que quiere marcar la orden de compra como YA recibida?"); }

    if (!r) { return false; }
    
    var json = JSON.stringify({ "ORD_CAB_ID": G_PedCAB });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/Recibir_Orden_Compras_Internacion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () { document.location.reload(true); }, //$("#btnBuscar").click(); },
        error: errores
    });
});

$("#btnBuscar").click(function () {
    CargarOrdenCompra(0);
    //$("#btnLimpiarCAB").click();
});

function AbrirOrdenCompra(ORD_CAB_ID) {
    $(".tr_CAB").css("background-color", "white");
    G_PedCAB = ORD_CAB_ID;
    $("#ORDEN_COMPRA_CAB").val(ORD_CAB_ID);
    $("#ORD_CAB_FECHA").val($("#ORD_CAB_FECHA" + ORD_CAB_ID).html());
    $("#EXP_PED_FECHA").val($("#ORD_CAB_FECHA" + ORD_CAB_ID).html());

    $("#cbo_Proveedor").val($("#ORD_CAB_PRV_ID" + ORD_CAB_ID).html());
    $("#EXP_PED_FECHA").attr("disabled", true);
    $("#cbo_Proveedor").attr("disabled", true);

    
    $("#txtDesde").val($("#ORD_CAB_FECHA" + ORD_CAB_ID).html());
    $("#txtHasta").val($("#ORD_CAB_FECHA" + ORD_CAB_ID).html());
    $("#txtOrdenCompraBuscar").val(ORD_CAB_ID);
    $("#cbo_ProveedorBuscar").val($("#ORD_CAB_PRV_ID" + ORD_CAB_ID).html());
    $(".bloquear").attr('disabled', true);

    $(".pendiente").css("background-color", "yellow");
    $("#tr" + ORD_CAB_ID).css("background-color", "grey");

    $("#btnLimpiarCAB").html("Deseleccionar");
    $("#btnLimpiarCAB").show();
    $("#btnRecibir").show();

    $("#btnGuardarCAB").hide();
    $("#btnEliminarCAB").show();
    $("#btnVerDetallesPedido").show();
}

$("#btnLimpiarCAB").click(function () {
    $(".datoCAB").val("");
    $(".datoCAB").removeAttr("checked");
    $("#ORDEN_COMPRA_CAB").val("");
    $(".tr_CAB").css("background-color", "white");
    $(".pendiente").css("background-color", "yellow");
    $("#btnEliminarCAB").hide();
    $("#btnCopiar").hide();
    $("#btnVerDetallesPedido").hide();
    $("#cbo_Rubro").val("");
    $("#cbo_Proveedor").val("0");
    $("#EXP_PED_FECHA").val(FechadelDia());

    //$("#btnGuardarCAB").show();
    $("#EXP_PED_FECHA").removeAttr("disabled");
    $("#cbo_Proveedor").removeAttr("disabled");
    $("#btnLimpiarCAB").hide();
    $("#btnRecibir").hide();

    $("#cbo_ProveedorBuscar").val(0);
    $("#txtOrdenCompraBuscar").val("");
    $("#txtDesde").val(PrimerDia);
    $("#txtHasta").val(FechadelDia);
    $(".bloquear").attr('disabled', false);
    G_PedCAB = 0;
});


$("#btnEliminarCAB").click(function () {
    if (confirm("¿Desea anular la orden de compra?")) {
        EliminarPedido(G_PedCAB);
    }
});

function EliminarPedido(OrdenCabID) {
//si existe remito no se puede eliminar
    var json = JSON.stringify({ "ORD_CAB_ID": OrdenCabID });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/ComprasChekiarEliminaOrdenCompraInternacion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == 1) { // borra
                var json = JSON.stringify({ "ORD_CAB_ID": OrdenCabID });
                $.ajax({
                    type: "POST",
                    url: "../Json/Compras/ComprasInternacion.asmx/COM_ORDEN_CAB_DAR_BAJA",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (Resultado) {
                        alert("Orden de compra anulada.");
                        window.location = "Generar_OrdenCompra_Internacion.aspx?Desde=" + $("#txtDesde").val() + "&Hasta=" + $("#txtHasta").val();
                    },
                    error: errores
                });
            } else { alert("No se puede eliminar la orden de compra."); }
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
        url: "../Json/Compras/ComprasInternacion.asmx/COM_ORDEN_DET_LIST_BY_CAB",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var cabeceras = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            Tabla_Titulo = "<table id='TablaPedidoDetalles' class='table table-condensed' style='font-size:11px; text-align:center;'><thead><tr>" +
            "<th>Nro. Orden de Compra</th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
            $.each(cabeceras, function (index, exp) {
                //Tabla_Datos += "<tr class='tr_DET' id='tr" + exp.COM_ADM_INS_PEDIR_ID + "' onclick='MostrarDetalle(" + exp.COM_ADM_INS_PEDIR_ID + ")'>" +
                Tabla_Datos += "<tr class='tr_DET' id='tr" + exp.COM_ADM_INS_PEDIR_ID + "'>" +
                "<td style='cursor:default'>" + G_PedCAB + "</td>" +
                //"<td id='ORD_DET_INS_NOM" + exp.COM_ADM_INS_PEDIR_ID + "'>" + exp.PED_COM_DET_INS_DESC + "</td>" +
                "<td style='cursor:default' onclick='VerDocumentos(" + exp.COM_ADM_INS_PEDIR_ID + ")'><a class='btn btn-mini'>Ver documentos</></td>" +
                "<td style='cursor:default' id='ORD_DET_CANT" + exp.COM_ADM_INS_PEDIR_ID + "'>" + exp.COM_ADM_INS_PEDIR_CANT_PED + "</td>" +
                "<td style='display:none;' id='ORD_DET_INS_ID" + exp.COM_ADM_INS_PEDIR_ID + "'>" + exp.PED_COM_DET_INS_ID + "</td>" +
                "<td style='display:none;' id='PED_ID" + exp.COM_ADM_INS_PEDIR_ID + "'>" + exp.COM_ADM_INS_PEDIR_PED_ID + "</td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaPedidoDetalles").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        error: errores
    });
}


///// ver documentos del presupuesto con pantalla anterior
function VerDocumentos(PDT_ID) {

    $.fancybox({
        'href': "../Compras/Compras_Nuevo_Presupuesto_Internacion.aspx?PDT_ID=" + PDT_ID,
        'width': '60%',
        'height': '90%',
        'autoScale': false,
        'transitionIn': 'elastic',
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
///// ver documentos del presupuesto con pantalla anterior


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
        $(".datos_det").removeAttr("disabled");
    }

}

function VerPantallaDetalles() {
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top + 810 }, 500);
    $("#contCAB").hide();
    $("#contDET").show();
    $("#btnImprimir").show();
}

function MostrarDetalle(PDT_ID) {
    G_PDT_ID = PDT_ID;
    $(".tr_DET").css("background-color", "white");
    $("#tr" + PDT_ID).css("background-color", "grey");
    $("#PDT_INS_ID").val($("#ORD_DET_INS_ID" + PDT_ID).html());
    $("#PDT_CANTIDAD").val($("#ORD_DET_CANT" + PDT_ID).html());
    $("#PDT_INS_NOM").val($("#ORD_DET_INS_NOM" + PDT_ID).html());
    $("#PED_ID").val($("#PED_ID" + PDT_ID).html());
}

$("#btnLimpiarDET").click(function () {
    $(".tr_DET").css("background-color", "white");
    $(".detalles").val("");
    $(".detalles").removeAttr("checked");
    $(".detalles").html("");
    G_PDT_ID = 0;
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
    return DET;
}

function ValidarDET() {
    if (G_PedCAB <= 0) { alert("Seleccione Pedido."); return false; }
    if ($("#PDT_INS_ID").val().length == 0) { alert("Seleccione Insumo."); return false; }
    if ($("#PDT_CANTIDAD").val().trim().length == 0) { alert("Ingrese Cantidad."); return false; }
    return true;
}

$("#btnGuardarDET").click(function () {
    if (!ValidarDET()) return false;
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
    Print("../Impresiones/Compras/OrdenCompra_Internacion.aspx?ORD_CAB_ID=" + G_PedCAB);
});

function Print(url) {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            'width': '100%',
            'height': '80%',
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


