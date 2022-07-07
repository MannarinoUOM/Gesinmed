<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RendicionBonosporMedico.aspx.cs" Inherits="Bonos_RendicionBonosporMedico" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Bonos > <strong>Rendición de Bonos por Médicos</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 330px;">

                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Rendición de Bonos por Médicos</span>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtFechaInicio">
                        Fecha</label>
                    <div class="controls">
                        <input id="txtFecha" type="text" class="input-small">
                    </div>
                </div>
<%--                <div class="titulo_datos" style="margin-left:50px;">
                    <strong>Nro Comprobante</strong></div>
                <div class="control-group">
                    <label class="control-label" for="txtNroInicial">
                        Inicial</label>
                    <div class="controls">
                        <input id="txtNroInicial" type="text" value="1" class="input-small">
                        <span for="txtNroFinal">Final</span>
                        <input id="txtNroFinal" type="text" value="2000" class="input-small">
                    </div>
                </div>--%>
                <div class="control-group">
                    <label class="control-label" for="cbo_Usuarios">
                        Usuarios</label>
                    <div class="controls">
                        <select id="cbo_Usuarios" style="width:300px">
                        </select>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="cbo_Medico">
                        Medico</label>
                    <div class="controls">
                        <select id="cbo_Medico" style="width:300px;">
                        <option value="0">Todos</option>
                        </select>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="cbo_Tipo">
                        Tipo</label>
                    <div class="controls">
                        <select id="cbo_Tipo" style="width:300px;">
                        <option value="0">Bono Afiliado</option>
                        <option value="1">Bono por Reintegro</option>
                        <option value="2">Bono por Cobranza a Cta. Terceros</option>
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
<script src="../js/Hospitales/Bonos/RendicionBonosporMedico.js" type="text/javascript"></script>
