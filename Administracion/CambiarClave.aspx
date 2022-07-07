<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CambiarClave.aspx.cs" Inherits="Administracion_CambiarClave" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>

</head>
<body>


<style type="text/css">
.tooltip2 {
  position: relative;
  display: inline-block;
}

.tooltip2 .tooltiptext2  {
  visibility: hidden;
  width: 400px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 0px 0;
  margin-left:10px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip2:hover .tooltiptext2  {
  visibility: visible;
  animation: fadeIn ease 2s;
  -webkit-animation: fadeIn ease 2s;
  -moz-animation: fadeIn ease 2s;
  -o-animation: fadeIn ease 2s;
  -ms-animation: fadeIn ease 2s;
}

 .errorVacio {
  visibility: hidden;
  width: 150px;
  background-color: red;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  margin-left:10px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

 .errorVacio {


}

@keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}


.animacion {
       /*position: absolute;*/

  animation-name: parpadeo;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name:parpadeo;
  -webkit-animation-duration: 1s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes parpadeo{  
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

@-webkit-keyframes parpadeo {  
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
   100% { opacity: 1.0; }
}

@keyframes parpadeo {  
  0% { opacity: 1.0; }
   50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}


</style>

    <form id="form1" runat="server">

<div class="container">
  <div class="contenedor_1">

    <div class="contenedor_a" style="position:relative;margin-left:15px;height:530px">
        <h3>Cambiar Clave</h3>



<div style="margin-left:25px;color:#666666"><strong>Usuario :</strong> <span id="spanUsuario">
    <asp:Label ID="lbl_Usuario" runat="server" Text="Label"></asp:Label></span>
</div>

<div style="margin-left:25px;color:#666666; height:50px"><strong>Clave Anterior :</strong> <span id="spanClaveAnterior">
<div class="tooltip2">
<asp:TextBox ID="txtCAnterior" runat="server" TextMode="Password" style="margin-left:30px" class="pass" data-item="1" data-check="0"></asp:TextBox></span>
<span class="tooltiptext2"><b>su clave actual</b></span>
<span class="errorVacio" data-item="1"><b>Complete este campo</b></span>
</div>
</div>




<div style="margin-left:25px;color:#666666; height:50px" ><strong>Clave Nueva :</strong> 
<span id="spanClaveNueva">
<div class="tooltip2">
<asp:TextBox ID="txtCNueva" runat="server" TextMode="Password" style="margin-left:42px" maxlength="20" class="pass" data-item="2" data-check="0"></asp:TextBox>
<span class="tooltiptext2"><b>10 caracteres mínimo 20 máximo, al menos un número, una letra y un carácter especial !¡@$%^&*()<>_</b></span>
<span class="errorVacio" data-item="2"><b>Complete este campo</b></span>
</div>
</span>
</div>

<div style="margin-left:25px;color:#666666; height:50px"><strong>Reescriba la Clave :</strong> <span id="spanClaveReNueva">
<div class="tooltip2">
<asp:TextBox ID="txtCRNueva" runat="server" TextMode="Password" maxlength="20" class="pass" data-item="3" data-check="0"></asp:TextBox></span>
<span class="tooltiptext2"><b>10 caracteres mínimo 20 máximo, al menos un número, una letra y un carácter especial !¡@$%^&*()<>_</b></span>
<span class="errorVacio" data-item="3"><b>Complete este campo</b></span>
</div>

<div>
<div class="clearfix"></div>
</div>
      <div class="pie_gris" style=" width:100%;  left:0px;"> 
      <a id="btnGuardar" class="btn btn-info">Guardar</a> 
      <a onclick="Cancelar();" class="btn">Cancelar</a> 
      </div>
    </div>

  </div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Administracion/CambiarClave.js" type="text/javascript"></script>


    </form>
</body>
</html>
