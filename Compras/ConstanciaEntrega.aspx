<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ConstanciaEntrega.aspx.cs" Inherits="Compras_ConstanciaEntrega" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />


<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Derivaciones > <strong>Constancia de Entrega</strong>";
</script> 


<link href="../css/barra.css" rel="stylesheet" type="text/css" />


</head>

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
          
          <input type="hidden" id="SeccionalId" value="0"/>
          
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
                                Paciente: <strong><span id="CargadoApellido" class="encabezado"></span> (<span id="CargadoEdad" class="encabezado"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI" class="encabezado"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC" class="encabezado"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>Teléfono: <strong><span id="CargadoTelefono" class="encabezado"></span></strong></span>
                            <div>
                                <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional" class="encabezado"></span></strong>                                
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
                      
                    <div style="display:inline;float:right; margin-right:20px;">Hasta: <input id="txtFechaHasta" type="text" maxlength="10" class="input-small date"/></div>
                    <div style="display:inline;float:right; margin-right:20px;">Desde: <input id="txtFechaDesde" type="text" maxlength="10" class="input-small date"/></div>    
                    <div class="">
                        <div class="contenedor_4 pagination-centered" style="margin-top: 40px;">
                            <div class="combos" style="margin-left:20px;margin-bottom: 5px;">
                                <div id="ControltxtDNI" class="control-group" style="display:inline-block;margin-bottom: 5px;">
                                    Nro. Doc: <input id="txtDNI" type="text" maxlength="8" class="input-small numero" style="margin-left: 34px;"/>
                                </div>
                            </div>
                            <div class="combos" style="margin-left:20px;margin-bottom: 5px;">
                                <div id="ControltxtFechaReceta" class="control-group" style="display:inline-block;margin-bottom: 5px;">
                                    Fecha Receta: <input id="txtFechaReceta" type="text" maxlength="10" class="input-small date" />
                                </div>
                            </div>
                        </div>
                        <div class="contenedor_4" style="margin-top: 10px;">
                            <div class="combos_2 pagination-centered" style="margin-bottom: 10px;">
                                <a id="btnGuardar" class="btn btn-success">Guardar</a>
                                <a id="btnLimpiar" class="btn btn-danger">Limpiar</a> 
                            </div>
                            <div class="combos_2 pagination-centered" style="margin-bottom: 10px;">
                                <label for="chkQuirofano" style="display:inline-block;">Quirófano<input id="chkQuirofano" type="checkbox" style="margin-top: 0px;margin-left: 5px;margin-right: 20px;"/></label>
                                <div id="div_fecha_quirofano" style="display:none;">Fecha: <input id="txtFechaQuirofano" type="text" maxlength="10" class="input-small date"/></div>
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
                                            Fecha de Receta
                                        </th>
                                        <th>
                                            Paciente
                                        </th>
                                        <th>
                                            Nro. Documento
                                        </th>
                                        <th>
                                            Seccional
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
                            <div class="box_informativo_a pull-left"><div style="padding-top:3px"><strong id="Total">Registros: 0</strong></div> </div>
                            <div class="pull-right">
                                <a id="btnBuscar" class="btn"><i class="icon-search"></i>&nbsp;Buscar</a>
                                <a id="btnImprimir" class="btn btn-info">
                                    <i class=" icon-print icon-white"></i>&nbsp;Imprimir</a>
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
<script src="../js/Hospitales/Compras/ConstanciaEntrega.js" type="text/javascript"></script>
<!--Barra sup--> 
</body>
</html>
