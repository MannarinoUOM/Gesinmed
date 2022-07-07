<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargaPracticasMedicasHC.aspx.cs" Inherits="Facturacion_Cap_CargaPracticasMedicasHC" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title> 
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="height:520px; width:700px; margin: 10px 40px 10px 40px;">
      <form class="form-horizontal" id="frm_Inicio" >
        <div class="control-group" id="controltxtNroParte">
          <label class="control-label">Nro. Parte</label>
          <div class="controls">
            <input id="txtNroParte" name="txtNroParte" type="text" maxlength="8" placeholder="Nro Parte" class="numero">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >Fecha de Carga</label>
          <div class="controls">
            <input id="txtFechaCarga" name="txtFechaCarga" type="text" maxlength="10" class="fecha">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtNHC">NHC</label>
          <div class="controls">
            <input id="txtNHC" name="txtNHC" placeholder="Ingrese Nro. HC" maxlength="11" type="text" class="span3 numero">
        </div>
        </div>
        <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC">
                      </select>          
                   </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtDNI">DNI</label>
          <div class="controls">
            <input id ="txtDNI" name="txtDNI" placeholder="Ingrese Nro. Doc" maxlength="8" type="text" class="span3 numero">
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" name="txtPaciente" placeholder="Ingrese Paciente" maxlength="60" type="text" class="span3">
            <input id="afiliadoId" type="hidden" value="0" />
            <input id="txtdocumento" type="hidden" />
            <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black"></i></a>
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="cbo_Seccional">Seccional</label>
          <div class="controls">
            <select id="cbo_Seccional" name="cbo_Seccional" class="span5"></select>
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="cbo_Centro">Centro</label>
          <div class="controls">
            <select id="cbo_Centro" name="cbo_Centro" class="span5"></select>
        </div>
        </div>
         <div class="control-group" style="display:none;">
                <label class="control-label">Nomenclador</label>
                <div class="controls cch1">
                    <select id="cbo_Nomenclador" class="span5">
                    <option value="">Seleccione Nomenclador...</option>
                    </select>
                </div>
              </div>
            <div class="control-group">
            <label class="control-label" style="margin-right:10px;">Tipo</label>
                             <input id="rdAmbu" name="grupoCab" type="radio" class="input-xlarge" checked="checked" style="vertical-align:middle; display:inline;" />
                             <label for="rdAmbu" style="display:inline; margin-right:5px;""> Ambulatorio</label>
                             <input id="rdInt" name="grupoCab" type="radio" class="input-xlarge" style="vertical-align:middle;" />
                             <label for="rdInt" style="display:inline;"> Internación</label>
                             <input id="txtNroInt" name="txtNroInt" placeholder="Nro Int" type="text" class="span2" style="display:none;">
            </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="CargaPracticasMedicasHC.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a>
                <a id="btnBuscar" href="BusquedadePartes.aspx" class="btn btn-warning" style="display:none;"><i class="icon-search"></i>Buscar Partes</a> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        <div class="datos_persona">
        <div><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
        <div class="datos_resumen_paciente" style="font-size:12px;">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Internación: <strong><span id="NroInt"></span></strong></span></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Fecha Ing.: <strong><span id="FechaIng"></span></strong></span></span>
          <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Fecha Egr.: <strong><span id="FechaEgr"></span></strong></span></div>
          <div>Centro: <strong><span id="CargadoCentro"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;">
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
                    <th>Cantidad</th>
                    <th>Código</th>
                    <th>Práctica</th>
                    <th>%</th>
                    <th>Imp. Unit</th>
                    <th>Imp. Total</th>
                  </tr>
                </thead>

              </table>
            </div>

            <div id="TablaMedicos" class="tabla" style="height:190px;width:100%; margin-bottom:10px; display:none;">
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
                <li class="active"><a href="#tab1" id="tabCab" data-toggle="tab">Cabecera Práctica/Módulo</a></li>
                <li><a href="#tab2" id="tabPrac" data-toggle="tab">Práctica</a></li>
                <li><a href="#tab3" id="tabMedicos" data-toggle="tab" style="display:none;">Médicos Involucrados</a></li>
            </ul>

             <form id="frm_Internacion">
          <div class="tab-content" style="height:150px;">
            <div class="tab-pane active" id="tab1" style="height:150px;">
            
                 <div class="row">
                        <div class="span4">
                            <div id="controlrdPractica" class="control-group">
                              <input id="rdPractica" name="grupo2" checked="checked" type="radio" class="input-xlarge" style="vertical-align:middle;" /><label for="rdPractica" style="display:inline; margin-left:5px; margin-right:5px;">Práctica</label>
                            </div>
                        </div>
                      <div class="span4">
                        <div id="controlrdModulo" class="control-group">
                             <input id="rdModulo" name="grupo2" type="radio" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="rdModulo" style="display:inline; margin-left:5px; margin-right:5px;">Módulo</label>
                        </div>
                    </div>
                    </div>

                    <div class="row">
                        <div class="span2" style="width:190px;">
                            <div id="controlfechapractica" class="control-group">
                            <label for="fechapractica" style="display:inline;">F.Práctica: </label>
                            <input id="fechapractica" name="fechapractica" type="text" class="input-mini fecha numero" style="width:85px;">
                            </div>
                        </div>
                          <div class="span2" style="width:190px;">
                            <div id="controlfecharendicion" class="control-group">
                            <label for="fecharendicion" style="display:inline;">F.Rendición: </label>
                            <input id="fecharendicion" name="fecharendicion" type="text" class="input-mini fecha numero" style="width:85px;">
                            </div>
                        </div>
                          <div class="span5" style="width:320px;">
                            <label for="cbo_Servicio" style="display:inline; margin-right:2px;">Servicio: </label>
                            <select id="cbo_Servicio" name="cbo_Servicio">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span5" id="controlcbo_Especialidad" style="width:400px;">
                            <label for="cbo_Especialidad" style="display:inline;">Especialidad: </label>
                            <select id="cbo_Especialidad" name="cbo_Especialidad" class="span3" style="width:305px;">
                            </select>
                        </div>
                          <div class="span5" style="width:305px;">
                            <label for="cbo_Medicos" style="display:inline;">Médicos: </label>
                            <select id="cbo_Medicos" name="cbo_Medicos">
                            </select>
                        </div>
                        <div style="margin-left:-20px;">
                            <a id="btnCancelar_" class="btn btn-danger btn-mini" style="margin-right:10px;"><i class="icon-remove-circle icon-white"></i>&nbsp;Cancelar</a>
                            <a id="btnAgregar_" class="btn btn-success btn-mini" style="margin-right:10px;"><i class="icon-plus-sign icon-white"></i>&nbsp;Agregar</a>
                        </div>
                    </div>
         </div>
         <div class="tab-pane" id="tab2">
          <div class="row">
                        <div class="span2">
                            <div id="controlcantidad" class="control-group">
                            <label for="cantidad" style="display:inline;">Cantidad: </label>
                            <input id="cantidad" name="cantidad" type="text" class="input-mini numero" maxlength="2" value="1" />
                            </div>
                        </div>
                          <div class="span2">
                          <div id="controlporcentaje" class="control-group">
                            <label for="porcentaje" style="display:inline;margin-left:20px;">%: </label>
                            <input id="porcentaje" name="porcentaje" value="100" type="text" maxlength="3" class="input-mini numeroDecimal">
                            </div>
                        </div>
                          <div class="span2">
                          <div id="controlcodigo" class="control-group">
                            <label for="codigo" style="display:inline;">Código: </label>
                            <input id="codigo" name="codigo" type="text" class="input-mini numero" maxlength="8">
                            </div>
                        </div>
                         <div class="span5" id="controlcbo_Practica" style="width:395px;">
                            <label for="cbo_Practica" style="display:inline;">Práctica: </label>
                            <select id="cbo_Practica" name="cbo_Practica" class="span4" style="width:335px;">
                            </select>
                        </div>
                        <div class="span5" id="controlcbo_Modulo" style="display:none;width:395px;">
                            <label for="cbo_Modulo" style="display:inline;">Módulo: </label>
                            <select id="cbo_Modulo" name="cbo_Modulo" class="span4" style="width:335px;">
                            </select>
                        </div>
           </div>
            <div class="row">
                        <div class="span2" style="width: 161px;">
                        <div id="controlprecio" class="control-group">
                            <label for="precio" style="display:inline;margin-right:17px;">Precio: </label>
                                <input id="precio" name="precio" type="text" class="input-mini numeroDecimal" maxlength="8" style="width: 77px;">
                        </div>    
                        </div>
                          <div class="span2" style="width: 161px;">
                          <div id="controltotal" class="control-group">
                            <label for="total" style="display:inline;">Total: </label>
                                <input id="total" name="total" type="text" class="input-mini numeroDecimal" maxlength="8" style="width: 77px;">
                            </div>
                        </div>
                       <div class="span2">
                        <div id="controlchkFacturado" class="control-group">
                             <input id="chkFacturado" name="chkFacturado" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" checked/>
                             <label for="chkFacturado" style="display:inline; margin-left:5px; margin-right:5px;">Facturarlo</label>
                        </div>
                         </div>
                         <div class="span2">
                            <div id="controlchkHonorarios" class="control-group">
                                    <input id="chkHonorarios" name="chkHonorarios" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                                    <label for="chkHonorarios" style="display:inline; margin-left:5px; margin-right:5px;">Honorarios</label>
                                </div>
                        </div>
                        <div class="span3">
                            <a id="btnCancelar" class="btn btn-danger btn-mini" style="margin-right:10px;"><i class="icon-remove-circle icon-white"></i>&nbsp;Cancelar</a>
                            <a id="btnAgregar" class="btn btn-success btn-mini" style="margin-right:10px;"><i class="icon-plus-sign icon-white"></i>&nbsp;Agregar</a>
                        </div>
                    </div>
          </div>
         <div class="tab-pane" id="tab3">
             <div class="row">
                  <div class="span4" id="controlcbo_MedicoInv">
                            <label for="cbo_MedicoInv" style="display:inline;">Médico: </label><select id="cbo_MedicoInv" name="cbo_MedicoInv">
                            <option value="">Seleccione Médico</option>
                            </select>
                  </div>
                  <div class="span2">
                            <label for="Hono" style="display:inline;">Hono: </label><input id="Hono" name="Hono" type="text" style="width:60px;" value="0" class="input-mini">
                  </div>
                   <div class="span1">
                            <input id="PorcentajeMedico" name="PorcentajeMedico" type="text" style="width:40px;" value="100" class="input-mini">
                  </div>
                  <div class="span3">
                            <select id="cbo_Tipo" name="cbo_Tipo">
                                <option value="1">Especialista</option>
                                <option value="2">Ayudante 1</option>
                                <option value="3">Ayudante 2</option>
                                <option value="4">Anestesista</option>
                            </select>
                  </div>
                        <div class="span2">
                            <input id="btnCancelMedico" type="button" class="btn btn-danger btn-mini" style="margin-right:10px;" value="Cancelar" />
                            <input id="btnAcepMedico" type="button" class="btn btn-mini" style="margin-right:10px;" value="Agregar" />
                        </div>
             </div>
         </div>
          </div>
          </form> 
        </div>
                 

 <div class="clearfix"></div>
<div class="pie_gris">
  <a id = "btnConfirmar" class="btn btn-info pull-right"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
  <a id = "btnCargaMedicamentos" class="btn btn-success pull-right"><i class=" icon-arrow-right icon-white"></i>&nbsp;Carga Medicamentos</a>
  <a id = "btnBaja" class="btn btn-danger pull-right" style="display:none;"><i class=" icon-arrow-down icon-white"></i>&nbsp;Baja</a>
  <a id = "btnImprimir" class="btn pull-right" style="display:none;"><i class=" icon-print"></i>&nbsp;Imprimir</a>
  <a href="CargaPracticasMedicasHC.aspx" class="btn pull-right "><i class=" icon-arrow-left"></i>&nbsp;Volver</a>

</div>
<div class="clearfix"></div>


<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:900px;height:400px;">
  <div class="modal-body" style="margin-left:10px; margin-right:10px;">
        <div class="span4 pull-right" style="margin-left:100px;"><strong>Fecha Rendicion: </strong><input type="text" id="CargadoRendicion" name="CargadoRendicion" class="input-small"></div>  
      <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tabMed" data-toggle="tab">Medicamentos</a></li>
                <li><a href="#tabDesc" data-toggle="tab">Descartables</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tabMed">
        <!--Tabla de estudios-->
        <div style="padding:0px 5px 15px 5px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:150px;width:100%; font-size:11px;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Medicación</th>
                    <th>Monodroga</th>
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
                        <div class="span6">
                            <div id="controlcbo_MedicamentoMed" class="control-group">
                                <label for="cbo_MedicamentoMed" style="display:inline;">Medicamento: </label>
                                <input type="text" id="cbo_MedicamentoMed" data-provide="typeahead" class="typeahead" autocomplete="off" style="width:350px;" />
                                <input id="Medicamento_val" name="Medicamento_val" value="0" type="hidden" />
                                <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
                            </div>
                        </div>
                        <div class="span4">
                            <div id="controlcbo_MonodrogaMed" class="control-group" style="margin-left:15px;">
                            <label for="cbo_MonodrogaMed" style="display:inline;">Monodroga: </label>
                            <select id="cbo_MonodrogaMed" name="cbo_MonodrogaMed" style="width:200px;"></select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        

                        <div class="span2">
                            <div id="controlcantidadMed" class="control-group">
                            <label for="cantidadMed" style="display:inline;">Cantidad: </label>
                            <input id="cantidadMed" style="width:40px;" name="cantidadMed" maxlength="2" type="text" class="input-mini numero">
                            </div>
                        </div>
                        <div class="span1" style="margin-left:-10px;">
                          <div id="controlporcentajeMed" class="control-group">
                            <label for="porcentajeMed" style="display:inline;"></label>%
                            <input id="porcentajeMed" maxlength="3" style="width:30px;" name="porcentajeMed" value="100" type="text" class="input-mini numero">
                            </div>
                        </div>
                          <div class="span2">
                             <div id="cpntrolprecioMed" class="control-group">
                            <label for="precioMed" style="display:inline;">Precio: </label>
                            <input id="precioMed" name="precioMed" type="text" maxlength="8" class="input-mini numeroDecimal">
                            </div>
                        </div>
                         <div class="span2" style="margin-left:0px;">
                            <div id="controlsubtotalMed" class="control-group">
                            <label for="subtotalMed" style="display:inline;">Subtotal: </label>
                            <input id="subtotalMed" name="subtotalMed" type="text" maxlength="8" class="input-mini numeroDecimal">
                            </div>
                        </div>
                        <div class="span3" style="margin-left:5px;">
                             <div id="controlfechapracMed" class="control-group">
                             <label for="fechapracMed" style="display:inline;">Fecha Prac: </label>
                             <input id="fechapracMed" name="fechapracMed" type="text" maxlength="10" style="width:75px;" class="input-small fecha">
                             </div>
                        </div>
                    </div>

                     <div class="row">
                        <div class="span2">
                        <div id="controlchkFacturadoMed" class="control-group">
                             <input id="chkFacturadoMed" name="chkFacturadoMed" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" />
                             <label for="chkFacturadoMed" style="display:inline; margin-left:5px; margin-right:5px;">Facturarlo</label>
                        </div>
                         </div>
                        <div class="span2">
                            <div id="controlchkEstadisticasMed" class="control-group">
                                    <input id="chkEstadisticasMed" name="chkEstadisticasMed" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                                    <label for="chkEstadisticasMed" style="display:inline; margin-left:5px; margin-right:5px;">Estadisticas</label>
                                </div>
                        </div>
                         <div class="span1">
                            <div id="controlchkAPEMed" class="control-group">
                                    <input id="chkAPEMed" name="chkAPEMed" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                                    <label for="chkAPEMed" style="display:inline; margin-left:5px; margin-right:5px;">APE</label>
                                </div>
                        </div>
                         <div class="span4 pull-right">
                            <a id="btnCancelarMed" class="btn btn-danger btn-mini"><i class="icon-white icon-remove-circle"></i>&nbsp;Cancelar</a>
                            <a id="btnAgregarMed" class="btn btn-mini btn-success"><i class="icon-white icon-plus-sign"></i>&nbsp;Agregar</a>
                            <a class="btn btn-mini btn-warning" data-dismiss="modal">Finalizar Carga</a>
                        </div>

                    </div>
                </form>
         </div>
         
         <div class="tab-pane" id="tabDesc">
                 <div style="padding:0px 15px 15px 15px;">
                        
                    <div class="clearfix"></div>
                    <div id="Tabla_Medicamentos_Desc" class="tabla" style="height:150px;width:100%; font-size:11px;">
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
                    <div class="span8">
                        <div id="controlcbo_Descartable" class="control-group">
                            <label for="cbo_Descartable" style="display:inline;">Descartable: </label>
                            <input type="text" id="cbo_Descartable" data-provide="typeahead" class="input-xxlarge typeahead" autocomplete="off" style="width:450px;" />
                            <input id="Descartable_val" name="Descartable_val" value="0" type="hidden" />
                            <input id="txt_Descartable" name="txt_Descartable" value="0" type="hidden" />
                        </div>
                    </div>
                    </div>
                     <div class="row">
                        <div class="span2">
                            <div id="controlcantidad_desc" class="control-group">
                            
                                <label for="cantidad_desc" style="display:inline;">Cantidad: </label>
                                <input id="cantidad_desc" name="cantidad_desc" maxlength="2" type="text" class="input-mini numero">
                            </div>
                        </div>
                        <div class="span1">
                          <div id="controlporcentajeDesc" class="control-group">
                            <label for="porcentajeDesc" style="display:inline;"></label>%
                            <input id="porcentajeDesc" style="width:30px;" name="porcentajeDesc" maxlength="3" value="100" type="text" class="input-mini numero"/>
                         </div>
                        </div>
                        <div class="span2">
                            <div id="controlprecio_desc" class="control-group">
                            
                                <label for="precio_desc" style="display:inline;">Precio: </label>
                                <input id="precio_desc" name="precio_desc" maxlength="8" type="text" class="input-mini numeroDecimal">
                            </div>
                        </div>
                         <div class="span2">
                            <div id="controlsubtotal_desc" class="control-group">
                                <label for="subtotal_desc" style="display:inline;">Subtotal: </label>
                                <input id="subtotal_desc" name="subtotal_desc" maxlength="8" type="text" class="input-mini numeroDecimal">
                            </div>
                        </div>
                        <div class="span3">
                            <div id="controlfechaprac_desc" class="control-group">
                          
                            <label for="fechaprac_desc" style="display:inline;">Fecha Prac: </label>
                            <input id="fechaprac_desc" name="fechaprac_desc" type="text" maxlength="10" class="input-small fecha">
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

                        <div class="span4 pull-right">
                            <a id="btnCancelarDesc" class="btn btn-mini btn-danger"><i class="icon-white icon-remove-circle"></i>&nbsp;Cancelar</a>
                            <a id="btnAgregarDesc" class="btn btn-mini btn-success"><i class="icon-white icon-plus-sign"></i>&nbsp;Agregar</a>
                            <a class="btn btn-mini btn-warning" data-dismiss="modal">Finalizar Carga</a>
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
   <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
<script src="../js/Hospitales/Facturacion_Cap/CargaPracticasMedicasHC.js" type="text/javascript"></script>
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Carga de Parte</strong>";
</script> 
</body>
</html>

