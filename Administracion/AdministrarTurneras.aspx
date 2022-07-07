<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AdministrarTurneras.aspx.cs" Inherits="Administracion_AdministrarTurneras" %>


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
      <h3>Administración Turnera</h3>
      <div style="padding:15px;">
<div class="pull-left TablaBuscar50">
        <div class="AUbuscar pull-left" style="width:230px">&nbsp;&nbsp;Turneras          
        </div>
        <div class="pull-left" style="padding:7px 0px 0px 7px "><a class="btn btn-mini" href="#ModalNuevo" data-backdrop="static" data-keyboard="false" data-toggle="modal" id="btnTodos"><i class="icon-plus-sign"></i>&nbsp;&nbsp;<span id="btnT">Nueva</span></a></div>
                
        <div class="tabla pull-left" style="margin-top:0;height:380px" >
          <table class="table table-hover AUcentrar">
            <thead>
            <tr>
            <th>ID</th>
            <th width="280px">Turnera</th>
            </tr>
                </thead>
            <tbody id="TablaTurneras">
                <asp:Literal ID="LTurneras" runat="server"></asp:Literal>             
            </tbody>
          </table>
        </div>          
        </div>

<div class="pull-left TablaBuscar50">
        <div class="AUbuscar pull-left" style="width:250px">&nbsp;&nbsp;Consultorios
        </div>
        <div class="pull-left" style="padding:7px 0px 0px 7px "><a class="btn btn-mini" onclick="javascript:GuardarConsultorios();"><i class="icon-plus-sign"></i>&nbsp;&nbsp;<span id="Span1">Guardar</span></a></div>

        <div class="tabla pull-left" style="margin-top:0;height:380px" >
          <table class="table table-hover AUcentrar">
            <thead>
            <tr>
            <th>Id</th>
            <th width="300px">Consultorio</th>
            </tr>
                </thead>
            <tbody id="TablaConsultorio">
              
              
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
<script src="../js/Hospitales/Administracion/AdministracionTurnera.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>

<!--Barra sup--> 
</body>
</html>

<div id="ModalNuevo" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Nueva Terminal de Tunera</h3>
  </div>
  <div class="modal-body">
    <p><span><b>Nombre: </b></span><input type="text" id="txtNombreTurnera" /></p>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Cancelar</button>
    <button class="btn btn-primary" id="GuardarNueva" onclick="javascript:Turnera_Nueva();">Aceptar</button>
  </div>
</div>