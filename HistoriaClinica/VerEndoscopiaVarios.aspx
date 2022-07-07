<%@ Page Language="C#" AutoEventWireup="true" CodeFile="VerEndoscopiaVarios.aspx.cs" Inherits="HistoriaClinica_VerEndoscopiaVarios" %>

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
  <div class="contenedor_1">
    <div class="clearfix"></div>
      <div class="resumen_datos" style="height:80px;">
        
              <div class="datos_persona">
                <div ><img id = "fotopaciente" class="avatar2" src="../img/silueta.jpg" onerror="imgErrorPaciente(this);"/></div>
                <div class="datos_resumen_paciente">
                  <input type="hidden" id="afiliadoId" value="" />
                  <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                  <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                  <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
                </div>
              </div>
      </div>
      <div class="contenedor_3" style="height:320px;"> <div class="titulo_seccion" id="titulo_bono">
      <span id="titulo">Antecedentes de Endoscopía</span></div>
      <span style="margin-left:25px; margin-bottom:10px; font-weight:bold;" id="titulo1"></span>
        <div class="">

         <div class="row" style="margin-left:5px;">
          <div id="controlcbo_Tipo" class="span10">
          <input type="button" id="btn_BRONCO" value="Broncoscopía" class="btn btn-primary"/>
          <input type="button" id="btn_VCC" value="VCC" class="btn btn-primary"/>
          <input type="button" id="btn_Veda" value="VEDA" class="btn btn-primary"/>
          <input type="button" id="btn_Extra" value="Extras" class="btn btn-primary"/>
          <input type="button" id="btn_VRSC" value="VRSC" class="btn btn-primary"/>
          <input type="button" id="btn_CPER" value="CPER" class="btn btn-primary"/>
          <input type="button" id="btn_Insumos" value="Insumos" class="btn btn-primary"/>
          <input type="button" id="btn_Anestesia" value="PARTE ANESTESIA" class="btn btn-primary" style="display:none"/>

            </div>
        </div>        

        </div>
        </div>
    </div>
</div>

<!--Pie de p�gina-->
<script type="text/javascript" src="../js/jquery-1.8.3.js"></script> 
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/Hospitales/HistoriaClinica/VerEndoscopiaVarios.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</body>
</html>

