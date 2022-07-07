<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ComprasInternacionReporteGastos.aspx.cs" Inherits="Compras_ComprasInternacionReporteGastos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

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

<div class="container" style="padding-top:30px; padding-left:40px; padding-left:60px; width:1300px;">
  <div class="contenedor_1" style="width:1225px;">


  

   <div class="contenedor_3" style="height:500px;width:1200px;">
        <div style="height:50px; width:100%; background-color: #EBEBEB; position:relative; margin-left:15px;">
            <div class="contenedor_4 pagination-centered" style="height:40px; width:100%">       
                        <div class="controls" style="margin-left:0px; margin-top:10px; width:95%">
                        <b>Fecha Pedidos:   </b>
                                    <span for="txtFechaDesde">Desde</span>
                                    <input id="txtFechaDesde" type="text" class="input-small date desde1" style="margin-left:5px" maxlength="10" />
                                    <span for="txtFechaHasta">Hasta</span>
                                    <input id="txtFechaHasta" type="text" class="input-small date hasta1" style="margin-left: 5px;" maxlength="10" />
                                    <form id="radios" style="display:inline;">
                                        <label class="radio-inline" style="position:inline; display:none">
                                            <input id="rd_Todos" type="radio" name="optradio" value="0" checked>Todos
                                        </label>
                                        <label class="radio-inline" style="position:inline; display:none">
                                            <input id="rd_Entregados" type="radio" name="optradio" value="1">Con Entregas
                                        </label>
                                        <label class="radio-inline" style="position:inline; display:none">
                                            <input id="rd_Pendientes" type="radio" name="optradio" value="2">Sin Entregas
                                        </label>
                                        <label class="radio-inline" style="position:inline">
                                            Proveedor <select id="cboProveedor"></select>
                                        </label>
                                        <label class="radio-inline" style="position:inline">
                                        Insumo <input type="text" class="input-medium" id="txtInsumo" maxlength="20" placeholder="Todos"/>
                                        </label>
                                        <a id="btnBuscar" class="btn btn-danger pull-right" style="position:inline;margin-left:10px;"><i class=" icon-search"></i>&nbsp;Buscar</a>
                                        <a style="margin-left:0px;margin-top:0px;position:inline;margin-left:10px;" class="btn btn-primary pull-right" id="lbl_CantidadReg">0</a>
                                    </form>
                        </div>                  
          </div>      
          </div>
          
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px; height:10px">
            
 <%--           <div class="clearfix"></div>
               <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando Pedidos...
                </div> --%>   
            <div id="TablaPedidos" style="overflow:auto; font-size:12px; text-align:center; height:440px">
           <%--   <table id="example" class="display" cellspacing="0" width="100%" style="overflow:scroll; height:100px">
                <thead>					
                  <tr style=" background-color:#CCCCCC">
                    <th>Fecha Pedido</th>
                    <th>Insumo/Descripción</th>
                    <th>Proveedor</th>
                    <th>Cantidad <br /> Recibida</th>
                    <th>Precio Unitario</th>
                    <th>Precio Total</th>
                    <th>Fecha <br /> Remito/Factura</th>
                  </tr>
                </thead>
              </table>--%>
           </div> <!-- Fin Div Tabla -->
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="box_informativo_a pull-left"><div style="padding-top:3px"><strong id="Total">Importe Total: $ 0</strong></div> </div>
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
<script src="../js/Hospitales/Compras/ComprasInternacionReporteGastos.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > Internación > <strong>Reporte de Gastos </strong>";
</script> 
</body>
</html>
