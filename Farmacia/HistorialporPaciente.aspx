<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HistorialporPaciente.aspx.cs" Inherits="Farmacia_HistorialporPaciente" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />


<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Historial de Consumo por Paciente</strong>";
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
                               <label class="control-label" id="Label1" style="margin-right:10px;">Desde</label>
                                <input id="txtFechaInicio" type="text">
                            </div>
         <div id="Div1" class="control-group">
                                 <label class="control-label" id="Label2" style="margin-right:10px;">Hasta</label>
                                <input id="txtFechaFin" type="text">
                            </div>

        
      </form>

      
      <div class="control-group pagination-centered">
          <div> 
                <a class="btn btn-danger" href="HistorialporPaciente.aspx" id="btnCancelarPedidoTurno" style="display:none;">Cancelar</a> 
                <a id="btnPrint" class="btn btn-info">Imprimir</a> 
          </div>
       </div>

    </div>
    <div class="clearfix"></div>

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
<script src="../js/Hospitales/Farmacia/HistorialporPaciente.js" type="text/javascript"></script>


</body>
</html>
