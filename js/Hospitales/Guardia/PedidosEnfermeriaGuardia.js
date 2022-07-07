var MedicoId = 0;
var Fecha = "";

$(".radio").click(function () {
    CargarPedidos();
});

function LoadBoxes() {
    var json = JSON.stringify({ "FechaIni": $('#desde').val(), "HoraIni": $("#txtHoraIni").val(), "FechaFin": $('#hasta').val(), "HoraFin": $("#txtHoraFin").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/BoxesList",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadBoxes_Cargados,
        error: errores
    });
}

function LoadBoxes_Cargados(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Boxes").empty();
    $("#cbo_Boxes").append($("<option></option>").val("0").html("Seleccione Box..."));
    $.each(Lista, function (index, Box) {
        $("#cbo_Boxes").append($("<option></option>").val(Box.IDBOX).html(Box.NOMBREBOX));
    });
}


function CargarPedidos() {
    var Pendientes = false;
    if ($("#rdPedientes").is(":checked")) Pendientes = true;
    var json = JSON.stringify({ "MedicoId": MedicoId, "Todos": Pendientes });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Guardia/Guardia.asmx/GuardiaListaEnfermeria",
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
            Tabla_Datos = Tabla_Datos + "<tr onclick='javascript:Entregado(" + index + ");' class='" + pedido.Clase + "'><td></td><td id='PedidosFechas" + index + "'>" + pedido.Fecha + "</td><td id='PedidosPedido" + index + "'>" + pedido.Pedido + "</td><td style='display:none;' id='Box" + index + "'>" + pedido.ConsultorioId + "</td><td id='FechaEntregado" + index + "'>" + pedido.FechaEntregado + "</td></tr>";
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
    alert("Entregado el " + $("#FechaEntregado" + Id).html());
}

function Modificar(Pedido) {
    Fecha = $("#PedidosFechas" + Pedido).html();
    $("#txtPedido").val($("#PedidosPedido" + Pedido).html());
    $("#btn_Guardar").html("<i class='icon-ok'></i>&nbsp;Modificar");
    $("#btn_Cancelar").css("display", "inline-block");
    $("#cbo_Boxes").val($("#Box" + Pedido).html());
}

function Borrar(Pedido) {
    BorrarPedidos($("#PedidosFechas" + Pedido).html());
}

$("#btn_Cancelar").click(function () {
    Fecha = "";
    $("#txtPedido").val("");
    $("#btn_Guardar").html("<i class='icon-ok'></i>&nbsp;Agregar");
    $("#btn_Cancelar").css("display", "none");
    $("#cbo_Boxes").val('0');
});

function GuardarPedidos(Fecha) {
    if (!Validar()) return false;
    var p = {};
    p.MedicoId = MedicoId;
    p.ConsultorioId = $('#cbo_Boxes option:selected').val();
    p.Pedido = $('#txtPedido').val().trim().toUpperCase()
    p.Fecha = Fecha;

    var json = JSON.stringify({"p": p});

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Guardia/Guardia.asmx/GuardiaSaveEnfermeria",
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

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var yyyy = currentDt.getFullYear();
    var f = dd + '/' + mm + '/' + yyyy;
    $("#desde").val(f);
    $("#hasta").val(f);
    $("#txtHoraIni").val("00:00");
    $("#txtHoraFin").val("23:59");
    Fecha = f;
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

    LoadBoxes();
    CargarPedidos();

});

function Validar() { 
    if (MedicoId == 0){alert("Ingrese Médico."); return false;}
    if (Fecha.trim().length == 0) {Fecha = new Date(); }
    if ($("#cbo_Boxes :selected").val() == "0") { alert("Ingrese Box."); return false; }
    if ($('#txtPedido').val().trim().length == 0) { alert("Ingrese Pedido."); return false; }
    return true;
}


function BorrarPedidos(Fecha) {
    var json = JSON.stringify({
        "MedicoId": MedicoId,
        "fecha": Fecha
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Guardia/Guardia.asmx/GuardiaDeleteEnfermeria",
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
