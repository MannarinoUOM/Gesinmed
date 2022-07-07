<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Generacion_Turno_DiayHora.aspx.cs" Inherits="Turnos_Generacion_Turno_DiayHora" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Turnos > <strong>Generar Grilla de Turnos (Dia y Hora)</strong>";
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
                        <option value="0">Todos</option>
                    </select>
                </div>
            </div>
        </div>
        <div id="pn_Dias" class="minicontenedor100" style="margin-top:-30px;">
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
    <script src="../js/Hospitales/Turnos/Generacion_Turno_DiayHora.js" type="text/javascript"></script>
    <script src="../js/General.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
</body>
</html>
