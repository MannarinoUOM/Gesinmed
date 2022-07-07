<%@ Page Language="C#" AutoEventWireup="true" CodeFile="NuevoAfiliado_Diabetes.aspx.cs" Inherits="Pacientes_NuevoAfiliado_Diabetes" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Pacientes</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/webcam.js" type="text/javascript"></script>
</head>

<style>
html {overflow: hidden;}
</style>

<script language="JavaScript">
    webcam.set_api_url('Foto.aspx');
    webcam.set_quality(100);
    webcam.set_shutter_sound(false); 
 </script>

<body>

<div class="container">
  <div class="contenedor_1">
    <div class="contenedor_a" style="position:relative;margin-left:15px; width:850px;">
    
    <div id="Espereaqueguarde" style="text-align:center; position:absolute; width:100%; height:100%; background-color:White; z-index:5; opacity:0.9; display:none;">
    <div style="margin-top:200px; margin-bottom:10px;">
        <img src="../img/Espere.gif" />
    </div>
    <p id="Mensajedeespera">Guardando</p>
    </div>

      <div id="infoBaja" class="noti_aviso" style="display:none;"> DADO DE BAJA </div>
      <div class="datos_principales_contenedor" style="height:180px;">
        <div id="datos_webcam" class="datos_principales" style="height:140px;">
          <div class="foto_afiliado">
            <a class="editar_avatar" id="tomar_foto" href="javascript:AbrirCamara();"><br/><div>CARGAR</div></a>
            <img id="FotoFinal" src="../img/silueta.jpg"> </div>
          <div class="datos_principales_form">
            <div class="pull-left">
              <form class="form-horizontal" style="margin-left:-60px;">
                <div class="control-group">
                <label class="control-label"><strong>Tipo</strong></label>
                  <div class="controls">
                    <select id="cbo_tipo_doc" class="span1" style="width:80px;">
                    </select>
                    <input id="afiliadoID" value="0" type="hidden" />
                  <strong>&nbsp;Nro.</strong>&nbsp;&nbsp;<input id="txtdocumento" maxlength="8" class="span1" style="width:70px;" type="text" placeholder="sin puntos">
                  </div>
                </div>
              <div id="ControlNHC_Old" class="control-group">
                <label class="control-label"><strong>Nro. HC</strong></label>
                <div class="controls">
                  <input id="txt_NHC_UOM" maxlength="11" class="span2" style="width:195px;" type="text"></div>
              </div>
              <div id="Div2" class="control-group">
               <label class="control-label"><strong>HC Provisoria</strong></label> 
                  <input id="cbo_Provi" type="checkbox" class="controls checkbox" style="margin-left:10px;"/>
            </div>
               
    </form>
            </div>
            <div class="pull-left">
              <form class="form-horizontal" >
                <div id="ControlSeccional" style="display:none;">
                  <label class="control-label"><input type="checkbox" checked id="ck_UOM"/><div><strong>Afiliado OSUOMRA</strong></div>
                   </label>
                </div>
                 <div id="ControlApellidoyNombre" class="control-group">
                  <label class="control-label"><strong>Apellido y nombre</strong></label>
                  <div class="controls">
                    <input id="txtapellido" maxlength="60" class="span2" style="width:240px;" type="text" tabindex="1">
                    <input id="txtPaciente" maxlength="60" class="span3" type="hidden">
                  </div>
                </div>
                     <div id="controlcboSeccional" class="control-group">
                    <label class="control-label"><strong>Seccional</strong></label>
                    <div class="controls">
                        <input id="txtSeccionalId" type="hidden">
                        <input id="txtCodOS" type="hidden">
                        <select id="cboSeccional" class="span2" style="width:255px;"></select>
                        <select id="cbo_ObraSocial" class="span2" style="display:none;width:255px;"></select>
                    </div>
                </div>
              </form>
            </div>
            <div class="clearfix"></div>
            
            <form class="form-horizontal">

              </form>
            
          </div>
          <div class="webcam_box_contenedor">

    <div id="webcam2contenedor" style="width:300px;">
<br/>
<div class="webcam2box">
<script language="JavaScript">
    document.write(webcam.get_html(300, 300));
</script>
<div class="webcam2menu">
<a class="mano" id="SacarFoto">Tomar</a>
<a class="mano" id="btn_minimizarwebcam">Aceptar</a>
</div>
</div>

</div>        
            </div>
        </div>
      </div>
      <div>
        <ul class="nav nav-tabs" style="background-color:Grey;" data-tabs="tabs">
          <li class="active"><a data-toggle="tab" href="#tab1"> Datos principales</a></li>          
          <li><a data-toggle="tab" href="#tab2">Domicilio y contacto</a></li>
          <li><a data-toggle="tab" href="#tab3">Estudiante</a></li>
          <li><a data-toggle="tab" href="#tab4">P.M.I./P.I.</a></li>
        </ul>
      </div>
      
      <!--DATOS PRINCIPALES-->
      <div id="my-tab-content" class="tab-content">
        <div class="tab-pane active fade in DP" id="tab1">
          <div class="pull-left">
            <form class="form-horizontal" >
             <div id="controlcboCodPariente" class="control-group">
               <label class="control-label">Parentesco</label>
                <div class="controls">
                    <select id="cboCodPariente" class="span2">
                    </select>
                </div>
              </div>
              <div id="ControlSexo" class="control-group">
                <label class="control-label">Sexo</label>
                <div class="controls">
                  <label class="checkbox inline">
                    <input id="Sm" type="checkbox" id="inlineCheckbox1" value="option1">
                    Masculino </label>
                  <label class="checkbox inline">
                    <input id="Sf" type="checkbox" id="inlineCheckbox2" value="option2">
                    Femenino </label>
                </div>
              </div>

                <div id="controltxtNHC" class="control-group" style="display:none;">
                <label class="control-label">Nro. HC</label>
                <div class="controls">
                  <input id="txtNHC" maxlength="11" class="span2" type="text" disabled></div>
              </div>

              <div id="Div1" class="control-group">
                <label class="control-label">Fecha Vencimiento</label>
                <div class="controls">
                  <input id="txtFechaBaja" maxlength="10" class="span2" type="text"></div>
              </div>

                            <div id="ControlCUIT" class="control-group">
                <label class="control-label">CUIT Empresa</label>
                <div class="controls">
                  <input id="txtcuit" maxlength="11" class="span2" type="text">
                  <div class="label_derecho"><i class="icon-arrow-left"></i>&nbsp;&nbsp;&nbsp;<span id="RazonSocial"></span></div>

                </div>
              </div>

            </form>
          </div>
          <div class="pull-left">
            <form class="form-horizontal" >
              <div id="ControlFechaNacimiento" class="control-group">
                <label class="control-label">Fecha Nacimiento</label>
                <div class="controls">
                  <input id="txtFechaNacimiento" maxlength="10" class="span2" type="text" placeholder="dia/mes/año">
                </div>
              </div>

              <div id="ControlDiscapacidad" class="control-group">
                <label class="control-label">Discapacidad</label>
                <div class="controls">
                    <select id="cbo_Discapacidad" type="text" class="span2">
                        <option value="0">Seleccione</option>
                        <option value="1" selected>No</option>
                        <option value="2">Psíquica</option>
                        <option value="3">Física</option>
                        <option value="4">Auditiva</option>
                        <option value="5">Visual</option>
                        <option value="6">Multisensorial</option>
                    </select>
                  
                  
                  <input id="txtFVDiscapacidad" maxlength="10" class="span2" type="text" placeholder="dia/mes/año"/>

                  </div>
              </div>

              <div id="ControlCUIL" class="control-group">
                <label class="control-label">CUIL</label>
                <div class="controls">
                  <input id="txtcuil" maxlength="11" class="span2" type="text">
                </div>
              </div>

              <div id="ControlCUILTITULAR" class="control-group">
                <label  class="control-label">CUIL Titular</label>
                <div class="controls">
                  <input id="txtcuiltitu" maxlength="11" class="span2" type="text">
                  <div class="label_derecho"><i class="icon-arrow-left"></i>&nbsp;&nbsp;&nbsp;<span id="NombreTitular"></span></div>
                </div>
              </div>



            </form>
          </div>
              <div class="span8" style="margin-top:-15px;">
                  <label for="txtemail" class="control-label" style="display:inline; margin-right:30px;">Observaciones</label>
                  <input id="txtemail" maxlength="60" type="text" class="span6" style="display:inline; width:455px;">
              </div>
          <div class="clearfix"></div>

<form class="form-horizontal DP pull-left" style="margin-top:-14px;">


</form>          
          
        </div>
        
        <!--CONTACTO Y DOMICILIO-->
        <div class="tab-pane fade in" id="tab2">
          <div class="label_top_grupo">
            <div class="label_top">
              <div>Calle</div>
              <input id="txtcalle" maxlength="60" type="text" class="span3">
            </div>
            <div class="label_top">
              <div>Número</div>
              <input id="txtnumero" type="text" maxlength="10" class="span1">
            </div>
            <div class="label_top">
              <div>Piso</div>
              <input id="txtpiso" type="text" maxlength="6" class="span1">
            </div>
            <div class="label_top">
              <div>Depto.</div>
              <input id="txtdpto" type="text" maxlength="6" class="span1">
            </div>
            <div class="label_top">
              <div>Cod Postal.</div>
              <input id="txtcodpos" maxlength="10" type="text" class="span3">
            </div>
            
            <div class="clearfix"></div>
          </div>
          
          <div class="label_top_grupo">
          <div class="label_top">
              <div>Localidad</div>
              <input id="txtlocalidad" maxlength="60" type="text" class="span2">
            </div>
            <div class="label_top">
              <div>Provincia</div>
              <select id="cboProvincia" type="text" class="span2">
              </select>
            </div>


            <div class="clearfix"></div>
          </div>

          <div class="label_top_grupo">
                      <div class="label_top">
              <div>Celular</div>
              <input id="txtcelular" maxlength="60" type="text" class="span3">
            </div>
            <div class="label_top" id="ControlTelefono">
              <div>Teléfono</div>
              <input id="txttelefono" maxlength="13" placeholder="Ej. 43625910" class="span2" type="text">
            </div>
          <div class="clearfix"></div>
          </div>
          
        </div>

        <!--ESTUDIANTE-->
        <div class="tab-pane fade in" id="tab3">
          <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline">¿Es Estudiante?
              <input id="cbo_EsEstudiante" type="checkbox" style="margin-top:-16px;">
            </label>
            <div class="clearfix"></div>
          </div>
          </div>
          <br />
          <div class="label_top_grupo">
            <div class="label_top">
              <div>Año del ultimo certificado presentado</div>
              <input id="txt_AnioCertificado" maxlength="4" type="text" class="span1">
            </div>
            <div class="clearfix"></div>
          </div>
                 
            <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline">Presentó primer Certificado 
                <input id="cbo_Certificado1" type="checkbox" style="margin-top:-16px;">
              </label>
            </div>
            <div class="clearfix"></div>
            </div>

            <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline">Presentó segundo Certificado 
                <input id="cbo_Certificado2" type="checkbox" style="margin-top:-16px;">
              </label>
            </div>   
            <div class="clearfix"></div>
            </div>


        </div>




        <!--PMI/PI-->
        <div class="tab-pane fade in" id="tab4">
          <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline">P.M.I.
              <input id="cbo_PMI" type="radio" name="pmipi" style="margin-top:0px;">
            </label>
            <div class="clearfix"></div>
          </div>
          </div>

           <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline">P.I.
              <input id="cbo_PI" type="radio" name="pmipi" style="margin-top:0px;">
            </label>
            <div class="clearfix"></div>
          </div>
          </div>

          <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline">No Tiene Plan
              <input id="cbo_NTP" type="radio" checked name="pmipi" style="margin-top:0px;">
            </label>
            <div class="clearfix"></div>
          </div>
          </div>


        </div>














      </div>
      <div class="pie_gris">
        <div class="box_informativo_a pull-left"> <span><img src="../img/info_icon.png"></span> <span><strong>Alta</strong> el <span id="salta"></span></span><span> <strong> Actualizado</strong> el <span id="sactualizado"></span></span>
          <div class="clearfix"></div>
        </div>
        <a id="btnModificarPaciente" class="btn btn-info pull-right">&nbsp;&nbsp;&nbsp;Alta</a> <a onclick="javascript:window.close();" style="display:none;" class="btn pull-right">Cancelar</a>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</div>

    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Gente/Gente_Diabetes.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>    
    <script src="../js/CUIL.js" type="text/javascript"></script>
    <script src="../js/Hospitales/ObraSociales/ObraSociales.js" type="text/javascript"></script>

<!--Barra sup--> 


</body>
</html>

<script language="JavaScript">
    webcam.set_hook('onComplete', 'my_completion_handler');


    function AbrirCamara() {
        $('#datos_webcam').animate({ height: "430" }, 200);
    }

    $("#btn_minimizarwebcam").click(
   function () {
       $('#datos_webcam').animate({ height: "100" }, 200);
   });

    $("#SacarFoto").click(

   function () {
       if ($("#txtcuil").val() != "") {
           take_snapshot();
       }
       else {
           alert("Falta Cargar el CUIL");
       }
   });


    function take_snapshot() {
        // take snapshot and upload to server
        webcam.set_api_url('Foto.aspx?CUIL=' + $("#txtcuil").val());
        webcam.snap();
    }

    function my_completion_handler(msg) {
        // extract URL out of PHP output
        if (msg.match(/(http\:\/\/\S+)/)) {
            var image_url = RegExp.$1;
            // show JPEG image in page
            $("#FotoFinal").attr('src', image_url);

            // reset camera for another shot
            webcam.reset();
        }
        else alert("Error: " + msg);
    }
    </script>

    <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Paciente NO encontrado</h3>
  </div>
  <div class="modal-body">
    <p>El paciente no se encuentra en el sistema.</p>
    <p>Verifique...</p>
    <ul>
    <li>Que haya ingreso de forma correcta los datos de busqueda, como el DNI, CUIL o APELLIDO Y NOMBRE.</li>
    <li>Que de haber dado de alta el afiliado y le está mostrando este mensaje, por favor comuniquese con SITEMAS</li>    
    <li>De haber verificado el punto anterior, ¿Desea darlo de alta?</li>    
    </ul>
    <p></p>
    <p></p>
    <p></p>

  </div>
  <div class="modal-footer">
    <button onclick="javascript:window.close();" class="btn" data-dismiss="modal" aria-hidden="true">No</button>
    <button class="btn" data-dismiss="modal" aria-hidden="true">Si</button>    
  </div>
   </div>



 <div id="myModalTitular" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">    
    <h3 id="H1">TITULAR NO encontrado</h3>
  </div>
  <div class="modal-body">
    <p>El Titular del paciente no se encuentra en el sistema Local.</p>
    <p>Verifique...</p>
    <ul>
    <li>Que haya ingreso de forma correcta el CUIL del Titular.</li>
    <li>Verifique en el PADRON UOM si está el Titular, de ser asi, actualicelo.</li>
    <li>Que de haber dado de alta al Titular y se está mostrando este mensaje, por favor comuniquese con SISTEMAS</li>    
    <li>De haber verificado los puntos anteriores. Es necesario dar de alta al titular. ¿Desea hacerlo ahora?</li>    
    </ul>
    <p></p>
    <p></p>
    <p></p>

  </div>
  <div class="modal-footer">
    <button onclick="javascript:window.close();" class="btn" data-dismiss="modal" aria-hidden="true">No</button>
    <button onclick="javascript:self.location='NuevoAfiliado.aspx';" class="btn" data-dismiss="modal" aria-hidden="true">Si</button>    
    <button onclick="javascript:IgnorarTitular();" class="btn" data-dismiss="modal" aria-hidden="true">Ignorar</button>    
  </div>
   </div>


    <div id="ModalExistePaciente" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">    
    <h3 id="H2">El paciente que está cargando ya existe</h3>
  </div>
  <div class="modal-body">
    <p>Tenga en cuenta que...</p>
    <ul>
    <li>Si continua modificando los datos, al actualizarlos, puede llegar a perderse toda la información del paciente anterior.</li>
    <br />
    <li>¿Desea seguir cargando el paciente?.</li>
    </ul>
    <p></p>
    <p></p>
    <p></p>

  </div>
  <div class="modal-footer">
    <button onclick="#" class="btn" data-dismiss="modal" aria-hidden="true">Si</button>    
    <button onclick="javascript:window.close();" class="btn" data-dismiss="modal" aria-hidden="true">No</button>
    <button onclick="javascript:if($('#txtdocumento').val().length>=7){self.location='NuevoAfiliado.aspx?Documento='+$('#txtdocumento').val()+'';}else{if($('#txtcuil').val().length>=7){self.location='NuevoAfiliado.aspx?NHCDocumento='+$('#txtcuil').val()+'';}}" class="btn" data-dismiss="modal" aria-hidden="true">Ver Paciente</button>    
  </div>
   </div>