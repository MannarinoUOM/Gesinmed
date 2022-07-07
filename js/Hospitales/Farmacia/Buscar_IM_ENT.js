var Cantidad_Estado = [0, 0, 0]; //Entregados,Pendientes,Parciales


var Desde;
var Hasta;
var ServId;

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

function Contadores() {
    $("#btn_Libres").html("Pendientes (" + Cantidad_Estado[0] + ")");
    $("#btn_SobreT").html("Entregados (" + Cantidad_Estado[1] + ")");
    $("#btn_Parciales").html("Parciales (" + Cantidad_Estado[2] + ")");

    var Totales = Cantidad_Estado[0] + Cantidad_Estado[1] + Cantidad_Estado[2];
    $("#btn_Todos").html("Todos (" + Totales + ")");
}

$(document).ready(function () {
    List_Servicios();
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txtNroPed").mask("9?9999999999", { placeholder: "-" });
    $("#hasta").mask("99/99/9999", { placeholder: "-" });
    $("#desde").mask("99/99/9999", { placeholder: "-" });

    var Query = {};
    Query = GetQueryString();

    Desde = Query['Desde'];
    Hasta = Query['Hasta'];
    ServId = Query['ServId'];

    if (Query['ServId'] != null && Query['ServId'] != undefined) {
        $("#desde").val(Desde);
        $("#hasta").val(Hasta);
    }
    else {
        var currentDt = new Date();
        var mm = currentDt.getMonth() + 1;
        mm = (mm < 10) ? '0' + mm : mm;
        var yyyy = currentDt.getFullYear();
        var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
        var d = dia + '/' + mm + '/' + yyyy;
        var p = '01' + '/' + mm + '/' + yyyy;
        // $("#desde").val(p);
        //pedido por miguel el 12/1/21 para que traiga por default la fecha del dia
        $("#desde").val(d);
        $("#hasta").val(d);
    }
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
            $("#cbo_Servicio").val(ServId);
            $("#btnBuscar").click();
        },
        error: errores
    });
}

function List_Servicios_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Servicio) {
        $("#cbo_Servicio").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
    });
}

$("#btn_Libres").click(function () {
    $(".reff").removeClass("reff_activo");
    $("#btn_Libres").addClass("reff_activo");
    Buscar();
});

$("#btn_SobreT").click(function () {
    $(".reff").removeClass("reff_activo");
    $("#btn_SobreT").addClass("reff_activo");
    Buscar();
});

$("#btn_Todos").click(function () {
    $(".reff").removeClass("reff_activo");
    $("#btn_Todos").addClass("reff_activo");
    Buscar();
});

$("#btn_Parciales").click(function () {
    $(".reff").removeClass("reff_activo");
    $("#btn_Parciales").addClass("reff_activo");
    Buscar();
});


$("#btnBuscar").click(function () {
    Buscar();
});

function Buscar() {
    var Pendiente = 0;

    if ($("#btn_SobreT").hasClass("reff_activo")) Pendiente = 0; // busca  entregados
    if ($("#btn_Libres").hasClass("reff_activo")) Pendiente = 1; // busca pendientes
    if ($("#btn_Todos").hasClass("reff_activo")) Pendiente = 2; // busca todos 
    if ($("#btn_Parciales").hasClass("reff_activo")) Pendiente = 3; // busca parciales 

    var json = JSON.stringify({ "NHC": $('#txtNHC').val(), "Id": $('#txtNroPed').val(), "Hasta": $('#hasta').val(), "Desde": $('#desde').val(), "ServicioId": $('#cbo_Servicio :selected').val(), "Pendiente": Pendiente });
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/BuscarIM_ENT",
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
            Contadores();
        }
    });
}

function Pedidos_Cargados(Resultado) {
    Pedidos = Resultado.d;
    var Tabla_Datos = "";
    Cantidad_Estado = [0, 0, 0]; //Entregados,Pendientes,Parciales
    Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Pedido</th><th>Servicio</th><th>Sala</th><th>Cama</th><th>NHC</th><th>Paciente</th><th>Fecha</th></tr></thead><tbody>";
    $.each(Pedidos, function (index, Pedido) {
        //alert(Pedido.Pendiente);
        Clase = "Turnos_Libres";
        if (Pedido.Pendiente == 0) { Cantidad_Estado[1]++; Clase = "Turnos_Ocupados"; } //Entregados = 0
        if (Pedido.Pendiente == 1) { Cantidad_Estado[0]++; Clase = "Turnos_Libres"; } //Pendientes = 1 
        if (Pedido.Pendiente == 2) { Cantidad_Estado[2]++; Clase = "Turnos_Sobreturno"; } //Parciales = 2
        Tabla_Datos = Tabla_Datos + "<tr class='" + Clase + "'";
        Tabla_Datos = Tabla_Datos + " style='cursor:pointer;font-size:11px;' onclick=Ventana('CargarEntregaIM.aspx?Desde=" + $("#desde").val() + "&Hasta=" + $("#hasta").val() + "&ServId=" + $("#cbo_Servicio :selected").val() + "&Id=" + Pedido.IM_Id + "&Pendiente=" + Pedido.Pendiente + "');";
        Tabla_Datos = Tabla_Datos + "><td>" + Pedido.IM_Id + "</td><td>" + Pedido.Servicio + "</td><td>" + Pedido.Sala + "</td><td>" + Pedido.Cama + "</td><td>" + Pedido.NHC + "</td><td>" + Pedido.Nombre + "</td><td>" + Pedido.Fecha + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

}

function Ventana(url) {
    document.location = url;
}



$("#btnImprimir").click(function () {
    $.fancybox({
        'href': "../Impresiones/ReportesFarmacia/listado_de_medicamentos_por_servicio.aspx?NHC=" + $('#txtNHC').val() + "&Pedido_Id=" + $('#txtNroPed').val() + "&Desde=" + $('#desde').val() + "&Hasta=" + $('#hasta').val() + "&ServicioId=" + $('#cbo_Servicio :selected').val() + "&Pendiente=" + 0 + "&PDF=1",
        'width': '90%',
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
});