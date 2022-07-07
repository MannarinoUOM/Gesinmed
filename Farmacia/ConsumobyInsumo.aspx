<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ConsumobyInsumo.aspx.cs" Inherits="Farmacia_ConsumobyInsumo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Consumo por Rubro</strong>";
</script> 
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>
<form id="form1" class="form-horizontal">
<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="height:440px;">
    <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Consumo por Rubro</span></div>
      <form class="form-horizontal" >
          <div id="ControlFechas" class="control-group">
                               <label class="control-label" id="Label1" style="margin-right:10px;margin-left:0px;">Desde</label>
                                <input id="txtFechaInicio" type="text">
                            </div>
         <div id="Div1" class="control-group">
              <label class="control-label" id="Label2" style="margin-right:10px;margin-left:0px;">Hasta</label>
              <input id="txtFechaFin" type="text">
         </div>
       <div id="controlcbo_Rubros" class="control-group" style="display:inline;">
                    <label class="control-label" for="cbo_Rubros" style="margin-right:10px;margin-left:0px;">Rubro</label>
                    <select id="cbo_Rubros">
                    </select>
        </div>
         <div id="controlcbo_Servicio" class="control-group" style="margin-top:20px;">
                    <label class="control-label" for="cbo_Servicio" style="margin-right:10px;margin-left:0px;">Servicio</label>
                    <select id="cbo_Servicio">
                    </select>
        </div>
      </form>
      <div class="control-group pagination-centered">
          <div> 
                <a id="btnPdf" class="btn btn-info imprimir" style="margin-top:10px;"><i class="icon-print"></i>&nbsp;PDF</a> 
                <a id="btnExcel" class="btn btn-info imprimir" style="margin-top:10px;"><i class="icon-print"></i>&nbsp;Excel</a> 
          </div>
       </div>

    </div>
    <div class="clearfix"></div>

  </div>
</div>
</form>
<!--Pie de pagina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.validate.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/Farmacia/ConsumobyInsumo.js" type="text/javascript"></script>
</body>
</html>
