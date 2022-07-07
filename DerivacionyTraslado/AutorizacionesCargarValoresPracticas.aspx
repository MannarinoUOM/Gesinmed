<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AutorizacionesCargarValoresPracticas.aspx.cs" Inherits="DerivacionyTraslado_AutorizacionesCargarValoresPracticas" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <script src="../js/webcam.js" type="text/javascript"></script>
</head>
<body>
    <div class="clearfix">
    </div>
<div class="container" style="width:60%; padding-top:30px">
<div class=" contenedor_1" style="width:100%; position:relative">
<div class="contenedor_bono" style="width:80%; margin-left:10%; height:250px">
                <div class="titulo_seccion" style="text-align:center">
                    <span id="titulo">Nomenclador de Prestadores</span></div>
<table style=" margin:auto; width:80%; margin-top:auto">
<thead>
<tr style="width:5%">
<td style="width:5%">
<label style="display:inline">Práctica  </label></td>
<td style="width:95%">
<select id="cboPracticas" style="width:440px; text-align:right" class="actualizar"></select>
</td>
</tr>

<tr>
<td style="width:5%">
<label style="display:inline">Prestador  </label></td>
<td style="width:95%">
<select id="cboPrestadores" style="width:440px; text-align:right"  class="actualizar"></select>
</td>
</tr>

<tr>
<td style="width:5%">
<label style="display:inline">Valor  </label></td>
<td style="width:95%">
<input id="txtValor" type="text" maxlength="6"/>
</td>

</tr>

<tr>
<td style="width:70%">
<a id="BtnAceptar" class="btn btn-sucess">Aceptar</a>
</td>
</tr>

</thead>
</table>

</div>
</div>
</div>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jQueryBlink.js" type="text/javascript"></script>
<script src="../js/Hospitales/DerivacionyTraslado/AdministrarValoresPracticas.js"
    type="text/javascript"></script>
