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

    if (GET["T"] === undefined) {
        parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Pacientes Internados > <strong>Epicrisis</strong>";
    } else { $("#btnVolver").hide(); }

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
    //CargarMotivoegreso();
    //SetearCampos_Legales();
    CargarICD10_AutoComplete_Pri();
}

///Autocomplete Primario//
var sourceArr_Pri = [];
var mapped_Pri = {};

function CargarICD10_AutoComplete_Pri() {
    $('#cbo_DiagnosticoICD10_Pri').typeahead({
        updater: function (item) {
            $("#diag_nombre_pri").val(item); //nom
            $("#id_val_pri").val(mapped_Pri[item]); //id
            $("#txt_CodigoICD10").val(mapped_Pri[item]);
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
                            sourceArr_Pri.length = 0;
                        }
                        str = icd.Descripcion;
                        mapped_Pri[str] = icd.Codigo;
                        sourceArr_Pri.push(str);
                    });
                    return process(sourceArr_Pri);
                }
            });
        }
    });
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
    //$("#txtFechaEgreso").datepicker({ minDate: d });
    //$("#txtFechaIngreso").datepicker();
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
        data: '{Id: "' + IntId + '"}',
        url: "../Json/AtInternados/Epicrisis.asmx/IQB_CargarEpicrisis",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var CgaEpi = Resultado.d;
            if (CgaEpi.MedicoId > 0) {
                $("#btn_Imprimir").show();
                $("#txtFechaIngreso").val(CgaEpi.fecha_ingreso);
                $("#txtFechaEgreso").val(CgaEpi.fecha_egreso);
                EspId = CgaEpi.EspecialidadId;
                Medico = CgaEpi.MedicoId;
                MedicoId = CgaEpi.MedicoId;
            }
            else $("#btn_Imprimir").hide();

            if (CgaEpi.fecha_ingreso == "01/01/1900") $("#txtFechaIngreso").val($("#CargadoFechaIngreso").html()); //IngresoInternacion
            if (CgaEpi.fecha_egreso == "01/01/1900") $("#txtFechaEgreso").val($("#CargadoFechaEgreso").html()); //EgresoInternacion

            $("#cbo_DiagnosticoICD10 option[value=" + CgaEpi.ingreso_DX + "]").attr("selected", true);
            $("#txt_MotivoInternacion").val(CgaEpi.ingreso_motivo);
            $("#txt_AntecendentesPersonales").val(CgaEpi.ingreso_ant_personales);
            $("#txt_InternacionActual").val(CgaEpi.ingreso_int_actual);
            $("#txt_IndicacionesAlta").val(CgaEpi.egreso_indicacion);
            $("#txt_FechaVueltaConsulta").val(CgaEpi.fecha_concurrir);
            $("#txt_Complicaciones").val(CgaEpi.egreso_compilacion);
            $("#txt_DxEgreso").val(CgaEpi.egreso_dx);
            $("#cbo_Especialidad").val(CgaEpi.EspecialidadId);
            CargarDiags_ICD10(CgaEpi);
            Motivo = CgaEpi.motivo_alta;
        },
        complete: function () {
            CargarMedicos();
        },
        error: errores
    });
}

//Si cambia el contenido de algun autocompletar//
$(".typeahead").change(function () {
    if ($(this).val().trim().length == 0) $("#id_val_" + $(this).attr("rel")).val("0");
});

function CargarDiags_ICD10(CgaEpi) {
    $("#diag_nombre_pri").html(CgaEpi.egreso_dx_desc);
    $("#id_val_pri").val(CgaEpi.egreso_dx);
    $("#cbo_DiagnosticoICD10_Pri").val(CgaEpi.egreso_dx_desc);
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#txt_FechaVueltaConsulta").mask("99/99/9999");
$("#txt_FechaVueltaConsulta").datepicker();

$("#btn_Guardar").click(function () {
    if ($("#txtFechaIngreso").val().trim().length == 0) { alert("Ingrese Fecha de Ingreso."); return false; }
    if ($("#txtFechaEgreso").val().trim().length == 0) { alert("Ingrese Fecha de Egreso."); return false; }
    if ($('#cbo_Especialidad option:selected').val() == "") { alert("Ingrese Especialidad."); return false; }
    if ($("#id_val_pri").val() == "0" || $("#id_val_pri").val().trim().length == 0) { alert("1º Codigo ICD10 es obligatorio."); return false; }
    Guardar();
});

function Guardar() {
    if (confirm("¿Desea guardar la epicrisis?")) {
        var json = JSON.stringify({
            "EpicrisisId": "0",
            "PacienteNHC": $("#afiliadoId").val(),
            "internacionid": IntId,
            "Ingreso_DX": "ZA1",
            "Ingreso_Detalle": "ZA10",
            "Ingreso_Motivo": $('#txt_MotivoInternacion').val().trim().toUpperCase(),
            "Egreso_Indicacion": $('#txt_IndicacionesAlta').val().trim().toUpperCase(),
            "Egreso_Concurrir": $('#txt_FechaVueltaConsulta').val().trim().toUpperCase(),
            "Egreso_Complicacion": $('#txt_Complicaciones').val().trim().toUpperCase(),
            "Egreso_Dx": $("#id_val_pri").val(),
            "MedicoId": $('#cbo_Medico :selected').val(),
            "EspecialidadId": $('#cbo_Especialidad :selected').val(),
            "FechaIngreso": $("#txtFechaIngreso").val().trim(),
            "FechaEgreso": $("#txtFechaEgreso").val().trim(),
            "CirugiaRealizada": $("#txt_InternacionActual").val().trim()
        });
        $.ajax({
            type: "POST",
            url: "../Json/AtInternados/Epicrisis.asmx/IQB_Epicrisis_Guardar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                MedicoId = $('#cbo_Medico :selected').val();
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

function Impresion() {                                                  //+ "q" estaba esto aca ????
    var Pagina = "../Impresiones/ImpresionIQB_Epicrisis.aspx?Id=" + IntId  + "&medicoId=" + MedicoId;
    //Pagina = Pagina.slice(0, -1);
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

