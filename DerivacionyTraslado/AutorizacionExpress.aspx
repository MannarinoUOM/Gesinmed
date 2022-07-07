<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AutorizacionExpress.aspx.cs" Inherits="DerivacionyTraslado_AutorizacionExpress" %>

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


                                <div id="autorizaciones" style="height:530px; margin-top:50px">
            
                        <div id="Div1" style="height:670px;width:90%; margin:auto">
                <div class="resumen_datos" style="height: 80px; margin-bottom:5px; margin-top:5px">
                    <!--Datos del paciente-->
                    <div class="datos_paciente" style="width:100%">
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
                <div class="contenedor_3" style="height:342px; padding-top:5px;width:97%; margin-left:15px">
                    
                    <div>
                        <div class="contenedor_4" style="width:95%; height:40px; margin-bottom:5px; margin-left:2.5%">

                        <table style="width:100%">
                        <thead>
                        <tr>
                        <td style="width:10%; text-align:right"><label style="display:inline;"><b>Fecha</b> </label></td>        
                        <td style="width:25%"><input class="borrar input-medium fechas" type="text" id="txtFecha" style="margin-top:5px; text-align:center" disabled="disabled"/></td>
                        <td style="width:10%; text-align:right"><label style="display:inline"><b>Médico</b></label></td>
                        <td style="width:50%; text-align:left"><select id="cboMedico" style="width:91%; margin-bottom:4px" tabindex="7"></select></td>
                        </tr>
                        </thead>
                        </table>

                        </div>
                        <div class="clearfix">
                        </div>
                    </div>

                    <div class="contenedor_5" style="width:95%; height:225px ; text-align:center; margin-top:0px; margin-bottom:5px; margin-left:19px; margin-left:2.5%">

            <div class="modal-backdrop" style="width:100%; height:25px; background-position:center; position:inherit; background-color:Black; border-top-left-radius:10px; border-top-right-radius:10px">
            <label class="check inline" style="width:7%"></label>
            <label class="check inline" style="width:9%"><strong style="color:White; text-align:center">Código</strong></label><label class="check inline" style="width:52%; text-align:left"><strong style="color:White">Práctica</strong></label><label class="check inline" style="width:32%; text-align:left"><strong style="color:White">Médico</strong></label>
            </div> 

                         <div id="contieneTabla" class="contenedor_migue" style="overflow:auto; height:60px; border-radius:0px">
                                    <table id ="tablaPracticas" class="table tabbable" style="text-align:right; margin-bottom:4px; border-color:Black">

                                    </table>
                                    </div>
                                            <table style="width:100%;  margin-left:0%; margin-right:0%; margin-top:20px">
                                            <thead>
                                            <tr>
                                            <td style="width:15%; text-align:right"><b>Código Práctica</b></td>
                                            <td style="width:8%"><input id="txtCodigo" class="input-mini numero" type="text" style="margin-bottom:2px; text-align:center" maxlength="8" tabindex="9"/></td>
                                            <td style="width:8%; text-align:right"><b>Práctica</b></td>
                                            <td ><select id="cboPractica" style="width:94%;margin-bottom:2px" tabindex="11" class="pull-left"></select></td>
                                            </tr>

                                            <tr>
                                            <td style="width:2%"></td>
                                            <td style="width:10%">
                                            <button id="btnAgregar" class="btn btn-mini btn-success" style="margin-top:5px" tabindex="16">
                                            <i class=" icon-plus-sign icon-white"></i>&nbsp;Agregar</button>
                                            </td>
                                            <td>
                                            <b>E-Mail</b>
                                            </td>
                                            <td>

                                            <input id="email" type="text" class="input-large pull-left"/>

                                              <button id="btnScan" class="btn  btn-mini btn-success pull-left" style=" margin-top:5px; display:none">
                                            <i class=" icon-file icon-white"></i>&nbsp;Scanear</button>

                                            <button id="btnCancelarEdicion" class="btn  btn-mini btn-danger" style=" display:none;margin-top:5px">
                                            <i class=" icon-remove-circle icon-white"></i>&nbsp;Cancelar Edición</button>
                                            </td>                                          
                                            </tr>
                                            </thead>
                                            <tbody id="Tbody3">
                                                                            
                                            </tbody>
                                    </table>
                            <div>
                            
                            </div>
                    </div>
                    <div class="contenedor_4" style="width:95%; height:52px ; text-align:center; margin-top:0px; margin-left:2.5%">
                    <table style="width:100%">
                    <thead>

                    <tr>
                    <td style="width:15%; text-align:right" tabindex="16"><label style="margin-top:4px; margin-bottom:0px"><b>Observación</b></label></td>
                    <td style="width:90%; text-align:left""><input  class="pull-left" id="txtComentarios" type="text" style="margin-bottom:2px; width:94%; margin-left:00px; margin-top:10px" tabindex="17"/></td>
                    </tr>
                    <tr>

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
                             <td style="width:11%"><button id="btnVolver" class="btn btn-info" style=" text-align:left; margin-left:10%">
                               <i class=" icon-arrow-up icon-white"></i>&nbsp;Volver</button></td>

                                 <td style="width:10%"><button id="BtnBuscar" class="btn btn-info pull-left" style="text-align:center" >
                                 <i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
                                 </td>

                                 <td style="width:20%"><button id="btnCancelaredicion" class="btn btn-danger pull-left" style="text-align:center; display:none" >
                                 <i class="icon-remove-circle icon-white"></i>&nbsp;Cancelar Edición</button>
                                 </td>

                                <td style="width:60%"><button id="btnGuardar" class="btn btn-info pull-right" style="text-align:right" tabindex="22">
                                <i class=" icon-ok icon-white"></i>&nbsp;Guardar</button></td>
                                </tr>
                                </thead>
                                </table>
                    </div>
  
                </div>  
            </div>
        </div>
        </div>

</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jQueryBlink.js" type="text/javascript"></script>
<script src="../js/Hospitales/DerivacionyTraslado/AutorizacionExpress.js" type="text/javascript"></script>
<script src="../js/Hospitales/PhoneValidate.js" type="text/javascript"></script>