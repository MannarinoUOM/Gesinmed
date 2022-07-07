<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReportesDeQuirofanoFiltros.aspx.cs" Inherits="Informes_ReportesDeQuirofanoFiltros" %>

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
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
   <div class="container" style="padding-top:0px; width:90%; margin-left:auto; margin-right:auto">
        <div class="contenedor_1" style="width:97.9%; margin-left:auto; margin-right:auto">
            <div class="contenedor_bono" style="height:510px; width:95%; margin-left:2.5%; margin-right:2.5%">
            <div style="width:98%; height:100%; margin-left:auto; margin-right:auto">
            <table style="width:100%; height:35%; background-color:Gray">
            <thead style="background-color:Black">
            <tr><th style="width:24%"><label style="color:White"><b>Seccional</b></label></th>
            <th  style="width:1%"></th><th style="width:24%"><label style="color:White"><b>Especialidad</b></label></th>
            <th style="width:1%"></th><th style="width:24%"><label style="color:White"><b>Medicos</b></label></th>
            <th style="width:1%"></th><th style="width:24%"><label style="color:White"><b>Cirugias</b></label></th></tr></thead>
            <tr style="width:100%; height:10px">
            <td style="width:24%"><div style=" height:100%; overflow:auto"><table id="Seccionales"></table></div></td>
            <td style="width:1%"></td>
            <td style="width:24%"><div style=" height:100%; overflow:auto"><table id="Especialidad"></table></div></td>
            <td style="width:1%"></td>
            <td style="width:24%"><div style=" height:100%; overflow:auto"><table id="Medicos"></table></div></td>
            <td style="width:1%"></td>
            <td style="width:24%"><div style=" height:100%; overflow:auto"><table id="Cirugias"></table></div></td>
            </tr>
             </table>

             <table style="width:25%; height:65%; float:left">
             <thead style="background-color:Black"><tr><th style="width:1%"></th><th style="width:25%; text-align:left"><label style="color:White"><b>Detallados</b></label></th></tr></thead>
             <tr><td style="width:1%"></td><td><input name="listado" id="CirugiasRealizadas" type="radio" style="margin:0px" checked="checked" class="listado"/> <label for="CirugiasRealizadas" style=" display:inline">Cirugias Realizadas</label></td></tr>

             <tr>
             <td style="width:1%"></td>
             <td>
             <table style=" background-color:Gray; width:100%; border-top-left-radius:10px; border-top-right-radius:10px; border-bottom-left-radius:10px; border-bottom-right-radius:10px">
             <thead><tr><th></th><th></th></tr></thead>
             <tr><td style="width:50%"><input name="ordenado" id="porSeccional" type="radio" style="margin:0px" checked="checked" class="orden"/> <label for="porSeccional" style="display:inline">Seccional</label></td><td><input name="ordenado" type="radio" id="porEspecialidad" style="margin:0px" class="orden"/> <label for="porEspecialidad" style="display:inline">Especialidad</label></td></tr>
             <tr><td style="width:50%"><input name="ordenado" id="porAnestesista" type="radio" style="margin:0px" class="orden"/> <label for="porAnestesista" style="display:inline">Anestesista</label></td><td><input name="ordenado" type="radio" id="porCirujano" style="margin:0px" class="orden"/> <label for="porCirujano" style="display:inline">Cirujano</label></td></tr>
             </table>
             </td>
             </tr>

             <tr><td style="width:1%"></td><td><input  name="listado" id="CirugiasporEspecialidad(Horas)" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasporEspecialidad(Horas)" style=" display:inline">Detalle Horario de Cirugias</label></td></tr>
             <tr><td style="width:1%"></td><td><input  name="listado" id="CirugiasporProfesional(Horas)" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasporProfesional(Horas)" style=" display:inline">Horario de Cirugias Detallado</label></td></tr>
             <tr><td style="width:1%"></td><td><input  name="listado" id="CirugiasSuspendidas" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasSuspendidas" style=" display:inline">Detalle de Cirugias Suspendidas</label></td></tr>
             <tr><td style="width:1%"></td><td><input  name="listado" id="ProgramadePrevSSS" type="radio" style="margin:0px" class="listado"/> <label for="ProgramadePrevSSS" style=" display:inline">Programa de Prev SSS</label></td></tr>
             <tr><td style="width:1%"></td><td><input  name="listado" id="Exrtasutilizadosporaciente" type="radio" style="margin:0px" class="listado"/> <label for="Exrtasutilizadosporaciente" style=" display:inline">Protesis y Extras Consumidos Por Cirugia</label></td></tr>
             <tr><td style="width:1%"></td><td><input  name="listado" id="CirugiasreservadasnoCerradas" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasreservadasnoCerradas" style=" display:inline">Detalle de Cirugias Reservadas No Cerradas</label></td></tr>
             </table>

             <table style="width:20%; height:30%; float:right">
             <thead style="background-color:Black"><tr><th style="width:20%; text-align:left"><label style="color:White"><b>Ranking</b></label></th></tr></thead>
             <tr style="height:33px"><td style="text-align:left"><input name="listado" id="RankingCirugias" type="radio" style="margin:0px" class="listado"/> <label for="RankingCirugias" style=" display:inline">Ranking Cirugias</label></td></tr>
             <tr style="height:33px"><td style="text-align:left"><input name="listado" id="RankingInsumos" type="radio" style="margin:0px" class="listado"/> <label for="RankingInsumos" style=" display:inline">Ranking Insumos</label></td></tr>
             <tr style="height:33px"><td style="text-align:left"><input name="listado" id="RankingdeProtesisyExtras" type="radio" style="margin:0px" class="listado"/> <label for="RankingdeProtesisyExtras" style=" display:inline">Ranking de Protesis y Extras</label></td></tr>
             <tr><td><label style="display:inline">Desde</label><label style="display:inline;margin-left:25%" ">Hasta</label></td></tr>
             <tr><td><input id="txtDesde" type="text" class=" input-mini fechas" style="width:74px"/><input id="txtHasta" style=" margin-left:4%;width:74px"" type="text" class="input-mini fechas"/></td></tr>
             </table>

             <table style="width:55%; height:60%">
             <thead style="background-color:black"><tr><th style="width:1%"></th><th style="text-align:right" colspan="2"><label style="color:White"><b>Agrupados</b></label></th><th></th></tr></thead>

             <tr>
             <td style="width">
             </td><td style="width:50%"><input name="listado" id="CirugiasporSeccional" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasporSeccional" style=" display:inline">Cirugias Realizadas por Seccional</label></td>
             <td style="width:1%"></td><td><input name="listado" id="CirugiasporMedico(Mensual)" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasporMedico(Mensual)" style=" display:inline">Cirugias por Medico (Mensual)</label></td></tr>
             <tr><td style="width:1%"></td><td style="width:50%"><input name="listado" id="CirugiasporEspecialidad" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasporEspecialidad" style=" display:inline">Cirugias Realizadas por Especialidad</label></td><td style="width:1%"></td><td><input name="listado" id="CirugiasporEspecialida(Mensual)" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasporEspecialida(Mensual)" style=" display:inline">Cirugias por Especialidad (Mensual)</label></td></tr>
             <tr><td style="width:1%"></td><td style="width:50%"><input name="listado" id="CirugiasporEspecialidad(Horas)2" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasporEspecialidad(Horas)2" style=" display:inline">Total Horario de Cirugías por Especialidad</label></td><td style="width:1%"></td><td><input name="listado" id="RankingInsumos(Mensual)" type="radio" style="margin:0px" class="listado"/> <label for="RankingInsumos(Mensual)" style=" display:inline">Ranking Insumos (Mensual)</label></td></tr>
             <tr><td style="width:1%"></td><td style="width:50%"><input name="listado" id="CirugiasporProfesional" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasporProfesional" style=" display:inline">Cirugias Realizadas por Profesional</label></td><td style="width:1%"></td><td><input name="listado" id="CirugiasSuspendidas2" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasSuspendidas2" style=" display:inline">Cirugias Suspendidas</label></td></tr>
             <tr><td style="width:1%"></td><td style="width:50%"><input name="listado" id="CirugiasporProfesional(Horas)2" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasporProfesional(Horas)2" style=" display:inline">Total Horario de Cirugías por Cirujano</label></td><td style="width:1%"></td><td><input name="listado" id="CirugiasporTipodeAnestesia" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasporTipodeAnestesia" style=" display:inline">Cirugias por Tipo de Anestesia</label></td></tr>
             <tr><td style="width:1%"></td>

             <td style="width:50%"><input name="listado" id="CirugiasAmbulatorio-Interacion" type="radio" style="margin:0px;display:none" class="listado"/> <label for="CirugiasAmbulatorio-Interacion" style=" display:none">Cirugias Ambulatorio-Interacion</label></td>
             <td style="width:1%"></td>
             <td><input name="listado" id="CirugiasporTipodePractica" type="radio" style="margin:0px" class="listado"/> <label for="CirugiasporTipodePractica" style=" display:inline">Cirugias por Tipo de Practica</label></td></tr>
             <tr>
             
             <td style="width:1%"></td>
             <td style="width:50%"><input name="listado" id="CirugiasAmb-IntporSeccional" type="radio" style="margin:0px;display:none" class="listado"/> <label for="CirugiasAmb-IntporSeccional" style=" display:none">Cirugias Amb-Int por Seccional</label></td><td style="width:1%"></td>
             <td><input name="listado" id="CirugiasSeccional-EspecialidadporMes" type="radio" style="margin:0px;display:none" class="listado"/> <label for="CirugiasSeccional-EspecialidadporMes" style=" display:none">Cirugias Seccional-Especialidad por Mes</label></td></tr>
             <tr><td style="width:1%"></td>
             
             <td style="width:50%"><input name="listado" id="CirugiasAmb-IntporEspecialidad" type="radio" style="margin:0px;display:none" class="listado"/> <label for="CirugiasAmb-IntporEspecialidad" style=" display:none">Cirugias Amb-Int por Especialidad</label></td><td style="width:1%"></td><td></td></tr>
             </table>

            <%-- <div class="pull-right">--%>
            
             <a id="btnBuscar" class="btn btn-info pull-right"><i class="icon-print"></i> Buscar</a>
             <a id="btnExcel" class="btn btn-info pull-right" style="margin-right:2px; margin-left:2px"><i class=" icon-briefcase"></i> Excel</a>
             <a id="btnVolver" class="btn btn-info pull-right" href="ReportesDeQuirofano.aspx?tipodeInforme=9"><i class=" icon-arrow-left"></i> Volver</a>
            <%-- </div>--%>
            </div>
            <%--</div>--%>
            </div>
            </div>
    </form>
</body>
</html>
<script src="../js/Hospitales/Informes/AdministrarReportesQuirofano.js" type="text/javascript"></script>
