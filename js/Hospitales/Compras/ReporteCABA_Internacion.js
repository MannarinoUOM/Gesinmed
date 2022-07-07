var oTabla;

$(document).ready(function () {
    InitControls();
});

function Buscar_Pedidos(FechaRemito_Desde, FechaRemito_Hasta) {
    if (FechaRemito_Desde.length == 0) FechaDesde = '01/01/1900';
    if (FechaRemito_Hasta.length == 0) FechaHasta = '01/01/1900';



    var json = JSON.stringify({ "Desde": FechaRemito_Desde, "Hasta": FechaRemito_Hasta, "Filtro": $('input[name=optradio]:checked', '#radios').val(), "afiliado": $("#txtPaciente").val() });

    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/Reporte_Compras_Internacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            var Pedidos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            var pedido = 0;
            var cantidad = 0;
            $.each(Pedidos, function (index, exp) {
                //titulo pedido
                if ((pedido == 0) || (pedido != exp.NPEDIDO)) {
                    pedido = exp.NPEDIDO;
                    Tabla_Datos += "<tr style='background-color:#CCCCCC'><td>" + exp.FECHA_PEDIDO + "</td>" +
                "<td>" + exp.SERVICIO + "</td>" +
                "<td>" + exp.PACIENTE + "</td><td>" + exp.DOCUMENTO + "</td><td>" + exp.NHC + "</td><td>" + exp.SECCIONAL + "</td><td>" + exp.NEXP + "</td><td>" + exp.NPEDIDO + "</td></tr>";
                    cantidad = 0;
                }
                //titulo detalle
                if ((pedido == exp.NPEDIDO) && (cantidad == 0)) {
                    cantidad += 1;
                    Tabla_Datos += "<tr style='background-color:#F3F3F3'><td><b>CANTIDAD</b></td>" +
                "<td><b>INSUMO<b></td>" +
                "<td><b>OBSERVACION<b></td><td><b>FECHA ENTREGA<b></td><td><b>USUARIO<b></td><td></td><td></td><td></td></tr>";
                }
                //detalle
                if ((pedido == exp.NPEDIDO) && (cantidad > 0)) {
                    cantidad += 1;
                    var FEC_ENTREGA = "";
                    if (exp.FEC_ENTREGA == "01/01/1900") { FEC_ENTREGA = ""; } else { FEC_ENTREGA = exp.FEC_ENTREGA; }

                    Tabla_Datos += "<tr style='background-color:white;padding:0px'><td>" + exp.CANTIDAD + "</td>" +
                "<td>" + exp.INSUMO + "</td>" +
                "<td>" + exp.OBSERVACION + "</td><td>" + FEC_ENTREGA + "</td><td>" + exp.usuario + "</td><td></td><td></td><td></td></tr>";
                }
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
    LoadDataTable();
    $("#btnBuscar").click();
}

function LoadDataTable() {
    oTabla = $('#example').DataTable({
        "bAutoWidth": false,
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "374px",
        "sScrollX": "100%",
        "sScrollXInner": "400%",
        "sScrollYInner": "100%",
        "bScrollCollapse": true,
                fixedHeader: {
                    header: true,
                    footer: false
                },
        "language": {
            "zeroRecords": "Sin Resultados"
        }
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

    //var afiliado = "z";

    //if ($("#txtPaciente").val().trim().length > 0) { afiliado = $("#txtPaciente").val(); }

    Imprimir_Listado("../Impresiones/Compras/reporteComprasInternacion.aspx?desde=" + $("#txtFechaDesde").val() + "&hasta=" + $("#txtFechaHasta").val() + "&tipo=" + $('input[name=optradio]:checked', '#radios').val() + "&afiliado=" + $("#txtPaciente").val() + "&PDF=" + pdf);
});


function Imprimir_Listado(url) {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            //'href':"https://infogram.com/6836393c-e4ce-4f90-9237-1f332be88240",
            'width': '100%',
            'height': '80%',
            'autoScale': false,
            'transitionIn': 'none',
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