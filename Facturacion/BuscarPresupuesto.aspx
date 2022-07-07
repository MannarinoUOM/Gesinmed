<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarPresupuesto.aspx.cs" Inherits="Facturacion_BuscarPresupuesto" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.error
{
    color:Red;
    }

</style>
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:530px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Buscar Presupuestos</span></div>
      <form id="frm_Main" name="frm_Main">
  
          <div class="contenedor_4 pagination-centered" style="height:150px; margin-top:5px; margin-left:10px;">
          
        <div class="row" style="margin-left:5px;">
               <div id="controltxtNroPresu" class="span5 form">
                    <label for="txtNroPresu" style="display:inline; margin-top:10px;">Nro. Presupuesto: </label>
                    <input type="text" id="txtNroPresu" name="txtNroPresu" placeholder="Nro Presupuesto" class="input-medium form" style="margin-top:10px;" />
              </div>
        </div> 
          
          <div class="row" style="margin-left:5px;">
              <div id="controlcbo_Seccional" class="span5">
                    <label for="cbo_Seccional" style="display:inline; margin-top:10px;">Seccional: </label>
                    <select id="cbo_Seccional" name="cbo_Seccional" class="input-large" style="margin-top:10px;">
                    <option value="0"></option>
                    </select>
              </div>
        </div>
     

  </div>
          <div class="contenedor_4 pagination-centered" style="height:150px; margin-top:5px; margin-left:10px;">
            <div class="row" style="margin-left:5px;">
                 <div id="controlcbo_Institucion" class="span5">
                    <label for="cbo_Institucion" style="display:inline; margin-top:10px;">Institución: </label>
                    <select id="cbo_Institucion" name="cbo_Institucion" class="input-large" style="margin-top:10px;">
                    
                    </select>
              </div>
        </div>
              
        <span class="box_informativo_a">Rango de Fechas del Presupuesto</span>
        <div class="row" style="margin-left:5px;">
                 
            <div id="controltxtDesde" class="span2 form" style="width:160px;">
                    <label for="txtDesdeParte" style="display:inline; margin-top:10px;">Desde: </label>
                    <input type="text" id="txtDesde" name="txtDesde" class="input-mini form" style="margin-top:10px; width:90px;">
              </div>
            <div id="controltxtHasta" class="span2 form" style="width:160px;">
                   <label for="txtHasta" style="display:inline; margin-top:10px;">Hasta: </label>
                    <input type="text" id="txtHasta" name="txtHasta" class="input-mini form" style="margin-top:10px;width:90px;">
              </div>
        </div>
         
 </div>

</form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:15px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaPartes_div" class="tabla" style="height:300px;width:100%; margin-top:-10px;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Nro Presupuesto</th>
                    <th>Fecha</th>
                    <th>Afiliado</th>
                    <th>Seccional</th>
                  </tr>
                   <tbody id="trx"></tbody>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="span2 pull-right">
<button id = "btnBuscar" class="btn btn-info pull-right"><i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
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
        <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
        <script src="../js/General.js" type="text/javascript"></script>
            <script src="../js/Hospitales/Facturacion/BuscarPresupuesto.js" type="text/javascript"></script>


 

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Buscar Presupuestos</strong>";

</script> 

</body>
</html>



