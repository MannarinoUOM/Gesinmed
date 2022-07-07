<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargadeEstudios.aspx.cs" Inherits="AtConsultorio_CargadeEstudios" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/hestilo.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <style>
        .dropdown-menu { max-height: 250px; max-width: 800px; font-size:11px; overflow-y: auto; overflow-x: hidden; }
    </style>
</head>

<body>
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="width:800px;">
  <div class="contenedor_1">
    
    
    <div class="contenedor_2" style="position:relative"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Carga de Estudios</span></div>
      <form class="form-horizontal" >
     
         <div id="controlcbo_TipoDOC" class="control-group">
          <label class="control-label" for="cbo_TipoDOC">Tipo</label>
          <div class="controls">
              <select id="cbo_TipoDOC">
              </select>          
           </div>
        </div>
        

        <div id="Controltxt_dni" class="control-group">
          <label class="control-label">Nº</label>
          <div class="controls">
          <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
            <input id="txt_dni" type="text" maxlength="8">
          </div>
        </div>

        <div id="ControltxtNHC" class="control-group">
          <label class="control-label">Nro. HC</label>
          <div class="controls">
            <input id="txtNHC" type="text" maxlength="11">
          </div>
        </div>             
        
        <div class="pie_gris">
        <a href="BuscarOrdenesdeEstudios.aspx" class="btn pull-right">Buscar Ordenes</a>
        <a id="btnCargar" class="btn btn-info pull-right" style="display:none;">Cargar</a>
        </div>
      </form>
    </div>
    
    <div id="hastaaqui" style="display:none; width:700px; margin-left:50px;">

    
      <div class="contenedor_a" style="position:relative;margin-left:15px; height:470px;"> 
      <div class="resumen_datos" style="margin-top:0px; font-size:12px;height: 80px;">
        
        <div class="datos_persona">
        <div><img id="fotopaciente" class="avatar2" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor:pointer;" onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>
          <div class="Int">Sala: <strong><span id="CargadoSala"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>
        
      </div>
        <div class="pull-left" style="margin-left:20px"> 
        <div>Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
        <div>Seccional:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
        <div>Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
        <div class="Int">Cama:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoCama"></span></strong></span></div>
        </div>
        <div class="clearfix"></div>
      </div>
      
      <div class="titulo_seccion">
      &nbsp;&nbsp;<span>Ordenes de Estudios</span></div>
      
      
      
         
<div class="clearfix"></div>
<div style="height:5px;"></div>
       <div class="minicontenedor100">
<div class="pull-left">
      <form class="form-horizontal" >

<div class="hformsinwidth formhorizontal">
      <div class="texto_inline"> <span>Protocolo </span> <span id="ProtocoloNumero" class="red" style="margin-left:20px;  margin-right:105px;">Provisorio</span></div>
</div>  

<div class="hformsinwidth formhorizontal" style="margin-left:-55px;">
       <label class="control-label">Fecha</label>
        <input id="txtFecha" class="span2" style="margin-left:35px;" type="text">
</div>  
 

<div class="hformsinwidth formhorizontal" style="margin-top:10px;">
      <div>Diagnóstico</div>
                     <input class="typeahead span3" id="cbo_diagnostico" type="text" data-provide="typeahead" autocomplete="off">
                <input type="hidden" id="diag_nombre" />
                <input type="hidden" id="id_val" />
</div>  

<div class="hformsinwidth formhorizontal">
      <div>Patología</div>
      <select id="cbo_patologia" class="span3"></select>
</div>  

         </form>
         
         </div>
        
     <div style="margin-top:-10px;">
         Servicio <select id="cbo_Servicio" class="span4" style="margin-left:30px;"></select>
         <a class="btn btn-success pull-right" id="modal_carga" style="margin-top:0px; cursor:pointer; margin-right:30px;"><i class="icon-plus"></i>&nbsp;&nbsp;&nbsp;Agregar Estudio</a>
     </div>
         <div class="clearfix"></div>   
         <div class="tabla" style="height:150px; margin-top:-5px;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Estudios Solicitados</th>
                  </tr>
                </thead>
                <tbody id="TablaPracticas">
                </tbody>
              </table>
            </div>      
         </div>
         
         
       
        <div class="pie_gris">
        <a id="btnGuardarOrdenEstudio" class="btn btn-info pull-right"><i class="icon-ok"></i>&nbsp;Guardar</a>
        <a id="btnCerrar" class="btn btn-danger  pull-right"><i class="icon-remove"></i>&nbsp;Cancelar</a>
        <a id="btnImprimir" class="btn pull-right" style="display:none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
        <a id="" class="btn pull-right" style="display:none;">Volver</a>
        <a id="" class="btn pull-right" style="display:none;">Cargar Última</a>
        <a id="btnBuscar" class="btn pull-right"><i class="icon-search"></i>&nbsp;Buscar</a>
        <div class="clearfix"></div>
        </div>
      </div>
      
      
      
    </div>
    
    </div>
  </div>
  
  <div id="myModal" class="modal fade hide" style="z-index:999; padding-top:30px;" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header"> 
  

      <form class="form-horizontal" >
<fieldset>
        <div class="control-group">
          <label class="control-label">Estudios Solicitados</label>
          <div class="controls">
            <textarea class="span5" rows="4" id="txt_observacion" type="text"></textarea>
          </div>
        </div>
        </fieldset>
         </form> 




  </div>
  <div class="modal-footer">
    <button id="btnFinalizar" class="btn btn-danger" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i>&nbsp;Finalizar</button>
    <button id="btnCancelar" class="btn btn-warning">Cancelar</button>
    <button id="btnAgregarPractica" class="btn btn-info"><i class="icon-ok"></i>&nbsp;Agregar</button>
  </div>
</div>


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/AtConsultorio/OrdenesdeEstudios.js" type="text/javascript"></script>
    


<!--Barra sup--> 

</body>
</html>