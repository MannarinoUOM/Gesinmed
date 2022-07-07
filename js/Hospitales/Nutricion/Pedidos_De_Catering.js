var date = new Date();
var dia = date.getDate();
var mes = (date.getMonth() + 1);
var ano = date.getFullYear();
var fecha = "";
var bPreguntar = false;
var id = 0;

$("#txtFecha").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    onClose: function (selectedDate) {
        fecha = $("#txtFecha").val();
    }
});

$("#txtFecha").keydown(function () { return false; })
if (mes.toString().length < 2) { mes = "0" + mes; }
if (dia.toString().length < 2) { dia = "0" + dia; }
$("#txtFecha").val(dia + "/" + mes + "/" + ano);

cargar();

function cargar() {
    $.ajax({
        type: "POST",
        url: "../Json/Nutricion/Nutricion.asmx/NutricionPedidoCateringTraerMenus",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            var Contenido = "";
            var Pie = "</tbody></table>"; a = Resultado.d;
            $("#dietas").empty();
            $.each(lista, function (index, item) {

                Contenido = Contenido + "<tr  style='cursor:auto;background-color:#F3F3F3'>" +
                "<td style='cursor:auto; width:50%'><label id='nombre" + item.dietaId + "' style='width:400px; text-align:left; margin-left:45%'>" + item.dieta + "</label></td>" +
                "<td style='cursor:auto; width:50%'><input class='numero input input-mini' id='" + item.dietaId + "' tabindex='" + index + "'/></td>";
            });
            $("#dietas").html(Contenido + Pie);
        },
        complete: function () {
            $(".numero").keydown(function (event) {
                if (event.shiftKey) {
                    event.preventDefault();
                }

                if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 190) {
                }
                else {
                    if (event.keyCode < 95) {
                        if (event.keyCode < 48 || event.keyCode > 57) {
                            event.preventDefault();
                        }
                    }
                    else {
                        if (event.keyCode < 96 || event.keyCode > 105) {
                            event.preventDefault();
                        }
                    }
                }
            });

            $(".numero").css('text-align', 'center');
            $("#txtFecha").trigger('change');
            //bPreguntar = true;
        }
    });
}


$("#btnGuardar").click(function () {
    var seguir = 0;
    $(".numero").each(function (index, item) {
        if ($(this).val() == "") {
            alert("falta cargar un valor");
            return false;
            seguir = 1;
        }
    });
    if (seguir == 1) { return false; }
    var lista = new Array();
    $(".numero").each(function (index, item) {
        var comida = {};
        comida.id = id;
        comida.dietaId = $(this).attr('id');
        comida.dieta = $("#nombre" + $(this).attr('id')).html();
        comida.cantidad = $("#" + $(this).attr('id')).val();
        comida.fecha = $("#txtFecha").val();
        lista.push(comida);
    });

    var json = JSON.stringify({ "lista": lista });
    $.ajax({
        type: "POST",
        url: "../Json/Nutricion/Nutricion.asmx/NutricionPedidoDeCateringGuardarEditar",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            //$(".total").css('background-color', '#58FA58');
            bPreguntar = false;
            //if (item.existe == 0) { $(".numero").css('background-color', '#FA5858'); } else {
             $(".numero").css('background-color', '#58FA58'); 
             //}
            alert("Guardado.");
        }
    });
});

$("#btnLimpiar").click(function () {
    var json = JSON.stringify({ "fecha": $("#txtFecha").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Nutricion/Nutricion.asmx/NutricionPedidoDecateringBorrar",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            //$(".total").css('background-color', '#58FA58');
            //bPreguntar = false;
            alert("Borrado.");
            $(".numero").val("");
            $(".numero").css('background-color', '#FA5858');
        }
    });
});

$("#txtFecha").change(function () {
    $(".numero").val("");
    var json = JSON.stringify({ "fecha": $(this).val(), "imprimir": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Nutricion/Nutricion.asmx/NutricionPedidoDeCateringImprimir",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: cargarControles
    });
});

function cargarControles(resultado) {
    var lista = resultado.d;
    if (lista.length == 0) {
        $(".numero").val("");
    }
    $.each(lista, function (index, item) {
        $("#" + item.dietaId).val(item.cantidad);
        //alert(item.existe);
        if (item.existe == 0) {
            $(".numero").css('background-color', '#FA5858');
            bPreguntar = true;
        } else {
            $(".numero").css('background-color', '#58FA58');
            bPreguntar = false;
        }
    });
}

$("#btnImprimir").click(function () {
    $.fancybox({
        'autoDimensions': false,
        'href': "../Impresiones/Nutricion/Nutricion_Pedido_De_Catering_Imprimir.aspx?fecha=" + $("#txtFecha").val() + "&imprimir=1",
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
});


window.onbeforeunload = preguntarAntesDeSalir;

function preguntarAntesDeSalir() {
    if (bPreguntar)
        return "¿Seguro que quieres salir?";
}