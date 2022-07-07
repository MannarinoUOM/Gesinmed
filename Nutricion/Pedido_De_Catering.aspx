<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Pedido_De_Catering.aspx.cs" Inherits="Nutricion_Pedido_De_Catering" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" /><link rel="stylesheet" type="text/css" href="../css/barra.css" /><link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<link href="../css/deshabilitar.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class=" contenedor_1" style=" width:85%; height:80%;  margin:auto; text-align:center; margin-top:100px; padding-bottom:0px">
    <div class=" contenedor_2" style="width:70%; height:80%; margin:auto; padding-bottom:0px">
    <div class="row" style="width:100%; height:1%; margin:0px">
    <div class="titulo_seccion" style="text-align:left; margin-left:2%">
    <span style=" text-align:right; font-size:xx-large" id="titulo">Pedido de Catering</span>
    <span style="margin-left:10%">Fecha</span><input id="txtFecha" type="text" style="margin-left:4px; margin-bottom:0px; text-align:center"/>
    </div>
    </div>
    <table style="width:95%; margin:auto">
    <tr style="background-color:Black">
    <td style="width:50%"><label style="color:White"><b>DIETAS</b></label></td>
    <td style="width:50%"><label style="color:White"><b>CANTIDAD</b></label></td></tr>
    </table>
    <table id="dietas"  style="width:95%; margin:auto">
    </table>
    <div class="clearfix" style="height:10px"></div>
    <div style="height: 40px; width: 100%; background-color: #CCCCCC; margin-top: 5px; border-bottom-left-radius:10px;border-bottom-right-radius:10px">
    <table>
    <tr>
    <td style="width:50%"></td>
    <td style="width:10%"><a id="btnLimpiar" class="btn btn-info" style="margin-top:5px"><i id="i5" class=" icon-trash icon-white"></i> Limpiar</a></td>
    <td style="width:10%"><a id="btnImprimir" class="btn btn-info" style="margin-top:5px"><i id="i1" class=" icon-print icon-white"></i> Imprimir</a></td>
    <td style="width:10%"><a id="btnGuardar" class="btn btn-info" style="margin-top:5px"><i id="i2" class=" icon-hdd icon-white"></i> Guardar</a></td>
    </tr>
    </table>
    </div>
    </div>
    
    </div>
    </form>
</body>
</html>
 <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>  
<script src="../js/Hospitales/Nutricion/Pedidos_De_Catering.js" type="text/javascript"></script>
