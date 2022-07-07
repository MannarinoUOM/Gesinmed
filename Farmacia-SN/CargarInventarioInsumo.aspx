<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargarInventarioInsumo.aspx.cs" Inherits="Farmacia_CargarInventarioInsumo" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<%--<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />--%>

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
    width: 500px;
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
    width: 500px;
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

                  this.input = $("<input id='txt_Medicamento'>")
          .appendTo(this.wrapper)
          .val(value)
          .attr({
              "title": "",
              "rel": "tooltip"
          })
          .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
          .autocomplete({
              delay: 0,
              minLength: 4,
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
          .attr("title", value + " no se encontro ningun insumo.")
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
   <div class="contenedor_3" style="height:480px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Cargar Inventario</span></div>
       <form id="frm_Medicamentos">
        <div class="row">
            <div class="span8" style="margin-left:50px; margin-top:10px;">
            <span id="Medicamento_val" style="display:none;">0</span>
                <label for="cbo_Medicamento" style="display:inline;">Insumo:</label>
                  <select id="cbo_Medicamento" class="input-xxlarge">
                  
                  </select>
            </div>
          
        </div>
        <div class="row">
            <div class="span4" style="margin-left:50px; margin-top:10px;">
                <div id="controlcantidad" class="control-group">
                <label for="cantidad" style="display:inline;">Cantidad:</label>
                  <input type="text" id="cantidad" name="cantidad" class="input-small" />
                  </div>
            </div>
        </div>
        <div class="row">
            <div class="span4" style="margin-left:50px; margin-top:10px;">
            <div id="controlfecha" class="control-group">
                <label for="fecha" style="display:inline;">Fecha:</label>
                  <input type="text" id="fecha" name="fecha" class="input-small" />
            </div>
            </div>
        </div>
        <div class="row">
            <div class="span4" style="margin-left:50px; margin-top:10px;">
            <div id="controlhora" class="control-group">
                <label for="hora" style="display:inline;">Hora:</label>
                  <input type="text" id="hora" name="hora" class="input-small" />
                  </div>
            </div>
        </div>
        <div class="row">
             <div class="span4" style="margin-left:250px; margin-top:10px;">
               <input id="btnCargar" type="button" class="btn btn-success" value="Cargar" style="width:200px;" />
            </div>
        </div>
        </form>
        
      </div>
    </div>
  </div>

<!--Pie de p�gina-->


<%--<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Farmacia/CargaInventarioInsumo.js" type="text/javascript"></script> 
<script src="../js/General.js" type="text/javascript"></script>
        <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>--%>

<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
 <script src="../js/Hospitales/Farmacia/CargaInventarioInsumo.js" type="text/javascript"></script> 
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">

    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Carga de Inventario de Insumos</strong>";

</script> 

</body>
</html>

