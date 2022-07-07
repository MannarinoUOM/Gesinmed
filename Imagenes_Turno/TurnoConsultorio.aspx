<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TurnoConsultorio.aspx.cs" Inherits="Imagenes_Turno_TurnoConsultorio" %>

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

tr {border: 1px solid black}

.Amarillo {background-color:Yellow;}
.Links {margin-right:5px;}
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
                Médico: <span id="span_medico"><select id="cbo_medico"></select></span>                
                <a class="btn btn-success" id="btn_turno_forzado" style="display:none;">Turno Forzado</a>
                <a class="btn btn-info" style="display:none;" href="TurnoConsultorio.aspx">Turno Nuevo</a>
            </div>

            <div class="Contenedor_Info_Medico">                
                <span style="background-color:White;color:Gray;" class="todos badge manito" onclick="VerLista(0);">Todos</span>
                <span class="ocupado badge manito" style="color:Gray;" onclick="VerLista(1);">Ocupado</span>
                <span class="sobreturno badge manito" onclick="VerLista(2);">Sobreturno</span>
                <span class="cancelado badge manito" onclick="VerLista(3);">Rechazado</span>
                <span class="forzado badge manito" onclick="VerLista(4);">Forzado</span>

                <span class="recepcionado badge manito" style="color:Gray;" onclick="VerLista(5);">Recepcionado</span>
                <span class="llamado badge manito" style="color:Gray;" onclick="VerLista(6);">Llamado</span>
                <span class="ausente badge manito" onclick="VerLista(7);">Ausente</span>
                <span class="enconsultorio badge manito" style="color:Gray;" onclick="VerLista(8);">En consultorio</span>
                <span class="atendido badge manito" onclick="VerLista(9);">Atendido</span>
                <span class="noatendido badge manito" onclick="VerLista(10);">No Atendido</span>
            </div>


            <div class="Contenedor_Turnos">
                <div class="Turnos_Izquierdo">
                    <div class="Texto_Centrado">
                    Fecha: <input type="text" id="txt_fecha_almanaque" style="width:78px;" />
                    Usuario: <select id="cbo_usuario"></select>                                        
                    <img class="manito" onclick="ActualizarListadoPacientes();" src="update.png" style="width: 25px;margin-bottom: 6px;" /></div>
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
                            <th>Com </th>
                            <th>Hora </th>
                            <th>Arribo </th>
                            <th>Inicio </th>
                            <th>Usuario </th>
                            <th>Fin </th>
                            <th>Usuario </th>
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

            <a class="btn btn-success" style="display:none;" id="Mensaje_SeAtendio">Si</a>
            <a class="btn btn-danger" style="display:none;" id="Mensaje_NoSeAtendio">No</a>
         </div>
         <div style="clear:both;"></div>
    </div>
</div>






<div id="DM_DIV" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="DM_TITULO" style="text-align:center; font-size:21px; padding-top:10px;">MODALIDAD</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="DM_CONTENIDO">           
            Elija una Modalidad:<br />            
            <div>
                <a class="btn" onclick="jModalidad(1)">CR</a>
                <a class="btn" onclick="jModalidad(2)">DX</a>
                <a class="btn" onclick="jModalidad(3)">SE</a>
            </div>
         </div>
         <hr />
         <div style="float:right; margin-right:10px;">            
            <a class="btn btn-danger" id="BTN_DM_CANCELAR">Cancelar</a>            
         </div>
         <div style="clear:both;"></div>
    </div>
</div>









<div id="INSUMO_DIV" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div style="text-align:center; font-size:21px; padding-top:10px;">Insumos Utilizados</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;">
            <div style="max-height:196px; overflow:auto;">
            <table class="table table-condensed">
            <thead><tr><td></td><td>Insumo</td><td>Cantidad</td></tr></thead>            
            <tbody id="tabla_insumos_div">
                
            </tbody>
            </table>
            </div>

            <div style="margin-top: 14px;">
                <div id="div_insumos_filtro">
                <label style="display:inline-block;">Insumo</label><input id="txt_filtro_nombre" type="text" placeholder="Filtro" style="width: 96px;" /><select id="cbo_insumo" style="width: 312px;"></select><br />
                </div>
                <label style="display:inline-block;">Cantidad</label><input id="txt_cantidad" type="text" maxlength="3" style="width: 26px;" /><a class="btn btn-info" style="margin-bottom: 5px;margin-left: 10px" id="btn_agregar">Agregar</a>
                <a class="btn btn-danger" style="margin-bottom: 5px;margin-left: 5px" onclick="CancelarInsumosDiv();">Cancelar</a>                
            </div>
         </div>
         <hr />
         
         <div style="float:right; margin-right:10px;">                        
            <a class="btn btn-success" id="btn_guardar_insumos" style="margin-bottom: 5px;margin-left: 5px" onclick="GuardarInsumosDiv();">Guardar</a>
            <a class="btn btn-danger" style="margin-bottom: 5px;margin-left: 5px" onclick="CerrarInsumosDiv();">Cerrar</a>
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





<div id="CargaDeInforme_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:90%; height:80%; border-radius:5px;padding:10px;">
         <div id="CargaDeInforme_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Carga de informe</div>
         <hr />         
          
    <div style="display:block;">

    <div><b>Paciente:</b><span id="divinfo_paciente"></span> &nbsp;&nbsp;&nbsp;&nbsp;<b>NHC:</b><span id="divinfo_nhc"></span></div>            
    <div><b>Especialidad:</b> <span id="divinfo_especialidad"></span>&nbsp;&nbsp;&nbsp;&nbsp;<b>Médico:</b> <span id="divinfo_medico"></span></div><br />            

    Médico que informa: <select id="cbo_Medico_Validar"></select>&nbsp;&nbsp;&nbsp;&nbsp;    
    Informe algún problema: <select id="cbo_problema"><option value="0"></option><option value="2">NO SE LE INDICÓ LA PREPARACIÓN</option><option value="1">MAL CARGADA LA ORDEN</option></select>            
    </div>
        
    <div>
        Plantilla: <select id="cbo_plantilla"></select><a class="btn" onclick="CargarPlantilla();" style="margin-bottom:5px;">Cargar Plantilla</a><br />
        <a class="btn" id="btn_informe_guardar" onclick="GuardarInforme();">Guardar</a>
        <a class="btn" onclick="CerrarInforme();">Cancelar</a>        
        <a class="btn btn-success" onclick="javascript:CargaInsumos();">Cargar Insumos</a>        
    </div>
    <div>        
        <textarea rows="15" cols="80" id="text_contenido"></textarea>
    </div>

         <hr />
         <div style="float:right; margin-right:10px;">            
         </div>
         <div style="clear:both;"></div>
    </div>
    </div>








<div id="DivTemplate" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:700px; min-height:165px; border-radius:5px;padding-bottom:10px; height: 500px;">
         <div id="DivTemplate_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Atención del paciente</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="DivTemplate_Datos">                       
            <div id="DivTemplate_Paciente">           
            
            <div><b>Paciente:</b><span id="span_DivTemplate_Paciente"></span> &nbsp;&nbsp;&nbsp;&nbsp;<b>NHC:</b><span id="span_DivTemplate_NHC"></span></div>
            <div><b>Fecha:</b><span id="span_DivTemplate_Fecha"></span></div>
            <div><b>Especialidad:</b> <span id="span_DivTemplate_Especialidad"></span><br /><b>Médico:</b> <span id="span_DivTemplate_Medico"></span></div><br />            
            <div style="max-height: 303px; overflow:auto;" id="DivTemplate_Contenido">
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
            <div id="Div_RecepcionarBono_Mensaje" style="overflow: auto;max-height: 100px;">           
                
            <div style="clear:both;"></div>            
            </div>
            <a id="btn_recepcionbono_cerrar" class="btn btn-danger">Cerrar</a>            
         </div>
         <hr />         
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



    </form>
</body>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/popper.min.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.validate.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/ObraSociales/ObraSociales.js" type="text/javascript"></script>
<script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>

<script src="../tinymce/jquery.tinymce.min.js" type="text/javascript"></script>
<script src="../tinymce/tinymce.min.js" type="text/javascript"></script>
<script src="../js/tooltip.js" type="text/javascript"></script>
<script>

    var Recepcionando = false;

    $("#txt_turno_forzado_hora").mask("99:99", { placeholder: "__:__" });
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
        "Desde": Dia,
        "Hasta": Dia,
        "Tipo": 0,
        
        "HNC": "",
        "Paciente": "",
        "Documento": "",
        "UsuarioID": $("#cbo_usuario").val()
        });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Imagenes/Imagenes.asmx/IMG_TURNO_CONSULTORIO_LISTAR_x_USUARIOID",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                LimpiarDatos();
                var lista = Resultado.d;
                //$("#" + Objeto).html(Resultado.d);
                var tabla = "";

                var e_todos = 0;
                var e_ocupado = 0;
                var e_sobreturno = 0;
                var e_cancelado = 0;
                var e_forzado = 0;
                var e_recepcionado = 0;
                var e_llamado = 0;
                var e_ausente = 0;
                var e_enconsultorio = 0;
                var e_atendido = 0;
                var e_noatendido = 0;

                $.each(lista, function (index, dato) {
                    //if (SoloTurnos) {
                    var urgencia = "";
                    if (dato.estado != "libre") {
                        if (dato.urgencia) {
                            urgencia = "Si";
                        }
                        e_todos++;
                        var estado = "";

                        if (dato.estado == "ocupado") { estado = "Turno"; e_ocupado++; }
                        if (dato.estado == "llamado") { estado = "Llamado"; e_llamado++; }
                        if (dato.estado == "forzado") { estado = "Forzado"; e_forzado++; }
                        if (dato.estado == "cancelado") { estado = "cancelado"; e_cancelado++; }
                        if (dato.estado == "recepcionado") { estado = "Recepcionado"; e_recepcionado++; }
                        if (dato.estado == "enespera") { estado = "Esperando"; e_ocupado++; }
                        if (dato.estado == "enconsultorio") { estado = "En Consultorio"; e_enconsultorio++; }
                        if (dato.estado == "noatendido") { estado = "No Atendido"; e_noatendido++; }
                        if (dato.estado == "atendido") { estado = "Atendido"; e_atendido++; }
                        if (dato.estado == "") { estado = ""; }

                        tabla = tabla + "<tr class='" + dato.estado + "  NOTIFICACION' data-motivo='" + dato.comentario + "' data-dia='" + dato.fecha + "' data-turno='" + dato.nro_turno + "' data-toggle='tooltip' data-placement='top' data-animation='fade' title='" + dato.NOTIFICACION + "'>";
                        //tabla = tabla + "<td><a onclick='Eliminar(" + dato.nro_turno + ", this)'>Eliminar</a> </td>";
                        //tabla = tabla + "<td><img onerror='imgErrorPaciente(this);' src='../img/Pacientes/" + dato.foto + "'/> </td>";


                        tabla = tabla + "<td><img onerror='imgErrorPaciente(this);' src='../fotoPerfil/" + dato.foto + "'/> </td>";

                        tabla = tabla + "<td>" + dato.tipo + " </td>";
                        tabla = tabla + "<td>" + dato.nro_turno + " </td>";
                        tabla = tabla + "<td>" + urgencia + " </td>";
                        tabla = tabla + "<td class='tabla_apellido'>" + dato.paciente + " </td>";
                        tabla = tabla + "<td>" + dato.documento + " </td>";
                        tabla = tabla + "<td class='tabla_nhc'>" + dato.nhc + " </td>";
                        tabla = tabla + "<td>" + dato.estudio + " </td>";
                        tabla = tabla + "<td>" + estado + "  </td>";

                        if (dato.escaneado != false || dato.adjunto == 1) {
                            tabla = tabla + "<td><a onclick='VerEscaneado(" + dato.nro_turno + ");'>Ver</a></td>";
                        }
                        else {
                            tabla = tabla + "<td></td>";
                        }

                        if (dato.comentario != "" && dato.comentario != null) {
                            tabla = tabla + "<td><a onclick='VerComentario(" + '"' + dato.comentario + '"' + ");'>Ver</a></td>";
                        }
                        else {
                            tabla = tabla + "<td></td>";
                        }

                        tabla = tabla + "<td>" + dato.hora_turno + "  </td>";
                        tabla = tabla + "<td>" + dato.arribo + "  </td>";
                        tabla = tabla + "<td>" + dato.inicio + "  </td>";
                        tabla = tabla + "<td>" + dato.usuario_inicio + "  </td>";
                        tabla = tabla + "<td>" + dato.fin + " </td>";
                        tabla = tabla + "<td>" + dato.usuario_fin + " </td>";

                        tabla = tabla + "<td>";
                        if (dato.estado_numero < 2 && dato.estado_numero >= 0) {
                            tabla = tabla + "<a href='javascript:ListarBonos(" + dato.nro_turno + ")' class='btn' title='Recepcionar'>R</a>";
                        }

                        //else {
                        //    tabla = tabla + "";
                        //}

                        //if (dato.estado_numero < 2 && dato.estado_numero >= 0) {
                        //    tabla = tabla + "<a href='javascript:ListarBonos(" + dato.nro_turno + ")' class='btn' title='Recepcionar'>R</a>";
                        //}

                        if (dato.estado_numero <= 4 && dato.estado_numero >= 2) {
                            var Llamar = true;
                            if (dato.tipo == "Internación") { Llamar = false; }
                            tabla = tabla + "<a class='btn' href='javascript:Llamar(" + dato.nro_turno + ", " + dato.PacienteId + ", " + Llamar + ")' title='Llamar'>L</a>";
                        }

                        //if (dato.estado_numero == 2 && dato.estado_numero) {                            
                        //    tabla = tabla + "<a class='btn' href='javascript:Rechazar(" + dato.nro_turno + ")' title='Rechazar'>X</a>";
                        //}

                        if (dato.estado_numero == 3) {
                            tabla = tabla + "<a class='btn btn-danger' href='javascript:Ausente(" + dato.nro_turno + ")' title='Ausente'>A</a>";
                        }




                        //else {
                        //    tabla = tabla + "<td></td>";
                        //}

                        if (dato.estado_numero < 5 && dato.estado_numero > 2 && dato.estado_numero != 4) {
                            tabla = tabla + "<a class='btn' href='javascript:Ingresar(" + dato.nro_turno + ")' title='Ingresar'>I</a>";
                        }
                        //                        else {
                        //                            tabla = tabla + "<td></td>";
                        //                        }

                        if (dato.estado_numero < 6 && dato.estado_numero > 3 && dato.estado_numero != 4) {
                            tabla = tabla + "<a class='btn' onclick='Egresar(" + dato.nro_turno + ", this)' title='Egresar'>E</a>";
                        }
                        else {
                            if (dato.estado_numero == 6) {
                                tabla = tabla + "<a class='btn' onclick='MostrarEgresoSolo(1," + dato.nro_turno + ", this)' title='Egresar'>E</a>";
                            }
                            else {
                                if (dato.estado_numero == 7)
                                { tabla = tabla + "<a class='btn' onclick='MostrarEgresoSolo(2," + dato.nro_turno + ", this)' title='Egresar'>E</a>"; }
                                //else {
                                //    tabla = tabla + "<td></td>";
                                //}
                            }
                        }

                        if (dato.estado_numero >= 2) {
                            tabla = tabla + "<a class='btn' href='javascript:ImprimirEtiqueta(" + dato.nro_turno + ")' title='Imprimir Etiqueta'>T</a>";
                        }

                        if (dato.estado_numero == 6 && ($("#cbo_especialidad").val() == "343" || $("#cbo_especialidad").val() == "354")) {
                            tabla = tabla + "<img src='LogoPdf.gif' onclick='javascript:ImprimirInforme(" + dato.nro_turno + ")' title='Imprimir Informe'/>";
                        }

                        tabla = tabla + "</td>";

                        tabla = tabla + "</tr>";
                    }
                    //tabla = tabla + "<tr class='" + dato.estado + "' data-motivo='" + dato.comentario + "' data-dia='" + dato.fecha + "' data-turno='" + dato.nro_turno + "'><td>" + dato.hora_turno + "</td><td>" + dato.paciente + "</td><td>" + dato.practicas + "</td></tr>";
                    //}

                    //     tabla = tabla + "<tr class='" + dato.estado + "' data-motivo='" + dato.comentario + "' data-dia='" + dato.fecha + "' data-turno='" + dato.nro_turno + "'><td>" + dato.hora_turno + "</td><td>" + dato.paciente + "</td><td>" + dato.practicas + "</td></tr>";
                    //}
                    //$('#cbo_especialidad').append($('<option>', { value: dato.Id, text: dato.Especialidad }));
                });
                $("#" + Objeto).html(tabla);

                var spanes = $('span');
                //var total = Number(cont_sininformar) + Number(cont_audio) + Number(cont_desgrabado) + Number(cont_corregido) + Number(cont_validado);
                spanes.filter('.todos').html("Todos (" + e_todos + ")");
                spanes.filter('.ocupado').html("Ocupado (" + e_ocupado + ")");
                spanes.filter('.sobreturno').html("Sobreturno (" + e_sobreturno + ")");
                spanes.filter('.cancelado').html("Rechazado (" + e_cancelado + ")");
                spanes.filter('.forzado').html("Forzado (" + e_forzado + ")");
                spanes.filter('.recepcionado').html("Recepcionado (" + e_recepcionado + ")");
                spanes.filter('.llamado').html("Llamado (" + e_llamado + ")");
                spanes.filter('.ausente').html("Ausente (" + e_ausente + ")");
                spanes.filter('.enconsultorio').html("En Consultorio (" + e_enconsultorio + ")");
                spanes.filter('.atendido').html("Atendido (" + e_atendido + ")");
                spanes.filter('.noatendido').html("No Atendido (" + e_noatendido + ")");
                VerLista(listando);
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

        RenderizarPracticasSeleccionadas();        
        return;
    }


    //$(".NOTIFICACION").live('hover', function () { alert($(this).data('notificacion')); });

    var TurnoId = 0;
    var HoraTurno = "";
    var Motivo = "";
    var Dia_Turno = "";
    var Hora_Turno = "";

    $("#tabla_turnos_dias").on("click", "trs", function () {
        TurnoId = $(this).data("turno");

        if (TurnoId == null) { return; }

        var json = JSON.stringify({ "Especialidad": $("#cbo_especialidad").val(), "Medico": $("#cbo_medico").val(), "Turno": TurnoId });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_TURNO_SIN_ATENDER_LISTADO",
            data: json, contentType: "application/json; charset=utf-8", dataType: "json", success: function (Resultado) {
                var Datos = Resultado.d;
                if (Datos == "") {
                    CargarCodTurno();
                }
                else {
                    SoloAceptar();
                    ActualizarMensaje("Pacientes sin atender", "Falta finalizar la atención del horario " + Datos + ".<br/> Si no la finaliza no podrá continuar llamando pacientes.");
                    return;
                }
            },
            error: errores
        });


    });

    $("#btn_llamar").click(function () { CambiarEstado(TurnoId, 3, true); });
    $("#btn_ausente").click(function () { CambiarEstado(TurnoId, 4, true); });
    $("#btn_enconsultorio").click(function () { CambiarEstado(TurnoId, 5, true); });
    $("#btn_atendido").click(function () { MostrarTemplateAtencion(); });
    $("#btn_noatendido").click(function () { MostrarTemplateNoAtencion(); });

    function MostrarTemplateAtencion() {
        $("#DivTurnoMedico").hide();
        //$("#DivTemplate").show();
        $("#span_DivTemplate_Paciente").html($("#span_DivTurnoMedico_Paciente").html());
        $("#span_DivTemplate_NHC").html($("#span_DivTurnoMedico_NHC").html());
        $("#span_DivTemplate_Fecha").html($("#span_DivTurnoMedico_Fecha").html());
        $("#span_DivTemplate_Especialidad").html($("#span_DivTurnoMedico_Especialidad").html());
        $("#span_DivTemplate_Medico").html($("#span_DivTurnoMedico_Medico").html());
        $("#DivTemplate_Titulo").html("Carga de datos");
        $("#DivTemplate_Contenido").load("temp_atendido.htm");                
    }

    function MostrarTemplateAtencion_Vacio() {
        $("#DivTurnoMedico").hide();
        $("#DivTemplate").show();        
        $("#DivTemplate_Titulo").html("Carga de datos");
        $("#DivTemplate_Contenido").load("temp_atendido.htm");        
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



    function CambiarEstado(TurnoID, Estado, VolveraCargar) {
        var json = JSON.stringify({ "TurnoId": TurnoID, "Estado": Estado });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMAGENES_TURNO_CAMBIARESTADO",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d > 0) {
                    //INGRESAR = 5
                    //ANTES DECIA 3 QUE ES CUANDO SE LLAMA EL TEMA ES QUE SE PUEDE LLAMAR Y EL PACIENTE NUNCA FUE, EL WORKLIST GENERA UN REGISTRO, SI EL PACIENTE VUELVE Y SE LO
                    //VUELVE A LLAMAR SE GENERA OTRO REGISTRO Y NO ESTARIA BUENO.


                    if (Resultado.d == "5") {
                        if ($("#cbo_especialidad").val() == "341" || $("#cbo_especialidad").val() == "356") {
                            //GuardarWorklistModalidad(TurnoID);
                            VerificarWorkListModalidad(TurnoID);
                        }
                        else {
                            //GuardarWorklist(TurnoID);
                            VerificarWorkList(TurnoID);
                        }
                        ActualizarListadoPacientes();
                    }
                    else {
                        if (VolveraCargar) {
                            ActualizarListadoPacientes();
                        }
                        $("#btn_DivTurnoMedico_Cancelar").click();
                    }
                }
                else {
                    if (Resultado.d == -1) {
                        //Si es -1 entonces lo rechaza
                        CancelarMotivo(TurnoID, $("#cbo_rechazar_motivos").val(), $("#txt_rechazar_motivo_otro").val());
                        ActualizarListadoPacientes();
                    }
                }
            },
            error: errores
        });
    }


    function ExisteWorkList(ELTurnoID) {
        var json = JSON.stringify({ "TurnoId": ELTurnoID });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_WORKLIST_EXISTE",
            data: json, contentType: "application/json; charset=utf-8", dataType: "json", success: function (Resultado) {
                console.log(Resultado);
                console.log(Resultado.d);
                if (Resultado.d) { alert("Si"); }
                if (Resultado) { alert("Si"); }
                return Resultado.d;
            },
            error: errores
        });
    }


    function VerificarWorkList(ELTurnoID) {

        var json = JSON.stringify({ "TurnoId": ELTurnoID });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_WORKLIST_EXISTE",
            data: json, contentType: "application/json; charset=utf-8", dataType: "json", success: function (Resultado) {
                if (!Resultado.d) {
                    GuardarWorklist(ELTurnoID);
                }
                else {
                    ActualizarMensaje("Datos No transmitidos", "Los datos del paciente ya habian sido enviados anteriormente, NO se han vuelto a enviar.");
                }
            },
            error: errores
        });             
    }

    function VerificarWorkListModalidad(ELTurnoID) {
        //if (!ExisteWorkList(ELTurnoID)) {
        //    GuardarWorklistModalidad(ELTurnoID);
        //} else {
        //    ActualizarMensaje("Datos No transmitidos", "Los datos del paciente ya habian sido enviados anteriormente, NO se han vuelto a enviar.");
        //}

        var json = JSON.stringify({ "TurnoId": ELTurnoID });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_WORKLIST_EXISTE",
            data: json, contentType: "application/json; charset=utf-8", dataType: "json", success: function (Resultado) {
                if (!Resultado.d) {
                    GuardarWorklistModalidad(ELTurnoID);
                }
                else {
                    ActualizarMensaje("Datos No transmitidos", "Los datos del paciente ya habian sido enviados anteriormente, NO se han vuelto a enviar.");
                }
            },
            error: errores
        });             
    }
    
    function GuardarWorklistModalidad(ELTurnoID) {
        var json = JSON.stringify({ "TurnoId": ELTurnoID, "Modalidad": Modalidad });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_WORKLIST_MODALIDAD_GUARDAR",
            data: json, contentType: "application/json; charset=utf-8", dataType: "json", success: function (Resultado) {
                Modalidad = "";
                ModadlidadTurno = "";
                SoloAceptar();
                ActualizarMensaje("Datos transmitidos", "Los datos del paciente han sido enviados al equipo.");
            },
            error: errores
        });
    }

    function GuardarWorklist(ELTurnoID) {
        var json = JSON.stringify({ "TurnoId": ELTurnoID });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_WORKLIST_GUARDAR",
            data: json, contentType: "application/json; charset=utf-8", dataType: "json", success: function (Resultado) {
                SoloAceptar();
                ActualizarMensaje("Datos transmitidos","Los datos del paciente han sido enviados al equipo.");
            },
            error: errores
        });
    }



    $("#tabla_turnos_diass").on("click", "tr", function () {

        Recepcionando = false;
        $("#Turno_btn_escanear").hide();
        $("#Turno_btn_imprimir").hide();        
        $("#btn_ver_escaneado").hide();
        $("#Turno_btn_eliminarturno").hide();        
        
        TurnoId = $(this).data("turno");

        if (TurnoId == 0 && obj_Paciente.PacienteId == null) {
            IrACargaPaciente();
            SoloAceptar();
            ActualizarMensaje("Falta Paciente", "Falta cargar los datos del paciente.");
            return;
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
        }
        else {

            if (TurnoId == "0") {
                HoraTurno = $(this).text().substring(0, 5);
                if ($(this).hasClass("cancelado")) {
                    $("#Mensaje_btn_turno_forzado").show();
                    SoloAceptar();
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


        $("#btn_ver_escaneado").show();// este noo cambia
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

    $("#Mensaje_btn_Aceptar").click(function () { $("#Mensaje_Div").hide(); $("#Mensaje_SeAtendio").hide(); $("#Mensaje_NoSeAtendio").hide(); $("#Mensaje_btn_Aceptar").show(); });
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

    $("#btn_turno_forzado").click(function () {
        Recepcionando = false;
        $("#Turno_btn_escanear").hide();
        $("#Turno_btn_imprimir").hide();        
        $("#btn_ver_escaneado").hide();
        $("#Turno_btn_eliminarturno").hide();
        if (TurnoId == 0 && obj_Paciente.PacienteId == null) {
            IrACargaPaciente();
            SoloAceptar();
            ActualizarMensaje("Falta Paciente", "Falta cargar los datos del paciente.");
            return;
        }

        $("#span_paciente").html("");
        $("#txt_turno_forzado_fecha").val("");
        $("#txt_turno_forzado_hora").val("");
        LimpiarDatos();
        $("#Turno_Titulo").html("Turno Forzado");
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
        $.each(Array_Turno_Practicas, function (i) {
            if (Array_Turno_Practicas[i].Eliminado == 0 && Array_Turno_Practicas[i].PracticaId == Practica_Id) {                
                encontrada = true;
            }
        });

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
            SoloAceptar();
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

    function QuitarPracticadeLista(Practica_Id){
        $.each(Array_Turno_Practicas, function (i) {            
            if (Array_Turno_Practicas[i].PracticaId == Practica_Id) {
                Array_Turno_Practicas[i].Eliminado = 1;
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
        if (!encontrado) { SoloAceptar(); ActualizarMensaje("Práctica No Encontrada", "No se ha encontrado la práctica con el código " + Practica_Id + ", verifique esa práctica y si corresponde a la especialidad seleccionada."); }
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
        if ($("#cbo_especialidad").val() != "0") {
            $("#span_turno_forzado_especialidad").html($("#cbo_especialidad :selected").text());
            Cargar_Medicos_por_Especialidad($("#cbo_especialidad :selected").val(), "A");
            CargarListaDePracticas($("#cbo_especialidad :selected").val());
            $("#tbody_turnos_dia").empty();
        }
        else {
            $("#span_turno_forzado_especialidad").html("");
            $('#cbo_medico').empty();
            $("#tbody_turnos_dia").empty();
        }
    });


    function CargarListaDePracticas(EspecialidadId) {
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


    var Array_Practicas = Array()
    function Practicas_Listadas(Resultado) {
        Array_Practicas = [];        
        $("#cbo_practica_nombre").empty();
        var lista = Resultado.d;
        $('#cbo_practica_nombre').append($('<option>', { value: 0, text: "" }));
        $.each(lista, function (index, dato) {
                var Objeto_Practicas = {}
                Objeto_Practicas.Practica_Nombre = dato.PracticaNombre;
                Objeto_Practicas.Practica_Id = dato.PracticaCodigo;
                Objeto_Practicas.PracticaDuracion = dato.PracticaDuracion;
                $('#cbo_practica_nombre').append($('<option>', { value: dato.PracticaCodigo, text: dato.PracticaNombre }));
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
        $('#cbo_medico').append('<option value="0">Médicos</option>');
        $.each(Medicos, function (index, medicos) {            
                $('#cbo_medico').append($('<option></option>').val(medicos.Id).html(medicos.Medico));
            });        
    }



    $("#cbo_medico").change(function () {
        ActualizarListadoPacientes();
    });

    function ActualizarListadoPacientes() {
        SoloAceptar();
        if ($("#cbo_especialidad").val() == "0" || $("#cbo_medico").val() == "0") {            
            ActualizarMensaje("Revise los datos", "No se pueden mostrar la grilla de turnos, seleccione una especialidad y/o un médico.");
            return;
        }

        if ($("#cbo_medico").val() != "0") {
            $("#span_turno_forzado_medico").html($("#cbo_medico :selected").text());                        

            CargarTurnos("tbody_turnos_dia", false, diasmostrar[7], $("#cbo_especialidad").val(), $("#cbo_medico").val());            

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

        var PacienteLargo = $('#span_Paciente').text().length;

        if (!Recepcionando) {
            if (TurnoId == 0) {
                if (obj_Paciente.PacienteId == null || PacienteLargo == 0) {
                    IrACargaPaciente();
                    SoloAceptar();
                    ActualizarMensaje("Falta Paciente", "Falta cargar los datos del paciente.");
                    return;
                }
            }
        }
        

        var MinutosFijos = false;
        var SobreTurno = false;
        var TurnoForzado = false;


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
        "TurnoXEmail": TurnoXEmail
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
                    if (!Recepcionando) {
                        LimpiarDatos();
                        ActualizarListadoPacientes();
                        $("#Turno_btn_cancelar").click();
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
            SoloAceptar();
            ActualizarMensaje("Error","No se ha podido guardar el turno");
        }     
    }





    function errores(msg) {
        SoloAceptar();
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

    function SoloAceptar() {
        $("#Mensaje_SeAtendio").hide();
        $("#Mensaje_NoSeAtendio").hide();
        $("#Mensaje_btn_Aceptar").show();
    }

    function ValidarHora(str) {
        SoloAceptar();
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
                    SoloAceptar();
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
            SoloAceptar();
            ActualizarMensaje("Paciente no encontrado", "No se ha encontrado el paciente.");
            return;
        }

        $("#btn_turno_forzado").show();
        
        if (Paciente.length == 1) {

            $.each(Paciente, function (index, paciente) {

                if (paciente.Vencido) {
                    SoloAceptar();
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
                SoloAceptar();
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
                    SoloAceptar();
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

    function CargarCodTurno(){
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
                        SoloAceptar();
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

                    if (dato.IMG_TURNO_ESTADO == -1) { $("#span_DivTurnoMedico_resumen").html($("#span_DivTurnoMedico_resumen").html() + "<b>Estado:</b> <span class='cancelado badge'>Rechazado</span>"); }
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
                //window.location.href = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
            }
        });
    }

    $("#Turno_btn_eliminarturno").click(function () {
        $("#Turno_btn_eliminarturno").hide();
        $("#span_pregunta_eliminar").show();
    });

    $("#btn_ver_escaneado").click(function () {
        //alert();
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
                    SoloAceptar();
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
                    if (Resultado.d) {
                        $("#div_relacionar").hide();
                        $("#txt_cod_barra").removeAttr('disabled');
                        $("#Div_RecepcionarBono").hide();
                        //CargarCodTurno();
                    }
                },
                error: errores
            });

        }
        else {
            SoloAceptar();
            ActualizarMensaje("Faltan datos","Falta cargar el Código del turno y/o Código del bono.");
        }

    }


    $("#btn_DivTurnoMedico_Cancelar").click(function () {
        $("#DivTurnoMedico").hide();
        ActualizarListadoPacientes();
    });

    function OcultarCargaDatos() {
        TurnoCargado = 0;
        $("#DivTemplate").hide();
    }

    function CargaInsumos() {
        TraerDatos();        
    }

    function MostrarParteAnestesia() {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Quirofano/PlanillaAnestesia.aspx?NHC=' + $('#span_DivTemplate_NHC').html() + '&cirugiaId=' + TurnoId + '&tipo=3', // planilla nueva,
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

    function GuardarCargaDatos() {
        var temp_comentario = $("#txt_temp_eco_comentario").val();
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
                    if (Resultado.d) {
                        $("#div_relacionar").hide();
                        $("#txt_cod_barra").removeAttr('disabled');
                        CargarCodTurno();
                    }
                },
                error: errores
            });
        }
        else {
            SoloAceptar();
            ActualizarMensaje("Faltan datos", "Falta cargar el Código del turno y/o Código del bono.");
        }
    }


    
    function ListarBonos(Turno) {        
        
        var tabla = "";

        var json = JSON.stringify({
            "Turno": Turno
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_TURNO_CONSULTORIO_LISTAR_BONO",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $.each(lista, function (index, dato) {
                    tabla = tabla + "<a href='javascript:RecepcionarBono(" + dato.Bono_Id + ", " + Turno + ")'>" + dato.Bono_Id + " [" + dato.Fecha + "]</a></br>";
                });
                $("#Div_RecepcionarBono_Mensaje").html(tabla);
            },
            error: errores
        });                          

        $("#Div_RecepcionarBono").show();                      

    }

    function RecepcionarBono(Bono, Turno) {
        var json = JSON.stringify({
            "Turno": Turno,
            "BonoId": Bono
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/H2_IMG_BONO_USAR",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var estado = Resultado.d;
                if (estado == "true" || estado == true) {
                    CambiarEstado(Turno, 2, true);
                    $("#Div_RecepcionarBono").hide();
                }

            },
            error: errores
        });       
    }


    $("#btn_recepcionbono_cerrar").click(function () {
        $("#Div_RecepcionarBono").hide();
    });

    function Llamar(Turno, PacienteId, Llamar) {

        if (!Llamar) {
            TurneraLlamar(PacienteId);
        }

        var json = JSON.stringify({ "Especialidad": $("#cbo_especialidad").val(), "Medico": $("#cbo_medico").val(), "Turno": Turno });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_TURNO_SIN_ATENDER_LISTADO",
            data: json, contentType: "application/json; charset=utf-8", dataType: "json", success: function (Resultado) {
                var Datos = Resultado.d;
                if (Datos == "") {
                    CambiarEstado(Turno, 3, true);
                }
                else {
                    SoloAceptar();
                    ActualizarMensaje("Pacientes sin atender", "Falta finalizar la atención del horario " + Datos + ".<br/> Si no la finaliza no podrá continuar llamando pacientes.");
                    return;
                }
            },
            error: errores
        });        
    }

    var TurnoaRechazar = 0;
    function Rechazar(Turno) {
        $("#Rechazar_Div").show();
        TurnoaRechazar = Turno;
    }

    function Ausente(Turno) {
        CambiarEstado(Turno, 4, true);
    }


    var ModadlidadTurno = 0;
    function Ingresar(Turno) {
        if ($("#cbo_especialidad").val() == "341" || $("#cbo_especialidad").val() == "356") {
            ModadlidadTurno = Turno;
            $("#DM_DIV").show();        
        }
        else {
            CambiarEstado(Turno, 5, true);
        }        
    }



    function MostrarEgresoSolo(Cual, Turno, este) {
        //alert($("#afiliadoId").val());
        TurnoId = Turno;
        //343 = ECOGRAFIA
        //354 = ECODOPPLER
        if ( $("#cbo_especialidad :selected").val() == "343" || $("#cbo_especialidad :selected").val() == "354" ) {
            TurnoCargado = Turno;
            //Cargar_Titulo();
            Cargar_Titulo_x_Medico();
            $("#DivTurnoMedico").hide();
            CargarInformeRapido(Turno);
        }
        else
        {
            if (Cual == 1) {
                    //Esto es para el no ATENDIDO
                    $("#span_DivTemplate_Paciente").html($(este).parents("tr").find(".tabla_apellido").html());
                    $("#span_DivTemplate_NHC").html($(este).parents("tr").find(".tabla_nhc").html());
                    $("#span_DivTemplate_Fecha").html($("#txt_fecha_almanaque").val());
                    $("#span_DivTemplate_Especialidad").html($("#cbo_especialidad :selected").text());
                    $("#span_DivTemplate_Medico").html($("#cbo_medico :selected").text());
                    MostrarTemplateAtencion_Vacio();
            } else {
                    //Esto es para Atendido
                    $("#span_DivTemplate_Paciente").html($(este).parents("tr").find(".tabla_apellido").html());
                    $("#span_DivTemplate_NHC").html($(este).parents("tr").find(".tabla_nhc").html());
                    $("#span_DivTemplate_Fecha").html($("#txt_fecha_almanaque").val());
                    $("#span_DivTemplate_Especialidad").html($("#cbo_especialidad :selected").text());
                    $("#span_DivTemplate_Medico").html($("#cbo_medico :selected").text());
                    MostrarTemplateNoAtencion_Vacio();
            }
        }
    }



    var PacAtender = "";
    function Egresar(Turno, este) {
        TurnoId = Turno;
        TurnoCargado = Turno;
        //MostrarTemplateAtencion();        
        
        //return;
        PacAtender = este;
        $("#Mensaje_SeAtendio").show();
        $("#Mensaje_NoSeAtendio").show();
        $("#Mensaje_btn_Aceptar").hide();
        
        ActualizarMensaje("Finalizar atención", "¿Se ha realizado el estudio al paciente " + $(este).parents("tr").find(".tabla_apellido").html() + " ?.");
        
//        var r = confirm("¿Se ha atendido el paciente " + $(este).parents("tr").find(".tabla_apellido").html() + " ? \n\nPulse 'ACEPTAR' para finalizar la atención satisfactoriamente.\n\nPulse 'CANCELAR' para indicar que por alguna razón no se ha podido realizar el estudio.");
//        if (r == true) {
//            $("#span_DivTemplate_Paciente").html($(este).parents("tr").find(".tabla_apellido").html());
//            $("#span_DivTemplate_NHC").html($(este).parents("tr").find(".tabla_nhc").html());
//            $("#span_DivTemplate_Fecha").html($("#txt_fecha_almanaque").val());
//            $("#span_DivTemplate_Especialidad").html($("#cbo_especialidad").val());
//            $("#span_DivTemplate_Medico").html($("#cbo_medico").val());

//            MostrarTemplateAtencion_Vacio();
//        } else {

//            $("#span_DivTemplate_Paciente").html($(este).parents("tr").find(".tabla_apellido").html());
//            $("#span_DivTemplate_NHC").html($(este).parents("tr").find(".tabla_nhc").html());
//            $("#span_DivTemplate_Fecha").html($("#txt_fecha_almanaque").val());
//            $("#span_DivTemplate_Especialidad").html($("#cbo_especialidad").val());
//            $("#span_DivTemplate_Medico").html($("#cbo_medico").val());

//            MostrarTemplateNoAtencion_Vacio();
//        }
    }
        
    //$("#btn_noatendido").click(function () { MostrarTemplateNoAtencion(); });

    parent.document.getElementById("DondeEstoy").innerHTML = "Imágenes > <strong>Pedido de Turno</strong>";

    function VerComentario(Comentario) {
        SoloAceptar();
        ActualizarMensaje("Comentario", Comentario);
    }


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
                        if (dato.esAdjunto == 1) {

                            var tipoEtiqueta = "";
                            var formato = dato.Archivo.substr(-3, dato.Archivo.length).toLowerCase();
                            if (formato == "pdf") { tipoEtiqueta = "embed"; } else { tipoEtiqueta = "img" }
                            Auxi = Auxi + "<div style='overflow:auto; max-height:400px;'><div style='border:1px; border-style:solid;margin-bottom:20px;'><a href='" + dato.Archivo + "' target='_blank'>VER ARCHIVO<" + tipoEtiqueta + "  onclick='mostrarPDF(" + dato.Archivo + ")'  src='" + dato.Archivo + "' style='width:460px;'/></a></div></div";
                        }

                        else { Auxi = Auxi + "<div style='overflow:auto; max-height:400px;'><div style='border:1px; border-style:solid;margin-bottom:20px;'><a href='http://gesinmed.policlinicocentral.org.ar/" + dato.Archivo + "' target='_blank'><img src='http://gesinmed.policlinicocentral.org.ar/" + dato.Archivo + "' style='width:460px;'/></a></div></div"; }

                    });
                SoloAceptar();
                ActualizarMensaje("Escaneado", Auxi);
            },
            error: errores
        });
    };

    function mostrarPDF(PDF) {alert(PDF);}


    function CargarInformeRapido(TurnoPracticaID) {
        var json = JSON.stringify({
            "TurnoPracticaID": TurnoPracticaID
        });

        tinymce.activeEditor.setContent("");
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_CARGARINFORME_RAPIDO",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Auxi = "";
                var dato = Resultado.d;
                $("#divinfo_paciente").html(dato.Paciente);
                $("#divinfo_nhc").html(dato.HC);
                $("#divinfo_especialidad").html(dato.Especialidad);
                $("#divinfo_medico").html(dato.Medico);
                $("#cbo_problema").val(dato.ProblemaID);
                $("#cbo_Medico_Validar").val(dato.MedicoInformaId);
                tinymce.activeEditor.setContent(dato.IMG_INFORME_TEXTO + "<br/>");
                $("#CargaDeInforme_Div").show();
            },
            error: errores
        });


    }









   
    setInterval(function () {
        if ($("#cbo_especialidad").val() != 0 && $("#cbo_medico").val() != 0) {            
            ActualizarListadoPacientes();
        }
    }, 60000);


    function Eliminar(turno, este) {
        var r = confirm("¿Desea eliminar de manera permamente el turno del paciente " + $(este).parents("tr").find(".tabla_apellido").html() +" ?");
        if (r == true) {
            var json = JSON.stringify({
                "TurnoId": turno
            });

            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/ElimiarTurno",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {                    
                        ActualizarListadoPacientes();                                                                
                },
                error: errores
            });
        }
    }


    function TurneraLlamar(PacienteId) { 
    var json = JSON.stringify({
        "MedicoId": $("#cbo_medico").val(),
        "Especialidad": $("#cbo_especialidad").val(),
        "NHC": PacienteId
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/LlamarTurnera",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {                
            },
            error: errores
        });
      }

    parent.document.getElementById("DondeEstoy").innerHTML = "Imagenes > <strong>Pacientes del Día (IMAGENES)</strong>";


    var listando = 0;
    function VerLista(Cual) {
        listando = Cual;
        var rows = $('table tr');
        var Ocupado = rows.filter('.ocupado');
        var Sobreturno = rows.filter('.sobreturno');
        var Cancelado = rows.filter('.cancelado');
        var Forzado = rows.filter('.forzado');
        var Recepcionado = rows.filter('.recepcionado');
        var Llamado = rows.filter('.llamado');
        var Ausente = rows.filter('.ausente');
        var Enconsultorio = rows.filter('.enconsultorio');
        var Atendido = rows.filter('.atendido');
        var NoAtendido = rows.filter('.noatendido');

        //0 todos
        if (Cual == 0) {
            Ocupado.show();
            Sobreturno.show();
            Cancelado.show();
            Forzado.show();
            Recepcionado.show();
            Llamado.show();
            Ausente.show();
            Enconsultorio.show();
            Atendido.show();
            NoAtendido.show();
        }

        //1 Ocupado
        if (Cual == 1) {
            Ocupado.show();
            Sobreturno.hide();
            Cancelado.hide();
            Forzado.hide();
            Recepcionado.hide();
            Llamado.hide();
            Ausente.hide();
            Enconsultorio.hide();
            Atendido.hide();
            NoAtendido.hide();
        }

        //2 Sobreturno
        if (Cual == 2) {
            Ocupado.hide();
            Sobreturno.show();
            Cancelado.hide();
            Forzado.hide();
            Recepcionado.hide();
            Llamado.hide();
            Ausente.hide();
            Enconsultorio.hide();
            Atendido.hide();
            NoAtendido.hide();
        }

        //3 Cancelado
        if (Cual == 3) {
            Ocupado.hide();
            Sobreturno.hide();
            Cancelado.show();
            Forzado.hide();
            Recepcionado.hide();
            Llamado.hide();
            Ausente.hide();
            Enconsultorio.hide();
            Atendido.hide();
            NoAtendido.hide();
        }

        //4 Forzado
        if (Cual == 4) {
            Ocupado.hide();
            Sobreturno.hide();
            Cancelado.hide();
            Forzado.show();
            Recepcionado.hide();
            Llamado.hide();
            Ausente.hide();
            Enconsultorio.hide();
            Atendido.hide();
            NoAtendido.hide();
        }

        //5 Recepcionado
        if (Cual == 5) {
            Ocupado.hide();
            Sobreturno.hide();
            Cancelado.hide();
            Forzado.hide();
            Recepcionado.show();
            Llamado.hide();
            Ausente.hide();
            Enconsultorio.hide();
            Atendido.hide();
            NoAtendido.hide();
        }

        //6 Llamado
        if (Cual == 6) {
            Ocupado.hide();
            Sobreturno.hide();
            Cancelado.hide();
            Forzado.hide();
            Recepcionado.hide();
            Llamado.show();
            Ausente.hide();
            Enconsultorio.hide();
            Atendido.hide();
            NoAtendido.hide();
        }

        //7 Ausente
        if (Cual == 7) {
            Ocupado.hide();
            Sobreturno.hide();
            Cancelado.hide();
            Forzado.hide();
            Recepcionado.hide();
            Llamado.hide();
            Ausente.show();
            Enconsultorio.hide();
            Atendido.hide();
            NoAtendido.hide();
        }

        //8 Enconsultorio
        if (Cual == 8) {
            Ocupado.hide();
            Sobreturno.hide();
            Cancelado.hide();
            Forzado.hide();
            Recepcionado.hide();
            Llamado.hide();
            Ausente.hide();
            Enconsultorio.show();
            Atendido.hide();
            NoAtendido.hide();
        }

        //9 Atendido
        if (Cual == 9) {
            Ocupado.hide();
            Sobreturno.hide();
            Cancelado.hide();
            Forzado.hide();
            Recepcionado.hide();
            Llamado.hide();
            Ausente.hide();
            Enconsultorio.hide();
            Atendido.show();
            NoAtendido.hide();
        }


        //10 NoAtendido
        if (Cual == 10) {
            Ocupado.hide();
            Sobreturno.hide();
            Cancelado.hide();
            Forzado.hide();
            Recepcionado.hide();
            Llamado.hide();
            Ausente.hide();
            Enconsultorio.hide();
            Atendido.hide();
            NoAtendido.show();
        }
    }


    $("#Mensaje_SeAtendio").click(function () {        
        //343 = ECOGRAFIA
        //354 = ECODOPPLER
        if ($("#cbo_especialidad :selected").val() == "343" || $("#cbo_especialidad :selected").val() == "354") {
            $("#Mensaje_Div").hide();
            //Cargar_Titulo();
            Cargar_Titulo_x_Medico();
            $("#DivTurnoMedico").hide();
            CargarInformeRapido(TurnoCargado);
        } else {
            $("#Mensaje_btn_Aceptar").click();
            $("#span_DivTemplate_Paciente").html($(PacAtender).parents("tr").find(".tabla_apellido").html());
            $("#span_DivTemplate_NHC").html($(PacAtender).parents("tr").find(".tabla_nhc").html());
            $("#span_DivTemplate_Fecha").html($("#txt_fecha_almanaque").val());
            //$("#span_DivTemplate_Especialidad").html($("#cbo_especialidad").val());
            $("#span_DivTemplate_Especialidad").html($("#cbo_especialidad :selected").text());
            //$("#span_DivTemplate_Medico").html($("#cbo_medico").val());
            $("#span_DivTemplate_Medico").html($("#cbo_medico :selected").text());
            MostrarTemplateAtencion_Vacio();
        }
    });

    $("#Mensaje_NoSeAtendio").click(function () {
        $("#Mensaje_btn_Aceptar").click();
        $("#span_DivTemplate_Paciente").html($(PacAtender).parents("tr").find(".tabla_apellido").html());
        $("#span_DivTemplate_NHC").html($(PacAtender).parents("tr").find(".tabla_nhc").html());
        $("#span_DivTemplate_Fecha").html($("#txt_fecha_almanaque").val());
        //$("#span_DivTemplate_Especialidad").html($("#cbo_especialidad").val());
        $("#span_DivTemplate_Especialidad").html($("#cbo_especialidad :selected").text());
        //$("#span_DivTemplate_Medico").html($("#cbo_medico").val());
        $("#span_DivTemplate_Medico").html($("#cbo_medico :selected").text());
        MostrarTemplateNoAtencion_Vacio();
    });

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

    function ImprimirInforme(Id) {
        $.fancybox(
        {
            'autoDimensions': false,
            //'href': '../Impresiones/Impresiones_IMG/IMG_Informe_Rapido.aspx?TurnoId=' + Id,
            'href': '../Impresiones/Impresiones_IMG/IMG_Informe_html_Rapido.aspx?TurnoId=' + Id,
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


    $("#Rechazar_btn_cancelar").click(function () {
        $("#Rechazar_Div").hide();
    });

    $("#btn_rechazarelturno").click(function () {    
        
        CambiarEstado(TurnoaRechazar, -1, true);
    });


    var Modalidad = "";
    function jModalidad(ModalidadId) {
        $("#DM_DIV").hide();       

        if (ModalidadId == 1) {
            Modalidad = "CR";
        }

        if (ModalidadId == 2) {
            Modalidad = "DX";
        }

        if (ModalidadId == 3) {
            Modalidad = "SE";
        }

        CambiarEstado(ModadlidadTurno, 5, true);
    }    



    $("#BTN_DM_CANCELAR").click(function () {
        $("#DM_DIV").hide();                
    });

    function CerrarInsumosDiv() {
        $("#INSUMO_DIV").hide();  
        $("#cbo_insumo").val("0");
        $("#txt_cantidad").val("");
        $("#div_insumos_filtro").show();
        $("#btn_guardar_insumos").show();
    }

    function CancelarInsumosDiv() {
        $("#div_insumos_filtro").show();
        $("#cbo_insumo").val("0");
        $("#txt_filtro_nombre").val("");
        $("#txt_cantidad").val("");

    }


    function Validar() {
        if (Editando == -1) {
            if ($('#cbo_insumo').val() == 0 || $('#cbo_insumo').val() == null) { alert("Seleccione el insumo."); return false; }
        }
        if ($('#txt_cantidad').val().trim().length == 0) { alert("Ingrese una cantidad."); return false; }
        return true;
    }


    function ExisteInsumo(Insumo) {
        var Existe = false;
        $.each(Array_Insumos, function (i) {
            if (Array_Insumos[i].ELIMINADO == false && Array_Insumos[i].REM_ID == Insumo) {
                Existe = true;
                return;
            }
        });
        return Existe;
    }


    $("#txt_filtro_nombre").keypress(function (event) {
        if (event.which == 13) {
            List_Insumos($("#txt_filtro_nombre").val(), 0, 0);
        }
    });


    function List_Insumos(Nombre, Rubro, Presentacion) {
        $.ajax({
            type: "POST",
            data: '{Nombre: "' + Nombre + '", Rubro: "0", Presentacion: "0", Medida: "0"}',
            url: "../Json/Farmacia/Farmacia.asmx/List_Insumos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: List_Insumos_Cargado,
            error: errores
        });
    }


    function List_Insumos_Cargado(Resultado) {
        var Insumos = Resultado.d;
        $("#cbo_insumo").empty();
        $.each(Insumos, function (index, Insumo) {
            if (Insumo.REM_BAJA != "S") {
                $('#cbo_insumo').append($('<option>', { value: Insumo.REM_ID, text: Insumo.REM_NOMBRE + " " + Insumo.REM_GRAMAJE + " " + Insumo.REM_GRAMAJE_DESC + " " + Insumo.REM_UNIDADES }));
            }
        });
    }


    var Array_Insumos = new Array();
    $("#btn_agregar").click(function () {
        if (Validar()) {            
            if (Editando != -1) {
                Array_Insumos[Editando].CANTIDAD = $("#txt_cantidad").val();
                Editando = -1;
                RenderizarInsumos();
                CancelarInsumosDiv();
            }
            else {
                if (!ExisteInsumo($("#cbo_insumo").val())) {
                    var Objeto_Insumos = {};                    
                    Objeto_Insumos.REM_ID = $("#cbo_insumo").val();
                    Objeto_Insumos.InsumoNombre = $("#cbo_insumo :selected").html();
                    Objeto_Insumos.CANTIDAD = $("#txt_cantidad").val();
                    Objeto_Insumos.ELIMINADO = false;
                    Array_Insumos.push(Objeto_Insumos);
                    RenderizarInsumos();
                    CancelarInsumosDiv();
                }
                else {
                    alert("Ya se ha cargado ese insumo.");
                }
            }
        }
    });


    function RenderizarInsumos() {
        $("#tabla_insumos_div").html("");
        $.each(Array_Insumos, function (i) {
            if (Array_Insumos[i].ELIMINADO == false) {
                $('#tabla_insumos_div').append('<tr id="pos_' + i + '"><td><a class="manito Links" onclick="EditardeLista(' + Array_Insumos[i].REM_ID + ', ' + i + ');">Editar<a/><a class="Links manito" onclick="QuitardeLista(' + Array_Insumos[i].REM_ID + ');">Quitar<a/></td><td>' + Array_Insumos[i].InsumoNombre + '</td><td>' + Array_Insumos[i].CANTIDAD + '</td></tr>');
            }
        });
        $("#INSUMO_DIV").show();
    }


    var Editando = -1;
    function QuitardeLista(Cual) {
        $.each(Array_Insumos, function (i) {
            if (Array_Insumos[i].REM_ID == Cual) {
                Array_Insumos[i].ELIMINADO = true;
            }
        });
        RenderizarInsumos();
    }

    function EditardeLista(Cual, pos) {
        Editando = pos;
        $("#txt_cantidad").val(Array_Insumos[pos].CANTIDAD);
        $("#div_insumos_filtro").hide();
        $("#pos_" + pos).addClass("Amarillo");
    }


    function GuardarInsumosDiv() {
        var json = JSON.stringify({ "Insumos": Array_Insumos, "TurnoId": TurnoId });
        $("#btn_guardar_insumos").hide();
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Imagenes/Imagenes.asmx/IMG_TURNO_INSUMO_GUARDAR",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d) {
                    CerrarInsumosDiv();
                }                
            },
            error: errores
        });
    }


    function TraerDatos() {
        Array_Insumos = [];
        $.ajax({
            type: "POST",
            data: '{TurnoId: ' + TurnoId + '}',
            url: "../Json/Imagenes/Imagenes.asmx/IMG_TURNO_INSUMO_CARGAR",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Insumos = Resultado.d;
                $("#cbo_Medicamento").empty();
                $.each(Insumos, function (index, Insumo) {
                    var Objeto_Insumos = {};
                    PedidoAutomatico = Insumo.CAB_ID;
                    Objeto_Insumos.REM_ID = Insumo.REM_ID;
                    Objeto_Insumos.InsumoNombre = Insumo.REM_NOMBRE + " " + Insumo.GRAMAJE + " " + Insumo.MEDIDA + " " + Insumo.PRESENTACION;
                    Objeto_Insumos.CANTIDAD = Insumo.CANTIDAD;
                    Objeto_Insumos.ELIMINADO = false;
                    Array_Insumos.push(Objeto_Insumos);
                });                
                RenderizarInsumos();                
            },
            error: errores
        });
    }


    function CerrarInforme() {
        TurnoCargado = 0;
        $("#CargaDeInforme_Div").hide();
    }


    $(document).ready(function () {
        tinymce.init({
            selector: 'textarea',
            plugins: ["paste", "nonbreaking", "table"],
            paste_as_text: true,
            nonbreaking_force_tab: true,
            menubar: false,
            force_br_newlines: true,
            force_p_newlines: false,
            forced_root_block: '',
            height: 250,
            browser_spellcheck: true,
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist | table',
            onPostRender: function () {
                // Select the second item by default
                //this.value('&nbsp;<em>Some italic text!</em>');                     
            },
            content_css: ['../tinymce/skins/lightgray/content.min.css']
        });
    });


    var TurnoCargado = 0;
    function GuardarInforme() {

        if ($("#cbo_Medico_Validar").val() == "0") {
            SoloAceptar();
            ActualizarMensaje("¿Médico?", "Falta seleccionar el médico que informa.");
            return;
        }

        $("#btn_informe_guardar").hide();
        INFORME = $("#text_contenido_ifr").contents().find("#tinymce").html();
        var json = JSON.stringify({ "TurnoPracticaID": TurnoCargado, "Informe": INFORME, "MedicoInforma": $("#cbo_Medico_Validar").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/INFORME_RAPIDO_GUARDAR",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {                
                SoloAceptar();
                ActualizarMensaje("Guardado", "Se ha guardado el informe.");
                $("#btn_informe_guardar").show();
                TurnoCargado = 0;
                CerrarInforme();
                ActualizarListadoPacientes();
            },
            error: errores
        });        
    }



    function Cargar_Titulo() {
        var json = JSON.stringify({ "ESPECIALIDAD_ID": $("#cbo_especialidad :selected").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/INFORME_CARGAR_TITULOS",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Titulos_Cargados,
            error: errores
        });

    }


    function Titulos_Cargados(Resultado) {
        var Medicos = Resultado.d;
        $('#cbo_plantilla').empty();
        $('#cbo_plantilla').append('<option value="0">Seleccione Plantilla</option>');
        $.each(Medicos, function (index, medicos) {
            $('#cbo_plantilla').append($('<option></option>').val(medicos.ID).html(medicos.TITULO));
        });
    }



    function CargarPlantilla() {

        id = $("#cbo_plantilla :selected").val();
        $("#text_contenido").html("");
        var json = JSON.stringify({ "PLANTILLAID": id });
        tinymce.activeEditor.setContent("");
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/CARGAR_INFORME_DETALLE",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                DATO = Resultado.d;
                tinymce.activeEditor.setContent(DATO.INFORME);
            },
            error: errores
        });
    }


    function Cargar_Todos_Los_Medicos() {
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/IMG_MEDICO_CON_FIRMA_LISTAR",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: TodosLosMedicos_Cargados,
            error: errores
        });

    }

    function TodosLosMedicos_Cargados(Resultado) {
        var Medicos = Resultado.d;
        $('#cbo_Medico_Validar').empty();
        $('#cbo_Medico_Validar').append('<option value="0">Seleccione un médico</option>');
        $.each(Medicos, function (index, medicos) {
            $('#cbo_Medico_Validar').append($('<option></option>').val(medicos.ID).html(medicos.TITULO));
        });
    }

    Cargar_Todos_Los_Medicos();

    $("#cbo_Medico_Validar").change(function () {
        Cargar_Titulo_x_Medico();
    });


    function Cargar_Titulo_x_Medico() {
        if ($("#cbo_Medico_Validar").val() == "0") {return;}
        var json = JSON.stringify({ "ESPECIALIDAD_ID": $("#cbo_especialidad :selected").val(), "MEDICOID": $("#cbo_Medico_Validar").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/INFORME_CARGAR_TITULOS_X_MEDICO",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Titulos_Cargados,
            error: errores
        });

    }



    function Cargar_Usuarios() {
        $("#cbo_usuario").empty();
        var json = JSON.stringify({ "Permiso": 116 });
        $.ajax({
            type: "POST",
            url: "../Json/Usuarios/Usuarios.asmx/Listar_x_Perfil",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (dato) {
                var Resultado = dato.d;
                $("#cbo_usuario").append('<option value="0">TODOS</option>');
                $.each(dato.d, function (index, Resultado) {
                    $("#cbo_usuario").append('<option value=' + Resultado.id + '>' + Resultado.Usuario + '</option>');
                });

            },
            error: errores
        });
    }

    Cargar_Usuarios();


    $("#cbo_usuario").change(function () {
        ActualizarListadoPacientes();
    });

</script>

</html>
