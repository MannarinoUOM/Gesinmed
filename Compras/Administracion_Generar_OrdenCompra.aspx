<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Administracion_Generar_OrdenCompra.aspx.cs" Inherits="Compras_Administracion_Generar_OrdenCompra" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
    <title>Gesti�n Hospitalaria</title>
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
            background-color:rgb(255, 255, 0);
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
         
    </style>
</head>
<body>
    <div class="clearfix">
    </div>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
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
                        N�</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" placeholder="Nro. de documento sin puntos">
                        <input id="txtdocumento" type="hidden" />
                        <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
                        <a id="btnVencimiento" style="display:none;" href="#" rel="tooltip" title="Verificar Baja en Padr�n" class="btn"><i class="icon-calendar icon-black"></i></a> 
                        <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" type="text" placeholder="Ej: 99123456789">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtPaciente">
                        Paciente</label>
                    <div class="controls">
                        <input id="txtPaciente" placeholder="Apellido Nombre" type="text" class="span3">
                        <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black">
                        </i></a>
                    </div>
                </div>
                <div id="controlTelefono" class="control-group">
                    <label class="control-label">
                        Tel�fono</label>
                    <div class="controls">
                        <input id="txtTelefono" maxlength="13" placeholder="Ej. 43625910" type="text">
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
            <div id="hastaaqui">
                <div id="contCAB" class="contenedor_3" style="height:350px; margin-bottom:10px;">
                    <div id="pServicio">
                    </div>
                    <!--Tabla de Pedidos Cabecera-->
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        
                        <div style="height: 300px; width: 600px">
                        <div id="TablaPedidosdiv" class="tabla" style="height: 300px; width: 600px; font-size:11px; overflow:auto;">
                            <table class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Nro. Orden de Compra
                                        </th>
                                        <th>
                                            Fecha
                                        </th>
                                        <th>
                                            Proveedor
                                        </th>
                                        <th>
                                            Total
                                        </th>
                                        <th>
                                            Usuario
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                            
                        </div>

                    <div id="cargando" style="text-align:center; display:none; margin-top:15%">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                    </div>  
                    </div>
                        </form>
                    </div>
                    <div class="span3" style="width:120px;display:none;">Nro. Orden de Compra<input id="ORDEN_COMPRA_CAB" disabled type="text" class="input-small numero datoCAB" /></div>
                    <div class="span3" style="width:120px;display:none;">Fecha<input id="EXP_PED_FECHA" type="text" class="input-small date datoCAB" /></div>
                    <div class="span5" style="width:250px;display:none;">Proveedor<select id="cbo_Proveedor" class="span4" style="width:245px;"></select></div>
                    <div class="span3" style="width:120px;">Fecha Desde<input id="txtDesde" type="text" class="input-small date DCAB" /></div>
                    <div class="span3" style="width:120px;">Fecha Hasta<input id="txtHasta" type="text" class="input-small date DCAB" /></div>
                    <div class="span3" style="width:190px;">Nro. Orden de Compra<input id="txtOrdenCompraBuscar" type="text" class="input-small numero DCAB" /></div>
                    <div class="span5" style="width:250px;">Proveedor<select id="cbo_ProveedorBuscar" class="span4 DCAB" style="width:245px;"></select></div>
                    <div class="span3 pull-right" style="width:250px; margin-right:25px;">
                        <a id="btnCopiar" class="btn btn-mini btn-inverse">Copiar</a> 
                        <a id="btnGuardarCAB" class="btn btn-mini btn-success" style="display:none;">Guardar Nuevo</a>
                        <a id="btnEliminarCAB" class="btn btn-mini btn-danger">Eliminar</a>
                        <a id="btnLimpiarCAB" class="btn btn-mini">Nuevo</a><br />
                    </div>
                    <div class="span5" style="width:250px;"></div>
                    <div class="pie_gris">
                        <div class="box_informativo_a pull-left"><div style="padding-top:3px"><strong id="Total">Importe Total: $ 0</strong></div></div>
                        <div id="btn_Todos" class="reff ref_0 Turnos_Sobreturno reff_activo controles" style="display:none">Todos</div>
                        <div id="btn_Libres" class="reff Turnos_Libres controles" style="display:none">Recibidas</div>
                        <div id="btn_Pendientes" class="reff controles" style="display:none">Pendientes</div>
                        <%--<div id="btn_Libres" class="Turnos_Libres reff pull-left" style="margin-left:20px;height: 28px; width:100px;padding-left: 15px;">Ya Recibida</div>--%>
                        <div class="pull-right">
                            <a id="btnBuscar" class="btn pull-right"><i class=" icon-search"></i>&nbsp;Buscar</a>
                            <a id="btnVerDetallesPedido" class="btn"><i class="icon-arrow-down"></i>&nbsp;Ver Detalles</a>
                        </div>
                    </div>
                </div>
                <div class="clearfix">
                </div>
                <div id="contDET" class="contenedor_3" style="height:430px; margin-bottom:10px;">
                    <div id="pSala">
                    </div>
                    <!--Tabla de detalles-->
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaPedidoDetalles" class="tabla" style="height: 320px; width: 870px; font-size:11px; text-align:center;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Nro. Pedido
                                        </th>
                                        <th>
                                            Insumo
                                        </th>
                                        <th>
                                            Cantidad
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        </form>
                    </div>
                    <div class="row" style="margin-left:5px;">
                            <div class="span7" style="width: 470px;">Insumo
                                <input type="hidden" id="PDT_INS_ID" value=""  class="detalles"/>
                                <input id="PDT_INS_NOM" type="text" data-provide="typeahead" autocomplete="off" class="input-xxlarge detalles datos_det" style="width:400px;" disabled="disabled"/>
                            </div>
                            <div class="span2" style="width: 400px; margin-left:0px">Cantidad
                                <input type="text" id="PDT_CANTIDAD" class="input-small detalles numero datos_det" maxlength="4" disabled="disabled"/>
                                <input type="hidden" id="PED_ID" value="0" class="detalles"/>
                                Precio Unitario <input type="text" id="PDT_PRECIO" class="input-small detalles numero datos_det" maxlength="10" disabled="disabled"/>

                            </div>
                    </div>
                    <div style="margin-left:340px;margin-right:0px; width:60%">
                            <a id="btnEliminar" class="btn btn-danger detalle; pull-right" style="display:inline; margin-left:5px">Eliminar</a>
                            <a id="btnGuardarDET" class="btn btn-success detalle pull-right" style="display:inline">Guardar</a>
                            <div id="btnCerrar" class=" detalle MigueBoton" style=" margin-right:5px; margin-bottom:200px;height:22px; width:180px; float:right; border-radius:4px; text-align:center; padding:3px; cursor:pointer;background: linear-gradient(0deg, rgb(200, 200, 0), rgb(255, 255, 0)); border-color:#bbbbbb; border-style:solid; border-width:0.5px; hover:color:#bbbbbb"><span>Cerrar Orden de Compra</span></div>
                            <a id="btnLimpiarDET" class="btn detalle pull-right" style="display:inline; margin-right:5px">Limpiar</a>
                           

                            <%--<a id="btnEliminarDET" class="btn btn-danger detalle">Eliminar</a>--%>
                          <%--  <a id="btnEditar" class="btn btn-danger detalle">Editar</a>--%>

                    </div>
                    <div class="clearfix">
                    </div>
                    <div class="pie_gris">
                        <div class="box_informativo_a pull-left"><div style="padding-top:3px"><strong id="TotalDetalle">Importe Total: $ 0</strong></div></div>
                        <div class="pull-right">                        
                            <a id="btnImprimir" class="btn" style="display:none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
                            <a id="btnVerCAB" class="btn"><i class=" icon-arrow-up"></i>&nbsp;Ver Cabecera</a>
                        </div>
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
<script src="../js/Hospitales/Compras/Administracion_Generar_OrdenCompra.js" type="text/javascript"></script>
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > <strong>Ordenes de Compra</strong>";
</script>
</body>
</html>
<style>
.MigueBoton:hover
{
 /* background: -webkit-linear-gradient(90deg, rgb(200, 200, 0), rgb(255, 255, 0));*/

  color:Red;
    }
</style>