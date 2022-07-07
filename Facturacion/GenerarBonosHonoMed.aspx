<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GenerarBonosHonoMed.aspx.cs" Inherits="Facturacion_GenerarBonosHonoMed" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:490px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Generar Bonos de Honorarios de Médicos</span></div>
    

          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:15px 15px 0px 15px;">
            
            <div class="clearfix"></div>
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

            <div id="TablaPartes_div" class="tabla" style="height:350px;width:100%;">
              <div id="cargando" style="text-align:center; display:none;">
                <br /><br /><br />
                <img src="../img/Espere.gif" /><br />Cargando...
              </div>
              <table id="tabla" class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th style="display:none;"><input type='checkbox' id='chkgral' onchange='toggle_checks(this)' rel='gral'></th>         
                    <th>Nro. Rendición</th>
                    <th>Fecha Parte</th>
                    <th>NHC</th>
                    <th>Afiliado</th>
                    <th>Obra Social</th>
                    <th>Fecha Impreso</th>
                  </tr>
                  <tbody id="trx"></tbody>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="span6 pull-right">
<button id = "btnGenerar" class="btn btn-info" style="float:right; margin-right:5px; display:none;"><i class=" icon-print icon-white"></i>&nbsp;Generar</button>
<button id = "btnBuscar" class="btn btn-info" style="float:right; margin-left:5px; margin-right:10px;"><i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
</div>
</div>
      </div>
    </div>

   <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:600px;">
      <div class="modal-header">
       
        <h3 id="myModalLabel"></h3>
      </div>
      <div class="modal-body" style="margin-left:10px; margin-right:10px;">
            <label for="txtNroOrden">Nro. Orden Internación:</label>
            <input type="text" id="txtNroOrden" placeholder="Ingrese Nro. Orden Internación" />
            
        </div>
       <div class="modal-footer">
        <button id="btnGuardarOrden" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
       </div>
   </div>

  </div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Facturacion/GenerarBonosHonoMed.js" type="text/javascript"></script>

 

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Generar Bonos de Honorarios de Médicos</strong>";

</script> 

</body>
</html>



