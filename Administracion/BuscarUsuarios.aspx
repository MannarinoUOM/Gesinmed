<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarUsuarios.aspx.cs" Inherits="Administracion_BuscarUsuarios" %>

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
  <div class="contenedor_1" style="height:500px">
    <div class="contenedor_a" style="position:relative;margin-left:15px;height:440px;">
        <h3>Alta y Edición de Usuarios</h3>

      <div style="padding:15px;">
        <div class="AUbuscar pull-left">&nbsp;&nbsp;Buscar
          <input id="txtBuscar" placeholder="escriba aqui..." type="text"/>
        </div>
        <div class="pull-right"><a href="UsuarioModificar.aspx" class="btn"><i class="icon-plus-sign"></i>&nbsp;&nbsp;Crear Nuevo Usuario</a></div>
        <div class="clearfix"></div>
<div class="tabla" style="margin-top:0; height:320px;" >
        <table class="table table-hover AUcentrar">
            <thead>
          <th width="40px">ID</th>
          <th width="400px"></th>
          <th width="70px">Tipo</th>
          </thead>
          <tbody id="TablaUsuarios">
<%--              <tr>
                <td>001</td>
                <td><img src="http://maskoteros.com/wp-content/uploads/avatars/1/8be96d0a29c921e22b34b25186c6a4a9-bpthumb.jpg" class="AUfoto"/></td>
                <td class="AUusuario"><div class="AUdatos">
                    <div class="AUnombre">Tom super star</div>
                    <div class="AUnick">Moc-o</div>
                  </div></td>
                <td>Administrador</td>
              </tr>--%>
          </tbody>
        
          
        </table>
</div>
      </div>
    </div>
  </div>
</div>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/Administracion/BuscarUsuarios.js" type="text/javascript"></script>

<!--Barra sup--> 

</body>
</html>