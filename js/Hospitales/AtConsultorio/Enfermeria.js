var MedicoId = 0;
var Fecha = "";

$(".radio").click(function () {
    CargarPedidos();
});

$("#btnFinalizar").click(function () {
    parent.$.fancybox.close();
});

function CargarPedidos() {
    var Pendientes = false;
    if ($("#rdPedientes").is(":checked")) Pendientes = true;
    var json = JSON.stringify({"MedicoId": MedicoId, "Todos": Pendientes});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/PedidosEnfermeria.asmx/Cargar_Pedido",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarPedidos_Cargados,
        error: errores
    });
}

function CargarPedidos_Cargados(Resultado) {
    var Pedidos = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";

    $("#TablaPedidos").empty();

    Tabla_Titulo = "<table id='TablaTurnos' class='table table-hover table-condensed'><thead><tr><th></th><th>Fecha Pedido</th><th>Pedido</th><th>Fecha Entrega</th></tr></thead><tbody>";
    $.each(Pedidos, function (index, pedido) {
        if (pedido.Estado != "Entregado") {
            Tabla_Datos = Tabla_Datos + "<tr><td><a class='btn btn-mini btn-danger' onclick='javascript:Borrar(" + index + ");'>Quitar</a></td><td onclick='javascript:Editar(" + index + ");' id='PedidosFechas" + index + "'>" + pedido.Fecha + "</td><td onclick='javascript:Editar(" + index + ");' id='PedidosPedido" + index + "'>" + pedido.Pedido + "</td><td style='display:none;' id='Box" + index + "'>" + pedido.ConsultorioId + "</td><td></td></tr>";
        }
        else {
            Tabla_Datos = Tabla_Datos + "<tr onclick='javascript:Entregado(" + index + ");' class='" + pedido.Clase + "'><td></td><td id='PedidosFechas" + index + "'>" + pedido.Fecha + "</td><td id='PedidosPedido" + index + "'>" + pedido.Pedido + "</td><td id='FechaEntregado" + index + "'>" + pedido.FechaEntregado + "</td><td style='display:none;' id='Box" + index + "'>" + pedido.ConsultorioId + "</td></tr>";
        }
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaPedidos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

}

$("#btn_Guardar").click(function () {
    GuardarPedidos(Fecha);
});


function Editar(Pedido) {
    Modificar(Pedido);
}

function Entregado(Id) {
    alert("Entregado el " + $("#FechaEntregado"+Id).html());
}

function Modificar(Pedido) {
    Fecha = $("#PedidosFechas" + Pedido).html();
    $("#txtPedido").val($("#PedidosPedido" + Pedido).html());
    $("#btn_Guardar").html("<i class='icon-ok'></i>&nbsp;Modificar");
    $("#btn_Cancelar").css("display", "inline-block");
    $("#cbo_Consultorio").val($("#Box" + Pedido).html());   
}

function Borrar(Pedido) {
    BorrarPedidos($("#PedidosFechas" + Pedido).html());
}

$("#btn_Cancelar").click(function () {
    Fecha = "";
    $("#txtPedido").val("");
    $("#btn_Guardar").html("<i class='icon-ok'></i>&nbsp;Agregar");
    $("#btn_Cancelar").css("display", "none");
    $("#cbo_Consultorio").val("0");
});

function Validar() {
    if (MedicoId == 0) { alert("Ingrese Médico."); return false; }
    if ($("#cbo_Consultorio :selected").val() == "0") { alert("Ingrese Consultorio."); return false; }
    if ($('#txtPedido').val().trim().length == 0) { alert("Ingrese Pedido."); return false; }
    return true;
}

function GuardarPedidos(Fecha) {
    if (!Validar()) return false;
var json = JSON.stringify({
        "MedicoId": MedicoId,
        "ConsultorioId": $('#cbo_Consultorio option:selected').val(),
        "Pedido": $('#txtPedido').val().trim().toUpperCase(),
        "fecha": Fecha
    });
    

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/PedidosEnfermeria.asmx/Guardar_Pedido",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: PedidosGuardados,
        error: errores
    });
}

function PedidosGuardados(Resultado) {
    var Pedidos = Resultado.d;
    $("#btn_Cancelar").click();
    CargarPedidos();
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    var GET = {};


    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    if (GET["MEDICOID"] != "" && GET["MEDICOID"] != null) {
        MedicoId = GET["MEDICOID"];
    }

    CargarConsultorios();
    CargarPedidos();

});

function CargarConsultorios() {
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/Consultorios.asmx/Consultorio_Lista_DA",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConsultorios_Cargados,
        error: errores
    });
}


function CargarConsultorios_Cargados(Resultado) {

    var Consultorios = Resultado.d;
    $('#cbo_Consultorio').empty();
    $('#cbo_Consultorio').append('<option value="0">CONSULTORIOS</option>');
    $.each(Consultorios, function (index, consultorios) {
        $('#cbo_Consultorio').append(
              $('<option></option>').val(consultorios.ConsultorioID).html(consultorios.Consultorio)
            );
    });
}


function BorrarPedidos(Fecha) {

    var json = JSON.stringify({
        "MedicoId": MedicoId,
        "fecha": Fecha
    });


    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/PedidosEnfermeria.asmx/Borrar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: BorrarPedidosGuardados,
        error: errores
    });
}

function BorrarPedidosGuardados(Resultado) {
    var Pedidos = Resultado.d;
    CargarPedidos();
}
