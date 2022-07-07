<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargaRemitoProveedores.aspx.cs" Inherits="Farmacia_CargaRemitoProveedores" %>

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
                      $("#btnConfirmarRemito").attr("disabled", true);
                      //Get_Insumo_by_Id($("#Medicamento_val").html());
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
    <div id="div_inicio" class="contenedor_2"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del Remito del Proveedor</span></div>
      <form class="form-horizontal" id="frm_main" >
        <div class="control-group">
          <label class="control-label">Proveedor</label>
          <div class="controls">
            <select id="cbo_Proveedor">
            
            </select>
          </div>
        </div>
        <div class="control-group" id="controltxtFecha">
          <label class="control-label" >Fecha</label>
          <div class="controls">
            <input id="txtFecha" name="txtFecha" type="text">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtLetra">Letra</label>
          <div class="controls">
            <input id ="txtLetra" type="text" class="span3" maxlength="1">
            </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtNro1">Numero</label>
          <div class="controls">
            <input id ="txtNro1" type="text" class="span1" maxlength="4"> - 
            <input id ="txtNro2" type="text" class="span1" maxlength="8" style="width:80px;">
            </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtObservaciones">Observaciones</label>
          <div class="controls">
            <input id ="txtObservaciones" type="text" class="span3">
           </div>
        </div>
        
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a id="desdeaqui"  class="btn btn-info" style="display:none;">Siguiente</a>
                <a id="btnRemitos" class="btn btn-warning"  style="display:none;">Buscar Remitos</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos">
        
        <div class="datos_remito">
        <div class="datos_resumen_paciente">
          <div>Proveedor: <strong><span id="CargadoProveedor"></span></strong></div>
          <span>Fecha: <strong><span id="CargadoFecha"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Nº Factura: <strong><span id="CargadoFactura"></span></strong></span>
          <div>Observacion: <strong><span id="CargadoObservacion"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;"> <div class="titulo_seccion" id="titulo_remito">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span id="spantitulo">Carga del Remito</span></div>
      <form id="frm_cantidad" name="frm_cantidad">
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:190px;">
            <div class="combos" style="margin-left:5px;">
            <span id="Medicamento_val" style="display:none;">0</span>
            <span class="span1" style="width:100px;">Insumo: </span><select id="cbo_Medicamento">
            </select>
            </div>
            <div class="combos" style="margin-left:5px;">
            <span class="span1" style="width:100px;">Deposito: </span>
                <select id="cbo_Deposito">    
                </select>
            </div>
            <div class="combos" style="margin-left:5px;">
                <span class="span1" style="width:100px;">Cantidad: </span>
                 <input type="text" id="cantidad" name="cantidad" class="input-small" rel='Ingrese Cantidad'/>
            </div>
            <div class="combos" style="margin-left:5px;">
                 <span class="span1" style="width:100px;">Nro. Lote:</span>
                 <input type="text" id="txtLote" name="txtLote" class="input-small" rel='Ingrese Numero de Lote' />
            </div>

          </div>
          <div class="contenedor_4 pagination-centered" style="height:190px;">
                    <div class="combos" style="margin-left:5px;">
                        <span class="span1" style="width:110px;">Precio Compra $:</span>
                        <input type="text" id="txtPrecioCompra" name="txtPrecioCompra" class="input-small" rel='Ingrese Precio de Compra'/>
                    </div>

                    <div class="combos" style="margin-left:5px;">
                         <span class="span1" style="width:110px;">Vencimiento:</span>
                         <input type="text" id="txtFechaVenc" name="txtFechaVenc" class="input-small" rel='Ingrese Fecha de Vencimiento'/>
                    </div>

                    <div class="combos" style="margin-left:5px;">
                    <span class="span1 pull-right"><input id="btnAgregarMedicamento" type="button" style="margin-right: 15px;" class="btn btn-success btn pull-right" value="Agregar" /></span>
                       <span class="span1 pull-right"><input id="btnCancelarMedicamento" style="margin-right: 15px;" type="button" class="btn btn-danger btn pull-right" value="Cancelar" /></span>
                       
                   </div>

                    <input id="btnAgregar_ModMedicamento" type="button" class="btn btn-success btn-mini" value="Agregar" style="visibility:hidden;" />
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>
        </form>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:120px;width:100%; margin-top:-10px;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Cantidad</th>
                    <th>Nro Lote</th>
                    <th>Precio Compra</th>
                    <th>Precio Venta</th>
                    <th>Fecha Vencimiento</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="padding:5px; height:120px;">
  <a href="CargaRemitoProveedores.aspx" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <button id = "btnConfirmarRemito" class="btn btn-success"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
  <button id = "btnPrint" class="btn btn-info" style="display:none;"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
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
<script src="../js/Hospitales/Farmacia/CargaRemitoProveedores.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">
    



    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Remitos de Proveedores</strong>";

</script> 

</body>
</html>


