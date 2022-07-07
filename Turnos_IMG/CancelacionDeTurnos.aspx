<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CancelacionDeTurnos.aspx.cs"
    Inherits="Turnos_CancelacionDeTurnos" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Turnos > <strong>Cancelar Turno</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 300px;">
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
                <div id="ControlFecha" class="control-group">
                    <label class="control-label" for="txtFechaInicio">
                        Fecha Inicio</label>
                    <div class="controls">
                        <input id="txtFechaInicio" type="text" class="input-small">
                        <span for="txtFechaFin">Fecha Fin</span>
                        <input id="txtFechaFin" type="text" class="input-small">
                    </div>
                </div>
                <div id="ControlHoras" class="control-group">
                    <label class="control-label" for="txtHoraInicio">
                        Hora Desde</label>
                    <div class="controls">
                        <input id="txtHoraInicio" type="text" class="input-mini">
                        <span for="txtHoraFin">Hora Hasta</span>
                        <input id="txtHoraFin" type="text" class="input-mini">
                        <span>
                            <input id="btnLibres" type="checkbox" class="checkbox">
                                Mostrar Todos</span>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <a id="btn_Buscar" class="btn" style="margin-left:100px;">Buscar</a>
                    </div>
                </div>
            </div>
            <div class="contenedor_3" style="height:500px;">
                <div class="titulo_seccion" style="margin-top: 5px;">
                    <img src="../img/2.jpg">
                    <span>Listado de Turnos</span>
                </div>
                <div style="margin-left: 10px;">
                    <div id="btn_Libres" class="span2 Turnos_Libres" style="cursor: default;text-align:center;">
                        Libre</div>
                    <div id="btn_Reservados" class="span2 Turnos_Ocupados" style="cursor: default;text-align:center;">
                        Ocupado</div>
                    <div class="span2 Turnos_Sobreturno" style="cursor: default;text-align:center;">
                        Sobreturno</div>
                    <div class="span2 Turnos_Cancelado" style="cursor: default;text-align:center;">
                        Cancelado</div>
                </div><br /><br />
                <input type="checkbox" id="chkTodos" style="margin-left:15px; margin-top:0px;"/>Seleccionar Todos
                <div id="Resultado" class="tabla" style="height: 350px; width: 98%; margin-left: 1%; font-size:11px;">
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
                                    Médico
                                </th>
                                <th>
                                    HC
                                </th>
                                <th>
                                    Paciente
                                </th>
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
                       &nbsp;&nbsp;&nbsp;Motivo: 
                        <select id="cboMotivo" style="margin-bottom:10px;">
                            <option value="">Seleccione Motivo...</option>
                            <option value="1">Por Entidad</option>
                            <option value="2">Por Médico</option>
                            <option value="3">Por Paciente</option>
                        </select>
                    <div class="pull-right">
                        <a id="btnVolver" class="btn"><i class="icon-arrow-left"></i>&nbsp;Volver</a>
                        <a id="btn_Cancelar" class="btn btn-danger"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        <a id="btn_Imprimir" class="btn btn-info"><i id="btnImprimir" class=" icon-print icon-white">
                        </i>&nbsp;Imprimir Turnos Cancelados</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="OpcionesModal" class="modal hide fade">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                &times;</button>
            <h3>
                Tipo de Cancelación</h3>
        </div>
        <div class="modal-body">
            <p>
                Está por cancelar el turno <span id="spanpaciente"></span>de la fecha <span id="spanfecha">
                </span>
            </p>
            <p>
                Seleccione el Tipo de Cancelación <a id="btn_porEntidad" class="btn btn-danger">Entidad</a>
                <a id="btn_porMedico" class="btn btn-danger">Médico</a> <a id="btn_porPaciente" class="btn btn-danger">
                    Paciente</a>
            </p>
        </div>
        <div class="modal-footer">
            <a class="btn" data-dismiss="modal" aria-hidden="true">Volver</a>
        </div>
    </div>
    <div id="QuitarTurnosModal" class="modal hide fade">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                &times;</button>
            <h3>
                Quitar Turno</h3>
        </div>
        <div class="modal-body">
            <p>
                El turno de la fecha <span id="spanfechaQuitar"></span> está libre.<br />
                Si pulsa Quitar Turno el turno libre será eliminado de forma permanente y no se podrá utilizar.
            </p>            
        </div>
        <div class="modal-footer">
            <a id="btn_QuitarTurnoPermanente" class="btn btn-danger">Quitar Turno</a>
            <a class="btn" data-dismiss="modal" aria-hidden="true">Volver</a>
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
<script src="../js/Hospitales/Turnos_IMG/CancelacionTurnos.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
