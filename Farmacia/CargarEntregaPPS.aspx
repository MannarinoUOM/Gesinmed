<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargarEntregaPPS.aspx.cs" Inherits="Farmacia_CargarEntregaPPS" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

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
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos de la Entrega</span></div>
      <form class="form-horizontal" >
         <div class="control-group">
          <label class="control-label" for="cbo_Servicio">Servicio</label>
          <div class="controls">
            <select id="cbo_Servicio"></select>
        </div>
        </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Nro. Pedido: <strong><span id="CargadoNumero"></span></strong>&nbsp;&nbsp;&nbsp;Nro. Entrega: <strong><span id="CargadoEntrega">Provisorio</span></strong>
          <%--<a id="btnHistorial" data-toggle="modal" data-target="#EntregasModal" class="btn" style="margin-left:50px; margin-top:5px;">Ver Historial</a>--%></div>
          
          <span>Fecha: <strong><span id="CargadoFecha"></span></strong></span>&nbsp;&nbsp;&nbsp;
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;">
      
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:120px;width:500px;">
            
            <div id="controlMedicamento" class="control-group" style="display:inline;">
                <span class="span1" style="width:50px; margin-top:20px;">
                  <label for="cbo_Medicamento" style="display:inline; margin-top:10px;">Insumo:</label>
                </span>
                  <input id="cbo_Medicamento" type="text" value="" maxlength="100" style="width:310px;margin-top:10px;"/>
                  <input id="medicamentoId" type="hidden" value="0" />
                  <a id="btnActualizarInsumo" class="btn" style="display:none; margin-top:-5px;">Actualizar</a>
            </div>
            
          </div>
                   <a id="btnEntregaRapida" class="btn btn-info">Entrega Rápida</a>
        </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
             <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
            <div id="TablaMedicamentos" class="tabla" style="height:240px;width:100%; font-size:11px;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Unidades Pedidas</th>
                    <th>Unidades Entregadas</th>
                    <th>Unidades Pendientes</th>
                    <th>Unidades en Stock</th>
                    <th>Observaciones</th>
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

<div class="pie_gris" style="height:50px">
<div class="pull-right" style="padding:5px; height:120px; margin-top:-5px;display: flex;">

<div style="width:60%; color:Red; font-size:small; display:none" id="mensaje"><b>COLUMNA "UNIDADES ENTREGADAS" SUMAR MENTALMENTE LAS UNIDADES ENTREGADAS CON LAS QUE SE VAN A ENTREGAR E INGRESAR ESE VALOR.</b></div>

<div>
  <a id="btnVolver" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <button id = "btnImprimir" style="display:none;" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
  <button id = "btnImprimirPedido" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir Pedido</button>
  <button id = "btnConfirmarEntrega" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
  </div>

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
<script src="../js/Hospitales/Farmacia/CargarEntregaPPS.js" type="text/javascript"></script>
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
    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Entregas por Servicio</strong>";
</script> 

</body>
</html>
