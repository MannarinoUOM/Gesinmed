$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function FechaActual() {
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var yyyy = currentDt.getFullYear();
    var date = dd + '/' + mm + '/' + yyyy;
    return (date);
}

$(document).ready(function () {
    List_Seccionales();
    var parts = FechaActual().split('/');
    $("#txtAnioDesde").val(parts[2]);
    $("#txtAnioHasta").val(parts[2]);
    $("#txtMesHasta").val(parts[1]);
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

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function List_Rendiciones() {
    var Ambulatorio = $("#rdAmbulatorio").is(":checked");
    var Internacion = $("#rdInternacion").is(":checked");
    var FechaDesde = "01/" + $("#txtMesDesde :selected").val() + "/" + $("#txtAnioDesde").val();
    var FechaHasta = "01/" + $("#txtMesHasta :selected").val() + "/" + $("#txtAnioHasta").val();

    var json = JSON.stringify({ "NroRendicion": $("#txtRendicion").val(), "SeccionalId": $("#cbo_Seccional :selected").val(),
    "Ambulatorio":Ambulatorio , "Internacion":Internacion, "FechaDesde": FechaDesde,"FechaHasta": FechaHasta});
        $.ajax({
            type: "POST",
            data : json,
            url: "../Json/Facturacion/Facturacion.asmx/List_Rendiciones",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $("#cargando").show();
                $("#TablaPartes_div").hide();
            },
            complete: function () {
                $("#cargando").hide();
                $("#TablaPartes_div").show();
            },
            success: List_Rendiciones_Cargado,
            error: errores
        });
}

function List_Rendiciones_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista != null) {
        var Contenido = "";
        $("#trx").empty();
        $.each(Lista, function (index, Detalle) {
            Contenido = Contenido + "<tr><td><a id='Elminar" + index + "'onclick='Eliminar(" + Detalle.NroRendicion + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Anular Rendicion'><i class='icon-remove-circle icon-white'></i></a></td><td title='Ver Rendicion' onclick=VerDetalles('" + Detalle.NroRendicion + "');> " + Detalle.NroRendicion + " </td><td> " + Detalle.FechaFacturacion + " </td><td> " + Detalle.Año + " </td><td> " + Detalle.Mes + " </td><td> " + Detalle.Seccional + " </td></tr>";
        });
        $("#trx").html(Contenido);
    }
    var Pie = "</tbody></table>";
}

function Eliminar(Rendicion) {
    var json = JSON.stringify({ "NroRendicion": Rendicion });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/Anular_Rendicion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Rendición anulada.");
            document.location = "BuscarRendicion.aspx";
        },
        error: errores
    });
}

$("#btnBuscar").click(function () {
    List_Rendiciones();
});

function VerDetalles(Nro) {
    var Ambulatorio = $("#rdAmbulatorio").is(":checked");
    window.location = "Facturacion.aspx?Rendicion="+Nro+"&Ambu="+Ambulatorio;
}