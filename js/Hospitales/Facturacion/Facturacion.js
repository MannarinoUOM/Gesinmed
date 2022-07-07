var Total = -1;
var Seccionales;
var Instituciones;
var List = new Array();
var Rendicion = null;
var n = 0;
var Ambu;

$(document).ready(function () {
    List_Centro();
    List_Seccionales();
    List_ObraSociales(true);
    $("#txtFechaFact").val(FechaActual());
    var parts = $("#txtFechaFact").val().split('/');
    $("#txtAnio").val(parts[2]);
    $("#txtMes").val(parts[1]);
    $("#txtFechaFact").datepicker();
    $("#btnPrint").hide();
    var Query = {};
    Query = GetQueryString();
    if (Query['Rendicion'] != null) {
        CargarRendicion(Query['Rendicion']);
        Rendicion = Query['Rendicion'];
        Ambu = Query['Ambu'];
        $("#btnPrint").show();
        InitControls();
    }

});

function InitControls(){
      $("#txtFechaFact").attr("disabled","disabled");
    $("#Seccionales").hide();
     $("#Instituciones").hide();
        $("#txtAnio").attr("disabled","disabled");
    $("#txtMes").attr("disabled","disabled");
    $("#btnPreFacturar").hide();
     $("#btnFacturar").hide();
     $("#TablaPartes_div").css("height","300");
     $("#fecha_practica").attr("disabled","disabled");
     $("#fecha_rendicion").attr("disabled","disabled");
     $("#Ambulatorio").attr("disabled", "disabled");
     $("#Internacion").attr("disabled", "disabled");
     if (Ambu) {
         $("#Ambulatorio").attr("checked", true);
         $("#Internacion").removeAttr("checked");
     }
     else {
         $("#Internacion").attr("checked", true);
         $("#Ambulatorio").removeAttr("checked");
     }
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
    //var Contenido = "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstableIns' onclick='toggle_check(this)' id='chkNS' rel ='' >---NINGUNA---</label>";
    $.each(Lista, function (index, Seccional) {
        Contenido = Contenido + "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstable' onclick='toggle_check(this)' id='chk" + i + "' rel='" + Seccional.Nro + "'>" + Seccional.Seccional + "</label>";
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#FiltroSeccionales").html(Contenido);

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
    var count = Lista.length;
    //var Contenido = "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstableIns' onclick='toggle_check(this)' id='chkNI' rel ='' >---NINGUNA---</label>";
    $.each(Lista, function (index, Institucion) {
        Contenido = Contenido + "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstableIns' onclick='toggle_check(this)' id='chk" + Institucion.id + "' rel='" + Institucion.id + "'>" + Institucion.OS + "</label>";
        i = i + 1;
        if (i == count / 2) {
            $("#FiltroInstituciones").html(Contenido);
            Contenido = "";
        }
        if (i == count - 1) {
            $("#FiltroInstituciones2").html(Contenido);
            Contenido = "";
        }
        $("#cbo_Instituciones").append($("<option></option>").val(Institucion.id).html(Institucion.OS));
    });
    var Pie = "</tbody></table>";
    //$("#FiltroInstituciones").html(Contenido);
}

$("#btnPreFacturar").click(function () {
    Seccionales = "";
    Instituciones = "";
    $("#tabla").hide();
    $("#cargando").show();
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
    if (Instituciones.length > 0)
        Seccionales = ",998";
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
    var json = JSON.stringify({ "Ambulatorio": Ambulatorio, "PorPractica": fecha_practica, "Fecha": Fecha, "Internacion": Internacion, "Seccionales": Seccionales,"Instituciones": Instituciones });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_PreFacturacionSN",
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
        $("#btnPrint").hide();
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
        //NroRendicion = NroRendicion + 1;
        n = NroRendicion;
        //var json;
        var json = JSON.stringify({ "list": List, "NroRendicion": NroRendicion, "FechaFacturacion": $("#txtFechaFact").val(), "Observacion": $("#Observaciones").val().trim().toUpperCase(),
            "Mes": $("#txtAnio").val(), "Anio": $("#txtMes :selected").val() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Facturacion/Facturacion.asmx/FacturarPartes",
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
    //var url = "../Impresiones/ImpresionRendicion_Fact.aspx?Rendicion=" + Rendicion;
    var url = "../Impresiones/Impresion_Rendicion_Fact_SN.aspx?Id=" + NroRendicion + "&Ambu=false";
    Ventana(url);
}

function ImprimirFact() {
    var Ambu = false;
    if ($("#Ambulatorio").is(":checked")) Ambu = true;
    var url = "../Impresiones/Impresion_Rendicion_Fact_SN.aspx?Id=" + n + "&Ambu=" + Ambu;
    Vent1(url);
}

$("#btnPrint").click(function () {
    if (Rendicion != null) {
        n = Rendicion;
        var url = "../Impresiones/Impresion_Rendicion_Fact_SN.aspx?Id=" + Rendicion + "&Ambu=" + Ambu;
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
        //var url = "../Impresiones/Impresion_Rendicion_Fact_SN.aspx?Id=" + Rendicion + "&Ambu=" + false;
        //var url = "../Impresiones/ImpresionRendicion.aspx?Ambu=" + Ambulatorio + "&Inter=" + Internacion + "&Practica=" + fecha_practica + "&Periodo=" + Fecha + "&SeccionalIds=" + Seccionales + "&InstitucionIds=" + Instituciones + "&PreFacturacion=true"; //Siempre es Prefacturacion, rendicion provi
        //Ventana(url);
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

    function Vent1(url) {
        $.fancybox({
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
    window.location = "BuscarRendicion.aspx";
});

$("#btnGenerarNueva").click(function () {
    $("#ModalNueva").modal({ keyboard: false });
});

$('#ModalNueva').on('hidden', function () {
if ($("#txtValor").val() != "")
    InsertFactura();
});

function InsertFactura() {
    var f = {};
    f.OS = $("#cbo_Instituciones :selected").val();
    f.Importe = $("#txtValor").val();
    f.Observacion = $("#txtComentario").val();
    f.Baja = false;
    var json = JSON.stringify({ "f": f });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/EmiteFacturaInsertSN",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: EmiteFacturaInsertSN_Cargado,
        error: errores
    });
}

function EmiteFacturaInsertSN_Cargado(Resultado) {
    var FacturaId = Resultado.d;
    if (FacturaId > 0) PrintEmiteFactura(FacturaId);
}

function PrintEmiteFactura(FacturaId) {
    var url = "../Impresiones/Impresion_Generar_FacturaSN.aspx?Id=" + FacturaId;
    Ventana(url);
}

function List_ComboObraSociales(Todas) {
    var json = JSON.stringify({ "Todas": false });
    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/ListObraSociales",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_ComboObraSociales_Cargado,
        error: errores
    });
}

function List_ComboObraSociales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Obra) {
        $("#cbo_Institucion").append($("<option></option>").val(Obra.id).html(Obra.OS));
    });
}
