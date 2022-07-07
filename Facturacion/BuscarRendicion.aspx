<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarRendicion.aspx.cs" Inherits="Facturacion_BuscarRendicion" %>

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
      <span>Buscar Rendiciones</span></div>
      <form id="frm_Main" name="frm_Main">
  
 <div class="contenedor_4 pagination-centered" style="height:170px; margin-top:5px; margin-left:10px;">
         <div class="row" style="margin-left:5px;">
               <div id="controltxtRendicion" class="span5 form">
                    <label for="txtRendicion" style="display:inline; margin-top:10px;">Nro. Rendicion: </label>
                    <input type="text" id="txtRendicion" name="txtRendicion" class="input-small form" style="margin-top:10px;" />
              </div>
        </div> 
          
          <div class="row" style="margin-left:5px; display:none;">
              <div id="controlcbo_Seccional" class="span5">
                    <label for="cbo_Seccional" style="display:inline; margin-top:10px;">Seccional: </label>
                    <select id="cbo_Seccional" name="cbo_Seccional" class="input-large" style="margin-top:10px;">
                    <option value="0"></option>
                    </select>
              </div>
        </div>
        <div class="row" style="margin-left:5px;">
                 <div id="controlcbo_Institucion" class="span5">
                    <label for="cbo_Institucion" style="display:inline; margin-top:10px;">OS: </label>
                    <select id="cbo_Institucion" name="cbo_Institucion" class="input-large" style="margin-top:10px;width:300px;">
                    
                    </select>
              </div>
        </div>
          <div class="row" style="margin-left:5px;">
                 <div id="controlcbo_Centro" class="span5">
                    <label for="cbo_Centro" style="display:inline; margin-top:10px;">Centro: </label>
                    <select id="cbo_Centro" name="cbo_Centro" class="input-large" style="margin-top:10px; width:280px;">
                    
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
          <div class="contenedor_4 pagination-centered" style="height:170px; margin-top:5px; margin-left:10px;">
              <span class="box_informativo_a">Período de la Rendición</span>
              <div class="row" style="margin-left:5px;">
               <div id="controltxtAnioDesde" class="span1">
                    <label for="txtAnioDesde" style="display:inline; margin-top:10px;">Año D</label>
                    <input type="text" name="txtAnioDesde" id="txtAnioDesde" class="input-mini" maxlength="4" style="width:50px;" />
              </div>
                 <div id="controltxtMesDesde" class="span2">
                    <label for="txtMesDesde" style="display:inline; margin-top:10px;">Mes D</label>
                    <select name="txtMesDesde" id="txtMesDesde" class="input-medium">
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
              </div>
            </div>

            <div class="row" style="margin-left:5px;">
               <div id="controltxtAnioHasta" class="span1">
                    <label for="txtAnioHasta" style="display:inline; margin-top:10px;">Año H</label>
                    <input type="text" name="txtAnioHasta" id="txtAnioHasta" class="input-mini" maxlength="4" style="width:50px;" />
              </div>
                 <div id="controltxtMesHasta" class="span2">
                    <label for="txtMesHasta" style="display:inline; margin-top:10px;">Mes H</label>
                    <select name="txtMesHasta" id="txtMesHasta" class="input-medium">
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
              </div>
            </div>

                 <div class="row" style="margin-left:5px;">
                    <div class="span2">
                        <div id="controlrdAmbulatorio" class="control-group">
                             <input id="rdAmbulatorio" name="grupo1" type="radio" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="rdAmbulatorio" style="display:inline; margin-left:5px; margin-right:5px;">Ambulatorio</label>
                        </div>
                    </div>
                        <div class="span2">
                            <div id="controlrdInternacion" class="control-group">
                                    <input id="rdInternacion" name="grupo1" type="radio" class="input-xlarge" checked="checked" style="vertical-align:middle;" /><label for="rdInternacion" style="display:inline; margin-left:5px; margin-right:5px;">Internación</label>
                                </div>
                        </div>
                    </div>
         


 </div>

</form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:15px 15px 0px 15px;">
            
            <div class="clearfix"></div>
              <div id="cargando" style="text-align:center; display:none;">
                <br /><br /><br />
                <img src="../img/Espere.gif" /><br />Cargando...
              </div>
            <div id="TablaPartes_div" class="tabla" style="height:280px;width:100%; margin-top:-10px;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Nro Rendición</th>
                    <th>F.Facturación</th>
                    <th>Año</th>
                    <th>Mes</th>
                    <th>Seccional/Institución</th>
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
            <script src="../js/Hospitales/Facturacion/BuscarRendicion.js" type="text/javascript"></script>


 

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Buscar Rendiciones</strong>";

</script> 

</body>
</html>



