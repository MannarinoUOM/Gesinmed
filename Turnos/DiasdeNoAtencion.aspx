<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DiasdeNoAtencion.aspx.cs"
    Inherits="Turnos_DiasdeNoAtencion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server" class="form-horizontal">
    <div>
        <legend>Dias de No Atención</legend>
        <asp:HiddenField ID="txtMedicoId" runat="server" />
        <h4 id="NombreMedico">
            Nombre Médico</h4>
        <div id="TablaDiasAtencion">
            <table id="TablaDAtencion" class="table table-hover table-bordered table-condensed">
                <thead>
                    <tr>
                        <th>
                            Motivo
                        </th>
                        <th>
                            Desde
                        </th>
                        <th>
                            Hasta
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="minicontenedor100">
            <div class="control-group">
                <label class="control-label" for="cboEspecialidadDA">
                    Especialidad</label>
                <div class="controls">
                    <select id="cboEspecialidadDA" class="span4">
                    </select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="txtFechaInicio">
                    Fecha Desde</label>
                <div class="controls">
                    <input id="txtFechaInicio" type="text" class="input-small">
                    <span for="txtFechaFin">Fecha Hasta</span>
                    <input id="txtFechaFin" type="text" class="input-small">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="txtMotivoAusencia">
                    Motivo de ausencia</label>
                <div class="controls">
                    <input id="txtMotivoAusencia" type="text" class="span4">
                </div>
            </div>
            <div class="control-group">
                <div class="controls">
                    <a id="btn_Agregar" class="btn btn-info">Agregar</a> <a id="btn_Cancelar" class="btn">Cancelar</a>
                    <a id="btn_Eliminar" class="btn" style="display: inline-block;">Eliminar</a>
                </div>
            </div>
        </div>
    </div>
    </form>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <script src="../js/Hospitales/Turnos/DiasdeNoAtencion.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
</body>
</html>
