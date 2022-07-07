<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RiesgoQuirurgico.aspx.cs"
    Inherits="EstudiosComplementarios_RiesgoQuirurgico" %>

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
        <div class="contenedor_4" style="width: 940px; height: 1700px; margin-left: 0px">
            <div class="contenedor_3" style="padding: 0px; height: 100%; width: 99%">
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
                <div style="height: 700px">
                    <%--<table class='table' style=" margin-bottom:0px "><tr style='background-color:black; color:white'><td style='width:10%' >Fecha Movimiento</td><td style='width:5%' >Hora</td><td style='width:10%' >Sector</td><td style='width:15%' >Número Bono<br />Comprobante</td><td style='width:10%' >Importe</td><td style='width:10%' >Especialidad</td><td style='width:30%' >Observaciones</td></tr></table>--%>
                    <div>
                        <div>
                            <label id="lblRiesgoQuirurgico" style="font-weight: bold; font-size: 30px; text-align: center">
                                Riesgo Quirúrgico</label>
                            <br />
                            <br />
                            <div id="divFecha" style="text-align: right;">
                                <label id="lblFecha" style="font-weight: bold; margin-left: 350px; display: inline;">
                                    Fecha practica:</label>
                                <input type="date" id="fechaPractica" name="fechaPractica" value="" min="2022-01-01" />
                            </div>
                            <label id="lblRiesgoClinicoPreoperatorio" style="font-weight: bold; margin-left: 15px;
                                display: inline; font-size: 20px">
                                A) Riesgo Clinico Preoperatorio:</label>
                            <br />
                            <label id="lblCriteriosMayores" style="font-weight: bold; margin-left: 15px; display: inline;
                                font-size: 20px">
                                Criterios mayores:</label>
                            <br />
                            <br />
                            <div class="container">
                                <div>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chCirugiaUrgente" />
                                                    1. Cirugía urgente
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chIAMMenor6" />
                                                    2. IAM, SCA o Angor CF III-IV < 6 meses
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chEstenosis" />
                                                    3. Estenosis Ao o Mitral Severa
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="container">
                                <label id="lblCriteriosMenores" style="font-weight: bold; display: inline; font-size: 20px">
                                    Criterios menores:</label>
                                <br />
                                <br />
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chMayor70anios" />
                                                1. > 70 años
                                            </td>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chDiabetes" />
                                                2. Diabetes
                                            </td>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chVasculopatia" />
                                                3. Vasculopatía
                                            </td>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chEnfCoronaria" />
                                                4. Enf Coronaria
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chICCoFey" />
                                                5. ICC o Fey < 40%
                                            </td>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chACV" />
                                                6. ACV
                                            </td>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chInsufMiOAosevera" />
                                                7. Insuf. Mi o Ao severa
                                            </td>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chEPOCsevero" />
                                                8. EPOC severo
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chCancerActivo" />
                                                9. Cáncer activo
                                            </td>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chCr" />
                                                10. Cr ≥ 2,0 mg/dL
                                            </td>
                                            <td>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">
                                                Alto Riesgo
                                            </th>
                                            <th scope="col">
                                                Moderado Riesgo
                                            </th>
                                            <th scope="col">
                                                Bajo riesgo
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chMayor" />
                                                >= 1 Mayor o >= 2 Menores
                                            </td>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chNingunMayor1Menor" />
                                                Ningún mayor y 1 menor
                                            </td>
                                            <td>
                                                <input type="checkbox" class="custom-control-input" id="chNingunMayor" />
                                                Ningún mayor ni menor
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <label id="lblRiesgoCirugia" style="font-weight: bold; margin-left: 15px; display: inline;
                                font-size: 20px">
                                B) Riesgo de la cirugía:</label>
                            <br />
                            <div>
                                <div style="overflow: auto; height: 530px">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    Alto Riesgo, > 5%
                                                </th>
                                                <th scope="col">
                                                    Moderado Riesgo, 1-5%
                                                </th>
                                                <th scope="col">
                                                    Bajo riesgo, <1%
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chAortica" />
                                                    Aórtica
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chAbdominal" />
                                                    Abdominal, no incluídas en general mayor
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chMamas" />
                                                    Mamas
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chVascularPeriferica" />
                                                    Vascular périferica
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chEndarterectomía" />
                                                    Endarterectomía carotídea
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chEndocrina" />
                                                    Endocrina (tiroides)
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chToracicaMayor" />
                                                    Torácica Mayor
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chAngioplastiaPeriferica" />
                                                    Angioplastía periférica
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chOftamológica" />
                                                    Oftamológica
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chNeurocirugiaMayor" />
                                                    Neurocirugía Mayor
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chProcedimientoEndoscopicoTerapeutico" />
                                                    Procedimiento Endóscopico Terapéutico
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chGinecologicaMenor" />
                                                    Ginecológica Menor
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chGeneralMayor" />
                                                    GeneralMayor (resección visceral, transplante, colectomía)
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chCirugiaCabezaYCuello" />
                                                    Cirugía de cabeza y cuello
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chPlástica" />
                                                    Plástica
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                </th>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chOrtopedicaMayor" />
                                                    Ortopédica mayor (cadera, fémur, rodilla)
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chOrtopedicaMenor" />
                                                    Ortopédica Menor
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chUrologicaOGinecologicaMayor" />
                                                    Urológica o ginecológica mayor (riñon, vejiga, próstata, útero)
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chUrologicaMenor" />
                                                    Urológica Menor
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                </td>
                                                <td>
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chEndoscopiaDX" />
                                                    Endoscopía Dx
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                </td>
                                                <td>
                                                </td>
                                                <td>
                                                    <input type="checkbox" class="custom-control-input" id="chDental" />
                                                    Dental
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                </td>
                                                <td>
                                                </td>
                                                <td>
                                                    Otros:
                                                    <textarea id="txtOtros" maxlength="150"></textarea>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <label id="lblConclusion" style="font-weight: bold; margin-left: 15px; display: inline;
                                font-size: 20px">
                                C) Conclusión de la evaluación del riesgo cardiovascular clínico-quirúrgico:</label>
                            <br />
                            <div style="overflow: auto; height: 200px">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <td colspan="2" rowspan="2">
                                            </td>
                                            <td colspan="3" style="font-weight: bold; text-align: center">
                                                Cirugía
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colspan="2">
                                            </td>
                                            <td>
                                                Bajo
                                            </td>
                                            <td>
                                                Moderado
                                            </td>
                                            <td>
                                                Alto
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: bold; text-align: center" rowspan="3">
                                                Riesgo clínico
                                            </td>
                                            <td>
                                                Bajo
                                            </td>
                                            <td style="font-weight: bold; text-align: left">
                                                <input type="checkbox" class="custom-control-input" id="chBajo1" />&nbsp; Bajo
                                            </td>
                                            <td style="font-weight: bold; text-align: left">
                                                <input type="checkbox" class="custom-control-input" id="chBajoModerado1" />&nbsp; Bajo
                                            </td>
                                            <td style="font-weight: bold; text-align: left">
                                                <input type="checkbox" class="custom-control-input" id="chAlto1" />&nbsp; Moderado
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Moderado
                                            </td>
                                            <td style="font-weight: bold; text-align: left">
                                                <input type="checkbox" class="custom-control-input" id="chBajo2" />&nbsp; Bajo
                                            </td>
                                            <td style="font-weight: bold; text-align: left">
                                                <input type="checkbox" class="custom-control-input" id="chModerado" />&nbsp; Moderado
                                            </td>
                                            <td style="font-weight: bold; text-align: left">
                                                <input type="checkbox" class="custom-control-input" id="chAlto2" />&nbsp; Alto
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Alto
                                            </td>
                                            <td style="font-weight: bold; text-align: left">
                                                <input type="checkbox" class="custom-control-input" id="chBajo3" />&nbsp; Bajo
                                            </td>
                                            <td style="font-weight: bold; text-align: left">
                                                <input type="checkbox" class="custom-control-input" id="chAltoModerado" />&nbsp; Alto
                                            </td>
                                            <td style="font-weight: bold; text-align: left">
                                                <input type="checkbox" class="custom-control-input" id="chAlto3" />&nbsp; Alto
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br />
                    <label id="LblRecomendaciones" style="font-weight: bold; margin-left: 15px; display: inline;
                        font-size: 20px">
                        D) Recomendaciones:</label>
                    <div id="divRecomendaciones">
                        <textarea id="txtRecomendaciones" style="width: 95%; height: 80px; margin: 15px"
                            placeholder="Ingrese Recomendaciones" maxlength="5000"></textarea>
                    </div>
                </div>
                <br />
                <br />
                <div class="pie_gris">
                    <a id="btnCerrar" class="btn btn-info pull-right">Cerrar</a> <a id="btnGuardarRiesgoQuirurgico"
                        class="btn btn-info pull-right">Guardar</a> <a id="btnImprimirRiesgoQuirurgico" class="btn btn-info pull-right">
                            Imprimir</a>
                </div>
            </div>
        </div>
    </div>
    <div>
    </div>
    </form>
</body>
</html>
<script src="../js/bootstrap.js" type="text/javascript"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
    type="text/javascript"></script>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/Hospitales/EstudiosComplementarios/EstudiosComplementarios.js"
    type="text/javascript"></script>
