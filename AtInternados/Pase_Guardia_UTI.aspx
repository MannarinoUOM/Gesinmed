<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Pase_Guardia_UTI.aspx.cs" Inherits="AtInternados_Pase_Guardia_UTI" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
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

</head>

<body>
<div class="container">
  <div class="contenedor_1">
    <div class="contenedor_a" style="position:relative;margin-left:15px; height:560px;">
      <div class="resumen_datos" style="height:90px;"> 
        <!--Datos del paciente-->
        <div class="datos_paciente">
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
          <li class="active"><a data-toggle="tab" href="#tab">Datos</a></li>
          <li><a data-toggle="tab" href="#tab1">Ventilación Mecánica</a></li>
          <li><a data-toggle="tab" href="#tab2">Alimentación</a></li>
          <li><a data-toggle="tab" href="#tab3">Otros</a></li>
          <li><a data-toggle="tab" href="#tab4">Datos Infectólogos</a></li>
          <li><a data-toggle="tab" href="#tab5">Pendientes</a></li>
          <li><a id="lbl_UsuarioVisto" style="font-size:10px;" title=""></a></li>
        </ul>
      </div>
<div id="my-tab-content" class="tab-content" style="height:380px;"> 
<!-- Datos -->
<div class="tab-pane active fade in cont001" id="tab" style="height:340px;">
    <form class="form-horizontal">
            <div class="control-group">
                          <label class="control-label">Fecha</label>
                          <div class="controls">
                            <input id="txtFecha" type="text" maxlength="10" class="input-small span2 datos" />
                          </div>
            </div>
            <div class="control-group">
                          <label class="control-label">Cama</label>
                          <div class="controls">
                            <input id="txt_Cama" type="text" maxlength="10" class="input-small span2 datos" />
                          </div>
            </div>
            <div class="control-group">
                          <label class="control-label">Diagnostico Presentivo</label>
                          <div class="controls">
                            <input id="txt_DiagnosticoPresuntivo" type="text" maxlength="60" class="input-xlarge span7 datos" />
                          </div>
             </div>
            <div class="control-group">
                          <label class="control-label">Antecedentes</label>
                          <div class="controls">
                            <textarea id="txt_Antecedentes" type="text" rows="2" maxlength="60" class="input-xlarge span7 datos"></textarea>
                          </div>
            </div>
            <div class="control-group">
                          <label class="control-label">Dias en UTI</label>
                          <div class="controls">
                            <input id="txt_DiasUTI" type="text" maxlength="3" class="input-large span2 numero datos" />
                          </div>
            </div>
             <div class="control-group">
                          <label class="control-label">Datos Quirúrgicos</label>
                          <div class="controls">
                            <input id="txt_DatosQuirurgicos" type="text" maxlength="60" class="input-xlarge span7 datos" />
                          </div>
            </div>
               <div class="control-group">
                          <label class="control-label">Datos AP</label>
                          <div class="controls">
                            <input id="txt_DatosAP" type="text" maxlength="60" class="input-xlarge span7 datos" />
                          </div>
            </div>
    </form>
</div>


        <!--Ventilacion Mecanica-->
        <div class="tab-pane fade in cont001" id="tab1" style="height:340px;">
<br/>
<form class="form-horizontal">
<div class="control-group">
              <label class="control-label" style=" margin-top:-5px;">Ventilación Mecánica</label>
              <div class="controls">
                <label for="chk_VentilacionSI" style="display:inline; margin-right:10px; margin-top:0px;">SI</label><input id="chk_VentilacionSI" type="radio" name="ventilacion" style="margin-top:0px; margin-right:10px;" class="datos"/>
                <label for="chk_VentilacionNO" style="display:inline; margin-right:10px;margin-top:0px;">NO</label><input id="chk_VentilacionNO" type="radio" name="ventilacion" style="margin-top:0px;" class="datos"/>
              </div>
</div>
<div class="control-group">
              <label class="control-label" style=" margin-top:-5px;">Traqueostomía</label>
              <div class="controls">
                <label for="chk_TraqueostomiaSI" style="display:inline; margin-right:10px; margin-top:0px;">SI</label><input id="chk_TraqueostomiaSI" type="radio" name="Traqueostomia" style="margin-top:0px; margin-right:10px;" class="datos"/>
                <label for="chk_TraqueostomiaNO" style="display:inline; margin-right:10px;margin-top:0px;">NO</label><input id="chk_TraqueostomiaNO" type="radio" name="Traqueostomia" style="margin-top:0px;" class="datos"/>
              </div>
</div>
<div class="control-group">
              <label class="control-label">Modo Ventilatorio</label>
              <div class="controls">
                <input id="txt_ModoVentilatorio" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
</div>
<div class="control-group">
              <label class="control-label">Dias Ventilación</label>
              <div class="controls">
                <input id="txt_DiasVentilacion" type="text" maxlength="3" class="input-large span2 numero datos" disabled />
              </div>
</div>
<div class="control-group">
              <label class="control-label">RX (diarios)</label>
              <div class="controls">
                <input id="txt_RX" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
</div>
<div class="control-group">
              <label class="control-label">ECG (diario)</label>
              <div class="controls">
                <input id="txt_ECG" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
</div>
</form>
          
        </div>
        
<!--Alimentacion-->
<div class="tab-pane fade in DP cont001" id="tab2" style="height:340px;">
    <form class="form-horizontal">
        <div class="control-group">
                      <div class="controls" style="margin-left:30px;">
                        <label for="chk_AlimentacionNO" style="display:inline; margin-right:10px; margin-top:0px;">Vo</label><input id="chk_AlimentacionNO" type="radio" name="alimentacion" class="datos" style="margin-top:0px; margin-right:10px;"/>
                        <label for="chk_AlimentacionEnteral" style="display:inline; margin-right:10px;margin-top:0px;">Enteral</label><input id="chk_AlimentacionEnteral" type="radio" class="datos" name="alimentacion" style="margin-top:0px;margin-right:10px;"/>
                        <label for="chk_AlimentacionParental" style="display:inline; margin-right:10px;margin-top:0px;">Parental</label><input id="chk_AlimentacionParental" type="radio" class="datos" name="alimentacion" style="margin-top:0px;margin-right:10px;"/>
                        <label for="chk_AlimentacionOral" style="display:inline; margin-right:10px;margin-top:0px;">Oral</label><input id="chk_AlimentacionOral" type="radio" class="datos" name="alimentacion" style="margin-top:0px;margin-right:10px;"/>
                        <label for="txt_DiasAlimentacion" style="display:inline; margin-right:10px;margin-top:0px;">Dias</label><input id="txt_DiasAlimentacion" type="text" class="span1 numero datos" style="margin-top:0px;margin-right:10px;"/>
                        <label for="chk_Suspendida" style="display:inline; margin-right:10px;margin-top:0px;">Suspendida</label><input id="chk_Suspendida" type="radio" class="datos" name="alimentacion" style="margin-top:0px;margin-right:10px;"/>
                      </div>
        </div><br />
        <div class="control-group" style="margin-left:-15px;">
              <label class="control-label">Observaciones</label>
              <div class="controls">
                <input id="txtObservaciones" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
        </div>
    </form>
</div>
<!--Otros-->
<div class="tab-pane fade in cont001" id="tab3" style="height:340px;">
          <form class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Otras Imágenes (fecha)</label>
              <div class="controls">
                <input id="txt_OtrasImagenes" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Gases (diario)</label>
              <div class="controls">
                <input id="txt_Gases" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Laboratorio Datos Positivos (diario)</label>
              <div class="controls">
                <input id="txt_Laboratorio" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
            </div>
        </form>
</div>
<!--Datos Infectológicos-->
<div class="tab-pane fade in cont001" id="tab4" style="height:340px;">
          <form class="form-horizontal">
            <div class="control-group">
              <label class="control-label" style=" margin-top:-5px;">Datos Infectológicos</label>
              <div class="controls">
                <label for="chk_Positivo" style="display:inline; margin-right:10px; margin-top:0px;">Positivo</label><input id="chk_Positivo" type="radio" name="Infectologico" class="datos" style="margin-top:0px; margin-right:10px;"/>
                <label for="chk_Negativo" style="display:inline; margin-right:10px;margin-top:0px;">Negativo</label><input id="chk_Negativo" type="radio" name="Infectologico" class="datos" style="margin-top:0px;"/>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Cultivos y Germen (última fecha)</label>
              <div class="controls">
                <input id="txt_CultivoGermen" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Días ATB</label>
              <div class="controls">
                <input id="txt_DiasATB" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Novedades del Dia</label>
              <div class="controls">
                <input id="txt_Novedades_del_dia" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
            </div>
        </form>
</div>
<!--Pendientes-->
<div class="tab-pane fade in cont001" id="tab5" style="height:340px;">
        <form class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Interconsultas</label>
              <div class="controls">
                <input id="txt_Interconsultas" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Estudios</label>
              <div class="controls">
                <input id="txt_Estudios" type="text" maxlength="60" class="input-xlarge span7 datos"/>
              </div>
            </div>
        </form>
</div>
<!--Fin Tabs-->

      </div>
      <div class="pie_gris"> 
        <a class="btn btn-info pull-right" id="btn_Guardar">Guardar</a> 
                <a id="btn_NuevoPase" class="btn btn-success pull-right">Nuevo Pase</a>
        <a class="btn pull-right" style="display:none;" id="btn_Imprimir">Imprimir</a> 
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
<script src="../js/Hospitales/AtInternados/Pase_Guardia_UTI.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type='text/javascript'>
    $(document).ready(function () {
        if ($("[rel=tooltip]").length) {
            $("[rel=tooltip]").tooltip();
        }
    });
    parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Pacientes Internados > <strong>Pase de Dia de Guardia a UTI</strong>";
</script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</body>
</html>