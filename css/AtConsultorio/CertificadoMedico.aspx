<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CertificadoMedico.aspx.cs" Inherits="AtConsultorio_CertificadoMedico" %>

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
    <div class="container" style="padding-top: 0px; width:800px;">
        <div class="contenedor_1" style="width:800px;">
            
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: block;">
                <div class="resumen_datos" style="font-size:12px;">
                    <div class="datos_persona">
                        <div>
                            <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img>
                        </div>
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span>&nbsp;(<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                            <div>
                                Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp;
                                <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contenedor_3" style="height:215px; width:770px;">
                    <div class="titulo_seccion">
                        &nbsp;&nbsp;<span>Certificado Médico</span></div>
                    <div class="">
                        <div class="minicontenedor100" style="height:130px;">
                            <input id="txtAnterior" type="hidden" />
                            <textarea id="txtCertificado" name="txtCertificado" rows="6" style="width:98%; "></textarea>
                            <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
                        </div>
                        <div class="clearfix">
                        </div>

                        <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
                    <div class="pull-right" style="padding: 5px">
                        <a id="btnUC" class="btn" style="display:none;"><i class=" icon-file"></i>&nbsp;Cargar Último Certificado</a>
                        <a id="btnCancelar" class="btn btn-danger"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                        <button id="btnGuardarCertificado" class="btn btn-info">
                            <i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
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
    <script src="../js/Hospitales/AtConsultorio/CertificadoMedico.js" type="text/javascript"></script>


    <!--Barra sup-->
    <script type="text/javascript">

        parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Egreso</strong>";

    </script>
</body>
</html>
