<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RecepciondePacientes.aspx.cs"
    Inherits="AtConsultorio_RecepciondePacientes" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .row_select
        {
            background-color:#efff00;
        }
        
         .row_libre
        {
            background-color:#ffffff;
        }
    </style>
</head>
<body>
    <div class="clearfix">
    </div>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <form id="form1" class="form-horizontal">
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="height: 320px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Recepción de pacientes</span></div>
                <form class="form-horizontal">
                <div class="control-group" id="ControlNROTurno" style="display: none">
                    <label class="control-label">
                        Nro. Turno</label>
                    <div class="controls">
                        <input id="txtNROTurno" name="NROTurno" type="text" placeholder="Nro. Turno">
                    </div>
                </div>
                <div class="control-group" id="ControlFecha">
                    <label class="control-label">
                        Fecha</label>
                    <div class="controls">
                        <input id="txtFechaTuro" name="txtFechaTuro" type="text"  disabled>
                    </div>
                </div>
                <div class="control-group" id="Div2">
                    <label class="control-label">
                        Nro. Bono</label>
                    <div class="controls">
                        <input id="txtNroBono" name="txtNroBono" type="text"/>
                    </div>
                </div>
                <div id="controlcbo_TipoDOC" class="control-group" style="display:none;">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC">
                      </select>          
                   </div>
                </div>
                <div class="control-group" id="Controltxt_dni" style="display:none;">
                    <label class="control-label">
                        N°</label>
                    <div class="controls">
                        <input id="txtdocumento" type="hidden" />
                        <input id="afiliadoId" value="" type="hidden"/>
                        <input id="txtPaciente" type="hidden" />
                        <input id="txt_dni" name="txt_dni" type="text" placeholder="Ingrese el DNI sin puntos">
                    </div>
                </div>
                <div class="control-group" style="display:none;">
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" type="text" placeholder="Ej: 99123456789">
                    </div>
                </div>
                </form>
                <div class="control-group">
                    <div class="controls pagination-centered">
                        <a class="btn btn-danger" href="RecepciondePacientes.aspx" id="btnCancelarPedidoTurno" style="margin-left:-120px;">
                            Cancelar</a> <a id="desdeaqui" class="btn btn-info">Siguiente</a>
                    </div>
                </div>
            </div>
            <div class="clearfix">
            </div>
            <div id="hastaaqui">
                <div class="resumen_datos">
                    <div class="datos_persona" style="font-size:12px;">
                        <div>
                            <img id="fotopaciente" class="avatar2" onclick="Capturar();" onerror="imgErrorPaciente(this);"
                                src="../img/silueta.jpg"></img>
                        </div>
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span>(<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                            <div>
                                Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp;
                                <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="opciones_resumen">
                        <a id="btnOtorgados" style="display:none;" class="btn">Turnos otorgados</a> <a href="RecepciondePacientes.aspx"
                            class="btn btn-danger">Cancelar solicitud</a>
                    </div>
                </div>
                <div class="contenedor_3">
                    <div class="titulo_seccion">
                        <img src="../img/2.jpg" />&nbsp;&nbsp;<span>Turnos Asignados</span></div>
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px">
                        <div class="clearfix">
                        </div>
                        <div id="TablaTurnos" class="tabla" style="height: 305px">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                            Fecha
                                        </th>
                                        <th>
                                            Hora
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
                        </form>
                        <div class="pie_gris">
                            <a id="btnRecepcionar" class="btn btn-success pull-right"><i class="icon-ok"></i>&nbsp;Recepcionar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>


    <!--Modal-->
    <div id="BonoModal" class="modal hide fade">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                &times;</button>
            <h3>
                Bonos Disponibles</h3>
        </div>
        <div class="modal-body">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>
                            Nro Bono
                        </th>
                        <th>
                            Fecha Bono
                        </th>
                        <th>
                            Médico
                        </th>
                        <th>
                            Especialidad
                        </th>                        
                    </tr>
                </thead>
                <tbody id="BonosLibres">

                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Cerrar</button>
        </div>
    </div>
    <!--Fin Modal-->


    <!--Pie de pagina-->
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AtConsultorio/RecepciondePacientes.js" type="text/javascript"></script>
    <!--Barra sup-->
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Recepción de pacientes</strong>";
    </script>
</body>
</html>
