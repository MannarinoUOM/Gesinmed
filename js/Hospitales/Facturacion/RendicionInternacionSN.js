
var Total = 0;
var objPartes = "";

$(document).ready(function () {
    InitControls();
    List_ObraSociales(false);
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

function dias(mes, anno) {
    mes = parseInt(mes);
    anno = parseInt(anno);
    switch (mes) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
        case 2: return (anno % 4 == 0) ? 29 : 28;
    }
    return 30;
}

function ultimodia() {
    var arreglo = $("#txtDesdeParte").val().split("/");
    var dia = arreglo[0];
    var mes = arreglo[1];
    var anno = arreglo[2];

    dia = dias(mes, anno);

    $("#txtHastaParte").val(dia + "/" + mes + "/" + anno);
}

function InitControls() {
    $(".date").datepicker();
    $(".date").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaRendicion").val(FechaActual());
    var Fecha = new Date();
    var a = Fecha.getFullYear();
    var m = Fecha.getMonth() + 1;
    $("#txtDesdeParte").val("01/" + m + "/" + a);
    ultimodia();
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_ObraSociales(Todas) {
    var json = JSON.stringify({ "Todas": Todas });
    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/ListObraSociales",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_ObraSociales_Cargado,
        error: errores
    });
}

function List_ObraSociales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Institucion").append($("<option></option>").val("").html("Seleccione Obra Social..."));
    $.each(Lista, function (index, Obra) {
        $("#cbo_Institucion").append($("<option></option>").val(Obra.id).html(Obra.OS));
    });
}

function List_Partes() {
    var json = JSON.stringify({ "InstitucionId": $("#cbo_Institucion :selected").val(), "DesdeParte": $("#txtDesdeParte").val(), "HastaParte": $("#txtHastaParte").val(),
        "DesdeRendicion": $("#txtDesdeRendicion").val(), "HastaRendicion": $("#txtHastaRendicion").val()
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/List_RendicionInternacion_SN",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Partes_Cargado,
        beforeSend: function () {
            $("#tabla").hide();
            $("#cargando").show();
        },
        complete: function () {
            $("#tabla").show();
            $("#cargando").hide();
        },
        error: errores
    });
}

function List_Partes_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista != null) {
        $("#btnPrevia").show();
        var Contenido = "";
        $("#trx").empty();
        $.each(Lista, function (index, Detalle) {
            Contenido = Contenido + "<tr><td><input type='checkbox' class='checks' onclick='RecorrerChecks()' id='chk" + index + "' value='" + index + "'/></td><td id='NroParte" + index + "'>" + Detalle.NroParte + " </td><td style='display:none;'> " + Detalle.NroInternacion + "</td><td> " + Detalle.FechaPractica + " </td><td> " + Detalle.Afiliado + " </td><td style='display:none;' id='Gasto" + index + "'>" + Detalle.Gasto + " </td><td> $" + formatoMoneda(Detalle.Gasto) + " </td></tr>";
        });
        var Pie = "</tbody></table>";
        $("#trx").html(Contenido);
    }
}

function RecorrerChecks() {
    Total = 0;
    objPartes = "";
    $(".checks").each(function () {
        if ($(this).attr("checked")) {
            var val = $(this).val();
            objPartes = objPartes + $("#NroParte" + val).html() + ",";
            Total = Total + parseFloat($("#Gasto" + val).html());
            $("#Total").html("Total: $" + formatoMoneda(Total));
        }
        else $("#Total").html("Total: $" + formatoMoneda(Total));
    });
}

$("#chk_todos").click(function () {
    if ($("#chk_todos").is(":checked")) {
        $(".checks").attr("checked", true);
    }
    else $(".checks").removeAttr("checked");
    RecorrerChecks();
});

$("#btnBuscar").click(function () {
    if ($("#cbo_Institucion :selected").val() != "") {
        List_Partes();
    }
    else alert("Seleccione Obra Social");
});

$("#btnPrevia").click(function () {
    var url = "../Impresiones/ImpresionSeleccionDatosPreviaSN.aspx?Partes=" + objPartes + "&DesdeParte=" + $("#txtDesdeParte").val() + "&HastaParte=" + $("#txtHastaParte").val() + "&Tipo=" + $("#cbo_Tipo :selected").val() + "&Os=" + $("#cbo_Institucion :selected").val();
    Ventana(url);
});


function Ventana(url) {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
}