<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Interconsulta.aspx.cs" Inherits="AtInternados_Interconsulta" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form class="form-horizontal" >
        <div class="control-group">
          <label class="control-label">DNI</label>
          <div class="controls">
            <input id="txt_dni"type="text" placeholder="Ingrese el DNI sin puntos">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >NHC</label>
          <div class="controls">
            <input id="txtNHC" type="text" placeholder="Ej: 99123456789">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" placeholder="Apellido Nombre"type="text" class="span3">
            <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a>
                <a id="btnVolverAlPaciente" class="btn"><i class="icon-th-list"></i>&nbsp;Volver al Paciente</a>
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:95px;">
        
              <div class="datos_persona">
                <div ><img id = "fotopaciente" class="avatar2" src="../img/silueta.jpg" onerror="imgErrorPaciente(this);"/></div>
                <div class="datos_resumen_paciente">
                <input id="afiliadoId" type="hidden" value="" />
                  <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                  <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                  <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
                  <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="CargadoSala"></span></strong></span> </div>
                  <div>Cama: <strong><span id="CargadoCama"></span></strong></div>
                </div>
              </div>
      </div>
      <div class="contenedor_3" style="height:420px;">
      
        <div class="">
       <div style="margin:-10px 15px 5px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaInterconsultas" class="tabla" style="height:175px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Med. Solicitante</th>
                    <th>Esp. de Interconsulta</th>
                    <th>Med. Interconsulta</th>
                    <th>Fecha</th>
                    <th>Diagnóstico</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>
         <div class="row" style="margin-left:5px;">
            <div id="controlcbo_MedicoSol" class="span6">
                <label for="cbo_MedicoSol" style="display:inline; margin-top:10px;">Médico Solicitante: </label>
                <select id="cbo_MedicoSol" class="span4 datos" style="margin-left:25px;">
                </select>
            </div>
        </div>
        <div class="row" style="margin-left:5px;">
            <div id="controlcbo_Especialidad" class="span6">
                <label for="cbo_Especialidad" style="display:inline; margin-top:10px;">Esp. de Interconsulta: </label>
                <select id="cbo_Especialidad" class="span3 datos" style="margin-left:5px;width:300px">
                </select>
            </div>
            <div id="controlcbo_Medico" class="span5">
                <label for="cbo_Medico" style="display:inline; margin-top:10px;">Médico Interconsulta: </label>
                <select id="cbo_Medico" class="span3 datos">
                </select>
            </div>
        </div>
        <div class="row" style="margin-left:5px;">
            <div id="controltxtDiagnostico" class="span6">
                <label for="txtDiagnostico" style="display:inline; margin-top:10px;">Diagnóstico: </label>
                <input id ="txtDiagnostico" placeholder="Diagnostico" type="text" class="span5 datos" style="margin-left:65px ; width:285px" maxlength="30">
            </div>
            <div id="controltxtFecha" class="span5">
                <label for="txtFecha" style="display:inline; margin-top:10px; margin-right:92px;">Fecha: </label>
                <input id ="txtFecha" type="text" class="span3 datos" maxlength="10" />
            </div>
        </div>

        <div class="row" style="margin-left:5px;">
            <div id="controltxtIndicacion" class="span11">
                <label for="txtIndicacion" style="display:inline; margin-top:10px; margin-right: 50px;">Indicación: </label>
                <textarea id="txtIndicacion" rows="2" class="span8 datos" style="width:680px; margin-left:25px;" placeholder="10 caracteres como mínimo"></textarea>
            </div>
        </div>

        <div class="row" style="margin-left:5px;"> 
            <div class="reff ref_4 Turnos_Libres">Pendientes</div>
            <div class="reff ref_1 Turnos_Ocupados">Vistos</div>
            <div class="reff ref_2 Turnos_Cancelado">Cancelados</div>
            <div class="reff ref_3 Turnos_Sobreturno">Atendidos</div>
            
             <div id="controlchk_Cerrar" class="span5" style="display:none;">
                <button id="btnFinInter" class="btn btn-primary datos" type="button" style="margin-top:-15px; margin-left:-5px;">
                  Finalizar Interconsulta <span class="badge"><input id="chk_Cerrar" type="checkbox"/></span>
                </button>
                
                 <input id="txtFechaCierre" type="text" class="span2 datos" style="margin-top:-5px;">
            </div>
           

        </div>


        </div>

        <div class="pie_gris">
            <div class="pull-right" style="margin-bottom:5px;">
              <a id="btnVolver" class="btn"><i class="icon-th-list"></i>&nbsp;Volver al Paciente</a>
              <a id = "btnCancelar" class="btn btn-danger"><i class=" icon-remove-circle icon-white"></i>&nbsp;Cancelar</a>
              <a id = "btnConfirmar" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
              <a id = "btnImprimir" class="btn btn-info" style="display:none;"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</a>
            </div>
        </div>

      </div>
    </div>
  </div>
</div>

<!--Pie de p�gina-->
<script type="text/javascript" src="../js/jquery-1.8.3.js"></script> 
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/AtInternados/Interconsulta.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1000);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 20 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        $("#txtIndicacion").focus();
    });
    parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Pacientes Internados > <strong>Solicitar Interconsulta</strong>";
</script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</body>
</html>

