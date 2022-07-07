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

$(document).ready(function () {
    InitControls();
    var queryObj = {};
    queryObj = GetQueryString();
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
        $("#txtSucursal").val(query_n1);
        $("#txtNumero").val(query_n2);
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

function SearchbyAll(letra, numero, sucursal, Proveedor, Desde, Hasta, letra_Fact, sucursal_Fact, numero_Fact) {
    if (Desde.trim().length == 0) Desde = '01/01/1900';
    if (Hasta.trim().length == 0) Hasta = '01/01/1900';
    if (sucursal.trim().length == 0) sucursal = 0;
    if (numero.trim().length == 0) numero = 0;
    if (sucursal_Fact.trim().length == 0) sucursal_Fact = 0;
    if (numero_Fact.trim().length == 0) numero_Fact = 0;

    var json = JSON.stringify({ "Desde": Desde, "Hasta": Hasta, "ProveedorId": Proveedor, "Letra": letra, "Sucursal": sucursal, "Numero": numero
    , "Letra_Fact": letra_Fact, "Sucursal_Fact": sucursal_Fact, "Numero_Fact": numero_Fact
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/List_Remitos",
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
        }
    });

}

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


function SearchbyLetraSucNumero_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Proveedor</th><th>Fecha</th><th>Nº Remito</th><th>Nº Factura</th><th>Observaciones</th></tr></thead><tbody>";
    var Contenido = "";
    $.each(Lista, function (index, Remito) {
        Contenido = Contenido + "<tr onclick='LoadRemito(" + Remito.REM_I_ID + ")'<td></td><td> " + Remito.RAZON_SOCIAL + " </td><td> " + Remito.REM_I_FECHA + " </td><td> " + Remito.REM_I_LETRA + '-' + CompletarCeros(4, Remito.REM_I_SUCURSAL) + '-' + CompletarCeros(8, Remito.REM_I_NUMERO) + "</td><td> " + LetraValidar(Remito.REM_I_LETRA_FACT) + '-' + CompletarCeros(4, Remito.REM_I_SUCURSAL_FACT) + '-' + CompletarCeros(8, Remito.REM_I_NUMERO_FACT) + "</td><td> " + Remito.REM_I_OBS + " </td></tr>";
    });
    var Pie = "</tbody></table>";
    $("#TablaRemitos_div").html(Encabezado + Contenido + Pie);
}

function LoadRemito(Id) {
    document.location = "Compras_CargarRemito.aspx?Id=" + Id + "&Prov=" + $("#cbo_Proveedor :selected").val() + "&Desde=" + $("#txtFechaIni").val() +
    "&Hasta=" + $("#txtFechaFin").val() + "&Letra=" + $("#txtLetra").val() + "&N1=" + $("#txtSucursal").val() + "&N2=" + $("#txtNumero").val();
}

$("#btnBuscar").click(function () {
    var Proveedor = $("#cbo_Proveedor :selected").val();
    SearchbyAll($("#txtLetra").val(), $("#txtNumero").val(), $("#txtSucursal").val(), Proveedor, $("#txtFechaIni").val(), $("#txtFechaFin").val(),
    $("#txtLetra_Fact").val(), $("#txtNumero_Fact").val(), $("#txtSucursal_Fact").val());
});

$("#btnCargarNuevo").click(function () {
    window.location = "Compras_CargarRemito.aspx";
});