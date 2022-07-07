<%@ Page Language="C#" AutoEventWireup="true" CodeFile="VerInternacionVarios.aspx.cs" Inherits="HistoriaClinica_VerInternacionVarios" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
</head>

<style>
.radio_boton{display:inline-block; cursor:pointer;margin-right:5px;}
</style>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container">
  <div class="contenedor_1" style="width:1030px; margin-top:50px">
    <div class="clearfix"></div>
      <div class="resumen_datos" style="height:80px;">
        
              <div class="datos_persona">
                <div><img id = "fotopaciente" class="avatar2" src="../img/silueta.jpg" onerror="imgErrorPaciente(this);"/></div>
                <div class="datos_resumen_paciente">
                  <input type="hidden" id="afiliadoId" value="" />
                  <input type="hidden" id="esLegales" value="" runat="server" />
                  <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                  <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                  <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
                </div>
              </div>
      </div>
      <div class="contenedor_3" style="height:340px; width:1000px"> <div class="titulo_seccion" id="titulo_bono">
      <span id="titulo">Antecedentes de Internación</span></div>
      <span style="margin-left:25px; margin-bottom:10px; font-weight:bold;" id="titulo1"></span>
        <div class="">

         <div class="row" style="margin-left:5px;">
          <div id="controlcbo_Tipo" class="span12" style="width:100%">
           <%-- <span>Práctica Especialsta <input id="chkEspecialista" class="opciones" name="opc"  type="radio" style="margin-top:0px; margin-right:20px;"/></span>--%>
            <span>Indicaciones Médicas <input id="chkIM" class="opciones" name="opc"  type="radio" style="margin-top:0px; margin-right:20px;"/></span>
            <span>Evoluciones <input id="chkEvo" name="opc" class="opciones" type="radio" style="margin-top:0px; margin-right:20px;"/></span>
            <span id="epi">Epicrisis <input id="chkEpi" name="opc" class="opciones" type="radio" style="margin-top:0px; margin-right:20px;"/></span>
            <span id="alta">Alta Médica <input id="chkAlta" name="opc" class="opciones" type="radio" style="margin-top:0px; margin-right:20px;"/></span>           
            <span id="hojaQuirurgico"><label for="chkHojaQuirurgica" class="radio_boton">Hoja Quirúrgica </label><input id="chkHojaQuirurgica" name="opc" class="opciones" type="radio" style="margin-top:0px; margin-right:20px;"/></span>
            <span id="consentimiento"><label for="chkDocumentacion" class="radio_boton">Documentación </label><input id="chkDocumentacion" name="opc" class="opciones" type="radio" style="margin-top:0px; margin-right:20px;"/></span>
            <span id="IQB"><label for="chkIQB" class="radio_boton">Epicrisis IQB</label><input id="chkIQB" name="opc" class="opciones" type="radio" style="margin-top:0px; margin-right:10px;"/></span>
            <span id="Span1"><a id="btnVerDocs" class="btn btn-info" style="margin-left:0px">Ver Docs</a></span>
            </div>
        </div>


       <div style="padding:0px 15px 15px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaResultados" class="tabla" style="height:220px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                </thead>

              </table>
            </div>
                    <a id="btnEvoPrint" class="btn btn-info pull-right" style="display:none; margin-top:3px;"><i class="icon-print"></i>&nbsp;Imprimir</a>
        </div>
        <div class="clearfix"></div>

        </div>
        </div>
    </div>
</div>

<!--Pie de p�gina-->
<script type="text/javascript" src="../js/jquery-1.8.3.js"></script> 
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/Hospitales/HistoriaClinica/VerInternacionVarios.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</body>
</html>

