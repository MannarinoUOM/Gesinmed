<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SolicitudTransfusion.aspx.cs" Inherits="Hemoterapia_SolicitudTransfusion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">
    <div class=" contenedor_3">
                <div class="resumen_datos" style="height: 80px;">
                    <!--Datos del paciente-->
                    <div class="datos_paciente">
                        <div>
                            <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
                        <div class="datos_resumen_paciente" style="font-size:12px;">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos" tabindex="-1">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                            <div>
                                <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp;
                        <span>Celular: <strong><span id="CargadoCelular"></span></strong></span>                                
                            </div>
                            <div>
                                <span id="span_Discapacidad" style=" color:red; font-weight:bold; font-size:14px;"></span>
                                <span id="span_Estudiante"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="text-align:center"><label style="display:inline">Diagnóstico </label><input style="width:80%" type="text"/></div>

                <table style="border: 1px solid black; width:95%; margin-left:2.5%">
                <tr><td><label style="display:inline">Hematocrito: </label><input type="text" /></td><td><label style="display:inline">T. QUICK: </label><input type="text" /></td><td><label style="display:inline">F. C.: </label><input type="text" /></td></tr>
                <tr><td><label style="display:inline">Hb: </label><input type="text" /></td><td><label style="display:inline">K P T T: </label><input type="text" /></td><td><label style="display:inline">T. A.: </label><input type="text" /></td></tr>
                <tr><td><label style="display:inline">Rto. Plaquetas: </label><input type="text" /></td><td><label style="display:inline">T T: </label><input type="text" /></td><td><label style="display:inline">Otros: </label><input type="text" /></td></tr>
                <tr><td><label style="display:inline">Rto. Leucocitos: </label><input type="text" /></td><td></td><td><label style="display:inline">De Fecha: </label><input type="text" /></td></tr>
                </table>
    
    </div>
    </div>
    </form>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>  
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>