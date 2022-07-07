<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ServicioSalaCama.aspx.cs"
    Inherits="Internacion_ServicioSalaCama" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Servicios - Salas - Camas </strong>";
     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: inline;">
                <div class="contenedor_3" style="height:270px;" >
                    <div class="titulo_seccion">
                        <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Servicios</span></div>
                    <div class="clearfix">
                    </div>
                    <div>
                        <div id="TablaServicios" class="tabla" style="height: 172px; width: 100%;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Servicio
                                        </th>
                                        <th>
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
                        <div class="pull-left" style="padding: 5px">
                            <div class="controls">
                                <span for="txtServicio">Servicio</span>
                                <input id="txtServicio" type="text" class="input-xlarge">
                                <a class="btn btnCorrector" id="btnGurdarServicio"><i class="icon-ok"></i>Guardar</a>
                                <a class="btn btnCorrector" id="btnCancelarServicio">Cancelar</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="PosSalas" class="contenedor_3" style="height:270px; margin-top:10px; display:none;">
                    <div class="titulo_seccion">
                        <img src="../img/2.jpg" />&nbsp;&nbsp;<span id="titulo_sala" style="font-size:medium;">Salas</span></div>
                    <div class="clearfix">
                    </div>
                    <div>
                        <div id="TablaSalas" class="tabla" style="height: 172px; width: 100%;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                            Sala
                                        </th>
                                        <th>
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
                        <div class="pull-left" style="padding: 5px">
                            <div class="controls">
                                <span for="txtSala">Sala</span>
                                <input id="txtSala" type="text" class="input-xlarge">
                                <a class="btn btnCorrector" id="btnGuardarSala"><i class="icon-ok"></i>Guardar</a>
                                <a class="btn btnCorrector" id="btnCancelarSala">Cancelar</a>
                            </div>
                        </div>
                        <div class="pull-right" style="padding: 5px">
                            <a href="javascript:VolverServicios();" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                        </div>
                    </div>
                </div>
                <div id="PosCamas" class="contenedor_3" style="height:270px; margin-top:10px; margin-bottom:400px; display:none;">
                    <div class="titulo_seccion">
                        <img src="../img/3.jpg" />&nbsp;&nbsp;<span id="titulo_cama" style="font-size:medium;">Camas</span></div>
                    <div class="clearfix">
                    </div>
                    <div>
                        <div id="TablaCamas" class="tabla" style="height: 172px; width: 100%;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                            Cama
                                        </th>
                                        <th>
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
                        <div class="pull-left" style="padding: 5px">
                            <div class="controls">
                                <span for="txtCama">Cama</span>
                                <input id="txtCama" type="text" class="input-xlarge">
                                <a class="btn btnCorrector" id="btnGuardarCama"><i class="icon-ok"></i>Guardar</a>
                                <a class="btn btnCorrector" id="btnCancelarCama">Cancelar</a>
                            </div>
                        </div>
                        <div class="pull-right" style="padding: 5px">
                            <a href="javascript:VolverSalas();" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div id="ModalError" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <h3 id="myModalLabel">
                Error en Turno</h3>
        </div>
        <div class="modal-body">
            <p>
                <span id="DialogoError"></span>
            </p>
        </div>
        <div class="modal-footer">
            <button id="CerrarError" class="btn" data-dismiss="modal" aria-hidden="true">
                Cerrar</button>
        </div>
    </div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/Hospitales/Internacion/ServicioSalaCama.js" type="text/javascript"></script>
</body>
</html>
