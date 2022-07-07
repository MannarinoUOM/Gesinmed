<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MedicaciónAlcaloides.aspx.cs" Inherits="AtInternados_MedicaciónAlcaloides" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link rel="stylesheet" type="text/css" href="../css/hestilo.css"/>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">

    <div">
    <div id="lista" style="overflow:auto" ></div>

    <div class="pie_gris" style="position:relative"><a class="btn btn-info" id="btnGuardar" style="display:inline">Guardar</a><a class="btn" id="btnImprimir" style="display:none">Imprimir</a> <span class="fechaPedido; pull-right" >Fecha Pedido&nbsp;&nbsp;<input style="text-align:center; display:none" class="pull-right fechaPedido" id="fechaPeido" type="text" disabled="disabled"/></span></div>
    </div>
    </form>
</body>
</html>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/Hospitales/AtInternados/MedicaciónAlcaloides.js" type="text/javascript"></script>

