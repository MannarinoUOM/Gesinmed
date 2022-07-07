<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FiltrarListadosEndoscopia.aspx.cs" Inherits="Informes_ReportesDeEndoscopia" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" /><link rel="stylesheet" type="text/css" href="../css/barra.css" /><link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
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
    
    
    <div class="contenedor_1" style="width:770px; height:362px; margin-top:150px; margin-left:auto; margin-right:auto">
    <div id="contenedorFiltros" class="contenedor_2" style="margin-left:30px; height:262px;width:710px">
    <div class="titulo_seccion" style="text-align:center; margin-left:0px">
    <span style=" text-align:center" id="titulo">Nombre Listado</span>
    </div>

    <div>
       <label style="display:inline; margin:50px">Fecha</label><label style="margin-left:50px; display:inline">Desde
       <input id="txtDesde" class="fechas" type="text" style="width:100px; text-align:center"/></label>

       <label style="margin-left:50px; display:inline">Hasta
       <input id="txtHasta"  class="fechas" type="text" style="width:100px; margin-left:2px ; text-align:center"/></label>
  </div>

  <div id="agrupadoPor">
  <label style="display:inline; margin:50px">Agrupado por<select class="deshabilitar" id="cboAgrupado" style="margin-left:100px">
  <option value="1">SECCIONAL</option>
  <option value="2">ESPECIALIDAD</option>
  <option value="3">CIRUJANO</option>
  <option value="4">ANESTESISTA</option>
  </select></label>
  </div>

  <div id="filtroEspecialidad">
  <div style=" width:60%; height:100%; margin:auto; text-align:center"  class=" contenedor_migue">
  <table>
  <tr><td style="width:50%;text-align:right"><input type="checkbox" id="0"  checked="checked" disabled="disabled"/></td><td style="text-align:left"><label style="display:inline" for="0">Todas</label></td></tr>
  <tr><td style="width:50%;text-align:right"><input type="checkbox" id="176" class="seleccion"/></td><td style="text-align:left"><label style="display:inline" for="176">Gastroenterologia</label></td></tr>
  <tr><td style="width:50%;text-align:right"><input type="checkbox" id="274" class="seleccion"/></td><td style="text-align:left"><label style="display:inline" for="274">Gastroenterologia Infantil</label></td></tr>
  <tr><td style="width:50%;text-align:right"><input type="checkbox" id="193" class="seleccion"/></td><td style="text-align:left"><label style="display:inline" for="193">Neumonologia</label></td></tr>
  <tr style="display:none"><td style="width:50%;text-align:right"><input type="checkbox" id="194" class="seleccion"/></td><td style="text-align:left"><label style="display:inline" for="194">Neumonologia Infantil</label></td></tr>
  <tr style="display:none"><td style="width:50%;text-align:right"><input type="checkbox" id="3205" class="seleccion"/></td><td style="text-align:left"><label style="display:inline" for="3205">Polisomnografia</label></td></tr>
  </table>
  </div>
  </div>

  <div id="Detallado" style="display:none">
            <div class="control-group" style="margin-left:50px">
            <label  id="lblDetallado" style="display:inline" for="CboDetallado">Detallado</label>
             <input id="CboDetallado" type="checkbox" ; style="margin-left:0px"/>
            
             </div>
</div>

   <div class="control-group" style="margin-top:5px">
                    <div class="controls">
                        <a id="btnListarExcel" class="btn" style="margin-left:200px"><i class="icon-file"></i>&nbsp;Buscar (Excel)</a>
                        <a id="btnListarPDF" class="btn"><i class="icon-print"></i>&nbsp;Buscar (PDF)</a>
                        <a id="btnVolver" class="btn btn-info" style="display:inline"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                    </div>
                </div>
 
    </div>
    </div>

    </form>
</body>
</html>
<script src="../js/Hospitales/Informes/AdministarReportesEndoscopia.js" type="text/javascript"></script>
