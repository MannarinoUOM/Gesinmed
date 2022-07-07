<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RelacionUsuarioMedico.aspx.cs" Inherits="Administracion_RelacionUsuarioMedico" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
</head>

<body>
<div class="container">
  <div class="contenedor_1">
    <div class="contenedor_a" style="position:relative;margin-left:15px;height:500px">
      <h3>Relación Usuario - Médicos</h3>
      <div style="padding:15px;">
<div class="pull-left TablaBuscar50">
        <div class="AUbuscar pull-left" style="width:230px">&nbsp;&nbsp;Usuario
          <input id="txtUsuario" placeholder="buscar..." type="text" class="span2"/>
        </div>
                
        <div class="tabla pull-left" style="margin-top:0;height:380px" >
          <table class="table table-hover AUcentrar">
            <thead>
            <th width="20px">ID</th>
            <th width="60px">Usuario</th>
            <th width="280px" style="display:none;"></th>
                </thead>
            <tbody id="TablaUsuarios">
              
              
            </tbody>
          </table>
</div>          
        </div>

<div class="pull-left TablaBuscar50">
        <div class="AUbuscar pull-left" style="width:230px">&nbsp;&nbsp;Médicos
          <input id="txtMedico" placeholder="Buscar..." type="text" class="span2"/>
        </div>
        <div class="pull-left" style="padding:7px 0px 0px 7px "><a class="btn btn-mini" id="btnTodos" style="display:none;"><i class="icon-adjust"></i>&nbsp;&nbsp;<span id="btnT">Mostrar seleccionados</span></a></div>
        <input id="rdTodos" name="opt" type="radio" checked  /> Mostrar Todos <span style="display:block"></span> <input id="rdSeleccionado" name="opt" type="radio" style="margin-left:7px;" /> Mostrar Seleccionados
        <div class="tabla pull-left" style="margin-top:0;height:380px" >
          <table class="table table-hover AUcentrar">
            <thead>
            <th width="20px">ID</th>
            <th width="60px">Médico</th>
            <th width="280px"></th>
                </thead>
            <tbody id="TablaMedicos">
              
              
            </tbody>
          </table>
</div>          
        </div>

<div class="clearfix"></div>        

      </div>
    </div>
  </div>
</div>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/Hospitales/Administracion/RelacionUsuarioMedico.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>

<!--Barra sup--> 
</body>
</html>