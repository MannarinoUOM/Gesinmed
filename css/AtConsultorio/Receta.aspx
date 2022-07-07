<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Receta.aspx.cs" Inherits="AtConsultorio_Receta" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <style>
        .dropdown-menu { max-height: 250px; max-width: 800px; font-size:11px; overflow-y: auto; overflow-x: hidden; }
    </style>
</head>

<body>
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>
<div class="container fancywidth">
  <div  class="contenedor_2" style="position:relative;">
    <div class="titulo_seccion"> <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Carga Receta</span></div>
    <form class="form-horizontal" >
      <div class="control-group">
        <label class="control-label" >Protocolo:</label>
        <div class="controls">
          <div id="NROProtocolo" class="texto_inline red">Provisorio</div>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label" >Fecha de inicio:</label>
        <div class="controls">
          <input id="txtFechaInicio" maxlength="10" class="span2" type="text">
        </div>
      </div>
      <div class="control-group">
        <label class="control-label">Nro. HC</label>
        <div class="controls">
          <input id="txtNHC" class="span3" maxlength="11" type="text">
           </div>
      </div>
      <div id="controlcbo_TipoDOC" class="control-group">
          <label class="control-label" for="cbo_TipoDOC">Tipo</label>
          <div class="controls">
              <select id="cbo_TipoDOC">
              </select>          
           </div>
        </div>
      <div class="control-group">
        <label class="control-label">Nº</label>
        <div class="controls">
        <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
          <input id="txt_dni" type="text" maxlength="8" class="span3">
          </div>
      </div>
      <div class="pie_gris"> 
          <a id="desdeaqui" class="btn btn-info pull-right" style="display:none;">Nueva Receta</a> 
          <a id="btnNuevaReceta" class="btn pull-right" style="display:none;">Nueva Receta</a>
          <a id="btnBuscar" class="btn pull-right">Buscar recetas</a>
          <a id="btnCerrarFB" class="btn btn-danger pull-right">Volver</a>
      </div>
    </form>
  </div>
  <div id="hastaaqui">
    <div class="contenedor_a" style="position:relative;margin-left:15px">

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
        <div> Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
        <div>Seccional:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
        <div>Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
        </div>
        <div class="clearfix"></div>
      </div>


      <div style="padding:10px;">
        <ul class="nav nav-tabs" data-tabs="tabs">
          <li class="active"><a data-toggle="tab" href="#tab1">Datos</a></li>
          <li><a data-toggle="tab" href="#tab2">Medicamentos</a></li>
        </ul>
      </div>
      <div id="my-tab-content" class="tab-content">
        <div class="tab-pane active fade in" id="tab1">
          <form class="form-horizontal" >
            <div class="control-group">
              <label class="control-label">Médico</label>
              <div class="controls">
                <span id="Medico"></span>
              </div>
            </div>
            <div class="control-group" style="display:none;">
              <label class="control-label">Patología</label>
              <div class="controls">
                <select id="cbo_patologia" type="text" class="span6">
                </select>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Diagnóstico</label>
              <div class="controls">
                <input class="typeahead span6 datos" id="cbo_diagnostico" type="text" data-provide="typeahead" autocomplete="off">
                <input type="hidden" id="diag_nombre" />
                <input type="hidden" id="id_val" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Autorizado por</label>
              <div class="controls">
                <select id="cboAutorizante" type="text" class="span6">
                </select>
              </div>
            </div>
            <div class="control-group" style="margin-left:35px;">
              Periodo solicitado
                <input id="txtPeriodo" type="text" class="span3 datos" maxlength="30">
               Fecha emisión
                <input id="txtFechaEntrega" type="text" class="span2 datos">
            </div>
          </form>
        </div>


        <div class="tab-pane fade in" id="tab2">
          <div class="tabla" style="height:100px;margin:0px 10px 10px 10px; font-size:11px; width:85%">
            <table class="table table-hover table-condensed">
              <thead>
                <tr>
                  <th>Monodroga</th>
                  <th>Adicional</th>
                  <th>Dosis diaria</th>
                  <th>Dosis</th>
                  <th>Unidad</th>
                  <th>Presentacion</th>
                </tr>
              </thead>
              <tbody id="TablaResultado">              
              </tbody>
            </table>
          </div>

          <div style="padding:0px 15px 0px 15px; height:40%; width:85%">

            <div class="label_top ">Adicional
              <input id="txt_Adicional" type="text" maxlength="25" style="margin-left:4px;width:150px; float:right"/>
            </div>


             <div class="label_top">Monodroga
              <select id="cbo_MonoDrogas" style="width:250px;"></select>
            </div>

            <div class="label_top">U Medida
              <select id="cbo_medidas" class="span2" style="width:216px;"></select>
            </div>


            <div class="label_top">Dosis
              <input id="txt_Dosis" type="text" class="span2" maxlength="10" style="margin-left:37px;width:80px;"/>
            </div>


            
            <div class="label_top">Dosis diaria
              <input id="txt_Dosis_diaria" type="text" class="span2" maxlength="10" style="width:75px;"/>
            </div>

            <div class="label_top">Presentación
            <select id="cbo_presentacion" class="span3" style="width:260px;"></select>
            </div>

            <div class="label_top">Observ.
              <input id="txt_Observaciones" type="text" class="span4" maxlength="25" style="margin-left:11px;width:200px;"/>
            <a id="btnAceptar" class="btn btn-success pull-right" style="margin-left:10px; margin-right:10px;">Agregar</a> 
            <a id="btnCancelar" class="btn btn-danger pull-right">Cancelar</a> 
            <a id="btnQuitar" class="btn btn-danger" style="display:none;">Quitar</a> 

            </div>

<%--            <div class="clearfix"></div>
            <a id="btnAceptar" class="btn btn-success pull-right" style="margin-left:10px; margin-right:10px;">Agregar</a> 
            <a id="btnCancelar" class="btn btn-danger pull-right">Cancelar</a> 
            <a id="btnQuitar" class="btn btn-danger" style="display:none;">Quitar</a> --%>
            </div>

        </div>
      </div>
      <div class="pie_gris"> 
          <a id="btnGuardar" class="btn btn-info pull-right"><i class="icon-ok"></i>&nbsp;Guardar</a>
          <a id="btnImprimir" class="btn pull-right"><i class="icon-print"></i>&nbsp;Imprimir</a>
          <a id="btnCancelar_FB" class="btn btn-danger pull-right"><i class="icon-remove"></i>&nbsp;Cancelar</a>
          <a id="btnNuevaReceta2" class="btn pull-right" style="display:none;">Nueva Receta</a> 
          <a id="btnBuscarRecetas" class="btn pull-right"><i class="icon-search"></i>&nbsp;Buscar Recetas</a> 
          <a class="btn btn-danger pull-right btnEliminar" style="display:none;">Eliminar receta</a>
      </div>
              <div class="clearfix"></div>
    </div>
  </div>
</div>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>     
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/AtConsultorio/Receta.js" type="text/javascript"></script>


<!--Barra sup--> 
<script>
    $('#desdeaqui').click(function () {
	if ($("#txtFechaInicio").val() != "") {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 0 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        $('#cbo_Especialidad').focus();
		}
        else {
            alert("Falta la fecha de inicio");
        }
    });


</script> 
<script type='text/javascript'>
    $("#modal_carga").click(function () {
        $("#myModal").modal('show');
    });
</script>
</body>
</html>

<div id="myModalImpresion" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
<h3 id="myModalLabel">Imprimir</h3>
</div>
<div class="modal-body">
<p>
<a class="btn" onclick="javascript:ImprimirRecetario();" >Recetario</a>
<a class="btn" onclick="javascript:ImprimirRecetario70100();">Autorización 70/100</a>
</p>
</div>
<div class="modal-footer">
<button class="btn" data-dismiss="modal" aria-hidden="true">Cerrar</button>
</div>
</div>
