var Total = -1;
var Seccionales;
var Instituciones;
var List = new Array();
var Rendicion = 0;
var n = 0;
var Ambu;

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$(document).ready(function () {
    List_Centro();
    List_Seccionales();
    $("#txtFechaFact").val(FechaActual());
    var parts = $("#txtFechaFact").val().split('/');
    $("#txtAnio").val(parts[2]);
    $("#txtMes").val(parts[1]);
    $("#txtFechaFact").datepicker();
    $("#txtFechaFact").mask("99/99/9999", { placeholder: "-" });
    var Query = {};
    Query = GetQueryString();
    if (Query['Rendicion'] != null) {
        CargarRendicion(Query['Rendicion']);
        Rendicion = Query['Rendicion'];
        Ambu = Query['Ambu'];
        if (Ambu == "true") $("#Ambulatorio").attr("checked", true);
        else $("#Internacion").attr("checked", true);
        InitControls();
    }

});

$("#txtFechaFact").change(function () {
    var parts = $("#txtFechaFact").val().split('/');
    $("#txtAnio").val(parts[2]);
    $("#txtMes").val(parts[1]);
});


function InitControls(){
    $("#txtFechaFact").attr("disabled","disabled");
    $("#Seccionales").hide();
    $("#Instituciones").hide();
    $("#txtAnio").attr("disabled","disabled");
    $("#txtMes").attr("disabled","disabled");
    $("#btnPreFacturar").hide();
    $("#btnFacturar").hide();
    $("#TablaPartes_div").css("height","420px");
    $("#fecha_practica").attr("disabled","disabled");
    $("#fecha_rendicion").attr("disabled","disabled");
    $("#Ambulatorio").attr("disabled","disabled");
    $("#Internacion").attr("disabled", "disabled");
    $("#div_FechaFact").hide();
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

function CargarRendicion(Rendicion){
    var json = JSON.stringify({ "NroRendicion": Rendicion});
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_Partes_Facturados",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarRendicion_Cargado,
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

function CargarRendicion_Cargado(Resultado){
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

function List_Seccionales() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Seccionales_Cargado,
        error: errores
    });
}

function List_Seccionales_Cargado(Resultado) {
    var Lista = Resultado.d;
    var i = 0;
    var Contenido = "";
    var Contenido2 = "";
    $.each(Lista, function (index, Seccional) {
        if (!(i % 2))
            Contenido = Contenido + "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstable' onclick='toggle_check(this)' id='chk" + i + "' rel='" + Seccional.Nro + "'>" + Seccional.Seccional + "</label>";
        else
            Contenido2 = Contenido2 + "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstable' onclick='toggle_check(this)' id='chk" + i + "' rel='" + Seccional.Nro + "'>" + Seccional.Seccional + "</label>";
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#FiltroSeccionales").html(Contenido);
    $("#FiltroSeccionales2").html(Contenido2);

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

function toggle_checks_Ins(chk) {
    if ($(chk).is(":checked")) {
        $(".checkstableIns").attr("checked", "checked");
        $(".checkstableIns").attr("disabled", "disabled");
        $(".checkstableIns").addClass("active");
    }
    else {
        $(".checkstableIns").removeAttr("checked");
        $(".checkstableIns").removeAttr("disabled");
        $(".checkstableIns").removeClass("active");
    }
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
    var i = 0;
    var Contenido = "";
    $.each(Lista, function (index, Institucion) {
        Contenido = Contenido + "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstableIns' onclick='toggle_check(this)' id='chk" + Institucion.id + "' rel='" + Institucion.id + "'>" + Institucion.OS + "</label>";
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#FiltroInstituciones").html(Contenido);
}

$("#btnPreFacturar").click(function () {
    if ($("#txtFechaFact").val().trim().length == 0) { alert("Ingrese Fecha."); return false; }
    Seccionales = "";
    Instituciones = "";
    $(".checkstable").each(function () {
        if ($(this).hasClass("active")) {
            var CodSec = $(this).attr("rel");
            Seccionales = Seccionales + "," + CodSec;
        }
    });
    $(".checkstableIns").each(function () {
        if ($(this).hasClass("active")) {
            var CodOs = $(this).attr("rel");
            Instituciones = Instituciones + "," + CodOs;
        }
    });
    setTimeout("Buscar()", 1500);
});

function Buscar() {
    var Ambulatorio = $("#Ambulatorio").is(":checked");
    var Internacion = $("#Internacion").is(":checked");
    var fecha_practica = $("#fecha_practica").is(":checked");
    var mes;
    if ($("#txtMes").val().length > 1) mes = $("#txtMes").val();
    else mes = "0" + $("#txtMes").val();
    var Fecha = "01/" + mes + "/" + $("#txtAnio").val();
    var json = JSON.stringify({ "Ambulatorio": Ambulatorio, "PorPractica": fecha_practica, "Fecha": Fecha, "Internacion": Internacion, "Seccionales": Seccionales,"Instituciones": Instituciones });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ListPreFacturacion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListPreFacturacion_Cargado,
        beforeSend: function () {
            Total = 0;
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

function ListPreFacturacion_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista != null) {
        var Contenido = "";
        $("#trx").empty();
        $.each(Lista, function (index, Detalle) {
            Contenido = Contenido + "<tr><th></th><td class='tdNroParte' style='display:none;'>" + Detalle.NroParte + "," + Detalle.PracticaId + "</td><td> " + Detalle.FechaPractica + " </td><td> " + Detalle.FechaRendicion + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.Tipo + " </td><td> " + Detalle.PracticaId + " </td><td> " + Detalle.Practica + " </td></tr>";
            Total = Total + 1;
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

function RecorrerPartes() {
        var j = 0;
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
            if (j == size) FacturarPartes();
        });
        if (j == 0) {
            alert("Error al Procesar Partes");
            $("#tabla").show();
            $("#cargando").hide();
        } 
}

var apretado = 0;

$("#btnConfirmar").click(function () {
    if (apretado == 1) return false;
    if (confirm("¿Desea confirmar la facturación?")) {
        apretado = 1;
        RecorrerPartes(); 
    }
});


$("#btnFacturar").click(function () {
    $("#myModal").modal({ keyboard: false, backdrop: 'static' });
});

function FacturarPartes() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/UltimaRendicion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: UltimaRendicion_Cargado,
        error: errores
    });
}

function UltimaRendicion_Cargado(Resultado) {
    var NroRendicion = Resultado.d;
    if (NroRendicion > 0) {
        n = NroRendicion;
        var json = JSON.stringify({ "list": List, "NroRendicion": NroRendicion, "FechaFacturacion": $("#txtFechaFact").val(), "Observacion": $("#Observaciones").val().trim().toUpperCase(), "Mes": $("#txtMes :selected").val() , "Anio": $("#txtAnio").val() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Facturacion/Facturacion.asmx/FacturarPartes",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                $("#tabla").show();
                $("#cargando").hide();
                alert("Partes Facturados Correctamente");
                Buscar();
                var Tipo = "Ambulatorio";
                if ($("#Internacion").is(":checked")) Tipo = "Internacion";
                var url = "../Impresiones/ImpresionRendicion_Fact.aspx?Tipo=" + Tipo + "&Rendicion=" + NroRendicion + "&Excel=1";
                Ventana(url,1);
            },
            error: errores
        });
    }
}

function ImprimirPreFacturacion() {
    var Ambulatorio = $("#Ambulatorio").is(":checked");
    var Internacion = $("#Internacion").is(":checked");
    var fecha_practica = $("#fecha_practica").is(":checked");
    var mes;
    if ($("#txtMes").val().length > 1) mes = $("#txtMes").val();
    else mes = "0" + $("#txtMes").val();
    var Fecha = "01/" + mes + "/" + $("#txtAnio").val();
    var url = "../Impresiones/ImpresionRendicion.aspx?Ambu=" + Ambulatorio + "&Inter=" + Internacion + "&Practica=" + fecha_practica + "&Periodo=" + Fecha + "&SeccionalIds=" + Seccionales + "&PreFacturacion=true" + "&Excel=1";  //Siempre es Prefacturacion
    Ventana(url,0);
}

function ImprimirFacturacion() {
    n = Rendicion;
    var Tipo = "Internacion";
    if ($("#Ambulatorio").is(":checked")) Tipo = "Ambulatorio";
    var url = "../Impresiones/ImpresionRendicion_Fact.aspx?Rendicion=" + Rendicion + "&Tipo=" + Tipo + "&Excel=1"; 
    Ventana(url,1);
}

$("#btnPrint").click(function () {
    if (Rendicion != 0) ImprimirFacturacion(); //Es una Facturacion existente
    else ImprimirPreFacturacion();
});

function Ventana(url,Tipo) {
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
            'enableEscapeButton': false,
            'onClosed': function () {
                if (Tipo == 1) document.location = "Facturacion.aspx";
            }
        });
}

$("#btnBuscarRendicion").click(function () {
    window.location = "BuscarRendicion.aspx";
});