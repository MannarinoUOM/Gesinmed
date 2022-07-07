<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AtencionDiabetico.aspx.cs" Inherits="AtConsultorio_AtencionDiabetico" %>

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
    <script type="text/javascript"> 
   
    </script>

    
</head>

<style>
html {overflow: auto;}
</style>

<script language="JavaScript">
    webcam.set_api_url('Foto.aspx');
    webcam.set_quality(100);
    webcam.set_shutter_sound(false); 
 </script>

<body>

<div class="container">
  <div class="contenedor_1" style="width:811px; margin-left:70px; height:600px">
    <div class="contenedor_a" style="position:relative;margin-left:15px; width:780px; height:550px">
    
    <div id="Espereaqueguarde" style="text-align:center; position:absolute; width:100%; height:100%; background-color:White; z-index:5; opacity:0.9; display:none;">
    <div style="margin-top:200px; margin-bottom:10px;">
        <img src="../img/Espere.gif" />
    </div>
    <p id="Mensajedeespera">Guardando</p>
    </div>

      <div id="infoBaja" class="noti_aviso" style="display:none;"> DADO DE BAJA </div>
      <div class="datos_principales_contenedor">
        <div id="datos_webcam" class="datos_principales">

          <div class="datos_principales_form" style="margin-left:0px">

               <div class="datos_persona">
        <div ><img id="fotopaciente" class=" avatar2" ></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor:pointer" onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>        
      </div>
        <div class="pull-left" style="margin-left:20px"> 
        <div>Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
        <div>Seccional:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
        <div>Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
        </div>
        <div class="clearfix"></div>
            
          </div>
          <div class="webcam_box_contenedor" style="margin-top:81px">

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
        <ul class="nav nav-tabs" data-tabs="tabs" style="margin-bottom:0px" >
        
          <li id="1" class="active"><a data-toggle="tab" href="#tab1" onclick="llamar1()">TIPO DE DIABETES</a></li>          
          <li id="2"><a data-toggle="tab" href="#tab2" onclick="llamar2()">DATOS ANTROPOMETRICOS</a></li>
          <li id="3"><a data-toggle="tab" href="#tab3" onclick="llamar3()">COMPLICACIONES</a></li>
          <li id="Li1"><a data-toggle="tab" href="#tab6" onclick="llamar6()">CORMOBILIDADES</a></li>
          <li id="4"><a data-toggle="tab" href="#tab4" onclick="llamar4()">DATOS REFERENCIADOS AL TRATAMIENTO</a></li>
          <li id="5"><a data-toggle="tab" href="#tab5" onclick="llamar5()">LABORATORIO Y EXAMENES COMPLEMENTARIOS</a></li>
          

        </ul>
      </div>
      
              <script type="text/javascript">
                  var valor =1;

                  function llamar1() {
                      valor = 1;

                      }
                      function llamar2() {
                          valor = 2;
                      }
                      function llamar3() {
                          valor = 3;
                      }
                      function llamar4() {
                          valor = 4;
                      }
                      function llamar5() {
                          valor = 5;
                      }
                      function llamar6() {
                          valor = 6;
                      }

                      function limpiar() {

                          switch (valor)
                          {
                              case 1:
                                  $(".limpiarChecks1").removeAttr('checked');
                                  $("#CheckTipo1").attr('checked', true);
                                  $(".limpiarText1").val("");
                                  $(".limpiarCbo1").val(0);
                                  //                                  $("#TxtAntiguedad").attr('disabled', true);
                                  break;

                              case 2:
                                  $(".limpiarText2").val("");
                                  break;
                              case 3:
                                  $(".limpiarCbo3").val(0);
                                  $(".limpiarChecks3").removeAttr('checked');
                                  $(".limpiarChecks3").attr('disabled', true);
                                  $(".limpiarText3").val("");
                                  $(".limpiarText3").attr('disabled', true);
                                  break;

                              case 4:
                                  $(".limpiarText4").val("");

                                  break;


                              case 5:
                                  $(".limpiarText5").val("");

                                  $("#").attr('disabled', true);
                                  $("#").attr('disabled', true);
                                  $("#").attr('disabled', true);
                                  $("#").attr('disabled', true);
                                  $("#").attr('disabled', true);
                                  $("#").attr('disabled', true);

                                  break;

                              case 6:
                                  $(".limpiarCbo6").val(0);
                                  break;
                          }
                      }
        </script>



      <!--TIPO DE DIABETES-->

          <div id="my-tab-content" class="tab-content" style="height:300px" scroll="no">
        <div class="tab-pane active fade in DP" id="tab1">
          <div class="pull-left">
            <form class="form-horizontal" >
           

            </form>
          </div>
          <div class="clearfix"></div>

<form class="form-horizontal DP pull-left" style="margin-top:-14px; width:700px; height:30px">
<div id="TipoDiabetes" class="control-group" style=" width:765px; height:20px">

<form class="form-horizontal" >
<div id="ControlCUILTITULAR" class="control-group" style="margin-top:90px">

           <div id="Div1" class="control-group" style="margin-top:10px">
                 <label class="checkbox inline">
                    <input class="limpiarChecks1" type="checkbox" id="CheckTipo1" style="margin-left:42px" value="option1" checked="checked"/>
                    Tipo 1 </label>
              

              <label class="checkbox inline">
                    <input class="limpiarChecks1" type="checkbox" id="CheckTipo2" value="option2"/>
                    Tipo 2 </label>
                    <label class="checkbox inline">
                    <input class="limpiarChecks1" type="checkbox" id="CheckGestacional" value="option3"/>
                      Gestacional </label>   

                      <label class="checkbox inline">Otros Tipos de Diabetes
                    <input class="limpiarText1" type="text" id="TxtOtrosTipos" onblur="seFue()"/>
                      </label>   
                      </div>

                      <script type="text/javascript">
                      function seFue() {
                          if ($("#TxtOtrosTipos").val() == "") {
                              $("#CheckTipo1").attr('checked', true);
                          }
                      }
                      </script>


                      <div id="antecedentes" class="control-group" style="margin-top:40px">
                      <label style="width:72px; display:inline; margin-left:53px">Años de Antigüedad (desde que año)
                    <input class="limpiarText1 ; numero" type="text" id="TxtAntiguedad" maxlength="4" style="width:100px; margin-right:63px ; text-align:center"/>
                      </label>  

                       <label style="display:inline">Antecedentes Familiares
                    <select id="Cbo_Antecedente"  class="limpiarCbo1" style="width:60px">
                     <option value="0">No</option>
                    <option value="1">Si</option>
                   
                    </select>
                      </label>  
</div>
                      </div>

</form>
</form>     
              </div>
        
         </div>
<%--          <script type="text/javascript">
//              function cambio() {
//                  if ($('#Cbo_Antecedente option:selected').val() == 0) {
//                      $("#TxtAntiguedad").attr('disabled', true);
//                  }
//                  else
//                   {
//                       $("#TxtAntiguedad").attr('disabled', false);
//                   }
//               }
          
          </script>--%>
       
        
        <!--DATOS ANTROPOMETRICOS-->
        <div class="tab-pane fade in" id="tab2">

            <div class="label_top_grupo">
              <div class="label_top">
              <div style="margin-left:260px; margin-top:25px; width:100px">Talla</div>
              <input  style="margin-left:258px" id="txtAltura" maxlength="4" type="text" class="numero span3; limpiarText2" onkeyup="calcularIMC()"/>
            </div>

            <div class="label_top" >
              <div style="margin-left:260px; margin-top:0px; width:100px">Peso</div>
              <input  style="margin-left:258px" id="txtPeso" maxlength="4" type="text" class="numero span3; limpiarText2" onkeyup="calcularIMC()"/>
            </div>

            <script type="text/javascript">
            function calcularIMC()
            {
                if ($("#txtAltura").val() != "" && $("#txtPeso").val() != "") {
                    var altura = 0;
                    var peso = 0;
                    var IMC = 0;
                    var aux = 0;

                    altura = $("#txtAltura").val();
                    peso = $("#txtPeso").val();

                    aux = Math.pow(altura, 2);

                    IMC = peso / aux;
                    IMC = Math.round(IMC);
                    $("#txtIMC").val(IMC);

                }
                if ($("#txtAltura").val() == "" || $("#txtPeso").val() == "") {
                    $("#txtIMC").val("");
                }
            }
            </script>

             <div class="label_top">
              <div style="width:100px; margin-left:260px">IMC</div>
              <input id="txtIMC" type="text" maxlength="6" class="span1; limpiarText2 ; numero" style="margin-left:258px"/>
            </div>
         
            <div class="label_top">
              <div style="margin-left:260px">CC</div>
              <input id="txtCc" type="text" maxlength="6" class="span1; limpiarText2" style="margin-left:258px"/>
            </div>

           <%--   <div class="label_top">
              <div style="margin-top:0px; margin-left:260px">Talla</div>
              <input id="txtTalla" type="text" maxlength="4" class="span1; limpiarText2" style="margin-left:258px"/>
            </div>
--%>
            
         <%--   <div class="clearfix"></div>--%>
          </div>
          
   
        </div>

        <!--COMPLICACIONES-->

        <script type="text/jscript">
        function seleccion()
        {
            if ($('#Cbo_Hipoglucemioas option:selected').val() == 0 || $('#Cbo_Hipoglucemioas option:selected').val() == 1) {

                $("#cbo_Leve").attr('checked', false);
                $("#cbo_Moderado").attr('checked', false);
                $("#cbo_PérdidaConocimiento").attr('checked', false);
                $("#cbo_Leve").attr('disabled', true);
                $("#cbo_Moderado").attr('disabled', true);
                $("#cbo_PérdidaConocimiento").attr('disabled', true);
                $("#txtFrecuencia").attr('disabled', true);
                $("#txtFrecuencia").val("");
            }
            else {
                $("#cbo_Leve").attr('disabled', false);
                $("#cbo_Leve").attr('checked', true);
                $("#cbo_Moderado").attr('disabled', false);
                $("#cbo_PérdidaConocimiento").attr('disabled', false);
                $("#txtFrecuencia").attr('disabled', false); 

            }
        }
        
        </script>

        <div class="tab-pane fade in" id="tab3">
        <div class="contenedor_2" style="width:290px; height:200px; margin-left:60px; padding-top:10px; padding-bottom:10px; float:left; margin-top:30px">
         <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline" style="padding-left:0px; width:270px">Presenta Hipoglucemias
                <select id="Cbo_Hipoglucemioas"  class="limpiarCbo3" onchange="seleccion()" style="margin-top:-16px; margin-bottom:0px ; width:104px">
                <option selected="selected" value="0">Pendiente</option>
                <option value="1">No</option>
                <option value="2">Si</option>
                </select>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>

                     <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline" style="padding:0px">Frecuencia Semanal
                <input id="txtFrecuencia" type="text" style="margin-top:-16px; margin-bottom:0px; margin-left:22px ; width:46px"  maxlength="2" placeholder="veces" class="numero ; limpiarText3" disabled="disabled"/>
                
              </label>
            </div>
            <div class="clearfix" style="margin-top:20px"></div>
            </div>

          <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline">Leve
              <input id="cbo_Leve" type="checkbox" style="margin-top:-16px;" value="option1" disabled="disabled" class="limpiarChecks3"/>
            </label>
            <div class="clearfix"></div>
          </div>
          </div>
          <br />
          <div class="label_top_grupo">
      
            <div class="clearfix"></div>
          </div>
                 
            <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline">Moderado
                <input id="cbo_Moderado" type="checkbox" style="margin-top:-16px;" value="option2" disabled="disabled" class="limpiarChecks3"/>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>

            <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline">Con pérdida de conocimiento 
                <input id="cbo_PérdidaConocimiento" type="checkbox" style="margin-top:-16px;" value="option3" disabled="disabled" class="limpiarChecks3"/>
              </label>
            </div>   
            <div class="clearfix"></div>
            </div>

      <%--         <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline" style="padding:0px">Frecuencia Semanal
                <input id="txtFrecuencia" type="text" style="margin-top:-16px; margin-bottom:0px ; width:50px"  maxlength="2" placeholder="veces" class="numero ; limpiarText3" disabled="disabled"/>
                
              </label>
            </div>
            <div class="clearfix" style="margin-top:20px"></div>
            </div>--%>
</div>

<div class="contenedor_3" style="width:260px; height:200px; padding-bottom:10px; padding-top:10px; margin-right:60px; margin-top:10px; float:right; margin-top:30px">

                 <div class="label_top_grupo" style="margin-top:38px">
            <div class="label_top">
              <label style="display:inline ; margin-left:20px">Retinopatía
                <select class="limpiarCbo3" id="cbo_Retinopatía" style="margin-top:-16px; margin-left:20px ; margin-bottom:0px; width:104px">
                <option value="0" selected="selected" >Pendiente</option>
                <option value="1" >No</option>
                <option value="2" >Si</option>
                </select>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>

                 <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline">Nefropatía
                <select class="limpiarCbo3" id="cbo_Nefropatía" style="margin-top:-16px; margin-left:27px ; margin-bottom:0px; width:104px">
                <option value="0" selected="selected">Pendiente</option>
                <option value="1">No</option>
                <option value="2">Si</option>
                </select>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>

                 <div class="label_top_grupo">
            <div class="label_top">
              <label  class="checkbox inline">Neuropatía
                <select class="limpiarCbo3" id="cbo_Neuropatía" style="margin-top:-16px; margin-left:23px ; margin-bottom:0px; width:104px">
                <option value="0" selected="selected">Pendiente</option>
                <option value="1">No</option>
                <option value="2">Si</option>
                </select>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>

                 <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline">Macrovascular
                <select class="limpiarCbo3" id="cbo_Macrovascular" style="margin-top:-16px; margin-bottom:0px; width:104px">
                <option value="0" selected>Pendiente</option>
                <option value="1">No</option>
                <option value="2">Si</option>
                </select>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>
</div>
        </div>




        <!--DATOS REFERENCIADOS AL TRATAMIENTO-->
        <div class="tab-pane fade in" id="tab4">
        <div class="control-group">
       
           <div class="label_top_grupo" style="width:770px">
            <div class="label_top">
              
<div class="titulo_contenedor_4">
<div class="contenedor_1" style="width:745px">
            <label class="check inline" style="width:112px; margin-left:16px;margin-right:12px"><strong>Fármacos</strong></label><label class="check inline" style="width:89px; margin-left:50px"><strong>Presentación</strong></label><label class="check inline" style="width:112px; margin-left:35px"><strong>Dosis</strong></label><label class="check inline" style="width:89px; margin-left:24px"><strong>Mg x día/U I</strong></label><label class="check inline" style="width:120px ; margin-left:43px"><strong>Antigüedad (año)</strong></label><br /></div>
            </div>
   <%--         <label class="checkbox inline" style="width:210px">Metformina</label> <input id="Text1" type="text" class="input-mini limpiarText4" style="margin-left:71px"/><input id="Text2" type="text" class="input-mini limpiarText4" style="margin-left:65px"/><input id="Text3"  maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />--%>
            <label class="checkbox inline" style="margin-right:67px">Metformina</label> <input id="txtMetforminaP" type="text" class="input-mini limpiarText4" style="margin-left:50px"/><input id="txtMetforminaDosis" type="text" class="input-mini limpiarText4" style="margin-left:25px"/><input id="txtMetforminaMgxdia" type="text" class="input-mini limpiarText4" style="margin-left:65px"/><input id="txtMetforminaAntiguedad"  maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <label class="checkbox inline">Glimeripide</label>  <input id="txtGlimeripideP" type="text" class="input-mini limpiarText4" style="margin-left:114px"/> <input id="txtGlimeripideDosis" type="text" class="input-mini limpiarText4" style="margin-left:25px"/><input id="txtGlimeripideMgxdia" type="text" class="input-mini limpiarText4" style="margin-left:65px"/><input id="txtGlimeripideAntiguedad"  maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <label class="checkbox inline">Glicazida</label> <input id="txtGlicazidaP" type="text" class="input-mini limpiarText4" style="margin-left:126px"/> <input id="txtGlicazidaDosis" type="text" class="input-mini limpiarText4" style="margin-left:25px"/><input id="txtGlicazidaMgxdia" type="text" class="input-mini limpiarText4" style="margin-left:65px"/><input id="txtGlicazidaAntiguedad"  maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
             <label class="checkbox inline" style="width:182px">Glibenclamida</label> <input id="txtGlibenclamidaP" type="text" class="input-mini limpiarText4" style="margin-left:0px"/> <input id="txtGlibenclamidaDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:25px"/><input id="txtGlibenclamidaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input maxlength="4" id="txtGlibenclamidaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br/>
            <%--<input id="txtMetforminaDosis" type="text" class="input-mini limpiarText4" style="margin-left:71px"/><input id="txtMetforminaMgxdia" type="text" class="input-mini limpiarText4" style="margin-left:65px"/><input id="txtMetforminaAntiguedad"  maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />--%>
            <div class="contenedor_1" style="width:745px"></div>

           
            <label class="checkbox inline">Sitagliptina</label>  <input id="txtSitagliptinaP" type="text" class="input-mini limpiarText4" style="margin-left:113px"/><input id="txtSitagliptinaDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtSitagliptinaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input maxlength="4" id="txtSitagliptinaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br/>
            <label class="checkbox inline">Vildagliptina</label> <input id="txtVildagliptinaP" type="text" class="input-mini limpiarText4" style="margin-left:104px"/> <input id="txtVildagliptinaDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtVildagliptinaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input maxlength="4" id="txtVildagliptinaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br/>
            <label class="checkbox inline">SaxaGliptina</label><input id="txtSaxaGliptinaP" type="text" class="input-mini limpiarText4" style="margin-left:104px"/><input id="txtSaxaGliptinaDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtSaxaGliptinaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input maxlength="4" id="txtSaxaGliptinaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br/>
            <label class="checkbox inline">Linagliptina</label><input id="txtLinagliptinaP" type="text" class="input-mini limpiarText4" style="margin-left:110px"/><input id="txtLinagliptinaDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtLinagliptinaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input maxlength="4" id="txtLinagliptinaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br/>
         
          <%--  <input id="txtGlibenclamidaDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:71px"/><input id="txtGlibenclamidaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input maxlength="4" id="txtGlibenclamidaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />--%>
          <div class="contenedor_1" style="width:745px"></div>

          <%--  <label class="checkbox inline" style="width:210px">Glicazida</label>  <input id="txtGlicazidaDosis"" type="text" class=" input-mini limpiarText4"  style="margin-left:71px"/><input id="txtGlicazidaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtGlicazidaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />--%>
          <%--  <label class="checkbox inline" style="width:210px">Glicazida</label>  <input id="Text1"" type="text" class=" input-mini limpiarText4"  style="margin-left:71px"/><input id="Text2" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="Text3" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />--%>
            <label class="checkbox inline" style="width:182px">Insulina Corriente</label> <input id="txtInsulinaCorrienteP" type="text" class="input-mini limpiarText4" style="margin-left:0px"/><input id="txtInsulinaCorrienteDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtInsulinaCorrientemgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaCorrienteAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <label class="checkbox inline" style="width:182px">Insulina Aspartica</label> <input id="txtInsulinaAsparticaP" type="text" class="input-mini limpiarText4" style="margin-left:0px"/><input id="txtInsulinaAsparticaDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtInsulinaAsparticaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaAsparticaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <label class="checkbox inline" style="width:182px">Insulina Lispro</label> <input id="txtInsulinaLisproP" type="text" class="input-mini limpiarText4" style="margin-left:0px"/><input id="txtInsulinaLisproDpsis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtInsulinaLisproMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaLisproAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <label class="checkbox inline" style="width:180px">Insulina Glucolisina</label> <input id="txtInsulinaGlucolisinaP" type="text" class="input-mini limpiarText4" style="margin-left:0px"/><input id="txtInsulinaGlucolisinaDosis"" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtInsulinaGlucolisinaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaGlucolisinaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />          
       
    <%--        <input id="txtGlicazidaDosis"" type="text" class=" input-mini limpiarText4"  style="margin-left:71px"/><input id="txtGlicazidaMgxdía" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtGlicazidaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />--%>
          <div class="contenedor_1" style="width:740"></div>

            <label class="checkbox inline" style="width:181px">Insulina NPH</label><input id="txtInsulinaNPHDosisP" type="text" class="input-mini limpiarText4" style="margin-left:0px"/> <input id="txtInsulinaNPHDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtInsulinaNPHMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaNPHAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <label class="checkbox inline" style="width:182px">Insulina Aspartica Bifàsica</label> <input id="txtInsulinaAsparticaBifàsicaP" type="text" class="input-mini limpiarText4" style="margin-left:0px"/><input id="txtInsulinaAsparticaBifàsicaDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtInsulinaAsparticaBifàsicaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaAsparticaBifàsicaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <label class="checkbox inline" style="width:182px">Insulina Lispro 75/25</label><input id="txtInsulinaLispro7525P" type="text" class="input-mini limpiarText4" style="margin-left:0px"/> <input id="txtInsulinaLispro7525Dosis" type="text" class=" input-mini limpiarText4"  style="margin-left:25px"/><input id="txtInsulinaLispro7525mgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaLispro7525Antiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <label class="checkbox inline" style="width:182px">Insulina Lispro 50/50</label><input id="txtInsulinaLispro5050P" type="text" class="input-mini limpiarText4" style="margin-left:0px"/> <input id="txtInsulinaLispro5050Dosis" type="text" class=" input-mini limpiarText4"  style="margin-left:25px"/><input id="txtInsulinaLispro5050Mgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaLispro5050Antiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />            
           
            <%--<input id="txtInsulinaNPHdosis" type="text" class=" input-mini limpiarText4"  style="margin-left:71px"/><input id="txtInsulinaMgxdía" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />--%>
            <div class="contenedor_1" style="width:740"></div>

            <label class="checkbox inline" style="width:182px">Insulina Glargina</label> <input id="txtInsulinaGlarginaP" type="text" class="input-mini limpiarText4" style="margin-left:0px"/> <input id="txtInsulinaGlarginaDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtInsulinaGlarginaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaGlarginaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <label class="checkbox inline" style="width:182px">Insulina Determir</label> <input id="txtInsulinaDetermirP" type="text" class="input-mini limpiarText4" style="margin-left:0px"/> <input id="txtInsulinaDetermirDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtInsulinaDetermirMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaDetermirAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <label class="checkbox inline" style="width:182px">Insulina Degludec</label> <input id="txtInsulinaDegludecP" type="text" class="input-mini limpiarText4" style="margin-left:0px"/><input id="txtInsulinaDegludecDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtInsulinaDegludecMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaDegludecAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <label class="checkbox inline" style="width:182px">Tiras Reactiva</label> <input id="txtTirasReactivaP" type="text" class="input-mini limpiarText4" style="margin-left:0px"/><input id="txtTirasReactivaDosis" type="text" class=" input-mini limpiarText4"  style="margin-left:29px"/><input id="txtTirasReactivaMgxdia" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtTirasReactivaAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />
            <div class="contenedor_1" style="width:740"></div>
          <%--  <input id="txtInsulinaCORRIENTEdosis" type="text" class=" input-mini limpiarText4"  style="margin-left:71px"/><input id="txtInsulinaCORRIENTEMgxdía" type="text" class=" input-mini limpiarText4" style="margin-left:65px"/><input id="txtInsulinaCORRIENTEAntiguedad" maxlength="4" type="text" class="numero input-mini limpiarText4" style="margin-left:65px"/><br />--%>
            <%--<input id="txtOtroTipo" type="text" placeholder="Otro" style="margin-left:17px; width:120px" maxlength="20" class="limpiarText4"/>--%><input  placeholder="Otros" id="txtOtroTipo" class="limpiarText4" style="overflow:hidden; width:182px"/> 
            <input id="txtOtroTipoP" type="text" class="input-mini limpiarText4" style="margin-left:11px"/>
           <input id="txtOtroTipoDosis" type="text" class="input-mini limpiarText4" style="margin-left:29px; margin-top:9px; overflow:hidden"/><input id="txtOtroTipoMgxdía" type="text" class="input-mini limpiarText4" style="margin-left:65px; margin-top:9px; overflow:hidden"/><input id="txtOtroTipoAntiguedad" maxlength="4" type="text" class="input-mini limpiarText4 numero" style="margin-left:65px; margin-top:9px; overflow:hidden"/>
          <%--  <input class="btn btn-info" value="otro +" style="width:40px" onclick="Agregar()"/>--%>
               <input  placeholder="Otros" id="txtOtroTipo2" class="limpiarText4" style="overflow:hidden; width:182px"/> 
               <input id="txtOtroTipo2P" type="text" class="input-mini limpiarText4" style="margin-left:11px"/>
               <input id="txtOtroTipoDosis2" type="text" class="input-mini limpiarText4" style="margin-left:29px; margin-top:9px; overflow:hidden"/><input id="txtOtroTipoMgxdía2" type="text" class="input-mini limpiarText4" style="margin-left:65px; margin-top:9px; overflow:hidden"/><input id="txtOtroTipoAntiguedad2" maxlength="4" type="text" class="input-mini limpiarText4; numero" style="margin-left:65px; margin-top:9px; overflow:hidden;"/>

                 <input  placeholder="Otros" id="txtOtroTipo3" class="limpiarText4" style="overflow:hidden; width:182px"/> 
                 <input id="txtOtroTipo3P" type="text" class="input-mini limpiarText4" style="margin-left:11px"/>
               <input id="txtOtroTipoDosis3" type="text" class="input-mini limpiarText4" style="margin-left:29px; margin-top:9px; overflow:hidden"/><input id="txtOtroTipoMgxdía3" type="text" class="input-mini limpiarText4" style="margin-left:65px; margin-top:9px; overflow:hidden"/><input id="txtOtroTipoAntiguedad3" maxlength="4" type="text" class="input-mini limpiarText4 numero" style="margin-left:65px; margin-top:9px; overflow:hidden"/>

                 <input  placeholder="Otros" id="txtOtroTipo4" class="limpiarText4" style="overflow:hidden;width:182px"/> 
                  <input id="txtOtroTipo4P" type="text" class="input-mini limpiarText4" style="margin-left:11px"/>
               <input id="txtOtroTipoDosis4" type="text" class="input-mini limpiarText4" style="margin-left:29px; margin-top:9px; overflow:hidden"/><input id="txtOtroTipoMgxdía4" type="text" class="input-mini limpiarText4" style="margin-left:65px; margin-top:9px; overflow:hidden"/><input id="txtOtroTipoAntiguedad4" maxlength="4" type="text" class="input-mini limpiarText4 numero" style="margin-left:65px; margin-top:9px; overflow:hidden"/>

                 <input  placeholder="Otros" id="txtOtroTipo5" class="limpiarText4" style="overflow:hidden;width:182px"/> 
                 <input id="txtOtroTipo5P" type="text" class="input-mini limpiarText4" style="margin-left:11px"/>
               <input id="txtOtroTipoDosis5" type="text" class="input-mini limpiarText4" style="margin-left:29px; margin-top:9px; overflow:hidden"/><input id="txtOtroTipoMgxdía5" type="text" class="input-mini limpiarText4" style="margin-left:65px; margin-top:9px; overflow:hidden"/><input id="txtOtroTipoAntiguedad5" maxlength="4" type="text" class="input-mini limpiarText4 numero" style="margin-left:65px; margin-top:9px; overflow:hidden"/>

            <div class="clearfix"></div>
          </div>
          </div>
     <%--     <script type="text/javascript">
              function Agregar() {

                  var cantidad = 0;
                      cantidad++;
                      var nuevohijo = document.createElement('input');
                      nuevohijo.type = 'text';
                      nuevohijo.name = 'nombre' + cantidad;
                      nuevohijo.id = 'nombre' + cantidad;
                      document.getElementById('txtOtroTipoMgxdía').appendChild(nuevohijo);
                      document.getElementById('txtOtroTipoMgxdía').appendChild(document.createElement('br'));
                  
              }
          
          </script>--%>

          <div class="control-group">
          <label style="display:table-column">Dosis
          <input type="text"/>
          </label>
          </div>




        </div>

        </div>

          <!--LABORATORIO Y EXAMENES COMPLEMENTARIOS-->                                                          
          <input type="text" id="txtId" style="visibility:hidden"/>
    <div class="tab-pane fade in" id="tab5">
     
  <%--          <div class="contenedor_1" style="height:30px; padding-bottom:9px; padding-top:9px">--%>
            
            <div class="row">
           <span class="span2" style="margin-left:69px; width:222px">   
           <label style="display:inline; margin-right:59px"><strong>HBA1C</strong></label>       
            <label for="TxtHbA1cUltimo" style="width:140px; display:inline">Ultimo</label><input onkeyup="habilitarHBA1C()" type="text" class="input-mini limpiarText5 Mostrar" id="TxtHbA1cUltimo"/>
            </span>


            <script type="text/javascript">


                

                function habilitarHBA1C() {

                    $("#txtHbA1cFechaUltimo").attr('disabled', false);
                    $("#TxtHbA1cAnterior").attr('disabled', false);
                    if ($("#TxtHbA1cUltimo").val().length <= 0)
                     {

                        $("#txtHbA1cFechaUltimo").val("");
                        $("#txtHbA1cFechaUltimo").attr('disabled', true);
                        $("#TxtHbA1cAnterior").val("");
                        $("#TxtHbA1cAnterior").attr('disabled', true);
                        $("#txtHbA1cFechaAnterior").val("");
                        $("#txtHbA1cFechaAnterior").attr('disabled', true);
                    }

                }

                function habilitarHBA1Canterior() {

                    $("#txtHbA1cFechaAnterior").attr('disabled', false);
                    if ($("#TxtHbA1cAnterior").val().length <= 0) {

                        $("#txtHbA1cFechaAnterior").val("");
                        $("#txtHbA1cFechaAnterior").attr('disabled', true);
                    }
                }
                    /////////////////////////////////////////////////////////
                     function habilitarGlucemia() {

                         $("#TxtGlucemiadeAyunoUltimaFecha").attr('disabled', false);
                         $("#txtGlucemiadeAyunoAnterior").attr('disabled', false);

                    if ($("#txtGlucemiadeAyunoUltimo").val().length <= 0)
                     {

                        $("#TxtGlucemiadeAyunoUltimaFecha").val("");
                        $("#TxtGlucemiadeAyunoUltimaFecha").attr('disabled', true);
                        $("#txtGlucemiadeAyunoAnterior").val("");
                        $("#txtGlucemiadeAyunoAnterior").attr('disabled', true);
                    }

                }

                function habilitarGlucemiaCanterior() {

                    $("#txtGlucemiadeAyunoAnteriorFecha").attr('disabled', false);
                    if ($("#txtGlucemiadeAyunoAnterior").val().length <= 0) {

                        $("#txtGlucemiadeAyunoAnteriorFecha").val("");
                        $("#txtGlucemiadeAyunoAnteriorFecha").attr('disabled', true);
                    }

                }
            </script>



            <span class="span2">
            <label for="txtHbA1cFechaUltimo" class="checkbox inline" style="width:43px; display:inline;">Fecha</label><input type="text" class="fechaHBA1C input-mini ; limpiarText5" id="txtHbA1cFechaUltimo" style="padding-left:0px; padding-right:0px; width:71px"/>
            </span>

             <span class="span2">          
            <label for="TxtHbA1cAnterior" style="width:140px; display:inline">Anterior</label><input  onkeyup="habilitarHBA1Canterior()" type="text" class="input-mini ; limpiarText5" id="TxtHbA1cAnterior" disabled="disabled"/>
            </span>
            <span class="span2">
            <label for="txtHbA1cFechaAnterior" class="checkbox inline" style="width:43px; display:inline">Fecha</label><input type="text" class="fechaHBA1C input-mini ; limpiarText5" id="txtHbA1cFechaAnterior" style="padding-left:0px; padding-right:0px; width:71px"/>
            </span>

            </div>


            <%--</div>--%>

                      <div class="contenedor_1" style=" height:30px; padding-bottom:9px; padding-top:9px"">
            
            <div class="row">
           <span class="span2" style="margin-left:30px; width:260px">   
           <label style="display:inline; margin-right:0px"><strong>Glucemia de Ayuno </strong></label>       
            <label for="txtGlucemiadeAyunoUltimo" style="width:140px; display:inline; margin-left:10px">Ultimo</label><input type="text" class="input-mini ; limpiarText5" id="txtGlucemiadeAyunoUltimo" onkeyup="habilitarGlucemia()"/>
            </span>
            <span class="span2">
            <label for="TxtGlucemiadeAyunoUltimaFecha" class="checkbox inline" style="width:43px; display:inline">Fecha</label><input type="text" class="input-mini ; limpiarText5" id="TxtGlucemiadeAyunoUltimaFecha" style="padding-left:0px ; padding-right:0px; width:72px"/>
            </span>

             <span class="span2">          
            <label for="txtGlucemiadeAyunoAnterior" style="width:140px; display:inline">Anterior</label><input type="text" class="input-mini ; limpiarText5" id="txtGlucemiadeAyunoAnterior" onkeyup="habilitarGlucemiaCanterior()" disabled="disabled"/>
            </span>
            <span class="span2">
            <label for="txtGlucemiadeAyunoAnteriorFecha" class="checkbox inline" style="width:43px; display:inline">Fecha</label><input type="text" class="input-mini ; limpiarText5" id="txtGlucemiadeAyunoAnteriorFecha" style="padding-left:0px; padding-right:0px; width:71px"/>
            </span>

            </div>


           <%-- </div>--%>

                     <%-- <div class="contenedor_1" style=" height:30px; padding-bottom:9px; padding-top:9px"">--%>
            
            <div class="row">
           <span class="span2" style="margin-left:32px; width:751px">   
           <%--<label style="display:inline; margin-right:44px"><strong>Fondo de Ojo</strong></label> --%>  
             <label for="txtFuncionRenal" class="checkbox inline" style="width:107px; display:inline"><strong>Función Renal</strong></label><input type="text" class="input-large ; limpiarText5" id="txtFuncionRenal" style="width:71px; margin-bottom:0px"/>    
            <label for="txtFondoDeOjoFecha" style="width:140px; margin-left:50px; display:inline"><strong>Fondo de ojo</strong></label><input type="text" class="input-mini ; limpiarText5" id="txtFondoDeOjoFecha" style="padding-left:0px; padding-right:0px; width:220px; margin-bottom:0px"/>
            <label for="txtFondoDeOjoFecha" style="width:140px; display:inline"><strong>Fecha</strong></label><input type="text" class="input-mini ; limpiarText5" id="txtFondeDeOjoF" style="padding-left:0px; padding-right:0px; width:100px; margin-bottom:0px"/>
         <%--   </span>--%>
          <%--   <span class="span2" style="width:491px">--%>
          
            </span>

            </div>

           <%-- </div>--%>

                      <div class="contenedor_1" style=" height:30px; padding-bottom:9px; padding-top:9px"">
            
            <div class="row">
           <span class="span2" style="margin-left:30px; width:146px">   
            <label for="txtCreatinina" style="width:140px; display:inline"><strong>Creatinina</strong></label><input type="text" class="input-mini ; limpiarText5" id="txtCreatinina"/>
            </span>
            <span class="span2" style="margin-left:0px">
            <label for="txtUrea" class="checkbox inline" style="width:43px; display:inline"><strong>Urea</strong></label><input type="text" class="input-mini ; limpiarText5" id="txtUrea"/>
            </span>

             <span class="span2" style="width:245px; margin-left:10px">          
            <label for="txtClearencedeCreatinina" style="width:140px; display:inline"><strong>Clearence de Creatinina</strong></label><input type="text" class="input-mini ; limpiarText5" id="txtClearencedeCreatinina"/>
            </span>
            <span class="span2" style="margin-left:10px; width:202px">
            <label for="txtMicroalbuminuria" class="checkbox inline" style="width:128px; display:inline; margin-right:0px; padding-left:0px"><strong>Microalbuminuria</strong></label><input type="text" class="input-mini ; limpiarText5" id="txtMicroalbuminuria"/>
            </span>

            </div>


           <%-- </div>--%>

                      <%--<div class="contenedor_1" style=" height:30px; padding-bottom:9px; padding-top:9px"">--%>
            
            <div class="row">
           <span class="span2" style="margin-left:60px; width:700px">   
           <label style="display:inline; margin-right:10px"><strong>Exámen de los Pies</strong></label>       
            <input type="text" class="input-large ; limpiarText5" id="txtExamendePies" style="width:500px; margin-bottom:0px"/>
            </span>       

            </div>
                                                                                                          
           <div class="contenedor_1" style=" height:64px; padding-bottom:9px; padding-top:9px; height:30px">      
            <div class="row">
           <span class="span3" style="margin-left:60px; width:700px; margin-top:5px">   
           <label style=" margin-right:10px; margin-top:5px; float:left"><strong>Asiste a taller</strong></label>  
           <label class="checkbox inline">    
            <input type="checkbox" class="limpiarCheck5" id="cbo_si"/>Sí</label>

            <label class="checkbox inline">
            <input type="checkbox" class="limpiarCheck5" id="cbo_no" checked="checked"/>No</label>

            <label class="checkbox inline" style="float:left; padding-top:0px">
            <input type="text" class="limpiarText5" id="TxtFechaTaller" style="width:71px; margin-bottom:0px" disabled="disabled"/>Fecha</label>
            </span>       

            </div>

            </div>



        </div>

</div>
</div>


<%--CORMOBILIDADES--%>
<div class="tab-pane fade in" id="tab6">
 <div class="contenedor_2" style="margin-left:204px; margin-top:0px; width:370px; height:180px; padding-top:5px">

  <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline" style="padding-left:0px; width:270px; margin-left:40px">HTA
                <select id="cboHTA"  class="limpiarCbo6" style="margin-top:-16px; margin-bottom:0px; margin-left:117px ; width:104px">
                <option selected="selected" value="0">Pendiente</option>
                <option value="1">No</option>
                <option value="2">Si</option>
                </select>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>

            <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline" style="padding-left:0px; width:270px; width:270px; margin-left:40px">Enfermedad Coronaria
                <select id="cboEnfermedadCoronaria"  class="limpiarCbo6" style="margin-top:-16px; margin-bottom:0px; width:104px">
                <option selected="selected" value="0">Pendiente</option>
                <option value="1">No</option>
                <option value="2">Si</option>
                </select>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>

             <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline" style="padding-left:0px; width:270px; margin-left:40px">Tabaquismo
                <select id="cboTabaquismo"  class="limpiarCbo6" style="margin-top:-16px; margin-bottom:0px ;margin-left:66px; width:104px">
                <option selected="selected" value="0">Pendiente</option>
                <option value="1">No</option>
                <option value="2">Si</option>
                </select>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>

              <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline" style="padding-left:0px; width:270px; margin-left:40px">Obesidad
                <select id="cboObesidad"  class="limpiarCbo6" style="margin-top:-16px; margin-bottom:0px; margin-left:82px ; width:104px">
                <option selected="selected" value="0">Pendiente</option>
                <option value="1">No</option>
                <option value="2">Si</option>
                </select>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>

              <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline" style="padding-left:0px; width:270px; margin-left:40px">Dislipidemia
                <select id="cboDislipidemia"  class="limpiarCbo6" style="margin-top:-16px; margin-bottom:0px ;margin-left:68px; width:104px">
                <option selected="selected" value="0">Pendiente</option>
                <option value="1">No</option>
                <option value="2">Si</option>
                </select>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>

            <div class="label_top_grupo">
            <div class="label_top">
              <label class="checkbox inline" style="padding-left:0px; width:270px; margin-left:40px">Acv
                <select id="cboAcv"  class="limpiarCbo6" style="margin-top:-16px; margin-bottom:0px; margin-left:120px ; width:104px">
                <option selected="selected" value="0">Pendiente</option>
                <option value="1">No</option>
                <option value="2">Si</option>
                </select>
              </label>
            </div>
            <div class="clearfix"></div>
            </div>
</div>
</div>
      <div class="pie_gris">

        <a id="btnGuardar" class="btn btn-info pull-right"><i id="I1" class=" icon-hdd icon-white"></i>&nbsp;Guardar</a>
        <a id="btnImprimir" class="btn btn-info pull-right" style="display:none"><i id="imprimir" class=" icon-print"></i>&nbsp;Imprimir</a>
<%--         <a onclick="javascript:window.close();" class="btn pull-right">Cancelar</a>--%>
         <a onclick="limpiar()" class="btn pull-right">Limpiar Campos</a>
         <a class="btn btn-info" id="BtnVolver" href="javascript:history.go(-1)">
         <i id="i" class=" icon-arrow-left icon-white"></i>&nbsp;Volver</a>
         <a class="btn btn-info" id="btnCance" href="Buscar_Paciente.aspx">
         <i id="btnCancelar" class=" icon-off icon-white"></i>&nbsp;Cancelar</a>
        <div class="clearfix"></div>
      </div>
  
</div>

    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
        <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AtConsultorio/AtencionDiabeticos.js" type="text/javascript"></script>    


<!--Barra sup--> 


</body>
</html>



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
    <h3 id="H2">El Paciente ya existe</h3>
  </div>
  <div class="modal-body">
    <p>El paciente que está cargando ya existe en el sistema.</p>
    <p>Tenga en cuenta que...</p>
    <ul>
    <li>Si continua modificando los datos del paciente actual, al Actualizar los datos, todos los datos del paciente anterior, junto con su familiar, pueden llegar a perderse.</li>
    <li>Verifique el Nro de Documento o CUIL antes de continuar.</li>
    <li>Documento: <script>                       document.write($("#txtdocumento").val());</script> Cuil: <script>                                                                                                               document.write($("#txtcuil").val());</script></li>
    <li>¿Desea Seguir Cargando el paciente?.</li>
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