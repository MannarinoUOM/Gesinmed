<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PaseUTIaPiso.aspx.cs" Inherits="AtInternados_PaseUTIaPiso" %>

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
          
          <span>Fecha ingreso: <strong><span id="CargadoFechaIngreso"></span></strong></span> <br /> 
          <span>Fecha Egreso: <strong><span id="CargadoFechaEgreso"></span></strong></span><br /><br /> 
          <span style="font-size:10px; margin-top:-5px;">Cama: <strong><span id="CargadoCama"></span></strong></span>
          </div>
        <div class="clearfix"></div>
      </div>
      <div>
        <ul class="nav nav-tabs" data-tabs="tabs">
          <li class="active"><a data-toggle="tab" href="#tab4">Médico Responsable</a></li>
          <li><a data-toggle="tab" href="#tab1">Internación</a></li>
          <li><a data-toggle="tab" href="#tab2">Estudios complementarios</a></li>
          <li><a data-toggle="tab" href="#tab3">Información de Alta</a></li>
        </ul>
      </div>
      <div id="my-tab-content" class="tab-content" style="height:380px;"> 
        <!--SIGNOS VITALES-->
        <div class="tab-pane fade in cont001" id="tab1" style="height:340px;">
          <form class="form-horizontal" >
            <div class="control-group" style="display:none;">
              <label class="control-label">Dx ingreso</label>
              <div class="controls">
                <select type="text" id="cbo_DiagnosticoICD10" class="span8"></select>
              </div>
            </div>
            <div class="control-group" style="display:none;">
              <label class="control-label">Detalle</label>
              <div class="controls">
                <select type="text" id="cbo_Diagnostico_Detalle_ICD10" class="span8"></select>
              </div>
            </div>
            <div class="control-group" style="display:none;">
              <label class="control-label">Antecendentes</label>
                
                <div class="controls">
                    <select id="cboAn1" type="text" class="span8"></select>            
                </div>
                <div class="controls">
                    <select id="cboAn2" type="text" class="span8"></select>            
                </div>
                <div class="controls">
                    <select id="cboAn3" type="text" class="span8"></select>            
                </div>
                <div class="controls">
                    <select id="cboAn4" type="text" class="span8"></select>            
                </div>
                <div class="controls">
                    <select id="cboAn5" type="text" class="span8"></select>            
                </div>
                <div class="controls">
                    <select id="cboAn6" type="text" class="span8"></select>            
                </div>
                <div class="controls">
                    <select id="cboAn7" type="text" class="span8"></select>            
                </div>
                <div class="controls">
                    <select id="cboAn8" type="text" class="span8"></select>            
                </div>
                <div class="controls">
                    <select id="cboAn9" type="text" class="span8"></select>            
                </div>
                <div class="controls">
                    <select id="cboAn10" type="text" class="span8"></select>            
                </div>

            </div>
          </form>
<br/>
<form class="form-horizontal">
<div class="control-group">
              <label class="control-label">Motivo internación</label>
              <div class="controls">
                <textarea type="text" id="txt_MotivoInternacion" class="span8" rows="8"></textarea>
              </div>
            </div>
<div class="control-group">
              <label class="control-label">Antecedentes personales</label>
              <div class="controls">
                <textarea type="text" id="txt_AntecendentesPersonales" class="span8" rows="4"></textarea>
              </div>
            </div>
<div class="control-group">
              <label class="control-label">Internación actual</label>
              <div class="controls">
                <textarea type="text" id="txt_InternacionActual" class="span8" rows="4"></textarea>
              </div>
            </div>

</form>
          
        </div>
        
        <!--MONITOREO-->
        <div class="tab-pane fade in DP cont001" id="tab2" style="height:340px;">
          <form class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Laboratorio</label>
              <div class="controls">
                <textarea type="text" id="txt_Laboratorio" class="span8" rows="8"></textarea>
              </div>
            </div><br/>
            <div class="control-group">
              <label class="control-label">Imágenes</label>
              <div class="controls">
                <textarea type="text" id="txt_Imagenes" class="span8" rows="4"></textarea>
              </div>
            </div><br/>
            <div class="control-group">
              <label class="control-label">Otros</label>
              <div class="controls">
                <textarea type="text" id="txt_OtrosEstudios" class="span8" rows="4"></textarea>
              </div>
            </div>
          </form>
        </div>
        <!--DATOS-->
        <div class="tab-pane fade in cont001" id="tab3" style="height:340px;">
          <form class="form-horizontal">
          <div class="control-group">
              <label class="control-label">Fecha de egreso</label>
              <div class="controls">
                <input id="txtFechaEgreso" type="text" class="span2" maxlength="10" />
              </div>
            </div>
<div class="control-group">
              <label class="control-label">Diagnóstico de egreso</label>
              <div class="controls">
                <textarea id="txt_DiagnosticoEgreso" type="text" class="span8" rows="6"></textarea>
              </div>
            </div>
<div class="control-group">
              <label class="control-label">Motivo de alta</label>
              <div class="controls">
                <select id="cbo_Motivo_Egreso" type="text" class="span6"></select>
              </div>
            </div>
<div class="control-group">
              <label class="control-label">Indicaciones de alta</label>
              <div class="controls">
                <textarea id="txt_IndicacionesAlta" type="text" class="span8" rows="6"></textarea>
              </div>
            </div>

<div class="control-group">
              <label class="control-label">Debe concurrir a consultorio para control el dia:</label>
              <div class="controls">
                <input type="text" id="txt_FechaVueltaConsulta" class="span3"/>
              </div>
            </div>
<div class="control-group">
              <label class="control-label">Se informa al paciente sobre posibles complicaciones</label>
              <div class="controls">
                <textarea type="text" id="txt_Complicaciones" class="span8" rows="4"></textarea>
              </div>
            </div>
<div class="control-group" style="display:none;">
              <label class="control-label">Dx de egreso</label>
              <div class="controls">
                <select id="txt_DxEgreso" class="span8"></select>
                <%--<input type="text" id="txt_DxEgreso" class="span3"/>--%>
              </div>
            </div>
<div class="control-group" style="display:none;">
              <label class="control-label">Detalle</label>
              <div class="controls">
                <select id="txt_Detalle" class="span8"></select>
                <%--<input type="text" id="txt_Detalle" class="span3"/>--%>
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
</form>
        </div>

      </div>
      <div class="pie_gris"> <a class="btn btn-info pull-right" id="btn_Guardar">Guardar</a> <a class="btn pull-right" style="display:none;" id="btn_Imprimir" >Imprimir</a> 
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
<script src="../js/Hospitales/AtInternados/PaseUTIaPiso.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type='text/javascript'>
    $(document).ready(function () {
        if ($("[rel=tooltip]").length) {
            $("[rel=tooltip]").tooltip();
        }
    });
    parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Pacientes Internados > <strong>Pase UTI a Piso</strong>";
</script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</body>
</html>