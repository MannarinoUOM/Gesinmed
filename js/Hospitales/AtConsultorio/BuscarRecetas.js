var NHC = 0;
var UOMID = 0;
var MedicoId = 0;
var EspId = 0;

$(document).ready(function () {
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
    }

    if (GET["EspId"] != "" && GET["EspId"] != null) {
        EspId = GET["EspId"];
    }

    if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
        MedicoId = GET["MedicoId"];
    }

    if (GET["UOMID"] != "" && GET["UOMID"] != null) {
        UOMID = GET["UOMID"];
        $("#txtNHC").val(UOMID);
        $("#btnBuscar").click();
    }


    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });

    $("#txtFechaInicioEntregado").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFinEntregado").mask("99/99/9999", { placeholder: "-" });

    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });

    $("#txtFechaInicio").datepicker();
    $("#txtFechaFin").datepicker();
    $("#txtFechaInicioEntregado").datepicker();
    $("#txtFechaFinEntregado").datepicker();

});

$("#btnBuscar").click(function () {
    BuscarRecetas();
});

$("#btnVolver").click(function () {
    document.location = "Receta.aspx?NHC="+NHC+"&MedicoId="+MedicoId+"&EspId="+EspId;
});


function BuscarRecetas() {
    var json = JSON.stringify({
        "NHC": $("#txtNHC").val(),
        "paciente": $("#txtAfiliado").val().trim(),
        "Ingresodesde": $("#txtFechaInicio").val(),
        "Ingresohata": $("#txtFechaFin").val(),
        "Egresodesde": $("#txtFechaInicioEntregado").val(),
        "Egresohasta": $("#txtFechaFinEntregado").val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/BuscarReceta",
        data: json,
        beforeSend: function () {
            $('#TablaResultado').empty();
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: BuscarRecetas_Cargado,
        error: errores
    });
}

function BuscarRecetas_Cargado(Resultado) {
    var Busquedas = Resultado.d;
    var PError = false;
    var Datos = "";
    $.each(Busquedas, function (index, busqueda) {

        Datos = Datos + "<tr ";
        Datos = Datos + " onclick='javascript:Cargar_Recetas(" + busqueda.protocolo + "," + busqueda.medicoId + ");' >";
        Datos = Datos + "<td>" + busqueda.fechainicio + "</td>";
        Datos = Datos + "<td>" + busqueda.fechaentrega + "</td>";
        Datos = Datos + "<td>" + busqueda.NHC + "</td>";
        Datos = Datos + "<td>" + busqueda.apellido + "</td>";
        Datos = Datos + "<td>" + busqueda.medico + "</td></tr>";
    });

    $('#TablaResultado').html(Datos);
}

function Cargar_Recetas(Protocolo,medicoId) {
    self.location = "Receta.aspx?Protocolo=" + Protocolo + "&MedicoId=" + MedicoId + "&MedicoIdOrigin=" + medicoId;
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}