<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cantidad_Prac_Med.aspx.cs" Inherits="Informes_Cantidad_Prac_Med" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
    
</script> 
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"></div>
<form id="form1" class="form-horizontal">
<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="height:500px; width:90%; margin-left:5%;"> <div class="titulo_seccion">
      <span id="titulo">Cantidad de Prácticas por Médicos</span></div>
      <form class="form-horizontal">
        <div class="control-group">
            <label class="control-label" for="cbo_Especialidad">Especialidad</label>
                  <div class="controls">
                      <select id="cbo_Especialidad" class="span5">
                      </select>          
                  </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="cbo_Medico">Médico</label>
                  <div class="controls">
                      <select id="cbo_Medico" class="span5">
                      </select>          
                  </div>
        </div>
                <div class="control-group">
                    <label class="control-label" for="txtFechaInicio">
                        Desde</label>
                    <div class="controls">
                        <input id="txtFechaInicio" type="text" class="date input-small">
                        <span for="txtFechaFin">Hasta</span>
                        <input id="txtFechaFin" type="text" class="date input-small">
                    </div>
                </div>
                  <div id="Detallado" style="float:right; margin-right:445px">
            <div class="control-group" style="margin-left:50px">
            <label  id="lblDetallado" style="display:inline" for="CboDetallado">Totales</label>
             <input id="CboDetallado" type="checkbox" ; style="margin-left:0px"/>
            
             </div>
            </div>
                <div class="control-group" style="width: 80%; margin-left:95px; display:block;">
                    <label>Seccional</label>
                    <div class="check_todos">
                            <label class="checkbox">
                                <input id="cb_Seccional" type="checkbox" value="0" CHECKED />Marcar todos
                            </label>
                            <label class="checkbox">
                                <input id="cb_ninguna_sec" type="checkbox" value="0"/>Desmarcar todos
                            </label>
                     </div>
                         <div class="filtro_datos" style="width:98%; height:180px;">                                                        
                             <div id="FiltroPracticas" style="float: left;">
                             </div>
                             <div id="FiltroPracticas2" style="float: right;">
                             </div>
                         </div>                                                        
                     </div>
      </form>
      <div class="control-group pagination-centered">
          <div class="controls" style="margin:auto"> 
         <%--       <a id="btnImprimir" class="btn btn-info"><i class="icon-print"></i>&nbsp;Imprimir</a> --%>
                              <a id="btnListarExcel" class="btn" style="margin-left:0px"><i class="icon-file"></i>&nbsp;Buscar (Excel)</a>
                        <a id="btnListarPDF" class="btn"><i class="icon-print"></i>&nbsp;Buscar (PDF)</a>
                        <a id="btnVolver" class="btn btn-info"  href="../Informes/ReportesDeTurnos.aspx?tipo=3"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
          </div>
       </div>
    </div>
    <div class="clearfix"></div>
</div>
</form>
<!--Pie de pagina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/Hospitales/Informes/Cantidad_Prac_Med.js" type="text/javascript"></script>
<!--Barra sup--> 
</body>
</html>
