<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DatosIntervencion.aspx.cs" Inherits="Quirofano_DatosIntervencion" %>

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
      <div class="contenedor_3" style="height:400px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos de la Intervención</span></div>
      
              <form id="frm_" name="frm_" style="height: 312px;">
        <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Fecha</a></li>
                <li><a href="#tab2" data-toggle="tab">Médicos</a></li>
                <li><a href="#tab3" data-toggle="tab">Ayudantes</a></li>
                <li><a href="#tab4" data-toggle="tab" id="pedido_id_tab">Pedidos</a></li>
                <li><a href="#tab5" data-toggle="tab" id="cirujano_externo">Cirujano Externo</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">
                <div style="padding:0px 15px 0px 15px; height:250px;">
                <div class="row">
                    <div class="span5">
                        <div id="controlfecha_cirugia" class="control-group">
                            <label for="fecha_cirugia">Fecha</label><input id="fecha_cirugia" name="fecha_cirugia" type="text"/>
                        </div>
               
                    </div>
                    <div class="span5">
                        <div id="controlHora" class="control-group">
                            <label for="Hora">Hora</label><input id="Hora" name="Hora" type="text" maxlength="5"/>
                        </div>
                    </div>
                </div> 
                <div class="row">
                     <div class="span5">
                        <div id="controlcbo_Diagnostico" class="control-group">
                            <label for="cbo_Diagnostico">Diagnóstico</label><select id="cbo_Diagnostico" name="cbo_Diagnostico" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>
                      <div class="span5">
                         <div id="controlHoraFin" class="control-group">
                            <label for="HoraFin">Hora Fin</label><input id="HoraFin" name="HoraFin" type="text" maxlength="5"/>
                        </div>
                    </div>
                </div> 
                <div class="row">
                    <div class="span5">
                        <div id="controlSala" class="control-group">
                            <label for="Sala">Sala</label><select id="Sala" name="Sala" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>
                    <div class="span5">
                        <div id="controlCama" class="control-group">
                            <label for="Cama">Cama</label><select id="Cama" name="Cama" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div class="tab-pane" id="tab2">
                <div style="padding:0px 15px 0px 15px; height:250px;">

                 <div class="row">
                     <div class="span5">
                        <div id="controlEspecialidad" class="control-group">
                            <label for="Especialidad">Especialidad</label><select id="Especialidad" name="Especialidad" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>
                     <div class="span5">
                        <div id="controlCirugia" class="control-group">
                            <label for="Cirugia">Cirugía</label><select id="Cirugia" name="Cirugia" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>
                 </div> 
                 <div class="row">
                    <div class="span5">
                        <div id="controlCirujano" class="control-group">
                            <label for="Cirujano">Cirujano</label><select id="Cirujano" name="Cirujano" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>
                    <div class="span5">
                        <div id="controlAyudante" class="control-group">
                            <label for="Ayudante">Ayudante</label><select id="Ayudante" name="Ayudante" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>
                 </div> 
                   <div class="row">
                    <div class="span5">
                        <div id="controlAnestesista" class="control-group">
                            <label for="Anestesista">Anestesista</label><select id="Anestesista" name="Anestesista" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>
                    <div class="span5">
                        <div id="controlAnestesia" class="control-group">
                            <label for="Anestesia">Anestesia</label><select id="Anestesia" name="Anestesia" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>
                 </div>

                </div>
            </div>
             <div class="tab-pane" id="tab4">
                <div style="padding:0px 15px 0px 15px; height:250px;">
                    <div class="row">
                    <div class="span5">
                        <div id="controlHemo" class="control-group">
                             <input id="chkHemo" name="chkHemo" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="Hemo" style="display:inline; margin-left:5px; margin-right:5px;">Hemo</label><input id="Hemo" name="Hemo" type="text" />
                        </div>
                    </div>
                        <div class="span5">
                            <div id="controRayos" class="control-group">
                                    <label for="chkRayos" style="display:inline; margin-right: 10px;">Rayos</label><input id="chkRayos" name="chkRayos" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                                </div>
                        </div>
                    </div> 
                    <div class="row">
                        <div class="span5">
                             <div id="controlAnpa" class="control-group">
                                <label for="chkAnpa" style="display:inline; margin-right: 10px;">AN/PA</label><input id="chkAnpa" name="chkAnpa" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                            </div>
                        </div>
                    <div class="span5">
                         <div id="controlMonitoreo" class="control-group">
                                <label for="chkMonitoreo" style="display:inline; margin-right: 10px;">Monitoreo</label><input id="chkMonitoreo" name="chkMonitoreo" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                            </div>
                    </div>
                    </div> 
                    
                    <div class="row">
                        <div class="span5" style="height: 57px;">
                        <div id="controlMedSolicitante" class="control-group">
                            <label for="MedSolicitante">Medico Solicitante</label><select id="MedSolicitante" name="MedSolicitante" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>    
                    </div>

                    <div class="row">
                    <div class="span10" style="height: 57px;">
                        <div id="controlObservaciones" class="control-group">
                            <label for="Observaciones">Observaciones</label>                            
                            <textarea rows="2" cols="50" id="Observaciones" name="Observaciones" style="width:100%"></textarea>                           
                        </div>
                    </div><br />
 
                    </div> 

                       <div class="row" id="motivorow" style="display:none; margin-top:30px;">
                        <div class="span5" style="height: 57px;">
                           <div id="controlMotivo" class="control-group">
                                    <label for="Motivo" style="color:Red; float:left;">Motivo</label><select id="Motivo" name="Motivo" type="text" class="input-xlarge" /></select>
                                </div>
                        </div>
                        <div class="span5" style="height: 57px;">
                             <div id="controlMotivoUsu" class="control-group">
                                    <label for="MotivoUsu" style="color:Red; float:left;"">Usuario</label><input id="MotivoUsu" name="MotivoUsu" type="text" readonly="readonly" class="input-xlarge" />
                                </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="tab-pane" id="tab3">
                <div style="padding:0px 15px 0px 15px; height:250px;">
                    <div class="row">
                    <div class="span5">
                        <div id="control1Ayudante" class="control-group">
                            <label for="1Ayudante">1 Ayudante</label><select id="1Ayudante" name="1Ayudante" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>
                        <div class="span5">
                             <div id="control2Ayudante" class="control-group">
                                <label for="2Ayudante">2 Ayudante</label><select id="2Ayudante" name="2Ayudante" class="input-xlarge">
                                <option value="0"></option>
                                </select>
                            </div>
                        </div>
                    </div> 
                    <div class="row">
                        <div class="span5">
                            <div id="control3Ayudante" class="control-group">
                                <label for="3Ayudante">3 Ayudante</label><select id="3Ayudante" name="3Ayudante" class="input-xlarge">
                                <option value="0"></option>
                                </select>
                            </div>
                        </div>
                    <div class="span5">
                        <div id="controlcboMonitoreo" class="control-group">
                                <label for="Monitoreo">Monitoreo</label><select id="cboMonitoreo" name="cboMonitoreo" class="input-xlarge">
                                <option value="0"></option>
                                </select>
                            </div>
                    </div>
                    </div> 
                    <div class="row">
                        <div class="span5">
                           <div id="controlInstrumentadora" class="control-group">
                                    <label for="Instrumentadora">Instrumentadora</label><select id="Instrumentadora" name="Instrumentadora" class="input-xlarge">
                                    <option value="0"></option>
                                    </select>
                                </div>
                        </div>
                        <div class="span5">
                             <div id="controlCirculante" class="control-group">
                                    <label for="Circulante">Circulante</label><select id="Circulante" name="Circulante" class="input-xlarge">
                                    <option value="0"></option>
                                    </select>
                                </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="tab-pane" id="tab5">
                <div style="padding:0px 15px 0px 15px; height:250px;">
                    <div class="row">
                    <div class="span5">
                        <div id="Div1" class="control-group">
                            <label for="externo_medico">Médico</label><input id="externo_medico" name="externo_medico" class="input-xlarge" type="text">
                        </div>
                    </div>
                        <div class="span5">
                             <div id="Div2" class="control-group">
                                <label for="externo_medico_matricula">Matricula</label><input id="externo_medico_matricula" name="externo_medico_matricula" class="input-xlarge" type="text">
                            </div>
                        </div>
                    </div> 
                </div>
            </div>

          </div>
         </div>
         </form>
         
<div style="height:120px;width:100%;background-color:#CCCCCC;margin-top:5px;">
<div class="pull-right" style="padding:5px; height:120px;">
  <a id="btnVolver" class="btn" style="display:none"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <button id = "btnGuardar" class="btn btn-info" ><i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>
  <button id = "btn_Imprimir" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
</div>
</div>
      </div>
    </div>
  </div>
</div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
    <script src="../js/Hospitales/Quirofano/DatosIntervencion.js" type="text/javascript"></script>  
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>

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



    parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > <strong>Datos de la Intervención</strong>";

</script> 

</body>
</html>



