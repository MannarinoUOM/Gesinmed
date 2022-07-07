<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HistoricodeTurnosporPaciente.aspx.cs" Inherits="Turnos_HistoricodeTurnosporPaciente_IMG" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />


<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Turnos > <strong>Informe Histórico de Turnos por Paciente</strong>";
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
      <form class="form-horizontal">
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
            <input id="txt_dni" name="txt_dni" class="numero" type="text" maxlength="8" placeholder="Ingrese el DNI sin puntos">
            <input id="txtdocumento" type="hidden" />
            <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >NHC</label>
          <div class="controls">
            <input id="txtNHC" type="text" class="numero" maxlength="11" placeholder="Ej: 99123456789">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" maxlength="60" placeholder="Apellido Nombre"type="text" class="span3">
            <a id="btnBuscarPaciente" href="BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>
        <div id="controlTelefono" class="control-group" style="display:none;">
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
        
                <div id="ControlFechas" class="control-group">
                    <label class="control-label" for="txtFechaInicio">
                        Fecha Inicio</label>
                    <div class="controls">
                        <input id="txtFechaInicio" type="text" class="input-small">
                        <span for="txtFechaFin">Fecha Fin</span>
                        <input id="txtFechaFin" type="text" class="input-small">
                    </div>
                </div>
                <div id="Controlcbo_Especialidad" class="control-group">
                    <label class="control-label" for="cbo_Especialidad">
                        Especialidad</label>
                    <div class="controls">
                        <select id="cbo_Especialidad">
                        </select>
                    </div>
                </div>
      </form>

      
      <div class="control-group pagination-centered">
          <div> 
                <a class="btn btn-danger" href="HistoricodeTurnosporPaciente.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <button class="btn btn-info" type="button" id="desdeaqui" tabindex="1" style="display: none;">Siguiente</button>
          </div>
       </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
                   <div class="resumen_datos">
                <!--Datos del paciente-->
                <div class="datos_paciente" style="font-size:12px;">
                    <div>
                        <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
                    <div class="datos_resumen_paciente">
                        <div>
                            Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                        <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                        <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;<span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                        &nbsp;&nbsp;&nbsp;<span>Celular: <strong><span id="CargadoCelular"></span></strong></span>
                        <div>
                        <input type="hidden" id="Hidden1" />
                            <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>
                        </div>
                    </div>
                </div>
                </div>


        <div class="contenedor_3">
             <div style="padding: 0px 15px 0px 15px;">
                     <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix"></div>
                          <div class="tabla" id="TablaTurnos_div" style="height:350px; width: 880px;">
                                 <div id="cargando" style="text-align:center; display:none;">
                                    <br /><br />
                                    <img src="../img/Espere.gif" /><br />
                                    Cargando...
                                </div> 
                            <table id="TablaTurnos" class="table table-hover table-condensed">
                            <thead>
                                 <tr>
                                        <th>
                                            &nbsp;
                                        </th>
                                        <th>
                                            Fecha
                                        </th>
                                         <th>
                                            Hora
                                        </th>
                                        <th>
                                            Especialidad
                                        </th>
                                        <th>
                                            Médico
                                        </th>
                                         <th>
                                           Observación
                                        </th>
                                         <th>
                                            Estado
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
            <a href="HistoricodeTurnosporPaciente.aspx" id="btnVolver" class="btn pull-right">Volver</a>
            <a id="btn_Imprimir" class="btn btn-info pull-right">Imprimir Listado</a>
            <a id="btn_Turnos" class="btn btn-info pull-right">Imprimir Turnos</a>
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
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/Hospitales/Turnos_IMG/HistoricodeTurnosporPaciente.js" type="text/javascript"></script>
<!--Barra sup--> 

</body>
</html>
