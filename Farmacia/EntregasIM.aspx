<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EntregasIM.aspx.cs" Inherits="Farmacia_EntregasIM" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1" style="height:500px;">
   <div class="contenedor_3" style="height:450px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Entregas por Indicación Médica</span></div>
      <form id="frm_Main" name="frm_Main">
        <div class="">
  
          <div class="contenedor_4 pagination-centered" style="height:150px;">
          
              <div id="controltxtNHC" class="control-group" style="display:inline; margin:25px 25px 0px 25px;">
                    <label for="txtNHC" style="display:inline; margin-top:10px;">Nro. HC: </label>
                    <input type="text" id="txtNHC" name="txtNHC" placeholder="Ingrese Nro. HC" class="input-medium" style="margin-top:10px; margin-left:12px;width:236px" />
              </div>
              <div id="controltxtNroPed" class="control-group" style="margin:0px 25px 0px 25px;">
                    <label for="txtNroPed" style="display:inline; margin-top:10px;">Nro de IM: </label>
                    <input type="text" id="txtNroPed" name="txtNroPed" placeholder="Ingrese Nro de IM" class="input-medium" style="margin-top:8px; margin-bottom:16px;width:235px; margin-left:0px;" />
              </div>
               <div id="controlcbo_Servicio" class="control-group" style="margin:0px 25px 25px 25px">
                    <label for="cbo_Servicio" style="display:inline; margin-top:10px;">Servicio: </label>
                    <select id="cbo_Servicio" style="margin-left:13px; width:250px">
                    <option id=""></option>
                    </select>
              </div>
          
          </div>
           
        
          <div class="contenedor_4 pagination-centered" style="height:150px;">
              
               <div id="controldesde" class="control-group" style="display:inline; margin:10px 10px 0px 10px;"><label for="desde" style="display:inline;">Desde: </label><input type="text" id="desde" name="desde" class="input-small" style="margin-top:10px;" /></div><br />
               <div id="controlhasta" class="control-group" style="display:inline; margin:0px 10px 10px 10px;"><label for="hasta" style="display:inline;">Hasta: </label><input type="text" id="hasta" name="hasta" class="input-small" style="margin-top:10px; margin-left:10px" /></div>
         
          </div>
            </div>
          </form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
         <div style="display:block; margin-left:20px;">
                            <div id="btn_Todos" class="reff reff_0 reff_activo">Todos</div>
                            <div id="btn_Libres" class="reff Turnos_Libres">Pendientes</div> 
                            <div id="btn_Parciales" class="reff Turnos_Sobreturno">Parciales</div>
                            <div id="btn_SobreT" class="reff Turnos_Ocupados">Entregados</div>
         </div> 

        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
              <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
            <div id="TablaPedidos_div" class="tabla" style="height:190px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Pedido</th>
                    <th>Servicio</th>
                    <th>Sala</th>
                    <th>Cama</th>
                    <th>NHC</th>
                    <th>Paciente</th>
                    <th>Fecha</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
    <div class="pull-right" style="height:90px;">
        <a id = "btnImprimir" class="btn"><i class=" icon-print icon-black"></i>&nbsp;Imprimir Entregados</a>
        <a id = "btnBuscar" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar</a>
    </div>
</div>
      </div>
    </div>
  </div>

<!--Pie de p�gina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<%--<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
<script src="https://jquery-ui.googlecode.com/svn-history/r3982/trunk/ui/i18n/jquery.ui.datepicker-nl.js"></script>--%>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Farmacia/Buscar_IM_ENT.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Entregas por Indicación Médica</strong>";
</script> 
</body>
</html>



