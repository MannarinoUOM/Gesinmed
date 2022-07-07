<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Buscar_Presupuesto_Odontologia.aspx.cs" Inherits="Odontologia_Buscar_Presupuesto_Odontologia" %>

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
    <div class="container" style="text-align:center">
    <div class=" contenedor_a" style="margin-top:10%; height:411px">
    <div class="titulo_seccion"><span id="titulo" style=" text-align:center; display:block">Busqueda de Presupuestos</span></div>

    <div style="text-align:center">
    <input id="txtPaciente" type="text" placeholder="Paciente" name="50" disabled=disabled class="limpiar"/>
    <input id="txtDni" type="text" style="margin-left:5px; margin-right:5px; width:10%" placeholder="Documento"  class="numeroEntero limpiar"  maxlength="10"/>
    <input id="txtNhc" type="text" placeholder="Nhc"  class="numeroEntero limpiar" maxlength="10" style="width:10%"/>
    <input id="txtNPresupuesto" type="text" placeholder="Nº Presupuesto" style="margin-left:5px; width:12%" class="numeroEntero limpiar" maxlength="10"/>
    <label style="display:inline" for="chkSaldados">Saldados</label>&nbsp;<input id="chkSaldados" type="checkbox"  style="margin-top:0px"/>
    </div>

    <div class="contenedor_a" style="height:250px;overflow:auto; margin-left:12px">
    <table id="listaPresupuesto"  class="table table-hover">
    <thead><tr style="background-color:Black; color:White">
    <th style="width:15%"><b>&nbsp;Nº Presupuesto</b></th><th style="width:64%"><b>Médico</b></th><th style="width:11%"><b>Valor</b></th><th style="width:10%"><b>Saldo</b></th></tr></thead>
    </table>
    </div>

    <div style=" width:99%; height:35px; padding:0.5%; background-color:#CCCCCC; margin-top:1%">
    <a id="btnVer" class="btn btn-info pull-left">Ver</a>
    <a id="btnBuscar" class="btn btn-info pull-right" style="margin-left:1%">Buscar</a> 
    <a class="btn btn-danger pull-right" href="Presupuesto_Odontologia.aspx">Cancelar</a> 
    <a id="btnLimpiar" class="btn btn-info pull-right" style="margin-right:1%">Limpiar Campos</a>
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
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<script src="../js/Hospitales/Odontologia/Buscar_Presupuesto_Odontologia.js" type="text/javascript"></script>
<script src="../js/jquery.mask.js" type="text/javascript"></script>
<script src="../js/jquery.numberformatter-1.2.4.jsmin.js" type="text/javascript"></script>
<script src="../js/jquery.priceformat.js" type="text/javascript"></script>




<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Administración > Presupuesto Odontológico > <strong>Busqueda de Presupuestos</strong>";
    </script>