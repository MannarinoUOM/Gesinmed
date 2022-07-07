<%@ Page Language="C#" AutoEventWireup="true" CodeFile="admin_GuardiaTotales.aspx.cs" Inherits="Administracion_admin_GuardiaTotales" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Total Consolidado en Guardia</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 330px;">

                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Total Consolidado en Guardia</span>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtFechaDesde">
                        Fecha Desde</label>
                    <div class="controls">
                        <input id="txtFechaDesde" type="text" class="input-small fecha">
                    </div>
                </div>
                 <div class="control-group">
                    <label class="control-label" for="txtFechaHasta">
                        Fecha Hasta</label>
                    <div class="controls">
                        <input id="txtFechaHasta" type="text" class="input-small fecha">
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <a id="btn_BuscarRendicion" class="btn">Buscar</a>
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
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/Hospitales/Administracion/admin_GuardiaTotales.js" type="text/javascript"></script>
