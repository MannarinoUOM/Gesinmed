<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FiltrarListadosCompras.aspx.cs" Inherits="Informes_FiltrarListadosCompras" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>    
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/General.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
</head>
<body>
   
    <div id="ctn1" class="contenedor_1" style="width:525px; height:410px; margin-top:50px; margin-left:auto; margin-right:auto">
    <div id="ctn2" class="contenedor_2" style="margin-left:18px; height:325px;width:485px">
    <div class="titulo_seccion" style="text-align:center">
    <span id="titulo" style="text-align:center"></span>
    </div>

    
    <form class="form-horizontal" style="height:100%">
<div style="height:80%">
    <div class="control-group" style="margin-top:10px" id="group1">
    <div class="control-label">
    <label  id="lbl1" style=" margin-left:16px"></label>
    </div>
    <div class="controls">
    <select id="cbo1" style=" margin-bottom:0px"></select>
    </div>
    </div>
 
    <div class="control-group" style="margin-top:10px" id="group2">
    <div class="control-label">
    <label  id="lbl2" style=" margin-left:16px"></label>
    </div>
    <div  class="controls">
    <select id="cbo2" style=" margin-bottom:0px"></select>
    </div>
    </div>

    <div class="control-group" style="margin-top:10px" id="group3">
    <div class="control-label">
    <label  id="lbl3" style=" margin-left:16px"></label>
    </div>
    <div  class="controls">
    <select id="cbo3" style=" margin-bottom:0px"></select>
    </div>
    </div>

    

    <div class="control-group" style="margin-top:10px">
    <div class="control-label">
    <label>Desde</label>
    </div>
    <div class="controls">
    <input id="txtDesde" type="text" style="width:100px; text-align:center" class="fechaHoy desde1 fechaMask"/><br />
    </div>
    </div>

    <div class="control-group" style="margin-top:10px">
    <div class="control-label">
    <label>Hasta</label>
    </div>
    <div class="controls">
    <input id="txtHasta" type="text" style="width:100px; text-align:center" class="fechaHoy hasta1 fechaMask"/>
    </div>
    </div>
    </div>

  <%--  PIE--%>
    <div  style=" position:relative; height:10%">
    <div class="control-group" style="position:absolute">
    <div class="control-label" style="padding-top:0px">
    <a id="btnVolver" class="btn btn-info"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
    </div>
    <div class="controls">
    <a id="btnEXECL" class="btn buscar"><i class="icon-file"></i>&nbsp;Buscar (Excel)</a>
    <a id="btnPDF" class="btn buscar"><i class="icon-print"></i>&nbsp;Buscar (PDF)</a>
    </div>
    </div>
    </div>
 </form>

    </div>
    </div>


</body>
</html>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<script src="../js/Hospitales/Informes/reportesCompras.js" type="text/javascript"></script>
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Compras</strong>";
</script>

