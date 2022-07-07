<%@ Page Language="C#" AutoEventWireup="true" CodeFile="vacunacion.aspx.cs" Inherits="Vacunacion_vacunacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
<link rel="stylesheet" type="text/css" href="../css/barra.css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="../js/bootstrap.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>

<style type="text/css">
    .animacion {
       /*position: absolute;*/

  animation-name: parpadeo;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name:parpadeo;
  -webkit-animation-duration: 2s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes parpadeo{  
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

@-webkit-keyframes parpadeo {  
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
   100% { opacity: 1.0; }
}

@keyframes parpadeo {  
  0% { opacity: 1.0; }
   50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

#formulario {  
  width: 100px;
  height: 100px;
  background: pink;
}
</style>

<body>
    <form id="form1" runat="server">
    <div class="resumen_datos">
        
        <div class="datos_persona">
        <div><img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);"></img></div>
        <div class="datos_resumen_paciente" style="font-size:12px; width:90%">
          <input type="hidden" id="afiliadoId" value="" />
          <div>Paciente:  <strong><span id="SPaciente"></span>&nbsp;&nbsp;(<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos" style="display:none">Ver más</a></div>
          <div>DNI: <strong><span id="CargadoDNI"></span></strong>&nbsp;&nbsp;NHC: <strong><span id="CargadoNHC"></span></strong>
          &nbsp;&nbsp;Seccional: <strong><span id="CargadoSeccional"></span></strong>

          <div id="Dinternacion" style="display:inline">
          <span>Servicio: <strong><span id="SServicio"></span></strong></span>&nbsp;&nbsp;
          <span>Sala: <strong><span id="SSala"></span></strong></span>&nbsp;&nbsp;<span>Cama: <strong><span id="SCama"></span></strong></span><br />
          </div>
          
          &nbsp;&nbsp;<span>Grupo Sanguíneo:&nbsp;&nbsp;<select id="GrupoSanguineo" class="input-mini"></select>&nbsp;&nbsp;<img src="../img/check.gif"  width="30px" height="30px" style="display:none; margin-bottom:7px" class="animacion" id="ok"/>
          <img src="../img/Symbol-Error.png"  width="25px" height="25px" style="display:none; margin-bottom:7px" class="animacion" id="error"/>
          </span>
          </div>
        </div>
        
      </div>
        
      </div>	
    




    <div class="contenedor_3" style=" text-align:center; margin-left:4%; height:290px; padding-bottom:15px">
    <select id="tipoVacunas" ></select>
    <select id="vacunas" ></select>
    <input id="txtFecha" type="text" class="input-medium fecha" style="text-align:center" placeholder="Fecha"/>
    <a id="btnGuardar" class="btn btn-info" style="margin-bottom:10px">Guardar Vacuna</a>
    <div style="height:240px; overflow:auto">
    <div>
    <div id="dosis"></div>
    </div>
    </div>
    </div>
    </form>
</body>
</html>
<script src="../js/bootstrap.js" type="text/javascript"></script>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="../js/bootstrap-alert.js" type="text/javascript"></script>    
<script src="../js/Hospitales/vacunacion/vacunacion.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery-ui.js" type="text/javascript"></script>
<script src="../js/jquery-ui_combo.js" type="text/javascript"></script>


<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>


