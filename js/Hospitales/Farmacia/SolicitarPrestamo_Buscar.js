

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

$("#btnCargar").click(function () {
    window.location = "SolicitarPrestamo.aspx";
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

    var json = JSON.stringify({ "Id": $('#txtNroPed').val(), "Desde": $('#desde').val(), "Hasta": $('#hasta').val() });
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/BuscarPedidosporPrestamo",
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
    Pedidos = Resultado.d;
    if (Pedidos.length > 0) {
        var Tabla_Datos = "";
        Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Egreso</th><th>Detalle</th><th>Fecha</th><th>Usuario</th></tr></thead><tbody>";
        $.each(Pedidos, function (index, Pedido) {
            Tabla_Datos = Tabla_Datos + "<tr";
            Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('SolicitarPrestamo.aspx?Id=" + Pedido.Pedido_Id + "');";
            Tabla_Datos = Tabla_Datos + "><td>" + Pedido.Pedido_Id + "</td><td>" + Pedido.Servicio + "</td><td>" + Pedido.Fecha + "</td><td>" + Pedido.Usuario + "</td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    }
    else {
        $("#TablaPedidos_div").empty();
        var leyenda = "No hay egresos existentes.";
        if ($("#txtNroPed").val().trim().length > 0) leyenda = "No existe el nro. de egreso " + $("#txtNroPed").val().trim();
        $("#TablaPedidos_div").html("<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><span><p style='margin-left:300px;text-allign:center;'><b>"+leyenda+"</b></p></span></table>");
    }
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