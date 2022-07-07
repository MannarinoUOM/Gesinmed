<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Preparacion.aspx.cs" Inherits="Laboratorio_Preparacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Laboratorio";
     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px; display:block;">

           <div class="clearfix">
            </div>
            <div id="hastaaqui">


                  
  <div class="tab-content">
    
    
  <div class="tab-pane active" id="CEst">

                <div class="contenedor_3">
                    <div class="titulo_seccion">
                        <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Estudios</span></div>
                   

                    <div class="contenedor_5" style="height:300px;">
                        <div class="titulo_contenedor_4">
                            Ingreso de prácticas</div>
                        <div style="padding: 10px">                            
                            <div id="ControltxtCodigo" class="control-group">
                            <input id="txtCodigo" type="text" maxlength="7" class="span1" placeholder="Código">
                            <select id="cbo_Practicas" style="width: 215px">
                                <option value="0"></option>
                            </select>
                            </div>

                            <div id="ControltxtSubCodigo" class="control-group">
                            <input id="txtSubCodigo" maxlength="7" type="text" class="span1" placeholder="Código">
                            <select id="cbo_SubPracticas" style="width: 215px">
                                <option value="0"></option>
                            </select>
                            </div>
                            

                            <div class="pull-right">
                                <button id="btnCancelarPractica" class="btn btn-danger btn-mini">
                                    <i class="icon-remove-circle icon-white"></i>Cancelar</button>
                                <button id="btnAgregarPractica" class="btn btn-mini">
                                    <i class="icon-plus-sign icon-white"></i>Agregar</button>
                            </div>
                            <div class="clearfix">
                            </div>
                        </div>
                    </div>
                    <!--Tabla de estudios-->
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaPracticas" class="tabla" style="height: 300px; width: 520px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Código
                                        </th>
                                        <th>
                                            Práctica
                                        </th>              
                                        <th>
                                            Sub Práctica
                                        </th>                                        
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        </form>
                        </div>
                                          <div class="clearfix">
                    </div>
                        <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
                            <div class="pull-right" style="padding: 5px">
                                <a href="Laboratoriointernacion.aspx" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                                <button id="btnObtenerPreparacion" class="btn btn-info">
                                    <i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
                            </div>
                        
                        
                        
                    </div>
  
                </div>
               </div>
</div>
            </div>
        </div>
    </div>
    <!-- Modal -->



    <div id="ModalError" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <h3 id="myModalLabel">
                Error en Turno</h3>
        </div>
        <div class="modal-body">
            <p>
                <span id="DialogoError"></span>
            </p>
        </div>
        <div class="modal-footer">
            <button id="CerrarError" class="btn" data-dismiss="modal" aria-hidden="true">
                Cerrar</button>
        </div>
    </div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>

    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script> 

    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/Hospitales/ObraSociales/ObraSociales.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Laboratorio/LaboratorioInternacion.js" type="text/javascript"></script>



    <script>

        $('#desdeaqui').click(function () {
            $("#hastaaqui").fadeIn(1500);
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        });



        $('#uom_boton').toggle(
   function () {
       $('#barra_sup').animate({ top: "-93" }, 200);
       $('#lightbox').fadeOut(200);

   },
   function () {
       $('#barra_sup').animate({ top: "0" }, 200);
       $('#lightbox').fadeIn(200);
       $('#lightbox').height($('html').height());


   });

    </script>
    <script type='text/javascript'>
        $(document).ready(function () {
            if ($("[rel=tooltip]").length) {
                $("[rel=tooltip]").tooltip();
            }
        });
    </script>



    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />

    <style>
  .custom-combobox 
  {
    width: 100px;
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
    width: 200px;
    margin: 0;
    padding: 0.3em;
  }
  
  
  .DatosPrincipalesLabo
  {
      margin-left: 10px;
  }
  
  </style>
  <script>
      (function ($) {
          $.widget("custom.combobox", {
              _create: function () {
                  this.wrapper = $("<span>")
          .addClass("custom-combobox")
          .insertAfter(this.element)          
                  this.element.hide();
                  this._createAutocomplete();
              },

              _createAutocomplete: function () {
                  var selected = this.element.children(":selected"),
                  value = selected.val() ? selected.text() : "";

                  this.input = $("<input id='txt_practica'>")
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

              
              _source: function (request, response) {
                  var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                  response(this.element.children("option").map(function () {
                      var text_short = $(this).text();
                      var value = $(this).attr("value");
                      if (this.value && (!request.term || matcher.test(text_short))) {
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
                      $("#txtCodigo").val(this.element.children(":selected").val());
                      this.input.attr("rel", "tooltip");
                      this.input.attr("title", this.element.children(":selected").attr("title"));
                      CargarSubCodigos('');
                      if ($("[rel=tooltip]").length) {
                          $("[rel=tooltip]").tooltip();
                      }
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
          .attr("title", value + " No esta en la lista")
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
          $("#cbo_Practicas").combobox();
          $("#hastaaqui").show();
          $("#txtCodigo").focus();
      });


  </script>


</body>
</html>
