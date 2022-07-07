var Total = -1;
var Medicos;
var List = new Array();
var Rendicion = null;
var n = 0;
$(document).ready(function () {
    List_Centro();
    ListMedicos(0);
    $("#txtFechaFact").val(FechaActual());
    var parts = $("#txtFechaFact").val().split('/');
    $("#txtAnio").val(parts[2]);
    $("#txtMes").val(parts[1]);
    $("#txtFechaFact").datepicker();
    var Query = {};
    Query = GetQueryString();
    if (Query['Rendicion'] != null) {
        CargarRendicion(Query['Rendicion']);
        Rendicion = Query['Rendicion'];
        InitControls();
    }

});

function InitControls() {
    $("#txtFechaFact").attr("disabled", "disabled");
    $("#txtAnio").attr("disabled", "disabled");
    $("#txtMes").attr("disabled", "disabled");
    $("#btnPreFacturar").hide();
    $("#btnFacturar").hide();
    $("#TablaPartes_div").css("height", "300");
    $("#fecha_practica").attr("disabled", "disabled");
    $("#fecha_rendicion").attr("disabled", "disabled");
    $("#Ambulatorio").attr("disabled", "disabled");
    $("#Internacion").attr("disabled", "disabled");
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

function CargarRendicion(Rendicion) {
    var json = JSON.stringify({ "NroRendicion": Rendicion });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_Partes_FacturadosMedicos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarRendicion_Cargado,
        error: errores
    });
}

function CargarRendicion_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista != null) {
        var Contenido = "";
        var i = 0;
        $("#trx").empty();
        var size = Lista.length;
        $.each(Lista, function (index, Detalle) {
            Contenido = Contenido + "<tr><th></th><td> " + Detalle.FechaPractica + " </td><td> " + Detalle.FechaRendicion + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.Tipo + " </td><td> " + Detalle.PracticaId + " </td><td> " + Detalle.Practica + " </td></tr>";
            Total = Total + 1;
            i = i + 1;
            if (i == size) {
                $("#tabla").show();
                $("#cargando").hide();

            }
        });
        $("#trx").html(Contenido);
    }
    else {
        $("#tabla").show();
        $("#cargando").hide();
        $("#trx").html("<tr>Sin Datos</tr>");
    }
    var Pie = "</tbody></table>";
}

function List_Centro() {
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/Centro.asmx/CentroUnico",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Centro_Cargado,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_Centro_Cargado(Resultado) {
    var Centro = Resultado.d;
    $("#cbo_Centro").append($("<option></option>").val(Centro.Id).html(Centro.RazonSocial));
}


function toggle_check(chk) {
    if ($(chk).is(":checked")) {
        $(chk).attr("checked", "checked");
        $(chk).addClass("active");
    }
    else {
        $(chk).removeAttr("checked");
        $(chk).removeClass("active");
    }
}

function toggle_checks(chk) {
    if ($(chk).is(":checked")) {
        $(".checkstable").attr("checked", "checked");
        $(".checkstable").attr("disabled", "disabled");
        $(".checkstable").addClass("active");
    }
    else {
        $(".checkstable").removeAttr("checked");
        $(".checkstable").removeAttr("disabled");
        $(".checkstable").removeClass("active");
    }
}

$("#btnPreFacturar").click(function () {
    Medicos = "";
    $("#tabla").hide();
    $("#cargando").show();
    if ($("#cbo_Todos_Medicos").is(":checked")) {
        Medicos = "0";
    }
    else {
        $(".checkstable").each(function () {
            if ($(this).hasClass("active")) {
                var Med = $(this).attr("rel");
                Medicos = Medicos + "," + Med;
            }
        });
    }
    setTimeout("Buscar()", 2000);
});

function Buscar() {
    var Ambulatorio = false;
    if ($("#Ambulatorio").is(":checked")) Ambulatorio = true;
    var Internacion = false;
    if ($("#Internacion").is(":checked")) Internacion = true;
    var fecha_practica = false;
    if ($("#fecha_practica").is(":checked")) fecha_practica = true;
    var mes;
    if ($("#txtMes").val().length > 1) mes = $("#txtMes").val();
    else mes = "0" + $("#txtMes").val();
    var Fecha = "01/" + mes + "/" + $("#txtAnio").val();
    var json = JSON.stringify({ "Ambulatorio": Ambulatorio, "PorPractica": fecha_practica, "Fecha": Fecha, "Internacion": Internacion, "Medicos": Medicos});
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ListPreFacturacionMedicos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListPreFacturacion_Cargado,
        error: errores
    });
}

function ListPreFacturacion_Cargado(Resultado) {
    var Lista = Resultado.d;
    //var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Fec.Practica</th><th>Fec.Rendicion</th><th>Cantidad</th><th>Tipo</th><th>Codigo</th><th>Practica</th></tr></thead><tbody>";
    if (Lista != null) {
        var Contenido = "";
        var i = 0;
        $("#trx").empty();
        var size = Lista.length;
        $.each(Lista, function (index, Detalle) {
            Contenido = Contenido + "<tr><th></th><td class='tdNroParte' style='display:none;'>" + Detalle.NroParte + "," + Detalle.PracticaId + "</td><td> " + Detalle.FechaPractica + " </td><td> " + Detalle.FechaRendicion + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.Tipo + " </td><td> " + Detalle.PracticaId + " </td><td> " + Detalle.Practica + " </td></tr>";
            Total = Total + 1;
            i = i + 1;
            if (i == size) {
                $("#tabla").show();
                $("#cargando").hide();

            }
        });
        $("#trx").html(Contenido);
    }
    else {
        $("#tabla").show();
        $("#cargando").hide();
        $("#trx").html("<tr>Sin Datos</tr>");
    }
    var Pie = "</tbody></table>";
}

$('#myModal').on('hidden', function () {
    var j = 0;
    var k = 0;
    var size = $(".tdNroParte").size();
    $("#tabla").hide();
    $("#cargando").show();
    $(".tdNroParte").each(function () {
        Parte = {};
        var parts = $(this).html().split(',');
        Parte.NroParte = parts[0];
        Parte.PracticaId = parts[1];
        List[j] = Parte;
        j = j + 1;
        if (j == size) {
            FacturarPartes();
        }

    });
    if (j == 0) {
        alert("Error al Procesar Partes");
        $("#tabla").show();
        $("#cargando").hide();
    }
});


$("#btnFacturar").click(function () {
    $("#myModal").modal({ keyboard: false });
});

function FacturarPartes() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/UltimaRendicionMedicos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: UltimaRendicion_Cargado,
        error: errores
    });
}

function UltimaRendicion_Cargado(Resultado) {
    var NroRendicion = Resultado.d;
    if (NroRendicion > 0) {
        //NroRendicion = NroRendicion + 1;
        n = NroRendicion;
        var json = JSON.stringify({ "list": List, "NroRendicion": NroRendicion, "FechaFacturacion": $("#txtFechaFact").val(), "Observacion": $("#Observaciones").val() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Facturacion/Facturacion.asmx/FacturarPartesMedicos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: PartesFacturar_Cargado,
            error: errores
        });
    }
}

function PartesFacturar_Cargado() {
    $("#tabla").show();
    $("#cargando").hide();
    alert("Partes Facturados Correctamente");
    Buscar();
    //var url = "../Impresiones/ImpresionRendicion_Fact.aspx?Rendicion=" + NroRendicion;
    //Ventana(url);
}

$("#btnPrint").click(function () {
    if (Rendicion != null) {
        n = Rendicion;
        var url = "../Impresiones/ImpresionRendicion_Fact_Medicos.aspx?Rendicion=" + Rendicion; //Es una Facturacion existente...
        Ventana(url);
    }
    else {
        var Ambulatorio = false;
        if ($("#Ambulatorio").is(":checked")) Ambulatorio = true;
        var Internacion = false;
        if ($("#Internacion").is(":checked")) Internacion = true;
        var fecha_practica = false;
        if ($("#fecha_practica").is(":checked")) fecha_practica = true;
        var mes;
        if ($("#txtMes").val().length > 1) mes = $("#txtMes").val();
        else mes = "0" + $("#txtMes").val();
        var Fecha = "01/" + mes + "/" + $("#txtAnio").val();
        if (Seccionales.length > 0) Instituciones = Instituciones + ",112103";
        var url = "../Impresiones/ImpresionRendicion.aspx?Ambu=" + Ambulatorio + "&Inter=" + Internacion + "&Practica=" + fecha_practica + "&Periodo=" + Fecha + "&SeccionalIds=" + Seccionales + "&InstitucionIds=" + Instituciones + "&PreFacturacion=true"; //Siempre es Prefacturacion, rendicion provi
        Ventana(url);
    }
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

$("#btnBuscarRendicion").click(function () {
    window.location = "BuscarRendicion_Medicos.aspx";
});

function ListMedicos(Especialidad) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        error: errores
    });

}

function Medicos_por_Especialidad_Cargados(Resultado) {
    var Lista = Resultado.d;
    var i = 0;
    var Contenido = "";
    var Contenido2 = "";
    var t = Lista.length;
    $.each(Lista, function (index, Medico) {
        if (i <= (t / 2)) {
            Contenido = Contenido + "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstable' onclick='toggle_check(this)' id='chk" + i + "' rel='" + Medico.Id + "'>" + Medico.Medico + "</label>";
        }
        else
            Contenido2 = Contenido2 + "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstable' onclick='toggle_check(this)' id='chk" + i + "' rel='" + Medico.Id + "'>" + Medico.Medico + "</label>";
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#FiltroMedicos").html(Contenido);
    $("#FiltroMedicos1").html(Contenido2);
}

