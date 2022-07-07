<%@ Page Language="C#" AutoEventWireup="true" CodeFile="admin_Localidades.aspx.cs" Inherits="Administracion_admin_Localidades" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Altas y Edición de Localidades</strong>";
     
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
                        <span>Localidades</span></div>
                    <div class="clearfix">
                    </div>
                    <div>
                        <div id="TablaEspecialidades" class="tabla" style="height:450px; width: 98%; margin-left:5px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Localidades
                                        </th>
                                        <th>
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="pie_gris">
                        <div class="pull-left" style="margin-left:5px;">
                            <div class="controls">
                                <span for="txtLocalidad">Localidad</span>
                                <input id="txtLocalidad" type="text" class="input-xxlarge" maxlength="50" />
                                <a class="btn btnCorrector btn-info" id="btnGuardarLoc">Guardar</a>
                                <a class="btn btnCorrector btn-danger" id="btnCancelarLoc">Cancelar</a>
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
    <script src="../js/Hospitales/Administracion/admin_Localidades.js" type="text/javascript"></script>
    
</body>
</html>
