<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Holter.aspx.cs" Inherits="EstudiosComplementarios_Holter" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>GesInMed</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form2" runat="server">
    <div class="container" style="">
        <div class="contenedor_4" style="width: 940px; height: 500px; padding: 10px; margin-left: 0px">
            <div class="contenedor_3" style="padding: 0px; height: 100%">
                <%--DATOS AFILIADO--%>
                <input id="afiliadoId" type="hidden" />
                <div class="resumen_datos" style="height: 80px;">
                    <div class="datos_persona">
                        <div>
                            <img id="fotopaciente" class="avatar2" src="../img/silueta.jpg" onerror="imgErrorPaciente(this);" />
                        </div>
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span>(<span id="CargadoEdad"></span>)</strong><a
                                    href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                            <div>
                                Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp;
                                <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                            </div>
                            <div>
                                Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp;
                                <span>Sala: <strong><span id="CargadoSala"></span></strong></span><span>Cama: <strong>
                                    <span id="CargadoCama"></span></strong></span>
                            </div>
                            <input type="hidden" id="Hidden1" />
                            <input type="hidden" id="ProtocoloImpresion" />
                        </div>
                    </div>
                </div>
                <%--DATOS AFILIADO--%>
                <div style="height: 200px">
                    <%--<table class='table' style=" margin-bottom:0px "><tr style='background-color:black; color:white'><td style='width:10%' >Fecha Movimiento</td><td style='width:5%' >Hora</td><td style='width:10%' >Sector</td><td style='width:15%' >Número Bono<br />Comprobante</td><td style='width:10%' >Importe</td><td style='width:10%' >Especialidad</td><td style='width:30%' >Observaciones</td></tr></table>--%>
                    <div style="height: 20%; overflow: no">
                        <label id="lblCardiología" style="font-weight: bold; margin-left: 350px; display: inline">
                            Servicio de Cardiología</label>
                        <br />
                        <div id="divFecha" style="text-align: right;">
                            <label id="lblFecha" style="font-weight: bold; margin-left: 350px; display: inline;">
                                Fecha practica:</label>
                            <input type="date" id="fechaPractica" name="fechaPractica" value="" min="2022-01-01" />
                        </div>
                        <label id="lblMonitoreoHolter" style="font-weight: bold; margin-left: 15px; display: inline">
                            Monitoreo Holter</label>
                        <br />
                        <br />
                        <label id="lblConclusion" style="font-weight: bold; margin-left: 15px; display: inline">
                            Conclusiones:</label>
                        <div id="divConclu">
                            <textarea id="txtConclusion" style="width: 95%; height: 180px; margin: 15px" placeholder="Ingrese Conclusión"
                                maxlength="5000"></textarea>
                        </div>
                    </div>
                </div>
                <div class="pie_gris">
                    <a id="btnCerrar" class="btn btn-info pull-right">Cerrar</a> <a id="btnGuardarHolter"
                        class="btn btn-info pull-right">Guardar</a> <a id="btnImprimirHolter" class="btn btn-info pull-right">
                            Imprimir</a>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/EstudiosComplementarios/EstudiosComplementarios.js"
    type="text/javascript"></script>
