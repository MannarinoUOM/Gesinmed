<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BonoContribucion.aspx.cs" Inherits="Farmacia_BonoContribucion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form class="form-horizontal" id="inicio" >
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
            <input id ="txtPaciente" placeholder="Apellido Nombre" maxlength="60" type="text" class="span3">
            <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black"></i></a> </div>

        </div>
        
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="DarTurnos.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Seccional/OS: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos del Bono</span></div>
      
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:120px;">
            <div style="margin:10px 0px 0px 10px">
              <select class="span5" id="cbo_Medicamento">
                <option value="0">Insumo</option>
              </select>
            
            </div>
            <form class="form-inline" style="margin:0px 25px 0px 25px;">
              <label for="stock_medicamento">Stock Actual: </label><div id="stock_medicamento" style="display:inline;"></div><br />
              <label for="precio_medicamento">Precio($): </label><input type="text" id="precio_medicamento" name="precio_medicamento" style="display:inline; width:60px;"/>
            </form>
          </div>
          <div class="contenedor_4 pagination-centered" style="height:120px;">
              <form id="frm_Cantidad" class="form-inline" style="margin:10px 25px 0px 25px;">
               <div id="controlcantidad" class="control-group" style="display:inline;"><label for="cantidad">Cantidad: </label>&nbsp;&nbsp;<input rel="tooltip" title="cantidad" type="text" id="cantidad" name="cantidad" class="input-mini" /></div>&nbsp;&nbsp;&nbsp;&nbsp;<input rel="tooltip" title="total por blister" type="text" id="cantidadx" value="1" style="display:none;" class="input-mini" /><br /><br />
               <div id="controldescuento" class="control-group" style="display:inline; display:none;"><label for="descuento" style="display:none;">Descuento (%) : </label><input type="text" id="descuento" name="descuento" style="display:none;" class="input-mini" /></div>
               <input id="btnCancelarMedicamento" type="button" class="btn btn-danger btn-mini" value="Cancelar" />
               <input id="btnAgregarMedicamento" type="button" class="btn btn-success btn-mini" value="Agregar" />
              </form>
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:192px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                    <th style="display:none;">Descuento</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>




<%--<div id="Total" style="float:left; color:Red; font-size:medium; font-weight:bold; margin: 5px 5px 5px 5px;">Total $ </div>--%>
<div class="pie_gris">
<div class="box_informativo_a pull-left"><div style="padding-top:3px"><strong id="Total">Precio TOTAL : $ 0</strong></div>          
</div>
  <a id = "btnConfirmarBonoContribucion" class="btn btn-info pull-right"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
  <a id="btnContraMovimiento" type="button" style="display:none;" class="btn pull-right">Contramovimiento</a>
  <a href="BonoContribucion.aspx" class="btn pull-right "><i class=" icon-arrow-left"></i>&nbsp;Volver</a>

</div>
<div class="clearfix"></div>
      </div>
    </div>
  </div>
</div>

<!--Pie de p?gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/Hospitales/Farmacia/NuevoBonoContribucion.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Bono Contribución</strong>";

</script> 

</body>
</html>
