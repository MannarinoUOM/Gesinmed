<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReporteAmbulatorioCABA.aspx.cs" Inherits="Compras_ReporteAmbulatorioCABA" %>

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
<style type="text/css">
    div.dataTables_sort_wrapper{white-space:nowrap !important;}
    th{white-space:nowrap !important;}
    
    .radio-inline {
        position: relative;
        display: inline-block;
        padding-left: 20px;
        margin-bottom: 0;
        font-weight: 400;
        vertical-align: middle;
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
        <div style="height:50px; width:97%; background-color: #EBEBEB; position:relative; margin-left:15px;">
            <div class="contenedor_4 pagination-centered" style="height:40px;">       
                        <div class="controls" style="margin-left:10px; margin-top:10px;">
                                    <span for="txtFechaDesde">Desde</span>
                                    <input id="txtFechaDesde" type="text" class="input-small date" style="margin-left:5px" maxlength="10" />
                                    <span for="txtFechaHasta">Hasta</span>
                                    <input id="txtFechaHasta" type="text" class="input-small date" style="margin-left: 5px;" maxlength="10" />
                                    <form id="radios" style="display:inline;">
                                        <label class="radio-inline" style="position:fixed;">
                                            <input id="rd_Todos" type="radio" name="optradio" value="0" checked>Todos
                                        </label>
                                        <label class="radio-inline" style="position:fixed;left: 610px;">
                                            <input id="rd_Entregados" type="radio" name="optradio" value="1">Entregados
                                        </label>
                                        <label class="radio-inline" style="position:fixed;left: 720px;">
                                            <input id="rd_Pendientes" type="radio" name="optradio" value="2">Pendientes
                                        </label>
                                        <a id="btnBuscar" class="btn btn-danger" style="position:fixed;left: 920px;"><i class=" icon-search"></i>&nbsp;Buscar</a>
                                        <a style="margin-left:0px;margin-top:0px;position:fixed;left: 1020px;" class="btn btn-primary" id="lbl_CantidadReg">0</a>
                                    </form>
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
              <table id="example" class="display" cellspacing="0" width="100%">
                <thead>					
                  <tr>
                    <th>Fecha Pedido</th>
                    <th>Paciente</th>
                    <th>Documento</th>
                    <th>NHC</th>
                    <th>Seccional</th>
                    <th>NroPedido</th>
                    <th>Insumo</th>
                    <th>Cantidad Pedida</th>
                    <th>% Auditado</th>
                    <th>Cantidad Entregada</th>
                    <th>N° Remito</th>
                    <th>Saldo</th>
                    <th>Depósito</th>
                  </tr>
                </thead>
              </table>
           </div> <!-- Fin Div Tabla -->
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
    <div class="pull-right" style="height:90px;">
        <a id="btnPdf" class="btn btn-info imprimir"><i class=" icon-print"></i>&nbsp;PDF</a>
        <a id="btnExcel" class="btn btn-info imprimir"><i class=" icon-print"></i>&nbsp;Excel</a>
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
<script src="../js/Hospitales/Compras/ReporteAmbulatorioCABA.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > Ambulatorio CABA > <strong>Reporte Ambulatorio CABA</strong>";
</script> 
</body>
</html>


