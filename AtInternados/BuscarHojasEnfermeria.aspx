<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarHojasEnfermeria.aspx.cs" Inherits="AtInternados_BuscarHojasEnfermeria" %>

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
   <div class="contenedor_3" style="height:500px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Buscar Hojas de Enfermería</span></div>
      <form id="frm_Main" name="frm_Main">
        <div class="">
  
          <div class="contenedor_4 pagination-centered" style="height:150px;">
          
              <div id="controltxtNHC" class="control-group" style="display:inline; margin:25px 25px 0px 10px;">
                    <label for="txtNHC" style="display:inline; margin-top:10px;">NHC: </label>
                    <input type="text" maxlength="11" id="txtNHC" name="txtNHC" placeholder="Ingrese NHC" class="input-medium" style="margin-top:10px;" />
              </div>
              <div id="controlcbo_Servicios" class="control-group" style="margin:0px 25px 0px 10px;">
                <label for="cbo_Servicios" style="display:inline;">Servicio:</label>
                    <select id="cbo_Servicios">
                    <option value="0">Todos</option>
                    </select>
              </div>
               <div id="controltxtNombre" class="control-group" style="margin:0px 25px 25px 10px;">
                    <label for="txtNombre" style="display:inline; margin-top:10px;">Paciente: </label>
                    <input type="text" id="txtNombre" name="txtNombre" maxlength="30" placeholder="Ingrese Nombre" class="input-large" style="margin-top:10px;" />
              </div>
          
          </div>
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:150px;">
              
               <div id="controldesde" class="control-group" style="display:inline; margin:10px 10px 0px 10px;"><label for="desde" style="display:inline;">Desde: </label><input type="text" id="desde" name="desde" class="input-small" style="margin-top:10px;" /></div><br />
               <div id="controlhasta" class="control-group" style="display:inline; margin:0px 10px 10px 10px;"><label for="hasta" style="display:inline;">Hasta: </label><input type="text" id="hasta" name="hasta" class="input-small" style="margin-top:10px;" /></div>
                <div class="combos" style="margin-left:10px;"><label for="cbo_Medicos" style="display:inline;">Médicos:</label>
                    <select id="cbo_Medicos">
                    <option value="0">Todos</option>
                    </select>
                </div>
          </div>

          </form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaPedidos_div" class="tabla" style="height:260px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Paciente</th>
                    <th>NHC</th>
                    <th>Médico</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="padding:5px;">
<button id = "btnBuscar" class="btn btn-info" style="margin-bottom:5px;"><i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
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
    <script src="../js/Hospitales/AtInternados/BuscarHojasEnfermeria.js" type="text/javascript"></script>
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



    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Buscar Hojas de Enfermería</strong>";

</script> 

</body>
</html>


