<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AltaInsumo.aspx.cs" Inherits="Farmacia_AltaInsumo" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/InputBox.css" rel="stylesheet" type="text/css"/>
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:530px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Alta y Modificación de Insumos</span></div>
      <form id="frm_" name="frm_">
        <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Datos Insumo</a></li>
                <li><a href="#tab4" data-toggle="tab">Otros</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">
                <div style="height:400px;">
                         <div class="row"> 
                                <div class="form-group" style="margin:5px; margin-right:60px;">
                                    <div class="span5">
                                            Insumo
                                          <input id="insumo" name="insumo" type="text" class="form-control" rel="Ingrese Nombre del Insumo" style="margin-left:50px"/>
                                    </div>
                                </div>

                                 <div class="col-xs-4">
                                    Stock Mínimo
                                    <input id="stockmin" name="stockmin" maxlength="5" type="text" class="form-control tamanio_I numero span1" rel="Ingrese Stock Minimo" style="margin-left:40px; margin-right:5px;" />
                                    Stock Máximo
                                    <input id="stockMax" name="stockMax" maxlength="5" class="form-control tamanio_I numero span1" type="text" style="margin-right:35px;" rel="Ingrese Stock máximo" />
                                 </div>


                                <div class="col-xs-4" style="display:none;">
                                    Laboratorio
                                    <select id="cbo_laboratorio" name="cbo_laboratorio" class="form-control tamanio_I" style="margin-left:90px">
                                        <option value="0"></option>
                                    </select>
                                </div>
                          </div>
                          <div class="row"> 
                              <div class="form-group" style="margin:5px;">
                                <div class="span5">
                                 Dosis
                                      <input id="gramaje" name="gramaje" type="text" class="input-medium numero" rel="Ingrese Dosis" style="margin-left:60px;width:52px;" maxlength="7" rel="Ingrese Gramaje"/>
                                      <select id="Ugramaje" class="span1" style="width:150px;" rel="Ingrese Medida gramaje"></select>
                                </div>
                              </div>
                                  <div class="form-group" style="margin:5px;">
                                    <div class="col-xs-4">
                                    Rubro
                                        <select id="cbo_Rubro" name="cbo_Rubro" style="margin-left:88px" rel="Ingrese Rubro"></select>
                                     </div>
                                 </div>
                          </div>
                          <div class="row"> 
                              <div class="form-group" style="margin:5px;">
                                <div class="span5" style="display:none;">
                                    <div id="controldeposito" class="control-group">
                                        <label for="cbo_deposito">Depósito</label><select id="cbo_deposito" name="cbo_deposito" class="form-control"></select>
                                    </div>
                                </div>
                              </div>

                          </div>

                          <div class="row">
                                <div class="form-group" style="margin:5px;">
                                    <div class="span5">
                                    Presentación
                                        <select id="cbo_unidad" name="cbo_unidad" style="margin-left:13px" rel="Ingrese Presentación"></select>
                                     </div>
                                </div>
                                 <div class="col-xs-4">
                                        Precio de Venta
                                        <input id="precio_fact" class="numero" maxlength="8" name="precio_fact" type="text" style="width:206px; margin-left:25px" rel="Ingrese Precio de venta"/>
                                     </div>
                                <div class="form-group" style="margin:5px; display:none;">
                                    <div class="col-xs-4">
                                   Unidades por Blister
                                        <input id="unidadblister" name="unidadblister" maxlength="4" class="numero" type="text" value="1" rel='Ingrese Unidades por Blister'  style="margin-left:38px" />
                                     </div>
                                 </div>


                          </div>

                           <div class="row">
                                <div class="form-group" style="margin:5px;">
                                    <div class="span5">GLN
                                                <input id="GLN" name="GLN" maxlength="30" type="text" class="form-control tamanio_I" style="margin-left:65px" />
                                    </div>
                                     <div class="col-xs-4">GTIN
                                            <input id="GTIN" name="GTIN" maxlength="30" class="form-control tamanio_I" type="text" style="margin-left:90px" />
                                     </div>
                               </div>
                            </div>
                            <br />
                             <div class="row">
                                <div class="form-group" style="margin:5px; text-align:center;">
                                   <div class="span10">
                                   Alertar del vencimiento con
                                        <input id="Vencimiento_Diasaviso" name="Vencimiento_Diasaviso" class="numero span1" maxlength="3" type="text" style="margin-left:3px" rel="Ingrese Alerta de vencimiento" />
                                   dias de anticipación.
                                    </div>
                                 </div>
                            </div>


                          <div class="row">
                                <div class="form-group" style="margin:5px; display:none;">
                                <div class="span5">
                                 Presentación
                                      <input id="Presentacion" name="Presentacion" type="text" class="input-medium numero" value="0.00" rel="Ingrese Presentacion" style="margin-left:12px; width:52px;" maxlength="7"/>
                                      <select id="cbo_Presentacion" class="span1" style="width:150px;"></select>
                                </div>
                                </div>

                          </div>
                          
                          <div class="row">
                                <div class="form-group" style="margin:5px; display:none;">
                                    <div class="span5">
                                    Monodroga
                                         <select id="cbo_Monodroga" name="cbo_Monodroga" style="margin-left:25px"></select>
                                     </div>
                                </div>
                          </div>  
                   

            </div>
            </div>
            <div class="tab-pane" id="tab2">
                <div style="padding:0px 15px 0px 15px; height:400px;">


                 <div class="row" style="display:none;">
                    <div class="span5">
                        <div id="controlprecio_compra" class="control-group">
                            <label for="precio_compra">Precio Compra</label><input id="precio_compra" name="precio_compra" type="text" class="input-xlarge" />
                        </div>
                    </div>
                    <div class="span5">
                        <div id="controlfecha_compra" class="control-group">
                            <label for="fecha_compra">Fecha Compra</label><input id="fecha_compra" name="fecha_compra" type="text" class="input-xlarge" />
                        </div>
                    </div>
                 </div>
                </div>
            </div>
             <div class="tab-pane" id="tab3">
                <div style="padding:0px 15px 0px 15px; height:400px;">
                   
                    <div class="row">

                    <div class="span5" style="display:none;">
                        <div id="controlstockactual" class="control-group">
                            <label for="stockactual">Stock Actual</label><input id="stockactual" name="stockactual" type="text" class="input-xlarge" />
                        </div>
                    </div>
                    </div>
                    <div class="row" style="display:none;">
                    <div class="span5">
                        <div id="controllote" class="control-group">
                            <label for="lote">Nro. Lote</label><input id="lote" name="lote" type="text" class="input-xlarge" />
                        </div>
                    </div>
                    <div class="span5">
                        <div id="controlserie" class="control-group">
                            <label for="serie">Nro. Serie</label><input id="serie" name="serie" type="text" class="input-xlarge" />
                        </div>
                    </div>
                    </div>
                    <div class="row" style="display:none;">
                    <div class="span5">
                        <div id="controlfechavto" class="control-group">
                            <label for="fechavto">Fecha Vencimiento</label><input id="fechavto" name="fechavto" type="text" class="input-xlarge" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
             <div class="tab-pane" id="tab4">
                <div style="padding:0px 15px 0px 15px; height:400px;">
                     <div class="row">
                        <div class="span5">
                            <div id="controlape" class="control-group">
                            <input id="ape" name="ape" type="checkbox" class="input-xlarge" style="vertical-align:middle" />
                                <label for="ape" style="display:inline">APE  (Administración de Programas Especiales)</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div id="controlfactura" class="control-group">
                            <input id="factura" name="factura" type="checkbox" class="input-xlarge" />
                                <label for="factura" style="display:inline; margin-right: 10px;">Se Factura</label>
                            </div>
                        </div>
                    </div><hr />
                    <div class="row">
                        <div class="span5">
                            <div id="controlbaja" class="control-group">
                            <input id="baja" name="baja" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                                <label for="baja" style="display:inline; margin-right: 10px;">Dado de Baja</label>
                            </div>
                        </div>
                        <div class="span5">
                            <div id="controlauto" class="control-group">
                            <input id="auto" name="auto" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                                <label for="auto" style="display:inline; margin-right: 10px;">Controlable</label>
                            </div>
                        </div>
                    </div><hr />

                    <div class="row">
                        <div class="span5">
                            <div id="controltraza" class="control-group">
                            <input id="traza" name="traza" type="checkbox" class="input-xlarge" style="vertical-align:middle;"/>
                                <label for="traza" style="display:inline; margin-right: 10px;">Multidosis</label> <!-- Ex trazabilidad -->
                            </div>
                        </div>
                        <div class="span5">
                            <div id="controlmultidosis" class="control-group">
                            <input id="multidosis" name="multidosis" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                                <label for="multidosis" style="display:inline; margin-right: 10px;">Antibiótico</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                     <div class="row" style="display:none;">
                        <div class="span5">
                            <div id="controlEliminado" class="control-group">
                                <label for="Eliminado" style="display:inline; margin-right: 10px;">Eliminado</label><input id="Eliminado" name="Eliminado" type="checkbox" class="input-xlarge" style="vertical-align:middle;"/>
                            </div>
                        </div>
                    </div>

                
                </div>
            </div>
          </div>
         </div>
         </form>
          <div class="clearfix"></div>

        <div class="clearfix"></div>

<div  style="height:90px;width:100%;background-color:#CCCCCC;margin-top:5px;">
<div class="pull-right" style="padding:5px; height:90px;">
<button id = "btnAgregar" class="btn btn-success"><i class=" icon-ok icon-white"></i>&nbsp;Guardar Cambio</button>
<button id = "btnEliminar" class="btn btn-danger"><i class="icon-remove-circle icon-white"></i>&nbsp;Eliminar</button>
<button id = "btnCancelar" class="btn btn-info"><i class="icon-remove  icon-white"></i>&nbsp;Cancelar</button>
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
<script src="../js/Hospitales/Farmacia/AltaInsumo.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });

    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong> Alta, Modificación y Eliminación de Insumos</strong>";

</script> 

</body>
</html>

