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
<style>
.Turnos_Libres{background-color:#F4FA58;}
.Turnos_Sobreturno{background-color:#0080FF;}
.Turnos_Ausente{background-color:#FF4000;}
.Turnos_Ausente{background-color:#FF4000;}

.Turnos_Informe{background-color:#FFBBF7;}
.Turnos_Entregado{background-color:#9EF9FF;}


</style>
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
    <div class="contenedor_3" style="height: 460px;">
      <div class="titulo_seccion"> <img src="../img/1.jpg" />&nbsp;&nbsp;<span id="TituloPacientesDelDia">Pacientes del dia</span></div>

<div class="hform formhorizontal">
      <div>Fecha</div>
      <input id="txtFecha" type="text" class="span2"/>
</div> 

<div class="hform formhorizontal">
      <a id="pedidos" onclick="PedidoEnfermeria();" class="btn btn-warning" style="margin-top:-40px; margin-left:300px;">Pedidos<br /> a <br /> Enfermeria</a>
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
        <div id="Tabla" class="tabla" style="height:270px;" onmouseleave="OcultarPracticas()">

        <div id="Flotante_Practicas" style="background-color:White; width:487px; height:269px; position:absolute; display:none; right:0px; opacity: 1; margin-left:10px; border:1px solid Gray">
            <span style="display:inline-block; width:100%; background-color:Gray; height: 23px;padding-left:10px;padding-top: 5px;"><b id="prac_b">:</b></span>
            <br />
            <div style="color:Gray; font-weight:bold; margin-left:10px;">
            <div id="cargando" style="text-align:center; padding-top:60px;">
            <img src="../img/Espere3.gif" />
            </div>
            <div id="contenedor_practicas"></div>
                
            </div>
        </div>

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
                    <input id="ProtocoloImpresion" value="0" type="hidden" />
                </div>
              </div>
            </div>
            
            <div class="hsuper_botones">
                <div href="#" onclick="LlamarPaciente();" id="opcion1"><strong>1</strong>. Llamar Paciente</div>
                <div href="#" onclick="DeLlamado_a_Espera();" style="display:none;" id="opcion12"><strong>2</strong>. Paciente Ausente</div>
                <div href="#" onclick="CargarAtencion();" id="opcion2"><strong>3</strong>. Carga de Atención</div>
                <%--<div href="#" onclick="Receta();" id="opcion4"><strong>4</strong>. Recetas</div>            
                <div href="#" onclick="CargadeEstudios();" id="opcion5"><strong>5</strong>. Ordenes de Estudios</div>
                <div href="#" onclick="AltaComplejidad();" id="opcion55"><strong>6</strong>. Estudios de Alta Complejidad</div>
                <div href="#" onclick="CertificadoMedico();" id="opcion6"><strong>7</strong>. Certificado Médico</div>--%>
            </div>
 
            <div class="hsuper_botones">
                <div href="#" onclick="Estado(1);" id="opcion_estado1" style="display:none;"><strong>4</strong>. Estado 1</div>
                <%--<div href="#" onclick="OrdenesInternacion();" id="opcion7"><strong>8</strong>. Orden de Internación</div>
                <div href="#" onclick="SolicituddeTraslado();" id="opcion8"><strong>9</strong>. Orden de Traslado</div>
                <div href="#"  id="opcion9" onclick="CargarHCTotal();"><strong>10</strong>. Historia Clínica</div>--%>
                <div href="#" onclick="FinalizarAtPaciente();" id="opcionFA" style="display:none;"><strong>11</strong>. Finalizar Atención</div>            
                <div href="#" onclick="ModificarAtencion();" style="display:none;" id="opcion11"><strong>12</strong>. Modificar Última Atención</div>      
                <%--<div href="#" onclick="Diabtelogia();" style="display:none;" id="opcion_diabetologia"><strong>13</strong>. Diabetología</div>      --%>
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
              </tr>
            </thead>
            <tbody id="LosTurnos">
            </tbody>
          </table>
        </div>
        
        
        <div>
        </div>

      </div>

<div style="margin-left:10px; margin-top:-40px;">
<div class="hpill">Solo Turno: <span id="SSoloTurno">0</span></div>
<div class="hpill Turnos_Libres">Espera: <span id="SEspera">0</span></div>
<div class="hpill Turnos_Ocupados">Llamado: <span id="SLlamado">0</span></div>
<div class="hpill Turnos_Sobreturno">Atendido: <span id="SFinalizado">0</span></div>
<div class="hpill Turnos_Ausente">Ausente: <span id="SAusente">0</span></div>

<div class="hpill Turnos_Informe">Informe: <span id="SInforme">0</span></div>
<div class="hpill Turnos_Entregado">Entregado: <span id="SEntregado">0</span></div>

</div>
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
<script src="../js/Hospitales/AtConsultorio_IMG/Pacientesdeldia.js" type="text/javascript"></script>

</body>
</html>
