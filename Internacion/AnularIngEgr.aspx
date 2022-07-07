<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AnularIngEgr.aspx.cs" Inherits="Internacion_AnularIngEgr" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="contenedor_2">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Datos del paciente</span></div>
                <form class="form-horizontal">
                 <div id="controlcbo_TipoDOC" class="control-group">
                      <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                      <div class="controls">
                          <select id="cbo_TipoDOC">
                          </select>          
                       </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        N°</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" placeholder="Nro. de documento sin puntos">
                        <input id="txtdocumento" type="hidden" />
                        <input id="Hidden1" value="" class="ingreso" type="hidden"/>
                        <a id="btnVencimiento" style="display:none;" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
                        <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" type="text" placeholder="Ej: 99123456789">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtPaciente">
                        Paciente</label>
                    <div class="controls">
                        <input id="txtPaciente" placeholder="Apellido Nombre" type="text" class="span3">
                        <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black">
                        </i></a>
                    </div>
                </div>
                <div id="controlTelefono" class="control-group">
                    <label class="control-label">
                        Teléfono</label>
                    <div class="controls">
                        <input id="txtTelefono" maxlength="13" placeholder="Ej. 43625910" type="text">
                    </div>
                </div>
        <div id="controlSeccional" class="control-group">
        
          <label class="control-label" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" />
          
              <select id="cboSeccional">
                <option value="0">Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" style="display:none;"></select>          

           </div>

        </div>
                </form>
                <div class="control-group">
                    <div class="controls pagination-centered">
                        <a id="desdeaqui" style="display: none; margin-top:5px;" class="btn btn-success"><span id="desdeaqui_nombre">Siguiente</span></a>
                        <a id="btnOtroPaciente" href="AnularIngEgr.aspx" style="display:none; margin-top:-10px;" class="btn btn-danger"><span id="Span1">Otro Paciente</span></a>
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
                <div class="contenedor_3">
                    <div class="titulo_seccion" style="display:none;">
                        <img src="../img/2.jpg" />&nbsp;&nbsp;<span id="spanTipo">Egreso</span></div>
                    <div class="">
                        <div class="minicontenedor100" style="height:355px;">
                            <div class="controls">
                                <div id="FechaEgr">
                                    <span class="control-label">Fecha Egreso:</span>
                                    <input id="txt_FechaEgreso" class="span2" type="text">
                                    <span class="control-label">Hora Egreso:</span>
                                    <input id="txt_HoraEgreso" class="span1" type="text">
                                </div>
                              <label style="display:inline">Fecha Ingreso:<input id="txt_fechaIngreso" type="text" disabled="disabled" class="input-medium"/></label><%--manuel--%>
                              <label style="display:inline">Hora Ingreso:<input id="txt_HoraIngreso" type="text" disabled="disabled" class="input-mini"/></label>
                            </div>
                            <div class="controls">
                            <span class="control-label" style="display:none;">Nº Internación: <b><span id="NroInt"></span></b></span>
                                <span class="control-label">Servicio: <b><span id="sp_Servicio"></span></b></span><span
                                    class="control-label">&nbsp;Sala: <b><span id="sp_Sala"></span></b></span><span class="control-label">
                                        &nbsp;Cama: <b><span id="sp_Cama"></span></b></span>
                            </div>
                            <div class="controls" id="DiagSN" style="display:none;">
                                <span class="control-label">Diagnóstico</span>
                                <select id="cboDiagSN" style="width:330px;">
                                    <option value="0"></option>
                                </select>
                            </div>
                            <div class="controls" id="ICD10">
                                <span class="control-label">Código ICD10</span>
                                <input id="txt_CodigoICD10" class="span1" type="text" style="margin-left:48px">
                                <span class="control-label" style="margin-left:84px">Diagnóstico ICD10</span>
                                <select id="cbo_DiagnosticoICD10">
                                    <option value="0"></option>
                                </select>
                            </div>
                            <div class="controls" id="ICD10Det">
                                <span class="control-label">Código Detalle ICD10</span>
                                <input id="txt_Codigo_Detalle_ICD10" class="span1" type="text">
                                <span class="control-label" style="margin-left:35px">Diagnóstico Detalle ICD10</span>
                                <select id="cbo_Diagnostico_Detalle_ICD10">
                                    <option value="0"></option>
                                </select>
                            </div>
                            <div class="controls">
                                <span class="control-label" id="lblObs">Observación Egreso:</span>
                                <input id="txt_Observacion" class="span6" type="text" style="width:480px">
                            </div>
                            <div class="controls">
                                <span class="control-label">Especialidad:</span>
                                <select id="cbo_Especialidad" style="margin-left:48px">
                                    <option value="0"></option>
                                </select>
                                <span class="control-label">Médico:</span>
                                <select id="cbo_Medico">
                                    <option value="0"></option>
                                </select>
                            </div>
                            <div id="ControlOperado" class="controls control-group" style="margin-bottom:0;">
                                <span class="control-label">Operado:</span> <a id="btnOperado" class="btn">Si</a> <span class="control-label">
                                    Fecha Operado:</span>
                                <input id="txt_FechaOperado" class="span2" type="text">
                            </div>
                            <div class="controls" id="EgresoMot">
                                <span class="control-label">Motivo Egreso:</span>
                                <select id="cbo_Motivo_Egreso" style="margin-left:35px; width:306px">
                                    <option value="0"></option>
                                </select>
                                <span class="control-label">Egresado por:</span>
                                <label id="txtEgresadopor" style="width:120px; display:inline; font-weight:bold;"></label>
                            </div>
                            <div class="controls" id="HospPor" style="display:none;">
                                <span class="control-label">Hospitalizado por:</span>
                                <select id="cbo_Hospor" style="margin-left:20px; width:306px">
                                    <option value="0"></option>
                                </select>
                             </div>
                             <div class="controls" id="IngresoMot" style="display:none;">
                                <span class="control-label">Motivo Ingreso:</span>
                                <select id="cbo_Motivo" style="margin-left:35px; width:306px">
                                    <option value="0"></option>
                                </select>
                                <span class="control-label" style="display:none;">Ingresado por:</span>
                                <label id="txtIngresadopor" style="width:120px; display:inline; font-weight:bold;"></label>
                            </div>
                             <div class="controls">
                                <span class="control-label" id="anula">Motivo Anulación:</span>
                                <input id="motivoanula" class="span6" type="text" style="width:480px; margin-left:20px;">
                            </div>
                        </div>
                        <div class="clearfix">
                        </div>

                <div class="pie_gris">
                    <div class="pull-right" style="padding: 5px">
                        <a id="btnEgreso" href="AnularIngEgr.aspx" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                        <a id="btnLimpiarEgreso" style="display:none;" class="btn btn-danger" runat="server">
                            <i class=" icon-remove-circle icon-white"></i>&nbsp;Anular Egreso</a>
                            <a id="btnLimpiarIngreso" style="display:none;" class="btn btn-danger" runat="server">
                            <i class=" icon-remove-circle icon-white"></i>&nbsp;Anular Ingreso</a>
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
    <script src="../js/Hospitales/Internacion/AnularIngEgr.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>


    <!--Barra sup-->
    <script type="text/javascript">
        $('#desdeaqui').click(function () {
            $("#hastaaqui").fadeIn(1500);
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
            $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
            $('#cbo_Especialidad').focus();
        });



        parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Anular Ingreso/Egreso</strong>";

    </script>
</body>
</html>
