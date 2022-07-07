<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargadeTurnos.aspx.cs" Inherits="Quirofano_CargadeTurnos" %>

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

<style>
.Turnos_Ocupados {  background-color: #58FA58;}
.Turnos_Cancelado { background-color: #FA5858;}
.Turnos_Urgencias {background-color: #F4FA58;}
.Turnos_Realizadas {background-color: #FFFFFF;}
</style>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:530px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Parte Endoscopía</span></div>
      <form id="frm_Main" name="frm_Main">
        <div class="">
  
          <div class="contenedor_4 pagination-centered" style="height:60px; margin-bottom:10px;">          
             <div id="controlfecha" class="control-group" style="display:inline; margin:10px 10px 0px 10px;">
                <label for="fecha" style="display:inline;">Fecha: </label><input type="text" id="fecha" name="fecha" class="input-small" style="margin-top:10px;" />                                

                

             </div>
             
          </div>
       <%--   manuel--%>
           <div class="contenedor_4 pagination-centered" style="height:60px; margin-bottom:10px; background-color:White; margin-left:60px; margin-right:0px">    
           <div id="btnPDF" class="btn btn-info pull-right" style="margin-top:8%"><i class=" icon-print icon-white"></i>&nbsp;Imprimir Control</div>
           </div>
         <%--  manuel--%>
          </div>
          </form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaCirugias" class="tabla" style="height:390px;width:100%; margin-top:10px; overflow:auto;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th>Hora</th>
                    <th>Sala</th>
                    <th>Cama</th>
                    <th>Paciente</th>
                    <th>NHC</th>
                    <th>Diagnóstico</th>                    
                    <th>Procedimiento</th>
                    <th>Endoscopista</th>                                                            
                    <th>Anestesia</th>   
                    <th>Anestesista</th>                       
                    <th>Rx</th>   
                    <th>AN/P</th>   
                    <th>Mon</th>   
                    <th>Seccional/OS</th>
                    <th>Especialidad</th>
                    <th>Observaciones</th>                    
                    <th>Suspendida&nbsp;por</th>
                </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>



<div class="pie_gris">
<a id = "btnImprimir_polisognografia" class="btn btn-info pull-right"><i class=" icon-print icon-white"></i>&nbsp;Polisomnografía</a>
<a id = "btnImprimir" class="btn btn-info pull-right"><i class=" icon-print icon-white"></i>&nbsp;Endoscopía</a>

<a id = "btnPlanificar" class="btn btn-info pull-right"><i class=" icon-ok icon-white"></i>&nbsp;Planificar</a>


<div id="btn_todos" class="pull-left reff reff_activo" style="margin-left:10px; background:#848484">Todas</div>
<div id="btn_pedidos" class="pull-left reff Turnos_Ocupados">Reservado</div>
<div id="btn_urgencias" class="pull-left reff Turnos_Urgencias">Urgencia</div>
<div id="btn_cancelados" class="pull-left reff Turnos_Cancelado">Suspendido</div>
<div id="btn_realizadas" class="pull-left reff Turnos_Realizadas">Realizado</div>

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
<script src="../js/Hospitales/Endoscopia/CargadeTurnos.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Endoscopía > <strong>Turnos</strong>";

</script> 

</body>
</html>


