<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargarPedido.aspx.cs" Inherits="Legales_CargarPedido" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />


<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Legales > <strong>Cargar Pedido</strong>";
</script> 


<link href="../css/barra.css" rel="stylesheet" type="text/css" />


</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>
<div id="form1" class="form-horizontal">
<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="height:440px;"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <div class="form-horizontal" >
       <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC">
                      </select>          
                   </div>
        </div>
        <div class="control-group" id="Controltxt_dni">
          <label class="control-label">DNI</label>
          <div class="controls">
            <input id="txt_dni" name="txt_dni" type="text" maxlength="8" placeholder="Ingrese el DNI sin puntos">
            <input id="txtdocumento" type="hidden" />
            <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
            <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn" style="diplay:none;"><i class="icon-calendar icon-black"></i></a> 
            <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
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
            <input id ="txtPaciente" maxlength="60" placeholder="Apellido Nombre"type="text" class="span3">
            <a id="btnBuscarPaciente" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>
        <div id="controlTelefono" class="control-group">
          <label class="control-label">Teléfono</label>
          <div class="controls">
            <input id="txtTelefono" maxlength="13" placeholder="Ej. 43625910" type="text">
          </div>
        </div>
        <div id="controlSeccional" class="control-group">
        
          <label class="control-label" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" value="998"/>
          
              <select id="cboSeccional">
                <option value="0">Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" style="display:none;"></select>          

           </div>

        </div>
         <div id="control" class="control-group">
          <label class="control-label">Afiliado UOM</label>
          <div class="controls">
            <input id="chkEsUOM" type="checkbox"  style="margin-top:8px;" checked/>
          </div>
        </div>
        
      </div>

      
      <div class="control-group pagination-centered">
          <div> 
                <a class="btn btn-danger" href="Archivo_Movimientos.aspx" id="btnCancelarPedidoTurno" style="display:none;">Cancelar</a>
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a>
          </div>
       </div>

    </div>
    

    <div class="clearfix">
            </div>
            <div id="hastaaqui">
                
                <div class="resumen_datos" style="height: 80px;">
                    <!--Datos del paciente-->
                    <div class="datos_paciente">
                        <div>
                            <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
                        <div class="datos_resumen_paciente" style="font-size:12px;">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                            <div>
                                <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>                                
                            </div>
                            <div>
                                <span id="span_Discapacidad" style=" color:#0099CC; font-weight:bold;"></span>
                                <span id="span_Estudiante"></span>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
                    </div>
                </div>
                <div class="contenedor_3">
                <div>          
                    <ul class="nav nav-tabs tabslist" data-tabs="tabs">
                      <li class="active"><a data-toggle="tab" href="#tab1">Pedido</a></li>
                      <li id="tab_mostrarAdjuntos" style="display:none;"><a data-toggle="tab" href="#tab3">Ver Adjuntos</a></li>
                      <li id="tab_adjuntos" style="display:none;"><a data-toggle="tab" href="#tab2">Subir Adjuntos</a></li>
                    </ul>
                </div>
                    <div id="my-tab-content" class="tab-content tabslist"> <!--Div Tabs-->
                        <div class="tab-pane active fade in DP" id="tab1"> <!--Div Tab Pedido-->
                            <div class="form-horizontal">
                                <div class="control-group">
                                  <label class="control-label">Fecha</label>
                                  <div class="controls">
                                        <input type="text" id="txtFecha" class="span2" />
                                  </div>
                                </div>
                                <div class="control-group">
                                  <label class="control-label">Tipo Requerimiento</label>
                                  <div class="controls">
                                        <select id="cbo_Req" class="span7">
                                        </select>
                                  </div>
                                </div>
                                <div class="control-group">
                                  <label class="control-label">Pedido por</label>
                                  <div class="controls">
                                        <input type="text" id="txtPedidopor" class="span7" />
                                  </div>
                                </div>
                                <div class="control-group">
                                  <label class="control-label">Respuesta Nota Nro.</label>
                                  <div class="controls">
                                        <input type="text" id="txtNroNota" class="span7" />
                                  </div>
                                </div>
                                <div class="control-group">
                                  <label class="control-label">Observaciones</label>
                                  <div class="controls">
                                        <input type="text" id="txtObservaciones" class="span7" />
                                  </div>
                                </div>
                                <div class="control-group" style="margin-left:-90px;">
                                 
                                  <div class="controls" style="display:inline;">Es Secuestro
                                        <input type="checkbox" id="chkEsSecuestro" style="display:inline; margin-top:-3px;"/>
                                  </div>
                                  
                                  <div class="controls" style="display:inline;">Es Obito
                                        <input type="checkbox" id="chk_EsObito" style="display:inline; margin-top:-3px;"/>
                                  </div>
                                  
                                  <div class="controls" style="display:inline;">ART
                                        <input type="checkbox" id="chk_ART" style="display:inline; margin-top:-3px;"/>
                                  </div>
                                </div>
                            </div>
                        </div>
          <div class="tab-pane fade in DP" id="tab2"> <!--Div Tab Adjuntos-->
          <form runat="server" action="" style="margin-left:20px;">
              <input id="id_Requerimiento" type="hidden" runat="server"/> <!--Guardo el numero de requerimiento -->
              <div>
                <asp:FileUpload ID="File_NHC" runat="server" AllowMultiple="true" />
                <asp:Button ID="btnSubirFile_NHC" runat="server" Text="Subir" 
                    onclick="btnSubir_Click" UseSubmitBehavior="false"/>
                <br />
                <p id="lbl_File_NHC" runat="server" style="font-weight:bold; color: Green;"></p>
                <br />
            </div>
            </form>
          </div> <!--FIN Div Tab Adjuntos-->
          <div class="tab-pane fade in DP" id="tab3"> <!--Div Tab Ver Adjuntos-->
            <div id="fotos" style="height:300px; max-height:300px; overflow:auto;">
            </div>
          </div> <!--FIN Div Ver Adjuntos-->


         <!--FIN Div Tabs-->           
         </div>
                


                    <div class="clearfix">
                    </div>
                        <div class="pie_gris">
                            <div class="pull-right">
                                <a id="btnVolver" class="btn"><i class="icon-arrow-left"></i>&nbsp;Volver</a>
                                <a id="btnBaja" class="btn btn-danger" style="display:none;"><i class="icon-trash"></i>&nbsp;Eliminar</a> 
                                <a id="btnConfirmar" class="btn btn-info">
                                    <i class="icon-ok icon-white"></i>&nbsp;Confirmar Pedido</a>
                            </div>
                        
                        
                    </div>
                  </div>
                </div>
            </div>

  </div>
</div>
<!--Pie de pagina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.validate.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/ObraSociales/ObraSociales.js" type="text/javascript"></script>
<script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>
<script src="../js/Hospitales/Legales/CargarPedido.js" type="text/javascript"></script>
<!--Barra sup--> 
</body>
</html>
