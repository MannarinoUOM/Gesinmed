<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Compras_Expediente_Pedidos_Internacion.aspx.cs" Inherits="Compras_Compras_Expediente_Pedidos_Internacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <style>
        .dropdown-menu { max-height: 250px; max-width: 800px; font-size:11px; overflow-y: auto; overflow-x: hidden;}
    </style>
    <style type="text/css">
         
        .Turnos_Libres
        {
            background-color:#F4FA58;
            }

        .Turnos_Ocupados
        {
            background-color:#58FA58;
        }

        .Turnos_Sobreturno
        {
           background-color:#0080FF; 
        }

        .Turnos_Cancelado
        {
           background-color:#FA5858; 
           }

        .Turnos_Ausente
        {
            background-color: #FF4000;
            }
    
         .Turnos_Seleccionado
         {
             background-color: #D8D8D8;
             }
         .table td, .table th
         {
             text-align:center;
         }
         
           #modal_historial_insumo 
        {
            width: 700px; 
            margin: -300px 0px 0px -350px;
            left: 575px;
        } 

        #modal_historial_insumo .modal-body {
            max-height: 525px !important;
            max-width: 1000px !important;
        }
    </style>
</head>
<body>
    <div class="clearfix">
    </div>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px; width: 1260px">
        <div class="contenedor_1" style="width:1250px">
            <div id="Inicio" class="contenedor_bono" style="height:420px; display:none;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Datos del paciente</span></div>
                <form class="form-horizontal">
                 <div id="controlcbo_TipoDOC" class="control-group">
                      <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                      <div class="controls">
                          <select id="cbo_TipoDOC">
                          </select>          
                       </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        N°</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" placeholder="Nro. de documento sin puntos"/>
                        <input id="txtdocumento" type="hidden" />
                        <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
                        <a id="btnVencimiento" style="display:none;" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
                        <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" type="text" placeholder="Ej: 99123456789"/>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtPaciente">
                        Paciente</label>
                    <div class="controls">
                        <input id="txtPaciente" placeholder="Apellido Nombre" type="text" class="span3"/>
                        <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black">
                        </i></a>
                    </div>
                </div>
                <div id="controlTelefono" class="control-group">
                    <label class="control-label">
                        Teléfono</label>
                    <div class="controls">
                        <input id="txtTelefono" maxlength="13" placeholder="Ej. 43625910" type="text"/>
                    </div>
                </div>
        <div id="controlSeccional" class="control-group">
        
          <label class="control-label" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" />
          
              <select id="cboSeccional">
                <option value="0">Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" style="display:none;"></select>          

           </div>

        </div>
                </form>
                <div class="control-group">
                    <div class="controls pagination-centered">
                        <a id="desdeaqui" style="margin-top:5px;" class="btn btn-success"><span id="desdeaqui_nombre">Siguiente</span></a>
                    </div>
                </div>
            </div>
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="width:1250px; z-index:-1; position:static">
                <div class="resumen_datos" style="height:95px;">
                    <!--Datos del paciente-->
                    <div class="datos_paciente" style="height:95px; font-size:12px; width:100%">
                        <div>
                            <img id="fotopaciente" class="avatar2 zoomImg" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
                        <div class="datos_resumen_paciente" style="height:95px;">
                            <div>
                                Nro. Expte: <strong><span id="CargadoNroExpediente"></span></strong>
                                &nbsp;&nbsp;&nbsp;<span>Vto. Expte.: <strong><span id="CargadoVtoExpte"></span></strong></span></div>
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span></strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>Fecha Nac: <strong><span id="CargadoFechaNac"></span></strong></span>
                            <div>
                                <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>
                                &nbsp;&nbsp;&nbsp;<span>Patologia: <strong><span id="CargadoPatologia"></span></strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
                    </div>
                </div>
                <div id="contCAB" class="contenedor_3" style="height:320px; margin-bottom:10px; width:1222px; position:relative; z-index:1">
                    <div id="pServicio">
                    </div>
                    <!--Tabla de Pedidos Cabecera-->
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        
                        <div id="TablaPedidos" class="tabla" style="height: 270px; width:830px; font-size:11px;">
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Fecha Pedido
                                        </th>
                                        <th>
                                            Fecha Intervensión
                                        </th>
<%--                                        <th>
                                            Fecha Auditado
                                        </th>
                                        <th>
                                            Auditor
                                        </th>--%>
                                          <th>
                                            Cirugía Realizada
                                        </th>
                                          <th>
                                            Motivo Suspensión
                                        </th>
<%--                                         <th>
                                            Nueva Fecha de Cirugía
                                        </th>--%>
                                    </tr>
                                </thead>
                            </table>
                            
                        </div>
                        </form>
                    </div>
                    <div class="span3" style="width:120px;">Nro. Pedido<input id="EXP_PED_ID" disabled type="text" class="input-small numero datoCAB" /></div>
                    <div class="span3" style="width:120px;">Servicio<select id="cboArea" class="datoCAB bloquear" style="width:170%"></select></div>
                    <div class="span3" style="width:140px;">Fecha de Carga<input id="EXP_PED_FECHA" type="text" disabled class="input-small date datoCAB" /></div>
                    
                    <div class="span3" style="width:120px; margin-left:0px">Médico<select id="cboMedico" class="datoCAB bloquear"  style="width:170%"></select></div>
                    <div class="span3" style="width:200px; margin-bottom:40px">Fecha de Intervención<br />
                    <div class="btn-group dropup" style="z-index:200; position:fixed">
<%--                   <button id="btnFechaCirugia" type="button" class="btn btn-default dropdown-toggle bloquear" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="width:110%">Seleccione</button>
                       <ul class="dropdown-menu" style="z-index:1; float:left">
                         
                       <table class="table table-hover" id="tablaCirugias" style="z-index:1">
                       </table>
                         
                       </ul>--%>
                        <button id="btnFechaCirugia" type="button" class="btn btn-default bloquear" aria-haspopup="true" aria-expanded="true" style="width:110%">Seleccione</button>
                      <%-- <table class="table table-hover" id="tablaCirugias" style="z-index:300; width:100%"></table>--%>


                    </div>
                    </div>

                    <div class="span3" style="width:120px;">
                        <input id="EXP_PED_DURACION" type="number" maxlength="3" min="30" max="360" step="30" value="30" class="input-small datoCAB" style="display:none;"/>
                    </div>
                    <div class="span4" style="width:200px; display:none;">Observaciones<textarea id="EXP_PED_OBS" rows="3" style="width: 229px;" class="datoCAB"></textarea></div>
                    <div class="span3" style="width:200px;">Fecha de prescripción médica<input id="EXP_PED_FECHA_RECETA" type="text" class="input-small date datoCAB bloquear" /></div>
                    <div class="span3 checkbox" style="width: 54px; display:none;"><label style="width: 50px;"><input id="EXP_PED_URGENTE" type="checkbox" value="" class="datoCAB">Urgente</label></div>
                    <div class="span3 pull-right" style="width:280px; margin-right:25px;">
                        <a id="btnCopiar" class="btn btn-mini btn-inverse">Copiar</a> 
                        <a id="btnGuardarCAB" class="btn btn-mini btn-success">Guardar Nuevo</a>
                        <a id="btnEliminarCAB" class="btn btn-mini btn-danger">Eliminar</a>
                        <a id="btnLimpiarCAB" class="btn btn-mini" style="display:none" >Deseleccionar</a>
                         <a id="btnEntregas" class="btn btn-mini btn-success" style="display:none">&nbsp;Entregar</a>
                        <a id="btn60dias" class="btn btn-mini btn-primary" style="margin-top:15px; margin-bottom:10px;width: 190px; display: none;"><b style="font-size:12px;">Duración 60 días</b></a><br />
                        <a id="btn90dias" class="btn btn-mini btn-primary" style="width: 190px;display: none;"><b style="font-size:12px;">Duración 90 días</b></a>
                    </div>
                    <div class="pie_gris">
                    <div style=" margin-left:3%; width:50%; display:inline">
                       <%--<label style="cursor:default; background-color:Yellow; margin-right:20px; margin-bottom:0px; display:inline-block;border-radius:10px; height:23px; width:180px; text-align:center;font-weight:bold">Pendientes</label> --%>  
                       <label style="cursor:default; background-color:Yellow; margin-right:20px; margin-bottom:0px; display:inline-block;border-radius:10px; height:23px; width:180px; text-align:center;font-weight:bold">Entregados</label>   
                       </div>
                        <div class="pull-right">
                            <a id="btnVolverFicha" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                            <a id="btnVerDetallesPedido" class="btn"><i class="icon-arrow-down"></i>&nbsp;Ver Detalles</a>
                        </div>
                    </div>
                </div>
                <div class="clearfix">
                </div>
                <div id="contDET" class="contenedor_3" style="height:370px; width:1220px; margin-bottom:10px;">
                    <div id="pSala">
                    </div>
                    <!--Tabla de detalles-->
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left; width:100%">
                        <div class="clearfix">
                        </div>
                        <div id="TablaPedidoDetalles" class="tabla" style="height:330px; width:97%; font-size:11px; text-align:left; position:absolute">
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Nro. Pedido
                                        </th>
                                        <th>
                                            Insumo/Material
                                        </th>
                                          <th>
                                            Tipo
                                        </th>
                                        <th>
                                            Cantidad
                                        </th>
                                        <th>
                                            Proveedor
                                        </th>
                                        <th>
                                            Importe
                                        </th>
                                        <th>
                                            Pedidos
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        </form>
                    </div>
                    <div class="row" style="margin-left:5px;">

        <%--                    <form class="form-inline">
                            <div class=" form-group" style="margin-bottom:1%">
                            <label class="control-label" style="margin-left:1%">Insumo</label><input id="txtInsumo" class=" form-control input-xxlarge detalles" type="text" maxlength="100"/>
                            <label class="control-label">Tipo</label><input id="txtTipo" class=" form-control input-large detalles" type="text" maxlength="100"/>
                            </div>

                            <div class=" form-group">
                            <label class="control-label">Cantidad</label><input id="txtCantidad" class=" form-control input-mini numeroEntero cantidad detalles" name="4" type="text"/>
                            <label class="control-label">Proveedor</label><select id="cbo_Proveedor" class=" form-control input-xxlarge detalles"></select>
                            <label class="control-label">Importe</label><input id= "txtImporte" class=" form-control input-mini cantidad numeroDecimal detalles" name="9"  type="text"/>


                            <div class="row pull-right" style="margin-left:0px;margin-right: 35px;">
                            <a id="btnLimpiarDET" class="btn">Limpiar</a>
                            <a id="btnEliminarDET" class="btn btn-danger" style="display:none">Eliminar</a>
                            <a id="btnGuardarDET" class="btn btn-success">Guardar</a>
                            <div class="span3" style="width:318px; margin-right:0px; display:none;"> 
                            <a id="btnCancelarAutorizacion" class="btn btn-mini"><i class="icon-refresh"></i>&nbsp;Deshacer Audit</a>
                            <a id="btnAutorizarPED" class="btn btn-mini btn-success"><i class="icon-ok"></i>&nbsp;Aprobar Audit</a  >
                            <a id="btnCancelarAudit" class="btn btn-mini btn-danger"><i class="icon-remove-circle"></i>&nbsp;Cancelar Audit</a>
                            </div>
                    </div>
                            </div>
                            </form>--%>

                    </div>
                    <div class="row" style="margin-left:5px; display:none;">
                            <div class="span5" style="width: 295px;margin-left: 10px;">Nom. Comercial
                                <select class="input-large detalles" style="width: 184px;"></select>
                            </div>
                            <div class="span5" style="width: 267px;margin-left: 10px;">Monodroga
                                <select class="input-large detalles" style="width: 184px;"></select>
                            </div>
                             <div class="span5" style="width: 287px;margin-left: 10px;">Presentación
                                <select class="input-large detalles" style="width: 199px;"></select>
                            </div>
                    </div>
                    <div class="row" style="margin-left:5px;">
                        <div class="span4" style="width: 193px; display:none;">% Descuento
                                <input id="PDT_POR_DESC" type="text" class="input-mini numero detalles" maxlength="6"/>
                        </div>
                        <div class="span2 checkbox" style="width: 84px; display:none;"><label>No entregar
                                <input id="PDT_NOENTREGAR" type="checkbox" value="" class="detalles"/>
                                </label>
                        </div>
                        <div class="span5" style="width:231px; margin-right:0px;margin-left: 0px; display:none;">
                            <input id="PDT_OBS" type="text" class="input-xlarge" style="width:218px;margin-left: 0px;" maxlength="40" placeholder="Ingrese Observaciones..."/> 
                        </div>
                    </div>

                    <div class="clearfix">
                    </div>
                    <div class="pie_gris">
                        <div class="pull-left" style="margin-right: 150px;">
                            <a id="btnBuscarExp" class="btn"><i class="icon-search"></i>&nbsp;Buscar Expedientes</a>
                        </div>
                        <a id="btnPedir" class="btn"><i class="icon-bookmark"></i>&nbsp;Generar orden de compra</a>
                        <div class="pull-right">     
                        <label style="cursor:default; background-color:Yellow; margin-right:20px; margin-bottom:0px; display:inline-block;border-radius:10px; height:23px; width:180px; text-align:center;font-weight:bold">Insumo seleccionado   </label>   
                        
                            <a id="btnGenerarNuevo" class="btn btn-mini btn-success">&nbsp;Nuevo Insumo</a>     
                            <a id="btnVerExp" class="btn" style="display:none;"><i class="icon-file"></i>&nbsp;Ver Expediente</a>
                            <a id="btnVerCAB" class="btn"><i class=" icon-arrow-up"></i>&nbsp;Ver Cabecera</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="modal_historial_insumo" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="width:910px;">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Editar Insumos</h4>
      </div>
      <div class="modal-body">
                <div id="TablaHistorial" class="tabla" style="height: 320px; width: 870px; font-size:11px;">
                            <table id="historial" class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                            &nbsp;
                                        </th>
                                        <th>
                                            Insumo
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
      </div>
      <div class="modal-footer">
         <div class="row" style="margin-top:5px;">
          <%--   Insumo: <input id="txtInsumo" type="text" class="input-xxlarge" maxlength="40" style="width: 580px;"/>--%>
             <button id="btnGuardar" type="button" class="btn btn-success">Guardar</button>
             <button id="btnLimpiar" type="button" class="btn btn-warning">Limpiar</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
        </div>
        <div class="row" style="margin-top:5px;width: 365px;">
            Rubro: <select id="cboRubro" class="span4 pull-left"></select>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script> 
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>   
<script src="../js/Hospitales/Compras/Compras_Expediente_Pedidos_Internacion.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > Internación > Expediente > <strong>Pedidos</strong>";
</script>
</body>
</html>



