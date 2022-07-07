<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_IMG.aspx.cs" Inherits="AtConsultorio_IMG_Consulta_IMG" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <style>
        .dropdown-menu { max-height: 250px; max-width: 800px; font-size:11px; overflow-y: auto; overflow-x: hidden; }
        .mini_textos {height: 10px!important;}
        
    </style>

</head>
<body>
    <div class="container">
        <div class="contenedor_1 fancywidth" style="width:730px;overflow-y:hidden;">
            <div class="contenedor_a" style="position: relative; margin-left: 10px; height: 450px;
                padding-bottom: 25px; overflow-y:hidden;">
                <div class="resumen_datos" style="margin-top: 0px;font-size:12px;">
                    <div class="datos_persona">
                        <div>
                            <img id="fotopaciente" class="avatar2" src="../img/silueta.jpg"></img>
                        </div>
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor: pointer;"
                                    onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                            <input id="afiliadoId" value="" type="hidden"/>
                            <div>
                                Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>
                        </div>
                    </div>
                    <div class="pull-left" style="margin-left: 20px">
                        <div>
                            Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
                        <div>
                            Seccional/OS:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
                        <div>
                            Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
                    </div>
                    <div class="clearfix">
                    </div>
                </div>
                <div>
                
                <div class="titulo_seccion" style="margin-top: 5px; text-align:center; display:none;">
                    <span>Carga de Atención<span id="TEspecialidad" style="display:none;"></span></span>
                </div>

         <div style="padding: 0px 15px 0px 15px">
                     
               <div id="cargando" style="text-align:center; display:none; height:200px;">  
                <img src="../img/Espere.gif" /><br />
                    Cargando Historia Clínica...
                </div>
                        
           <form style="display:none; height: 12px;">
            <div class="control-group">
              <label class="control-label">Diag. ICD10</label>
              <div class="controls">
                <input class="typeahead span6" id="cbo_diagnostico" type="text" data-provide="typeahead" autocomplete="off">
                <input type="hidden" id="diag_nombre" />
                <input type="hidden" id="id_val" />
              </div>
            </div>
          </form>

          <form class="form-horizontal opc">
          
            <div class="control-group" style="float:left;height: 72px;">
              <label class="control-label">Atenciones Anteriores</label>
              <div class="controls span6" style="overflow:auto; height:80px; margin-top:-25px; border-width: 1px; border-style: solid; border-color: #cccccc; padding-left:2px;" >
                <div id="CargoHC"></div>
              </div>
            </div>                      

          </form>

           <form class="form-horizontal opc">
            <div class="control-group" style="height: 230px;">
              
              <label class="control-label">Estudios Previos</label>
              
              <div class="controls">
              <div style="border: solid 1px #CCCCCC; width:462px;">
                <table>
                    <tr><td>Resonancia Magnética</td><td><input type="text" class="span1 mini_textos" id="txt_1_cant"/></td><td></td><td>Urología</td><td><input class="span1 mini_textos" type="text" id="txt_2_cant"/></td></tr>
                   <tr><td>Tomografía Computada</td><td><input type="text" class="span1 mini_textos" id="txt_3_cant"/></td><td></td><td>Neurología</td><td><input type="text" class="span1 mini_textos" id="txt_4_cant"/></td></tr>
                   <tr><td>Radiología</td><td><input type="text" class="span1 mini_textos" id="txt_5_cant"/></td><td></td><td>Gastroenterología</td><td><input type="text" class="span1 mini_textos" id="txt_6_cant"/></td></tr>
                   <tr><td>Mamografía</td><td><input type="text" class="span1 mini_textos" id="txt_7_cant"/></td><td></td><td>Medicina Nuclear</td><td><input type="text" class="span1 mini_textos" id="txt_8_cant"/></td></tr>
                   <tr><td>Doppler</td><td><input type="text" class="span1 mini_textos" id="txt_9_cant"/></td><td></td><td><input type="text" class="span1 mini_textos" id="txt_otros_desc_1" placeholder="Otro" style="width: 102px;"/></td><td><input type="text" class="span1 mini_textos" id="txt_otros_1"/></td></tr>
                   <tr><td>Cardiología</td><td><input type="text" class="span1 mini_textos" id="txt_10_cant"/></td><td></td><td><input type="text" class="span1 mini_textos" id="txt_otros_desc_2" placeholder="Otro" style="width: 102px;"/></td><td><input type="text" class="span1 mini_textos" id="txt_otros_2"/></td></tr>
                </table>
                Cantidad de placas que realiza en esta oportunidad <input type="text" class="span1 mini_textos" id="txt_cant_placas" style="margin-left: 6px;"/>
              </div>
            </div>
            </div>
          </form>         
          
          <div>
          ¿Realiza lo solicitado en la Autorización o Pedido Médico? <select class="span1" id="cbo_realizalopedido" style="padding-top: 0px;padding-bottom: 0px;height: 21px;"><option value="0"></option><option value="Si">Si</option><option value="No">No</option></select> <span style="font-size:12px;">(Si la respuesta es negativa fundamentar) </span>
            <textarea id="txt_fundamentar" style="height: 29px;width: 652px;"></textarea>
          </div>



          <form id="divmotivo" style="display:none;" class="form-horizontal">
            <div class="control-group">
              <label class="control-label">Motivo Modificación</label>
              <div class="controls">
                <textarea id="txt_Motivo" type="text" rows="5" class="span6"></textarea>
              </div>
            </div>
          </form>

                    </div>

                </div>
                
                <div class="pie_gris">
                    
                    
                    <a id="btn_Ordenes_Medicas_Scaneadas" href="javascript:MostrarEscaneadas();" class="btn btn-success pull-left">&nbsp;Ordenes Médicas</a>

                    <span style="margin-left:10px;">Alias <input type="text" id="txt_Alias" style="width:150px;" maxlength="10"/></span> 

                    <a id="btnGuardar" class="btn btn-info pull-right"><i class="icon-ok"></i>&nbsp;Guardar</a>
                    <a id="btnCancelar" class="btn btn-danger pull-right"><i class="icon-remove"></i>&nbsp;Cancelar</a> 
                    <div class="clearfix">
                    </div>
                </div>
            </div>



        </div>


    <div id="Contenedor_Escaneadas" class="container" style="background-color:White; position: absolute; top:0; height:541px; display:none;">
        <div id="fotos" style="padding:0 150px 0 150px; min-height:480px;max-height:480px; overflow:auto; background-color:White;">
            
        </div>
        <div style="text-align:center;border: solid 1px #ccc;border-radius: 0 0 10px 10px;width: 628px;margin-left: 160px;height: 35px;padding-top: 5px; background-color: #ccc">
            <a class="btn" onclick="javascript:OcultarEscaneado();">Cerrar</a>
        </div>
    </div>


    </div>



    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/Hospitales/AtConsultorio_IMG/Consulta_IMG.js" type="text/javascript"></script>
    <!--Barra sup-->



</body>
</html>
