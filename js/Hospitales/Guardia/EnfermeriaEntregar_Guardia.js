var MedicoId = 0;
var Cuales = 1;
var Fecha = "";
var Cantidades_Estado = [0, 0];

function CargarPedidos() {
    if ($('#cbo_Medico option:selected').val() == "") return false;
    var json = JSON.stringify({
        "MedicoId": $('#cbo_Medico option:selected').val(),
        "ConsultorioId": $('#cbo_Boxes option:selected').val(),
        "Cuales": Cuales
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Guardia/Guardia.asmx/Enfermeria_Cargar_Todos_Guardia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarPedidos_Cargados,
        complete: function () {
            Contadores();
        },
        error: errores
    });
}

function Contadores() {
    $(".ref_1").html("Entregados (" + Cantidades_Estado[1] + ")");
    $(".ref_4").html("Pendientes (" + Cantidades_Estado[0] + ")");
    var Totales = Cantidades_Estado[0] + Cantidades_Estado[1];
    $("#btn_Todos").html("Todos (" + Totales + ")");
}

function CargarPedidos_Cargados(Resultado) {
    var Pedidos = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    Cantidades_Estado = [0, 0]; //Entregados,Pendientes
    $("#Resultado").empty();

    Tabla_Titulo = "<table id='TablaPedidos' class='table table-hover table-condensed'><thead><tr><th></th><th>Box</th><th>Fecha Pedido</th><th>Pedido</th><th>Fecha Entrega</th></tr></thead><tbody>";
    $.each(Pedidos, function (index, pedido) {
        if (pedido.Estado != "Entregado") {
            Cantidades_Estado[0]++;
            Tabla_Datos = Tabla_Datos + "<tr class='" + pedido.Clase + "'><td><a class='btn btn-mini btn-success' onclick='javascript:Entregar(" + index + ", " + pedido.ConsultorioId + "," + pedido.MedicoId + ");'><i class='icon-edit'></i></a></td><td>" + pedido.Consultorio + "</td><td id='PedidosFechas" + index + "'>" + pedido.Fecha + "</td><td id='PedidosPedido" + index + "'>" + pedido.Pedido + "</td><td></td></tr>";
        }
        else {
            Cantidades_Estado[1]++;
            Tabla_Datos = Tabla_Datos + "<tr class='" + pedido.Clase + "'><td><a class='btn btn-mini yellow' onclick='javascript:Cancelar(" + index + ", " + pedido.ConsultorioId + "," + pedido.MedicoId + ");'><i class='icon-check'></i></a></td><td>" + pedido.Consultorio + "</td><td id='PedidosFechas" + index + "'>" + pedido.Fecha + "</td><td id='PedidosPedido" + index + "'>" + pedido.Pedido + "</td><td>" + pedido.FechaEntregado + "</td></tr>";
        }
    });

    Tabla_Fin = "</tbody></table>";
    $("#Resultado").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

}


function Entregar(Pos, Consultorio, MedicoId) {
    var json = JSON.stringify({
        "MedicoId": MedicoId,
        "ConsultorioId": Consultorio,
        "fecha": $("#PedidosFechas" + Pos).html()
    });

    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/EntregarGuardiaEnfermeria",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Ok,
        error: errores
    });

}

function Cancelar(Pos, Consultorio, MedicoId) {
    var json = JSON.stringify({
        "MedicoId": MedicoId,
        "ConsultorioId": Consultorio,
        "fecha": $("#PedidosFechas" + Pos).html()
    });

    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/CancelarGuardiaEnfermeria",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Ok,
        error: errores
    });

}

function Ok(R) {
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

    LoadMedicosGuardiabyEsp(0);
    LoadBoxes();
    Cual();

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
    //$("#cbo_Boxes").append($("<option></option>").val("0").html("TODOS"));
    $.each(Lista, function (index, Box) {
        $("#cbo_Boxes").append($("<option></option>").val(Box.IDBOX).html(Box.NOMBREBOX));
    });
}



function LoadMedicosGuardiabyEsp(Especialidad) {
    var json = JSON.stringify({ "Especialidad": Especialidad });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/MedicosGuardiabyEsp",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadMedicosGuardiabyEsp_Cargados,
        complete: function () {
            CargarPedidos();
        },
        error: errores
    });
}

function LoadMedicosGuardiabyEsp_Cargados(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medico").empty();
    $("#cbo_Medico").append($("<option></option>").val("0").html("TODOS"));
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}

function Cual() {
    $("#btn_Todos").removeClass("reff_activo");
    $("#btn_Entregados").removeClass("reff_activo");
    $("#btn_Pendientes").removeClass("reff_activo");

    if (Cuales == 1) { $("#btn_Todos").addClass("reff_activo"); }
    if (Cuales == 3) { $("#btn_Pendientes").addClass("reff_activo"); }
    if (Cuales == 2) { $("#btn_Entregados").addClass("reff_activo"); }
}

$("#btn_Todos").click(function () {
    Cuales = 1;
    Cual();
    CargarPedidos();
});

$("#btn_Entregados").click(function () {
    Cuales = 2;
    Cual();
    CargarPedidos();
});

$("#btn_Pendientes").click(function () {
    Cuales = 3;
    Cual();
    CargarPedidos();
});


$("#cbo_Boxes").change(function () {
    CargarPedidos();
});

$("#cbo_Medico").change(function () {
    CargarPedidos();
});