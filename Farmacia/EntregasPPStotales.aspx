<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EntregasPPStotales.aspx.cs" Inherits="Farmacia_EntregasPPStotales" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:520px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Entregas por Servicio Totales</span></div>
      <form id="frm_Main" name="frm_Main">
        <div class="">
  
          <div class="contenedor_4 pagination-centered" style="height:120px;">
          
              <div id="controltxtNroPed" class="control-group" style="display:none">
                    <label for="txtNroPed" style="display:inline; margin-top:10px; margin-left:5px;">Nro de Pedido: </label>
                    <input type="text" id="txtNroPed" name="txtNroPed" placeholder="Ingrese Nro de Pedido" class="input-medium" style="margin-top:10px;width:205px;" />
              </div>
               <div id="controlcbo_Servicio" class="control-group" style="width:300px; margin-left:40px; margin-top:40px">
                    <label for="cbo_Servicio" style="display:inline; margin-top:10px;margin-left:5px;">Servicio: </label>
                    <select id="cbo_Servicio">
                    <option id=""></option>
                    </select>
              </div>
          
          </div>
           
        
          <div class="contenedor_4 pagination-centered" style="height:120px">
               <div id="controldesde" class="control-group" style="display:inline; margin:40px 0px 10px 10px; float:left"><label for="desde" style="display:inline;">Desde: </label><input type="text" id="desde" name="desde" class="input-small desde1" style="margin-top:5px; text-align:center" /></div>
               <div id="controlhasta" class="control-group" style="display:inline; margin:40px 0px 0px 10px; float:right; width:183px"><label for="hasta" style="display:inline;">Hasta: </label><input type="text" id="hasta" name="hasta" class="input-small hasta1" style="margin-top:5px; margin-left:5px; text-align:center" /></div>
         
          </div>
            </div>
          </form>
          <div class="clearfix"></div>
<%--                 <div style="display:block; margin-left:20px;">
                            <div id="btn_Todos" class="reff reff_0 reff_activo">Todos</div>
                            <div id="btn_Libres" class="reff Turnos_Libres">Pendientes</div>
                            <div id="btn_SobreT" class="reff Turnos_Ocupados">Entregados</div>
        </div> --%>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px">
            
            <div class="clearfix"></div>
              <div id="cargando" style="text-align:center; display:none">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Buscando...
                </div>   

                <div class="clearfix"></div>
                    <div id="sinResultados" style="text-align:center; display:none">
                    <br /><br />
                   <div style="font-size:x-large"><b>NO SE ENCONTRARON RESULTADOS EN EL RANGO SOLICITADO</b></div>
                </div> 
            <div id="TablaPedidos_div" class="tabla" style="height:315px;width:101%">
              <table class="table table-hover table-condensed">
     <%--           <thead>					
                  <tr>
                    <th></th>
                    <th>Nro Pedido</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Usuario</th>
                  </tr>
                </thead>--%>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
    <div class="pull-right">
        <a id = "btnImprimir" class="btn "><i class=" icon-print icon-black"></i>&nbsp;Imprimir</a>
        <a id = "btnBuscar" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar</a>
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
<script src="../js/Hospitales/Farmacia/EntregasPPStotales.js" type="text/javascript"></script>  
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



//    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Entregas por Servicio Totales</strong>";

</script> 

</body>
</html>
