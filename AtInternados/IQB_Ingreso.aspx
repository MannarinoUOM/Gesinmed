<%@ Page Language="C#" AutoEventWireup="true" CodeFile="IQB_Ingreso.aspx.cs" Inherits="AtInternados_IQB_Ingreso" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />

<style>

.cont001{height:280px;overflow:scroll;overflow-x:hidden}
</style>

<script>
    function imgErrorPaciente(image) {
        image.onerror = "";
        image.src = "../img/silueta.jpg";
        return true;
    }
</script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <style>
        .dropdown-menu { max-height: 250px; max-width: 800px; font-size:11px; overflow-y: auto; overflow-x: hidden; }
    </style>
</head>

<body>
<div class="container">
  <div class="contenedor_1">
    <div class="contenedor_a" style="position:relative;margin-left:15px; height:560px;">
      <div class="resumen_datos" style="height:90px;"> 
        <!--Datos del paciente-->
        <div class="datos_paciente">
          <input id="esLegales" type="hidden" runat="server" />
          <div ><img class="avatar2" id="fotopaciente" src="../img/silueta.jpg" onerror="imgErrorPaciente(this);"></img> </div>
          <div class="datos_resumen_paciente">
            <input type="hidden" id="afiliadoId" value="" />
            <div>Paciente: <strong><span id="CargadoApellido" style="font-size:10px;"></span> (<span id="CargadoEdad" style="font-size:10px;"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
            <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
            <div style="font-size:10px;">Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;Sala: <strong><span id="CargadoSala"></span></strong></div>
          </div>
        </div>
        <div class="datos_medico">
          
          <span>Fecha Ingreso: <strong><span id="CargadoFechaIngreso"></span></strong></span> <br /> 
          <span>Fecha Egreso: <strong><span id="CargadoFechaEgreso"></span></strong></span><br /><br /> 
          <span style="font-size:10px; margin-top:-5px;">Cama: <strong><span id="CargadoCama"></span></strong></span>
          </div>
        <div class="clearfix"></div>
      </div>
      <div>
        <ul class="nav nav-tabs" data-tabs="tabs">
          <li class="active"><a data-toggle="tab" href="#tab4">Médico Responsable</a></li>
          <li><a data-toggle="tab" href="#tab1">Ingreso</a></li>
          <li><a data-toggle="tab" href="#tab3">Procedimiento</a></li>
        </ul>
      </div>
<div id="my-tab-content" class="tab-content" style="height:380px;"> 
<!--SIGNOS VITALES-->
<div class="tab-pane fade in cont001" id="tab1" style="height:340px;">
    <form class="form-horizontal">
        <div class="control-group">
              <label class="control-label">Motivo de Ingreso</label>
              <div class="controls">
                <textarea type="text" id="txt_MotivoIngreso" class="span8" rows="8"></textarea>
              </div>
        </div>
        <div class="control-group">
              <label class="control-label">Antecedentes Patológicos de Importancia</label>
              <div class="controls">
                <textarea type="text" id="txt_AntecedentesPatologicos" class="span8" rows="4"></textarea>
              </div>
        </div>
    </form>
</div>

        <!--DATOS-->
        <div class="tab-pane fade in cont001" id="tab3" style="height:340px;">
          <form class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Procedimiento a efectuar</label>
              <div class="controls">
                <textarea type="text" id="txt_ProcedimientoEfectuar" class="span8" rows="4"></textarea>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Parametros Basicos</label>
              <div class="controls">
                <textarea type="text" id="txt_ParametrosBasicos" class="span8" rows="4"></textarea>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Respiratorio</label>
              <div class="controls">
                <textarea id="txt_Respiratorio" type="text" class="span8" rows="6"></textarea>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Cardiovascular</label>
              <div class="controls">
                <textarea id="txt_Cardiovascular" type="text" class="span8" rows="6"></textarea>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Examenes Presentados</label>
              <div class="controls">
                <textarea type="text" id="txt_ExamenesPresentados" class="span8" rows="4"></textarea>
              </div>
            </div>
            </form>
        </div>

<div class="tab-pane active fade in cont001" id="tab4" style="height:340px;">
<form class="form-horizontal">
             <div class="control-group">
                          <label class="control-label">Fecha de Ingreso</label>
                          <div class="controls">
                            <input id="txtFechaIngreso" type="text" maxlength="10" class="input-small span2" />
                          </div>
             </div>
            <div class="control-group">
                          <label class="control-label">Especialidad</label>
                          <div class="controls">
                            <select id="cbo_Especialidad" class="span5"> 
                            </select>
                          </div>
             </div>
            <div class="control-group">
                          <label class="control-label">Médico</label>
                          <div class="controls">
                            <select id="cbo_Medico" class="span5"></select>
                          </div>
            </div>

            <div class="control-group">
                          <label class="control-label" style="display:inline; margin-left:10px;">Procedencia</label>
                            <label class="radio-inline" style="display:inline;margin-right: 10px; margin-left:10px;">
                              <input id="rd_Domicilio" type="radio" value="1" name="optProcedencia" style="margin-right: 5px;" checked>Domicilio
                            </label>
                            <label class="radio-inline" style="display:inline;margin-right: 10px;">
                              <input id="rd_OtroNosocomio" type="radio" value="2" name="optProcedencia" style="margin-right: 5px;">Otro Nosocomio
                            </label>
                            <label class="radio-inline" style="display:inline;margin-right: 10px;">
                              <input id="rd_Trabajo" type="radio" value="3" name="optProcedencia" style="margin-right: 5px;">Trabajo
                            </label>
                             <label class="radio-inline" style="display:inline;margin-right: 10px;">
                              <input id="rd_ViaPublica" type="radio" value="4" name="optProcedencia" style="margin-right: 5px;">Via Publica
                            </label>
                            <label class="radio-inline" style="display:inline;margin-right: 10px;">
                              <input id="rd_Otros" type="radio" value="5" name="optProcedencia" style="margin-right: 5px;">Otros
                            </label>
            </div>

            <div class="control-group">
                          <label class="control-label" style="display:inline; margin-left:10px;">Trasladado por</label>
                            <label class="radio-inline" style="display:inline;margin-right: 10px; margin-left:10px;">
                              <input id="rd_Particulares" type="radio" value="1" name="optTraslado" style="margin-right: 5px;" checked>Particulares
                            </label>
                            <label class="radio-inline" style="display:inline;margin-right: 10px;">
                              <input id="rd_AmbulanciaUOM" type="radio" value="2" name="optTraslado" style="margin-right: 5px;">Ambulancia UOM
                            </label>
                            <label class="radio-inline" style="display:inline;margin-right: 10px;">
                              <input id="rd_OtrosTraslado" type="radio" value="3" name="optTraslado" style="margin-right: 5px;">Otros
                            </label>
            </div>
</form>
        </div>

      </div>
      <div class="pie_gris"> <a class="btn btn-info pull-right" id="btn_Guardar">Guardar</a> 
      <a class="btn pull-right" style="display:none;" id="btn_Imprimir" ><i class="icon-print"></i>&nbsp;Imprimir</a> 
      <a class="btn pull-right" id="btnVolver"><i class="icon-th-list"></i>&nbsp;Volver al Paciente</a>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript" src="../js/jquery-1.8.3.js"></script> 
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/AtInternados/IQB_Ingreso.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type='text/javascript'>
    $(document).ready(function () {
        if ($("[rel=tooltip]").length) {
            $("[rel=tooltip]").tooltip();
        }
    });
    parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Pacientes Internados > <strong>HC de Internación Quirúrgica Breve</strong>";
</script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</body>
</html>