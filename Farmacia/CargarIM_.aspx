<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargarIM.aspx.cs" Inherits="Farmacia_CargarIM" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <%--<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>--%>
    <script src="../js/jquery-ui.js"></script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
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
          <label class="control-label" for="cbo_Medicos">Médico</label>
          <div class="controls">
            <select id="cbo_Medicos"></select>
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
                <a id="btnOtroPaciente" href="CargarIM.aspx" class="btn btn-danger" style="display:none; margin-left:5px;">Otro Paciente</a>
                <a id="btnVolver_Quiro_arriba" href="#" class="btn btn-danger" style="display:none; margin-left:5px;">Volver</a>  
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Nro. de Pedido por Indicación Médica: <strong><span id="CargadoPedido">Provisorio</span></strong>&nbsp;&nbsp;&nbsp; Fecha: <strong><span id="CargadoFecha"></span></strong></div>
          Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a>&nbsp;&nbsp;&nbsp;<span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="CargadoSala"></span></strong></span> </div>
          <div> Cama: <strong><span id="CargadoCama"></span></strong>&nbsp;&nbsp;&nbsp;
          Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp;
          <span style="display:none;">Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:450px;">
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:190px; width:95%;">
            
              <div class="combos" style="margin-left:8px;">
                    <span style="width:100px; margin-right:10px; display:none;">Monodroga:</span>
                    <span id="cbo_Monodroga_val" style="display:none;">0</span>
                      <select id="cbo_Monodroga" style="display:none;">
                      </select>
                    Insumo:
                    <input type="text" id="cbo_Medicamento" data-provide="typeahead" autocomplete="off" style="width:207px; margin-left:47px;" />
                    Medida: 
                    <select id="cbo_Medida" class="input-small">          
                    </select>
                    Via:  
                    <select id="cbo_Via" class="input-small">
                    </select>
            </div>
           
            <div class="combos" style="margin-left:8px; display:inline;">
               <span style="width:100px;">Presentación:</span> <select id="cbo_Presentacion" style="margin-left:12px;"></select>
            Cant. Suministrada: <input type="text" id="cantidad" name="cantidad" class="input-mini numero" maxlength="4" style="width:40px;"/>
            Cada:<input type="text" id="txtHoras" name="txtHoras" class="input-mini numero" style="width:20px;" maxlength="2"/>&nbsp;Hs.
            <input id="btnAgregarMedicamento" type="button" style="margin-right:25px;" class="btn btn-success btn pull-right" value="Agregar" />
            <input id="btnCancelarMedicamento" type="button" style="margin-right:35px;" class="btn btn-danger btn pull-right" value="Cancelar" />
            </div>
            &nbsp;&nbsp;Observaciones: <input type="text" id="Observaciones" name="Observaciones" maxlength="100" class="span9" style="width:85%;" />
            &nbsp;&nbsp;Indicación: <textarea id="Indicacion" name="Indicacion" rows="2" col="50" style="width:740px; margin-left:30px;"></textarea>
          </div>
                <div id="Medicamento_val" style="display:none;">0</div>
                <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
               
               <label for="stock_medicamento" style="margin-left:5px;"></label><div id="stock_medicamento" style="display:inline; display:none;"></div>
              <input type="checkbox" id="chk_Horas" style="margin-left:5px; display:none;" checked/>
               <div id="controlCheck" class="control-group" style="display:inline; margin-right:5px;display:none;">Ocultar en IM<input type="checkbox" id="ocultarIM" name="ocultarIM" style="margin-right:5px; margin-left:5px; display:none;"/><input type="checkbox" id="vademe" name="vademe" style="margin-left:5px; margin-right:5px;display:none;" /></div>
        </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            <div class="clearfix"></div>
           <div id="TablaMedicamentos" class="tabla" style="height:200px;width:100%;">
              <div id="cargando2" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>
              <table id="tabla" class="table table-hover table-condensed" style=" font-size:10px;">
                <thead>
                  <tr style="font-size:10pt">
                    <th></th>
                    <th>Insumo/Indicación</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                    <th>Presentación</th>
                    <th>Vía</th>
                    <th>Frecuencia(Hs.)</th>
                  </tr>
                </thead>
              </table>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="pie_gris">
        <div class="pull-right" style="height:120px;">
          <a id="btnVolver" class="btn">Volver</a>
          <button id = "btnConfirmarPedido" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
          <button id = "btnImprimir" class="btn btn-info" style="display:none;"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
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
<script src="../js/Hospitales/Farmacia/CargarIM.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });
    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Pedidos por Indicación Médica</strong>";
</script> 
</body>
</html>

