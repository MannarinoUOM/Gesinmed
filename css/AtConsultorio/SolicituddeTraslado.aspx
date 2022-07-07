<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SolicituddeTraslado.aspx.cs" Inherits="AtConsultorio_SolicituddeTraslado" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />


</head>

<body>
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div id="ArribadeTodo" class="container" style="width:800px;">
  <div class="contenedor_1">
      <div class="resumen_datos" style="margin-top:0px; font-size:12px;">
        
        <div class="datos_persona">
        <div ><img id="fotopaciente" class="avatar2" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor:pointer;" onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>
        
      </div>
        <div class="pull-left" style="margin-left:20px"> 
        <div>Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
        <div>Seccional:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
        <div>Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
        <input id="afiliadoId" type="hidden" />
        </div>
        <div class="clearfix"></div>
      </div>
    
    <div class="contenedor_2" style="position:relative; height:290px; width:700px; margin-left:40px;"> <div class="titulo_seccion">
      <span>Orden de Traslado</span></div>
      <form class="form-horizontal" >
<div style="margin-left:55px">
Tipo de Unidad
<div class="input_mini"><label>Común</label>
<input type="radio" name="opt" id="txtComun" style="display:inline; margin-left:10px;" checked />
<%--              <input id="txtComun" type="text" maxlength="2"/>--%>
            </div>
<div class="input_mini"><label>UTIM</label>
<input type="radio" name="opt" id="txtUTIM" style="display:inline; margin-left:5px;" />
            </div>
<div class="input_mini"><label>Neonatal</label>
<input type="radio" name="opt" id="txtNeonatal" style="display:inline; margin-left:15px;" />
            </div>
</div><br/> 
        <div class="control-group">
          <label class="control-label">Diagnóstico</label>
          <div class="controls">
            <input id="txtDiagnosticos" type="text" maxlength="50" class="span6"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">Observaciones</label>
          <div class="controls">
            <input id="txtObservaciones" type="text" maxlength="50" class="span6"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">Fecha Atención</label>
          <div class="controls">
            <input id="txtFechaAtencion" type="text" maxlength="10">
          </div>
        </div>
        
        <div class="pie_gris">
        <a id="btnBuscarSolicitud" class="btn pull-right"><i class="icon-search"></i>&nbsp;Buscar Ordenes</a>
        <a id="btnImprimir" class="btn pull-right"><i class="icon-print"></i>&nbsp;Imprimir</a>
        <a id="btnGuardar" class="btn btn-info pull-right"><i class="icon-ok"></i>&nbsp;Guardar</a>
        <a id="btnCancelar" class="btn btn-danger pull-right"><i class="icon-remove"></i>&nbsp;Cancelar</a>
        </div>
      </form>
    </div>
    <div id="hastaaqui">
      <div class="contenedor_a" style="position:relative;margin-left:15px"> <div class="titulo_seccion">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Lugar y hora traslado</span></div>
      
      
      <div class="minicontenedor50">
      <form class="form-horizontal" >
        <div class="control-group">
          <label class="control-label"><strong id="PosDesde">Desde</strong></label>
          <div class="controls">
            <input  id="txt_desde_desde" class="span2" type="text">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >Localidad:</label>
          <div class="controls">
            <input id="txt_desde_localidad" class="span2" type="text">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">Entre calles</label>
          <div class="controls">
            <input class="span2" id="txt_desde_entrecalles"type="text">
          </div>
        </div>
         </form>     
         </div>
         <div class="minicontenedor50">
      <form class="form-horizontal" >
        <div class="control-group">
          <label class="control-label"><strong>Hasta</strong></label>
          <div class="controls">
            <input class="span2" id="txt_hasta_hasta" type="text">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >Localidad:</label>
          <div class="controls">
            <input class="span2" id="txt_hasta_localidad" type="text">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">Entre calles</label>
          <div class="controls">
            <input class="span2" id="txt_hasta_entrecalles"type="text">
          </div>
        </div>
         </form>     
         </div>
<div class="clearfix"></div>
<div style="height:5px;"></div>
       <div class="minicontenedor50">
      <form class="form-horizontal" >
        <div class="control-group">
          <label class="control-label">Horario destino</label>
          <div class="controls">
            <input class="span1" id="txt_horario_destino" type="text">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >Con regreso</label>
          <div class="controls">
<label class="checkbox inline">
  <input type="radio" id="RegresoSi" name="Regreso"> SI
</label>
<label class="checkbox inline">
  <input type="radio" checked id="RegresoNo" name="Regreso"> NO
</label>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >De ambula</label>
          <div class="controls">
<label class="checkbox inline">
  <input type="radio" id="DeAmbulaSi" name="DeAmbula"> SI
</label>
<label class="checkbox inline">
  <input type="radio" checked id="DeAmbulaNo" name="DeAmbula"> NO
</label>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">Empresa servicio</label>
          <div class="controls">
            <input  id="txt_empresasservicio" class="span2" type="text">
          </div>
        </div>
        
         </form>     
         </div>
         
         <div class="minicontenedor50">
      <form class="form-horizontal">
        <div class="control-group">
          <label class="control-label">Operador Sol</label>
          <div class="controls">
            <input class="span2" id="txt_operadorsol" type="text">
          </div>
        </div>
        
        <div class="control-group">
          <label class="control-label">Fecha:</label>
          <div class="controls">
<form class="form-inline">
  <input type="text" id="txtFecha" class="input-small" placeholder="Fecha">
  <input type="text" id="txtHora" class="input-small span1" placeholder="Hora">
</form>          </div>
          
        </div>
        </form>
       <form class="form-horizontal">

        <div class="control-group">
          <label class="control-label">Operador recep</label>
          <div class="controls">
            <input class="span2" id="txt_OperadorReceptor" type="text">
          </div>
        </div>
        
        <div class="control-group">
          <label class="control-label">Fecha:</label>
          <div class="controls">
<form class="form-inline">
  <input type="text" id="txt_FechaRecp" class="input-small" placeholder="Fecha">
  <input type="text" id="txt_HoraRecp" class="input-small span1" placeholder="Hora">
</form>          </div>

          
        </div>
         </form>
		 
         </div>
         
       
        <div class="pie_gris">

        
        <a id="btnVolver" class="btn pull-right">Volver</a>
        <a id="btnBuscar" class="btn pull-right">Buscar Ordenes de Traslado</a>
        <div class="clearfix"></div>
        </div>
      </form>
      </div>
      
      
      
    </div>
    </div>
  </div>


    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script> 
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AtConsultorio/SolicituddeTraslado.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 

</body>
</html>
