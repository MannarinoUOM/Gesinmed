<%@ Page Language="C#" AutoEventWireup="true" CodeFile="LiberarBono.aspx.cs" Inherits="Bonos_LiberarBono" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Bonos > <strong>Liberar Bono</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 250px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Liberar Bono</span>
                </div>                
                <div class="control-group" style="display:none;">
                    <label class="control-label" for="cbo_Usuarios">
                        Usuario</label>
                    <div class="controls">
                        <select id="cbo_Usuarios">
                        </select>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="txtNroBono">
                        Nro Bono</label>
                    <div class="controls">
                        <input id="txtNroBono" type="text" maxlength="8" class="input-small">
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label" for="txtObservaciones">
                        Observaciones</label>
                    <div class="controls">
                        <textarea id="txtObservaciones" rows="2" class="input-xlarge"></textarea>
                    </div>
                </div>

                <div class="control-group">
                    <div class="controls">
                        <a id="btn_BuscarBono" class="btn">Buscar Bono</a>
                    </div>
                </div>

                <div id="DatosaCancelar" style="display:none;">
                <div class="resumen_datos" style="height:130px;">
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
                            <br />
                            <div>
                            <a id="btn_Cancelar" class="btn btn-danger">Liberar Bono</a>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
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
<script src="../js/Hospitales/Bonos/LiberarBonos.js" type="text/javascript"></script>