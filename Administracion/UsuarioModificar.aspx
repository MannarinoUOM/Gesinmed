<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UsuarioModificar.aspx.cs" Inherits="Administracion_UsuarioModificar" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="../css/barra.css">
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<script src="../js/webcam.js" type="text/javascript"></script>

</head>

<script language="JavaScript">
    webcam.set_api_url('Foto.aspx');
    webcam.set_quality(100);
    webcam.set_shutter_sound(false); 
 </script>

<body>
<div class="container">
  <div class="contenedor_1">
    <div class="contenedor_a" style="position:relative;margin-left:15px;height:auto">
        <h3 id="title">Editar Usuario</h3>

      <div style="padding:15px;">
<div>
<div id="TFoto" class="pull-left" style="position:relative;overflow:hidden; display:none;">
      <div>Foto</div>
<a class="editar_avatar" id="webcam2foto" href="#"><br/><br/><div>TOMAR FOTO</div></a>
      <img id="FotoUsuario" src="../img/silueta.jpg" width="150px;" height="150px;" onError='ErrorFoto(this)'>
</div>
    
      <div class="pull-left" id="webcam2contenedor">
<div>Tomar foto</div>
<div class="webcam2box">
<script language="JavaScript">
    document.write(webcam.get_html(300, 300));
</script>
<div class="webcam2menu">
<a class="mano" id="SacarFoto">Tomar</a>
<a class="mano" id="webcam2aceptar">Aceptar</a>
</div>
</div>

</div> 

</div>


	  <table class="comprimida pull-left" style="margin-left:20px">
                <tbody><tr>
                  <td width="125px"><span>Tipo</span></td>
                  <td>
                  <select id="cbo_tipo" class="span5" type="text">                  
                  <asp:Literal ID="Literal1" runat="server"></asp:Literal>
                  </select>
                  </td>
                </tr>
                                <tr>
                  <td><span>Apellido y nombre</span></td>
                  <td><input id="txt_Nombre" class="span5" maxlength="40" type="text"></td>
                </tr>
                <tr>
                  <td><span>Usuario</span></td>
                  <td><input id="txtUsuario" class="span5" maxlength="40" type="text"></td>
                    
                </tr>
                <tr>
                  <td><span>Password</span></td>
                  <td><input id="P1" class="span5 datos" maxlength="20" type="password" runat="server"></td>
                </tr>
                <tr>
                  <td><span>Repetir password</span></td>
                  <td><input id="P2" class="span5 datos" maxlength="20" type="password" runat="server"></td>
                </tr>

                <tr style="display:none;">
                  <td><span>Interno</span></td>
                  <td><input id="txt_interno" class="span2" maxlength="20" type="text"></td>
                </tr>
                <tr>
                  <td><span>Seccional</span></td>
                    <asp:Literal ID="Literal3" runat="server"></asp:Literal>
                </tr>
                <tr>
                  <td><span>Perfil</span></td>
                  <td><select id="cbo_perfil" class="span5" type="text"></select></td>
                </tr>
                <tr style="display:none;">
                  <td><span>Vencimiento</span></td>
                  <td><input id="txt_fecha" maxlength="10" class="span2" type="text" value="31/12/2099"></td>
                </tr>
                <tr>
                  <td><span>Usuario activo</span></td>
                  <td><input id="ck_activo" type="checkbox" checked></td>
                </tr>
              </tbody></table>        
      
      <div class="clearfix"></div>
      </div>
      <div class="pie_gris"> 
      <a id="btnGuardar" class="btn btn-info">Guardar</a> 
      <a id="btnCancelar" class="btn">Cancelar</a> 
      <a id="btnEditar" onclick="javascript:Permisos();" class="btn" style="display:none;">Editar permisos</a>
      <a class="btn" href="BuscarUsuarios.aspx">Volver</a>
      </div>
    </div>
  </div>
</div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script> 
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Administracion/EditarUsuarios.js" type="text/javascript"></script>


<!--Barra sup--> 

</body></html>