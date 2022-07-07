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

var Protocolo = 0;
var MedicoId = 0;
var NHC = 0;
var EspecialidadId = 0;

function Cargar_Paciente_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {

        if (paciente.NHC != null && paciente.NHC != '') {
            //$("#desdeaqui").show();
            TraerUltimo(NHC);
        }

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txt_dni").attr('value', paciente.documento);
        NHC = paciente.NHC;
        $("#txtNHC").attr('value', paciente.NHC);

        CargarHC(paciente.NHC);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));



        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }

        //$("#CargadoEdad").html(edad);
        $("#CargadoEdad").html(paciente.Edad_Format);

        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $("#CargadoTelefono").html(paciente.Telefono);

        $("#CargadoLocalidad").html(paciente.localidad.substring(0, 15));


        if (paciente.Nro_Seccional != "999") {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else {
            $("#CargadoSeccional").html("Sin Seccionalizar");
        }
        if (paciente.Nro_Seccional != 998)
            $("#CargadoSeccional").html(paciente.Seccional);
        else $("#CargadoSeccional").html(paciente.ObraSocial);


        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');

    });
}

function TraerUltimo(_NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/At_Consultorio_Cargar_FechaNac",
        data: '{NHC: "' + _NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado != null)
                $("#txt_fecha").val(Resultado.d);
        },
        error: errores
    });
}


$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
        $("#divmotivo").show();
        if (GET["U"] != "" && GET["U"] != null) {
            U = GET["U"];
            CargarConsulta();
            $("#btnImprimir").show();
        }
        else {
            Protocolo = GET["Protocolo"];
            $("#btnImprimir").show();
            CargarConsulta();
            $("#btnImprimir").show();
        }

    }
    else {
        $("#btnImprimir").hide();
        if (GET["NHC"] != "" && GET["NHC"] != null) {
            NHC = GET["NHC"];
            Cargar_Paciente_NHC(NHC);
        }

        if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
            if (GET["EspecialidadId"] != "" && GET["EspecialidadId"] != null) {
                EspecialidadId = GET["EspecialidadId"];
            }
            MedicoId = GET["MedicoId"];
        }
    }

    $("#txt_fecha").datepicker();

});


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarHC(nHC) {

    $.ajax({
        type: "POST",
        data: '{nhc: "' + nHC + '"}',
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/Historia_Clinica_Compacta",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var HIST = Resultado.d;
            if (HIST == null) {
                $('#CargoHC').html("Comienzo Historia Clínica");
            }
            $('#cbo_diagnostico').empty();
            $.each(HIST, function (index, hhhc) {
                $('#CargoHC').html($('#CargoHC').html() + hhhc.HC);
            });
        },
        error: errores
    });
}


$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});


$("#btnGuardar").click(function () {
    var json = JSON.stringify({
        "Protocolo": Protocolo,
        "fnac": $("#txt_fecha").val(),
        "peso": $("#txt_peso").val(),
        "talla": $("#txt_talla").val(),
        "percef": $("#txt_percefalico").val(),
        "MedicoId": MedicoId,
        "NHC": NHC
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Guardar_Neonatologia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardarNeo_Guardado,
        error: errores
    });

});

function GuardarNeo_Guardado(Resultado) {
    Protocolo = Resultado.d;
    self.location = "../Impresiones/Impresion_Neo.aspx?Protocolo=" + Protocolo;
    parent.CargarHC(NHC);
}

function CargarConsulta() {
    var json = JSON.stringify({
        "Protocolo": Protocolo
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/CargarNeonatologia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConsulta_Cargada,
        error: errores
    });
}

function CargarConsulta_Cargada(Resultado) {
    Consulta = Resultado.d;
    NHC = Consulta.NHC;
    Cargar_Paciente_NHC(NHC);
    Protocolo = Consulta.Protocolo;
    $("#txt_fecha").html(Consulta.fecha_nac);
    $("#txt_peso").val(Consulta.peso);
    $("#txt_talla").val(Consulta.talla);
    $("#txt_percefalico").val(Consulta.percefalico);
}

function Especialidad(Id) {
    var json = JSON.stringify({
        "Id": Id
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/EspecialidadID",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargada,
        error: errores
    });
}

function Especialidad_Cargada(Resultado) {
    Esp = Resultado.d;
    $("#TEspecialidad").html(Esp.Especialidad);
}

function Imprimir() {
    self.location = "../Impresiones/Impresion_Neo.aspx?Protocolo=" + Protocolo;
}

