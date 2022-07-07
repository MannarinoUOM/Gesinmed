<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SeleccionarListado.aspx.cs" Inherits="Informes_SeleccionarListado" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />    

    
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<link href="../css/deshabilitar.css" rel="stylesheet" type="text/css" />


</head>
<body>
    <form id="form1" runat="server">
   <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKMTA1NDkzNTkwMmRk8EsXmONF6ZL+MqP9zSONqN93865Oh6VwA4VYVbIzXIo=" />
</div>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="40DAE507" />
</div>
    
    <div class="container">
  <div class="contenedor_1">

    <div class="contenedor_a" style="position:relative; colmargin-left:15px;height:530px; margin-left:14px">
        <h3 id="titulo">Informes Administrativos</h3>        
        <div id="opciones" style="margin-left:15px; height:467px; overflow:scroll">
   <%--         <a href="Filtrar_Listados.aspx?informe=CantidadDePacientesPorGuardia" class="guardia"><div class=" icon-th-list"></div> Pacientes Por Guardia_</a><br />
            <a href="Filtrar_Listados.aspx?informe=CantidadDePacientesDeGuardia" class="guardia"><div class=" icon-th-list"></div> Cantidad de Pacientes de Guardia_</a><br />
            <a href="Filtrar_Listados.aspx?informe=cantidadDePacientesDeGuardiaPorEspecialidad" class="guardia"><div class=" icon-th-list"></div> Cantidad De Pacientes De Guardia Por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=CantidadDeConsultasDeGuardiaPorMedicos" class="guardia"><div class=" icon-th-list"></div> Cantidad De Consultas De Guardia Por Médicos_</a><br />
            <a href="Filtrar_Listados.aspx?informe=CantidadDeConsultasDeGuardiaXSeccionalObraSocial" class="guardia"><div class=" icon-th-list"></div> Cantidad De Consultas De Guardia Por Seccional y Obra Social_</a><br />
            <a href="Filtrar_Listados.aspx?informe=InformesConsumoDeGuardia" class="guardia"><div class=" icon-th-list"></div> Informes Consumo De Guardia_</a><br />
            <a href="Filtrar_Listados.aspx?informe=InformeDePracticasSegunEspecialidadesDeGuardia" class="guardia"><div class=" icon-th-list"></div> Informe De Practicas Segun Especialidades De Guardia_</a><br />
            <a href="Filtrar_Listados.aspx?informe=ListadoInformeDeMedicamentosDeGuardia" class="guardia"><div class=" icon-th-list"></div> Listado Informe De Medicamentos De Guardia_</a><br />
            <a href="Filtrar_Listados.aspx?informe=ConsultasDeGuardiaPorMédicosPacientesInternados" class="guardia"><div class=" icon-th-list"></div> Consultas De Guardia Por Médicos Pacientes Internados_</a><br />

            <a href="Filtrar_Listados.aspx?informe=UsuariosAperturaDeHistoriaClinicaPorDia"><div class=" icon-th-list"></div> Usuarios Apertura De Historia Clínica Por Día_</a><br />
            <a href="Filtrar_Listados.aspx?informe=UsuariosAperturaDeHistoriaClinicaPorDiaPorPeriodo"><div class=" icon-th-list"></div> Usuarios Apertura De Historia Clínica Por Período_</a><br />
            <a href="Filtrar_Listados.aspx?informe=listadoDePacientesAtendidos"><div class=" icon-th-list"></div> Listado De Pacientes Atendidos_</a><br />
            <a href="Filtrar_Listados.aspx?informe=rankingDiagnosticoIcd10AmbulatorioXmedico"><div class=" icon-th-list"></div> Diagnóstico ICD10 Ambulatorio Por Médico_</a><br />
            <a href="Filtrar_Listados.aspx?informe=rankingDiagnosticoIcd10AmbulatorioXespecialidad"><div class=" icon-th-list"></div> Diagnóstico ICD10 Ambulatorio Por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=rankingDiagnosticoIcd10AmbulatorioGeneral"><div class=" icon-th-list"></div> Diagnóstico ICD10 Ambulatorio General_</a><br />
            <a href="Filtrar_Listados.aspx?informe=RankingDiagnosticoICD10AmbulatorioPorSeccional"><div class=" icon-th-list"></div> Diagnóstico ICD10 Ambulatorio Por Seccional_</a><br />
            <a href="Filtrar_Listados.aspx?informe=RankingDiagnósticoICD10Ambulatorio"><div class=" icon-th-list"></div> Ranking Diagnóstico ICD10 Ambulatorio_</a><br />
            <a href="Filtrar_Listados.aspx?informe=ListadoCantidadMensualDePracticasYConsultasConfirmadas"><div class=" icon-th-list"></div> Cantidad Mensual de Practicas y Consultas Confirmadas Por Seccional_</a><br />
             <a href="Filtrar_Listados.aspx?informe=ListadoCantidadMensualDePracticasYConsultasConfirmadasxEspecialidad"><div class=" icon-th-list"></div> Cantidad Mensual de Practicas y Consultas Confirmadas Por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=turnosReservadosPorUsuarioXdia"><div class=" icon-th-list"></div> Turnos Reservados Por Usuario Por Día_</a><br />
            <a href="Filtrar_Listados.aspx?informe=turnosReservadosPorUsuarioXperiodo"><div class=" icon-th-list"></div> Turnos Reservados Por Usuario Por Período_</a><br />
            <a href="Filtrar_Listados.aspx?informe=InformeDeTurnos"><div class=" icon-th-list"></div> Informe De Turnos_</a><br />
            <a href="Turnos_Reportes.aspx?id=1"><div class="icon-th-list"></div> (Turnos) Horarios Médicos_</a><br />
            <a href="Filtrar_Listados.aspx?informe=TurnosDisponibles"><div class="icon-th-list"></div> (Turnos) Turnos Disponibles_</a><br />
            <a href="Turnos_Reportes.aspx?id=3"><div class="icon-th-list"></div> (Turnos) Ocupación de Consultorios_</a><br />
            <a href="Cantidad_Prac_Med.aspx"><div class="icon-th-list"></div> (Turnos) Cantidad de Prácticas por Médicos_</a><br />
            <a href="Filtrar_Listados.aspx?informe=PrácticasPorMédicoDetallado"><div class=" icon-th-list"></div> (Turnos) Prácticas Por Médico Detallado_</a><br />
            <a href="Filtrar_Listados.aspx?informe=TurnosPorMedico"><div class="icon-th-list"></div> (Turnos) Turnos por Médico_</a><br />
            <a href="Filtrar_Listados.aspx?informe=TurnosporEspecialdad"><div class="icon-th-list"></div> (Turnos) Turnos por Especialidad(atención en persona y teléfonica)_</a><br />
            <a href="Filtrar_Listados.aspx?informe=DistribucióndeConsultasMédicasExternas"><div class="icon-th-list"></div> Distribución de Consultas Médicas Externas_</a><br />
            <a href="Filtrar_Listados.aspx?informe=DistribucióndeConsultasExternasporEspecialidad"><div class="icon-th-list"></div> Distribución de Consultas Externas por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=TurnosPorEspecialidad"><div class=" icon-th-list"></div> Turnos Por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=DetalleDeHorasDeAtencionPorMedico"><div class=" icon-th-list"></div> Detalle De Horas De Atención Por Médico_</a><br />
            <a href="Filtrar_Listados.aspx?informe=EstadisticasDePracticasPorEspecialidad"><div class=" icon-th-list"></div> Estadísticas De Prácticas Por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=CantidadDePacientesPorLaboratorio"><div class=" icon-th-list"></div> Cantidad De Pacientes Por Laboratorio_</a><br />
            <a href="Filtrar_Listados.aspx?informe=CantidadDePacientesDeLaboratorioPorMedicos"><div class=" icon-th-list"></div> Cantidad De Pacientes De Laboratorio Por Medicos_</a><br />
            <a href="Filtrar_Listados.aspx?informe=ConsultasDePacientesPorLaboratorio"><div class=" icon-th-list"></div> Consultas De Pacientes Por Laboratorio_</a><br />
            <a href="Filtrar_Listados.aspx?informe=CantidadDePracticasDeLaboratorio"><div class=" icon-th-list"></div> Cantidad De Practicas De Laboratorio_</a><br />
            <a href="Filtrar_Listados.aspx?informe=RankingDePracticasDeLaboratorio"><div class=" icon-th-list"></div> Ranking De Practicas De Laboratorio_</a><br />
            <a href="Filtrar_Listados.aspx?informe=InformedeART"><div class="icon-th-list"></div> Informe de ART_</a><br />--%>
        </div>

<div>
<div class="clearfix"></div>
</div>
      <div class="pie_gris"> 
      </div>
    </div>

  </div>
</div>

    </form>
</body>
</html>
<script src="../js/bootstrap.js" type="text/javascript"></script>
<script src="../js/Hospitales/Informes/administrarListados.js" type="text/javascript"></script>

