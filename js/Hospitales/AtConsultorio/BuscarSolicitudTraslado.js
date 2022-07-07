var NHC = 0;
var MedicoId = 0;
var UOMID = 0;

$(document).ready(function () {
    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });

    $("#txtFechaInicio").datepicker();
    $("#txtFechaFin").datepicker();

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

    if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
        MedicoId = GET["MedicoId"];
    }
    if (GET["UOMID"] != "" && GET["UOMID"] != null) {
        UOMID = GET["UOMID"];
        $("#txtNHC").val(UOMID);
        $("#btnBuscar").click();
    }

});

$("#btnBuscar").click(function () {
    BuscarSolicitudTraslado();
});

$("#btnVolver").click(function () {
    self.location = "SolicituddeTraslado.aspx?NHC="+NHC+"&MedicoId="+MedicoId;
});


function BuscarSolicitudTraslado() {

 var json = JSON.stringify({
        "nhc": $("#txtNHC").val(),
        "fechainicio": $("#txtFechaInicio").val(),
        "fechafinal": $("#txtFechaFin").val(),
        "Afiliado": $("#txtAfiliado").val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/BuscarSolicitudTraslado",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: BuscarSolicitudTraslado_Cargado,
        error: errores
    });
}

function BuscarSolicitudTraslado_Cargado(Resultado) {
    var Busquedas = Resultado.d;
    var PError = false;
    var Datos = "";
    $.each(Busquedas, function (index, busqueda) {

        Datos = Datos + "<tr ";
        Datos = Datos + " onclick='javascript:Cargar_Paciente_NHC(" + busqueda.NHC + "," + busqueda.protocolo + "," + busqueda.medicoid + ");' >";
        Datos = Datos + "<td>" + busqueda.fechaingreso + "</td>";
        Datos = Datos + "<td>" + busqueda.HC_UOM + "</td>";
        Datos = Datos + "<td>" + busqueda.paciente + "</td>";
        Datos = Datos + "<td>" + busqueda.medicoNombre + "</td>";
        Datos = Datos + "<td id='cargaId"+ busqueda.protocolo +"' style='display:none'>" + busqueda.medicoid + "</td></tr>";
    });

    $('#TablaResultado').html(Datos);
}

function Cargar_Paciente_NHC(NHC, Protocolo, MedicoId) {
//    alert($("#cargaId" + Protocolo).html());

//    return false;
    //self.location = "SolicituddeTraslado.aspx?MedicoId=" + MedicoId + "&NHC=" + NHC + "&Protocolo=" + Protocolo + "&cargaID=" + Protocolo;
    self.location = "SolicituddeTraslado.aspx?&NHC=" + NHC + "&Protocolo=" + Protocolo;
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarST(Protocolo) {
    var json = JSON.stringify({
        "Protocolo": Protocolo
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/BuscarSolicitudTraslado",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarST_Cargado,
        error: errores
    });
}

