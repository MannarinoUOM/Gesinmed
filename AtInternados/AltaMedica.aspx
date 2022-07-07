<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AltaMedica.aspx.cs" Inherits="AtInternados_AltaMedica" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

         <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

</head>
<body>
    <form id="form1" runat="server">
    <div class="contenedor_1" style="width:942px; margin-left:auto ; margin-right:auto; margin-top:50px">
    <div class="contenedor_3" style="height:500px">
         <div class="datos_principales_contenedor">
        <div id="datos_webcam" class="datos_principales" style="margin-top:0px; margin-bottom:0px">
          <div class="datos_principales_form" style="margin-left:0px">


               <div class="datos_persona">
        <div ><img id="fotopaciente" class=" avatar2" ></img> </div>
        <div class="datos_resumen_paciente">

          <div style="width:340px; height:80px; float:left">
          <span class="row">Paciente: <strong><span style="width:200px" id="CargadoApellido"></span></strong></span>
          <span class="row">Localidad: <strong><span style="width:200px" id="CargadoLocalidad"></span></strong></span>
           <span class="row">Patología: <strong><span style="width:200px" id="cargadoPatologia"></span></strong></span>
           <span >Servicio: <strong><span style="width:200px" id="CargadoServicio"></span></strong></span>
          </div>

  <div style="width:150px; height:80px; float:right">
    <span class="row">DNI: <strong><span style="width:200px" id="CargadoDNI"></span></strong></span>
    <span class="row">Teléfono: <strong><span style="width:200px" id="CargadoTelefono"></span></strong></span>
    <span class="row">Edad: <strong><span style="width:200px" id="CargadoEdad"></span></strong></span>
    <span >Cama: <strong><span style="width:200px" id="CargadoCama"></span></strong></span>
    </div>

   <div  style="width:285px; height:80px; float:right">
   <span class="row">NHC: <strong><span style="width:200px"  id="CargadoNHC"></span></strong></span>
   <span class="row">Seccional: <strong><span style="width:200px" id="CargadoSeccional"></span></strong></span>
   <span class="row">Fecha de Atención: <strong><span style="width:200px" id="CargadoFecha"></span></strong></span>
   <span >Sala: <strong><span style="width:200px" id="CargadoSala"></span></strong></span>
   </div>
        </div>       

        <div class="clearfix"></div>
            
          </div>

        </div>
      </div>
      </div>
      <%--CONTROLES--%>
      <div class="contenedor_3" style="width:889px ; height:293px">
      
        <div class="span2" style="width:850px; height:30px">
        <label style="display:inline">Motivo de Egreso: <select id="cboMotivoEgreso" style="width:300px"></select></label>
        <label style="display:inline;margin-left:35px">Medico: <select id="cbo_Medico" style="width:300px"></select></label>
        </div>

        <div class="span3" style="width:850px; margin-top:10px">
        <label style="display:inline; margin-left:55px">Operado: <select id="cboOperado" style="width:50px; padding-right:0px">
        <option value="0">No</option>
        <option value="1">Si</option>
        </select></label>
        <label style="display:inline; margin-left:92px">Fecha: <input id="txtFecha" class="input-small" type="text" style="text-align:center"/></label>
        <label style="display:inline; margin-left:35px">Días Preoperatorio: <input id="txtDiasPeoperatorio" class="input-mini" type="text" maxlength="2" style="text-align:center"/></label>
        <label style="display:inline; margin-left:35px">Autopsia: <select id="cboAutopsia" style="width:50px; padding-right:0px">
        <option value="0">No</option>
        <option value="1">Si</option>
        </select></label>
        </div>

        <div class="span1" style="width:850px">
        <label style="display:inline">Cirugía Realizada: <input id="txtCirugia" type="text" style="width:670px"/></label>
        </div>
       <%--  /////////////////////////////////////////////////////////////////////--%>

        <label class="label-info" style=" margin-top:119px; color:White"><strong style="margin-left:14px">DIAGNÓSTICO DE EGRESO</strong></label>
        <div class="contenedor_3" style="width:863px; height:162px; padding-bottom:5px; padding-top:5px">

        <div class="span1" style="width:850px">
        <label style="display:inline">Principal: <input id="txtPrincipal" type="text" style="width:670px; margin-left:43px"/></label>
        </div>

          <div class="span1" style="width:850px">
        <label style="display:inline">Enfermedades Conmitentes: <input id="txtConmitentes" type="text" style="width:576px; margin-left:18px"/></label>
        </div>

          <div class="span1" style="width:850px">
        <label style="display:inline">Complicaciones: <input id="txtComplicaciones" type="text" style="width:670px"/></label>
        </div>

          <div class="span1" style="width:850px">
        <label style="display:inline">Observaciones: <input id="txtObservacioness" type="text" style="width:670px; margin-left:5PX"/></label>
        </div>
        
        </div>


      </div>
      <%--BOTONES--%>
      <div style="background-color:#CCCCCC; width:100%; height:46PX; margin-top:5px">
              <a id="btnVolverAlPaciente" class="btn" style=" margin-top:8px; margin-left:6px"><i class="icon-th-list"></i>&nbsp;Volver al Paciente</a>

             <a class="btn btn-info pull-right" id="btnGuardar" href="#myModal" style="margin-right:6px; margin-top:8px">
             <i id="btnNuevo" class=" icon-print icon-white"></i>&nbsp;Imprimir</a>

             <a class="btn btn-info pull-right" id="btnBorrar" href="#myModal" style="margin-right:6px;margin-top:8px">
            <i id="I1" class=" icon-remove icon-white"></i>&nbsp;Borrar</a>

          <%--   <a class="btn btn-info pull-right" id="btnImprimir" href="#myModal" style="margin-right:6px;margin-top:8px">
            <i id="I2" class=" icon-print icon-white"></i>&nbsp;Imprimir</a>--%>
      </div>

      </div>
      </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/Hospitales/AtInternados/AltaMedica.js" type="text/javascript"></script>
