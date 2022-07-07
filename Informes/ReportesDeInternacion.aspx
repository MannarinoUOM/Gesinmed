<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReportesDeInternacion.aspx.cs" Inherits="Informes_ReportesDeInternacion" %>

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

            <a href="Filtrar_Listados.aspx?informe=RankingDiagnosticoICD10Internacion&tipodeInforme=10"><div class="icon-th-list"></div> Ranking Diagnóstico ICD10 Internación_</a><br />
            <a href="Filtrar_Listados.aspx?informe=EgresosDiarios&tipodeInforme=10"><div class="icon-th-list"></div> Egresos Diarios_</a><br />
            <a href="Filtrar_Listados.aspx?informe=EgresosMensuales&tipodeInforme=10"><div class="icon-th-list"></div> Egresos Mensuales_</a><br />
            <a href="Filtrar_Listados.aspx?informe=EgresosporSeccional&tipodeInforme=10"><div class="icon-th-list"></div> Egresos por Seccional_</a><br />
            <a href="Filtrar_Listados.aspx?informe=EgresosporServicios&tipodeInforme=10"><div class="icon-th-list"></div> Egresos por Servicios_</a><br />
            <a href="Filtrar_Listados.aspx?informe=EgresosporEspecialidad&tipodeInforme=10"><div class="icon-th-list"></div> Egresos por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=EgresosporServiciosMes&tipodeInforme=10"><div class="icon-th-list"></div> Egresos por Servicios Mes_</a><br />
            <a href="Filtrar_Listados.aspx?informe=EgresosporSeccionalesMes&tipodeInforme=10"><div class="icon-th-list"></div> Egresos por Seccionales Mes_</a><br />
            <a href="Filtrar_Listados.aspx?informe=IngresosDiarios&tipodeInforme=10"><div class="icon-th-list"></div> Ingresos Diarios_</a><br />
            <a href="Filtrar_Listados.aspx?informe=IngresosMensuales&tipodeInforme=10"><div class="icon-th-list"></div> Ingresos Mensuales_</a><br />
            <a href="Filtrar_Listados.aspx?informe=InformedeFallecidos&tipodeInforme=10"><div class="icon-th-list"></div> Informe de Fallecidos_</a><br />
            <a href="Filtrar_Listados.aspx?informe=PorcentajeOcupacional&tipodeInforme=10"><div class="icon-th-list"></div> Porcentaje Ocupacional_</a><br />
            <a href="Filtrar_Listados.aspx?informe=PorcentajeOcupacionalAgrupado&tipodeInforme=10"><div class="icon-th-list"></div> Porcentaje Ocupacional Agrupado_</a><br />
            <a href="Filtrar_Listados.aspx?informe=Diaspreviosyposterioresalacirugia&tipodeInforme=10"><div class="icon-th-list"></div> Días previos y posteriores a la cirugía_</a><br />
            <a href="Filtrar_Listados.aspx?informe=InternadosenUTIporEspecialidad&tipodeInforme=10"><div class="icon-th-list"></div> Internados en U.T.I por Especialidad_</a><br />
            <a href="Filtrar_Listados.aspx?informe=DiasdeInternacionenUTI&tipodeInforme=10"><div class="icon-th-list"></div> Dias de Internacion en U.T.I_</a><br />
            <a href="Filtrar_Listados.aspx?informe=ServiciosXInternacionAmbulatorios&tipodeInforme=10"><div class="icon-th-list"></div> Servicios X Internacion / Ambulatorios_</a><br />
            <a href="Filtrar_Listados.aspx?informe=IngresosMonotributistas&tipodeInforme=10"><div class="icon-th-list"></div> Ingresos Monotributistas_</a><br />
            <a href="Filtrar_Listados.aspx?informe=EgresosMonotributistas&tipodeInforme=10"><div class="icon-th-list"></div> Egresos Monotributistas_</a><br />
            <a href="Filtrar_Listados.aspx?informe=DefuncionesMonotributistas&tipodeInforme=10"><div class="icon-th-list"></div> Defunciones Monotributistas_</a><br />
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
