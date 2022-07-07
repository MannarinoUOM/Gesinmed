<%@ Page Language="C#" AutoEventWireup="true" CodeFile="mensajes.aspx.cs" Inherits="Administracion_mensajes" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Gestión Hospitalaria</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/hestilo.css"/>
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">
    <div class="contenedor_3" style="margin-top:10%">
    <div class="titulo_seccion" style="text-align:center; margin-left:0px">
    <span style=" text-align:center" id="titulo">Mensajes</span>
    </div>
    <div style="text-align:center"><input id="txtTitulo" type="text" placeholder="Título" maxlength="22"/><input id="txtEnvia" type="text" placeholder="Enviado Por" maxlength="22"/><input id="txtFecha" type="text" class=" input-medium" style="text-align:center" disabled="disabled"/><select id="cboPerfil"></select></div>

          <ul class="nav nav-tabs" data-tabs="tabs" style="margin:5px;">
          <li class="active"><a data-toggle="tab" href="#tab1">Generar Mensaje</a></li>
          <li><a data-toggle="tab" href="#tab2" id="mostrar">Usuarios Notificados</a></li>
          </ul>
    <div id="my-tab-content" class="tab-content"> 
    <div class="tab-pane active fade in" id="tab1">
    <div style="text-align:center; padding:3%"><b>Mensaje</b><br /><textarea id="txtMensaje" style="width:80%; height:180px"></textarea></div>
    </div>
    <div class="tab-pane fade in" id="tab2">
    <div style="text-align:center; height:255px; overflow:auto">
    <div id="listado"></div>
    </div>
    </div>
    </div>

    <div class="pie_gris"><a id="btnGuardar" class="btn btn-info pull-right">Guardar</a><a id="btnEliminar" class="btn btn-danger pull-right">Eliminar</a></div>
    </div>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Administracion/mensajes.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">

    parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Mensajes</strong>";

</script> 