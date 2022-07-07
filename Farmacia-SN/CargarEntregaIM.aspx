<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargarEntregaIM.aspx.cs" Inherits="Farmacia_CargarEntregaIM" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<script src="../js/jquery-ui_combo.js" type="text/javascript"></script>
  <link rel="stylesheet" href="/resources/demos/style.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<style>
#TablaMedicamentos th
{
    text-align:center;
    vertical-align:middle;
}

#TablaMedicamentos td
{
    text-align:center;
    vertical-align:middle;
}
</style>
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
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form class="form-horizontal" >
        <div class="control-group">
          <label class="control-label">DNI</label>
          <div class="controls">
            <input id="txt_dni"type="text" placeholder="Ingrese el DNI sin puntos">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">NHC</label>
          <div class="controls">
            <input id="txtNHC" type="text" placeholder="Ej: 99123456789">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" placeholder="Apellido Nombre"type="text" class="span3">
            <a id="btnBuscarPaciente" href="BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black"></i></a> </div>
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
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:140px;">
        
        <div class="datos_persona">
        <div ><img id ="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Nro. de Pedido por Indicación Médica: <strong><span id="CargadoPedido">Provisorio</span></strong>&nbsp;&nbsp;Fecha: <strong><span id="CargadoFecha"></span></strong></div>
          <div>Nro. Entrega por Indicación Médica: <strong><span id="CargadoEntrega">Provisorio</span></strong>&nbsp;<a id="btnHistorial" data-toggle="modal" data-target="#EntregasModal" class="btn" style="display: inline; display:none; margin-left:50px; margin-top:5px;">Ver Historial</a></div>
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp;<span>Sala: <strong><span id="CargadoSala"></span></strong></span></div>
          <div>Cama: <strong><span id="CargadoCama"></span></strong>&nbsp;&nbsp;&nbsp; <span style="display:none;">Teléfono: <strong><span id="CargadoTelefono"></span></strong></span></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:360px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos de la Indicación Médica</span></div>
      
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:120px;">
            
            <div class="combos" style="margin-left: 10px;">
            <label for="cbo_Medicamento" style="display:inline;">Insumo:</label>
                  <select id="cbo_Medicamento" style="width:320px;">
                   <option value="0">Insumo</option>
                  </select>
            </div>
            
            <div id="controlObservaciones" class="control-group" style="display:inline;margin-left: 10px; display:none;"><label for="Observaciones" style="display:inline;">Obs: </label><input type="text" id="Observaciones" name="Observaciones" class="input-large"/></div>
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:120px;">
              <form id="frm_Cantidad" class="form-inline" style="margin:10px 25px 0px 25px;">
               <div id="controlcantidad" class="control-group" style="display:inline;"><label for="cantidad">Cant a Suministrar: </label><input type="text" id="cantidad" name="cantidad" class="input-mini" style="width:30px;" /></div>
                <div id="controlcantidadent" class="control-group" style="display:inline;"><label for="cantidadent">Cant Suministrada: </label><input type="text" id="cantidadent" name="cantidadent" class="input-mini" style="width:30px;"/>
                <input type="hidden" id="txt_CantidadAnterior" name="txt_CantidadAnterior"/></div><br />
               <label for="stock_medicamento">Stock Actual: </label><div id="stock_medicamento" style="display:inline;"></div>
               <label for="stock_futuro" style="margin-left: 80px; display:none;">Stock Futuro: </label><div id="stock_futuro" style="display:inline;display:none;"></div><br />
               
               <input id="btnAgregarMedicamento" type="button" class="btn btn-success pull-right" value="Aceptar"  style="margin-right:10px;"/>
               <input id="btnCancelarMedicamento" type="button" class="btn btn-danger pull-right" value="Cancelar" style="margin-left:10px; margin-right:20px;"/>
               
              </form>
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:142px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                   <th></th>
                    <th>Insumo</th>
                    <th>Unidades Pedidas</th>
                    <th>C/HS</th>
                    <th>Total de Unidades por día</th>
                    <th rel='tooltip' title='Unidades Entregadas'>Unidades Entregadas</th>
                    <th>Saldo</th>
                    <th>Unidades en Stock</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>

        <div id="EntregasModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:650px; height:400px;">
<%--        <div class="modal-header">
            <h1>Historial de Entregas</h1>
        </div>--%>
        <div id="TablaEntregas_div" class="tabla" style="height:380px;width:95%; margin:15px;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Nro Entrega</th>
                    <th>Fecha</th>
                    <th>Usuario</th>
                  </tr>
                </thead>

              </table>
            </div>
    </div>

        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="padding:5px; height:120px;">
  <a href="EntregasIM.aspx" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <button id = "btnImprimir" style="display:none;" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
  <button id = "btnConfirmarEntrega" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
</div>
</div>
      </div>
    </div>
  </div>
</div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Farmacia/CargarEntregaIM.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Entregas por Indicación Médica</strong>";

</script> 

</body>
</html>


