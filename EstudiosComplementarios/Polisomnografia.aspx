<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Polisomnografia.aspx.cs"
    Inherits="EstudiosComplementarios_Polisomnografia" %>

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
    <form id="form1" runat="server">
    <div class="container" style="">
        <div class="contenedor_4" style="width: 940px; height: 1000px; padding: 10px; margin-left: 0px">
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
                <div style="height: 250px">
                    <%--<table class='table' style=" margin-bottom:0px "><tr style='background-color:black; color:white'><td style='width:10%' >Fecha Movimiento</td><td style='width:5%' >Hora</td><td style='width:10%' >Sector</td><td style='width:15%' >Número Bono<br />Comprobante</td><td style='width:10%' >Importe</td><td style='width:10%' >Especialidad</td><td style='width:30%' >Observaciones</td></tr></table>--%>
                    <div style="height: 10%; overflow: no">
                        <label id="lblPolisomnografia" style="font-weight: bold; margin-left: 280px; display: inline;
                            font-size: 30px">
                            Estudio de Polisomnografía</label>
                        <br />
                        <div id="divFecha" style="text-align: right;">
                            <label id="lblFecha" style="font-weight: bold; margin-left: 350px; display: inline;">
                                Fecha practica:</label>
                            <input type="date" id="fechaPractica" name="fechaPractica" value="" min="2022-01-01" />
                        </div>
                        <br />
                        <label id="lblLaboPulmonar" style="font-weight: bold; margin-left: 15px; display: inline;
                            font-size: 25px">
                            Realizado en Laboratorio Pulmonar</label>
                        <br />
                        <label id="lblMotivoEstudio" style="margin-left: 15px; display: inline; font-size: 25px">
                            Motivo del Estudio:</label>
                        <div id="divMotivoEstudio">
                            <textarea id="txtMotivoEstudio" style="width: 95%; height: 30px; margin: 15px; font-size: 20px"
                                placeholder="Ingrese Motivo del Estudio" maxlength="5000"></textarea>
                        </div>
                        <div class="ParametrosNeurologicosMedidos">
                            <br />
                            <label id="lblParNeurologicosMedidos" style="font-weight: bold; margin-left: 15px;
                                display: inline; font-size: 25px">
                                Parámetros Neurológicos Medidos:</label>
                            <br />
                            <input id="chkOculogramaIzq" style="margin-left: 15px; font-size: 20px" name="chkOculogramaIzq"
                                type="checkbox" class="input-mini" />
                            <label id="lblOculogramaIzq" style="margin-left: 20px; display: inline; font-size: 20px">
                                Oculograma Izquierdo</label>
                            <br />
                            <input id="chkOculogramaDer" style="margin-left: 15px;" name="chkOculogramaDer" type="checkbox"
                                class="input-mini" />
                            <label id="lblOculogramaDer" style="margin-left: 20px; display: inline; font-size: 20px">
                                Oculograma Derecho</label>
                            <br />
                            <input id="chkElectromiogramaSubmentoniano" style="margin-left: 15px;" name="chkElectromiogramaSubmentoniano"
                                type="checkbox" class="input-mini" />
                            <label id="lblElectromiogramaSubmentoniano" style="margin-left: 20px; display: inline;
                                font-size: 20px">
                                Electromiograma Submentoniano</label>
                            <br />
                            <input id="chkC3A2" style="margin-left: 15px;" name="chkC3A2" type="checkbox" class="input-mini" />
                            <label id="lblC3A2" style="margin-left: 20px; display: inline; font-size: 20px">
                                C3 A2</label>
                            <br />
                            <input id="chkC4A1" style="margin-left: 15px;" name="chkC4A1" type="checkbox" class="input-mini" />
                            <label id="lblC4A1" style="margin-left: 20px; display: inline; font-size: 20px">
                                C4 A1</label>
                            <br />
                            <input id="chkEMGTibial" style="margin-left: 15px;" name="chkEMGTibial" type="checkbox"
                                class="input-mini" />
                            <label id="lblEMGTibial" style="margin-left: 20px; display: inline; font-size: 20px">
                                EMG Tibial Anterior Izquierdo/derecho</label>
                            <br />
                        </div>
                        <br />
                        <div class="ParametrosCardioRespiratoriosMedidos">
                            <label id="lblParCardioRespiratorioMedidos" style="font-weight: bold; margin-left: 15px;
                                display: inline; font-size: 25px">
                                Parámetros Cardio-Respiratorios Medidos</label>
                            <br />
                            <input id="chkOximetria" style="margin-left: 15px;" name="chkOximetria" type="checkbox"
                                class="input-mini" />
                            <label id="lblOximetriaPulso" style="margin-left: 20px; display: inline; font-size: 20px">
                                Oximetría de Pulso:</label>
                            <br />
                            <input id="chkFlujoAereoBuco-Nasal" style="margin-left: 15px;" name="chkFlujoAereoBuco-Nasal"
                                type="checkbox" class="input-mini" />
                            <label id="lblFlujoAereoBuco-Nasal" style="margin-left: 20px; display: inline; font-size: 20px">
                                Flujo Aereo buco-nasal</label>
                            <br />
                            <input id="chkMovimientosTorácicosYAbdominales" style="margin-left: 15px;" name="chkMovimientosTorácicosYAbdominales"
                                type="checkbox" class="input-mini" />
                            <label id="lblMovimientosTorácicosYAbdominales" style="margin-left: 20px; display: inline;
                                font-size: 20px">
                                Movimientos Torácicos y Abdominales</label>
                            <br />
                            <input id="chkVideoImagenSonido" style="margin-left: 15px;" name="chkVideoImagenSonido"
                                type="checkbox" class="input-mini" />
                            <label id="lblVideoImagenSonido" style="margin-left: 20px; display: inline; font-size: 20px">
                                Video imagen y sonido</label>
                            <br />
                            <input id="chkElectrocardiograma" style="margin-left: 15px;" name="chkElectrocardiograma"
                                type="checkbox" class="input-mini" />
                            <label id="lblElectrocardiograma" style="margin-left: 20px; display: inline; font-size: 20px">
                                Electrocardiograma</label>
                            <br />
                            <input id="chkSonido" style="margin-left: 15px;" name="chkSonido" type="checkbox"
                                class="input-mini" />
                            <label id="lblSonidoRonquidos" style="margin-left: 20px; display: inline; font-size: 20px">
                                Sonido (ronquidos)</label>
                            <br />
                            <input id="chkTransitoOndaPulso" style="margin-left: 15px;" name="chkTransitoOndaPulso"
                                type="checkbox" class="input-mini" />
                            <label id="lblTransitoOndaPulso" style="margin-left: 20px; display: inline; font-size: 20px">
                                Tiempo de Tránsito de la Onda de Pulso</label>
                            <br />
                            <input id="chkPresionEsofagica" style="margin-left: 15px;" name="chkPresionesofagica"
                                type="checkbox" class="input-mini" />
                            <label id="lblPresionEsofagica" style="margin-left: 20px; display: inline; font-size: 20px">
                                Presión esofágica</label>
                            <br />
                        </div>
                        <br />
                        <div class="EquiposUtilizados">
                            <label id="lblEquiposUtilizados" style="font-weight: bold; margin-left: 15px; display: inline;
                                font-size: 25px">
                                Equipos Utilizados</label>
                            <br />
                            <input id="chkPolisomnografocomputarizado21" name="chkPolisomnografocomputarizado21"
                                style="margin-left: 15px" type="checkbox" class="input-mini" />
                            <label id="lblPolisomnografocomputarizado21" style="margin-left: 20px; display: inline;
                                font-size: 20px">
                                Polisomnógrafo computarizado 21 canales Bioscience</label>
                            <br />
                            <input id="chkPolisomnografocomputarizadoATI" name="chkPolisomnografocomputarizadoATI"
                                style="margin-left: 15px" type="checkbox" class="input-mini" />
                            <label id="lblPolisomnografocomputarizadoATI" style="margin-left: 20px; display: inline;
                                font-size: 20px">
                                Polisomnógrafo computarizado ATI</label>
                            <br />
                            <input id="chkOximetroNelicor" name="chkOximetroNelicor" style="margin-left: 15px"
                                type="checkbox" class="input-mini" />
                            <label id="lblOximetroNelicor" style="margin-left: 20px; display: inline; font-size: 20px">
                                Oxímetro Nelicor PB NPB-295</label>
                            <br />
                            <input id="chkPoligrafoStardust" name="chkPoligrafoStardusto" style="margin-left: 15px"
                                type="checkbox" class="input-mini" />
                            <label id="lblPoligrafoStardust" style="margin-left: 20px; display: inline; font-size: 20px">
                                Polígrafo Stardust (Respirónics – Phillips)</label>
                            <br />
                            <input id="chkPoligrafoAlice" name="chkPoligrafoAlice" style="margin-left: 15px"
                                type="checkbox" class="input-mini" />
                            <label id="lblPoligrafoAlice" style="margin-left: 20px; display: inline; font-size: 20px">
                                Polígrafo Alice Night One (Respironics-Phillips)
                            </label>
                            <br />
                            <input id="chkPoligrafoOxford" name="chkPoligrafoOxford" style="margin-left: 15px"
                                type="checkbox" class="input-mini" />
                            <label id="lblPoligrafoOxford" style="margin-left: 20px; display: inline; font-size: 20px">
                                Polígrafo “grey Flash” Stoodwood, Oxford
                            </label>
                            <br />
                            <input id="chkAutoCPAP" name="chkAutoCPAP" style="margin-left: 15px" type="checkbox"
                                class="input-mini" />
                            <label id="lblAutoCPAP" style="margin-left: 20px; display: inline; font-size: 20px">
                                Auto CPAP Phillps</label>
                            <br />
                        </div>
                        <div class="pie_gris">
                            <a id="btnCerrar" class="btn btn-info pull-right">Cerrar</a> 
                            <a id="btnGuardarPolisomnografia" class="btn btn-info pull-right">Guardar</a> 
                            <a id="btnImprimirPolisomnografia" class="btn btn-info pull-right">Imprimir</a>
                        </div>
                    </div>
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
