<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Preanestesico.aspx.cs" Inherits="Hemodinamia_Preanestesico" %>

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
      <div class="resumen_datos" style="height:155px;">
        
        <div class="datos_persona" >
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas()" class="ver_mas_datos">Ver más</a></div>

          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>

          <span>Fecha: <strong><span id="CargadoFecha"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span> 
          <div><span>Urgencia: <strong><span id="CargadoUrgencia"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Monitoreo: <strong><span id="CargaMonitoreo"></span></strong></span>  &nbsp;&nbsp;&nbsp; <span>Diagnóstico: <strong><span id="CargadoDiagnostico"></span></strong></span> </div>
          
          <span>Cirugia: <strong><span id="CargarCirugia"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Cirujano: <strong><span id="CargarCirujano"></span></strong></span>
                    
        <div><span>Anestesia: <strong><span id="CargadoAnestesia"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Anestesista: <strong><span id="CargadoAnestesista"></span></strong></span> </div>
        </div>
        
      </div>
      </div>

      <input id="afiliadoId" type="hidden"/>

      <div class="contenedor_3" style="height:400px;">       
              <form id="frm_" name="frm_">

              <div id="PRE_DIV_CONTENEDOR" style="margin-left:5px;">
                <span>Hora ingreso a UCPA (PRE)</span><input type="text" id="PRE_HORA_INGRESO" style="width:40px;"/> <span><label for="PRE_AYUNO" style="display:inline;" class="manito">Ayuno</label></span> <input type="checkbox" id="PRE_AYUNO" style="margin-right: 30px;" /> <span>Peso</span><input type="text" id="txt_peso" style="width:80px;" maxlength="6"/>  <span style="margin-left: 10px;">Observaciones</span><input type="text" id="PRE_OBS_1" style="width:300px;" maxlength="4000"/> <br />
                <span>Hora salida de UCPA (PRE) / Ingreso a Quirófano</span><input type="text" id="PRE_HS_UCPA_INGRESO_Q" style="width:40px;"/> <span><label for="PRE_ING_VENOCLISIS" style="display:inline;" class="manito">Ingresa con venoclisis</label></span> <input type="checkbox" id="PRE_ING_VENOCLISIS"/> <span>Antitetánica: Dosis </span> <input id="PRE_ANTITETANICA_DOSIS" name="PRE_ANTITETANICA_DOSIS" type="text" style="width:10px;" maxlength="1"/> <br />
                <span><label for="PRE_BANIO_PRE_QX" style="display:inline;" class="manito">Baño pre-Qx</label></span><input type="checkbox" id="PRE_BANIO_PRE_QX"/> <span><label for="PRE_PROFILAXIS_ATB" style="display:inline;" class="manito">Profilaxis ATB</label></span> <input type="checkbox" id="PRE_PROFILAXIS_ATB"/> <span><label for="PRE_PROTESIS_DENTARIA" style="display:inline;" class="manito">Protesis Dentaria</label> </span><input type="checkbox" id="PRE_PROTESIS_DENTARIA"/> <span style="margin-left: 10px;">Observaciones</span><input type="text" id="PRE_OBS_2" style="width:400px;" maxlength="4000"/> <br />
                
                <span><label for="TXT_PEDIDO_SANGRE" style="display:inline;" class="manito">Pedido de Sangre</label></span><input id="TXT_PEDIDO_SANGRE" name="TXT_PEDIDO_SANGRE" type="checkbox"/>

                <span><label for="cbo_unidades_sangre" style="display:inline;" class="manito">Unidades de Sangre</label></span>
                <select id="cbo_unidades_sangre" style="width:79px;">
                    <option value="0">0</option>
                    <option value="300">300</option>
                    <option value="600">600</option>
                    <option value="900">900</option>
                    <option value="1200">1200</option>
                    <option value="1500">1500</option>
                    <option value="1800">1800</option>
                    <option value="2100">2100</option>
                    <option value="2400">2400</option>
                    <option value="2700">2700</option>
                </select>
                
                <span><label for="cbo_sangre_grupo" style="display:inline;" class="manito">Grupo</label></span>
                <select id="cbo_sangre_grupo" style="width:79px;margin-top: 5px;">
                    <option value="-1"></option>
                    <option value="A">A</option>
                    <option value="AB">AB</option>
                    <option value="B">B</option>
                    <option value="O">O</option>                    
                </select>

                <span><label for="cbo_sangre_factor" style="display:inline;" class="manito">Factor</label></span>
                <select id="cbo_sangre_factor" style="width:79px;">
                    <option value="-1"></option>
                    <option value="P">Rh+</option>
                    <option value="N">Rh-</option>                    
                </select>
                
                <br />

                <span style="vertical-align:text-top;">Observaciones: </span><textarea id="PRE_OBS_3" style="width: 765px; height: 51px;" maxlength="4000"></textarea>

                <hr style="margin-top: 4px;">

                <span style="float:left;"><b>Último Riesgo Quirúrgico </b> - Fecha </span><input type="text" id="PRE_RIESGO_Q_FECHA" style="width:80px; float:left;"/> <span style="float:left;">&nbsp;&nbsp;&nbsp;Tipo: </span> <label for="PRE_TIPO_HABITUAL" style="float:left;" class="manito">Habitual</label> <input name="PRE_TIPO" type="radio" id="PRE_TIPO_HABITUAL" style="float:left;"/> <label for="PRE_TIPO_MODERADO" style="float:left;" class="manito">Moderado</label> <input name="PRE_TIPO" type="radio" id="PRE_TIPO_MODERADO" style="float:left;"/>  <label for="PRE_TIPO_ALTO" style="float:left;" class="manito">Alto</label> <input name="PRE_TIPO" type="radio" id="PRE_TIPO_ALTO" style="float:left;"/> <label for="PRE_MONITOREO" style="display:inline; margin-left:31px;" class="manito">Pedido de Monitorista</label> <input type="checkbox" id="PRE_MONITOREO" style="margin-right: 30px;">
                <br />                
                <div style="clear:both;"></div>
                <span><b>Control Signos Vitales</b> - TA: </span><input type="text" id="PRE_CONTROL_SIGNOS_VITALES_TA" style="width:60px;" maxlengt="7"/> <span>FC</span> <input type="text" id="PRE_CONTROL_SIGNOS_VITALES_FC" style="width:26px;" maxlengt="3"/> <span>FR</span> <input type="text" id="PRE_CONTROL_SIGNOS_VITALES_FR" style="width:26px;" maxlengt="3"/> <span>TEMP.</span> <input type="text" id="PRE_CONTROL_SIGNOS_VITALES_TEMP" style="width:20px;" maxlengt="5"/> <span>SPO2</span> <input type="text" id="PRE_CONTROL_SIGNOS_VITALES_SPO2" style="width:40px;" maxlengt="5"/> <span>Obs. </span> <textarea id="PRE_OBS_4" cols="40" rows="1" style="width:252px;" maxlength="4000"></textarea> <br />                
                <span><b>Último Laboratorio</b> - Fecha: </span><input type="text" id="PRE_LABORATORIO_FECHA" style="width:80px;"/> <span style="margin-left:5px">HTO.</span> <input type="text" id="PRE_LABORATORIO_HTO" style="width:28px;" maxlengt="4"/> <span style="margin-left:5px">HB.</span> <input type="text" id="PRE_LABORATORIO_HB" style="width:28px;" maxlengt="4"/> <span style="margin-left:5px">PLAQ.</span> <input type="text" id="PRE_LABORATORIO_PLAQUETAS" style="width:50px; font-size:10px;" maxlengt="18"/> <span style="margin-left:5px">KPTT</span> <input type="text" id="PRE_LABORATORIO_KPTT" style="width:28px;"/> <span style="margin-left:5px">QUICK</span> <input type="text" id="PRE_LABORATORIO_QUICK" style="width:28px;"/> <span style="margin-left:5px">GLUC.</span> <input type="text" id="PRE_LABORATORIO_GLUCEMIA" style="width:28px;"/><br />
                <span><b>Antecedentes</b> - <label for="PRE_ANTECEDENTES_HTA" style="display:inline;" class="manito">HTA:</label></span><input type="checkbox" id="PRE_ANTECEDENTES_HTA"/> <span><label for="PRE_ANTECEDENTES_DBT" style="display:inline;" class="manito">DBT.</label></span> <input type="checkbox" id="PRE_ANTECEDENTES_DBT"/> <span><label for="PRE_ANTECEDENTES_ENF_RESPIRATORIAS" style="display:inline;" class="manito">Enf. respiratorias</label></span> <input type="checkbox" id="PRE_ANTECEDENTES_ENF_RESPIRATORIAS"/> <span><label for="PRE_ANTECEDENTES_ENF_CARDIACAS" style="display:inline;" class="manito">Enf. cardiacas</label></span> <input type="checkbox" id="PRE_ANTECEDENTES_ENF_CARDIACAS" style="width:20px;"/> <span>Obs. </span> <textarea id="PRE_OBS_5" cols="40" rows="1" style="width:342px;" maxlength="4000"></textarea> <br />

                <span style="display:none;"><b>Insumos:</b></span>
                <div id="PRE_INSUMO" style="display:none; width: 889px; height:37px; overflow:auto; border: 1px solid #cccccc; margin-left:3px; ">
                </div>
                           
                       
                <table>
                <tr>
                <td style="vertical-align:top;"><b>Observaciones</b></td>
                <td><textarea id="PRE_OBS_6" cols="40" rows="1" style="width:764px;height:30px;" maxlength="4000"></textarea><br />
                <label><b>Enfermero</b>&nbsp;&nbsp<select id="cboEnfermero"></select></label>
                </td>
                </tr>
                </table>    
                                

              </div>
         </form>
         
<div class="pie_gris">
<div class="pull-right" style="padding:5px; height:70px;">
  
  <a id="btnVolver" class="btn" style="display:none"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <a id="btn_cancelear_todo" class="btn btn-danger">Cancelar</a>
  <a id="btnCarga_Pre_Quirurgico" class="btn">&nbsp;Insumos Pre</a>
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
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/Hospitales/Hemodinamia/Preanestesico.js" type="text/javascript"></script>  
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



    parent.document.getElementById("DondeEstoy").innerHTML = "Hemodinamia > Turnos > Planificar Hemodinamia > <strong>Pre</strong>";

</script> 

</body>
</html>


