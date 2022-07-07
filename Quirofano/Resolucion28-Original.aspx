<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Resolucion28-Original.aspx.cs" Inherits="Quirofano_Resolucion28_Original" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form class="form-horizontal" >
        
        <div id="controlcbo_TipoDOC" class="control-group">
         <label class="control-label" for="cbo_TipoDOC">Tipo</label>
         <div class="controls">
            <select id="cbo_TipoDOC"></select>          
         </div>
        </div>

        <div class="control-group">
          <label class="control-label">DNI</label>
          <div class="controls">
            <input id="txt_dni"type="text" placeholder="Ingrese el DNI sin puntos">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >NHC</label>
          <div class="controls">
            <input id="txtNHC" type="text" placeholder="Ej: 99123456789">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" placeholder="Apellido Nombre"type="text" class="span3">
            <a id="btnBuscarPaciente" href="BuscarPacientes.aspx" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>
      </form>

      <input id="afiliadoId" type="hidden"/>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="PlanificarCirugia.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:460px;">       
              <form id="frm_" name="frm_">
        <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs" style="font-size:11px;">
                <li class="active"><a href="#tab1" data-toggle="tab">Antes de la Inducción de la Anestesia</a></li>
                 <li><a href="#tab1_1" data-toggle="tab">Antes de la Inducción de la Anestesia</a></li>
                <li><a href="#tab2" data-toggle="tab">Antes de la Incisión Cutanea</a></li>
                <li><a href="#tab3" data-toggle="tab">Antes de la Salida del Paciente del Quirofano.</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">
                <div style="padding:0px 15px 0px 15px; height:300px;">
                <strong>Ingreso del Paciente</strong>
                <div class = "row">
                    <div class="span5">
                     <div id="controlchkConfirma" class="control-group">
                        <label for="chkConfirma" style="display:inline; margin-right: 10px;font-size:smaller;">Circulante Confirma:</label><input id="chkConfirma" name="chkConfirma" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                     <div style=" font-size:smaller; color:Gray">
                     Identidad -
                     Sitio Quirúrgico -
                     Lado(Si corresponde) -
                     Procedimientos -
                     Consentimiento informado firmado -
                     Ayuno según protocolo(Si corresponde) -
                     Baño previo según protocolo
                     </div>
                    </div>
                    <div class="span5">
                     <div id="controlchkPacResponder" class="control-group">
                        <label for="chkPacResponder" style="display:inline; margin-right: 10px;font-size:smaller;">Paciente Puede Responder:</label><input id="chkPacResponder" name="chkPacResponder" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>

                <div class = "row">
                    <div class="span5">
                     <div id="controlchkEquipAnestesia" class="control-group">
                        <label for="chkEquipAnestesia" style="display:inline; margin-right: 10px;font-size:smaller;">Control del equipamento de la anestesia:</label><input id="chkEquipAnestesia" name="chkEquipAnestesia" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                  
                    </div>
                    <div class="span5">
                     <div id="controlchkOximetro" class="control-group">
                        <label for="chkOximetro" style="display:inline; margin-right: 10px;font-size:smaller;">Oximetro de pulso colocado y funcionando:</label><input id="chkOximetro" name="chkOximetro" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>

                <div class = "row">
                    <div class="span5">
                     <div id="controlchkVerifAlergias" class="control-group">
                        <label for="chkVerifAlergias" style="display:inline; margin-right: 10px;font-size:smaller;">Verificación de existencia de alergias conocidas:</label><input id="chkVerifAlergias" name="chkVerifAlergias" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                  
                    </div>
                    <div class="span5">
                     <div id="controlchkViaAerea" class="control-group">
                        <label for="chkViaAerea" style="display:inline; margin-right: 10px;font-size:smaller;">Chequeo de vía Aérea (Riesgo de Aspiración):</label><input id="chkViaAerea" name="chkViaAerea" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                        <p style=" font-size:smaller;color:Gray ">Si existe riesgo constatar que hay equipo y ayuda disponible</p>
                     </div>
                    </div>
                </div>

                <div class = "row">
                    <div class="span5">
                     <div id="controlchkVerifProfilaxis" class="control-group">
                        <label for="chkVerifProfilaxis" style="display:inline; margin-right: 10px;font-size:smaller;">Verificación de Profilaxis antibióticos en los últimos 60 minutos (Si corresponde):</label><input id="chkVerifProfilaxis" name="chkVerifProfilaxis" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                  
                    </div><br />
                    <div class="span5">
                     <div id="controlchkEquiposQuirurgicos" class="control-group">
                        <label for="chkEquiposQuirurgicos" style="display:inline; margin-right: 10px;font-size:smaller;">Equipos quirúrgicos conoce comorbilidades del paciente:</label><input id="chkEquiposQuirurgicos" name="chkEquiposQuirurgicos" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>

                 <div class = "row">
                    <div class="span5">
                     <div id="controlchkDemarcacion" class="control-group">
                        <label for="chkDemarcacion" style="display:inline; margin-right: 10px;font-size:smaller;">Demarcación de sitios (Si corresponde):</label><input id="chkDemarcacion" name="chkDemarcacion" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                  
                    </div>
                    <div class="span5">
                     <div id="controlchkDisponibilidadEstudios" class="control-group">
                        <label for="chkDisponibilidadEstudios" style="display:inline; margin-right: 10px;font-size:smaller;">Chequeo de disponibilidad de estudio complementario (Si corresponde):</label><input id="chkDisponibilidadEstudios" name="chkDisponibilidadEstudios" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>


                </div>


            </div>

             <div class="tab-pane" id="tab1_1">
                <div style="padding:0px 15px 0px 15px; height:300px;">
                    
                <div class = "row">
                    <div class="span5">
                     <div id="controlchkRiesgoHemo" class="control-group">
                        <label for="chkRiesgoHemo" style="display:inline; margin-right: 10px;font-size:smaller;">Verificación de riesgo de Hemorragia > 500ml (7ml/kg niños):</label><input id="chkRiesgoHemo" name="chkRiesgoHemo" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                  
                    </div>
                    <div class="span5">
                     <div id="controlchkConfirmacionEsterilidad" class="control-group">
                        <label for="chkConfirmacionEsterilidad" style="display:inline; margin-right: 10px;font-size:smaller;">Confirmación de esterilidad del instrumental:</label><input id="chkConfirmacionEsterilidad" name="chkConfirmacionEsterilidad" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>

                <div class = "row">
                    <div class="span5">
                     <div id="controlchkCirujano_Instrumentadora" class="control-group">
                        <label for="chkCirujano_Instrumentadora" style="display:inline; margin-right: 10px;font-size:smaller;">Cirujano e instrumentadora verificaron los materiales protésicos necesarios:</label><input id="chkCirujano_Instrumentadora" name="chkCirujano_Instrumentadora" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                  
                    </div>
                    <div class="span5">
                     <div id="controlchkChequeoEquipos" class="control-group">
                        <label for="chkChequeoEquipos" style="display:inline; margin-right: 10px;font-size:smaller;">Chequeo del correcto funcionamiento de todos los Equipos necesarios:</label><input id="chkChequeoEquipos" name="chkChequeoEquipos" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>
                </div>
             </div>

            <div class="tab-pane" id="tab2">
                <div style="padding:0px 15px 0px 15px; height:300px;">
                <p>Pausa Quirúrgicas</p>
                <strong>Circulante Confirma</strong>
                  <div class = "row">
                    <div class="span5">
                     <div id="controlchkMiembrosPresentes" class="control-group">
                        <label for="chkMiembrosPresentes" style="display:inline; margin-right: 10px;font-size:smaller;">Que todos los miembros del equipo quirúrgico están Presentes:</label><input id="chkMiembrosPresentes" name="chkMiembrosPresentes" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                  
                    </div>
                    <div class="span5">
                     <div id="controlchkChequeo" class="control-group">
                        <label for="chkChequeo" style="display:inline; margin-right: 10px;font-size:smaller;">Chequeo de Control de decúbitos y fijación del paciente:</label><input id="chkChequeo" name="chkChequeo" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>
                
                 <div class = "row">
                    <div class="span5">
                     <div id="controlchkConfirmanVerbal" class="control-group">
                        <label for="chkConfirmanVerbal" style="display:inline; margin-right: 10px;font-size:smaller;">Cirujano, Circulante y Anestesista confirman Verbalmente:</label><input id="chkConfirmanVerbal" name="chkConfirmanVerbal" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                                       <p style="font-size:smaller; color:Gray;">Identidad del Paciente - Sitio Quirúrgicos - Procedimientos</p>
                    </div>
                    <div class="span5">
                     <div id="Div2" class="control-group">
                        <label for="chkMiembrosNomFunc" style="display:inline; margin-right: 10px;font-size:smaller;">Que todos los miembros del equipo se hayan presentado con Nombre y Función:</label><input id="chkMiembrosNomFunc" name="chkMiembrosNomFunc" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>
                <strong>Previsión de Eventos Criticos</strong>

                <div class = "row">
                    <div class="span5">
                     <div id="controlchkCirujanoRevisa" class="control-group">
                        <label for="chkCirujanoRevisa" style="display:inline; margin-right: 10px;font-size:smaller;">El Cirujano revisa en Voz Alta al Equipo:</label><input id="chkCirujanoRevisa" name="chkCirujanoRevisa" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                        <p style="font-size:smaller; color:Gray;">Paso Críticos de la Operación - Posibles Imprevistos - Perdida prevista de Sangre</p>
                    </div>
                    <div class="span5">
                     <div id="controlchkAnestesistaRevisa" class="control-group">
                        <label for="chkAnestesistaRevisa" style="display:inline; margin-right: 10px;font-size:smaller;">Anestesista Revisa en voz Alta junto al Equipo:</label><input id="chkAnestesistaRevisa" name="chkAnestesistaRevisa" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                     <p style="font-size:smaller; color:Gray;">Posibles problemas especificos que presenten el Paciente</p>
                    </div>
                </div>

                </div>
            </div>
             <div class="tab-pane" id="tab3">
                <div style="padding:0px 15px 0px 15px; height:300px;">
                  <p>Previo al Cierre</p>
                  <strong>Circulante Confirma</strong>
                  <div class = "row">
                    <div class="span5">
                     <div id="controlchkNombreProcedimiento" class="control-group">
                        <label for="chkNombreProcedimiento" style="display:inline; margin-right: 10px;font-size:smaller;">El nombre del procedimiento Realizado:</label><input id="chkNombreProcedimiento" name="chkNombreProcedimiento" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                    <div class="span5">
                     <div id="controlchkRecuento" class="control-group">
                        <label for="chkRecuento" style="display:inline; margin-right: 10px;font-size:smaller;">El recuento de instrumental, gasas y agujas es correcto:</label><input id="chkRecuento" name="chkRecuento" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>

                <div class = "row">
                    <div class="span5">
                     <div id="controlchkRotulo" class="control-group">
                        <label for="chkRotulo" style="display:inline; margin-right: 10px;font-size:smaller;">Rotulado de muestras es correcto:</label><input id="chkRotulo" name="chkRotulo" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                    <div class="span5">
                     <div id="controlchkProblemasIntrumental" class="control-group">
                        <label for="chkProblemasIntrumental" style="display:inline; margin-right: 10px;font-size:smaller;">Si se detectaron problemas relacionados con el instrumental y equipos:</label><input id="chkProblemasIntrumental" name="chkProblemasIntrumental" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>

                <div class = "row">
                    <div class="span5">
                     <div id="controlchkIndicacionesPost" class="control-group">
                        <label for="chkIndicacionesPost" style="display:inline; margin-right: 10px;font-size:smaller;">Cirujano, Anestesista y Circulante revisaran los principales aspectos de la recuperación del paciente (Indicaciones Post Quirúrgicos):</label><input id="chkIndicacionesPost" name="chkIndicacionesPost" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                    <div class="span5">
                     <div id="controlchkMedicamentosPost" class="control-group">
                        <label for="chkMedicamentosPost" style="display:inline; margin-right: 10px;font-size:smaller;">Transpaso escrito de medicamentos Post Quirúrgicos:</label><input id="chkMedicamentosPost" name="chkMedicamentosPost" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>

                <div class = "row">
                    <div class="span5">
                     <div id="controlchkNormotermia" class="control-group">
                        <label for="chkNormotermia" style="display:inline; margin-right: 10px;font-size:smaller;">Control de Normotermia post operatorio:</label><input id="chkNormotermia" name="chkNormotermia" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>

                <strong>Antes de la Salida del Quirófano</strong>

                <div class = "row">
                    <div class="span5">
                     <div id="controlchkQuirurgicosCompl" class="control-group">
                        <label for="chkQuirurgicosCompl" style="display:inline; margin-right: 10px;font-size:smaller;">Parte quirúrgicos completos:</label><input id="chkQuirurgicosCompl" name="chkQuirurgicosCompl" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                    <div class="span5">
                     <div id="controlchkAnestesicoCompl" class="control-group">
                        <label for="chkAnestesicoCompl" style="display:inline; margin-right: 10px;font-size:smaller;">Parte anestesico complesto:</label><input id="chkAnestesicoCompl" name="chkAnestesicoCompl" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;" />
                     </div>
                    </div>
                </div>

                <div class = "row">
                    <div class="span5">
                     <div id="controlObservaciones" class="control-group">
                        <label for="Observaciones" style="display:inline; margin-right: 10px;font-size:smaller;">Observaciones</label><textarea id="Observaciones" name="Observaciones" rows="2" class="input-xxlarge"></textarea>
                     </div>
                    </div>
                </div>

                </div>
            </div>
          </div>
         </div>
         </form>
         
<div class="pie_gris" style="width:100%;background-color:#CCCCCC;margin-top:5px;">
    <div class="pull-right">
   <a id="btnVolver" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <button id = "btnGuardar" class="btn btn-info" ><i class=" icon-ok icon-white"></i>&nbsp;Guardar e Imprimir</button>
  </div>
</div>
      </div>
    </div>
  </div>
</div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
  
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Quirofano/Resolucion28.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > <strong>Resolución 28</strong>";

</script> 

</body>
</html>





