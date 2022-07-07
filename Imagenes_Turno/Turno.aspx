<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Turno.aspx.cs" Inherits="Imagenes_Turno_Turno" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />


<style>
.Imagenes_Paciente_Contenedor_Principal {width:100%; background-color:Black; height:80px; border-radius:5px; padding-top:5px; padding-left:5px; position:relative;}
.Imagenes_Paciente_Contenedor_Principal_Foto {width:70px; height:70px; border-radius:5px;}
.Contenedor_Informacion_Paciente {position:absolute; top:0px; left:85px; color:White; font-size:12px;}
.Contenedor_Turnos{margin-top:10px;}
.Turnos_Izquierdo{float:left; width:48%; height:100%; background-color: #C7C7C7; margin:5px; }
.Turnos_Derecho{float:left; width:49%; height:100%; background-color: #C7C7C7;  margin:5px;}
.Texto_Centrado{text-align:center;}

.libre {background-color:White;}
.ocupado{background-color:#40c340;}
.sobreturno{background-color:#0080FF;}
.cancelado{background-color:#FA5858;}
.forzado{background-color:#FF8000;}

.atendido{background-color:#af8662}
.llamado{background-color:#F7FE2E}
.ausente{background-color:#F5A9BC}
.enconsultorio{background-color:#37FF98}
.recepcionado{background-color:#A9F5F2}
.noatendido{background-color:#D215FF}

#tabla_turnos_dias .libre:hover{background-color:#BFFFD9; cursor:pointer;}
.Contenedor_Info_Medico {background-color:#DEDEDE;width:100%;margin-top:5px;padding:5px;}

.borderless td, .borderless th {border: none;}

.div_izquierdo {float:left;}

.bloque {display:block;}

#tabla_turnos_dias tr{cursor:pointer;}
#tabla_turnos_semana span{cursor:pointer; border-bottom: 1px dotted gray}


.Contenedor_Info_Medico .btn{margin-bottom: 5px;}
.Links {cursor: pointer; text-decoration:none;}
.Links:hover {cursor: pointer; text-decoration:none;}

#fancybox-overlay {z-index: 10000;}
#fancybox-wrap {z-index: 10001;}

.manito {cursor:pointer;}

</style>


</head>
<body>
    <form id="form1" runat="server">
    <div class="container" style="padding-top:30px;">
    <div class="contenedor_1">
      <div class="contenedor_2" style="height: 473px;"> <div class="titulo_seccion">
      <span style="text-align:center; display:block;">Datos del paciente</span></div>
            
      <input id="afiliadoId" style="display:none;"/>

      <table>
      <tr><td style="width: 118px; text-align:right;">Tipo</td><td><select id="cbo_tipo"></select></td></tr>
      <tr><td style="width: 118px; text-align:right;">N°</td><td><input type="text" id="txtdocumento" maxlength="8" autocomplete="off" placeholder="Nro. de documento sin puntos"/><span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span></td></tr>
      <tr><td style="width: 118px; text-align:right;">NHC</td><td><input type="text" id="txt_NHC" maxlength="11" autocomplete="off" placeholder="Ej: 99123456789" /></td></tr>
      <tr><td style="width: 118px; text-align:right;">Paciente</td><td><input type="text" id="txtPaciente" autocomplete="off" maxlength="60" placeholder="Apellido Nombre"/> <a id="btnBuscarPaciente" class="btn" style="height: 20px;margin-bottom: 5px;border-top-width: 1px;padding-top: 6px;padding-bottom: 2px;"><i class="icon-search icon-black"></i></a> </td></tr>
      
      <tr><td style="width: 118px; text-align:right;">E-mail</td><td><input type="text" id="txt_Email" autocomplete="off" maxlength="100" placeholder="email@dominio.com" disabled/>  </td></tr>
      <tr><td style="width: 118px; text-align:right;">Celular</td><td><input type="text" id="txt_telefono" autocomplete="off" maxlength="10" placeholder="(Loc) Número" class="numeroEntero" disabled/> Principal</td></tr>
      <tr><td style="width: 118px; text-align:right;">Celular</td><td><input type="text" id="txt_celular" autocomplete="off" maxlength="10" placeholder="(Loc) Número" class="numeroEntero" disabled/>  </td></tr>
      
      <tr><td style="width: 118px; text-align:right;">Seccional</td><td><select id="cbo_seccional" disabled></select></td></tr>
      </table>

      <div style="text-align:center; margin-top: 20px;">
      <a class="btn btn-danger" href="Turno.aspx" tabindex="-1" id="btnCancelarPedidoTurno" style="">Cancelar</a>
      <a class="btn btn-info" tabindex="-1" id="btnSiguiente" style="">Siguiente</a>
      <a class="btn btn-success" tabindex="-1" id="btnRecepcionar" style="">Recepcionar</a>
      <a class="btn btn-warning" tabindex="-1" id="btnActualizarDatos" style="display:none">Actualizar</a>
      <a class="btn btn-info" tabindex="-1" id="btn_buscarturnos">Buscar</a>
      </div>


    </div>
    </div>
    </div>
    <div class="clearfix"></div>


  


    <div id="DatoTurno" style="display:none;">
        <div id="Contenedor" class="well">                        
            <div id="Contenedor_Datos_Paciente" class="Imagenes_Paciente_Contenedor_Principal"> 
                <div><img id="fotopaciente" class="Imagenes_Paciente_Contenedor_Principal_Foto" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></div>
                    <div id="Contenedor_Informacion_Paciente" class="Contenedor_Informacion_Paciente">
                <div>Paciente: <b><span id="span_Paciente"></span></b> <span id="span_Edad"></span> <a href="javascript:VerMas();" class="ver_mas_datos" tabindex="-1">Ver más</a> </div>
                <div>DNI: <b><span id="span_DNI"></span></b> <span id="span_NHC"></span> </div>                
                <div>Teléfono: <b><span id="span_Telefono"></span></b>&nbsp;&nbsp;&nbsp; Celular: <b><span id="span_Celular"></span></b>&nbsp;&nbsp;&nbsp; E-mail: <b><span id="span_Email"></span></b></div>
                <div><span id="span_TituloSeccional">Seccional: </span><b><span id="span_Seccional"></span></b> </div>                                
                    </div>
            </div>

            <div class="Contenedor_Info_Medico">                
                Especialidad: <span id="span_especialidad"><select id="cbo_especialidad"></select></span>
                Médico: <span id="span_medico"><select id="cbo_medico"></select></span>                
                <a class="btn btn-success" id="btn_turno_forzado" style="display:none;">Turno Forzado</a>
                <a class="btn btn-success" id="btn_turno_1er" style="display:none;">1er Turno</a>
                <a class="btn btn-info" href="Turno.aspx">Turno Nuevo</a>
                <a id="btn_seguir_editando" class="btn btn-info" style="display:none;">Volver a Edición de Turno</a>
            </div>

            <div class="Contenedor_Info_Medico">                
                <span style="background-color:White;color:Gray;" class="badge">Libre</span>
                <span class="ocupado badge" style="color:Gray;">Ocupado</span>
                <span class="sobreturno badge">Sobreturno</span>
                <span class="cancelado badge">Rechazado</span>
                <span class="forzado badge">Forzado</span>

                <span class="recepcionado badge" style="color:Gray;">Recepcionado</span>
                <span class="llamado badge" style="color:Gray;">Llamado</span>
                <span class="ausente badge">Ausente</span>

                <span class="enconsultorio badge">En consultorio</span>
                
                
                <span class="atendido badge">Atendido</span>
                <span class="noatendido badge">No Atendido</span>

            </div>


            <div class="Contenedor_Turnos">
                <div class="Turnos_Izquierdo">
                    <div class="Texto_Centrado">Fecha: <input type="text" id="txt_fecha_almanaque" style="width:78px;" /><img class="manito" onclick="ActualizarListadoPacientes();" src="update.png" style="width: 25px;margin-bottom: 6px;" /></div>
                    <div style="max-height:460px; overflow:auto;">
                    <table id="tabla_turnos_dias" class="table table-condensed borderless">
                        <thead>
                        <tr class="header">
                            <th>Hora </th>
                            <th>Paciente </th>
                            <th>Estudio </th>
                        </tr>
                        </thead>
                        <tbody id="tbody_turnos_dia">                            
                        </tbody>

                        

                    </table>
                    </div>
                </div>
                <div class="Turnos_Derecho">
                <div style="max-height:506px; overflow:auto;">
                    <div class="Texto_Centrado"><span id="span_rango_fecha"></span></div>
                    
                    <table id="tabla_turnos_semana" class="table table-condensed borderless">
                        <tr><td id="td_dom">Dom. 99</td><td id="td_lun">Lun. 99</td><td id="td_mar">Mar. 99</td><td id="td_mie">Mié. 99</td><td id="td_jue">Jue. 99</td><td id="td_vie">Vie. 99</td><td id="td_sab">Sáb. 99</td></tr>
                        <tr class="libre">
                        <td><div id="div_domingo"></div></td>
                        <td><div id="div_lunes"></div></td>
                        <td><div id="div_martes"></div></td>
                        <td><div id="div_miercoles"></div></td>
                        <td><div id="div_jueves"></div></td>
                        <td><div id="div_viernes"></div></td>
                        <td><div id="div_sabado"></div></td>
                        </tr>
                                                
                    </table>                    
                </div>
                </div>
            </div>

            <div style="clear:both;"></div>

        </div>
    </div>



<div id="Recepcionar_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="Recepcionar_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Rechazar Turno</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="Recepcionar_Mensaje">           
            Código de barra del turno a recepcionar: <input type="text" id="txt_cod_barra" maxlength="10"  style="width:198px;" /><br />
            <div id="div_relacionar" style="display:none;">
            Código del bono a relacionar: <input type="text" id="txt_bono_id" maxlength="10"  style="width:174px;" /><a onclick="javascript:Relacionar();" class="btn btn-info" style="margin-bottom:5px;">Relacionar</a><br />
            
            </div>
            
            <div id="Recepcion_Div_Datos" style="display:none;">
            <hr />            


            <span id="SPAN_MOTIVORECHAZADO_INFO" style="color:red; font-weight:bold;"></span><br />
            <div><b>Paciente:</b><span id="span_recepcion_paciente"></span> &nbsp;&nbsp;&nbsp;&nbsp;<b>NHC:</b><span id="span_recepcion_NHC"></span></div>
            <div><b>Fecha:</b><span id="span_recepcion_fecha"></span></div>
            <div><b>Especialidad:</b> <span id="span_recepcion_especialidad"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Médico:</b> <span id="span_recepcion_medico"></span></div><br />
                       

            <span id="span_recepcion_resumen_1"></span> <br /><br />
            <div style="max-height: 180px; overflow:auto;">
                <span id="span_recepcion_resumen_practicas"></span> <br /><br />
            </div>
            <div>  <a class="btn btn-danger" id="btn_rechazar_turno" style="float:right;margin-left: 42px;">Rechazar Turno</a><a class="btn btn-info" id="Recepcionar_btn_editar">Editar Turno</a> <a class="btn btn-info" id="btn_salvar_bono" style="margin-left: 77px;">Salvar Bono</a> <a class="btn btn-success" id="btn_Recepcionar" style="float:right;">Confirmar Recepción</a></div>
            <div style="clear:both;"></div>
            </div>


         </div>
         <hr />
         <div style="float:right; margin-right:10px;">                        
            <a class="btn btn-danger" id="Recepcionar_btn_cancelar">Cancelar</a>            
         </div>
         <div style="clear:both;"></div>
    </div>
</div>





<div id="Rechazar_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="Rechazar_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Rechazar Turno</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="Rechazar_Mensaje">           
            Motivo: <select id="cbo_rechazar_motivos"><option value="0">Otro</option></select><br />           
            Otro: <input type="text" id="txt_rechazar_motivo_otro" maxlength="100"  style="width:400px;" /><br />           
            <div><a class="btn btn-danger" id="btn_rechazarelturno" style="float:right;">Rechazar Turno</a><br /></div>
         </div>
         <hr />
         <div style="float:right; margin-right:10px;">                        
            <a class="btn btn-danger" id="Rechazar_btn_cancelar">Cancelar</a>            
         </div>
         <div style="clear:both;"></div>
    </div>
</div>









<div id="Mensaje_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="Mensaje_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Titulo Mensaje</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="Mensaje_Mensaje">           
         </div>
         <hr />
         <div style="float:right; margin-right:10px;">
            <a class="btn btn-info" id="Mensaje_btn_Aceptar">Aceptar</a>
            <a class="btn btn-danger" style="display:none;" id="Mensaje_btn_cancelar">Cancelar</a>
            <a class="btn btn-success" style="display:none;" id="Mensaje_btn_turno_forzado">Turno Forzado</a>
         </div>
         <div style="clear:both;"></div>
    </div>
</div>


<div id="Turno_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:99;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:700px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="Turno_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Turno</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="Turno_Mensaje">          
            <span id="span_motivo_cancelacion" style="color:red; font-weight:bold;"></span><br />
            <b>Paciente:</b>  <span id="span_paciente"></span><br />
            <b>Tipo:</b> <select id="cb_tipo" class="span2"><option value="1">Ambulatorio</option><option value="2">Guardia</option><option value="3">Internación</option></select> <b>Fecha:</b>  <span id="span_turno_forzado_fecha"><input id="txt_turno_forzado_fecha" type="text" style="width: 80px;"/></span>  <b>Hora:</b><span id="span_turno_forzado_hora"><input type="text" id="txt_turno_forzado_hora" style="width: 50px;" maxlength="5" onblur="ValidarHora(this);"/> 
            <a class="btn btn-primary" id="btn_ver_grilla" style="margin-bottom: 5px;">Ver Grilla</a>
            <a class="btn btn-primary" id="btn_proximoturno" onclick="obtenerproximoturno();" style="margin-bottom: 5px;">1er Turno</a>
            </span><br />
            <b>Especialidad:</b> <span id="span_turno_forzado_especialidad"></span>   <b style="margin-left: 25px;">Médico:</b> <span id="span_turno_forzado_medico"></span><br />
            <span><b>Médico Derivante:</b></span> <span id="span_medico_derivante"><select id="cbo_medico_derivante"></select><a id="btn_medico_derivante_edicion" class="btn btn-success" style="margin-bottom: 5px;">Edición Médico</a></span><br />
            <b>Duración:</b> <input type="text" class="span1" id="txt_duracion" maxlength="3"/> <input type="checkbox" id="ck_manual" style="margin-top: 0px;" /><label for="ck_manual" style="display:inline-block">No cambiar</label>  <span style="margin-left: 125px;"><b> Hora Visible: </b></span><input type="text" id="txt_hora_visible" style="width: 50px;" maxlength="5" onblur="ValidarHora(this);"/>  <br />
            <b><label for="ck_urgencia" style="display:inline-block">Urg </label>: </b> <input type="checkbox" id="ck_urgencia" style="margin-top: 0px;" />
            <b><label for="ck_sobreturno" style="display:inline-block">SobreTurno </label>: </b> <input type="checkbox" id="ck_sobreturno" style="margin-top: 0px;" />
            <b><label for="ck_turnoforzado" style="display:inline-block; margin-left:20px;">Turno Forzado </label>: </b> <input type="checkbox" id="ck_turnoforzado" style="margin-top: 0px;" />
            <b><label for="ck_turnoxemail" style="display:inline-block; margin-left:20px;">Turno x Email </label>: </b> <input type="checkbox" id="ck_turnoxemail" style="margin-top: 0px;" />

            <a class="btn btn-info" id="btn_recepcionar_paciente_x_bono" style="float: right;margin-right: 27px; display:none;">Recepcionar</a>
            <a class="btn btn-info" id="btn_ver_escaneado" style="float: right;margin-right: 27px;">Ver Escaneado</a>

            <br />
            Comentario: <input id="txt_comentario" style="width: 517px;margin-right: 10px;"/><a id="btn_guardar_comentario" class="btn btn-success" href="#" title="Guardar Comentario">G</a>
            <br />            

            <span id="span_comentario_medico"></span><br />

            <hr />
            <b>Seleccione práctica(s) a realizar</b><br />
            <b>Código:</b> <input type="text" id="txt_practica_id" class="span2" />
            <b>Práctica:</b> <select id="cbo_practica_nombre" class="span5"></select>            
            <div style="min-height:150px; max-height:150px; overflow:auto;">
                <table class="table table-condensed">
                    <thead>
                    <tr><td></td><td>Código</td><td>Práctica</td><td>Duración (Min.)</td></tr>
                    </thead>
                    <tbody id="tabla_turno_practicas">                    
                    </tbody>
                </table>
            </div>
         </div>
         <hr />
         <div style="float:right; margin-right:10px;">
            <a class="btn btn-danger" id="Turno_btn_eliminarturno" style="display:none; margin-right: 147px;">Eliminar Turno</a><span id="span_pregunta_eliminar" style="margin-right: 29px; display:none;">¿Confirma eliminar? <a id="btn_elimiar_turno" class="btn btn-danger">Si</a><a id="btn_quitar_pregunta" class="btn btn-info">No</a></span>
            
            <a class="btn btn-info" id="Turno_btn_copiar">Mover</a>
            <a class="btn btn-info" id="btn_salvar_bono_guardar" style="display:none">Cambiar</a>            
            <a class="btn btn-info" id="Turno_btn_imprimir">Imprimir</a>
            <a class="btn btn-info" id="Turno_btn_escanear" style="display:none">Escanear</a>
            <a class="btn btn-info" id="Turno_btn_aceptar">Aceptar</a>
            <a class="btn btn-danger" id="Turno_btn_cancelar">Cancelar</a>            
         </div>
         <div style="clear:both;"></div>
    </div>  
</div>




<div id="MedicoDerivante_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="MedicoDerivante_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Edición Médicos Derivantes</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;">           
         
         <span style="width:90px;display:inline-block;"><b>Médicos:</b></span><select style="width:314px;" id="cbo_medicos_derivantes_existenes"></select><br />
         <span style="width:90px;display:inline-block;"><b>Ape. y Nom.:</b></span> <input type="text" id="txt_medico_derivante_nombre" class="span2" style="width:300px;" /><br />
         <span style="width:90px;display:inline-block;"><b>MN:</b></span> <input type="text" id="txt_medico_derivante_MN" class="span2" /><br />
         <span style="width:90px;display:inline-block;"><b>MP:</b></span> <input type="text" id="txt_medico_derivante_MP" class="span2" /><br />

         </div>
         <hr />
         <div style="float:right; margin-right:10px;">
            <a class="btn btn-info" id="MedicoDerivante_Aceptar">Aceptar</a>
            <a class="btn btn-danger" id="MedicoDerivante_Cancelar">Cancelar</a>            
         </div>
         <div style="clear:both;"></div>
    </div>
</div>




    </form>
</body>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.validate.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/ObraSociales/ObraSociales.js" type="text/javascript"></script>
<script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>
<script src="../js/Hospitales/PhoneValidate.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<script type="text/javascript" >

    var Recepcionando = false;
    var celCache ;

    $("#txt_turno_forzado_hora").mask("99:99", { placeholder: "__:__" });
    $("#txt_hora_visible").mask("99:99", { placeholder: "__:__" });    
    $("#txt_turno_forzado_fecha").datepicker();
    $("#txt_fecha_almanaque").datepicker();




    $("#txt_NHC").mask("9?9999999999", { placeholder: "-" });
    $("#txtdocumento").mask("999999?99", { placeholder: "-" });


//    var turno_inicial = 900;
//    var turno_final = 1800;
//    var turno_intervalo = 10;

//    var turno = turno_inicial;

//    turno = turno + turno_intervalo;
//    $("#tbody_turnos_dia").html("<tr><td>" + turno + "</td><td></td><td></td></tr>");

//    while (turno < turno_final) {
//        turno = turno + turno_intervalo;
//        min = "0000" + turno.toString().substring(turno.toString().length - 1, 3);

//        //$("#tbody_turnos_dia").html($("#tbody_turnos_dia").html() + "<tr><td>" + min + "</td><td></td><td></td></tr>");
//    }



    


    function CargarTurnos(Objeto, SoloTurnos, Dia,Especialidad, Medico) {

        var json = JSON.stringify({
        "Medico": Medico,
        "Especialidad": Especialidad,
        "Dia": Dia,
        "SoloHoras": SoloTurnos
        });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Imagenes/Imagenes.asmx/Listar_Turnos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {                
                if (!Recepcionando && !copiando) {                    
                    LimpiarDatos();
                }

                $("#" + Objeto).html(Resultado.d);
            },
            error: errores
        });
    }


    function LimpiarDatos() {
        Array_Turno_Practicas = [];
        $("#txt_duracion").val("0");
        $('#ck_manual').prop('checked', false);
        $('#ck_sobreturno').prop('checked', false);
        $('#ck_turnoforzado').prop('checked', false);
        $('#ck_turnoxemail').prop('checked', false);
        $('#ck_urgencia').prop('checked', false);
        $("#txt_comentario").val("");
        $('#cb_tipo').val('1');
               
        $("#span_pregunta_eliminar").hide();

        RenderizarPracticasSeleccionadas();        
        return;
    }

    
    var TurnoId = 0;
    var HoraTurno = "";
    var Motivo = "";
    var Dia_Turno = "";
    var Hora_Turno = "";

    $("#tabla_turnos_dias").on("click", "tr", function () {



        if ($("#span_Paciente").html() != "" && !$(this).hasClass("libre")) {
            if (confirm('Tiene un paciente cargado, ¿desea dejar de usar ese paciente?')) {
                // Save it!
            } else {
                return;
            }
        }

        if (Recepcionando || copiando) {
            Dia_Turno = $(this).data("dia");

            d_dia = Dia_Turno.substring(0, 2);
            d_mes = Dia_Turno.substring(3, 5);
            d_anio = Dia_Turno.substring(6, 10);

            var arr = Dia_Turno.split("/");
            d_dia = arr[0];
            d_mes = arr[1];
            d_anio = arr[2];

            $("#txt_turno_forzado_fecha").val(pad_with_zeroes(d_dia, 2) + "/" + pad_with_zeroes(d_mes, 2) + "/" + d_anio);
            Hora_Turno = $(this).text().substring(0, 5);
            $("#txt_turno_forzado_hora").val(Hora_Turno);
            $("#Turno_Div").show();
            return;
        }


        $("#btn_ver_grilla").hide();

        //Recepcionando = false;
        $("#Turno_btn_escanear").hide();
        $("#Turno_btn_imprimir").hide();
        $("#btn_ver_escaneado").hide();
        $("#Turno_btn_eliminarturno").hide();

        TurnoId = $(this).data("turno");
        if (TurnoId == null) { return; }

        if (TurnoId == 0 && obj_Paciente.PacienteId == null) {
            IrACargaPaciente();
            ActualizarMensaje("Falta Paciente", "Falta cargar los datos del paciente.");
            return;
        }

        if (TurnoId == 0) {
            $("#Turno_btn_copiar").hide();
            $("#btn_guardar_comentario").hide();
        }
        else {
            $("#Turno_btn_copiar").show();
            $("#btn_guardar_comentario").show();
        }

        $("#span_paciente").html("");


        Motivo = $(this).data("motivo");
        Dia_Turno = $(this).data("dia");



        d_dia = Dia_Turno.substring(0, 2);
        d_mes = Dia_Turno.substring(3, 5);
        d_anio = Dia_Turno.substring(6, 10);

        var arr = Dia_Turno.split("/");
        d_dia = arr[0];
        d_mes = arr[1];
        d_anio = arr[2];

        //$("#txt_turno_forzado_fecha").val(d_anio + "-" + pad_with_zeroes(d_mes, 2) + "-" + pad_with_zeroes(d_dia, 2));
        $("#txt_turno_forzado_fecha").val(pad_with_zeroes(d_dia, 2) + "/" + pad_with_zeroes(d_mes, 2) + "/" + d_anio);

        Hora_Turno = $(this).text().substring(0, 5);
        $("#txt_turno_forzado_hora").val(Hora_Turno);

        if ($(this).hasClass("libre")) {
            //alert($(this).text().substring(0, 5));
            $("#Turno_Titulo").html("Nuevo Turno");
            LimpiarDatos();
            $("#Turno_Div").show();
            $("#span_paciente").html($("#span_Paciente").html());
        }
        else {

            if (TurnoId == "0") {
                HoraTurno = $(this).text().substring(0, 5);
                if ($(this).hasClass("cancelado")) {
                    $("#Mensaje_btn_turno_forzado").show();
                    $("#Mensaje_btn_Aceptar").show();
                    ActualizarMensaje("Turno No Disponible", "Se quiere dar un turno para el día " + Dia_Turno + " a las " + Hora_Turno + "hs, este turno no está disponible por el motivo: '" + Motivo + "'.<br/> Sin embargo puede dar el turno utilizando la opción de turno forzado.");
                }
            }
            else {
                CargarTurnoxId(TurnoId);
            }

        }
    });

    function CargarTurnoxId(Turno_Id) {
        //Cargar turnos...

        var json = JSON.stringify({
            "TurnoId": Turno_Id
        });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Imagenes/Imagenes.asmx/IMG_Turno_Info",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                LimpiarDatos();
                var dato = Resultado.d;
                //$.each(dato, function (index, info) {       

                var arr = (dato.IMG_TURNO_FECHA).split("/");
                d_dia = arr[0];
                d_mes = arr[1];
                d_anio = arr[2];

                $("#txt_turno_forzado_fecha").val(pad_with_zeroes(d_dia, 2) + "/" + pad_with_zeroes(d_mes, 2) + "/" + d_anio);

                $("#txt_turno_forzado_hora").val(dato.IMG_TURNO_HORA_INICIO);
                $("#span_paciente").html(dato.Paciente);
                obj_Paciente.PacienteId = dato.IMG_TURNO_PACIENTE_ID;

                $("#span_turno_forzado_especialidad").html(dato.Especialidad);
                $("#span_turno_forzado_medico").html(dato.Medico);
                $("#txt_duracion").val(dato.IMG_TURNO_MINUTOS);
                $("#cbo_medico_derivante").val(dato.MEDICODERIVANTE_ID);

                $("#txt_hora_visible").val(dato.IMG_TURNO_HORAVISIBLE);

                if (dato.IMG_TURNO_MINUTOSFIJOS) { $('#ck_manual').prop('checked', true); }
                if (dato.IMG_TURNO_SOBRETURNO) { $('#ck_sobreturno').prop('checked', true); }
                if (dato.IMG_TURNO_FORZADO) { $('#ck_turnoforzado').prop('checked', true); }
                if (dato.IMG_TURNO_X_EMAIL) { $('#ck_turnoxemail').prop('checked', true); }
                if (dato.IMG_TURNO_URG) { $('#ck_urgencia').prop('checked', true); }
                $("#txt_comentario").val(dato.IMG_TURNO_COMENTARIO);
                $("#cb_tipo").val(dato.IMG_TURNO_TIPO);


                if (Recepcionando) {
                    Cargar_Medicos_por_Especialidad(dato.IMG_TURNO_ESPECIALIDAD, 'A');
                    //console.log("Cargando especialidad...");
                    $("#cbo_especialidad").val(dato.IMG_TURNO_ESPECIALIDAD).delay(1000).queue(function () {

                        $("#cbo_medico").val(dato.IMG_TURNO_MEDICO);
                        //console.log("Medico Cargado...");
                        $("#cbo_medico").change();
                        $(this).dequeue();

                    });

                }

                if (dato.IMG_TURNO_ESTADO == -1) {
                    $("#btn_rechazar_turno").hide();
                    $("#span_motivo_cancelacion").html("CANCELADO: " + dato.MOTIVO_CANCELACION);
                    $("#SPAN_MOTIVORECHAZADO_INFO").html("CANCELADO: " + dato.MOTIVO_CANCELACION);                    
                }
                else {
                    $("#btn_rechazar_turno").show();
                    $("#SPAN_MOTIVORECHAZADO_INFO").html("");                    
                    $("#span_motivo_cancelacion").html("");
                }

                if (dato.IMG_RECITAR) {
                    $("#SPAN_MOTIVORECHAZADO_INFO").html($("#SPAN_MOTIVORECHAZADO_INFO").html() + " // * RECITAR * ");
                    $("#span_motivo_cancelacion").html($("#span_motivo_cancelacion").html() + " // * RECITAR * ");                    
                }



                if(dato.COMENTARIO_MEDICO != null && dato.COMENTARIO_MEDICO != "")
                    {                        
                        $("#span_comentario_medico").html("<b>Comentario. Méd: </b>" + dato.COMENTARIO_MEDICO);
                    }
                    else{
                        $("#span_comentario_medico").html("");
                    }
                
                

                if (dato.IMG_TURNO_ESTADO <= -1) { $("#Turno_btn_aceptar").hide(); $("#Turno_btn_eliminarturno").hide(); $("#Turno_btn_copiar").hide(); $("#Turno_btn_escanear").hide(); $("#Turno_btn_imprimir").hide(); }
                if (dato.IMG_TURNO_ESTADO >= 2 || dato.IMG_TURNO_ESTADO <= -1) { $("#Turno_btn_aceptar").hide(); $("#Turno_btn_eliminarturno").hide(); }
                else { $("#Turno_btn_aceptar").show(); }

                if ($("#cb_tipo").val() == 3) { $("#Turno_btn_eliminarturno").show(); }

                CargarPracticasdeTurno();
                CargarPacienteID(obj_Paciente.PacienteId);
                //});
            },
            error: errores
        });


        $("#btn_ver_escaneado").show();
        $("#Turno_btn_escanear").show();
        $("#Turno_btn_imprimir").show();        
        $("#Turno_btn_eliminarturno").show();
        $("#Turno_Titulo").html("Edición de Turno");
        $("#Turno_Div").show();
    }


    $("#tabla_turnos_semana").on("click", "span", function () {

        if ($("#span_Paciente").html() != "" && !$(this).hasClass("libre")) {
            if (confirm('Tiene un paciente cargado, ¿desea dejar de usar ese paciente?')) {
                // Save it!
            } else {
                return;
            }
        }

        if (Recepcionando || copiando) {
            Dia_Turno = $(this).data("dia");

            d_dia = Dia_Turno.substring(0, 2);
            d_mes = Dia_Turno.substring(3, 5);
            d_anio = Dia_Turno.substring(6, 10);

            var arr = Dia_Turno.split("/");
            d_dia = arr[0];
            d_mes = arr[1];
            d_anio = arr[2];

            $("#txt_turno_forzado_fecha").val(pad_with_zeroes(d_dia, 2) + "/" + pad_with_zeroes(d_mes, 2) + "/" + d_anio);
            Hora_Turno = $(this).text().substring(0, 5);
            $("#txt_turno_forzado_hora").val(Hora_Turno);
            $("#Turno_Div").show();
            return;
        }

        $("#btn_ver_grilla").hide();

        $("#Turno_btn_escanear").hide();
        $("#Turno_btn_imprimir").hide();
        $("#btn_ver_escaneado").hide();
        $("#Turno_btn_eliminarturno").hide();
        $("#span_paciente").html("");

        TurnoId = $(this).data("turno");

        if (TurnoId == 0) {
            if (obj_Paciente.PacienteId == null) {
                IrACargaPaciente();
                ActualizarMensaje("Falta Paciente", "Falta cargar los datos del paciente.");
                return;
            }
        }

        if (TurnoId == 0) {
            $("#Turno_btn_copiar").hide();
            $("#btn_guardar_comentario").hide();
        }
        else {
            $("#Turno_btn_copiar").show();
            $("#btn_guardar_comentario").show();
        }

        TurnoId = $(this).data("turno");
        Motivo = $(this).data("motivo");
        Dia_Turno = $(this).data("dia");

        //d_dia = Dia_Turno.substring(0, 2);
        //d_mes = Dia_Turno.substring(3, 5);
        //d_anio = Dia_Turno.substring(6, 10);



        var arr = Dia_Turno.split("/");
        d_dia = arr[0];
        d_mes = arr[1];
        d_anio = arr[2];



        $("#txt_turno_forzado_fecha").val(pad_with_zeroes(d_dia, 2) + "/" + pad_with_zeroes(d_mes, 2) + "/" + d_anio);
        Hora_Turno = $(this).text().substring(0, 5);
        $("#txt_turno_forzado_hora").val(Hora_Turno);

        if ($(this).hasClass("libre")) {
            $("#Turno_Titulo").html("Nuevo Turno");
            LimpiarDatos();
            $("#Turno_Div").show();
            $("#span_paciente").html($("#span_Paciente").html());
        }
        else {

            if (TurnoId == "0") {
                HoraTurno = $(this).text().substring(0, 5);
                if ($(this).hasClass("cancelado")) {
                    $("#Mensaje_btn_turno_forzado").show();
                    $("#Mensaje_btn_Aceptar").show();
                    ActualizarMensaje("Turno No Disponible", "Se quiere dar un turno para el día " + Dia_Turno + " a las " + Hora_Turno + "hs, este turno no está disponible por el motivo: '" + Motivo + "'.<br/> Sin embargo puede dar el turno utilizando la opción de turno forzado.");
                }
            }
            else {
                CargarTurnoxId(TurnoId);
            }

        }
    });







    function ActualizarMensaje(Titulo, Mensaje) {        
        $("#Mensaje_Titulo").html(Titulo);
        $("#Mensaje_Mensaje").html(Mensaje);
        $("#Mensaje_Div").show();
    }

    $("#Mensaje_btn_Aceptar").click(function () { $("#Mensaje_Div").hide(); });
    $("#Turno_btn_cancelar").click(function () { copiando = false; $("#Turno_Div").hide(); $("#btn_salvar_bono_guardar").hide(); $("#btn_proximoturno").html("1er Turno"); });

    $("#Mensaje_btn_turno_forzado").click(function () {              
        $("#Mensaje_Div").hide();
        $("#Turno_Titulo").html("Turno Forzado");
        $('#ck_turnoforzado').prop('checked', true);
        $("#Turno_Div").show();
    });

    function IrACargaPaciente() {
        $("#Turno_Div").hide();
        $("#DatoTurno").fadeOut(100);
        $(".container").fadeIn(200);
    }

    var EsTurnoForzado = false;
    $("#btn_turno_forzado").click(function () {
        EsTurnoForzado = true;
        Recepcionando = false;

        if($("#cbo_especialidad").val()=="0"){ ActualizarMensaje("Falta Especialidad", "Falta seleccionar la especialidad."); return; }
        if($("#cbo_medico").val()=="0"){ ActualizarMensaje("Falta Médico", "Falta seleccionar el médico."); return; }

        $("#Turno_btn_copiar").hide();
        $("#Turno_btn_aceptar").show();
        $("#Turno_btn_escanear").hide();
        $("#Turno_btn_imprimir").hide();
        $("#btn_ver_escaneado").hide();
        $("#Turno_btn_eliminarturno").hide();
        if (TurnoId == 0 && obj_Paciente.PacienteId == null) {
            IrACargaPaciente();
            ActualizarMensaje("Falta Paciente", "Falta cargar los datos del paciente.");
            return;
        }

        $("#span_paciente").html("");
        $("#txt_turno_forzado_fecha").val("");
        $("#txt_turno_forzado_hora").val("");
        LimpiarDatos();
        $("#Turno_Titulo").html("Turno Forzado");
        $("#txt_turno_forzado_fecha").val($("#txt_fecha_almanaque").val());
        //$("#txt_turno_forzado_hora").val(HoraActual(""));
        CargarHoraLibre();
        $("#txt_duracion").val("1");
        $("#txt_comentario").val("");
        $('#ck_manual').prop('checked', true);
        $('#ck_turnoforzado').prop('checked', true);

        $("#Turno_Div").show();
    });












    $("#btn_turno_1er").click(function () {
        EsTurnoForzado = false;
        Recepcionando = false;

        if($("#cbo_especialidad").val()=="0"){ ActualizarMensaje("Falta Especialidad", "Falta seleccionar la especialidad."); return; }
        if($("#cbo_medico").val()=="0"){ ActualizarMensaje("Falta Médico", "Falta seleccionar el médico."); return; }

        $("#Turno_btn_copiar").hide();
        $("#Turno_btn_aceptar").show();
        $("#Turno_btn_escanear").hide();
        $("#Turno_btn_imprimir").hide();
        $("#btn_ver_escaneado").hide();
        $("#Turno_btn_eliminarturno").hide();
        if (TurnoId == 0 && obj_Paciente.PacienteId == null) {
            IrACargaPaciente();
            ActualizarMensaje("Falta Paciente", "Falta cargar los datos del paciente.");
            return;
        }

        $("#span_paciente").html("");
        $("#txt_turno_forzado_fecha").val("");
        $("#txt_turno_forzado_hora").val("");
        LimpiarDatos();
        $("#Turno_Titulo").html("1er Turno Disponible");
        $("#txt_turno_forzado_fecha").val($("#txt_fecha_almanaque").val());        
        CargarHoraLibre();
        $("#txt_duracion").val("");
        $("#txt_comentario").val("");
        $('#ck_manual').prop('checked', false);
        $('#ck_turnoforzado').prop('checked', false);

        $("#Turno_Div").show();
    });





    function Imprimir() {        
        return;   
            $.fancybox({
                'hideOnContentClick': true,
                'width': '85%',
                'href': "../Imagenes_Turno/EdicionTurno.aspx?TurnoId=" + TurnoId,
                'height': '85%',
                'autoScale': false,
                'transitionIn': 'none',
                'transitionOut': 'none',
                'type': 'iframe'                
            });
    }


    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            //$("#Turno_Div").hide();
            $("#Mensaje_Div").hide(); 
        }
    });

    var Array_Turno_Practicas  = new Array();
    
    

    var Objeto_Turno = {}
    Objeto_Turno.MedicoId = 0;
    Objeto_Turno.EspecialidadId = 0;
    Objeto_Turno.Fecha = 0;
    Objeto_Turno.Hora = 0;
    Objeto_Turno.TurnoId = 0;

    function AgregarPracticaaLista(Practica_Id, Practica_Nombre, Practica_Duracion) {
        //Verifico si está o no la práctica...
        var encontrada = false;        
//        $.each(Array_Turno_Practicas, function (i) {
//            if (Array_Turno_Practicas[i].Eliminado == 0 && Array_Turno_Practicas[i].PracticaId == Practica_Id) {                
//                encontrada = true;
//            }
//        });

        if (!encontrada) {
            var Objeto_Turno_Practicas = {};
            $("#txt_practica_id").val("");
            $("#cbo_practica_nombre").val("0");
            Objeto_Turno_Practicas.PracticaId = Practica_Id;
            Objeto_Turno_Practicas.PracticaNombre = Practica_Nombre;
            Objeto_Turno_Practicas.PracticaDuracion = Practica_Duracion;
            Objeto_Turno_Practicas.Eliminado = 0;
            Array_Turno_Practicas.push(Objeto_Turno_Practicas);
            RenderizarPracticasSeleccionadas();
        }
        else {
            ActualizarMensaje("Práctica ya cargado","La práctica ya que encuentra en la lista de prácticas a realizar.");
        }
    }

    function RenderizarPracticasSeleccionadas() {
        $("#tabla_turno_practicas").html("");
        //320003
        var SumaDuracion = 0;
        $.each(Array_Turno_Practicas, function (i) {
            if (Array_Turno_Practicas[i].Eliminado == 0) {
                $('#tabla_turno_practicas').append('<tr><td><a class="Links" onclick="QuitarPracticadeLista(' + Array_Turno_Practicas[i].PracticaId + ');">Quitar<a/></td><td>' + Array_Turno_Practicas[i].PracticaId + '</td><td>' + Array_Turno_Practicas[i].PracticaNombre + '</td><td>' + Array_Turno_Practicas[i].PracticaDuracion + '</td></tr>');
                SumaDuracion = SumaDuracion + Array_Turno_Practicas[i].PracticaDuracion
            }
        });
        if ($('#ck_manual').is(':checked') == false) {        
            $("#txt_duracion").val(SumaDuracion);
        }
    }

    function QuitarPracticadeLista(Practica_Id) {
        var yaseelimino = false;
        $.each(Array_Turno_Practicas, function (i) {            
            if (!yaseelimino) {
                if (Array_Turno_Practicas[i].PracticaId == Practica_Id && Array_Turno_Practicas[i].Eliminado == 0) {
                    Array_Turno_Practicas[i].Eliminado = 1;
                    yaseelimino = true;
                }
            }
        });
        RenderizarPracticasSeleccionadas();
    }


    function BuscarNombrePractica(Practica_Id) {
        var encontrado = false;
        var nombre = "";
        var duracion = 0;
        var objeto_practica_detalle = {};        
        $.each(Array_Practicas, function (i) {
            if (Array_Practicas[i].Practica_Id == Practica_Id) {
                encontrado = true;
                $('#cbo_practica_nombre').val(Practica_Id);
                nombre = Array_Practicas[i].Practica_Nombre;
                objeto_practica_detalle.nombre = Array_Practicas[i].Practica_Nombre;
                objeto_practica_detalle.duracion = Array_Practicas[i].PracticaDuracion;
            }
        });
        if (!encontrado) { ActualizarMensaje("Práctica No Encontrada", "No se ha encontrado la práctica con el código " + Practica_Id + ", verifique esa práctica y si corresponde a la especialidad seleccionada."); }
        //return nombre;
        return objeto_practica_detalle;
    }


    
    function CargarListaDeEspecialidades() {
        var json = JSON.stringify({ "PracticaId": 0, "EspecialidadId": 0 });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/Imagenes_Especialidades",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Especialidades_Listadas,
            error: errores
        });
    }

    function Especialidades_Listadas(Resultado) {
        var lista = Resultado.d;
        $('#cbo_especialidad').append($('<option>', { value: 0, text: "Seleccione Especialidad" }));            
        $.each(lista, function (index, dato) {
            $('#cbo_especialidad').append($('<option>', { value: dato.Id, text: dato.Especialidad }));            
        });
    }

    $("#cbo_especialidad").change(function () {

        $("#tbody_turnos_dia").empty();
        $('#div_domingo').empty();
        $('#div_lunes').empty();
        $('#div_martes').empty();
        $('#div_miercoles').empty();
        $('#div_jueves').empty();
        $('#div_viernes').empty();
        $('#div_sabado').empty();


        if ($("#cbo_especialidad").val() != "0") {
            $("#span_turno_forzado_especialidad").html($("#cbo_especialidad :selected").text());
            Cargar_Medicos_por_Especialidad($("#cbo_especialidad :selected").val(), "A");            
        }
        else {
            $("#span_turno_forzado_especialidad").html("");
            $('#cbo_medico').empty();
        }
    });


    function cCargarListaDePracticas(EspecialidadId, MedicoId) {
        var json = JSON.stringify({ "PracticaId": 0, "EspecialidadId": EspecialidadId });
        $.ajax({
            type: "POST",
            url: "../Json/Practicas/Practicas.asmx/H2_IMAGENES_PRACTICAS_LISTAR",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Practicas_Listadas,
            error: errores
        });
    }

    function CargarListaDePracticas(EspecialidadId, MedicoId) {
        var json = JSON.stringify({ "EspecialidadId": EspecialidadId, "MedicoId": MedicoId });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDAD_ACTIVAS",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Practicas_Listadas,
            error: errores
        });
    }
    


    var Array_Practicas = Array()
    function Practicas_Listadas(Resultado) {
        Array_Practicas = [];        
        $("#cbo_practica_nombre").empty();
        var lista = Resultado.d;
        $('#cbo_practica_nombre').append($('<option>', { value: 0, text: "" }));
        $.each(lista, function (index, dato) {
                var Objeto_Practicas = {}
                Objeto_Practicas.Practica_Nombre = dato.PracticaDetalle;
                Objeto_Practicas.Practica_Id = dato.PracticaId;
                Objeto_Practicas.PracticaDuracion = dato.PracticaDuracion;
                $('#cbo_practica_nombre').append($('<option>', { value: dato.PracticaId, text: dato.PracticaDetalle }));
                Array_Practicas.push(Objeto_Practicas);
        });
    }


    //CargarListaDePracticas();

 

    $('#txt_practica_id').keyup(function (e) {
        if (e.keyCode === 13) {
            AgregarLaPractica();
        }
    });

    function AgregarLaPractica() {
        $("#txt_practica_id").blur();
        var objeto = BuscarNombrePractica($('#txt_practica_id').val());        

        if (objeto.nombre != "" && objeto.nombre != null) {
            AgregarPracticaaLista($('#txt_practica_id').val(), objeto.nombre, objeto.duracion);
        }
    }

    $("#cbo_practica_nombre").change(function () {
        $('#txt_practica_id').val($(this).val());
        if ($('#txt_practica_id').val() != "0") {
            AgregarLaPractica();
        }
    });

    CargarListaDeEspecialidades();


    function Cargar_Medicos_por_Especialidad(Especialidad, Tipo) {
        var json = JSON.stringify({ "Especialidad": $("#cbo_especialidad").val(), "Tipo": "A", "TLC": 0 });
        $.ajax({
            type: "POST",    
            url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivosTipo",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Medicos_por_Especialidad_Cargados,
            error: errores
        });

    }


    function Medicos_por_Especialidad_Cargados(Resultado) {
        var Medicos = Resultado.d;
        $('#cbo_medico').empty();
        $('#cbo_medico').append('<option value="0">Medicos</option>');
        $.each(Medicos, function (index, medicos) {            
                $('#cbo_medico').append($('<option></option>').val(medicos.Id).html(medicos.Medico));
            });        
    }



    $("#cbo_medico").change(function () {
        ActualizarListadoPacientes();
        CargarListaDePracticas($("#cbo_especialidad :selected").val(), $("#cbo_medico :selected").val());
    });

    function ActualizarListadoPacientes() {

        

        if ($("#cbo_especialidad").val() == "0" || $("#cbo_medico").val() == "0") {
            ActualizarMensaje("Revise los datos", "No se pueden mostrar la grilla de turnos, seleccione una especialidad y/o un médico.");
            return;
        }

        if ($("#cbo_medico").val() != "0") {
            $("#span_turno_forzado_medico").html($("#cbo_medico :selected").text());

                

            CargarTurnos("tbody_turnos_dia", false, diasmostrar[7], $("#cbo_especialidad").val(), $("#cbo_medico").val());            

            CargarTurnos("div_domingo", true, diasmostrar[0], $("#cbo_especialidad").val(), $("#cbo_medico").val());


            CargarTurnos("div_lunes", true, diasmostrar[1], $("#cbo_especialidad").val(), $("#cbo_medico").val());

            CargarTurnos("div_martes", true, diasmostrar[2], $("#cbo_especialidad").val(), $("#cbo_medico").val());

            CargarTurnos("div_miercoles", true, diasmostrar[3], $("#cbo_especialidad").val(), $("#cbo_medico").val());

            CargarTurnos("div_jueves", true, diasmostrar[4], $("#cbo_especialidad").val(), $("#cbo_medico").val());

            CargarTurnos("div_viernes", true, diasmostrar[5], $("#cbo_especialidad").val(), $("#cbo_medico").val());

            CargarTurnos("div_sabado", true, diasmostrar[6], $("#cbo_especialidad").val(), $("#cbo_medico").val());

        }
        else {
            $("#span_turno_forzado_medico").html("");
        }
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } today = yyyy + '-' + mm + '-' + dd;

    
    function getMonday(date) {
        //date.setHours(-24 * (day - 0));
                    
        var day = (date.getDay()) || 7;
        if (day !== 7)
            date.setHours(-24 * (day - 0));
        
        return date;
    }

    var diasmostrar = new Array;
    $("#txt_fecha_almanaque").change(function () {
        ActualizarFechasYHoras();
        ActualizarListadoPacientes();
    });

    function pad_with_zeroes(number, length) {
        var my_string = '' + number;
        while (my_string.length < length) {
            my_string = '0' + my_string;
        }
        return my_string;
    }

    function ActualizarFechasYHoras() {
        diasmostrar = [];

        var arr = $("#txt_fecha_almanaque").val().split("/");
        d_dia = arr[0];
        d_mes = arr[1];
        d_anio = arr[2];
        var FSeleccionada = new Date(d_anio + "-" + d_mes + "-" + d_dia);

        var FAuxi = new Date(d_anio + "-" + d_mes + "-" + d_dia);
        FAuxi.setHours(24);
        
        var Fecha_Auxiliar = new Date(getMonday(FAuxi));

        $("#td_dom").html("<span class='Texto_Centrado' style='display:block; width:100%'>Dom. " + Fecha_Auxiliar.getDate() + "</span>");
        diasmostrar[0] = Fecha_Auxiliar.getDate() + "/" + pad_with_zeroes((Fecha_Auxiliar.getMonth() + 1),2) + "/" + Fecha_Auxiliar.getFullYear();       
        

        Fecha_Auxiliar.setDate(Fecha_Auxiliar.getDate() + 1);
        $("#td_lun").html("<span class='Texto_Centrado' style='display:block; width:100%'>Lun." + Fecha_Auxiliar.getDate() + "</span>");
        diasmostrar[1] = Fecha_Auxiliar.getDate() + "/" + (Fecha_Auxiliar.getMonth() + 1) + "/" + Fecha_Auxiliar.getFullYear();

        Fecha_Auxiliar.setDate(Fecha_Auxiliar.getDate() + 1);
        $("#td_mar").html("<span class='Texto_Centrado' style='display:block; width:100%'>Mar." + Fecha_Auxiliar.getDate() + "</span>");
        diasmostrar[2] = Fecha_Auxiliar.getDate() + "/" + (Fecha_Auxiliar.getMonth() + 1) + "/" + Fecha_Auxiliar.getFullYear();

        Fecha_Auxiliar.setDate(Fecha_Auxiliar.getDate() + 1);
        $("#td_mie").html("<span class='Texto_Centrado' style='display:block; width:100%'>Mié." + Fecha_Auxiliar.getDate() + "</span>");
        diasmostrar[3] = Fecha_Auxiliar.getDate() + "/" + (Fecha_Auxiliar.getMonth() + 1) + "/" + Fecha_Auxiliar.getFullYear();

        Fecha_Auxiliar.setDate(Fecha_Auxiliar.getDate() + 1);
        $("#td_jue").html("<span class='Texto_Centrado' style='display:block; width:100%'>Jue." + Fecha_Auxiliar.getDate() + "</span>");
        diasmostrar[4] = Fecha_Auxiliar.getDate() + "/" + (Fecha_Auxiliar.getMonth() + 1) + "/" + Fecha_Auxiliar.getFullYear();

        Fecha_Auxiliar.setDate(Fecha_Auxiliar.getDate() + 1);
        $("#td_vie").html("<span class='Texto_Centrado' style='display:block; width:100%'>Vie." + Fecha_Auxiliar.getDate() + "</span>");
        diasmostrar[5] = Fecha_Auxiliar.getDate() + "/" + (Fecha_Auxiliar.getMonth() + 1) + "/" + Fecha_Auxiliar.getFullYear();

        Fecha_Auxiliar.setDate(Fecha_Auxiliar.getDate() + 1);
        $("#td_sab").html("<span class='Texto_Centrado' style='display:block; width:100%'>Sáb." + Fecha_Auxiliar.getDate() + "</span>");
        diasmostrar[6] = Fecha_Auxiliar.getDate() + "/" + pad_with_zeroes((Fecha_Auxiliar.getMonth() + 1),2) + "/" + Fecha_Auxiliar.getFullYear();

        $("#span_rango_fecha").html(diasmostrar[0] + " al " + diasmostrar[6]);
        
        var factual_mostrar = new Date(d_anio + "-" + d_mes + "-" + d_dia);
        factual_mostrar.setHours(24);
        diasmostrar[7] = factual_mostrar.getDate() + "/" + (factual_mostrar.getMonth()+1) + "/" + factual_mostrar.getFullYear();
    }

    $('#txt_fecha_almanaque').val(FechaActual());    
    ActualizarFechasYHoras();


    $("#Turno_btn_aceptar").click(function () {
        DarTurno();
    });

    var obj_Paciente = {};


    function DarTurno() {

        var Tiene = false;
        $.each(Array_Turno_Practicas, function (i) {
            if (Array_Turno_Practicas[i].Eliminado == 0) {
                Tiene = true;
            }
        });

        if (!Tiene) {
            ActualizarMensaje("Falta Cargar Práctica", "Falta cargar alguna práctica a realizar.");
            return;
        }

        var PacienteLargo = $('#span_Paciente').text().length;

        if (!Recepcionando) {
            if (TurnoId == 0) {
                if (obj_Paciente.PacienteId == null || PacienteLargo == 0) {
                    IrACargaPaciente();
                    ActualizarMensaje("Falta Paciente", "Falta cargar los datos del paciente.");
                    return;
                }
            }
        }


        if (EsTurnoForzado) {
            TurnoId = 0;
        }

        var MinutosFijos = false;
        var SobreTurno = false;
        var TurnoForzado = false;
        var Urgencia = false;


        if ($("#ck_urgencia").is(':checked'))
            Urgencia = true;
        else
            Urgencia = false;


        if ($("#ck_manual").is(':checked'))
            MinutosFijos = true;
        else
            MinutosFijos = false;


        if ($("#ck_sobreturno").is(':checked'))
            SobreTurno = true;
        else
            SobreTurno = false;


        if ($("#ck_turnoforzado").is(':checked'))
            TurnoForzado = true;
        else
            TurnoForzado = false;

        if ($("#ck_turnoxemail").is(':checked'))
            TurnoXEmail = true;
        else
            TurnoXEmail = false;

        var t_MedicoId = $('#cbo_medico').val();
        var t_EspecialidadId = $('#cbo_especialidad').val();

        if (t_MedicoId == null) t_MedicoId = 0;
        if (t_EspecialidadId == null) t_EspecialidadId = 0;

        var json = JSON.stringify({

        "Fecha": $('#txt_turno_forzado_fecha').val(),
        "Hora": $('#txt_turno_forzado_hora').val(),
        "Minutos": $('#txt_duracion').val(),
        "EspecialidadId": t_EspecialidadId,
        "MedicoId": t_MedicoId,
        "PacienteId": obj_Paciente.PacienteId,
        "SobreTurno": SobreTurno,
        "TurnoForzado": TurnoForzado,
        "MinutosFijos": MinutosFijos,
        "TurnoId": TurnoId,
        "TurnoXEmail": TurnoXEmail,
        "Urgencia": Urgencia,
        "Tipo": $('#cb_tipo :selected').val(),
        "HoraVisible": $('#txt_hora_visible').val(),
        "Comentario": $("#txt_comentario").val(),
        "MedicoDerivante": $("#cbo_medico_derivante").val(),
    });

    
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_DarTurno",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: TurnoDado,
            error: errores
        });

    }


    function TurnoDado(Resultado) {

        TurnoId = Resultado.d;
        if (TurnoId != 0 && TurnoId != null) {
            var json = JSON.stringify({
                "TurnoId": TurnoId,
                "Practicas": Array_Turno_Practicas                
            });

            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_ActualizarPracticas",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    //Aca voy a imprimir...                                        

                    if (copiando) {
                        MoverImg(TurnoaBorrar, TurnoId);                        
                        if (MotivoSalvarBono == "") {
                            ElimarTurno(TurnoaBorrar);
                        }
                        else {
                            CambiarEstado(TurnoaBorrar, -1, true);
                            IMG_LIBERAR_BONO(TurnoaBorrar, TurnoId);
                        }
                    }

                    $("#btn_salvar_bono_guardar").hide();
                    copiando = false;

                    if (!Recepcionando || MotivoSalvarBono != "") {
                        MotivoSalvarBono = "";
                        $("#btn_salvar_bono").hide();
                        $("#btn_salvar_bono_guardar").hide();

                        LimpiarDatos();
                        ActualizarListadoPacientes();
                        $("#Turno_btn_cancelar").click();
                        EsTurnoForzado = false;
                        OpcionesPostTurno();

                    }
                    else {
                        document.location = "Turno.aspx";
                    }
                },
                error: errores
            });
        }
        else {
            ActualizarMensaje("Error","No se ha podido guardar el turno");
        }     
    }




    function IMG_LIBERAR_BONO(Turno_Id, TurnoNuevo) {

        var json = JSON.stringify({
            "TurnoID": Turno_Id,
            "Motivo": MotivoSalvarBono,
            "TurnoNuevoId": TurnoNuevo
        });


        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_LIBERAR_BONO",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {                
                RenderizarPracticasSeleccionadas();                                
            },
            error: errores
        });
    }





    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        ActualizarMensaje("Error",jsonObj.Message);
    }


    function CargarPracticasdeTurno() {

        var json = JSON.stringify({
            "TurnoId": TurnoId            
        });


        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/H2_IMG_Practicas_Detalle_Cargar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                Array_Turno_Practicas = [];
                var Datos = Resultado.d;
                $("#txt_practica_id").val("");
                $("#cbo_practica_nombre").val("0");
                $.each(Datos, function (index, dato) {
                    var Objeto_Turno_Practicas = {};
                    Objeto_Turno_Practicas.PracticaId = dato.PracticaCodigo;
                    Objeto_Turno_Practicas.PracticaNombre = dato.PracticaNombre;
                    Objeto_Turno_Practicas.PracticaDuracion = dato.PracticaDuracion;
                    Objeto_Turno_Practicas.Eliminado = 0;
                    Array_Turno_Practicas.push(Objeto_Turno_Practicas);                    
                });
                RenderizarPracticasSeleccionadas();
            },
            error: errores
        });

        

     
    }


    function ValidarHora(str) {
        hora = str.value;
        if (hora == '') {
            return;
        }
        if (hora.length > 5) {
            ActualizarMensaje("Error en la Hora", "Introdujo una cadena mayor a 5 caracteres");
            return;
        }
        if (hora.length != 5) {
            ActualizarMensaje("Error en la Hora", "Introducir HH:MM");
            return;
        }
        a = hora.charAt(0); //<=2 
        b = hora.charAt(1); //<4 
        c = hora.charAt(2); //: 
        d = hora.charAt(3); //<=5 
        //e = hora.charAt(5); //: 
        //f = hora.charAt(6); //<=5 
        if ((a == 2 && b > 3) || (a > 2)) {
            ActualizarMensaje("Error en la Hora", "El valor que introdujo en la Hora no corresponde, introduzca un digito entre 00 y 23");
            return;
        }
        if (d > 5) {
            ActualizarMensaje("Error en la Hora", "El valor que introdujo en los minutos no corresponde, introduzca un digito entre 00 y 59");
            return;
        }
        //if (f > 5) {
        //    alert("El valor que introdujo en los segundos no corresponde");
        //    return;
        //}
        if (c != ':'){ //|| e != ':') {
            ActualizarMensaje("Error en la Hora", "Introduzca el caracter ':' para separar la hora, los minutos y los segundos");
            return;
        }
    }




    //DATOS DEL PACIENTE!!!!!

      function CargarPacientexDNI() {
          var json = JSON.stringify({ "Documento": $("#txtdocumento").val(), "T_Doc": $('#cbo_tipo :selected').val() });
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Paciente_Cargado,
            error: errores
        });
    }

    function Cargar_Paciente_NHC() {
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
            data: '{NHC: "' + $("#txt_NHC").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Paciente_Cargado,
            error: errores
        });
    }

    function CargarPacienteID(ID) {
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/CargarPacienteID",
            data: '{ID: "' + ID + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Paciente_Cargado,
            error: errores
        });
    }

    function RecargarPagina(url) {
        $.fancybox.close();
        CargarPacienteID(url.split("=")[1]);
    }

    function CargarPacienteID(ID) {
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/CargarPacienteID",
            data: '{ID: "' + ID + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Paciente_Cargado,
            error: errores
        });
    }


    function VerificarPMI(PacienteID) {
        $.ajax({
            type: "POST",
            url: "../Json/Gente/ActualizarGente.asmx/VerificarPMI",
            data: '{PacienteId: "' + PacienteID + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#verificarPMI").val(Resultado.d);
            },
            error: errores
        });
    }




    function UltimoAporte_OK() {
        //if (Ultimo_OK == 1) { return false; }
        var json = JSON.stringify({ "Documento": obj_Paciente.dni });
        $.ajax({
            type: "POST",
            url: "../Json/Gente.asmx/UltimoAporte_OK",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                //Ultimo_OK = 1;
                var ok = Resultado.d;
                if (!ok) {
                    ActualizarMensaje("Error en el aporte", "No se registran aportes en los últimos 3 meses. Regularizar situación en AFILIACIONES.");
                    $("#IconoVencido").attr("src", "../img/Icono_ERROR.gif")

                    $("#IconoVencido").attr("data-original-title", "Problemas Aportes 3 meses");

                    if ($("[rel=tooltip]").length) {
                        $("[rel=tooltip]").tooltip();
                    }
                }
                else {
                    $("#IconoVencido").attr("src", "../img/Icono_OK.gif");
                    $("#IconoVencido").attr("title", "Afiliado Verificado");
                }
                $("#SpanCargando").show();
            }
        });
    }



    var Afiliado_Id = 0;

    var ObservacionesPaciente = "";
    function Paciente_Cargado(Resultado) {
        var Paciente = Resultado.d;
        var PError = false;
        ObservacionesPaciente = "";

        if (Paciente.length == 0) {
            $("#SpanCargando").hide();
            ActualizarMensaje("Paciente no encontrado", "No se ha encontrado el paciente.");
            return;
        }

        $("#btn_turno_forzado").show();
        $("#btn_turno_1er").show();        

        

        if (Paciente.length == 1) {
            $.each(Paciente, function (index, paciente) {
                if (paciente.Vencido) {
                    ActualizarMensaje("Baja", "Paciente dado de baja el día: " + paciente.FechaVencido);
                    return;
                }

                $("#txtdocumento").prop("readonly", true);
                $("#txt_NHC").prop("readonly", true);

                $("#txt_Email").prop("disabled", false);
                $("#txt_telefono").prop("disabled", false);
                $("#txt_celular").prop("disabled", false);
                $("#cbo_seccional").prop("disabled", false);


                $("#cbo_tipo").val(paciente.TipoDoc);
                $("#txt_NHC").attr('value', paciente.NHC_UOM);
                $("#txtdocumento").val(paciente.documento_real);

                $("#txtPaciente").val(paciente.Paciente);
                $("#span_Paciente").html(paciente.Paciente);

                //var AnioActual = new Date();
                //var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

                $("#span_Edad").html("<b>( " + paciente.Edad_Format + ")</b>");
                $("#span_DNI").html(paciente.documento_real);
                $("#span_NHC").html(" NHC:<b>" + paciente.NHC_UOM + "</b>");
                $("#span_Telefono").html(paciente.Telefono);
                Afiliado_Id = paciente.documento;
                $("#afiliadoId").val(paciente.documento);
                obj_Paciente.PacienteId = paciente.documento;
                obj_Paciente.dni = paciente.documento_real;

                //$('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);
                //alert(paciente.Foto);
				$('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
                     

                $("#span_Seccional").html(paciente.Seccional);
                //$("#Cod_OS").val(paciente.OSId);
                if (paciente.Nro_Seccional == 998) {
                    //$("#cbo_ObraSocial").show();
                    //$("#cboSeccional").hide();
                    $("#span_TituloSeccional").html("Ob. Social: ");
                    $("#span_Seccional").html(paciente.ObraSocial);
                }

                $("#cbo_seccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

                if (paciente.Observaciones != null && paciente.Observaciones != "") {
                    ObservacionesPaciente = paciente.Observaciones;
                    ActualizarMensaje("Comentario", paciente.Observaciones);
                    Cargar_Paciente_Info(false);
                }
                else {
                    Cargar_Paciente_Info(true);
                }

                //VerificarPMI(paciente.documento);


                //Verifico si esta en el padron 10.0.0.1
                $("#SpanCargando").show();
                $("#btnVencimiento").hide();
                //EstaVendico($("#txt_dni").val());

                UltimoAporte_OK();
                $("#btnActualizarDatos").show();

                


            });
        }
        else if (Paciente.length > 1 && $("#afiliadoId").val().length == 0) {
            ActualizarMensaje("El Paciente está duplicado","El paciente está duplicado comuníquese con el sector encargado de Turnos.");
            return;
            //$("#txtdocumento").val($("#txt_dni").val());
            //BuscarPacientes_fancy();
            //$("#txtPaciente").focus();
        }
    }



    function ListTipoDoc() {
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/ListTipoDoc",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $.each(lista, function (index, Tipo) {
                    $('#cbo_tipo').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
                });

            },
            error: errores
        });
    }

    function Cargar_Seccionales_Lista() {
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/Seccionales_Listas",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Seccionales_Listas_Cargadas,
            error: errores
        });

    }

    function Seccionales_Listas_Cargadas(Resultado) {
        var Seccionales = Resultado.d;
        $('#cbo_seccional').empty();
        $.each(Seccionales, function (index, seccionales) {
            $('#cbo_seccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
        });
    }

    Cargar_Seccionales_Lista();
    ListTipoDoc();


    $("#txtdocumento").change(function () { CargarPacientexDNI(); $("#SpanCargando").show(); });
    $("#txt_NHC").change(function () { Cargar_Paciente_NHC(); $("#SpanCargando").show(); });

    function imgErrorPaciente(image) {
        image.onerror = "";
        image.src = "../img/silueta.jpg";
        return true;
    }


    $("#btnBuscarPaciente").click(function () {
        BuscarPacientes_fancy();
    });

    function BuscarPacientes_fancy() {
        $.fancybox({
            'hideOnContentClick': true,
            'width': '85%',
            'href': "../Turnos/BuscarPacientes.aspx?Express=0",
            'height': '85%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe'
        });
    }

    $("#btnSiguiente").click(function () {

        //var apellido = $("#txtPaciente").val().indexOf(",");

        //if ($("#txtPaciente").val() != "") {
            //var apellido = $("#txtPaciente").val().indexOf(",");            
            //if (apellido < 0) {
            //    ActualizarMensaje("FALTA SEPARAR APELLIDO", "Falta separar el apellido del paciente, utilice una coma para separa el mismo, y luego pulse actualizar.");
            //    $("#btnSiguiente").hide();
            //    return;
            //}
        //}


        $(".container").fadeOut(100);
        $("#DatoTurno").fadeIn(200);
    });


    $("#btnActualizarDatos").click(function () {

    if (!PhoneValidate("btnSiguiente", "txt_telefono")) { return false } else {

        if ($("#txt_telefono").val() == "" ){                    
            ActualizarMensaje("¿Telefono?", "<b>El teléfono es obligatorio, actualicelo y pulse Actualizar. </b></br> " + ObservacionesPaciente);
            $("#btnSiguiente").hide();
            return;
        }
       // alert($("#txt_celular").val().trim().length);
        if($("#txt_celular").val().trim().length > 0){
        //alert();
        if (!PhoneValidate("btnSiguiente", "txt_celular")) { return false }
        }

      //  return false;

        var json = JSON.stringify({ "PacienteId": Afiliado_Id, "Email": $("#txt_Email").val(), "Telefono": $("#txt_telefono").val(), "Celular": $("#txt_celular").val(), "Seccional": $("#cbo_seccional").val(), "Apellido": $("#txtPaciente").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/Actualizar_Paciente_Info",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {

                if (Resultado.d) {
                    $("#span_Email").html($("#txt_Email").val());
                    $("#span_Celular").html($("#txt_celular").val());
                    $("#span_Telefono").html($("#txt_telefono").val());
                    $("#span_Seccional").html($("#cbo_seccional :selected").text());
                    ActualizarMensaje("Actualización", "Los datos del paciente han sido actualizados.");
                    $("#btnSiguiente").show();             
                    
                    if ($("#txt_telefono").val() != celCache) { generarLog($("#afiliadoId").val(), $("#txt_telefono").val(), "TURNO IMAGENES"); celCache = $("#txt_telefono").val(); }       
                    }
                else {
                    ActualizarMensaje("Error", "No se ha podido actualizar el paciente");
                    return;
                }


            },
            error: errores
        });
   }
  
    });


    function Cargar_Paciente_Info(mostrar) {
        var json = JSON.stringify({ "PacienteId": Afiliado_Id });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/Cargar_Paciente_Info",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                var dato = Resultado.d;
                $('#txt_Email').html("");
                $('#txt_telefono').html("");
                $('#txt_celular').html("");


                $('#txt_Email').val(dato.Email);
                $('#txt_telefono').val(dato.Telefono);
                celCache = dato.Telefono;
                $('#txt_celular').val(dato.Celular);

                $("#span_Celular").html(dato.Celular);
                $("#span_Email").html(dato.Email);


                if ($("#txt_telefono").val() == "" ){                    
                    ActualizarMensaje("¿Telefono?", "<b>El teléfono es obligatorio, actualicelo y pulse Actualizar. </b></br> " + ObservacionesPaciente);
                    $("#btnSiguiente").hide();
                    return;
                }


                
                    if ($('#txt_Email').val() == "" || $('#txt_telefono').val() == "" || $('#txt_celular').val() == "") {
                        $("#Mensaje_btn_turno_forzado").hide();                       
                        if (mostrar) {
                            ActualizarMensaje("Datos paciente", "Revise los datos del paciente, Email, teléfono, celular.");
                        }                    
                }

            },
            error: errores
        });
    }



    function ElimiarTurnosDe48Hs() {        
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/ElimiarTurnosDe48Hs",
            contentType: "application/json; charset=utf-8",            
            dataType: "json",
            success: function (Resultado) {                
                
            },
            error: errores
        });
    }

    ElimiarTurnosDe48Hs();


    $("#btnRecepcionar").click(function () {
        $("#Recepcionar_Div").show();
        $("#Recepcionar_Titulo").html("Recepción de Turno");
        $("#txt_cod_barra").focus();
    });

    $("#Recepcionar_btn_cancelar").click(function () {
        LimpiarRecepcion();        
        $("#Recepcionar_Div").hide();
        $("#div_relacionar").hide();
        
        
        

    });


    //IMG_BONO_ESTADO
    function RevisarBono(TurnoId) { 
    var json = JSON.stringify({
                "TurnoId": TurnoId
            });

            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/Imagenes/Imagenes.asmx/IMG_Turno_Info",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                                        
                }, error: errores
            });

    }

    
    var SaltearValidacion = false;
    function CargarTurnodesdeBusqueda(TurnoId) {
        $.fancybox.close();
        SaltearValidacion = true;
        $("#txt_cod_barra").val(TurnoId);
        CargarCodTurno();
        $("#Recepcionar_Div").show();
        $("#Recepcionar_Titulo").html("Recepción de Turno");
    }


    function CargarCodTurno(){
    var json = JSON.stringify({
                "TurnoId": $("#txt_cod_barra").val()
            });

            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/Imagenes/Imagenes.asmx/IMG_Turno_Info",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    //LimpiarDatos();
                    var dato = Resultado.d;

                    if (!SaltearValidacion) {
                        if (dato.TurnoHoy == false) {
                            ActualizarMensaje("Hoy no es el día", "Revise la fecha del turno, ya que no es la del día de hoy.");
                            return;
                        }

                        if (dato.IMG_TURNO_BONO_ID == null) {
                            ActualizarMensaje("No posee bono", "Este paciente no posee bono vinculado con el turno, o el bono ha sido cancelado.");
                            $("#div_relacionar").show();
                            $("#txt_cod_barra").attr('disabled', 'disabled');
                            return;
                        }
                    }

                    if (dato.IMG_TURNO_PACIENTE_ID == 0) {
                        ActualizarMensaje("Turno No Encontrado", "El turno con el código de barra ingresado no se encuentra en el sistema.");
                        return;
                    }



                    if (!SaltearValidacion) {
                        RevisarBono($("#txt_cod_barra").val());
                    }






                    $("#Recepcion_Div_Datos").show();
                    $("#txt_cod_barra").attr('disabled', 'disabled');

                    var arr = (dato.IMG_TURNO_FECHA).split("/");
                    d_dia = arr[0];
                    d_mes = arr[1];
                    d_anio = arr[2];



                    $("#span_recepcion_fecha").html(pad_with_zeroes(d_dia, 2) + "/" + pad_with_zeroes(d_mes, 2) + "/" + d_anio);

                    $("#span_recepcion_fecha").html($("#span_recepcion_fecha").html() + " " + dato.IMG_TURNO_HORA_INICIO);
                    $("#span_recepcion_paciente").html(dato.Paciente);
                    $("#span_recepcion_NHC").html(dato.HC_UOM_CENTRAL);

                    CargarListaDePracticas(dato.IMG_TURNO_ESPECIALIDAD, dato.IMG_TURNO_MEDICO);

                    $("#span_recepcion_especialidad").html(dato.Especialidad);
                    $("#span_recepcion_medico").html(dato.Medico);

                    $("#span_recepcion_resumen_1").html("");

                    if (dato.IMG_TURNO_ESTADO == -1) {
                        $("#btn_rechazar_turno").hide();
                        $("#span_motivo_cancelacion").html("CANCELADO: " + dato.MOTIVO_CANCELACION);
                        $("#SPAN_MOTIVORECHAZADO_INFO").html("CANCELADO: " + dato.MOTIVO_CANCELACION);
                    }
                    else {
                        $("#btn_rechazar_turno").show();
                        $("#SPAN_MOTIVORECHAZADO_INFO").html("");
                        $("#span_motivo_cancelacion").html("");
                    }

                                       
                    if (dato.IMG_RECITAR) {
                        $("#SPAN_MOTIVORECHAZADO_INFO").html($("#SPAN_MOTIVORECHAZADO_INFO").html() + " // * RECITAR * ");
                        $("#span_motivo_cancelacion").html($("#span_motivo_cancelacion").html() + " // * RECITAR * ");                    
                    }
                    
                    if(dato.COMENTARIO_MEDICO != null && dato.COMENTARIO_MEDICO != "")
                    {                        
                        $("#SPAN_MOTIVORECHAZADO_INFO").html($("#SPAN_MOTIVORECHAZADO_INFO").html() + "<br/><b>Comentario. Méd: </b>" + dato.COMENTARIO_MEDICO);
                    }


                    if (dato.IMG_TURNO_ESTADO == -1) { $("#span_recepcion_resumen_1").html($("#span_recepcion_resumen_1").html() + "<b>Estado:</b> <span class='cancelado badge'>Cancelado</span>"); }
                    if (dato.IMG_TURNO_ESTADO == 1) { $("#span_recepcion_resumen_1").html($("#span_recepcion_resumen_1").html() + "<b>Estado:</b> <span class='ocupado badge' style='color:Gray;'>Turno</span>"); }
                    if (dato.IMG_TURNO_ESTADO == 2) { $("#span_recepcion_resumen_1").html($("#span_recepcion_resumen_1").html() + "<b>Estado:</b> <span class='recepcionado badge'>Recepcionado</span>"); }
                    if (dato.IMG_TURNO_ESTADO == 3) { $("#span_recepcion_resumen_1").html($("#span_recepcion_resumen_1").html() + "<b>Estado:</b> <span class='llamado badge' style='color:Gray;'>Llamado</span>"); }
                    if (dato.IMG_TURNO_ESTADO == 4) { $("#span_recepcion_resumen_1").html($("#span_recepcion_resumen_1").html() + "<b>Estado:</b> <span class='ausente badge'>Ausente</span>"); }
                    if (dato.IMG_TURNO_ESTADO == 5) { $("#span_recepcion_resumen_1").html($("#span_recepcion_resumen_1").html() + "<b>Estado:</b> <span class='enconsultorio badge'>En consultorio</span>"); }
                    if (dato.IMG_TURNO_ESTADO == 6) { $("#span_recepcion_resumen_1").html($("#span_recepcion_resumen_1").html() + "<b>Estado:</b> <span class='atendido badge'>Atendido</span>"); }
                    if (dato.IMG_TURNO_ESTADO == 7) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<b>Estado:</b> <span class='noatendido badge'>No Atendido</span>"); }

                    $("#span_recepcion_resumen_1").html($("#span_recepcion_resumen_1").html() + "<span style='display:inline-block; width: 13px;'></span>");

                    if (dato.IMG_TURNO_MINUTOSFIJOS) { $('#ck_manual').prop('checked', true); }
                    if (dato.IMG_TURNO_SOBRETURNO) { $("#span_recepcion_resumen_1").html($("#span_recepcion_resumen_1").html() + "<span class='badge'>SobreTurno</span>"); }
                    if (dato.IMG_TURNO_FORZADO) { $("#span_recepcion_resumen_1").html($("#span_recepcion_resumen_1").html() + "<span class='badge'>Turno Forfado</span>"); }
                    if (dato.IMG_TURNO_X_EMAIL) { $("#span_recepcion_resumen_1").html($("#span_recepcion_resumen_1").html() + "<span class='badge'>Turno x Email</span>"); }


                    $("#txt_comentario").val(dato.IMG_TURNO_COMENTARIO);



                    if (dato.IMG_TURNO_ESTADO >= 2 || dato.IMG_TURNO_ESTADO <= -1) { $("#btn_Recepcionar").hide(); $("#btn_salvar_bono").show(); }
                    else { $("#btn_Recepcionar").show(); $("#btn_salvar_bono").hide(); }


                    if (dato.IMG_TURNO_ESTADO == -1) { $("#btn_salvar_bono").hide(); }


                    if (SaltearValidacion) {
                        $("#btn_Recepcionar").hide();
                    }
                    SaltearValidacion = false;



                    $("#span_recepcion_resumen_practicas").html("");

                    var json = JSON.stringify({
                        "TurnoId": $("#txt_cod_barra").val()
                    });

                    $.ajax({
                        type: "POST",
                        url: "../Json/Imagenes/Imagenes.asmx/H2_IMG_Practicas_Detalle_Cargar",
                        data: json,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (Resultado) {
                            Array_Turno_Practicas = [];
                            var Datos = Resultado.d;
                            $("#txt_practica_id").val("");
                            $("#cbo_practica_nombre").val("0");
                            $("#span_recepcion_resumen_practicas").html("");
                            $.each(Datos, function (index, dato) {
                                $("#span_recepcion_resumen_practicas").html($("#span_recepcion_resumen_practicas").html() + dato.PracticaCodigo + " - " + dato.PracticaNombre + "<br/>");
                            });
                        },
                        error: errores
                    });
                },
                error: errores
            });
    }

    $("#txt_cod_barra").keyup(function (e) {
        if (e.keyCode === 13) {
        CargarCodTurno();
        }
    });

    
    $("#Recepcionar_btn_editar").click(function () {        
        Recepcionando = true;
        $("#Recepcionar_Div").hide();
        TurnoId = $("#txt_cod_barra").val();
        CargarTurnoxId(TurnoId);
        LimpiarRecepcion();
    });

    $("#Turno_btn_cancelar").click(function () {
        Recepcionando = false;
        $("#Turno_Div").hide();
    });

    function LimpiarRecepcion() {        
        $("#Recepcion_Div_Datos").hide();
        $("#txt_cod_barra").removeAttr('disabled');
        

        $("#txt_cod_barra").val("");
        $("#span_recepcion_paciente").html("");
        $("#span_recepcion_NHC").html("");
        $("#span_recepcion_fecha").html("");
        $("#span_recepcion_especialidad").html("");
        $("#span_recepcion_medico").html("");

        $("#span_recepcion_resumen_1").html("");
        $("#span_recepcion_resumen_practicas").html("");

        $("#txt_cod_barra").val("");
        $("#txt_bono_id").val("");       

    }

    var popup;
    $("#Turno_btn_escanear").click(function () {
        var h = 120;
        var w = 400;
        var title = "Escaneando...";
        var url = "Escanear.aspx?turno=" + TurnoId + "&paciente=" + obj_Paciente.PacienteId;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    });


    $("#btn_quitar_pregunta").click(function () {
        $("#span_pregunta_eliminar").hide();
    });


    function ElimarTurno(TurnoId) {
        var json = JSON.stringify({
            "TurnoId": TurnoId
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/ElimiarTurno",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (!Recepcionando) {
                    LimpiarDatos();
                    ActualizarListadoPacientes();
                    $("#Turno_btn_cancelar").click();
                }
                else {
                    document.location = "Turno.aspx";
                }
            },
            error: errores
        });
    }

    $("#btn_elimiar_turno").click(function () {
        ElimarTurno(TurnoId);
    });

    $("#Turno_btn_imprimir").click(function () {
        Imprimir(TurnoId);
    });

    function Imprimir(Id) {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Impresiones_IMG/Img_Turno.aspx?TurnoId=' + Id,
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                setTimeout(function () { ImprimirEtiqueta(Id);  }, 1000);
            }
        });
    }


    function ImprimirEtiqueta(Id) {
        
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Impresiones_IMG/IMG_Etiqueta.aspx?TurnoId=' + Id,
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                //window.location.href = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
            }
        });
    }

    $("#Turno_btn_eliminarturno").click(function () {
        $("#Turno_btn_eliminarturno").hide();
        $("#span_pregunta_eliminar").show();
    });

    $("#btn_ver_escaneado").click(function () {
      
        var json = JSON.stringify({
            "TurnoId": TurnoId
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/H2_IMG_ESCANEAR_CARGAR",// aca
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Auxi = "";
                var Datos = Resultado.d;
                $.each(Datos, function (index, dato) {
                if (dato.esAdjunto == 1) {
                                        var tipoEtiqueta = "";
                        var formato = dato.Archivo.substr(-3, dato.Archivo.length).toLowerCase();
                        if (formato == "pdf") { tipoEtiqueta = "embed"; } else { tipoEtiqueta = "img" }
                        Auxi = Auxi + "<div style='overflow:auto; max-height:400px;'><div style='border:1px; border-style:solid;margin-bottom:20px;'><a href='http:\\\\10.10.8.71\\" + dato.Archivo + "' target='_blank'><img href='" + dato.Archivo + "' target='_blank'>VER ARCHIVO<" + tipoEtiqueta + " src='http:\\\\10.10.8.71\\" + dato.Archivo + "' style='width:460px;'/></a></div></div";
                
                }else{
                    Auxi = Auxi + "<div style='overflow:auto; max-height:400px;'><div style='border:1px; border-style:solid;margin-bottom:20px;'><a href='http:\\\\10.10.8.71\\" + dato.Archivo + "' target='_blank'><img src='http:\\\\10.10.8.71\\" + dato.Archivo + "' style='width:460px;'/></a></div></div";
                    }
                });
                ActualizarMensaje("Escaneado", Auxi);
            },
            error: errores
        });

    });



    function OpcionesPostTurno() {
        $("#Mensaje_btn_Aceptar").hide();
        $("#Mensaje_btn_turno_forzado").hide();
        ActualizarMensaje("Opciones", "<span><a id='opc_escanear' class='btn btn-info'>Escanear</a></span> <span><a id='opc_imprimir' class='btn btn-info'>Imprimir</a></span> <span><a id='opc_turnonuevo' class='btn btn-info' href='Turno.aspx'>Turno Nuevo</a></span> <span><a id='opc_continuar' class='btn btn-info'>Continuar con Paciente</a></span>" +
        "<span><a id='opc_subir' class='btn btn-info'>Subir Documentación</a></span>");
    }


    $("#opc_escanear").live("click", function () {
        $("#Turno_btn_escanear").click();
    });

    $("#opc_imprimir").live("click", function () {
        Imprimir(TurnoId);
    });

    $("#opc_continuar").live("click", function () {
        TurnoId = 0;
        $("#Mensaje_btn_Aceptar").show();
        $("#Mensaje_btn_Aceptar").click();
        CargarPacienteID(obj_Paciente.PacienteId);        
    });


    $("#btn_Recepcionar").click(function () {
        var cod_turno = $("#txt_cod_barra").val();

        var json = JSON.stringify({
            "TurnoId": cod_turno
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_TURNO_RECEPCIONAR",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d) {
                    $("#txt_cod_barra").val("");
                    $("#txt_bono_id").val("");
                    $("#Recepcionar_btn_cancelar").click();
                    ActualizarMensaje("Paciente Recepcionado", "Paciente Recepcionado correctamente");                    
                }
            },
            error: errores
        });

    });

    function Relacionar() {
        var cod_turno = $("#txt_cod_barra").val();
        var cod_bono = $("#txt_bono_id").val();

        if (cod_turno != "" && cod_bono != "") {
            var json = JSON.stringify({
                "TurnoId": cod_turno,
                "BonoId": cod_bono
            });

            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_BONO_RELACIONAR_CON_TURNO_X_ID",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    if (Resultado.d)
                    {
                        $("#div_relacionar").hide();                        
                        $("#txt_cod_barra").removeAttr('disabled');
                        CargarCodTurno();
                    }
                },
                error: errores
            });

        }
        else {
            ActualizarMensaje("Faltan datos","Falta cargar el Código del turno y/o Código del bono.");
        }

    }

    parent.document.getElementById("DondeEstoy").innerHTML = "Imágenes > <strong>Pedido de Turno</strong>";

    $("#btn_ver_grilla").click(function () {
        $("#Turno_Div").hide();
        $(".container").fadeOut(100);
        $("#DatoTurno").fadeIn(200);
        $("#btn_seguir_editando").show();
    });

    $("#btn_seguir_editando").click(function () {
        $("#btn_seguir_editando").hide();
        $("#Turno_Div").show();
    });

    var copiando = false;
    $("#Turno_btn_copiar").click(function () {
        copiando = true;
        TurnoaBorrar = TurnoId;
        TurnoId = 0;
        $("#btn_ver_grilla").show();
        $("#Turno_btn_escanear").hide();
        $("#Turno_btn_eliminarturno").hide();
        $("#Turno_btn_imprimir").hide();
        $("#btn_ver_escaneado").hide();
        $("#Turno_btn_copiar").hide();
    });

    function CargarHoraLibre() {

        if($("#cbo_especialidad").val() == "0"){return;}
        if($("#cbo_medico").val() == ""){return;}

        var json = JSON.stringify({
            "Fecha": $("#txt_turno_forzado_fecha").val(),
            "MedicoId": $("#cbo_medico").val(),
            "EspecialidadId": $("#cbo_especialidad").val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/DarHoraFueraDeHorario",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#txt_turno_forzado_hora").val(Resultado.d);
                },
            error: errores
        });

    }


    function MoverImg(TurnoViejo, TurnoNuevo) {

        var json = JSON.stringify({
            "TurnoViejo": TurnoViejo,
            "TurnoNuevo": TurnoNuevo
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/MoverEscaneado",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                
            },
            error: errores
        });
    }


    $("#btn_buscarturnos").click(function () {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': 'ListadoTurnos.aspx?DesdeTurno=1',
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                //window.location.href = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
            }
        });
    });


    $("#btn_guardar_comentario").click(function () {
        var json = JSON.stringify({
            "TurnoId": TurnoId,
            "Comentario": $("#txt_comentario").val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/GuardarComentario",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                ActualizarMensaje("Comentario", "El comentario se ha guardado correctamente");
                return;
            },
            error: errores
        });
    });


    $("#btn_rechazar_turno").click(function () {
        $("#Rechazar_Div").show();
    });

    $("#btn_rechazarelturno").click(function () {
        var cod_turno = $("#txt_cod_barra").val();
        CambiarEstado(cod_turno, -1, true);        
    });

    $("#Rechazar_btn_cancelar").click(function () {
        $("#Rechazar_Div").hide();
    });

    
    function CancelarMotivo(TurnoID, MotivoID, MotivoDetalle) {
        var json = JSON.stringify({ "TurnoID": TurnoID, "MotivoID": MotivoID, "MotivoDetalle": MotivoDetalle });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMAGENES_TURNO_RECHAZAR_MOTIVO",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                //if (Resultado.d == -2) {
                    //INGRESAR = 5
                    //ANTES DECIA 3 QUE ES CUANDO SE LLAMA EL TEMA ES QUE SE PUEDE LLAMAR Y EL PACIENTE NUNCA FUE, EL WORKLIST GENERA UN REGISTRO, SI EL PACIENTE VUELVE Y SE LO
                    //VUELVE A LLAMAR SE GENERA OTRO REGISTRO Y NO ESTARIA BUENO.                    
                    $("#btnCancelarPedidoTurno").click();
                //}
            },
            error: errores
        });
    }

    function CambiarEstado(TurnoID, Estado, VolveraCargar) {
        var json = JSON.stringify({ "TurnoId": TurnoID, "Estado": Estado });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMAGENES_TURNO_CAMBIARESTADO",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d == -1) {
                    //INGRESAR = 5
                    //ANTES DECIA 3 QUE ES CUANDO SE LLAMA EL TEMA ES QUE SE PUEDE LLAMAR Y EL PACIENTE NUNCA FUE, EL WORKLIST GENERA UN REGISTRO, SI EL PACIENTE VUELVE Y SE LO
                    //VUELVE A LLAMAR SE GENERA OTRO REGISTRO Y NO ESTARIA BUENO.                    
                    //$("#btnCancelarPedidoTurno").click();                    
                    CancelarMotivo(TurnoID, $("#cbo_rechazar_motivos").val(), $("#txt_rechazar_motivo_otro").val());        
                }
            },
            error: errores
        });
    }


    

    function SePuedeSalvarBono(){
        TurnoId = $("#txt_cod_barra").val();            

        var json = JSON.stringify({ "TurnoID": TurnoId });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMAGENES_TURNO_SEPUEDESALVARBONO",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d == true) {
                    Salvar_el_bono();
                }
                else
                {
                    ActualizarMensaje("No se puede salvar el bono","El turno ya ha sido recepcioado y ha sido atendido, por lo tanto NO se puede salvar el bono.");
                    return;
                }
            },
            error: errores
        });

        return true;
        
    }

    function Salvar_el_bono(){
        var motivo = prompt("Ingrese un motivo", "");
        copiando = false;
        if (motivo != null && motivo != "") {
            copiando = true;
            MotivoSalvarBono = motivo;
            //console.log(MotivoSalvarBono);
            Recepcionando = true;
            $("#btn_salvar_bono_guardar").show();
            $("#Recepcionar_Div").hide();
            TurnoId = $("#txt_cod_barra").val();            
            CargarTurnoxId(TurnoId);
            $("#Turno_btn_copiar").hide();
            $("#btn_salvar_bono").show();
        }
        else
        {
            ActualizarMensaje("Falta Motivo","Falta ingresar el motivo.");
            return;
        }
    }

    $("#btn_salvar_bono").click(function () {
        SePuedeSalvarBono();
    });

    $("#btn_salvar_bono_guardar").click(function () {
        TurnoaBorrar = TurnoId;
        TurnoId = 0;           
        DarTurno();
    });

    var MotivoSalvarBono = "";


    function CargarMedicosDerivantes() {

        var json = JSON.stringify({ "MedicoID": 0 });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Imagenes/Imagenes.asmx/MEDICO_DERIVANTE_LISTAR",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Medicos = Resultado.d;
                $('#cbo_medico_derivante').empty();
                $('#cbo_medicos_derivantes_existenes').empty();
                $('#cbo_medico_derivante').append('<option value="0">NINGUNO</option>');
                $('#cbo_medicos_derivantes_existenes').append('<option value="0">NUEVO</option>');
                $.each(Medicos, function (index, medico) {
                    $('#cbo_medico_derivante').append($('<option></option>').val(medico.MEDICOID).html(medico.MEDICO));
                    $('#cbo_medicos_derivantes_existenes').append($('<option></option>').val(medico.MEDICOID).html(medico.MEDICO));
                });
            },
            error: errores
        });
    }

    $("#cbo_medicos_derivantes_existenes").change(function () {
        CargarMedicoDerivante($("#cbo_medicos_derivantes_existenes").val());
    });

    $("#btn_medico_derivante_edicion").click(function () {
        CargarMedicosDerivantes();
        $("#MedicoDerivante_Div").show();
    });


    $("#MedicoDerivante_Cancelar").click(function () {
        $("#MedicoDerivante_Div").hide();
    });

    function MedicoDerivante(MEDICOID, MEDICO, MN, MP) {
        this.MEDICOID = MEDICOID
        this.MEDICO = MEDICO
        this.MN = MN
        this.MP = MP
    }

    function CargarMedicoDerivante(MedicoID) {

        var json = JSON.stringify({ "MedicoID": MedicoID });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Imagenes/Imagenes.asmx/MEDICO_DERIVANTE_LISTAR",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Medicos = Resultado.d;
                $.each(Medicos, function (index, medico) {
                    $("#txt_medico_derivante_nombre").val(medico.MEDICO);
                    $("#txt_medico_derivante_MN").val(medico.MN);
                    $("#txt_medico_derivante_MP").val(medico.MP);
                });
            },
            error: errores
        });
    }

    CargarMedicosDerivantes();


    $("#MedicoDerivante_Aceptar").click(function () {

        var MD = new MedicoDerivante($("#cbo_medicos_derivantes_existenes").val(), $("#txt_medico_derivante_nombre").val(), $("#txt_medico_derivante_MN").val(), $("#txt_medico_derivante_MP").val());

        var json = JSON.stringify({ "Medico": MD });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/MEDICO_DERIVANTE_ACTUALIZAR",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#MedicoDerivante_Div").hide();
                var Men = "El médico se ha agregado";
                if ($("#cbo_medicos_derivantes_existenes").val() != 0) {
                    Men = "El médico se ha actualizado";
                }
                ActualizarMensaje("Comentario", Men);
                LimpiarMedicosDerivantes();
                CargarMedicosDerivantes();
            },
            error: errores
        });
    });

    function LimpiarMedicosDerivantes() {
        $("#cbo_medicos_derivantes_existenes").val("0");
        $("#txt_medico_derivante_nombre").val("");
        $("#txt_medico_derivante_MN").val("");
        $("#txt_medico_derivante_MP").val("");
    }


    function AgregarDia(date, days) {        
        var result = new Date(date.substring(6,10), date.substring(3,5), date.substring(0,2));
        result.setDate(result.getDate() + days);

        var yyyy = result.getFullYear();
        var dd = result.getDate();
        var mm = result.getMonth();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var today = dd+'/'+mm+'/'+yyyy;
        return (dd + "/" + mm +  "/" + yyyy);
    }

    var DiasBuscados = 0;

    function obtenerproximoturno(){
         
        if ($("#txt_duracion").val() < 1){
            ActualizarMensaje("¿Tiempo necesario?","Falta conocer la cantidad de tiempo necesario para el o los estudios, cargue las prácticas.");
            return;
        }

        if ($("#txt_turno_forzado_fecha").val() == ""){
            ActualizarMensaje("¿La fecha?","Falta cargar la fecha para comenzar a buscar los turnos.");
            return;
        }

        if ($("#txt_turno_forzado_hora").val() == ""){
            ActualizarMensaje("¿La hora?","Falta cargar la hora para comenzar a buscar los turnos.");
            return;
        }
            
        if (DiasBuscados > 20){
            ActualizarMensaje("No se encontraron dias disponibles","No se ha podido encontrar un horario para dar el turno.");
            return;
        }
            
        var json = JSON.stringify({ "FECHA_TURNO": $("#txt_turno_forzado_fecha").val(), "MINUTOSNECESARIOS": $("#txt_duracion").val(), "ESPECIALIDAD": $("#cbo_especialidad").val(), "MEDICO": $("#cbo_medico").val(), "HORA_DESDE": $("#txt_turno_forzado_hora").val()});
        $("#btn_proximoturno").html("Próximo Turno");
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/TURNOMASPROXIMO",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {                
                if (Resultado.d != ""){
                    $("#txt_turno_forzado_hora").val(Resultado.d);                    
                }
                else{                    
                    DiasBuscados++;    
                    $("#txt_turno_forzado_fecha").val(AgregarDia($("#txt_turno_forzado_fecha").val(),1));
                    $("#txt_turno_forzado_hora").val("00:00");                    
                    obtenerproximoturno();
                }                
            },
            error: errores
        });
    }



        $("#opc_subir").live("click", function () {
                $.fancybox({
            'autoDimensions': false,
            'href': '../Imagenes/subirImagen.aspx?turnoId=' + TurnoId,
            'width': '50%',
            'height': '50%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                //window.location.href = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
            }});
    });

</script>

</html>
