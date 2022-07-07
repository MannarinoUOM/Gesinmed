<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargadeProtocolo.aspx.cs" Inherits="AnatomiaPatologica_CargadeProtocolo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="height:420px; width:700px; margin: 10px 40px 10px 40px;"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form class="form-horizontal" id="frm_Inicio" >
        <div class="control-group" id="controltxtNroProtocolo">
          <label class="control-label">Nro. Protocolo</label>
          <div class="controls">
            <input id="txtNroProtocolo" name="txtNroProtocolo" type="text" maxlength="8" placeholder="Nro.Protocolo">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >Fecha de Carga</label>
          <div class="controls">
            <input id="txtFechaCarga" name="txtFechaCarga" type="text">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtNHC">NHC</label>
          <div class="controls">
            <input id ="txtNHC" name="txtNHC" placeholder="Ingrese NHC" maxlength="11" type="text" class="span3">
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtDNI">DNI</label>
          <div class="controls">
            <input id ="txtDNI" name="txtDNI" placeholder="Ingrese DNI" maxlength="8" type="text" class="span3">
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" name="txtPaciente" placeholder="Ingrese Paciente" maxlength="60" type="text" class="span3">
            <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx" class="btn"><i class="icon-search icon-black"></i></a>
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="cbo_Seccional">Seccional</label>
          <div class="controls">
            <select id="cbo_Seccional" name="cbo_Seccional" class="span5"></select>
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="cbo_Institucion">Institución</label>
          <div class="controls">
            <select id="cbo_Institucion" name="cbo_Institucion" class="span5"></select>
        </div>
        </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="CargaPracticasMedicasHC.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a>
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona" >
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div><span>Institución: <strong><span id="CargadoInstitucion"></span></strong></span> </div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:450px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos de la Intervención</span></div>

      <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Datos 1</a></li>
                <li><a href="#tab2" data-toggle="tab">Datos 2</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">

                 <div class="row">
                    <div class="span10">
                            <div id="controlcbo_Material" class="control-group">
                                <label for="cbo_Material" style="display:inline;">Material: </label><select id="cbo_Material" name="cbo_Material" class="input-large" style="width:700px;"></select>
                            </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="span10">
                            <div id="controlcbo_Procedimiento" class="control-group">
                                <label for="cbo_Procedimiento" style="display:inline;">Procedimiento: </label><select id="cbo_Procedimiento" name="cbo_Procedimiento" class="input-large" style="width:670px;"></select>
                            </div>
                    </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                                <div id="controlcbo_Metodos" class="control-group">
                                    <label for="cbo_Metodos" style="display:inline;">Métodos: </label><select id="cbo_Metodos" name="cbo_Metodos" class="input-large" style="width:700px;"></select>
                                </div>
                        </div>
                    </div>

                     <div class="row">
                            <div class="span5">
                                <div id="controlcbo_Especialidad" class="control-group">
                                    <label for="cbo_Especialidad" style="display:inline;">Especialidad: </label><select id="cbo_Especialidad" name="cbo_Especialidad"></select>
                                </div>
                             </div>
                            <div class="span5">
                                <div id="controlcbo_Servicio" class="control-group">
                                    <label for="cbo_Servicio" style="display:inline;">Servicio: </label><select id="cbo_Servicio" name="cbo_Servicio"></select>
                                </div>
                             </div>
                    </div>
                     <div class="row">
                            <div class="span5">
                                <div id="controlcbo_Medicos" class="control-group">
                                    <label for="cbo_Medicos" style="display:inline;">Médico Central: </label><select id="cbo_Medicos" name="cbo_Medicos"></select>
                                </div>
                             </div>
                            <div class="span5">
                              <div class="control-group" id="controltxtServExt">
                                <label style="display:inline;" for="txtServExt">Servicio Ext: </label><input id ="txtServExt" name="txtServExt" type="text" class="input-large">
                              </div>
                            </div>
                    </div>
                    <div class="row">
                            <div class="span3">
                              <div class="control-group" id="controltxtEstadistica">
                                <label style="display:inline;" for="txtEstadistica">Estadística: </label><input id ="txtEstadistica" name="txtEstadistica" type="text" class="input-mini">
                              </div>
                            </div>
                            <div class="span3">
                              <div class="control-group" id="controltxtNroEstudio">
                                <label style="display:inline;" for="txtNroEstudio">Nro. Estudio: </label><input step="1" id ="txtNroEstudio" name="txtNroEstudio" type="number" class="input-small">
                              </div>
                            </div>
                            <div class="span4">
                              <div class="control-group" id="controltxtMedicoExt">
                                <label style="display:inline;" for="txtMedicoExt">Médico Ext: </label><input id ="txtMedicoExt" name="txtMedicoExt" type="text" class="input-large">
                              </div>
                            </div>
                    </div>
               </div>
         
         <div class="tab-pane" id="tab2">

            <div class="clearfix"></div>
                    <div class="row">
                      <div class="span10">
                              <div class="control-group" id="controltxtMacroscopica">
                                <label style="display:inline;" for="txtMacroscopica">Macroscópica: </label><textarea id="txtMacroscopica" name="txtMacroscopica" rows="2" cols="300" style="width:650px;"></textarea>
                              </div>
                       </div>
                    </div>
                    <div class="row">
                      <div class="span10">
                              <div class="control-group" id="controltxtMicroscopica">
                                <label style="display:inline;" for="txtMicroscopica">Microscópica: </label><textarea id="txtMicroscopica" name="txtMicroscopica" rows="2" cols="300" style="width:650px;"></textarea>
                              </div>
                       </div>
                    </div>
                     <div class="row">
                        <div class="span10">
                              <div class="control-group" id="controltxtDiagnostico">
                                <label style="display:inline;" for="txtDiagnostico">Diagnóstico: </label><textarea id="txtDiagnostico" name="txtDiagnostico" rows="2" cols="300" style="width:650px;"></textarea>
                              </div>
                       </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                              <div class="control-group" id="controltxtEspeciales">
                                <label style="display:inline;" for="txtEspeciales">Especiales: </label><textarea id="txtEspeciales" name="txtEspeciales" rows="2" cols="300" style="width:650px;"></textarea>
                              </div>
                       </div>
                    </div>
          </div>
      </div>
          </div>
          <div class="pie_gris">
            <a id = "btnConfirmar" class="btn btn-info pull-right"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
            <a id = "btnCargarMuestras" class="btn btn-success pull-right"><i class=" icon-ok icon-white"></i>&nbsp;Cargar Muestras</a>
            </div>

      <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:900px;height:400px;">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel">Muestras Obtenidas</h3>
          </div>
          <div class="modal-body" style="margin-left:10px; margin-right:10px;">
                <div class="row">
                            <div class="span5">
                                <div id="controlcbo_Diagnostico" class="control-group">
                                    <label for="cbo_Diagnostico" style="display:inline;">Cod.Diag: </label><select id="cbo_Diagnostico" name="cbo_Diagnostico"></select>
                                </div>
                             </div>
                            <div class="span5">
                                <div id="controlcbo_Nomenclador" class="control-group">
                                    <label for="cbo_Nomenclador" style="display:inline;">Nomenclador: </label><select id="cbo_Nomenclador" name="cbo_Nomenclador"></select>
                                </div>
                             </div>
                    </div>
                <div class="row">
                            <div class="span3">
                                <div id="controltxtNroTacos" class="control-group">
                                    <label for="txtNroTacos" style="display:inline;">Nro. Tacos: </label><input id ="txtTacos" name="txtTacos" type="text" class="input-mini">
                                </div>
                             </div>
                            <div class="span3">
                                <div id="controltxtPreparados" class="control-group">
                                    <label for="txtPreparados" style="display:inline;">Nro. Preparados: </label><input id ="txtPreparados" name="txtPreparados" type="text" class="input-mini">
                                </div>
                             </div>
                              <div class="span3">
                                <div id="controltxtFechaSalida" class="control-group">
                                    <label for="txtFechaSalida" style="display:inline;">Fecha Salida: </label><input id ="txtFechaSalida" name="txtFechaSalida" type="text" class="input-small">
                                </div>
                             </div>
                    </div>
                     <div class="row">
                            <div class="span5">
                                <div id="controltxtTecnicas" class="control-group">
                                    <label for="txtTecnicas" style="display:inline;">Nro. Técnicas Especiales Utilizadas: </label><input id ="txtTecnicas" name="txtTecnicas" type="text" class="input-mini">
                                </div>
                             </div>
                            <div class="span5">
                                <div id="controltxtIHQ" class="control-group">
                                    <label for="txtIHQ" style="display:inline;">Nro. Técnicas IHQ: </label><input id ="txtIHQ" name="txtIHQ" type="text" class="input-mini">
                                </div>
                             </div>
                    </div>
                    <div class="row">
                            <div class="span5">
                                <div id="controlchkReceptores" class="control-group">
                                    <label for="chkReceptores" style="display:inline;">Fueron determinados receptores hormonales? </label>&nbsp;&nbsp;<input id ="chkReceptores" name="chkReceptores" type="checkbox" class="input-mini">
                                </div>
                             </div>
                            <div class="span5">
                                <div id="controlchkPlaca" class="control-group">
                                    <label for="chkPlaca" style="display:inline;">Estudio con Placa </label>&nbsp;&nbsp;<input id ="chkPlaca" name="chkPlaca" type="checkbox" class="input-mini">
                                </div>
                             </div>
                    </div>

                            <a id = "btnConfirmarMuestras" class="btn btn-info pull-right" style="margin-top:80px;"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
          </div>
       </div>


</div>


      </div>
    </div>
  </div>

<!--Pie de p?gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/AnatomiaPatologica/CargadeProtocolo.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">

    parent.document.getElementById("DondeEstoy").innerHTML = "Anatomía Patológica > <strong>Carga de Protocolo</strong>";

</script> 

</body>
</html>

