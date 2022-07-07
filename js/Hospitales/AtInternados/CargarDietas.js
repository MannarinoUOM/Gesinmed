var lista = new Array();
var listaPedido = new Array();
var ListaPedidosInternados = new Array();
var ListaTotales = new Array();
var fecha = new Date;
var dia = ""
var mes = "";
var año = "";
var idPedido = 0;
var quitar = false;
var imprimir = 0;
var imprimirInternados = 0;
var imprimirTotales = 0;
var avanzar = 0;

$(document).ready(function () {
    cargarCombos();

    dia = fecha.getDate();
    mes = fecha.getMonth() + 1;
    año = fecha.getFullYear();

      cargarPedidos(dia + "/" + mes + "/" + año);
     cargarLista(listaPedido);

    $("#txtFechaActual").val(dia + "/" + mes + "/" + año);

    $("#txtFechaActual").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        maxDate: '0m',
        onClose: function () {
            cargarPedidos($("#txtFechaActual").val());
//            cargarLista(listaPedido);

        }
    });
    $("#txtTipificacion").val("Anticuagul /GRAL");
});

function cargarCombos() {

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/cargarComboMenus",
        contentType: "application/json; charset=utf-8",
        success: exito,
        error: errores

    });
}



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function exito(resultado) {
    var M = resultado.d;

    $.each(M, function (index, res) {
        var D = {};
        D.id = res.id;
        D.apodo = res.apodo;
        D.descripcion = res.descripcion;
        lista.push(D);
        $("#cboDietas").append(new Option(res.apodo, res.id));

    });

    $("#cboDietas").append(new Option("Seleccione", 0));
    $("#cboDietas").val(0);
    $("#txtTipificacion").val("");
}

$("#cboDietas").change(function (item) {

    var indice = $('#cboDietas :selected').val();

    $.each(lista, function (index, res) {
        if (res.id == indice)
        { $("#txtTipificacion").val(res.descripcion);}
         
    });

    if(indice == 0){
    $("#txtTipificacion").val("");}

    var encontrado = false;
    if (listaPedido.length > 0) {

        $.each(listaPedido, function (index, p) {
            if (encontrado == false) {
                if ($('#cboDietas :selected').val() == p.dietaId) {
                    $("#btnQuitar").attr('disabled', false)
                    encontrado = true;
                } else {

                }
            }
        });
        if (encontrado == false) {
            $("#btnQuitar").attr('disabled', true);
        }

    }
    else if (listaPedido.length <= 0) { $("#btnQuitar").attr('disabled', true); }

});

$("#txtFechaActual").keydown(function () { return false; });

$("#txtCantidad").keydown(function (e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    patron = /[0-9]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
});

$("#btnAgregar").click(function () {

 if ($("#cboDietas").val() == 0)
 { alert("Seleccione una Dieta"); return; }

    if ($("#txtCantidad").val() == "" || $("#txtCantidad").val() == 0) {
        alert("Ingrese una Cantidad para su Pedido");
        return;
    }
   

    $("#btnQuitar").attr('disabled', false);
    $("#btnSiguiente1").attr('disabled', true);
    avanzar = 0;

    var pedido = {};
    pedido.tipificacion = $("#txtTipificacion").val();
    pedido.dieta = $('#cboDietas :selected').html();
    pedido.dietaId = $('#cboDietas :selected').val();
    pedido.fecha = $("#txtFechaActual").val();
    pedido.cantidad = $("#txtCantidad").val();

    var encontrado = false;
    if (listaPedido.length > 0) {

        $.each(listaPedido, function (index, p) {
            if (encontrado == false) {
                if (p.dietaId == pedido.dietaId) {
                    //                    p.cantidad = parseInt(p.cantidad) + parseInt(pedido.cantidad);
                    p.cantidad = parseInt(pedido.cantidad);
                    cargarLista(listaPedido);
                    encontrado = true;
                } else {

                }
            }
        });
        if (encontrado == false) {
            listaPedido.push(pedido);
        }

    }
    else if (listaPedido.length <= 0) { listaPedido.push(pedido); }

    imprimir = 0;
    $("#btnImprimirPedidos").attr('disabled', true);
    cargarLista(listaPedido);

});

$("#btnQuitar").click(function () {
    if (listaPedido.length > 0) {

        var pedido = {};
        pedido.dietaId = $('#cboDietas :selected').val();
        pedido.cantidad = $("#txtCantidad").val();

        $.each(listaPedido, function (index, p) {
            if (p.dietaId == pedido.dietaId) {
                p.cantidad = p.cantidad - pedido.cantidad;
                if (p.cantidad <= 0) {
                    listaPedido.splice(index, 1); $("#btnQuitar").attr('disabled', true); return;
                }
            }
        });
        imprimir = 0;
        avanzar = 0;
        if ($("#txtCantidad").val() != 0) {
            $("#btnSiguiente1").attr('disabled', true);
            $("#btnImprimirPedidos").attr('disabled', true);
            cargarLista(listaPedido);
        }
    }

});

function cargarLista(list) {

    $("#Resultado").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width: 257px;'>Tipificación</th><th style='width:207px;'>Dietas</th><th 'style='width: 161px;'>Fecha de Pedido</th><th 'style='width: 87px;'>Cantidad</th><th style='width:125px;'></t</tr></thead><tbody>";
    var Contenido = "";
    $.each(list, function (index, p) {

        Contenido = Contenido + "<tr><td style='cursor:auto ; width: 257px; text-transform: uppercase;'>" + p.tipificacion + " </td><td style='cursor:auto; width: 123px;'> " + p.dieta + " </td><td style='cursor:auto'>" + p.fecha + " </td><td style='cursor:auto;  text-align:center ; padding-left:25px;'> " + p.cantidad + " </td><td style='cursor:auto'><a class='btn btn-mini btn-danger' onclick = 'Eliminar(" + index + ")'>Eliminar Pedido</a></td>";
//        idPedido = p.idPedido;
    });
    var Pie = "</tbody></table>";
    $("#Resultado").html(Encabezado + Contenido + Pie);
    
}

function Eliminar(id) {
    listaPedido.splice(id, 1);

    avanzar = 0;
    $("#btnSiguiente1").attr('disabled', true);
    $.each(listaPedido, function (index, p) {

        if (p.dietaId == $('#cboDietas :selected').val()) {
            $("#btnQuitar").attr('disabled', false); return;
            alert($('#cboDietas :selected').val());
        }
    });
    

     if (listaPedido.length == 0) { $("#btnQuitar").attr('disabled', true); }
     imprimir = 0;
     $("#btnImprimirPedidos").attr('disabled', true);
    cargarLista(listaPedido);
}


/////////////////GUARDAR////////////////////////////////////////////////////////////////////////
$("#btnGuardar").click(function () {
//    if (listaPedido.length == 0) {
//        alert("Ingrese un pedido para guardar");
//        return;
//    }
    avanzar = 1;
    var json = JSON.stringify({
        "idPedido": idPedido,
        "fecha": $("#txtFechaActual").val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/GuardarPedidoEncabezado",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Guardar_Pedido_Guardado,
        //        complete: guardarDetalle(idPedido),        
        error: errores
    });

});


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function Guardar_Pedido_Guardado(resultdo) {
    var r = resultdo.d;
    idPedido = r;
//    alert(idPedido);
    guardarDetalle();
    
}

function guardarDetalle() {
//    alert(idPedido);
        var json = JSON.stringify({
            "idPedido": idPedido,
            "pedidos": listaPedido
            });


    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/GuardarPedidoDetalle",
        //        data: '{idPedido: "' + idPedido + '"}',
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
//        complete: guardarDetalle,
        success: final,
        error: errores
    });
}

function final() {
    traerTotalesDietas();
    alert("Pedido Guardado");
    imprimir = 1;
    $("#btnImprimirPedidos").attr('disabled', false);
    $("#btnSiguiente1").attr('disabled', false);
}


function cargarPedido() {
//    alert(idPedido);
    var json = JSON.stringify({
        "fecha":$("#txtFechaActual").val()
//        "pedidos": listaPedido
    });


    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/traerPedido",
        //        data: '{idPedido: "' + idPedido + '"}',
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //        complete: guardarDetalle,
        success: traer_Pedido_Traido_je,
        error: errores
    });
}


function traerDietasIntenados() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/traerPedidosInternados",
        data: '{fecha: "' + $("#txtFechaActual").val() + '"}',
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //        complete: guardarDetalle,
        success: traer_Pedido_Traido_je,
        error: errores
    });
}


function traer_Pedido_Traido_je(resultado) {
    var P = resultado.d;

    ListaPedidosInternados.length = 0;
    $.each(P, function (index, i) {
        var pedido = {};
        pedido.tipificacion = i.tipificacion;
        pedido.cantidad = i.cantidad;

        ListaPedidosInternados.push(pedido);

    });
    if (ListaPedidosInternados.length == 0) {

        $("#btnImprimirInternados").attr('disabled', true);
    } else {
        imprimirInternados = 1;
        $("#btnImprimirInternados").attr('disabled', false);
    }

    var tabla = "#tablaPedidosTraidos";
    cargarListaPedidos(ListaPedidosInternados, tabla);
}
$("#btnImprimirPedidos").click(function () {
    if (imprimir == 0) { return; }

    $.fancybox({
        'autoDimensions': false,
        'href': "../Impresiones/ImpresionMenu.aspx?fecha=" + $("#txtFechaActual").val(),
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


$("#btnImprimirInternados").click(function () {
    if (imprimirInternados == 1) {
        $.fancybox({
            'autoDimensions': false,
            'href': "../Impresiones/ImpresionMenuInternados.aspx?fecha=" + $("#txtFechaActual").val(),
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

$("#btnImprimirTotales").click(function () {

    if (imprimirTotales == 1) {
        $.fancybox({
            'autoDimensions': false,
            'href': "../Impresiones/ImpresionMenuTotales.aspx?fecha=" + $("#txtFechaActual").val(),
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



$("#btnSiguiente1").click(function () {
    // $("#Segundo").show();

    if (avanzar == 1) {
       $("#btnVolverInicio").removeClass('pull-right');
//        $("#btnVolverInicio").addClass('pull-lefth');
       $("#btnSiguiente2").css('margin-right', '5px');
        traerDietasIntenados();
        $("#tituloInternados").html("(" + $("#txtFechaActual").val() + ")");
        //  $("#Primero").scrollTo($("#Segundo"));
        $("#Primero").hide();
        $("#Segundo").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#Segundo").offset().top - 0 }, 500);
        $('#Segundo').show();
    }
});

$("#btnSiguiente2").click(function () {
    //$("#Tercero").show();
    traerTotalesDietas();
    $("#tituloTotales").html("(" + $("#txtFechaActual").val() + ")");

    $('#Segundo').hide();
    $("#Tercero").fadeIn(1500); 
    $('html, body').animate({ scrollTop: $("#Tercero").offset().top - 0 }, 500);
    $('#Tercero').show();
  //  $("#Segundo").scrollTo($("#Tercero"));
});

$("#btnVolverInicio").click(function () {
//    $("#btnVolverInicio").hide();
    $("#btnSiguiente2").removeClass('pull-right');
    $("#btnSiguiente2").addClass('pull-lefth');
    //    $("#btnSiguiente2").css('margin-right', '616px');

    $('#Segundo').hide();
    $("#Primero").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#Primero").offset().top - 0 }, 500);
    $("#Primero").show();
});

$("#btnVolverInternados").click(function () {

    //    $("#btnSiguiente2").hide();
    //    $("#btnVolverInicio").hide();

    $("#btnSiguiente2").addClass('pull-right');
    $("#btnSiguiente2").css('margin-right', '616px');
    //$("#btnVolverInicio").show();
    $('#Tercero').hide();
    $("#Segundo").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#Segundo").offset().top - 0 }, 500);
    $('#Segundo').show();
});

$("#btnVolverCargarPedidos").click(function () {
    $('#Segundo').hide();
    $("#Primero").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#Primero").offset().top - 0 }, 500);
    $("#Primero").show();

    $('#Tercero').hide();
//    $("#Segundo").fadeIn(1500);
//    $('html, body').animate({ scrollTop: $("#Segundo").offset().top - 0 }, 500);
////    $('#Segundo').show();
});


function cargarListaPedidos(li,ped) {
    $(ped).empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Tipificación</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    $.each(li, function (index, p) {
        Contenido = Contenido + "<tr><td style='cursor:auto'>" + p.tipificacion + " </td><td style='cursor:auto'> " + p.cantidad + "</td><td>";
        //        idPedido = p.idPedido;
    });
    var Pie = "</tbody></table>";
    $(ped).html(Encabezado + Contenido + Pie);

}


function traerTotalesDietas() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/traerTotalesPedidos",
        data: '{fecha: "' + $("#txtFechaActual").val() + '"}',
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //        complete: guardarDetalle,
        success: traer_Totales_Traido_je,
        error: errores
    });

}


function traer_Totales_Traido_je(resultado) {
    var P = resultado.d;

    ListaTotales.length = 0;
    $.each(P, function (index, i) {
        var pedido = {};
        pedido.tipificacion = i.tipificacion;
        pedido.cantidad = i.cantidad;

        ListaTotales.push(pedido);


    });
    if (ListaTotales.length == 0) {

        $("#btnImprimirTotales").attr('disabled', true);
    } else {
        imprimirTotales = 1;
        $("#btnImprimirTotales").attr('disabled', false);
    }

    var tabla = "#tablaTotales";
    cargarListaPedidos(ListaTotales, tabla);
}

function cargarPedidos(fecha) {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/traerPedido",
        data: '{fecha: "' + fecha + '"}',
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //complete: cargarLista(listaPedido),
        success: traer_Pedidos_Traidos_je,
        error: errores
    });
}


function traer_Pedidos_Traidos_je(resultado) {

    listaPedido.length = 0;

    $.each(resultado.d, function (index, i) {
        var pedido = {};
        pedido.tipificacion = i.tipificacion;
        pedido.dieta = i.dieta;
        pedido.dietaId = i.dietaId;
        pedido.fecha = i.fecha;
        pedido.cantidad = i.cantidad;
//        alert(pedido.dietaId);
        listaPedido.push(pedido);
        idPedido = i.idPedido;
    });

    if (listaPedido.length <= 0) {
    // alert(listaPedido.length);
        $("#btnImprimirPedidos").attr('disabled', true);
        imprimir = 0;
        avanzar = 1;
       // $("#btnSiguiente1").attr('disabled', true);
    }
  else {
//           alert(listaPedido.length);
           $("#btnImprimirPedidos").attr('disabled', false);
           imprimir = 1;
           $("#btnQuitar").attr('disabled', false);
           quitar = true;
           avanzar = 1;
           $("#btnSiguiente1").attr('disabled', false);
       }
       
    cargarLista(listaPedido);
}  