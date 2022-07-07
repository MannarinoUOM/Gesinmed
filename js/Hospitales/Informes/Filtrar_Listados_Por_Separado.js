var GET = {};
var buscar = 0;
var especialidad = 0;
var informe = "";
var fecha = new Date();
//var ano = fecha.getFullYear();
var mes = fecha.getMonth() + 1;
var desdeDef = "";
var hastaDef = "";
var ano = fecha.getFullYear();
var bandera = false;
var idsSeccionales = "";

$(document).ready(function () {

    if (GET["informe"] != "" && GET["informe"] != null) {
        informe = GET["informe"];
        $("#btnListar").attr('disabled', false);
    }
    if (informe != "CantidadDeEstudiosPorSubrubros") {
        var json = JSON.stringify({ "tipo": 1 });
        $.ajax({
            type: "POST",
            url: "../Json/Informes.asmx/Traer_Seccionales_Especialidades",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //        beforeSend: antes,
            success: cargarComboEspecialidad,
            error: errores
        });
    }

    var json = JSON.stringify({ "tipo": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Informes.asmx/Traer_Seccionales_Especialidades",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //        beforeSend: antes,
        success: cargarComboSeccional,
        error: errores,
        complete: function () {
            if (informe == "TurnosDisponibles") {

                if (mes <= 9) {
                    $("#txtDesde").val(fecha.getDate() + "/" + "0" + mes + "/" + ano);
                    $("#txtHasta").val(fecha.getDate() + "/" + "0" + mes + "/" + ano);
                }
                else {
                    $("#txtDesde").val(fecha.getDate() + "/" + mes + "/" + ano);
                    $("#txtHasta").val(fecha.getDate() + "/" + mes + "/" + ano)
                }

            } else {
                switch (mes) {
                    case 1:
                        $("#txtDesde").val("01/" + "0" + mes + "/" + ano);
                        $("#txtHasta").val("31/" + "0" + mes + "/" + ano);
                        break;
                    case 2:
                        $("#txtDesde").val("01/" + "0" + mes + "/" + ano);
                        $("#txtHasta").val("28/" + "0" + mes + "/" + ano);
                        break;
                    case 3:
                        $("#txtDesde").val("01/" + "0" + mes + "/" + ano);
                        $("#txtHasta").val("31/" + "0" + mes + "/" + ano);
                        break;
                    case 4:
                        $("#txtDesde").val("01/" + "0" + mes + "/" + ano);
                        $("#txtHasta").val("30/" + "0" + mes + "/" + ano);
                        break;
                    case 5:
                        $("#txtDesde").val("01/" + "0" + mes + "/" + ano);
                        $("#txtHasta").val("31/" + "0" + mes + "/" + ano);
                        break;
                    case 6:
                        $("#txtDesde").val("01/" + "0" + mes + "/" + ano);
                        $("#txtHasta").val("30/" + "0" + mes + "/" + ano);
                        break;
                    case 7:
                        $("#txtDesde").val("01/" + "0" + mes + "/" + ano);
                        $("#txtHasta").val("31/" + "0" + mes + "/" + ano);
                        break;
                    case 8:
                        $("#txtDesde").val("01/" + "0" + mes + "/" + ano);
                        $("#txtHasta").val("31/" + "0" + mes + "/" + ano);
                        break;
                    case 9:
                        $("#txtDesde").val("01/" + "0" + mes + "/" + ano);
                        $("#txtHasta").val("30/" + "0" + mes + "/" + ano);
                        break;
                    case 10:
                        $("#txtDesde").val("01/" + mes + "/" + ano);
                        $("#txtHasta").val("31/" + mes + "/" + ano);
                        break;
                    case 11:
                        $("#txtDesde").val("01/" + mes + "/" + ano);
                        $("#txtHasta").val("30/" + mes + "/" + ano);
                        break;
                    case 12:
                        $("#txtDesde").val("01/" + mes + "/" + ano);
                        $("#txtHasta").val("31/" + mes + "/" + ano);
                        break;

                }
            }


            $(".deshabilitar").attr('disabled', false);
            //if (informe == "TurnosDisponibles") { $("#txtDesde").attr('disabled', true); }
            buscar = 1;
        }
    });
});


function cargarComboEspecialidad(resultado) {
    switch (informe) {

        case "Estudiosporservicio":
            var list = resultado.d;
            $.each(list, function (index, item) {
                if (item.id == 354 || item.id == 343 || item.id == 341 || item.id == 355 || item.id == 339 || item.id == 340 || item.id == 342) { $("#cboEspecialdades").append(new Option(item.descripcion, item.id)); }
            });
            break;

        case "ListadoTotaldeComidas":
            //$("#cboEspecialdades").empty();
            break;

        case "ReportesdeProduccion":
            $("#cboEspecialdades").append(new Option("Tecnicos", 1));
            $("#cboEspecialdades").append(new Option("Tipistas", 2));
            $("#cboEspecialdades").append(new Option("Medicos", 3)); 
            break;

        default:
            var list = resultado.d;
            $("#cboEspecialdades").append(new Option("Todas", 0));
            $.each(list, function (index, item) {
                if (informe == "InformesConsumoDeGuardia") {
                    if ((item.id >= 179 && item.id <= 182) || item.id == 253) { $("#cboEspecialdades").append(new Option(item.descripcion, item.id)); }
                } else {
                    $("#cboEspecialdades").append(new Option(item.descripcion, item.id));
                }
            });
            break;
    }
}

function cargarComboSeccional(resultado) {
    var list = resultado.d;
    if (informe != "ListadoTotaldeComidas") {
        $("#cboSeccionales").append(new Option("Todas", 0));
        $.each(list, function (index, item) {
            $("#cboSeccionales").append(new Option(item.descripcion, item.id));
        });
    }
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    GET[decode(arguments[1])] = decode(arguments[2]);
});
//CantidadDeEstudiosPorSubrubros
if (GET["informe"] != "" && GET["informe"] != null) {
    informe = GET["informe"];
    $("#btnListar").attr('disabled', false);
}

function modificarFRM() {
    $("#cboSeccionales").hide();
    $("#cboEspecialdades").hide();
    $("#lblEspecialidad").hide();
    $("#lblSeccional").hide();
    $(".contenedor_1").css('margin-top', '190');
    $(".contenedor_1").css('height', '215');
    $(".contenedor_2").css('height', '133');
}

$("#txtDesde").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    maxDate: '0m',
    onClose: function (selectedDate) {
        $("#txtHasta").datepicker("option", "minDate", selectedDate);

    }
});

//if (informe == "TurnosDisponibles") {
//    $("#txtHasta").datepicker({
//        dateFormat: 'dd/mm/yy',
//        changeMonth: true,
//        changeYear: true,
//        maxDate: '4m',
//        minDate: fecha.getDate() + "/" + "0" + mes + "/" + ano
//    });
//} else {
    $("#txtHasta").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        minDate: '0m',
        onClose: function (selectedDate) {
            $("#txtDesde").datepicker("option", "maxDate", selectedDate);
        }
    });
//}

$("#txtHasta").keydown(function () {
    return false;
});
$("#txtDesde").keydown(function () {
    return false;
});

    switch (informe) {
        case "turnosReservadosPorUsuarioXdia":
            $("#titulo").html("Turnos Reservados Por Usuario Por Día");
            modificarFRM();
            break;
        case "turnosReservadosPorUsuarioXperiodo":
            $("#titulo").html("Turnos Reservados Por Usuario Por Período");
            modificarFRM();
            break;
        case "UsuariosAperturaDeHistoriaClinicaPorDia":
            $("#titulo").html("Usuarios Apertura De Historia Clínica Por Día");
            modificarFRM();
            break;
        case "UsuariosAperturaDeHistoriaClinicaPorDiaPorPeriodo":
            $("#titulo").html("Usuarios Apertura De Historia Clinica Por Período");
            modificarFRM();
            break;
        case "listadoDePacientesAtendidos":

            $("#titulo").html("Listado De Pacientes Atendidos");
            $("#Detallado").show();
            $("#lblDetallado").html("Solo Totales");
            $("#contenedorFiltros").css('height', '216')
            $("#Detallado").on("change", function () {
                bandera = !bandera;
                if (bandera == true) {
                    modificarFRM();
                } else {
                    $("#cboSeccionales").show();
                    $("#cboEspecialdades").show();
                    $("#lblEspecialidad").show();
                    $("#lblSeccional").show();
                    $(".contenedor_1").css('margin-top', '190');
                    $(".contenedor_1").css('height', '292');
                    $(".contenedor_2").css('height', '210');
                }
                
            });

            break;
        case "cantidadDePacientesDeGuardiaPorEspecialidad":
            $("#titulo").html("Cantidad De Pacientes De Guardia Por Especialidad");
            modificarFRM();
            break;
        case "rankingDiagnosticoIcd10AmbulatorioXmedico":
            $("#titulo").html("Ranking Diagnóstico ICD10 Ambulatorio Por Médico");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").show();
            break;
        case "rankingDiagnosticoIcd10AmbulatorioXespecialidad":
            $("#titulo").html("Ranking Diagnóstico ICD10 Ambulatorio Por Especialidad");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").show();
            break;
        case "rankingDiagnosticoIcd10AmbulatorioGeneral":
            $("#titulo").html("Ranking Diagnóstico ICD10 Ambulatorio General");
            modificarFRM();
            $("#TodosMenoresMayores").show();
            break;
        case "RankingDiagnosticoICD10AmbulatorioPorSeccional":
            $("#titulo").html("Ranking Diagnóstico ICD10 Ambulatorio Por Seccional");
            $("#cboSeccionales").show();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").show();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").show();
            break;
        case "CantidadDePacientesDeGuardia":
            $("#titulo").html("Cantidad De Pacientes De Guardia");
            modificarFRM();
            break;

        case "CantidadDeConsultasDeGuardiaPorMedicos":
            $("#titulo").html("Cantidad De Consultas De Guardia Por Médicos");
            modificarFRM();
            break;
        case "CantidadDeConsultasDeGuardiaXSeccionalObraSocial":
            $("#titulo").html("Cantidad De Consultas De Guardia Por Seccional");
            $("#cboSeccionales").show();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").show();
            $("#Graficos").show();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#btnListarPDF").css('margin-left', '21');
            break;

        case "CantidadDePacientesPorGuardia":
            $("#titulo").html("Pacientes Por Guardia");
            $("#cboSeccionales").show();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").show();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            break;
        case "InformeDeTurnos":
            //        parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > <strong>Informes</strong>";
            $("#titulo").html("Informe De Turnos");
            $("#cboSeccionales").show();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").show();
            $("#Detallado").show();
            $("#lblDetallado").html('Solo Totales');
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            break;
        case "TurnosPorMedico":
            $("#titulo").html("Turnos Por Médico");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            break;

        case "TurnosporEspecialdad":
            //        parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Informes</strong>";
            $("#titulo").html("Turnos por Especialidad(atención en persona y teléfonica)");
            modificarFRM();
            break;

        case "InformedeART":
            $("#titulo").html("Informe de ART");
            $("#cboSeccionales").show();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").show();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            break;

        case "DistribucióndeConsultasMédicasExternas":
            $("#titulo").html("Distribución de Consultas Médicas Externas");
            modificarFRM();
            break;

        case "DistribucióndeConsultasExternasporEspecialidad":
            $("#titulo").html("Distribución de Consultas Externas por Especialidad");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '286');
            $(".contenedor_2").css('height', '205');

            $("#lblTipo").html("Tipo de Listado");
            $("#Tipo").show();
            break;

        case "ListadoCantidadMensualDePracticasYConsultasConfirmadas":
            $("#titulo").html("Cantidad Mensual De Practicas Y Consultas Confirmadas Por Seccional");
            $("#cboSeccionales").show();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").show();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            break;

        case "TurnosDisponibles":
            $("#Detallado").show();
            $("#titulo").html("(Turnos) Turnos Disponibles");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            break;

        case "ListadoCantidadMensualDePracticasYConsultasConfirmadasxEspecialidad":
            $("#Detallado").hide();
            $("#titulo").html("Cantidad Mensual de Practicas y Consultas Confirmadas Por Especialidad");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            break;

        case "TurnosPorEspecialidad":
            $("#titulo").html("Turnos Por Especialidad");
            modificarFRM();
            break;

        case "DetalleDeHorasDeAtencionPorMedico":
            $("#titulo").html("Detalle De Horas De Atención Por Médico");
            modificarFRM();
            break;

        case "PrácticasPorMédicoDetallado":
            $("#titulo").html("Prácticas Por Médico Detallado");
            $("#lblDetallado").html("Por Seccional");
            $("#Detallado").show();
            break;

        case "EstadisticasDePracticasPorEspecialidad":
            $("#titulo").html("Estadísticas De Prácticas Por Especialidad");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            break;

        case "RankingDiagnósticoICD10Ambulatorio":
            $("#titulo").html("Ranking Diagnóstico ICD10 Ambulatorio");
            modificarFRM();
            $("#TodosMenoresMayores").show();
            break;

        case "InformesConsumoDeGuardia":
            $("#titulo").html("Informes Consumo De Guardia");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            break;

//        case "PacientresDeGuardiaPorSeccional":
//            $("#titulo").html("Pacientes De Guardia Por Seccional Gráfico");
//            modificarFRM();
//            break;

        case "ConsultasDeGuardiaPorMédicosPacientesInternados":
            $("#titulo").html("Consultas De Guardia Por Médicos Pacientes Internados");
            modificarFRM();
            break;

        case "InformeDePracticasSegunEspecialidadesDeGuardia":
            $("#titulo").html("Informe De Practicas Segun Especialidades De Guardia");
            modificarFRM();
            break;

        case "ListadoInformeDeMedicamentosDeGuardia":
            $("#titulo").html("Listado Informe De Medicamentos De Guardia");
            modificarFRM();
            break;

        case "CantidadDePacientesPorLaboratorio":
            $("#titulo").html("Cantidad De Pacientes Por Laboratorio");
            modificarFRM();
            break;

        case "ConsultasDePacientesPorLaboratorio":
            $("#titulo").html("Consultas De Pacientes Por Laboratorio");
            modificarFRM();
            break;

        case "CantidadDePacientesDeLaboratorioPorMedicos":
            $("#titulo").html("Cantidad De Pacientes De Laboratorio Por Medicos");
            modificarFRM();
            break;

        case "CantidadDePracticasDeLaboratorio":
            $("#titulo").html("Cantidad De Practicas De Laboratorio");
            modificarFRM();
            break;

        case "RankingDePracticasDeLaboratorio":
            $("#titulo").html("Ranking De Practicas De Laboratorio");
            modificarFRM();
            break;

        case "CantidadDePacientesDeLaboratorioPorSeccional":
            $("#titulo").html("Cantidad De Pacientes De Laboratorio Por Seccional");
            modificarFRM();
            $("#Graficos").show();
            break;

        case "CantidadDePracticasPorLaboratorioPorSeccional":
            $("#titulo").html("Cantidad De Practicas Por Laboratorio Por Seccional");
            modificarFRM();
            $("#Graficos").show();
            break;

        case "CantidadDePacientesDeConsultoriosPorSeccional":
            $("#titulo").html("Cantidad De Pacientes De Consultorios Por Seccional");
            modificarFRM();
            $("#Graficos").show();
            break;

        case "CantidadDePacientesDeGuardiaPorSeccional":
            $("#titulo").html("Cantidad De Pacientes De Guardia Por Seccional");
            modificarFRM();
            $("#Graficos").show();
            break;

        case "CantidadDePacientesDeRayosPorSeccional":
            $("#titulo").html("Cantidad De Pacientes De Rayos Por Seccional");
            modificarFRM();
            $("#Graficos").show();
            break;
        case "CantidadDeBonosPorEspecialidad":
            $("#titulo").html("Cantidad De Bonos Por Especialidad");
            modificarFRM();
            break;
        case "CantidadDeBonosPorSeccional":
            $("#titulo").html("Cantidad De Bonos Por Seccional");
            modificarFRM();
            break;
        case "ReporteDeBonosEmitidos":
            $("#titulo").html("Reporte De Bonos Emitidos");
            modificarFRM();
            break;
        case "ReporteDeBonosEmitidosPorSeccional":
            $("#titulo").html("Reporte De Bonos Emitidos Por Seccional");
            modificarFRM();
            break;
        case "ReporteDeBonosEmitidosPorTerminal":
            $("#titulo").html("Reporte De Bonos Emitidos Por Terminal");
            modificarFRM();
            $("#Detallado").show();
            $("#lblDetallado").text("Totales");
            $("#CboDetallado").css("margin-top", "0px");
            break;
        case "ReporteDeBonosEmitidosPorTerminalDetallado":
            $("#titulo").html("Reporte De Bonos Emitidos Por Terminal Detallado");
            //modificarFRM();
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '240');
            $(".contenedor_2").css('height', '160');
            break;
        case "ReporteDeBonosEmitidosPorTerminal(DiferenciadoPorEspecialidad)":
            $("#titulo").html("Reporte De Bonos Emitidos Por Terminal(DiferenciadoPorEspecialidad)");
            modificarFRM();
            $("#lblEspecialidad").show();
            $("#cboEspecialdades").show();
            $("#contenedorFiltros").css('height', '170px');
            $(".contenedor_1").css('height','250px')
            break;
        case "CantidadDeBonosPorSeccional(totales)":
            $("#titulo").html("Cantidad De Bonos Por Seccional(totales)");
            modificarFRM();
            $("#Graficos").show();
            break;

        case "CantidadDeEstudiosPorSeccional":
            $("#titulo").html("Cantidad De Estudios Por Seccional");
            modificarFRM();
            break;
        case "CantidadDeEstudiosPorPaciente":
            $("#titulo").html("Cantidad De Estudios Por Paciente");
            modificarFRM();
            break;
        case "CantidadDeEstudiosPorEspecialidad":
            $("#titulo").html("Cantidad De Estudios Por Especialidad");
            modificarFRM();
            break;
        case "TrasladosPorSeccionalDesdeElPoliclinico":
            $("#titulo").html("Traslados Por Seccional Desde El Policlinico");
            modificarFRM();
            break;
        case "TrasladosPorSeccionalHaciaElPoliclinico":
            $("#titulo").html("Traslados Por Seccional Hacia El Policlinico");
            modificarFRM();
            break;
        case "PracticasNoAuditadasPorSeccional":
            $("#titulo").html("Practicas No Auditadas Por Seccional");
            modificarFRM();
            break;
        ////////////////////// 
        case "CirugiasRealizadasPorSeccional":
            $("#titulo").html("Cirugias Realizadas Por Seccional");
            modificarFRM();
            break;
        case "CirugiasRealizadasPorEspecialidad":
            $("#titulo").html("Cirugias Realizadas Por Especialidad");
            modificarFRM();
            break;
        case "CirugiasRealizadasPorProfesional":
            $("#titulo").html("Cirugias Realizadas Por Profesional");
            modificarFRM();
            break;
        case "CirugiasRealizadasPorSeccionales":
            $("#titulo").html("Cirugias Realizadas Por Seccionales");
            modificarFRM();
            break;
        case "CirugiasRealizadasPorEspecialidades":
            $("#titulo").html("Cirugias Realizadas Por Especialidades");
            modificarFRM();
            break;
        case "CirugiasRealizadasPorCirujanos":
            $("#titulo").html("Cirugias Realizadas Por Cirujanos");
            modificarFRM();
            break;
        case "CantidadDeEstudiosPorSubrubros":
            $("#titulo").html("Cantidad De Estudios Por Subrubros");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#lblSeccional").hide();
            $("#lblPrestador").show();
            $("#lblPrestador").css('display','inline');
            $("#CboPrestador").show();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $.ajax({
                type: "POST",
                url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerSubrubrosCombo",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    listaModulos = Resultado.d;
                    $("#cboEspecialdades").append(new Option("TODOS", 0));
                    $.each(listaModulos, function (index, item) {
                        $("#cboEspecialdades").append(new Option(item.nombre, item.id));
                    });
                }
            });
            $.ajax({
                type: "POST",
                url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPrestadoresCombo",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    listaPrestadores = Resultado.d;
                    $("#CboPrestador").append(new Option("TODOS", 0));
                    $.each(listaPrestadores, function (index, item) {
                        $("#CboPrestador").append(new Option(item.nombre, item.id));
                    });
                }
            });

            $("#lblEspecialidad").html("SubRubro");
            break;

        case "DetalleHorariodeCirugias":
            $("#titulo").html("Detalle Horario de Cirugías");
            modificarFRM();
            break;

        case "HorariodeCirugiasDetallado":
            $("#titulo").html("Horario de Cirugías Detallado");
            modificarFRM();
            break;

        case "DetalleDeCirugiasSuspendidas":
            $("#titulo").html("Detalle De Cirugías Suspendidas");
            modificarFRM();
            break;

        case "DetalleDeCirugiasReservadasNoCerradas":
            $("#titulo").html("Detalle De Cirugías Reservadas No Cerradas");
            modificarFRM();
            break;

        case "ProtesisyExtrasConsumidosporCirugia":
            $("#titulo").html("Protesis y Extras Consumidos por Cirugía");
            modificarFRM();
            break;

        case "TotalHorariodeCirugiasporEspecialidad":
            $("#titulo").html("Total Horario de Cirugias por Especialidad");
            modificarFRM();
            break;

        case "TotalHorariodeCirugiasporCirujano":
            $("#titulo").html("Total Horario de Cirugías por Cirujano");
            modificarFRM();
            break;

        case "CirugiasRealizadasPorEspecialidadTotal":
            $("#titulo").html("Cirugías Realizadas Por Especialidad Total");
            modificarFRM();
            break;

        case "CirugiasRealizadasPorProfesionalTotal":
            $("#titulo").html("Cirugías Realizadas Por Profesional Total");
            modificarFRM();
            break;

        case "CirugiasRealizadasPorAnestesistas":
            $("#titulo").html("Cirugías Realizadas Por Anestesistas");
            modificarFRM();
            break;

        case "RankingDiagnosticoICD10Internacion":
            $("#titulo").html("Ranking Diagnóstico ICD10 Internacion");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").show();
            break;

        case "EgresosDiarios":
            $("#titulo").html("Egresos Diarios");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;

        case "EgresosMensuales":
            $("#titulo").html("Egresos Mensuales");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;

        case "EgresosporSeccional":
            $("#titulo").html("Egresos por Seccional");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            $("#contenedorFiltros").css('height','293');
            $("#seccionalesGrilla").show();
            break;

        case "EgresosporServicios":
            $("#titulo").html("Egresos por Servicios");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;

        case "EgresosporServiciosMes":
            $("#titulo").html("Egresos por Servicios Mes");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;

        case "EgresosporSeccionalesMes":
            $("#titulo").html("Egresos por Seccionales Mes");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;

        case "IngresosDiarios":
            $("#titulo").html("Ingresos Diarios");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;

        case "IngresosMensuales":
            $("#titulo").html("Ingresos Mensuales");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;

        case "DiagnosticoICD10AmbulatorioDetallado":
            $("#titulo").html("Diagnostico ICD10 Ambulatorio Detallado");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").show();
            break;

        case "DiagnosticoICD10GuardiaDetallado":
            $("#titulo").html("Diagnostico ICD10 Guardia Detallado");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
            
        case "EgresosporEspecialidad":
            $("#titulo").html("Egresos por Especialidad");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;

        case "InformedeFallecidos":
            $("#titulo").html("Informe de Fallecidos");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;

        case "PorcentajeOcupacional":
            $("#titulo").html("Porcentaje Ocupacional");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "PorcentajeOcupacionalAgrupado":
            $("#titulo").html("Porcentaje Ocupacional Agrupado");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "InternadosenUTIporEspecialidad":
            $("#titulo").html("Internados en U.T.I por Especialidad");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;

        case "DiasdeInternacionenUTI":
            $("#titulo").html("Dias de Internacion en U.T.I");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "EstudiosRealizados":
            $("#titulo").html("Estudios Realizados");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Estadistica(Nomenclador)":
            $("#titulo").html("Estadistica (Nomenclador)");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "PAPRealizados":
            $("#titulo").html("PAP Realizados");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Diaspreviosyposterioresalacirugia":
            $("#titulo").html("DÍas previos y posteriores a la cirugÍa");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Estudiosporservicio":
            $("#titulo").html("Estudios por servicio");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "CantidadDePracticasPorSeccional":
            $("#titulo").html("Cantidad De Practicas Por Seccional");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "RechazosPorFaltanteDeCama":
            $("#titulo").html("Rechazos Por Faltante De Cama");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;

        case "Mamografiasporservicioyseccional":
            $("#titulo").html("Mamografías por servicio y seccional");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Mamografiasmensualporservicioypracticas":
            $("#titulo").html("Mamografías mensual por servicio y prácticas");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Mamografiasmensualporservicioyseccional":
            $("#titulo").html("Mamografías mensual por servicio y seccional");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Mamografiasmensualporservicioypracticasdetallado":
            $("#titulo").html("Mamografías mensual por servicio y prácticas detallado");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Rankingdemamografias":
            $("#titulo").html("Ranking de mamografías");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Cantidaddepacientesderayos":
            $("#titulo").html("Cantidad de pacientes de rayos");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Cantidaddepacientesatendidosenrayosporseccional":
            $("#titulo").html("Cantidad de pacientes atendidos en rayos por seccional");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Tomografiasporservicioseccional":
            $("#titulo").html("Tomografías por servicio seccional");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Tomografiasmensualporservicioypractica":
            $("#titulo").html("Tomografías mensual por servicio y práctica");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Tomografiasmensualporservicioyseccional":
            $("#titulo").html("Tomografías mensual por servicio y seccional");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Tomografiasmensualporservicioypracticadetallado":
            $("#titulo").html("Tomografías mensual por servicio y práctica detallado");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Rankingdetomografias":
            $("#titulo").html("Ranking de tomografías");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Resonanciasporservicioyseccional":
            $("#titulo").html("Resonancias por servicio y seccional");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
            break;
        case "Resonanciamensualporservicioyseccional":
            $("#titulo").html("Resonancia mensual por servicio y seccional");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "Resonanciamensualporservicioypractica":
            $("#titulo").html("Resonancia mensual por servicio y práctica");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "EstadisticaMensualProcedimiento":
            $("#titulo").html("Estadística Mensual Procedimiento");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "TotalesporMaterial":
            $("#titulo").html("Totales por Material");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
        case "TurnosdePacientesExternos":
            $("#titulo").html("Turnos de Pacientes Externos");
            $("#cboSeccionales").show();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#cboEspecialdades").css('margin-left', '16px');
            $("#lblSeccional").show();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '350');
            $(".contenedor_2").css('height', '200');
            $("#TodosMenoresMayores").hide();
            $("#Detallado").show();
            break;
        case "SobreturnosdePacientesExternos":
            $("#titulo").html("Sobreturnos de Pacientes Externos");
            $("#cboSeccionales").show();
            $("#cboEspecialdades").show();
            $("#lblEspecialidad").show();
            $("#cboEspecialdades").css('margin-left', '16px');
            $("#lblSeccional").show();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '350');
            $(".contenedor_2").css('height', '200');
            $("#TodosMenoresMayores").hide();
            $("#Detallado").show();
            break;
        case "ListadoTotaldeComidas":
            $("#titulo").html("Listado Total de Comidas");

            $("#cboSeccionales").append(new Option("Todos", 1));
            $("#cboSeccionales").append(new Option("Solo Internados", 2));
            $("#cboSeccionales").append(new Option("Solo Acompañantes", 3));
            $("#cboSeccionales").show();
            $("#lblSeccional").css('width', '200px');
            $("#lblSeccional").text("Tipo");
            $("#lblSeccional").show();


            $("#cboEspecialdades").append(new Option("Dieta", 1));
            $("#cboEspecialdades").append(new Option("Cantidad", 2));
            $("#cboEspecialdades").css('margin-left', '72px');
            $("#lblEspecialidad").show();
            $("#lblEspecialidad").text("Orden");

            //$("#cboEspecialdades").css('margin-left', '16px');

            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '290');
            $(".contenedor_2").css('height', '200');
            $("#TodosMenoresMayores").hide();
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeNutricion.aspx"; });
            break;

        case "ListadoTotaldeComidasDiarias":
            $("#titulo").html("Listado  Total de Comidas Diarias");
            $("#cboSeccionales").hide();
            $("#lblSeccional").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '200');
            $(".contenedor_2").css('height', '120');
            $("#TodosMenoresMayores").hide();
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeNutricion.aspx"; });
            break;

        case "ListadoTotaldePedidosdeCatering":
            $("#titulo").html("Listado Total de Pedidos de Catering");
            $("#cboSeccionales").hide();
            $("#lblSeccional").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '200');
            $(".contenedor_2").css('height', '120');
            $("#TodosMenoresMayores").hide();
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeNutricion.aspx"; });
            break;

        case "Stockquirofano":
            $("#titulo").html("Stock quirófano");
            $("#cboSeccionales").hide();
            $("#lblSeccional").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '200');
            $(".contenedor_2").css('height', '120');
            $("#TodosMenoresMayores").hide();
            $("#lblDetallado").html("Egreso");
            $("#Detallado").show();
            $("#btnVolver").show();
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeQuirofano.aspx"; });
            break;

        case "Prestaciones":
            $("#titulo").html("Prestaciones");
            $("#cboSeccionales").hide();
            $("#lblSeccional").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '200');
            $(".contenedor_2").css('height', '120');
            $("#TodosMenoresMayores").hide();
            $("#lblDetallado").html("Egreso");
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeImagenes.aspx"; });
            break;

        case "ReportesdeProduccion":
            $("#titulo").html("Reportes de Producción");
            $("#cboSeccionales").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '230');
            $(".contenedor_2").css('height', '150');
            $("#TodosMenoresMayores").hide();
            $("#lblDetallado").html("Egreso");
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#lblEspecialidad").text("Tipo");
            $("#lblEspecialidad").show();
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeImagenes.aspx"; });
            break;

        case "ServiciosXInternacionAmbulatorios":
            $("#titulo").html("Servicios X Internacion / Ambulatorios");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '230');
            $(".contenedor_2").css('height', '150');
            $("#TodosMenoresMayores").hide();
            $("#lblDetallado").html("Egreso");
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#lblEspecialidad").text("Tipo");
            $("#lblEspecialidad").hide();
            $("#btnListarExcel").hide();
            $("#btnListarPDF").css('margin-left', '37%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeImagenes.aspx"; });
            break;

        case "ListadodeAltoRiesgo":
            $("#titulo").html("Listado de Alto Riesgo");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '230');
            $(".contenedor_2").css('height', '150');
            $("#TodosMenoresMayores").hide();
            $("#lblDetallado").html("Egreso");
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#lblEspecialidad").text("Tipo");
            $("#lblEspecialidad").hide();
            $("#btnListarExcel").show();
            $("#txtDesde").show();
            $("#txtHasta").show();
            $("#fechas").show
            $("#btnListarPDF").css('margin-left', '0%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeTurnos.aspx"; });
            break;

        case "ValorDeterminacionesdeLaboratorio":
            $("#titulo").html("Valor Determinaciones de Laboratorio");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '230');
            $(".contenedor_2").css('height', '150');
            $("#TodosMenoresMayores").hide();
            $("#lblDetallado").html("Egreso");
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#lblEspecialidad").text("Tipo");
            $("#lblEspecialidad").hide();
            $("#btnListarExcel").hide();
            $("#txtDesde").hide();
            $("#txtHasta").hide();
            $("#fechas").hide();
            $("#btnListarPDF").css('margin-left', '37%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeLaboratorio.aspx"; });
            break;

        case "Rayosmensualporservicioyprácticasdetallado":
            $("#titulo").html("Rayos Mensual por Servicio y Prácticas Detallado");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '230');
            $(".contenedor_2").css('height', '150');
            $("#TodosMenoresMayores").hide();
            $("#lblDetallado").html("Egreso");
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#lblEspecialidad").text("Tipo");
            $("#lblEspecialidad").hide();
            //$("#btnListarExcel").hide();
            //$("#txtDesde").hide();
           // $("#txtHasta").hide();
            //$("#fechas").hide();
            $("#btnListarPDF").css('margin-left', '5%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeImagenes.aspx"; });
            break;

        case "Ecografiasmensualporservicioypracticasdetallado":
            $("#titulo").html("Ecografías mensual por servicio y prácticas detallado");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '230');
            $(".contenedor_2").css('height', '150');
            $("#TodosMenoresMayores").hide();
            $("#lblDetallado").html("Egreso");
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#lblEspecialidad").text("Tipo");
            $("#lblEspecialidad").hide();
            //$("#btnListarExcel").hide();
            //$("#txtDesde").hide();
            // $("#txtHasta").hide();
            //$("#fechas").hide();
            $("#btnListarPDF").css('margin-left', '5%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeImagenes.aspx"; });
            break;

        case "MonotributistasAtendidos":
            //    $("#txtMes").focus(function () {
            //        $(".ui-datepicker-calendar").hide();
            //    });


            //    $("#txtMes").datepicker({
            //                closeText: 'Cerrar',
            //                prevText: '<Ant',
            //                nextText: 'Sig>',
            //                currentText: 'Hoy',
            //                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            //                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            //                changeMonth: true,
            //                changeYear: true,
            //                showButtonPanel: true,
            //                dateFormat: 'MM yy',
            //                onClose: function (dateText, inst) {
            //                    $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
            //                }
            //            });

            //$(".meses").show();
            var monthNames = ['Seleccione','Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            var fecha = new Date();
            var ano = fecha.getFullYear();

            //$.each(monthNames, function (index, item) { $("#cboMes").append("<option value='" + index + "' >" + item + "</option>"); });
            //$("#cboAno").append("<option value='0' >Seleccione</option>");
            //for (var i = 2010; i <= ano; i++) { $("#cboAno").append("<option value='" + i + "' >" + i + "</option>"); }

            $("#titulo").html("Monotributistas Atendidos");
            //$(".meses").show();
            $("#fechas").show();
            $("#cboSeccionales").show();
            $("#cboEspecialdades").hide();
            $("#lblSeccional").show();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '230');
            $(".contenedor_2").css('height', '150');
            $("#TodosMenoresMayores").hide();
            $("#lblDetallado").html("Egreso");
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#lblEspecialidad").text("Tipo");
            $("#lblEspecialidad").hide();
            $("#btnListarPDF").css('margin-left', '5%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeTurnos.aspx"; });
            break;

        case "TurnosMonotributistas":
            $("#titulo").html("Turnos Monotributistas");
            $("#lblEspecialidad").text("Especialidad");
            $("#lblEspecialidad").show();
            $("#cboSeccionales").css('margin-left', '71px');
            $("#cboEspecialdades").css('margin-left', '54px');
            $("#cboSeccionales").show();
            $("#cboEspecialdades").show();
            $("#lblSeccional").css('margin-left', '66');
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '260');
            $(".contenedor_2").css('height', '180');
            $("#TodosMenoresMayores").hide();
            $("#lblDetallado").html("Egreso");
            $("#Detallado").hide();
            $("#btnVolver").show();
            $("#btnListarPDF").css('margin-left', '5%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeTurnos.aspx"; });
            break;

        case "BonosMonotributistas":
            $("#titulo").html("Bonos Monotributistas");
            $("#lblEspecialidad").hide();
            $("#cboEspecialdades").hide();
            $("#TodosMenoresMayores").hide();
            $("#Detallado").hide();
            $("#cboSeccionales").show();
            $("#cboSeccionales").css('margin-left', '71px');
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '210');
            $(".contenedor_2").css('height', '130');
            $("#btnVolver").show();
            $("#btnListarPDF").css('margin-left', '5%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeBonos.aspx"; });
            break;

        case "IngresosMonotributistas":
            $("#titulo").html("Ingresos Monotributistas");
            $("#lblEspecialidad").hide();
            $("#cboEspecialdades").hide();
            $("#TodosMenoresMayores").hide();
            $("#Detallado").hide();
            $("#cboSeccionales").show();
            $("#cboSeccionales").css('margin-left', '71px');
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '210');
            $(".contenedor_2").css('height', '130');
            $("#btnVolver").show();
            $("#btnListarPDF").css('margin-left', '5%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeInternacion.aspx"; });
            break;

        case "EgresosMonotributistas":
            $("#titulo").html("Egresos Monotributistas");
            $("#lblEspecialidad").hide();
            $("#cboEspecialdades").hide();
            $("#TodosMenoresMayores").hide();
            $("#Detallado").hide();
            $("#cboSeccionales").show();
            $("#cboSeccionales").css('margin-left', '71px');
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '210');
            $(".contenedor_2").css('height', '130');
            $("#btnVolver").show();
            $("#btnListarPDF").css('margin-left', '5%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeInternacion.aspx"; });
            break;

        case "DefuncionesMonotributistas":
            $("#titulo").html("Defunciones Monotributistas");
            $("#lblEspecialidad").hide();
            $("#cboEspecialdades").hide();
            $("#TodosMenoresMayores").hide();
            $("#Detallado").hide();
            $("#cboSeccionales").show();
            $("#cboSeccionales").css('margin-left', '71px');
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '210');
            $(".contenedor_2").css('height', '130');
            $("#btnVolver").show();
            $("#btnListarPDF").css('margin-left', '5%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeInternacion.aspx"; });
            break;

        case "CirugiasMonotributistas":
            $("#titulo").html("Cirugías Monotributistas");
            $("#lblEspecialidad").hide();
            $("#cboEspecialdades").hide();
            $("#TodosMenoresMayores").hide();
            $("#Detallado").hide();
            $("#cboSeccionales").show();
            $("#cboSeccionales").css('margin-left', '71px');
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '210');
            $(".contenedor_2").css('height', '130');
            $("#btnVolver").show();
            $("#btnListarPDF").css('margin-left', '5%');
            $("#btnVolver").click(function () { document.location = "../Informes/ReportesDeQuirofano.aspx"; });
            break;

        case "EstudiosRealizadosdeAnatomIaPatolOgicaporServicio":
            $("#titulo").html("Estudios Realizados de Anatomía Patológica por Servicio");
            $("#lblEspecialidad").hide();
            $("#cboEspecialdades").hide();
            $("#TodosMenoresMayores").hide();
            $("#lblSeccional").hide();
            $("#Detallado").hide();
            $("#cboSeccionales").hide();
            $("#cboSeccionales").css('margin-left', '71px');
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '210');
            $(".contenedor_2").css('height', '130');
            $("#btnVolver").show();
            $("#btnListarPDF").css('margin-left', '5%');
            $("#btnVolver").click(function () { document.location = "Informes/ReportesDePatologia.aspx"; });
            break;

        case "EstudiosRealizadosDeAnatomiaPatologicaPoMaterial":
            $("#titulo").html("Estudios Realizados de Anatomía Patológica por Material");
            $("#lblEspecialidad").hide();
            $("#cboEspecialdades").hide();
            $("#TodosMenoresMayores").hide();
            $("#lblSeccional").hide();
            $("#Detallado").hide();
            $("#cboSeccionales").hide();
            $("#cboSeccionales").css('margin-left', '71px');
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '210');
            $(".contenedor_2").css('height', '130');
            $("#btnVolver").show();
            $("#btnListarPDF").css('margin-left', '5%');
            $("#btnVolver").click(function () { document.location = "Informes/ReportesDePatologia.aspx"; });
            break;


        case "CantidadDeBonosExcel":
            $("#titulo").html("Cantidad De Bonos Excel");
            $("#lblEspecialidad").show();
            $("#cboEspecialdades").show();
            $("#TodosMenoresMayores").hide();
            $("#lblSeccional").hide();
            $("#Detallado").hide();
            $("#cboSeccionales").hide();
            $("#cboSeccionales").css('margin-left', '71px');
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '210');
            $(".contenedor_2").css('height', '130');
            $("#btnVolver").show();
            $("#btnListarPDF").hide();
            $("#btnVolver").click(function () { document.location = "Informes/ReportesDeBonos.aspx"; });
            break;

        case "Ecorafiasporservicioyseccional":
            $("#titulo").html("Ecografías por servicio y seccional");
            $("#cboSeccionales").hide();
            $("#cboEspecialdades").hide();
            $("#lblEspecialidad").hide();
            $("#lblSeccional").hide();
            $(".contenedor_1").css('margin-top', '190');
            $(".contenedor_1").css('height', '250');
            $(".contenedor_2").css('height', '165');
            $("#TodosMenoresMayores").hide();
            break;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Boton

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $("#btnListarPDF").click(function () { Imprimir("1") });
    $("#btnListarExcel").click(function () { Imprimir("0") });
    function Imprimir(PDF) {
        if (buscar == 0) {
            return false;
        }
        if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") {
            alert("Ingrese un Rango de Fecha");
            return;
        }
        var TodosMenoresMayores = 0;
        if ($("#rdoTodos").is(':checked') == true) { TodosMenoresMayores = 0; }
        if ($("#rdoMenores").is(':checked') == true) { TodosMenoresMayores = 1; }
        if ($("#rdoMayores").is(':checked') == true) { TodosMenoresMayores = 2; }

        var tipo = 0;
        if ($("#rdoTodos").is(':checked') == true) { tipo = 1; }
        if ($("#rdoMenores").is(':checked') == true) { tipo = 2; }
        if ($("#rdoMayores").is(':checked') == true) { tipo = 3; }
        switch (informe) {
            case "turnosReservadosPorUsuarioXdia":
                $.fancybox({
                    'href': "../Impresiones/Listado_Informe_De_Produccion_X_Dia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF,
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "turnosReservadosPorUsuarioXperiodo":
                $.fancybox({
                    'href': "../Impresiones/Listado_Informe_De_Produccion.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF,
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "UsuariosAperturaDeHistoriaClinicaPorDia":
                $.fancybox({
                    'href': "../Impresiones/Listados_Usuarios_Apertura_HC_X_Dia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF,
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "UsuariosAperturaDeHistoriaClinicaPorDiaPorPeriodo":
                $.fancybox({
                    'href': "../Impresiones/Listados_Usuarios_Apertura_HC.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF,
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "listadoDePacientesAtendidos":

                if ($("#CboDetallado").is(':checked')) {

                    $.fancybox({
                        'href': "../Impresiones/Listados_Pacientes_Atendidos_Solo_Totales.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF,
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });

                 } else {
                    $.fancybox({
                        'href': "../Impresiones/Listados_Pacientes_Atendidos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + $('#cboEspecialdades :selected').val() + "&seccional=" + $('#cboSeccionales :selected').val() + "&PDF=" + PDF,
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });
                }
                break;

            case "cantidadDePacientesDeGuardiaPorEspecialidad":
                $.fancybox({
                    'href': "../Impresiones/Listados_Pacientes_Guardia_X_Especilidad.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //Listados_Pacientes_Guardia_X_Especilidad
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "rankingDiagnosticoIcd10AmbulatorioXmedico":
                $.fancybox({
                    'href': "../Impresiones/Listados_Informes_De_Produccion_Ranking_ICD10_Ambulatorio_X_Medico.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + $('#cboEspecialdades :selected').val() + "&TodosMenorMayor=" + TodosMenoresMayores + "&PDF=" + PDF,
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "rankingDiagnosticoIcd10AmbulatorioXespecialidad":
                $.fancybox({
                    'href': "../Impresiones/Listados_Informes_De_Produccion_Ranking_ICD10_Ambulatorio_X_Especialidad.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + $('#cboEspecialdades :selected').val() + "&TodosMenorMayor=" + TodosMenoresMayores + "&PDF=" + PDF, //Listados_Informes_Porcentaje_Ocupacional
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "RankingDiagnosticoICD10AmbulatorioPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/Listados_Informes_De_Produccion_Ranking_ICD10_Ambulatorio_X_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $('#cboSeccionales :selected').val() + "&TodosMenorMayor=" + TodosMenoresMayores + "&PDF=" + PDF, //Listados_Quirofano_Cirugias_Realizadas_Seccional
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePacientesDeGuardia":
                $.fancybox({
                    'href': "../Impresiones/Listados_Cantidad_De_Pacientes_De_Guardia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + "todas" + "&seccional=" + 0 + "&PDF=" + PDF, //Listados_Distribucion_De_Consultas_Medicas_Externas
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDeConsultasDeGuardiaPorMedicos":
                $.fancybox({
                    'href': "../Impresiones/Listados_Cantidad_De_Consultas_De_Guardia_Por_Medicos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + "todas" + "&seccional=" + 0 + "&PDF=" + PDF, //Listados_Ingresos_Por_Dia
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDeConsultasDeGuardiaXSeccionalObraSocial":
                $.fancybox({
                    'href': "../Impresiones/Listados_Cantidad_De_Consultas_De_Guardia_X_Seccional_Obra_Social.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + "todas" + "&seccional=" + $('#cboSeccionales :selected').val() + "&PDF=" + PDF, //Listados_Informes_Porcentaje_Ocupacional_Agrupado
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePacientesPorGuardia":
                $.fancybox({
                    'href': "../Impresiones/Listados_Cantidad_De_Pacietes_Por_Guardia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + "0" + "&seccional=" + $('#cboSeccionales :selected').val() + "&PDF=" + PDF, //Listado_Egresos_Diarios
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "rankingDiagnosticoIcd10AmbulatorioGeneral":
                $.fancybox({
                    'href': "../Impresiones/Listados_Informes_De_Produccion_Ranking_ICD10_Ambulatorio_General.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + 0 + "&TodosMenorMayor=" + TodosMenoresMayores + "&PDF=" + PDF, //Listados_Egresos_Por_Servicios_Mes
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "InformeDeTurnos":

                if ($("#CboDetallado").is(':checked')) {
                    $.fancybox({
                        'href': "../Impresiones/Listado_Informe_de_Turnos_Solo_Totales.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + "todas" + "&seccional=" + $('#cboSeccionales :selected').val() + "&PDF=" + PDF, //
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });
                } else {                
   
                    $.fancybox({
                        'href': "../Impresiones/Listados_Informe_de_Turnos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + 0 + "&seccional=" + $('#cboSeccionales :selected').val() + "&PDF=" + PDF, //
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });
                }
                break;

            case "TurnosPorMedico":
                $.fancybox({
                    'href': "../Impresiones/Listados_Informe_Turnos_Por_Medico.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + $('#cboEspecialdades :selected').html() + "&seccional=" + $('#cboSeccionales :selected').val() + "&PDF=" + PDF, //Listados_Egresos_Por_Seccional_Institucion_X_Mes
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "TurnosporEspecialdad":
                $.fancybox({
                    'href': "../Impresiones/Listados_Turnos_Persona_Telefonico.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=0" + "&PDF=" + PDF, //Listados_Cantidad_De_Pacientes_De_Guardia
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;


            case "InformedeART":

                $.fancybox({
                    'href': "../Impresiones/Guardia_Listado_Pacientes_ART.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $('#cboSeccionales :selected').val() + "&PDF=" +  PDF,
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "ListadoCantidadMensualDePracticasYConsultasConfirmadas":
                $.fancybox({
                    'href': "../Impresiones/Listado_Cantidad_Mensual_De_Practicas_Y_Consultas_Confirmadas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $('#cboSeccionales :selected').val() + "&especialidad=" + 0 + "&PDF=" + PDF, //Listados_Cantidad_De_Consultas_De_Guardia_X_Seccional_Obra_Social
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;


            case "TurnosDisponibles":

                if ($("#CboDetallado").is(':checked')) {

                    $.fancybox({
                        'href': "../Impresiones/Reportes_Turno_Disponibilidad.aspx?Desde=" + $("#txtDesde").val() + "&Hasta=" + $("#txtHasta").val() + "&especialidad=" + $("#cboEspecialdades").val() + "&PDF=" + PDF, //Listados_Cantidad_De_Pacietes_Por_Guardia
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });
                
                 }
                else {
                    $.fancybox({
                        'href': "../Impresiones/Listados_Turnos_Disponibles.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + $("#cboEspecialdades").val() + "&PDF=" + PDF, //Listados_Cantidad_De_Pacietes_Por_Guardia
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });
                }
                break;


            case "DistribucióndeConsultasMédicasExternas":

                if ($("#CboDetallado").is(':checked')) {

                    $.fancybox({
                        'href': "../Impresiones/Listados_Distribución_de_Consultas_Medicas_Externas.aspx?desde=" + $("#txtDesde").val() + "&Hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });

                }
                else {
                    $.fancybox({
                        'href': "../Impresiones/Listados_Distribución_de_Consultas_Medicas_Externas.aspx?desde=" + $("#txtDesde").val() + "&Hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });
                }
                break;

            case "ListadoCantidadMensualDePracticasYConsultasConfirmadasxEspecialidad":

                    $.fancybox({
                        'href': "../Impresiones/Listado_Cantidad_Mensual_De_Practicas_Y_Consultas_Confirmadas_x_Especialidad.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $('#cboSeccionales :selected').val() + "&especialidad=" + $('#cboEspecialdades :selected').val() + "&PDF=" + PDF, //
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });

                    break;

                case "DistribucióndeConsultasExternasporEspecialidad":
//                    alert($("#CboTipo").val());
//                    switch ($("#CboTipo").val()) {
//                        case "0":
                            $.fancybox({
                                'href': "../Impresiones/Listados_Distribución_de_Consultas_Medicas_Externas_X_Especialidad.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + $('#cboEspecialdades :selected').val() + "&PDF=" + PDF, //
                                'width': '100%',
                                'height': '75%',
                                'autoScale': false,
                                'transitionIn': 'elastic',
                                'transitionOut': 'none',
                                'type': 'iframe',
                                'hideOnOverlayClick': false,
                                'enableEscapeButton': false,
                                'preload': true,
                                'onComplete': function f() {
                                    jQuery.fancybox.showActivity();
                                    jQuery('#fancybox-frame').load(function () {
                                        jQuery.fancybox.hideActivity();
                                    });
                                }
                            });

//                            break;
//                        case "1":
//                            $.fancybox({
//                                'href': "../Impresiones/Listados_Distribución_de_Consultas_Medicas_Externas_X_Especialidad_Torta.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + $('#cboEspecialdades :selected').val() + "&PDF=" + PDF, //
//                                'width': '100%',
//                                'height': '75%',
//                                'autoScale': false,
//                                'transitionIn': 'elastic',
//                                'transitionOut': 'none',
//                                'type': 'iframe',
//                                'hideOnOverlayClick': false,
//                                'enableEscapeButton': false,
//                                'preload': true,
//                                'onComplete': function f() {
//                                    jQuery.fancybox.showActivity();
//                                    jQuery('#fancybox-frame').load(function () {
//                                        jQuery.fancybox.hideActivity();
//                                    });
//                                }
//                            });
//                            break;
//                        case "2":
//                            alert("chau");
//                            break;
//                    }
                    break;

                case "TurnosPorEspecialidad":

                    $.fancybox({
                        'href': "../Impresiones/Listado_Turnos_Por_Especialidad.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });

                    break;

                case "DetalleDeHorasDeAtencionPorMedico":

                    $.fancybox({
                        'href': "../Impresiones/Listado_Detalle_De_Hora_De_Atencion_Por_Medico.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });

                    break;

                case "PrácticasPorMédicoDetallado":

                if ($("#CboDetallado").is(':checked')) {
                
                                  $.fancybox({
                        'href': "../Impresiones/INFORMES_PRACTICAS_POR_MEDICO_DETALLADO_POR_SECCIONAL.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $('#cboSeccionales :selected').val() + "&especialidad=" + $('#cboEspecialdades :selected').val() + "&PDF=" + PDF, //
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });
                
                }else{

                    $.fancybox({
                        'href': "../Impresiones/INFORMES_PRACTICAS_POR_MEDICO_DETALLADO.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $('#cboSeccionales :selected').val() + "&especialidad=" + $('#cboEspecialdades :selected').val() + "&PDF=" + PDF, //
                        'width': '100%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'preload': true,
                        'onComplete': function f() {
                            jQuery.fancybox.showActivity();
                            jQuery('#fancybox-frame').load(function () {
                                jQuery.fancybox.hideActivity();
                            });
                        }
                    });
                    }
                break;

            case "EstadisticasDePracticasPorEspecialidad":
                var url = "";
                if ($('#cboEspecialdades :selected').val() == 0) {
                  url = "../Impresiones/INFORMES_ESTADISTICAS_DE_PRESTACIONES.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $('#cboSeccionales :selected').val() + "&especialidad=" + $('#cboEspecialdades :selected').val() + "&PDF=" + PDF;
                }
                else { url = "../Impresiones/EstadisticasDePrestaciones.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $('#cboSeccionales :selected').val() + "&especialidad=" + $('#cboEspecialdades :selected').val() + "&PDF=" + PDF; }
                $.fancybox({
                    'href': url,
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "RankingDiagnósticoICD10Ambulatorio":

                $.fancybox({
                    'href': "../Impresiones/Listados_Informes _ De_Produccion_Ranking_ICD10_Ambulatorio_Posta.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + 0 + "&TodosMenorMayor=" + TodosMenoresMayores + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "InformesConsumoDeGuardia":

                $.fancybox({
                    'href': "../Impresiones/Listados_Informes_Consumo_De_Guardia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $('#cboSeccionales :selected').val() + "&especialidad=" + $('#cboEspecialdades :selected').val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "ConsultasDeGuardiaPorMédicosPacientesInternados":

                $.fancybox({
                    'href': "../Impresiones/Listados_Consultas_De_Guardia_Por_Medicos_Con_Internados.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "InformeDePracticasSegunEspecialidadesDeGuardia":

                $.fancybox({
                    'href': "../Impresiones/Listado_Informe_De_Practicas_Segun_Especialidades_De_Guardia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "ListadoInformeDeMedicamentosDeGuardia":

                $.fancybox({
                    'href': "../Impresiones/Listado_Informe_De_Medicamento_Guardia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "CantidadDePacientesPorLaboratorio":

                $.fancybox({
                    'href': "../Impresiones/Listado_Cantidad_De_Pacientes_Por_Laboratorio.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "ConsultasDePacientesPorLaboratorio":

                $.fancybox({
                    'href': "../Impresiones/Listado_Consultas_De_Pacientes_Por_Laboratorio.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "CantidadDePacientesDeLaboratorioPorMedicos":

                $.fancybox({
                    'href': "../Impresiones/Listado_cantidad_De_Pacientes_De_Laboratorio_Por_Medicos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "CantidadDePracticasDeLaboratorio":

                $.fancybox({
                    'href': "../Impresiones/Listado_Cantidad_De_Practicas_De_Laboratorio.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "RankingDePracticasDeLaboratorio":

                $.fancybox({
                    'href': "../Impresiones/Listado_Ranking_De_Practicas_De_Labortorio.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "CantidadDePacientesDeLaboratorioPorSeccional":

                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/Listado_Cantidad_De_Pacientes_Por_Laboratorio_Por_Seccional(aux).aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "CantidadDePracticasPorLaboratorioPorSeccional":

                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/Listado_Cantidad_De_Practicas_De_Laboratorio_Por_Seccional(aux).aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });

                break;

            case "CantidadDePacientesDeConsultoriosPorSeccional":

                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/Listado_Cantidad_Pacientes_de_Consultorios_Externos_Por_Seccional(aux).aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePacientesDeGuardiaPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/Listado_Guardia_Cantidad_de_Pacientes_Por_Seccional(aux).aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

                            case "CantidadDePacientesDeRayosPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/Listados_Cantidad_De_pacientes_De_Rayos_Por_Seccional(aux).aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "CantidadDeBonosPorEspecialidad":
                $.fancybox({
                    'href': "../Impresiones/ReportesBonos/Listado_Bonos_Cantidad_De_Bonos_Por_Especialidad.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
                
                            case "CantidadDeBonosPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesBonos/Listado_Bonos_Cantidad_De_Bonos_Por_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;            case "ReporteDeBonosEmitidos":
                $.fancybox({
                    'href': "../Impresiones/ReportesBonos/Listado_Bonos_Reporte_De_Bonos_Emitidos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;            case "ReporteDeBonosEmitidosPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesBonos/Listado_Bonos_Reporte_De_Bonos_Emitidos_Por_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "ReporteDeBonosEmitidosPorTerminal":
                //alert(Number($("#CboDetallado").is(':checked')).toString());
                //return false;
                $.fancybox({
                    'href': "../Impresiones/ReportesBonos/Listado_Bonos_Reporte_De_Bonos_Emitidos_Por_Termina.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=0" + "&PDF=" + PDF + "&totales=" + Number($("#CboDetallado").is(':checked')), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
                         case "ReporteDeBonosEmitidosPorTerminalDetallado":
                $.fancybox({
                    'href': "../Impresiones/ReportesBonos/Listado_Bonos_Reporte_De_Bonos_Emitidos_Por_Terminal_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + $("#cboEspecialdades").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "ReporteDeBonosEmitidosPorTerminal(DiferenciadoPorEspecialidad)":
                $.fancybox({
                    'href': "../Impresiones/ReportesBonos/Listado_Bonos_Reporte_De_Bonos_Emitidos_Por_Terminal_Y_Especialidad.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + $("#cboEspecialdades").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "CantidadDeBonosPorSeccional(totales)":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/Listado_Cantidad_De_Bonos_Por_Seccional(aux).aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

                                ////////////////////////////////////////////////
            case "CantidadDeEstudiosPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesDYT/Autorizacion_Informe_Seccional_Especialidad_Paciente.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=1" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDeEstudiosPorPaciente":
                $.fancybox({
                    'href': "../Impresiones/ReportesDYT/Autorizacion_Informe_Seccional_Especialidad_Paciente.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=2" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDeEstudiosPorEspecialidad":
                $.fancybox({
                    'href': "../Impresiones/ReportesDYT/Autorizacion_Informe_Seccional_Especialidad_Paciente.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=3" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "TrasladosPorSeccionalDesdeElPoliclinico":
                $.fancybox({
                    'href': "../Impresiones/ReportesDYT/DYT_Informe_Por_Seccional_Desde_Hacia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=D" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "TrasladosPorSeccionalHaciaElPoliclinico":
                $.fancybox({
                    'href': "../Impresiones/ReportesDYT/DYT_Informe_Por_Seccional_Desde_Hacia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=H" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "PracticasNoAuditadasPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesDYT/Autorizacion_Express_Listado_Practicas_Por_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CirugiasRealizadasPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=1" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CirugiasRealizadasPorEspecialidad":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=2" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;


            case "CirugiasRealizadasPorProfesional":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=3" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CirugiasRealizadasPorSeccionales":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=1" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;


            case "CirugiasRealizadasPorEspecialidades":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=2" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CirugiasRealizadasPorCirujanos":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=3" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDeEstudiosPorSubrubros":
                var opcion;
                if ($("#cboEspecialdades").val() > 0 && $("#CboPrestador").val() == 0) { opcion = 3; }
                else if($("#cboEspecialdades").val() > 0 && $("#CboPrestador").val() == 242) { opcion = 3; }
                else { opcion = 1; }
                $.fancybox({
                    'href': "../Impresiones/ReportesDYT/Autorizacion_Informe_Por_Rubro_Prestador.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + opcion + "&idBusqueda=" + $("#cboEspecialdades").val() + "&prestador=" + $("#CboPrestador").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "DetalleHorariodeCirugias":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_Horario_De_Cirugias.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=1" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "HorariodeCirugiasDetallado":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_Horario_De_Cirugias_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "DetalleDeCirugiasSuspendidas":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_De_Cirugias_Suspendidas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "DetalleDeCirugiasReservadasNoCerradas":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_De_Cirugias_Reservadas_No_Cerradas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "ProtesisyExtrasConsumidosporCirugia":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Protesis_Y_Extras_Consumidos_Por_Cirugia.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "TotalHorariodeCirugiasporEspecialidad":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_Horario_De_Cirugias_x_Especialidad_Medico.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=1" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "TotalHorariodeCirugiasporCirujano":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Reportes_Quirofano_Detalle_Horario_De_Cirugias_x_Especialidad_Medico.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=2" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CirugiasRealizadasPorEspecialidadTotal":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional_Totales.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=1" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CirugiasRealizadasPorProfesionalTotal":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional_Totales.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=2" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CirugiasRealizadasPorAnestesistas":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Cirugias_Por_Seccional_Especialildad_Profesional_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=4" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "RankingDiagnosticoICD10Internacion":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Listado_Ranking_ICD10_Internacion_Posta.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + tipo + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "EgresosDiarios":
                var listado = "";
                if (PDF == 1) { listado = "Listado_Internacion_Egresos_Diarios_Mensuales_Seccional_Servicio_Especialidad.aspx" } else { listado = "Listado_Internacion_Egresos_Diarios_Mensuales_Excel.aspx"; }
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/" + listado + "?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 1 + "&PDF=" + PDF + "&seccionales=0", //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "EgresosMensuales":
                var listado = "";
                if (PDF == 1) { listado = "Listado_Internacion_Egresos_Diarios_Mensuales_Seccional_Servicio_Especialidad.aspx"; } else { listado = "Listado_Internacion_Egresos_Diarios_Mensuales_Excel.aspx"; }
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/" + listado + "?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 2 + "&PDF=" + PDF + "&seccionales=0", //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "EgresosporSeccional":
                var listado = "";
                if (PDF == 1) { listado = "Listado_Internacion_Egresos_Diarios_Mensuales_Seccional_Servicio_Especialidad.aspx"; } else { listado = "Listado_Internacion_Egresos_Por_Seccional_Servicio_Especialidad_Excel.aspx"; }
                idsSeccionales = "";
                $(".Seccionales").each(function (index, item) {
                    if ($(this).is(':checked')) { idsSeccionales = idsSeccionales + $(this).attr('id') + ","; }
                });
                if (idsSeccionales == "") { idsSeccionales = 0; }
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/" + listado + "?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 3 + "&PDF=" + PDF + "&seccionales=" + idsSeccionales, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "EgresosporServicios":
                var listado = "";
                if (PDF == 1) { listado = "Listado_Internacion_Egresos_Diarios_Mensuales_Seccional_Servicio_Especialidad.aspx"; } else { listado = "Listado_Internacion_Egresos_Por_Seccional_Servicio_Especialidad_Excel.aspx"; }
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/" + listado + "?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 4 + "&PDF=" + PDF + "&seccionales=0", //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "EgresosporServiciosMes":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Listado_Internacion_Egresos_Total_Seccional_Servicio.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 1 + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "EgresosporSeccionalesMes":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Listado_Internacion_Egresos_Total_Seccional_Servicio.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 2 + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "IngresosDiarios":
                var listado = "";
                if (PDF == 0) { listado = "Listado_Internacion_Ingresos_Diarios_Mensuales_Excel.aspx"; } else { listado = "Listado_Internacion_Ingresos_Diarios_Mensuales.aspx"; }
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/" + listado + "?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 1 + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "IngresosMensuales":
                var listado = "";
                if (PDF == 0) { listado = "Listado_Internacion_Ingresos_Diarios_Mensuales_Excel.aspx"; } else { listado = "Listado_Internacion_Ingresos_Diarios_Mensuales.aspx"; }
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/" + listado + "?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + 2 + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "DiagnosticoICD10AmbulatorioDetallado":
                $.fancybox({
                    'href': "../Impresiones/Listados_Informes_De_Produccion_ICD10_Ambulatorio_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + TodosMenoresMayores + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "DiagnosticoICD10GuardiaDetallado":
                $.fancybox({
                    'href': "../Impresiones/Listados_Diagnostico_ICD10_Guardia_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "EgresosporEspecialidad":
                var listado = "";
                if (PDF == 1) { listado = "Listado_Internacion_Egresos_Diarios_Mensuales_Seccional_Servicio_Especialidad.aspx"; } else { listado = "Listado_Internacion_Egresos_Por_Seccional_Servicio_Especialidad_Excel.aspx"; }
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/" + listado + "?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=5" + "&PDF=" + PDF + "&seccionales=0", //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
                case "InformedeFallecidos":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Listado_Internacion_Informe_De_Fallecidos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "PorcentajeOcupacional":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Listado_Internacion_Porcentaje_Ocupacional_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "PorcentajeOcupacionalAgrupado":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Listado_Internacion_Porcentaje_Ocupacional_Agrupado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "InternadosenUTIporEspecialidad":
                var listado = "";
                if (PDF == 0) { listado = "Listado_Internacion_Internados_En_UTI_Por_Especialidad_PDF.aspx"; }
                else { listado = "Listado_Internacion_Internados_En_UTI_Por_Especialidad.aspx"; }

                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/" + listado + "?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=1" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "DiasdeInternacionenUTI":
                var listado = "";
                if (PDF == 0) { listado = "Listado_Internacion_Internados_En_UTI_Por_Especialidad_PDF.aspx"; } 
                else { listado = "Listado_Internacion_Internados_En_UTI_Por_Especialidad.aspx"; }

                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/" + listado + "?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=2" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "EstudiosRealizados":
                $.fancybox({
                    'href': "../Impresiones/Patologia/Pato_Listado_Estudios_Realizados.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;


            case "Estadistica(Nomenclador)":
                $.fancybox({
                    'href': "../Impresiones/Patologia/Pato_Listado_Estadistica_Nomenclador.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "PAPRealizados":
                $.fancybox({
                    'href': "../Impresiones/Patologia/PAP_Listado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "Diaspreviosyposterioresalacirugia":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Listado_Internacion_Dias_De_Internacion_Previos_Y_Posteriores.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "Estudiosporservicio":
                var reporte = "";
//                var id = $("#cboEspecialdades").val();
//                alert(id);
                switch ($("#cboEspecialdades").val()) {
                    case "340":
                        //alert($("#cboEspecialdades").val());
                        reporte = "Reporte_IMG_Estudios_Por_Servicio_Resonancia_Tomografia.aspx";
                        break;
                    case "342":
                        //alert($("#cboEspecialdades").val());
                        reporte = "Reporte_IMG_Estudios_Por_Servicio_Resonancia_Tomografia.aspx";
                        break;
                    default:
                        reporte = "Reporte_IMG_Estudios_Por_Servicio.aspx";
                        break;
                }
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/" + reporte + "?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=" + $("#cboEspecialdades").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePracticasPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesDYT/Autorizacion_Informe_Cantidad_Practicas_Seccional_Rubro.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=" + $("#cboEspecialdades").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "RechazosPorFaltanteDeCama":
                $.fancybox({
                    'href': "../Impresiones/ReportesDYT/DYT_Informe_Rechazos_Por_Faltante_de_Cama.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "Mamografiasporservicioyseccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Estudios_Por_Servicio_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=339" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Mamografiasmensualporservicioypracticas":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_mamografias_mensual_servicio_practica.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=339" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Mamografiasmensualporservicioyseccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Mamografias_Mensual_Servicio_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=339" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Mamografiasmensualporservicioypracticasdetallado":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Mamografias_Mensual_Servicio_Practica_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=339" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Rankingdemamografias":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Mamografias_Ranking.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=339" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "Cantidaddepacientesderayos":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Cantidad_Pacientes_Rayos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=341" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Cantidaddepacientesatendidosenrayosporseccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Cantidad_Pacientes_Rayos_por_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=341" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "Tomografiasporservicioseccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Estudios_Resonancia_Por_Servicio_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=342" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Tomografiasmensualporservicioypractica":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Estudios_Por_Servicio_Resonancia_Tomografia_Servicio_Practica.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=342" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Tomografiasmensualporservicioyseccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Tomografia_Mensual_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=342" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Tomografiasmensualporservicioypracticadetallado":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Estudios_Tomografia_Mensual_Servicio_Practica_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=342" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Rankingdetomografias":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Estudios_Tomografias_Ranking.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=342" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Resonanciasporservicioyseccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Estudios_Resonancia_Por_Servicio_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=340" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Resonanciamensualporservicioyseccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Resonancia_Mensual_Servicio_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=340" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "Resonanciamensualporservicioypractica":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Resonancia_Mensual_Servicio_Practica.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=340" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
            case "EstadisticaMensualProcedimiento":
                $.fancybox({
                    'href': "../Impresiones/Patologia/Pato_Listado_Estadistica_Mensual_Procedimiento.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "TotalesporMaterial":
                $.fancybox({
                    'href': "../Impresiones/Patologia/Pato_Listado_Totales_Por_Material.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "TurnosdePacientesExternos":
                var r = 0;
                if ($("#CboDetallado").prop('checked'))
                    r = 1;
                else
                    r = 0;

                $.fancybox({
                    'href': "../Impresiones/Listado_Pacientes_Externos_Sobreturnos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $("#cboSeccionales").val() + "&especialidad=" + $("#cboEspecialdades").val() + "&tipo=0" + "&especialidadMostrar=" + r + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "SobreturnosdePacientesExternos":
                var r = 0;
                if ($("#CboDetallado").prop('checked'))
                    r = 1;
                else
                    r = 0;

                $.fancybox({
                    'href': "../Impresiones/Listado_Pacientes_Externos_Sobreturnos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $("#cboSeccionales").val() + "&especialidad=" + $("#cboEspecialdades").val() + "&tipo=1" + "&especialidadMostrar=" + r + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "ListadoTotaldeComidas":
                $.fancybox({
                    'href': "../Impresiones/Nutricion/Nutricion_Listado_Total_Comidas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + $("#cboSeccionales").val() + "&orden=" + $("#cboEspecialdades").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "ListadoTotaldeComidasDiarias":
                $.fancybox({
                    'href': "../Impresiones/Nutricion/Listado_Nutricion_Total_Comidas_Diarias.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val()  + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "ListadoTotaldePedidosdeCatering":
                $.fancybox({
                    'href': "../Impresiones/Nutricion/Listado_Nutricion_Total_Pedidos_Catering.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "Stockquirofano":
                //alert($("#CboDetallado").is(':checked'));
                //return false;
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Listados_Quirofano_stock_insumos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&egreso=" + $("#CboDetallado").is(':checked') + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "Prestaciones":
                //alert($("#CboDetallado").is(':checked'));
                //return false;
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Estudios_Por_Servicio_Agrupado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "ReportesdeProduccion":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Praticas_Por_Tecnicos_Tipistas_Medicos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF + "&especialidadId=1" + "&tipo=" + $("#cboEspecialdades").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "ServiciosXInternacionAmbulatorios":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Reporte_Loco_Internacion.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "ListadodeAltoRiesgo":
                if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") { alert("Seleccione un rango de fechas"); return false; }
                $.fancybox({
                    'href': "../Impresiones/Listar_Alto_Riesgo.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "ValorDeterminacionesdeLaboratorio":
                $.fancybox({
                    'href': "../Impresiones/Valor_Determinaciones_Laboratorio.aspx", //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "Rayosmensualporservicioyprácticasdetallado":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Mamografias_Mensual_Servicio_Practica_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=341" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "Ecografiasmensualporservicioypracticasdetallado":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/H2_Reporte_IMG_Ecografias_Mensual_Servicio_Practica_Detallado.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=343" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "MonotributistasAtendidos":
                //if ($("#cboMes option:selected").val() == 0) { alert("Seleccione un mes"); return false; }
                //if ($("#cboAno option:selected").val() == 0) { alert("Seleccione un año"); return false; }
                if ($("#txtDesde").val() == "") { alert("Seleccione una fecha desde"); return false; }
                if ($("#txtHasta").val() == "") { alert("Seleccione una fecha hasta"); return false; }

                $.fancybox({
                    'href': "../Impresiones/ReportesBonos/Atenciones_Monotributistas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $("#cboSeccionales option:selected").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "TurnosMonotributistas":
                $.fancybox({
                    'href': "../Impresiones/ReportesBonos/Turnos_monotributistas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $("#cboSeccionales option:selected").val() + "&especialidad=" + $("#cboEspecialdades option:selected").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "BonosMonotributistas":
                $.fancybox({
                    'href': "../Impresiones/ReportesBonos/Bonos_monotributistas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $("#cboSeccionales option:selected").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "IngresosMonotributistas":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Ingresos_monotributistas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $("#cboSeccionales option:selected").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "EgresosMonotributistas":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Egresos_monotributistas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $("#cboSeccionales option:selected").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "DefuncionesMonotributistas":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Fallecidos_monotributistas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $("#cboSeccionales option:selected").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;


            case "CirugiasMonotributistas":
                $.fancybox({
                    'href': "../Impresiones/ReportesQuirofano/Cirugias_monotributistas.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + $("#cboSeccionales option:selected").val() + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "EstudiosRealizadosdeAnatomIaPatolOgicaporServicio":
                $.fancybox({
                    'href': "../Impresiones/Patologia/Pato_Listado_Estudios_Realizados_X_Seccional_X_Servicio.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=1&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "EstudiosRealizadosDeAnatomiaPatologicaPoMaterial":
                $.fancybox({
                    'href': "../Impresiones/Patologia/Pato_Listado_Estudios_Realizados_X_Seccional_X_Servicio.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=2&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDeBonosExcel":
                $.fancybox({
                    'href': "../Impresiones/ReportesBonos/ListadoMairaBonos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidad=" + $("#cboEspecialdades").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "Ecorafiasporservicioyseccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesImagenes/Reporte_IMG_Estudios_Por_Servicio_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&especialidadId=343" + "&PDF=" + PDF, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

        }
    } 
    
//////////////////////////////////////////GRAFICOS///////////////////////////////////////////////////////////////////////////////////////////

    $("#BtnBarras").click(function () {

        switch (informe) {
            case "ReporteDeBonosEmitidosPorTerminal":
                $.fancybox({
                    'href': "../Impresiones/ReportesInternacion/Reporte_Loco_Internacion.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + 0 + "&PDF=" + 1, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDeConsultasDeGuardiaXSeccionalObraSocial":
                $.fancybox({
                    'href': "../Impresiones/Listados_Pacientes_De_Guardia_Por_Seccional.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + 0 + "&PDF=" + 1, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;


            case "CantidadDeBonosPorSeccional(totales)":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/BarraBonos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePacientesDeGuardiaPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/GuardiaBarras.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePacientesDeConsultoriosPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/ConsultorioBarras.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;


            case "CantidadDePacientesDeRayosPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/RayosBarras.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePacientesDeLaboratorioPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/PacientesLaboratorioBarras.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePracticasPorLaboratorioPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/PracticasLaboratorioBarras.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
        }

    });

    /////////////////TORTA
    $("#BtnTorta").click(function () {
        switch (informe) {
            case "CantidadDeConsultasDeGuardiaXSeccionalObraSocial":
                $.fancybox({
                    'href': "../Impresiones/Listados_Pacientes_De_Guardia_Por_Seccional_Torta.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&seccional=" + 0 + "&PDF=" + 1, //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDeBonosPorSeccional(totales)":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/TortaBonos.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePacientesDeGuardiaPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/GuardiaTorta.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePacientesDeConsultoriosPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/ConsultorioTorta.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePacientesDeRayosPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/RayosTorta.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;

            case "CantidadDePacientesDeLaboratorioPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/PacientesLaboratorioTorta.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;


            case "CantidadDePracticasPorLaboratorioPorSeccional":
                $.fancybox({
                    'href': "../Impresiones/ReportesCalo/PracticasLaboratorioTorta.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(), //
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
                    'onComplete': function f() {
                        jQuery.fancybox.showActivity();
                        jQuery('#fancybox-frame').load(function () {
                            jQuery.fancybox.hideActivity();
                        });
                    }
                });
                break;
        }

    });


    //////////////////////////////seleccionar

    function Seleccionar(id) {
        switch (id) {
            case 1000000000:
                $(".Seccionales").attr('checked', false);
                $("#" + id).attr('disabled', true);
                idsSeccionales = "0";
                break;
        }

        switch ($("#" + id).attr('class')) {
            case "Seccionales":
                if (!$(".Seccionales").is(':checked')) {
                    $("#1000000000").attr('checked', true);
                    $("#1000000000").attr('disabled', true);
                    idsSeccionales = "0";
                }
                if ($(".Seccionales").is(':checked')) {
                    $("#1000000000").removeAttr('checked');
                    $("#1000000000").attr('disabled', false);
                }
                break;

        }
    }