<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModulosyPracticasNoInc.aspx.cs" Inherits="Facturacion_ModulosyPracticasNoInc" %>

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
      <span>Prácticas/Módulos faltantes en un Convenio</span></div>
      <form id="frm_Main" name="frm_Main">
  
 <div class="contenedor_4 pagination-centered" style="height:120px; margin-top:5px; margin-left:10px;">          
          <div class="row" style="margin-left:5px;">
              <div id="controlcbo_Seccional" class="span5">
                    <label for="cbo_Seccional" style="display:inline; margin-top:10px;">Seccional: </label>
                    <select id="cbo_Seccional" name="cbo_Seccional" class="input-large" style="margin-top:10px;">
                    <option value="0"></option>
                    </select>
              </div>
        </div>
        <div class="row" style="margin-left:5px;">
                 <div id="controlcbo_Institucion" class="span5">
                    <label for="cbo_Institucion" style="display:inline; margin-top:10px;">Institución: </label>
                    <select id="cbo_Institucion" name="cbo_Institucion" class="input-large" style="margin-top:10px;width:300px;">
                    
                    </select>
              </div>
        </div>

    
<%--         <div class="row" style="margin-left:5px;">
               <div id="controltxtBono" class="span2">
                    <label for="txtBono" style="display:inline; margin-top:10px;">Bono: </label>
                    <input type="text" id="txtBono" name="txtBono" placeholder="Bono" maxlength="10" class="input-mini" style="margin-top:10px;" />
              </div>
        </div>    --%>
  </div>
          <div class="contenedor_4 pagination-centered" style="height:120px; margin-top:5px; margin-left:10px;">
              <span class="box_informativo_a">Rango de Fechas del Parte</span>
              <div class="row" style="margin-left:5px;">
               <div id="controltxtDesde" class="span2">
                    <label for="txtDesde" style="display:inline; margin-top:10px;">Desde</label>
                    <input type="text" name="txtDesde" id="txtDesde" class="input-mini" style="width:75px;" />
              </div>
                 <div id="controltxtHasta" class="span2">
                    <label for="txtHasta" style="display:inline; margin-top:10px;">Hasta</label>
                    <input type="text" name="txtHasta" id="txtHasta" class="input-mini" style="width:75px;" />
              </div>
            </div>

                 <div class="row" style="margin-left:5px;">
                    <div class="span2">
                        <div id="controlrdPracticas" class="control-group">
                             <input id="rdPracticas" name="grupo1" type="radio" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" checked="checked" /><label for="rdPracticas" style="display:inline; margin-left:5px; margin-right:5px;">Prácticas</label>
                        </div>
                    </div>
                        <div class="span2">
                            <div id="controlrdModulo" class="control-group">
                                    <input id="rdModulo" name="grupo1" type="radio" class="input-xlarge" style="vertical-align:middle;" /><label for="rdModulo" style="display:inline; margin-left:5px; margin-right:5px;">Módulos</label>
                                </div>
                        </div>
                    </div>
         


 </div>

</form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:15px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="tabla" class="tabla" style="height:320px;width:100%; margin-top:-10px;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Nro Parte</th>
                    <th>Fecha</th>
                    <th>NHC</th>
                    <th>Apellido</th>
                    <th>Código</th>
                    <th>Práctica</th>
                  </tr>
                  <tbody id="trx"></tbody>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="span4 pull-right">
<button id = "btnBuscar" class="btn btn-info pull-right" style="margin-left:5px;"><i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
<button id = "btnPrint" class="btn btn-info pull-right"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
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
            <script src="../js/Hospitales/Facturacion/ModulosyPracticasNoInc.js" type="text/javascript"></script>


 

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Prácticas/Módulos faltantes en un Convenio</strong>";

</script> 

</body>
</html>




