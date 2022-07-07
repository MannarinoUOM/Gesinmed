<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Movimientos_Hc_X_Columna.aspx.cs" Inherits="HistoriaClinica_Movimientos_Hc_X_Columna" %>

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
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">
    <div class="contenedor_a" style=" margin-top:10%">
    <div class="titulo_seccion"><img src="../img/1.jpg"  style="display:none"/>&nbsp;&nbsp;<span id="titulo" style=" text-align:center; display:block">Movimientos NHC por Columna</span></div>
    <div style=" text-align:center"><label style="display:inline">Fecha Desde </label><input id="txtDesde" type="text" class="input-medium desde1" style="text-align:center"/>
    <label style="display:inline">Fecha Hasta </label><input id="txtHasta" type="text"class="input-medium  hasta1" style="text-align:center"/>
    <label style="display:inline">Nº Columna </label><input id="txtColumna" type="text" class="input-mini numeroEntero" style="text-align:center" maxlength="2" /></div>
    <div style="height:353px; overflow:auto">
    <table id="resultados" class='table table-hover'>
    <thead style=" background-color:Black; font-weight:bold"><tr style="color:White"><td>Fecha</td><td>Origen</td><td>Destino</td><td>Nhc</td><td>Afiliado</td></tr></thead>
    </table>
    </div>
    <div style=" width:99%; height:35px; padding:0.5%; background-color:#CCCCCC; margin-top:1%">
    <a id="btnImprimir" class="btn btn-info pull-right"><i class="icon-print icon-white"></i>&nbsp;&nbsp;Imprimir</a>
    <a id="btnBuscar" class="btn btn-info pull-right" style="margin-right:1%"><i class=" icon-search icon-white"></i>&nbsp;&nbsp;Buscar</a>
 
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
<script src="../js/jquery.dataTables.js" type="text/javascript"></script>
<script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/HistoriaClinica/Movimientos_Hc_X_Columna.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>

<script type="text/javascript">
parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Movimientos de Historias Clínicas por Columna</strong>";
</script>