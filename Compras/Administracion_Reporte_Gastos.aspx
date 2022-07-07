<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Administracion_Reporte_Gastos.aspx.cs" Inherits="Compras_Administracion_Reporte_Gastos" %>

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
    
    /* Ensure that the demo table scrolls */
    th, td { white-space: nowrap; }
    div.dataTables_wrapper {
        margin: 0 auto;
    }
 
    div.container {
        width: 80%;
    }
    
    
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

<div class="container" style="padding-top:10px; width:1300px; padding-left:70px">
  <div class="contenedor_1" style="width:1220px; height:520px">
   <div class="contenedor_3" style="height:480px;width:1190px;">
        <div style="height:100px; width:100%; background-color: #EBEBEB; position:relative; margin-left:0px;">
            <div class="contenedor_4 pagination-centered" style="height:100px; width:100%">       
                        <div class="controls" style="margin-left:10px; margin-top:10px;">
                                    <span for="txtFechaDesde">Desde</span>
                                    <input id="txtFechaDesde" type="text" class="input-small date" style="margin-left:5px" maxlength="10" />
                                    <span for="txtFechaHasta">Hasta</span>
                                    <input id="txtFechaHasta" type="text" class="input-small date" style="margin-left: 5px;" maxlength="10" />
                                    <span for="txtOrdenCompra">Nro. Orden de Compra</span>
                                    <input id="txtOrdenCompra" type="text" class="input-small" style="margin-left: 5px;" maxlength="10" />
                                    <form id="radios" style="display:inline; text-align:right">
                                        <a id="btnBuscar" class="btn btn-danger" style="position:fixed;left:71%;"><i class=" icon-search"></i>&nbsp;Buscar</a>
                                        <a style="margin-left:0px;margin-top:0px;position:fixed;left:77%;" class="btn btn-primary" id="lbl_CantidadReg">0</a>
                                    </form>
                        </div>        
                        <div class="controls" style="margin-left:10px; margin-top:10px;width: 700px; text-align:right">
                            <span for="txtInsumo">Insumo</span>
                            <input id="txtInsumo" type="text" class="input-xlarge" style="margin-left:5px;width: 240px;" maxlength="50" />
                            <span for="cbo_Proveedor">Proveedor</span>
                            <select id="cbo_Proveedor" class="input-xlarge" style="margin-left:5px;width: 280px;">
                            </select>
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
            <div id="TablaPedidos" style="overflow:hidden; font-size:12px; text-align:center; white-space:nowrap; height:350px">
              <table id="example" class="display" cellspacing="0" width="100%" style="height:30px">
               <thead>					
                  <tr>
                  </tr>
                </thead>
              </table>
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
<script src="../js/Hospitales/Compras/Administracion_Reporte_Gastos.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > <strong>Reporte de Ordenes de Compra</strong>";
</script> 
</body>
</html>



