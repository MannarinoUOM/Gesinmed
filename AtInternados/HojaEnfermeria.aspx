<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HojaEnfermeria.aspx.cs" Inherits="AtInternados_HojaEnfermeria" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
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
         <div class="control-group">
          <label class="control-label" for="cbo_Medico">Médico</label>
          <div class="controls">
            <select id="cbo_Medico"></select>
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtFecha">Fecha</label>
          <div class="controls">
            <input type="text" id="txtFecha"/>
        </div>
        </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="CargarPedidoporPaciente.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a>
                <a id="btnPedidos" style="display:none;" href="BuscarHojasEnfermeria.aspx" class="btn btn-warning">Hojas</a>  
                <a id="btnVolverAlPaciente" class="btn"><i class="icon-th-list"></i>&nbsp;Volver al Paciente</a>
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:100px;">
        <div class="datos_persona">
        <div><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
        <div class="datos_resumen_paciente">
            <input type="hidden" id="afiliadoId" value="" />
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a>&nbsp;&nbsp;&nbsp;</div>
          <div><span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span></div>
          <div><span>Seccional: <strong><span id="CargadoSeccional"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;<span>Sala: <strong><span id="CargadoSala"></span></strong></span>&nbsp;&nbsp;Cama: <strong><span id="CargadoCama"></span></strong></div>
          <div>Médico: <strong><span id="CargadoMedico"></span></strong>&nbsp;&nbsp;&nbsp;  </div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:430px;">
      
        <div class="">
           <div style="padding:0px 15px 15px 15px;">
            <div class="clearfix"></div>
            <div id="TablaInterconsultas" class="tabla" style="height:300px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Indicación</th>
                    <th>Cada (Hs.)</th>
                    <th>Observaciones</th>
                    <th>Realizado</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>


        <div class="row" style="margin-left:5px;">
            
           <div id="controlIndicacion" class="span8">
                    Indicación:
                    <textarea id="Indicacion" name="Indicacion" rows="2" style="margin-left:30px; width:500px;" class="span6"></textarea>
           </div>
           
           <div id="controlchk_Horas" class="span3">
                <label for="txtHoras" style="display:inline; margin-top:10px;">Cada </label>
                <input id="txtHoras" type="text" maxlength="2" class="span1 numero" style="width:18px;">
                <label for="chk_Horas" style="display:inline; margin-top:10px;">Hs. </label>
                <input id="chk_Horas" type="checkbox" style="display:none;">
                <label for="chk_Realizado" style="display:inline; margin-top:10px; margin-left:10px;">Realizado </label>
                <input id="chk_Realizado" type="checkbox">
            </div>
        </div>


        <div class="row" style="margin-left:5px;">
             
           <div id="controlObservaciones" class="span11">
            Observaciones:
            <input type="text" id="Observaciones" name="Observaciones" class="span6" style="width:500px;" maxlength="70" />
            <input id="btnCancelar" type="button" class="btn btn-danger" value="Cancelar" style="margin-left:40px; margin-top:-10px;" />
            <input id="btnAgregar" type="button" class="btn btn-success" value="Agregar" style="margin-top:-10px; margin-left:10px;" />
           </div>

        </div>
        </div>
           <div class="pie_gris">
            <div class="pull-right">
              <a class="btn pull-right" id="btnVolver"><i class="icon-th-list"></i>&nbsp;Volver al Paciente</a>
              <button id = "btnConfirmar" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
              <button id = "btnImprimir" class="btn btn-info" style="display:none;"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
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
<script src="../js/Hospitales/AtInternados/HojaEnfermeria.js" type="text/javascript"></script>


<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $("#CargadoMedico").html($("#cbo_Medico :selected").text());
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() - 10 -
				$('#hastaaqui').height()));
    });

    parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Pacientes Internados > <strong>Hoja de Enfermería</strong>";
</script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</body>
</html>

