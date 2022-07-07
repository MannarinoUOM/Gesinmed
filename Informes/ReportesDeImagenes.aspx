<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReportesDeImagenes.aspx.cs" Inherits="Informes_ReportesDeImagenes" %>

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

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="40DAE507" />
</div>
    
    <div class="container">
  <div class="contenedor_1">

    <div class="contenedor_a" style="position:relative; colmargin-left:15px;height:530px; margin-left:14px">
        <h3 id="titulo_prev"></h3>        
        <div id="opciones" style="margin-left:15px; height:467px; overflow:scroll">
            <a href="Filtrar_Listados.aspx?informe=Estudiosporservicio&tipodeInforme=12" ><div class=" icon-th-list"></div> Estudios por servicio_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Mamografiasporservicioyseccional&tipodeInforme=12" ><div class=" icon-th-list"></div> Mamografías por servicio y seccional_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Mamografiasmensualporservicioypracticas&tipodeInforme=12" ><div class=" icon-th-list"></div> Mamografías mensual por servicio y prácticas_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Mamografiasmensualporservicioyseccional&tipodeInforme=12" ><div class=" icon-th-list"></div> Mamografías mensual por servicio y seccional_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Mamografiasmensualporservicioypracticasdetallado&tipodeInforme=12" ><div class=" icon-th-list"></div> Mamografías mensual por servicio y prácticas detallado_</a><br/>
            <a href="Filtrar_Listados.aspx?informe=Ecografiasmensualporservicioypracticasdetallado&tipodeInforme=12" ><div class=" icon-th-list"></div> Ecografías mensual por servicio y prácticas detallado_</a><br/>
            <a href="Filtrar_Listados.aspx?informe=Rankingdemamografias&tipodeInforme=12" ><div class=" icon-th-list"></div> Ranking de mamografías_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Cantidaddepacientesderayos&tipodeInforme=12" ><div class=" icon-th-list"></div> Cantidad de pacientes de rayos_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Rayosmensualporservicioyprácticasdetallado&tipodeInforme=12" ><div class=" icon-th-list"></div>  Rayos mensual por servicio y prácticas detallado__ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Tomografiasporservicioseccional&tipodeInforme=12" ><div class=" icon-th-list"></div> Tomografías por servicio seccional_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Tomografiasmensualporservicioypractica&tipodeInforme=12" ><div class=" icon-th-list"></div> Tomografías mensual por servicio y práctica_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Tomografiasmensualporservicioyseccional&tipodeInforme=12" ><div class=" icon-th-list"></div> Tomografías mensual por servicio y seccional_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Tomografiasmensualporservicioypracticadetallado&tipodeInforme=12" ><div class=" icon-th-list"></div> Tomografías mensual por servicio y práctica detallado_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Rankingdetomografias&tipodeInforme=12" ><div class=" icon-th-list"></div> Ranking de tomografías_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Resonanciasporservicioyseccional&tipodeInforme=12" ><div class=" icon-th-list"></div> Resonancias por servicio y seccional_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Resonanciamensualporservicioyseccional&tipodeInforme=12" ><div class=" icon-th-list"></div> Resonancia mensual por servicio y seccional_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Resonanciamensualporservicioypractica&tipodeInforme=12" ><div class=" icon-th-list"></div> Resonancia mensual por servicio y práctica_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Prestaciones&tipodeInforme=12" ><div class=" icon-th-list"></div> Prestaciones_ </a><br/>
            <a href="Filtrar_Listados.aspx?informe=Ecorafiasporservicioyseccional&tipodeInforme=12" ><div class=" icon-th-list"></div> Ecografías por servicio y seccional_ </a><br/>
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