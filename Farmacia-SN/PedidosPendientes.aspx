<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PedidosPendientes.aspx.cs" Inherits="Farmacia_PedidosPendientes" %>


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
   <div class="contenedor_3" style="height:530px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Pedidos Pendientes</span></div>
      <form id="frm_Main" name="frm_Main">
        <div class="">
  
          <div class="contenedor_4 pagination-centered" style="height:180px">
          
              <div id="controlrdPacientes" class="control-group" style="margin:10px 10px 0px 10px;">
                    <label for="rdPacientes" style=" margin-top:10px;">Pacientes: </label>
                    <input type="radio" checked="checked" id="rdPacientes" name="Opcion" class="input-medium" style="margin-top:10px;" />
                    <div class="box_informativo_a pull-right"><div style="padding-top:3px"><strong id="TotalPacientes">-</strong></div></div>
              </div>
              <div id="controlrdIM" class="control-group" style="margin:0px 10px 0px 10px;">
                    <label for="rdIM" style="margin-top:10px;">Indicaciones Medicas: </label>
                    <input type="radio" id="rdIM" name="Opcion" class="input-medium" style="margin-top:10px;" />
                    <div class="box_informativo_a pull-right"><div style="padding-top:3px"><strong id="TotalIM">-</strong></div></div>
              </div>
               <div id="controlrdServicio" class="control-group" style="margin:0px 10px 10px 10px;">
                    <label for="rdServicio" style="margin-top:10px;">Servicio: </label>
                    <input type="radio" id="rdServicio" name="Opcion" class="input-medium" style="margin-top:10px;" />
                    <div class="box_informativo_a pull-right"><div style="padding-top:3px"><strong id="TotalServicio">-</strong></div></div>
              </div>
          
          </div>
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:180px;">
              
               <div id="controldesde" class="control-group" style="display:inline; margin:10px 10px 0px 10px;"><label for="desde" style="display:inline;">Desde: </label><input type="text" id="desde" name="desde" class="input-small" style="margin-top:10px;" /></div><br />
               <div id="controlhasta" class="control-group" style="display:inline; margin:0px 10px 10px 10px;"><label for="hasta" style="display:inline;">Hasta: </label><input type="text" id="hasta" name="hasta" class="input-small" style="margin-top:10px;" /></div>
         
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
            <div id="TablaPedidos_div" class="tabla" style="height:250px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Nro Pedido</th>
                    <th>Paciente</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<button id = "btnActualizar" class="btn btn-info pull-right" style="margin:5px;"><i class=" icon-search icon-white"></i>&nbsp;Ver Todos</button>
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
    <script src="../js/Hospitales/Farmacia/PedidosPendientes.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
        <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Pedidos Pendientes</strong>";

</script> 

</body>
</html>

