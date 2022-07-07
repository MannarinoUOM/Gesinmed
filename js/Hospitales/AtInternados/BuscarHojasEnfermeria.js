
$(document).ready(function () {
    List_Medicos();
    List_Servicios();
    Initcontrols();
});

function Initcontrols() {
    $("#desde").datepicker();
    $("#hasta").datepicker();
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    $("#hasta").mask("99/99/9999", { placeholder: "-" });
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = fecha_ultimo_dia_mes(mm, yyyy);
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#desde").val(p);
    $("#hasta").val(d);
}

function List_Medicos() {
    var json = JSON.stringify({ "EspId": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Medicos_Por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

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
    var Lista = Resultado.d;
    $.each(Lista, function (index, Servicio) {
        $("#cbo_Servicios").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
    });

}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });

}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnBuscar").click(function () {
    Buscar_Pedidos();
});

function Buscar_Pedidos() {
    var json = JSON.stringify({ "NHC": $("#txtNHC").val(), "MedicoId": $("#cbo_Medicos :selected").val(), "FechaDesde": $("#desde").val(), "FechaHasta": $("#hasta").val(), "ServicioId": $("#cbo_Servicios :selected").val(), "Afiliado": $("#txtNombre").val().trim() });
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/Hoja_Enfermeria_List",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pedidos_Cargados,
        error: errores
    });

}

function Pedidos_Cargados(Resultado) {
    Pedidos = Resultado.d;
    var Tabla_Datos = "";
    Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Paciente</th><th>NHC</th><th>Médico</th><th>Servicio</th><th>Fecha</th></tr></thead><tbody>";
    $.each(Pedidos, function (index, Hoja) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('HojaEnfermeria.aspx?Id=" + Hoja.IdHoja + "');";
        Tabla_Datos = Tabla_Datos + "><td></td><td>" + Hoja.Paciente + "</td><td>" + Hoja.NHC + "</td><td>" + Hoja.Medico + "</td><td>" + Hoja.Servicio + "</td><td>" + Hoja.Fecha + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

}

function Ventana(url) {
    document.location = url;
}
