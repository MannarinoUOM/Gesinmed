<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Compras_Asignar_Alto_Costo.aspx.cs" Inherits="Compras_Compras_Asignar_Alto_Costo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="container" style="padding-top:5%">
    <div class="contenedor_a" style="height:500px; overflow:auto" >
    <div id="resultadoT"></div>
    <label id="cargando" style=" padding:25% 0% 0% 45%">
        <img src="../img/esperar.gif" /><br />
        Cargando...
        </label>
    </div>
    </div>
    </form>
</body>
</html>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Compras/Compras_Asignar_Alto_Costo.js" type="text/javascript"></script>

<script src="../js/General.js" type="text/javascript"></script>

<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > Ambulatorio CABA > <strong>Medicamentos Alto Costo</strong>";
</script> 
