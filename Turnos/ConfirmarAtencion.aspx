<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ConfirmarAtencion.aspx.cs"
    Inherits="Turnos_ConfirmarAtencion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
    <title></title>
</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Turnos > <strong>Confirmar Turno</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 240px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Datos del Turno</span>
                </div>
                <div id="Controlcbo_Especialidad" class="control-group">
                    <label class="control-label" for="cbo_Especialidad">
                        Especialidad</label>
                    <div class="controls">
                        <select id="cbo_Especialidad">
                        </select>
                    </div>
                </div>
                <div id="Controlcbo_Medico" class="control-group">
                    <label class="control-label" for="cbo_Medico">
                        Médico</label>
                    <div class="controls">
                        <select id="cbo_Medico">
                        </select>
                    </div>
                </div>
                <div id="ControlFechas" class="control-group">
                    <label class="control-label" for="txtFechaInicio">
                        Fecha Inicio</label>
                    <div class="controls">
                        <input id="txtFechaInicio" type="text" class="input-small">
                        <span for="txtFechaFin">Fecha Fin</span>
                        <input id="txtFechaFin" type="text" class="input-small">
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <a id="btn_Buscar" class="btn" style="margin-left:5px">Buscar</a>
                    </div>
                </div>
            </div>
            <div class="contenedor_3" style="height:540px;">
                <div class="titulo_seccion" style="margin-top: 5px;">
                    <img src="../img/2.jpg">
                    <span>Listado de Turnos</span>
                </div>
                <div style="margin-left: 10px;">
                    <div id="btn_Libres" class="span2 Turnos_Libres" style="cursor: default;text-align:center;">
                        No Confirmado</div>
                    <div id="btn_Reservados" class="span2 Turnos_Ocupados" style="cursor:default;text-align:center;">
                        Confirmado</div>
                    <div class="span2 Turnos_Cancelado" style="cursor:default;text-align:center;">
                        Cancelado</div>
                </div><br />
                <div id="divResultado" class="tabla" style="height: 420px; width: 98%; margin-left: 1%; margin-top:10px; font-size:11px;">
                       <div id="cargando" style="text-align:center; display:none;">
                            <br /><br />
                            <img src="../img/Espere.gif" /><br />
                            Cargando...
                        </div>    
                    <table id="TablaTurnos" class="table table-bordered table-bordered">
                        <thead>
                            <tr>
                                <th>
                                    Fecha
                                </th>
                                <th>
                                    Hora
                                </th>
                                <th>
                                    HC
                                </th>
                                <th>
                                    Paciente
                                </th>
                                <th>Práctica</th>
                                <th>
                                    Teléfono
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="pie_gris">
                        <a id="btnGuardar" class="btn btn-info pull-right"><i class=" icon-ok-circle icon-white"></i>&nbsp;Confirmar</a>
                        <a id="btnImprimir" class="btn pull-right"><i class="icon-print"></i>&nbsp;Imprimir</a>
                        <a id="btnVolver" class="btn pull-right"><i class="icon-arrow-left"></i>&nbsp;Volver</a>
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
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/Hospitales/Turnos/ConfirmarAtencion.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
