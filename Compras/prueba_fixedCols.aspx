<%@ Page Language="C#" AutoEventWireup="true" CodeFile="prueba_fixedCols.aspx.cs" Inherits="prueba_fixedCols" %>

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
<style>
div.dataTables_sort_wrapper{white-space:nowrap !important;}
th{white-space:nowrap !important;}
</style>
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px; width:1000px;">
  <div class="contenedor_1" style="width:1000px;">
   <div class="contenedor_3" style="height:530px;width:970px;">
          <div class="contenedor_4 pagination-centered" style="height:150px;">
               <div id="controlmedicamento" class="control-group" style="display:inline; margin:10px 10px 0px 10px;">
                   <label for="medicamento" style="display:inline;">Insumo: </label>
                   <input type="text" id="medicamento" name="medicamento" maxlength="30" class="input-xlarge" style="margin-top:10px;margin-left: 15px;" />
               </div>
               <div id="controlPaciente" class="control-group" style="display:inline; margin:10px 10px 0px 10px;">
                   <label for="Paciente" style="display:inline;">Paciente: </label>
                   <input type="text" id="Paciente" name="Paciente" maxlength="30" class="input-xlarge" style="margin-top:10px;margin-left: 6px;" />
               </div>
               <div id="controlSeccional" class="control-group" style="display:inline; margin:10px 10px 0px 10px;">
                   <label for="Seccional" style="display:inline;">Seccional: </label>
                   <select id="cbo_Seccional" class="input-xlarge" style="width: 284px;">
                   </select>
               </div>
          </div>

          <div class="contenedor_4 pagination-centered" style="height:150px;">
            <b style="text-align:center; margin-left: 100px;">Fecha de Pedido</b>          
                    <div class="controls" style="margin-left:10px;">
                                <span for="txtFechaDesde">Desde</span>
                                <input id="txtFechaDesde" type="text" class="input-small date" style="margin-left:5px" maxlength="10">
                                <span for="txtFechaHasta">Hasta</span>
                                <input id="txtFechaHasta" type="text" class="input-small date" style="margin-left: 5px;" maxlength="10">
                    </div>
            <b style="text-align:center; margin-left: 100px;">Nro. de Pedido</b>
                    <div id="ControlFechas" class="controls control-group" style="margin-bottom: 0px; margin-left:10px;">
                                <span for="txtNroPedidoDesde">Desde</span>
                                <input id="txtNroPedidoDesde" type="text" class="input-small numero" maxlength="10" style="margin-left:5px;"/>
                                <span for="txtNroPedidoHasta" style="margin-left:5px">Hasta</span>
                                <input id="txtNroPedidoHasta" type="text" class="input-small numero" maxlength="10"/>
                    </div>   
          </div>
          <div class="minicontenedor50" style="width:823px; margin-left:20px; margin-top:5px;">     
                            <div class="pull-right">
                                
                                <span style="width:100px;">Con Auditoria Administrativa</span> <input type="checkbox" id="chk_ConAuditoriaAdm" style="margin-top:0px; margin-right:15px;">
                                <span style="width:100px;">Sin Auditoria Médica</span> <input type="checkbox" id="chk_SinAuditoriaMed" style="margin-top:0px; margin-right:15px;">  
                                <a id="btnBuscar" class="btn"><i class=" icon-search"></i>&nbsp;Buscar Pedidos</a>
                            </div>
          </div>
          <button style="margin-right:30px;margin-top:175px;position:absolute;" type="button" class="btn btn-primary pull-right" id="lbl_CantidadReg">0</button>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
               <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando Pedidos...
                </div>    
            <div id="TablaPedidos" style="overflow: auto; font-size:12px; text-align:center; white-space:nowrap;">
              <table id="example" class="display" cellspacing="0" width="100%">
              <thead>					
                  <tr>
                    <th>&nbsp;</th>
                    <th>Afiliado</th>
                    <th>Nro. Ped.</th>
                    <th>F.Receta</th>
                    <th>Ped. Ant.</th>
                    <th>Insumo</th>
                    <th>Pedido</th>
                    <th>Urg.</th>
                    <th>Duracion</th>
                    <th>%</th>
                    <th>F.Auditado</th>
                    <th>Auditor</th>
                    <th>F. Ingreso</th>
                    <th>Ingresado por</th>
                    <th>Observaciones</th>
                    <th>Audit. Adm</th>
                    <th>Fec. A.A.</th>
                  </tr>
                </thead>
              </table>
              <div class="row datosEXP">
                <div id="Div1" class="controls span2" style="margin-bottom: 0px; margin-left:20px;width: 177px;">
                 <span for="txtNroExpediente">Numero: </span><input id="txtNroExpediente" type="text" class="input-small" disabled />
                </div>
                <div id="Div2" class="controls span2" style="margin-bottom: 0px; margin-left:20px; width: 166px;">
                 <span for="txtFecha">Fecha: </span><input id="txtFecha" type="text" class="input-small" disabled/>
                </div>
                <div id="Div3" class="controls span4" style="margin-bottom: 0px; margin-left:20px; width: 300px;">
                 <span for="txtApellido">Afiliado: </span><input id="txtApellido" type="text" class="input-large" disabled/>
                </div>
                <div id="Div4" class="controls span2" style="margin-bottom: 0px; margin-left:20px;width: 186px;">
                 <span for="txtVencExp">Venc. Exp: </span><input id="txtVencExp" type="text" class="input-small" disabled/>
                </div>
              </div>
              <div class="row datosEXP">
                <div id="Div5" class="controls span2" style="margin-bottom: 0px; margin-left:20px;width: 363px;">
                 <span for="txtPatologia">Patología: </span><input id="txtPatologia" type="text" class="input-small" style="width:267px;" disabled/>
                </div>
                <div id="Div6" class="controls span2" style="margin-bottom: 0px; margin-left:20px; width: 181px;">
                 <span for="txtDNI">Nº doc: </span><input id="txtDNI" type="text" class="input-small" disabled/>
                </div>
                <div id="Div7" class="controls span4" style="margin-bottom: 0px; margin-left:20px; width: 300px;">
                 <span for="txtSeccional">Seccional: </span><input id="txtSeccional" type="text" class="input-large" disabled/>
                </div>
              </div>
           </div> <!-- Fin Div Tabla -->
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
    <div class="pull-left">
        <a id="btnVerExp" class="btn pull-left"><i class="icon-file"></i>&nbsp;Ver Expediente</a>
        <a id="btnPedidos" class="btn pull-left" style="margin-right: 5px;"><i class="icon-folder-close"></i>&nbsp;Pedidos</a>     
    </div>
    <div class="pull-right" style="height:90px;">
        <a id="btnCancelar" class="btn btn-danger"><i class=" icon-remove icon-white"></i>&nbsp;Cancelar Auditoria</a>
        <a id="btnConfirmar" class="btn btn-success"><i class="icon-ok icon-white"></i>&nbsp;Confirmar Auditoria</a>
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
<script src="../js/jquery.dataTables.js" type="text/javascript"></script>
<script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>

<script src="../js/Hospitales/Compras/Compras_Auditar_Pedidos.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 

</body>
</html>


