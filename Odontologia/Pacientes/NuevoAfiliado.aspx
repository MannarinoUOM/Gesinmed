<%@ Page Language="C#" AutoEventWireup="true" CodeFile="NuevoAfiliado.aspx.cs" Inherits="Pacientes_NuevoAfiliado" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta Http-Equiv="Cache-Control" Content="no-cache">
<meta Http-Equiv="Pragma" Content="no-cache">
<meta Http-Equiv="Expires" Content="0">
<meta Http-Equiv="Pragma-directive: no-cache">
<meta Http-Equiv="Cache-directive: no-cache">
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

<%--<script language="JavaScript">
    webcam.set_api_url('Foto.aspx');
    webcam.set_quality(100);
    webcam.set_shutter_sound(false); 
 </script>--%>

<body>


<div class="container">
  <div class="contenedor_1">
    <div class="contenedor_a" style="position:relative;margin-left:15px; width:880px; height:520px;">
    
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
            <img id="FotoFinal" src="../img/silueta.jpg"> 
            </div>

          <div class="datos_principales_form">
            <div class="pull-left">
              <form class="form-horizontal" style="margin-left:-60px;">
                <div class="control-group">
                <label class="control-label"><strong>Tipo</strong></label>
                  <div class="controls">
                    <select id="cbo_tipo_doc" class="span1" style="width:80px;">
                    </select>
                    <input id="afiliadoID" value="0" type="hidden" />
                  <strong>&nbsp;Nro.</strong>&nbsp;&nbsp;<input id="txtdocumento" maxlength="8" class="span1 numero" style="width:70px;" type="text" placeholder="sin puntos">
                  </div>
                </div>
              <div id="ControlNHC_Old" class="control-group">
                <label class="control-label"><strong>Nro. HC</strong></label>
                <div class="controls">
                  <input id="txt_NHC_UOM" maxlength="11" class="span2 numero" style="width:195px;" type="text"></div>
              </div>
              <div id="Div2" class="control-group">
               <label class="control-label"><strong>HC Provisoria</strong></label> 
                  <input id="cbo_Provi" type="checkbox" class="controls checkbox datos" style="margin-left:10px;"/>
            </div>
               
    </form>
            </div>
            <div class="pull-left">
              <form class="form-horizontal" >
                <div id="ControlSeccional" style="display:none;">
                  <label class="control-label"><input type="checkbox" class="datos" checked id="ck_UOM"/><div><strong>Afiliado OSUOMRA</strong></div>
                   </label>
                </div>
                 <div id="ControlApellidoyNombre" class="control-group">
                  <label class="control-label"><strong>Apellido y nombre</strong></label>
                  <div class="controls">
                    <input id="txtapellido" maxlength="60" class="span2 datos" style="width:240px;" type="text" tabindex="1">
                    <input id="txtPaciente" maxlength="60" class="span3 datos" type="hidden">
                  </div>
                </div>
                     <div id="controlcboSeccional" class="control-group">
                    <label class="control-label"><strong>Seccional</strong></label>
                    <div class="controls">
                        <input id="txtSeccionalId" type="hidden">
                        <input id="txtCodOS" type="hidden">
                        <select id="cboSeccional" class="span2 datos" style="width:255px;"></select>
                        <select id="cbo_ObraSocial" class="span2 datos" style="display:none;width:255px;"></select>
                    </div>
                </div>
              </form>
            </div>
            <div class="clearfix"></div>
            
            <form class="form-horizontal">

              </form>
            
          </div>


        <%--  CAMARA--%>
          <div class="webcam_box_contenedor" style="height:280px;overflow:hidden">         
<!-- Webcam video snapshot -->
<canvas id="canvas" width="640" height="480" style="float:right; display:none"></canvas>

    <div id="webcam2contenedor" style="width:100%;height:260px;">
<br/>
<div  style="height:240px; width:100%; overflow:hidden; padding-right:5px">

<!-- Stream video via webcam -->
<div class="video-wrap" style="width:250px; float:left"><video style="width:250px" id="video" playsinline autoplay></video></div>
<!-- Imagen vista previa -->
<div style="float:right; width:250px; margin-right:5px"><img id ="imgtest" style="height:190px; width:250px" runat="server" src="../img/perfilFaltante.jpg"/></div>  

<div class="webcam2menu" style="height:40px; width:97.5%">
<div class="controller" style="position:absolute">
    <a id="snap" class="btn"><i class="icon-camera"></i>&nbsp;&nbsp;Sacar Foto</a>
    <a class="btn" id="btnGuardarFoto" onclick="uploadFile()" style="display:none"><i class="icon-hdd"></i>&nbsp;&nbsp;Guardar Foto </a>
    <a class="btn" id="btn_minimizarwebcam"  ><i class="icon-chevron-up"></i>&nbsp;&nbsp;Cerrar Cámara</a>
</div>
</div>

</div>

</div>      
            </div>



        </div>
      </div>
      <div>
        <ul class="nav nav-tabs tabslist" style="background-color:#D8D8D8;" data-tabs="tabs">
          <li class="active datos"><a data-toggle="tab" href="#tab1"> Datos principales</a></li>          
          <li class="datos"><a data-toggle="tab" href="#tab2">Domicilio y contacto</a></li>
          <li class="datos" id="tabDocu" style="display:none;"><a data-toggle="tab" href="#tab5">Documentación</a></li>
          <li class="datos"><a data-toggle="tab" href="#tab3">Estudiante</a></li>
          <li class="datos"><a data-toggle="tab" href="#tab4">P.M.I./P.I.</a></li>
          <li class="datos"><a data-toggle="tab" href="#tab6">Otros</a></li>
          <li class="datos"><a data-toggle="tab" href="#tab7">Reclamos</a></li>
          <li class="datos"><a data-toggle="tab" href="#tab8">Afiliaciones</a></li>
        </ul>
      </div>
      
      <!--DATOS PRINCIPALES-->
      <div id="my-tab-content" class="tab-content datos tabslist">
        <div class="tab-pane active fade in DP" id="tab1">
          <div class="pull-left">
            <form class="form-horizontal">
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

             <div id="controlEstadoCivil" class="control-group">
               <label class="control-label">Estado Civil</label>
                <div class="controls">
                    <select id="EstadoCivil" class="span2">
                        <option value="">Estado Civil...</option>
                        <option value="Soltero">Soltero</option>
                        <option value="Casado">Casado</option>
                        <option value="Divorciado">Divorciado</option>
                        <option value="Viudo">Viudo</option>
                    </select>
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
                  <div class="label_derecho"><i class="icon-arrow-left"></i>&nbsp;&nbsp;&nbsp;<span id="Edad"></span></div>
                </div>
              </div>

              <div id="ControlDiscapacidad" class="control-group">
                <label class="control-label">Patología</label>
                <div class="controls">
                    <select id="cbo_Discapacidad" type="text" class="span2">
                    </select>
                  
                  
                  <input id="txtFVDiscapacidad" style="display:none;" maxlength="10" class="span2" type="text" placeholder="dia/mes/año"/>

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

             <div id="controlNacionalidad" class="control-group">
                <label class="control-label">Nacionalidad</label>
                <div class="controls">
                    <select id="Nacionalidad" type="text" class="span2">
                    <option value="">Nacionalidad...</option>
                    <option value="Argentino">Argentino</option>
                    <option value="Extranjero">Extranjero</option>
                    </select>
                  </div>
              </div>


            </form>
          </div>
              <div class="span8" style="margin-top:-15px;">
                  <label for="txtemail" class="control-label" style="display:inline; margin-right:30px;">Observaciones</label>
                  <textarea id="txtemail" class="span6" rows="1" style="display:inline;"></textarea>
              </div>
              <div class="span8" style="margin-top:0px;">
                  <label for="txtNroCarnet" class="control-label" style="display:inline; margin-right:50px;">Nro. Carnet</label>
                  <input id="txtNroCarnet" maxlength="60" type="text" class="span6" style="display:inline; width:455px;">
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
           <div class="control-group" id="controlVencPMI" style="display:none;">
              <label for="txtFechaParto" class="span3" style="margin-top:5px;">Fecha de Vencimiento PMI</label>
              <input id="txtFechaParto" maxlength="10" type="text" class="span2" style="margin-left:-30px;"/>
          </div>

        </div>

        <!--Otros Datos-->
        <div class="tab-pane fade in" id="tab6">
          <div class="label_top_grupo">
            <div class="">
              <label class="checkbox"><span>Alto Riesgo</span>
                 <input id="chk_alto_riesgo" type="checkbox" class="checkbox" name="alto_riesgo" style="margin-top:0px;">
              </label>
            <div class="clearfix"></div>
          </div>
          </div>
          </div>

        <!--Documentacion-->
        <div class="tab-pane fade in" id="tab5">
             <div class="label_top" style="margin-left:10px;">
              <div style="display:none;">Tipo de Documento</div>
              <select id="cbo_Tipos" type="text" class="span4" style="display:none;">
                <option value="">Seleccione Tipo...</option>
              </select>
             
            </div>  
             <a id="btnScanear" class="btn btn-info" style="margin-top:0px; margin-left:10px; margin-bottom:10px;"><i class="icon-upload"></i>&nbsp;Escanear Nuevo</a>
           <div id="fotos" style="height:180px; max-height:180px; overflow:auto;">
               <%-- <div class="row" style="margin-left:10px; margin-top:10px;">
                  <div class="span2">
			  		    <div style="width:100px; height:150px;">
						    <a href="../img/escaneadas/12-174865-0002.jpg" class="thumbnail" download>
							    <img src="../img/escaneadas/12-174865-0002.jpg" alt="...">
						    </a>
					    </div>
                  Imagen 1
			      </div>
			  
			      <div class="span2">
			  		    <div style="width:100px; height:150px;">
						    <a href="../img/escaneadas/12-174865-0002.jpg" class="thumbnail" download>
							    <img src="../img/escaneadas/12-174865-0002.jpg" alt="...">
						    </a>
					    </div>
                  Imagen 2
			      </div>
			  
                </div>--%>
            </div>

        </div>



                <!--Reclamos-->
          <div class="tab-pane fade in" id="tab7">
          <div class="label_top_grupo">
            <div class="label_top">
              <div>Titulo</div>
              <input id="txtTitulo" maxlength="60" type="text" class="span4"/>
            </div>
            <div class="label_top">
              <div>Servicio</div>
              <select id="cboServicio"  class="span4"></select>
            </div>
            <div class="label_top">
            <div>Teléfono</div>
            <input id="txtTelefonoReclamo" type="text" maxlength="20"/>
            </div>

            
            <div class="label_top">
            <div>Reclamo</div>
            <textarea id="txtReclamo" style=" width:800px; height:100px" maxlength="500"></textarea>
            </div>
   
            <div class="label_top">
                
            <form runat="server" style="width:30%" id="frmImp">
            <asp:FileUpload ID="btnAdjuntarReclamo" runat="server" AllowMultiple="true"/>
            <asp:Button ID="btnSubir" runat="server" Text="Button" onclick="btnSubir_Click" style="display:none" UseSubmitBehavior="false"/>
            
            <input id="ReclamoId" runat="server" type="hidden"/>
 
            </div>

            <div class="label_top">
            <a id="btnGuardarReclamo" class="btn btn-info">Imprimir</a>
            </div>
            <div class="clearfix"></div>
            </div>
            </div>


                                <!--Errores Afiliaciones-->
          <div class="tab-pane fade in" id="tab8">
          <div class="label_top_grupo">
            <div class="label_top">
              <div>Titulo</div>
              <input id="txtTituloAfiliaciones" maxlength="60" type="text" class="span4"/>
            </div>
            <div class="label_top">
              <div>Servicio</div>
              <select id="cboServicioAfiliaciones"  class="span4"></select>
            </div>
            <div class="label_top">
            <div>Teléfono</div>
            <input id="txtTelefonoReclamoAfiliaciones" type="text" maxlength="20"/>
            </div>

            
            <div class="label_top">
            <div>Reclamo</div>
            <textarea id="txtReclamoAfiliaciones" style=" width:800px; height:100px" maxlength="500"></textarea>
            </div>
   
            <div class="label_top">
                

            <asp:FileUpload ID="FileUploadAfiliaciones" runat="server" AllowMultiple="true"/>
            <asp:Button ID="subirReclamoAfiliaciones" runat="server" Text="Button" onclick="btnSubirAfiliaciones_Click" style="display:none" UseSubmitBehavior="false"/>
            
            <input id="reclamorIdAfiliaciones" runat="server" type="hidden"/>
            </form>
            </div>

            <div class="label_top">
            <a id="btnGuardarReclamoAfiliaciones" class="btn btn-info">Imprimir</a>
            </div>
            <div class="clearfix"></div>
            </div>
            </div>

<% Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();%>

      </div>
      <div class="pie_gris" style="height:55px;">
        <div class="box_informativo_a pull-left"> <span><img src="../img/info_icon.png"></span> <span><strong>Alta</strong> el <span id="salta"></span></span><span> <strong> Actualizado</strong> el <span id="sactualizado"></span></span>
          <div class="clearfix"></div>
        </div>
        <a id="btnCaratula" style="display:none;" class="btn btn-info pull-right"><i class="icon-print"></i>&nbsp;Caratula</a>
        <%if (v.PermisoSM("9929"))
          {%>
        <a id="btnModificarPaciente" class="btn btn-info pull-right">&nbsp;&nbsp;&nbsp;Alta</a> <a onclick="javascript:window.close();" style="display:none;" class="btn pull-right">Cancelar</a>
        <% }%>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</div>

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
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Gente/CapturaWeb.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Gente/Gente.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>    
    <script src="../js/CUIL.js" type="text/javascript"></script>
    <script src="../js/Hospitales/ObraSociales/ObraSociales.js" type="text/javascript"></script>
    <script src="../js/Hospitales/reclamos/reclamos.js" type="text/javascript"></script>
    <script src="../js/Hospitales/ReclamosAfiliaciones/reclamoAfiliaciones.js" type="text/javascript"></script>

<!--Barra sup--> 


</body>
</html>

<script language="JavaScript">
    webcam.set_hook('onComplete', 'my_completion_handler');

   
   function AbrirCamara() {      
           $('#datos_webcam').animate({ height: "474" }, 200);      
   }

   $("#btn_minimizarwebcam").click(
   function () {
       $('#datos_webcam').animate({ height: "140" }, 200);
       $("#btnGuardarFoto").hide();
       //recargar imagenes
       // $("#FotoFinal").attr('src', '../img/borrar.png');

       //actualizar foto al cerrar camara
       $.ajax({
           type: "POST",
           url: "../Json/Gente/ActualizarGente.asmx/TraerFotoPerfilAfiliado",
           data: '{afiliadoId: "' + $("#afiliadoID").val() + '"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           error: errores,
           success: function (Resultado) {

               var ruta = Resultado.d.toString();
               ruta = ruta.replace(/\\/g, "//");

               $("#FotoFinal").attr('src','../fotoPerfil/' + ruta);
               //alert($("#FotoFinal").attr('src'));
           }
       });

   });

//   $("#SacarFoto").click(

//   function () {
//       if ($("#txtcuil").val() != "") {
//           take_snapshot();
//           Capturar = 1;
//       }
//       else {
//           alert("Falta Cargar el CUIL");
//       }
//   });


function Imprimir(url) {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': url,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		});
}



$("#btnCaratula").click(function () {
    if ($("#afiliadoID").val().trim() > 0)
        Imprimir("../Impresiones/Imprimir_CaratulaHC.aspx?NHC=" + $("#afiliadoID").val().trim());
   });  

    function take_snapshot() {
        // take snapshot and upload to server
        //webcam.set_api_url('Foto.aspx?CUIL=' + $("#txtcuil").val());
        webcam.set_api_url('Foto.aspx?CUIL=' + Nombre_Inicial);        
        webcam.snap();
    }

    function my_completion_handler(msg) {
        // extract URL out of PHP output
        if (msg.match(/(http\:\/\/\S+)/)) {
            var image_url = RegExp.$1;
            // show JPEG image in page
            //$("#FotoFinal").attr('src', image_url);              

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

   <div id="modal_small" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-header">    
    <h3 id="H3">El Paciente que esta cargando NO existe...</h3>
     </div>
    <div class="modal-body">
      <p>¿Desea crearlo?</p>
    </div>
    <div class="modal-footer">
        <a id="nuevoPaciente" onclick="javascript:Bla();" class="btn">Si</a>    
        <button onclick="javascript:window.close();" class="btn" data-dismiss="modal" aria-hidden="true">No</button>
    </div>
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

<%--
   CAMARA NUEVA--%>
   <script type="text/javascript">

   //$(document).ready(function(){ alert(); });


'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector('span#errorMsg');

const constraints = {
  audio: true,
  video: {
    width: 1280, height: 720
  }
};

// Access webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
init();

// Draw image
var context = canvas.getContext('2d');
snap.addEventListener("click", function() {
        context.drawImage(video, 0, 0, 640, 480);
      $("#imgtest").attr('src',canvas.toDataURL());

          var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', '../sonido/camara_5.mp3');
    
    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);

    audioElement.play();
    setTimeout(
  function() 
  {
    audioElement.pause();
  }, 1000);

  if($("#imgtest").attr('src') != "../img/perfilFaltante.jpg"){$("#btnGuardarFoto").show();}
  
});


function uploadFile() {
//alert($("#afiliadoID").val());

if($("#afiliadoID").val() == 0){alert("Seleccione un afiliado primero"); return false;}

        var json = JSON.stringify({"strEncoded": $("#imgtest").attr('src'), "idAfiliado": $("#afiliadoID").val()});
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/subirFotoTest",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Foto Actualizada.");
        },
        error: errores
    });

}

        function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

</script>