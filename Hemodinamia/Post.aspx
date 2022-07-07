<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Post.aspx.cs" Inherits="Hemodinamia_Post" %>

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
#PRE_DIV_CONTENEDOR input, textarea{margin-bottom:0;margin-top:0;}
#PRE_DIV_CONTENEDOR input[type="text"], textarea {height: 13px}
#PRE_DIV_CONTENEDOR input[type="radio"] {margin-top:4px; margin-left:2px;}
#PRE_DIV_CONTENEDOR textarea {margin-bottom:4px; margin-left:2px;}  
.manito {cursor:pointer; margin-left:10px;}


#div_CSV {position:absolute;}
#div_CSV input[type="text"]{width:40px; margin-bottom:3px; margin-right:10px;}
#div_CSV span{ display:inline-block;}

#div_CSV_Tabla {position:absolute; top:92px; width: 886px;left: 5px;height: 178px; max-height:178px; overflow:scroll; overflow-x: hidden;  }
#div_CSV_Tabla_Titulo {position:absolute; top:69px; width: 869px;left: 5px;height: 24px;    }

#div_MONITOREO {position:absolute; top: 8px; width:880px; border-top:1px solid #BBBBBB}
#div_MONITOREO input[type="text"]{width:40px; margin-bottom:3px;}
#div_MONITOREO span{width:50px; display:inline-block;}


#div_MONITOREO_Tabla {position:absolute; width: 880px;left: 5px; top: 126px; height: 178px; max-height:178px; overflow:scroll; overflow-x: hidden; border-bottom:1px solid #BBBBBB; }
#div_MONITOREO_Tabla_Titulo {position:absolute; width: 863px;left: 5px; top: 94px; height: 27px; border-bottom:1px solid #BBBBBB; }
#div_MONITOREO_ControlesExtras {position:absolute; width: 880px;left: 5px; top: 320px; height: 29px;}
#div_MONITOREO_ControlesExtras input[type="text"]{width:40px; margin-bottom:3px; margin-right:10px; margin-left:5px;}

#div_Observaciones {position:absolute; width: 900px;left: 5px; top: 360px; height: 44px; }
#div_Observaciones textarea {width: 879px;height: 31px;}

.sm2 {width: 28px!important;margin-left: 5px;}
.sm3 {width: 20px!important;margin-left: 5px;}
.sm4 {width: 31px!important;margin-left: 5px;}
.sm5 {width: 30px!important;margin-left: 5px;}
.sm6 {width: 35px!important;margin-left: 5px;}
.sm7 {width: 39px!important;margin-left: 5px;}
.sm8 {width: 39px!important;margin-left: 5px;}


#div_INFO_EXTRA{ position: absolute; top: 282px; }
#div_INFO_EXTRA label{ display: inline !important; cursor:pointer; }
#div_INFO_EXTRA input[type="checkbox"]{margin-right:18px; margin-left:2px;}
#cbo_sondas {width: 90px;margin-left: 5px;}

</style>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="display:none;"> <div class="titulo_seccion">
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
      <div class="resumen_datos" style="height:118px;">
        
        <div class="datos_persona" >
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas()" class="ver_mas_datos">Ver más</a></div>

          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> &nbsp;&nbsp;&nbsp; <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>
          </div>
          

          <span>Fecha: <strong><span id="CargadoFecha"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span> 
          <div><span>Urgencia: <strong><span id="CargadoUrgencia"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Monitoreo: <strong><span id="CargaMonitoreo"></span></strong></span>  &nbsp;&nbsp;&nbsp; <span>Diagnóstico: <strong><span id="CargadoDiagnostico"></span></strong></span> </div>
                  
                    
        <div><span>Anestesia: <strong><span id="CargadoAnestesia"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Anestesista: <strong><span id="CargadoAnestesista"></span></strong></span> </div>
        </div>
        
      </div>
      </div>

      <input id="afiliadoId" type="hidden"/>

      <div class="contenedor_3" style="height:400px;">       
         <form id="frm_" name="frm_">
         <div id="PRE_DIV_CONTENEDOR" style="margin-left:5px;">
            <div id="div_CSV">
            <b>Control Signos Vitales:</b><br />
            <span>TA:</span> <input type="text" id="txt_TA" /> <span>FC:</span> <input type="text" id="txt_FC" /> <span>FR:</span> <input type="text" id="txt_FR" />
            <span>Temp:</span> <input type="text" id="txt_TEMP" /> <span>SPO2:</span> <input type="text" id="txt_SPO2" />
            <span>Hora:</span> <input type="text" id="txt_hora" /> <a class="btn" style="margin-left: 54px;" href="javascript:Aceptar1();">Aceptar</a><a class="btn" href="javascript:Cancelar1();">Cancelar</a>
            </div>


<div id="div_CSV_Tabla_Titulo">
            <table class="table table-condensed">
            <thead>
            <tr>
            <th style="width: 32px;"></th><th style="width: 97px;">TA</th><th style="width: 97px;">FC</th><th style="width: 97px;">FR</th><th style="width: 167px;">Temp</th><th style="width: 163px;">SPO2</th><th style="width: 146px;">Hora</th>
            </tr>
            </thead>            
            </table>
</div>

            <div id="div_CSV_Tabla">
            <table class="table table-condensed">
            <thead>
            <tr style="display:none;">
            <th style="width: 32px;"></th><th style="width: 97px;">TA</th><th style="width: 97px;">FC</th><th style="width: 97px;">FR</th><th style="width: 167px;">Temp</th><th style="width: 163px;">SPO2</th><th style="width: 146px;">Hora</th>
            </tr>
            </thead>
            <tbody id="body_CSV"></tbody>            
            </table>
            </div>

            <div style="clear:both;"></div>

            <div id="div_INFO_EXTRA">
                <span><label for="ck_sonda_nasogastrica">Sonda Nasogastrica</label></span><input type="checkbox" id="ck_sonda_nasogastrica" /><span><label for="ck_sonda_vesical">Sonda Vesical</label></span><input type="checkbox" id="ck_sonda_vesical" /> <span><label for="cbo_sondas">Drenajes</label></span><select id="cbo_sondas">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>

                    <span><label for="cboEnfermero">Enfermero</label></span>&nbsp;&nbsp;<select id="cboEnfermero"></select>
            </div>

            


<%--             <div id="Enfermeros" style="width:30%; margin-left:600px; margin-top:250px">
                <span><label for="cbo_sondas">Enfermero</label></span><select id="cboEnfermero">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>--%>

          
                <div id="div_MONITOREO_ControlesExtras" style="height: 67px;width: 907px;" >                
                <table>
                <tr>
                <td style="width: 653px;">
                                
                <span>S. Fisiologica</span><input type="text" id="txt_sol_fisiologica" />
                <span>Dextrosa</span><input type="text" id="txt_dextrosa" />
                <span>Ringer Lactato</span><input type="text" id="txt_ringer_lactato" />
                <span>Exp. Plasmatico</span><input type="text" id="txt_expansor_plasmatico" />

                <br />

                <textarea id="txt_observaciones" placeholder="Observaciones" style="width: 627px;height: 25px;"></textarea>            
            
                </td>
                    
                <td style="width:224px; background-color:#CCCCCC">
                    <span style="margin-left:13px;">Hora Ingreso a Post:</span><input type="text" id="txt_hora_ingreso" style="width: 44px;margin-left: 10px;" maxlength="5" />
                    <span style="margin-left:13px;">Hora Egreso de Post:</span><input type="text" id="txt_hora_egreso" style="width: 44px;" maxlength="5" />
                </td>
                </tr>
                </table>

                
                
            </div>





            <div id="Contenedor_MONITOREO" style="position:absolute;width: 903px;height: 390px; background-color:White;top: 5px; left:5px;z-index:11; display:none;">
            <div id="div_MONITOREO">
            <b>IONOGRAMA + CONTROL DE ESTADO ACIDO/BASE:</b><br />
            <div style="font-size:12px;">
            <span>SAT.O2:</span> <input type="text" id="txt_sato2" /> <span class="sm2">HTO:</span> <input type="text" id="txt_hto" /> <span class="sm3">HB:</span> <input type="text" id="txt_hb" />
            <span class="sm4">pH:</span> <input type="text" id="txt_ph" /> <span class="sm5" style="margin-left: 8px;">PO2:</span> <input type="text" id="txt_po2" /> <span class="sm6">PCO2:</span> <input type="text" id="txt_pco2" /><span class="sm7">QUICK:</span> <input type="text" id="txt_quick" /> <span class="sm8">HCO3:</span> <input type="text" id="txt_hco3" /> <br />
            <span>Na+:</span> <input type="text" id="txt_na" /><span class="sm2" style="margin-left: 8px;">Cl:</span> <input type="text" id="txt_cl" /> <span class="sm3">K+:</span> <input type="text" id="txt_k" /> <span class="sm4">KPTT:</span> <input type="text" id="txt_kptt" /><span class="sm5" style="margin-left: 11px;">Sat%:</span> <input type="text" id="txt_sat" /> <span class="sm6">EB:</span> <input type="text" id="txt_eb" /> 

            <span class="sm7" style="margin-left: 2px;">Hora:</span> <input type="text" id="txt_hora2" /> <a class="btn" style="margin-left: 5px;" href="javascript:Aceptar2();">Aceptar</a><a class="btn" href="javascript:Cancelar2();">Cancelar</a>
            </div>
            </div> 

            <div id="div_MONITOREO_Tabla_Titulo">
            <table class="table table-condensed">
            <thead>
            <tr>
            <th style="width: 42px;"></th><th style="width: 65px;">SAT.O2</th><th style="width: 42px;">HTO</th><th style="width: 42px;">HB</th><th style="width: 42px;">pH</th><th style="width: 42px;">PO2</th><th style="width: 45px;">PCO2</th><th style="width: 53px;">QUICK</th><th style="width: 46px;">HCO3</th><th style="width: 42px;">Na+</th><th style="width: 42px;">Cl</th><th style="width: 43px;">K+</th><th style="width: 44px;">KPTT</th><th style="width: 43px;">Sat%</th><th style="width: 43px;">EB</th><th style="width: 44px;">Hora</th>
            </tr>
            </thead>            
            </table>
            </div>

            <div id="div_MONITOREO_Tabla">
            <table class="table table-condensed">            
            <tbody id="body_MONITOREO"></tbody>            
            </table>
            </div>


            </div>
            
            

            <div style="clear:both;"></div>

            


            


         </div>              
         </form>
         
<div class="pie_gris">
<div class="pull-right" style="padding:5px; height:70px;">
  
  <a id="btn_Iono_EAB" class="btn" style="margin-right: 142px; ">Iono/EAB</a>  

  <a id="btnVolver" class="btn" style="display:none"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <a id="btn_cancelear_todo" class="btn btn-danger">Cancelar</a>
  <a id="btnCarga_Post_Quirurgico" class="btn">&nbsp;Insumos Post</a>
  <a id = "btnGuardar" class="btn"><i class="icon-print"></i>&nbsp;Guardar</a>
  <a id = "btn_imprimir" class="btn"><i class="icon-print"></i>&nbsp;Imprimir</a>
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
    <script src="../js/Hospitales/Hemodinamia/Post.js" type="text/javascript"></script>  
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



    parent.document.getElementById("DondeEstoy").innerHTML = "Hemodinamia > Turnos > Planificar Hemodinamia > <strong>Post</strong>";

</script> 

</body>
</html>


