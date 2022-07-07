<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargaExpress.aspx.cs" Inherits="Turnos_CargaExpress" %>

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
.modal-body .btn {margin-right:10px;}
.modal-body {text-align:center;}
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
              <span><a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn" style="margin-top:10px;"><i class="icon-search icon-black">
                        </i></a></span>
                <input type="hidden" id="afiliadoId" />
                <input id="txtdocumento" type="hidden" />
            <div class="combos" style="margin-left:15px;">
              <select id="cbo_Especialidad" class="span4 controles" style="width:300px;">
                <option value="0">Especialidad</option>
              </select>
              <%--TURNO ONLINE QUITAR PARA SUBIR VERSION--%>
              <%--<a class="btn btnOnline" id="btnOnline" style="margin:0px 0px 0px 5px; display:none" ><i class="icon-globe" rel="tooltip" title="Marcar Tele-Consulta"></i></a> --%>

              <input class="btnOnline" type="checkbox" id="btnOnline" style="margin:0px 0px 0px 5px; display:none; font-size:x-small;margin-left:0px; padding:2px"/> 
              <label class="btnOnline" style="display:none; font-size:x-small" for="btnOnline" >Teleconsulta</label>    

              <select id="cbo_Medico" class="span4 controles" style="width:300px;">
                <option value="0">Medico</option>
              </select>
              <a class="btn" id="btn_Dias_de_Atencion" style="margin:0px 0px 10px 5px" ><i class="icon-time" href="DiasdeAtencionVista.aspx" rel="tooltip" title="Dias de Atención"></i></a> 
              <label style="display:none;" id="lblPaciente"></label><br />
              <label id="lblSeccional" style="display:inline"></label>
              <span id="lblMonotributista" style="color:Red; font-size:medium; display:none"><em><b>MONOTRIBUTISTA</b></em></span>
              <label id="lblObservaciones"></label>
              
            </div>
          </div>
          <div class="contenedor_4" style="height:220px;">
            <div class="combos_2 pagination-centered">
              <div id="ControltxtDias" class="input-prepend inline control-group " style="margin-left:20px; margin-right:5px;">
              <select id="cbo_Dias" class="controles" style="width:140px">
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
                  <input type="checkbox" id="cb_ttel" class="controles"/>
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
                <label id="lbl_Sobreturno" class="checkbox pull-left" runat="server">
                  <input type="checkbox" id="chkSobreturno" class="controles">
                  Sobreturno </label>
                 
              <div id="ControltxtHora" class="input-prepend inline control-group " style="display:inline-block;display:none;margin-left:10px; margin-top:-10px;">
                <input id="txtFechaSobre" name="txtFechaSobre" class="span1" type="text" placeholder="Fecha" style=" width:80px;margin-top:5px; margin-left:5px;">
                <input id="txtHora" name="txtHora" type="text" placeholder="Hora" class="span1">
                <a id="btn_SobreTurno" class="btn pull-right" style="margin-top:5px; margin-left:5px;">Otorgar</a>
              </div> 
              <a id="btnMulti" class="btn btn-info pull-right controles" style="margin-top:-5px; margin-left:-25px;">Otorgar</a><br /><br />
              <span class="span2" style="margin-left:0px;">
                <a id="btnTurnosOtorgados" class="btn btn-danger pull-left controles">Otorgados</a>
               </span>
               <%
               Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
               if (V.PermisoSM("9928"))
               {
               %>
               <span>
                    <a id="btnTurnosLlamarBox" class="btn btn-warning" onclick="javascript:$('#ModalBoxes').modal('show');" >FORZAR LLAMADO EN BOX</a>
               </span>
               <%
               } 
               %>
              </form>
              <div class="clearfix"></div>
            </div>
            <div style="text-align:center"><label id="altoRiesgo" style="color:Red; font-size:larger; display:none" class="blink_text"><b>PATOLOGÍAS CRÓNICAS</b></label>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div style="padding:0px 15px 0px 15px;">
          <form class="form-horizontal" style="margin-bottom:5px">
          <span style="float:right"><label style="display:inline">celu ppal: </label>
           <input style="margin-top:0px; width:100px; text-align:center" type="text" id="txtCelular" class="numeroEntero" disabled="disabled"/>
           &nbsp;<a id="btnActualizarCel" class="btn btn-info" disabled="disabled">Actualizar Cel</a></span> 
            
            <div id="botones"> 
            <div id="btn_Todos" class="reff ref_0 reff_activo controles">Todos</div>

            <div id="btn_Libres" class="reff Turnos_Libres controles">Libres</div>
             <div id="btn_Reservados" class="reff Turnos_Ocupados controles">Ocupados</div>
              <div id="btn_SobreT" class="reff Turnos_Sobreturno controles">Sobreturnos</div> 
              <div id="btn_CancelT" class="reff Turnos_Cancelado controles">Cancelados</div>
               </div>
            
            <div class="clearfix"></div>
              <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
            <div class="tabla" id="TablaTurnos_div" style="height:270px; font-size:12px;">
              <table id="TablaTurnos" class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Especialidad</th>
                    <th>Médico</th>
                    <th>Paciente</th>
                    <th>Seccional/OS</th>
                  </tr>
                </thead>                
              </table>
            </div>
          </form>
          
        </div>
      </div>
    <div class="clearfix"></div>

</div>
</form>
<!--Pie de pagina-->

<!-- Modal -->
<div class="modal fade" id="ModalBoxes" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Forzar llamado en Box Turno</h4>
      </div>
      <div class="modal-body">
        <h2>Elija Box</h2>
        <a class="btn btn-large" onclick="javascript:ForzarLlamadoBox(1)">1</a>
        <a class="btn btn-large" onclick="javascript:ForzarLlamadoBox(2)">2</a>
        <a class="btn btn-large" onclick="javascript:ForzarLlamadoBox(3)">3</a>
        <a class="btn btn-large" onclick="javascript:ForzarLlamadoBox(4)">4</a>
        <a class="btn btn-large" onclick="javascript:ForzarLlamadoBox(5)">5</a>
        <a class="btn btn-large" onclick="javascript:ForzarLlamadoBox(6)">6</a>
        <a class="btn btn-large" onclick="javascript:ForzarLlamadoBox(7)">7</a>        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>        
      </div>
    </div>
  </div>
</div>


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
<script src="../js/Hospitales/Turnos/CargaExpress.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<script src="../js/Hospitales/PhoneValidate.js" type="text/javascript"></script>


<!--Barra sup--> 


</body>
</html>

<style type="text/css">
.blink_text {

    animation:1s blinker linear infinite;
    -webkit-animation:1s blinker linear infinite;
    -moz-animation:1s blinker linear infinite;

     color: red;
    }

    @-moz-keyframes blinker {  
     0% { opacity: 1.0; }
     50% { opacity: 0.0; }
     100% { opacity: 1.0; }
     }

    @-webkit-keyframes blinker {  
     0% { opacity: 1.0; }
     50% { opacity: 0.0; }
     100% { opacity: 1.0; }
     }

    @keyframes blinker {  
     0% { opacity: 1.0; }
     50% { opacity: 0.0; }
     100% { opacity: 1.0; }
     }
     </style>