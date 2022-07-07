<%@ Page Language="C#" AutoEventWireup="true" CodeFile="InterconsultaMedico.aspx.cs" Inherits="AtInternados_InterconsultaMedico" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../css/hestilo.css"/>
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
      <div class="contenedor_3" style="height:500px;">
      
        <div class="">

         <div class="row" style="margin-left:5px;">
          <div id="controlcbo_Especialidad" class="span6">
                <label for="cbo_Especialidad" style="display:inline; margin-top:10px;">Especialidad: </label>
                <select id="cbo_Especialidad" class="span4"; style="width:330px; margin-left:10px"></select>
            </div>
            <div id="controlcbo_Medico" class="span6">
                <label for="cbo_Medico" style="display:inline; margin-top:10px;">Médico: </label>
                <select id="cbo_Medico" class="span5" style="margin-left:44px; width:330px "></select>
            </div>
        </div>


       <div style="padding:0px 15px 15px 15px;">
            
            <div class="clearfix"></div>
        <div id="Tabla" class="tabla" style="height:220px;">
          
          <div class="hsuper_menu" style="height:220px; margin-top:0px;">
          <button id="btnCerrar" class="btn btn-mini" style="margin-left:810px; margin-top:10px;"><i class="icon-remove-circle"></i>&nbsp;&nbsp;Cerrar</button>
           <div class="resumen_datos hsuper_menu_datos" style="margin-top:0px" >
              <div class="datos_persona">
                <div ><img id = "fotopaciente" class="avatar2" src="../img/silueta.jpg" onerror="imgErrorPaciente(this);"/></div>
                <div class="datos_resumen_paciente">
                  <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                  <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                  <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
                  <input type="hidden" id="afiliadoId" />
                </div>
              </div>
            </div>

            <div class="hsuper_botones" style="width:90%;margin-top:-15px;">
                <div href="#" onclick="javascript:HC();"><strong>1</strong>. Historia Clínica Detallada</div>
            </div>
          </div>
              <table class="table table-hover" style=" font-size:12px;">
                <thead>
                  <tr>
                    <th></th>
                    <th>Med. Solicitante</th>
                    <th>Esp. de Interconsulta</th>
                    <th>Fecha</th>
                    <th>Motivo</th>
                  </tr>
                </thead>
                <tbody id="TInterconsultas">                </tbody>
              </table>
        </div>
        <div class="clearfix"></div>
        </div>

                <div class="row" style="margin-left:5px;">
            <div id="controltxt_Observacion" class="span12">
                <label for="txt_Observacion" style="display:inline; margin-top:10px;">Observación: </label>
                <textarea id="txt_Observacion" style="height:90px; width:770px;" class="span8" disabled="disabled"></textarea>
            </div>
        </div>

        <div class="row" style="margin-left:10px;"> 
            <div class="reff ref_4 Turnos_Libres">Pendientes</div>
            <div class="reff ref_1 Turnos_Ocupados">Vistos</div>
            <div class="reff ref_2 Turnos_Cancelado">Cancelados</div>
            <div class="reff ref_3 Turnos_Sobreturno">Atendidos</div>        

        </div>

        <div class="pie_gris">
            <div class="pull-right" style="margin-bottom:5px;">
              <a id="btnCancelar" class="btn btn-danger"><i class="icon-remove-circle icon-white"></i>&nbsp;Cancelar</a>
              <a id="btnConfirmar" class="btn btn-info"><i class="icon-ok icon-white"></i>&nbsp;Confirmar</a>
              <a id="btnImprimir" class="btn btn-info" style="display:none;"><i class="icon-print icon-white"></i>&nbsp;Imprimir</a>
            </div>
        </div>

      </div>
  </div>
</div>

<!--Pie de p�gina-->
<script type="text/javascript" src="../js/jquery-1.8.3.js"></script> 
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/Hospitales/AtInternados/InterconsultaMedico.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Interconsultas solicitadas</strong>";
</script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</body>
</html>

