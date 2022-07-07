<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ProEndoscoFeda.aspx.cs" Inherits="Endoscopia_f_ProEndoscoFeda" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<style>
.Fila1{width:400px; display:inline-block}
.TitulosDatos{width:110px; display:inline-block}
.label_dibujo2{margin-left: 24px;display:inline-block;}
#div_dibujo2 input{margin-top:0px; margin-left:2px;}
#div_dibujo2 label{cursor:pointer;}
</style>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form onsubmit="return false;" class="form-horizontal" >
        
        <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC">
                      </select>          
            </div>
        </div>

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
            <a id="btnBuscarPaciente" href="BuscarPacientes.aspx" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>
      </form>

      <input id="afiliadoId" type="hidden"/>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="PlanificarCirugia.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:460px;"> 

               <div style="background-color:White;height: 438px;position: absolute;width: 900px; padding-left:10px;display:none;" id="div_dibujo2">                
                <b>Estadisticas</b>
                
                <div>                
                <b><span style="width:183px;display:inline-block;">Notas:</span></b><br />                
                <textarea id="txt_notas" style="width:800px;height: 107px;"></textarea>
                </div>

                <div>                                
                <span>Resultado 1</span><select id="cbo_resultado1"></select><br />
                <span>Resultado 2</span><select id="cbo_resultado2"></select><br />
                <span>Resultado 3</span><select id="cbo_resultado3"></select><br />
                <span>Resultado 4</span><select id="cbo_resultado4"></select><br />

                <table>
                <td>
                    <td style="width: 70px;">Video</td>
                    <td><textarea id="txt_video" style="width:730px;"></textarea></td>
                </td>
                </table>

                </div>               

               </div>

      
              <form onsubmit="return false;" id="frm_" name="frm_" style="padding-left:10px;">
                            
              <div><span class="TitulosDatos">Fecha: </span><span id="span_fecha" class="Fila1"></span><span class="TitulosDatos">Monitoreo: <span id="span_monitoreo"></span></span></div>
              <div><span class="TitulosDatos">Hora Inicio: </span><span id="span_hora_inicio" class="Fila1"></span><span class="TitulosDatos">Hora Fin: <span id="span_hora_fin"></span></span></div>              
              <div><span class="TitulosDatos">Especialidad: </span><span id="Span_Especialidad" class="Fila1"></span><span class="TitulosDatos">Endoscopista: </span><span id="Span_Cirujano"></span></div>              
              <div><span class="TitulosDatos">Anestesista: </span><span id="Span_Anestesista" class="Fila1"></span><span class="TitulosDatos">Asistente: </span><span id="Span_Instrument"></span></div>
              <div>Diagnóstico Preoperatorio: <span id="span_diagnostico_preoperatorio"></span></div>

              <div style="margin-top: 5px;">Esófago</div>
              <textarea id="txt_Esofago" class="input-xxlarge" rows="2" style="width:880px;height: 36px;"></textarea>

              <br /><div>Estómago</div>
              <textarea id="txt_Estomago" class="input-xxlarge" rows="2" style="width:880px;height: 36px;"></textarea>

              <br /><div>Duodeno</div>
              <textarea id="txt_Duodeno" class="input-xxlarge" rows="2"  style="width:880px;height: 36px;"></textarea>
                
              <br /><div>Impresión diagnóstica</div>
              <textarea id="txt_impresion_diagnostica" class="input-xxlarge" rows="2"  style="width:880px;height: 36px;"></textarea>

              <br />              
              
              <input id="ck_biopsia" name="ck_biopsia" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline;margin-top: 0px;">
              <label for="ck_biopsia" style="display:inline; margin-right: 10px;">Biopsias</label>

              <input id="ck_cepillado" name="ck_cepillado" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:none;margin-top: 0px;">
              <label for="ck_cepillado" style="display:none; margin-right: 10px;">Cepillado</label>          
              

           
        
         </form>
         
<div style="height:120px;width:100%;background-color:#CCCCCC;margin-top:5px;">
<div class="pull-right" style="padding:5px; height:120px;">
  
  <a id="btn_dibujo2" class="btn" style="margin-right:100px;display:none;">Estadísticas</a>

  <a id="btnVolver" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <a id="btn_cancelear_todo" class="btn btn-danger">Cancelar</a>
  <a id = "btnGuardar" class="btn btn-info" ><i class=" icon-ok icon-white"></i>&nbsp;Guardar e Imprimir</a>
</div>
</div>
      </div>
    </div>
  </div>
</div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
    <script src="../js/Hospitales/Endoscopia/ProEndoscoFeda.js" type="text/javascript"></script>  
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>

<script src="../js/General.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Endoscopía > Turnos > Planificar Endoscopía > <strong>VEDA</strong>";

</script> 

</body>
</html>




