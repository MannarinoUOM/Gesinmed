$(document).ready(function () {
    ListMedicos(0);
    List_Centro();
    var parts = FechaActual().split('/');
    $("#txtAnioDesde").val(parts[2]);
    $("#txtAnioHasta").val(parts[2]);
    $("#txtMesHasta").val(parts[1]);
});

function ListMedicos(Especialidad) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        error: errores
    });

}

function Medicos_por_Especialidad_Cargados(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}


function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function List_Centro() {
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/Centro.asmx/CentroUnico",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Centro_Cargado,
        error: errores
    });
}


function List_Centro_Cargado(Resultado) {
    var Centro = Resultado.d;
    $("#cbo_Centro").append($("<option></option>").val(Centro.Id).html(Centro.RazonSocial));
}



function List_Rendiciones() {

    var Ambulatorio = false;
    if ($("#rdAmbulatorio").is(":checked")) Ambulatorio = true;

    var Internacion = false;
    if ($("#rdInternacion").is(":checked")) Internacion = true;

    var FechaDesde = "01/" + $("#txtMesDesde :selected").val() + "/" + $("#txtAnioDesde").val();
    var FechaHasta = "01/" + $("#txtMesHasta :selected").val() + "/" + $("#txtAnioHasta").val();

    var json = JSON.stringify({ "NroRendicion": $("#txtRendicion").val(), "MedicoId": $("#cbo_Medicos :selected").val(),"Ambulatorio": Ambulatorio, "Internacion": Internacion, "FechaDesde": FechaDesde, "FechaHasta": FechaHasta
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/List_RendicionesMedicos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Rendiciones_Cargado,
        error: errores
    });
}

function List_Rendiciones_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista != null) {
        var Contenido = "";
        var i = 0;
        $("#trx").empty();
        var size = Lista.length;
        $.each(Lista, function (index, Detalle) {
            Contenido = Contenido + "<tr onclick=VerDetalles('" + Detalle.NroRendicion + "');><td></td><td> " + Detalle.NroRendicion + " </td><td> " + Detalle.FechaFacturacion + " </td><td> " + Detalle.Año + " </td><td> " + Detalle.Mes + " </td><td> " + Detalle.Seccional + " </td></tr>";
            i = i + 1;
        });
        $("#trx").html(Contenido);
    }
    var Pie = "</tbody></table>";
}

$("#btnBuscar").click(function () {
    List_Rendiciones();
});

function VerDetalles(Nro) {
    window.location = "Facturacion_Medicos.aspx?Rendicion=" + Nro;
}