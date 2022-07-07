<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PacientesDelDia.aspx.cs" Inherits="AtConsultorio_PacientesDelDia" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
<link rel="stylesheet" type="text/css" href="../css/barra.css" />
<link rel="stylesheet" type="text/css" href="../css/hestilo.css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="clearfix"> </div>
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Pacientes del Día</strong>";
    </script>
<div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);"> </div>
<div class="container" style="padding-top: 30px;">
  <div class="contenedor_1">
    <div class="contenedor_3" style="height: 500px;">
      <div class="titulo_seccion"> <img src="../img/1.jpg" />&nbsp;&nbsp;<span id="TituloPacientesDelDia">Pacientes del dia</span></div>

<div class="hform formhorizontal">
      <div>Fecha</div>
      <input id="txtFecha" type="text" class="span2"/>
</div> 

<div class="hform formhorizontal">
      <a id="pedidos" onclick="PedidoEnfermeria();" class="btn btn-warning" style="margin-top:-40px; margin-left:300px;">Pedidos a Enfermeria</a>
</div>

<div class="hform formhorizontal">
      <div>Medico</div>
      <select id="cbo_Medico" class="span3"></select>
</div>  

<div class="hform formhorizontal">
      <div>Especialidad</div>
      <select id="cboEspecialidadDA" class="span3"></select>
</div>  

     
      <div class="hcontenedor_blanco" style="height:320px;">
        <div id="Tabla" class="tabla" style="height:270px;">
          <div class="hsuper_menu" style="height:310px;">
          <button class="btn btn-mini" id="OcultarMenu" style="margin-left:800px; margin-bottom:-10px;"><i class="icon-remove-circle"></i>&nbsp;&nbsp;Cerrar</button>
            <div class="resumen_datos hsuper_menu_datos" style="width:90%;">
            
              <div class="datos_persona">
                <div ><img id = "fotopaciente" class="avatar2"></img> </div>
                
                <div class="datos_resumen_paciente">
                  <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                  <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                  <div>Seccional/OS: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
                    <input id="afiliadoId" value="" type="hidden"/>
                    <input id="afiliadoCuil" value="" type="hidden"/>
                    <input id="afiliadoIdVPN" value="" type="hidden"/>
                    <input id="ProtocoloImpresion" value="0" type="hidden" />
                </div>
              </div>
            </div>
            
            <div class="hsuper_botones" style="width:30%">
                <div href="#" onclick="LlamarPaciente();" id="opcion1"><strong>1</strong>. Llamar Paciente</div>
                <div href="#" onclick="DeLlamado_a_Espera();" style="display:none;" id="opcion12"><strong>2</strong>. Paciente Ausente</div>
                <div href="#" onclick="CargarAtencion();" id="opcion2"><strong>3</strong>. Carga de Atención</div>
                <div href="#" onclick="Receta();" id="opcion4"><strong>4</strong>. Recetas</div>            
                <div href="#" onclick="CargadeEstudios();" id="opcion5"><strong>5</strong>. Ordenes de Estudios</div>
                <div href="#" onclick="AltaComplejidad();" id="opcion55"><strong>6</strong>. Estudios de Alta Complejidad</div>
                <div href="#" onclick="CertificadoMedico();" id="opcion6"><strong>7</strong>. Certificado Médico</div>
            </div>
 
            <div class="hsuper_botones" style="width:30%">
                <div href="#" onclick="OrdenesInternacion();" id="opcion7"><strong>8</strong>. Orden de Internación</div>
                <div href="#" onclick="SolicituddeTraslado();" id="opcion8"><strong>9</strong>. Orden de Traslado</div>
                <div href="#"  id="opcion9" onclick="CargarHCTotal();"><strong>10</strong>. Historia Clínica</div>
                <div href="#" onclick="FinalizarAtPaciente();" id="opcionFA" style="display:none;"><strong>11</strong>. Finalizar Atención</div>            
                <div href="#" onclick="ModificarAtencion();" style="display:none;" id="opcion11"><strong>12</strong>. Modificar Atención</div>      
                <div href="#" onclick="Diabtelogia();" style="display:none;" id="opcion_diabetologia"><strong>13</strong>. Diabetología</div>
                <% Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();
                   if (v.PermisoSM("311"))
                   {%>
                <div href="#" onclick="Click_Update_AltoRiesgo();" id="opcion_AltoRiesgo"><strong>14</strong>. Patologías crónicas</div>
                <%}%>      
                <div href="#" onclick="Cirugia();" id="opcion_Cirugia"><strong>15</strong>. Solicitud turno Quirúrgico</div>
                <div href="#" onclick="Vacunas();" id="opcion19"><strong>19</strong>. Vacunas</div> 
                <div href="#" id="altaComp_IMG" class="pos" ><strong>20</strong>. Estudios Alta complejidad Imágenes</div>
            </div>  
            
            <div class="hsuper_botones" style="width:30%">
                <div href="#" onclick="evolucionEspecialista();" id="opcion21"><strong>21</strong>. Práctica en consultorio</div>
            </div>
                        
          </div>
          <table class="table table-hover table-condensed">
            <thead>
              <tr>
                <th> Fecha </th> 
                <th> Afiliado </th>
                <th> Nro. H.C.</th>
                <th> Seccional/OS </th>
                <th> Estado </th>
                <th> Alto Riesgo </th>
                <th> Tele-Consulta </th>
              </tr>
            </thead>
            <tbody id="LosTurnos">
            </tbody>
          </table>
        </div>
        
          
        <div>
        </div>

      </div>

<div style="margin-left:10px; margin-top:10px;width:60%;display:inline">
<div class="hpill">Solo Turno: <span id="SSoloTurno">0</span></div>
<div class="hpill Turnos_Libres">Espera: <span id="SEspera">0</span></div>
<div class="hpill Turnos_Ocupados">Llamado: <span id="SLlamado">0</span></div>
<div class="hpill Turnos_Sobreturno">Atendido: <span id="SFinalizado">0</span></div>
<div class="hpill Turnos_Ausente">Ausente: <span id="SAusente">0</span></div>
</div>
<div style="width:350px; display:inline"><a id="btnInformAus" class="btn btn-danger confirm" style="margin-left:1%; cursor:pointer; display:none">Informar Ausentes</a>&nbsp&nbsp<i class="icon-arrow-left red confirm" style="display:none"></i><div style="float:right; color:Red; font-weight:bold; display:none; width:250px" class='confirm'><p>Recuerde Informar los pacientes <br />ausentes al finalizar su jornada</p></div></div>
    </div>
  </div>
</div>
</div>
<!-- Modal --> 



<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery.validate.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/AtConsultorio/Pacientesdeldia.js" type="text/javascript"></script>

  <script src="../js/bootstrap.js" type="text/javascript"></script>
</body>
</html>

<div id="myModalSeleccion" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
<div class="modal-header">
<button onclick="ocultarModal()" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
<h3 id="H1">¿Quiere pedir Estudios de Alta Complejidad o hacer un Pedido de Materiales?</h3>
</div>
<div class="modal-body">
<p>
<a class="btn ocultar opcion " style="margin: 5px 5px 5px 5px;" name="1" >Estudios de Alta Complejidad</a>
<a class="btn ocultar opcion " style="margin: 5px 5px 5px 5px;" name="2" >Pedido de Materiales</a>
</p>
</div>
<div class="modal-footer">
<button onclick="ocultarModal()" class="btn" data-dismiss="modal" aria-hidden="true">Cerrar</button>
</div>
</div>
<script type="text/javascript">
    $(".opcion").click(function () {
        //alert($(this).attr('name'));
        var Pagina;
        switch ($(this).attr('name')) {
            case "1":
                //var Pagina = "../AtConsultorio/EstudiosAltaComplejidad.aspx?ID=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + " ";
                var Pagina = "EstudiosAltaComplejidad.aspx?ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
                break;
            case "2":
                var Pagina = "../HistoriaClinica/PedidodeMateriales.aspx?afiliadoId=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + "&M=1" + " ";
                break;
        }

        Pagina = Pagina.slice(0, -1);
        $.fancybox({
            'autoDimensions': false,
            'href': Pagina,
            'width': '100%',
            'height': '100%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'showCloseButton': true
        });
    });
</script>