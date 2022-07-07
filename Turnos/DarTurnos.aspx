<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DarTurnos.aspx.cs" Inherits="Turnos_DarTurnos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />


<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Turnos > <strong>Pedidos de Turno</strong>";
</script> c


<link href="../css/barra.css" rel="stylesheet" type="text/css" />


</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>
<form id="form1" class="form-horizontal">
<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="height:470px;"> <div class="titulo_seccion">
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
          <label class="control-label">Nº</label>
          <div class="controls">
            <input id="txt_dni" name="txt_dni" type="text" maxlength="8" placeholder="Nro. de documento sin puntos">
            <input id="txtdocumento" type="hidden" />
            <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
            <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
            <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >NHC</label>
          <div class="controls">
            <input id="txtNHC" type="text" maxlength="11" placeholder="Ej: 99123456789" class="ingreso">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" maxlength="60" placeholder="Apellido Nombre"type="text" class="span3 ingreso"; style="margin-left:4px">
            <a id="btnBuscarPaciente" href="BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>
        <div id="controlTelefono" class="control-group">
          <label class="control-label">Teléfono</label>
          <div class="controls">
            <input id="txtTelefono" maxlength="13" placeholder="Ej. 43625910" type="text" class="ingreso">
          </div>
        </div>
        <div id="controlSeccional" class="control-group">
        
          <label class="control-label" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" />
          
              <select id="cboSeccional" class="ingreso">
                <option value="0">Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" class="ingreso" style="display:none;"></select>          

           </div>

        </div>
        
      </form>

      
      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="DarTurnos.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a> 
          </div>
       </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos">
        
        <div class="datos_persona">
        <div><img id="fotopaciente" class="avatar2" src="../img/silueta.jpg" onerror="imgErrorPaciente(this);"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>
        </div>
        
      </div>
        <div class="opciones_resumen"> <a id="btnOtorgados" class="btn">Turnos otorgados</a> <a href="DarTurnos.aspx" class="btn btn-danger">Cancelar solicitud</a> </div>
      </div>
      <div class="contenedor_3"> <div class="titulo_seccion">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos del turno</span></div>
      
        <div class="">
          <div class="contenedor_4 pagination-centered">
            <div class="combos">
              <select id="cbo_Especialidad">
                <option value="0">Especialidad</option>
              </select>
              
              <select id="cbo_Medico" style="margin-top:10px;">
                <option value="0">Medico</option>
              </select>
              <a class="btn" id="btn_Dias_de_Atencion" style="margin:0px 0px 10px 5px" ><i class="icon-time" href="DiasdeAtencionVista.aspx" rel="tooltip" title="Horarios de atención"></i></a> </div>
          </div>
          <div class="contenedor_4">
            <div class="combos_2 pagination-centered">
              <div id="ControltxtDias" class="input-prepend inline control-group " style="margin-left:20px;">
              <select id="cbo_Dias" style='width:140px'>
                    <option value="-1">Todos</option>
                    <option value="7">Domingo</option>
                    <option value="1">Lunes</option>
                    <option value="2">Martes</option>
                    <option value="3">Miércoles</option>
                    <option value="4">Jueves</option>
                    <option value="5">Viernes</option>
                    <option value="6">Sábado</option>
              </select>
              </div>

              <div id="ControltxtFecha" class="input-prepend inline control-group " style="display:inline-block;margin-left:10px;">
              <input id="txtFecha" name="txtFecha" type="text" placeholder="Fecha" style="width:80px;">              
              </div>

              <div id="ControltxtHora" class="input-prepend inline control-group " style="display:inline-block;margin-left:10px;">
              <input id="txtHora" name="txtHora" type="text" placeholder="Hora" class="span1">
              </div>

            </div>
            <div class="combos_2 pagination-centered">
              <form class="form-inline" style="margin:0px 25px 0px 25px;">
                <label class="checkbox pull-left">
                  <input type="checkbox" id="cb_ttel">
                  Turno telefónico </label>
                <a id="btn_SobreTurno" class="btn pull-right"><i class="icon-calendar"></i>&nbsp;&nbsp;Sobreturno</a>
              </form>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div style="padding:0px 15px 0px 15px;">
          <form class="form-horizontal" style="margin-bottom:5px">
            
            
            <div> 
            <div id="btn_Todos" class="reff ref_0 reff_activo">Todos</div>

            <div id="btn_Libres" class="reff Turnos_Libres">Libre</div>
             <div id="btn_Reservados" class="reff Turnos_Ocupados">Ocupado</div>
              <div id="btn_SobreT" class="reff Turnos_Sobreturno">Sobreturno</div> 
              <div id="btn_CancelT" class="reff Turnos_Cancelado">Cancelado</div>
               </div>
            
            <div class="clearfix"></div>
                         <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
            <div class="tabla" id="TablaTurnos_div" style="height:205px"> 
              <table id="TablaTurnos" class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Especialidad</th>
                    <th>Médico</th>
                    <th>Paciente</th>
                    <th>Seccional/Obra Social</th>
                  </tr>
                </thead>                
              </table>
            </div>
          </form>
          
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
<script src="../js/Hospitales/Turnos.js" type="text/javascript"></script>




<!--Barra sup--> 


</body>
</html>
