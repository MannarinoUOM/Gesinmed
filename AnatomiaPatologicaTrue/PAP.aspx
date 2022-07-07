 <%@ Page Language="C#" AutoEventWireup="true" CodeFile="PAP.aspx.cs" Inherits="AnatomiaPatologicaTrue_PAP" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
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
    <%--<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet"/>--%>
    <link href="../css/Nutricion.css" rel="stylesheet" type="text/css" />
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
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top:0px; width:82%; height:800px">
        <div class="contenedor_1" style="width:90%; height:700px; padding-top:10px;margin-left:auto; margin-right:auto; display:block" id="derivaciones">
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
                        <input id="txt_dni" type="text" placeholder="Nro. de documento sin puntos"  tabindex="1"  class="interno bloquear" />
                        <input id="txtdocumento" type="hidden" />
                        <input id="afiliadoId" value="" class="ingreso" 
                        type="hidden"
                        />
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
                <div class="control-group">
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
                        <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn interno bloquearBtn" style="display:inline"><i class="icon-search icon-black">
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
        
          <label class="control-label" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" />
          
              <select id="cboSeccional" class=" bloquear">
                <option value="0" >Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" style="display:none;"></select>          

           </div>

        </div>

                <div id="Div4" class="control-group" style="display:none">
        
          <label class="control-label" for="txtPacienteExterno">Paciente Externo</label>
          <div class="controls">
          
          <input type="text" id="txtPacienteExterno" class="externo bloquear" placeholder="Apellido Nombre"/>
          <div id="sugerencias" style="position:absolute; z-index:3;left:60%; top:50%; padding:2px 2px 2px 2px; width:20%; display:none; text-align:center; border: 1px solid #E6E6E6; background-color:White; overflow:auto" class="sombra" >
          <table id="resultados" style="text-align:center; margin:auto; overflow:auto" class="table table-hover"></table></div>
           </div>
        </div>

          <div id="Div5" class="control-group" style="display:none">
        
          <label class="control-label" for="txtNhcExterna">NHC Externa</label>
          <div class="controls">
          
          <input type="text" id="txtNhcExterna" class="externo bloquear" placeholder="Ej: 99123456789"/>
         
           </div>
        </div>
                </form>
                <div class="control-group" style="text-align:center">
                    <div class="controls pagination-centered"> 
                        <a class="btn btn-danger"  id="btnCancelarPedidoTurno" style="display: none; margin-left:15%">
                            Otro Paciente</a> <a class="btn" id="btnactualizar" style="display: none;" class=" bloquearBtn">Actualizar</a>
                        <a id="desdeaqui" style="display: none; text-align:center" class="btn btn-info bloquearBtn">Siguiente</a>
                    </div>
                </div>
            </div>
            <div class="clearfix">
            </div>
            <div id="hastaaqui">

                                <div id="autorizaciones" style="height:530px; margin-top:10px">
            
                        <div id="Div1" style="height:670px;width:100%; margin:auto">
                <div class="resumen_datos" style="height: 70px; margin-bottom:5px; margin-top:5px">
                    <!--Datos del paciente-->
                    <div class="datos_paciente" style="width:100%">
                        <div>
                            <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
                        <div class="datos_resumen_paciente" style=" margin-top:5px">
                            <div style=" margin-bottom:10px">
                                Paciente: <strong><span id="CargadoApellido"></span><span class="ocultar">(<span id="CargadoEdad"></span>)</span></strong>
                                <a href="javascript:VerMas();" class="ver_mas_datos ocultar">Ver más</a>
                                </div>
                            <span class="ocultar">DNI: <strong><span id="CargadoDNI" class="ocultar"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span class="derecha">NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span class="ocultar">Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                            <div style=" margin-top:10px">
                               <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong> 
                              
                            </div>

                           
                        </div>
                             <div style="float:right; position:static; margin-top:3%">
<%--                                <span id="span_Titular">Titular:</span> <strong><span id="CargardoTitular"></span></strong>
                                <span id="span_Estudiante"></span>--%>
                                
                            </div>
                    </div>
                    <!--Datos del medico-->

                    <div class="clearfix">
                    </div>
                    </div>
                <div class="contenedor_3" style="height:585px; padding-top:5px;width:97%; margin-left:15px">
                    
                    <div>
                        <div class="clearfix">
                        </div>
                    </div>

            <div class="contenedor_5" style="width:95%; height:330px ; text-align:center; margin-top:0px; margin-bottom:5px; margin-left:19px; margin-left:2.5%">
            <div class="contenedor_migue" style="margin-bottom:1%">

            <table style="width:100%; margin-bottom:3px">
             <tr>
            <td style="width:20%; text-align:right"><label style="display:inline" class="fechaHoy"><b>Fecha de Ingreso&nbsp;</b></label></td>
            <td style="width:75%">
            <input type="text" style="margin-bottom:0px; width:10%; text-align:center" id="txtFechaIngreso" class="fechaHoy cambio bloquear pull-left"/>
            <label style="display:inline; margin-top:0.5%; margin-left:3%" class="pull-left"><b>Protocolo Nº&nbsp;</b></label>
            <input type="text" style="width:10%; text-align:center; margin-bottom:0px; margin-right:0%; font-size:x-large" id="txtProtocolo" class="numeroEntero cantidad restablecer cambio bloquear pull-left" name="6"/>
            <label style="display:inline; margin-left:16%"><b>Servicio&nbsp;</b></label>
            <select style="width:38%; margin-bottom:0px; display:inline" id="cboSalaPeriferica" class="restablecer cambio bloquear pull-right"></select>
            </td>
            <td style="width:5%">
            <%--<input type="button" class=" btn btn-mini"/>--%>
            </td>
            </tr>

             <tr>          
            <td style="width:20%; text-align:right"><label style="display:inline"><b>Médico Central&nbsp;</b></label></td>
            <td style="width:75%; text-align:left"><select style="width:38%; margin-bottom:0px" id="cboMedicoCentral" class="restablecer cambio bloquear"></select>
            <label style="display:inline; margin-left:9%"><b>Médico Externo&nbsp;</b></label>
            <select style="width:38%; margin-bottom:0px" id="cboMedicoExterno" class="restablecer cambio bloquear pull-right"></select>
            </td>
            <td style="width:5%">
         <%--   <input type="button" class=" btn btn-mini"/>--%>
            </td>
            </tr>

            <tr>           
            <td style="width:20%; text-align:right"><label style="display:inline" class="pull-rigth"><b>Adecuación de la muestra&nbsp;</b></label></td>
            <td style="width:75%; text-align:left">
          <%--  <select style="width:91%; margin-bottom:0px" id="cboMuestraAdecuacion" class="restablecer cambio bloquear"></select><a id="btnNuevoMaterial" class="btn btn-mini" style="display:none">Nuevo...</a>--%>
              <input type="text" style="width:98.5%; margin-bottom:0px" id="cboMuestraAdecuacion" class="restablecer cambio bloquear manito" placeholder="Seleccione" />
            </td>
            <td style="width:5%">
         <%--   <input type="button" class=" btn btn-mini"/>--%>
            </td>
            </tr>
            <tr>
            
            <td style="width:20%; text-align:right"><label style="display:inline" class="pull-rigth"><b>Categoría general&nbsp;</b></label></td>
            <td style="width:75%; text-align:left"><select style="width:100%; margin-bottom:0px" id="cboCategoriaGeneral" class="restablecer cambio bloquear"></select>
            <td style="width:5%">
            <%--<input type="button" class=" btn btn-mini"/>--%>
            </td>
            </tr>
            </table>

            <div style="width:100%; height:30px; background-color:Black"><span style="color:White; font-size:x-large"><b>Interpretación/Resultado</b></span></div>

            <table style="width:100%; margin-bottom:3px; margin-top:3px">
            <tr>
            <td style="width:20%; text-align:right"><label style="display:inline"><b>Flora&nbsp;</b></label></td>
            <td style="width:75%"><select style="margin-bottom:0px" class="pull-left cambio bloquear" id="cboFlora"></select>
            <%--</select><label style="display:inline; margin-left:7%"><b>Microorganismos</b></label><select style="margin-bottom:0px; width:50%" class="pull-right cambio bloquear" id="cboMicroorganismos"></select>--%>
           <label style="display:inline; margin-left:7%"><b>Microorganismos</b></label><input type="text" style="width:49%; margin-bottom:0px" id="cboMicroorganismos" class="restablecer cambio bloquear manito pull-right" placeholder="Seleccione" />
            </td>
            <td style="width:5%">
            <%--<input type="button" class=" btn btn-mini"/>--%>
            </td>
            </tr>
            <tr>
            <td style="width:20%; text-align:right"><label style="display:inline"><b>Hallazgos no Neoplásicos&nbsp;</b></label></td>
            <td style="width:75%">
            <%--<select style="width:100%;  margin-bottom:0px" class="pull-left cambio bloquear" id="cboHallazgos"></select>--%>
             <input type="text" style="width:98.5%; margin-bottom:0px" id="cboHallazgos" class="restablecer cambio bloquear manito" placeholder="Seleccione" />
            </td>
            <td style="width:5%">
            <%--<input type="button" class=" btn btn-mini"/--%>
            </td>
            </tr>
            </table>

            <div style="width:100%; height:30px; background-color:Black"><span style="color:White; font-size:x-large"><b>Anomalías de células epiteliales</b></span></div>

            <table style="width:100%; margin-bottom:3px; margin-top:3px">
            <tr>
            <td style="width:25%; text-align:right">
            <label style="display:inline"><b>Anomalías de células escamosas&nbsp;</b></label>
            </td>
            <td style="width:70%">

            <%--<select style="width:100%;  margin-bottom:0px" class="pull-left cambio bloquear" id="cboCelulasEscamosas"></select>--%>

            <input type="text" style="width:98.5%;  margin-bottom:0px" class="pull-left restablecer cambio bloquear manito" id="cboCelulasEscamosas" placeholder="Seleccione" />

            </td>
                  <td style="width:5%">
            <%--<input type="button" class=" btn btn-mini"/--%>
            </td>
            </tr>
            <tr>
            <td style="width:25%; text-align:right">
            <label style="display:inline"><b>Anomalías de células glandulares&nbsp;</b></label>
            </td>
            <td style="width:70%">
            <select style="width:100%;  margin-bottom:0px" class="pull-left cambio bloquear" id="cboCelulasGlandulares"></select></td>
                   <td style="width:5%">
            <%--<input type="button" class=" btn btn-mini"/--%>
            </td>
            </tr>
            </table>

            <div style="width:100%; height:30px; background-color:Black"><span style="color:White; font-size:x-large"><b>Valoración hormonal</b></span></div>

            <table style="width:100%; margin-top:3px">
            <tr>
            <td style="width:20%">
            <label style="display:inline" class="pull-right"><b>Valoración hormonal&nbsp;</b></label>
            </td>
            <td style="width:75%">
            <select style="width:100%;  margin-bottom:0px" class="pull-left cambio bloquear" id="cboValoracionHormonal"></select></td>
            <td style="width:5%">
            <%--<input type="button" class=" btn btn-mini"/>--%>
            </td>
            </tr>
            </table>
</div>

                                            <div style="width:100%; text-align:right">
                                            <label style="display:inline; margin-top:0%; margin-left:80PX" for="chkTecnicasEspeciales"><b>Comentario&nbsp;</b></label>
                                            <textarea style="width:69.5%; margin-right:4px; margin-left:0px; margin-right:9%; height:50px; display:inline" class="pull-right restablecer cambio bloquear" id="txtComentario" ></textarea>
                                            </div>

                                            <table style="width:100%;  margin-left:0%; margin-right:0%; margin-top:20px">
                                            <tr>
                                            <td style="width:1%"></td>
                                            <td style="width:40%; text-align:right"><label for="chkReceptores" style="display:inline"><b>Fecha de diagnóstico&nbsp;</b></label><input type="text" id="txtFechaDiagnostico" style="margin-bottom:0px; margin-top:0px; display:inline; text-align:center" class="fecha restablecer cambio bloquear"/></td>
                                            <td style="width:10%"></td>
                                            <td style="width:40%; text-align:right"><label style="display:inline"><b>Fecha de entrega&nbsp;</b></label><input id="txtFechaEntrega" type="text" style="margin-bottom:0px; text-align:center; width:54%" class="fecha restablecer cambio bloquear" name="2"/></td>
                                            <td style="width:10%"></td>                                        
                                            </tr>
                                            <tr>
                                            <td style="width:1%"></td>
                                            <td style="width:40%; text-align:right"><label for="chkPlaca" style="display:inline"><b>Fecha de notificación&nbsp;</b></label><input id="txtFechaNotificacion" type="text" style="text-align:left;margin-bottom:0px; margin-top:0px; display:inline; text-align:center" class="restablecer fecha cambio bloquear"/></td>
                                            <td style="width:10%"></td>                                                                                      
                                            <td style="width:40%; text-align:right"><label style="display:inline"><b>Diagnosticado por&nbsp;</b></label><select id="cboDiagnosticador" class="restablece cambio bloquear" style="text-align:center; width:57%;margin-bottom:0px; margin-top:0px" name="2"></select></td>
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
                             <td style="width:10%"><button id="btnVolver" class="btn btn-info bloquearBtn" style=" text-align:left; margin-left:1%">
                               <i class=" icon-arrow-left icon-white"></i>&nbsp;Volver</button></td>
<%--
                                 <td style="width:10%"><button id="btnBuscar" class="btn btn-info pull-left bloquearBtn" style="text-align:center; display:none" >
                                 <i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
                                 </td>--%>

                                 <td style="width:30%">
                                 <button id="btnViejo" class="btn pull-left bloquearBtn" style="text-align:center" >
                                 <i class=" icon-list icon-black"></i>&nbsp;Ver Estudios Axion Care</button>
                                 <button id="btnTraspaso" class="btn btn-warning" style=" text-align:left; margin-left:1%; display:none">
                               <i class=" icon-adjust icon-white"></i>&nbsp;Traspaso Protocolo</button>
                                 </td>

                                <td style="width:50%">
                                <button id="btnBorrar" class=" btn btn-danger" style="text-align:right; display:none; margin-left:50%">
                                <i class=" icon-remove-circle"></i>&nbsp;Borrar</button>
                                <button id="btnInprimir" class=" btn" style="text-align:right; display:inline; margin-left:0%" >
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
    <div class="container" style="padding-top: 30px; width:100%">
        <div class="contenedor_1" style="width:90%; margin-left:auto; margin-right:auto">
            <div class="clearfix">
            </div>
            <div id="Div3" style="display: inline;">
                <div class="contenedor_3" style="height:700px; width:72%; margin-left:14%">
                    <div class="">
 
                    <%--<div class="row_2"><span style="margin-left:20%"><b>Fecha de Ingreso</b></span><span style="margin-left:3%"><b>Fecha de Salida</b></span></div>--%>
                    <div style="width:46%; height:10%; text-align:center; margin-left:1%; position:relative" class="minicontenedor50">
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
                    
                    <div style="width:46%; height:10%; text-align:center; margin-right:2%; margin-left:0%; float:right" class="minicontenedor50">
                    <table style="width:100%">
                    <tr style="text-align:center"><thead><span><b>FECHA DE ENTREGA</b></span></thead></tr>
                    <tr>
                    <td style="text-align:right; width:15%">
                    <label style="display:inline" for="txtDesdeEntregaS"><b>Desde</b>&nbsp;</label>
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
                    </table>
                    </div>

                     <div style="width:46%; height:10%; text-align:center; margin-right:20px; margin-left:0%; margin-top:3px; float:right" class="minicontenedor50">
                    <table style="width:100%">
                    <tr style="text-align:center"><thead><span><b>FECHA DE DIAGNÓSTICO</b></span></thead></tr>
                    <tr>
                    <td style="text-align:right; width:15%">
                    <label style="display:inline" for="txtFechaDiagnosticoDesdeS"><b>Desde</b>&nbsp;</label>
                    </td>
                     <td style="text-align:right; width:45%">
                    <input id="txtFechaDiagnosticoDesdeS" type="text" class="pull-left desde2 validarFecha requerido" style="margin-bottom:0px; width:82px; text-align:center"/>
                    </td>
                    <td style="text-align:right; width:15%">
                    <label style="display:inline" for="txtFechaDiagnosticoHastaS"><b>Hasta</b>&nbsp;</label>
                    </td>
                     <td style="text-align:right; width:35%">
                    <input id="txtFechaDiagnosticoHastaS" type="text" class="pull-left hasta2 validarFecha requerido" style="margin-bottom:0px; width:81px; text-align:center"/>
                    </td>
                    </tr>
                    </table>
                    </div>

                    <div style="width:46%; height:10%; text-align:center; margin-right:9px; margin-left:0%; margin-top:3px; float:right" class="minicontenedor50">
                    <table style="width:100%">
                    <tr style="text-align:center"><thead><span><b>FECHA DE NOTIFICACIÓN</b></span></thead></tr>
                    <tr>
                    <td style="text-align:right; width:15%">
                    <label style="display:inline" for="txtFechaNotificacionDesdeS"><b>Desde</b>&nbsp;</label>
                    </td>
                     <td style="text-align:right; width:45%">
                    <input id="txtFechaNotificacionDesdeS" type="text" class="pull-left desde2 validarFecha requerido" style="margin-bottom:0px; width:82px; text-align:center"/>
                    </td>
                    <td style="text-align:right; width:15%">
                    <label style="display:inline" for="txtFechaNotificacionHastaS"><b>Hasta</b>&nbsp;</label>
                    </td>
                     <td style="text-align:right; width:35%">
                    <input id="txtFechaNotificacionHastaS" type="text" class="pull-left hasta2 validarFecha requerido" style="margin-bottom:0px; width:81px; text-align:center"/>
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

                            <div style="width:46%; height:10%; text-align:center; margin-right:2%; margin-left:0%; margin-top:3px; margin-bottom:4px; float:right" class="minicontenedor50">
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
                        </div>


                    <div style="width:95%; height:5%; text-align:center; margin-right:2%; margin-left:0%; margin-bottom:4px; float:right" class="minicontenedor50">
                
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
                      <span style="width:100px; display:none"><label style="display:inline" for="chkConPlacaS"><b>Estudio con Placa</b></label></span> <input type="checkbox" id="chkConPlacaS" style="margin-top:0px; margin-right:9px; display:none"/>
                    </td>
                    </tr>
                    </table>
             </div>

                    <div class="minicontenedor50" style="width:46%; margin-left:1%;">
                    <table>
                    <tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboMedicoInternoS"><b>Médico Interno</b>&nbsp;</label>
                    <select id="cboMedicoInternoS" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>
                    <tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboMuestraAdecuacionS"><b>Adecuación de la muestra</b>&nbsp;</label>
                    <select id="cboMuestraAdecuacionS" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>
                    <tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboCategoriaGeneralS"><b>Categoría general</b>&nbsp;</label>
                    <select id="cboCategoriaGeneralS" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>
                    <tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboSalaPerifericaS"><b>Servicio o sala periférica</b>&nbsp;</label>
                    <select id="cboSalaPerifericaS" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboHallazgosS"><b>Hallazgos no neoplásicos</b>&nbsp;</label>
                    <select id="cboHallazgosS" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>
                    <tr>
                    <td style="text-align:right">
                    <label style="display:inline" for="cboMicroorganismosS"><b>Microorganismos</b>&nbsp;</label>
                    <select id="cboMicroorganismosS" class="pull-right requerido" style="margin-bottom:0px"></select>
                    </td>
                    </tr>
                    <tr>
                    <td style="text-align:right">

                    </td>
                    </tr>
                    </table>
                    </div>

                    <div class="minicontenedor50" style="width:46%; margin-left:0%">
                        <table style=" margin-left:9%">
                        <tr>
                        <td style="text-align:right">
                        <label style="display:inline" for="cboMedicoExternoS"><b>Médico Externo</b>&nbsp;</label>
                        <select id="cboMedicoExternoS" class="pull-right requerido" style="margin-bottom:0px"></select>
                        </td>
                        </tr>
                        <tr>
                        <td style="text-align:right">
                        <label style="display:inline" for="cboCelulasGlandularesS"><b>Células glandulares</b>&nbsp;</label>
                        <select id="cboCelulasGlandularesS" class="pull-right requerido" style="margin-bottom:0px"></select>
                        </td>
                        </tr>
                        <tr>
                        </tr>
                        <tr>
                        <td style="text-align:right">
                        <label style="display:inline; text-align:right" for="cboValoracionHormonalS"><b>Valoración hormonal</b>&nbsp;</label>
                        <select id="cboValoracionHormonalS" class="pull-right requerido" style="margin-bottom:0px"></select>
                        </td>
                        </tr>
                        <tr>
                        <td style="text-align:right">
                        <label style="display:inline; text-align:right" for="txtProtocoloS"><b>Protocolo N°</b>&nbsp;</label>
                        <input id="txtProtocoloS" type="text" class="pull-right numeroEntero requerido" style="margin-bottom:0px; text-align:center" maxlength="6"/>
                        </td>
                        </tr>
                        <tr>
                        <td style="text-align:right">
                        <label style="display:inline; text-align:right" for="cboDiagnosticadorS"><b>Diagnosticador</b>&nbsp;</label>
                        <select id="cboDiagnosticadorS" class="pull-right requerido" style="margin-bottom:0px"></select>
                        </td>
                        </tr>
                        <tr>
                        <td style="text-align:right">
                                            <label style="display:inline" for="cboCelulasEscamosasS"><b>Células Escamosas</b>&nbsp;</label>
                    <select id="cboCelulasEscamosasS" class="pull-right requerido" style="margin-bottom:0px"></select>
                        </td>
                        </tr>
                        <tr>
                        <td style="text-align:right">
                       
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
                        <div id="TablaResultados" style="overflow: auto; font-size:12px; text-align:center; white-space:nowrap; height"> 
                   <table id="tablaResultados"  class="display mano" cellspacing="0" width="100%"> 
                 
              <thead>					
                  <tr>
                    <th>&nbsp;</th>
                    <th>Fecha Ingreso</th>
                    <th>Paciente</th>
                    <th>Protocolo</th>

                    <th  class="txtDesdeSalidaS">Fecha Entrega</th>
                    <th  class="txtFechaNotificacionDesdeS">Fecha Notificaciòn</th>
                    <th  class="txtFechaDiagnosticoDesdeS">Fecha Diagnostico</th>
                    <th  class="txtDniS">Dni</th>
                    <th  class="txtNhc">NHC</th>
                    <th  class="txtSeccionalS">Seccional</th>
                    <th  class="cboMedicoInternoS">Médico Interno</th>
                    <th  class="cboMuestraAdecuacionS">Adecuacion de la Muestra</th>
                    <th  class="cboCategoriaGeneralS">Categoria General</th>
                    <th  class="cboSalaPerifericaS">Servicio</th>
                    <th  class="cboHallazgosS">Hallazgos no neoplasticos</th>
                    <th  class="cboMicroorganismosS">Microorganismos</th>
                    <th  class="cboMedicoExternoS">Médico Externo</th>
                    <th  class="cboCelulasGlandularesS">Celulas Glandulares</th>
                    <th  class="cboValoracionHormonalS">Valoracion Hormonal</th>
                    <th  class="cboDiagnosticadorS">Diagnosticador</th>
                    <th  class="cboCelulasEscamosasS">Celulas Escamosas</th>
                  </tr>
                 </thead> 
                            </table>
                        </div>
                       <%-- </div>--%>
                    </div>
                    <div class="clearfix">
                    </div>
                    <div class="pie_gris">
                        <div class="pull-right">
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
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/PAP_PrincipalAdministracion.js"  type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/PAP_PrincipalBusquedaPaciente.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/PAP_Busqueda.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/adecuacionMuestra.js" type="text/javascript"></script>
    <%--<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>--%>
    <script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>

        <% Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();

       if (!v.PermisoSM("159")) { Response.Write("<script>  $('.bloquear').attr('disabled',true); $('.bloquearBtn').remove(); </script>"); }
   %>


             <div id="ModalTraspasoProtocolo2" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
  <div id="H2"></div>    
  </div>
  <div class="modal-body">
  <div>
  <%--<button class=" btn btn-navbar" style="color:Black">Interno</button><button class=" btn btn-navbar">Externo</button>--%>
   Paciente <input id="internoExterno2" type="checkbox" checked  data-toggle="toggle" data-on="Interno <i class=' icon-arrow-right icon-black'></i>" data-off="Externo <i class='icon-arrow-left icon-black'></i>"  data-width="100" data-heigth="40" data-onstyle="default"/>

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
    
