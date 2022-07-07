<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Resolucion28.aspx.cs" Inherits="Quirofano_Resolucion28" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />

<style>
#Res28Contenido table{font-size:8px;}
</style>

</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="display:none;"> <div class="titulo_seccion">
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
      <div class="resumen_datos" style="height:80px;margin-bottom: 5px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC_Visible"></span><span id="CargadoNHC" style="display:none;"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:460px;padding-top: 0px;padding-bottom: 57px;">       
         <form id="frm_" name="frm_">
         <div style="position:relative; background-color:Red; font-size:10px; line-height:normal;" id="Contenedor_Res28">
            <div style="position:absolute; width:300px; margin-left:10px;">          
            
            <b style="color:Gray;">Antes de la inducción de la Anestesia</b><br />            
            <b><div style="background-color:#E6E6E6; width:90%">Ingreso del Paciente</div></b><br />
            <div style="margin-left:0px;">
            <b>        
            <div>SI NO N/A</div>
            
            <input type="radio" name="A1" id="A1_1" value="1"/>
            <input type="radio" name="A1" id="A1_2" value="2"/>
            <input type="radio" name="A1" id="A1_3" value="3"/>
            Circulante confirma:</b><br />
            <div style="margin-left:50px;">
            Identidad, Sitio Quirurgico<br />
            Lado (Si corresponde), Procedimientos<br />
            Consentimiento informado firmado<br />
            Ayuno según protocolo(Si corresponde)<br />
            Baño previo según protocolo<br />
            </div>

            <div>
            <input type="radio" name="A2" id="A2_1" value="1"/>
            <input type="radio" name="A2" id="A2_2" value="2"/>
            <input type="radio" name="A2" id="A2_3" value="3"/>
            <b>Paciente puede responder</b>
            </div>

            <div>
            <input type="radio" name="A3" id="A3_1" value="1"/>
            <input type="radio" name="A3" id="A3_2" value="2"/>
            <input type="radio" name="A3" id="A3_3" value="3"/>
            <b>Control del equipamiento de la anestesia</b>
            </div>

            <div>
            <input type="radio" name="A4" id="A4_1" value="1"/>
            <input type="radio" name="A4" id="A4_2" value="2"/>
            <input type="radio" name="A4" id="A4_3" value="3"/>
            <b>Oximetro de pulso colocado y funcionando</b>
            </div>

            <div>
            <input type="radio" name="A5" id="A5_1" value="1"/>
            <input type="radio" name="A5" id="A5_2" value="2"/>
            <input type="radio" name="A5" id="A5_3" value="3"/>
            <b>Verificación de existencia de alergias conocidas</b>
            </div>

            <div>
            <input type="radio" name="A6" id="A6_1" value="1"/>
            <input type="radio" name="A6" id="A6_2" value="2"/>
            <input type="radio" name="A6" id="A6_3" value="3"/>
            <b>Chequeo de vía aéera (Riesgo de Aspiración)</b><br />
            <span style="font-size:9px; margin-left:50px;">Si existe riesgo constatar que hay equipo y ayuda</span> <br />
            <span style="font-size:9px; margin-left:50px;">disponible</span>
            </div>

            <div>
            <input type="radio" name="A7" id="A7_1" value="1"/>
            <input type="radio" name="A7" id="A7_2" value="2"/>
            <input type="radio" name="A7" id="A7_3" value="3"/>
            <span><b>Verificación de Profilaxis antibioticos en los</b></span> <br />
            <span style="margin-left:50px;"><b>últimos 60 minutos (Si corresponde)</b></span>            
            </div>

            <div>
            <input type="radio" name="A8" id="A8_1" value="1"/>
            <input type="radio" name="A8" id="A8_2" value="2"/>
            <input type="radio" name="A8" id="A8_3" value="3"/>
            <span><b>Equipos quirurgicos conoce comorbilidades del</b></span>  <br />          
            <span style="margin-left:50px;"><b>paciente</b></span>            
            </div>

            <div>
            <input type="radio" name="A9" id="A9_1" value="1"/>
            <input type="radio" name="A9" id="A9_2" value="2"/>
            <input type="radio" name="A9" id="A9_3" value="3"/>
            <span><b>Demarcación de sitios (Si corresponde)</b></span>            
            </div>

            <div>
            <input type="radio" name="A10" id="A10_1" value="1"/>
            <input type="radio" name="A10" id="A10_2" value="2"/>
            <input type="radio" name="A10" id="A10_3" value="3"/>
            <span><b>Chequeo de disponibilidad de estudio</span><br />
            <span style="margin-left:50px;">complementario (Si corresponde)</b></span>    
            </div>

            <div>
            <input type="radio" name="A11" id="A11_1" value="1"/>
            <input type="radio" name="A11" id="A11_2" value="2"/>
            <input type="radio" name="A11" id="A11_3" value="3"/>
            <span><b>Verificación de riesgo de Hemorragia > 500ml</b></span><br />
            <span style="margin-left:50px;"><b>(7ml/kg niños)</b></span><br />  
            <span style="font-size:9px; margin-left:50px;">Si existe riesgo preveer disponibilidad de accesos</span> <br />
            <span style="font-size:9px; margin-left:50px;">venosos y sangre</span>            
            </div>

            <div>
            <input type="radio" name="A12" id="A12_1" value="1"/>
            <input type="radio" name="A12" id="A12_2" value="2"/>
            <input type="radio" name="A12" id="A12_3" value="3"/>
            <span><b>Confirmación de esterilidad del instrumental</b></span>            
            </div>

            
            <div>
            <input type="radio" name="A13" id="A13_1" value="1"/>
            <input type="radio" name="A13" id="A13_2" value="2"/>
            <input type="radio" name="A13" id="A13_3" value="3"/>
            <span><b>Cirujano e instrumentadora verificaron</b></span><br /> 
            <span style="margin-left:50px;"><b>los materiales protésicos necesarios</b></span>          
            </div>

            <div>
            <input type="radio" name="A14" id="A14_1" value="1"/>
            <input type="radio" name="A14" id="A14_2" value="2"/>
            <input type="radio" name="A14" id="A14_3" value="3"/>
            <span><b>Chequeo del correcto funcionamiento de todos</b></span><br />
            <span style="margin-left:50px;"><b>los equipos necesarios</b></span>          
            </div>
            
            </div>
                </div>        








            <div style="position:absolute; width:300px; left: 310px;">
            
            <b style="color:Gray;">Antes de la incisión Cutanea</b><br />            
            <b>Pausa Quirurgicas</b><br />
            <b><div style="background-color:#E6E6E6; width:90%">Circulante confirma:</div></b><br />
            <div style="margin-left:0px;">
            <div><b>SI NO N/A</b></div>            
            <input type="radio" name="B1" id="B1_1" value="1"/>
            <input type="radio" name="B1" id="B1_2" value="2"/>
            <input type="radio" name="B1" id="B1_3" value="3"/>            
            <span><b>Todos los miembros del equipo quirurgico están</b></span><br /> 
            <span style="margin-left:50px;"><b>presentes</b></span>          
            </div>


            <div>
            <input type="radio" name="B2" id="B2_1" value="1"/>
            <input type="radio" name="B2" id="B2_2" value="2"/>
            <input type="radio" name="B2" id="B2_3" value="3"/>
            <span><b>Todos los miembros del equipo se hayan</b></span><br /> 
            <span style="margin-left:50px;"><b>presentado con Nombre y Función</b></span>          
            </div>

            
            <div>
            <input type="radio" name="B3" id="B3_1" value="1"/>
            <input type="radio" name="B3" id="B3_2" value="2"/>
            <input type="radio" name="B3" id="B3_3" value="3"/>
            <span><b>Cirujano, Circulante y Anestesista confirman</b></span><br /> 
            <span style="margin-left:50px;"><b>verbalmente:</b></span><br /> 
            <span style="font-size:9px; margin-left:50px;">Identidad del Paciente</span> <br />
            <span style="font-size:9px; margin-left:50px;">Sitio Quirurgico</span><br />
            <span style="font-size:9px; margin-left:50px;">Procedimientos</span>
            </div>


            <div>
            <input type="radio" name="B4" id="B4_1" value="1"/>
            <input type="radio" name="B4" id="B4_2" value="2"/>
            <input type="radio" name="B4" id="B4_3" value="3"/>
            <span><b>Chequeo de control de decúbitos y fijación</b></span><br /> 
            <span style="margin-left:50px;"><b> del paciente</b></span>          
            </div>
            
            <br />
            <b><div style="background-color:#E6E6E6; width:90%">Previsión de Eventos Criticos:</div></b>

            <div>
            <input type="radio" name="B5" id="B5_1" value="1"/>
            <input type="radio" name="B5" id="B5_2" value="2"/>
            <input type="radio" name="B5" id="B5_3" value="3"/>
            <span><b>El Cirujano revisa en Voz Alta junto al Equipo:</b></span><br />
            <span style="font-size:9px; margin-left:50px;">Paso Críticos de la operación</span> <br />
            <span style="font-size:9px; margin-left:50px;">Posibles imprevistos</span><br />        
            <span style="font-size:9px; margin-left:50px;">Perdida prevista de sangre</span>                         
            </div>

            
            <div>
            <input type="radio" name="B6" id="B6_1" value="1"/>
            <input type="radio" name="B6" id="B6_2" value="2"/>
            <input type="radio" name="B6" id="B6_3" value="3"/>
            <span><b>Anestesista Revisa en Voz Alta junto al Equipo:</b></span><br />
            <span style="font-size:9px; margin-left:50px;">Posibles problemas especificos que presente</span> <br />
            <span style="font-size:9px; margin-left:50px;">el Paciente</span>                                    
            </div>            
            </div>

            

            <div style="position:absolute; width:300px; left: 620px;">
            <b style="color:Gray;">Antes de la Salida del paciente del Quirofano</b><br />            
            <b>Previo al Cierre</b><br />
            <b><div style="background-color:#E6E6E6; width:90%">Circulante confirma:</div></b><br />
            <div style="margin-left:0px;">
            <div><b>SI NO N/A</b></div>            
            <input type="radio" name="C1" id="C1_1" value="1"/>
            <input type="radio" name="C1" id="C1_2" value="2"/>
            <input type="radio" name="C1" id="C1_3" value="3"/>            
            <span><b>El nombre del procedimiento realizado</b></span>
            </div>


            <div>
            <input type="radio" name="C2" id="C2_1" value="1"/>
            <input type="radio" name="C2" id="C2_2" value="2"/>
            <input type="radio" name="C2" id="C2_3" value="3"/>
            <span><b>El recuento de instrumental, gasas y</b></span><br /> 
            <span style="margin-left:50px;"><b>agujas es correcto</b></span>          
            </div>


            <div>
            <input type="radio" name="C3" id="C3_1" value="1"/>
            <input type="radio" name="C3" id="C3_2" value="2"/>
            <input type="radio" name="C3" id="C3_3" value="3"/>
            <span><b>Rotulado de muestras es correcto</b></span>
            </div>


            <div>
            <input type="radio" name="C4" id="C4_1" value="1"/>
            <input type="radio" name="C4" id="C4_2" value="2"/>
            <input type="radio" name="C4" id="C4_3" value="3"/>
            <span><b>Se detectaron problemas relacionados</b></span><br /> 
            <span style="margin-left:50px;"><b>con el instrumental y los equipos</b></span>          
            </div>

            
            <div>
            <input type="radio" name="C5" id="C5_1" value="1"/>
            <input type="radio" name="C5" id="C5_2" value="2"/>
            <input type="radio" name="C5" id="C5_3" value="3"/>
            <span><b>Cirujano, anestesista y circulante revisaran los</b></span><br /> 
            <span style="margin-left:50px;"><b>principales aspectos de la recuperación del</b></span><br />          
            <span style="margin-left:50px;"><b>paciente (Indicaciones Post Quirurgicos)</b></span>          
            </div>


            <div>
            <input type="radio" name="C6" id="C6_1" value="1"/>
            <input type="radio" name="C6" id="C6_2" value="2"/>
            <input type="radio" name="C6" id="C6_3" value="3"/>
            <span><b>Traspaso escrito de medicamento Post</b></span><br />          
            <span style="margin-left:50px;"><b>Quirurgicos</b></span>          
            </div>


            <div>
            <input type="radio" name="C7" id="C7_1" value="1"/>
            <input type="radio" name="C7" id="C7_2" value="2"/>
            <input type="radio" name="C7" id="C7_3" value="3"/>
            <span><b>Control de normotermia Post Operatorio</b></span>
            </div>

            <br />
            <b><div style="background-color:#E6E6E6; width:90%">Antes de la Salida del Quirofano:</div></b>

            <div>
            <input type="radio" name="C8" id="C8_1" value="1"/>
            <input type="radio" name="C8" id="C8_2" value="2"/>
            <input type="radio" name="C8" id="C8_3" value="3"/>
            <span><b>Parte Quirúrgico Completo</b></span>
            </div>

            <div>
            <input type="radio" name="C9" id="C9_1" value="1"/>
            <input type="radio" name="C9" id="C9_2" value="2"/>
            <input type="radio" name="C9" id="C9_3" value="3"/>
            <span><b>Parte Anestésico Completo</b></span>
            </div>


            </div>
            

            <div style="position:absolute; width:600px; left: 310px; top: 320px; height:125px"> 
            <div style="font-size:13px; text-align:center;">
            <b>N/A= </b> No Amerita <br />
            </div>
            Observaciones: <br />           
                <textarea maxlength="4000" id="txt_Observaciones" cols="20" rows="2" style="width:580px; margin-top:5px; height:80px;"></textarea>
            </div>

         </div>
         <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
         </form>
         
<div class="pie_gris" style="width:100%;background-color:#CCCCCC;margin-top:5px;">
    <div class="pull-right">
   <a id="btnVolver" class="btn" style="display:none"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
   <a id="btn_cancelear_todo" class="btn btn-danger">Cancelar</a>
  <button id = "btnGuardar" class="btn btn-info" ><i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>
  <button id = "btn_imprimir" class="btn btn-info" style="display:none;" ><i class=" icon-ok icon-white"></i>&nbsp;Imprimir</button>
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
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 15 }, 500);
        $('.container').height($('html').height() +  ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });


    parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > Turnos > Planificar Cirugía > <strong>Resolución 28</strong>";

</script> 

</body>
</html>





