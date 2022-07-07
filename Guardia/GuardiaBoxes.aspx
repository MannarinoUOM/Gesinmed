<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GuardiaBoxes.aspx.cs" Inherits="Guardia_GuardiaBoxes" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Edición de Boxes de Guardia</strong>";
     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: inline;">
                <div class="contenedor_3" style="height:520px;" >
                    <div class="titulo_seccion">
                        <span>Boxes de Guardia</span></div>
                    <div class="clearfix">
                    </div>
                    <div>
                        <div id="TablaBoxes" class="tabla" style="height:420px; width: 100%;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Box
                                        </th>
                                        <th>
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
                        <div class="pull-left" style="padding: 5px">
                            <div class="controls">
                                <span for="txtBox">Box</span>
                                <input id="txtBox" type="text" class="input-xlarge">
                                <a class="btn btnCorrector" id="btnGuardarBox"><i class="icon-ok"></i>Guardar</a>
                                <a class="btn btnCorrector" id="btnCancelarBox">Cancelar</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/Hospitales/Guardia/GuardiaBoxes.js" type="text/javascript"></script>
</body>
</html>
