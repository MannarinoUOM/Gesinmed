<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Historial.aspx.cs" Inherits="Guardia_Historial" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.no-hand
{
    cursor: default;
}
</style>
</head>
<body>
<div class="clearfix"></div>
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"></div>
<div class="container" style="padding-top:30px;">
        <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 330px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Historial de Pacientes Atendidos por Guardia</span>
                </div>

                <div id="Control_desde" class="control-group">
                    <label class="control-label" for="desde">
                        Fecha Inicio</label>
                    <div class="controls">
                        <input id="desde" maxlength="10" type="text" class="input-small">
                    </div>
                </div>

                <div id="Control_hasta" class="control-group">
                    <label class="control-label" for="hasta">
                        Fecha Fin</label>
                    <div class="controls">
                        <input id="hasta" maxlength="10" type="text" class="input-small">
                    </div>
                </div>

                <div id="Controlcbo_Medicos" class="control-group">
                    <label class="control-label" for="cbo_Medicos">
                        Médico</label>
                    <div class="controls">
                        <select id="cbo_Medicos">
                        </select>
                    </div>
                </div>

                <div id="Control_NHC" class="control-group">
                    <label class="control-label" for="txtNHC">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" type="text" maxlength="13" class="input-medium">
                    </div>
                </div>


                <div class="control-group">
                    <div class="controls">
                        <a id="btn_Listar" class="btn">Imprimir Historial</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </form>
  </div>
 
<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Guardia/Historial.js" type="text/javascript"></script> 
<script src="../js/General.js" type="text/javascript"></script>
        <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">

    parent.document.getElementById("DondeEstoy").innerHTML = "Guardia > <strong>Historial de llamados por Guardia</strong>";

</script> 

</body>
</html>

