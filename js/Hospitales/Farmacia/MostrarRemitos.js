function List_Proveedores(Todos) {
    $.ajax({
        type: "POST",
        data: '{Todos: "' + Todos + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Proveedores_Cargado,
        error: errores
    });
}

function List_Proveedores_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Proveedor) {
        $("#cbo_Proveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
    });

}

$("#btnCargarNuevo").click(function () {
    window.location = "CargaRemitoProveedores.aspx";

});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#txtLetra").blur(function () {
    $("#txtLetra").val($("#txtLetra").val().toUpperCase());
});

$(document).ready(function () {
    InitControls();

});

function InitControls() {
    List_Proveedores('S');
    $("#txtLetra").mask("a", { placeholder: "-" });
    $("#txtSucursal").mask("9?999", { placeholder: "-" });/////////////bbbuhbub
    $("#txtNumero").mask("9?9999999", { placeholder: "-" });
    $("#txtFechaIni").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaIni").val(p);
    $("#txtFechaFin").val(d);
}

$(function () {
    $("#txtFechaIni").datepicker({
        onClose: function (selectedDate) {
            $("#txtFechaFin").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#txtFechaFin").datepicker({
        onClose: function (selectedDate) {
            $("#txtFechaIni").datepicker("option", "maxDate", selectedDate);
        }
    });
});

function SearchbyAll(letra , numero , sucursal , Proveedor , Desde , Hasta) {//Manuel
    $.ajax({
        type: "POST",
        data: '{letra: "' + letra + '", numero: "' + sucursal + '", sucursal: "' + numero + '", Proveedor: "' + Proveedor + '", Desde: "' + Desde + '", Hasta: "' + Hasta + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Remitos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: SearchbyLetraSucNumero_Cargado,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaRemitos_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaRemitos_div").show();
        }
    });

}


function SearchbyLetraSucNumero_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Proveedor</th><th>Letra</th><th>Numero</th><th></th><th>Fecha</th><th>Observaciones</th></tr></thead><tbody>";
    var Contenido = "";
        $.each(Lista, function (index, Remito) {
            Contenido = Contenido + "<tr onclick='LoadRemito(" + Remito.Remito_Id + ")'<td></td><td> " + Remito.Proveedor + " </td><td> " + Remito.Letra + " </td><td> " + Remito.Sucursal + " </td><td> " + Remito.Numero + " </td><td> " + Remito.Fecha + " </td><td> " + Remito.Observaciones + " </td></tr>";
        });
    var Pie = "</tbody></table>";
    $("#TablaRemitos_div").html(Encabezado + Contenido + Pie);
}

function LoadRemito(Id) {
    document.location = "CargaRemitoProveedores.aspx?Id=" + Id;

}

$("#btnBuscar").click(function () {
    var Proveedor = $("#cbo_Proveedor :selected").val();
    SearchbyAll($("#txtLetra").val(), $("#txtNumero").val(), $("#txtSucursal").val(), Proveedor, $("#txtFechaIni").val(), $("#txtFechaFin").val());
});