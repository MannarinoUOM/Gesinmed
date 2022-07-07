<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Egreso.aspx.cs" Inherits="Internacion_Egreso" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <style>
        .dropdown-menu { max-height: 250px; max-width: 800px; font-size:11px; overflow-y: auto; overflow-x: hidden; }
    </style>
</head>
<body>
    <div class="clearfix">
    </div>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px">
        <div class="contenedor_1" style="height:800px">
            <div class="contenedor_2" style="height:150px">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Datos del Egreso</span></div>
                <form class="form-horizontal">
                <div class="control-group">
                    <label class="control-label">
                        Nro. HC</label>
                    <div class="controls">
                        <input id="txt_NroInternacion" type="text" placeholder="Ingrese Nro. HC" style="width:150px;"/>
                        <a id="btnAceptar" class="btn">Aceptar</a>
                    </div>
                </div>

                <div class="control-group">
                    <div class="controls">
                        <a href="BuscarInternacion.aspx?Desde=2" class="btn btn-info"><i class="icon-search"></i>&nbsp;Buscar Internados</a>
                    </div>
                </div>
                
                </form>
                <div class="control-group">
                    <div class="controls pagination-centered">
                        <a class="btn btn-danger" href="DarTurnos.aspx" id="btnCancelarPedidoTurno" style="display:inline;display: none;">
                            Otro Paciente</a> <a class="btn" id="btnactualizar" style="display:inline; display: none;">Actualizar</a>
                        <a id="desdeaqui" style="display:inline; display: none;" class="btn btn-info">Siguiente</a>
                    </div>
                </div>
            </div>
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: none;">
                <div class="resumen_datos">
                    <div class="datos_persona">
                        <div>
                            <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img>
                        </div>
                        <div class="datos_resumen_paciente" style="font-size:12px;">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span>&nbsp;(<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                            <input id="afiliadoId" type="hidden" />
                            <div>
                                <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contenedor_3" style="height:400px">
                    <div class="">
                        <div class="minicontenedor100" style="height:350px;">
                            <div class="controls">
                                <span class="control-label">Fecha Egreso:</span>
                                <input id="txt_FechaEgreso" class="span2" type="text">
                                <span class="control-label">Hora Egreso:</span>
                                <input id="txt_HoraEgreso" class="span1" type="text">
                              <label style="display:inline">Fecha Ingreso:<input id="txt_fechaIngreso" type="text" disabled="disabled" class="input-medium"/></label><%--manuel--%>
                              <label style="display:inline">Hora Ingreso:<input id="txt_HoraIngreso" type="text" disabled="disabled" class="input-mini"/></label>
                            </div>
                            <div class="controls">
                            <span class="control-label" style="display:none;">Nº Internación: <b><span id="NroInt"></span></b></span>
                                <span class="control-label">Servicio: <b><span id="sp_Servicio"></span></b></span><span
                                    class="control-label">&nbsp;Sala: <b><span id="sp_Sala"></span></b></span><span class="control-label">
                                        &nbsp;Cama: <b><span id="sp_Cama"></span></b></span>
                            </div>
                            <div class="controls" id="ICD10">
                                <span class="control-label">1º Código ICD10</span>
                                <input id="txt_CodigoICD10" class="span1" type="text" disabled/>
                                <input class="typeahead span7" id="cbo_DiagnosticoICD10_Pri" rel="Pri" type="text" data-provide="typeahead" autocomplete="off" style="width: 626px;"/>
                                <input type="hidden" id="diag_nombre_pri" class="Pri"/>
                                <input type="hidden" id="id_val_pri" value="0" class="Pri"/>
                            </div>
                            <div class="controls">
                                <span class="control-label">2º Código ICD10</span>
                                <input id="txt_Codigo_Detalle_ICD10" class="span1" type="text" disabled/>
                                <input class="typeahead span7" id="cbo_DiagnosticoICD10_Sec" rel="Sec" type="text" data-provide="typeahead" autocomplete="off" style="width: 626px;"/>
                                <input type="hidden" id="diag_nombre_sec" class="Sec"/>
                                <input type="hidden" id="id_val_sec" value="0" class="Sec"/>
                            </div>
                            <div class="controls">
                                <span class="control-label">3º Código ICD10</span>
                                <input id="txt_Codigo_Detalle_ICD10_3" class="span1" type="text" disabled/>
                                <input class="typeahead span7" id="cbo_DiagnosticoICD10_Ter" rel="Ter" type="text" data-provide="typeahead" autocomplete="off" style="width: 626px;"/>
                                <input type="hidden" id="diag_nombre_ter" class="Ter" />
                                <input type="hidden" id="id_val_ter" value="0" class="Ter" />
                            </div>
                            <div class="controls">
                                <span class="control-label">Observación Egreso:</span>
                                <input id="txt_Observacion" class="span6" type="text" style="width:662px;">
                            </div>
                            <div class="controls">
                                <span class="control-label">Especialidad:</span>
                                <select id="cbo_Especialidad" style="margin-left:48px; width: 327px;" class="input-xxlarge">
                                    <option value="0"></option>
                                </select>
                                <span class="control-label">Médico:</span>
                                <select id="cbo_Medico" class="input-xxlarge" style="width: 292px;">
                                    <option value="0"></option>
                                </select>
                            </div>
                            <div id="ControlOperado" class="controls control-group" style="margin-bottom:0;">
                                <span class="control-label">Operado:</span> <a id="btnOperado" class="btn">Si</a> <span class="control-label">
                                    Fecha Operado:</span>
                                <input id="txt_FechaOperado" class="span2" type="text">
                            </div>
                            <div class="controls">
                                <span class="control-label">Motivo Egreso:</span>
                                <select id="cbo_Motivo_Egreso" style="margin-left:35px; width:306px">
                                    <option value="0"></option>
                                </select>
                                <span class="control-label">Egresado por:</span>
                                <label id="txtEgresadopor" style="width:120px; display:inline; font-weight:bold;"></label>
                            </div>
                        </div>
                        <div class="clearfix">
                        </div>

                <div class="pie_gris">
                <div class="pull-left"><a class="btn" id="btnDevolver" style="display:none">Devolver control</a></div>

                    <div class="pull-right">
                        <a id="btnImprimir" class="btn" style="display:none;" onclick="javascript:ImpresionEgreso();"><i class=" icon-print"></i>&nbsp;Imprimir</a>
                        <a id="btnEgreso" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                        <button id="btnLimpiarEgreso" style="display:none;" class="btn btn-danger" runat="server">
                            <i class=" icon-remove-circle icon-white"></i>&nbsp;Eliminar Egreso</button>
                        <button id="btnGuardarEgreso" runat="server" class="btn btn-info">
                            <i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>
                    </div>
                </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Pie de pagina-->
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Internacion/Egreso.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <!--Barra sup-->
    <script type="text/javascript">
        $('#desdeaqui').click(function () {
            $("#hastaaqui").fadeIn(1500);
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
            $('.container').height($('html').height() + ($('.contenedor_1').height() + 100));
            $('#cbo_Especialidad').focus();
        });
    </script>
</body>
</html>
