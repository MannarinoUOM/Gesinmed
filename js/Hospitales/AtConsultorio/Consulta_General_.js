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
            //TieneUltimo(paciente.NHC);
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

        $("#CargadoEdad").html(edad);

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

        $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

    });
}


$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    CargarDiagnostico();
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
            //CargarDiagnostico();
        }

        if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
            if (GET["EspecialidadId"] != "" && GET["EspecialidadId"] != null) {
                EspecialidadId = GET["EspecialidadId"];
            }
            MedicoId = GET["MedicoId"];
        }
    }

    $("#txt_FechaAnalisis").datepicker();

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

function CargarDiagnostico() {
    $.ajax({
        type: "POST",
        data: '{Codigo: ""}',
        url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ICD10 = Resultado.d;
            $('#cbo_diagnostico').empty();
            $.each(ICD10, function (index, icd) {
                $('#cbo_diagnostico').append(
              $('<option></option>').val(icd.Codigo).html(icd.Descripcion)
            );
            });
            
            //            if (diagnosticoicd10 != '' && diagnosticoicd10 != null) {
            //                $("#cbo_diagnostico option[value=" + diagnosticoicd10 + "]").attr("selected", true);
            //            }
        },
        error: errores
    });
}


$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});


$("#btnCargarPlantilla").click(function () {
    if (EspecialidadId == "209") {
        // var Pagina = "Consulta_Neonatologia.aspx?NHC=" + $("#CargadoNHC").html() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
        var Pagina = "Consulta_Neonatologia.aspx?NHC=" + $("#CargadoNHC").html() + "&MedicoId=" + MedicoId + " ";
    }
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
});


$("#btnGuardar").click(function () {

    if (Protocolo != 0) {
        if ($.trim($("#txt_Motivo").val()).replace(" ", "") == '') {
            $("#TabModificacionA").click();
            alert("Ingrese el Motivo de la modificación");
            $("#txt_Motivo").focus();
            return false;
        }
    }

    var json = JSON.stringify({
        "Protocolo": Protocolo,
        "ICD10_Det_Id": $("#cbo_diagnostico option:selected").val(),
        "Observaciones": $("#txt_Observaciones").val(),
        "Especialidad_Id": EspecialidadId,
        "NHC": NHC,
        "MotivoModificacion": $("#txt_Motivo").val(),
        "MedicoId": MedicoId
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Guardar_AtencionGeneral",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardarConsultaGeneral_Guardado,
        error: errores
    });

});

function GuardarConsultaGeneral_Guardado(Resultado) {
    Protocolo = Resultado.d;
    self.location = "../Impresiones/CDGeneral.aspx?Protocolo=" + Protocolo;
}

function CargarConsulta() {
    var json = JSON.stringify({
        "Protocolo": Protocolo
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/CargarAtencionGeneral",
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
    Protocolo = Consulta.protocolo;
    //CargarDiagnostico();
    $("#TEspecialidad").html(Consulta.especialidad);
    $("#txt_Observaciones").val(Consulta.observaciones);
    $("#txt_Motivo").val(Consulta.modificacion);    
}

function Especialidad(Id)
{
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

function Especialidad_Cargada(Resultado)
{
    Esp = Resultado.d;
    $("#TEspecialidad").html(Esp.Especialidad);
}

function Imprimir() {
    self.location = "../Impresiones/CDGeneral.aspx?Protocolo=" + Protocolo;
}

