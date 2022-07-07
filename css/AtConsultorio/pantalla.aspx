<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SolicituddeTraslado.aspx.cs" Inherits="AtConsultorio_SolicituddeTraslado" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="/css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="/css/barra.css"/>

</head>

<body>
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="width:800px;">
  <div class="contenedor_1">
    <div class="resumen_datos">
        
        <div class="datos_persona">
        <div ><img class="avatar2" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong>Julia Gonzales (29)</strong><a href="#" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong>116556498</strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong>20 116556498 4</strong></span>
          <div>Edad: <strong>28</strong>&nbsp;&nbsp;&nbsp;</div>
        </div>
        
      </div>
        <div class="pull-left" style="margin-left:20px"> 
        <div>Localidad:&nbsp;&nbsp;&nbsp;<span><strong>New York</strong></span></div>
        <div>Seccional:&nbsp;&nbsp;&nbsp;<span><strong>North America</strong></span></div>
        <div>Teléfono:&nbsp;&nbsp;&nbsp;<span><strong>4 300 4456</strong></span></div>
        </div>
        <div class="clearfix"></div>
      </div>
    
    <div class="contenedor_2" style="position:relative"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Tipo de unidad</span></div>
      <form class="form-horizontal" >
<div style="margin-left:55px">
<div class="input_mini">Comun
              <input type="text"/>
            </div>
<div class="input_mini">UTIM
              <input type="text"/>
            </div>
<div class="input_mini">Neonatal
              <input type="text"/>
            </div>
</div><br/> 
        <div class="control-group">
          <label class="control-label">Diagnósticos</label>
          <div class="controls">
            <input type="text">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">Observaciones</label>
          <div class="controls">
            <input type="text">
          </div>
        </div>
        
        <div class="pie_gris"><a id="desdeaqui" class="btn btn-info pull-right">Siguiente</a></div>
      </form>
    </div>
    <div id="hastaaqui">
      <div class="contenedor_a" style="position:relative;margin-left:15px"> <div class="titulo_seccion">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Lugar y hora traslado</span></div>
      
      
      <div class="minicontenedor50">
      <form class="form-horizontal" >
        <div class="control-group">
          <label class="control-label"><strong>Desde</strong></label>
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
  <input type="checkbox" id="RegresoSi"> SI
</label>
<label class="checkbox inline">
  <input type="checkbox" id="RegresoNo"> NO
</label>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >De ambula</label>
          <div class="controls">
<label class="checkbox inline">
  <input type="checkbox" id="DeAmbulaSi"> SI
</label>
<label class="checkbox inline">
  <input type="checkbox" id="DeAmbulaNo"> NO
</label>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">Empresa servicio</label>
          <div class="controls">
            <input  id="txt_empresasservcis" class="span2" type="text">
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
        <a id="btnGuardar" class="btn btn-info pull-right">Guardar orden</a>
        <a id="btnImprimir" class="btn pull-right">Imprimir</a>
        <a id="btnVolver" class="btn pull-right">Volver</a>
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

<!--Barra sup--> 
<script>
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        $('#cbo_Especialidad').focus();
    });


</script> 

</body>
</html>
