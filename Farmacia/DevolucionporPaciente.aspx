<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DevolucionporPaciente.aspx.cs" Inherits="Farmacia_DevolucionporPaciente" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div id="cargando2" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>
    <div id="cont_datospac" class="contenedor_2"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del Paciente</span></div>
      <form class="form-horizontal">
              <div id="controlcbo_TipoDOC" class="control-group">
          <label class="control-label" for="cbo_TipoDOC">Tipo</label>
          <div class="controls">
              <select id="cbo_TipoDOC">
              </select>          
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
            <input id="txtdocumento" type="hidden" />
            <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
            <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>
         <div class="control-group">
          <label class="control-label" for="cbo_Servicio">Servicio</label>
          <div class="controls">
            <select id="cbo_Servicio"></select>
        </div>
        </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="CargarPedidoporPaciente.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a>
                <a id="btnDevoluciones" class="btn btn-warning" style="margin-left:9px">Buscar Devoluciones</a> 
                <a id="btnOtroPaciente" class="btn btn-danger" style="display:none;">Otro Paciente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Nro. Devolución: <strong><span id="CargadoNumero"></span></strong>&nbsp;&nbsp;&nbsp;Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:450px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos de la Devolución</span></div>
      
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:150px;">
            <form id="frm_input1" class="form-horizontal" role="form" style="margin-left:-20px;">
                  
                   <div class="form-group" style="margin:5px; display:none;">
                    <label style="margin-right:5px;" class="col-sm-2 control-label">Monodroga</label>
                    <div class="col-sm-10">
                    <span id="cbo_Monodroga_val" style="display:none;">0</span>
                      <select id="cbo_Monodroga" class="form-control">
                      </select>
                    </div>
                  </div>
                  
                 <div class="form-group" style="margin:5px;">
                     <label for="cbo_Medicamento" class="col-sm-2 control-label" style="margin-right:5px;">Insumo:</label>
                    <div class="col-sm-10">
                        <input type="text" id="cbo_Medicamento" data-provide="typeahead" autocomplete="off" class="form-control" />
                    </div>
                  </div>

                                     <div class="form-group" style="margin:5px;">
                     <label for="cboLote" class="col-sm-2 control-label" style="margin-right:5px;">Nro. de Lote</label>
                       <div class="col-sm-10">
                        <select  id="cboLote" class="form-control" ></select>
                      </div>
                   </div>

                  <div class="form-group" style="margin:5px;">
                    <label for="cbo_Deposito" style="margin-right:5px;" class="col-sm-2 control-label">Depósito</label>
                    <div class="col-sm-10">
                        <select id="cbo_Deposito" class="form-control">
                        </select>
                    </div>
                  </div>
                  <div class="form-group" style="margin:5px; display:none;">
                    <label for="cbo_Lotes" style="margin-right:5px;" class="col-sm-2 control-label">Lote</label>
                    <div class="col-sm-10">
                        <select id="cbo_Lotes" class="form-control">
                        </select>
                        <input type="hidden" name="txtLotes" id="txtLotes" rel='Ingrese Numero de Lote' />
                    </div>
                  </div>
                  <div class="form-group" id="div_vencimiento" style="margin:5px; display:none;">
                    <label for="txtVencimiento" style="margin-right:5px;" class="col-sm-2 control-label">Vencimiento</label>
                    <div class="col-sm-10">
                        <input type="text" id="txtVencimiento" name="Vencimiento" class="form-control" maxlength="10"/>
                    </div>
                  </div>
                  <div class="form-group" style="margin:5px;">
                    <label for="Observaciones" style="margin-right:5px;" class="col-sm-2 control-label">Observaciones</label>
                    <div class="col-sm-10">
                        <input type="text" id="Observaciones" name="Observaciones" class="form-control" maxlength="30"/>
                    </div>
                  </div>
             </form>
           </div>

          <div class="contenedor_4 pagination-centered" style="height:150px;">
              <form id="frm_Cantidad">
                    <div id="Medicamento_val" style="display:none;">0</div>
                    <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
                     <input type="hidden" id="STO_VENCIMIENTO" value="" />
                     <input type="hidden" id="Presentacion" value="" />
                   <label for="controlmotivo" style="text-decoration:underline; font-weight:bold; margin:10px; margin-left:10px;">Motivo de la Devolución: </label>
                   <div id="controlmotivo">
                        <span class="span1" style="width:100px;display:inline;"><label for="devolucion" style="display:inline; margin-right:5px;">Sobrante</label><input type="radio" name="motivo" id="devolucion" class="motivo_chk" value="3" checked="checked" style="display:inline;"/></span>
                        <span class="span1" style="width:110px;display:inline;"><label for="vencimiento" style="display:inline;margin-right:10px;">Vencimiento</label><input type="radio" name="motivo" class="motivo_chk" id="vencimiento" value="1" style="display:inline;"/></span>
                        <span class="span1" style="width:100px;display:inline;"><label for="rotura" style="display:inline;margin-right:10px;">Rotura</label><input type="radio" name="motivo" class="motivo_chk"  id="rotura" value="2" style="display:inline;"/></span>
                  </div>

                   <div id="controlcantidad" class="control-group" style="display:inline;margin-top:5px;">
                        <span class="span1" style="width:60px;display:inline;margin-top:15px;"><label for="cantidad" style="display:inline; margin-right:10px;margin-top:-5px;">Cantidad</label></span>
                        <input type="text" id="cantidad" name="cantidad" rel='Ingrese Cantidad' class="input-mini numero" maxlength="3" style="display:inline; width:30px;margin-top:5px;"/>
                   </div>
                   <div id="Div1" class="control-group" style="display:none;">
                        <span class="span1" style="width:100px;"><label for="stock_medicamento" style="display:inline;">Stock Actual: </label>
                        <div id="stock_medicamento" style="display:inline;">0</div></span>
                        <span class="span1" style="width:100px;"><label for="stock_futuro" style="display:inline;">Stock Futuro: </label>
                        <div id="stock_futuro" style="display:inline;">0</div></span>
                        <span class="span1" style="width:100px;"><label for="precio_medicamento" style="display:inline;">Precio($): </label>
                        <div id="precio_medicamento" style="display:inline;">0</div></span>
                    </div>
                    <input id="btnAgregarMedicamento" type="button" class="btn btn-success btn pull-right" style="margin:10px;" value="Agregar"/>
                    <input id="btnCancelarMedicamento" type="button" class="btn btn-danger btn pull-right" style="margin:10px;" value="Cancelar"/>
                     
              </form>
          </div>
          <div class="clearfix"></div>
        </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:210px;width:100%; margin-top:-5px;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Vencimiento</th>
                    <th>Cantidad</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
    <div class="pull-right">
      <a href="DevolucionporPaciente.aspx" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
      <button id = "btnConfirmarPedido" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
    </div>
</div>
      </div>
    </div>
  </div>
</div>

<!--Pie de p�gina-->
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Farmacia/DevolucionporPaciente.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#CargadoServicio").html($("#cbo_Servicio :selected").text());
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });
    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Devoluciones por Paciente</strong>";
</script> 

</body>
</html>

