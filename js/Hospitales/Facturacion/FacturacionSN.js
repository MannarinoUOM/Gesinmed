var NroFact = "";
var objPartes = "";

function InitControls() {
    List_Puestos();
    $("#txtFechadia").datepicker();
    $("#txtFechadia").mask("99/99/9999", { placeholder: "-" });
    $("#txtAnio").mask("9999", { placeholder: "-" });
    $("#txtNroFactura").mask("999?9-9999999?9", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    $("#txtAnio").val(yyyy);
    $("#txtMes").val(mm);
    $("#txtFechadia").val(d);
    $("#btnPrint").hide();
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


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_ObraSociales() {
    var json = JSON.stringify({ "Todas": false });
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
    $("#cbo_OS").append($("<option></option>").val("0").html("Seleccione Obra Social..."));
    $.each(Lista, function (index, Institucion) {
        $("#cbo_OS").append($("<option></option>").val(Institucion.id).html(Institucion.OS));
    });
}

function RecargarPagina(url) {
    document.location = "../Facturacion/FacturacionSN.aspx" + url;
}

$("#btnBuscarPaciente").fancybox({
    'hideOnContentClick': true,
    'width': '75%',
    'height': '75%',
    'autoScale': false,
    'transitionIn': 'none',
    'transitionOut': 'none',
    'type': 'iframe'
});

$(document).ready(function () {
    List_ObraSociales();
    InitControls();
    var Query = {};
    Query = GetQueryString();
    if (Query['Rendicion'] != null) {
        CargarRendicion(Query['Rendicion']);
        $("#btnPrint").show();
        InitControls();
    }
    if (Query["NHC"] != "" && Query["NHC"] != null) {
        $("#txtNHC").val(Query["NHC"]);
        Cargar_Paciente_NHC(Query["NHC"]);
        $("#controltxtHastaParte").show();
        $("#controlcbo_OS").hide();
        $("#cboFactura").val('1');
    }
    else {
        $("#txtNHC").val("0");
        $("#controltxtHastaParte").hide();
        $("#controlcbo_OS").show();
        $("#cboFactura").val('0');
    }

});

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}


function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    $.each(Paciente, function (index, paciente) {
        $("#txtPaciente").prop("readonly", true);
        $("#txtPaciente").attr('value', paciente.Paciente);
    });

}


$("#cboFactura").change(function () {
    if ($("#cboFactura :selected").val() == "1") {
        $("#controltxtHastaParte").show();
        $("#controlcbo_OS").hide();
    }
    else {
        $("#controltxtHastaParte").hide();
        $("#controlcbo_OS").show();
    }
});

function List_Partes_Facturacion() {
    var fecha = '01/' + $("#txtMes :selected").val() + '/' + $("#txtAnio").val();
    var json = JSON.stringify({ "InstitucionId": $("#cbo_OS :selected").val(), "Periodo": fecha, "NHC": $("#txtNHC").val(),
        "Tipo": $("#cbo_Tipo :selected").val()
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/List_Rendicion_Facturacion_SN",
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
            Contenido = Contenido + "<tr><td><input type='checkbox' class='checks' onclick='RecorrerChecks()' id='chk" + index + "' value='" + index + "'/></td><td id='NroParte" + index + "'>" + Detalle.NroParte + " </td><td> " + Detalle.Afiliado + " </td><td> " + Detalle.ObraSocial + " </td><td style='display:none;' id='Gasto" + index + "'>" + Detalle.Gasto + " </td><td> $" + formatoMoneda(Detalle.Gasto) + " </td></tr>";
        });
        var Pie = "</tbody></table>";
        $("#trx").html(Contenido);
    }
}

function RecorrerChecks() {
    objPartes = "";
    $(".checks").each(function () {
        if ($(this).attr("checked")) {
            var val = $(this).val();
            objPartes = objPartes + $("#NroParte" + val).html() + ",";
        }
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
    if (ValidarBusqueda()) List_Partes_Facturacion();
});

$('#myModal').on('hidden', function () {
    
});

function LoadTotales() {
    var json = JSON.stringify({ "lista":objPartes });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/ListTotales_by_NroPartes",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#txtGastoTotal").val(Resultado.d.Gasto);
            $("#txtHonorarioTotal").val(Resultado.d.Honorario);
            $("#txtMedicamentosTotal").val(Resultado.d.Medicamentos);
        },
        error: errores
    });
}

function LimpiarModal() {
    $("#txtGastoTotal").val('0');
    $("#txtHonorarioTotal").val('0');
    $("#txtMedicamentosTotal").val('0');
}

function DesactivarTotales() {
    if ($("#cbo_Tipo :selected").val() != "2") $(".totales").attr("disabled", true);
    else $(".totales").removeAttr("disabled");
}

$('#myModal').on('show', function () {
    LoadTotales();
    DesactivarTotales();
});

function Validar() {
    if ($("#cboFactura :selected").val() == "0" && $("#cbo_OS :selected").val() == "0") { alert("Seleccione alguna Obra Social"); return false; }
    if ($("#cboFactura :selected").val() == "1" && $("#txtNHC").val() == "0") { alert("Seleccione algun Paciente"); return false; }
    if (objPartes.length == 0) { alert("Seleccione alguna rendición"); return false; }
    return true;
}

function ValidarBusqueda() {
    if ($("#cboFactura :selected").val() == "0" && $("#cbo_OS :selected").val() == "0") { alert("Seleccione alguna Obra Social"); return false; }
    if ($("#cboFactura :selected").val() == "1" && $("#txtNHC").val() == "0") { alert("Seleccione algun Paciente"); return false; }
    return true;
}

$("#btnFacturar").click(function () {
    if (Validar()) {
        $("#myModal").modal({ keyboard: false, backdrop: 'static' });
        RecorrerChecks();
        ObtenerFacturaNro();
        CargarDatosMutual();
    }
});

function CargarDatosMutual() {
    var json = JSON.stringify({ "OS": $("#cbo_OS :selected").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/AltasNomencladores.asmx/Convenio_by_OS",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#txtNombreOs").val(Resultado.d.razonsocial);
            $("#txtCUITOS").val(Resultado.d.direccion_fact);
            $("#txtDireccion").val(Resultado.d.cuit_fact);
        },
        error: errores
    });
}

$("#btnCancelarFact").click(function () {
    $("#myModal").modal('hide');
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
            'enableEscapeButton': false,
            'onClosed': function () {
                $("#myModal").modal('hide');
                document.location = "FacturacionSN.aspx";
            }
        });
}

function List_Puestos() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ListPuestos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Puestos_Cargado,
        error: errores
    });
}

function List_Puestos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Puestos").append($("<option></option>").val("0").html("Seleccione Puesto de Facturacion..."));
    $.each(Lista, function (index, Puesto) {
        $("#cbo_Puestos").append($("<option></option>").val(Puesto.NroPuesto).html(Puesto.RazonSocial));
    });
}

function ObtenerFacturaNro() {
    var json = JSON.stringify({ "NroPuesto": $("#cbo_Puestos :selected").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/GET_NROFACTURA_PUESTO",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#txtNroFactura").val(Resultado.d);
        },
        error: errores
    });
}

$("#btnConfirmaFact").click(function () {
    if (confirm("¿Desea confirmar la factura?")) {
        var obj = GuardarDatos_Cab();
        var json = JSON.stringify({ "Cab": obj });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Facturacion/Facturacion.asmx/FACT_FACTURA_INSERT_CAB",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                NroFact = Resultado.d;
            },
            complete: function () {
                if (NroFact != "ERROR")
                    RendicionesFacturadas();
                else alert("Ha ocurrido un error. Intente nuevamente.");
            },
            error: errores
        });
    }
});


function GuardarDatos_Cab() {
    var f = {};
    var arr = $("#txtNroFactura").val().split("-");
    f.NroFactura = arr[1];
    f.NroPuesto = arr[0];
    f.CUIT = 1;
    f.NHC = $("#txtNHC").val();
    f.Gasto = $("#txtGastoTotal").val();
    f.Honorario = $("#txtHonorarioTotal").val();
    f.Medicamento = $("#txtMedicamentosTotal").val();
    f.ObraSocial = $("#cbo_OS :selected").val();
    f.Observaciones = $("#txtObservacion").val().trim().toUpperCase();
    f.Fecha = $("#txtFechadia").val();
    f.Factura_A = $("#cboFactura :selected").val();
    f.Factura_Tipo = $("#cbo_Tipo :selected").val();
    f.MesFacturado = $("#txtMes :selected").val();
    f.AnioFacturado = $("#txtAnio").val();
    return f;
}

function RendicionesFacturadas() {
    var json = JSON.stringify({ "Partes": objPartes, "NroFactura": NroFact });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/FACT_FACTURA_INSERT_DET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function () {
            var arr = NroFact.split('-');
            var url = "../Impresiones/Impresion_Rendicion_Fact_SN.aspx?Puesto=" + arr[0] + "&Factura=" + arr[1];
            Ventana(url);
        },
        error: errores
    });
}

$("#btnBuscarFacturas").click(function () {
    document.location = "../Facturacion/ListarFacturasSN.aspx";
});