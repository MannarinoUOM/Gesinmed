<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AdministrarPermisos.aspx.cs" Inherits="Administracion_AdministrarPermisos" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gesti?n Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
</head>

<body>
<div class="container">
  <div class="contenedor_1" style="height:500px">

    <div class="contenedor_a" style="position:relative;margin-left:15px;height:450px">
        <h3>Editar permisos</h3>

<div style="margin-left:25px;color:#666666"><strong>Usuario :</strong> <span id="spanAyN" runat="server"></span></div>
<div>
<div class="tabla pull-left" style="width:45%;margin-left:25px;height:330px">
<table class="table">
<tr>
<th>Codigo</th>
<th width="80%">Nombre</th>
</tr>
<tbody id="TSecciones">
</tbody>

</table>
</div>

<div class="tabla pull-left" style="width:45%;margin-left:30px;height:330px">
<table class="table">
<tr>
<th width="10%"></th>
<th>Codigo</th>
<th>Nombre</th>
</tr>
<tbody id="TSeccionesDentro">
</tbody>

</table>
</div>
<div class="clearfix"></div>
</div>
      <div class="pie_gris">
      <div class="pull-right"> 
      <a id="btnGuardar" class="btn btn-info">Guardar</a> 
      <a onclick="volver();" class="btn">Volver</a> 
      </div>
      </div>
    </div>

  </div>
</div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Administracion/AdministrarPermisos.js" type="text/javascript"></script>

<!--Barra sup--> 

</body>
</html>

