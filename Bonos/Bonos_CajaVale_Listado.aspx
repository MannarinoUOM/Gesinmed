<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Bonos_CajaVale_Listado.aspx.cs" Inherits="Bonos_Bonos_CajaVale_Listado" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Bonos > <strong>Listado de Bonos (Vale de Caja)</strong>";
     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: inline;">
                <div class="contenedor_3" style="height:250px">
                <div class="titulo_seccion"><span id="TituloPacientesDelDia">Listado de Bonos (Vale de Caja)</span></div>
                    <div class="">
                        <div class="minicontenedor50" style="width:95%; margin-left:15px;">
                            <div id="ControlFechas" class="controls control-group" style="margin-bottom: 0px;">
                                <span for="txtFechaInicio">Fecha Desde</span>
                                <input id="txtFechaInicio" type="text" class="input-small" maxlength="10" style="margin-left:55px">
                            </div>
                            <div id="ControlFechaHasta" class="controls control-group" style="margin-bottom: 0px;">
                                <span for="txtFechaFin">Fecha Hasta</span>
                                <input id="txtFechaFin" type="text" class="input-small" maxlength="10" style="margin-left:59px">
                            </div>
                        </div>
                        <div class="clearfix">
                        </div>
                    </div>
                    <div class="pie_gris">
                        <div class="pull-right">
                            <a id="btnPrint" class="btn"><i class="icon-print"></i>&nbsp;Imprimir</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/Bonos/Bonos_CajaVale_Listado.js" type="text/javascript"></script>
</body>
</html>
