<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MostrarRemitos_Internacion.aspx.cs" Inherits="Compras_MostrarRemitos_Internacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px; width:1300px; margin-left:5%">
  <div class="contenedor_1" style="width:1230px; height:470px">
   <div class="contenedor_3" style="height:420px;width:1200px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Buscar Remitos/Facturas</span></div>
      <form id="frm_Main" name="frm_Main">
          <div class="contenedor_4 pagination-centered" style="height:160px;">
               
               <div id="controltxtLetra" class="control-group" style="display:inline; margin:10px 10px 0px 10px">
                <label for="txtLetra" style="display:inline;">Nro. Remito: </label>
                <input type="text" id="txtLetra" maxlength="1" name="txtLetra" class="input-mini" style="margin-top:10px; margin-left:27px; width:40px" value="R"/>
                <input type="text" id="txtSucursal" maxlength="4" name="txtSucursal" class="input-mini" style="margin-top:10px; width:40px" />
                <input type="text" id="txtNumero" maxlength="8" name="txtNumero" class="input-small" style="margin-top:10px; width:66px" />
               </div><br />
                <div id="controlFactura" class="control-group" style="display:inline; margin:10px 10px 0px 10px">
                    <label for="txtLetra_Fact" style="display:inline;">Nro. Factura: </label>
                    <input type="text" id="txtLetra_Fact" maxlength="1" name="txtLetra" class="input-mini" style="margin-top:10px; margin-left:22px; width:40px" />
                    <input type="text" id="txtSucursal_Fact" maxlength="4" name="txtSucursal" class="input-mini" style="margin-top:10px; width:40px" />
                    <input type="text" id="txtNumero_Fact" maxlength="8" name="txtNumero" class="input-small" style="margin-top:10px; width:66px" />
               </div><br />

                    <div id="Div1" class="control-group" style="display:inline; margin:10px 10px 0px 10px">
                    <label for="txtLetra_Fact" style="display:inline;">Nro. Orden de compra: </label>
                    <input type="text" id="Text1" maxlength="1" name="txtLetra" class="input-mini" style="margin-top:10px; margin-left:22px; width:40px; display:none" />
                    <input type="text" id="Text2" maxlength="4" name="txtSucursal" class="input-mini" style="margin-top:10px; width:40px; display:none" />
                    <input type="text" id="txtOrdenCompra" maxlength="8" name="txtNumero" class="input-small" style="margin-top:10px; width:140px" />
               </div>
          </div>

          <div class="contenedor_4 pagination-centered" style="height:160px;">
             
               <div id="controlcbo_Proveedor" class="control-group" style="margin-top:10px; margin-left:10px;" >
                   Proveedor: 
                   <select id="cbo_Proveedor" style="margin-left: 10px;width: 284px;">
                    <option value="0">Todos</option>
                   </select>
               </div>
          
         

               <div id="controltxtFechaIni" class="control-group" style="display:inline;margin-left:10px;">
                <label for="txtFechaIni" style="display:inline;">Fecha Inicio: </label><input type="text" id="txtFechaIni" name="txtFechaIni" class="input-small" style="margin-top:10px;" />
               </div>
                
              <div id="controltxtFechaFin" class="control-group" style="display:inline;">
                <label for="txtFechaFin" style="display:inline;">Fecha Fin: </label><input type="text" id="txtFechaFin" name="txtFechaFin" class="input-small" style="margin-top:10px;" />
               </div>
          </div>

          </form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
                <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>    
            <div id="TablaRemitos_div" class="tabla" style="height:190px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                  </tr>
                </thead>

              </table>
            </div>

        <div class="clearfix"></div>
      </div>
      <div class="pie_gris">
      <div class="box_informativo_a pull-left"><div style="padding-top:3px"><strong id="Total">Importe Total: $ 0</strong></div> </div>
    <div class="pull-right" style="height:90px;">
        <button class="btn btn-info impresion" data-tipo="0" ><i class=" icon-file icon-white"></i>&nbsp;Excel</button>
        <button class="btn btn-info impresion" data-tipo="1" ><i class="icon-file icon-white"></i>&nbsp;Pdf</button>
        <button id="btnBuscar" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
        <button id="btnCargarNuevo" class="btn btn-warning"><i class="icon-ok icon-white"></i>&nbsp;Cargar Remito</button>
    </div>
</div>
    </div>
  </div>
<!--Pie de p�gina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/jQuery_InputMask.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Compras/MostrarRemitos_Internacion.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/simple.money.format.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > Carga de Remitos / Facturas de Proveedores > <strong>Buscar Remitos/Facturas</strong>";
</script> 
</body>
</html>
