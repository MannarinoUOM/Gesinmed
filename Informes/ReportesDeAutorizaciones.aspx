<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReportesDeAutorizaciones.aspx.cs" Inherits="Informes_ReportesDeAutorizaciones" %>

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

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="40DAE507" />
</div>
    
    <div class="container">
  <div class="contenedor_1">

    <div class="contenedor_a" style="position:relative; colmargin-left:15px;height:530px; margin-left:14px">
        <h3 id="titulo_prev"></h3>        
        <div id="opciones" style="margin-left:15px; height:467px; overflow:scroll">
            <a href="Filtrar_Listados.aspx?informe=CantidadDeEstudiosPorSeccional&tipodeInforme=8" ><div class=" icon-th-list"></div> Cantidad De Estudios Por Seccional_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=CantidadDeEstudiosPorPaciente&tipodeInforme=8" ><div class=" icon-th-list"></div> Cantidad De Estudios Por Paciente_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=CantidadDeEstudiosPorEspecialidad&tipodeInforme=8" ><div class=" icon-th-list"></div> Cantidad De Estudios Por Especialidad_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=CantidadDeEstudiosPorSubrubros&tipodeInforme=8" ><div class=" icon-th-list"></div> Cantidad De Estudios Por Subrubros_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=TrasladosPorSeccionalDesdeElPoliclinico&tipodeInforme=8" ><div class=" icon-th-list"></div> Traslados Por Seccional Desde El Policlinico_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=TrasladosPorSeccionalHaciaElPoliclinico&tipodeInforme=8" ><div class=" icon-th-list"></div> Traslados Por Seccional Hacia El Policlinico_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=PracticasNoAuditadasPorSeccional&tipodeInforme=8" ><div class=" icon-th-list"></div> Prácticas No Auditadas Por Seccional_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=CantidadDePracticasPorSeccional&tipodeInforme=8" ><div class=" icon-th-list"></div> Cantidad De Prácticas Por Seccional_ </a><br/>
             <a href="Filtrar_Listados.aspx?informe=RechazosPorFaltanteDeCama&tipodeInforme=8" ><div class=" icon-th-list"></div> Rechazos Por Faltante De Cama_ </a><br/>
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