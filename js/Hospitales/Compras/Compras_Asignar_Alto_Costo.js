$(document).ready(function () { VerInsumos(true); });

function VerInsumos(Todos) {
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/List_InsumosCombo",
        data: '{Todos: "' + Todos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Insumos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $("#resultadoT").empty();
            Tabla_Titulo = "<table id='historial' class='table table-hover' style='font-size:11px;'><thead><tr style='background-color:Black;color:White;font-size:x-large'><th style='text-align:left;'>INSUMOS</th></tr></thead><tbody>";
            $.each(Insumos, function (index, ins) {
                if (ins.INS_ALTO_COSTO == 1) {
                    Tabla_Datos += "<tr style='text-align:left;cursor:pointer;background-color:#A7CCE9' class='tr_insumos'  data-costo='" + ins.INS_ALTO_COSTO + "' data-id='" + ins.INS_ID + "' id='tr" + ins.INS_ID + "'></td><td id='td_desc" + ins.INS_ID + "' style='text-align:left;'>" + ins.INS_DESCRIPCION + "</td><input type='hidden' id='INS_RUBRO" + index + "' data-id='" + ins.INS_RUBRO + "' /><td id='costo" + ins.INS_ID + "' style='display:none'>" + ins.INS_ALTO_COSTO + "</td></tr>";
                } else {
                    Tabla_Datos += "<tr style='text-align:left;cursor:pointer;background-color:white' class='tr_insumos'  data-costo='" + ins.INS_ALTO_COSTO + "' data-id='" + ins.INS_ID + "' id='tr" + ins.INS_ID + "'></td><td id='td_desc" + ins.INS_ID + "' style='text-align:left;'>" + ins.INS_DESCRIPCION + "</td><input type='hidden' id='INS_RUBRO" + index + "' data-id='" + ins.INS_RUBRO + "' /><td id='costo" + ins.INS_ID + "' style='display:none'>" + ins.INS_ALTO_COSTO + "</td></tr>";
                }
            });
            Tabla_Fin = "</tbody></table>";
            $("#resultadoT").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

        },
        error: errores,
        complete: function () { $("#cargando").hide(); }
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).on("click", ".tr_insumos", function () {

    //var costo = $(this).data('costo');
    var id = $(this).data('id');
    var costo = $("#costo" + id).html();

    $("#" + id).attr('background-color', 'White');
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/AsiganarInsumoAltoCosto",
        data: '{id: "' + $(this).data('id') + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            if (Resultado.d == 1) {
                switch (costo) {
                    case "1":
                        $("#tr" + id).css('background-color', 'White');
                        $("#costo" + id).html("0");
                        alert("Insumo Actualizado");
                        break;

                    case "0":
                        $("#tr" + id).css('background-color', '#A7CCE9');
                        $("#costo" + id).html("1");
                        alert("Insumo Actualizado");
                        break;
                }
            } else { alert("Ocurrió un error al intentar actualizar el insumo. Intente nuevamente."); }

        },
        error: errores
    });

});