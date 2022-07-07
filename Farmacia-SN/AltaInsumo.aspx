<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AltaInsumo.aspx.cs" Inherits="Farmacia_AltaInsumo" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
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
                                <div class="form-group" style="margin:5px;">
                                    <div class="span5">
                                      <label for="insumo" class="col-sm-2 control-label" style="display:inline;">Insumo</label>
                                          <input id="insumo" name="insumo" type="text" class="form-control" rel='Ingrese Nombre del Insumo'/>
                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <span class="col-sm-2 control-label">Laboratorio</span>
                                    <select id="cbo_laboratorio" name="cbo_laboratorio" class="form-control">
                                    <option value="0"></option>
                                    </select>
                                </div>
                          </div>
                          <div class="row"> 
                              <div class="form-group" style="margin:5px;">
                                <div class="span5">
                                      Gramaje
                                      <input id="gramaje" name="gramaje" type="text" class="form-control" rel='Ingrese Gramaje' />
                                </div>
                              </div>
                               <div class="form-group" style="margin:5px;">
                                <div class="col-xs-4">
                                Stock Mínimo
                                    <input id="stockmin" name="stockmin" type="text" class="form-control" rel='Ingrese Stock Minimo' />
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
                                        Unidad <select id="cbo_unidad" name="cbo_unidad" class="form-control"></select>
                                     </div>
                                </div>
                                <div class="form-group" style="margin:5px;">
                                    <div class="col-xs-4">
                                        Unidades por Blister
                                        <input id="unidadblister" name="unidadblister" type="text" class="form-control" rel='Ingrese Unidades por Blister' />
                                     </div>
                                 </div>
                          </div>

                          <div class="row">
                                <div class="form-group" style="margin:5px;">
                                    <div class="span5">
                                        Presentación <select id="cbo_Presentacion" name="cbo_Presentacion" class="form-control"></select>
                                     </div>
                                </div>
                                <div class="form-group" style="margin:5px;">
                                    <div class="col-xs-4">
                                        Rubro
                                        <select id="cbo_Rubro" name="cbo_Rubro" class="form-control"></select>
                                     </div>
                                 </div>
                          </div>
                          
                          <div class="row">
                                <div class="form-group" style="margin:5px;">
                                    <div class="span5">
                                        Monodroga <select id="cbo_Monodroga" name="cbo_Monodroga" class="form-control"></select>
                                     </div>
                                </div>
                                <div class="form-group" style="margin:5px;">
                                    <div class="col-xs-4">
                                        Precio Facturado
                                        <input id="precio_fact" name="precio_fact" type="text" class="input-xlarge" />
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
                                <label for="ape" style="display:inline; margin-right: 10px;">APE  (Administración de Programas Especiales)</label><input id="ape" name="ape" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                            </div>
                        </div>
                        <div class="span5">
                            <div id="controlfactura" class="control-group">
                                <label for="factura" style="display:inline; margin-right: 10px;">Se Factura</label><input id="factura" name="factura" type="checkbox" class="input-xlarge"  />
                            </div>
                        </div>
                    </div><hr />
                    <div class="row">
                        <div class="span5">
                            <div id="controlbaja" class="control-group">
                                <label for="baja" style="display:inline; margin-right: 10px;">Dado de Baja</label><input id="baja" name="baja" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                            </div>
                        </div>
                        <div class="span5">
                            <div id="controlauto" class="control-group">
                                <label for="auto" style="display:inline; margin-right: 10px;">Requiere Autorización</label><input id="auto" name="auto" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                            </div>
                        </div>
                    </div><hr />

                    <div class="row">
                        <div class="span5">
                            <div id="controltraza" class="control-group">
                                <label for="traza" style="display:inline; margin-right: 10px;">Trazabilidad</label><input id="traza" name="traza" type="checkbox" class="input-xlarge" style="vertical-align:middle;"/>
                            </div>
                        </div>
                        <div class="span5">
                            <div id="controlmultidosis" class="control-group">
                                <label for="multidosis" style="display:inline; margin-right: 10px;">Multidosis</label><input id="multidosis" name="multidosis" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
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
<button id = "btnAgregar" class="btn btn-success"><i class=" icon-ok icon-white"></i>&nbsp;Agregar</button>
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

