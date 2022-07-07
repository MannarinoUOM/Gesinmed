var lista = 0;

$(document).ready(function () { });


$("#btnBuscar").click(function () {
    if ($("#txtDesde").val() == "") { alert("Ingrese fecha desde."); return false; }
    if ($("#txtHasta").val() == "") { alert("Ingrese fecha hasta."); return false; }
    if ($("#txtColumna").val() == "") { alert("Ingrese numero de columna."); return false; }

    var json = JSON.stringify({ "desde": $("#txtDesde").val(), "hasta": $("#txtHasta").val(), "columna": $("#txtColumna").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/HCMOVIMIENTOSPORCOLUMNA",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var encabezado = "<table class='table table-hover'><thead style='background-color:Black; font-weight:bold'><tr style='color:White'><td>Fecha</td><td>Origen</td><td>Destino</td><td>Nhc</td><td>Afiliado</td></tr></thead>";
            var fila = "";
            var pie = "</table>";
            lista = Resultado.d.length;
            $.each(Resultado.d, function (index, item) {
                fila += "<tr><td>" + item.Fecha + "</td><td>" + item.Origen + "</td><td>" + item.Destino + "</td><td>" + item.NHC + "</td><td>" + item.Usuario + "</td></tr>";
            });
            pie = "</table>";
            $("#resultados").html(encabezado + fila + pie);
        },
        error: errores
    });
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btnImprimir").click(function () {
    if (lista <= 0) { alert("Realice una busqueda primero."); return false; }
    imprimir("../Impresiones/Impresion_HC_Movimientos_X_Columna.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&columna=" + $("#txtColumna").val(), 0);
});