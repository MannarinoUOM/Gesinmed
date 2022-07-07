<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Presupuesto_Odontologia.aspx.cs" Inherits="Odontologia_Presupuesto_Odontologia" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/Odontologia.css" rel="stylesheet" type="text/css" />
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/fixedHeader.dataTables.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container">
            <div id="primero" class="contenedor_bono" style="height:350px; margin-left:26%; margin-top:10%">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg"  style="display:none"/>&nbsp;&nbsp;<span id="titulo" style=" text-align:center; display:block">Busqueda Afiliado</span></div>
                <form class="form-horizontal" style="margin-top:20px">
                <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC" class="interno bloquear">
                      </select>          
                   </div>
                <div class="control-group">
                    <label class="control-label">
                </div>
                        <label class="control-label" for="txt_dni">N°</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" placeholder="Nro. de documento sin puntos"  tabindex="1"  class="interno bloquear numeroEntero" />
                        <input id="txtdocumento" type="hidden" />
                        <input id="afiliadoId" value="" class="ingreso" 
                        type="hidden"
                        />
                        <input id="externo" value="" type="hidden"/>
                        <input id="discapacidad_val" value="" type="hidden"/>
                        <input id="verificarPMI" value="" type="hidden"/>
                        <input id="PMI_val" value="" type="hidden"/>
                        <input id="discapacidad_paga" value="" type="hidden"/>
                        <input id="discapacidad_paga2" value="" type="hidden"/>
                        <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
                        <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" type="text" placeholder="Ej: 99123456789"  tabindex="2" class="interno bloquear numeroEntero"/>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtPaciente">
                        Paciente</label>
                    <div class="controls">
                        <input id="txtPaciente" placeholder="Apellido Nombre" type="text" class="span3 interno bloquear"  tabindex="3" />
                        <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn interno bloquearBtn" style="display:inline"><i class="icon-search icon-black">
                        </i></a>
                    </div>
                </div>

        
        <div id="controlSeccional" class="control-group">
        
          <label class="control-label" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" />
          
              <select id="cboSeccional" class=" bloquear">
                <option value="0" >Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" style="display:none;"></select>          

           </div>

        </div>

                </form>
                <div class="control-group" style="text-align:center">
                    <div class="controls pagination-centered" style="margin-left:0px"> 
                        <a id="btnCancelarPedidoTurno" class="btn btn-danger" style="display: none">Otro Paciente</a> 
                        <a id="btnBuscar" class="btn bloquearBtn" >Buscar Presupuesto</a>
                        <a id="desdeaqui" class="btn btn-info bloquearBtn" style="display: none; text-align:center">Nuevo Presupuesto</a>
                    </div>
                </div>
            </div>
</div>
    <div id="segundo" style="display:none">
    <div class="contariner" style="text-align:center">
    <div class="contenedor_a" style="width:919px; height:508px ;text-align:center">
    <div class="resumen_datos" style="margin-top:0px;font-size:12px; width:980px; height:80px">
                    <div class="datos_persona">
                        <div>
                            <img id="fotopaciente" class="avatar2" src="../img/silueta.jpg"></img>
                        </div>
                        <div class="datos_resumen_paciente">
                            <div>
                            Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor: pointer;" onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a>
                            </div>

                            <div style="text-align:left">
                            DNI: <strong><span id="CargadoDNI"></span></strong>&nbsp;&nbsp;&nbsp;
                            </div>

                            <div style="text-align:left">
                            NHC: <strong><span id="CargadoNHC"></span></strong>&nbsp;&nbsp;&nbsp;
                            </div>
                      
                            <div style="text-align:left">
                            Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                    <div class="pull-left" style="margin-left: 20px">
                        <div style="text-align:left">
                            Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
                        <div style="text-align:left">
                            Seccional/OS:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
                        <div style="text-align:left">
                            Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
                    </div>

                        <div class="pull-left" style="margin-left: 20px">
                        <div style="text-align:left">
                            Fecha:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoFecha"></span></strong></span></div>
                        <div style="text-align:left">
                            Nº Presupuesto:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoPresupuesto"></span></strong></span></div>
                        <div style="text-align:left">
                        Médico:<select id="CargadoMedico" class=" input-medium"></select>
                        </div>
                        </div>
                        </div>
                    <div class="clearfix">
                    </div>
           

                <div style="text-align:center">
                <a id="btnConfigurar" style="margin-bottom:10px" class="btn" >Configurar</a> 
                <input id="txtCodigo" type="text" class="input-mini numeroEntero cantidad" placeholder="Código" name="4"/> 
                <select id="cboCodigo"></select>
                <input id="txtCantidad" type="text" class="input-mini numeroEntero cantidad" placeholder="Cantidad" name="4"/>
                <input id="txtValor" type="text" class="input-mini moneda cantidad" placeholder="Valor" name="8"/>
                <a id="btnAgregar" class="btn btn-success" style="margin-bottom:10px"><i class="icon-plus icon-white"></i>Agregar</a>
                </div>

                <div class="contenedor_a" style="height:240px;overflow:auto">
                
                <table id="listaPresupuesto">
                <tr style="background-color:Black; color:White">
                <th style="width:10%"><b>&nbspCódigo</b></th><th style="width:48%"><b>Descripción</b></th><th style="width:10%"><b>Cantidad</b></th><th style="width:13%"><b>Valor Unitario</b></th><th style="width:10%"><b>Valor Total</b></th><th style="width:10%"><b>Eliminar</b></th>
                </tr>
                </table>

                </div>
                <div style="text-align:right">
                <label id="cantidadCuotas" style="display:inline"><b>Cantidad de Cuotas: </b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label style="display:inline"><b>TOTAL&nbsp</b></label><input id="txtTotal" type="text" style="margin-right:1%" disabled=disabled/></div>
                <div style=" width:99%; height:35px; padding:0.5%; background-color:#CCCCCC; margin-top:1%">
                <a id="btnVolverPrimero" class="btn btn-info pull-right" style="margin-right:1%"><i class=" icon-arrow-up icon-white"></i>&nbsp;&nbsp;Volver</a>
                <a id="btnSiguiente" class="btn btn-info pull-right" style="margin-right:1%"><i class=" icon-arrow-down icon-white"></i>&nbsp;&nbsp;Siguiente</a>
                </div>

    </div>
    </div>
    </div>

    <div id="intermedio" style="display:none; margin-top:15%">
    <div class="container" style="text-align:center">
    <div class="contenedor_a" style="height:220px; width:850px; margin:auto">
    <div class="titulo_seccion"><img src="../img/1.jpg"  style="display:none"/>&nbsp;&nbsp;<span id="Span1" style=" text-align:center; display:block">Detalle</span></div>
<div style=" height:140px; overflow:auto">
<div id="mostrar"></div>
</div>
    <div style=" width:99%; height:35px; padding:0.5%; background-color:#CCCCCC; margin-top:1%">
    <a id="btnFinal" class="btn btn-info pull-right" style="margin-right:1%"><i class=" icon-arrow-down icon-white"></i>&nbsp;&nbsp;Siguiente</a>
    <a id="btnVolver" class="btn btn-info pull-right" style="margin-right:1%"><i class=" icon-arrow-right icon-white"></i>&nbsp;&nbsp;Volver</a>
    </div>
    </div>
    </div>
    </div>

    <div id="tercero" style="display:none; margin-top:10%">
    <div class="container" style="text-align:center">
    <div class="contenedor_a" style="height:180px; width:450px; margin:auto">
    <div class="titulo_seccion"><img src="../img/1.jpg"  style="display:none"/>&nbsp;&nbsp;<span id="Span4" style=" text-align:center; display:block">Pago</span></div>

                <form class="form-horizontal" style="margin-top:20px">
<%--                <div class="control-group">
                <label class="control-label" >1º Pago</label>
                <div class="controls"><input id="txtPago1" class="moneda bloquear pago" type="text" name="8" /> </div>
                </div>--%>

<%--                <div class="control-group">
                <label class="control-label" >2º Pago</label>
                <div class="controls"><input id="txtPago2" type="text"  class="moneda bloquear pago"  name="8" disabled="disabled" /></div>
                </div>--%>

                <div class="control-group">
                <label class="control-label">Cuotas</label>
                <div class="controls"><select id="cboPagosConf"></select></div>
                </div>

                <div class="control-group">
                <label class="control-label">Saldo</label>
                <div class="controls">
                <input id="txtSaldo" type="text" class="" disabled=disabled/>
                </div>
                </div>
                </form>

    <div style=" width:99%; height:35px; padding:0.5%; background-color:#CCCCCC; margin-top:6%">
    <a id="btnImprimir" class="btn btn-info pull-right"><i class="icon-print icon-white"></i>&nbsp;&nbsp;Imprimir</a>
    <a id="btnVolverSegundo" class="btn btn-info pull-right" style="margin-right:1%"><i class=" icon-arrow-up icon-white"></i>&nbsp;&nbsp;Volver</a>
 
    </div>
    </div>
    </div>
    </div>

<%--
    <div id="configurado" style="display:none; margin-top:5%">
    <div class="container" style="text-align:center">
    <div class="contenedor_a" style="height:200px; width:400px; margin:auto; overflow:no">
    <div class="titulo_seccion"><img src="../img/1.jpg"  style="display:none"/>&nbsp;&nbsp;<span id="Span2" style=" text-align:center; display:block">Pago</span></div>

                <form class="form-horizontal" style="margin-top:20px; height:110px; text-align:center">
                <select id="cboPagosConf"></select>
                </form>

    <div style=" width:99%; height:35px; padding:0.5%; background-color:#CCCCCC; margin-top:1%">

    <a id="A1" class="btn btn-info pull-right"><i class="icon-print icon-white"></i>&nbsp;&nbsp;Imprimir</a>
    <a id="A2" class="btn btn-info pull-right" style="margin-right:1%"><i class=" icon-arrow-up icon-white"></i>&nbsp;&nbsp;Volver</a>
 
    </div>
    </div>
    </div>
    </div>--%>


    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.dataTables.js" type="text/javascript"></script>
<script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Odontologia/Presupuesto_Odontologia.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<script src="../js/simple.money.format.js" type="text/javascript"></script>
<script src="../js/Hospitales/Odontologia/Presupuesto_Busqueda_paciente_Odontoogia.js" type="text/javascript"></script>
<script src="../js/jquery.mask.js" type="text/javascript"></script>
<script src="../js/jquery.numberformatter-1.2.4.jsmin.js" type="text/javascript"></script>
<script src="../js/jquery.priceformat.js" type="text/javascript"></script>


<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Administracion > <strong>Presupuesto Odontológico</strong>";
    </script>