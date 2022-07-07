

$(document).ready(function () {
    List_Rubros();
    List_by_Monodroga(0);
    $("#hasta").mask("99/99/9999", { placeholder: "-" });
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#desde").val(p);
    $("#hasta").val(d);
});

$(function () {
    $("#desde").datepicker({
        onClose: function (selectedDate) {
            $("#hasta").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#hasta").datepicker({
        onClose: function (selectedDate) {
            $("#desde").datepicker("option", "maxDate", selectedDate);
        }
    });
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

function List_ControlStock(Medicamento, Rubro) {
    var Todos = 0;
    if ($("#chk_Todos").is(":checked")) Todos = 1;
    if ($("#chk_Debajo").is(":checked")) Todos = 0;                                                                 //$("#hasta").val()
    var json = JSON.stringify({"InsumoId": Medicamento, "RubroId": parseInt(Rubro),"Desde": $("#desde").val() ,"Hasta":  "01/01/1900"  ,"Todos": Todos });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/ListControlVencimientos",
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
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Insumo</th><th>Presentación</th><th>Rubro</th><th>Stock Actual</th><th>N° Lote</th><th>Vencimiento</th></tr></thead><tbody>"; 
    var Contenido = "";
    $.each(Lista, function (index, Medicamento) {
        Contenido = Contenido + "<tr><td>" + Medicamento.REM_NOMBRE + " </td><td> " + Medicamento.Presentacion + " </td><td> " + Medicamento.Rubro + " </td><td> " + Medicamento.STO_CANTIDAD + " </td><td> " + Medicamento.NROLOTE + " </td><td> " + Medicamento.STO_VENCIMIENTO + " </td></tr>";
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos_div").html(Encabezado + Contenido + Pie);
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
    var Todos = 0;
    var Tipo = "";
    if ($("#chk_Todos").is(":checked")) {Todos = 1; Tipo = "Todos los Insumos";}
    if ($("#chk_Debajo").is(":checked")) {Todos = 0; Tipo = "Insumos Por debajo del Stock Mínimo";}
    var Rubro = $("#cbo_Rubros :selected").val();
    var RubroNombre =  $("#cbo_Rubros :selected").text();
    var Medicamento = $("#cbo_Medicamento :selected").val();
    var url = '../Impresiones/ControlVencimientos.aspx?RubroNombre='+RubroNombre+'&InsumoId='+ Medicamento + '&Desde=' + $("#desde").val() +'&Hasta=' + $("#hasta").val() + "&RubroId="+ Rubro+"&Todos="+Todos+"&Tipo="+Tipo;
    Ventana(url);
});
