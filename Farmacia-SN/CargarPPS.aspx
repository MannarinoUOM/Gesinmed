<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargarPPS.aspx.cs" Inherits="Farmacia_CargarPPS" %>


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
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>

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

                  this.input = $("<input id='txt_Medicamento' style='width:250px;'>")
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
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del Pedido</span></div>
      <form class="form-horizontal" >
      <div class="control-group" style="display:none;">
          <label class="control-label" for="Numero">Numero</label>
          <div class="controls">
            <label style="font-weight:bold;">Provisorio</label>
        </div>
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
                <a id="desdeaqui" class="btn btn-info">Siguiente</a>
                <a id="btnPedidos" class="btn btn-warning">Buscar Pedidos</a>  
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona">
        <div class="datos_resumen_paciente">
        <div>Nro. Pedido: <strong><span id="CargadoPedido">Provisorio</span></strong></div>
          <div style="display:none;">Numero: <strong><span id="CargadoNumero"></span></strong></div>
          <span>Fecha: <strong><span id="CargadoFecha"></span></strong></span>&nbsp;&nbsp;&nbsp;
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Datos del Pedido</span></div>
      
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:125px;">
            
            <div class="combos" style="margin-left:10px;">
            <label for="cbo_Medicamento" style="display:inline;" class="span1">Insumo:</label>
            <span id="Medicamento_val" style="display:none;">0</span>
                  <select id="cbo_Medicamento">
                  </select>
            </div>
            
            <div class="combos" style="margin-left:10px;">
             <label for="cbo_Deposito" style="display:inline;" class="span1">Deposito:</label>   
                <select id="cbo_Deposito">
                
                </select>
            </div>
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:125px;">
              <form id="frm_Cantidad" class="form-inline" style="margin:10px 25px 0px 25px;">
               <div id="controlcantidad" class="control-group" style="display:inline;"><label for="cantidad">Cantidad: </label><input type="text" id="cantidad" name="cantidad" class="input-mini" /></div><br />
               <label for="stock_medicamento" style="display:none;">Stock Actual: </label><div id="stock_medicamento" style="display:inline;display:none;"></div><br /><div id="precio" style="display: none;"></div>
              <label for="stock_minimo" style="display:none;">Stock Minimo: </label><div id="stock_minimo" style="display:inline;display:none;"></div><br />
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
            <div id="TablaMedicamentos" class="tabla" style="height:192px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Pedido</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="padding:5px; height:120px;">
  <a href="CargarPPS.aspx" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <button id ="btnImprimir" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
  <button id ="btnConfirmarPedido" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
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
<script src="../js/Hospitales/Farmacia/CargarPPS.js" type="text/javascript"></script>
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

        $("#CargadoServicio").html($("#cbo_Servicio :selected").text());
        if ($("#CargadoServicio").html() == "GUARDIA" && $("#CargadoPedido").html() == "Provisorio") CargarPlantilla();
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Pedidos por Servicio</strong>";

</script> 

</body>
</html>


