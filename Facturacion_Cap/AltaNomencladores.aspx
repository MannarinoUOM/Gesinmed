<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AltaNomencladores.aspx.cs" Inherits="Facturacion_AltaNomencladores" %>


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
        parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Altas y Edición de Convenios</strong>";
     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: inline;">
                <div class="contenedor_3" style="height:460px;">
                    <div class="titulo_seccion">
                        <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Altas y Edición de Convenios</span></div>
                    


                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                           <div id="cargando" style="text-align:center; display:none;">
                                <br /><br />
                                <img src="../img/Espere.gif" /><br />
                                Cargando...
                            </div>
                        <div id="TablaBonos" class="tabla" style="height: 180px; width: 890px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                            Convenios
                                        </th>
                                        <th>
                                            Contacto
                                        </th>
                                        <th>
                                            Fecha Inicial
                                        </th>
                                        <th>
                                            Fecha Final
                                        </th>
                                        <th>
                                            Detalles
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="TConvenios">
                                    
                                </tbody>
                            </table>
                        </div>

                        </form>
                    </div>
                    <div class="clearfix">
                    </div>


                    <div class="">
                    <form id="frm_Main">
                        <div class="minicontenedor100">
                        <div class="row">
                            <div class="span10">
                                <div id="controltxtConvenios" class="control-group">
                                <label for="txtConvenios" style="display:inline;">Convenios: </label>
                                    <input id="txtConvenios" name="txtConvenios" type="text" class="input-xlarge">
                                </div>
                            </div>
                         </div>   
                         <div class="row">
                                <div class="span4">
                                    <div id="controltxtContacto" class="control-group">
                                     <label for="txtContacto" style="display:inline;">Contacto: </label>
                                        <input id="txtContacto" name="txtContacto" type="text" class="input-medium">
                                    </div>
                                </div>
                                <div class="span3">
                                    <div id="controltxtFechaInicio" class="control-group">
                                    <label for="txtFechaInicio" style="display:inline;">Fecha Inicio: </label>
                                        <input id="txtFechaInicio" name="txtFechaInicio" type="text" class="input-small">
                                    </div>
                                </div>
                                <div class="span3">
                                    <div id="controltxtFechaFin" class="control-group">
                                    <label for="txtFechaFin" style="display:inline;">Fecha Fin: </label>
                                        <input id="txtFechaFin" name="txtFechaFin" type="text" class="input-small">
                                    </div>
                                </div>
                            <div class="span10">
                                <div id="controltxtDetalles">
                                    <label for="txtDetalles" style="display:inline;">Detalles: </label>
                                    <textarea id="txtDetalles" class="input-xlarge"></textarea>
                                </div>
                            </div>
                        </div>
                        </div>
                        </form>
                                                <div class="clearfix"></div>
                    </div>



                    <div class="pie_gris">
                        <div class="pull-right" style="padding: 5px; margin-bottom:5px;">
                            <a id="btnQuitar" class="btn btn-danger" style="display:none;"><i class=" icon-remove-circle"></i>&nbsp;Quitar</a>
                            <a id="btnGuardar" class="btn"><i class=" icon-ok-circle"></i>&nbsp;Guardar</a>
                            <a id="btnCancelar" class="btn"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                            <a id="btnProfesionales" href="#ModalProfesionales" data-toggle="modal" class="btn"><i class=" icon-book"></i>&nbsp;Profesionales</a>
                            <a id="btnInstituciones" href="#ModalInstituciones" data-toggle="modal" class="btn"><i class=" icon-book"></i>&nbsp;Instituciones</a>

                            <a id="btnSeccionales" href="#ModalSeccionales" data-toggle="modal" class="btn"><i class="icon-home"></i>&nbsp;Seccionales</a>
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
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/Facturacion_Cap/AltaNomencladores.js" type="text/javascript"></script>
</body>
</html>

 
<!-- Modal -->
<div id="ModalSeccionales" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h4 id="H1">Asignación a Nomencladores a Seccionales</h4>
    <h4 id="PConvenioSec"></h4>
  </div>
  <div class="modal-body">
    
    <p id="PSeccionalesSec"></p>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Cerrar</button>
  </div>
</div>


<!-- Modal -->
<div id="ModalInstituciones" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h4 id="H2">Asignación a Nomencladores a Instituciones</h4>
    <h4 id="PConvenioInst"></h4>
  </div>
  <div class="modal-body">
    
    <p id="PInstitucionesInst"></p>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Cerrar</button>
  </div>
</div>

<div id="ModalProfesionales" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h4 id="H3">Asignación a Nomencladores a Profesionales</h4>
    <h4 id="PConvenioProf"></h4>
  </div>
  <div class="modal-body">
    
    <p id="PProfesional"></p>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Cerrar</button>
  </div>
</div>