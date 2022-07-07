var imprimir = 0;
$("#btnAlta").click(function () {
    document.location = "../Farmacia/AltaInsumo.aspx";
});

function List_Rubros() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamentos_Rubro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Rubros_Cargado,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_Rubros_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Rubros").append($("<option></option>").val("0").html("TODOS"));
    $.each(Lista, function (index, Rubro) {
        if (Rubro.Id != "0")
        $("#cbo_Rubros").append($("<option></option>").val(Rubro.Id).html(Rubro.Rubro));
    });

}

function List_Presentacion() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamento_Presentacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Presentacion_Cargado,
        error: errores
    });
}

function List_Presentacion_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Presentacion").append($("<option></option>").val("0").html("TODOS"));
    $.each(Lista, function (index, Presentacion) {
        $("#cbo_Presentacion").append($("<option></option>").val(Presentacion.Id).html(Presentacion.Presentacion));
    });

}

$(document).ready(function () {
    List_Presentacion();
    List_Rubros();
    var Query = {};
    Query = GetQueryString();
    if (Query['Nombre'] != undefined) {
        var Nombre = Query['Nombre'];
        $("#medicamento").val(Nombre.replace(/%20/g, " "));
        List_Insumos($("#medicamento").val(), 0, 0);
    }

    Traer_Medicamento_Medidas();
});


//$("#medicamento").blur(function () {
//    List_Insumos($("#medicamento").val(), 0, 0);
//});

$("#medicamento").keypress(function (event) {
    if (event.which == 13) {
        if ($('#medicamento').attr('readonly') == undefined) {
            List_Insumos($("#medicamento").val(), $("#cbo_Rubros :selected").val(), $("#cbo_Presentacion :selected").val());
        }
    }
});


$("#btnBuscar").click(function () {
    List_Insumos($("#medicamento").val(), $("#cbo_Rubros :selected").val(), $("#cbo_Presentacion :selected").val(), $("#cboMedida :selected").val());

});


function List_Insumos(Nombre, Rubro, Presentacion, Medida) {
    $.ajax({
        type: "POST",
        data: '{Nombre: "' + Nombre + '", Rubro: "' + Rubro + '", Presentacion: "' + Presentacion + '", Medida: "' + Medida + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Insumos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Insumos_Cargado,
        error: errores,
        beforeSend: antes,
        complete: finalizo
    });
}

function finalizo() {
    $("#cargando").hide();
    $("#TablaMedicamentos_div").show();
}

function antes() {
    $("#cargando").show();
    $("#TablaMedicamentos_div").hide();
}

function List_Insumos_Cargado(Resultado) {
    var Insumos = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Insumo</th><th>Dosis</th><th>&nbsp;</th><th>Forma Farmaceutica</th><th>Stock Mínimo</th><th>Precio de Venta</th><th>Baja</th></tr></thead><tbody>";
    var Contenido = "";
    $.each(Insumos, function (index, Insumo) {
        var _Presentacion = Insumo.Presentacion;
        if (_Presentacion.length > 15) _Presentacion = _Presentacion.substring(0, 15);
        var _Baja = "No";
        if (Insumo.REM_BAJA == "S") _Baja = "Si";
        //<td>" + Insumo.REM_PRESENTACION_C.replace(',','.').substring(0,7) + " </td><td>" + Insumo.REM_PRESENTACION_DESC + " </td>
        Contenido = Contenido + "<tr onclick=LoadInsumo(" + Insumo.REM_ID + ")><td>" + Insumo.REM_NOMBRE + " </td><td> " + Insumo.REM_GRAMAJE + " </td><td>" + Insumo.REM_GRAMAJE_DESC + "</td><td>" + Insumo.REM_UNIDADES + " </td><td> " + Insumo.STO_MINIMO + " </td><td> $" + formatoMoneda(Insumo.REM_PRECIO) + " </td><td> " + _Baja + " </td></tr>";
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos_div").html(Encabezado + Contenido + Pie);
    if (Resultado.d.length > 0) {imprimir = 1;}
}

function LoadInsumo(InsumoID) {
    document.location = "../Farmacia/AltaInsumo.aspx?id="+InsumoID;
}

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

////////////manuel
function Traer_Medicamento_Medidas() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamento_Medidas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $("#cboMedida").append($("<option></option>").val(0).html("Seleccione"));
            $.each(Lista, function (index, Medida) {
            $("#cboMedida").append($("<option></option>").val(Medida.Id).html(Medida.Medida)); });
        },
        error: errores
    });
}

////////////manuel

$("#btnImprimir").click(function () {
    //alert($("#cbo_Rubros  option:selected").text());
    //return false;
    if (imprimir == 1) {
        //alert("Nombre= " + $("#medicamento").val() + " || RubroId= " + $("#cbo_Rubros").val() + " || PrestacionId= " + $("#cbo_Presentacion").val() + " || medida= " + $("#cboMedida").val() + " || rubro= " + $("#cbo_Rubros  option:selected").html() + " || presentacion= " + $("#cbo_Presentacion  option:selected").html() + " || insumo= " + $('#medicamento').val() + " || medida= " + $("#cboMedida  option:selected").html());
        $.fancybox({
            'href': "../Impresiones/ReportesFarmacia/Articulos_de_Farmacia.aspx?Id=" + 0 + "&Nombre=" + $("#medicamento").val() + "&RubroId=" + $("#cbo_Rubros").val() + "&PrestacionId=" + $("#cbo_Presentacion").val() + "&medida=" + $("#cboMedida").val() + "&rubro=" + $("#cbo_Rubros  option:selected").html() + "&presentacion=" + $("#cbo_Presentacion  option:selected").html() + "&insumo=" + $("#medicamento").val() + "&medidaDescripcion=" + $("#cboMedida  option:selected").html() + "&PDF=" + 1,
            'width': '90%',
            'height': '90%',
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