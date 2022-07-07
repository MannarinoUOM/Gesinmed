var MedicoId = 0;
var Cuales = 1;
var Fecha = "";
var Cantidades_Estado = [0, 0];

function CargarPedidos() {

    var json = JSON.stringify({
        "MedicoId": $('#cbo_Medico option:selected').val(),
        "ConsultorioId": $('#cbo_Consultorio option:selected').val(),
        "Cuales": Cuales
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/PedidosEnfermeria.asmx/Cargar_Pedido_Todos",
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
    $(".ref_4").html("Pendientes (" + Cantidades_Estado[0] + ")");
    $(".ref_1").html("Entregados (" + Cantidades_Estado[1] + ")");
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

    Tabla_Titulo = "<table id='TablaPedidos' class='table table-hover table-condensed'><thead><tr><th></th><th>Consultorio</th><th>Médico</th><th>Fecha Pedido</th><th>Pedido</th><th>Fecha Entrega</th></tr></thead><tbody>";
    $.each(Pedidos, function (index, pedido) {
        if (pedido.Estado != "Entregado") {
            Cantidades_Estado[0]++;
            Tabla_Datos = Tabla_Datos + "<tr class='" + pedido.Clase + "'><td><a class='btn btn-mini btn-success' onclick='javascript:Entregar(" + index + ", " + pedido.ConsultorioId + "," + pedido.MedicoId + ");'><i class='icon-edit'></i></a></td><td>" + pedido.Consultorio + "</td><td>" + pedido.Medico + "</td><td id='PedidosFechas" + index + "'>" + pedido.Fecha + "</td><td id='PedidosPedido" + index + "'>" + pedido.Pedido + "</td><td></td></tr>";
        }
        else {
            Cantidades_Estado[1]++;
            Tabla_Datos = Tabla_Datos + "<tr class='" + pedido.Clase + "'><td><a class='btn btn-mini yellow' onclick='javascript:Cancelar(" + index + ", " + pedido.ConsultorioId + "," + pedido.MedicoId + ");'><i class='icon-check'></i></a></td><td>" + pedido.Consultorio + "</td><td>" + pedido.Medico + "</td><td id='PedidosFechas" + index + "'>" + pedido.Fecha + "</td><td id='PedidosPedido" + index + "'>" + pedido.Pedido + "</td><td>" + pedido.FechaEntregado + "</td></tr>";
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
        url: "../Json/AtConsultorio/PedidosEnfermeria.asmx/PedidoEntregar",
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
        url: "../Json/AtConsultorio/PedidosEnfermeria.asmx/PedidoCancelar",
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

    CargarConsultorios();
    
    Cual();

});


function CargarConsultorios() {
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/Consultorios.asmx/Consultorio_Lista_DA",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConsultorios_Cargados,
        error: errores,
        complete: function () {
            Cargar_Medicos_por_Especialidad();
        }
    });
}


function CargarConsultorios_Cargados(Resultado) {

    var Consultorios = Resultado.d;
    $('#cbo_Consultorio').empty();
    $('#cbo_Consultorio').append('<option value="0">TODOS</option>');
    $.each(Consultorios, function (index, consultorios) {
        $('#cbo_Consultorio').append(
              $('<option></option>').val(consultorios.ConsultorioID).html(consultorios.Consultorio)
            );
    });
}


function Cargar_Medicos_por_Especialidad() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: '{Especialidad: "0"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        error: errores,
        complete: function () {
            CargarPedidos();
        }
    });

   

}


function Medicos_por_Especialidad_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $('#cbo_Medico').empty();
    $('#cbo_Medico').append('<option value="0">TODOS</option>');
    $.each(Medicos, function (index, medicos) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
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


$("#cbo_Consultorio").change(function () {
    CargarPedidos();
});

$("#cbo_Medico").change(function () {
    CargarPedidos();
});