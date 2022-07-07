<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Reportes_De_Indicadores.aspx.cs" Inherits="Informes_Reportes_De_Indicadores" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
 <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
<link rel="stylesheet" type="text/css" href="../css/barra.css" />     
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<link href="../css/deshabilitar.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">

       <div>
   <h3 style="text-align:center">Reportes de Indicadores</h3>   
   <div class="row">
   <div style="text-align:center">
   <label style="display:inline">Desde </label><input id="txtDesde" type="text" class="input-medium" style="text-align:center; margin-bottom:0px"/>
   <label style="display:inline">Hasta </label><input id="txtHasta" type="text" class="input-medium" style="text-align:center; margin-bottom:0px; cursor:progress"/>
   <a id="btnImprimir" class="btn btn-info"><i class=" icon-print"></i>&nbsp;Imprimir</a>
   </div>
   </div>
   </div>
   <div class="container">
   <div style="margin-top:1%; margin-left:10%"><a id="btnTodos" class="btn btn-succes"><i class=" icon-exclamation-sign"></i>&nbsp;Calcular Todos</a></div>
   <div class=" contenedor_a" style="overflow:auto; width:80%; height:400px; margin-top:1%; margin-left:10%">
   <table id="Tindicadores" class="table table-condensed" >
                     <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Contando...
                </div> 
   </table> 

    </div>
    </div>
    </form>
</body>
</html>
<script src="../js/Hospitales/Informes/Reportes_De_Indicadores.js" type="text/javascript"></script>

