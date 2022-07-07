function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Cargado,
        error: errores
    });
}

var Tipo_Estado = 0;
var Protocolo = 0;
var MedicoId = 0;
var NHC = 0;
var EspecialidadId = 0;
var Diagnostico = 0;
var FechaTurno = "";
var HoraTurno = "";
var HC_Cargada = 0;
var TurnoId = 0;
///Autocomplete
var sourceArr = [];
var mapped = {};

function Cargar_Paciente_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {

        if (paciente.NHC != null && paciente.NHC != '') {
            //$("#desdeaqui").show();
            //TieneUltimo(paciente.NHC);
        }

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);
        $("#afiliadoId").val(paciente.documento);
        $("#txt_dni").attr('value', paciente.documento_real);
        NHC = paciente.documento;
        $("#txtNHC").attr('value', paciente.NHC_UOM);


        //$("#CargadoApellido").html(paciente.Paciente);
        if (paciente.Paciente.length >= 20) {
            $("#CargadoApellido").html(paciente.Paciente.substring(0, 20));
        }
        else {
            $("#CargadoApellido").html(paciente.Paciente);
        }
        $("#CargadoEdad").html(paciente.Edad_Format);

        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);

        $("#CargadoLocalidad").html(paciente.localidad.substring(0, 15));


        if (paciente.Nro_Seccional != "999") {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else {
            $("#CargadoSeccional").html("Sin Seccionalizar");
        }

        if (paciente.Nro_Seccional != 998) {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else $("#CargadoSeccional").html(paciente.ObraSocial);

        $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

    });
}

$("#btnCancelar").click(function () {
    parent.$.fancybox.close();
});

$(document).ready(function () {

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    Tipo_Estado = GET["Estado"];

    //CargarDiagnostico();
    if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
        $("#divmotivo").show();
        if (GET["U"] != "" && GET["U"] != null) {
            U = GET["U"];
            CargarConsulta();
            $("#btnImprimir").show();
        }
        else {
            Protocolo = GET["Protocolo"];
            CargarConsulta();
            $("#btnImprimir").show();
        }

    }
    else {
        $("#btnImprimir").hide();
        if (GET["NHC"] != "" && GET["NHC"] != null) {
            NHC = GET["NHC"];
            CargarPacienteID(NHC);
            //CargarDiagnostico();
        }

        if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
            if (GET["EspecialidadId"] != "" && GET["EspecialidadId"] != null) {
                EspecialidadId = GET["EspecialidadId"];
            }
            MedicoId = GET["MedicoId"];
            FechaTurno = GET["F"];
            TurnoId = GET["T_Act"];                        
        }
    }



    if (GET["m"] == "1") { //Modifica Atencion
        UltimoProtocolo();
        $("#btnImprimir").show();
        $("#divmotivo").show();
    }

    $("#txt_FechaAnalisis").datepicker();
    CargarConsulta();

    if (Tipo_Estado == "1") {
        $("#titulo_sitio").html("Carga Atención");
    }

    Estado_Turno();

});


function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Cargado,
        error: errores
    });
}



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

function ConfirmarAtencion() {
    var json = JSON.stringify({
        "MedicoId": MedicoId,
        "EspecialidadId": EspecialidadId,
        "NHC": NHC,
        "FechaTurno": FechaTurno
    });
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/ConfirmaAtencionCentral",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores
    });
}

function Validar() {
    if (Protocolo > 0) return true;
    if (MedicoId <= 0 || MedicoId == null || MedicoId == undefined) { alert("Equipo no válido."); return false; }
    if (EspecialidadId <= 0 || EspecialidadId == null || EspecialidadId == undefined) { alert("EspecialidadId no válida."); return false; }
    if (NHC <= 0 || NHC == null || NHC == undefined) { alert("Paciente no válido."); return false; }
    return true;
}

$("#btnGuardar").click(function () {

    $("#txt_Motivo").val("Modificacion");

    if (!Validar()) return false;

    if (Protocolo == 0) ConfirmarAtencion();

    var json = JSON.stringify({
        "Turno_Id": TurnoId,
        "Tipo": Tipo_Estado,
        "Comentario": $("#txt_Observaciones").val().trim().toUpperCase(),        
        "Alias": "",
        "Ruta_Voz": $("#txt_Ruta").val()        
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/Atencion_Consultorio_IMG.asmx/AtConsultorio_IMG_Guardar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Guardar_Auditoria_Guardado,
        error: errores
    });

});

function Guardar_Auditoria_Guardado(Resultado) {
    Protocolo = Resultado.d;
    alert("Guardado correctamente");
    parent.TipeoCerrado();
    parent.$.fancybox.close();

}

function CargarConsulta() {
    if (TurnoId > 0) {
        var json = JSON.stringify({
            "Turno_Id": TurnoId,
            "Tipo": Tipo_Estado
        });

        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/Atencion_Consultorio_IMG.asmx/AtConsultorio_IMG_Cargar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Consulta_Cargada,
            error: errores
        });
    }
}

function Consulta_Cargada(Resultado) {
    var Cargado = Resultado.d;
    $("#txt_Observaciones").val(Cargado.ATIMG_Comentario);
    $("#txt_Ruta").val(Cargado.ATIMG_Voz);
}


function Imprimir() {
    self.location = "../Impresiones/CDGeneral.aspx?Protocolo=" + Protocolo;
}



function Estado_Turno() {    
    var json = JSON.stringify({
        "Turno_Id": TurnoId
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/Atencion_Consultorio_IMG.asmx/AtConsultorio_Turno_Estado",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            if (resultado.d > 1) {
                $("#btnGuardar").remove();
                $("#txt_Observaciones").prop("readonly", true);
            }
        },
        error: errores
    });
}
