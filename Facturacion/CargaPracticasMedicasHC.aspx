<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargaPracticasMedicasHC.aspx.cs" Inherits="Facturacion_CargaPracticasMedicasHC" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
               <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>
    <div class="contenedor_2" id="cont_" style="height:520px; width:700px; margin: 10px 40px 10px 40px;"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Ingreso de Datos</span></div>
      <form class="form-horizontal" id="frm_Inicio" >
        <div class="control-group" id="controltxtNroParte">
          <label class="control-label">Nro. Rendicion</label>
          <div class="controls">
            <input id="txtNroParte" name="txtNroParte" type="text" maxlength="8" placeholder="Nro.Parte">
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
            <input id ="txtTelefono" name="txtTelefono" placeholder="Ingrese DNI" maxlength="8" type="text" class="span3" style="display:none;">
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" name="txtPaciente" placeholder="Ingrese Paciente" maxlength="60" type="text" class="span3">
            <a id="btnBuscarPaciente" href=""  class="btn"><i class="icon-search icon-black"></i></a>
        </div>
        </div>
        <div class="control-group" style="display:none;">
          <label class="control-label" for="cbo_Seccional">Seccional</label>
          <div class="controls">
            <select id="cbo_Seccional" name="cbo_Seccional" class="span5"></select>
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="cbo_Nomencla">Nomenclador</label>
          <div class="controls">
            <select id="cbo_Nomencla" name="cbo_Nomencla" class="span5">
                <option value="1">Nomenclador Actual</option>
            </select>
            <input type="hidden" id="txtNomencla" name="txtNomencla" value="1" rel='Seleccione Nomenclador'/>
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="cbo_Institucion">Obra Social</label>
          <div class="controls">
            <input type="hidden" id="txt_tipoacindar" />
            <select id="cbo_Institucion" name="cbo_Institucion" class="span5"></select>
        </div>
        </div>
        <div class="control-group" style="display:none;">
          <label class="control-label" for="cbo_Centro">Centro</label>
          <div class="controls">
            <select id="cbo_Centro" name="cbo_Centro" class="span5"></select>
        </div>
        </div>
         <div class="control-group" style="margin-left:40px;">
          Nro Orden Int.
          <input id ="txtNroOrdenInt_Carpeta" name="txtNroOrdenInt_Carpeta" placeholder="Nro Orden Int" maxlength="15" type="text" class="span2"/>
          Observaciones
          <input id ="txtObservaciones" name="txtObservaciones" placeholder="Observaciones" maxlength="30" type="text" class="span3"/>
           <a id="btnActualizarObservacion" class="btn btn-success modifica" style="margin-bottom:5px; display:none;" rel="tooltip" title="Actualizar Observacion"><i class=" icon-ok-circle icon-white"></i>&nbsp;</a>
        </div>
            <div class="control-group" id="div_radios"><label class="control-label" style="margin-right:10px;">Tipo</label>
                             <input id="rdAmbu" name="grupoCab" type="radio" class="input-xlarge" checked="checked" style="vertical-align:middle; display:inline;" /><label for="rdAmbu" style="display:inline; margin-right:5px;""> Ambulatorio</label>
                             <input id="rdInt" name="grupoCab" type="radio" class="input-xlarge" style="vertical-align:middle;" /><label for="rdInt" style="display:inline;"> Internación</label>
                             <input id ="txtNroInt" name="txtNroInt" value="0" placeholder="Nro Int" type="text" class="span2" style="display:none;"/>
            </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="CargaPracticasMedicasHC.aspx" id="btnOtroPaciente" style="display:none;">Otro Paciente</a>
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a>
                <a id="btnBuscar" href="BusquedadePartes.aspx" class="btn btn-warning" style="display:none;"><i class="icon-search"></i>Buscar Rendiciones</a> 
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
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Internación: <strong><span id="NroInt"></span></strong></span></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Fecha Ing.: <strong><span id="FechaIng"></span></strong></span></span>
          <div>Seccional/OS:<strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Fecha Egr.: <strong><span id="FechaEgr"></span></strong></span></div>
          <div style="display:none;">Centro: <strong><span id="CargadoCentro"></span></strong>&nbsp;&nbsp;&nbsp; <span style="display:none;">Institución: <strong><span id="CargadoInstitucion"></span></strong></span> </div>
          <div>Cama: <strong><span id="CargadoCama"></span></strong> <strong><span id="NroFactura" style="display:none;"></span></strong></div>       
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;">
      
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaPracticas" class="tabla" style="height:190px;width:100%; margin-bottom:10px;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>F.Práctica</th>
                    <th>F.Rendición</th>
                    <th>Tipo</th>
                    <th>Fact</th>
                    <th>Cant</th>
                    <th>Código</th>
                    <th>Práctica</th>
                    <th>%</th>
                    <th>Imp. Unit</th>
                    <th>Imp. Total</th>
                  </tr>
                </thead>

              </table>
            </div>

            <div id="TablaMedicos" class="tabla" style="height:170px;width:100%; margin-bottom:10px; display:none;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Médico</th>
                    <th>Práctica/Módulo</th>
                    <th>Honorario</th>
                    <th>Honorario OS</th>
                    <th>Honorario Pac.</th>
                    <th>Tipo</th>
                  </tr>
                </thead>

              </table>
            </div>

        </div>
        <div class="clearfix"></div>
        <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" id="tabCab" data-toggle="tab">Cabecera Prac/Mod</a></li>
                <li><a href="#tab2" id="tabPrac" data-toggle="tab">Práctica</a></li>
                <li><a href="#tab4" id="tabTotales" data-toggle="tab">Totales</a></li>
                <li><a href="#tab3" id="tabMedicos" data-toggle="tab" style="display:none;">Médicos Involucrados</a></li>
            </ul>

             <form id="frm_Internacion">
          <div class="tab-content" style="height:180px;">
         

            <div class="tab-pane active" id="tab1" style="height:170px;">
            
                 <div class="row">
                      <div class="span5">
                        <div id="controlrdModulo" class="control-group">
                             <input id="rdModulo" name="grupo2" type="radio" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="rdModulo" style="display:inline; margin-left:5px; margin-right:5px;">Módulo</label>
                        </div>
                    </div>
                        <div class="span5">
                            <div id="controlrdPractica" class="control-group">
                                    <input id="rdPractica" name="grupo2" checked="checked" type="radio" class="input-xlarge" style="vertical-align:middle;" /><label for="rdPractica" style="display:inline; margin-left:5px; margin-right:5px;">Práctica</label>
                                </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span3">
                            <div id="controlfechapractica" class="control-group">
                            <label for="fechapractica" style="display:inline;">F.Práctica: </label><input id="fechapractica" name="fechapractica" type="text" class="input-mini" style="width:85px;">
                            </div>
                        </div>
                          <div class="span3">
                            <div id="controlfecharendicion" class="control-group">
                            <label for="fecharendicion" style="display:inline;">F.Rendición: </label><input id="fecharendicion" name="fecharendicion" type="text" class="input-mini" style="width:85px;">
                            </div>
                        </div>
                          <div class="span5">
                            <label for="cbo_Servicio" style="display:inline;">Servicio: </label><select id="cbo_Servicio" name="cbo_Servicio"></select>
                        </div>
                    </div>

                    <div class="row">
                         <div class="span3">
                            <div id="controlhorapractica" class="control-group">
                            <label for="horapractica" style="display:inline;">Hora: </label><input id="horapractica" maxlength="5" name="horapractica" type="text" class="input-mini" style="width:60px;">
                            </div>
                        </div>
                        <div class="span3">
                            <div id="controltxtMedico" class="control-group">
                            <label for="txtMedico" style="display:inline;">Cod. Med: </label><input id="txtMedico" maxlength="3" name="txtMedico" type="text" class="input-mini" style="width:60px;">
                            </div>
                        </div>
                        <div class="span5" id="controlcbo_Especialidad" style="display:none;">
                            <label for="cbo_Especialidad" style="display:inline;">Especialidad: </label><select id="cbo_Especialidad" name="cbo_Especialidad"></select>
                        </div>
                        <div class="span5" id="controlcbo_ModulosEnc" style="display:none;">
                            <label for="cbo_ModulosEnc" style="display:inline;">Encabezado: </label><select id="cbo_ModulosEnc" name="cbo_ModulosEnc" style="width:290px;">
                            </select>
                        </div>
                          <div class="span4" style="width:320px;">
                            <label for="cbo_Medicos" style="display:inline;">Medicos: </label><select id="cbo_Medicos" name="cbo_Medicos"></select>
                        </div>
                    </div>
                    
         </div>
         <div class="tab-pane" id="tab2" style="height:170px;">
          <div class="row">
                        <div class="span2">
                            <div id="controlcantidad" class="control-group">
                            <label for="cantidad" style="display:inline;">Cantidad: </label><input id="cantidad" name="cantidad" type="text" class="input-mini" value="1">
                            </div>
                        </div>
                          <div class="span2">
                          <div id="controlporcentaje" class="control-group">
                            <label for="porcentaje" style="display:inline;">%: </label><input id="porcentaje" name="porcentaje" value="100" type="text" class="input-mini" title="% a Cobrar" rel="tooltip">
                            </div>
                        </div>
                          <div class="span2">
                          <div id="controlcodigo" class="control-group">
                            <label for="codigo" style="display:inline;">Código: </label><input id="codigo" name="codigo" type="text" class="input-mini" maxlength="6">
                            </div>
                        </div>
                         <div class="span5" id="controlcbo_Practica">
                            <label for="cbo_Practica" style="display:inline;">Práctica: </label><select id="cbo_Practica" name="cbo_Practica" style="width:300px;"></select>
                        </div>
                        <div class="span5" id="controlcbo_Modulo" style="display:none;">
                            <label for="cbo_Modulo" style="display:inline;">Módulo: </label><select id="cbo_Modulo" name="cbo_Modulo" style="width:300px;"></select>
                        </div>
           </div>
            <div class="row">
                        <div class="span2">
                        <div id="controlprecio" class="control-group">
                            <label for="precio" style="display:inline;">Precio: </label><input id="precio" name="precio" type="text" class="input-mini"/>
                        </div>    
                        </div>
                          <div class="span2">
                          <div id="controltotal" class="control-group">
                            <label for="total" style="display:inline;">Total: </label><input id="total" name="total" type="text" class="input-mini"/>
                            </div>
                        </div>
                        <div class="span2">
                          <div id="controlNroOrden" class="control-group">
                            <label for="NroOrden" style="display:inline;">Orden: </label><input id="NroOrden" name="NroOrden" type="text" class="input-mini"/>
                            </div>
                        </div>
                           <a id="btnAnterior" class="btn btn-info" style="margin-bottom:5px; display:none;" rel="tooltip" title="Cargar Precio Anterior"><i class=" icon-ok-circle icon-white"></i>&nbsp;</a>
                        <div class="span4">
                            <div id="controlchkHonorarios" class="control-group">
                                    <input id="chkFacturado" name="chkFacturado" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" checked /><label for="chkFacturado" style="display:inline; margin-left:5px; margin-right:5px;">Facturarlo</label>
                                    <input id="chkHonorarios" name="chkHonorarios" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkHonorarios" style="display:inline; margin-left:5px; margin-right:5px;">Honorarios</label>
                                    <input id="chkAPE" name="chkAPE" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkAPE" style="display:inline; margin-left:5px; margin-right:5px;">Bono</label>
                                    
                                </div>
                        </div>
                    </div>
                   <input type="hidden" id="nombre_practica" value="" />
                   <input type="hidden" id="id_practica" value="" />

                    <div class="row">

                      <div id="PrecioHono" class="span3" style="display:none;">
                        <div id="controltxtPrecioHono" class="control-group">
                            <label for="txtPrecioHono" style="display:inline;">Precio Hono: </label><input id="txtPrecioHono" name="txtPrecioHono" type="text" value="0" class="input-mini">
                        </div>    
                        </div>
                        <div class="span5 pull-right" style="margin-right:-120px;">
                            <input id="btnCancelar" type="button" class="btn btn-danger btn-mini modifica" value="Cancelar" />
                            <input id="btnAgregar" type="button" class="btn btn-success btn-mini modifica" value="Agregar" />
                        </div>
                    </div>
                   
          </div>
         <div class="tab-pane" id="tab3">
             <div class="row">
                  <div class="span3" id="controltxtMedicoHono" style="width:150px;">
                    <label for="txtMedicoHono" style="display:inline;">Cod.Med.: </label><input id="txtMedicoHono" name="txtMedicoHono" type="text" style="width:60px;" maxlength="3" class="input-mini"/>
                  </div>
                  <div class="span3" id="controlcbo_MedicoInv">
                            <select id="cbo_MedicoInv" name="cbo_MedicoInv">
                                <option value="">Seleccione Médico</option>
                            </select>
                  </div>
                  <div class="span2">
                            <label for="Hono" style="display:inline;">Hono: </label><input id="Hono" name="Hono" type="text" style="width:60px;" value="0" class="input-mini"/>
                  </div>
                   <div class="span1">
                            <input id="PorcentajeMedico" name="PorcentajeMedico" type="text" style="width:40px;" value="100" rel="tooltip" title="% OS" class="input-mini"/>
                  </div>
                  <div class="span2">
                            <select id="cbo_Tipo" name="cbo_Tipo">
                                <option value="1">Especialista</option>
                                <option value="2">Ayudante 1</option>
                                <option value="3">Ayudante 2</option>
                                <option value="4">Anestesista</option>
                            </select>
                  </div>
             </div>
             <div class="row">
                      <div class="span2">
                            <div class="pull-right">
                                <input id="btnAcepMedico" type="button" class="btn btn-success btn-mini" style="margin-right:10px;" value="Agregar" />
                                <input id="btnCancelMedico" type="button" class="btn btn-danger btn-mini" style="margin-right:10px;" value="Cancelar" />
                                <input type="hidden" id="detalleid" value="" />
                            </div>
                        </div>
             </div>
         </div>
         <div class="tab-pane" id="tab4">
            <div class="row">
                   <div class="span5">
                            <span class="span3" id="ImporteTotal" style="font-weight:bold; font-size:small;">Importe Total: $0.00</span>
                  </div>
            </div>
            <div class="row">
                  <div class="span5">
                            <span class="span3" id="CantidadTotal" style="font-weight:bold; font-size:small;">Items: 0</span>
                  </div>
            </div>
         </div>
          </div>
          </form> 
        </div>
                 

 <div class="clearfix"></div>
<div class="pie_gris">
  <button id = "btnConfirmar" class="btn btn-info pull-right modifica" style="margin-left:5px;"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
  <a id = "btnCargaLabo" class="btn btn-success pull-right modifica"><i class=" icon-arrow-right icon-white"></i>&nbsp;Carga Laboratorio</a>
  <a id = "btnCargaMedicamentos" class="btn btn-success pull-right modifica"><i class=" icon-arrow-right icon-white"></i>&nbsp;Carga Medicamentos</a>
  <a id = "btnBaja" class="btn btn-danger pull-right modifica" style="display:none;"><i class=" icon-arrow-down icon-white"></i>&nbsp;Baja</a>
  <a id = "btnImprimir" class="btn pull-right" style="display:none;"><i class=" icon-print"></i>&nbsp;Imprimir</a>
  <a href="CargaPracticasMedicasHC.aspx" class="btn pull-right "><i class=" icon-arrow-left"></i>&nbsp;Volver</a>

</div>
<div class="clearfix"></div>


<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:900px;height:460px;">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><br />
 <%--   <h3 id="myModalLabel">Medicamentos</h3>--%>
  </div>
  <div class="modal-body" style="margin-left:10px; margin-right:10px; height:460px;">
        <div class="span4 pull-right" style="margin-left:100px; display:none;"><strong>Fecha Rendicion: </strong><input type="text" id="CargadoRendicion" name="CargadoRendicion" class="input-small"></div>  
        <div class="resumen_datos" style="height:80px; display:none;">
        
        <div class="datos_persona">
        <div ><img id = "fotopacienteMed" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div style="display:inline;">Paciente: <strong><span id="Span1"></span> (<span id="Span2"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <div><span>DNI: <strong><span id="Span3"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="Span4"></span></strong></span></div>
          <div>Seccional: <strong><span id="Span5"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="Span6"></span></strong></span> </div>
          <div>Fecha Parte: <strong><span id="CargadoFechaparte"></span></strong>&nbsp;&nbsp;&nbsp; <span>Nro.Parte: <strong><span id="CargadoParte"></span></strong></span> </div>
                  
        </div>
        
      </div>
      </div>

      <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tabMed" data-toggle="tab">Medicamentos</a></li>
                <li><a href="#tabModPorc" data-toggle="tab">Modificar %</a></li>
                <li style="display:none;"><a href="#tabDesc" data-toggle="tab">Descartables</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tabMed">
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 15px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:180px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Medicación</th>
                    <th>Cantidad</th>
                    <th>Importe</th>
                    <th>%</th>
                    <th>Total</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>
        <form id="frm_Medicamentos">
                 <div class="row">
                        <div class="span2">
                            <div id="controltxtCodigoMed" class="control-group">
                                <label for="txtCodigoMed" style="display:inline;">Código: </label><input id="txtCodigoMed" name="txtCodigoMed" type="text" class="input-mini" maxlength="10">
                            </div>
                        </div>
                        <div class="span5">
                            <div id="controlcbo_MedicamentoMed" class="control-group">
                            <label for="cbo_MedicamentoMed" style="display:inline;">Medicamento: </label>
                            <input id="Medicamento_Id" type="hidden" value="0" />
                            <input id="Medicamento_Nombre" type="hidden" value="0" />
                            <input id="Monodroga_id" type="hidden" value="0" />
                                <select id="cbo_MedicamentoMed" name="cbo_MedicamentoMed" style="width:285px;"></select>
                            </div>
                        </div>
                          <div class="span2">
                            <div id="controlcantidadMed" class="control-group">
                            <label for="cantidadMed" style="display:inline;">Cantidad: </label><input id="cantidadMed" name="cantidadMed" type="text" class="input-mini" value="1">
                            </div>
                        </div>
                            <div id="Medicamento_val" style="display:none;">0</div>
                            <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
                    </div>

                    <div class="row">
                       
                      
                          <div class="span2">
                             <div id="cpntrolprecioMed" class="control-group">
                            <label for="precioMed" style="display:inline;">Precio: </label><input id="precioMed" name="precioMed" type="text" class="input-mini">
                            </div>
                        </div>
                         <div class="span2">
                            <div id="controlsubtotalMed" class="control-group">
                            <label for="subtotalMed" style="display:inline;">Subtotal: </label><input id="subtotalMed" name="subtotalMed" type="text" class="input-mini">
                            </div>
                        </div>
                         <div class="span1">
                          <div id="controlporcentajeMed" class="control-group">
                            <label for="porcentajeMed" style="display:inline;"></label><input id="porcentajeMed" style="width:30px;" name="porcentajeMed" value="100" type="text" class="input-mini" title="% OS" rel="tooltip">
                            </div>
                        </div>
                        <div class="span2">
                                <div id="controlfechapracMed" class="control-group">
                            <label for="fechapracMed" style="display:inline;">F Prac: </label><input id="fechapracMed" name="fechapracMed" type="text" style="width:75px;" class="input-small">
                                </div>
                        </div>
                        <div class="span2">
                            <div id="controlchkFacturadoMed" class="control-group">
                                 <input id="chkFacturadoMed" name="chkFacturadoMed" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" checked /><label for="chkFacturadoMed" style="display:inline; margin-left:5px; margin-right:5px;">Facturarlo</label>
                            </div>
                         </div>
                    </div>

                     <div class="row">


                        <div class="span2" style="display:none;">
                            <div id="controlchkEstadisticasMed" class="control-group">
                                    <input id="chkEstadisticasMed" name="chkEstadisticasMed" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkEstadisticasMed" style="display:inline; margin-left:5px; margin-right:5px;">Estadisticas</label>
                                </div>
                        </div>
                         <div class="span1" style="display:none;">
                            <div id="controlchkAPEMed" class="control-group">
                                    <input id="chkAPEMed" name="chkAPEMed" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkAPEMed" style="display:inline; margin-left:5px; margin-right:5px;">APE</label>
                                </div>
                        </div>
                         <div class="span4 pull-right">
                            <input id="btnCancelarMed" type="button" class="btn btn-danger" value="Cancelar" />
                            <input id="btnAgregarMed" type="button" class="btn btn-success" value="Agregar" />
                        </div>

                    </div>
                </form>
         </div>
         
        <div class="tab-pane" id="tabModPorc">

            <form id="frmPorcentajes"> 
                    <div class="row">
                        <div class="span2">
                            <div id="Div1" class="control-group">
                                 <label for="Tipo" style="display:inline;margin-right:5px;">Tipo</label>
                            </div>
                         </div>
                        <div class="span3">
                            <div id="controlchkMedicamentos" class="control-group">
                                 <input id="chkMedicamentos" name="chkMedicamentos" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="chkMedicamentos" style="display:inline; margin-left:5px; margin-right:5px;">Medicamentos</label>
                            </div>
                         </div>
                        <div class="span3">
                            <div id="controlchkDescartables" class="control-group">
                                    <input id="chkDescartables" name="chkDescartables" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkDescartables" style="display:inline; margin-left:5px; margin-right:5px;">Descartables</label>
                            </div>
                        </div>
            
                    </div>


                     <div class="row">
                        <div class="span4">
                            <div id="controltxtPorcPaciente" class="control-group">
                                <label for="txtPorcPaciente" style="display:inline;">Paciente %: </label><input id="txtPorcPaciente" name="txtPorcPaciente" type="text" class="input-mini" maxlength="3">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span4">
                            <div id="controltxtPorcOS" class="control-group">
                                <label for="txtPorcOS" style="display:inline;">OS %: </label><input id="txtPorcOS" name="txtPorcOS" type="text" class="input-mini" maxlength="3">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                          <div class="span4 pull-right">
                            <input id="btnCancelarPorc" type="button" class="btn btn-danger" value="Cancelar" />
                            <input id="btnAceptarPorc" type="button" class="btn btn-success" value="Modificar" />
                        </div>
                    </div>
            </form>
          </div>


         <div class="tab-pane" id="tabDesc">
                 <div style="padding:0px 15px 15px 15px;">
                        
                    <div class="clearfix"></div>
                    <div id="Tabla_Medicamentos_Desc" class="tabla" style="height:100px;width:100%;">
                      <table class="table table-hover table-condensed">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Descripcion</th>
                            <th>Cantidad</th>
                            <th>Importe</th>
                            <th>%</th>
                            <th>Total</th>
                          </tr>
                        </thead>

                      </table>
                    </div>
                </div>
            <div class="clearfix"></div>

            <form id="frm_Descartables"> 
                    <div class="row">

                    <div class="span5">
                        <div id="controlcbo_Descartable" class="control-group">
                        
                            <label for="cbo_Descartable" style="display:inline;">Descartable: </label><select id="cbo_Descartable" name="cbo_Descartable" class="input-xlarge"></select>
                        </div>
                    </div>
            
                    </div>


                     <div class="row">
                        <div class="span2">
                            <div id="controlcantidad_desc" class="control-group">
                            
                                <label for="cantidad_desc" style="display:inline;">Cantidad: </label><input id="cantidad_desc" name="cantidad_desc" type="text" class="input-mini">
                            </div>
                        </div>
                        <div class="span2">
                            <div id="controlprecio_desc" class="control-group">
                            
                                <label for="precio_desc" style="display:inline;">Precio: </label><input id="precio_desc" name="precio_desc" type="text" class="input-mini">
                            </div>
                        </div>
                         <div class="span2">
                            <div id="controlsubtotal_desc" class="control-group">
                            
                                <label for="subtotal_desc" style="display:inline;">Subtotal: </label><input id="subtotal_desc" name="subtotal_desc" type="text" class="input-mini">
                            </div>
                        </div>
                        <div class="span3">
                            <div id="controlfechaprac_desc" class="control-group">
                          
                            <label for="fechaprac_desc" style="display:inline;">Fecha Prac: </label><input id="fechaprac_desc" name="fechaprac_desc" type="text" class="input-small">
                        </div>
                        </div>
                         <div class="span1">
                          <div id="controlporcentajeDesc" class="control-group">
                            <label for="porcentajeDesc" style="display:inline;"></label><input id="porcentajeDesc" style="width:30px;" name="porcentajeDesc" value="100" type="text" class="input-mini" title="% OS" rel="tooltip">
                         </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span2">
                        <div id="controlchkFacturado_desc" class="control-group">
                             <input id="chkFacturado_desc" name="chkFacturado" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="chkFacturado" style="display:inline; margin-left:5px; margin-right:5px;">Facturarlo</label>
                        </div>
                         </div>
                        <div class="span2">
                            <div id="controlchkEstadisticas_desc" class="control-group">
                                    <input id="chkEstadisticas_desc" name="chkEstadisticas_desc" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkEstadisticas_desc" style="display:inline; margin-left:5px; margin-right:5px;">Estadisticas</label>
                                </div>
                        </div>
                         <div class="span2">
                            <div id="controlchkAPE_desc" class="control-group">
                                    <input id="chkAPE_desc" name="chkAPE" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkAPE" style="display:inline; margin-left:5px; margin-right:5px;">APE</label>
                                </div>
                        </div>

                        <div class="span2">
                            <input id="btnCancelarDesc" type="button" class="btn btn-danger btn-mini" value="Cancelar" />
                            <input id="btnAgregarDesc" type="button" class="btn btn-mini" value="Agregar" />
                        </div>
                    </div>
            </form>
          </div>
          </div>
        </div>
  </div>
</div>


      </div>
    </div>
  </div>
</div>

<!--Pie de p?gina-->
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/Hospitales/Facturacion/CargaPracticasMedicasHC.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>



<!--Barra sup--> 
<script type="text/javascript">

    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Carga de Rendicion</strong>";

</script> 

</body>
</html>

