<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargarEntregaIM.aspx.cs" Inherits="Farmacia_CargarEntregaIM" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>



<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../source/jquery.fancybox.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui-1.13.1.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="../css/bootstrap-multiselect.css" type="text/css"/>


<style type="text/css">
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


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"></div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1" style="height:970px">
  <div id="cargando2" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>
    <div id="cont_datospac" class="contenedor_2" style="height:300px"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form class="form-horizontal" >
        <div class="control-group">
          <label class="control-label">DNI</label>
          <div class="controls">
            <input id="txt_dni" type="text" placeholder="Ingrese el DNI sin puntos">
            <input id="afiliadoId" type="hidden" value="" />
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
    <%--<div class="clearfix"></div>--%>
    <div id="hastaaqui" style="height:550px; margin-top:10%">
      <div class="resumen_datos" style="height:120px; font-size:12px;">
        
        <div class="datos_persona">
        <div ><img id ="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente" style="width:90%;">
          <div>Nro. de Pedido por Indicación Médica: <strong><span id="CargadoPedido">Provisorio</span></strong>&nbsp;&nbsp;Fecha: <strong><span id="CargadoFecha"></span></strong></div>
          <div>Nro. Entrega por Indicación Médica: <strong><span id="CargadoEntrega">Provisorio</span></strong>&nbsp;<a id="btnHistorial" data-toggle="modal" data-target="#EntregasModal" class="btn pull-right" style="display:none; margin-left:40px; margin-top:5px;">Ver Historial de Entregas</a></div>
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div> <a id="btnFinalizarIM" class="btn pull-right btn-danger" style="display: inline; display:none; margin-left:40px; margin-top:5px;">Cerrar Indicación</a>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp;<span>Sala: <strong><span id="CargadoSala"></span></strong></span>&nbsp;&nbsp;&nbsp;Cama: <strong><span id="CargadoCama"></span></strong> </div>
          <div>&nbsp;&nbsp;&nbsp; <span style="display:none;">Teléfono: <strong><span id="CargadoTelefono"></span></strong></span></div>
          <div style="margin-top:-20px;"><span>Médico: <strong><span id="CargandoMedico"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Diagnóstico: <strong><span id="CargandoDiag"></span></strong></span></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:300px;">
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:60px;width: 500px;">
            
            <div class="combos" style="margin-left: 10px;">
                <label for="cbo_Medicamento" style="display:inline;">Insumo:</label>
                <input id="cbo_Medicamento" type="text" value="" maxlength="100" style="width:310px;" disabled/>
                <input id="medicamentoId" type="hidden" value="0" />
                <a id="btnActualizarInsumo" class="btn" style="display:none; margin-top:-5px;">Actualizar</a>
            </div>
            
            <div id="controlObservaciones" class="control-group" style="display:inline;margin-left: 10px; display:none;">
                <label for="Observaciones" style="display:inline;">Obs: </label>
                <input type="text" id="Observaciones" name="Observaciones" class="input-large"/>
            </div>
            
            <div id="controlchk_Etiqueta" class="control-group" style="display:inline;margin-left: 10px; display:none;">
                <label for="chk_Etiqueta" style="display:inline;">Imprime Etiqueta: </label>
                <input type="checkbox" id="chk_Etiqueta" name="chk_Etiqueta" style="margin-bottom:5px;"/>
            </div>
          </div>

          <div id="controlCant_Dias" class="control-group" style="display:inline;margin-left: 40px;">
                <label for="Cant_Dias" style="display:inline;">Cantidad Dias: </label>
                <input id="Cant_Dias" value="1" type="number" min="1" max="5" maxlength="1" class="span1"/>
                 <input id="btnEntregaRapida" type="button" class="btn btn-success" value="Entrega Rapida" style="margin-bottom:10px;" /> 
            </div>



          <div class="contenedor_4 pagination-centered" style="height:120px; display:none;">
              <form id="frm_Cantidad" class="form-inline" style="margin:10px 25px 0px 25px;">
               <div id="controlcantidad" class="control-group" style="display:inline;"><label for="cantidad" style="font-size:12px;">Dosis a Suministrar: </label><input type="text" id="cantidad" name="cantidad" class="input-mini" style="width:40px;" /></div>
                <div id="controlcantidadent" class="control-group" style="display:none;"><label for="cantidadent" style="font-size:12px;">Dosis Suministrada: </label><input type="text" id="cantidadent" name="cantidadent" class="input-mini numero" style="width:40px;" maxlength="4"/>
                <input type="hidden" id="txt_CantidadAnterior" name="txt_CantidadAnterior"/></div><br />
                <div id="controlUcantidad" class="control-group" style="display:inline;"><label for="Ucantidad" style="margin-top:5px;font-size:12px; margin-right:8px;">Uni. a Suministrar: </label><input type="text" id="Ucantidad" name="Ucantidad" class="input-mini" style="width:40px; margin-top:5px;" /></div>
                <div id="controlUcantidadent" class="control-group" style="display:none;margin-top:10px;"><label for="Ucantidadent" style="margin-top:5px;font-size:12px;margin-right:9px;">Uni. Suministrada: </label><input type="text" id="Ucantidadent" name="Ucantidadent" class="input-mini numero" style="width:40px;margin-top:5px;" maxlength="2"/>
                <input type="hidden" id="txt_UCantidadAnterior" name="txt_UCantidadAnterior"/></div><br />
               <label for="stock_medicamento" style="display:none;">Stock Actual: </label><div id="stock_medicamento" style="display:inline;display:none;"></div>
               <label for="stock_futuro" style="margin-left: 80px; display:none;">Stock Futuro: </label><div id="stock_futuro" style="display:inline;display:none;"></div>
               

               <input id="btnAgregarMedicamento" type="button" class="btn btn-success pull-right" value="Aceptar"  style="margin-right:10px; margin-top:5px;"/>
               <input id="btnCancelarMedicamento" type="button" class="btn btn-danger pull-right" value="Cancelar" style="margin-left:10px; margin-right:20px;margin-top:5px;"/>
               <input type="hidden" id="gramaje_aux" value="" />
               <input type="hidden" id="modificaItem" value='-1' />
              </form>
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:190px;width:100%; font-size:12px;">
              <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>
              <table id="tabla" class="table table-hover table-condensed">
                <thead>
                  <tr>
                   <th></th>
                    <th>Insumo</th>
                    <th>Dosis</th>
                    <th>Frec/Hs</th>
                    <th>Total Dosis</th>
                    <th>Unidades a Entregar</th>
                    <th>Dosis Entregada</th>
                    <th>Unidades Entregada</th>
                    <th>Saldo</th>
                    <th>Unidades Stock</th>
                    <th>Imprime Etiqueta</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div id="EntregasModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:650px; height:400px;">
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

<div class="pie_gris" style="height:40px; padding-left:10px">
<div>
<div style="width: 100%; color: red; font-size:large; float:left; display:none" id="mensaje"><b>COLUMNA "UNIDADES ENTREGADAS" SUMAR MENTALMENTE LAS UNIDADES ENTREGADAS CON LAS QUE SE VAN A ENTREGAR E INGRESAR ESE VALOR.</b></div>
<div  style="height:110px; float:right; width:75%; text-align:right">
  <a id="btnVolver" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <a id="btnCerrarPedido" class="btn btn-success"><i class="icon-lock"></i>&nbsp;Cerrar Entrega</a>
  <a id="btnImprimir" style="display:none;" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</a>
  <a id="btnImprimirPedido" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir Pedido</a>
  <a id="btnConfirmarEntrega" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>


</div>
</div>
</div>
      </div>
    </div>
  </div>
</div>
<!--Pie de p�gina-->




<script src="../js/jquery-3.6.0.js" type="text/javascript"></script>
<script src="../js/bootstrap.js" type="text/javascript" ></script>
<%--<script src="../js/bootstrap-5.0.2.js" type="text/javascript" ></script> --%>
<script src="../source/jquery.fancybox.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<%--<script src="../js/jquery-ui-1.13.1.js" type="text/javascript"></script>--%>
<script src="../js/Hospitales/Farmacia/CargarEntregaIM.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>

<%--  <script type="text/javascript" src="../js/jquery-3.3.1.slim.min.js"></script>--%>
  <script type="text/javascript" src="../js/popper.min.js" ></script>
  <script type="text/javascript" src="../js/bootstrap.min.js" ></script>
  <script type="text/javascript" src="../js/bootstrap-multiselect.js"></script>


<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 20 }, 500);
//        $('.container').height($('html').height() + ($('.contenedor_1').height() -
//				$('.pie').height() -
//				$('#hastaaqui').height()));
    });
    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Entregas por Indicación Médica</strong>";
</script> 
</body>
</html>


