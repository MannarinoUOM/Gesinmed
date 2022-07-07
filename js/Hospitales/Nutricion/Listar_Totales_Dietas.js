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
        url: "../Json/Nutricion/Nutricion.asmx/listsarPacientesComidas", ///?????????????????????
        contentType: "application/json; charset=utf-8",
        data: json,
        beforeSend: function () { $("#cargando").show(); $("#Table1").hide(); },
        success: exito,
        complete: function () { $("#cargando").hide(); $("#Table1").show(); },
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
    var Encabezado = ""///"<table class='table table-hover table-condensed' style='width: 100%;height:0px'><thead style='height:0px'><tr><th style='width: 164px;height:0px'></th><th style='width: 144px;height:0px'></th><th style='width: 39px;height:0px'></th><th style='width: 46px;height:0px'></th><th style='width: 129px;height:0px'></th><th style='width: 129px;height:0px'></th><th style='width: 134px;height:0px'></th><th style='width: 128px;height:0px'></th><th style='width: 106fpx;height:0px'></th></tr></thead><tbody>";
    Contenido = "";
    var seleccion = 0;
    $.each(result, function (index, p) {
        var color = "";
        if (p.codAlmuerzo == "" || p.codCena == "" || p.confirmado == 0) { color = "#FA5858"; } // rojo
        if (p.codAlmuerzo != "" && p.codCena != "" && p.confirmado == 1) { color = "#58FA58"; } // verde
        //if (p.codAlmuerzo != "" && p.codCena != "") { alert("paso"); }

        if (
        //p.AlmuerzoConfirm == 0 || p.cenaConfirm == 0 || p.acompConfirmado == 0
        p.confirmado == 0
        ) {
            var almuerzo = "";
            var cena = "";
            var aAlmuerzo = "";
            var aCena = "";
            var mostrar = "inline";
            var metodo = "";

            if (p.AlmuerzoConfirm == 1 || p.cenaConfirm == 1 || p.acompConfirmado == 1) {
                if (p.AlmuerzoConfirm == 1) {
                    almuerzo = p.codAlmuerzo;
                }
                if (p.cenaConfirm == 1) {
                    cena = p.codCena;
                }
                if (p.acompConfirmado == 1) {
                    aAlmuerzo = p.aAlmuerzo;
                    aCena = p.aCena;
                }
                mostrar = "none";
                metodo = "CargarPaciente";

            }

            if (p.AlmuerzoConfirm == 0 && p.cenaConfirm == 0 && p.acompConfirmado == 0) {
                almuerzo = p.codAlmuerzo;
                cena = p.codCena;
                aAlmuerzo = p.aAlmuerzo;
                aCena = p.aCena;
                metodo = "confirma";
            }

            if (p.AlmuerzoConfirm == 1 && p.cenaConfirm == 1 && p.acompConfirmado == 0) {
                almuerzo = p.codAlmuerzo;
                cena = p.codCena;
            }
            if (p.fechaEgreso == null) { p.fechaEgreso = ""; }
            Contenido = Contenido + "<tr id='fila" + (index) + "' style='background-color:" + color + "'>" +
            "<td style=' width:14%; font-size:xx-small'; onclick='CargarPaciente(" + (index) + ")'>" + p.servicio + " </td>" +
            "<td style=' width:14%; font-size:xx-small'; onclick='CargarPaciente(" + (index) + ")'> " + p.sala + "</td>" +
            "<td style=' width:4%; font-size:xx-small'; onclick='CargarPaciente(" + (index) + ")'> " + p.cama + "</td>" +
            "<td style=' width:4%; font-size:xx-small'; onclick='CargarPaciente(" + (index) + ")'> " + p.nhc + "</td>" +
            "<td style=' width:13%; font-size:xx-small'; onclick='CargarPaciente(" + (index) + ")'> " + p.afiliado + "</td>" +
            "<td style=' width:10%; font-size:xx-small'; onclick='CargarPaciente(" + (index) + ")'> " + almuerzo + "</td>" +
            "<td style=' width:10%; font-size:xx-small'; onclick='CargarPaciente(" + (index) + ")'> " + cena + "</td>" +

            "<td id='aAlmuerzo" + (index) + "' style=' font-size:xx-small; width:10%' onclick='CargarPaciente(" + (index) + ")'> " + aAlmuerzo + "</td>" +
            "<td id='aCena" + (index) + "' style=' font-size:xx-small; width:10%' onclick='CargarPaciente(" + (index) + ")'> " + aCena + "</td>" +

            "<td id='celdaConfirma" + (index) + "' style=' font-size:xx-small; width:6%' onclick='" + metodo + "(" + (index) + ")'><a id='Editar" + (index) + "'; class='btn btn-mini' rel='tooltip' title='" + p.fechaEgreso + "' style='width:80%;heigth:100%;display:" + mostrar + "'><i class='icon-ok'></i></a></td>" +
            "<td id='idInternacion" + (index) + "' style='display:none'>" + p.idInternacion + "</td>" +
            "<td id='idPaciente" + (index) + "'    style='display:none'>" + p.idPaciente + "</td>" +

            "<td id='idsAlmuerzo" + (index) + "' style='display:none'>" + p.idsAlmuerzo + "</td>" +
            "<td id='idsCena" + (index) + "'    style='display:none'>" + p.idsCena + "</td>" +
            "<td id='idAcompanante" + (index) + "'    style='display:none'>" + p.idAcompañante + "</td>" +
            "<td id='acomp_id_almuerzo" + (index) + "'    style='display:none'>" + p.acomp_id_almuerzo + "</td>" +
            "<td id='acomp_id_cena" + (index) + "'    style='display:none'>" + p.acomp_id_cena + "</td></tr>";
            // rojos = rojos + 1;
            totales = totales + 1;
            seleccion = seleccion + 1;
        }
        else {
            var almuerzo = "";
            var cena = "";
            var aAlmuerzo = "";
            var aCena = "";

            if (p.AlmuerzoConfirm == 1 || p.cenaConfirm == 1 || p.acompConfirmado == 1) {
                if (p.AlmuerzoConfirm == 1) {
                    almuerzo = p.codAlmuerzo;
                }
                if (p.cenaConfirm == 1) {
                    cena = p.codCena;
                }
                if (p.acompConfirmado == 1) {
                    aAlmuerzo = p.aAlmuerzo;
                    aCena = p.aCena;
                }

            }

            if (p.AlmuerzoConfirm == 0 && p.cenaConfirm == 0 && p.acompConfirmado == 0) {
                almuerzo = p.codAlmuerzo;
                cena = p.codCena;
                aAlmuerzo = p.aAlmuerzo;
                aCena = p.aCena;

            }


            if (p.AlmuerzoConfirm == 1 && p.cenaConfirm == 1 && p.acompConfirmado == 0) {
                almuerzo = p.codAlmuerzo;
                cena = p.codCena;
            }

            Contenido = Contenido + "<tr>" +
            "<td style=' width:14%;font-size:xx-small; background-color:" + color + "' onclick='CargarPaciente(" + (index) + ")'>" + p.servicio + " </td>" +
            "<td style=' width:14%;font-size:xx-small; background-color:" + color + "' onclick='CargarPaciente(" + (index) + ")'> " + p.sala + "</td>" +
            "<td style=' width:4%;font-size:xx-small; background-color:" + color + "' onclick='CargarPaciente(" + (index) + ")'> " + p.cama + "</td>" +
            "<td style=' width:4%; font-size:xx-small; background-color:" + color + "' onclick='CargarPaciente(" + (index) + ")'> " + p.nhc + "</td>" +
            "<td style=' width:13%;font-size:xx-small; background-color:" + color + "' onclick='CargarPaciente(" + (index) + ")'> " + p.afiliado + "</td>" +
            "<td style=' width:10%;font-size:xx-small; background-color:" + color + "' onclick='CargarPaciente(" + (index) + ")'> " + almuerzo + "</td>" +
            "<td style=' width:10%;font-size:xx-small; background-color:" + color + "' onclick='CargarPaciente(" + (index) + ")'> " + cena + "</td>" +
            "<td style=' width:10%;font-size:xx-small; background-color:" + color + "' onclick='CargarPaciente(" + (index) + ")'> " + aAlmuerzo + "</td>" +
            "<td style=' width:10%;font-size:xx-small; background-color:" + color + "' onclick='CargarPaciente(" + (index) + ")'> " + aCena + "</td>" +
            "<td style=' width:7%;font-size:xx-small; background-color:" + color + "'  onclick='CargarPaciente(" + (index) + ")'></td>";
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
//$("#btnComidos").html("<span style='text-align:center; display:inline-block'>Comidas Pacientes(" + verdes + ")" + " - " + "Comidas Acompañantes(" + acompañantes + ") "  + " Comidas Pendientes(" + rojos + ")</span>");
$("#btnComidos").html("<span style='text-align:center; display:inline-block; width:100%'>Comidas Pacientes(" + verdes + ")" + " - " + "Comidas Acompañantes(" + acompañantes + ")</span>");
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
            //'href': "http://10.10.8.71:999/Impresiones/Nutricion/Nutricion_Listado_Total_Comidas.aspx?desde=17/01/2017&hasta=17/01/2017&tipo=3&orden=1&PDF=1",
            'href': "../Impresiones/Nutricion/Internacion_Nutricion_Listar_Solo_Asigandos.aspx?fecha=" + $("#txtFecha").val() + "&PDF=1",
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

function confirma(index) {
    $("#fila" + index).css('backgroundColor', '#58FA58');
    $("#Editar" + index).hide();
    $("#celdaConfirma" + index).click(function () {
        CargarPaciente(index);
    });
    //return false;
    var json = JSON.stringify({
        "idNutricion": 1,
        "idInternacion": $("#idInternacion" + index).html(),
        "idPaciente": $("#idPaciente" + index).html(),
        "fecha": fecha
    });

    NutricionGuardarEncabezadoYDetalle(json);

    function NutricionGuardarEncabezadoYDetalle(json,index) {
        $.ajax({
            type: "POST",
            url: "../Json/Nutricion/Nutricion.asmx/NutricionGuardarEncabezado",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: guardarDetalle,
            error: errores
        });
    }

    function guardarDetalle(resultado) {

        var idsAlmuerzo = $("#idsAlmuerzo" + index).html().toString().split(",");
        var idsCena = $("#idsCena" + index).html().toString().split(",");

        idNutricion = resultado.d;
        var json = JSON.stringify({
            "idNutricion": idNutricion, // id de internacion
            "fechaComida": fecha,
            "idsAlmuerzo": idsAlmuerzo,
            "idsCena": idsCena
        });
        $.ajax({
            type: "POST",
            url: "../Json/Nutricion/Nutricion.asmx/NutricionGuardarDetalleConfirmar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            complete: function () {
                if ($("#acomp_id_almuerzo" + index).html() == 0 && $("#acomp_id_cena" + index).html() == 0) {
                    $("#fila0").css('backgroundColor', '#58FA58');
                    $("#Editar" + index).hide();
                    $("#celdaConfirma" + index).click(function () {
                        CargarPaciente(index);
                    });
                } else { confirmarAcompañante(); }
            },
            error: errores
        });
    }
   
    function confirmarAcompañante() {
        var json = JSON.stringify({
            "id": 0,
            "idInternacion": $("#idInternacion" + index).html(),
            "fechaCarga": fecha,
            "idAlmuerzo": $("#acomp_id_almuerzo" + index).html(),
            "codAlmuerzo": $("#aAlmuerzo" + index).html(),
            "tipificacionAlmuerzo": "",
            "idCena": $("#acomp_id_cena" + index).html(),
            "codCena": $("#aCena" + index).html(),
            "tipificacionCena": ""
        });


        $.ajax({
            type: "POST",
            url: "../Json/Nutricion/Nutricion.asmx/InternacionNutricionGuardarComidasAcompañante",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
//                var r = resultado.d;
//                idNutricionAcompañante = r;
                $("#fila" + index).css('backgroundColor', '#58FA58');
                $("#Editar" + index).hide();
                $("#celdaConfirma" + index).click(function () {
                    CargarPaciente(index);
                });
            },
            error: errores
        });
    }
   
}

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
              'href': "../Impresiones/Nutricion/ImpresionMenuInternados.aspx?fecha=" + $("#txtFecha").val() + "&imprime=" + 1,
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
          url: "../Json/Nutricion/Nutricion.asmx/traerPedidosInternados",///??????????????
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
          document.location = "../Nutricion/Nutricion.aspx?como=" + "todos" + "&indiceAseguir=" + s + "&fecha=" + $("#txtFecha").val() + "&idNutricionAcompañante=" + idNutricionAcompañante;
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
                  //'href': "http://10.10.8.71:999/Impresiones/Nutricion/Internacion_Nutricion_Listar_Solo_Asigandos.aspx?fecha=" + $("#txtFecha").val() + "&PDF=1",
                  'href': "../Impresiones/Nutricion/Internacion_Nutricion_Listar_Solo_Asigandos.aspx?fecha=" + $("#txtFecha").val() + "&PDF=1",
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
                  'href': "../Impresiones/Nutricion/ImpresionMenuInternados.aspx?fecha=" + $("#txtFecha").val() + "&imprime=" + 1,
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
      document.location = "../Nutricion/Nutricion.aspx?como=" + "todos" + "&indiceAseguir=" + s + "&fecha=" + $("#txtFecha").val() + "&idInternacion=" + idInternacion;
  }

  function traerCantidades() {
          var json = JSON.stringify({
              "fechaComida": $("#txtFecha").val()
          });
          $.ajax({
              type: "POST",
              url: "../Json/Nutricion/Nutricion.asmx/NutricionContarComidas",//?????????????????????
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
                  //                  $("#btnComidos").html("<span style='text-align:center; display:inline-block'>Comidas Pacientes(" + verdes + ")" + " - " + "Comidas Acompañantes(" + acompañantes + ") " + " Comidas Pendientes(" + comidasPendientes + ")</span>");
                  $("#btnComidos").html("<span style='text-align:center; display:inline-block; width:100%'>Comidas Pacientes(" + verdes + ")" + "<br>" + "Comidas Acompañantes(" + acompañantes + ")</span>");
                  $("#tituloTotales").html(" " + fecha + $("#subrayado").html() + " " + pacientes + ")");
              },
              error: errores
          });
  }