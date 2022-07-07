<%@ Page Language="C#" AutoEventWireup="true" CodeFile="admin_EliminarHC.aspx.cs" Inherits="Administracion_admin_EliminarHC" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <title></title>
</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Eliminar Historia Clinica</strong>";
    </script>
    <form id="form1" class="form-horizontal" onsubmit="javascript:return false;">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 330px;">

                <div class="titulo_seccion">
                    <span>Eliminar Historia Clinica</span>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtOrigen">
                        Nro. HC</label>
                    <div class="controls">
                        <input type="text" id="txtHC" maxlength="11" name="txtHC" class="input-small HC" />
                    </div>
                </div>
                <div class="control-group">
                    <label for="lblOrigen" class="control-label">
                    Paciente</label>
                     <div class="controls">
                        <label id="lblNHC" class="span4" style="margin-top:5px; margin-left:0px;"></label>
                        <input type="hidden" id="NHC" value="0" tabindex="-1"/>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <a id="btn_Guardar" class="btn btn-danger" style="display:none;">Eliminar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/Hospitales/Administracion/admin_EliminarHC.js" type="text/javascript"></script>
