<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListadoInsumos.aspx.cs" Inherits="Quirofano_ListadoInsumos" %>

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

<style>
.Turnos_Ocupados {  background-color: #58FA58;}
.Turnos_Cancelado { background-color: #FA5858;}
.Turnos_Urgencias {background-color: #F4FA58;}
.Turnos_Realizadas {background-color: #FFFFFF;}

#ALTA_Mensaje label{ width:102px; display:inline-block; vertical-align:inherit; }
#esortopedia { margin-bottom: 10px;}
#cbo_ortopedia { margin-bottom: 10px;}
#btn_ortopedia_nueva { margin-bottom: 10px;}

#INSUMOALTA_Div label{ width:102px; display:inline-block; vertical-align:inherit; }
#SERVICIO_Div label{ width:102px; display:inline-block; vertical-align:inherit; }
#ORTOPEDIA_Div label{ width:77px; display:inline-block; vertical-align:inherit; }
#MARCA_Div label{ width:77px; display:inline-block; vertical-align:inherit; }

#RUBRO_Div label{ width:77px; display:inline-block; vertical-align:inherit; }
#MEDIDA_Div label{ width:77px; display:inline-block; vertical-align:inherit; }
#SUBRUBRO_Div label{ width:77px; display:inline-block; vertical-align:inherit; }


.check_marcado{background-color:Yellow;}

</style>

<body>
<div class="clearfix"></div>


<div id="INSUMOALTA_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="INSUMOALTA_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Insumo</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="INSUMOALTA_Mensaje">           
            <label for="txt_insumoalta_insumo">Insumo: </label><input type="text" id="txt_insumoalta_insumo" maxlength="50"/><br />               
            <span style="display:none;"><label for="txt_insumoalta_stockminimo">Stock Mínimo: </label><input type="text" id="txt_insumoalta_stockminimo" maxlength="3" onkeypress='solo_enteros(event)'/><br /></span>
            <label for="ck_enstock">En Stock: </label><input type="checkbox" id="ck_enstock"/><br />   <br />
            <a id="btn_guardar_insumo" class="btn btn-info">Guardar</a><a id="btn_cancelar_insumo" class="btn btn-danger" style="margin-left:10px;">Cancelar</a><br />                  
         </div>
         <div style="clear:both;"></div>
    </div>
</div>




<div id="RUBRO_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="RUBRO_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Insumo</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="RUBRO_Mensaje">           
            <label for="txt_insumoalta_insumo">Rubro: </label><input type="text" id="txt_edicion_rubro" maxlength="50"/><br />               
            <a id="btn_guardar_rubro" class="btn btn-info">Guardar</a><a id="btn_cancelar_rubro" class="btn btn-danger" style="margin-left:10px;">Cancelar</a><br />                  
         </div>
         <div style="clear:both;"></div>
    </div>
</div>



<div id="SUBRUBRO_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="SUBRUBRO_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Tipo del isumo</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="SUBRUBRO_Mensaje">           
            <label>Insumo: </label><span id="span_tipo_insumo"></span><br />               
            <label for="txt_insumoalta_subinsumo">Tipo: </label><input type="text" id="txt_insumoalta_subinsumo" maxlength="50"/><br />               
            <a id="btn_guardar_subrubro" class="btn btn-info">Guardar</a><a id="btn_cancelar_subrubro" class="btn btn-danger" style="margin-left:10px;">Cancelar</a><br />                  
         </div>
         <div style="clear:both;"></div>
    </div>
</div>



<div id="MEDIDA_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="MEDIDA_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Medida del insumo</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="MEDIDA_Mensaje">           
            <label>Rubro: </label><span id="span_medida_insumo"></span><br />               
            <label>Tipo: </label><span id="span_medida_tipo"></span><br />               
            <label for="txt_medidaalta_medida">Medida: </label><input type="text" id="txt_medidaalta_medida" maxlength="50"/><br />               
            <a id="btn_guardar_medida" class="btn btn-info">Guardar</a><a id="btn_cancelar_medida" class="btn btn-danger" style="margin-left:10px;">Cancelar</a><br />                  
         </div>
         <div style="clear:both;"></div>
    </div>
</div>




<div id="INSUMOBAJA_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="INSUMOBAJA_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Baja Insumo</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="INSUMOBAJA_Mensaje">           
            <label style="display:inline;">Cod. Barra: </label><span id="span_baja_codbar"></span><br />   
            <label style="display:inline;">Insumo: </label><span id="span_baja_insumo"></span><br />            
            <label for="cbo_baja_motivo" style="display:inline;">Motivo: </label><select id="cbo_baja_motivo"></select><br />   
            <label for="txt_baja_observacion" style="display:inline;">Observación: </label><input type="text" id="txt_baja_observacion" maxlength="255" /><br />   
            
            <a id="btn_guardar_baja" class="btn btn-info">Aceptar</a><a id="btn_cancelar_baja" class="btn btn-danger" style="margin-left:10px;">Cancelar</a><br />      
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
            <label for="txt_servicioalta_abreviatura">Aberviatura: </label><input type="text" id="txt_servicioalta_abreviatura" maxlength="10" /><br />   
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





<div id="MARCA_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="MARCA_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Marca</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="MARCA_Mensaje">           
            <label for="txt_marcaalta_nombre">Marca: </label><input type="text" id="txt_marcaalta_nombre" /><br />               
            <a id="btn_guardar_marca" class="btn btn-info">Guardar</a><a id="btn_cancelar_marca" class="btn btn-danger" style="margin-left:10px;">Cancelar</a><br />      
         </div>
         <div style="clear:both;"></div>
    </div>
</div>



<div id="ALTA_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9997;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="ALTA_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Carga de stock</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="ALTA_Mensaje">           
            <label for="cbo_alta_insumo">Insumo: </label><span id="span_alta_insumo"></span><br />
                        
            <label for="cbo_alta_tipo">Tipo: </label><select id="cbo_alta_tipo"><option>Seleccione un rubro...</option></select><a id="btn_alta_tipo_edicion" class="btn btn-info" style="margin-bottom: 10px;margin-left: 5px;">Edición</a> <a id="btn_alta_tipo_nuevo" class="btn btn-info" style="margin-bottom: 10px;margin-left: 5px;">Nuevo</a><br />
            <label for="cbo_alta_medida">Medida: </label><select id="cbo_alta_medida"><option>Seleccione una medida...</option></select><a id="btn_alta_medida_edicion" class="btn btn-info" style="margin-bottom: 10px;margin-left: 5px;">Edición</a> <a id="btn_alta_medida_nueva" class="btn btn-info" style="margin-bottom: 10px;margin-left: 5px;">Nueva</a><br />            
            <label for="cbo_alta_marca">Marca: </label><select id="cbo_alta_marca"></select><a id="btn_marca_edicion" class="btn btn-info" style="margin-bottom: 10px;margin-left: 5px;">Edición</a> <a id="btn_marca_nuevo" class="btn btn-info" style="margin-bottom: 10px;margin-left: 5px;">Nueva</a><br />            
            
            <label for="cbo_alta_servicio">Servicio: </label><select id="cbo_alta_servicio"></select><a id="btn_servicio_edicion" class="btn btn-info" style="margin-bottom: 10px;margin-left: 5px;">Edición</a> <a id="btn_servicio_nuevo" class="btn btn-info" style="margin-bottom: 10px;margin-left: 5px;">Nuevo</a><br />
            
            <label id="label_codigo">Código: </label><span id="span_codigo"></span><br />
            <label for="esuom">UOM: </label><input type="radio" name="uom_ortopedia" id="esuom"/><br />
            <label for="esortopedia">Ortopedia: </label><input type="radio" name="uom_ortopedia" id="esortopedia"/> <select id="cbo_ortopedia" style="width: 208px;"></select> <a id="btn_ortopedia_edicion" class="btn btn-info" style="margin-bottom: 10px;">Edición</a> <a id="btn_ortopedia_alta" class="btn btn-info" style="margin-bottom: 10px;margin-left: 5px;">Nueva</a><br />
            <label for="txt_alta_fvencimiento">F. Vencimiento: </label><input type="text" id="txt_alta_fvencimiento"/><br />
            <label for="txt_alta_cantidad">Cantidad: </label><input type="text" id="txt_alta_cantidad" maxlength="3" onkeypress='solo_enteros(event)'/><br />
            <label for="cbo_movimiento">Movimiento: </label><select id="cbo_movimiento"></select><br />
            <label for="txt_alta_deposito">Deposito: </label><input type="text" id="txt_deposito" maxlength="250"/><br />
            <label for="txt_alta_observacion" style="width: 98px;">Observación: </label>
            <textarea name="txt_alta_observacion" id="txt_alta_observacion" cols="40" rows="3" style="width: 356px;" maxlength="250" ></textarea><br />            
            <a id="btn_alta_guardar" class="btn btn-info">Guardar</a><a id="btn_alta_cancelar" class="btn btn-danger" style="margin-left:10px;">Cancelar</a><br />      
         </div>
         <div style="clear:both;"></div>
    </div>
</div>







<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:530px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Insumos</span></div>
      
          <div class="clearfix"></div>

          <div>
          <label for="ck_detallada" style="display:inline; margin-left:15px;">Ver Movimientos: </label><input type="checkbox" id="ck_detallada" style="margin-top:0px;" /><br />   
          </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaInsumos" class="tabla" style="height:367px;width:100%; margin-top:10px; overflow:auto;">
              <table class="table table-hover table-condensed">
                <thead id="th_insumo">			
                  
                </thead>
                <tbody id="tb_insumo">
                
                </tbody>
              </table>
            </div>
        </div>
        <div class="clearfix"></div>

        <form id="frm_Main" name="frm_Main">
        <div class="">
  
          <div class="contenedor_4 pagination-centered" style="height: 112px;margin-bottom: 10px;width: 885px;margin-top: 10px;margin-left: 15px;">          
             <div id="controlfecha" class="control-group" style="display:inline; margin:10px 10px 0px 10px;">
                
                <label for="cbo_servicio" style="display:inline;">Servicio: </label><select id="cbo_servicio" style="margin-top:5px;margin-bottom: 0px;"></select>
                <label for="cbo_insumo" style="display:inline;margin-left: 9px;">Insumo: </label><select id="cbo_insumo" style="margin-top:5px;margin-bottom: 0px;"></select> <label style="display:inline; margin-left:10px;" id="label_stock">Cantidad: </label><span id="span_stock"></span> <br />
                <label for="cbo_filtro_tipo" style="display:inline;margin-left: 10px;margin-right: 22px;">Tipo: </label><select id="cbo_filtro_tipo" style="margin-top:5px;"></select> 
                <label style="display:inline; margin-left:10px;">Medida: </label> <select id="cbo_filtro_medida" style="margin-top:5px;"></select> <a class="btn btn-info" id="btn_filtrar" style="margin-bottom: 5px;">Buscar</a>  <br />
                
                <div style="display:none;">
                <span style="margin-left: 15px;">Desde: </span><input type="text" id="txt_fecha_desde" style="width:100px;"/> <span style="margin-left: 20px;">Hasta: </span><input type="text" id="txt_fecha_hasta" style="width:100px;"/>  <br />
                </div>

                <a id="btn_agregarinsumo" class="btn btn-info" style="margin-top:-5px; display:none;">Carga de stock</a> 
                <a id="btn_editarnombredeinsumo" class="btn btn-info" style="margin-top:-5px; display:none;">Editar nombre de insumo</a> 
                <a id="btn_nuevoinsumo" class="btn btn-info" style="margin-top:-5px;">Nuevo insumo</a> 
                <a id="btn_bajadeinsumo" class="btn btn-danger" style="margin-top:-5px; display:none;">Baja de insumo</a> 
                <a id="btn_cancelarinsumo" class="btn btn-danger" style="margin-top:-5px;">Cancelar</a>                 
                <a id="btnImprimir" class="btn btn-info pull-right" onclick="Imprimir(-1);" style="margin-top:-5px; display:none;"><i class=" icon-print icon-white"></i>&nbsp;Etiquetas</a>
                <a id="btnImprimirListado" class="btn btn-info pull-right" onclick="ImprimirListado();" style="margin-top:-5px;margin-right:5px; display:none;"><i class=" icon-print icon-white"></i>&nbsp;Listado</a>

             </div>
             
          </div>
           
          </div>
          </form>

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
<script src="../js/Hospitales/Quirofano/ListadoInsumos.js?v=2" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > <strong>Insumos</strong>";

</script> 

</body>
</html>


