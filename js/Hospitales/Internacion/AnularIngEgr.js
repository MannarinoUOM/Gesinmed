
var me = 0;
var Egreso = 0;
var EditantoId = 0;
var nServicio = "";
var nSala = "";
var nCama = "";
var nServicioId = 0;
var nSalaId = 0;
var nCamaId = 0;

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function VerUltimoMovPac(Id) {
    $.ajax({
        type: "POST",
        data: '{IdPaciente: "' + Id + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/UltimoMovimiento_Pac",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            switch (Resultado.d) {
                case 0: CargarIngreso($("#txtNHC").val()); break;
                case 1: Egr($("#txtNHC").val()); break;
            }
        },
        error: function (msg) {
            errores(msg);
            $("#btnOtroPaciente").show();
        }
    });
}

function CargarIngreso(NHC) {
    var json = JSON.stringify({ "NHC": NHC });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/InternacionId_by_NHC",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d > 0) {
                Cargar_Internacion(Resultado.d);
                EditantoId = Resultado.d;
            }
            else { alert("El Nro. HC ingresado no registra ninguna internación."); document.location = "AnularIngEgr.aspx"; }
        },
        error: errores
    });
}

function Cargar_Internacion(Id) {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Cargar_Internacion_Id",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Internacion_ID_Cargada,
        complete: function () {
            ControlesIngreso();
        },
        error: errores
    });
}

function ControlesIngreso(){
    $("#spanTipo").html("Ingreso");
    $("#ICD10").hide();
    $("#ICD10Det").hide();
    $("#EgresoMot").hide();
    $("#ControlOperado").hide();
    $("#FechaEgr").hide();
    $("#lblObs").html("Observaciones Ingreso");
    $("#IngresoMot").show();
    $("#HospPor").show();
    $("#btnLimpiarIngreso").show();
}

function Internacion_ID_Cargada(Resultado)
{
    var i = Resultado.d;

    $("#desdeaqui").click();

    $("#NroInt").html(EditantoId);
    $("#CargadoApellido").html(i.Paciente);
    $("#CargadoEdad").html(i.Edad);
    $("#CargadoDNI").html(i.DNI);
    $("#CargadoNHC").html(i.NHC);
    $("#CargadoSeccional").html(i.Seccional);
    $("#CargadoTelefono").html(i.Telefono);
    $("#afiliadoId").val(i.AfiliadoId);

    //$("#txtEgresadopor").html(i.EgresoUsuario);
    //alert(Egreso.foto);
    $('#fotopaciente').attr('src', '../img/Pacientes/' + Egreso.AfiliadoId + '.jpg');
    $("#txt_fechaIngreso").val(i.dia);  // Manuel
    $("#txt_HoraIngreso").val(i.hora);  // Manuel

    $("#sp_Servicio").html(i.servicio);
    $("#sp_Sala").html(i.sala);
    $("#sp_Cama").html(i.cama);

    //CargarPacienteID(Egreso.AfiliadoId);
    Cargar_Especialidades(true, 0, true, i.especialidad, i.medico);

    Cargar_Hosp_Por(i.hospitalizadopor);
    Cargar_MotivoIngreso(i.motivoingreso);

    $("#txt_Observacion").val(i.diagnostico);
}

function Cargar_Hosp_Por(Hos) {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/HospPorLista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Hosppor = Resultado.d;
            $('#cbo_Hospor').empty();
            $.each(Hosppor, function (index, hosppor) {
                $('#cbo_Hospor').append($('<option></option>').val(hosppor.id).html(hosppor.descripcion));
            });
        },
        complete: function () {
            $('#cbo_Hospor').val(Hos);
        },
        error: errores
    });

}

function Cargar_MotivoIngreso(mot) {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/MotivoIngresoLista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
             var Hosppor = Resultado.d;
             $('#cbo_Motivo').empty();
             $.each(Hosppor, function (index, hosppor) {
                $('#cbo_Motivo').append($('<option></option>').val(hosppor.id).html(hosppor.motivo));
             });
        },
        complete: function (){
             $('#cbo_Motivo').val(mot);
        },
        error: errores
    });

}


function Egr(NHC) {
    var json = JSON.stringify({ "NHC": NHC });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/InternacionId_Egresoby_NHC",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d > 0) {
                 //   CargarDiagSN(0);
                 //   CargarICD10("", "");
                 //   CargarMotivoegreso(0);

                CargarEgreso(Resultado.d);
                EditantoId = Resultado.d;
            }
            else { alert("El Nro. HC ingresado no registra ninguna internación."); document.location = "AnularIngEgr.aspx"; }
        },
        error: errores
    });
}

function CargarEgreso(Id) {
    $.ajax({
        type: "POST",
        data: '{Id: "' + Id + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/Egreso_Cargar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarID_Cargados,
        error: errores
    });
}


function CargarID_Cargados(Resultado) {
    var Egreso = Resultado.d;
    if (Resultado.d == null) {
        alert("No existe el número de internación.");
        $("#btnEgreso").click();
        return false;
    }

    $("#hastaaqui").fadeIn('slow', function () {
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    });

    $("#NroInt").html(EditantoId);
    $("#CargadoApellido").html(Egreso.Paciente);
    $("#CargadoEdad").html(Egreso.Edad);
    $("#CargadoDNI").html(Egreso.DNI);
    $("#CargadoNHC").html(Egreso.NHC);
    $("#CargadoSeccional").html(Egreso.Seccional);
    $("#CargadoTelefono").html(Egreso.Telefono);
    $("#afiliadoId").val(Egreso.AfiliadoId);

    $("#txtEgresadopor").html(Egreso.EgresoUsuario);
    $('#fotopaciente').attr('src', '../img/Pacientes/' + Egreso.AfiliadoId + '.jpg');
    $("#txt_FechaEgreso").val(Egreso.dia);
    $("#txt_HoraEgreso").val(Egreso.hora);
    $("#txt_fechaIngreso").val(Egreso.diaIngreso);  // Manuel
    $("#txt_HoraIngreso").val(Egreso.horaIngreso);  // Manuel

    if ($("#txt_FechaEgreso").val() == '') {
        $("#txt_FechaEgreso").val(FechaActual());
        $("#txt_HoraEgreso").val(HoraActual());
    }
    else $("#btnLimpiarEgreso").show();

    $("#sp_Servicio").html(Egreso.servicio);
    $("#sp_Sala").html(Egreso.sala);
    $("#sp_Cama").html(Egreso.cama);

    CargarDiagSN(Egreso.diagnosticoicd10);
    //CargarPacienteID(Egreso.AfiliadoId);
    CargarICD10(Egreso.diagnosticoicd10, Egreso.detalleicd10);
    CargarMotivoegreso(Egreso.motivoegreso);
    Cargar_Especialidades(true, 0, true, Egreso.egresoespecialidad, Egreso.egresomedico);


    $("#txt_FechaOperado").val(Egreso.fechaoperado);
    $("#txt_Observacion").val(Egreso.observacionegreso);
    $("#btnOperado").html(Egreso.operado);
    $("#btnOperado").addClass(Egreso.bclas);

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

$("#txt_dni").keypress(function (event) {
    if (event.which == 13) {


        if ($('#txt_dni').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txt_dni").val());
        }
    }
});

$("#txt_dni").change(function () {
    Cargar_Paciente_Documento($("#txt_dni").val());
});

$("#txtNHC").change(function () {
    Cargar_Paciente_NHC($("#txtNHC").val());
});

function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".ingreso").val('');
        },
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}

function ListTipoDoc() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/ListTipoDoc",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, Tipo) {
                $('#cbo_TipoDOC').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
            });

        },
        error: errores
    });
}

$('#cbo_TipoDOC').change(function () {
    if ($("#txt_dni").val() != "") Cargar_Paciente_Documento($("#txt_dni").val());
});

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {
            $("#btnactualizar").show();
            $("#btnCancelarPedidoTurno").show();


            $("#txt_dni").prop("readonly", true);
            $("#txtNHC").prop("readonly", true);

            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.NHC_UOM);
            $("#txtTelefono").attr('value', paciente.Telefono);
            $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

            $("#btnOtorgados").css('display', 'inline');

            if ($("#txtTelefono").val().length < 5) {
                $("#controlTelefono").addClass("error");
                $("#txtTelefono").focus();
                PError = true;
            }
            if (paciente.Nro_Seccional == 999) {
                $("#controlSeccional").addClass("error");
                PError = true;
            }

            $("#CargadoApellido").html(paciente.Paciente);
            $("#lblNombre").html(paciente.Paciente);

            $("#CargadoEdad").html(paciente.Edad_Format);
            $("#CargadoNHC").html($("#txtNHC").val());
            $("#lblNHC").html(paciente.documento);

            $("#txt_dni").val(paciente.documento_real);
            $("#CargadoDNI").html(paciente.documento_real);
            $("#afiliadoId").val(paciente.documento);
            $("#cbo_TipoDOC").val(paciente.TipoDoc);

            VerUltimoMovPac(paciente.documento);

            $("#CargadoTelefono").html(paciente.Telefono);
            $("#CargadoSeccional").html($("#cboSeccional :selected").text());
            $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');
            $('#ImgPacienteMini').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');

            $("#Cod_OS").val(paciente.OSId);
            if (paciente.Nro_Seccional == 998) {
                $("#cbo_ObraSocial").show();
                $("#cboSeccional").hide();
                $("#Titulo_Seccional_o_OS").html("Ob. Social");
                $("#CargadoSeccionalTitulo").html("Ob. Social");
                Cargar_ObraSociales_Cargar(paciente.OSId);
                if (paciente.ObraSocial.length > 40) {
                    $("#CargadoSeccional").html(paciente.ObraSocial.substring(0, 37) + "...");
                } else {
                    $("#CargadoSeccional").html(paciente.ObraSocial);
                }
            }

            $("#lblFecha").val($("#txtFechaInternacion").val());
            $("#lblHora").val($("#txtHoraInternacion").val());

            if (PError) {
                $("#desdeaqui").hide();
            }
            else {
                //$("#desdeaqui").show();
               // $("#desdeaqui").focus();
            }
        });
    }
    else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
    }
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarDiagSN(Diag) {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoSN",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Sn_diag = Resultado.d;
            $('#cboDiagSN').empty();
            $('#cboDiagSN').append($('<option></option>').val('0').html('Seleccione Diagnóstico...'));
            $.each(Sn_diag, function (index, sn) {
                $('#cboDiagSN').append($('<option></option>').val(sn.Codigo).html(sn.Descripcion));
            });
        },
        complete: function () {
            $('#cboDiagSN').val(Diag);
        },
        error: errores
    });
}

$("#btnBuscarPaciente").fancybox({
    'hideOnContentClick': true,
    'width': '75%',
    'height': '75%',
    'autoScale': false,
    'transitionIn': 'none',
    'transitionOut': 'none',
    'type': 'iframe'
});


function RecargarPagina(url) {
    document.location = "../Internacion/AnularIngEgr.aspx" + url;
}

function BuscarPacientes_fancy() {
    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': "../Turnos/BuscarPacientes.aspx?Express=0",
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
}



function Cargar_Seccionales_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Seccionales_Listas_Cargadas,
        error: errores
    });

}

function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
    });
}


function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;


    $.each(Paciente, function (index, paciente) {

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento_real);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoEdad").html(paciente.Edad_Format);

        $("#afiliadoId").val(paciente.documento);
        VerUltimoMovPac(paciente.documento);
        $("#cbo_TipoDOC").val(paciente.TipoDoc);
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        //$("#desdeaqui").show();
        
    });

}


$('#cboDiagSN').change(function () {
    $("#txt_Observacion").val($('#cboDiagSN :selected').text());
    $('#cbo_DiagnosticoICD10').val($('#cboDiagSN :selected').val());
    CargarICD10Detalles("", $('#cbo_DiagnosticoICD10 option:selected').val());
    $('#txt_CodigoICD10').val('');
    $('#txt_CodigoICD10').attr('placeholder', $('#cbo_DiagnosticoICD10 option:selected').val());
});


function CargarICD10(diagnosticoicd10, detalleICD10) {
    $.ajax({
        type: "POST",
        data: '{Codigo: ""}',
        url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ICD10 = Resultado.d;
            $('#cbo_DiagnosticoICD10').empty();
            $('#cbo_DiagnosticoICD10').append($('<option></option>').val('').html('Seleccione Diagnóstico...'));
            $.each(ICD10, function (index, icd) {
                $('#cbo_DiagnosticoICD10').append(
              $('<option></option>').val(icd.Codigo).html(icd.Descripcion)
            );
            });
            if (diagnosticoicd10 != '') {
                $("#cbo_DiagnosticoICD10 option[value=" + diagnosticoicd10 + "]").attr("selected", true);
                $("#txt_CodigoICD10").val(diagnosticoicd10);
                CargarICD10Detalles(detalleICD10, diagnosticoicd10);
            }
            else {
                CargarICD10Detalles("", $('#cbo_DiagnosticoICD10 option:selected').val());
            }
        },
        error: errores
    });
}

$("#cbo_DiagnosticoICD10").change(function () {
    CargarICD10Detalles("", $('#cbo_DiagnosticoICD10 option:selected').val());
    $('#txt_CodigoICD10').val('');
    $('#txt_CodigoICD10').attr('placeholder', $('#cbo_DiagnosticoICD10 option:selected').val());
});

$("#txt_CodigoICD10").change(function () {
    if ($('#txt_CodigoICD10').val() != '') {
        var exists = 0 != $('#cbo_DiagnosticoICD10 option[value=' + $('#txt_CodigoICD10').val() + ']').length;
        if (exists) {
            CargarICD10Detalles("", $('#cbo_DiagnosticoICD10 option:selected').val());
            $('#cbo_DiagnosticoICD10 option').attr('selected', false);
            $("#cbo_DiagnosticoICD10 option[value=" + $("#txt_CodigoICD10").val() + "]").attr("selected", true);
        }
        else {
            alert("No Existe el Codigo Ingresado");
        }
    }
});



function CargarICD10Detalles(Codigos, ICD10) {
    $.ajax({
        type: "POST",
        data: '{Codigo: "", ICD10: "' + ICD10 + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10Detalles",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ICD10 = Resultado.d;
            $('#cbo_Diagnostico_Detalle_ICD10').empty();
            $('#cbo_Diagnostico_Detalle_ICD10').append($('<option></option>').val('ZA1').html('Sin Diagnostico'));
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
        complete: function () {
            $('#cbo_Diagnostico_Detalle_ICD10').val(Codigos);
        },
        error: errores
    });
}


$("#cbo_Diagnostico_Detalle_ICD10").change(function () {
    $('#txt_Codigo_Detalle_ICD10').val('');
    $('#txt_Codigo_Detalle_ICD10').attr('placeholder', $('#cbo_Diagnostico_Detalle_ICD10 option:selected').val());
});

$("#txt_Codigo_Detalle_ICD10").change(function () {
    if ($('#txt_Codigo_Detalle_ICD10').val() != '') {
        var exists = 0 != $('#cbo_Diagnostico_Detalle_ICD10 option[value=' + $("#txt_Codigo_Detalle_ICD10").val() + ']').length;
        if (exists) {
            $('#cbo_Diagnostico_Detalle_ICD10 option').attr('selected', false);
            $("#cbo_Diagnostico_Detalle_ICD10 option[value=" + $("#txt_Codigo_Detalle_ICD10").val() + "]").attr("selected", true);
        }
        else {
            alert("No Existe el Codigo Ingresado");
        }
    }
});


function Cargar_Especialidades(Todos, Id, SoloTurnos, Cargar, Medico) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Especialidad = Resultado.d;
            $('#cbo_Especialidad').empty();
            $('#cbo_Especialidad').append('<option value="0">Especialidad</option>');
            $.each(Especialidad, function (index, especialidades) {
                $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
            });
            if (Cargar != '') {
                $("#cbo_Especialidad option[value=" + Cargar + "]").attr("selected", true);
            }
            CargarMedico(Cargar, Medico);
        },
        error: errores
    });
}

function CargarMedico(Especialidad, Cargar) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Medicos = Resultado.d;
            $('#cbo_Medico').empty();
            $('#cbo_Medico').append('<option value="0">Medicos</option>');
            $.each(Medicos, function (index, medicos) {
                $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
            });
            if (Cargar != '') {
                $("#cbo_Medico option[value=" + Cargar + "]").attr("selected", true);
            }
        },
        error: errores
    });
}

$("#cbo_Especialidad").change(function () {
    CargarMedico($('#cbo_Especialidad option:selected').val(), "");
});



function CargarMotivoegreso(Cargar) {
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
            if (Cargar != '') {
                $("#cbo_Motivo_Egreso option[value=" + Cargar + "]").attr("selected", true);
            }
        },
        error: errores
    });
}

$("#txt_FechaEgreso").datepicker();
$("#txt_FechaOperado").datepicker();


$('#btnOperado').click(function () {
    if ($('#btnOperado').html() == "Si") {
        $('#btnOperado').html('No');
        $('#btnOperado').removeClass();
        $('#btnOperado').addClass("btn btn-danger");
    }
    else {
        $('#btnOperado').html('Si');
        $('#btnOperado').removeClass();
        $('#btnOperado').addClass("btn btn-success");
    }

});

$("#btnEgreso").click(function () {
    if (Egreso == 0) document.location = "Egreso.aspx";
    else document.location = "BuscarEgreso.aspx";
});


function InitControls() {
    ListTipoDoc();
    Cargar_Seccionales_Lista();
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });
    $("#txtFechaInternacion").mask("99/99/9999", { placeholder: "-" });
    $("#txtHoraInternacion").mask("99:99", { placeholder: "-" });
}

function Cargar_Seccionales_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Seccionales_Listas_Cargadas,
        error: errores
    });

}

function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
    });
}

var ID;

$(document).ready(function () {
    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    if (GET["ID"] != "" && GET["ID"] != null) {
            ID = GET["ID"];
            //$("#afiliadoId").val(ID);
            CargarPacienteID(ID);
    }

    InitControls();
    $(".contenedor_3 :input").attr("disabled", true);
    $("#motivoanula").removeAttr("disabled");
    $("#txt_NroInternacion").mask("9?99999999", { placeholder: "" });
    $("#txt_FechaOperado").mask("99/99/9999");
    Cargar_Especialidades(true, 0, true, 0, 0);
});

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

//function RecargarPagina(url) {
//    document.location = "../Internacion/AnularIngEgr.aspx" + url;
//}

function isDate(y, m, d) {
    var date = new Date(y, m - 1, d);

    var dd = date.getDate();
    dd = (dd < 10) ? '0' + dd : dd;

    var yyyy = date.getFullYear();

    var mm = date.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;

    var convertedDate = yyyy + '' + mm + '' + dd;
    var givenDate = "" + y + '' + m + '' + d;
    return (givenDate == convertedDate);
}


$('#txt_FechaOperado').change(function () {

    var Date = $('#txt_FechaOperado').val();
    var elem = Date.split('/');
    dia = elem[0];
    mes = elem[1];
    anio = elem[2];

    if (!isDate(anio, mes, dia)) {
        if ($('#txt_FechaOperado').val() != "") {
            $("#ControlOperado").addClass("error");
            $('#txt_FechaOperado').focus();
        }
        else {
            $("#ControlOperado").removeClass("error");
        }

    }
    else {
        $("#ControlOperado").removeClass("error");
    }
});

$("#btnLimpiarEgreso").click(function () {
    if (confirm("¿Desea anular el egreso?")) {
        if ($("#motivoanula").val().trim().length == 0) { alert("Ingrese motivo de anulación."); return false; }
        var json = JSON.stringify({ "Id": EditantoId, "Obs": $("#motivoanula").val().trim().toUpperCase() });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/Internacion_Borrar_Egreso",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                alert("Egreso anulado.");
                document.location = "../Internacion/AnularIngEgr.aspx";
            },
            error: errores
        });
    }
});


$("#btnLimpiarIngreso").click(function () {
    if (confirm("¿Desea anular el ingreso?")) {
        if ($("#motivoanula").val().trim().length == 0) { alert("Ingrese motivo de anulación."); return false; }
        var json = JSON.stringify({ "Id": EditantoId, "Obs": $("#motivoanula").val().trim().toUpperCase() });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/Internacion_Baja",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                alert("Ingreso anulado.");
                document.location = "../Internacion/AnularIngEgr.aspx";
            },
            error: errores
        });
    }
});
