<%@ Page Language="C#" AutoEventWireup="true" CodeFile="IMG_Buscar.aspx.cs" Inherits="Imagenes_IMG_Buscar" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Imágenes > <strong>Buscar Imágenes</strong>";     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: inline;">
                <div class="contenedor_3" style="height:490px">
                    <div class="">
                        <div class="minicontenedor50 pagination-centered" style="display:none;">
                        
                        <div class="check_todos"><label class="checkbox">
                                   <input onclick="Ft(0)" id="cbo_Todos" type="checkbox" value="0" CHECKED />Marcar todos
                            </label>
                            <label class="checkbox">
                         <input onclick="Fdes(0)" id="cbo_DesTodos" type="checkbox" value="0"/>Desmarcar todos
                          </label>
                            </div>

                            <div class="filtro_datos" style="width:98%;">                                                        

                            

                                <div id="FiltroPracticas" style="float: left;">
                                
                                </div>                                
                            </div>
                        </div>
                        <div class="minicontenedor50" style="width:95%; margin-left:15px;">
                            <div id="ControlFechas" class="controls control-group" style="margin-bottom: 0px;">
                                <span for="txtFechaInicio">Fecha Inicio</span>
                                <input id="txtFechaInicio" type="text" class="input-small">
                                <span for="txtFechaFin" style="margin-left:29px">Fecha Fin</span>
                                <input id="txtFechaFin" type="text" class="input-small">
                            </div>
                            <div class="controls">
                                <span for="TxtCpbt">Nro. Protocolo.</span>
                                <input id="TxtCpbt" type="text" class="input-small"; style="margin-left:9px">
                                <span for="txtNroHC" style="margin-left:30px">Nro. H.C.</span>
                                <input id="txtNroHC" type="text" class="input-small" style="margin-left:6px">
                            </div>
                            <div class="controls">
                                <span for="txtAfiliado">Paciente</span>
                                <input id="txtAfiliado" type="text" class="input-large"; style="margin-left:22px" maxlength="30">
                                <a id="btn_Buscar" class="btn btnCorrector"><i class="icon-search"></i>Buscar</a>
                            </div>
                             <div class="controls">
                                &nbsp;&nbsp;
                            </div>
                        </div>
                        <div class="clearfix">
                        </div>
                    </div>
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaBonos" class="tabla" style="height: 300px; width: 890px;">
                         <div id="cargando" style="text-align:center; display:none;">
                            <br /><br />
                            <img src="../img/Espere.gif" /><br />
                            Cargando...
                        </div>       
                            <table id="table_b" class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                            Nro. Protocolo
                                        </th>
                                        <th>
                                            Fecha
                                        </th>
                                        <th>
                                            Nro HC
                                        </th>
                                        <th>
                                            Paciente
                                        </th>
                                        <th>
                                            Tipo Estudio
                                        </th>                                        
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        </form>
                    </div>
                    <div class="clearfix">
                    </div>
                    <div class="pie_gris">
                        <div class="pull-right" style="padding: 5px">
                            <a href="NuevoBono.aspx" class="btn" style="display:none;"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
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
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/Imagenes/IMG_Buscar.js" type="text/javascript"></script>
</body>
</html>