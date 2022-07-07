var tipoCalculo = 0;
var idsIndicadores = [];
parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Indicadores</strong>";
Traer_Indicadores();

function Traer_Indicadores() {
    $.ajax({
        type: "POST",
        url: "../Json/QuirofanoReporte.asmx/traerIndicadores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarIndicadores,
        error: errores
    });
}

function CargarIndicadores(resultado) {
    var lista = resultado.d;

    $("#Tindicadores").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;overflow:auto'><thead><tr><th></th></tr></thead><tbody>";
    var Contenido = "";
    $.each(lista, function (index, item) {
        if (item.idIndicador > 0 && item.soon == 0) {
            idsIndicadores.push(item.idIndicador);
        }


        if (item.titulo == 1) {

            Contenido = Contenido + "<tr style='height:20px; background-color:#E2E8EB; cursor:defaulta'>" +
           "<td style='width:1%'><strong>" + item.codigo + "</strong></td>" +
            //           "<td onclick='Seleccionar(" + item.idIndicador + ")' style='width:2%'><input type='checkbox' id='" + item.idIndicador + "' onChange='Seleccionar(" + item.idIndicador + ")'/></td>" +
           "<td  style='width:2%'></td>" +
           "<td style='cursor:default;width:70%; text-align:left'><strong>" + item.descripcion.toUpperCase() + "</strong></td>" +
           "<td style='cursor:default' ></td>" + // boton
           "<td style='cursor:default' ></td>"; // leyenda
            //+ "<td><label><strong>Cantidad</strong></label></td>"
        } else {
            if (item.soon == 1) {
                Contenido = Contenido + "<tr style='height:20px; background-color:#E3CEF6 ;cursor:not-allowed'>" +
           "<td style='cursor:not-allowed'>" + item.codigo + "</td>" +
           "<td style='width:2%;cursor:not-allowed'><input type='checkbox' id='" + item.idIndicador + "' disabled='disabled'/></td>" +
           "<td style='cursor:not-allowed;width:70%; text-align:left'>" + item.descripcion + "</td>" +
           "<td style='cursor:not-allowed' ><div></div></td>" + // boton 
           "<td style='cursor:not-allowed' ><div id='valor" + item.idIndicador + "'>PROXIMAMENTE</div></td>"; // leyenda
            } else {
                Contenido = Contenido + "<tr style='height:20px; cursor:pointer' id='fila" + item.idIndicador + "' title='" + item.como + "'>" +
           "<td onclick='Seleccionar(" + item.idIndicador + ")' >" + item.codigo + "</td>" +
           "<td onclick='Seleccionar(" + item.idIndicador + ")' style='width:2%'><input type='checkbox' id='" + item.idIndicador + "'  onChange='Seleccionar(" + item.idIndicador + ")' class='checks' disabled='disabled'/></td>" +
           "<td onclick='Seleccionar(" + item.idIndicador + ")' style='cursor:pointer;width:70%; text-align:left' id='descripcion" + item.idIndicador + "'>" + item.descripcion + "</td>" +
           "<td onclick='Seleccionar(" + item.idIndicador + ")' style='cursor:pointer' ><div id='valor" + item.idIndicador + "' class='valores'>    </div></td>" + // valor
                //"<td onclick='Seleccionar(" + item.idIndicador + ")'>
           "<td ><a id='detalle" + item.idIndicador + "' class='btn btn-mini pull-right detalle' style='display:none' onclick='verDetalles(" + item.idIndicador + ")'>Ver Detalles</a></td>"; // detalles
            }
        }
        //$("#valor" + item.idIndicador).css("font-weight", "Bold");
    });
    var Pie = "</tbody></table>";
    $("#Tindicadores").html(Encabezado + Contenido + Pie);
  
  }


  function verDetalles(id) {
      //alert($("#detalle" + id).css('display'));


      if ($("#detalle" + id).css('display') != 'none') {
          

          $.fancybox({
              'href': "../Impresiones/IndicadoresDeSeguridadSocial/Listado_Indicadores_Detalles.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + id + "&titulo=" + $("#descripcion" + id).html(),
              'width': '100%',
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
  }


function errores(msg) {
var jsonObj = JSON.parse(msg.responseText);
alert('Error: ' + jsonObj.Message);
}

function Seleccionar(id) {

    if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") {
        alert("Ingrese un rango de Fechas.");
        $("#" + id).attr('checked', false);
        return false;
    }
    //alert(event.target.id);
//    if (event.target.id == "") {
//        alert();
//        $("#" + id).attr('checked', !$("#" + id).is(':checked'));
//    }
    //alert(event.target.id);
    if (!$("#" + id).is(':checked')) {
        $("#" + id).attr('checked', true);
        tipoCalculo = 0;
        Calcular_Indicadores(id);

    } else {
      
        $("#" + id).attr('checked', false);
        $("#valor" + id).html("");
        $("#detalle" + id).hide();
           }
    }



    function Calcular_Indicadores(id) {
  //      tipoCalculo = 0;
//        alert(id);
//        return false;
    //alert(tipo);
    var json = JSON.stringify({ "desde": $("#txtDesde").val(), "hasta": $("#txtHasta").val(), "tipo": id });
    $.ajax({
        type: "POST",
        url: "../Json/QuirofanoReporte.asmx/CalcularIndicadores",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        beforeSend: function () {
            //alert(tipoCalculo + "before");
            //if (tipoCalculo == 0) {
            $("#cargando").show();
            $("#Tindicadores").hide();
            //}
        },
        complete: function () {
            //alert(tipoCalculo + "after");
            //if (tipoCalculo == 0) {
            $("#cargando").hide();
            $("#Tindicadores").show();
            $("#fila" + id).get(0).scrollIntoView();

            //}
        },
        success: mostrar,
        error: errores
    });

    function mostrar(resultado) {
        var obj = {};
        obj =  resultado.d;
        //alert(obj.cantidad);
        $("#valor" + id).html(obj.cantidad.toString());

        if (obj.cantidad > 0) {
            $("#detalle" + id).show();
        }

        $("#valor" + id).css("font-weight", "Bold");
        $("#valor" + id).css("text-align", "right");
        //guardarEnTabla(id, obj.cantidad, $("#txtDesde").val(), $("#txtHasta").val());

    }
}
function guardarEnTabla(id, cantidad, desde, hasta) {
    var json = JSON.stringify({ "id": id, "cantidad": cantidad,"desde": $("#txtDesde").val(),"hasta": $("#txtHasta").val()});
    $.ajax({
        type: "POST",
        url: "../Json/QuirofanoReporte.asmx/actualizartabla",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        error: errores
    });

}

$("#txtDesde").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    maxDate: '0m',
    onClose: function (selectedDate) {
        $("#txtHasta").datepicker("option", "minDate", selectedDate);
    },
    onSelect: function () {
        $(".valores").html("");
        $(".checks").attr('checked', false);
        $(".detalle").hide();
    }
});

$("#txtHasta").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    minDate: '0m',
    onClose: function (selectedDate) {
        $("#txtDesde").datepicker("option", "maxDate", selectedDate);
    },
    onSelect: function () {
        $(".valores").html("");
        $(".checks").attr('checked', false);
        $(".detalle").hide();
    }
});

$("#txtHasta").mask("99/99/9999", { placeholder: "-" });
$("#txtDesde").mask("99/99/9999", { placeholder: "-" });


$("#btnImprimir").click(function () {
    if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") {
        alert("Ingrese un rango de Fechas.");
        return false;
    }

    var lista = new Array();
    $(".valores").each(function () {
        if ($(this).html() != "") {
            var obj = {};
            obj.idIndicador = parseInt($(this).attr('id').toString().replace("valor", ""));
            obj.cantidad = $(this).html();
            obj.desde = $("#txtDesde").val();
            obj.hasta = $("#txtHasta").val();
            lista.push(obj);
        }

    });

    var json = JSON.stringify({ "lista": lista });
    $.ajax({
        type: "POST",
        url: "../Json/QuirofanoReporte.asmx/actualizarImpresionIndicadores",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: imprimir,
        error: errores
    });
});

    function imprimir() {
        $.fancybox({
            'href': "../Impresiones/IndicadoresDeSeguridadSocial/Indicadores.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
            'width': '100%',
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

    $("#btnTodos").click(function () {
        tipoCalculo = 1;
        // $.each(idsIndicadores, function (index, item) { alert(item); });
        if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") {
            alert("Ingrese un rango de Fechas.");
            $("#" + id).attr('checked', false);
            return false;
        }

        var r = confirm("Este proceso podria demorar demasiado, desea continuar de todos modos?");
        if (r) {
//            $("#Tindicadores").hide();
//            $("#cargando").show();

            $.each(idsIndicadores, function (index, item) {
                $("#" + item).attr('checked', true);
                Calcular_Indicadores(item);
                //alert(idsIndicadores.length - 1 + "//" + index);
//                if ((idsIndicadores.length - 1) == index) {
//                    $("#Tindicadores").show();
//                    $("#cargando").hide();
//                }
            });
        }
    });