<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargarAtencion.aspx.cs" Inherits="Guardia_CargarAtencion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <style>
        .dropdown-menu { max-height: 250px; max-width: 800px; font-size:11px; overflow-y: auto; overflow-x: hidden; }
    </style>

</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px; margin-top:-30px;">
  <div class="contenedor_1" style="height:600px;">
      <div class="resumen_datos" style="height:80px;">
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
          <div class="datos_resumen_paciente" style="font-size:12px;">
          <input type="hidden" value="" id="afiliadoId" />
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <div><span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span></div>
          <div><span>Seccional: <strong><span id="CargadoSeccional"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Telefono: <strong><span id="CargadoTelefono"></span></strong></span></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:435px;">
       <form id="frm_" name="frm_">
        <div class="tabbable" style="margin-left:5px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Atención</a></li>
                <li><a href="#tab2" data-toggle="tab">Estudio Solicitados</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">
                <div style="padding:0px 15px 0px 15px; height:320px;">
                <div class="row">
                    <div class="span12">
                        <div id="controlmotivoconsulta" class="control-group">
                            <span class="span2" style="width:170px; margin-right:5px; margin-top:5px;">Motivo de Consulta:</span><textarea id="motivoconsulta" name="motivoconsulta" rows="3" cols="100" style="width:60%"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                     <div class="span12">
                        <div id="controlevolucion" class="control-group">
                            <span class="span2" style="width:170px; margin-right:5px;margin-top:5px;">Evolución: </span><textarea id="evolucion" name="evolucion" rows="1" cols="100" style="width:60%;"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="span12">
                        <div id="controlcbo_ICD10" class="control-group">
                            <span class="span2" style="width:170px; margin-right:5px;margin-top:5px;">Diagnóstico ICD10: </span>
                                <input class="typeahead span7" id="cbo_ICD10" type="text" data-provide="typeahead" autocomplete="off">
                                <input type="hidden" id="diag_nombre" />
                                <input type="hidden" id="id_val"  value="0"/>
                        </div>
                    </div>
                </div>
                                    <div class="row">
                    <div class="span12">
                        <div id="controlInterconsulta" class="control-group">
                            <span class="span2" style="width:170px; margin-right:5px;margin-top:5px;">Solicitar Interconsulta con: </span><textarea id="Interconsulta" name="Interconsulta" rows="1" cols="100" style="width:60%;"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                     <div class="span12">
                        <div id="controlIndicaciones" class="control-group">
                            <span class="span2" style="width:170px; margin-right:5px;margin-top:5px;">Indicaciones Enfermería: </span><textarea id="Indicaciones" name="Indicaciones" rows="1" cols="100" style="width:60%;"></textarea>
                        </div>
                    </div>
                </div>
                    <div class="row">
                    <div class="span8">
                        <div id="controlMotivoEgreso" class="control-group">
                            <span class="span2" style="width:170px; margin-right:5px;margin-top:5px;">Motivo de Alta: </span><select id="MotivoEgreso" name="MotivoEgreso" class="span7" style="width:60%;">
                            </select>
                        </div>
                    </div>
                    </div>
                   <div class="row">
                   <div class="span3">
                        <div id="controlchkPolicial" class="control-group">
                             <label for="chkPolicial" style="display:inline; margin-left:15px; margin-right:5px;">Con Intervención Policial</label><input id="chkPolicial" name="chkPolicial" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px; margin-left:15px;" />
                             
                             <%--<input id="chkInternado" name="chkInternado" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />--%>                            
                        </div>
                    </div>
                    <div class="span4">
                        <div id="controlchkInternado" class="control-group">
                            <label for="chkInternado" style="display:inline; margin-left:10px; margin-right:10px">Quedo Internado</label>
                             <label style="display:inline; margin-left:20px; margin-right:5px" for="QuedaIntsi">Sí</label>
                             <input id="QuedaIntsi" type="radio" name="QuedaInt"/>
                             <label style="display:inline; margin-left:20px; margin-right:5px" for="QuedaIntno">No</label>
                             <input id="QuedaIntno" type="radio" name="QuedaInt"/>    
                        </div>     
                    </div>
                        <div class="span4">
                            <div id="controlchkART" class="control-group">
                                   <label for="chkART" style="display:inline; margin-left:5px; margin-right:5px;">Accidente ART</label>
                                   <label style="display:inline; margin-left:20px; margin-right:5px" for="ARTsi">Sí</label>
                                    <input id="ARTsi" type="radio" name="ART"/>
                                   <label style="display:inline; margin-left:20px; margin-right:5px" for="ARTno">No</label>
                                    <input id="ARTno" type="radio" name="ART"/>
                                   <%--<input id="chkART" name="chkART" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px; margin-left:15px;" /> --%>
                                </div>
                        </div>
                    </div>
            </div>
            </div>
            <div class="tab-pane" id="tab2">
                <div style="padding:0px 15px 0px 15px; height:320px;overflow-x:hidden;">
                
                <div class="row" style="margin-left:0px;">
                    <div class="span5">
                        <div id="controlchkLab" class="control-group">
                             <input id="chkLab" name="chkLab" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="chkLab" style="display:inline; margin-left:5px; margin-right:5px;">Laboratorio</label>
                        </div>
                    </div>
                        <div class="span5">
                            <div id="controlchkRayos" class="control-group">
                                    <input id="chkRayos" name="chkRayos" type="checkbox" class="input-xlarge" style="vertical-align:middle; margin-right:5px;" /><label for="chkRayos" style="display:inline; margin-right: 10px;">RX</label>
                                </div>
                        </div>
                 </div>
                 <div class="row" style="margin-left:0px;">
                    <div class="span5">
                        <div id="controlchkTAC" class="control-group">
                             <input id="chkTAC" name="chkTAC" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="chkTAC" style="display:inline; margin-left:5px; margin-right:5px;">TAC</label>
                        </div>
                    </div>
                        <div class="span5">
                            <div id="controlchkEco" class="control-group">
                                    <input id="chkEco" name="chkEco" type="checkbox" class="input-xlarge" style="vertical-align:middle; margin-right:5px;" /><label for="chkEco" style="display:inline; margin-right: 10px;">Ecografia</label>
                                </div>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                    <div class="span12">
                        <div id="controlOtrosEstudios" class="control-group">
                            <label for="OtrosEstudios">Otros Estudios</label><textarea id="OtrosEstudios" name="OtrosEstudios" rows="1" cols="100" style="width:60%;"></textarea>
                        </div>
                    </div>
                </div>

                </div>
            </div>
          </div>
         </div>
         </form>
         
<div class="pie_gris">
  <a id="btnGuardar" class="btn btn-info pull-right"><i class="icon-ok icon-white"></i>&nbsp;Guardar</a> 
      <a id="btnVolver" class="btn pull-right"><i class="icon-arrow-left"></i>&nbsp;Volver</a> 
</div>
      </div>
  </div>
</div>
<!--Pie de p�gina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Guardia/CargarAtencion.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });
//    parent.document.getElementById("DondeEstoy").innerHTML = "Guardia > <strong>Cargar Atención de Pacientes en Guardia</strong>";
</script> 
</body>
</html>



