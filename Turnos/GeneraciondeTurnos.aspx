<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GeneraciondeTurnos.aspx.cs"
    Inherits="Turnos_GeneraciondeTurnos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Turnos > <strong>Generar Grilla de Turnos de los Médicos</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container">
    
    <div class="contenedor_3" style="height:590px;">
        <div class="minicontenedor100" style="margin-bottom:50px;">

            
            
            <div class="titulo_seccion">
        <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del Médico</span></div>
        
            <div id="ControlEspecialidad" class="control-group">
                <label class="control-label" for="cbo_Especialidad">
                    Especialidad</label>
                <div class="controls">
                    <select id="cbo_Especialidad" style="width:300px;">
                    </select>
                </div>
            </div>
            
            <div id="ControlMedico" class="control-group">
                <label class="control-label" for="cbo_Medico">
                    Médico</label>
                <div class="controls">
                    <select id="cbo_Medico" style="width:300px;">
                    </select>
                </div>
            </div>

            <div class="control-group" style="display:none;">
                <div class="controls">
                <div class="btn-group" data-toggle="buttons-radio">
                    <a id="btn_RangoGenerar" class="btn active">Rango de días a generar</a>
                    <a id="btn_DyHGenerar" class="btn">Día y horario específico</a>
                </div>
                </div>
            </div>
        </div>
        <div id="pn_Rango" class="minicontenedor100">
            <div class="titulo_seccion">
        <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Rango de dias a generar</span></div>
            <div class="control-group">

            </div>
            <div id="ControltxtFechaDesde" class="control-group">
                <label class="control-label" for="txtFechaDesde" style="margin-left:200px">
                    Fecha Desde</label>
                <div class="controls">
                    <input id="txtFechaDesde" type="text" class="input-small">
                </div>
            </div>
            <div id="ControltxtFechaHasta" class="control-group">
                <label class="control-label" for="txtFechaHasta" style="margin-left:200px">
                    Fecha Hasta</label>
                <div class="controls">
                    <input id="txtFechaHasta" type="text" class="input-small">
                </div>
            </div>
            <div class="control-group">
                <div class="controls" id="div_generar">
                    <a id="Generar1" class="btn" style="margin-left:200px">Generar Turnos</a>
                </div>
                    <div id="cargando" style="text-align:center; display:none;">
                        <br /><br />
                        <img src="../img/Espere.gif" /><br />
                        Generando Turnos...
                </div>
            </div>
        </div>
        <div id="pn_Dias" class="minicontenedor100" style="display:none; margin-top:-30px;">
            <div class="control-group">
            <div class="titulo_seccion">
        <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Día y horario específico</span></div>
            </div>
            
            <div id="ControltxtDia" class="control-group">
                <label class="control-label" for="txtDia">
                    Fecha</label>
                <div class="controls">
                    <input id="txtDia" type="text" class="input-small">
                </div>
            </div>
            <div id="ControltxtDuracionTurno" class="control-group">
                <label class="control-label" for="txtDuracionTurno">
                    Duración del turno
                </label>
                <div class="controls">
                    <div class="input-append">
                        <input class="span2" id="txtDuracionTurno" style="width: 60px" type="text">
                        <span class="add-on">Min.</span>
                    </div>
                </div>
            </div>

            <div id="ControltxtHoraInicio" class="control-group">
                <label class="control-label" for="txtHoraInicio">
                    Hora inicio</label>
                <div class="controls">
                    <input id="txtHoraInicio" type="text" class="input-mini">
                    <span for="txtHoraFin">Hora fin</span>
                    <input id="txtHoraFin" type="text" class="input-mini">
                </div>
            </div>

            <div id="Controlcbo_Consultorio" class="control-group">
                <label class="control-label" for="cbo_Consultorio">
                    Consultorio</label>
                <div class="controls">
                    <select id="cbo_Consultorio">
                    </select>
                </div>
            </div>


            <div class="control-group">
        <div class="controls"> <a id="Generar2" class="btn">Generar Agenda</a></div>
      </div>


        </div>
    </div>
    </div>
    </form>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Turnos/GenerarTurnos.js" type="text/javascript"></script>
    <script src="../js/General.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
</body>
</html>
