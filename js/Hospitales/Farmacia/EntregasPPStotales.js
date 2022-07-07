var arreglo = [];
var subTotal = 0;
var total = 0;
var buscar = 0;
$(document).ready(function () {
    cargarCombo("cbo_Servicio", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerServiciosCentAnatomiaPatologica", 1, '');
        primerUltimoDia("desde", 1);
        primerUltimoDia("hasta", 2);
//    $("#desde").val("01/09/2015");
//    $("#hasta").val("05/09/2015");
});

$("#btnBuscar").click(function () {
    //if ($("#desde").val() == "" || $("#hasta").val() == "") { alert("Ingrese un rango de fecha!"); return false; }
    if (!(validaFechaDDMMAAAA($("#desde").val())) || !(validaFechaDDMMAAAA($("#hasta").val()))) {
        alert("Ingrese una fecha correcta!");
        return false;
    }
    if (buscar == 1) { return false; }
    buscar = 1;
    $(this).attr('disabled', true);

    var json = JSON.stringify({ "desde": $("#desde").val(), "hasta": $("#hasta").val(), "servicio": $("#cbo_Servicio").val() });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/EntregasPorServicioCantidad",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            cargarLista(lista);
        },
        beforeSend: function () { $("#cargando").show(); $("#TablaPedidos_div").hide(); },
        complete: function () { $("#cargando").hide(); if (total > 0) { $("#TablaPedidos_div").show(); } buscar = 0; $("#btnBuscar").attr('disabled', false); }
    });
});

function cargarLista(lista) {
    arreglo.length = 0;
    total = 0;
    subTotal = 0;
    $("#TablaPedidos_div").empty();
    var Encabezado = "<table class='table table-condensed' style='overflow:auto'><thead></thead><tbody>";
    var Contenido = "";
    var titulo = "";
    $.each(lista, function (index, item) {
        titulo = item.servicio;

        $.each(lista, function (index, item) {
            if ((jQuery.inArray(titulo, arreglo)) == -1) {
                Contenido = Contenido + "<tr style='width:101%'>" +
           "<td style='width:5%;cursor:default; background-color:#EBEBEB; text-align:center' colspan='6'><b>" + titulo + "</b></td>";

                Contenido = Contenido + "<tr style='width:101%'>" +
           "<td style='width:5%;cursor:default; background-color:#CCCCCC'><b>Cantidad</b></td>" +
           "<td style='width:55%;cursor:default; background-color:#CCCCCC'><b>Insumo</b></td>" +
           "<td style='width:5%;cursor:default; background-color:#CCCCCC'><b>Gramaje</b></td>" +
           "<td style='width:20%;cursor:default; background-color:#CCCCCC'><b>Medida</b></td>" +
           "<td style='width:15%;cursor:default; background-color:#CCCCCC'><b>Presentación</b></td>";

                $.each(lista, function (index, item) {
                    if (item.servicio == titulo) {
                        Contenido = Contenido + "<tr style='height:20px'>" +
           "<td style='width:5%;cursor:default; text-align:right' >" + item.cantidad + "</td>" +
           "<td style='width:55%;cursor:default' >" + item.insumo + "</td>" +
           "<td style='width:5%;cursor:default; text-align:right' >" + item.gramaje + "</td>" +
           "<td style='width:20%;cursor:default' >" + item.medida + "</td>" +
           "<td style='width:15%;cursor:default' >" + item.presentacion + "</td>";

                        subTotal += item.cantidad;
                    }
                });
                Contenido = Contenido + "<tr style='height:20px'>" +
           "<td style='width:5%;cursor:default;background-color:#CCCCCC; text-align:right' ><b>" + subTotal + "</b></td>" +
           "<td style='width:55%;cursor:default; background-color:#CCCCCC' ></td>" +
           "<td style='width:5%;cursor:default; background-color:#CCCCCC; text-align:right' ></td>" +
           "<td style='width:20%;cursor:default; background-color:#CCCCCC' ></td>" +
           "<td style='width:15%;cursor:default; background-color:#CCCCCC' ></td>";
                total += subTotal;
                subTotal = 0;
                arreglo.push(titulo);
                //alert(arreglo.length);
            }

        });
    });
    if (total > 0) {
        $("#sinResultados").hide();
        $("#TablaPedidos_div").show();
        Contenido = Contenido + "<tr style='height:20px'>" +
           "<td style='width:5%;cursor:default;background-color:#EBEBEB; text-align:right' ><b>" + total + "</b></td>" +
           "<td style='width:55%;cursor:default; background-color:#EBEBEB' ></td>" +
           "<td style='width:5%;cursor:default; background-color:#EBEBEB; text-align:right' ></td>" +
           "<td style='width:20%;cursor:default; background-color:#EBEBEB' ></td>" +
           "<td style='width:15%;cursor:default; background-color:#EBEBEB' ></td>";
    } else { $("#sinResultados").show(); }

    var Pie = "</tbody></table>";
    $("#TablaPedidos_div").html(Encabezado + Contenido + Pie);
}

$("#btnImprimir").click(function () {
    if (!(validaFechaDDMMAAAA($("#desde").val())) || !(validaFechaDDMMAAAA($("#hasta").val()))) {
        alert("Ingrese una fecha correcta!");
        return false;
    }
    if ($("#desde").val() == "" || $("#hasta").val() == "") { alert("Ingrese un rango de fecha!"); return false; }
    imprimir("../Impresiones/ReportesFarmacia/Entregas_Por_Servicio_Cantidad.aspx?desde=" + $("#desde").val() + "&hasta=" + $("#hasta").val() + "&servicio=" + $("#cbo_Servicio").val() + "&PDF=1", 0);
});