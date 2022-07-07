
$(document).ready(function () {
    $("#txtDesdeParte").mask("99/99/9999", { placeholder: "-" });
    $("#txtHastaParte").mask("99/99/9999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = fecha_ultimo_dia_mes(mm, yyyy);
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtDesdeParte").val(p);
    $("#txtHastaParte").val(d);
    $("#txtDesdeParte").datepicker();
    $("#txtHastaParte").datepicker();
    List_Puestos();
});

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

function List_Partes() {
    var json = JSON.stringify({ "Desde": $("#txtDesdeParte").val(), "Hasta": $("#txtHastaParte").val(), "NroPuesto": $("#cbo_Puestos :selected").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/VerFacturas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: VerFacturas_Cargado,
        beforeSend: function () {
            $("#tabla").hide();
            $("#cargando").show();
            $("#trx").html('');
        },
        complete: function () {
            $("#tabla").show();
            $("#cargando").hide();
        },
        error: errores
    });
}

function VerFacturas_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista.length > 0) {
        var Contenido = "";
        $("#trx").empty();
        $.each(Lista, function (index, Detalle) {
            var _nro = Detalle.NroPuesto.toString() + "-" + Detalle.NroFactura.toString();
            Contenido = Contenido + "<tr onclick=Modal('" + _nro + "')><td> " + Detalle.NroPuesto + " </td><td> " + Detalle.NroFactura + " </td><td> " + Detalle.Fecha + " </td><td> " + Detalle.Descripcion + " </td></tr>";
        });
        var Pie = "</tbody></table>";
        $("#trx").html(Contenido);
    }
}

$("#btnBuscar").click(function () {
    List_Partes();
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function Modal(_nro) {
    $("#myModal").modal({ keyboard: false, backdrop: 'static' });
    $("#txtNroFactura").val(_nro);
}

$("#btnPrint").click(function () {
    Imprimir();
});


function Imprimir() {
    var arr = $("#txtNroFactura").val().split('-');
    var url = "../Impresiones/Impresion_Rendicion_Fact_SN.aspx?Puesto=" + arr[0] + "&Factura=" + arr[1];
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