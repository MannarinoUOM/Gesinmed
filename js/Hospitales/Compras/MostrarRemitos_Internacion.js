function List_Proveedores(Todos) {
    $.ajax({
        type: "POST",
        data: '{Todos: "' + Todos + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $.each(Lista, function (index, Proveedor) {
                $("#cbo_Proveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
            });
        },
        complete: function () {
            $("#cbo_Proveedor").val(query_prov);
            $("#btnBuscar").click();
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#txtLetra").blur(function () {
    $("#txtLetra").val($("#txtLetra").val().toUpperCase());
});

function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    // declare object
    var queryObj = {};
    // loop through each name-value pair and populate object
    for (var i = 0; i < querystring.length; i++) {
        // get name and value
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        // populate object
        queryObj[name] = value;
    }
    return queryObj;
}

var query_prov = 0;
var query_desde = "";
var query_hasta = "";
var query_letra = "";
var query_n1 = "";
var query_n2 = "";
var G_FARMACIA = 0;

$(document).ready(function () {
    InitControls();
    var queryObj = {};
    queryObj = GetQueryString();
    if (queryObj["Farmacia"] != null) G_FARMACIA = 1;
    if (queryObj['Prov'] != null) {
        query_prov = queryObj['Prov'];
        query_desde = queryObj['Desde'];
        query_hasta = queryObj['Hasta'];
        query_letra = queryObj['Letra'];
        query_n1 = queryObj['N1'];
        query_n2 = queryObj['N2'];
        $("#txtFechaIni").val(query_desde);
        $("#txtFechaFin").val(query_hasta);
        $("#txtLetra").val(query_letra);
        //$("#txtSucursal").val(query_n1); cacelado para que no busque por remito cuando se vuelve de la pantalla de detalles pedido por miguel. 13/4/21
        //$("#txtNumero").val(query_n2);
    }
});

function InitControls() {
    List_Proveedores('S');
    $("#txtLetra").mask("a", { placeholder: "-" });
    $("#txtSucursal").mask("9?999", { placeholder: "-" });
    $("#txtNumero").mask("9?9999999", { placeholder: "-" });

    $("#txtLetra_Fact").mask("a", { placeholder: "-" });
    $("#txtSucursal_Fact").mask("9?999", { placeholder: "-" });
    $("#txtNumero_Fact").mask("9?9999999", { placeholder: "-" });

    $("#txtOrdenCompra").mask("9?9999999", { placeholder: "-" });

    $("#txtFechaIni").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaIni").val(p);
    $("#txtFechaFin").val(d);
}

$(function () {
    $("#txtFechaIni").datepicker({
        onClose: function (selectedDate) {
            $("#txtFechaFin").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#txtFechaFin").datepicker({
        onClose: function (selectedDate) {
            $("#txtFechaIni").datepicker("option", "maxDate", selectedDate);
        }
    });
});

function SearchbyAll(letra, numero, sucursal, Proveedor, Desde, Hasta, letra_Fact, sucursal_Fact, numero_Fact, Ncompra) {
    if (Desde.trim().length == 0) Desde = '01/01/1900';
    if (Hasta.trim().length == 0) Hasta = '01/01/1900';
    if (sucursal.trim().length == 0) sucursal = 0;
    if (numero.trim().length == 0) numero = 0;
    if (sucursal_Fact.trim().length == 0) sucursal_Fact = 0;
    if (numero_Fact.trim().length == 0) numero_Fact = 0;
    if (Ncompra.trim().length == 0) Ncompra = 0;

//    alert("Desde="+ Desde + " Hasta="+ Hasta+ " ProveedorId="+ Proveedor+ " Letra=" + letra +" Sucursal="+ sucursal + " Numero=" + numero
//    + "Letra_Fact="+ letra_Fact+ " Sucursal_Fact=" + sucursal_Fact+ " Numero_Fact="+ numero_Fact+ " Ncompra="+ Ncompra+ " Farmacia="+ G_FARMACIA
//    );


    Ncompra = Ncompra.toString().replace( /\-/g , '' );
    
    var json = JSON.stringify({ "Desde": Desde, "Hasta": Hasta, "ProveedorId": Proveedor, "Letra": letra, "Sucursal": sucursal, "Numero": numero
    , "Letra_Fact": letra_Fact, "Sucursal_Fact": sucursal_Fact, "Numero_Fact": numero_Fact, "Ncompra": Ncompra, "Farmacia": G_FARMACIA
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/List_Remitos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: SearchbyLetraSucNumero_Cargado,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaRemitos_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaRemitos_div").show();
            $(".NRO_FACT").inputmask("A-9999-99999999");


            var total = 0;
            var totalString = "";
            $(".verificarMoney").each(function (index, item) {

                totalString = $(this).html();
                totalString = totalString.replace("$", "");
                totalString = totalString.replace(/,/g, "");

                if (parseInt(totalString)) { total += parseFloat(totalString); }
            });

            // $("#Total").html("Importe Total: $" + total.toFixed(2).toString());
            $("#Total").html("Importe Total: $ " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
        }
    });

}


//$(".NRO_FACT").keydown(function (event) {
//    //keyReport(event, theOutputKeyDown);
//    alert();
//});


//$(".NRO_FACT").live('keydown', function (e) {

//    //    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
//    //            (e.keyCode == 65 && e.ctrlKey === true) ||
//    //            (e.keyCode >= 35 && e.keyCode <= 40)) {
//    //        return;
//    //    }

//    //    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//    //        e.preventDefault();
//    //    }
//   // alert(e.keyCode);
//});

function CompletarCeros(cant_ceros, str_num) {
    if (str_num == 0) return '';

    var num = str_num.toString();
    var numtmp = num;
    var largo = numtmp.length;
    if (largo == cant_ceros) return numtmp;
    var ceros = '';
    var pendientes = cant_ceros - largo;
    for (i = 0; i < pendientes; i++) ceros += '0';
    return (ceros + numtmp);
}

function LetraValidar(str_letra) {
    str_letra = (str_letra.length == 0) ? '' : str_letra;
    return str_letra;
}

$.fn.selectText = function () {
    var doc = document;
    var element = this[0];
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function SearchbyLetraSucNumero_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr>" +
    "<th style='width:5%'></th>" +
    "<th style='text-aling:center'>Proveedor</th>" +
    "<th style='text-aling:center'>Fecha</th>" +
    "<th style='width:10%;text-aling:center'>N° Orden <br /> compra</th>" +
    "<th style='width:12%'>Nº Remito</th>" +
    "<th style='paddin-left:2.7%;width:9%'>Importe</th>" +
    "<th style='width:12%'>Nº Factura</th>" +
    "<th>Observaciones</th>" +
    "</tr></thead><tbody>";
    var Contenido = "";
    $.each(Lista, function (index, Remito) {
        var showScan = "inline";

        //if (Remito.REM_TIPO != "I") { showScan = "none"; }
        var total = "";
        //        if (Remito.REM_TIPO == "I") { if (Remito.total > 0) { total += "$ " + Remito.total; } }
        //        if (Remito.REM_TIPO == "A") { if (Remito.totalADM > 0) { total += "$ " + Remito.totalADM; } }

        if (Remito.totalADM > 0) { total += "$ " + Remito.totalADM.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString(); }

        Contenido = Contenido + "<tr data-id='" + index + "'>" +
        "<td><a class='btn btn-mini' id='btnEscanear' onclick='subirEscaneo(" + Remito.REM_I_ID + ")' style='display:" + showScan + "'>Escanear</a></td>" +
        "<td data-id='" + Remito.REM_I_ID + "' class='VER_PEDIDO'> " + Remito.RAZON_SOCIAL + " </td>" +
        "<td class='VER_PEDIDO' data-id='" + Remito.REM_I_ID + "'> " + Remito.REM_I_FECHA + " </td>" +
        "<td class='VER_PEDIDO' data-id='" + Remito.REM_I_ID + "' style='padding-left:1%;text-aling:center'> " + Remito.REM_TIPO + " - " + Remito.Ncompra + " </td>" +

        "<td data-id='" + Remito.REM_I_ID + "' class='NRO_REM'  id='NRO_REM" + Remito.REM_I_ID + "' contenteditable> " + Remito.REM_I_LETRA + '-' + CompletarCeros(4, Remito.REM_I_SUCURSAL) + '-' + CompletarCeros(8, Remito.REM_I_NUMERO) + "</td>" + // REMITO
        "<td style='display:none;' data-id=" + Remito.REM_I_ID + " class='NRO_REM_ORIGINAL' id='NRO_REM_ORIGINAL" + Remito.REM_I_ID + "'> " + Remito.REM_I_LETRA + '-' + CompletarCeros(4, Remito.REM_I_SUCURSAL) + '-' + CompletarCeros(8, Remito.REM_I_NUMERO) + "</td>" +


        "<td class='VER_PEDIDO verificarMoney' style='padding-left:1%' data-id='" + Remito.REM_I_ID + "'>" + total+ "</td>" +

        "<td data-id='" + Remito.REM_I_ID + "' class='NRO_FACT' id='NRO_FACT" + Remito.REM_I_ID + "' contenteditable> " + LetraValidar(Remito.REM_I_LETRA_FACT) + '-' + CompletarCeros(4, Remito.REM_I_SUCURSAL_FACT) + '-' + CompletarCeros(8, Remito.REM_I_NUMERO_FACT) + "</td>" + // FACTURA
        "<td style='display:none;' data-id=" + Remito.REM_I_ID + " class='NRO_FACT_ORIGINAL' id='NRO_FACT_ORIGINAL" + Remito.REM_I_ID + "'> " + LetraValidar(Remito.REM_I_LETRA_FACT) + '-' + CompletarCeros(4, Remito.REM_I_SUCURSAL_FACT) + '-' + CompletarCeros(8, Remito.REM_I_NUMERO_FACT) + "</td>" +

        "<td data-id='" + Remito.REM_I_ID + "' class='VER_PEDIDO'> " + Remito.REM_I_OBS + " </td>" +
        "<td id='tipo" + Remito.REM_I_ID + "' style='display:none'> " + Remito.REM_TIPO + " </td></tr>"; // tipo de remito I o A
        "</tr>";
    });
    var Pie = "</tbody></table>";
    $("#TablaRemitos_div").html(Encabezado + Contenido + Pie);

    //$(".verificarMoney").toFixed(2);
    //$(".verificarMoney").simpleMoneyFormat();
}

function subirEscaneo(REM_ID) {
    $.fancybox({
        'href': "../Compras/scan_Rem_Comp_Internacion.aspx?REM_ID=" + REM_ID,
        'width': '60%',
        'height': '80%',
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


$(document).on('click', '.VER_PEDIDO', function () {
    LoadRemito($(this).data("id"));
});

$(document).on('focus', '.NRO_FACT', function () {
    $(this).selectText();
});

$(document).on('focus', '.NRO_REM', function () {
    $(this).selectText();
});

$(document).on("focusout", ".NRO_FACT", function () {
    var rem_id = $(this).data('id');
    var str_nro_fact = $(this).html().trim().toUpperCase();

    if (str_nro_fact == $("#NRO_FACT_ORIGINAL" + rem_id).html().trim().toUpperCase()) return false;
    //alert(str_nro_fact.indexOf("_") + 1);
    var indice = 0;
    var r = -1;
    indice = parseInt(str_nro_fact.indexOf("_"));
    if (indice == r) {
        // alert(str_nro_fact.indexOf("_"));

        if ($("#NRO_FACT_ORIGINAL" + rem_id).html().trim().length > 0) {

            if (confirm("¿Desea cambiar el número de factura?")) {
                if (str_nro_fact.length == 15) {
                    var nro_fact = str_nro_fact.split("-");
                    ActualizarNroFactura(rem_id, nro_fact,1);
                }
                else {

                    $(this).html($("#NRO_FACT_ORIGINAL" + rem_id).html().trim().toUpperCase());
                    //alert("Ingrese nro. de factura en formato correcto.");
                }
            }
            else return false;
        }
        else {
            if ($(this).html().trim().toUpperCase().length == 15) {
                var nro_fact = $(this).html().trim().toUpperCase().split("-");
                ActualizarNroFactura(rem_id, nro_fact,1);
            }
            else {
                alert("Ingrese nro. de factura en formato correcto (N-XXXX-XXXXXXXX).");
                $(this).html($("#NRO_FACT_ORIGINAL" + rem_id).html().trim().toUpperCase());
            }
        }
    } else {
        $(this).val($("#NRO_FACT_ORIGINAL" + rem_id).html().toString());
        //alert("Ingrese nro. de factura en formato correcto."); 
    }

});



$(document).on("focusout", ".NRO_REM", function () {
    var rem_id = $(this).data('id');
    var str_nro_rem = $(this).html().trim().toUpperCase();

    if (str_nro_rem == $("#NRO_REM_ORIGINAL" + rem_id).html().trim().toUpperCase()) return false;
    //alert(str_nro_fact.indexOf("_") + 1);
    var indice = 0;
    var r = -1;
    indice = parseInt(str_nro_rem.indexOf("_"));
    if (indice == r) {
        // alert(str_nro_fact.indexOf("_"));

        if ($("#NRO_REM_ORIGINAL" + rem_id).html().trim().length > 0) {
            if (confirm("¿Desea cambiar el número de remito?")) {
                if (str_nro_rem.length == 15) {
                    var nro_rem = str_nro_rem.split("-");
                    ActualizarNroFactura(rem_id, nro_rem, 2);
                }
                else {
                    $(this).html($("#NRO_REM_ORIGINAL" + rem_id).html().trim().toUpperCase());
                    //alert("Ingrese nro. de factura en formato correcto.");
                }
            }
            else
                $(this).html($("#NRO_REM_ORIGINAL" + rem_id).html().trim().toUpperCase());
             return false;
        }
        else {
            if ($(this).html().trim().toUpperCase().length == 15) {
                var nro_rem = $(this).html().trim().toUpperCase().split("-");
                ActualizarNroFactura(rem_id, nro_rem, 2);
            }
            else {
                alert("Ingrese nro. de remito en formato correcto (N-XXXX-XXXXXXXX).");
                $(this).html($("#NRO_RE_ORIGINAL" + rem_id).html().trim().toUpperCase());
            }
        }
    } else {
        $(this).val($("#NRO_REM_ORIGINAL" + rem_id).html().toString());
        //alert("Ingrese nro. de factura en formato correcto."); 
    }

});


function ValidarDatosFactura(rem_id, nro_fact) {
    if (rem_id <= 0) { alert("Nro. de remito no valido."); return false; }
    if (nro_fact[0].trim().length != 1) { alert("Letra de factura no valida."); return false; }
    if (nro_fact[1].trim().length < 4) { alert("Sucursal de factura no valida."); return false; }
    if (nro_fact[2].trim().length < 8) { alert("Número de factura no valido."); return false; }
    return true;
}

function ActualizarNroFactura(rem_id, nro_fact, tipo) {
    if (!ValidarDatosFactura(rem_id, nro_fact)) { return false; $("#btnBuscar").click(); }
                                                                                                                  //tipo 1 actualiza factura, tipo 2 actualiza remito
    var json = JSON.stringify({ "REM_ID": rem_id, "LETRA": nro_fact[0], "SUC": nro_fact[1], "NUMERO": nro_fact[2] , "tipo": tipo });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COMPRAS_REMITOS_ING_CAB_INTERNACION_UPDATE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            $("#btnBuscar").click();
        },
        error: errores
    });
}

function LoadRemito(Id) {
    document.location = "Compras_CargarRemito_Internacion.aspx?Id=" + Id + "&Prov=" + $("#cbo_Proveedor :selected").val() + "&Desde=" + $("#txtFechaIni").val() +
    "&Hasta=" + $("#txtFechaFin").val() + "&Letra=" + $("#txtLetra").val() + "&N1=" + $("#txtSucursal").val() + "&N2=" + $("#txtNumero").val() + "&tipo=" + $("#tipo" + Id).html().trim();
}

$("#btnBuscar").click(function () {
    var Proveedor = $("#cbo_Proveedor :selected").val();
    SearchbyAll($("#txtLetra").val(), $("#txtNumero").val(), $("#txtSucursal").val(), Proveedor, $("#txtFechaIni").val(), $("#txtFechaFin").val(),
    $("#txtLetra_Fact").val(), $("#txtSucursal_Fact").val(), $("#txtNumero_Fact").val(), $("#txtOrdenCompra").val());
});

$("#btnCargarNuevo").click(function () {
    window.location = "Compras_CargarRemito_Internacion.aspx";
});



$(".impresion").click(function () {

    var Desde = $("#txtFechaIni").val();
    var Hasta = $("#txtFechaFin").val();
    var sucursal = $("#txtSucursal").val();
    var numero = $("#txtNumero").val();
    var sucursal_Fact = $("#txtSucursal_Fact").val();
    var numero_Fact = $("#txtNumero_Fact").val();
    var Ncompra = $("#txtOrdenCompra").val();
    var letra = $("#txtLetra_Fact").val();

    if (numero.trim().length == 0) numero = 0;
    if (sucursal_Fact.trim().length == 0) sucursal_Fact = 0;
    if (numero_Fact.trim().length == 0) numero_Fact = 0;
    if (Ncompra.trim().length == 0) Ncompra = 0;
    if (sucursal.trim().length == 0) sucursal = 0;
    if (letra.trim().length == 0) letra = " ";

    $.fancybox({
        'href': "../Impresiones/Compras/BuscarRemitosFacturas.aspx?Desde=" + Desde + "&Hasta=" + Hasta +
        "&ProveedorId=" + $("#cbo_Proveedor").val() + "&Letra=" + $("#txtLetra").val() + "&Sucursal=" + sucursal +
        "&Numero=" + numero + "&Letra_Fact=" + letra + "&Sucursal_Fact=" + sucursal_Fact +
        "&Numero_Fact=" + numero_Fact + "&Ncompra=" + Ncompra + "&Farmacia=" + G_FARMACIA + "&PDF=" + $(this).data("tipo"),

        'width': '80%',
        'height': '80%',
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


