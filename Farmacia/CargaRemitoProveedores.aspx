<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargaRemitoProveedores.aspx.cs" Inherits="Farmacia_CargaRemitoProveedores" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>

    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />


    <script type="text/javascript">
        $(document).ready(function () {
            $('#txtFechaVenc').datepicker(
            { dateFormat: 'dd/mm/yy',
                minDate: '+0D',
                maxDate: '+20Y',
                changeMonth: true,
                changeYear: true,
                numberOfMonths: 1,
                dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
                    'Junio', 'Julio', 'Agosto', 'Septiembre',
                    'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr',
                    'May', 'Jun', 'Jul', 'Ago',
                    'Sep', 'Oct', 'Nov', 'Dic']
            });
        });
  </script>
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div id="div_inicio" class="contenedor_2"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del Remito del Proveedor</span></div>
      <form class="form-horizontal" id="frm_main" >
        <div class="control-group">
          <label class="control-label">Proveedor</label>
          <div class="controls">
            <select id="cbo_Proveedor">
            
            </select>
          </div>
        </div>
        <div class="control-group" id="controltxtFecha">
          <label class="control-label" >Fecha</label>
          <div class="controls">
            <input id="txtFecha" name="txtFecha" type="text">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtLetra">Letra</label>
          <div class="controls">
            <input id ="txtLetra" type="text" class="span3" maxlength="1" value="R">
            </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtNro1">Numero</label>
          <div class="controls">
            <input id ="txtNro1" type="text" class="span1 numero" maxlength="4"> - 
            <input id ="txtNro2" type="text" class="span1 numero" maxlength="8" style="width:80px;">
            </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtObservaciones">Observaciones</label>
          <div class="controls">
            <input id ="txtObservaciones" type="text" class="span3" maxlength="300">
           </div>
        </div>
        
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a id="desdeaqui"  class="btn btn-info" style="display:none;">Siguiente</a>
                <a id="btnRemitos" class="btn btn-warning"  style="display:none;">Buscar Remitos</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos">
        
        <div class="datos_remito">
        <div class="datos_resumen_paciente">
          <div>Proveedor: <strong><span id="CargadoProveedor"></span></strong></div>
          <span>Fecha: <strong><span id="CargadoFecha"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Nº Remito: <strong><span id="CargadoFactura"></span></strong></span>
          <div>Observaciones: <strong><span id="CargadoObservacion"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:470px;">
      <form id="frm_cantidad" name="frm_cantidad">
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:160px;">

            <div class="combos" style="margin-left:5px;">
            <span class="span1" style="width:100px;">Insumo: </span>
            <span id="Medicamento_val" style="display:none;">0</span>
            <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
                <input type="text" id="cbo_Medicamento" data-provide="typeahead" autocomplete="off" style="width:200px;"/>
            </div>

            <div class="combos" style="margin-left:5px; display:none;">
            <span class="span1" style="width:100px;">Depósito: </span>
                <select id="cbo_Deposito">    
                </select>
            </div>
            <div class="combos" style="margin-left:5px;">
                <span class="span1" style="width:100px;">Cantidad de Unidades: </span>
                 <input type="text" id="cantidad" name="cantidad" maxlength="5" class="input-small numero" rel='Ingrese Cantidad'/>
            </div>
            
          </div>
          <div class="contenedor_4 pagination-centered" style="height:160px;">
                    <div class="combos" style="margin-left:5px;">
                        <span class="span1" style="width:110px;">Nro. Lote:</span>
                        <input type="text" id="txtLote" name="txtLote" class="input-small" rel='Ingrese Numero de Lote' />
                    </div>

                    <div class="combos" style="margin-left:5px; display:none;">
                        <span class="span1" style="width:110px;">Precio Compra: </span>
                        <input type="text" id="txtPrecioCompra" name="txtPrecioCompra" class="input-small numero" maxlength="9" rel='Ingrese Precio de Compra'/>
                        <input type="hidden" id="txtPrecioVenta" name="txtPrecioVenta" class="input-small"/>
                    </div>

                    <div class="combos" style="margin-left:5px;">
                         <span class="span1" style="width:110px;">Vencimiento:</span>
                         <input type="text" id="txtFechaVenc" name="txtFechaVenc" class="input-small" rel='Ingrese Fecha de Vencimiento'/>
                    </div>

                    <div class="combos" style="margin-left:5px;">
                    <span class="span1 pull-right"><input id="btnAgregarMedicamento" type="button" style="margin-right: 15px;" class="btn btn-success btn pull-right" value="Agregar" /></span>
                       <span class="span1 pull-right"><input id="btnCancelarMedicamento" style="margin-right: 15px;" type="button" class="btn btn-danger btn pull-right" value="Cancelar" /></span>  
                   </div>

                    <input id="btnAgregar_ModMedicamento" type="button" class="btn btn-success btn-mini" value="Agregar" style="visibility:hidden;" />
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>
        </form>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:260px;width:100%; margin-top:-10px; font-size:11px;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Cantidad de Unidades</th>
                    <th>Nro Lote</th>
                    <th style="display:none;">Compra (x unidad)</th>
                    <th>Venta (x unidad)</th>
                    <th>Vencimiento</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="height:120px;">
  <a id="btnVolver" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <a id = "btnConfirmarRemito" class="btn btn-success"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
  <a id = "btnPrint" class="btn btn-info" style="display:none;"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</a>
</div>
</div>
      </div>
    </div>
  </div>
</div>

<!--Pie de p�gina-->
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/Hospitales/Farmacia/CargaRemitoProveedores.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">


    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Remitos de Proveedores</strong>";

</script> 

</body>
</html>


