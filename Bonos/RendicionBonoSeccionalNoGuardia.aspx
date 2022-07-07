<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RendicionBonoSeccionalNoGuardia.aspx.cs" Inherits="Bonos_RendicionBonoSeccionalNoGuardia" %>


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
        parent.document.getElementById("DondeEstoy").innerHTML = "Bonos > <strong>Rendición de Bonos por Seccional (Practicas y Consultorios)</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 330px;">

                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Datos de Busqueda</span>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtFechaInicio">
                        Fecha Desde</label>
                    <div class="controls">
                        <input id="txtFechaInicio" type="text" class="input-small">
                        <span for="txtFechaFinal">Fecha Hasta</span>
                        <input id="txtFechaFinal" type="text" class="input-small">
                    </div>
                </div>

                
                <div class="control-group">
                    <label class="control-label" for="cboSeccional">
                        Seccional</label>
                    <div class="controls">
                        <select id="cboSeccional">
                        
                        </select>
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
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/Hospitales/Bonos/RendicionBonosSeccionalNoGuardia.js" type="text/javascript"></script>
