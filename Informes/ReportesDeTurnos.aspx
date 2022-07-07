<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReportesDeTurnos.aspx.cs" Inherits="Informes_ReportesDeTurnos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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
        <h3 id="titulo_prev"></h3>        
        <div id="opciones" style="margin-left:15px; height:467px; overflow:scroll">

            <a href="Filtrar_Listados.aspx?informe=listadoDePacientesAtendidos&tipodeInforme=3"><div class=" icon-th-list"></div> Listado De Pacientes Atendidos_</a><br />
            <a href="Filtrar_Listados.aspx?informe=ListadoCantidadMensualDePracticasYConsultasConfirmadas&tipodeInforme=3"><div class=" icon-th-list"></div> Cantidad Mensual de Practicas y Consultas Confirmadas Por Seccional_</a><br />
             <a href="Filtrar_Listados.aspx?informe=ListadoCantidadMensualDePracticasYConsultasConfirmadasxEspecialidad&tipodeInforme=3"><div class=" icon-th-list"></div> Cantidad Mensual de Practicas y Consultas Confirmadas Por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=InformeDeTurnos&tipodeInforme=3"><div class=" icon-th-list"></div> Informe De Turnos_</a><br />
            <a href="Turnos_Reportes.aspx?id=1&tipodeInforme=3"><div class="icon-th-list"></div> (Turnos) Horarios Médicos_</a><br />
            <a href="Filtrar_Listados.aspx?informe=TurnosDisponibles&tipodeInforme=3"><div class="icon-th-list"></div> (Turnos) Turnos Disponibles_</a><br />
            <a href="Turnos_Reportes.aspx?id=3&tipodeInforme=3"><div class="icon-th-list"></div> (Turnos) Ocupación de Consultorios_</a><br />
            <a href="Cantidad_Prac_Med.aspx?tipodeInforme=3"><div class="icon-th-list"></div> (Turnos) Cantidad de Prácticas por Médicos_</a><br />
            <a href="Filtrar_Listados.aspx?informe=PrácticasPorMédicoDetallado&tipodeInforme=3"><div class=" icon-th-list"></div> (Turnos) Prácticas Por Médico Detallado_</a><br />
            <a href="Filtrar_Listados.aspx?informe=TurnosPorMedico&tipodeInforme=3"><div class="icon-th-list"></div> (Turnos) Turnos por Médico_</a><br />
            <a href="Filtrar_Listados.aspx?informe=TurnosporEspecialdad&tipodeInforme=3"><div class="icon-th-list"></div> (Turnos) Turnos por Especialidad(atención en persona y teléfonica)_</a><br />
            <a href="Filtrar_Listados.aspx?informe=DistribucióndeConsultasMédicasExternas&tipodeInforme=3"><div class="icon-th-list"></div> Distribución de Consultas Médicas Externas_</a><br />
            <a href="Filtrar_Listados.aspx?informe=DistribucióndeConsultasExternasporEspecialidad&tipodeInforme=3"><div class="icon-th-list"></div> Distribución de Consultas Externas por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=TurnosPorEspecialidad&tipodeInforme=3"><div class=" icon-th-list"></div> Turnos Por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=DetalleDeHorasDeAtencionPorMedico&tipodeInforme=3"><div class=" icon-th-list"></div> Detalle De Horas De Atención Por Médico_</a><br />
            <a href="Filtrar_Listados.aspx?informe=EstadisticasDePracticasPorEspecialidad&tipodeInforme=3"><div class=" icon-th-list"></div> Estadísticas De Prácticas Por Especialidad_</a><br />
                        <a href="Filtrar_Listados.aspx?informe=rankingDiagnosticoIcd10AmbulatorioXmedico&tipodeInforme=3"><div class=" icon-th-list"></div> Diagnóstico ICD10 Ambulatorio Por Médico_</a><br />
            <a href="Filtrar_Listados.aspx?informe=rankingDiagnosticoIcd10AmbulatorioXespecialidad&tipodeInforme=3"><div class=" icon-th-list"></div> Diagnóstico ICD10 Ambulatorio Por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=rankingDiagnosticoIcd10AmbulatorioGeneral&tipodeInforme=3"><div class=" icon-th-list"></div> Diagnóstico ICD10 Ambulatorio General_</a><br />
            <a href="Filtrar_Listados.aspx?informe=RankingDiagnosticoICD10AmbulatorioPorSeccional&tipodeInforme=3"><div class=" icon-th-list"></div> Diagnóstico ICD10 Ambulatorio Por Seccional_</a><br />
            <a href="Filtrar_Listados.aspx?informe=DiagnosticoICD10AmbulatorioDetallado&tipodeInforme=3"><div class=" icon-th-list"></div> Diagnóstico ICD10 Ambulatorio Detallado_</a><br />
            <a href="Filtrar_Listados.aspx?informe=RankingDiagnósticoICD10Ambulatorio&tipodeInforme=3"><div class=" icon-th-list"></div> Ranking Diagnóstico ICD10 Ambulatorio_</a><br />
                         <a href="Filtrar_Listados.aspx?informe=TurnosdePacientesExternos&tipodeInforme=3"><div class=" icon-th-list"></div> Turnos de Pacientes Externos_ </a><br />
             <a href="Filtrar_Listados.aspx?informe=SobreturnosdePacientesExternos&tipodeInforme=3"><div class=" icon-th-list"></div> Sobreturnos de Pacientes Externos_ </a><br />
             <a href="Filtrar_Listados.aspx?informe=ListadodeAltoRiesgo&tipodeInforme=3"><div class=" icon-th-list"></div> Listado de Alto Riesgo_ </a><br />
             <a href="Filtrar_Listados.aspx?informe=MonotributistasAtendidos&tipodeInforme=3"><div class=" icon-th-list"></div> Monotributistas Atendidos_ </a><br />
             <a href="Filtrar_Listados.aspx?informe=TurnosMonotributistas&tipodeInforme=3"><div class=" icon-th-list"></div>Turnos Monotributistas_ </a><br />
             <a href="Filtrar_Listados.aspx?informe=CantidadDePacientesDeConsultoriosPorSeccional&tipodeInforme=3"><div class=" icon-th-list"></div> Cantidad De Pacientes De Consultorios Por Seccional_ <img src="../img/barras.jpg" style="width:20px;height:20px"/></a><br />
             <a href="Filtrar_Listados.aspx?informe=CantidadDePacientesDeRayosPorSeccional&tipodeInforme=3"><div class=" icon-th-list"></div> Cantidad De Pacientes De Rayos Por Seccional_ <img src="../img/barras.jpg" style="width:20px;height:20px"/></a><br />
             
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
