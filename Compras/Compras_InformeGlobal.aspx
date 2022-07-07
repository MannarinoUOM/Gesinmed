<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Compras_InformeGlobal.aspx.cs" Inherits="Compras_Compras_InformeGlobal" %>

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
    .mano {
        cursor: pointer;
    }
</style>
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px; width:1000px;">
  <div class="contenedor_1" style="width:1000px;">
   <div class="contenedor_3" style="height:530px;width:970px;">
        <div style="height:200px; width:97%; background-color: #EBEBEB; position:relative; margin-left:15px;">
            <div class="contenedor_4 pagination-centered" style="height:120px;">
                <b style="text-align:center; margin-left: 100px;">Fecha de Entrega</b>          
                        <div class="controls" style="margin-left:10px;">
                                    <span for="txtFechaDesde">Desde</span>
                                    <input id="txtFechaDesde" type="text" class="input-small date" style="margin-left:5px" maxlength="10">
                                    <span for="txtFechaHasta">Hasta</span>
                                    <input id="txtFechaHasta" type="text" class="input-small date" style="margin-left: 5px;" maxlength="10">
                        </div>
                <b style="text-align:center; margin-left: 100px; display:none;">Nro. de Pedido</b>
                        <div id="ControlFechas" class="controls control-group" style="margin-bottom: 0px; margin-left:10px;display:none;">
                                    <span for="txtNroPedidoDesde">Desde</span>
                                    <input id="txtNroPedidoDesde" type="text" class="input-small numero" maxlength="10" style="margin-left:5px;"/>
                                    <span for="txtNroPedidoHasta" style="margin-left:5px">Hasta</span>
                                    <input id="txtNroPedidoHasta" type="text" class="input-small numero" maxlength="10"/>
                        </div>
                <b style="text-align:center; margin-left: 100px;">Nro. de Remito</b>
                        <div id="ControlExp" class="controls control-group" style="margin-bottom: 20px; margin-left:10px;">
                                    <span for="txtNroExpDesde">Desde</span>
                                    <input id="txtNroExpDesde" type="text" class="input-small numero" maxlength="10" style="margin-left:5px;"/>
                                    <span for="txtNroExpHasta" style="margin-left:5px">Hasta</span>
                                    <input id="txtNroExpHasta" type="text" class="input-small numero" maxlength="10"/>
                        </div>   
                 <div id="controlcbo_Deposito" class="control-group" style="display:inline; margin:10px 10px 0px 10px;">
                   <label for="cbo_Deposito" style="display:inline;">Depósito: </label>
                   <select id="cbo_Deposito" class="input-xlarge" style="width: 244px;">
                   </select>   
               </div>
                  
          </div>
          <div class="contenedor_4 pagination-centered" style="height:120px;position:absolute;">
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
          <div class="minicontenedor50" style="width:443px; margin-left:13px; margin-top:130px;background-color: #EBEBEB;">     
                            <div class="pull-left" style="margin-left:8px; width:348px;"> 
                                <div style="display:none">
                                    <span style="width:100px;">Pendientes</span> <input type="checkbox" id="chk_Pendientes" style="margin-top:0px; margin-right:15px;">
                                </div> 
                                <span style="width:100px;">Controlados</span> <input type="checkbox" id="chk_Entregados" style="margin-top:0px; margin-right:15px;">
                                <a id="btnBuscar" class="btn btn-warning"><i class=" icon-search"></i>&nbsp;Buscar Entregas</a>
                                <a style="margin-left:0px;margin-top:0px;" class="btn btn-primary" id="lbl_CantidadReg">0</a>
                            </div>
          </div>
                      
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
            <div id="TablaPedidos" style="overflow: auto; font-size:12px; text-align:center; white-space:nowrap;">
              <table id="example" class="display mano" cellspacing="0" width="100%">
                <thead>					
                  <tr>
                    <th>Nro. Remito</th>
                    <th>Insumo</th>
                    <th>Pedido</th>
                    <th>%</th>
                    <th>Far. Cant.</th>
                    <th>Far. Precio</th>
                    <th>Far. Desc.</th>
                    <th>Saldo</th>
                    <th>Fecha Entrega</th>
                    <th>Depósito</th>
                  </tr>
                </thead>
              </table>
           </div> <!-- Fin Div Tabla -->
           <!-- Datos del Expediente -->
             <div class="row datosEXP" style="margin-top: 15px;">

                <div id="Div3" class="controls span4" style="margin-bottom: 0px; margin-left:20px; width: 399px;">
                 <span for="txtApellido">Afiliado: </span><input id="txtApellido" type="text" class="input-large input-exp" style="width:317px;margin-left: 8px;" disabled/>
                </div>
                <div id="Div6" class="controls span2" style="margin-bottom: 0px; margin-left:8px; width: 181px;">
                 <span for="txtDNI" style="margin-right: 20px;">Nº doc: </span><input id="txtDNI" type="text" class="input-small input-exp" disabled/>
                </div>
                <div id="Div7" class="controls span4" style="margin-bottom: 0px; margin-left:20px; width: 300px;">
                 <span for="txtSeccional">Seccional: </span><input id="txtSeccional" type="text" class="input-large input-exp" disabled/>
                </div>
              </div>
              <div class="row datosEXP">
                <div id="Div1" class="controls span2" style="margin-bottom: 0px; margin-left:20px;width: 220px;">
                 <span for="txtNroExpediente">Nro. Expediente: </span><input id="txtNroExpediente" type="text" class="input-small input-exp" disabled />
                </div>
                <div id="Div2" class="controls span2" style="margin-bottom: 0px; margin-left:20px; width: 166px;display:none;">
                 <span for="txtFecha">Fecha: </span><input id="txtFecha" type="text" class="input-small input-exp" disabled/>
                </div>
                 <div id="Div4" class="controls span2" style="margin-bottom: 0px; margin-left:0px;width: 186px;">
                 <span for="txtVencExp">Venc. Exp: </span><input id="txtVencExp" type="text" class="input-small input-exp" disabled/>
                </div>
                <div id="Div5" class="controls span2" style="margin-bottom: 0px; margin-left:0px;width: 496px;">
                 <span for="txtPatologia" style="margin-right: 2px;">Patología: </span><input id="txtPatologia" type="text" class="input-small input-exp" style="width:410px;" disabled/>
                </div>
            </div>
            <!-- Fin Datos del Expediente -->
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
    <div class="pull-left" style="display:none;">
        <a id="btnVerExp" class="btn pull-left"><i class="icon-file"></i>&nbsp;Ver Expediente</a>
        <a id="btnPedidos" class="btn pull-left" style="margin-right: 5px;"><i class="icon-folder-close"></i>&nbsp;Pedidos</a>     
    </div>
    <div class="pull-right" style="height:90px;display:none;">
        <a id="btnCancelar" class="btn btn-danger"><i class=" icon-remove icon-white"></i>&nbsp;Cancelar Auditoria</a>
        <a id="btnConfirmar" class="btn btn-success"><i class="icon-ok icon-white"></i>&nbsp;Confirmar Auditoria</a>
        <a id="btnImprimir" class="btn"><i class="icon-print"></i>&nbsp;Imprimir</a>
    </div>
    <div class="pull-right" style="height:90px;">
        <a id="btnExcel" class="btn btn-success"><i class=" icon-file ; icon-white"></i>&nbsp;Excel</a>
        <a id="btnGuardar" class="btn btn-success"><i class="icon-ok icon-white"></i>&nbsp;Guardar Cambios</a>
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
<script src="../js/jquery.dataTables.js" type="text/javascript"></script>
<script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
<script src="../js/Hospitales/Compras/Compras_InformeGlobal.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > Ambulatorio CABA > <strong>Control de Entregas</strong>";
</script> 
</body>
</html>


