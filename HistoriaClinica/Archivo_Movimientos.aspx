<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Archivo_Movimientos.aspx.cs" Inherits="HistoriaClinica_Archivo_Movimientos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />


<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Archivo de Historias Clínicas</strong>";
</script> 


<link href="../css/barra.css" rel="stylesheet" type="text/css" />


</head>

<style type="text/css">
    .animacion {
       /*position: absolute;*/

  animation-name: parpadeo;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name:parpadeo;
  -webkit-animation-duration: 2s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes parpadeo{  
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

@-webkit-keyframes parpadeo {  
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
   100% { opacity: 1.0; }
}

@keyframes parpadeo {  
  0% { opacity: 1.0; }
   50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

#formulario {  
  width: 100px;
  height: 100px;
  background: pink;
}
</style>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>
<form id="form1" class="form-horizontal">
<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="height:440px;"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form class="form-horizontal" >
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
            <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black"></i></a> </div>
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
        
      </form>

      
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
                    <div class="titulo_seccion" style="display:inline;">
                        <img src="../img/2.jpg" />&nbsp;&nbsp;<span>Movimiento</span></div> 
                        <div style="display:inline;float:right; margin-right:20px;">Nro. Doc: <input id="txtDNI" type="text" maxlength="8" class="input-small numero"></div>  
                        <div style="display:inline;float:right; margin-right:20px;">NHC: <input type="text" id="NHC" name="NHC" maxlength="11" class="input-small numero"/></div>
                        <div id="tomo" style="display:none;float:right; margin-right:20px;">TOMO: <input type="text" id="txtTomo" name="tomo" maxlength="2" class="input-small numero" style="text-align:center"/>
                        <div style="width:50px; display:inline">
                            <img id="ok" src="../img/check.gif" width="20px" height="20" class="animacion"/><img id="error" src="../img/Icono_ERROR.gif" width="12px" heigth="12px" class="animacion"/>
                        </div>
                        <a class="btn" id="btnActualizarTomo">Guardar Tomo</a>
                        </div>                               
                    <div class="">
                        <div class="contenedor_4 pagination-centered">
                            <div class="combos">
                                <div id="Controlcbo_Origen" class="control-group" style="display:inline-block;">
                                <select id="cbo_Origen">
                                    <option value="0">Origen...</option>
                                </select>
                                </div>
                                <div id="Controlcbo_Destino" class="control-group" style="display:inline-block;">
                                <select id="cbo_Destino">
                                    <option value="0">Destino...</option>
                                </select>
                                </div>
                                <input type="hidden" id="usuarioId" value="0" />
                                <input type="hidden" id="usuario" value="" />
                            </div>
                        </div>
                        <div class="contenedor_4">
                            <div class="combos_2 pagination-centered" style="margin-bottom: 10px;">
                                <label for="txtObservaciones" class="label">Observaciones</label>
                                <textarea id="txtObservaciones" maxlength="100" class="input-large" placeholder="Observaciones"></textarea><br />
                                <a id="btnLimpiar" class="btn btn-mini btn-danger" style="margin-left:-200px; margin-top:5px;">Limpiar</a> 
                                <div class="clearfix">
                                </div>
                            </div>
                            <div class="pagination-centered" style="margin: 10px 0px 0px 30px;">
                                    <a id="btnAgregar" style="display:none;" class="btn btn-success">Agregar</a>
                                    <a id="btnCancelar" style="display:none;" class="btn btn-danger">Cancelar</a>
                            </div>
                        </div>
                        <div class="clearfix">
                        </div>
                    </div>
                    <!--Tabla de estudios-->
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaPracticas" class="tabla" style="height: 210px; width: 880px; font-size:12px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Fecha de Movimiento
                                        </th>
                                        <th>
                                            Origen
                                        </th>
                                        <th>
                                            Destino
                                        </th>
                                        <th>
                                            Usuario
                                        </th>
                                          <th>
                                            Observaciones
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        </form>
                        </div>
                                          <div class="clearfix">
                    </div>
                        <div class="pie_gris">
                            <div class="box_informativo_a pull-left"><div style="padding-top:3px"><strong id="Total">MOVIMIENTOS: 0</strong></div> </div>
                            <div class="pull-right">
                                <a id="btnHistorial" class="btn"><i class="icon-file"></i>&nbsp;Ver Historial</a>
                                <a id="btnImprimir" class="btn btn-info">
                                    <i class=" icon-print icon-white"></i>&nbsp;Imprimir Movimientos</a>
                            </div>
                        
                        
                    </div>
  
                </div>
            </div>

  </div>
</div>
</form>
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
<script src="../js/Hospitales/HistoriaClinica/Archivo_Movimientos.js" type="text/javascript"></script>
<!--Barra sup--> 
</body>
</html>
