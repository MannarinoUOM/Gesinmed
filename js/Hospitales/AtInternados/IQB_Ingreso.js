var IntId = 0;
var NHC = 0;
var Totales = 0;
var Imprimir = 0;
var Medico = 0;
var MedicoId = 0;
var objBusquedaLista = "";
var Motivo = 0;
var EspId = 0;

$(document).ready(function () {
    InitControls();

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
        MedicoId = GET["MedicoId"];
        Medico = GET["MedicoId"];
    }

    if (GET["IntId"] != "" && GET["IntId"] != null) {
        IntId = GET["IntId"];
        CargarDatosInternacion(IntId);
    }

    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        CargarPacienteID(NHC);
    }

    if (GET["B"] != "" && GET["B"] != null) {
        objBusquedaLista = GET["B"];
    }

});

function InitControls() {
    SetearCampos_Fecha();
    CargarMedicos();
}

function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function SetearCampos_Fecha() {
    $("#txtFechaEgreso").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaIngreso").mask("99/99/9999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaEgreso").val(d);
}

$(function () {
    $("#txtFechaIngreso").datepicker({
        onClose: function (selectedDate) {
            $("#txtFechaEgreso").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#txtFechaEgreso").datepicker({
        onClose: function (selectedDate) {
            $("#txtFechaIngreso").datepicker("option", "maxDate", selectedDate);
        }
    });
});

function SetearCampos_Legales() {
    if ($("#esLegales").val() == "SI") {
        $("#cbo_Especialidad").removeAttr("disabled");
        $("#cbo_Medico").removeAttr("disabled");
    }
    else {
        //$("#cbo_Especialidad").attr("disabled",true);
        $("#cbo_Medico").attr("disabled", true);
    }
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    $.each(Paciente, function (index, paciente) {
        var apellido = paciente.Paciente;
        if (apellido.length <= 20)
            $("#CargadoApellido").html(paciente.Paciente);
        else $("#CargadoApellido").html(apellido.toString().substring(0, 19)) + "...";
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);

        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        //alert(paciente.Foto);
        if (paciente.Foto == "0") { $('#fotopaciente').attr('src', '../img/silueta.jpg'); } else { $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto); }

    });
}


function CargarDatosInternacion(ID) {
    $.ajax({
        type: "POST",
        data: '{IntId: "' + ID + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/InternacionResumen",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var inter = Resultado.d;
            $("#CargadoCama").html(inter.cama);
            $("#CargadoSala").html(inter.sala);
            $("#CargadoServicio").html(inter.servicio);
            $("#CargadoFechaIngreso").html(inter.fechaingreso);
            $("#CargadoFechaEgreso").html(inter.fechaegreso);
            $("#txtFechaIngreso").val(inter.fechaingreso.substring(0, 10));
        },
        complete: function () {
            CargarEpicrisis();
        },
        error: errores
    });
}

function CargarEpicrisis() {

    $.ajax({
        type: "POST",
        data: '{InternacionId: "' + IntId + '"}',
        url: "../Json/AtInternados/Epicrisis.asmx/IQB_INGRESO_LIST_BY_INT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var CgaEpi = Resultado.d;
            if (CgaEpi.HC_IQB_MED_ID > 0) {
                $("#btn_Imprimir").show();
                $("#txtFechaIngreso").val(CgaEpi.HC_IQB_FECHA_ING);
                EspId = CgaEpi.HC_IQB_ESP_ID;
                Medico = CgaEpi.HC_IQB_MED_ID;
                MedicoId = CgaEpi.HC_IQB_MED_ID;
            }
            else $("#btn_Imprimir").hide();

            if (CgaEpi.HC_IQB_FECHA_ING == "01/01/1900") $("#txtFechaIngreso").val($("#CargadoFechaIngreso").html()); //IngresoInternacion

            $("#txt_MotivoIngreso").val(CgaEpi.HC_IQB_MOT_ING);
            $("#txt_AntecedentesPatologicos").val(CgaEpi.HC_IQB_ANT_PAT);
            $("#txt_ProcedimientoEfectuar").val(CgaEpi.HC_IQB_PROC_EFEC);
            $("#txt_ParametrosBasicos").val(CgaEpi.HC_IQB_PARAM_BASICOS);
            $("#txt_Respiratorio").val(CgaEpi.HC_IQB_RESPIRATORIO);
            $("#txt_Cardiovascular").val(CgaEpi.HC_IQB_CARDIO);
            $("#txt_ExamenesPresentados").val(CgaEpi.HC_IQB_EXAMENES_PRES);
            $("#cbo_Especialidad").val(CgaEpi.HC_IQB_ESP_ID);
            $("input[name='optProcedencia'][value=" + CgaEpi.HC_IQB_PROCEDENCIA + "]").attr('checked', 'checked');
            $("input[name='optTraslado'][value=" + CgaEpi.HC_IQB_TRASLADO + "]").attr('checked', 'checked');
        },
        complete: function () {
            CargarMedicos();
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#txt_FechaVueltaConsulta").mask("99/99/9999");
$("#txt_FechaVueltaConsulta").datepicker();

$("#btn_Guardar").click(function () {
    if ($("#txtFechaIngreso").val().trim().length == 0) { alert("Ingrese Fecha de Ingreso."); return false; }
    if ($('#cbo_Especialidad option:selected').val() == "") { alert("Ingrese Especialidad."); return false; }
    Guardar();
});

function CargarDatos() {
    var oData = {};
    oData.HC_IQB_ID = 0;
    oData.HC_IQB_NHC = $("#afiliadoId").val();
    oData.HC_IQB_INT_ID = IntId;
    oData.HC_IQB_FECHA_ING = $("#txtFechaIngreso").val();
    oData.HC_IQB_MED_ID = $('#cbo_Medico :selected').val();
    oData.HC_IQB_ESP_ID = $('#cbo_Especialidad :selected').val();
    oData.HC_IQB_PROCEDENCIA = $("input:radio[name='optProcedencia']:checked").val();
    oData.HC_IQB_TRASLADO = $("input:radio[name='optTraslado']:checked").val();
    oData.HC_IQB_MOT_ING = $("#txt_MotivoIngreso").val().trim().toUpperCase();
    oData.HC_IQB_ANT_PAT = $("#txt_AntecedentesPatologicos").val().trim().toUpperCase();
    oData.HC_IQB_PROC_EFEC = $("#txt_ProcedimientoEfectuar").val().trim().toUpperCase();
    oData.HC_IQB_PARAM_BASICOS = $("#txt_ParametrosBasicos").val().trim().toUpperCase();
    oData.HC_IQB_RESPIRATORIO = $("#txt_Respiratorio").val().trim().toUpperCase();
    oData.HC_IQB_CARDIO = $("#txt_Cardiovascular").val().trim().toUpperCase();
    oData.HC_IQB_EXAMENES_PRES = $("#txt_ExamenesPresentados").val().trim().toUpperCase();
    return oData;
}

function Guardar() {
    if (confirm("¿Desea guardar?")) {
        var json = JSON.stringify({"oData": CargarDatos() });
        $.ajax({
            type: "POST",
            url: "../Json/AtInternados/Epicrisis.asmx/IQB_INGRESO_INSERT",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                Imprimir = Resultado.d;
                $("#btn_Imprimir").show();
                alert("Guardado");
            },
            error: errores
        });
    }

}

$("#btn_Volver").click(function () {
    self.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&B=" + objBusquedaLista;
});


$("#btn_Imprimir").click(function () {
    Impresion();
});

function Impresion() {
    var Pagina = "../Impresiones/IQB_ImpresionIngreso.aspx?Id=" + IntId + "q";
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
}

$("#btnVolver").click(function () {
    document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + IntId + "&B=" + objBusquedaLista;
});


////CARGA MEDICOS Y ESPECIALIDADES////

function CargarMedicos() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Medicos_Por_Usuarios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarMedicos_Cargados,
        complete: function () {
            $('#cbo_Medico').val(MedicoId);
            if (MedicoId != 0) {

                CargarEspecialidad(MedicoId);
            }
        },
        error: errores
    });
}

function CargarEspecialidad(MedicoId) {

    var json = JSON.stringify({ "MedicoId": MedicoId, "Tipo": 'I' })
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/DiasAtencionEdicion.asmx/Especialidades_que_Atiende_el_Medico_por_Tipo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarEspecialidad_Cargadas,
        complete: function () {
            $('#cbo_Especialidad').val(EspId);
        },
        error: errores
    });
}


function CargarEspecialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $('#cbo_Especialidad').append($('<option></option>').val("").html("Seleccione Especialidad..."));
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.EspecialidadId).html(especialidades.Especialidad)
            );
    });
}


function CargarMedicos_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $.each(Medicos, function (index, medico) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medico.Id).html(medico.Medico)
            );
    });
}

$('#cbo_Medico').change(function () {
    if ($("#esLegales").val() == "SI") //Si es Legales permito usar medicos y especialidades para que modifiquen Epicrisis...
        CargarEspecialidad($('#cbo_Medico :selected').val());
    else return false;
});

