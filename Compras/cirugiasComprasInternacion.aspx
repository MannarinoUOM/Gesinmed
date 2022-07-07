<%@ Page Language="C#" AutoEventWireup="true" CodeFile="cirugiasComprasInternacion.aspx.cs" Inherits="Compras_cirugiasComprasInternacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<style type="text/css">
td:empty:before{
   content: attr(placeholder);
   display: block;
   color:#aaa;
}
</style>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
      <table class="table table-hover" id="tablaCirugias" style="z-index:300; width:99%; overflow:auto"></table>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script> 
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>   
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<script src="../js/Hospitales/Compras/cirugiasComprasInternacion.js" type="text/javascript"></script>
