<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BusquedaCtaCte.aspx.cs" Inherits="Farmacia_BusquedaCtaCte" %>

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
   <div class="contenedor_3" style="height:520px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Movimientos de Insumos</span></div>
      <form id="frm_Main" name="frm_Main">
        <div class="">
  
          <div class="contenedor_4 pagination-centered" style="height:150px;">
          
               <div id="controlcbo_Medicamento" class="control-group" style="margin:10px 0px 10px 0px;">
                   <span class="span1" style="width:100px;"><label for="cbo_Medicamento" style="display:inline;">Insumo:</label></span>
                  <select id="cbo_Medicamento">
                    <option value="0">TODOS</option>
                  </select>
              </div>

               <div id="controlcbo_Rubro" class="control-group" style="margin:10px 0px 10px 0px;">
                   <span class="span1" style="width:100px;"> <label for="cbo_Rubro" style="display:inline;">Rubro:</label></span>
                  <select id="cbo_Rubro">
                  </select>
              </div>
              
               <div id="controlchk_Inventario" class="control-group" style="margin:10px 0px 10px 0px;">
                    <span class="span1" style="width:100px;"> <label for="chk_Inventario" style="display:inline;">Con Inventario:</label></span>
                    <input type="checkbox" id="chk_Inventario" name="chk_Inventario" />
              </div>
          </div>
           
        
          <div class="contenedor_4 pagination-centered" style="height:150px;">
              
               <div id="controldesde" class="control-group" style="margin:10px 0px 10px 0px;">
                <span class="span1" style="width:50px;"> <label for="desde" style="display:inline;">Desde: </label></span>
               <input type="text" id="desde" name="desde" class="input-small" /></div>
               <div id="controlhasta" class="control-group" style="margin:10px 0px 10px 0px;">
               <span class="span1" style="width:50px;"> <label for="hasta" style="display:inline;">Hasta: </label></span>
               <input type="text" id="hasta" name="hasta" class="input-small"/></div>
                
                
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
            <div id="TablaPedidos_div" class="tabla" style="height:290px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Insumo</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
    <div class="pull-right" style="padding:5px; height:90px;">
        <button id = "btnBuscar" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
        <button id = "btnPrint" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
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
<script src="../js/Hospitales/Farmacia/BusquedaCtaCte.js" type="text/javascript"></script>
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



    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Listado de Movimientos de Insumos</strong>";

</script> 

</body>
</html>

