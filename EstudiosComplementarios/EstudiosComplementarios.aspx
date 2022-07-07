<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EstudiosComplementarios.aspx.cs" Inherits="EstudiosComplementarios_PracticasComplementarias" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>

    <asp:Literal ID="literal_usuario" runat="server"></asp:Literal>


    <style>
        .dropdown-menu {
            max-height: 250px;
            max-width: 800px;
            font-size: 11px;
            overflow-y: auto;
            overflow-x: hidden;
        }
    </style>

</head>
<body>
    <div class="container">
        <div class="contenedor_1 fancywidth" style="width: 730px; overflow-y: hidden;">
            <div class="contenedor_a" style="position: relative; margin-left: 10px; height: 450px; padding-bottom: 25px; overflow-y: hidden;">
                <div class="resumen_datos" style="margin-top: 0px; font-size: 12px;">
                    <div class="datos_persona">
                        <div>
                            <img id="fotopaciente" class="avatar2" src="../img/silueta.jpg"></img>
                        </div>
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor: pointer;"
                                    onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a>
                            </div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                            <input id="afiliadoId" value="" type="hidden" />
                            <div>
                                Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                    <div class="pull-left" style="margin-left: 20px">
                        <div>
                            Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span>
                        </div>
                        <div>
                            Seccional/OS:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span>
                        </div>
                        <div>
                            Fecha:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoFecha"></span></strong></span>
                        </div>

                        <div class="clearfix"></div>
                    </div>
                </div>
                <div>

                    <div class="titulo_seccion" style="margin-top: 5px;">
                        <span>Seleccionar práctica<span id="TEspecialidad"></span></span>
                    </div>

                    <div style="padding: 0px 80px 0px 80px">

                        <!--<div id="cargando" style="text-align: center; display: none; height: 200px;">
                            <img src="../img/Espere.gif" /><br />
                            Cargando Historia Clínica...
                        </div>-->

                        <form class="form-horizontal opc" style="">
                            <div id="Controlcbo_EstudiosComplementarios" class="control-group">
                                <label class="control-label" style="text-align: left; width:100px" for="cbo_EstudiosComplementarios">
                                    Estudios complementarios:</label>
                                <div class="controls">
                                    <select style="width:350px;" id="cbo_EstudiosComplementarios">
                                    </select>
                                </div>
                            </div>
                        </form>
                        <form class="form-horizontal opc">
                            <div id="Controlcbo_TipoEstudiosComplementarios" class="control-group">
                                <label class="control-label" style="width:100px; text-align: left" for="cbo_TipoEstudiosComplementarios">
                                    Tipo Estudio complementario:</label>
                                <div class="controls">
                                    <select style="width:350px;" id="cbo_TipoEstudiosComplementarios">
                                    </select>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

                <div class="pie_gris">
                    <a id="btnSiguiente" onclick="javascript:Siguiente();" class="btn btn-success pull-right">Siguiente</a>
                    <a id="btnCancelar" class="btn btn-danger pull-right"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                    <!--<a id="btnGuardar" class="btn btn-info pull-right"><i class="icon-ok"></i>&nbsp;Guardar</a>                    
                    <a id="btnImprimir" onclick="javascript:Imprimir();" class="btn pull-right"><i class="icon-print"></i>&nbsp;Imprimir</a>-->
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
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />   
    <script src="../js/Hospitales/EstudiosComplementarios/EstudiosComplementarios.js" type="text/javascript"></script>
    <!--Barra sup-->

</body>
</html>


