<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargarPedidoporPaciente.aspx.cs" Inherits="Farmacia_CargarPedidoporPaciente" %>

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
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../js/jquery-ui.js"></script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
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
            <input id="txt_dni"type="text" maxlength="8" placeholder="Ingrese el DNI sin puntos">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >NHC</label>
          <div class="controls">
            <input id="txtNHC" type="text" maxlength="11" placeholder="Ej: 99123456789">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" maxlength="60" placeholder="Apellido Nombre"type="text" class="span3">
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
                          <div id="cargando_botones" style="text-align:center; display:none;">
                    
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>

      <div class="control-group" id="botones">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="CargarPedidoporPaciente.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none; margin-right:5px;" class="btn btn-info">Siguiente</a>
                <a id="btnPedidos" class="btn btn-warning">Buscar Pedidos</a>
                <a id ="btnOtroPaciente" class="btn btn-danger" style="display:none;" href="CargarPedidoporPaciente.aspx">Otro Paciente</a>
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:70px;">
        
        <div class="datos_persona">
        <div><img id ="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
        <div class="datos_resumen_paciente">
          <div>Nro. Pedido: <strong><span id="CargadoPedido">Provisorio</span></strong>&nbsp;&nbsp;&nbsp;Fecha: <strong><span id="CargadoFecha"></span></strong>&nbsp;&nbsp;&nbsp;Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSala"></span></strong></span></div>
          <div><strong><span id="CargadoCama"></span></strong>&nbsp;&nbsp;&nbsp;<span style="display:none;">Teléfono: <strong><span id="CargadoTelefono"></span></strong></span></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos del Pedido</span></div>
      
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:95px;">
           

            <div class="combos" style="margin-left:10px; display:none;">
                    <label for="cbo_Monodroga" style="display:inline; width:80px;" class="span1">Monodroga:</label>
                    <span id="cbo_Monodroga_val" style="display:none;">0</span>
                      <select id="cbo_Monodroga" style="margin-top:-5px;">
                      </select>
            </div>

             <div class="combos" style="margin-left:10px;">
                <label for="cbo_Medicamento" style="display:inline;width:80px;" class="span1">Insumo:</label>
                    <input type="text" id="cbo_Medicamento" data-provide="typeahead" autocomplete="off" style="width:205px;margin-top:-5px;" />
             </div>


            <div class="combos" style="margin-left:10px;">
             <label for="cbo_Deposito" style="display:inline;" class="span1">Depósito:</label>   
                <select id="cbo_Deposito" style="margin-left:20px; margin-top:-5px;">
                
                </select>
            </div>
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:95px;">
              <form id="frm_Cantidad" class="form-inline" style="margin:10px 25px 0px 25px;">
                <div id="Medicamento_val" style="display:none;">0</div>
                <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
               <div id="controlcantidad" class="control-group" style="display:inline;"><label for="cantidad">Cantidad: </label><input type="text" id="cantidad" name="cantidad" style="margin-top:-5px; margin-left:5px; width:30px;" class="input-mini numero" maxlength="2" /></div><br />
               <label for="stock_medicamento" style="display:none;">Stock Actual: </label><div id="stock_medicamento" style="display:inline;display:none;"></div>
              <label for="precio_medicamento" style="display:none;">Precio($): </label><div id="precio_medicamento" style="display:inline;display:none;"></div>
               
               <input id="btnAgregarMedicamento" type="button" class="btn btn-success pull-right" value="Agregar"  style="margin-right:10px;"/>               
               <input id="btnCancelarMedicamento" type="button" class="btn btn-danger pull-right" value="Cancelar" style="margin-left:10px; margin-right:20px;"/>
               

              </form>
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:220px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Cantidad</th>                    
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="height:120px;">
  <a href="CargarPedidoporPaciente.aspx" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <a id="btnImprimir" class="btn btn-info" style="display:none;"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</a>
  <a id="btnConfirmarPedido" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
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
<script src="../js/Hospitales/Farmacia/CargarPedidoPaciente.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>


<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        List_Depositos();
        $("#btnImprimir").hide();
        $("#CargadoServicio").html($("#cbo_Servicio :selected").text());
    });
    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Pedidos por Paciente Ambulatorio</strong>";
</script> 

</body>
</html>

