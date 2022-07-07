<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Compras_CargarRemito.aspx.cs" Inherits="Compras_Compras_CargarRemito" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>

    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <style>
        .dropdown-menu { max-height: 250px; max-width: 800px; font-size:11px; overflow-y: auto; overflow-x: hidden; }
    </style>
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"></div>

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
          <label class="control-label" for="txtLetra">Nro. Remito</label>
          <div class="controls">
            <input id ="txtLetra" type="text" class="span1" maxlength="1" value="R">
            <input id ="txtNro1" type="text" class="span1 numero" maxlength="4"> - 
            <input id ="txtNro2" type="text" class="span1 numero" maxlength="8" style="width:69px;">
           </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtNro1">Nro. Factura</label>
          <div class="controls">
            <input id ="txtFactura_Letra" type="text" class="span1" maxlength="1" value="">
            <input id ="txtFactura_Nro1" type="text" class="span1 numero" maxlength="4"> - 
            <input id ="txtFactura_Nro2" type="text" class="span1 numero" maxlength="8" style="width:69px;">
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
                <a id="btnRemitos" class="btn btn-warning"  style="display:none;">Buscar Remitos/Facturas</a> 
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
          &nbsp;&nbsp;&nbsp; <span>Nº Factura: <strong><span id="CargadoFacturaRelacionada"></span></strong></span>
          <div>Observaciones: <strong><span id="CargadoObservacion"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:420px;">
      <form id="frm_cantidad" name="frm_cantidad">
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:160px;">

            <div class="combos" style="margin-left:5px;">
            <span class="span1" style="width:70px;">Insumo: </span>
            <span id="Medicamento_val" style="display:none;">0</span>
            <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
                <input type="text" id="cbo_Medicamento" data-provide="typeahead" autocomplete="off" style="width:225px;"/>
            </div>

            <div class="combos" style="margin-left:5px;">
                 <span class="span1" style="width:70px;">Depósito:</span>
                 <select id="cbo_Deposito" style="width:238px;"></select>
                  
            </div>
            <div class="combos" style="margin-left:5px;">
                <span class="span1" style="width:70px;">Ult. Precio Compra:</span>
                <input type="text" id="txtPrecioCompra" name="txtPrecioCompra" class="input-small numero" maxlength="9" style="width: 60px;" disabled/>
                Stock Actual:
                <input type="text" id="txtStockActual" name="txtStockActual" class="input-small numero" maxlength="4" style="width: 60px;" disabled/>
            </div>
          </div>
          <div class="contenedor_4 pagination-centered" style="height:160px; margin-left:-60px; width:505px;">
                    <div class="combos" style="margin-left:5px;">                      
                        Nro. Lote:
                        <input type="text" id="txtLote" name="txtLote" class="input-small" style="margin-left: 18px;margin-right: 23px;" rel='Ingrese Numero de Lote' />
                       
                        <input type="hidden" id="txtPrecioVenta" name="txtPrecioVenta" class="input-small"/>
                        Cantidad de Unidades:
                         <input type="text" id="cantidad" name="cantidad" maxlength="5" class="input-small numero" rel='Ingrese Cantidad'/>
                    </div>

                    <div class="combos" style="margin-left:5px;">
                         Vencimiento:
                         <input type="text" id="txtFechaVenc" name="txtFechaVenc" class="input-small" rel='Ingrese Fecha de Vencimiento' style="margin-right: 23px;"/>
                         Precio Unitario:
                         <input type="text" id="txtPrecioUnit" name="txtPrecioUnit" class="input-small numero" maxlength="9" style="margin-left: 47px;margin-right: 23px;"/>                    
                    </div>

                    <div class="combos" style="margin-left:5px;">
                        Rubro:
                        <select id="cbo_Rubro" style="width:268px;margin-left: 37px;"></select>
                        <span class="span1 pull-right"><input id="btnAgregarMedicamento" type="button" style="margin-right: 15px;" class="btn btn-success btn-mini pull-right" value="Agregar" /></span>
                        <span class="span1 pull-right" style="margin-left: 0px;"><input id="btnCancelarMedicamento" style="margin-right: 0px;" type="button" class="btn btn-danger btn-mini pull-right" value="Cancelar" /></span>  
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
            <div id="TablaMedicamentos" class="tabla" style="height:220px;width:100%; margin-top:-10px; font-size:11px;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Cantidad de Unidades</th>
                    <th>Nro Lote</th>
                    <th>Vencimiento</th>
                    <th>Precio Compra (x unidad)</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="height:120px;">
  <a id="btnVolver" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <a id ="btnConfirmarRemito" class="btn btn-success"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
  <%
      Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();
      if (v.PermisoSM("155")) //Si el usuario tiene este permiso muestro boton para dar de baja remito.
      { %>
          <a id ="btnBaja" class="btn btn-danger" style="display:none;"><i class=" icon-arrow-down icon-white"></i>&nbsp;Baja</a> 
      <%}%>
  <a id ="btnPrint" class="btn btn-info" style="display:none;"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</a>
</div>
</div>
      </div>
    </div>
  </div>
</div>
<!--Pie de p�gina-->
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/General.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <script src="../js/Hospitales/Compras/Compras_CargarRemito.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > Ambulatorio CABA > <strong>Ingreso de Insumos del Proveedor</strong>";
</script> 

</body>
</html>


