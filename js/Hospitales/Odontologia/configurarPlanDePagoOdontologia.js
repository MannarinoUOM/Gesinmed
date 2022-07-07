var id = 0;
var nombre = "";
var cantidadCuotas = 0;
var sumaCuotas = 0;
var cuotasRestantes = 0;
var cuotaActual = 0;
var lista = new Array();
var idActual = 0;
var actualizo = 0;

$(document).ready(function () {
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

    if (GET["id"] != "" && GET["id"] != null) {
        id = GET["id"]; nombre = GET["nombre"];
        traerPlan(id);
    }
    $("#txtPracticas").val(nombre);

    $(".moneda").live('keydown', function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 188]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }

        $(".moneda").mask('00.000,00', { reverse: true });

        if ($(this).val().trim().length > 0 && (e.keyCode == 190 || e.keyCode == 110) && ($(this).val().trim().indexOf('.') === -1) && ($(this).val().trim().indexOf(',') === -1)) return;

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $("#cboPracticas").val(id);
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#txtCantidaCuotas").on('change', function (e) {
    var encabezado = "<table class='table'>";
    var fila = "";
    var pie = "</table>";
    cantidadCuotas = parseInt($(this).val());
    sumaCuotas = 0;

    for (i = 1; i <= cantidadCuotas; i++) {
        if (i == 1) {
            fila += "<tr><td style='width:60%'>&nbsp;&nbsp;&nbsp;CUOTA " + i + "</td><td><input type='text' class='moneda input-medium cuota' style='margin-left:30%; margin-bottom:0px' id='cuota_" + i + "' /></td></tr>";
        } else {
            fila += "<tr><td style='width:60%'>&nbsp;&nbsp;&nbsp;CUOTA " + i + "</td><td><input type='text' class='moneda input-medium cuota' style='margin-left:30%; margin-bottom:0px' disabled='disabled' id='cuota_" + i + "'/></td></tr>";
        }
    }
    $("#txtTablaCUotas").html(encabezado + fila + pie);
});

$(".habilitar").on('change', function () {
    if (id > 0 && $("#txtValor").val().trim().length > 0) { $("#txtCantidaCuotas").attr('disabled', false); }
    else {
        $("#txtCantidaCuotas").val("");
        $("#txtCantidaCuotas").attr('disabled', true);
        $(".cuota").val("");
        $(".cuota").each(function (index, item) {
            
            if ($(this).attr('id').replace("cuota_","") > 1) {
                //alert();
                $(this).attr('disabled', true);
            }
        });
        cantidadCuotas = 0;
        sumaCuotas = 0;
    }
});

$(".cuota").live('change', function () {
    var compensacion = 0;
    var total = 0;
    cuotasRestantes = 0;
    if (parseInt(reemplazar($(this).val())) > reemplazar($("#txtValor").val())) {
        alert("La suma de las cuotas no puede superar al valor total.");
        return false;
    } else {
        var idActual = parseInt($(this).attr('id').replace('cuota_', ''));
        var idSiguiente = parseInt($(this).attr('id').replace('cuota_', '')) + 1;

        sumaCuotas = 0;
        $(".cuota").each(function (index, item) {
            if ($(this).attr('disabled') == undefined) {
                sumaCuotas = sumaCuotas + parseFloat(reemplazar($(this).val()));
            } else { cuotasRestantes += 1; }
        });


        var valorTotal = reemplazar($("#txtValor").val());
        var montoRestante = valorTotal - sumaCuotas;

        //if ($("#cuota_" + idSiguiente).attr('disabled') == 'disabled') { alert("paso"); cuotasRestantes = cantidadCuotas - idActual; }


        //alert("sumaCuotas: " + sumaCuotas + "//valorTotal: " + valorTotal + "//montoRestante: " + montoRestante + "//cuotasRestantes: " + cuotasRestantes);
        $(".cuota").each(function (index, item) {
            if ($(this).attr('id').replace('cuota_', '') > idActual) {
                var valor = montoRestante / cuotasRestantes;
                valor = parseFloat(valor, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();

                //alert( Math.round(valor * 100) / 100);

                $(this).val(formatear(valor));
                //var real = parseFloat(valor, 10).toFixed(20).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()

            }
            total = total + parseFloat(reemplazar($(this).val()));
        });

        if (reemplazar($("#txtValor").val()) != total) {
            compensacion = reemplazar($("#txtValor").val()) - total
            //alert(compensacion);
        }

        //        compensacion = formatear(compensacion);

        //        var r = compensacion + parseFloat(reemplazar($("#cuota_" + idSiguiente).html()));
        //        alert("compe: " + compensacion);
        //        //alert("c: " + parseFloat(reemplazar($("#cuota_" + idSiguiente).html())));
        //        alert("cuota: " + $("#cuota_" + idSiguiente).html());

        var nuevoValor = parseFloat(reemplazar($("#cuota_" + idSiguiente).val())) + parseFloat(compensacion);
        nuevoValor = parseFloat(nuevoValor, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
        $("#cuota_" + idSiguiente).val(formatear(nuevoValor));
        $("#cuota_" + idSiguiente).attr('disabled', false);

    }

});


//var s = (item.valor * item.cantidad);
////alert("s atnes formatear: " + s);
//s = parseFloat(s, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();

////alert("s despues parse: " + s);

//s = formatear(s);
//obj.valor = reemplazar(obj.valor);

function reemplazar(valor) {
    var retorno = "";
    $.each(valor, function (index, item) {
        switch (item) {
            case ",":
                retorno += ".";
                break;
            case ".":
                retorno += "";
                break;
            default:
                retorno += item;
                break;
        }
    });

    return retorno;
}

function formatear(valor) {
    var retorno = "";

    $.each(valor, function (index, item) {
        switch (item) {
            case ",":
                retorno += ".";
                break;
            case ".":
                retorno += ",";
                break;
            default:
                retorno += item;
                break;
        }
    });
    return retorno;
}

$("#btnGuardar").click(function () {

    var total = 0;
    $(".cuota").each(function (index, item) { total = total + parseFloat(reemplazar($(this).val())); });

    if ($("#txtValor").val().trim().length == 0) { alert("Indique el valor total"); return false; }
    if ($("#txtCantidaCuotas").val().trim().length == 0) { alert("Indique la cantidad de cuotas"); return false; }
    if (isNaN(total)) { alert("Cargue alguna cuota"); return false; }
    if (total < reemplazar($("#txtValor").val())) { alert("La suma de las coutas es menor al monto total. Reformule cuotas"); return false; }

    total = parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
    var r = confirm("Suma de cuotas: " + formatear(total));

    if (r) {

        var json = JSON.stringify({ "practicaId": id, "valorTotal": reemplazar($("#txtValor").val()), "cantidadCuotas": reemplazar($("#txtCantidaCuotas").val()) });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Odontologia.asmx/OdontologiaGuardarPlanPagoEncabezado",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) { guardarDetalle(); },
            error: errores
        });
    }
});



function guardarDetalle() {
    var planPago = new Array();
    $(".cuota").each(function (index, item) {
        var obj = {};
        obj.practicaId = id;
        obj.Ncuota = parseInt($(this).attr('id').replace('cuota_', ''));
        obj.valor = reemplazar($(this).val());
        planPago.push(obj);
    });

    var json = JSON.stringify({ "planPago": planPago, "practicaId": id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Odontologia.asmx/OdontologiaGuardarPlanPago",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            alert("Guardado");
            parent.jQuery.fancybox.close();
            //  return false;

        },
        error: errores
    });
 }


function traerPlan(id) {
    var json = JSON.stringify({ "practicaId": id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Odontologia.asmx/OdontologiaTraerPlanPago",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) { if (Resultado.d.length > 0) { cargarplan(Resultado.d); cargarCAB(); } },
        error: errores
    });
}

function cargarplan(lista) {
    var encabezado = "<table class='table'>";
    var fila = "";
    var pie = "</table>";
    cantidadCuotas = lista.lenght;
    sumaCuotas = 0;

    //for (i = 1; i <= cantidadCuotas; i++) {

    $.each(lista, function (index, item) {
        item.valor = parseFloat(item.valor, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
        item.valor = formatear(item.valor);
        if (item.Ncuota == 1) {
            fila += "<tr><td style='width:60%'>&nbsp;&nbsp;&nbsp;CUOTA " + item.Ncuota + "</td><td><input type='text' class='moneda input-medium cuota' style='margin-left:30%; margin-bottom:0px' id='cuota_" + item.Ncuota + "' value='" + item.valor + "'/></td></tr>";
        } else {
            fila += "<tr><td style='width:60%'>&nbsp;&nbsp;&nbsp;CUOTA " + item.Ncuota + "</td><td><input type='text' class='moneda input-medium cuota' style='margin-left:30%; margin-bottom:0px' disabled='disabled' id='cuota_" + item.Ncuota + "' value='" + item.valor + "'/></td></tr>";
        }
    });
    $("#txtTablaCUotas").html(encabezado + fila + pie);
}

function cargarCAB() {
    var json = JSON.stringify({ "practicaId": id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Odontologia.asmx/OdontologiaTraerPlanPagoEncabezado",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            Resultado.d.valorTotal = parseFloat(Resultado.d.valorTotal, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
            Resultado.d.valorTotal = formatear(Resultado.d.valorTotal);
            $("#txtValor").val(Resultado.d.valorTotal);
            $("#txtCantidaCuotas").val(Resultado.d.cantidadCuotas);
         },
        error: errores
    });
}