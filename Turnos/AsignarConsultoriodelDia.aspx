<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AsignarConsultoriodelDia.aspx.cs" Inherits="Turnos_AsignarConsultoriodelDia" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Asignar Consultorio del Dia</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container">
    
    <div class="contenedor_3" style="height:570px;">
        <div class="minicontenedor100">
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
                        <option value="0">Seleccione Médico...</option>
                    </select>
                </div>
            </div>
        </div>
        <div id="pn_Dias" class="minicontenedor100"> 
            <div id="ControltxtDia" class="control-group">
                <label class="control-label" for="txtDia">
                    Fecha</label>
                <div class="controls">
                    <input id="txtDia" type="text" class="input-small">
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
           </div>
           <div class="clearfix"></div>

           <div id="TablaDias" class="tabla" style="height: 280px; width: 97%; margin-left:10px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>
                                            Fecha
                                        </th>
                                        <th>
                                            Especialidad
                                        </th>
                                        <th>
                                            Médico
                                        </th>
                                        <th>
                                            Consultorio
                                        </th>
                                    </tr>
                                </thead>
                            </table>
           </div>

          <div class="pie_gris">
                    <a id="btnConfirmar" class="btn btn-info pull-right"><i class="icon-ok"></i>&nbsp;Confirmar</a>
                    <a id="btnCancelar" class="btn btn-warning pull-right" style="display:none;">&nbsp;Cancelar</a>
                    <a id="btnEliminar" class="btn btn-danger pull-right" style="display:none;"><i class="icon-trash"></i>&nbsp;Eliminar</a>
                    <a id="btnBuscar" class="btn pull-right"><i class="icon-search"></i>&nbsp;Buscar</a>
          </div>
    </div>
    </div>
    </form>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Turnos/AsignarConsultoriodelDia.js" type="text/javascript"></script>
    <script src="../js/General.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
</body>
</html>
