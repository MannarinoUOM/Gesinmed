var oTabla;
var Cambio = false;

$(document).ready(function () {
    InitControls();
    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    if (GET["ExpId"] != "" && GET["ExpId"] != null) {
        G_ExpId = GET["ExpId"];
    }
});

function Buscar_Pedidos(FechaRemito_Desde, FechaRemito_Hasta, Nro_Remito_Desde, Nro_Remito_Hasta, Nom_Insumo, NroPedido_Desde, NroPedido_Hasta, Pendientes, Entregados,
Paciente, Seccional, Deposito) {
    if (FechaRemito_Desde.length == 0) FechaDesde = '01/01/1900';
    if (FechaRemito_Hasta.length == 0) FechaHasta = '01/01/1900';
    if (Nro_Remito_Desde.length == 0) Nro_Remito_Desde = 0;
    if (Nro_Remito_Hasta.length == 0) Nro_Remito_Hasta = 0;
    if (NroPedido_Desde.length == 0) NroPedido_Desde = 0;
    if (NroPedido_Hasta.length == 0) NroPedido_Hasta = 0;

    var json = JSON.stringify({ "FechaRemito_Desde": FechaRemito_Desde, "FechaRemito_Hasta": FechaRemito_Hasta, "Nro_Remito_Desde": Nro_Remito_Desde, "Nro_Remito_Hasta": Nro_Remito_Hasta,
        "Nom_Insumo": Nom_Insumo, "NroPedido_Desde": NroPedido_Desde, "NroPedido_Hasta": NroPedido_Hasta, "Pendientes": Pendientes, "Entregados": Entregados,
        "Paciente": Paciente, "Seccional": Seccional, "Deposito": Deposito
    });

    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/COMPRAS_INFORME_GLOBAL_LIST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            var Pedidos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $.each(Pedidos, function (index, exp) {
                Tabla_Datos += "<tr id='tr" + index + "' class='tr_listado' rel='" + index + "'><td style='display:none;' id='EntDetId" + index + "'>" + exp.EntDetId + "</td><td id='trNroExpCAB" + index + "' style='display:none;'>" + exp.NroExp + "</td><td id='NroRemitoEnt" + index + "'>" + exp.NroRemitoEnt + "</td><td id='EXP_PED_FECHA" + index + "'>" + exp.Insumo + "</td><td id='Pedido" + index + "'>" + exp.Pedido + "</td><td id='tdDescuento" + index + "' data-id='" + index + "'>" + exp.Descuento + "</td><td id='FarCant" + index + "' data-col='FarCant' data-id='" + index + "' class='td_editable' contenteditable>" + exp.FarCant + "</td><td id='FarPrecio" + index + "' data-col='FarPrecio' data-id='" + index + "' class='td_editable' contenteditable>$" + exp.FarPrecio + "</td><td id='FarDesc" + index + "' data-col='FarDesc' data-id='" + index + "' class='td_editable' contenteditable>$" + exp.FarDesc + "</td><td>" + exp.Saldo + "</td><td>" + exp.Fecha + "</td><td>" + exp.Deposito + "</td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#example").html(Tabla_Datos + Tabla_Fin);
            $("#lbl_CantidadReg").html(Pedidos.length);
        },
        beforeSend: function () {
            $("#cargando").show();
            $(".datosEXP").hide();
            $("#TablaPedidos").hide();
            $("#lbl_CantidadReg").html("0");
            $(".input-exp").val("");
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaPedidos").show();

            $(".datosEXP").show();
            $("#example").DataTable();
            $(".sorting_asc").click();
            $(".sorting_desc").click();
        },
        error: errores
    });
}

//Metodo para seleccionar todo el contenido de una celda//
jQuery.fn.selectText = function () {
    var doc = document;
    var element = this[0];
    //console.log(this, element);
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

var index_ant = 0;
var col_ant;

$(document).on('click', '.tr_listado', function () {
    index_ant = $(this).attr("rel");
    $('.tr_listado').css("background-color", "white");
    $('.td_editable').css("background-color", "white");
    ChangeColor($(this));
});

$(document).on('focus', '.td_editable', function () {
    var index = $(this).data("id");
    var col = $(this).data("col");
    if (index_ant != index || col_ant != col) { //Cambio de fila
        $("#tr" + index).click();
        index_ant = index;
        col_ant = col;
    }
    //ValidarEntregaDET(index);
    $(this).css("background-color", "white");
    $(this).selectText();

});

function CalcularDescuento(index) {
    var cant = $("#FarCant" + index).html();
    var precio = $("#FarPrecio" + index).html();
    if ($.isNumeric(cant) && $.isNumeric(precio)) {
        var porcentaje = parseFloat($("#tdDescuento" + index).html()) / 100;
        $("#FarDesc" + index).html(parseFloat(precio * porcentaje).toFixed(2));
    }
    else $("#FarDesc" + index).html("0");
}

$(document).on('keydown', '.td_editable', function (e) {
    if (e.which == 9) { //TAB
        var index = $(this).data("id");
        CalcularDescuento(index);
    }
    if (e.which == 13) { //Con enter pasa a fila siguiente...
        e.preventDefault();
        var index = $(this).data("id");
        CalcularDescuento(index);
        $("#tr" + (index + 1)).click();
        $("#FarCant" + (index + 1)).focus();
        return;
    }
    Cambio = true; //Se cambio algun valor en un celda...
    //Valido si es numero y si ingresa un punto que lo haga una sola vez...
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {

        if (e.keyCode == 190) {
            if ($(this).html().indexOf('.') == -1 && $(this).html().trim().length > 0) return;
            else e.preventDefault();
        }
        else return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function ValidarEntregaDET(index) {
    var EntDetId = $("#EntDetId" + index).html();
    var Precio = parseFloat($("#FarPrecio" + index).html().toString().replace('$', '').replace('.', ','));
    var Desc = parseFloat($("#FarDesc" + index).html().toString().replace('$', '').replace('.', ','));
    var Cant = $("#FarCant" + index).html();
    var CantidadPedida = $("#Pedido" + index).html().trim();

    if (EntDetId <= 0) { alert("Nro. Entrega no válido."); return false; }
    if (Precio.trim().length == 0) { alert("Precio no válido."); return false; }
    if (Desc.trim().length == 0) { alert("Descuento no válido."); return false; }
    if (Cant.trim().length == 0) { alert("Cantidad no válida."); return false; }
    if (Cant > CantidadPedida) { alert("La cantidad ingresada supera a la cantidad pedida."); return false; }

    return true;
}
var ult_index = {};

function ChangeColor(obj) {
    $(ult_index).css("background-color", "white");
    ult_index = obj;
    $(obj).css("background-color", "#999999");
    DatosExpediente($("#trNroExpCAB" + $(obj).attr("rel")).html());
}

function DatosExpediente(NroPed) {
    if (NroPed > 0) CargarExpediente_Pie(NroPed);
    else alert("Nro. de Pedido no válido.");
}

function CargarExpediente_Pie(NroPed) {
    if (NroPed > 0)
        Buscar_Expedientes(NroPed, 0, "", 0, 0, "", "", true, true, true, true);
    else alert("Nro. Expediente no válido.");
}

function Buscar_Expedientes(EXP_ID, EXP_ESTADO, EXP_NOMBRE, EXP_DIAG_ID, EXP_NRO_DOC, EXP_VENC_FECHA_DESDE,
        EXP_VENC_FECHA_HASTA, EXP_CERT_CASAM, EXP_CERT_DNI, EXP_CERT_DISC, EXP_CERT_SUELDO) {

    if (EXP_ID.length == 0) EXP_ID = 0;
    if (EXP_NRO_DOC.length == 0) EXP_NRO_DOC = 0;
    if (EXP_VENC_FECHA_DESDE.length == 0) EXP_VENC_FECHA_DESDE = "01/01/1900";
    if (EXP_VENC_FECHA_HASTA.length == 0) EXP_VENC_FECHA_HASTA = "01/01/1900";

    var json = JSON.stringify({ "EXP_ID": EXP_ID, "EXP_ESTADO": EXP_ESTADO, "EXP_NOMBRE": EXP_NOMBRE, "EXP_DIAG_ID": EXP_DIAG_ID, "EXP_NRO_DOC": EXP_NRO_DOC,
        "EXP_VENC_FECHA_DESDE": EXP_VENC_FECHA_DESDE, "EXP_VENC_FECHA_HASTA": EXP_VENC_FECHA_HASTA, "EXP_CERT_CASAM": EXP_CERT_CASAM,
        "EXP_CERT_DNI": EXP_CERT_DNI, "EXP_CERT_DISC": EXP_CERT_DISC, "EXP_CERT_SUELDO": EXP_CERT_SUELDO, "SeccionalesIds": null, "PatologiasIds": null,
        "NroPedidoId": 0
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/Expediente_Buscar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var expedientes = Resultado.d;
            $.each(expedientes, function (index, exp) {
                $("#txtNroExpediente").val(exp.EXP_ID);
                $("#txtDNI").val(exp.EXP_NRO_DOC);
                $("#txtSeccional").val(exp.EXP_SECCIONAL);
                $("#txtApellido").val(exp.EXP_NOMBRE);
                $("#txtVencExp").val(exp.EXP_VENC_FECHA);
                $("#txtPatologia").val(exp.EXP_PATOLOGIAS);
                $("#txtFecha").val(exp.EXP_FEC_NAC);
            });
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_Seccionales() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Seccionales_Cargado,
        complete: function () {
            Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#txtNroExpDesde").val(), $("#txtNroExpHasta").val(), $("#medicamento").val().trim(),
           $("#txtNroPedidoDesde").val(), $("#txtNroPedidoHasta").val(), $("#chk_Pendientes").is(":checked"), $("#chk_Entregados").is(":checked"),
           $("#Paciente").val().trim(), $("#cbo_Seccional :selected").val(), 0);
        },
        error: errores
    });
}

function List_Seccionales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Seccional").append($("<option></option>").val("0").html("Seleccione Seccional..."));
    $.each(Lista, function (index, Seccional) {
        $("#cbo_Seccional").append($("<option></option>").val(Seccional.Nro).html(Seccional.Seccional));
    });

}

function InitControls() {
    $('.date').mask("99/99/9999", { placeholder: "-" });
    $('.date').datepicker();
    var currentDt = new Date();
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = dd + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaDesde").val(p);
    $("#txtFechaHasta").val(d);
    List_Depositos(false);
    List_Seccionales();
    LoadDataTable();

}

/**
fn List_Depositos
param @Todos bool 
return Lista todos los depositos de compras
**/
function List_Depositos(Todos) {
    var json = JSON.stringify({ "Todos": Todos });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/List_Depositos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $("#cbo_Deposito").append($("<option></option>").val("0").html("Seleccione Depósito..."));
            $.each(Lista, function (index, Deposito) {
                $("#cbo_Deposito").append($("<option></option>").val(Deposito.ID).html(Deposito.DEPOSITO));
            });
        },
        error: errores
    });
}

function LoadDataTable() {
    oTabla = $('#example').DataTable({
        "bAutoWidth": false,
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "180px",
        "sScrollX": "100%",
        "sScrollXInner": "400%",
        "sScrollYInner": "100%",
        "bScrollCollapse": true,
        fixedHeader: {
            header: true,
            footer: false
        }
    });
}

$("#btnBuscar").click(function () {
    if (Cambio) {
        if (confirm("Los cambios realizados no se guardarán. ¿Desea continuar?")) {
            Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#txtNroExpDesde").val(), $("#txtNroExpHasta").val(), $("#medicamento").val().trim(),
           $("#txtNroPedidoDesde").val(), $("#txtNroPedidoHasta").val(), $("#chk_Pendientes").is(":checked"), $("#chk_Entregados").is(":checked"),
           $("#Paciente").val().trim(), $("#cbo_Seccional :selected").val(), $("#cbo_Deposito :selected").val());
            Cambio = false;
        }
    }
    else Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#txtNroExpDesde").val(), $("#txtNroExpHasta").val(), $("#medicamento").val().trim(),
           $("#txtNroPedidoDesde").val(), $("#txtNroPedidoHasta").val(), $("#chk_Pendientes").is(":checked"), $("#chk_Entregados").is(":checked"),
           $("#Paciente").val().trim(), $("#cbo_Seccional :selected").val(), $("#cbo_Deposito :selected").val());
});

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
////Opciones Pie////

$("#btnImprimir").click(function () {
    Imprimir_Listado($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#txtNroExpDesde").val(), $("#txtNroExpHasta").val(), $("#medicamento").val().trim(),
           $("#txtNroPedidoDesde").val(), $("#txtNroPedidoHasta").val(), $("#chk_Pendientes").is(":checked"), $("#chk_Entregados").is(":checked"),
           $("#Paciente").val().trim(), $("#cbo_Seccional :selected").val());
});

///Opciones//

$("#btnPedidos").click(function () {
    if ($("#txtNroExpediente").val() > 0)
        window.location = "Compras_Expediente_Pedidos.aspx?ExpId=" + $("#txtNroExpediente").val();
});

$("#btnVerExp").click(function () {
    if ($("#txtNroExpediente").val() > 0)
        window.location = "Compras_Expediente_Ficha.aspx?ExpId=" + $("#txtNroExpediente").val();
});


function Imprimir_Listado(FechaRemito_Desde, FechaRemito_Hasta, NroExp_Desde, NroExp_Hasta, Nom_Insumo, NroPedido_Desde, NroPedido_Hasta, Pendientes, Entregados,
Paciente, Seccional) {

    if (FechaRemito_Desde.length == 0) FechaRemito_Desde = '01/01/1900';
    if (FechaRemito_Hasta.length == 0) FechaRemito_Hasta = '01/01/1900';
    if (NroExp_Desde.length == 0) NroExp_Desde = 0;
    if (NroExp_Hasta.length == 0) NroExp_Hasta = 0;
    if (NroPedido_Desde.length == 0) NroPedido_Desde = 0;
    if (NroPedido_Hasta.length == 0) NroPedido_Hasta = 0;

    window.location = "../Impresiones/Compras/Compras_InformeGlobal.aspx?FechaRemito_Desde=" + FechaRemito_Desde + "&FechaRemito_Hasta=" + FechaRemito_Hasta + "&NroExp_Desde=" + NroExp_Desde + "&NroExp_Hasta=" + NroExp_Hasta + "&Insumo=" + Nom_Insumo + "&NroPedido_Desde=" + NroPedido_Desde + "&NroPedido_Desde=" + NroPedido_Hasta + "&Pendientes=" + Pendientes + "&Entregados=" + Entregados + "&Paciente=" + Paciente + "&Seccional=" + Seccional;
}


////Guardar Cambios//
$("#btnGuardar").click(function () {
    if (confirm("¿Desea confirmar los cambios realizados?")) {   //Recorro toda la tabla para guardar los nuevos valores...
        var objLista = new Array();
        $(".tr_listado").each(function (index) {
            var objDet = {};
            objDet.EntDetId = $("#EntDetId" + index).html(); //Ent Detalle Id
            objDet.FarPrecio = parseFloat($("#FarPrecio" + index).html().toString().replace('$', ''));
            objDet.FarDesc = parseFloat($("#FarDesc" + index).html().toString().replace('$', ''));
            objDet.FarCant = $("#FarCant" + index).html();
            objLista[index] = objDet;
            if (index == $(".tr_listado").size() - 1) ActualizarTabla(objLista); //Fin de la tabla, guardo todo...
        });
    }
});

function ActualizarTabla(objLista) {
    var json = JSON.stringify({ "objLista": objLista });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/COMPRAS_ENT_CONTROL_DET_UPDATE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#cargando").show();
            $(".datosEXP").hide();
            $("#TablaPedidos").hide();
            $("#lbl_CantidadReg").html("0");
            $(".input-exp").val("");
        },
        complete: function (Resultado) {
            Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#txtNroExpDesde").val(), $("#txtNroExpHasta").val(), $("#medicamento").val().trim(),
           $("#txtNroPedidoDesde").val(), $("#txtNroPedidoHasta").val(), $("#chk_Pendientes").is(":checked"), $("#chk_Entregados").is(":checked"),
           $("#Paciente").val().trim(), $("#cbo_Seccional :selected").val(), 0);
            Cambio = false;
        },
        error: errores
    });
}