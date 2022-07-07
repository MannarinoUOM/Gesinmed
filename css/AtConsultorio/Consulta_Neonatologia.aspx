<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Neonatologia.aspx.cs" Inherits="AtConsultorio_Consulta_Neonatologia" %>

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
        <div class="contenedor_1 fancywidth" style="width:800px;">
            <div class="contenedor_a" style="position: relative; margin-left: 10px; height: auto;
                padding-bottom: 25px;">
                <div class="resumen_datos" style="margin-top: 0px;">
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
                    <div class="clearfix">
                    </div>
                </div>
                <div>
                
                <div class="titulo_seccion" style="margin-top: 5px;">
                    <span>At. Neonatología - <span id="TEspecialidad"></span></span>
                </div>

                    <div style="padding: 0px 15px 0px 15px">

          <form class="form-horizontal" >
            <div class="control-group">
              <label class="control-label">Fecha Nacimiento</label>
              <div class="controls">
                <input type="text" id="txt_fecha" name="txt_fecha" class="span2" />
              </div>
            </div>
          </form>

          <form class="form-horizontal" >          
            <div class="control-group">
              <label class="control-label">Peso</label>
              <div class="controls">
                <input type="text" id="txt_peso" name="txt_peso" class="span1" />
              </div>
            </div>                     
          </form>


          <form class="form-horizontal" >          
            <div class="control-group">
              <label class="control-label">Talla</label>
              <div class="controls">
                <input type="text" id="txt_talla" name="txt_talla" class="span1" />
              </div>
            </div>                     
          </form>

          <form class="form-horizontal" >          
            <div class="control-group">
              <label class="control-label">Per. Cefálico</label>
              <div class="controls">
                <input type="text" id="txt_percefalico" name="txt_percefalico" class="span1" />
              </div>
            </div>                     
          </form>

                    </div>

                </div>
                
                <div class="pie_gris">
                    <a id="btnGuardar" class="btn btn-info pull-right">Guardar</a> <a id="btnImprimir" onclick="javascript:Imprimir();" class="btn pull-right">
                        Imprimir</a>
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
    <script src="../js/Hospitales/AtConsultorio/Consulta_Neonatologia.js" type="text/javascript"></script>
    <!--Barra sup-->
</body>
</html>
