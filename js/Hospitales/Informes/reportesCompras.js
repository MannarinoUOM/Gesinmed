var GET = {};
var titulo = "";
var tipo = "";

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    GET[decode(arguments[1])] = decode(arguments[2]);
});

$(document).ready(function () {
    if (GET["titulo"] != "" && GET["titulo"] != null) {
        titulo = GET["titulo"];
        $("#titulo").html(titulo.replace(/_/g, " "));
    }

    if (GET["tipo"] != "" && GET["tipo"] != null) {
        tipo = parseInt(GET["tipo"]);
    }

    //prepara filtros segùn informe
    switch (tipo) {
        case 1:
            $("#group1").show();
            $("#group2").show();
            $("#group3").show();

            $("#lbl1").html("Insumo");
            $("#lbl2").html("Porcentaje");
            $("#lbl3").html("Patología");

            cargarCombo("cbo3", "../Json/reportesCompras.asmx/ReportesComprasTraerPatologias", 1, "");
            cargarCombo("cbo1", "../Json/reportesCompras.asmx/ReportesComprasTraerInsumos", 1, "");

            $("#cbo2").append(new Option("Seleccione", 0));
            $("#cbo2").append(new Option("40%", 40));
            $("#cbo2").append(new Option("70%", 70));
            $("#cbo2").append(new Option("100%", 100));
            break;

        case 2:
            $("#group1").hide();
            $("#group2").show();
            $("#group3").hide();

            $("#lbl2").html("Orden");
            $("#cbo2").append(new Option("Insumo", 0));
            $("#cbo2").append(new Option("Cantidad", 1));
           
            break;
    }
}); // fin ready

$(".buscar").click(function () {
    var comprobar = [];
    var PDF = "";

    $(".fechaMask").each(function () {
        if ($(this).val() == "") { comprobar.push(1); }
    });
    if (comprobar.length >= 1) { alert("Ingrese un rango de fechas."); return false; }

    switch ($(this).attr('id')) {
        case "btnEXECL":
            PDF = 0;
            break;

        case "btnPDF":
            PDF = 1;
            break;
    }


    switch (tipo) {
        case 1:
            imprimir("../Impresiones/ReportesCompras/Reporte_Compras_Pedidos_Susana.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&insumo=" + $("#cbo1").val() + "&descuento=" + $("#cbo2").val() + "&discapacidad=" + $("#cbo3").val() + "&PDF=" + PDF, 0);
            break;

        case 2:
            imprimir("../Impresiones/ReportesCompras/Reporte_Consumo_MEDICACION_HOSPITALARIA.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&orden=" + $("#cbo2").val() + "&PDF=" + PDF, 0);
            break;
    }
});


 $("#btnVolver").click(function () {
     document.location = "../Informes/ReportesDeCompras.aspx";
 });