var oTabla;

$(document).ready(function () {
    LoadDataTable();
    InitControls();
});

function List_Proveedores() {
    $.ajax({
        type: "POST",
        data: '{Todos: "' + false + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $("#cbo_Proveedor").append($("<option></option>").val("0").html("TODOS"));
            $.each(Lista, function (i, Proveedor) {
                $("#cbo_Proveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
            });
        },
        complete: function () {
          
            $("#btnBuscar").click();
        },
        error: errores
    });
}

function Buscar_Pedidos(FechaRemito_Desde, FechaRemito_Hasta, Insumo, ProveedorId) {
    if (FechaRemito_Desde.length == 0) FechaDesde = '01/01/1900';
    if (FechaRemito_Hasta.length == 0) FechaHasta = '01/01/1900';
    if (Insumo.length == 0) Insumo = "";

    var json = JSON.stringify({ "Desde": FechaRemito_Desde, "Hasta": FechaRemito_Hasta, "Insumo": Insumo, "ProveedorId": ProveedorId, "OrdenCompra": $("#txtOrdenCompra").val() });

    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_REPORTE_FINAL",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            var Pedidos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $.each(Pedidos, function (index, exp) {                                                                                                                                                                                                                             //exp.FechaFactura                                   
                Tabla_Datos += "<tr><td>" + exp.FechaPedido + "</td><td>" + exp.Insumo + "</td><td>" + exp.CantidadPedida + "</td><td>" + exp.Proveedor + "</td><td>" + exp.CantidadRecibida + "</td><td>$" + exp.PrecioUnitario + "</td><td>$" + exp.PrecioTotal + "</td><td>" + exp.ordenCompra + "</td></tr>";
                Importe_Total += parseFloat(exp.PrecioTotal);
            });
            Tabla_Fin = "</tbody></table>";
            $("#example").html(Tabla_Datos + Tabla_Fin);
            $("#lbl_CantidadReg").html(Pedidos.length);
        },
        beforeSend: function () {
            Importe_Total = 0;
            $("#cargando").show();
            $("#TablaPedidos").hide();
            $("#lbl_CantidadReg").html("0");
            $("#Total").html("Importe Total: $ 0");
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaPedidos").show();
            $("#example").DataTable();
            $(".sorting_asc").click();
            $(".sorting_desc").click();
            $("#Total").html("Importe Total: $ " + Importe_Total.toFixed(2));
        },
        error: errores
    });
}



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function InitControls() {
    List_Proveedores();

    $('.date').mask("99/99/9999", { placeholder: "-" });
    $('.date').datepicker();
    var currentDt = new Date();
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = dd + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaDesde").val(p);
    $("#txtFechaHasta").val(d);

    
}

function LoadDataTable() {
    oTabla = $('#example').DataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "290px",
        "sScrollX": "345px",
        "sScrollXInner": "100%",
        "sScrollYInner": "100%",
        "bScrollCollapse": true,
        "max-height": "300px", 
        "height": "100px",
        fixedColumns: true,
        "language": {
            "zeroRecords": "Sin Resultados"
        },
        "bAutoWidth": false, // Disable the auto width calculation 
        "aoColumns": [
                    { "sTitle": "Fecha de<br>Pedido", "sWidth": "15px" }, // 1st column width 
                    {"sTitle": "Insumo/Descripción", "sWidth": "250px" }, // 2nd column width 
                    {"sTitle": "Cantidad Pedida<br> por el Servicio", "sWidth": "40px" }, // 3rd column width and so on 
                    {"sTitle": "Proveedor", "sWidth": "250px" },
                    { "sTitle": "Cantidad Pedida en <br>la Orden de Compra", "sWidth": "40px" },
                    { "sTitle": "Precio<br>Unitario", "sWidth": "40px" },
                    { "sTitle": "Precio<br>Total", "sWidth": "40px" },
        //{ "sTitle": "Fecha<br>Remito/Factura", "sWidth": "40px" }
                    {"sTitle": "Número<br>Orden Compra", "sWidth": "40px" }
                ]
    });
    
}

$("#btnBuscar").click(function () {
    Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(),$("#txtInsumo").val().trim(),$("#cbo_Proveedor :selected").val());
});

////Opciones Pie////

$(".imprimir").click(function () {
    var pdf = 0;

    switch ($(this).attr('id')) {
        case "btnPdf":
            pdf = 1;
            break;
        case "btnExcel":
            pdf = 0;
            break;
    }

    var Insumo = $('#txtInsumo').val().trim();
    if (Insumo.length == 0) Insumo = " ";

    Imprimir_Listado("../Impresiones/Compras/Adm_Reporte_Gastos.aspx?Desde=" + $("#txtFechaDesde").val() + "&Hasta=" + $("#txtFechaHasta").val() + "&Insumo=" + Insumo + "&PRV_ID=" + $('#cbo_Proveedor :selected').val() + "&PDF=" + pdf + "&OrdenCompra=" + $("#txtOrdenCompra").val());
});


function Imprimir_Listado(url) {
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