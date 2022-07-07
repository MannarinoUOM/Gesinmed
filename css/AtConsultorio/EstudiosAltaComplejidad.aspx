<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EstudiosAltaComplejidad.aspx.cs" Inherits="AtConsultorio_EstudiosAltaComplejidad" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
        <div class="contenedor_1 fancywidth" style="height:500px;">
            <div class="contenedor_a" style="position: relative; margin-left: 10px;height:460px;">
                <div class="resumen_datos" style="margin-top: 0px; font-size:12px; height:80px;">
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
                                 <div class="Int">Sala: <strong><span id="CargadoSala"></span></strong>&nbsp;&nbsp;&nbsp;</div>
                        </div>
                    </div>
                    <div class="pull-left" style="margin-left: 20px">
                        <div>
                            Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
                        <div>
                            Seccional:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
                        <div>
                            Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
                            <div class="Int">Cama:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoCama"></span></strong></span></div>
                    </div>
                    <input type="hidden" id="afiliadoId" />
                    <div class="clearfix">
                    </div>
                </div>
                <div>

                    <div style="padding: 0px 15px 0px 15px">

           <form class="form-horizontal">
            <div class="control-group">
              <%--<label class="control-label" style="font-size:10px;"></label>--%>
              <label id="lbl_Medico" class="span5"></label>
            </div>
          </form>

           <form class="form-horizontal" style="margin-top:-10px;">
            <div class="control-group">
              <label class="control-label" style="font-size:12px;">Práctica, estudio y/o tratamiento solicitados: </label>
              <div class="controls">
                <textarea id="txt_Practicas" type="text" rows="2" class="span5"></textarea>
              </div>
            </div>
          </form>

           <form class="form-horizontal" style="margin-top:-10px;">
            <div class="control-group">
              <label class="control-label" style="font-size:12px;">Resumen HC, diagnóstico y estado del paciente: </label>
              <div class="controls">
                <textarea id="txt_Estado" type="text" rows="3" class="span5"></textarea>
              </div>
            </div>
          </form>
    
           <form class="form-horizontal" style="margin-top:-10px;">
            <div class="control-group">
              <label class="control-label" style="font-size:12px;">Relación de lo solicitado con el algoritmo correspondiente: </label>
              <div class="controls">
                <textarea id="txt_Algoritmo" type="text" rows="3" class="span5"></textarea>
              </div>
            </div>
          </form>

           <form class="form-horizontal" style="margin-top:-10px;">
            <div class="control-group">
              <label class="control-label" style="font-size:12px;">Resultados que se esperan obtener: </label>
              <div class="controls">
                <textarea id="txt_Resultados" type="text" rows="2" class="span5"></textarea>
              </div>
            </div>
          </form>

         <form class="form-horizontal" style="margin-top:-15px;">
            <div class="control-group">
              <label class="control-label">Fecha: </label>
              <div class="controls">
                <input type="text" id="txt_Fecha" maxlength="10" class="span2" />
              </div>
            </div>
          </form>


                    </div>
                </div>
                <div class="pie_gris">
                    <a id="btnGuardar" class="btn btn-info pull-right"><i class="icon-ok"></i>&nbsp;Guardar</a>
                    <a id="btnUltimoEst" class="btn btn-inverse  pull-right"><i class="icon-ok icon-white"></i>&nbsp;Ultimo Estudio</a>
                    <a id="btnCerrar" class="btn btn-danger  pull-right"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                    <a id="btnBuscar" class="btn btn-warning  pull-right"><i class="icon-search"></i>&nbsp;Buscar Estudios</a>
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
    <script src="../js/Hospitales/AtConsultorio/EstudiosAltaComplejidad.js" type="text/javascript"></script>
    <!--Barra sup-->
</body>
</html>
