<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargarPPSP.aspx.cs" Inherits="Farmacia_CargarPPSP" %>


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
                <a id="btnPedidos" class="btn btn-warning">Buscar Pedidos</a>  
          </div>
        </div>

    </div>
    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona">
        <div class="datos_resumen_paciente">
        <div>Nro. Pedido: <strong><span id="CargadoPedido">Provisorio</span></strong></div>
          <div style="display:none;">Numero: <strong><span id="CargadoNumero"></span></strong></div>
          <span>Fecha: <strong><span id="CargadoFecha"></span></strong></span>&nbsp;&nbsp;&nbsp;
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos del Pedido</span></div>
      
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:85px;">
            
            
            <div class="combos" style="margin-left:10px; display:none;">
                    <label for="cbo_Monodroga" style="display:inline; width:80px;" class="span1">Monodroga:</label>
                    <span id="cbo_Monodroga_val" style="display:none;">0</span>
                      <select id="cbo_Monodroga" style="margin-top:-5px;">
                      </select>
            </div>

             <div class="combos" style="margin-left:10px;">
                <label for="cbo_Medicamento" style="display:inline;width:80px;" class="span1">Insumo:</label>
                    <input type="text" id="cbo_Medicamento" data-provide="typeahead" autocomplete="off" style="width:206px;margin-top:-5px;" disabled="disabled"/>
             </div>
            
            <div class="combos" style="margin-left:10px;">
             <label for="cbo_Deposito" style="display:inline;width:80px; display:none" class="span1">Deposito:</label>   
                <select id="cbo_Deposito" style="margin-top:-5px; display:none">
                </select>

                <label for="cbo_Rubro" style="display:inline;width:80px;" class="span1">Rubro:</label>   
                <select id="cbo_Rubro" style="margin-top:-5px;">

                </select>
            </div>
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:85px;">
              <form id="frm_Cantidad" class="form-inline" style="margin:10px 25px 0px 25px;">
                    <div id="Medicamento_val" style="display:none;">0</div>
                    <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
                       <div id="controlcantidad" class="control-group" style="display:none;"><label for="cantidad">Cantidad: </label><input type="text" id="cantidad" name="cantidad" style="margin-top:-5px; width:40px;" class="input-mini numero" maxlength="3" /></div>
                       
<%--                       
                       <label for="stock_medicamento" style="display:none;">Stock Actual: </label><div id="stock_medicamento" style="display:inline;display:none;"></div><br /><div id="precio" style="display: none;"></div>--%>

                      <label for="stock_minimo" >Stock Minimo: </label><div style="display:inline"><input id="stock_minimo" type="text" class="input-mini numero2" maxlength="4" style="width:44px" disabled="disabled"/></div><br />

               <input id="btnAgregarMedicamento" type="button" class="btn btn-success pull-right" value="Agregar"  style="margin-right:50px; margin-top:10px" disabled="disabled"/>
               <input id="btnCancelarMedicamento" type="button" class="btn btn-danger pull-right" value="Cancelar" style="margin-left:10px; margin-right:20px; margin-top:10px" disabled="disabled"/>

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

                            <div class="modal-backdrop" style="width:100%; height:25px; background-position:center; position:inherit; background-color:Black; border-top-left-radius:10px; border-top-right-radius:10px">
            <label class="check inline" style="width:12%"></label>
            <label class="check inline" style="width:61%"><strong style="color:White; text-align:center">Insumo</strong></label><label class="check inline" style="width:9%; text-align:left"><strong style="color:White">Pedido</strong></label><label class="check inline" style="width:8%; text-align:left"><strong style="color:White">Stock Act</strong></label><label class="check inline" style="width:8%; text-align:left"><strong style="color:White">Stock Min</strong></label>
            </div>

            <div id="TablaMedicamentos" class="tabla" style="height:214px;width:100%; margin-top:0px; border-top-left-radius:0px; border-top-right-radius:0px">
              <table class="table table-hover table-condensed">

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="padding:5px; height:120px; margin-top:-5px;">
  <a href="CargarPPSP.aspx" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <button id ="btnImprimir" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
   <button id ="btnImprimir2" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
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
<script src="../js/Hospitales/Farmacia/CargarPPSP.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>


<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        if ($("#cbo_Servicio").val() == 120000088) { alert("Seleccione un Servicio."); return false; }
        $("#inicio").hide();
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() - $('.pie').height() - $('#hastaaqui').height()
            ));

        $("#CargadoServicio").html($("#cbo_Servicio :selected").text());
        if ($("#CargadoServicio").html() == "GUARDIA" && $("#CargadoPedido").html() == "Provisorio") CargarPlantilla();
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Pedidos Predeterminados por Servicio</strong>";

</script> 

</body>
</html>


