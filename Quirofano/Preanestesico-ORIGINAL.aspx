<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Preanestesico-ORIGINAL.aspx.cs" Inherits="Quirofano_Preanestesico_ORIGINAL" %>

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

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form class="form-horizontal" >

        <div id="controlcbo_TipoDOC" class="control-group">
         <label class="control-label" for="cbo_TipoDOC">Tipo</label>
         <div class="controls">
            <select id="cbo_TipoDOC"></select>          
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
      <div class="resumen_datos" style="height:155px;">
        
        <div class="datos_persona" >
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas()" class="ver_mas_datos">Ver más</a></div>

          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>

          <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span>
          <div><span>Urgencia: <strong><span id="CargadoUrgencia"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Fecha: <strong><span id="CargadoFecha"></span></strong></span> </div>
          <div><span>Diagnóstico: <strong><span id="CargadoDiagnostico"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Anestesista: <strong><span id="CargadoAnestesista"></span></strong></span> </div>
        <div><span>Anestesia: <strong><span id="CargadoAnestesia"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Observaciones: <strong><span id="CargadoObservaciones"></span></strong></span> </div>
        </div>
        
      </div>
      </div>

      <input id="afiliadoId" type="hidden"/>

      <div class="contenedor_3" style="height:400px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos de Preanestesico</span></div>
      
              <form id="frm_" name="frm_">
        <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Signos Vitales</a></li>
                <li><a href="#tab2" data-toggle="tab">Riesgos Quirúrgicos</a></li>
                <li><a href="#tab3" data-toggle="tab">Hemoterapia</a></li>
                <li><a href="#tab4" data-toggle="tab">Laboratorio</a></li>
                <li><a href="#tab5" data-toggle="tab">Antecedentes</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">
                <div style="padding:0px 15px 0px 15px; height:280px;">
                <div class="row">
                    <div class="span5">
                        <div id="controlTA" class="control-group">
                            <label for="TA">TA</label><input id="TA" name="TA" type="text"/>
                        </div>
               
                    </div>
                    <div class="span5">
                        <div id="controlFC" class="control-group">
                            <label for="FC">FC</label><input id="FC" name="FC" type="text"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                     <div class="span5">
                        <div id="controlTEMP" class="control-group">
                            <label for="TEMP">TEMP</label><input id="TEMP" name="TEMP" type="text"/>
                        </div>
                    </div>
                        <div class="span5">
                        <div id="controlFR" class="control-group">
                            <label for="FR">FR</label><input id="FR" name="FR" type="text"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="span5">
                        <div id="controlchkAntiTet" class="control-group">
                            <label for="chkAntiTet" style="display:inline; margin-right: 10px;">Vacuna Anti-Tetanica</label><input id="chkAntiTet" name="chkAntiTet" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                        </div>
                    </div>
                    <div class="span5">
                        <div id="controlchkAyuno" class="control-group">
                                <label for="chkAyuno" style="display:inline; margin-right: 10px;">Ayuno</label><input id="chkAyuno" name="chkAyuno" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                            </div>
                    </div>
                </div>
                  <div class="row">
                    <div class="span5">
                        <div id="controlObservaciones" class="control-group">
                            <label for="Observaciones">Observaciones</label>
                            
                            <textarea rows="2" cols="50" id="Observaciones" name="Observaciones"></textarea>                           
                            
                            
                        </div>
                    </div>
                    <div class="span5">
                        <div id="controlHora" class="control-group">
                            <label for="Hora">Hora</label><input id="Hora" name="Hora" type="text" maxlength="5"/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div class="tab-pane" id="tab2">
                <div style="padding:0px 15px 0px 15px; height:280px;">

                 <div class="row">
                     <div class="span5">
                        <div id="controlFecha" class="control-group">
                            <label for="Fecha">Fecha</label><input id="Fecha" name="Fecha" type="text"/>
                        </div>
                    </div>
                     <div class="span5">
                        <div id="controlchkpedido" class="control-group">
                           <label for="chkpedido" style="display:inline; margin-right: 10px;">Pedido de Monitorista</label><input id="chkpedido" name="chkpedido" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                        </div>
                    </div>
                 </div>
                 <div class="row">
                    <div class="span5">
                        <div id="controlTipo" class="control-group">
                            <label for="Tipo">Tipo</label>
                            <select id="Tipo" name="Tipo" class="input-xlarge">
                            <option value="0"></option>
                            <option value="1">Riesgo Habitual</option>
                            <option value="2">Riesgo Moderado</option>
                            <option value="3">Riesgo Alto</option>
                            </select>
                        </div>
                    </div>
                 </div>
                </div>
            </div>
             <div class="tab-pane" id="tab3">
                <div style="padding:0px 15px 0px 15px; height:280px;">
                    <div class="row">
                    <div class="span5">
                        <div id="controlgrupo" class="control-group">
                              <label for="grupo">Grupo</label><input id="grupo" name="grupo" type="text"/>
                        </div>
                    </div>
                        <div class="span5">
                            <div id="controfactor" class="control-group">
                                    <label for="factor">Factor</label><input id="factor" name="factor" type="text"/>
                                </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span5">
                             <div id="controlunidades" class="control-group">
                                <label for="unidades">Unidades</label><input id="unidades" name="unidades" type="text"/>
                            </div>
                        </div>
                    <div class="span5">
                         <div id="controlchkpedidosangre" class="control-group">
                                 <label for="chkpedidosangre" style="display:inline; margin-right: 10px;">Pedido de Sangre</label><input id="chkpedidosangre" name="chkpedidosangre" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                            </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="tab4">
                <div style="padding:0px 15px 0px 15px; height:280px;">
                    <div class="row">
                    <div class="span5">
                        <div id="controlFechaLab" class="control-group">
                              <label for="FechaLab">Fecha</label><input id="FechaLab" name="FechaLab" type="text"/>
                        </div>
                    </div>
                        <div class="span5">
                            <div id="controlHematocrito" class="control-group">
                                    <label for="Hematocrito">Hematocrito</label><input id="Hematocrito" name="Hematocrito" type="text"/>
                                </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span5">
                             <div id="controlHemoglobina" class="control-group">
                                <label for="Hemoglobina">Hemoglobina</label><input id="Hemoglobina" name="Hemoglobina" type="text"/>
                            </div>
                        </div>
                    <div class="span5">
                         <div id="controlKPTT" class="control-group">
                                 <label for="KPTT">KPTT</label><input id="KPTT" name="KPTT" type="text"/>
                            </div>
                    </div>
                    </div>
                          <div class="row">
                        <div class="span5">
                             <div id="controlQuick" class="control-group">
                                <label for="Quick">Quick</label><input id="Quick" name="Quick" type="text"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-pane" id="tab5">
                <div style="padding:0px 15px 0px 15px; height:280px;">
                    <div class="row">
                    <div class="span5">
                        <div id="controlchkDBT" class="control-group">
                               <label for="chkDBT" style="display:inline; margin-right: 10px;">DBT</label><input id="chkDBT" name="chkDBT" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                        </div>
                    </div>
                        <div class="span5">
                            <div id="Div3" class="control-group">
                                    <label for="chkEnfResp" style="display:inline; margin-right: 10px;">Enf. Respiratorio</label><input id="chkEnfResp" name="chkEnfResp" type="checkbox" class="input-xlarge" style="vertical-align:middle;" />
                                </div>
                        </div>                        
                    </div><hr style="margin-top: 5px; margin-bottom: 5px;" />
                    <div class="row">
                        <div class="span5">
                             <div id="controlEnfResp" class="control-group">
                                <label for="EnfResp">Enf. Respiratorio</label><input id="EnfResp" name="EnfResp" type="text"/>
                            </div>
                        </div>
                    <div class="span5">
                         <div id="controlOtras" class="control-group">
                                 <label for="Otras">Otras</label><input id="Otras" name="Otras" type="text"/>
                            </div>
                    </div>
                    </div><hr style="margin-top: 5px; margin-bottom: 5px;" />
                     <div class="row">
                        <div class="span10">
                             <div id="controlObservacion class="control-group">
                                <label for="Observacion">Observación</label>
                                <textarea rows="4" cols="50" id="Observacion" name="Observacion" style="width:100%"></textarea>                                  
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
         </div>
         </form>
         
<div class="pie_gris">
<div class="pull-right" style="padding:5px; height:70px;">
  <a id="btnVolver" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <a id = "btnImprimir" class="btn"><i class="icon-print"></i>&nbsp;Guardar e Imprimir</a>
</div>
</div>

</div>

      </div>
    </div>
  </div>
</div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
    <script src="../js/Hospitales/Quirofano/Preanestesico.js" type="text/javascript"></script>  
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>

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



    parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > <strong>Pre Anestesia</strong>";

</script> 

</body>
</html>


