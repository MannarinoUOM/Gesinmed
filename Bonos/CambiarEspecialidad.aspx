<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CambiarEspecialidad.aspx.cs" Inherits="Bonos_CambiarEspecialidad" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Bonos > <strong>Compensación de Bono</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 250px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Compensación de Bono</span>
                </div>
                  <div class="control-group">
                    <label class="control-label" for="txtFecha">
                        Fecha de Emisión</label>
                    <div class="controls">
                        <input id="txtFecha" maxlength="10" type="text" class="input-small">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtNroBono">
                        Nº de Bono</label>
                    <div class="controls">
                        <input id="txtNroBono" maxlength="14" type="text" class="input-small">
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <a id="btn_BuscarBono" class="btn">Buscar Bono</a>
                    </div>
                </div>

                <div id="DatosaCancelar" style="display:none;">
                <div class="resumen_datos" style="height:90px;">
                    <!--Datos del paciente-->
                    <div class="datos_paciente" style="width:560px; font-size:12px;">
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span></strong></div>
                            <input type="hidden" id="afiliadoId" />
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;<span>DNI: <strong><span id="CargadoDNI"></span></strong></span>
                            <div>
                                Médico: <strong><span id="CargadoMedico"></span></strong>&nbsp;&nbsp;&nbsp;
                                <span>Especialidad: <strong><span id="CargadoEspecialidad"></span></strong></span>
                            </div>
                            <div>
                            <span>Nro. Código Barra: </span><span id="CodBarraNum"></span>
                            </div>
                        </div>
                    </div>                    
                </div>
                <div class="control-group" style="margin-left:0px;">
                    <label class="control-label" for="cbo_Especialidad">
                        Nueva Especialidad</label>
                       <select id="cbo_Especialidad" class="span4" style="margin-left:10px;"></select>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <a id="btnConfirmar" class="btn btn-info"><i class="icon-ok"></i>&nbsp;Confirmar</a>
                    </div>
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
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Bonos/CambiarEspecialidad.js" type="text/javascript"></script>
