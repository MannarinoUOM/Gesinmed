var nServicio = "";
var nSala = "";
var nCama = "";
var nServicioId = 0;
var nSalaId = 0;
var nCamaId = 0;
var EditantoId = 0;
var me = 0;
var Egreso = 0;
var devolvio = 1;

//Ready//
$(document).ready(function () {
    var GET = {};
    var idEntregaControl;
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    InitControls();

    if (GET["ID_Int"] != "" && GET["ID_Int"] != null) {
        EditantoId = GET["ID_Int"];
        CargarID(GET["ID_Int"]);
    }

    if (GET["BusquedaEgr"] != "" && GET["BusquedaEgr"] != null) {
        Egreso = GET["BusquedaEgr"];
        parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > Buscar Egresos > <strong>Egresos</strong>";
        $(".contenedor_3 :input").attr("disabled", true);
        $("#btnImprimir").show();
    }
    else parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Egresos</strong>";


});

//Cargo Controles del form
function InitControls() {
    $("#txt_NroInternacion").mask("9?99999999", { placeholder: "" });
    $("#txt_FechaOperado").mask("99/99/9999");
    $("#txt_FechaEgreso").datepicker();
    $("#txt_FechaOperado").datepicker();
    Cargar_Especialidades(true, 0, true, 0, 0);
    CargarMotivoegreso(0);
    CargarICD10_AutoComplete_Pri();
    CargarICD10_AutoComplete_Sec();
    CargarICD10_AutoComplete_Ter();
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


///Autocomplete Secundario//
var sourceArr_Sec = [];
var mapped_Sec = {};

function CargarICD10_AutoComplete_Sec() {
    $('#cbo_DiagnosticoICD10_Sec').typeahead({
        updater: function (item) {
            $("#diag_nombre_sec").val(item); //nom
            $("#id_val_sec").val(mapped_Sec[item]); //id
            $("#txt_Codigo_Detalle_ICD10").val(mapped_Sec[item]);
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
                            sourceArr_Sec.length = 0;
                        }
                        str = icd.Descripcion;
                        mapped_Sec[str] = icd.Codigo;
                        sourceArr_Sec.push(str);
                    });
                    return process(sourceArr_Sec);
                }
            });
        }
    });
}

///Autocomplete Secundario//
var sourceArr_Ter = [];
var mapped_Ter = {};

function CargarICD10_AutoComplete_Ter() {
    $('#cbo_DiagnosticoICD10_Ter').typeahead({
        updater: function (item) {
            $("#diag_nombre_ter").val(item); //nom
            $("#id_val_ter").val(mapped_Ter[item]); //id
            $("#txt_Codigo_Detalle_ICD10_3").val($("#id_val_ter").val());
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
                            sourceArr_Ter.length = 0;
                        }
                        str = icd.Descripcion;
                        mapped_Ter[str] = icd.Codigo;
                        sourceArr_Ter.push(str);
                    });
                    return process(sourceArr_Ter);
                }
            });
        }
    });
}


function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function CargarID(Id) {
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

    if ($("#txt_NroInternacion").val() != "") {
        EditantoId = $("#txt_NroInternacion").val();
    }
    
        $("#hastaaqui").fadeIn('slow', function () {
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top  }, 500);
        });

    $("#NroInt").html(EditantoId);
    $("#CargadoApellido").html(Egreso.Paciente);
    $("#CargadoEdad").html(Egreso.Edad);
    $("#CargadoDNI").html(Egreso.DNI);
    $("#CargadoNHC").html(Egreso.NHC);
    $("#CargadoSeccional").html(Egreso.Seccional);
    $("#CargadoTelefono").html(Egreso.Telefono);
    $("#afiliadoId").val(Egreso.AfiliadoId);
    // para mostrar boton de devolucion de control remoto
    if (Egreso.debeControl == 1) { $("#btnDevolver").show(); idEntregaControl = Egreso.idEntrega; devolvio = 0; } else { $("#btnDevolver").hide(); }

    $("#txtEgresadopor").html(Egreso.EgresoUsuario);
    if (Egreso.foto != "0") { $('#fotopaciente').attr('src', '../fotoPerfil/' + Egreso.foto); } else { $('#fotopaciente').attr('src', '../img/silueta.jpg'); }
    
    $("#txt_FechaEgreso").val(Egreso.dia);
    $("#txt_HoraEgreso").val(Egreso.hora);
    $("#txt_fechaIngreso").val(Egreso.diaIngreso);  // Manuel
    $("#txt_HoraIngreso").val(Egreso.horaIngreso);  // Manuel

    if ($("#txt_FechaEgreso").val()=='')
    {
        $("#txt_FechaEgreso").val(FechaActual());
        $("#txt_HoraEgreso").val(HoraActual());
    }

    $("#sp_Servicio").html(Egreso.servicio);
    $("#sp_Sala").html(Egreso.sala);
    $("#sp_Cama").html(Egreso.cama);

    CargarPacienteID(Egreso.AfiliadoId);
    CargarMotivoegreso(Egreso.motivoegreso);
    Cargar_Especialidades(true, 0, true, Egreso.egresoespecialidad, Egreso.egresomedico);
    CargarDiags_ICD10(Egreso);

    $("#txt_FechaOperado").val(Egreso.fechaoperado);
    $("#txt_Observacion").val(Egreso.observacionegreso);
    $("#btnOperado").html(Egreso.operado);
    $("#btnOperado").addClass(Egreso.bclas);

}

//Si cambia el contenido de algun autocompletar//
$(".typeahead").change(function () {
    var cod = $(this).attr("rel");
    if ($(this).val().trim().length == 0) {
        switch (cod) {
            case 'Pri': $("#txt_CodigoICD10").val(""); break;
            case 'Sec': $("#txt_Codigo_Detalle_ICD10").val(""); break;
            case 'Ter': $("#txt_Codigo_Detalle_ICD10_3").val(""); break;
        }
    }
});

function CargarDiags_ICD10(CgaEpi) {
    $("#diag_nombre_pri").html(CgaEpi.diagnosticoicd10_desc);
    $("#diag_nombre_sec").html(CgaEpi.detalleicd10_desc);
    $("#diag_nombre_ter").html(CgaEpi.detalleicd10_3desc);

    $("#id_val_pri").val(CgaEpi.diagnosticoicd10);
    $("#id_val_sec").val(CgaEpi.detalleicd10);
    $("#id_val_ter").val(CgaEpi.detalleicd10_3);

    $("#txt_CodigoICD10").val(CgaEpi.diagnosticoicd10);
    $("#txt_Codigo_Detalle_ICD10").val(CgaEpi.detalleicd10);
    $("#txt_Codigo_Detalle_ICD10_3").val(CgaEpi.detalleicd10_3);

    $("#cbo_DiagnosticoICD10_Pri").val(CgaEpi.diagnosticoicd10_desc);
    $("#cbo_DiagnosticoICD10_Sec").val(CgaEpi.detalleicd10_desc);
    $("#cbo_DiagnosticoICD10_Ter").val(CgaEpi.detalleicd10_3desc);
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


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


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
    CargarMedico($('#cbo_Especialidad option:selected').val(),"");
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
    if(Egreso == 0) document.location = "Egreso.aspx";
    else document.location = "BuscarEgreso.aspx";
});

function ValidarEgreso() {
    if ($("#txt_CodigoICD10").val() == "0") $("#txt_CodigoICD10").val("");
    if ($("#txt_CodigoICD10").val().trim().length == 0) { alert("1° Codigo ICD10 es obligatorio."); $("#cbo_DiagnosticoICD10_Pri").focus(); return false; }
    if ($('#cbo_Especialidad option:selected').val() == "0") { alert("Ingrese Especialidad."); return false; }
    if ($('#cbo_Medico option:selected').val() == "0") { alert("Ingrese Médico."); return false; }
    if ($('#cbo_Motivo_Egreso option:selected').val() == "0") { alert("Ingrese Motivo Egreso."); return false; }
    if (devolvio == 0) { alert("Informe si el paciete devolvio el control remoto!."); return false; }

    if ($("#ControlOperado").hasClass("error")) {
        alert("Verifique la Fecha de Operado.");
        $('#txt_FechaOperado').focus();
        return false;
    }

    if ($("#txt_FechaEgreso").val().length != 10) {
        alert("Falta la Fecha del Egreso"); 
        $('#txt_FechaEgreso').focus();
        return false;
    }

    if ($("#txt_HoraEgreso").val().length < 3) {
        alert("Falta la Hora del Egreso"); 
        $('#txt_HoraEgreso').focus();
        return false;
    }
    return true;
}

$('#btnGuardarEgreso').click(function () {
    if (confirm("¿Desea confirmar el egreso?")) {
        if (!ValidarEgreso()) return false;

        var json = JSON.stringify({
            "Id": EditantoId,
            "DiagnosticoICD10Id": $("#id_val_pri").val(),
            "DiagnosticoICD10DetalleId": $("#id_val_sec").val(),
            "ICD10_3": $("#id_val_ter").val(),
            "Motivo": $('#cbo_Motivo_Egreso :selected').val(),
            "ObservacionFinal": $("#txt_Observacion").val().trim().toUpperCase(),
            "Operado": $("#btnOperado").html(),
            "OperadoFecha": $("#txt_FechaOperado").val(),
            "EgresoEspecialidadId": $('#cbo_Especialidad :selected').val(),
            "EgresoMedicoId": $('#cbo_Medico :selected').val(),
            "FechaEgreso": $("#txt_FechaEgreso").val() + " " + $("#txt_HoraEgreso").val(),
            "FechaIngreso": $("#txt_fechaIngreso").val() + " " + $("#txt_HoraIngreso").val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/Egreso_Guardar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                ImpresionEgreso();
            },
            error: errores
        });
    }
});

function InternacionId_byNHC(NHC) {
    var json = JSON.stringify({ "NHC": NHC });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/InternacionId_by_NHC",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d > 0) {
                CargarID(Resultado.d);
                $("#txt_NroInternacion").val(Resultado.d);
            }
            else { alert("El Nro. HC ingresado no registra ninguna internación."); document.location = "Egreso.aspx"; }
        },
        error: errores
    });
}

$("#desdeaqui").click(function () {
    InternacionId_byNHC($("#txt_NroInternacion").val());
});

$('#txt_NroInternacion').keypress(function (e) {
    if (e.which == '13') {
        if (this.value.trim().length > 0) $("#desdeaqui").click();
        else {
            alert("Ingrese Nro. de HC.");
        }
        e.preventDefault();
    }
});

$("#btnAceptar").click(function () {
    if ($('#txt_NroInternacion').val().trim().length > 0) $("#desdeaqui").click();
    else alert("Ingrese Nro. de HC.");
});

function isDate(y, m, d) {
    var date = new Date(y, m - 1, d);
    //var convertedDate = "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();

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





function ImpresionEgreso() {
    var Pagina = "../Impresiones/Impresion_Egreso.aspx?Id=" + EditantoId + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '78%',
		    'height': '78%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'onClosed': function () {
                if (Egreso == 0)
                    self.location = 'Egreso.aspx';
                else self.location = 'BuscarEgreso.aspx';
		    }
		}
	        );
}

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
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

            if (paciente.Nro_Seccional == 998) {
                $("#CargadoSeccionalTitulo").html("Ob. Social");
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }

    });
    }

    $("#btnLimpiarEgreso").click(function () {
        var json = JSON.stringify({ "Id": EditantoId });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/Internacion_Borrar_Egreso",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                alert("Egreso dado de baja");
                document.location = "../Internacion/BuscarEgreso.aspx";
            },
            error: errores
        });
    });

    $("#btnDevolver").click(function () {
        var json = JSON.stringify({ "id": idEntregaControl });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/DevolverControlxEgreso",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {

                if (Resultado.d == 1) { alert("Control devuelto."); devolvio = 1; $("#btnDevolver").hide(); } else { alert("No se pudo devolver el control."); }

            },
            error: errores
        });
    });