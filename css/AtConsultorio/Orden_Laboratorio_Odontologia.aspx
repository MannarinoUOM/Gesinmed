<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Orden_Laboratorio_Odontologia.aspx.cs" Inherits="Odontologia_Orden_Laboratorio_Odontologia" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head id="Head1" runat="server">
    <title></title>
<link href="../css/Odontologia.css" rel="stylesheet" type="text/css" />
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/fixedHeader.dataTables.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <input id="AfiliadoId" type="hidden"/>
    <input id="TurnoId" type="hidden"/>

<div id="primero">
<div class=" container">
<div class="contenedor_a" style="height:311px; margin-top:78px">

    <div class="titulo_seccion">&nbsp;&nbsp;<span>Ordenes de Estudio Historial</span></div>
    <div class=" contenedor_a" style="margin-left:13px; height:200px;overflow:auto">
    <table id="historial" ><tr style="background-color:#CCCCCC"><th style=" width:300px; font-size:large"><b>&nbsp;&nbsp;Estudios</b></th></tr></table>
    </div>

        <div style=" width:99%; height:40px; padding:0.5%; background-color:#CCCCCC; margin-top:0%">
    <a id="btnSiguiente" class="btn btn-info pull-right"><i class=" icon-plus-sign icon-white"></i>&nbsp;&nbsp;Nuevo</a>
    <a class="btn btn-danger pull-right btnCerrar" style="margin-right:1%"><i class=" icon-remove icon-black"></i>&nbsp;&nbsp;Cancelar</a>
    </div>

</div>
</div>
</div>

<div id="segundo" style="display:none">
    <form id="form1" runat="server" class=" form-inline">
    <div class="container">
    <div class="contenedor_a" style="height:435px">

    <div class="resumen_datos" style="margin-top: 0px;font-size:12px;">
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
                            <input id="Hidden1" value="" type="hidden"/>
                            <div>
                                Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>
                        </div>
                    </div>
                    <div class="pull-left" style="margin-left: 20px">
                        <div>
                            Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
                        <div>
                            Seccional/OS:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
                        <div>
                            Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
                    </div>
                    <div class="clearfix">
                    </div>
                </div>

     <div class="titulo_seccion">&nbsp;&nbsp;<span>Ordenes de Estudio</span></div>

    <div style="padding:1%; text-align:center">
    <label class="control-label">Laboratorio</label>
    <select id="cboLaboratorios" class="controlar"></select>
  
    <label class="control-label">Fecha envio</label>
    <input id="txtEnvio" type="text" class="input-medium controlar" style="text-align:center"/>
   
    <label class="control-label">Fecha entrega</label>
    <input id="txtEntrega" type="text" class=" input-medium controlar" style="text-align:center"/>
    </div>

    <div style="padding:1%; text-align:center">
    <label class="control-label">Estudio</label>
    <input id="txtEstudio" type="text" class=" input-xxlarge controlar" maxlength="200"/>
    <a id="btnAgregar" class="btn btn-success controlar"><i class=" icon-plus-sign icon-white"></i>&nbsp;&nbsp;Agregar</a>
    </div>

    <div class=" contenedor_a" style="margin-left:13px; height:133px;overflow:auto">
    <div id="estudios">
    <table><tr style="background-color:#CCCCCC"><th style=" width:300px; font-size:large"><b>&nbsp;&nbsp;Estudio</b></th><th style=" width:10%; font-size:large"><b>Eliminar</b></th></tr></table>
    </div>
    </div>

    <div style=" width:99%; height:40px; padding:0.5%; background-color:#CCCCCC; margin-top:0%">
    
    <a id="btnImprimir" class="btn btn-info pull-right"><i class="icon-print icon-white"></i>&nbsp;&nbsp;Imprimir</a>
    <a id="btnVolver" class="btn btn-info pull-right" style="margin-right:1%"><i class=" icon-arrow-up icon-white"></i>&nbsp;&nbsp;Volver</a>
    <a class="btn btn-danger pull-right btnCerrar" style="margin-right:1%"><i class=" icon-remove icon-black"></i>&nbsp;&nbsp;Cancelar</a>
    </div>

    </div>
    </div>
    </form>
    </div>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.dataTables.js" type="text/javascript"></script>
<script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Odontologia/Orden_Laboratorio_Odontologia.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
