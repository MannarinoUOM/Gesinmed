<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargaPracticasMedicasHC_Medicos.aspx.cs" Inherits="Facturacion_CargaPracticasMedicasHC_Medicos" %>

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
    <script src="../js/jquery-ui.js" type="text/javascript"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />

<style>
  .custom-combobox 
  {
      width: 300px;
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
    width: 300px;
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

                  this.input = $("<input id='txtModulo'>")
          .appendTo(this.wrapper)
          .val(value)
          .attr({
              "title": "",
              "rel": "tooltip"
          })
          .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
          .autocomplete({
              delay: 0,
              minLength: 0,
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
                      var text = $(this).attr("title");
                      var text_short = $(this).text();
                      var value = $(this).attr("value");
                      if (this.value && (!request.term || matcher.test(text))) {
                          return {
                              label: text_short,
                              value: text_short,
                              option: this
                          };
                      }
                  }));
              },

              _removeIfInvalid: function (event, ui) {

                  // Selected an item, nothing to do
                  if (ui.item) {
                      $("#codigo").val(this.element.children(":selected").val());
                      this.input.attr("rel", "tooltip");
                      this.input.attr("title", this.element.children(":selected").attr("title"));
                      if ($("[rel=tooltip]").length) {
                          $("[rel=tooltip]").tooltip();
                      }
                      ValorModulo();
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
          $("#cbo_Modulo").combobox();
          //          $("#toggle").click(function () {
          //              $("#combobox").toggle();
          //          });
      });


  </script>



</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="height:520px; width:700px; margin: 10px 40px 10px 40px;"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del Parte de Médico</span></div>
      <form class="form-horizontal" id="frm_Inicio" >
        <div class="control-group" id="controltxtNroParte">
          <label class="control-label">Nro. Parte</label>
          <div class="controls">
            <input id="txtNroParte" name="txtNroParte" type="text" maxlength="8" placeholder="Nro.Parte">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >Fecha de Carga</label>
          <div class="controls">
            <input id="txtFechaCarga" name="txtFechaCarga" type="text">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="cbo_Medico">Médico</label>
          <div class="controls">
            <select id="cbo_Medico" name="cbo_Medico" class="span5"></select>
        </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="cbo_Centro">Centro</label>
          <div class="controls">
            <select id="cbo_Centro" name="cbo_Centro" class="span5"></select>
        </div>
        </div>
            <div class="control-group"><label class="control-label" style="margin-right:10px;">Tipo</label>
                             <input id="rdAmbu" name="grupoCab" type="radio" class="input-xlarge" checked="checked" style="vertical-align:middle; display:inline;" /><label for="rdAmbu" style="display:inline; margin-right:5px;""> Ambulatorio</label>
                             <input id="rdInt" name="grupoCab" type="radio" class="input-xlarge" style="vertical-align:middle;" /><label for="rdInt" style="display:inline;"> Internación</label>
            </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="CargaPracticasMedicasHC_Medicos.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Médico</a>
                <a id="btnBuscar" href="BusquedadePartes_Medicos.aspx" class="btn btn-warning"><i class="icon-search"></i>Buscar Partes</a> 
                <a id="desdeaqui" class="btn btn-info">Siguiente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona" >
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Fecha: <strong><span id="CargadoFecha"></span></strong></div>
          <div>Médico: <strong><span id="CargadoMedico"></span></strong></div>
          <div>Centro: <strong><span id="CargadoCentro"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;"> <%--<div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Prácticas Ambulatorias/Internación</span></div>--%>
      
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaPracticas" class="tabla" style="height:190px;width:100%; margin-bottom:10px;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>F.Práctica</th>
                    <th>F.Rendición</th>
                    <th>Tipo</th>
                    <th>Fact</th>
                    <th>Cantidad</th>
                    <th>Código</th>
                    <th>Práctica</th>
                    <th>%</th>
                    <th>Imp. Unit</th>
                    <th>Imp. Total</th>
                  </tr>
                </thead>

              </table>
            </div>

        </div>
        <div class="clearfix"></div>
        <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" id="tabCab" data-toggle="tab">Cabecera Prac/Mod</a></li>
                <li><a href="#tab2" id="tabPrac" data-toggle="tab">Práctica</a></li>
            </ul>

             <form id="frm_Internacion">
          <div class="tab-content" style="height:150px;">
         

            <div class="tab-pane active" id="tab1" style="height:150px;">
            
                 <div class="row">
                      <div class="span5">
                        <div id="controlrdModulo" class="control-group">
                             <input id="rdModulo" name="grupo2" type="radio" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="rdModulo" style="display:inline; margin-left:5px; margin-right:5px;">Módulo</label>
                        </div>
                    </div>
                        <div class="span5">
                            <div id="controlrdPractica" class="control-group">
                                    <input id="rdPractica" name="grupo2" checked="checked" type="radio" class="input-xlarge" style="vertical-align:middle;" /><label for="rdPractica" style="display:inline; margin-left:5px; margin-right:5px;">Práctica</label>
                                </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span3">
                            <div id="controlfechapractica" class="control-group">
                            <label for="fechapractica" style="display:inline;">F.Práctica: </label><input id="fechapractica" name="fechapractica" type="text" class="input-mini" style="width:85px;">
                            </div>
                        </div>
                          <div class="span3">
                            <div id="controlfecharendicion" class="control-group">
                            <label for="fecharendicion" style="display:inline;">F.Rendición: </label><input id="fecharendicion" name="fecharendicion" type="text" class="input-mini" style="width:85px;">
                            </div>
                        </div>
                          <div class="span5">
                            <label for="cbo_Servicio" style="display:inline;">Servicio: </label><select id="cbo_Servicio" name="cbo_Servicio"></select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span5" id="controlcbo_Especialidad">
                            <label for="cbo_Especialidad" style="display:inline;">Especialidad: </label><select id="cbo_Especialidad" name="cbo_Especialidad"></select>
                        </div>
                        <div class="span5" id="controlcbo_ModulosEnc" style="display:none;">
                            <label for="cbo_ModulosEnc" style="display:inline;">Encabezado: </label><select id="cbo_ModulosEnc" name="cbo_ModulosEnc" style="width:290px;">
                            </select>
                        </div>
                        <div style="margin-right:50px;">
                       <input id="btnCancelar_" type="button" class="btn btn-danger btn-mini pull-right" style="margin-right:10px;" value="Cancelar" />
                            <input id="btnAgregar_" type="button" class="btn btn-mini pull-right" style="margin-right:10px;" value="Agregar" />
                            </div>
                    </div>
                    
         </div>
         <div class="tab-pane" id="tab2">
          <div class="row">
                        <div class="span2">
                            <div id="controlcantidad" class="control-group">
                            <label for="cantidad" style="display:inline;">Cantidad: </label><input id="cantidad" name="cantidad" type="text" class="input-mini">
                            </div>
                        </div>
                          <div class="span2">
                          <div id="controlporcentaje" class="control-group">
                            <label for="porcentaje" style="display:inline;">%: </label><input id="porcentaje" name="porcentaje" value="100" type="text" class="input-mini" title="% a Cobrar" rel="tooltip">
                            </div>
                        </div>
                          <div class="span2">
                          <div id="controlcodigo" class="control-group">
                            <label for="codigo" style="display:inline;">Código: </label><input id="codigo" name="codigo" type="text" class="input-mini">
                            </div>
                        </div>
                         <div class="span5" id="controlcbo_Practica">
                            <label for="cbo_Practica" style="display:inline;">Práctica: </label><select id="cbo_Practica" name="cbo_Practica"></select>
                        </div>
                        <div class="span5" id="controlcbo_Modulo" style="display:none;">
                            <label for="cbo_Modulo" style="display:inline;">Módulo: </label><select id="cbo_Modulo" rel="tooltip" name="cbo_Modulo"></select>
                        </div>
           </div>
            <div class="row">
                        <div class="span2">
                        <div id="controlprecio" class="control-group">
                            <label for="precio" style="display:inline;">Precio: </label><input id="precio" name="precio" type="text" class="input-mini">
                        </div>    
                        </div>
                          <div class="span2">
                          <div id="controltotal" class="control-group">
                            <label for="total" style="display:inline;">Total: </label><input id="total" name="total" type="text" class="input-mini">
                            </div>
                        </div>
<%--                          <div class="span2">
                        <div id="controlchkFacturado" class="control-group">
                             <input id="chkFacturado" name="chkFacturado" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="chkFacturado" style="display:inline; margin-left:5px; margin-right:5px;">Facturarlo</label>
                        </div>
                         </div>
                         <div class="span2">
                            <div id="controlchkAPE" class="control-group">
                                    <input id="chkAPE" name="chkAPE" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkAPE" style="display:inline; margin-left:5px; margin-right:5px;">APE</label>
                                </div>
                        </div>--%>
                    </div>
                   

                    <div class="row">
                        <div class="span5">
                            <input id="btnCancelar" type="button" class="btn btn-danger btn-mini" style="margin-right:10px;" value="Cancelar" />
                            <input id="btnAgregar" type="button" class="btn btn-mini" style="margin-right:10px;" value="Agregar" />
                        </div>
                    </div>
                   
          </div>
          </div>
          </form> 
        </div>
                 

 <div class="clearfix"></div>
<%--<div id="Total" style="float:left; color:Red; font-size:medium; font-weight:bold; margin: 5px 5px 5px 5px;">Total $ </div>--%>
<div class="pie_gris">
  <a id = "btnConfirmar" class="btn btn-info pull-right"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
  <a id = "btnBaja" class="btn btn-danger pull-right" style="display:none;"><i class=" icon-arrow-down icon-white"></i>&nbsp;Baja</a>
  <a id = "btnImprimir" class="btn pull-right"><i class=" icon-print"></i>&nbsp;Imprimir</a>
  <a href="CargaPracticasMedicasHC_Medicos.aspx" class="btn pull-right "><i class=" icon-arrow-left"></i>&nbsp;Volver</a>

</div>
<div class="clearfix"></div>

      </div>
    </div>
  </div>
</div>

<!--Pie de p?gina-->


<%--<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>--%>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<%--<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>--%>
<script src="../js/Hospitales/Facturacion_Cap/CargaPracticasMedicasHC_Medicos.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">

    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Carga de Parte Honorario Médicos</strong>";

</script> 

</body>
</html>

