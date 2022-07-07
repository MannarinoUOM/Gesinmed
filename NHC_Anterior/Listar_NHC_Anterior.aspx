<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_NHC_Anterior.aspx.cs" Inherits="NHC_Anterior_Listar_NHC_Anterior" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Listar NHC Anterior</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 330px;">

                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Listar NHC Anterior</span>
                </div>
                 <div class="control-group">
                    <label class="control-label">
                        DNI</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" placeholder="Ingrese el DNI sin puntos">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtPaciente">
                        Paciente</label>
                    <div class="controls">
                        <input id="txtPaciente" placeholder="Apellido Nombre" type="text" class="span3">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtFechaInicio">
                        NHC</label>
                    <div class="controls">
                        <input id="txt_NHC" type="text" class="span3" placeholder="Ingrese NHC">
                    </div>
                </div>
                               
                <div class="control-group">
                    <div class="controls">
                        <a id="btn_BuscarRendicion" class="btn">Listar</a>
                        <a class="btn btn-danger" href="Listar_NHC_Anterior.aspx" id="btnCancelar" style="display: none;">
                            Otro Paciente</a>
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
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/Hospitales/NHC_Anterior/Listar_NHC_Anterior.js" type="text/javascript"></script>

