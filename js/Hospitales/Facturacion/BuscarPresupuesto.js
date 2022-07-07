$(document).ready(function () {
    List_Seccionales();
    List_ObraSociales(true);
    $("#txtDesde").datepicker();
    $("#txtHasta").datepicker();
    $("#txtDesde").val(FechaActual());
    $("#txtHasta").val(FechaActual_2(1));
});

function List_Seccionales() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Seccionales_Cargado,
        error: errores
    });
}

function List_Seccionales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Seccional) {
        $("#cbo_Seccional").append($("<option></option>").val(Seccional.Nro).html(Seccional.Seccional));
    });

}

function List_ObraSociales(Todas) {
    var json = JSON.stringify({ "Todas": Todas });
    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/ListObraSociales",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_ObraSociales_Cargado,
        error: errores
    });
}

function List_ObraSociales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Institucion").append($("<option></option>").val(0).html(""));
    $.each(Lista, function (index, Obra) {
        $("#cbo_Institucion").append($("<option></option>").val(Obra.id).html(Obra.OS));
    });
}

function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function List_Presupuestos() {
    var json = JSON.stringify({ "Nro_Presupuesto": $("#txtNroPresu").val(), "SeccionalId": $("#cbo_Seccional :selected").val(), "Institucion": $("#cbo_Institucion :selected").val(),
        "FechaDesde": $("#txtDesde").val(), "FechaHasta": $("#txtHasta").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/List_Presupuesto_Cab",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Presupuestos_Cargado,
        error: errores
    });
}

function List_Presupuestos_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista != null) {
        var Contenido = "";
        var i = 0;
        $("#trx").empty();
        var size = Lista.length;
        $.each(Lista, function (index, Detalle) {
            Contenido = Contenido + "<tr onclick=VerDetalles('" + Detalle.Presupuesto_Id + "');><td></td><td> " + Detalle.Presupuesto_Id + " </td><td> " + Detalle.Fecha + " </td><td> " + Detalle.Paciente + " </td><td> " + Detalle.Seccional + " </td></tr>";
            i = i + 1;
        });
        $("#trx").html(Contenido);
    }
    var Pie = "</tbody></table>";
}

$("#btnBuscar").click(function () {
    List_Presupuestos();
});

function VerDetalles(Nro) {
    window.location = "Presupuestos.aspx?Presupuesto=" + Nro;
}