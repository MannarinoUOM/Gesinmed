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
  <%--<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />--%>
<%--  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>--%>
  <script src="../js/jquery-ui_combo.js" type="text/javascript"></script>
  <link rel="stylesheet" href="/resources/demos/style.css" />

<style>
  .custom-combobox 
  {
      width: 220px;
    position: relative;
    display: inline-block;
  }
  .custom-combobox-toggle {
    position: absolute;
    top: 0;
    bottom: 0;
    margin-left: -1px;
    padding: 0;
    /* support: IE7 */
    *height: 1.7em;
    *top: 0.1em;
  }
  .custom-combobox-input {
    width: 220px;
    margin: 0;
    padding: 0.3em;
  }
  </style>
  <script>
      (function ($) {
          $.widget("custom.combobox", {
              _create: function () {
                  this.wrapper = $("<span>")
          .addClass("custom-combobox")
          .insertAfter(this.element);

                  this.element.hide();
                  this._createAutocomplete();
                  this._createShowAllButton();
              },

              _createAutocomplete: function () {
                  var selected = this.element.children(":selected"),
          value = selected.val() ? selected.text() : "";

                  this.input = $("<input id='txt_Medicamento' style='width:300px;'>")
          .appendTo(this.wrapper)
          .val(value)
          .attr({
              "title": "",
              "rel": "tooltip"
          })
          .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
          .autocomplete({
              delay: 0,
              minLength: 3,
              source: $.proxy(this, "_source")
          })
          .tooltip({
              tooltipClass: "ui-state-highlight"
          });

                  this._on(this.input, {
                      autocompleteselect: function (event, ui) {
                          ui.item.option.selected = true;
                          this._trigger("select", event, {
                              item: ui.item.option
                          });
                      },

                      autocompletechange: "_removeIfInvalid"
                  });
              },

              _createShowAllButton: function () {
                  var input = this.input,
          wasOpen = false;

                  $("<a>")
          .attr("tabIndex", -1)
          .attr("title", "Show All Items")
          .tooltip()
          .appendTo(this.wrapper)
          .button({
              icons: {
                  primary: "ui-icon-triangle-1-s"
              },
              text: false
          })
          .removeClass("ui-corner-all")
          .addClass("custom-combobox-toggle ui-corner-right")
          .mousedown(function () {
              wasOpen = input.autocomplete("widget").is(":visible");
          })
          .click(function () {
              input.focus();

              // Close if already visible
              if (wasOpen) {
                  return;
              }

              // Pass empty string as value to search for, displaying all results
              input.autocomplete("search", "");
          });
              },

              _source: function (request, response) {
                  var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                  response(this.element.children("option").map(function () {
                      //                      var text = $(this).attr("title");
                      var text = $(this).text();
                      var value = $(this).attr("value");
                      if (this.value && (!request.term || matcher.test(text))) {
                          return {
                              label: text,
                              value: text,
                              option: this
                          };
                      }
                  }));
              },

              _removeIfInvalid: function (event, ui) {

                  // Selected an item, nothing to do
                  if (ui.item) {
                      $("#Medicamento_val").html(this.element.children(":selected").val());
                      Get_Insumo_by_Id($("#Medicamento_val").html());
                      Get_StockbyId($("#Medicamento_val").html());
                      return;
                  }

                  // Search for a match (case-insensitive)
                  var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
                  this.element.children("option").each(function () {
                      if ($(this).text().toLowerCase() === valueLowerCase) {
                          this.selected = valid = true;
                          return false;
                      }
                  });

                  // Found a match, nothing to do
                  if (valid) {
                      return;
                  }

                  // Remove invalid value
                  this.input
          .val("")
          .attr("title", value + " didn't match any item")
          .tooltip("open");
                  this.element.val("");
                  this._delay(function () {
                      this.input.tooltip("close").attr("title", "");
                  }, 2500);
                  this.input.data("ui-autocomplete").term = "";
              },

              _destroy: function () {
                  this.wrapper.remove();
                  this.element.show();
              }
          });
      })(jQuery);

      $(function () {
          $("#cbo_Medicamento").combobox();
      });


  </script>


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
          <label class="control-label" >NHC</label>
          <div class="controls">
            <input id="txtNHC" type="text" placeholder="Ej: 99123456789">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" placeholder="Apellido Nombre"type="text" class="span3">
            <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>
         <div class="control-group">
          <label class="control-label" for="cbo_Medicos">Médico</label>
          <div class="controls">
            <select id="cbo_Medicos"></select>
        </div>
        </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="CargarPedidoporPaciente.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none; margin-right:5px;" class="btn btn-info">Siguiente</a>
                <a id="btnPedidos" class="btn btn-warning">Buscar Pedidos</a>
                <a id="btnOtroPaciente" href="CargarIM.aspx" class="btn btn-danger" style="display:none; margin-left:5px;">Otro Paciente</a>    
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Nro. de Pedido por Indicación Médica: <strong><span id="CargadoPedido">Provisorio</span></strong>&nbsp;&nbsp;&nbsp; Fecha: <strong><span id="CargadoFecha"></span></strong>&nbsp;&nbsp;&nbsp;Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="CargadoSala"></span></strong></span> </div>
          <div> Cama: <strong><span id="CargadoCama"></span></strong>&nbsp;&nbsp;&nbsp;<span style="display:none;">Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos de la Indicación Médica</span></div>
      
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:150px;">
            
            <div class="combos" style="margin-left:5px;">
            <label for="cbo_Medicamento" style="display:inline;">Insumo:</label>
            <span id="Medicamento_val" style="display:none;">0</span>
                  <select id="cbo_Medicamento">

                  </select>
            </div>
            
            <div class="combos" style="margin-left:5px;">
             <label for="cbo_Medida" style="display:inline;">Medida:</label>   
                <select id="cbo_Medida" class="input-small">
                
                </select>
             <label for="cbo_Via" style="display:inline;">Via:</label>   
                <select id="cbo_Via" class="input-small">
                </select>
            </div>

           

            <div class="combos" style="margin-left:5px; display:inline;">
             <label for="cbo_Presentacion" style="display:inline;">Presentacion:</label>   
                <select id="cbo_Presentacion">
                
                </select>
            </div>

        
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:150px;">
              <form id="frm_Cantidad" class="form-inline" style="margin:10px 25px 0px 25px;">
               <div id="controlcantidad" class="control-group" style="display:inline;"><label for="cantidad">Cantidad Suministrada: </label><input type="text" id="cantidad" name="cantidad" class="input-mini" /></div><label for="Horas">Cada: </label><div id="Horas" style="display:inline;"><input type="text" id="txtHoras" name="txtHoras" class="input-mini" style="width:40px;"/>&nbsp;Hs.
               <label for="stock_medicamento" style="margin-left:5px;"></label><div id="stock_medicamento" style="display:inline; display:none;"></div>
              <input type="checkbox" id="chk_Horas" style="margin-left:5px; display:none;" checked/></div><br /><br />
               <div id="controlCheck" class="control-group" style="display:inline; margin-right:5px;display:none;">Ocultar en IM<input type="checkbox" id="ocultarIM" name="ocultarIM" style="margin-right:5px; margin-left:5px; display:none;"/><input type="checkbox" id="vademe" name="vademe" style="margin-left:5px; margin-right:5px;display:none;" /></div>
               
                <input id="btnAgregarMedicamento" type="button" style="margin-right:5px;" class="btn btn-success btn pull-right" value="Aceptar" />
               <input id="btnCancelarMedicamento" type="button" style="margin-right:5px;" class="btn btn-danger btn pull-right" value="Cancelar" />
              
               
               

              </form>
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
           <label for="controlIndicacion">Indicación: </label>
           <div id="controlIndicacion" style="display:inline;"><textarea id="Indicacion" name="Indicacion" rows="10" col="50" style="height:160px; width:400px;"></textarea></div>
        
             <label for="controlObservaciones" style="display:none;">Observaciones: </label>
           <div id="controlObservaciones" style="display:inline; display:none;"><textarea id="Observaciones" name="Observaciones" rows="10" col="50" style="height: 40px; width:400px;"></textarea></div>

        </div>
        <div class="clearfix"></div>
      </div>

<div class="contenedor_3" style="height:410px;"> <div class="titulo_seccion" id="tituloIM">
      <img src="../img/3.jpg"/>&nbsp;&nbsp;<span>Detalles de la Indicación Médica</span></div>
       <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:300px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo/Indicación</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                    <th>Presentación</th>
                    <th>Via</th>
                    <th>Horas</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div  style="height:120px;width:100%;background-color:#CCCCCC;margin-top:5px;">
<div class="pull-right" style="padding:5px; height:120px;">
  <a href="CargarIM.aspx" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
   <a id="btnSubir" class="btn"><i class=" icon-arrow-up"></i>&nbsp;Agregar...</a>
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

