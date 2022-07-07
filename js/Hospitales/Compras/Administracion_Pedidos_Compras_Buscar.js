

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
    Query = GetQueryString();
    Desde = Query['Desde'];
    Hasta = Query['Hasta'];
    List_Servicios();
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    if (Query['Desde'] == undefined) {
        $("#desde").val(p);
        $("#hasta").val(d);
    }
    else {
        $("#desde").val(Desde);
        $("#hasta").val(Hasta);
        
    }
    $("#txtNroPed").mask("9?99999999", { placeholder: "", clearOnLostFocus: true });
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    $("#hasta").mask("99/99/9999", { placeholder: "-" });
});

function List_Servicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Cargado,
        complete: function () {
            if (Desde.length > 0) $("#btnBuscar").click(); //Si vuelve del pedido con params, buscar luego de cargar servicios...
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


$("#btnCargar").click(function () {
    window.location = "Administracion_Pedidos_Compras.aspx";
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
    var valid = $("#frm_Main").valid();
    if (valid)
         Buscar_Pedidos();
});

function Buscar_Pedidos() {
    var PedidoId = $('#txtNroPed').val().trim();
    if (PedidoId.trim().length == 0) PedidoId = 0;
    var json = JSON.stringify({ "Desde": $('#desde').val(), "Hasta": $('#hasta').val(), "Ped_Id": PedidoId, "ServicioId": $("#cbo_Servicio :selected").val()});
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_PEDIDOS_BUSCAR",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pedidos_Cargados,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaPedidos_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaPedidos_div").show();
        }
    });

}

function Pedidos_Cargados(Resultado) {
    var Pedidos = Resultado.d;
    if (Pedidos.length > 0) {
        var Tabla_Datos = "";
        Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Pedido</th><th>Servicio</th><th>Fecha</th><th>Usuario</th></tr></thead><tbody>";
        $.each(Pedidos, function (index, Pedido) {
            Tabla_Datos = Tabla_Datos + "<tr";
            Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('Administracion_Pedidos_Compras.aspx?Id=" + Pedido.PED_COM_ID + "&Desde="+ $("#desde").val() +"&Hasta="+ $("#hasta").val() +"');";
            Tabla_Datos = Tabla_Datos + "><td>" + Pedido.PED_COM_ID + "</td><td>" + Pedido.PED_COM_SERV_DESC + "</td><td>" + Pedido.PED_COM_FECHA + "</td><td>" + Pedido.PED_COM_USUARIO_NOM + "</td></tr>";
        });
        Tabla_Fin = "</tbody></table>";
        $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    }
    else {
        $("#TablaPedidos_div").empty();
    }
}

function Ventana(url) {
    document.location = url;
}

