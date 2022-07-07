

$(document).ready(function () {
    List_Rubros();
    //Cargar_Medicamentos(false);
    List_by_Monodroga(0);
});

function List_by_Monodroga(MonoId) {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista_by_Mono",
        data: '{MonoId: "' + MonoId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        beforeSend: function () {
            $("#cbo_Medicamento").attr("disabled", true);
        },
        complete: function () {
            $("#cbo_Medicamento").removeAttr("disabled");
        },
        error: errores
    });
}


function Cargar_Medicamentos(Todos) {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista",
        data: '{Todos: "' + Todos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        error: errores
    });
}

function Cargar_Medicamentos_Cargado(Resultado) {
    var Medicamento = Resultado.d;
    $.each(Medicamento, function (index, Medicamento) {
        if (Medicamento.Medida != null) {
            var Medida = Medicamento.Medida;
        }
        else {
            var Medida = '';
        }
        $('#cbo_Medicamento').append(
              $('<option></option>').val(Medicamento.REM_ID).html(Medicamento.REM_NOMBRE + ' - ' + Medicamento.REM_GRAMAJE + Medida + ' - ' + Medicamento.Presentacion)
            );
    });

}


function List_Rubros() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamentos_Rubro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Rubros_Cargado,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_Rubros_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Rubro) {
        if (Rubro.Id == 0) Rubro.Rubro = "TODOS";
        $("#cbo_Rubros").append($("<option></option>").val(Rubro.Id).html(Rubro.Rubro));
    });

}

$("#btnBuscar").click(function () {
    var Rubro = $("#cbo_Rubros :selected").val();
    var Medicamento = $("#cbo_Medicamento :selected").val();
    List_ControlStock(Medicamento, Rubro);

});

    function List_ControlStock(Nombre, Rubro) {
    var Todos = false;
    if ($("#chk_Todos").is(":checked")) Todos = true;
    if ($("#chk_Debajo").is(":checked")) Todos = false;
    var json = JSON.stringify({"Nombre": Nombre, "Rubro": parseInt(Rubro), "Todos": Todos });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/List_ControlStock",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_ControlStock_Cargado,
        error: errores,
        beforeSend: function () {
                $("#cargando").show();
                $("#TablaMedicamentos_div").empty();
                $("#TablaMedicamentos_div").hide();
            },
            complete: function () {
                $("#cargando").hide();
                $("#TablaMedicamentos_div").show();
            }
    });
}

function List_ControlStock_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Insumo</th><th>Nro. de Lote</th><th>Presentación</th><th>Rubro</th><th>Fecha Vto.</th><th>Stock Actual</th><th>Stock Mínimo</th><th>Stock Máximo</th></tr></thead><tbody>"; 
    var Contenido = "";
    var insumo = 0;
    var combos = [];
    var fecha;
    var MedGram;
    var total = 0;
    //alert(Lista.length);

    $.each(Lista, function (index, Medicamento) {
    //if (insumo != Medicamento.Insumo_Id) {

    if(Medicamento.Insumo_Id== 192){ Medicamento.Medicamento = "CLINOMEL O KABIVEN 2566 ML";}

    if(Medicamento.STO_VCTO == "01/01/1900") { fecha = ""; } else { fecha = Medicamento.STO_VCTO; }

    insumo = Medicamento.Insumo_Id;

    Medicamento.Medicamento = Medicamento.Medicamento


    if(Medicamento.Gramaje != 0){ MedGram = Medicamento.Gramaje; } else { MedGram = Medicamento.Medida; }

    total = total + Medicamento.Stock;

        Contenido = Contenido + "<tr><td>" + Medicamento.Medicamento + " " + MedGram + "</td>" +
         //"<td><select id='cbo_" + Medicamento.Insumo_Id + "'></select></td>" +
        "<td>" + Medicamento.lote +"</td>" +
        "<td> " + Medicamento.Presentacion + " </td><td> " + Medicamento.Rubro + " </td>" +
        "<td> " + fecha + " </td>" +
        "<td> " + Medicamento.Stock + " </td>" +
        "<td> " + Medicamento.StockMin + " </td>" +
        "<td> " + Medicamento.StockMax + " </td></tr>";
      //  }
                        var opcion = {};
                opcion.descripcion = Medicamento.Stock + " - Nro. de Lote:" + Medicamento.lote;
                opcion.valor = Medicamento.lote;
                opcion.comboId = Medicamento.Insumo_Id;
                combos.push(opcion);
    });
    var Pie = "<tr><td colspan='5'><b class='pull-right'>TOTAL</b></td><td colspan='3'>"+ total.toString() +"</td></tr></tbody></table>";
    $("#TablaMedicamentos_div").html(Encabezado + Contenido + Pie);
                $.each(combos, function (index, item) {
                $("#cbo_" + item.comboId).append('<option value="' + item.valor + '">' + item.descripcion + '</option>');
            });

}


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
        });
}

$("#btnImprimir").click(function () {
    var Todos = false;
    var Tipo = "";
    if ($("#chk_Todos").is(":checked")) {Todos = true; Tipo = "Todos los Insumos";}
    if ($("#chk_Debajo").is(":checked")) {Todos = false; Tipo = "Insumos Por debajo del Stock Mínimo";}
    var Rubro = $("#cbo_Rubros :selected").val();
    var Medicamento = $("#cbo_Medicamento :selected").val();
    var url = '../Impresiones/ControlStock.aspx?Nombre=' + Medicamento + "&Rubro="+ Rubro+"&Todos="+Todos+"&Tipo="+Tipo;
    Ventana(url);
});
