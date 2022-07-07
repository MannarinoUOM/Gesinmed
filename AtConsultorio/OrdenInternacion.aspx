<%@ Page Language="C#" AutoEventWireup="true" CodeFile="OrdenInternacion.aspx.cs" Inherits="AtConsultorio_OrdenInternacion" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
</head>
<body>
    <div class="container">
        <div class="contenedor_1 fancywidth" style="height:520px;">
            <div class="contenedor_a" style="position: relative; margin-left: 10px;height:490px;">
                <div class="resumen_datos" style="margin-top: 0px; font-size:12px;">
                    <div class="datos_persona">
                        <div>
                            <img id="fotopaciente" class="avatar2" src="../img/silueta.jpg"></img>
                        </div>
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor: pointer;"
                                    onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                            <div>
                                Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>
                        </div>
                    </div>
                    <div class="pull-left" style="margin-left: 20px">
                        <div>
                            Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
                        <div>
                            Seccional:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
                        <div>
                            Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
                    </div>
                    <input type="hidden" id="afiliadoId" />
                    <div class="clearfix">
                    </div>
                </div>
                <div>
<%--                <div class="titulo_seccion" style="margin-top: 5px;">
                    <span>Orden de Internación</span>
                </div>--%>

                    <div style="padding: 0px 15px 0px 15px">

                    <form class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Debe ser internado en el servicio</label>
              <div class="controls">
                <select id="cbo_Servicios" type="text" class="span5"></select>
              </div>
            </div>
          </form>

           <form class="form-horizontal" >
            <div class="control-group">
              <label class="control-label">Diagnóstico</label>
              <div class="controls">
                <textarea id="txt_Diagnostico" type="text" rows="3" class="span5"></textarea>
              </div>
            </div>
          </form>

          <form class="form-horizontal" >
            <div class="control-group">
              <label class="control-label">Orden indicada por el area de</label>
              <div class="controls">
                <select id="cbo_area" type="text" class="span5">
                <option value="1">Consultorios Externos</option>
                <option value="2">Emergencias</option>
                </select>
              </div>
            </div>
          </form>
            
           <form class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Fecha probable de internación a confirmar</label>
              <div class="controls">
                <input id="txt_fecha_Internacion" type="text" class="input-small" style="margin-left:5px;">
              </div>
            </div>
          </form>

<%--            <div style="padding:0px 15px 0px 15px">
          <table class="comprimida">
            <tr>
              <td><span>Fecha probable de internación a confirmar</span></td>
              <td><input id="txt_fecha_Internacion" type="text" class="input-small" style="margin-left:5px;"></td>
              <td style="display:none;"><span>&nbsp;&nbsp;&nbsp;Piso</span></td>
              <td style="display:none;"><input id="txt_piso" class="span1" type="text"></td>
              <td style="display:none;"><span>&nbsp;&nbsp;&nbsp;Cama</span></td>
              <td style="display:none;"><input id="txt_cama" class="span1" type="text"></td>
            </tr>
          </table>
        </div>--%>
        <div class="clearfix"></div>

        <form class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Inidicaciones para enfermeria</label>
              <div class="controls">
                <textarea id="txt_indicaciones" type="text" rows="2" class="span5"></textarea>
              </div>
            </div>
          </form>

                    </div>

                </div>
                
                <div class="pie_gris">
                    <a id="btnGuardar" class="btn btn-info pull-right"><i class="icon-ok"></i>&nbsp;Guardar</a>
                    <a id="btnCerrar" class="btn btn-danger  pull-right"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                    <a id="UO" style="display:none;" onclick="javascript:RecargarUo();" class="btn pull-right">Cargar Orden Anterior</a>
                    <a id="btnImprimir" style="display:none;" class="btn pull-right">Imprimir</a>
                    <div class="clearfix">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AtConsultorio/OrdenInternacion.js" type="text/javascript"></script>
    <!--Barra sup-->
</body>
</html>
