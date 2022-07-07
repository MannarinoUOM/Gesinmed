<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Planificar-Cirugia-ORIGINAL.aspx.cs" Inherits="Quirofano_Planificar_Cirugia_ORIGINAL" %>

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
                <a class="btn" id="btn_volver_1"><i class=" icon-arrow-left"></i>&nbsp;Volver</a> 
                <a class="btn btn-danger" href="Planificar-Cirugia.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
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
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a> <img id="IconoVencido2" class="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Quirófano: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:450px;">       

      <div id="Aguarde_Momento" style="background-color:White; display:none; width:100%; height:440px; position:absolute;">
        <div style="color:Black; font-size: 20px; text-align:center; margin-top: 199px; ">
        Aguarde un momento <img src="../img/Espere.gif" />
        </div>
      </div>

              <form id="frm_" name="frm_">

              <div>
              <table>
              
              <tr><td style="width:128px; text-align:right;">Fecha</td><td style="width:411px;"><input id="fecha_cirugia" name="fecha_cirugia" type="text" maxlength="5" style="width: 94px;"/> <span style="margin-left:24px;">Hora</span> <input id="Hora" name="Hora" type="text" maxlength="5" style="width: 150px;"/></td><td></td>
              <td>  
              <span style="margin-left:80px;">Urgencia</span>
              <label for="urg_si" style="display:inline; margin-left:10px;">Si</label> <input type="radio" name="chkUrgencia" id="urg_si" value="True" style="margin-top:0px;">
              <label for="urg_no" style="display:inline; margin-left:10px;">No</label> <input type="radio" name="chkUrgencia" id="urg_no" value="False" checked style="margin-top:0px;">
              </td></tr>
              </table>
                            
              <table>
              <tr>
              <td style="width:128px; text-align:right;">Diagnóstico</td>
              <td>
              <select id="cbo_Diagnostico" name="cbo_Diagnostico" class="pull-left" style="width:672px;">
                            <option value="0"></option>
                            </select>
                            <a id="btn_edicion_diagnostico" class="btn pull-left" data-toggle="Modal_Edicion_Diagnostico" style="font-size:10px; line-height:10px; width: 77px;">&nbsp;Alta y Edición de Diagnósticos</a>  
              </td>
              </tr>
              </table>
                                         
                <table>
                <tr>
                <td style="width:128px; text-align:right;" class="titulo_derecho">Cirugía</td>
                <td><select id="Cirugia" name="Cirugia" class="pull-left" style="width:672px;">
                            <option value="0"></option>
                            </select>
                            <a id="btn_edicion_cirugia" class="btn pull-left" data-toggle="Modal_Edicion_Cirugia" style="font-size:10px; line-height:10px; width: 77px;">&nbsp;Alta y Edición de Cirugías</a>
                            </td>
                </tr>
                </table>



              <table>
             
              <tr>
              <td style="width:128px;" class="titulo_derecho">Quirófano</td><td>
                            <select id="Sala" name="Sala" style="width: 110px;">
                            <option value="0"></option>
                            </select>

                <span style="margin-left:10px;">Cama</span>
                <select id="Cama" name="Cama" style="width: 164px;">
                            <option value="0"></option>
                            </select>

              </td><td style="width:128px;" class="titulo_derecho">Especialidad</td><td><select id="Especialidad" name="Especialidad" style="width: 309px;">
                            <option value="0"></option>
                            </select></td>
              </tr>

              <tr><td style="width:128px;" class="titulo_derecho">Cirujano</td><td><select id="Cirujano" name="Cirujano" style="width:332px;">
                            <option value="0"></option>
                            </select></td><td class="titulo_derecho">Ayudante</td><td>
                            <select id="Ayudante" name="Ayudante"  style="width: 309px;">
                            <option value="0"></option>
                            </select>
                            </td></tr>
              
              <tr><td style="width:128px;" class="titulo_derecho">Anestesista</td><td>
              <select id="Anestesista" name="Anestesista" style="width:332px;">
                            <option value="0"></option>
                            </select>
              </td><td class="titulo_derecho">Anestesia</td><td><select id="Anestesia" name="Anestesia" style="width: 309px;">
                            <option value="0"></option>
                            </select></td></tr>

                
                <tr><td class="titulo_derecho">
                
                <input id="chkHemo" name="chkHemo" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:0px; margin-top: 0px;" />
                <label for="chkHemo" style="display:inline; margin-left:0px; margin-right:5px;">Hemo</label>
                </td><td><input id="Hemo" name="Hemo" type="text" style="width:318px" /> 
                </td><td class="titulo_derecho"></td>
                <td>
                
                <input id="chkRayos" name="chkRayos" type="checkbox" class="input-xlarge" style="vertical-align:middle; margin-top: 0px;" /><label for="chkRayos" style="display:inline; margin-right: 40px;">Rayos</label>  
                <input id="chkAnpa" name="chkAnpa" type="checkbox" class="input-xlarge" style="vertical-align:middle; margin-top: 0px;" />  <label for="chkAnpa" style="display:inline; margin-right: 60px;">AN/PA</label>
                <input id="chkMonitoreo" name="chkMonitoreo" type="checkbox" class="input-xlarge" style="vertical-align:middle; margin-top: 0px;" /><label for="chkMonitoreo" style="display:inline; margin-right: 20px;">Monitoreo</label>
                </td></tr>

              </table>
                            

              <div style="margin-left:12px;">              
                
                <span>Médico Solicitante</span> <select id="MedSolicitante" name="MedSolicitante" style="width:332px">
                            <option value="0"></option>
                            </select>

                   <%
                       if (Request.QueryString["Cirugia_Id"] != null)
                       {
                   %>
                            <span style="margin-left:24px;">Suspendida por</span>
<select id="Motivo" name="Motivo" style="width:309px" maxlength="30"/>
                                <option value="0"></option>
                            </select>
              </div>

              <div style="margin-left:30px;"> 
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
              <div>
                  <a id = "btnIntervencion" class="opciones btn btn-info" disabled="disabled" style="width:155px; margin-left:10px;" >Datos de la Intervención</a> 
                  <a id = "btnRes28" class="opciones btn btn-info" disabled="disabled" style="width:160px;" >R.28</a>
                  <a id = "btnProtocolos" class="opciones btn btn-info" disabled="disabled" style="width:105px;" >Protocolos</a> 
                  <a id = "btnPosAnestesia" class="opciones btn btn-info" disabled="disabled" style="width:190px;" >Recuperación Post-Anestesia</a> 
                  
                  <a id = "btnSuspender" class="opciones btn btn-warning" disabled="disabled"  style="width:140px; display:none;" >Suspender Cirugía</a> 
                  <a id = "btnReanudar" class="opciones btn btn-success" disabled="disabled"  style="width:140px"; display:none; >Reanudar Cirugía</a> <br />
                  
                  <a id = "btnCargaInsumos" class="opciones btn btn-info" disabled="disabled" style="width:155px; margin-left:10px;" >Carga de Insumos</a>
                  <a id = "btnPreQuirurgicos" class="opciones btn btn-info" disabled="disabled" style="width:160px;" >Insumos Pre-Quirúrgicos</a>
                  <a id = "btnCargaExtras" class="opciones btn btn-info" disabled="disabled" style="width:105px;" >Carga de Extras</a>
                  <a id = "btnPreAnestesia" class="opciones btn btn-info" disabled="disabled" style="width:190px;">Datos Pre-Anestesia</a>                  
                  <a id = "btnBorrar" class="opciones btn btn-danger" disabled="disabled" style="width:140px;" >Borrar Cirugía</a>

              </div>
              <%} %>
              </div>

         </form>
         
<div class="pie_gris">
  <a id = "btnGuardar" class="btn btn-info pull-right" data-toggle="myModal"><i class=" icon-ok icon-white"></i>&nbsp;Guardar</a>
  <a class="btn btn-danger pull-right" href="Planificar-Cirugia.aspx" id="btn_otro_paciente2">Otro Paciente</a> 
  <a id="btnVolver" class="btn pull-right"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>  
</div>


<div id="Modal_Edicion_Diagnostico" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
  <input type="hidden" id="editando_id_diagnostico" value="0" />  
  <div class="modal-header">    
    <h3 id="H1">Alta y Edición de Diagnósticos</h3>
  </div>
  <div class="modal-body" style="margin-left:0px; margin-right:10px;">
    <select id="select_diagnosticos" style="width: 100%;"></select>
    <br />
    <div>Diagnóstico</div> 
    <input id="txt_diagnosticos_edicion" type="text" style="width: 100%;" />    
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
    <h3 id="H2">Alta y Edición de Cirugía</h3>
  </div>
  <div class="modal-body" style="margin-left:0px; margin-right:10px;">
    <select id="select_cirugias" style="width: 100%;"></select>
    <br />
    <div>Cirugía</div> 
    <input id="txt_cirugias_edicion" type="text" style="width: 100%;" />    
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



    parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > Turnos > <strong>Planificar Cirugía</strong>";

</script> 

</body>
</html>


