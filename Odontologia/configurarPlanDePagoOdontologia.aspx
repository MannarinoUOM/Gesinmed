<%@ Page Language="C#" AutoEventWireup="true" CodeFile="configurarPlanDePagoOdontologia.aspx.cs" Inherits="Odontologia_configurarPlanDePagoOdontologia" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link href="../css/Odontologia.css" rel="stylesheet" type="text/css" />
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/fixedHeader.dataTables.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="container" style="margin:auto; text-align:center; height:50%">
    <div class=" contenedor_a" style="width:70%; height:290px; margin-top:1px; margin-bottom:1px">
    <div style="text-align:center">
    <input id="txtPracticas" class="input-large" type="text" disabled="disabled"/>
    <input id="txtValor" type="text" class="moneda input-medium habilitar" placeholder="Valor Total" style=" text-align:center"/>
    <input id="txtCantidaCuotas" type="text" class="input-medium numeroEntero" placeholder="Cantidad de Cuotas" style="text-align:center" maxlength="2" disabled="disabled"/>
    </div>
    <div class="contenedorAbajo" style=" height:550px">
    <div style="height:240px;overflow:auto">
    <div id="txtTablaCUotas"></div>   
    </div>
    
    <div style="text-align:center">
        <div style=" width:99%; height:35px; padding:0.5%; margin-bottom:19%; background-color:#CCCCCC"><a id="btnGuardar" class="btn btn-info" style="margin-left:87%">Guardar</a></div>
    </div>
    </div>
    </div>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery.mask.js" type="text/javascript"></script>
<%--<script src="../js/jquery.numberformatter-1.2.4.jsmin.js" type="text/javascript"></script>--%>
<script src="../js/jquery.priceformat.js" type="text/javascript"></script>
<script src="../js/simple.money.format.js" type="text/javascript"></script>
<script src="../js/Hospitales/Odontologia/configurarPlanDePagoOdontologia.js" type="text/javascript"></script>
