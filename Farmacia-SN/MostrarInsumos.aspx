<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MostrarInsumos.aspx.cs" Inherits="Farmacia_MostrarInsumos" %>


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

<div class="container" style="padding-top:30px; width:1000px;">
  <div class="contenedor_1" style="width:1000px;">
   <div class="contenedor_3" style="height:530px;width:970px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Buscar Insumos</span></div>
    
          <div class="contenedor_4 pagination-centered" style="height:110px;">
               <div id="controlmedicamento" class="control-group" style="display:inline; margin:10px 10px 0px 10px;"><label for="medicamento" style="display:inline;">Insumo: </label><input type="text" id="medicamento" name="medicamento" class="input-xlarge" style="margin-top:10px;" /></div>
          </div>

          <div class="contenedor_4 pagination-centered" style="height:110px;">
              
               <div id="controlcbo_Rubros" class="control-group" style="display:inline;">
                
                    <div class="combos" style="margin-left:10px;">
                    <span class="span1" style="width:100px;"><label for="cbo_Rubros" style="display:inline;">Rubros: </label></span>
                    <select id="cbo_Rubros">
                       
                    </select>
            
                    </div>
               </div>

               <div id="controlcbo_Presentacion" class="control-group" style="display:inline;">
                
                    <div class="combos" style="margin-left:10px;">
                    <span class="span1" style="width:100px;"><label for="cbo_Presentacion" style="display:inline;">Presentación: </label></span>
                    <select id="cbo_Presentacion">
                       
                    </select>
            
                    </div>
               </div>
         
          </div>

     
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
               <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando Insumos...
                </div>    
            <div id="TablaMedicamentos_div" class="tabla" style="height:342px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th>Insumo</th>
                    <th>Laboratorio</th>
                    <th>Gramaje</th>
                    <th>Unidad</th>
                    <th>Presentación</th>
                    <th>Rubro</th>
                    <th>Stock Minimo</th>
                    <th>Precio Facturado</th>
                    <th>Se Factura</th>
                    <th>Baja</th>
                  </tr>
                <tbody id="TablaInsumos">

                </tbody>
                </thead>
              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="padding:5px; height:90px;">
<button id = "btnBuscar" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
<button id = "btnAlta" class="btn btn-warning"><i class="icon-ok icon-white"></i>&nbsp;Alta Insumo</button>
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
<script src="../js/Hospitales/Farmacia/MostrarInsumo.js" type="text/javascript"></script>
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



    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Alta, Modificación y Eliminación de Insumos</strong>";

</script> 

</body>
</html>


