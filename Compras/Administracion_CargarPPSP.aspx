<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Administracion_CargarPPSP.aspx.cs" Inherits="Compras_Administracion_CargarPPSP" %>

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
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
  <div id="inicio">
  <div id="cargando2" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>
    <div id="cont_datospac" class="contenedor_2"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del Pedido</span></div>
      <form class="form-horizontal" >
      <div class="control-group" style="display:none;">
          <label class="control-label" for="Numero">Numero</label>
          <div class="controls">
            <label style="font-weight:bold;">Provisorio</label>
        </div>
        </div>
         <div class="control-group">
          <label class="control-label" for="cbo_Servicio">Servicio</label>
          <div class="controls">
            <select id="cbo_Servicio"></select>
        </div>
        </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a id="desdeaqui" class="btn btn-info">Siguiente</a>
          </div>
        </div>

    </div>
    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:20px;">
        
        <div class="datos_persona">
        <div class="datos_resumen_paciente">
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;">
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:50px;">
           

             <div class="combos" style="margin-left:10px;">
                <label for="cbo_Medicamento" style="display:inline;width:50px;" class="span1">Insumo:</label>
                    <input type="text" id="cbo_Medicamento" data-provide="typeahead" autocomplete="off" style="width:285px;margin-top:-5px;" disabled="disabled"/>
             </div>
            
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:50px;">
              <form id="frm_Cantidad" class="form-inline" style="margin:10px 25px 0px 25px;">
                    <div id="Medicamento_val" style="display:none;">0</div>
                    <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
                        <label for="txt_Cantidad">Cantidad: </label><div style="display:inline"><input id="txt_Cantidad" type="text" class="input-mini numero2" maxlength="4" style="width:44px"/></div><br />
                        <input id="btnAgregarMedicamento" type="button" class="btn btn-success pull-right" value="Agregar"  style="margin-right:100px;margin-top: -30px;"/>
                        <input id="btnCancelarMedicamento" type="button" class="btn btn-danger pull-right" value="Cancelar" style="margin-left:0px; margin-right:0px; margin-top:-30px;"/>
              </form>
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
              <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>
            <div id="TablaMedicamentos" class="tabla" style="height:310px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Pedido</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="padding:5px; height:120px; margin-top:-5px;">
  <a id="btnVolver" class="btn"><i class="icon-arrow-left"></i>&nbsp;Volver</a>
  <button id ="btnImprimir" class="btn" style="display:none;"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
  <button id ="btnConfirmarPedido" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
</div>
</div>
      </div>
    </div>
  </div>
</div>
<!--Pie de p�gina-->
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/Hospitales/Compras/Administracion_CargarPPSP.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > Administración > <strong>Plantilla predeterminada para Pedido a Compras</strong>";
</script> 
</body>
</html>


