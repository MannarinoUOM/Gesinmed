<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AdministracionEditarPerfiles.aspx.cs" Inherits="Administracion_AdministracionEditarPerfiles" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
</head>

<body>
<div class="container">
  <div class="contenedor_1">

    <div class="contenedor_a" style="position:relative;margin-left:15px;height:530px">
        <h3>Alta y Edición de Perfiles</h3>

<div style="margin-left:25px;color:#666666"><strong>Perfil :</strong> <select id="cbo_perfil"></select></div>
<div>
<div class="tabla pull-left" style="width:45%;margin-left:25px;height:355px">
<table class="table">
<tr>
<th>Codigo</th>
<th width="80%">Nombre</th>
</tr>
<tbody id="TSecciones">
</tbody>

</table>
</div>

<div class="tabla pull-left" style="width:45%;margin-left:30px;height:355px">
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
      <a id="btnGuardar" class="btn btn-info">Guardar</a> 
      <a onclick="volver();" class="btn">Cancelar</a> 
      <a id="btnNuevo" class="btn">Nuevo Perfil</a>
      </div>
    </div>

  </div>
</div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script> 
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Administracion/AdministrarPerfiles.js" type="text/javascript"></script>



</body>
</html>

<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
<h3 id="myModalLabel">Nuevo Perfil</h3>
</div>
<div class="modal-body">
<p>Ingrese el nombre del nuevo Perfil</p>
<p><input id="txt_nuevoperfil" type="text" /></p>
</div>
<div class="modal-footer">
<button class="btn" data-dismiss="modal" aria-hidden="true">Cancelar</button>
<button id="btnaceptar" class="btn btn-primary">Aceptar</button>
</div>
</div>