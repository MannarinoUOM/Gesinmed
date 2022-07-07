<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReintegroSN.aspx.cs" Inherits="Bonos_ReintegroSN" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <title></title>
</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Bonos > <strong>Reintegro Bonos</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 250px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Reintegro Bonos</span>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtNroBono">
                        Nro Bono</label>
                    <div class="controls">
                        <input id="txtNroBono" type="text" maxlength="8" class="input-small">
                    </div>
                </div>

                <div class="control-group">
                    <div class="controls">
                        <a id="btn_BuscarBono" class="btn">Buscar Bono</a>
                    </div>
                </div>

                <div id="DatosaCancelar" style="display:none;">
                <div class="resumen_datos" style="height:130px;">
                    <!--Datos del paciente-->
                    <div class="datos_paciente" style="width:560px;">
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span></strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;<span>DNI: <strong><span id="CargadoDNI"></span></strong></span>
                            <div>
                                Médico: <strong><span id="CargadoMedico"></span></strong>&nbsp;&nbsp;&nbsp;
                                <span>Especialidad: <strong><span id="CargadoEspecialidad"></span></strong></span>
                            </div>
                            <div>
                            <span>Nro. Código Barra: </span><span id="CodBarraNum"></span>
                            </div>
                            <br />
                            <div>
                            <a id="btn_1" class="btn">100%</a>
                            <a id="btn_2" class="btn">75%</a>
                            <a id="btn_3" class="btn">50%</a>                            
                            <span>
                            <input type="text" maxlength="3" id="txt_monto" style="width:100px;" />
                            <a id="btn_4" class="btn">Aceptar</a>                            
                            </span>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
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
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Bonos/ReintegroSN.js" type="text/javascript"></script>