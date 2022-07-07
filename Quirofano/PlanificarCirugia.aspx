<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PlanificarCirugia.aspx.cs" Inherits="Quirofano_PlanificarCirugia" %>

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
                      <select id="cbo_TipoDOC">
                      </select>          
                   </div>
        </div>
        <div class="control-group">
          <label class="control-label">N°</label>
          <div class="controls">
            <input id="txtdocumento" type="hidden" />
            <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
            <input id="txt_dni"type="text" maxlength="8" placeholder="Nro. de documento sin puntos">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >NHC</label>
          <div class="controls">
            <input id="txtNHC" type="text" maxlength="11" placeholder="Ej: 99123456789">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" maxlength="60" placeholder="Apellido Nombre" type="text" class="span3">
            <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>

        <div id="controlSeccional" class="control-group">
        
          <label class="control-label" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" />
          
              <select id="cboSeccional">
                <option value="0">Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" style="display:none;"></select>          

           </div>

        </div>

      </form>

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
        <div ><img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"/></div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:450px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos de la Cirugía</span></div>
      
              <form id="frm_" name="frm_">
        <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Datos 1</a></li>
                <li><a href="#tab2" data-toggle="tab">Datos 2</a></li>
                <li><a href="#tab3" data-toggle="tab">Datos 3</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">
                <div style="padding:0px 15px 0px 15px; height:320px;">
                <div class="row">
                    <div class="span5">
                        <div id="controlfecha_cirugia" class="control-group">
                            <label for="fecha_cirugia">Fecha</label><input id="fecha_cirugia" name="fecha_cirugia" type="text" maxlength="5"/>
                        </div>
               
                    </div>
                    <div class="span5">
                        <div id="controlHora" class="control-group">
                            <label for="Hora">Hora</label><input id="Hora" name="Hora" type="text" maxlength="5"/>
                        </div>
                    </div>
                </div><hr />
                <div class="row">
                     <div class="span5">
                        <div id="controlcbo_Diagnostico" class="control-group">
                            <label for="cbo_Diagnostico">Diagnóstico</label>
                            <select id="cbo_Diagnostico" name="cbo_Diagnostico" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                                                        
                            <a id="btn_edicion_diagnostico" class="btn pull-right" data-toggle="Modal_Edicion_Diagnostico"><i class=" icon-arrow-left"></i>&nbsp;Editar</a>  

                        </div>
                    </div>
                     <div class="span5">
                        <div id="controlchkUrgencia" class="control-group">
                                <label for="chkUrgencia" style="display:inline; margin-right: 10px;">Urgencia</label><input id="chkUrgencia" name="chkUrgencia" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                            </div>
                    </div>
                </div><hr />
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
                <div style="padding:0px 15px 0px 15px; height:320px;">

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
                 </div><hr />
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
                 </div><hr />
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
             <div class="tab-pane" id="tab3">
                <div style="padding:0px 15px 0px 15px; height:320px;">
                    <div class="row">
                    <div class="span5">
                        <div id="controlHemo" class="control-group" style="margin-bottom:0px">
                             <input id="chkHemo" name="chkHemo" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="Hemo" style="display:inline; margin-left:5px; margin-right:5px;">Hemo</label><input id="Hemo" name="Hemo" type="text" />
                        </div>
                    </div>
                        <div class="span5">
                            <div id="controRayos" class="control-group">
                                    <label for="chkRayos" style="display:inline; margin-right: 10px;">Rayos</label><input id="chkRayos" name="chkRayos" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                                </div>
                        </div>
                    </div><hr />
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
                    </div><hr />
                    <div class="row">

                    <div class="span5" style="height: 56px;">
                        <div id="controlMedSolicitante" class="control-group">
                            <label for="MedSolicitante">Medico Solicitante</label><select id="MedSolicitante" name="MedSolicitante" class="input-xlarge">
                            <option value="0"></option>
                            </select>
                        </div>
                    </div>

                    <div class="span5">
                        <div id="controlMotivo" class="control-group" style="display:none;">
                            <label for="Motivo" style="color:Red; display:inline;">Motivo de Suspensión</label>
                            <select id="Motivo" name="Motivo" class="input-xlarge" maxlength="30"/>
                                <option value="0"></option>
                            </select>
                        </div>
                    </div>


                    </div>

                    <div class="row">
                        <div class="span10" style="height: 56px;">
                        <div id="controlObservaciones" class="control-group">
                            <label for="Observaciones">Observaciones</label>

<textarea rows="2" cols="50" id="Observaciones" name="Observaciones" style="width:100%"></textarea>                           
                        </div>
                    </div>
                    </div>

                     <div class="row">

                    </div>
                </div>
            </div>
          </div>
         </div>
         </form>
         
<div class="pie_gris">
  <a id = "btnOpciones" class="btn btn-info pull-right" data-toggle="myModal"><i class=" icon-ok icon-white"></i>&nbsp;Opciones</a>
  <a id="btnVolver" class="btn pull-right"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>  
</div>

<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Seleccione una Opción</h3>
  </div>
  <div class="modal-body" style="margin-left:120px; margin-right:10px;">
  <div style="margin-left:80px;">
            <button id = "btnPreAnestesia" class="opciones btn btn-info" disabled="disabled" style="width:50%;"><i class=" icon-ok icon-white"></i>&nbsp;Datos Pre-Anestesia</button><br />
            
            <button id = "btnPreQuirurgicos" class="opciones btn btn-info" disabled="disabled" style="width:50%;" ><i class=" icon-ok icon-white"></i>&nbsp;Insumos Pre-Quirúrgicos</button> <br />
            
            <button id = "btnRes28" class="opciones btn btn-info" disabled="disabled" style="width:50%;" ><i class=" icon-ok icon-white"></i>&nbsp;Carga Resolución 28</button> <br />
  
      
            <button id = "btnIntervencion" class="opciones btn btn-info" disabled="disabled" style="width:50%;" ><i class=" icon-ok icon-white"></i>&nbsp;Datos de la Intervención</button> <br />

     
            <button id = "btnCargaInsumos" class="opciones btn btn-info" disabled="disabled" style="width:50%;" ><i class=" icon-ok icon-white"></i>&nbsp;Carga de Insumos</button> <br />
       
       
            <button id = "btnCargaExtras" class="opciones btn btn-info" disabled="disabled" style="width:50%;" ><i class=" icon-ok icon-white"></i>&nbsp;Carga de Extras</button> <br />
        
      
            <button id = "btnProtocolos" class="opciones btn btn-info" disabled="disabled" style="width:50%;" ><i class=" icon-ok icon-white"></i>&nbsp;Protocolos</button> <br />
       
            <button id = "btnPosAnestesia" class="opciones btn btn-info" disabled="disabled" style="width:50%;" ><i class=" icon-ok icon-white"></i>&nbsp;Recuperación Pos-Anestesia</button> <br />
            
            <button id = "btnSuspender" class="opciones btn btn-warning" disabled="disabled"  style="width:50%;" ><i class=" icon-ok icon-white"></i>&nbsp;Suspender Cirugía</button> <br />
      
            <button id = "btnBorrar" class="opciones btn btn-danger" disabled="disabled" style="width:50%;" ><i class=" icon-ok icon-white"></i>&nbsp;Borrar Cirugía</button>
     
          <br /> 
            <button id = "btnGuardar" class="btn btn-primary" style="width:50%;"><i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>
    </div> 
  </div>
</div>


<div id="Modal_Edicion_Diagnostico" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <input type="hidden" id="editando_id_diagnostico" value="0" />  
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="H1">Edición de Diagnosticos</h3>
  </div>
  <div class="modal-body" style="margin-left:0px; margin-right:10px;">
    <select id="select_diagnosticos" style="width: 100%;"></select>
    <br />
    <div>Editar</div> 
    <input id="txt_diagnosticos_edicion" type="text" style="width: 100%;" />    
  </div>
  <div style="text-align:center; margin-bottom: 10px;">
    
    <button id = "btn_diagnostico_eliminar" class="btn btn-danger" style="width:150px;"><i class=" icon-remove icon-white"></i>&nbsp;Eliminar</button>
    <button id = "btn_diagnostico_cancelar" class="btn btn-primary" style="width:150px;"><i class=" icon-remove icon-white"></i>&nbsp;Cancelar</button>
    <button id = "btn_diagnostico_guardar" class="btn btn-primary" style="width:150px;"><i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>
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
    <script src="../js/Hospitales/Quirofano/PlanificarCirugia.js" type="text/javascript"></script>
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



    parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > <strong>Planificar Cirugía</strong>";

</script> 

</body>
</html>


