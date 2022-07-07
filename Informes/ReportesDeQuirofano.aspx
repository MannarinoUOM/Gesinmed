<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReportesDeQuirofano.aspx.cs" Inherits="Informes_ReportesDeQuirofano" %>

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
  <div class="contenedor_1" style="height:500px">

    <div class="contenedor_a" style="position:relative; colmargin-left:15px;height:450px; margin-left:14px">
        <h3 id="titulo_prev"></h3>        
        <div id="opciones" style="margin-left:15px; height:370px; overflow:auto">
            <a href="../Informes/ReportesDeQuirofanoFiltros.aspx?tipodeInforme=9"><div class="icon-th-list"></div> Listados quirófano_</a><br />
            <a href="Filtrar_Listados.aspx?informe=CirugiasMonotributistas&tipodeInforme=9"><div class="icon-th-list"></div> Cirugías Monotributistas_</a><br />
            <a href="Filtrar_Listados.aspx?informe=Stockquirofano&tipodeInforme=9"><div class="icon-th-list"></div> Stock quirófano_</a><br />
            <a href="Excel_Quirofano_Stock.aspx?LISTADO=1"><div class="icon-th-list"></div> Excel Stock Insumos Quirófano</a><br />
            <a href="Excel_Quirofano_Stock.aspx?MOV=1"><div class="icon-th-list"></div> Excel Stock Insumos Quirófano Detallado</a>
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
