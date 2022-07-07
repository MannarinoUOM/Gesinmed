<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Planificar-Endoscopia.aspx.cs" Inherits="Quirofano_Planificar_Endoscopia" %>

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
.titulo_derecho{ text-align:right;}
.color_amarillo {background-color: #F4FA58;}    
.color_verde {background-color: #58FA58;}    
.color_rojo {background-color: #FA5858;}  
.color_gris {background-color: #eeeeee;}  
.boton_a {width:150px; display:inline-block; height: 26px; padding-top:5px; cursor:pointer;}  
#frm_ {font-size:12px;}
#frm_ input {margin-bottom:0px;}
#frm_ select {margin-bottom:0px;}
#span_cirugias_cargadas input{margin:0;}
#span_cirugias_cargadas label{margin:0; display:inline-block;}

#span_diagnosticos_cargados input{margin:0;}
#span_diagnosticos_cargados label{margin:0; display:inline-block;}

.manito {cursor:pointer;}
.Baja {background-color:#FFAAAA;}
.Quirofano {background-color:#96F177;}
.NoQuirofano {background-color:#FDFF90;}   
.Ocultar{display:none;}
</style>

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

            <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
            <span id="SpanCargando"> <img id="IconoVencido" class="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>

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
            <a id="btnBuscarPaciente" href="#" class="btn"><i class="icon-search icon-black"></i></a> </div>
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
                <a class="btn" id="btn_volver_1"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>                 
                <a class="btn btn-danger" id="btnCancelarPedidoTurno2" style="display:none;">Otro Paciente</a> 
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
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a> <img id="IconoVencido2" class="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> <a id="cambiar_paciente" href="javascript:CambiarPacientePopUp();" style="color:Red;display:none;"><b>Cambiar Paciente</b></a> </div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span> &nbsp;&nbsp;&nbsp; <span style="display:none;">Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span style="display:none;">Cama: <strong><span id="Cargado_Cama"></span></strong></span>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:450px;">    
      
      <div id="div_cambiar_paciente" style="position:absolute;background-color: #e6e6e6;width: 915px;height: 413px;display:none;">
        
        <div style="margin:10px 0 0 10px;">

        <div style="background-color:#CECECE;border-radius: 6px;padding: 20px;width: 853px;margin-top: 77px;">
        
        NHC: <input id="txt_cambiar_nhc" type="text" maxlength="11" placeholder="Ej: 99123456789"><br><br><br>                
        Paciente: <span id="paciente_cambiar_nombre"></span><br>
        <span id="span_titulo_documento"></span>: <span id="paciente_cambiar_documento"></span><br>
        Teléfono: <span id="paciente_cambiar_telefono"></span><br>
        <span id="span_titulo_seccional">Seccional:</span><span id="paciente_cambiar_seccional"></span><br><br>


        <a id="btn_cambiar_paciente_final" class="btn btn-info">Cambiar Paciente</a> 

        </div>

        

        </div>
      </div>

      <div id="Aguarde_Momento" style="background-color:White; display:none; width:100%; height:440px; position:absolute;">
        <div style="color:Black; font-size: 20px; text-align:center; margin-top: 199px; ">
        Aguarde un momento <img src="../img/Espere.gif" />
        </div>
      </div>

              <form id="frm_" name="frm_">

              <div>
              <table>
              
              <tr><td style="width:128px; text-align:right;">Fecha</td><td style="width:451px;"><input id="fecha_cirugia" name="fecha_cirugia" type="text" maxlength="5" style="width: 75px;"/> <span style="margin-left:0px;">Hora Turno</span> <input id="Hora" name="Hora" type="text" maxlength="5" style="width: 40px;"/> <span style="margin-left:0px;">Hora Inicio</span> <input id="Hora_Inicio" name="Hora_Inicio" type="text" maxlength="5" style="width: 40px;"/>  <span style="margin-left:0px;">Hora Fin</span> <input id="Hora_Fin" name="Hora_Fin" type="text" maxlength="5" style="width: 40px;"/></td><td></td>
              <td>  
              <span style="margin-left:0px;">Urgencia</span>
              <label for="urg_si" style="display:inline; margin-left:10px;">Si</label> <input type="radio" name="chkUrgencia" id="urg_si" value="True" style="margin-top:0px;">
              <label for="urg_no" style="display:inline; margin-left:10px;">No</label> <input type="radio" name="chkUrgencia" id="urg_no" value="False" checked style="margin-top:0px;">
              
              <span style="margin-left:61px;"><label for="cb_polisomnografia" style="display:none;">Polisomnografía</label></span>              
              <input id="cb_polisomnografia" name="cb_polisomnografia" type="checkbox" class="input-xlarge" style="vertical-align:middle; margin-top: 0px;margin-left: 0px;display:none;">             

              </td></tr>
              </table>
                            
              <table>
              <tr>
              <td style="width:128px; text-align:right; cursor:pointer;"><a onclick="javascript:FiltrarDiagnostico()">Diagnóstico</a></td>
              <td>
              <input type="text" readonly="readonly" id="txt_cbo_Diagnostico" class="pull-left" style="width:650px;"/>
              <div id="div_diagnostico" style="display:none;width: 671px; height:200px; background-color:#969696;margin-top: 30px;position:absolute;">
                    <div id="span_diagnosticos_cargados" style="max-height:200px; overflow:auto;">
                    </div>
                </div>
              <select id="cbo_Diagnostico" name="cbo_Diagnostico" class="pull-left" style="width:672px;display:none;">
                            <option value="0"></option>
                            </select>
                            <a id="btn_edicion_diagnostico" class="btn pull-left" data-toggle="Modal_Edicion_Diagnostico" style="font-size:10px; line-height:10px; width: 86px;">&nbsp;Alta y Edición de Diagnósticos</a>  
              </td>
              </tr>
              </table>
                                         
                <table>
                <tr>
                <td style="width:128px; text-align:right; cursor:pointer;" class="titulo_derecho"><a onclick="FiltrarCirugia();">Procedimiento</a></td>
                <td>
                <input type="text" readonly="readonly" id="txt_cirugias" class="pull-left" style="width:650px;"/>
                <div id="div_cirugias" style="display:none;width: 671px; height:200px; background-color:#969696;margin-top: 30px;position:absolute;">
                    <div id="span_cirugias_cargadas" style="max-height:200px; overflow:auto;">
                    </div>
                </div>
                
                <select id="Cirugia" name="Cirugia" class="pull-left" style="width:672px; display:none;">
                            <option value="0"></option>
                </select>
                            <a id="btn_edicion_cirugia" class="btn pull-left" data-toggle="Modal_Edicion_Cirugia" style="font-size:10px; line-height:10px; width: 86px;">&nbsp;Alta y Edición de Procedimientos</a>
                            </td>
                </tr>
                </table>



              <table>
             
              <tr>
              <td style="width:128px;" class="titulo_derecho"  maxlength="6">Peso</td><td>                            
                            <input type="text" id="Peso" style="width:59px;" maxlength="5"/>
                            
                            <span style="margin-left:14px;">Sala</span>
                            <select id="Sala" name="Sala" style="width: 79px;">
                            <option value="0"></option>
                            </select>

                <span style="margin-left:15px;">Cama</span>
                <select id="Cama" name="Cama" style="width: 79px;">
                            <option value="0"></option>
                            </select>

              </td><td style="width:128px;" class="titulo_derecho">Especialidad</td><td><select id="Especialidad" name="Especialidad" style="width: 309px;">
                            <option value="0"></option>
                            </select></td>
              </tr>

              <tr><td style="width:128px;" class="titulo_derecho">Endoscopista</td><td><select id="Cirujano" name="Cirujano" style="width:332px;">
                            <option value="0"></option>
                            </select>                            

                            </td>

                            <td></td>

                            <td>
                            <input id="chkRayos" name="chkRayos" type="checkbox" class="input-xlarge" style="vertical-align:middle; margin-top: 0px;margin-left: 0px;" /><label for="chkRayos" style="display:inline; margin-right: 40px;">Rayos</label>  
                <input id="chkAnpa" name="chkAnpa" type="checkbox" class="input-xlarge" style="vertical-align:middle; margin-top: 0px;" />  <label for="chkAnpa" style="display:inline; margin-right: 60px;">AN/PA</label>
                <input id="chkMonitoreo" name="chkMonitoreo" type="checkbox" class="input-xlarge" style="vertical-align:middle; margin-top: 0px;" /><label for="chkMonitoreo" style="display:inline; margin-right: 20px;">Monitoreo</label>
                            </td>

                            <td class="titulo_derecho Ocultar"><a onclick="Listar_Todos_Los_Medicos(this);" data-elemento="Ayte1" data-estado="1" class="manito">Ayte1</a></td>
                            <td class="Ocultar"><select id="Ayte1" name="Ayte1" style="width:128px;"><option value="0"></option></select>
                            <span style="margin-left:10px;"><a onclick="Listar_Todos_Los_Medicos(this);" data-elemento="Ayte2" data-estado="1" class="manito">Ayte2</a></span><select id="Ayte2" name="Ayte2" style="width:137px;"><option value="0"></option></select>                                                               

                            </td>
                            </tr>                            

              <tr class="Ocultar"><td style="width:128px;" class="titulo_derecho"></td><td></td>
                            <td class="titulo_derecho"><a onclick="Listar_Todos_Los_Medicos(this);" data-elemento="Ayte3" data-estado="1" class="manito">Ayte3</a></td>
                            <td><select id="Ayte3" name="Ayte3" style="width:129px;"><option value="0"></option></select>
                            <span style="margin-left:10px;"><a onclick="Listar_Todos_Los_Medicos(this);" data-elemento="Monitorista" data-estado="1" class="manito">Moni.</a></span><select id="Monitorista" name="Monitorista" style="width:138px;"><option value="0"></option></select>       
                            </td>
                            </tr>


              
              <tr><td style="width:128px;" class="titulo_derecho">Anestesista</td><td>
              <select id="Anestesista" name="Anestesista" style="width:332px;">
                            <option value="0"></option>
                            </select>
              </td><td class="titulo_derecho">Anestesia</td><td><select id="Anestesia" name="Anestesia" style="width: 309px;">
                            <option value="0"></option>
                            </select></td></tr>
                </table>
                
                <table>
              
              
                <tr>
                <td style="width:128px;" class="titulo_derecho">Asistente</td>
                <td><select id="Instrumentadora" name="Instrumentadora" style="width:150px;"><option value="0"></option></select></td>
                <td>
                
                <div class="Ocultar">
                    <span style="margin-left:17px;">Circ.</span><select id="Circulante" name="Circulante" style="width:139px;"><option value="0"></option></select>
                    <span style="margin-left:36px;">Cirujano Externo</span><input id="Cirujano_Externo" type="text" name="Cirujano_Externo" style="width:100px;" maxlength="4000"/>
                    <span style="margin-left:29px;">Mat. C. Ext.</span><input id="Matricula_Cirujano_Externo" type="text" name="Matricula_Cirujano_Externo" style="width:89px;" maxlength="4000"/>
                </div>

                </td>
                </tr>
                </table>              
                
                <table>
                <tr><td style="width:129px;" class="titulo_derecho Ocultar">
                
                <input id="chkHemo" name="chkHemo" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:0px; margin-top: 0px;" />
                <label for="chkHemo" style="display:inline; margin-left:0px; margin-right:5px;">Hemo</label>
                </td><td style="width:460px;" class="Ocultar"><input id="Hemo" name="Hemo" type="text" style="width:318px" maxlength="4000" /> 
                </td><td class="titulo_derecho"></td>
                <td>                                
                </td></tr>

              </table>
              
              

              <div style="margin-left:28px;">              
                
                <span>Médico Solicitante</span> <select id="MedSolicitante" name="MedSolicitante" style="width:332px">
                            <option value="0">NINGUNO</option>
                            </select>

                   <%
                       if (Request.QueryString["Cirugia_Id"] != null)
                       {
                   %>
                            <span style="margin-left:39px;">Suspendida por</span>
<select id="Motivo" name="Motivo" style="width:309px" maxlength="30"/>
                                <option value="0"></option>
                            </select>
              </div>

              <div style="margin-left:45px;"> 
                   <%
                       }
                       else
                       {
                           %>
                           <div style="margin-left:20px;"> 
                           <%
                        }
                   %>              
              
                Observaciones <textarea rows="1" cols="50" id="Observaciones" name="Observaciones" style="width:762px;"></textarea>
              </div>


              <%
                  if (Request.QueryString["Cirugia_Id"] != null)
                  {
                   %>
              <div id="opciones_quiro">   
                  <div style="width:565px; height:100px;display:block; margin-left:20px; float:left;">
                    <a id = "btnOpcion1" class="opciones btn btn-info" disabled="disabled" style="width:150px;margin-left: 10px;margin-right: 5px;" >BRONCOSCOPÍA</a>
                    <a id = "btnOpcion2" class="opciones btn btn-info" disabled="disabled" style="width:150px;margin-right: 5px;" >VCC</a>
                    <a id = "btnOpcion3" class="opciones btn btn-info" disabled="disabled" style="width:150px;margin-right: 5px;" >VEDA</a>     <br />

                    <a id = "btnCargaExtras" class="opciones btn btn-info" disabled="disabled" style="width:150px;margin-left:10px; margin-top:5px;" >EXTRAS</a>            
                    <a id = "btnCargaVRSC" class="opciones btn btn-info" disabled="disabled" style="width:150px;margin-left:5px;margin-top:5px" >VRSC</a>                
                    <a id = "btnCargaCPER" class="opciones btn btn-info" disabled="disabled" style="width:150px;margin-left:5px;margin-top:5px" >CPER</a>
                    <a id = "btnCargaPARTE" class="opciones btn btn-info" disabled="disabled" style="width:150px;margin-left:10px;margin-top:5px" >PARTE ANESTESIA</a>                                                
                  </div>   
                  
                  <div style="width:100px; height:100px;display:block;margin-left: 0px; float:left;">
                    <a id = "btnCargaInsumos" class="opciones btn btn-info" disabled="disabled" style="width: 73px;margin-left: 0px;height: 51px;padding-top:8px;" ><span style="margin-top: 15px;display: inline-block;">INSUMOS</span></a>                  
                  </div>            
                  
                  
                  
                  <a id = "btnSuspender" class="opciones btn btn-warning" disabled="disabled"  style="width: 150px; display:none; margin-left:10px;" >Suspender Endoscopía</a> 
                  <a id = "btnReanudar" class="opciones btn btn-success" disabled="disabled"  style="width:150px; display:none; margin-left:10px;" >Reanudar Endoscopía</a> <br /> 
                  
                  
                  
                  <a id="btnBorrar" class="opciones btn btn-danger" disabled="disabled" style="width:150px;float: right;margin-right: 44px;margin-top:5px">Borrar Endoscopía</a>

              </div>
              <%} %>
              </div>

         </form>
         
<div class="pie_gris">
  <a id = "btnGuardar" class="btn btn-info pull-right" data-toggle="myModal"><i class=" icon-ok icon-white"></i>&nbsp;Guardar</a>
  <a class="btn btn-danger pull-right" id="btn_cancelar">Cancelar</a> 
  <a class="btn pull-right" id="Imprimir_IQ">Imprimir</a> 
  <a class="btn btn-danger pull-right" id="btn_otro_paciente2">Otro Paciente</a>   
  <a id="btnVolver" class="btn pull-right"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>  
  
  <a id="btn_eliminar_cirugia_provisoria" class="btn btn-danger pull-left" style="display:none;"> Borrar Endoscopía Provisoria</a>  

</div>


<div id="Modal_Edicion_Diagnostico" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
  <input type="hidden" id="editando_id_diagnostico" value="0" />  
  <div class="modal-header">    
    <h3 id="H1">Alta y Edición de Diagnósticos</h3>
  </div>
  <div class="modal-body" style="margin-left:0px; margin-right:10px;">
    <div><span style="margin-left: 0px;">Filtro:</span><input type="text" id="txt_filtro_diagnostico"/></div>
    <select id="select_diagnosticos" style="width: 100%;"></select>
    <br />
    <div>Diagnóstico</div> 
    <input id="txt_diagnosticos_edicion" type="text" style="width: 100%;" maxlength="4000"/>    
  </div>
  <div style="text-align:center; margin-bottom: 10px;">
     
    <a class="color_verde boton_a" style="text-decoration:none;" id="btn_diagnostico_guardar"><span id="span_guardar">Agregar</span></a>
    <a class="color_rojo boton_a" style="text-decoration:none;" id="btn_diagnostico_eliminar">Eliminar</a>
    <a class="color_gris boton_a" style="text-decoration:none; border-style: solid; border-width: 1px;  border-color: #C5C5C5;" id="btn_diagnostico_cancelar">Cancelar</a>    
    
  </div>
</div>



<div id="Modal_Edicion_Cirugia" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
  <input type="hidden" id="editando_id_cirugia" value="0" />  
  <div class="modal-header">    
    <h3 id="H2">Alta y Edición de Procedimientos</h3>
  </div>
  <div class="modal-body" style="margin-left:0px; margin-right:10px;">
    <div><span style="margin-left: 0px;">Filtro:</span><input type="text" id="txt_filtro_cirugia"/></div>
    <select id="select_cirugias" style="width: 100%;"></select>
    <br />
    <div>Procedimiento</div> 
    <input id="txt_cirugias_edicion" type="text" style="width: 100%;" maxlength="4000"/>    
  </div>
  <div style="text-align:center; margin-bottom: 10px;">
     
    <a class="color_verde boton_a" style="text-decoration:none;" id="btn_cirugia_guardar"><span id="span_cirugia_guardar">Agregar</span></a>
    <a class="color_rojo boton_a" style="text-decoration:none;" id="btn_cirugia_eliminar">Eliminar</a>
    <a class="color_gris boton_a" style="text-decoration:none; border-style: solid; border-width: 1px;  border-color: #C5C5C5;" id="btn_cirugia_cancelar">Cancelar</a>    
    
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
<script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>
<script src="../js/Hospitales/Endoscopia/PlanificarEndoscopia.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>


<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $(".contenedor_2").hide();
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Endoscopía > Turnos > <strong>Planificar Endoscopía</strong>";

</script> 

</body>
</html>


