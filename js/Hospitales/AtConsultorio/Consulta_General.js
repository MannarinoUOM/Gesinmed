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
var Diagnostico = 0;
var FechaTurno = "";
var HoraTurno = "";
var HC_Cargada = 0;
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

        CargarHC(paciente.documento);

        $("#CargadoApellido").html(paciente.Paciente);
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
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

    });
}

$("#btnCancelar").click(function () {
    parent.$.fancybox.close();
});

$(document).ready(function () {

    $('input.typeahead').typeahead({
        updater: function (item) {
            $("#diag_nombre").val(item); //nom
            $("#id_val").val(mapped[item]); //id
            return item;
        },
        minLength: 4,
        items: 50,
        hint: true,
        highlight: true,
        source: function (query, process) {
            var json = JSON.stringify({ "str": query });
            $.ajax({
                url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10Detalles_Autocomplete",
                type: 'POST',
                dataType: "json",
                data: json,
                contentType: "application/json; charset=utf-8",
                success: function (Resultado) {
                    var lista = Resultado.d;
                    $.each(lista, function (i, icd) {
                        if (i == 0) {
                            sourceArr.length = 0;
                        }
                        str = icd.Descripcion;
                        mapped[str] = icd.Codigo;
                        sourceArr.push(str);
                    });
                    return process(sourceArr);
                }
            });
        }
    });

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

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
        }
    }



    if (GET["m"] == "1") { //Modifica Atencion
        UltimoProtocolo();
        $("#btnImprimir").show();
        $("#divmotivo").show();
    }

    $("#txt_FechaAnalisis").datepicker();

});


function CargarPacienteID(ID){
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

function UltimoProtocolo() {
    var json = JSON.stringify({
        "NHC": NHC,
        "EspecialidadId": EspecialidadId,
        "MedicoId": MedicoId
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Ultimo_Protocolo_by_NHC_Medico",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            Protocolo = Resultado.d;
            CargarConsulta();
        },
        error: errores
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarHC(nHC) {
    if (HC_Cargada == 1) return false;
    HC_Cargada = 1;
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
            $.each(HIST, function (index, hhhc) {
                $('#CargoHC').html($('#CargoHC').html() + hhhc.HC);
            });
        },
        beforeSend: function () {
            $(".opc").hide();
            $("#cargando").show();
            $("#divmotivo").hide();
        },
        complete: function () {
            $(".opc").show();
            $("#cargando").hide();
            if (Protocolo > 0) $("#divmotivo").show(); //Modificacion
        },
        error: errores
    });    
}



$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});


$("#btnCargarPlantilla").click(function () {
    if (EspecialidadId == "209") {
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
    if ($("#id_val").val() == "") { alert("Ingrese Diagnóstico."); return false; }
    //if ($("#txt_Observaciones").val().trim().length == 0) { alert("Ingrese Observaciones."); return false; }
    if (MedicoId <= 0 || MedicoId == null || MedicoId == undefined) { alert("Médico no válido."); return false; }
    if (EspecialidadId < 0 || EspecialidadId == null || EspecialidadId == undefined) { alert("EspecialidadId no válida."); return false; }
    if (NHC <= 0 || NHC == null || NHC == undefined) { alert("Paciente no válido."); return false; }
    return true;
}

$("#btnGuardar").click(function () {
    // EspecialidadId = 0;
    var r = true; ;
    if (EspecialidadId == 0) {
        r = confirm("No se pudo determinar la especialidad del médico. Se guardara la consulta SIN ESPECIALILDAD. Desea guardar la consulta de todas maneras?.");
    }
   // alert(r);
    if (!r) { return false; }


    var json = JSON.stringify({ "afiliadoId": $("#afiliadoId").val() });
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/VerificarFaltaPatologiaCronica",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            if (Resultado.d == 1) {
                //informar falta de asignacion de patologias
                $.fancybox(
		{
		    'autoDimensions': false,
		    'href': 'AltoRiesgo.aspx?AfiliadoId=' + $("#afiliadoId").val(),
		    'width': '50%',
		    'height': '50%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'showCloseButton': true
		}
	        );
            } else {

                $("#txt_Motivo").val("Modificacion");

                if (!Validar()) return false;

                if (Protocolo == 0) ConfirmarAtencion();

                var json = JSON.stringify({
                    "Protocolo": Protocolo,
                    "ICD10_Det_Id": $("#id_val").val(),
                    "Observaciones": $("#txt_Observaciones").val().trim().toUpperCase(),
                    "Especialidad_Id": EspecialidadId,
                    "NHC": NHC,
                    "MotivoModificacion": $("#txt_Motivo").val().trim().toUpperCase(),
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

            }
        },
        error: errores
    });
});

function GuardarConsultaGeneral_Guardado(Resultado) {
    Protocolo = Resultado.d;
    parent.$("#opcionFA").show();
    self.location = "../Impresiones/CDGeneral.aspx?Protocolo=" + Protocolo + "&MedicoId=" + MedicoId;
    parent.$("#fancybox-close").show();
}

function CargarConsulta() {
    if (Protocolo <= 0) {alert("Nro. Protocolo no válido.");return false;}
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
    Diagnostico = Consulta.diagnostico_cod;
    $("#id_val").val(Diagnostico);
    $("#diag_nombre").val(Consulta.diagnostico_desc);
    $("#cbo_diagnostico").val(Consulta.diagnostico_desc);
    $("#TEspecialidad").html(": " + Consulta.especialidad);
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
    $("#TEspecialidad").html(": " + Esp.Especialidad);
}

function Imprimir() {
    self.location = "../Impresiones/CDGeneral.aspx?Protocolo=" + Protocolo;
}

