var objPractica = Array();
var objPracticas2 = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objDetails = new Array();
var Id = 0;

$.validator.setDefaults({
    ignore: ""
});

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
    var json = JSON.stringify({ "Desde": $("#txtDesdeParte").val(), "Hasta": $("#txtHastaParte").val(), "OS": $("#cbo_Institucion :selected").val(),
        "DesdeRend": $("#txtDesdeRendicion").val().trim(), "HastaRend": $("#txtHastaRendicion").val().trim()
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/ListRendicionAmbulatoriaSN",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#tabla").hide();
            $("#cargando").show();
        },
        success: List_Partes_Cargado,
        error: errores,
        complete: function () {
            $("#tabla").show();
            $("#cargando").hide();
        }
    });
}

function List_Partes_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista != null) {
        var Contenido = "";
        $("#trx").empty();
        $.each(Lista, function (index, Detalle) {
            $("#btnPrevia").show();
            var paciente = Detalle.Paciente.trim().toUpperCase();
            if (paciente.length > 15) paciente = paciente.substring(0, 15);
            var prestacion = Detalle.Prestacion.trim().toUpperCase();
            if (prestacion.length > 20) prestacion = prestacion.substring(0, 20);
            var Profesional = Detalle.Profesional.trim().toUpperCase();
            if (Profesional.length > 15) Profesional = Profesional.substring(0, 15);

            var _NroOrden = Detalle.NroOrden;
            if (_NroOrden == 0) _NroOrden = "";

            if (Detalle.NroOrden.trim() != 0) // Se cargo el nro de bono
                Contenido = Contenido + "<tr><td> " + Detalle.RendicionId + " </td><td> " + Detalle.Fecha + " </td><td> " + paciente + " </td><td> " + Profesional + " </td><td> " + Detalle.Codigo + " </td><td>" + _NroOrden + "</td><td>" + Detalle.Cantidad + " </td><td>" + prestacion + " </td><td style='display:none;'> $" + Detalle.HonoOS + " </td><td> $" + formatoMoneda(Detalle.GastoOS) + " </td><td> $" + formatoMoneda(Detalle.GastoTotal) + " </td></tr>";
            else if (Detalle.Clase == 1) // No se Cargo el Nro de Bono
                Contenido = Contenido + "<tr class='error'><td> " + Detalle.RendicionId + " </td><td> " + Detalle.Fecha + " </td><td> " + paciente + " </td><td> " + Profesional + " </td><td> " + Detalle.Codigo + " </td><td>" + _NroOrden + "</td><td>" + Detalle.Cantidad + " </td><td>" + prestacion + " </td><td style='display:none;'> $" + Detalle.HonoOS + " </td><td> $" + formatoMoneda(Detalle.GastoOS) + " </td><td> $" + formatoMoneda(Detalle.GastoTotal) + " </td></tr>";
            else Contenido = Contenido + "<tr><td> " + Detalle.RendicionId + " </td><td> " + Detalle.Fecha + " </td><td> " + paciente + " </td><td> " + Profesional + " </td><td> " + Detalle.Codigo + " </td><td>" + _NroOrden + "</td><td>" + Detalle.Cantidad + " </td><td>" + prestacion + " </td><td style='display:none;'> $" + Detalle.HonoOS + " </td><td> $" + formatoMoneda(Detalle.GastoOS) + " </td><td> $" + formatoMoneda(Detalle.GastoTotal) + " </td></tr>";
            Total = Total + 1;
        });
        var Pie = "</tbody></table>";
        $("#trx").html(Contenido);
    }
}


$("#btnBuscar").click(function () {
    if ($("#cbo_Institucion :selected").val() != "") {
        List_Partes();
    }
    else alert("Seleccione Obra Social");
});

$("#btnPrevia").click(function () {
    if ($("#txtHastaParte").val().length > 0)
        var Fecha = $("#txtHastaParte").val();
    else var Fecha = FechaActual();
    var url = "../Impresiones/ImpresionRendicionAmbulatoriaSN.aspx?Os=" + $("#cbo_Institucion :selected").val() + "&Desde=" + $("#txtDesdeParte").val() + "&Hasta=" + $("#txtHastaParte").val() + "&DesdeRend=" + $("#txtDesdeRendicion").val() + "&HastaRend=" + $("#txtHastaRendicion").val() + "&Tipo=" + $("#cbo_Tipo :selected").val();
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