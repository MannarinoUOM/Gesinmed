<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Centro.aspx.cs" Inherits="Turnos_Centro" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Centro de Salud</strong>";
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1 pagination-centered">
            <div class="contenedor_a">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Centro de Salud</span></div>
                <div class="minicontenedor100" style="height: 360px;">
                    <ul class="nav nav-tabs" id="myTab">
                        <li style="display:none;"><a id="tbRS" data-toggle="tab" href="#RazonSocial">Razón Social</a></li>
                        <li class="active"><a data-toggle="tab" id="tbD" href="#Direccion">General</a></li>
                        <li style="display:none;"><a data-toggle="tab" id="tbP" href="#Propiedades">Dirección</a></li>
                        <li><a id="elMapa" data-toggle="tab" href="#Mapa">Ubicación</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane " id="RazonSocial">
                            <form class="form-inline">
<%--                            <div id="ControlRS" class="control-group">
                            <div class="titulo_datos">                                
                                <strong>Razón Social del Centro de Salud</strong></div>
                            <input id="txtRazonSocial" type="text" class="span5" maxlength="50" placeholder="Razón Social del Centro"
                                rel="tooltip" title="Razón Social del Centro">
                                </div>--%>
                            </form>
                        </div>
                        <div class="tab-pane active" id="Direccion">
                            <div id="ControlRS" class="control-group">
                            <input id="txtRazonSocial" type="text" class="span5" maxlength="50" placeholder="Razón Social del Centro" rel="tooltip" title="Razón Social del Centro">
                            </div>
                            <form class="form-inline">
                            <div id="ControlCalle" class="control-group" style="display:inline-block">
                            <input id="txtCalle" type="text" class="span3" rel="tooltip" maxlength="50" title="Calle" placeholder="Calle">
                            </div>
                            <div class="control-group" style="display:inline-block">
                            <input id="txtNumero" type="text" class="span2" rel="tooltip" maxlength="50" title="Número" placeholder="Número">
                            </div>
                            <div class="control-group" style="display:inline-block">
                            <input id="txtPiso" type="text" class="span1" rel="tooltip" maxlength="50" title="Piso" placeholder="Piso">
                            </div>
                            <div class="control-group" style="display:inline-block">
                            <input id="txtDpto" type="text" class="span1" rel="tooltip" maxlength="50" title="Dpto" placeholder="Depto.">
                            </div>
                            </form>
                            <form class="form-inline">
                            <select id="cbo_Localidad" class="span3" rel="tooltip" title="Localidad">
                            </select>
                            <input id="txtProvincia" type="text" class="span2" maxlength="50" rel="tooltip" title="Provincia" placeholder="Provincia">
                            <input id="txtCP" type="text" class="span2" maxlength="8" rel="tooltip" title="Código Postal" placeholder="CP">
                            </form>
                            <form class="form-inline">
                            <input id="txtTelefono" type="text" class="span3" maxlength="50" placeholder="Teléfono" rel="tooltip"
                                title="Teléfono">
                            <input id="txtFax" type="text" class="span3" maxlength="50" placeholder="Fax" rel="tooltip" title="Fax">
                            </form>
                            <form class="form-inline">
                            <div id="Div1" class="control-group" style="display:inline-block">
                            <input id="txtDirector" type="text" class="span3" maxlength="50" placeholder="Director" rel="tooltip"
                                title="Director">
                            <input id="txtCUIT" type="text" class="span2" maxlength="50" placeholder="Nro. Cuit" rel="tooltip"
                                title="Nro. Cuit">
                            <input id="txtNINSCRIPCION" type="text" class="span2" maxlength="50" placeholder="Nro. de Inscripción"
                                rel="tooltip" title="Nro. de Inscripción">
                                </div>
                            </form>
                            <form class="form-inline">
                            <div id="Div2" class="control-group" style="display:inline-block">
                                <textarea id="txtObservaciones" rows="1" maxlength="1020" type="text" class="span6" rel="tooltip" title="Observaciones" placeholder="Observaciones"></textarea>
                            </div>
                            </form>
                        </div>
                        <div class="tab-pane" id="Propiedades">
                            <div class="titulo_datos">
                                <strong>Dirección</strong></div>
<%--                            <form class="form-inline">
                            <input id="txtDirector" type="text" class="span3" maxlength="50" placeholder="Director" rel="tooltip"
                                title="Director">
                            <input id="txtCUIT" type="text" class="span2" maxlength="50" placeholder="Nro. Cuit" rel="tooltip"
                                title="Nro. Cuit">
                            <input id="txtNINSCRIPCION" type="text" class="span2" maxlength="50" placeholder="Nro. de Inscripción"
                                rel="tooltip" title="Nro. de Inscripción">
                            </form>--%>
                            <div class="titulo_datos">
                                <strong>Observaciones</strong></div>
                            <div class="pull-left">
                                <textarea id="txtObservacionesProp" rows="3" maxlength="1020" type="text" class="span6" rel="tooltip"
                                    title="Observaciones"></textarea>
                            </div>
                        </div>
                        <div class="tab-pane" id="Mapa">
                        </div>
                    </div>
                </div>
                <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
                    <div class="pull-right" style="padding: 5px">
                        <a id="btnConsultorios" class="btn btn-info" href="#myModal" data-backdrop="static"
                            role="button" data-toggle="modal"><i class=" icon-plus icon-white"></i>&nbsp;Consultorios</a>
                            <a id="btnImprimir" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</a>
                        <a id="btnGuardar" class="btn btn-info"><i class=" icon-plus icon-white"></i>&nbsp;Guardar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <div class="titulo_seccion">
                <span>Editar Consultorios</span></div>
            <div>
                <form class="form-inline">
                <div class="tabla" style="height: 280px; width: 98%; margin-left: 1%">
                <div id="TablaConsultorios">
                
                
                    <table class="table table-bordered table-bordered">
                        <thead>
                            <tr>
                                <th>
                                    Consultorio
                                </th>
                                <th>
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>  
                </div>
                </form>
                <form class="form-inline">
                <div id="ControlDescripcion" class="control-group" style="display:inline-block;">
                <input id="txtDescripcion" style="margin-left:5px;width:150px;" type="text" placeholder="Descripción">
                </div>
                <div style="display:inline-block;">
                <a id="btn_GuardarConsultorio" type="button" class="btn">Agregar</a>
                <a id="btn_CerrarConsultorio" type="button" style="display:none;" class="btn">Cerrar Consultorio</a>
                <a id="btn_EliminarConsultorio" type="button" style="display:none;" class="btn btn-danger">Borrar Consultorio</a>
                <a id="btn_CancelarConsultorio" type="button" class="btn">Cancelar</a>
                </div>
                </form>
            </div>
            <div>
            </div>
        </div>
        <div class="modal-footer">
            <a id="Cerrar" class="btn" data-dismiss="modal" aria-hidden="true">Cerrar</a> 
        </div>
    </div>
    <!--Pie de pagina-->
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Turnos/Centro.js" type="text/javascript"></script>
    <!--Barra sup-->
    <script>
        $('#desdeaqui').click(function () {
            $("#hastaaqui").fadeIn(1500);
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
            $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
            $('#cbo_Especialidad').focus();
        });


        $(window).resize(function () {
            //$('.container').height($(screen).height() + ($('.contenedor_1').height() + $('#hastaaqui').height()));
            //$('.container').height(3000);
        });


    </script>
</body>
</html>
