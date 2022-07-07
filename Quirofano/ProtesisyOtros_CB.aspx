<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ProtesisyOtros_CB.aspx.cs" Inherits="Quirofano_ProtesisyOtros_CB" %>

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


<style>
#ALTA_Mensaje label{ width:102px; display:inline-block; vertical-align:inherit; }
#SERVICIO_Div label{ width:102px; display:inline-block; vertical-align:inherit; }
#ORTOPEDIA_Div label{ width:77px; display:inline-block; vertical-align:inherit; }
#ALTA_Div select{width:371px}
#ALTA_Div input[type=text]{width:357px}

</style>


<div id="INSUMOALTA_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="INSUMOALTA_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Insumo</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="INSUMOALTA_Mensaje">           
            <label for="txt_insumoalta_insumo" style="display:inline;">Insumo: </label><input type="text" id="txt_insumoalta_insumo" /><br />               
            <a id="btn_guardar_insumo" class="btn btn-info">Guardar</a><a id="btn_cancelar_insumo" class="btn btn-danger" style="margin-left:10px;">Cancelar</a><br />                  
         </div>
         <div style="clear:both;"></div>
    </div>
</div>



<div id="SERVICIO_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="SERVICIO_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Servicio</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="SERVICIO_Mensaje">           
            <label for="txt_servicioalta_nombre">Servicio: </label><input type="text" id="txt_servicioalta_nombre" /><br />   
            <label for="txt_servicioalta_abreviatura">Aberviatura: </label><input type="text" id="txt_servicioalta_abreviatura" maxlength="3" /><br />   
            <a id="btn_guardar_servicio" class="btn btn-info">Guardar</a><a id="btn_cancelar_servicio" class="btn btn-danger" style="margin-left:10px;">Cancelar</a><br />      
         </div>
         <div style="clear:both;"></div>
    </div>
</div>


<div id="ORTOPEDIA_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="ORTOPEDIA_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Ortopedia</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="ORTOPEDIA_Mensaje">           
            <label for="txt_ortopediaalta_nombre">Ortopedia: </label><input type="text" id="txt_ortopediaalta_nombre" /><br />               
            <a id="btn_guardar_ortopedia" class="btn btn-info">Guardar</a><a id="btn_cancelar_ortopedia" class="btn btn-danger" style="margin-left:10px;">Cancelar</a><br />      
         </div>
         <div style="clear:both;"></div>
    </div>
</div>





<div id="ALTA_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="ALTA_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Insumos</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="ALTA_Mensaje">           
            <label for="cbo_nuevo_insumo">Insumo: </label><select id="cbo_nuevo_insumo"></select><br />
            
            <label for="cbo_alta_tipo">Tipo: </label><select id="cbo_alta_tipo"><option>Seleccione un tipo.</option></select><br />
            <label for="cbo_alta_medida">Medida: </label><select id="cbo_alta_medida"><option>Seleccione una medida.</option></select><br />            
            <label for="cbo_alta_marca">Marca: </label><select id="cbo_alta_marca"><option>Seleccione una marca.</option></select><br />            

            <label for="cbo_alta_servicio">Servicio: </label><select id="cbo_alta_servicio"></select><br />                        
            <label for="esortopedia">Ortopedia: </label><select id="cbo_ortopedia"></select> <br />
            <span style="display:none;"><label for="txt_alta_fvencimiento">F. Vencimiento: </label><input type="text" id="txt_alta_fvencimiento"/><br /></span>

            <label for="txt_alta_cantidad">Cantidad: </label><input type="text" id="txt_cantidad" maxlength="3" onkeypress='solo_enteros(event)' /><br />                        

            <label for="txt_alta_observacion" style="width: 98px;">Observación: </label>
            <textarea name="txt_alta_observacion" id="txt_alta_observacion" cols="40" rows="5" style="width: 356px;" maxlength="250"></textarea><br />            
            <a id="btn_alta_guardar" class="btn btn-info">Guardar</a><a id="btn_alta_cancelar" class="btn btn-danger" style="margin-left:10px;">Cancelar</a><br />      
         </div>
         <div style="clear:both;"></div>
    </div>
</div>














<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="display:none;"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form class="form-horizontal" >
        <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC">
                      </select>          
            </div>
        </div>
        
        <div class="control-group">
          <label class="control-label">DNI</label>
          <div class="controls">
            <input id="txt_dni"type="text" placeholder="Ingrese el DNI sin puntos">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >NHC</label>
          <div class="controls">
            <input id="txtNHC" type="text" placeholder="Ej: 99123456789">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" placeholder="Apellido Nombre"type="text" class="span3">
            <a id="btnBuscarPaciente" href="BuscarPacientes.aspx" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="PlanificarCirugia.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:120px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <div><span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;<span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span></div>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>&nbsp;&nbsp;&nbsp;<span>Urgencia:</span><span id="CargadoUrgencia"></span></div>
          <div><span>Cirujano: <strong><span id="CargadoMedico"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Fecha: <strong><span id="CargadoFecha"></span></strong></span> </div>
            <div><span>Diagnóstico: <strong><span id="CargadoDiagnostico"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Anestesista: <strong><span id="CargadoAnestesista"></span></strong></span> </div>
        <div><span>Anestesia: <strong><span id="CargadoAnestesia"></span></strong></span>&nbsp;&nbsp;&nbsp; <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong> </div>        
        </div>
        
        <input id="afiliadoId" type="hidden"/>

      </div>
      </div>
   <div class="contenedor_3" style="height:410px;"> 
                      

      <!--La parte de Insumos-->
      <div class="">
      <div class="contenedor_4 pagination-centered" style="height:210px; width:875px">
            <form id="from_2" class="form-inline" style="margin:10px 25px 0px 25px;">
            <div class="combos" style="margin-left:10px;">
                    <div style="float:left;">
                    <label for="txt_codigobarra" style="display:inline; width:80px;" onkeypress='solo_enteros(event)'>Insumo:</label>                      
                      <input type="text" id="txt_codigobarra" maxlength="10" style="width: 100px;" placeholder="Código Barra"/>                      
            </div>            

            
            <a id="btnAgregarMedicamento" class="btn btn-info" style="margin-left:39px;">Agregar a lista</a>
            <a id="btnNuevoMedicamento" class="btn btn-warning">Nuevo insumo</a>
            <a id="btnCancelarMedicamento" class="btn btn-danger">Cancelar</a>      

             <div id="TablaMedicamentos" class="tabla" style="height:140px;width:100%; background-color:White;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th style="width: 100px;"></th>
                    <th style="width: 100px;">Código Barra</th>
                    <th>Insumo/Protesis</th>                    
                  </tr>
                </thead>

              </table>
            </div>
            <div class="clearfix"></div>

            </div>

            <div class="clearfix"></div>


               
           </form>
          </div>
      <div class="clearfix"></div>
      </div>


        <!--Parte de Observaciones-->
       <div class="">
      <div class="contenedor_4 pagination-centered" style="height:71px; width:875px">
            <form id="frm_3" class="form-inline" style="margin:10px 25px 0px 25px;">
                <textarea id="txt_observaciones" placeholder="Observaciones" style="width: 806px;margin-left: 10px;" maxlength="4000"></textarea>
            <div class="clearfix"></div>
               
           </form>
          </div>
      <div class="clearfix"></div>
      </div>
                    

        <!--Tabla de estudios-->
        
        <div class="clearfix"></div>

<div  style="height:120px;width:100%;background-color:#CCCCCC;margin-top:5px;">
<div class="pull-right" style="padding:5px; height:120px;">
   <a id="btnVolver" class="btn" style="display:none"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
   <a id="btn_cancelear_todo" class="btn btn-danger">Cancelar</a>
  <a id = "btnConfirmar" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Guardar</a>
  <a id = "btn_imprimir" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Imprimir</a>
</div>
</div>
      </div>

      </div>
    </div>
  </div>
</div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<%
    Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();
    if (v.PermisoSM("75")) { Response.Write("<script>var PermisoEliminar = true;</script>"); } else { Response.Write("<script>var PermisoEliminar = false;</script>"); }
%>

<script src="../js/Hospitales/Quirofano/ProtesisyOtros_CB.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > Turnos > Planificar Cirugía > <strong>Extras (Prótesis y Otros)</strong>";

</script> 

</body>
</html>



