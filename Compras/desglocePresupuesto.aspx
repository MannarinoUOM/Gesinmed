<%@ Page Language="C#" AutoEventWireup="true" CodeFile="desglocePresupuesto.aspx.cs" Inherits="Compras_desglocePresupuesto" %>

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
</head>
<body>
    <form id="form1" runat="server" style="overflow:hidden; margin-bottom:0px">
<%--    ESCANEOS--%>
    <div id="escaneos" style="height:200px;overflow-y:scroll">
        <%--background-image: url(../img/ComprasInternacion/carp.jpg);background-repeat:repeat; overflow-y:scroll">--%>
    
    </div>
<%--    CARGA--%>
<div style="background-color:Black; width:100%">
<table  style="width:100%"><tr>
<td style="width:50px; text-align:left"><label style="color:White;width:40px"><b>Cantidad</b></label></td>
<td style="width:179px; text-align:left"><label style="color:White"><b>Insumo</b></label></td>
<td style="width:40px; text-align:left"><label style="color:White;width:40px; text-align:center"><b>Importe </ br> Total</b></label></td>
<td style="width:190px; text-align:left"><label style="color:White"><b>Observaciones</b></label></td>
<td style="width:40px; text-align:left"><label style="color:White;width:40px"><b>Eliminar</b></label></td>
</tr>
</table>
</div>
<a style="display:" id="tab" href="#"></a>
    <div id="carga"  style="height:245px; overflow-y:scroll">

    </div>
    <div class="pie_gris">
    <a id="btnCerrarSinGuardar" class=" btn btn-danger pull-left">Cerrar sin Guardar</a>
    <a id="btnCerrar" class="btn btn-success pull-right" style="display:none">Cerrar</a><a id="btnGuardar" class="btn btn-success pull-right">Cerrar</a></div>
    </form>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/General.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
<script src="../js/Hospitales/Compras/desglocePresupuesto.js" type="text/javascript"></script>
