<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListadoTurnos.aspx.cs" Inherits="Imagenes_Turno_ListadoTurnos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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
.Turnos_Izquierdo{float:left; width:100%; height:100%; background-color: #C7C7C7; margin:5px; }
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
#tabla_turnos_semana span{cursor:pointer;}


.Contenedor_Info_Medico .btn{margin-bottom: 5px;}
.Links {cursor: pointer; text-decoration:none;}
.Links:hover {cursor: pointer; text-decoration:none;}

#fancybox-overlay {z-index: 10000;}
#fancybox-wrap {z-index: 10001;}


.boton {height: 19px;display: inline-block;padding: 5px;border-radius: 4px;color: white; }
.boton:hover{color: white;text-decoration:none; cursor:pointer; opacity:0.6;}

.container {display:none;}
#DatoTurno {display:block;}
#Contenedor_Datos_Paciente {display:none;}

#temp_tabla td{padding-bottom: 0px;padding-top: 0px;}
#temp_tabla input{margin-bottom: 0px;margin-top: 0px;padding-top: 0px;padding-bottom: 0px;}

#tbody_turnos_dia img {width:32px; height:32px;}

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
      <tr><td style="width: 118px; text-align:right;">Teléfono</td><td><input type="text" id="txt_telefono" autocomplete="off" maxlength="100" placeholder="(Loc) Número" disabled/> </td></tr>
      <tr><td style="width: 118px; text-align:right;">Celular</td><td><input type="text" id="txt_celular" autocomplete="off" maxlength="100" placeholder="(Loc) Número" disabled/>  </td></tr>
      
      <tr><td style="width: 118px; text-align:right;">Seccional</td><td><select id="cbo_seccional" disabled></select></td></tr>
      </table>

      <div style="text-align:center; margin-top: 20px;">
      <a class="btn btn-danger" href="Turno.aspx" tabindex="-1" id="btnCancelarPedidoTurno" style="">Cancelar</a>
      <a class="btn btn-info" tabindex="-1" id="btnSiguiente" style="">Siguiente</a>
      <a class="btn btn-success" tabindex="-1" id="btnRecepcionar" style="">Recepcionar</a>
      <a class="btn btn-warning" tabindex="-1" id="btnActualizarDatos" style="display:none">Actualizar Datos</a>
      </div>


    </div>
    </div>
    </div>
    <div class="clearfix"></div>


  


    <div id="DatoTurno" style="display:snone;">
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
                Médico: <span id="span_medico"><select id="cbo_medico"><option value="0">Todos</option></select></span>       <br />         
                Desde: <input type="text" id="txt_desde" style="width:80px;" /> <input type="text" id="txt_horainicio" style="width:80px;" maxlength="5" />
                <span style="margin-left:19px;">Hasta:</span> <input type="text" id="txt_hasta" style="width:80px;" /> <input type="text" id="txt_horafin" style="width:80px;"  maxlength="5" /><br />     
                Tipo Orden: <select id="cbo_tipoorden">
                    <option value="0">Todas</option>
                    <option value="1">Ambulatorio</option>
                    <option value="2">Guardia</option>
                    <option value="3">Internación</option>
                </select> 
                <br />
                
                NHC: <input type="text" id="txt_nhc" style="width:100px;" />
                <span style="margin-left:20px;">Documento:</span> <input type="text" id="txt_documento" style="width:100px;" />
                <span style="margin-left:20px;">Paciente:</span> <input type="text" id="txt_paciente" style="width:100px;" />

                <a id="btn_buscar" class="btn btn-info">Buscar</a>
                <a id="btn_imprimir" class="btn btn-info">Imprimir</a>

            </div>

            <div class="Contenedor_Info_Medico">                
                <span style="background-color:White;color:Gray;" class="badge">Libre</span>
                <span class="ocupado badge" style="color:Gray;">Ocupado</span>
                <span class="sobreturno badge">Sobreturno</span>
                <span class="cancelado badge">Cancelado</span>
                <span class="forzado badge">Forzado</span>

                <span class="recepcionado badge" style="color:Gray;">Recepcionado</span>
                <span class="llamado badge" style="color:Gray;">Llamado</span>
                <span class="ausente badge">Ausente</span>
                <span class="enconsultorio badge" style="color:Gray;">En consultorio</span>
                <span class="atendido badge">Atendido</span>
                <span class="noatendido badge">No Atendido</span>
            </div>


            <div class="Contenedor_Turnos">
                <div class="Turnos_Izquierdo">
                    
                    <div style="max-height:460px; overflow:auto;">
                    <table id="tabla_turnos_dias" class="table table-condensed borderless">
                        <thead>
                        <tr class="header">                            
                            <th>Foto </th>
                            <th>Tipo </th>
                            <th>Nro. Turno </th>                            
                            <th>URG </th>
                            <th>Paciente </th>
                            <th>Documento </th>
                            <th>NHC </th>
                            <th style="width:150px;">Estudio </th>
                            <th>Estado </th>
                            <th>Esc </th>
                            
                            <th>Fecha </th>
                            <th>Hora </th>
                            
                            <th>Especialidad </th>
                            <th>Médico </th>

                            <th> </th>                            
                        </tr>
                        </thead>
                        <tbody id="tbody_turnos_dia">                            
                        </tbody>

                        

                    </table>
                    </div>
                </div>               
            </div>

            <div style="clear:both;"></div>

        </div>
    </div>



<div id="Recepcionar_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="Recepcionar_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Titulo Mensaje</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="Recepcionar_Mensaje">           
            Código de barra del turno a recepcionar: <input type="text" id="txt_cod_barra" maxlength="10"  style="width:198px;" /><br />
            <div id="div_relacionar" style="display:none;">
            Código del bono a relacionar: <input type="text" id="txt_bono_id" maxlength="10"  style="width:174px;" /><a onclick="javascript:Relacionar();" class="btn btn-info" style="margin-bottom:5px;">Relacionar</a><br />
            
            </div>
            
            <div id="Recepcion_Div_Datos" style="display:none;">
            <hr />            
            <div><b>Paciente:</b><span id="span_recepcion_paciente"></span> &nbsp;&nbsp;&nbsp;&nbsp;<b>NHC:</b><span id="span_recepcion_NHC"></span></div>
            <div><b>Fecha:</b><span id="span_recepcion_fecha"></span></div>
            <div><b>Especialidad:</b> <span id="span_recepcion_especialidad"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Médico:</b> <span id="span_recepcion_medico"></span></div><br />
            <span id="span_recepcion_resumen_1"></span> <br /><br />
            <div style="max-height: 180px; overflow:auto;">
                <span id="span_recepcion_resumen_practicas"></span> <br /><br />
            </div>
            <div><a class="btn btn-info" id="Recepcionar_btn_editar">Editar Turno</a><a class="btn btn-success" id="btn_Recepcionar" style="float:right;">Confirmar Recepción</a></div>
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
            <b>Paciente:</b>  <span id="span_paciente"></span><br />
            <b>Fecha:</b>  <span id="span_turno_forzado_fecha"><input id="txt_turno_forzado_fecha" type="text" style="width: 140px;"/></span>  <b>Hora:</b><span id="span_turno_forzado_hora"><input type="text" id="txt_turno_forzado_hora" style="width: 50px;" maxlength="5" onblur="ValidarHora(this);"/></span><br />
            <b>Especialidad:</b> <span id="span_turno_forzado_especialidad"></span>   <b style="margin-left: 25px;">Médico:</b> <span id="span_turno_forzado_medico"></span><br />
            <b>Duración:</b> <input type="text" class="span1" id="txt_duracion" maxlength="3"/> <input type="checkbox" id="ck_manual" style="margin-top: 0px;" /><label for="ck_manual" style="display:inline-block">No cambiar</label><br />
            <b><label for="ck_sobreturno" style="display:inline-block">SobreTurno </label>: </b> <input type="checkbox" id="ck_sobreturno" style="margin-top: 0px;" />
            <b><label for="ck_turnoforzado" style="display:inline-block; margin-left:20px;">Turno Forzado </label>: </b> <input type="checkbox" id="ck_turnoforzado" style="margin-top: 0px;" />
            <b><label for="ck_turnoxemail" style="display:inline-block; margin-left:20px;">Turno x Email </label>: </b> <input type="checkbox" id="ck_turnoxemail" style="margin-top: 0px;" />

            <a class="btn btn-info" id="btn_ver_escaneado" style="float: right;margin-right: 27px;">Ver Escaneado</a>

            <br />
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
            <a class="btn btn-danger" id="Turno_btn_eliminarturno" style="display:none; margin-right: 221px;">Eliminar Turno</a><span id="span_pregunta_eliminar" style="margin-right: 29px; display:none;">¿Desea realmente eliminar el turno? <a id="btn_elimiar_turno" class="btn btn-danger">Si</a><a id="btn_quitar_pregunta" class="btn btn-info">No</a></span>
            
            <a class="btn btn-info" id="Turno_btn_imprimir">Imprimir</a>
            <a class="btn btn-info" id="Turno_btn_escanear" style="display:none">Escanear</a>
            <a class="btn btn-info" id="Turno_btn_aceptar">Aceptar</a>
            <a class="btn btn-danger" id="Turno_btn_cancelar">Cancelar</a>            
         </div>
         <div style="clear:both;"></div>
    </div>
</div>














<div id="DivTurnoMedico" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="DivTurnoMedico_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Atención del paciente</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="DivTurnoMedico_Datos">                       
            <div id="DivTurnoMedico_Datos_Paciente">
            <hr />            
            <div><b>Paciente:</b><span id="span_DivTurnoMedico_Paciente"></span> &nbsp;&nbsp;&nbsp;&nbsp;<b>NHC:</b><span id="span_DivTurnoMedico_NHC"></span></div>
            <div><b>Fecha:</b><span id="span_DivTurnoMedico_Fecha"></span></div>
            <div><b>Especialidad:</b> <span id="span_DivTurnoMedico_Especialidad"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Médico:</b> <span id="span_DivTurnoMedico_Medico"></span></div><br />
            
            <a class="btn btn-info" id="btn_recepcionar_bono">Recepcionar Turno</a><br /><br />

            <span id="span_DivTurnoMedico_resumen"></span> <br /><br />
            <div style="max-height: 180px; overflow:auto;">
                <span id="span_DivTurnoMedico_resumen_practicas"></span> <br /><br />
            </div>
            
            <div id="botonera_atencion" style="display:none">            
            <a class="boton llamado" id="btn_llamar" style="color:Gray;">Llamar</a>
            <a class="boton ausente" id="btn_ausente">Ausente</a>
            
            <a class="boton atendido" id="btn_atendido">Atendido</a>
            <a class="boton noatendido" id="btn_noatendido">No Atendido</a>
            </div>

            <div style="clear:both;"></div>
            </div>


         </div>
         <hr />
         <div style="float:right; margin-right:10px;">                        
            <a class="btn btn-danger" id="btn_DivTurnoMedico_Cancelar">Cancelar</a>            
         </div>
         <div style="clear:both;"></div>
    </div>
</div>









<div id="DivTemplate" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="DivTemplate_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Atención del paciente</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="DivTemplate_Datos">                       
            <div id="DivTemplate_Paciente">           
            
            <div><b>Paciente:</b><span id="span_DivTemplate_Paciente"></span> &nbsp;&nbsp;&nbsp;&nbsp;<b>NHC:</b><span id="span_DivTemplate_NHC"></span></div>
            <div><b>Fecha:</b><span id="span_DivTemplate_Fecha"></span></div>
            <div><b>Especialidad:</b> <span id="span_DivTemplate_Especialidad"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Médico:</b> <span id="span_DivTemplate_Medico"></span></div><br />            
            <div style="max-height: 180px; overflow:auto;" id="DivTemplate_Contenido">
                <span id="span_DivTemplate_resumen_practicas"></span> <br /><br />
            </div>

            <div style="clear:both;"></div>
            </div>
         </div>
         <hr />         
         <div style="clear:both;"></div>
    </div>
</div>



<div id="Div_RecepcionarBono" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="Div_RecepcionarBono_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Atención del paciente</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="Div_RecepcionarBono_Datos">                       
            <div id="Div_RecepcionarBono_Mensaje">           
                
            <div style="clear:both;"></div>            
            </div>
            <a id="btn_recepcionbono_cerrar" class="btn btn-danger">Cerrar</a>            
         </div>
         <hr />         
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

<script>

    var Recepcionando = false;

    $("#txt_turno_forzado_hora").mask("99:99", { placeholder: "__:__" });
    $("#txt_turno_forzado_fecha").datepicker();
    //$("#txt_fecha_almanaque").datepicker();

    $("#txt_desde").datepicker();
    $("#txt_hasta").datepicker();




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

    var BuscarDesdeTurnos = false;
    $(document).ready(function () {
        var GET = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }

            GET[decode(arguments[1])] = decode(arguments[2]);
        });


        if (GET["DesdeTurno"] != "" && GET["DesdeTurno"] != null) {
            BuscarDesdeTurnos = true;
        }

    });





    function CargarTurnos(Objeto, SoloTurnos, Inicio, Fin, Especialidad, Medico, Tipo, HNC, Paciente, Documento, HoraInicio, HoraFin) {

        var json = JSON.stringify({
            "Medico": Medico,
            "Especialidad": Especialidad,
            "Desde": Inicio,
            "Hasta": Fin,
            "Tipo": Tipo,
            "HNC": HNC,
            "Paciente": Paciente,
            "Documento": Documento,
            "HoraInicio": HoraInicio,
            "HoraFin": HoraFin
        });


        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Imagenes/Imagenes.asmx/IMG_TURNO_CONSULTORIO_LISTAR_HORARIO",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                LimpiarDatos();
                var lista = Resultado.d;
                //$("#" + Objeto).html(Resultado.d);
                var tabla = "";
                $.each(lista, function (index, dato) {
                    //if (SoloTurnos) {
                    var urgencia = "";
                    if (dato.estado != "libre") {
                        if (dato.urgencia) {
                            urgencia = "Si";
                        }

                        var estado = "";
                        //alert(dato.foto);
                        if (dato.estado == "ocupado") { estado = "Turno"; }
                        if (dato.estado == "llamado") { estado = "Llamado"; }
                        if (dato.estado == "forzado") { estado = "Forzado"; }
                        if (dato.estado == "recepcionado") { estado = "Recepcionado"; }
                        if (dato.estado == "enespera") { estado = "Esperando"; }
                        if (dato.estado == "enconsultorio") { estado = "En Consultorio"; }
                        if (dato.estado == "noatendido") { estado = "No Atendido"; }
                        if (dato.estado == "atendido") { estado = "Atendido"; }
                        if (dato.estado == "") { estado = ""; }

                        tabla = tabla + "<tr class='" + dato.estado + "' data-motivo='" + dato.comentario + "' data-dia='" + dato.fecha + "' data-turno='" + dato.nro_turno + "'>";
                        //tabla = tabla + "<td><a onclick='Eliminar(" + dato.nro_turno + ", this)'>Eliminar</a> </td>";
                        //tabla = tabla + "<td><img onerror='imgErrorPaciente(this);' src='" + dato.foto + "'/> </td>";

                        tabla = tabla + "<td><img onerror='imgErrorPaciente(this);' src='../fotoPerfil/" + dato.foto + "'/></td>";

                        tabla = tabla + "<td>" + dato.tipo + " </td>";
                        tabla = tabla + "<td>" + dato.nro_turno + " </td>";
                        tabla = tabla + "<td>" + urgencia + " </td>";
                        tabla = tabla + "<td class='tabla_apellido'>" + dato.paciente + " </td>";
                        tabla = tabla + "<td>" + dato.documento + " </td>";
                        tabla = tabla + "<td class='tabla_nhc'>" + dato.nhc + " </td>";
                        tabla = tabla + "<td>" + dato.estudio + " </td>";
                        tabla = tabla + "<td>" + estado + "  </td>";
                        if (dato.escaneado != false) {
                            tabla = tabla + "<td><a onclick='VerEscaneado(" + dato.nro_turno + ");'>Ver</a></td>";
                        }
                        else {
                            tabla = tabla + "<td></td>";
                        }


                        tabla = tabla + "<td>" + dato.fecha + "  </td>";
                        tabla = tabla + "<td>" + dato.hora_turno + "  </td>";
                        //tabla = tabla + "<td>" + dato.arribo + "  </td>";
                        //tabla = tabla + "<td>" + dato.inicio + "  </td>";
                        //tabla = tabla + "<td>" + dato.usuario_inicio + "  </td>";
                        //tabla = tabla + "<td>" + dato.fin + " </td>";
                        //tabla = tabla + "<td>" + dato.usuario_fin + " </td>";

                        tabla = tabla + "<td>" + dato.especialidad + " </td>";
                        tabla = tabla + "<td>" + dato.medico + " </td>";

                        var auxi = ""
                        if (BuscarDesdeTurnos) {
                            auxi = "<a href='javascript:EditarTurno(" + dato.nro_turno + ")' class='btn' title='Editar'>E</a>";
                        }

                        tabla = tabla + "<td><a href='javascript:Imprimir(" + dato.nro_turno + ")' class='btn' title='Imprimir'>I</a> " + auxi + "</td>";


                        tabla = tabla + "</tr>";
                    }
                    //tabla = tabla + "<tr class='" + dato.estado + "' data-motivo='" + dato.comentario + "' data-dia='" + dato.fecha + "' data-turno='" + dato.nro_turno + "'><td>" + dato.hora_turno + "</td><td>" + dato.paciente + "</td><td>" + dato.practicas + "</td></tr>";
                    //}

                    //     tabla = tabla + "<tr class='" + dato.estado + "' data-motivo='" + dato.comentario + "' data-dia='" + dato.fecha + "' data-turno='" + dato.nro_turno + "'><td>" + dato.hora_turno + "</td><td>" + dato.paciente + "</td><td>" + dato.practicas + "</td></tr>";
                    //}
                    //$('#cbo_especialidad').append($('<option>', { value: dato.Id, text: dato.Especialidad }));
                });
                $("#" + Objeto).html(tabla);
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

        $("#span_pregunta_eliminar").hide();

        //RenderizarPracticasSeleccionadas();
        return;
    }


    var TurnoId = 0;
    var HoraTurno = "";
    var Motivo = "";
    var Dia_Turno = "";
    var Hora_Turno = "";



    function MostrarTemplateAtencion() {
        $("#DivTurnoMedico").hide();
        $("#DivTemplate").show();
        $("#span_DivTemplate_Paciente").html($("#span_DivTurnoMedico_Paciente").html());
        $("#span_DivTemplate_NHC").html($("#span_DivTurnoMedico_NHC").html());
        $("#span_DivTemplate_Fecha").html($("#span_DivTurnoMedico_Fecha").html());
        $("#span_DivTemplate_Especialidad").html($("#span_DivTurnoMedico_Especialidad").html());
        $("#span_DivTemplate_Medico").html($("#span_DivTurnoMedico_Medico").html());
        $("#DivTemplate_Titulo").html("Carga de datos");
        $("#DivTemplate_Contenido").load("temp_ecografia.htm");
    }

    function MostrarTemplateAtencion_Vacio() {
        $("#DivTurnoMedico").hide();
        $("#DivTemplate").show();
        $("#DivTemplate_Titulo").html("Carga de datos");
        $("#DivTemplate_Contenido").load("temp_ecografia.htm");
    }

    function MostrarTemplateNoAtencion() {
        $("#DivTurnoMedico").hide();
        $("#DivTemplate").show();
        $("#span_DivTemplate_Paciente").html($("#span_DivTurnoMedico_Paciente").html());
        $("#span_DivTemplate_NHC").html($("#span_DivTurnoMedico_NHC").html());
        $("#span_DivTemplate_Fecha").html($("#span_DivTurnoMedico_Fecha").html());
        $("#span_DivTemplate_Especialidad").html($("#span_DivTurnoMedico_Especialidad").html());
        $("#span_DivTemplate_Medico").html($("#span_DivTurnoMedico_Medico").html());
        $("#DivTemplate_Titulo").html("Carga de datos");
        $("#DivTemplate_Contenido").load("temp_no_atendido.htm");
    }

    function MostrarTemplateNoAtencion_Vacio() {
        $("#DivTurnoMedico").hide();
        $("#DivTemplate").show();
        $("#DivTemplate_Titulo").html("Carga de datos");
        $("#DivTemplate_Contenido").load("temp_no_atendido.htm");
    }


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

                if (dato.IMG_TURNO_MINUTOSFIJOS) { $('#ck_manual').prop('checked', true); }
                if (dato.IMG_TURNO_SOBRETURNO) { $('#ck_sobreturno').prop('checked', true); }
                if (dato.IMG_TURNO_FORZADO) { $('#ck_turnoforzado').prop('checked', true); }
                if (dato.IMG_TURNO_X_EMAIL) { $('#ck_turnoxemail').prop('checked', true); }


                if (dato.IMG_TURNO_ESTADO >= 5 || dato.IMG_TURNO_ESTADO <= -1) { $("#Turno_btn_aceptar").hide(); $("#Turno_btn_eliminarturno").hide(); $("#btn_llamar").hide(); $("#btn_ausente").hide(); }
                else { $("#Turno_btn_aceptar").show(); $("#btn_llamar").show(); $("#btn_ausente").show(); }


                CargarPracticasdeTurno();
                //});
            },
            error: errores
        });


        $("#btn_ver_escaneado").show();
        $("#Turno_btn_escanear").show();
        $("#Turno_btn_imprimir").show();
        //$("#Turno_btn_eliminarturno").show();
        $("#Turno_Titulo").html("Edición de Turno");
        $("#Turno_Div").show();
    }








    function ActualizarMensaje(Titulo, Mensaje) {
        $("#Mensaje_Titulo").html(Titulo);
        $("#Mensaje_Mensaje").html(Mensaje);
        $("#Mensaje_Div").show();
    }

    $("#Mensaje_btn_Aceptar").click(function () { $("#Mensaje_Div").hide(); });
    $("#Turno_btn_cancelar").click(function () { $("#Turno_Div").hide(); });

    $("#Mensaje_btn_turno_forzado").click(function () {
        $("#Mensaje_Div").hide();
        $("#Turno_Titulo").html("Turno Forzado");
        $("#Turno_Div").show();
    });

    function IrACargaPaciente() {
        $("#Turno_Div").hide();
        $("#DatoTurno").fadeOut(100);
        $(".container").fadeIn(200);
    }

    


    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            //$("#Turno_Div").hide();
            $("#Mensaje_Div").hide();
        }
    });

    var Array_Turno_Practicas = new Array();

    
    var Objeto_Turno = {}
    Objeto_Turno.MedicoId = 0;
    Objeto_Turno.EspecialidadId = 0;
    Objeto_Turno.Fecha = 0;
    Objeto_Turno.Hora = 0;
    Objeto_Turno.TurnoId = 0;
    
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
        $('#cbo_especialidad').append($('<option>', { value: 0, text: "Todas" }));
        $.each(lista, function (index, dato) {
            $('#cbo_especialidad').append($('<option>', { value: dato.Id, text: dato.Especialidad }));
        });
    }

    $("#cbo_especialidad").change(function () {
        if ($("#cbo_especialidad").val() != "0") {
            $("#span_turno_forzado_especialidad").html($("#cbo_especialidad :selected").text());
            Cargar_Medicos_por_Especialidad($("#cbo_especialidad :selected").val(), "A");
            CargarListaDePracticas($("#cbo_especialidad :selected").val());
            $("#tbody_turnos_dia").empty();
        }
        else {
            $("#span_turno_forzado_especialidad").html("");
            $("#tbody_turnos_dia").empty();
            $('#cbo_medico').empty();
            $('#cbo_medico').append('<option value="0">Todos</option>');
        }
    });


    
    CargarListaDeEspecialidades();


    function Cargar_Medicos_por_Especialidad(Especialidad, Tipo) {
        var json = JSON.stringify({ "Especialidad": $("#cbo_especialidad").val(), "Tipo": "A" });
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
        $('#cbo_medico').append('<option value="0">Todos</option>');
        $.each(Medicos, function (index, medicos) {
            $('#cbo_medico').append($('<option></option>').val(medicos.Id).html(medicos.Medico));
        });
    }



    function ActualizarListadoPacientes() {

        if ($("#cbo_especialidad").val() == "0" || $("#cbo_medico").val() == "0") {
            ActualizarMensaje("Revise los datos", "No se pueden mostrar la grilla de turnos, seleccione una especialidad y/o un médico.");
            return;
        }

        if ($("#cbo_medico").val() != "0") {
            $("#span_turno_forzado_medico").html($("#cbo_medico :selected").text());

            //Objeto, SoloTurnos, Inicio, Fin, Especialidad, Medico, Tipo, HNC, Paciente, Documento
            CargarTurnos("tbody_turnos_dia", false, $("#txt_desde").val(), $("#txt_hasta").val(), $("#cbo_especialidad").val(), $("#cbo_medico").val(), $("#cbo_tipoorden").val(), $("#txt_nhc").val(), $("#txt_paciente").val(), $("#txt_documento").val(), $("#txt_horainicio").val(), $("#txt_horafin").val());

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
    //$("#txt_fecha_almanaque").change(function () {
    //    ActualizarFechasYHoras();
    //    ActualizarListadoPacientes();
    //});

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

        var factual_mostrar = new Date(d_anio + "-" + d_mes + "-" + d_dia);
        factual_mostrar.setHours(24);
        diasmostrar[7] = factual_mostrar.getDate() + "/" + (factual_mostrar.getMonth() + 1) + "/" + factual_mostrar.getFullYear();
    }

    $('#txt_desde').val(FechaActual());
    $('#txt_hasta').val(FechaActual());
    $('#txt_horainicio').val("00:00");
    $('#txt_horafin').val("23:59");
    //ActualizarFechasYHoras();



    var obj_Paciente = {};    

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        ActualizarMensaje("Error", jsonObj.Message);
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
                //RenderizarPracticasSeleccionadas();
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
        if (c != ':') { //|| e != ':') {
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


    function Paciente_Cargado(Resultado) {
        var Paciente = Resultado.d;
        var PError = false;

        if (Paciente.length == 0) {
            $("#SpanCargando").hide();
            ActualizarMensaje("Paciente no encontrado", "No se ha encontrado el paciente.");
            return;
        }

        $("#btn_turno_forzado").show();

        if (Paciente.length == 1) {

            $.each(Paciente, function (index, paciente) {
                if (paciente.Vencido) {
                    ActualizarMensaje("Baja", "Paciente dado de baja el día: " + paciente.FechaVencido);
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
                $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);
                $("#span_Seccional").html(paciente.Seccional);
                //$("#Cod_OS").val(paciente.OSId);
                if (paciente.Nro_Seccional == 998) {
                    //$("#cbo_ObraSocial").show();
                    //$("#cboSeccional").hide();
                    $("#span_TituloSeccional").html("Ob. Social: ");
                    $("#span_Seccional").html(paciente.ObraSocial);
                }

                $("#cbo_seccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

                Cargar_Paciente_Info();

                //VerificarPMI(paciente.documento);


                //Verifico si esta en el padron 10.0.0.1
                $("#SpanCargando").show();
                $("#btnVencimiento").hide();
                //EstaVendico($("#txt_dni").val());

                UltimoAporte_OK();
                $("#btnActualizarDatos").show();

            });
        }
        else if (paciente.length > 1 && $("#afiliadoId").val().length == 0) {
            //$("#txtdocumento").val($("#txt_dni").val());
            BuscarPacientes_fancy();
            $("#txtPaciente").focus();
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
        $(".container").fadeOut(100);
        $("#DatoTurno").fadeIn(200);
    });


    $("#btnActualizarDatos").click(function () {
        var json = JSON.stringify({ "PacienteId": Afiliado_Id, "Email": $("#txt_Email").val(), "Telefono": $("#txt_telefono").val(), "Celular": $("#txt_celular").val(), "Seccional": $("#cbo_seccional").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/Actualizar_Paciente_Info",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                $("#span_Email").html($("#txt_Email").val());
                $("#span_Celular").html($("#txt_celular").val());
                $("#span_Telefono").html($("#txt_telefono").val());
                $("#span_Seccional").html($("#cbo_seccional :selected").text());
                ActualizarMensaje("Actualización", "Los datos del paciente han sido actualizados.");
            },
            error: errores
        });
    });


    function Cargar_Paciente_Info() {
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
                $('#txt_celular').val(dato.Celular);

                $("#span_Celular").html(dato.Celular);
                $("#span_Email").html(dato.Email);

                if ($('#txt_Email').val() == "" || $('#txt_telefono').val() == "" || $('#txt_celular').val() == "") {
                    ActualizarMensaje("Datos paciente", "Revise los datos del paciente, Email, teléfono, celular.");
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
    
    function CargarCodTurno() {
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
                //LimpiarDatos();
                var dato = Resultado.d;

                //if (dato.TurnoHoy == false) {
                //    ActualizarMensaje("Hoy no es el día", "Revise la fecha del turno, ya que no es la del día de hoy.");
                //    return;
                //}

                //if (dato.IMG_TURNO_BONO_ID == null) {
                //    ActualizarMensaje("No posee bono", "Este paciente no posee bono vinculado con el turno, o el bono ha sido cancelado.");
                //    $("#div_relacionar").show();
                //    $("#txt_cod_barra").attr('disabled', 'disabled');                        
                //    return;
                //}

                if (dato.IMG_TURNO_PACIENTE_ID == 0) {
                    ActualizarMensaje("Turno No Encontrado", "El turno con el código de barra ingresado no se encuentra en el sistema.");
                    return;
                }


                //RevisarBono($("#txt_cod_barra").val());

                $("#DivTurnoMedico").show();
                //$("#txt_cod_barra").attr('disabled', 'disabled');

                var arr = (dato.IMG_TURNO_FECHA).split("/");
                d_dia = arr[0];
                d_mes = arr[1];
                d_anio = arr[2];



                $("#span_DivTurnoMedico_Fecha").html(pad_with_zeroes(d_dia, 2) + "/" + pad_with_zeroes(d_mes, 2) + "/" + d_anio);

                $("#span_DivTurnoMedico_Fecha").html($("#span_DivTurnoMedico_Fecha").html() + " " + dato.IMG_TURNO_HORA_INICIO);
                $("#span_DivTurnoMedico_Paciente").html(dato.Paciente);
                $("#span_DivTurnoMedico_NHC").html(dato.HC_UOM_CENTRAL);

                //CargarListaDePracticas(dato.IMG_TURNO_ESPECIALIDAD);

                $("#span_DivTurnoMedico_Especialidad").html(dato.Especialidad);
                $("#span_DivTurnoMedico_Medico").html(dato.Medico);

                $("#span_DivTurnoMedico_resumen").html("");

                if (dato.IMG_TURNO_ESTADO >= 2) {
                    $("#botonera_atencion").show();
                }
                else {
                    $("#botonera_atencion").hide();
                }

                if (dato.IMG_TURNO_ESTADO == -1) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<b>Estado:</b> <span class='cancelado badge'>Cancelado</span>"); }
                if (dato.IMG_TURNO_ESTADO == 1) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<b>Estado:</b> <span class='ocupado badge' style='color:Gray;'>Turno</span>"); }
                if (dato.IMG_TURNO_ESTADO == 2) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<b>Estado:</b> <span class='recepcionado badge'>Recepcionado</span>"); }
                if (dato.IMG_TURNO_ESTADO == 3) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<b>Estado:</b> <span class='llamado badge' style='color:Gray;'>Llamado</span>"); }
                if (dato.IMG_TURNO_ESTADO == 4) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<b>Estado:</b> <span class='ausente badge'>Ausente</span>"); }
                if (dato.IMG_TURNO_ESTADO == 5) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<b>Estado:</b> <span class='enconsultorio badge'>En consultorio</span>"); }
                if (dato.IMG_TURNO_ESTADO == 6) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<b>Estado:</b> <span class='atendido badge'>Atendido</span>"); }
                if (dato.IMG_TURNO_ESTADO == 7) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<b>Estado:</b> <span class='noatendido badge'>No Atendido</span>"); }

                $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<span style='display:inline-block; width: 13px;'></span>");

                if (dato.IMG_TURNO_SOBRETURNO) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<span class='badge'>SobreTurno</span>"); }
                if (dato.IMG_TURNO_FORZADO) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<span class='badge'>Turno Forfado</span>"); }
                if (dato.IMG_TURNO_X_EMAIL) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<span class='badge'>Turno x Email</span>"); }

                if (dato.IMG_TURNO_ESTADO >= 5 || dato.IMG_TURNO_ESTADO <= -1) { $("#btn_llamar").hide(); $("#btn_ausente").hide(); }
                else { $("#btn_llamar").show(); $("#btn_ausente").show(); }

                if (dato.IMG_TURNO_ESTADO == 6) { $("#btn_atendido").click(); }
                if (dato.IMG_TURNO_ESTADO == 7) { $("#btn_noatendido").click(); }

                if (dato.IMG_TURNO_ESTADO > 6 || dato.IMG_TURNO_ESTADO <= -1) { $("#btn_enconsultorio").hide(); }
                else { $("#btn_enconsultorio").show(); }


                //if (dato.IMG_TURNO_ESTADO >= 2 || dato.IMG_TURNO_ESTADO <= -1) { $("#btn_Recepcionar").hide(); }
                //else { $("#btn_Recepcionar").show(); }

                $("#span_DivTurnoMedico_resumen_practicas").html("");

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
                        //$("#txt_practica_id").val("");
                        //$("#cbo_practica_nombre").val("0");
                        $("#span_DivTurnoMedico_resumen_practicas").html("");
                        $.each(Datos, function (index, dato) {
                            $("#span_DivTurnoMedico_resumen_practicas").html($("#span_DivTurnoMedico_resumen_practicas").html() + dato.PracticaCodigo + " - " + dato.PracticaNombre + "<br/>");
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

    $("#btn_elimiar_turno").click(function () {
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
                setTimeout(function () { ImprimirEtiqueta(Id); }, 1000);
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


    $("#btn_ver_escaneado").click(function () {

        var json = JSON.stringify({
            "TurnoId": TurnoId
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/H2_IMG_ESCANEAR_CARGAR",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Auxi = "";
                var Datos = Resultado.d;
                $.each(Datos, function (index, dato) {
                    Auxi = Auxi + "<div style='overflow:auto; max-height:400px;'><div style='border:1px; border-style:solid;margin-bottom:20px;'><a href='http:\\\\10.10.8.71\\" + dato.Archivo + "' target='_blank'><img src='http:\\\\10.10.8.71\\" + dato.Archivo + "' style='width:460px;'/></a></div></div";
                });
                ActualizarMensaje("Escaneado", Auxi);
            },
            error: errores
        });

    });



    function OpcionesPostTurno() {
        ActualizarMensaje("Opciones", "<span><a id='opc_escanear' class='btn btn-info'>Escanear</a></span> <span><a id='opc_imprimir' class='btn btn-info'>Imprimir</a></span> <span><a id='opc_turnonuevo' class='btn btn-info' href='Turno.aspx'>Turno Nuevo</a></span> <span><a id='opc_continuar' class='btn btn-info'>Continuar con Paciente</a></span>");
    }


    $("#opc_escanear").live("click", function () {
        $("#Turno_btn_escanear").click();
    });

    $("#opc_imprimir").live("click", function () {
        Imprimir(TurnoId);
    });

    $("#opc_continuar").live("click", function () {
        $("#Mensaje_btn_Aceptar").click();
    });


    $("#btn_DivTurnoMedico_Cancelar").click(function () {
        $("#DivTurnoMedico").hide();
        ActualizarListadoPacientes();
    });

    function OcultarCargaDatos() {
        $("#DivTemplate").hide();
    }



    $("#btn_buscar").click(function(){
        CargarTurnos("tbody_turnos_dia", false, $("#txt_desde").val(), $("#txt_hasta").val(), $("#cbo_especialidad").val(), $("#cbo_medico").val(), $("#cbo_tipoorden").val(), $("#txt_nhc").val(), $("#txt_paciente").val(), $("#txt_documento").val(), $("#txt_horainicio").val(), $("#txt_horafin").val());
    });


    

    //$("#btn_noatendido").click(function () { MostrarTemplateNoAtencion(); });

    //parent.document.getElementById("DondeEstoy").innerHTML = "Turnos (IMG) > <strong>Pedido de Turno</strong>";



    function VerEscaneado(TurnoId) {
        var json = JSON.stringify({
            "TurnoId": TurnoId
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/H2_IMG_ESCANEAR_CARGAR",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Auxi = "";
                var Datos = Resultado.d;
                $.each(Datos, function (index, dato) {
                    Auxi = Auxi + "<div style='overflow:auto; max-height:400px;'><div style='border:1px; border-style:solid;margin-bottom:20px;'><a href='http:\\\\10.10.8.71\\" + dato.Archivo + "' target='_blank'><img src='http:\\\\10.10.8.71\\" + dato.Archivo + "' style='width:460px;'/></a></div></div";
                });
                ActualizarMensaje("Escaneado", Auxi);
            },
            error: errores
        });
    };


//    setInterval(function () {
//        if ($("#cbo_especialidad").val() != 0 && $("#cbo_medico").val() != 0) {
//            console.log("Se actualizo...");
//            ActualizarListadoPacientes();
//        }
//    }, 60000);


    function EditarTurno(TurnoId) {
        parent.CargarTurnodesdeBusqueda(TurnoId);
    }

    if (!BuscarDesdeTurnos) {
        parent.document.getElementById("DondeEstoy").innerHTML = "Imagenes > <strong>Listado de turnos</strong>";
    }


    $("#btn_imprimir").click(function () {
        var E = $("#cbo_especialidad").val();
        var M = $("#cbo_medico").val();
        var DI = $("#txt_desde").val();
        var DF = $("#txt_hasta").val();
        var TO = $("#cbo_tipoorden").val();
        var NHC = $("#txt_nhc").val();
        var P = $("#txt_paciente").val();
        var D = $("#txt_documento").val();
        var HI = $("#txt_horainicio").val();
        var HF = $("#txt_horafin").val();

        if (NHC == "") { NHC = "%20" }
        if (P == "") { P = "%20" }
        if (D == "") { D = "%20&" }

        var pagina = "../Impresiones/Impresiones_IMG/IMG_Impresion_ListadoTurnos.aspx?E=" + E + "&M=" + M + "&DI=" + DI + "&DF=" + DF + "&TO=" + TO + "&NHC=" + NHC + "&P=" + P + "&D=" + D + "&HI=" + HI + "&HF=" + HF;

        $.fancybox(
        {
            'autoDimensions': false,
            'href': pagina,
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {

            }
        });

    });
</script>

</html>
