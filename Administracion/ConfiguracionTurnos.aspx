<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ConfiguracionTurnos.aspx.cs" Inherits="Administracion_ConfiguracionTurnos" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="width:600px; height:400px;"> <div class="titulo_seccion" style="margin-left:100px;">
      &nbsp;&nbsp;<span>Edición de Horarios para Turnos</span></div>
      <form class="form-horizontal" style=" margin:60px;">
        <div class="control-group" style="display:none;">
          <label class="control-label">Minutos Mínimos por Turno</label>
          <div class="controls">
            <input id="txtTurnosmin"type="text" maxlength="3" value="5" class="span4"/>
          </div>
        </div>
        <div class="control-group" style="display:none;">
          <label class="control-label" >Minutos Máximos por Turno</label>
          <div class="controls">
            <input id="txtTurnosmax" type="text" maxlength="3" value="15" class="span4"/>
          </div>
        </div>
        <div class="control-group" style="display:none;">
          <label class="control-label" for="txtagendaabierta">Agenda Abierta</label>
          <div class="controls">
            <input id ="txtagendaabierta" type="hidden" value="2">
        </div>
        </div>


        <div class="control-group">
          <label class="control-label" for="txtHoraPersonal">Horario de Atención al Público</label>
          <div class="controls">
            <input id ="txtHoraPersonal" placeholder="Ej. 12 a 15 hs" maxlength="60" type="text" class="span4">
        </div>
        </div>

        <div class="control-group">
          <label class="control-label" for="txtPaciente">Horario de Atención Telefónica</label>
          <div class="controls">
            <input id ="txtHoraTelefonico" placeholder="Ej. 07 a 22hs." maxlength="60" type="text" class="span4">
        </div>
        </div>

        <div class="control-group">
          <label class="control-label" for="txtPaciente">Teléfono</label>
          <div class="controls">
            <input id ="txtTelefono" maxlength="60" type="text" class="span4">
        </div>
        </div>
        
     
        
              <div class="control-group">
          <div class="controls pagination-centered"> 
                <a id="btnActualizar" class="btn"><i class="icon-ok icon-black"></i>&nbsp;Modificar</a>
          </div>
        </div>

      </form>



    </div>
    <div class="clearfix"></div>
    
  </div>
</div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 


<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/Administracion/ConfigurarTurnos.js" type="text/javascript"></script>

<!--Barra sup--> 

</body>
</html>