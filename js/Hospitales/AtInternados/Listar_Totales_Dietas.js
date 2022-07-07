var Contenido = "";
var fecha = "";
var ListaPedidosInternados = new Array();
var ListaPedidosInternadoImpresion = new Array();
var imprimirTotales = 0;
var indiceAseguir = 0;
var totales = 0;
var rojos = 0;
var verdes = 0;
var ComidasTotales = 0;
var totalesSIN = 0;
var rojosTitulo = 0;
var queImprime = 0;
var cargarP = 0;
var acompañantes = 0;
var pacientes = 0;
var comidasPendientes = 0;


if ($("[rel=tooltip]").length) {
    $("[rel=tooltip]").tooltip();
}

var GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    GET[decode(arguments[1])] = decode(arguments[2]);
});

if (GET["fecha"] != "" && GET["fecha"] != null) {

    fecha = GET["fecha"];
    $("#txtFecha").val(fecha);
    //listarPacientesComidas(fecha);
    listarPacientesComidas(fecha); // carga la pantalla superior
    traerDietasIntenados();// carga lista de pantalla totales
    traerCantidades();
    
    $("#tituloTotales").html(" " + fecha + " "); //////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $("#tituloInternados").html(" (" + fecha + ") ");
}

if (GET["idInternacion"] != "" && GET["idInternacion"] != null) {
    var idInternacion = GET["idInternacion"];
}

if (GET["indiceAseguir"] != "" && GET["indiceAseguir"] != null) {
    indiceAseguir = GET["indiceAseguir"];
}

if (GET["listadoDeComidas"] != "" && GET["indiceAseguir"] != null) {
    var t = GET["listadoDeComidas"]
    if (t == 1) {
        $("#Segundo").hide();
        $("#Primero").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#Primero").offset().top - 0 }, 500);
        $('#Primero').show();
    } else {
        $("#Primero").hide();
        $("#Segundo").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#Primero").offset().top - 0 }, 500);
        $('#Segundo').show();
    }
}
if (GET["idNutricionAcompañante"] != "" && GET["idNutricionAcompañante"] != null) {
    idNutricionAcompañante = GET["idNutricionAcompañante"];
} 
$(document).ready(function () {
    $("#txtFecha").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: false,
        onClose: function () {
          //  listarPacientesComidas($("#txtFecha").val());
        }
    });

    $("#txtFecha").keydown(function () { return false; });
});
function listarPacientesComidas() {
    var json = JSON.stringify({
        "fecha": $("#txtFecha").val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/listsarPacientesComidas",
        contentType: "application/json; charset=utf-8",
        data: json,
        success: exito,
        error: errores
    });
}
function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function exito(resultado) {

    var result = resultado.d;

    $("#Table1").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;height:0px'><thead style='height:0px'><tr><th style='width: 164px;height:0px'></th><th style='width: 144px;height:0px'></th><th style='width: 39px;height:0px'></th><th style='width: 46px;height:0px'></th><th style='width: 129px;height:0px'></th><th style='width: 129px;height:0px'></th><th style='width: 134px;height:0px'></th><th style='width: 128px;height:0px'></th><th style='width: 106fpx;height:0px'></th></tr></thead><tbody>";
    Contenido = "";
    var seleccion = 0;
    $.each(result, function (index, p) {
        if (p.codAlmuerzo == "" || p.codCena == "") {

            Contenido = Contenido + "<tr onclick='CargarPaciente(" + seleccion + ");'><td style=' font-size:xx-small; background-color:#FA5858';>" + p.servicio + " </td><td style=' font-size:xx-small; background-color:#FA5858'> " + p.sala + "</td><td style=' font-size:xx-small; background-color:#FA5858'> " + p.cama + "</td><td style=' font-size:xx-small; background-color:#FA5858'> " + p.nhc + "</td><td style=' font-size:xx-small; background-color:#FA5858; width:106px'> " + p.afiliado + "</td><td style=' font-size:xx-small; background-color:#FA5858; width:106px'> " + p.codAlmuerzo + "</td><td style=' font-size:xx-small; background-color:#FA5858; width:106px'> " + p.codCena + "</td><td style=' font-size:xx-small; background-color:#FA5858; width:106px'> " + p.aAlmuerzo + "</td><td style=' font-size:xx-small; background-color:#FA5858; width:106px'> " + p.aCena + "</td>";
           // rojos = rojos + 1;
            totales = totales + 1;  
            seleccion = seleccion + 1;
        }
        else {
            Contenido = Contenido + "<tr onclick='CargarPaciente(" + seleccion + ");'><td style=' font-size:xx-small; background-color:#58FA58';>" + p.servicio + " </td><td style=' font-size:xx-small; background-color:#58FA58'> " + p.sala + "</td><td style=' font-size:xx-small; background-color:#58FA58'> " + p.cama + "</td><td style=' font-size:xx-small; background-color:#58FA58'> " + p.nhc + "</td><td style=' font-size:xx-small; background-color:#58FA58'> " + p.afiliado + "</td><td style=' font-size:xx-small; background-color:#58FA58'> " + p.codAlmuerzo + "</td><td style=' font-size:xx-small; background-color:#58FA58'> " + p.codCena + "</td><td style=' font-size:xx-small; background-color:#58FA58'> " + p.aAlmuerzo + "</td><td style=' font-size:xx-small; background-color:#58FA58'> " + p.aCena + "</td>";
            verdes = verdes + 1;
            totales = totales + 1;
            seleccion = seleccion + 1;
        }
        if (p.codAlmuerzo == "") { comidasPendientes = comidasPendientes + 1; }
        if (p.codCena == "") { comidasPendientes = comidasPendientes + 1; }
    });
    var Pie = "</tbody></table>";
    verdes = verdes * 2;
   // rojos = rojos * 2;
    if (rojos > 0) {
        $("#btnComidos").css('backgroundColor', '#FA5858');
        $("#btnPedidas").css('backgroundColor', '#FA5858'); 
    }
else {
    $("#btnComidos").css('backgroundColor', '#58FA58');
    $("#btnPedidas").css('backgroundColor', '#58FA58');
}
//alert(acompañantes);
$("#btnComidos").html("<span style='text-align:center; display:inline-block'>Comidas Pacientes(" + verdes + ")" + " - " + "Comidas Acompañantes(" + acompañantes + ") "  + " Comidas Pedientes(" + rojos + ")</span>");
//$("#btnPendientes").html("Comidas Pedientes(" + rojos + ")");
//acompañantes = 0;
    $("#tituloTotales").html(" " + fecha + $("#subrayado").html() + " " + totales + ")");
   // Encabezado = "";
    $("#Table1").html(Encabezado + Contenido + Pie);
}

$("#btnImprimirInternados").click(function () {
    queImprime = 0;
    if (Contenido == "") { return; }
    if (rojos > 0) {

        rojosTitulo = rojos / 2;
        $("#H2").html("Falta Cargarle Comidas a " + rojos + " Pacientes!");
        $('#ModalExistePaciente').modal('show');
    }
    else {
      //  if (imprimirTotales == 0) { return; } 
        $.fancybox({
            'autoDimensions': false,
            'href': "../Impresiones/Impresion_Nutricion_Listar_Totales.aspx?fecha=" + $("#txtFecha").val(),
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'elastic',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'preload': true,
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            }

        });
    }
});
  $("#btnComidos").click(function () {
          $("#Segundo").hide();
          $("#Primero").fadeIn(1500);
          $('html, body').animate({ scrollTop: $("#Primero").offset().top - 0 }, 500);
          $('#Primero').show();
          parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Nutrición > <strong>Listado</strong>";
  });

      $("#btnPedidas").click(function () {
          $("#Segundo").hide();
          $("#Primero").fadeIn(1500);
          $('html, body').animate({ scrollTop: $("#Primero").offset().top - 0 }, 500);
          $('#Primero').show();
      });

      $("#btnSiguiente2").click(function () {
          totalesSIN = 0;
          ComidasTotales = 0;
          $("#Segundo").hide();
          $("#Primero").fadeIn(1500);
          $('html, body').animate({ scrollTop: $("#Primero").offset().top - 0 }, 500);
          $('#Primero').show();
          
          parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Nutrición > <strong>Totales</strong>";

          traerDietasIntenados();

          $('#Primero').hide();
          $("#Segundo").fadeIn(1500);
          $('html, body').animate({ scrollTop: $("#Segundo").offset().top - 0 }, 500);
          $('#Segundo').show();
      });

  $("#btnImprimirTotales").click(function () {
      cargarP = 1;
      queImprime = 1;
      if (imprimirTotales == 0) { return; }

      if (rojos > 0) {

          rojosTitulo = rojos / 2;
          $("#H2").html("Falta Cargarle Comidas a " + rojos + " Pacientes!");
          $('#ModalExistePaciente').modal('show');
      }
      else {

          if (imprimirTotales == 0) { return; }

          $.fancybox({
              'autoDimensions': false,
              'href': "../Impresiones/ImpresionMenuInternados.aspx?fecha=" + $("#txtFecha").val() + "&imprime=" + 1,
              'width': '75%',
              'height': '75%',
              'autoScale': false,
              'transitionIn': 'elastic',
              'transitionOut': 'none',
              'type': 'iframe',
              'hideOnOverlayClick': false,
              'enableEscapeButton': false,
              'preload': true,
              'onComplete': function f() {
                  jQuery.fancybox.showActivity();
                  jQuery('#fancybox-frame').load(function () {
                      jQuery.fancybox.hideActivity();
                  });
              }

          });
      }
  });

  function traerDietasIntenados() {
      var json = JSON.stringify({
        "fecha": $("#txtFecha").val(),
        "imprime": 0
    });
      $.ajax({
          type: "POST",
          url: "../Json/AtConsultorio/AtConsultorio.asmx/traerPedidosInternados",
          data: json,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: traer_Pedido_Traido_je,
          complete: traerCantidades,
          error: errores
      });
  }
  function traer_Pedido_Traido_je(resultado) {
      var P = resultado.d;
      ListaPedidosInternados.length = 0;
      $.each(P, function (index, i) {
          var pedido = {};
          pedido.cantidad = i.cantidad;
          pedido.dieta = i.dieta;
          pedido.piso = i.piso;
          ListaPedidosInternados.push(pedido);
      });

      var tabla = "#tablaTotales";
      cargarListaPedidos(ListaPedidosInternados, tabla);
  }

  function cargarListaPedidos(li, ped) {
      var titulo = "";
      var parcial = 0;
      var total = 0;
          $(ped).empty();
          var Encabezado = "<table class='table  ' style='width: 100%;'><thead><tr><th>Tipificación</th><th style='text-align:center'>Cantidad</th></tr></thead><tbody>";
          var Contenido = "";

          $.each(li, function (index, p) {
              if (titulo != p.piso && index != 0) {
                  Contenido = Contenido + "<tr  style='cursor:auto;background-color:#F3F3F3'><td style='cursor:auto'><label  style='width:400px; text-align:center; margin-left:230px'><strong> TOTAL " + titulo + " : " + "</strong></label></td><td style='cursor:auto; text-align:center'><strong>" + parcial + "</strong></td><td>";
                  parcial = 0;
              }
              if (titulo != p.piso) {
                  Contenido = Contenido + "<tr style='background-color:#BDBDBD'><td style='cursor:auto'><label  style='width:400px; text-align:center; margin-left:230px'><strong>" + p.piso + " </strong></label></td><td style='cursor:auto'> </td><td>";
                  titulo = p.piso;
              }

              switch (p.dieta) {

                  case "NO ALMUERZA":
                      totalesSIN = totalesSIN + p.cantidad;
                      ComidasTotales = ComidasTotales + p.cantidad;
                      acompañantes = p.cantidadAcompañante;
                      break;

                  case "NO CENA":
                      totalesSIN = totalesSIN + p.cantidad;
                      ComidasTotales = ComidasTotales + p.cantidad;
                      acompañantes = p.cantidadAcompañante;
                      break;

                  default:
                      if (titulo == p.piso) {
                          Contenido = Contenido + "<tr><td style='cursor:auto'>" + p.dieta + " </td><td style='cursor:auto; text-align:center'> " + p.cantidad + "</td><td>";
                          parcial = parcial + p.cantidad;
                          total = total + p.cantidad;

                      }
                      break;
              }

          });
          Contenido = Contenido + "<tr  style='cursor:auto;background-color:#F3F3F3'><td style='cursor:auto'><label style='width:400px; text-align:center; margin-left:230px'><strong> TOTAL " + titulo + " : " + "</strong></label></td><td style='cursor:auto; text-align:center'><strong> " + parcial + " </strong></td><td>";
          Contenido = Contenido + "<tr  style='cursor:auto;background-color:#BDBDBD'><td style='cursor:auto'><label style='text-align:rigth'><strong> TOTAL GENERAL" + " : " + "</strong></label></td><td style='cursor:auto; text-align:center'><strong>" + total + "</strong></td><td>";
          var Pie = "</tbody></table>";

          $(ped).html(Encabezado + Contenido + Pie);

    
  if (li.length < 1) {
      imprimirTotales = 0;   
      $("#btnImprimirTotales").attr('disabled', true);
  } else {
      imprimirTotales = 1;
      $("#btnImprimirTotales").attr('disabled', false);
      $("#btnImprimirInternados").attr('disabled', false);
  }

  }

  $("#btnVolver").click(function () {
    
      $("#Segundo").hide();
      $("#Primero").fadeIn(1500);
      $('html, body').animate({ scrollTop: $("#Primero").offset().top - 0 }, 500);
      $('#Primero').show();
      parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Nutrición > <strong>Listado</strong>";
  });

  $("#btnCargarPacientes").click(function () {
      if (cargarP == 0) {
          document.location = "../AtInternados/Nutricion.aspx?como=" + "todos" + "&indiceAseguir=" + s + "&fecha=" + $("#txtFecha").val() + "&idNutricionAcompañante=" + idNutricionAcompañante;
      } else {
          cargarP = 0;
          $("#btnVolver").click();
      }
  });

  function imprimir() {
      switch (queImprime) {

          case 0:
              $.fancybox({
                  'autoDimensions': false,
                  'href': "../Impresiones/Impresion_Nutricion_Listar_Totales.aspx?fecha=" + $("#txtFecha").val(),
                  'width': '75%',
                  'height': '75%',
                  'autoScale': false,
                  'transitionIn': 'elastic',
                  'transitionOut': 'none',
                  'type': 'iframe',
                  'hideOnOverlayClick': false,
                  'enableEscapeButton': false,
                  'preload': true,
                  'onComplete': function f() {
                      jQuery.fancybox.showActivity();
                      jQuery('#fancybox-frame').load(function () {
                          jQuery.fancybox.hideActivity();
                      });
                  }

              });
              break;

          case 1:
              $.fancybox({
                  'autoDimensions': false,
                  'href': "../Impresiones/ImpresionMenuInternados.aspx?fecha=" + $("#txtFecha").val() + "&imprime=" + 1,
                  'width': '75%',
                  'height': '75%',
                  'autoScale': false,
                  'transitionIn': 'elastic',
                  'transitionOut': 'none',
                  'type': 'iframe',
                  'hideOnOverlayClick': false,
                  'enableEscapeButton': false,
                  'preload': true,
                  'onComplete': function f() {
                      jQuery.fancybox.showActivity();
                      jQuery('#fancybox-frame').load(function () {
                          jQuery.fancybox.hideActivity();
                      });
                  }

              });
              queImprime = 0;
              break;
       }

  }
  //+ "&indiceAseguir=" + s 
  function CargarPaciente(s) {
      document.location = "../AtInternados/Nutricion.aspx?como=" + "todos" + "&indiceAseguir=" + s + "&fecha=" + $("#txtFecha").val() + "&idInternacion=" + idInternacion;

  }

  function traerCantidades() {
          var json = JSON.stringify({
              "fechaComida": $("#txtFecha").val()
          });
          $.ajax({
              type: "POST",
              url: "../Json/AtConsultorio/AtConsultorio.asmx/NutricionContarComidas",
              data: json,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function (resultado) {
                  var r = resultado.d;
                  //alert(r.acompañante);
                  verdes = r.pacientes;
                  acompañantes = r.acompañante;
                  rojos = r.sin_cargar;
                  pacientes = r.totalPacientes;
              },
              complete: function () {
                  if (rojos > 0) {
                      $("#btnComidos").css('backgroundColor', '#FA5858');
                      $("#btnPedidas").css('backgroundColor', '#FA5858');
                  }
                  else {
                      $("#btnComidos").css('backgroundColor', '#58FA58');
                      $("#btnPedidas").css('backgroundColor', '#58FA58');
                  }
                  $("#btnComidos").html("<span style='text-align:center; display:inline-block'>Comidas Pacientes(" + verdes + ")" + " - " + "Comidas Acompañantes(" + acompañantes + ") " + " Comidas Pedientes(" + comidasPendientes + ")</span>");
                  $("#tituloTotales").html(" " + fecha + $("#subrayado").html() + " " + pacientes +")");
              },
              error: errores
          });
  }