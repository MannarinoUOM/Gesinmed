<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DerivacionyTraslado.aspx.cs" Inherits="DerivacionyTraslado_DerivacionyTraslado" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <script src="../js/webcam.js" type="text/javascript"></script>
        <script src="../js/webcam.js" type="text/javascript"></script>    <style>
        .dropdown-menu { max-height: 250px; max-width: 800px; font-size:11px; overflow-y: auto; overflow-x: hidden; }
    </style>
</head>
<body>
    <div class="clearfix">
    </div>
<%--  
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Derivación y Traslado</strong>";
     
    </script>--%>
    <div id="lightbox" style="display:none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top:0px; width:90%">
        <div class="contenedor_1" style="width:90%; padding-top:10px;margin-left:auto; margin-right:auto; display:block" id="derivaciones">
            <div id="primero" class="contenedor_bono" style="height:500px; margin-left:30%">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg"  style="display:none"/>&nbsp;&nbsp;<span id="titulo" style=" text-align:center; display:block"></span></div>
                <form class="form-horizontal" style="margin-top:20px">
                <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC">
                      </select>          
                   </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        N°</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" placeholder="Nro. de documento sin puntos"  tabindex="1"/>
                        <input id="txtdocumento" type="hidden" />
                        <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
                        <input id="discapacidad_val" value="" type="hidden"/>
                        <input id="verificarPMI" value="" type="hidden"/>
                        <input id="PMI_val" value="" type="hidden"/>
                        <input id="discapacidad_paga" value="" type="hidden"/>
                        <input id="discapacidad_paga2" value="" type="hidden"/>
                        <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
                        <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" type="text" placeholder="Ej: 99123456789"  tabindex="2"/>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtPaciente">
                        Paciente</label>
                    <div class="controls">
                        <input id="txtPaciente" placeholder="Apellido Nombre" type="text" class="span3"  tabindex="3"/>
                        <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn" style="display:inline"><i class="icon-search icon-black">
                        </i></a>
                    </div>
                </div>
                <div id="controlTelefono" class="control-group">
                    <label class="control-label">
                        Teléfono</label>
                    <div class="controls">
                        <input id="txtTelefono"  maxlength="13" placeholder="Ej. 43625910" type="text"/>
                    </div>
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
      <%--  href="DerivacionyTraslado.aspx"--%>
                </form>
                <div class="control-group">
                    <div class="controls pagination-centered"> 
                        <a class="btn btn-danger"  id="btnCancelarPedidoTurno" style="display: none;">
                            Otro Paciente</a> <a class="btn" id="btnactualizar" style="display: none;">Actualizar</a>
                        <a id="desdeaqui" style="display: none;" class="btn btn-info">Siguiente</a>
                    </div>
                </div>
            </div>
            <div class="clearfix">
            </div>
            <div id="hastaaqui">
                <div class="resumen_datos" style="height: 80px; margin-bottom:5px; margin-top:5px">
                    <!--Datos del paciente-->
                    <div class="datos_paciente">
                        <div>
                            <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                            <div>
                                <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>                                
                            </div>
                            <div>
                                <span id="span_Discapacidad" style=" color:#FFFF00; font-weight:bold;"></span>
                                <span id="span_Estudiante"></span>
                            </div>
                        </div>
                    </div>
                    <!--Datos del medico-->

                    <div class="clearfix">
                    </div>
                </div>
                <div class="contenedor_3" style="width:97%; padding-top:5px; height:480px; margin-left:16px">
                    
                 
            <div class="modal-backdrop" style="width:97%; height:25px; background-position:center; position:inherit; background-color:Black; vertical-align:top; border-top-left-radius:10px; border-top-right-radius:10px; margin-left:auto; margin-right:auto">
             <label class="check inline" style="width:3%"><strong style="color:White; text-align:center"></strong></label>
            <label class="check inline" style="width:6%"><strong style="color:White; text-align:center">Fecha</strong></label>
            <label class="check inline" style="width:5%"><strong style="color:White; text-align:center">Hora</strong></label>
            <label class="check inline" style="width:10%"><strong style="color:White">Usuario</strong></label>
            <label class="check inline" style="width:9%"><strong style="color:White">Origen</strong></label>
            <label  class="check inline" style="width:10%"><strong style="color:White">Destino</strong></label>
            <label class="check inline" style="width:36%; text-align:left"><strong style="color:White">Motivo</strong></label>
            <label class="check inline" style="width:10%; text-align:left"><strong style="color:White">Estado</strong></label>
            <label  class="check inline" style="width:10%; text-align:left"><strong style="color:White">Rechazo</strong></label>
            </div> 
<div class="contenedor_migue" style="width:97%; height:20%; margin:auto; text-align:center; padding-top:0px; overflow:auto; border-top-left-radius:0px; border-bottom-right-radius:10px">  
        <%--   <div class="contenedor_1" style="overflow:auto;width:97%; padding-top:5px; height:463px; margin-left:16px">--%>
            <table id="tablaHistorial" class="table table-hover table-condensed" style="width:100%; overflow:auto">

            </table>
        <%--   </div>--%>
            </div>

            <div class="clearfix">
            </div>

                        <div class="contenedor_1" style="width:97%; height:31px; margin-top:5px; margin-left:auto; margin-right:auto; padding-top:5px; padding-bottom:5px">
                        <table style=" margin-left:1%; margin-right:1%; width:97%">
                        <tr style="height:20%">
                        <td style="height:20%"><label for="radio_hasta" style="display:inline;"><b>Hacia el policlínico </b></label> <input type="radio" name="radio_desde_hasta" id="radio_hasta" style="margin-top: 0px;" tabindex="1"/></td>
                        <td style="height:20%"><label for="radio_desde" style="display:inline; margin-left:20px;"><b> Desde el policlínico </b></label> <input type="radio" name="radio_desde_hasta" id="radio_desde" style="margin-top: 0px;"  tabindex="2"/></td>
                        <td style="height:20%"><label style="display:inline"><b>Fecha del Pedido </b></label><input id="fechaPedido" class="fechas" type="text" style="margin-bottom:0px; width:100px; text-align:center"  tabindex="3"/></td>
                        <td style="height:20%"><label style="display:inline"><b>Hora </b></label><input id="horaPedido" type="text" style="margin-bottom:0px; width:50px; text-align:center" placeholder="--:--"  tabindex="4"/></td>
                        <td style="height:20%"><label style="display:inline"><b>Solicitado Por </b></label><select id="cboSolicitado" style="margin-bottom:0px"  tabindex="5"></select></td>
                        </tr>
                        </table>
                        </div>

            <div class="clearfix">
            </div>

                    <!--Datos de Pedido-->
                    <div id="DatosDelPedido" class="contenedor_1" style=" height:32%; width:97%; margin-left:auto; margin-right:auto; margin-top:5px; padding-top:5px; padding-bottom:5px">
                    <table  style="width:97%; margin:auto">
                    <tr>
                    <td style="height:32px"><label style="display:inline"><b>Centro de Origen&nbsp&nbsp</b></label><select id="cboOrigen" style="margin-bottom:0px"  tabindex="6"></select></td>
                    <td style="height:32px"><label style="display:inline"><b>Especialidad </b></label><select id="cboEspecialidadOrigen" style="margin-bottom:0px"  tabindex="7"></select></td>
                    <td style="height:32px"><label style="display:inline"><b>Médico </b></label><select id="cboMedicoOrigen" style="margin-bottom:0px"  tabindex="8"></select></td>
                    </tr>
                    <tr>
                    <td style="height:32px"><label style="display:inline"><b>Centro de Destino </b></label><select id="cboDestino" style="margin-bottom:0px"  tabindex="9"></select></td>
                    <td style="height:32px"><label style="display:inline"><b>Especialidad </b></label><select id="cboEspecialidadDestino" style="margin-bottom:0px"  tabindex="10"></select></td>
                    <td style="height:32px"><label style="display:inline"><b>Médico </b></label><select id="cboMedicoDestino" style="margin-bottom:0px"  tabindex="11"></select></td>
                    </tr>
                    </table>
                    <label style="display:inline; margin-left:20px"><b>Motivo </b></label><textarea id="txtMotivo" style="width:88%; margin:auto; display:inline"  tabindex="12"></textarea>
                    <label style="display:inline; margin-left:20px"><b>Diagnóstico ICD10 </b></label><input  class="typeahead span6" id="txtICD10" type="text" style="width:834px; margin:3px"  data-provide="typeahead" autocomplete="off"  tabindex="13"/>
                        </div>

                        <div class="contenedor_1" style=" height:22%; width:97%; margin-left:auto; margin-right:auto; margin-top:5px; padding-top:3px; padding-bottom:3px;">
                    <table  style="width:97%; margin:auto">
                    <tr>
                    <td style="height:32px"><label style="display:inline"><b>Trasladado Por&nbsp&nbsp</b></label><select id="cboTrasladado" style="margin-bottom:0px"  tabindex="14"></select></td>
                    <td style="height:32px"><label style="display:inline"><b>Prestación </b></label><select id="cboPrestacion" style="margin-bottom:0px"  tabindex="15"></select></td>
                    <td style="height:32px"><label style="display:inline"><b>Seguimiento De </b></label><select id="cboSeguimiento" style="margin-bottom:0px"  tabindex="16"></select></td>
                    </tr>
                    <tr>
                    <td style="height:32px"><label style="display:inline"><b>Fecha de Internación </b></label><input id="txtFechaInternacion"  class="fechas" type="text" style="margin-bottom:0px; width:100px; text-align:center"  tabindex="17"/></td>
                    <td style="height:32px"><label style="display:inline"><b>Fecha de Alta </b></label><input id="txtFechaAlta" class="fechas" type="text" style="margin-bottom:0px; width:100px; text-align:center"  tabindex="18"/></td>
                    <td style="height:32px"><label style="display:inline"><b>Estado </b></label><select id="cboEstadoDT" style="margin-bottom:0px; width:100px"  tabindex="19"></select>&nbsp&nbsp&nbsp<label style="display:inline"><b>Rechazos </b></label><select id="cboRechazos" style="margin-bottom:0px; width:100px"  tabindex="20"></select></td>
                    </tr>
                    </table>
                    <label style="display:inline; margin-left:20px"><b>Observaciones </b></label><input id="txtObservacionesDT" type="text" style="width:861px; margin:3px"  tabindex="21"/>
                    </div>
                    
                    <div class="clearfix">
                    </div>
                        <div class="pie_gris">                                                    

                          <table style="width:99%; margin-left:1.5%; margin-right:1.5%">
                           <thead>
                           <tr>
                             <td style="width:20%"><button id="BtnVolverDT" class="btn btn-info pull-left " style=" text-align:left" tabindex="21">
                               <i class=" icon-arrow-up icon-white"></i>&nbsp;Volver</button>

                               <button id="BtnBuscarDT" class="btn btn-info pull-left" style="text-align:center; display:inline; margin-left:2%" tabindex="22">
                                    <i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
                                     
                                    </td>
                                  <td style="width:20%">
                                 </td>

<%--                                <td style="width:60%">
                                <button id="BtnGuardarDT" class="btn btn-info pull-right" style="text-align:right; margin-left:5px" tabindex="23"><i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>
                                <a class="btn pull-right" id="btnVoucher" style="display:none">Generar Voucher</a>--%>


                                <td style="width:60%"><button id="BtnGuardarDT" class="btn btn-info pull-right" style="text-align:right" tabindex="23">
                                <i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>

                                </td>
                                </tr>
                                </thead>
                                </table>
                    </div>
      </div>
                </div>
            </div>

            </div> 

            <div id="autorizaciones">
            
                        <div id="Div1" style="height:670px;width:90%; margin:auto">
                <div class="resumen_datos" style="height: 80px; margin-bottom:3px">
                    <!--Datos del paciente-->
                    <div class="datos_paciente" style="width:100%">
                        <div>
                            <img id="fotopaciente2" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img>
                            </div>
                        <div class="datos_resumen_paciente"  style="width:80%">
                            <div>
                                Paciente: <strong><span id="CargadoApellido2"></span> (<span id="CargadoEdad2"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI2"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC2"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>Teléfono: <strong><span id="CargadoTelefono2"></span></strong></span>
                            <div style="width:50%">
                                <span id="Span6">Seccional:</span> <strong><span id="CargadoSeccional2"></span></strong>  
                                                            <div style="float:right">
                            <span><button id="btnSinResolucion" class="btn btn-danger pull-left" style=" text-align:right; display:none">
                            <i class=" icon-warning-sign icon-white"></i>&nbsp;Estudios Pendientes de Resoluciòn</button></span>
                            </div>                              
                            </div>
                            <div style="float:left">
                                <span id="span_Discapacidad2" style=" color:#FFFF00; font-weight:bold;"></span>
                                <span id="span_Estudiante2"></span>
                            </div>
                    </div>
                    <!--Datos del medico-->

                    <div class="clearfix">
                    </div>
                </div>
                <div class="contenedor_3" style="height:487px; padding-top:5px;width:97%; margin-left:15px;  margin-top:15px">
                    
                    <div>
                        <div class="contenedor_4" style="width:95%; height:40px; margin-bottom:5px; margin-left:2.5%">
                        <%--    <div style="margin-left:5px; margin-top:5px;">--%>
                        <table style="width:100%">
                        <thead>
                        <tr>
                                   <td style="width:20%; text-align:right"><label style="display:inline;color:Black"><b>Fecha</b> </label> <input class="borrar input-medium fechas" type="text" id="txtFechaMigue" style="margin-top:5px; text-align:center"  tabindex="1"/></td> 
                                   <td style="width:20%; text-align:right"><label for="rdo_Ambulatorio" style="display:inline;color:Black""><b>Ambulatorio</b> </label> <input class="borrar" type="radio" name="radio" id="rdo_Ambulatorio" style="margin-top: 0px;" checked  tabindex="2"/></td> 
                                   <td style="width:20%; text-align:right"> <label for="radio_Internacion" style="display:inline; margin-left:20px; color:Black"><b>Internación</b> </label> <input class="borrar" type="radio" name="radio" id="radio_Internacion" style="margin-top: 0px"  tabindex="3"/></td>
                                    <td style="width:40%; text-align:center"><label for="radio_Subrubro" style="display:inline; margin-left:20px;color:Black"><b>Subrubro</b> </label> <%--<input type="radio" name="radio" id="radio_Subrubro" style="margin-top: 0px" />--%>
                                    <%--<input type="text" id="txtSubrubro" style="margin-top: 4px; margin-bottom:0px; vertical-align:middle" disabled="disabled"/>--%>
                                    <select id="cboSubrubro" style=" margin-bottom:0px; vertical-align:middle" tabindex="4"></select>
                                    </td>
                                    
                                    </tr>
                                    </thead>
                                    </table>
                        <%--    </div>--%>
                        </div>
                        <div class="clearfix">
                        </div>
                    </div>

                    <div>
                        <div class="contenedor_4" style="width:95%; height:77px; margin-bottom:5px; margin-left:2.5%">
                            <div style="margin-left:5px; margin-top:5px;">
                            
                            <div id="Div2" style="height: 100px; width: 98%; overflow:hidden">
                                    <table style="width:100%">
                                            <thead>
                                            <tr>
                                            <td></td>
                                         
                                            <td style="width:10%; text-align:right"><label style="color:Black"><b>Especialidad </b></label></td>
                                            <td style="width:40%; text-align:left"><select id="cboEspecialidad" style="width:100%; margin-bottom:2px"  tabindex="5"></select></td>
                                            <td style="width:10%; text-align:right"><label style="color:Black"><b>Prestador </b></label></td>
                                            <td style="width:40%; text-align:left"><select id="cboPrestador" style="width:100%; margin-bottom:2px"  tabindex="6"></select></td>
                                            
                                            </tr>
                                       <%--     <tr style="width:10%">         </tr>--%>
                                            <tr>
                                            <td></td>
                                            <td style="width:11%; text-align:right"><label style="color:Black"><b>Médico Interno</b></label></td>
                                            <td style="width:40%; text-align:left"><select id="cboMedInterno" style="width:100%" tabindex="7"></select></td>
                                            <td style="width:11%; text-align:right"><label style="color:Black"><b>Médico Externo</b></label></td>
                                            <td style="width:40%; text-align:left"><input id="txtMedExt" type="text" style="width:97%" tabindex="8"/></td>
                                            </tr>
                                            </thead>
                                        <%--    <tbody id="Tbody1">
                                                                            
                                            </tbody>--%>
                                    </table>
                            </div>
                            </div>
                        </div>
                        <div class="clearfix">
                        </div>
                    </div>




                    <div class="contenedor_5" style="width:95%; height:225px ; text-align:center; margin-top:0px; margin-bottom:5px; margin-left:19px; margin-left:2.5%">

            <div class="modal-backdrop" style="width:100%; height:25px; background-position:center; position:inherit; background-color:Black; border-top-left-radius:10px; border-top-right-radius:10px">
            <label class="check inline" style="width:5%"></label>
            <label class="check inline" style="width:6%"><strong style="color:White; text-align:center">Código</strong></label><label class="check inline" style="width:30%"><strong style="color:White">Práctica/Módulo</strong></label>
            <label class="check inline" style="width:8%"><strong style="color:White">Cantidad</strong></label><label  class="check inline" style="width:8%"><strong style="color:White">Importe</strong></label><label  class="check inline" style="width:20%"><strong style="color:White">Sub Rubro</strong></label>
            <label  class="check inline" style="width:20%"><strong style="color:White">Prestador</strong></label>
            </div> 

                         <%--<div id="Div3" class="tabla" style="height:90px; width:98%; margin-left:8px;margin-top:0px">--%>
                         <div id="contieneTabla" class="contenedor_migue" style="overflow:auto; height:60px; border-radius:0px">
                                    <table id ="tablaPracticas" class="table tabbable" style="text-align:right; margin-bottom:4px; border-color:Black">

                                    </table>
                                    </div>
                         <%--   </div>--%>
                                            <table style="width:100%;  margin-left:12%; margin-right:10%">
                                            <thead>
                                            <tr>
                                            <td style="width:10%; text-align:right"><label style="color:Black"><b>Código Práctica</b></label></td>
                                            <td style="width:8%"><input id="txtCodigo" class="input-mini numero" type="text" style="margin-bottom:2px; text-align:center" maxlength="8" tabindex="9"/></td>
                                            <td style="width:8%; text-align:right"><label style="color:Black"><b>Práctica</b></label></td>
                                            <td ><select id="cboPractica" style="width:98%;margin-bottom:2px" tabindex="11"></select></td>
                                            <%--<input  class="typeahead span6" id="Text1" type="text" style="width:834px; margin:3px"  data-provide="typeahead" autocomplete="off"  tabindex="13"/>--%>
                                            <%--<td ><input class="span6" id="cboPractica" type="text"" style="width:98%;margin-bottom:2px" data-provide="typeahead" autocomplete="off" tabindex="11"/></td>--%>
                                            </tr>

                                            <tr>
                                            <td style="width:10%; text-align:right"><label style="color:Black"><b>Código Módulo</b></label></td>
                                            <td style="width:8%"><input id="txtCodMod" class="input-mini numero" type="text" style="margin-bottom:2px; text-align:center" maxlength="7" tabindex="12"/></td>
                                            <td style="width:7%; text-align:right"><label style="color:Black"><b>Módulo</b></label></td>
                                            <td style="padding:0px"><select id="cboModulo" style="width:98%;margin-bottom:2px; margin-top:6px" tabindex="13"></select></td>
                                            </tr>

                                            <tr>
                                            <td style="width:8%; text-align:right"><label style="color:Black"><b>Importe</b></label></td>
                                            <td style="width:8%"><input  id="txtImporte" type="text" class="pull-left numero input-mini" style=" margin-left:7px; text-align:center"  maxlength="7" tabindex="14"/></td>
                                            <%--<td style="width:8%"><input id="txtCantidad" class="input-mini numero" type="text" style="text-align:center"  maxlength="1" tabindex="13"/></td>--%>
                                            <td style="width:8%; text-align:right"><label style="color:Black"><b>Cantidad</b></label></td>
                                            <td>
                                           <%-- <input  id="txtImporte" type="text" class="pull-left numero" style=" margin-left:4px; text-align:center; width:100px"  maxlength="6" tabindex="14"/>--%>
                                           <input id="txtCantidad" class="input-mini numero pull-left" type="text" style="text-align:center"  maxlength="2" tabindex="15" />
                                           <input id="txtTotal" type="text" style=" margin-bottom:0px; text-align:center;margin-left:5px; background-color:#FA5858; border-color:Black; border-width:2px; font-weight:bold; width:100px" class="pull-left" disabled="disabled"/>

                                            <button id="btnAgregar" class="btn btn-mini btn-success" style="margin-top:5px" tabindex="16">
                                            <i class=" icon-plus-sign icon-white"></i>&nbsp;Agregar</button>
                                             <button id="Button1" class="btn  btn-mini btn-danger" style=" display:none;margin-top:5px">
                                            <i class=" icon-remove-circle icon-white"></i>&nbsp;Cancelar Edición</button>

                                            </td>
                                          
                                            <td style="width:12%"></td>
                            
                                            <td style="width:15%"></td>

                                            </tr>

                                            </thead>
                                            <tbody id="Tbody3">
                                                                            
                                            </tbody>
                                    </table>
                            <div>
                            
                            </div>
                    </div>
                    <div class="contenedor_4" style="width:95%; height:116px ; text-align:center; margin-top:0px; margin-left:2.5%">
                    <table style="width:100%">
                    <thead>

                    <tr>
                    <td style="width:15%; text-align:right" tabindex="16"><label style="color:Black"><b>Comentarios</b></label></td>
                    <td><input id="txtComentarios" type="text" style="margin-bottom:2px; width:95%; margin-left:10px; margin-top:10px" tabindex="17"/></td>
                    </tr>
                    <tr>
                    <td style="width:15%"><label style="text-align:right"><label style="color:Black"><b>Estado</b></label></label></td>
                    <td><select  id="cboEstado" style="margin-bottom:2px; width:96.5%;margin-left:10px" tabindex="18"></select></td>
                    </tr>
                    </thead>
                    </table>


                    <table style="width:100%">
                    <thead>
                    <tr>
                    <td>
                    <label style="color:Black"><b>Fecha Turno</b></label>
                    </td>
                    <td>
                    <input id="txtFecTurno" class="input-medium fechas" type="text" style="text-align:center" tabindex="19"/>
                    </td>
                    <td>
                    <label style="color:Black"><b>Fecha Auditado</b></label>
                    </td>
                    <td>
                    <input id="txtFecAuditado" class="input-medium fechas"  type="text" style="text-align:center" tabindex="20"/>
                    </td>
                    <td>
                    <label style="color:Black"><b>Fecha Retirado</b></label>
                    </td>
                    <td>
                    <input id="txtFecRetirado" class="input-medium fechas"  type="text" style="text-align:center" tabindex="21"/>
                    </td>
                    </tr>
                    </thead>
                    </table>

                    </div>

                    <!--Tabla de estudios-->
                        <div style="padding: 0px 15px 0px 15px;">
                        
                            </div>
                                              <div class="clearfix">
                        </div>
                        <div class="pie_gris">                                                    
                           <table style="width:98%; margin-left:1.5%; margin-right:1.5%">
                           <thead>
                           <tr>
                             <td style="width:10%"><button id="btnVolver" class="btn btn-info" style=" text-align:left; margin-left:10%">
                               <i class=" icon-arrow-up icon-white"></i>&nbsp;Volver</button></td>

                                    <td style="width:10%"><button id="BtnBuscar" class="btn btn-info pull-left" style="text-align:center" >
                                        <i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
                                        
                                    </td>
<!--boton visible si es que el estado esta en auditado-->
                                <td style="width:20%">
                                    <button id="btnImpVaucher" href='javascript:;'  class="btn btn-info pull-right" style="text-align:right">
                                        <i class="icon-print icon-white"></i>&nbsp;Imprimir
                                    </button>
                                </td>
                                <td style="width:20%">
                                <!--<input id="idTextoObservaciones" type="text" />-->
                                </td>
<!----------------->
                                <td style="width:80%">
                                <button id="btnGuardar" class="btn btn-info pull-right" style="text-align:right" tabindex="22">
                                    <i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>
                                </td>
                                </tr>
                                </thead>
                                </table>
                    </div>
  
                </div>  
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div id="ModalError" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <h3 id="myModalLabel">
                Error en Turno</h3>
        </div>
        <div class="modal-body">
            <p>
                <span id="DialogoError"></span>
            </p>
        </div>
        <div class="modal-footer">
            <button id="CerrarError" class="btn" data-dismiss="modal" aria-hidden="true">
                Cerrar</button>
        </div>
    </div>

    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jQueryBlink.js" type="text/javascript"></script>
    <script src="../js/Hospitales/DerivacionyTraslado/DerivacionyTraslado.js" type="text/javascript"></script>
    <script src="../js/Hospitales/DerivacionyTraslado/Autorizacion.js" type="text/javascript"></script>
    <script src="../js/jQueryBlink.js" type="text/javascript"></script>
    <script src="../js/Hospitales/PhoneValidate.js" type="text/javascript"></script>
<%--    <script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
	<script src="jquery.blink.js"></script>--%>
<%--    <script src="../js/Hospitales/DerivacionyTraslado/DerTras.js" type="text/javascript"></script>--%>

<script>
//        $('#desdeaqui').click(function () {
//            $("#hastaaqui").fadeIn(1500);
//            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
//        });



        $('#uom_boton').toggle(
   function () {
       $('#barra_sup').animate({ top: "-93" }, 200);
       $('#lightbox').fadeOut(200);

   },
   function () {
       $('#barra_sup').animate({ top: "0" }, 200);
       $('#lightbox').fadeIn(200);
       $('#lightbox').height($('html').height());


   });

    </script>
    <script type='text/javascript'>
        $(document).ready(function () {
            if ($("[rel=tooltip]").length) {
                $("[rel=tooltip]").tooltip();
            }
        });

    </script>
</body>
</html>
