<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Principal.aspx.cs" Inherits="Anatomia_Patologica_Prueba" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/Nutricion.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/fixedHeader.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet"/>
 <%--   <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"/>
    <link rel="stylesheet" href="/resources/demos/style.css"/>--%>
    <style type="text/css">
  
        body {
            font-family: verdana ;
            font-size: 14px ;
            }
  
        h1 {
            font-size: 180% ;
            }
  
        h2 {
            border-bottom: 1px solid #999999 ;
            }
  
        .printable {
            border: 1px dotted #CCCCCC ;
            padding: 10px 10px 10px 10px ;
            }
  
        img {
            background-color: #E0E0E0 ;
            border: 1px solid #666666 ;
            padding: 5px 5px 5px 5px ;
            }
  
        a {
            color: red ;
            }
  
    </style>

</head>
<body>
    <!-- Wrapper for slides -->
    <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
    <div class="carousel-inner" role="listbox" style="width:100%">
    <div class="item active">
    <div class="clearfix">
    </div>
    <!-- Wrapper for slides -->

<div id="lightbox" style="display:none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8); text-align:right">
    </div>
    <div class="container" style="padding-top:0px; width:82%; height:800px">
        <div class="contenedor_1" style="width:90%; height:600px; padding-top:10px;margin-left:auto; margin-right:auto; display:block" id="derivaciones">
            <div id="primero" class="contenedor_bono" style="height:500px; margin-left:30%">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg"  style="display:none"/>&nbsp;&nbsp;<span id="titulo" style=" text-align:center; display:block"></span></div>
                <form class="form-horizontal" style="margin-top:20px">
                <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC" class="interno bloquear">
                      </select>          
                   </div>
                <div class="control-group">
                    <label class="control-label">
                </div>
                        <label class="control-label" for="txt_dni">N°</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" placeholder="Nro. de documento sin puntos"  tabindex="1"  class="interno bloquear"/>
                        <input id="txtdocumento" type="hidden" />
                        <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
                        <input id="estudioId" value="" type="hidden"/>
                        <input id="externo" value="" type="hidden"/>
                        <input id="discapacidad_val" value="" type="hidden"/>
                        <input id="verificarPMI" value="" type="hidden"/>
                        <input id="PMI_val" value="" type="hidden"/>
                        <input id="discapacidad_paga" value="" type="hidden"/>
                        <input id="discapacidad_paga2" value="" type="hidden"/>
                        <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
                        <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
                    </div>
                </div>
                <div class="control-group" >
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" type="text" placeholder="Ej: 99123456789"  tabindex="2" class="interno bloquear"/>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtPaciente">
                        Paciente</label>
                    <div class="controls">
                        <input id="txtPaciente" placeholder="Apellido Nombre" type="text" class="span3 interno bloquear"  tabindex="3" />
                        <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn interno bloquear bloquearBtn" style="display:inline"><i class="icon-search icon-black">
                        </i></a>
                    </div>
                </div>
                <div id="controlTelefono" class="control-group">
                    <label class="control-label">
                        Teléfono</label>
                    <div class="controls">
                        <input id="txtTelefono"  maxlength="13" placeholder="Ej. 43625910" type="text" class="interno bloquear"/>
                    </div>
                </div>
        
        <div id="controlSeccional" class="control-group">
        
          <label class="control-label bloquear" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" />
          
              <select id="cboSeccional" class="bloquear">
                <option value="0">Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" style="display:none;"></select>          

           </div>

        </div>

                <div id="Div4" class="control-group"  style="display:none">
        
          <label class="control-label" for="txtPacienteExterno">Paciente Externo</label>
          <div class="controls">
          
          <input type="text" id="txtPacienteExterno" class="externo bloquear" placeholder="Apellido Nombre"/>
          <div id="sugerencias" style="position:absolute; z-index:3;left:60%; top:50%; padding:2px 2px 2px 2px; width:20%; height:30%; display:none; text-align:center; border: 1px solid #E6E6E6; background-color:White; overflow:auto" class="sombra" >
          <table id="resultados" style="text-align:center; margin:auto; overflow:auto" class="table table-hover"></table></div>
         
           </div>
        </div>

          <div id="Div5" class="control-group"  style="display:none">
        
          <label class="control-label" for="txtNhcExterna">NHC Externa</label>
          <div class="controls">
          
          <input type="text" id="txtNhcExterna" class="externo bloquear" placeholder="Ej: 99123456789"/>
         
           </div>
        </div>
                </form>
                <div class="control-group" style="text-align:center">
                    <div class="controls pagination-centered"> 
                        <a class="btn btn-danger"  id="btnCancelarPedidoTurno" style="display: none; margin-left:15%">
                            Otro Paciente</a> <a class="btn" id="btnactualizar" style="display: none;">Actualizar</a>
                        <a id="desdeaqui" style="display: none; text-align:center" class="btn btn-info">Siguiente</a>
                    </div>
                </div>
            </div>
            <div class="clearfix">
            </div>
            <div id="hastaaqui">


                                <div id="autorizaciones" style="height:530px; margin-top:0px">
            
                        <div id="Div1" style="height:670px;width:100%; margin:auto">
                <div class="resumen_datos" style="height: 70px; margin-bottom:5px; margin-top:5px">
                    <!--Datos del paciente-->
                    <div class="datos_paciente">
                       
                            <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img>
                        <div class="datos_resumen_paciente" style=" margin-top:5px">
                            <div style=" margin-bottom:10px">
                                Paciente: <strong><span id="CargadoApellido"></span><span class="ocultar">(<span id="CargadoEdad"></span>)</span></strong>
                                <a href="javascript:VerMas();" class="ver_mas_datos ocultar">Ver más</a>
                                </div>
                            <span class="ocultar">DNI: <strong><span id="CargadoDNI" class="ocultar"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span class="derecha">NHC: <strong> <span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span class="ocultar">Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                            <div style=" margin-top:10px">
                                <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>                                
                            </div>
                            <div style="display:none">
                                <span id="span_Titular">Titular:</span> <strong><span id="CargardoTitular"></span></strong>
                                <span id="span_Estudiante"></span>
                            </div>

                           
                        </div>
                         
                    </div>
                    <!--Datos del medico-->

                    <div class="clearfix">
                    </div>
                    </div>
                <div class="contenedor_3" style="height:610px; padding-top:5px;width:97%; margin-left:15px">
                    
                    <div>
                        <div class="clearfix">
                        </div>
                    </div>

            <div class="contenedor_5" style="width:95%; height:330px ; text-align:center; margin-top:0px; margin-bottom:5px; margin-left:19px; margin-left:2.5%">
            <div class="contenedor_migue" style="margin-bottom:1%">

            <table style="width:100%; margin-bottom:0px">
            <tr>
            
            <td style="width:15%; text-align:right"><label style="display:inline" class="pull-rigth"><b>Material&nbsp;</b></label></td>
            <td style="width:83%; text-align:left" colspan="3"><input type="text" id="txtMaterialCod" style="width:18%; margin-bottom:0%; text-align:center; text-transform:uppercase" maxlength="8" tabindex="0"/><select style="width:71.5%; margin-bottom:0px" id="cboMaterial" class="restablecer cambio bloquear" tabindex="1"></select><a id="btnNuevoMaterial" class="btn btn-mini bloquearBtn" style="margin-left:6px">Editar...</a></td>
            <td style="width:2%"></td>
            </tr>
            <tr>
            
            <td style="width:15%; text-align:right"><label style="display:inline" class="pull-rigth"><b>Procedimiento&nbsp;</b></label></td>
            <td style="width:83%; text-align:left" colspan="3"><input type="text" id="txtProcedimientoCod" style="width:18%; margin-bottom:0%; text-align:center; text-transform:uppercase" maxlength="8" tabindex="2"/><select style="width:71.5%; margin-bottom:0px" id="cboProcedimiento" class="restablecer cambio bloquear" tabindex="3"></select><a id="btnNuevoProcedimiento" class="btn btn-mini bloquearBtn" style="margin-left:6px">Editar...</a></td>
            <td style="width:2%"></td>
            </tr>
            <tr>
            
            <td style="width:15%; text-align:right"><label style="display:inline"><b>Método&nbsp;</b></label></td>
            <td style="width:83%; text-align:left" colspan="3"><input type="text" id="txtMetodoCod" style="width:18%; margin-bottom:0%; text-align:center; text-transform:uppercase" maxlength="8" tabindex="4"/><select style="width:71.5%; margin-bottom:0px" id="cboMetodo" class="restablecer cambio bloquear" tabindex="5"></select><a class="btn btn-mini bloquearBtn" id="btnNuevoMetodo" style="margin-left:6px">Editar...</a></td>
            <td style="width:2%"></td>
            </tr>

            <tr>
            <td style="width:15%; text-align:right"><label style="display:inline" class="fechaHoy"><b>Fecha de Ingreso&nbsp;</b></label></td>
            <td style="width:49%; text-align:right"><input type="text" style="margin-bottom:0px; width:37%; text-align:center" id="txtFechaIngreso" class="fechaHoy pull-left bloquear" tabindex="6"/><label style="display:inline" class="pull-rigth"><b>Protocolo Nº&nbsp;</b></label><input type="text" style="width:37%; text-align:center; margin-bottom:0px; font-size:" id="txtProtocolo" class="numeroEntero cantidad pull-right restablecer cambio bloquear" name="6" tabindex="7"/></td>
            <td style="width:33%; text-align:right"><label style="display:inline"><b>Tipo de Estudio&nbsp;</b></label><select style="margin-bottom:0px; width:62%" id="cboTestudio" class="restablecer bloquear" tabindex="8">
            <option value="0" class="restablecer cambio">Seleccione</option>
            <%--<option value="1">Pendientes</option>--%>
           <%-- <option value="2">PAP</option>--%>
            <option value="2">Citología no ginecológica</option>
            <option value="3">Histopatología</option>
            </select></td>
            <td style="width:2%"></td>
            </tr>

     
            <tr>
            <td style="width:15%; text-align:right"><label style="display:inline" class="pull-rigth bloquear"><b>Médico Central&nbsp;</b></label></td>
            <td style="width:49%; text-align:right"><select style="width:40%; margin-bottom:0px" class="pull-left restablecer cambio bloquear" id="cboMedicoremitente" tabindex="9"></select><label style="display:inline"><b>Servicio&nbsp;</b></label><select style="width:40%; margin-bottom:0px" id="cboServicio" class="restablecer cambio bloquear" tabindex="10"></select></td>
            <td style="width:33%; text-align:right"><label style="display:inline; text-align:right"><b>Médico Ext&nbsp;</b></label><select id="cboMedExt" style="width:62%; margin-bottom:0px" class="pull-right restablecer cambio bloquear" tabindex="11"></select></td>
            <td style="width:2%"></td>
            </tr>

            <tr>
            <td style="width:15%; text-align:right"><label style="display:inline"><b>Especialidad&nbsp;</b></label></td>
            <td style="width:49%; text-align:right"><select style="width:100%; margin-bottom:0px" id="cboEspecialidad" class="restablecer cambio bloquear" tabindex="11"></select></td>
            <td style="width:33%; text-align:right"><label style="display:inline" class="pull-rigth"><b>Servicio Ext&nbsp;</b></label><select id="cboServExt" style="width:62%; margin-bottom:0px" class="restablecer cambio bloquear" tabindex="12"></select></td>
            <td style="width:1%"></td>
            </tr>
            </table>

</div>

          <ul class="nav nav-tabs" data-tabs="tabs" style="margin-bottom:0px" >
        
          <li id="1" class="active" style="width:25%"><a class="pestaña" style="background-color:#CEF6CE" data-toggle="tab" href="#tab1" id="macro" onclick="opcion(this)"><b>Macroscopía</b></a></li>          
          <li id="2" style="width:25%"><a  class="pestaña" data-toggle="tab" href="#tab2" id="micro" onclick="opcion(this)"><b>Microscopía</b></a></li>
          <li id="3" style="width:25%"><a  class="pestaña" data-toggle="tab" href="#tab3" id="diag" onclick="opcion(this)"><b>Diagnóstico</b></a></li>
          <li id="Li1" style="width:25%"><a  class="pestaña" data-toggle="tab" href="#tab4" id="compl" onclick="opcion(this)"><b>Informe Complementario</b></a></li>
          </ul>

     <script type="text/jscript">
         function opcion(item) {
             $(".pestaña").css('background-color', '');
            $(item).css('background-color','#CEF6CE');
           }
     </script>

      <div id="my-tab-content" class="tab-content" style="height:100px; width:100%" scroll="auto">
      <!--MACROSCOPIA-->
              <div class="tab-pane active fade in DP" id="tab1">
              <textarea id="txtMacroscopia" style="width:98%; height:90px; margin-bottom:0px" class="restablecer cambio bloquear"></textarea>    
              </div>
     <!--MACROSCOPIA-->

           <!--MICROSCOPIA-->
              <div class="tab-pane fade in DP" id="tab2">
              <textarea id="txtMicroscopia" style="width:98%; height:90px; margin-bottom:0px" class="restablecer cambio bloquear"></textarea>    
              </div>
     <!--MICROSCOPIA-->

           <!--DIAGNOSTICO-->
              <div class="tab-pane fade in DP" id="tab3">
              <textarea id="txtDiagnostico" style="width:98%; height:90px; margin-bottom:0px" class="restablecer cambio bloquear"></textarea>    
              </div>
     <!--DIAGNOSTICO-->

              <!--INFORME COMPLEMENTARIO-->
              <div class="tab-pane fade in DP" id="tab4">
              <textarea id="txtComplementario" style="width:98%; height:90px; margin-bottom:0px" class="restablecer cambio bloquear"></textarea>
         
              </div>
              <!--INFORME COMPLEMENTARIO-->
     </div>                             
              
                                          <table style="width:100%;  margin-left:0%; margin-right:0%; margin-top:20px; margin-bottom:3px">

                                            <tr>
                                          <%--  <td style="width:1%"></td>--%>
                                            <td style="width:50%; text-align:right" colspan="2"><label style="display:inline"><b>Diagnosticado por </b></label><select id="cboDiagnosticado" style="width:72%;margin-bottom:1px" class="restablecer cambio bloquear"></select></td>
                                            <td style="width:50%; text-align:right" colspan="2"><label style="display:inline"><b>Cód Diagnóstico </b></label><input id="txtCodigoDiagnostico" type="text" style="width:60%;margin-bottom:1px; height:20px" class="manito restablecer cambio bloquear" placeholder="Seleccione"/><a class="btn btn-mini bloquearBtn" id="btnNuevoDiagnostico" style="margin-bottom:3px">Editar...</a></td>
                                            </tr>
 
                                            <tr">
                                           <%-- <td style="width:1%"></td>--%>
                                            <td style="width:25%; text-align:right"><label style="display:inline"><b>Fecha de Salida </b></label><input id="txtFechaSalida" class="fecha cambio bloquear" type="text" style="text-align:center; width:38%; margin-bottom:0px" placeholder="Pendiente"/></td>
                                            <td style="width:25%; text-align:right"><label style="display:inline"><b>Código N.N </b></label><select id="cboCodigoNN" style="width:43%;margin-bottom:1px"  class="restablecer cambio bloquear"></select><a class="btn btn-mini bloquearBtn" id="btnNuevoNN" style="margin-bottom:3px">Editar...</a></td>
                                            <td style="width:25%; text-align:right"><b>N° de Preparados </b><input id="txtNumeroPreparados" type="text" style="text-align:center; width:30%; margin-bottom:0px" class="numeroEntero cantidad restablecer cambio bloquear" name="4"/></td>    
                                             <td style="width:25%; text-align:right"><b>Nº de Tacos </b><input id="txtNumeroTacos" type="text" style="text-align:center; width:30%; margin-bottom:0px; margin-right:8%" class="numeroEntero cantidad restablecer cambio bloquear" name="4"/></td>                                   
                                            </tr>

                                           </table>

                                            <div style="width:100%">
                                            <textarea style="width:81.9%; margin-right:4px; margin-left:0px; height:50px" class="pull-left restablecer cambio bloquear" id="txtTecnicasEspeciales" disabled="disabled">
                                            </textarea>
                                            <div style="float:left">
                                            <label style="display:inline; margin-top:0%" for="chkTecnicasEspeciales"><b>Técnicas Especiales</b></label><input id="chkTecnicasEspeciales" type="checkbox" style="margin-top:0%; margin-left:2px" class="restablecer cambio bloquear"/><br />
                                            <a id="btnModificarTecnicasEspeciales" class="btn deshabilitar" disabled="disabled" style="width:84%">Modificar Técnicas</a>
                                            </div>
                                            </div>

                                            <table style="width:100%;  margin-left:0%; margin-right:0%; margin-top:20px">
                                            <tr>
                                            <td style="width:1%"></td>
                                            <td style="width:40%; text-align:right"><label for="chkReceptores" style="display:inline"><b>Fueron determinados receptores hormonales? </b></label><input type="checkbox" id="chkReceptores" style="margin-bottom:0px; margin-top:0px; display:inline" class="restablecer cambio bloquear"/></td>
                                            <td style="width:10%"></td>
                                            <td style="width:40%; text-align:right"><label style="display:inline"><b>Nro. Técnicas Especiales Realizadas </b></label><input id="TeCantidad" type="text" style="width:10%;margin-bottom:0px; text-align:center" class="numeroEntero cantidad restablecer cambio bloquear" name="2"/></td>
                                            <td style="width:10%"></td>                                        
                                            </tr>
                                            <tr>
                                            <td style="width:1%"></td>
                                            <td style="width:40%; text-align:right"><label for="chkPlaca" style="display:inline"><b>Estudio con Placa </b></label><input id="chkPlaca" type="checkbox" style="text-align:left;margin-bottom:0px; margin-top:0px; display:inline" class="restablecer cambio bloquear"/></td>
                                            <td style="width:10%"></td>                                                                                      
                                            <td style="width:40%; text-align:right"><label style="display:inline"><b>Nro. de Técnicas IHQ </b></label><input id="IHQcantidad" type="text" class="numeroEntero cantidad restablecer cambio bloquear" style="text-align:center; width:10%;margin-bottom:0px; margin-top:0px" name="2"/></td>
                                            <td style="width:10%"></td>
                                            </tr>
                                            </table>
                            <div>
                            
                            </div>
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
                             <td style="width:11%"><button id="btnVolver" class="btn btn-info" style=" text-align:left; margin-left:10%">
                               <i class=" icon-arrow-left icon-white"></i>&nbsp;Volver</button>
                               </td>

                                 <td style="width:35%"> <button id="btnTraspaso" class="btn btn-warning" style=" text-align:left; margin-left:10%; display:none">
                               <i class=" icon-adjust icon-white"></i>&nbsp;Traspaso Protocolo</button>
                                <button id="btnBorrar" class=" btn btn-danger" style="text-align:right; display:none; margin-left:1%">
                                <i class=" icon-remove-circle"></i>&nbsp;Borrar</button>
                                 </td>



                                <td style="width:40%">
                                <button id="btnImprimir" class=" btn" style="text-align:right; display:inline; margin-left:50%" disabled="disabled">
                                <i class=" icon-print icon-black"></i>&nbsp;Imprimir</button>
                                <button id="btnGuardar" class="btn btn-info pull-right bloquearBtn" style="text-align:right" tabindex="22">
                                <i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>
                                <input id="idsTecnicas" type="text" style="display:none"/>
                                </td>

                                </tr>
                                </thead>
                                </table>
                    </div>
  
                </div>  
            </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        

    <div class="item"> <%-- PAGINA DE BUSQUEDA-----------------------------------------------------------------------------------------------%>
      
    <div class="clearfix">
    </div>

    <div id="Div2" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top:0px; width:100%">
        <div class="contenedor_1" style="width:90%; margin-left:auto; margin-right:auto">
            <div class="clearfix">
            </div>
            <div id="Div3" style="display: inline;">
                <div class="contenedor_3" style="height:667px; width:72%; margin-left:14%">
                    <div class="" style="float:right">
 
                    <%--<div class="row_2"><span style="margin-left:20%"><b>Fecha de Ingreso</b></span><span style="margin-left:3%"><b>Fecha de Salida</b></span></div>--%>
                    <div style="width:46%; height:10%; text-align:center; margin-left:1%; position:relative" class="minicontenedor50">
<%--                    <table id="tablaFechas" style="width:100%">
                    <tr style="text-align:center"><thead><span><b>FECHA DE INGRESO</b></span></thead></tr>
                    <tr>
                    <td style="text-align:right; width:15%">
                    <label style="display:inline" for="txtDesdeIngresoS"><b>Desde</b>&nbsp;</label>
                    </td>
                    <td style="text-align:left; width:45%">
                    <input id="txtDesdeIngresoS" type="text" style="margin-bottom:0px; width:82px; text-align:center; margin-left:3px" class="desde1 validarFecha requerido"/>
                    </td>
                    <td style="text-align:right; width:15%">
                    <label style="display:inline" for="txtHastaIngresoS"><b>Hasta</b>&nbsp;</label>
                    </td>
                    <td style="text-align:center; width:35%">
                    <input id="txtHastaIngresoS" type="text"class="pull-left hasta1 validarFecha requerido" style="margin-bottom:0px; width:82px; text-align:center"/>
                    </td>
                    </tr>
                    </table>--%>
                            <table id="Table1"  style="width:100%">
                            <tr>
                            <td style="width:15%">
                            <label style="text-align:right"><b>Paciente</b>&nbsp;</label> 
                            </td>
                            <td style="width:45%; text-align:left">
                            <input type="text" id="txtPacienteS" style="margin-top:0px; margin-bottom:0px; margin-right:0px; margin-left:0px" class=" requerido"/>
                            </td>
                            <td style="width:14%; text-align:right">
                            <label><b>Dni</b>&nbsp;</label> 
                            </td>
                            <td style="width:35%; text-align:center">
                            <input type="text" id="txtDniS" style="margin-top:0px;margin-bottom:0px; margin-right:5px; width:82px; text-align:center" class="numeroEntero cantidad pull-left requerido" name="11"/>
                            </td>
                            </tr>
                            </table>
                    </div>
                    
                    <div style="width:46%; height:10%; text-align:center; margin-right:2%; margin-left:0%; float:right" class="minicontenedor50">
<%--                    <table style="width:100%">
                    <tr style="text-align:center"><thead><span><b>FECHA DE SALIDA</b></span></thead></tr>
                    <tr>
                    <td style="text-align:right; width:15%">
                    <label style="display:inline" for="txtDesdeSalidaS"><b>Desde</b>&nbsp;</label>
                    </td>
                     <td style="text-align:right; width:45%">
                    <input id="txtDesdeSalidaS" type="text" class="pull-left desde2 validarFecha requerido" style="margin-bottom:0px; width:82px; text-align:center"/>
                    </td>
                    <td style="text-align:right; width:15%">
                    <label style="display:inline" for="txtHastaSalidaS"><b>Hasta</b>&nbsp;</label>
                    </td>
                     <td style="text-align:right; width:35%">
                    <input id="txtHastaSalidaS" type="text" class="pull-left hasta2 validarFecha requerido" style="margin-bottom:0px; width:81px; text-align:center"/>
                    </td>
                    </tr>
                    </table>--%>
                   <%-- </div>--%>
                            <table style="width:100%">
                            <tr>
                            <td style="width:15.5%">
                            <label style="text-align:right"><b>NHC</b>&nbsp;</label>
                            </td>
                            <td style="width:25%; text-align:left">
                            <input type="text" id="txtNhc" style="margin-top:0px;margin-bottom:0px; margin-right:1px; width:84px; text-align:center" class="numeroEntero cantidad requerido" name="11"/>
                            </td>
                            <td style="width:15%; text-align:right">
                            <label><b>Seccional</b>&nbsp;</label>  
                            </td>
                            <td style="width:45%; text-align:left">
                            <select id="txtSeccionalS" style="margin-top:0px; margin-bottom:0px; width:95%" class=" requerido"></select> 
                            </td>
                            </tr>
                            </table>
             </div>


    <%--         <style type="text/css">
             .t {width: 100%;}
             </style>--%>

             <div style="width:46%; height:10%; text-align:center; margin-left:1%; margin-top:3px; margin-bottom:4px; position:relative" class="minicontenedor50">
                            <table id="tablaPacientes"  style="width:100%">
                            <tr>
                            <td style="width:15%">
                            <label style="text-align:right"><b>Paciente<br />Externo</b>&nbsp;</label> 
                            </td>
                            <td style="width:45%; text-align:left">
                            <input type="text" id="txtPacienteExternoS" style="margin-top:0px; margin-bottom:0px; margin-right:0px; margin-left:0px" class=" requerido"/>
                            </td>
                            <td style="width:14%; text-align:right">
                            <label><b>NHC<br />Ext.</b>&nbsp;</label> 
                            </td>
                            <td style="width:35%; text-align:center">
                            <input type="text" id="txtNhcExternaS" style="margin-top:0px;margin-bottom:0px; margin-right:5px; width:82px; text-align:center" class="numeroEntero cantidad pull-left requerido" name="11"/>
                            </td>
                            </tr>
                            </table>
                            </div>

                            <div style="width:46%; height:10%; text-align:center; margin-right:2%; margin-left:0%; margin-top:3px; margin-bottom:4px; float:right" class="minicontenedor50">
  <%--                          <table style="width:100%">
                            <tr>
                            <td style="width:15.5%">
                            <label style="text-align:right"><b>NHCrgdfg</b>&nbsp;</label>
                            </td>
                            <td style="width:25%; text-align:left">
                            <input type="text" id="txtNhc" style="margin-top:0px;margin-bottom:0px; margin-right:1px; width:84px; text-align:center" class="numeroEntero cantidad requerido" name="11"/>
                            </td>
                            <td style="width:15%; text-align:right">
                            <label><b>Seccional</b>&nbsp;</label>  
                            </td>
                            <td style="width:45%; text-align:left">
                            <select id="txtSeccionalS" style="margin-top:0px; margin-bottom:0px; width:95%" class=" requerido"></select> 
                            </td>
                            </tr>
                            </table>--%>
                     <table id="tablaFechas" style="width:100%">
                    <tr style="text-align:center"><thead><span><b>FECHA DE INGRESO</b></span></thead></tr>
                    <tr>
                    <td style="text-align:right; width:15%">
                    <label style="display:inline" for="txtDesdeIngresoS"><b>Desde</b>&nbsp;</label>
                    </td>
                    <td style="text-align:left; width:45%">
                    <input id="txtDesdeIngresoS" type="text" style="margin-bottom:0px; width:82px; text-align:center; margin-left:3px" class="desde1 validarFecha requerido"/>
                    </td>
                    <td style="text-align:right; width:15%">
                    <label style="display:inline" for="txtHastaIngresoS"><b>Hasta</b>&nbsp;</label>
                    </td>
                    <td style="text-align:center; width:35%">
                    <input id="txtHastaIngresoS" type="text"class="pull-left hasta1 validarFecha requerido" style="margin-bottom:0px; width:82px; text-align:center"/>
                    </td>
                    </tr>
                    </table>

                            </div>
                        </div>


<%--                    <div style="width:95%; height:5%; text-align:center; margin-right:2%; margin-left:0%; margin-bottom:4px; float:right" class="minicontenedor50">
                
                    <table style="width:100%">
                    <tr>
                    <td style="text-align:right; width:14.5%">
                    <label style="display:inline" for="cboTipoEstudioS"><b>Paciente Externo</b>&nbsp;</label>
                    </td>
                     <td style="text-align:right; width:30%">
                    <input id="txtPacienteExternoS" type="text" class="pull-left requerido" style="margin-bottom:0px; width:97%"/>
                    </td>
                    <td style="text-align:right; width:13%">
                    <label style="display:inline" for="cboMedicoCentralS"><b>NHC Externa</b>&nbsp;</label>
                    </td>
                     <td style="text-align:right; width:20%">
                    <input id="txtNhcExternaS" type="text" class="pull-left cantidad requerido" style="margin-bottom:0px; width:85px; text-align:center" name="11"/>
                    </td>
                   <td style="text-align:right; width:20%">
                      <span style="width:100px"><label style="display:inline" for="chkConPlacaS"><b>Estudio con Placa</b></label></span> <input type="checkbox" id="chkConPlacaS" style="margin-top:0px; margin-right:9px;"/>
                    </td>
                    </tr>
                    </table>
             </div>--%>

                    <div class="minicontenedor50" style="width:46%; margin-left:1%;">
                    <table>
                    <tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboTipoEstudioS"><b>Tipo de Estudio</b>&nbsp;</label>
                    <select id="cboTipoEstudioS" class="pull-right requerido" style="margin-bottom:0px">   
                    <option value="0">Seleccione</option>
            <option value="1">Pendientes</option>
            <option value="2">Citología no ginecológica</option>
            <option value="3">Histopatología</option>
                    </select>
                    </td>
                    </tr>
                    <tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboMedicoCentralS"><b>Médico Central</b>&nbsp;</label>
                    <select id="cboMedicoCentralS" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>
                    <tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboServicioS"><b>Servicio</b>&nbsp;</label>
                    <select id="cboServicioS" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>
                <%--    <tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboEspecialidadS"><b>Especialidad</b>&nbsp;</label>
                    <select id="cboEspecialidadS" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>--%>
                <%--<tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboMedicoExtS"><b>Médico Ext</b>&nbsp;</label>
                    <select id="cboMedicoExtS" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>--%>
                 <%--<tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboEspecialidadS"><b>Servicio Ext</b>&nbsp;</label>
                    <select id="cboServicioExts" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>--%>
                    <tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="txtCodigoDiagnosticoS"><b>Código Diagnóstico</b>&nbsp;</label>
                    <select id="cboCodigoDiagnosticoS" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>
                    </table>
                    </div>

                    <div class="minicontenedor50" style="width:46%; margin-left:0%; float:left">
                        <table style=" margin-left:9%">
                        <tr>
                        <td style="text-align:right">
                        <label style="display:inline" for="cboMaterialS"><b>Material</b>&nbsp;</label>
                        <select id="cboMaterialS" class="pull-right requerido" style="margin-bottom:0px"></select>
                        </td>
                        </tr>
                        <tr>
  <%--                      <td style="text-align:right">
                        <label style="display:inline; text-align:right" for="cboProcedimientoS"><b>Procedimiento</b>&nbsp;</label>
                        <select id="cboProcedimientoS" class="pull-right requerido" style="margin-bottom:0px"></select>
                        </td>--%>
                        </tr>
                        <tr>
 <%--                       <td style="text-align:right">
                        <label style="display:inline; text-align:right" for="cboMetodosS"><b>Método</b>&nbsp;</label>
                        <select id="cboMetodosS" class="pull-right requerido" style="margin-bottom:0px"></select>
                        </td>--%>
                        </tr>
                        <tr>
                        <td style="text-align:right">
                        <label style="display:inline" for="cboMedicoExtS"><b>Médico Ext</b>&nbsp;</label>
                        <select id="cboMedicoExtS" class="pull-right requerido" style="margin-bottom:0px"></select>
                        </td>
                        </tr>
                        <tr>
  <%--                      <td style="text-align:right">
                        <label style="display:inline; text-align:right" for="cboDiagnosticadoS"><b>Diagnosticado por</b>&nbsp;</label>
                        <select id="cboDiagnosticadoS" class="pull-right requerido" style="margin-bottom:0px"></select>
                        </td>--%>
                        </tr>
                        <tr>
                        <td style="text-align:right">
<%--                        <label style="display:inline; text-align:right" for="cboTecnicasEspecialesS"><b>Técnicas Especiales</b>&nbsp;</label>
                        <select id="cboTecnicasEspecialesS" class="pull-right requerido" style="margin-bottom:0px"></select>--%>
                     <label style="display:inline" for="cboEspecialidadS"><b>Servicio Ext</b>&nbsp;</label>
                    <select id="cboServicioExts" class="pull-right requerido" style="margin-bottom:0px"></select>
                        </td>
                        </tr>
                        <tr>
                        <td style="text-align:right">
<%--                       <label style="display:inline" for="txtCodigoNNS"><b>Código N.N</b>&nbsp;</label>
                        <select id="txtCodigoNNS" class="pull-right requerido" style="margin-bottom:0px"></select>--%>
                        <label style="display:inline; text-align:right" for="txtProtocoloS"><b>Protocolo N°</b>&nbsp;</label>
                        <input id="txtProtocoloS" type="text" class="pull-right numeroEntero requerido" style="margin-bottom:0px; text-align:center"/>
                        </td>
                        </tr>
                        </table>               
                        </div>

                        <div class="clearfix">
                        </div>
                 <%--   </div>--%>
                  
                    <div style="padding: 0px 15px 0px 15px;">
                       <%-- <div class="form-horizontal" style="margin-bottom: 5px; margin-top:5px; float: left; width:100%">--%>
           
                        <div class="clearfix"></div>
                        <div id="cargando" style="text-align:center; display:none">
                            <br /><br />
                            <img src="../img/Espere.gif" style="height:40px; width:40px"/><br />
                            Buscando...
                        </div>    
                           
                        <div id="TablaResultados" style="overflow: auto; font-size:12px; text-align:center; white-space:nowrap; height:50%"> 
                   <table id="tablaResultados"  class="display mano" cellspacing="0" width="100%"> 
                 
              <thead>					
                  <tr>
                    <th>&nbsp;</th>
                    <th>Fecha Ingreso</th>
                    <th>Paciente</th>
                    <th>Protocolo</th>

                    <th  class="txtDesdeSalidaS">Fecha Salida</th>
                    <th  class="txtDniS">Dni</th>
                    <th  class="txtNhc">NHC</th>
                    <th  class="txtSeccionalS">Seccional</th>
                    <th  class="txtNhcExterna">NHC Ext.</th>
                    <th  class="txtPacienteExterno">Paciente Ext.</th>
                    <th  class="cboTipoEstudioS">Tipo de Estudio</th>
                    <th  class="cboMedicoCentralS">Medico</th>
                    <th  class="cboServicioS">Servicio</th>
                    <th  class="cboEspecialidadS">Especialidad</th>
                    <th  class="cboMedicoExtS">Medico Ext.</th>
                    <th  class="cboServicioExts">Servicio Ext.</th>
                    <th  class="cboCodigoDiagnosticoS">Diagnosticos</th>
                    <th  class="cboMaterialS">Material</th>
                    <th  class="cboProcedimientoS">Procedimiento</th>
                    <th  class="cboMetodosS">Metodo</th>
                    <th  class="txtProtocoloS">Protocolo</th>
                    <th  class="cboTecnicasEspecialesS">Tecnicas ESpeciales</th>
                    <th  class="txtCodigoNNS">Nomenclador</th>
                  </tr>
                 </thead> 

                            </table>

                                                      <div id="sinResultados" style="text-align:center; display:none">
                            <br /><br />
                            <div>NO SE ENCONTRÓ NINGÚN RESULTADO</div>
                        </div>  
                        </div>
                       <%-- </div>--%>
                    </div>
                    <div class="clearfix">
                    </div>
                    <div class="pie_gris">
                        <div class="pull-right">
                         <a id="btnImprimirS" class="btn "><i class=" icon-print"></i>&nbsp;Imprimir</a>
                            <a id="btnBuscarS" class="btn btn-info"><i class=" icon-search"></i>&nbsp;Buscar</a>
                        </div>
                        <div style="width:40%; height:20px; margin-left:10px"><b>Cantidad:&nbsp;</b>
                        <input id="cantidadBusqueda" style="width:40px; background-color:#CEF6CE; text-align:center; font-weight:bold" disabled="disabled"/></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
   </div>
    </body>
</html>

<!-- Left and right controls -->
  <a class="left carousel-control success" href="#myCarousel" role="button" data-slide="prev">
    <i class="icon icon-chevron-left icon-white"  aria-hidden="true"  style="margin-top:10px; height:20px; width:20px"></i>
    <%--<span class="sr-only">Previous</span>--%>
  </a>
  <a class="right carousel-control success" href="#myCarousel" role="button" data-slide="next">
    <i class="icon icon-chevron-right icon-white" aria-hidden="true" style="margin-top:10px; height:20px; width:20px"></i>
    <%--<span class="sr-only">Next</span>--%>
  </a>


    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jQueryBlink.js" type="text/javascript"></script>
    <script src="../js/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/PrincipalAdministracion.js"  type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/PrincipalBusquedaPaciente.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/tecnicasEspeciales.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/Busqueda.js" type="text/javascript"></script>
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
<%--    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>--%>
 <%--   <script type="text/javascript" src="jquery.print.js"></script>--%>
     <script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>

    <% Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();

       if (!v.PermisoSM("159")) { Response.Write("<script>  $('.bloquear').attr('disabled',true); $('.bloquearBtn').remove(); </script>"); }
   %>


          <div id="ModalTraspasoProtocolo" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
  <div id="H2"></div>    
  </div>
  <div class="modal-body">
  <div>
  <%--<button class=" btn btn-navbar" style="color:Black">Interno</button><button class=" btn btn-navbar">Externo</button>--%>
   Paciente <input id="internoExterno" type="checkbox" checked  data-toggle="toggle" data-on="Interno <i class=' icon-arrow-right icon-black'></i>" data-off="Externo <i class='icon-arrow-left icon-black'></i>"  data-width="100" data-heigth="40" data-onstyle="default"/>

  </div>
    <div id="pregunta" class="interno">¿Desea pasar el protocolo Nº <label id="lblProtocoloReasignar" style="display:inline"></label> al NHC <input style="display:inline" type='text' class="input-medium numeroEntero" id="txtNuevaNHC" maxlength="10"/> ?</div>
    
    <div class="externo control-group" style="display:none; text-align:center">
    <label class="control-label">Seccional</label>
    <div class="controls"><select id="cboSeccionalChange"></select> </div>
    <label class="control-label">Paciente Externo</label>
    <div class="controls"><input type="text" id="pacienteChange"/></div>
    <label class="control-label numeroEntero">NHC</label>
    <div class="controls"><input type="text" id="NHCchange"/></div>
    </div>

  <div class="modal-footer">
    <button onclick="confirmarCambios()" class="btn btn-success" data-dismiss="modal" aria-hidden="true"><i class=" icon-edit icon-white"></i>&nbsp;Confirmar</button>    
    <button onclick="javascript:window.close();" class="btn btn-danger" data-dismiss="modal" aria-hidden="true"><i class="icon-remove-circle icon-white"></i>&nbsp;Cancelar</button> 
  </div>
   </div>
   </div>
     




  <div id="avisos" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
  <div id="Div7"></div>    
  </div>
  <div class="modal-body">
  
    
    <div class="externo control-group" style=" text-align:center">
    <label class="control-label" id="mensajes" style="font-size:x-large"></label>
    </div>

  <div class="modal-footer">
    <button id="btnAceptarMensaje" onclick="aceptar()" class="btn btn-success" data-dismiss="modal" aria-hidden="true"><i class=" icon-edit icon-white"></i>&nbsp;Aceptar</button>    
    <button id="btnCancelarMensaje" onclick="javascript:window.close();" class="btn btn-danger" data-dismiss="modal" aria-hidden="true"><i class="icon-remove-circle icon-white"></i>&nbsp;Cancelar</button> 
  </div>
   </div>
   </div>
      

 