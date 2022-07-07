<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReportesDeBonos.aspx.cs" Inherits="Informes_ReportesDeBonos" %>

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
        <h3 id="titulo_prev"></h3>        
        <div id="opciones" style="margin-left:15px; height:467px; overflow:scroll">
            <a href="Filtrar_Listados.aspx?informe=CantidadDeBonosPorEspecialidad&tipodeInforme=7" ><div class=" icon-th-list"></div> Cantidad De Bonos Por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=CantidadDeBonosPorSeccional&tipodeInforme=7" ><div class=" icon-th-list"></div> Cantidad De Bonos Por Seccional_</a><br />
            <a href="Filtrar_Listados.aspx?informe=ReporteDeBonosEmitidos&tipodeInforme=7" ><div class=" icon-th-list"></div> Reporte De Bonos Emitidos_</a><br />
            <a href="Filtrar_Listados.aspx?informe=ReporteDeBonosEmitidosPorSeccional&tipodeInforme=7" ><div class=" icon-th-list"></div> Reporte De Bonos Emitidos Por Seccional_</a><br />
            <a href="Filtrar_Listados.aspx?informe=ReporteDeBonosEmitidosPorTerminal&tipodeInforme=7" ><div class=" icon-th-list"></div> Reporte De Bonos Emitidos Por Terminal_</a><br />
            <a href="Filtrar_Listados.aspx?informe=ReporteDeBonosEmitidosPorTerminalDetallado&tipodeInforme=7" ><div class=" icon-th-list"></div> Reporte De Bonos Emitidos Por Terminal Detallado_</a><br />
            <a href="Filtrar_Listados.aspx?informe=ReporteDeBonosEmitidosPorTerminal(DiferenciadoPorEspecialidad)&tipodeInforme=7" ><div class=" icon-th-list"></div> Reporte De Bonos Emitidos Por Terminal(Diferenciado Por Especialidad)_</a><br />
            <a href="Filtrar_Listados.aspx?informe=BonosMonotributistas&tipodeInforme=7" ><div class=" icon-th-list"></div> Bonos Monotributistas_</a><br />
            <a href="Filtrar_Listados.aspx?informe=CantidadDeBonosPorSeccional(totales)&tipodeInforme=7" ><div class=" icon-th-list"></div> Cantidad De Bonos Por Seccional(totales)_ <img src="../img/barras.jpg" style=" height:20px; width:20px"/></a><br />
            <a href="Filtrar_Listados.aspx?informe=CantidadDeBonosExcel&tipodeInforme=7" ><div class=" icon-th-list"></div> Cantidad De Bonos Excel_ <img src="../img/barras.jpg" style=" height:20px; width:20px"/></a><br />
            <a href="Filtrar_Listados.aspx?informe=CuentaCorrienteAfiliados&tipodeInforme=14" ><div class=" icon-th-list"></div> Cuenta Corriente Afiliados_ </a>
        </div>

<div>
<div class="clearfix"></div>
</div>
      <div class="pie_gris"> 
      </div>
    </div>

  </div>

    </form>
</body>
</html>
<script src="../js/bootstrap.js" type="text/javascript"></script>
<script src="../js/Hospitales/Informes/administrarListados.js" type="text/javascript"></script>
