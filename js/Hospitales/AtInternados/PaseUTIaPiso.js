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

    MedicoId = GET["MedicoId"];
    CargarMedicos();
    CargarMotivoegreso();
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
    //$("#txtFechaIngreso").val(d);
    $("#txtFechaEgreso").datepicker({ minDate: d });
    $("#txtFechaIngreso").datepicker();

    if (GET["IntId"] != "" && GET["IntId"] != null) {
        IntId = GET["IntId"];
        CargarDatosInternacion(IntId);
    }
    else {
        //Especialidades_Lista();
        //CargarICD10();
        CargarMotivoegreso();
    }

    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        CargarPacienteID(NHC);
        //Cargar_Paciente_NHC(NHC);
    }

    if (GET["B"] != "" && GET["B"] != null) {
        objBusquedaLista = GET["B"];
    }

});

function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        complete: function () {
            //  CargarEpicrisis();
        },
        error: errores
    });
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    $.each(Paciente, function (index, paciente) {

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);

        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        //alert(paciente.Foto);
        //$('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');
        if (paciente.Foto == "0") { $('#fotopaciente').attr('src', '../img/silueta.jpg'); } else { $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto); }

    });
    Totales = Totales + 1;
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
            Totales = Totales + 1;
        },
        complete: function () {
            CargarMotivoegreso();
            CargarEpicrisis();
        },
        error: errores
    });
}

function CargarEpicrisis() {

    $.ajax({
        type: "POST",
        data: '{Id: "' + IntId + '"}',
        url: "../Json/AtInternados/Epicrisis.asmx/CargarPaseUTI_Piso",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var CgaEpi = Resultado.d;
            if (CgaEpi.MedicoId > 0) { $("#btn_Imprimir").show(); $("#txtFechaIngreso").val(CgaEpi.fecha_ingreso); $("#txtFechaEgreso").val(CgaEpi.fecha_egreso); }
            else $("#btn_Imprimir").hide();
            $("#cbo_DiagnosticoICD10 option[value=" + CgaEpi.ingreso_DX + "]").attr("selected", true);
            $("#cboAn1 option[value=" + CgaEpi.ingreso_Ant1 + "]").attr("selected", true);
            $("#cboAn2 option[value=" + CgaEpi.ingreso_Ant2 + "]").attr("selected", true);
            $("#cboAn3 option[value=" + CgaEpi.ingreso_Ant3 + "]").attr("selected", true);
            $("#cboAn4 option[value=" + CgaEpi.ingreso_Ant4 + "]").attr("selected", true);
            $("#cboAn5 option[value=" + CgaEpi.ingreso_Ant5 + "]").attr("selected", true);
            $("#cboAn6 option[value=" + CgaEpi.ingreso_Ant6 + "]").attr("selected", true);
            $("#cboAn7 option[value=" + CgaEpi.ingreso_Ant7 + "]").attr("selected", true);
            $("#cboAn8 option[value=" + CgaEpi.ingreso_Ant8 + "]").attr("selected", true);
            $("#cboAn9 option[value=" + CgaEpi.ingreso_Ant9 + "]").attr("selected", true);
            $("#cboAn10 option[value=" + CgaEpi.ingreso_Ant10 + "]").attr("selected", true);
            $("#txt_MotivoInternacion").val(CgaEpi.ingreso_motivo);
            $("#txt_AntecendentesPersonales").val(CgaEpi.ingreso_ant_personales);
            $("#txt_InternacionActual").val(CgaEpi.ingreso_int_actual);
            $("#txt_Laboratorio").val(CgaEpi.laboratorio);
            $("#txt_Imagenes").val(CgaEpi.imagen);
            $("#txt_OtrosEstudios").val(CgaEpi.otros);
            $("#txt_DiagnosticoEgreso").val(CgaEpi.diagnostico);
            $("#cbo_Motivo_Egreso option[value=" + CgaEpi.motivo_alta + "]").attr("selected", true);
            $("#txt_IndicacionesAlta").val(CgaEpi.egreso_indicacion);
            $("#txt_FechaVueltaConsulta").val(CgaEpi.fecha_concurrir);
            $("#txt_Complicaciones").val(CgaEpi.egreso_compilacion);
            $("#txt_DxEgreso").val(CgaEpi.egreso_dx);
            $("#cbo_Especialidad").val(CgaEpi.EspecialidadId);
            EspId = CgaEpi.EspecialidadId;
            Medico = CgaEpi.MedicoId;
            MedicoId = CgaEpi.MedicoId;
            Motivo = CgaEpi.motivo_alta;
            CargarMedicos();

        },
        error: errores
    });
}

function CargarICD10() {
    $.ajax({
        type: "POST",
        data: '{Codigo: ""}',
        url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ICD10 = Resultado.d;
            $('#cbo_DiagnosticoICD10').empty();
            $('#cboAn1').empty();
            $('#cboAn2').empty();
            $('#cboAn3').empty();
            $('#cboAn4').empty();
            $('#cboAn5').empty();
            $('#cboAn6').empty();
            $('#cboAn7').empty();
            $('#cboAn8').empty();
            $('#cboAn9').empty();
            $('#cboAn10').empty();

            for (var i = 0; i < 10; i++) {
                $('#cboAn' + (i + 1)).append($('<option></option>').val("0").html(""));
            }
            $('#cbo_DiagnosticoICD10').append($('<option></option>').val("0").html(""));
            $('#txt_DxEgreso').append($('<option></option>').val("0").html(""));
            $.each(ICD10, function (index, icd) {

                $('#cbo_DiagnosticoICD10').append($('<option></option>').val(icd.Codigo).html(icd.Descripcion));
                $("#txt_DxEgreso").append($('<option></option>').val(icd.Codigo).html(icd.Descripcion));
                for (var i = 0; i < 10; i++) {
                    $('#cboAn' + (i + 1)).append($('<option></option>').val(icd.Codigo).html(icd.Descripcion));
                }

            });

        },
        error: errores,
        complete: function () {
            //CargarEpicrisis();
        }
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function CargarICD10Detalles(ICD10) {
    $.ajax({
        type: "POST",
        data: '{Codigo: "", ICD10: "' + ICD10 + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10Detalles",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ICD10 = Resultado.d;
            $('#cbo_Diagnostico_Detalle_ICD10').empty();
            $.each(ICD10, function (index, icd) {
                $('#cbo_Diagnostico_Detalle_ICD10').append(
              $('<option></option>').val(icd.Codigo).html(icd.Descripcion)
            );

            });

        },
        error: errores
    });
}

$("#cbo_DiagnosticoICD10").change(function () {
    CargarICD10Detalles($('#cbo_DiagnosticoICD10 option:selected').val());
});

function CargarICD10Detalles_SV(ICD10, Detalle) {
    $.ajax({
        type: "POST",
        data: '{Codigo: "", ICD10: "' + ICD10 + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10Detalles",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ICD10 = Resultado.d;
            $('#txt_Detalle').empty();
            $.each(ICD10, function (index, icd) {
                $('#txt_Detalle').append(
              $('<option></option>').val(icd.Codigo).html(icd.Descripcion)
                );
            });

        },
        complete: function () {
            $('#txt_Detalle').val(Detalle);
        },
        error: errores
    });
}



$("#txt_DxEgreso").change(function () {
    CargarICD10Detalles_SV($('#txt_DxEgreso :selected').val(), '');
});

$("#txt_FechaVueltaConsulta").mask("99/99/9999");
$("#txt_FechaVueltaConsulta").datepicker();

function CargarMotivoegreso() {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/MotivoEgresoLista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Motivos = Resultado.d;
            $('#cbo_Motivo_Egreso').empty();
            $('#cbo_Motivo_Egreso').append('<option value="0">Motivo</option>');
            $.each(Motivos, function (index, motivo) {
                $('#cbo_Motivo_Egreso').append(
              $('<option></option>').val(motivo.id).html(motivo.motivo)
            );
            });
            Totales = Totales + 1;
        },
        complete: function () {
            $('#cbo_Motivo_Egreso').val(Motivo);
        },
        error: errores
    });
}


$("#btn_Guardar").click(function () {
    if ($("#txtFechaIngreso").val().trim().length == 0) { alert("Ingrese Fecha de Ingreso."); return false; }
    if ($("#txtFechaEgreso").val().trim().length == 0) { alert("Ingrese Fecha de Egreso."); return false; }
    Guardar();
});

function Guardar() {
    if ($('#cbo_Especialidad option:selected').val() == "") { alert("Ingrese Especialidad."); return false; }
    var Especialidad = $('#cbo_Especialidad option:selected').val();
    if (confirm("¿Desea confirmar el pase?")) {
        var json = JSON.stringify({
            "Medico": $('#cbo_Medico option:selected').val(),
            "Especialidad": Especialidad,
            "Id": "0",
            "PacienteNHC": $("#afiliadoId").val(),
            "internacionid": IntId,
            "Ingreso_DX": "ZA1",
            "Ingreso_Detalle": "ZA10",
            "Ingreso_Ant1": 0,
            "Ingreso_Ant2": 0,
            "Ingreso_Ant3": 0,
            "Ingreso_Ant4": 0,
            "Ingreso_Ant5": 0,
            "Ingreso_Ant6": 0,
            "Ingreso_Ant7": 0,
            "Ingreso_Ant8": 0,
            "Ingreso_Ant9": 0,
            "Ingreso_Ant10": 0,
            "Ingreso_Motivo": $('#txt_MotivoInternacion').val().trim().toUpperCase(),
            "Ingreso_Antecedentes_Personales": $('#txt_AntecendentesPersonales').val().trim().toUpperCase(),
            "Ingreso_Internacion_Actual": $('#txt_InternacionActual').val().trim().toUpperCase(),
            "Complementarios_Laboratorio": $('#txt_Laboratorio').val().trim().toUpperCase(),
            "Complementarios_Imagenes": $('#txt_Imagenes').val().trim().toUpperCase(),
            "Complementarios_Otros": $('#txt_OtrosEstudios').val().trim().toUpperCase(),
            "Egreso_Diagnostico": $('#txt_DiagnosticoEgreso').val().trim().toUpperCase(),
            "Egreso_Motivo_Alta": $('#cbo_Motivo_Egreso option:selected').val(),
            "Egreso_Indicacion": $('#txt_IndicacionesAlta').val().trim().toUpperCase(),
            "Egreso_Concurrir": $('#txt_FechaVueltaConsulta').val().trim().toUpperCase(),
            "Egreso_Complicacion": $('#txt_Complicaciones').val().trim().toUpperCase(),
            "Egreso_Dx": "ZA1",
            "Egreso_Detalle": "ZA10",
            "FechaIngreso": $("#txtFechaIngreso").val().trim(),
            "FechaEgreso": $("#txtFechaEgreso").val().trim()
        });
        $.ajax({
            type: "POST",
            url: "../Json/AtInternados/Epicrisis.asmx/GuardarPase_UTI_Piso",
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


function CargarICD10DetallesEpi(Codigos, ICD10) {
    $.ajax({
        type: "POST",
        data: '{Codigo: "", ICD10: "' + ICD10 + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10Detalles",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ICD10 = Resultado.d;
            $('#cbo_Diagnostico_Detalle_ICD10').empty();
            $.each(ICD10, function (index, icd) {
                $('#cbo_Diagnostico_Detalle_ICD10').append(
              $('<option></option>').val(icd.Codigo).html(icd.Descripcion)
            );
            });
            if (Codigos != '') {
                $("#cbo_Diagnostico_Detalle_ICD10 option[value=" + Codigos + "]").attr("selected", true);
                $("#txt_Codigo_Detalle_ICD10").val(Codigos);
            }
        },
        error: errores
    });
}

$("#btn_Volver").click(function () {
    self.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&B=" + objBusquedaLista;
});


$("#btn_Imprimir").click(function () {
    Impresion();
});

function Impresion() {
    var Pagina = "../Impresiones/ImpresionPaseUTI_Piso.aspx?Id=" + IntId + "q";
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


function CargarMedicos() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Medicos_Por_Usuarios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarMedicos_Cargados,
        complete: function () {
            $('#cbo_Medico').val(MedicoId);
            CargarEspecialidad($('#cbo_Medico option:selected').val());
            $('#cbo_Medico').attr("disabled", true);
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