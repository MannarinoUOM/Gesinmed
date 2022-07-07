<%@ Page Language="C#" AutoEventWireup="true" CodeFile="QuitarTurnos.aspx.cs"
    Inherits="Turnos_QuitarTurnos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <title></title>
</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Turnos > <strong>Eliminar Turnos</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 330px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Turnos a Eliminar</span>
                </div>
                <div style="text-align: center;">
        		    <%--<b>QUITA LOS TURNOS DE LA BASE DE DATOS</b>--%>
		        </div>
                <div id="Controlcbo_Especialidad" class="control-group">
                    <label class="control-label" for="cbo_Especialidad">
                        Especialidad</label>
                    <div class="controls">
                        <select id="cbo_Especialidad" class="span4">
                        </select>
                    </div>
                </div>
                <div id="Controlcbo_Medico" class="control-group">
                    <label class="control-label" for="cbo_Medico">
                        Médico</label>
                    <div class="controls">
                        <select id="cbo_Medico" class="span4">
                        </select>
                    </div>
                </div>

                <div id="Controlcbo_Turnos" class="control-group">
                    <label class="control-label" for="cbo_Turnos">
                        Turnos</label>
                    <div class="controls">
                        <select id="cbo_Turnos" class="span4">
                        <option value="0">Libres</option>
                        <option value="1">Todos</option>
                        </select>
                    </div>
                </div>

                <div id="ControlFechas" class="control-group">
                    <label class="control-label" for="txtFechaInicio">
                        Fecha Inicio</label>
                    <div class="controls">
                        <input id="txtFechaInicio" type="text" class="input-small" style="margin-right:20px;">
                        <span for="txtFechaFin">Fecha Fin</span>
                        <input id="txtFechaFin" type="text" class="input-small">
                    </div>
                </div>
                <div id="ControlHoras" class="control-group">
                    <label class="control-label" for="txtHoraInicio">
                        Hora Desde</label>
                    <div class="controls">
                        <input id="txtHoraInicio" type="text" class="input-small">
                        <span for="txtHoraFin" style="margin-left:13px">Hora Hasta</span>
                        <input id="txtHoraFin" type="text" class="input-small">
                        
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <a id="btn_QuitarTurnos" style="margin-left:0px;width:170px;" class="btn span2">Eliminar Turnos</a>
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
<script src="../js/Hospitales/Turnos/QuitarTurnos.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
