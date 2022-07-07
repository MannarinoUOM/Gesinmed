<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargaSemanal.aspx.cs" Inherits="Turnos_CargaSemanal" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />


<style>

	.tabla_turnos_img tr{vertical-align: top;}
	.bordeado {border: 1px solid black; width:75px; display:block; padding-left:5px; font-size:12px;}
	.libre {background-color: #F4FA58}
	.ocupado {background-color: #58FA58}
	.sobreturno {background-color: #0080FF}
	.cancelado {background-color: #FA5858}
	.tabla_turnos_img div {width:80px;}	
	.tabla_turnos_img label {display:inline-block; margin-top:0px; padding-left:5px; cursor:pointer;}	
	.encabezado_flotante td{width:80px;}	
	
	
</style>

<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Turnos > <strong>Pedidos de Turno</strong>";
</script> 


<link href="../css/barra.css" rel="stylesheet" type="text/css" />


</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>
<form id="form1" class="form-horizontal">
<div class="container" style="padding-top:30px;">
  <div class="contenedor_1" style="height:570px;">

      <div class="contenedor_3" style="height:530px;">
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:220px;">
            <span style="margin-left:20px; margin-top:40px;">Nro. HC</span>
                <input type="text" id="txtNHC_Control" maxlength="13" class="input-small numero" style="margin-top:10px;" placeholder="Ingrese HC"/>
            <span style="margin-left:5px;">Documento</span>
                <input type="text" id="txtDoc_Control" maxlength="8" class="input-small numero" style="margin-top:10px;" placeholder="Ingrese Doc"/>
            <span style="margin-left:17px;">Paciente</span>
                <input type="text" id="txtPaciente" maxlength="30" class="input-large" style="margin-top:10px;width: 240px;" placeholder="Ingrese Paciente"/>
              <span><a id="btnBuscarPaciente" href="../Turnos_IMG/BuscarPacientes.aspx?Express=0" class="btn" style="margin-top:10px;"><i class="icon-search icon-black">
                        </i></a></span>
                <input type="hidden" id="afiliadoId" />
                <input id="txtdocumento" type="hidden" />
            <div class="combos" style="margin-left:15px;">
              <select id="cbo_Especialidad" class="span4 controles" style="width:300px;">
                <option value="0">Especialidad</option>
              </select>
              
              <select id="cbo_Medico" class="span4 controles" style="width:300px;">
                <option value="0">Medico</option>
              </select>
              <a class="btn" id="btn_Dias_de_Atencion" style="margin:0px 0px 10px 5px" ><i class="icon-time" href="DiasdeAtencionVista.aspx" rel="tooltip" title="Dias de Atención"></i></a> 
              <label style="display:none;" id="lblPaciente"></label>
              <label id="lblSeccional"></label>
              <label id="lblObservaciones"></label>
              
            </div>
          </div>
          <div class="contenedor_4" style="height:220px;">
            <div class="combos_2 pagination-centered">
              <div id="ControltxtDias" class="input-prepend inline control-group " style="margin-left:20px; margin-right:100px;">              
              <select id="cbo_Dias" class="controles" style="display:none;">
                    <option value="-1">Todos los Días</option>
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
              <label for="txtFecha" style="display:inline-block;margin-top:10px;">A partir del </label>
              <input id="txtFecha" name="txtFecha" type="text" placeholder="Fecha" class="controles" style="width:80px; margin-top:-10px;">              
              </div>

            </div>
            <div class="combos_2 pagination-centered">
              <form class="form-inline" style="margin:0px 25px 0px 25px;">                
                <label class="checkbox pull-left" style="margin-left: 20px;">
                  <input type="checkbox" id="cb_ttel" class="controles">
                  Turno telefónico </label>
                  
                  <label class="checkbox pull-left" style="margin-left: 20px;">
                  <input type="radio" id="cb_pv" name="checks" class="controles">
                  1ra Vez </label>
                  <label class="checkbox pull-left" style="margin-left: 20px;">
                  <input type="radio" id="cb_ulterior" class="controles" name="checks">
                  Ulterior </label>

              </form>
              <div class="clearfix"></div>
            </div>
            <div class="combos_2 pagination-centered">
                <form class="form-inline" style="margin:0px 25px 0px 20px;">                
                <label class="checkbox pull-left">
                  <input type="checkbox" id="chkSobreturno" class="controles">
                  Sobreturno </label>
                 
              <div id="ControltxtHora" class="input-prepend inline control-group " style="display:inline-block;display:none;margin-left:10px; margin-top:-10px;">
                <input id="txtFechaSobre" name="txtFechaSobre" class="span1" type="text" placeholder="Fecha" style=" width:80px;margin-top:5px; margin-left:5px;">
                <input id="txtHora" name="txtHora" type="text" placeholder="Hora" class="span1">
                <a id="btn_SobreTurno" class="btn pull-right" style="margin-top:5px; margin-left:5px;">Otorgar</a>
              </div> 
              <a id="btnMulti" class="btn btn-info pull-right controles" style="margin-top:-5px; margin-left:-25px;">Otorgar</a><br /><br />
              <span class="span2" style="margin-left:0px;">

                  <label class="checkbox pull-left" style="margin-top: 0px;margin-bottom: 10px;">
                  <input type="checkbox" id="ck_turnoforzado" class="controles">Turno Forzado</label>


                <a id="btnTurnosOtorgados" class="btn btn-danger pull-left controles">Otorgados</a>
               </span>
              </form>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div style="padding:0px 15px 0px 15px;">
          <form class="form-horizontal" style="margin-bottom:5px">
            
            
            <div id="botones" style="margin-left: 261px;"> 
            <div id="0btn_Todos" class="reff_nomouse ref_0 controles">Todos</div>
            <div id="0btn_Libres" class="reff_nomouse Turnos_Libres controles">Libres</div>
             <div id="0btn_Reservados" class="reff_nomouse Turnos_Ocupados controles">Ocupados</div>
              <div id="0btn_SobreT" class="reff_nomouse Turnos_Sobreturno controles">Sobreturnos</div> 
              <div id="0btn_CancelT" class="reff_nomouse Turnos_Cancelado controles">Cancelados</div>
               </div>
            
            <div class="clearfix"></div>
              <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
            <div class="tabla" id="TablaTurnos_div" style="height:270px; max-height:270px; font-size:12px; overflow:scroll;width: 585px;margin-left: 150px;">
              
<div style="display:block; min-height:100px; background-color:white;">
<div style="position:absolute;">
<table class="encabezado_flotante">
<tr style="background-color:white;">
	<td style="text-align:center;" id="fecha0">Lun. 99</td>
	<td style="text-align:center;" id="fecha1">Mar. 99</td>
	<td style="text-align:center;" id="fecha2">Mie. 99</td>
	<td style="text-align:center;" id="fecha3">Jue. 99</td>
	<td style="text-align:center;" id="fecha4">Vie. 99</td>
	<td style="text-align:center;" id="fecha5">Sab. 99</td>
	<td style="text-align:center;" id="fecha6">Dom. 99</td>	
</tr>
</table>
</div>
<div>
<table cellspacing="0" cellpadding="0" class="tabla_turnos_img">
<tr style="height:23px;"></tr>
<tr>
<td>
<div id="tf0">
</div>
</td>

<td>
<div id="tf1">
</div>
</td>

<td>
<div id="tf2">
</div>
</td>

<td>
<div id="tf3">
</div>
</td>

<td>
<div id="tf4">
</div>
</td>

<td>
<div id="tf5">
</div>
</td>

<td>
<div id="tf6">
</div>
</td>
</tr>
</table>
</div>
</div>

            </div>
          </form>
          
        </div>
      </div>
    <div class="clearfix"></div>

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
<script src="../js/Hospitales/Turnos_IMG/CargaSemanal.js" type="text/javascript"></script>




<!--Barra sup--> 


</body>
</html>
