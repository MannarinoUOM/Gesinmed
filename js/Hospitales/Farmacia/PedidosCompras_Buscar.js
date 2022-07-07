var objBusquedaLista;
var total_serv;
var plantilla = 0;

$(document).ready(function () {
    $("#frm_Main").validate({
        rules: {
            'desde': { dateES: true },
            'hasta': { dateES: true }
        },
        messages: {
            'desde': { dateES: '' },
            'hasta': { dateES: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });

    var Query = {};
    // $("#btnConfirmarPedido").attr("disabled", true);
    Query = GetQueryString();
    plantilla = Query['plantilla'];


    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#desde").val(p);
    $("#hasta").val(d);
    $("#txtNroPed").mask("9?99999999", { placeholder: "", clearOnLostFocus: true });
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    $("#hasta").mask("99/99/9999", { placeholder: "-" });
    List_Servicios();
});

$(function () {
    $("#desde").datepicker({
        onClose: function (selectedDate) {
            $("#hasta").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#hasta").datepicker({
        onClose: function (selectedDate) {
            $("#desde").datepicker("option", "maxDate", selectedDate);
        }
    });
});


$("#desde").blur(function () {
    $("#desde").removeClass("error");
});

$("#hasta").blur(function () {
    $("#hasta").removeClass("error");
});

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
    var Servicio = Resultado.d;
     $.each(Servicio, function (index, serv) {
         $('#cbo_Servicio').append($('<option></option>').val(serv.id).html(serv.descripcion));
    });
}

$("#btnCargar").click(function () {
    window.location = "PedidosCompras.aspx";
});


$("#txtNroPed").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtNroPed').attr('readonly') == undefined) {
            $("#btnBuscar").click();
        }
    }
});


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnBuscar").click(function () {
    if ($("#frm_Main").valid()) 
        Buscar_Pedidos();
});

function Buscar_Pedidos() {
    var NroPed = $('#txtNroPed').val();
    var Serv = $("#cbo_Servicio :selected").val();
    if ($('#txtNroPed').val().trim().length == 0) NroPed = 0;
    if ($("#cbo_Servicio :selected").val() == "") Serv = 0;

    var json = JSON.stringify({ "PED_COM_ID": NroPed, "FechaDesde": $('#desde').val(), "FechaHasta": $('#hasta').val(), "ServicioId": Serv });
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/COMPRAS_PED_CAB_LIST_BY_ID",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pedidos_Cargados,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaPedidos_div").hide();
            $("#TablaPedidos_div").empty();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaPedidos_div").show();
        }
    });
}

function Pedidos_Cargados(Resultado) {
    Pedidos = Resultado.d;
        var Tabla_Datos = "";
        Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Pedido</th><th>Servicio</th><th>Fecha</th><th>Usuario</th></tr></thead><tbody>";
        $.each(Pedidos, function (index, Pedido) {
            Tabla_Datos = Tabla_Datos + "<tr";
            Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('PedidosCompras.aspx?Id=" + Pedido.PED_COM_ID + "');";
            Tabla_Datos = Tabla_Datos + "><td>" + Pedido.PED_COM_ID + "</td><td>" + Pedido.PED_COM_SERV_DESC + "</td><td>" + Pedido.PED_COM_FECHA + "</td><td>" + Pedido.PED_COM_USU_DESC + "</td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function Ventana(url) {
    document.location = url;
}

/////////////////////////////////manu
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