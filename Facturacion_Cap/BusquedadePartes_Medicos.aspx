<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BusquedadePartes_Medicos.aspx.cs" Inherits="Facturacion_Cap_BusquedadePartes_Medicos" %>

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
      <span>Buscar Partes de Honorarios</span></div>
      <form id="frm_Main" name="frm_Main">
  
          <div class="contenedor_4 pagination-centered" style="height:210px; margin-top:5px; margin-left:10px;">
                      
         <div class="row" style="margin-left:5px;">
              <div id="controlcbo_Especialidad" class="span5">
                    <label for="cbo_Especialidad" style="display:inline; margin-top:10px;">Especialidad: </label>
                    <select id="cbo_Especialidad" name="cbo_Especialidad" class="input-large" style="margin-top:10px;">
                    <option value="0"></option>
                    </select>
              </div>
        </div>
        <div class="row" style="margin-left:5px;">
                 <div id="controlcbo_Medico" class="span5">
                    <label for="cbo_Medico" style="display:inline; margin-top:10px;">Medico: </label>
                    <select id="cbo_Medico" name="cbo_Medico" class="input-large" style="margin-top:10px;">
                    <option value="0"></option>
                    </select>
              </div>
        </div>

        <div class="row" style="margin-left:5px;">
               <div id="controltxtParte" class="span2 form">
                    <label for="txtParte" style="display:inline; margin-top:10px;">Parte: </label>
                    <input type="text" id="txtParte" name="txtParte" placeholder="Parte" maxlength="10" class="input-mini form" style="margin-top:10px;" />
              </div>
        </div>

  </div>
          <div class="contenedor_4 pagination-centered" style="height:210px; margin-top:5px; margin-left:10px;">
        
        <span class="box_informativo_a">Rango de Fechas del Parte</span>
        <div class="row" style="margin-left:5px;">
                 
            <div id="controltxtDesdeParte" class="span2 form" style="width:160px;">
                    <label for="txtDesdeParte" style="display:inline; margin-top:10px;">Desde: </label>
                    <input type="text" id="txtDesdeParte" name="txtDesdeParte" class="input-mini form" style="margin-top:10px; width:90px;">
              </div>
            <div id="controltxtHastaParte" class="span2 form" style="width:160px;">
                   <label for="txtHastaParte" style="display:inline; margin-top:10px;">Hasta: </label>
                    <input type="text" id="txtHastaParte" name="txtHastaParte" class="input-mini form" style="margin-top:10px;width:90px;">
              </div>
        </div>
         
         <span class="box_informativo_a">Rango de Fechas de la Práctica/Módulo</span>
        <div class="row" style="margin-left:5px;">
                 
            <div id="controltxtDesdePrac" class="span2 form" style="width:160px;">
                    <label for="txtDesdePrac" style="display:inline; margin-top:10px;">Desde: </label>
                    <input type="text" id="txtDesdePrac" name="txtDesdePrac" class="input-mini form" style="margin-top:10px;width:90px;">
              </div>
            <div id="controltxtHastaPrac" class="span2 form" style="width:160px;">
                   <label for="txtHastaPrac" style="display:inline; margin-top:10px;">Hasta: </label>
                    <input type="text" id="txtHastaPrac" name="txtHastaPrac" class="input-mini form" style="margin-top:10px;width:90px;">
              </div>
        </div>

        <span class="box_informativo_a">Rango de Fechas de Rendición del Parte</span>
        <div class="row" style="margin-left:5px;">
                 
            <div id="controltxtDesdeRend" class="span2 form" style="width:160px;">
                    <label for="txtDesdeRend" style="display:inline; margin-top:10px;">Desde: </label>
                    <input type="text" id="txtDesdeRend" name="txtDesdeRend" class="input-mini form" style="margin-top:10px;width:90px;">
              </div>
            <div id="controltxtHastaRend" class="span2 form" style="width:160px;">
                   <label for="txtHastaRend" style="display:inline; margin-top:10px;">Hasta: </label>
                    <input type="text" id="txtHastaRend" name="txtHastaRend" class="input-mini form" style="margin-top:10px;width:90px;">
              </div>
        </div>

 </div>

</form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:15px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaPartes_div" class="tabla" style="height:250px;width:100%; margin-top:-10px;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Nro Parte</th>
                    <th>Fecha Parte</th>
                    <th>Servicio</th>
                    <th>Centro</th>
                  </tr>
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
<script src="../js/Hospitales/Facturacion_Cap/Busquedadepartes_Medicos.js" type="text/javascript"></script>


 

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Buscar Partes de Honorarios</strong>";

</script> 

</body>
</html>


