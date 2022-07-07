    var ListaResultados = "";
var cantidad = 0;
$(document).ready(function () {
    List_Proveedores("Todos");
    primerUltimoDia("txtFechaDesde",1);
    primerUltimoDia("txtFechaHasta", 2);
});

//////////carga combo proveedores
function List_Proveedores(Todos) {
    $.ajax({
        type: "POST",
        data: '{Todos: "' + Todos + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $("#cboProveedor").append($("<option>Seleccione</option>").val("0").html("Todos"));
            $.each(Lista, function (index, Proveedor) {
                $("#cboProveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
            });
        },
        error: errores,
        complete: function () { $("#btnBuscar").click(); }
    });
}
//////////carga combo proveedores

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnBuscar").click(function () {
    var total = 0.0;
    cantidad = 0;
    var json = JSON.stringify({ "desde": $("#txtFechaDesde").val(), "hasta": $("#txtFechaHasta").val(), "proveedor": $("#cboProveedor").val(), "insumo": $("#txtInsumo").val() });
    var encabezado = "<table class='table' style='overflow:scroll'><tr style='background-color:#CCCCCC'>" +
    "<td><b>Fecha Pedido</b></td>" +
    "<td><b>Insumo/Descripción</b></td>" +
    "<td><b>Proveedor</b></td>" +
    "<td><b>Cantidad <br /> Recibida</b></td>" +
    "<td><b>Precio Unitario</b></td>" +
    "<td><b>Precio Total</b></td>" +
    "<td><b>Fecha <br /> Remito/Factura</b></td></tr>";
    var fila = "";
    var pie = "</table>";
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/REPORTE_DE_GASTOS_COMPRAS_INTERNACION",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            ListaResultados = Resultado.d;
            $("#lbl_CantidadReg").text(ListaResultados.length.toString());
            $.each(ListaResultados, function (index, item) {
                fila += "<tr><td>" + item.FechaPedido + "</td><td>" + item.InsumoDescripción + "</td><td>" + item.Proveedor + "</td><td>" + item.CantidadRecibida + "</td><td>$ " + item.PrecioUnitario + "</td><td>$ " + item.PrecioTotal + "</td><td>" + item.FechaRemitoFactura + "</td></tr>";
                cantidad += 1;
                total += parseFloat(item.PrecioTotal);
            });

            $("#TablaPedidos").html(encabezado + fila + pie);

        },
        error: errores,
        complete: function () { $("#Total").html("Importe Total: $ " + total.toFixed(2)); }
    });

});

$("#btnPdf").click(function () {
    //alert($("#cboProveedor option:selected").text()); return false;
    // if (ListaResultados.length != "")
    $.fancybox({
        'href': "../Impresiones/Compras/REPORTE_DE_GASTOS_COMPRAS_INTERNACION.aspx?desde=" + $("#txtFechaDesde").val() + "&hasta=" + $("#txtFechaHasta").val() + "&proveedor=" + $("#cboProveedor").val() + "&PDF=1" + "&proveedorName=" + $("#cboProveedor option:selected").text() + "&insumo=" + $("#txtInsumo").val(),
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

$("#btnExcel").click(function () {
    //if (ListaResultados.length > 0)
    $.fancybox({
        'href': "../Impresiones/Compras/REPORTE_DE_GASTOS_COMPRAS_INTERNACION.aspx?desde=" + $("#txtFechaDesde").val() + "&hasta=" + $("#txtFechaHasta").val() + "&proveedor=" + $("#cboProveedor").val() + "&PDF=0" + "&proveedorName=" + $("#cboProveedor option:selected").text() + "&insumo=" + $("#txtInsumo").val(),
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