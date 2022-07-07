<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Administracion_Entregas.aspx.cs" Inherits="Compras_Administracion_Entregas" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>

<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/fixedHeader.dataTables.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<style>
    div.dataTables_sort_wrapper{white-space:nowrap !important;}
    th{white-space:nowrap !important;}
    .mano {
        cursor: pointer;
    }
    
    div.tooltip-inner {
        max-width: 420px;
    }

</style>
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px; width:1000px;">
  <div class="contenedor_1" style="width:1000px;">
   <div class="contenedor_3" style="height:530px;width:970px;">
        <div style="height:90px; width:97%; background-color: #EBEBEB; position:relative; margin-left:15px;">
          <div class="contenedor_4 pagination-centered" style="height:70px;">
               <div id="controlServicio" class="control-group" style="display:inline; margin:5px 10px 0px 10px;">
                   <label for="Servicio" style="display:inline;margin-right: 29px;">Servicio: </label>
                   <select id="cbo_Servicio" class="input-xlarge busqueda" style="width: 284px; margin-top:5px;">
                   </select>
               </div>
               <div id="controltxtNroPedido" class="control-group">
                   <label for="txtNroPedido" style="display:inline;margin-left: 10px;">Nro. Pedido: </label>
                   <input id="txtNroPedido" type="text" class="input-small numero busqueda" style="margin-left:5px;" maxlength="10"/>
               </div>
          </div>
          <div class="contenedor_4 pagination-centered" style="height:50px; position:absolute;">
            <b style="text-align:center; margin-left: 100px;">Fecha de Pedido</b>          
                    <div class="controls" style="margin-left:10px;">
                                <span for="txtFechaDesde">Desde</span>
                                <input id="txtFechaDesde" type="text" class="input-small date busqueda" style="margin-left:5px" maxlength="10">
                                <span for="txtFechaHasta">Hasta</span>
                                <input id="txtFechaHasta" type="text" class="input-small date busqueda" style="margin-left: 5px;" maxlength="10">
                    </div> 
          </div>
          <div class="minicontenedor50" style="width:922px; margin-left:0px; margin-top:5px;background-color: #EBEBEB;"> 
                
               <a id="btnBuscar" class="btn pull-right" style="margin-right:80px;margin-top: -20px;"><i class=" icon-search"></i>&nbsp;Cargar Pedidos</a>
               <a id="btn_VerHistorial" class="btn pull-right" data-toggle="modal" data-target="#EntregasModal" style="margin-right:200px;margin-top:-20px; display:none;">Ver Historial</a>   
          </div>
              <button style="margin-left:420px;margin-top:76px;position:absolute;" type="button" class="btn btn-primary" id="lbl_CantidadReg">0</button>        
          </div>

               <div style="display:block; margin-left:20px;">
                            <div id="btn_Todos" class="reff reff_0 reff_activo" style="margin-top:10px;">Todos</div>
                            <div id="btn_Libres" class="reff Turnos_Libres">Pendientes</div>
                            <div id="btn_SobreT" class="reff Turnos_Ocupados">Entregados</div>
               </div> 
          
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
               <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando Pedidos...
                </div>    
            <div id="TablaPedidos" class="cabecera" style="overflow: auto; font-size:12px; text-align:center; white-space:nowrap;">
              <table id="cabecera" class="display mano" cellspacing="0" width="100%">
              </table>
           </div> <!-- Fin Div Tabla -->
           <div id="TablaDetalles" class="detalles" style="overflow: auto; font-size:12px; text-align:center; white-space:nowrap;display:none;">
              <table id="detalles" class="display mano" cellspacing="0" width="100%" style="margin-bottom:30px;">
              </table>
           </div> <!-- Fin Div Tabla -->
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
    <div class="pull-right" style="height:90px;">
        <a id="btnVolver" class="btn detalles"><i class="icon-arrow-left"></i>&nbsp;Volver</a>
        <a id="btnImprimirPedido" class="btn detalles"><i class="icon-print"></i>&nbsp;Imprimir Pedido</a>
        <a id="btnPedir" class="btn btn-success detalles"><i class="icon-ok icon-white"></i>&nbsp;Confirmar</a>
    </div>
</div>
      </div>
    </div>
  </div>
 <div id="EntregasModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:650px; height:400px;">
        <div id="TablaEntregas_div" class="tabla" style="height:380px;width:95%; margin:15px;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Fecha</th>
                    <th>Usuario</th>
                    <th>Insumo</th>
                    <th>Cantidad<br />Entregada</th>
                  </tr>
                </thead>

              </table>
            </div>
    </div>

<!--Pie de p�gina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.dataTables.js" type="text/javascript"></script>
<script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
<script src="../js/Hospitales/Compras/Administracion_Entregas.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > Administración > <strong>Entregas</strong>";
</script> 
</body>
</html>


