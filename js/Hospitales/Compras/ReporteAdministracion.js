var oTabla;

$(document).ready(function () {
        LoadDataTable();
    InitControls();
});

function Buscar_Pedidos(FechaRemito_Desde, FechaRemito_Hasta) {
    if (FechaRemito_Desde.length == 0) FechaDesde = '01/01/1900';
    if (FechaRemito_Hasta.length == 0) FechaHasta = '01/01/1900';

    var json = JSON.stringify({ "Desde": FechaRemito_Desde, "Hasta": FechaRemito_Hasta, "Filtro": $('input[name=optradio]:checked', '#radios').val() });

    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras_Administracion.asmx/COMPRAS_REPORTE_ADM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            var Pedidos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $.each(Pedidos, function (index, exp) {
                Tabla_Datos += "<tr><td>" + exp.FechaPedido + "</td><td>" + exp.Servicio + "</td><td>" + exp.NroPedido + "</td><td>" + exp.Insumo + "</td><td>" + exp.Pedido + "</td><td>" + exp.NroOrdenCompra + "</td><td>" + exp.NroRemito + "</td><td>" + exp.Saldo + "</td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#example").html(Tabla_Datos + Tabla_Fin);
            $("#lbl_CantidadReg").html(Pedidos.length);
        },
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaPedidos").hide();
            $("#lbl_CantidadReg").html("0");
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaPedidos").show();
            $("#example").DataTable();
            $(".sorting_asc").click();
            $(".sorting_desc").click();
        },
        error: errores
    });
}



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function InitControls() {
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

    $("#btnBuscar").click();
}

function LoadDataTable() {
    oTabla = $('#example').DataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "380px",
        "sScrollX": "100%",
        "sScrollXInner": "400%",
        "sScrollYInner": "100%",
        "bScrollCollapse": true,
        fixedColumns: true,
        "language": {
            "zeroRecords": "Sin Resultados"
        },
        "bAutoWidth": false, // Disable the auto width calculation 
        "aoColumns": [
                    {"sTitle": "Fecha<br>Pedido", "sWidth": "15px" }, // 1st column width 
                    {"sTitle": "Servicio", "sWidth": "20px" }, // 2nd column width 
                    {"sTitle":"N°<br>Pedido", "sWidth": "40px" }, // 3rd column width and so on 
                    {"sTitle":"Insumo","sWidth": "250px" },
                    {"sTitle":"Cantidad<br>Pedida", "sWidth": "40px" },
                    {"sTitle": "N° Orden<br>de<br>Compra", "sWidth": "40px" },
                    {"sTitle": "N°<br>Remito", "sWidth": "40px" },
                    {"sTitle": "Falta<br>Pedir", "sWidth": "40px" }
                ]
        });
}

$("#btnBuscar").click(function () {
    Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val());
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

    Imprimir_Listado("../Impresiones/Compras/ReporteAdministracion.aspx?Desde=" + $("#txtFechaDesde").val() + "&Hasta=" + $("#txtFechaHasta").val() + "&Filtro=" + $('input[name=optradio]:checked', '#radios').val() + "&PDF=" + pdf);
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