var diagnosticosSeparados = "";

var json = JSON.stringify({ "id": 0, "cuantos": 1 });
$.ajax({
    type: "POST",
    url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerDiagnosticosComboAnatomia",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: json,
    success: function (Resultado) {
        var lista = Resultado.d;
        $("#tablaTecnicas").empty();
        var Encabezado = "<table class='table table-condensed' style='width: 100%;overflow:auto'><thead></thead><tbody>";
        var Contenido = "";

        $.each(lista, function (index, item) {
            var color = "";
            if ((jQuery.inArray(item.id, parent.idsDiagnosticos)) >= 0)
                color = "#CEF6CE";

            Contenido = Contenido + "<tr style='height:20px' id='fila" + item.id + "'>" +
           "<td style='width:100%;cursor:pointer;background-color:" + color + "' id='descripcion" + item.id + "'  onclick='seleccionar(" + item.id + ")'>" + item.descripcion.toUpperCase() + "</td>";

        });
        var Pie = "</tbody></table>";
        $("#tablaTecnicas").html(Encabezado + Contenido + Pie);
    }
});

function seleccionar(id) {
    // parent.diagnosticos.lenght == 0;
    parent.bPreguntar = true;
    //alert(parent.bPreguntar);
    if ((jQuery.inArray(id, parent.idsDiagnosticos)) >= 0) {
        parent.idsDiagnosticos.splice(jQuery.inArray(id, parent.idsDiagnosticos), 1);
        $("#descripcion" + id).css('background-color', '');
        $.each(parent.diagnosticos, function (index, item) {
            if (item == $("#descripcion" + id).html()) {
                parent.diagnosticos.splice(index, 1);
            }
        });
        diagnosticosSeparados = parent.diagnosticos.join("   +   ");
        //alert(diagnosticosSeparados);
        //diagnosticosSeparados = diagnosticosSeparados.substring(0, 10);
        parent.$("#txtCodigoDiagnostico").val(diagnosticosSeparados);
    } else {
        parent.idsDiagnosticos.push(id);
        $("#descripcion" + id).css('background-color', '#CEF6CE');
        parent.diagnosticos.push($("#descripcion" + id).html().toUpperCase());
        diagnosticosSeparados = parent.diagnosticos.join("   +   ");
        //diagnosticosSeparados = diagnosticosSeparados.substring(0, 10);

        parent.$("#txtCodigoDiagnostico").val(diagnosticosSeparados);
    }

//    $.each(parent.idsDiagnosticos, function (index, item) {
//        alert(item);
//    });
}


$("#diagnosticoSearch").on("keyup", function () {
    $(this).val(function () {
        return $(this).val().toUpperCase();
    })
    var busqueda = "";
    var alto = 0;
    busqueda = $("#diagnosticoSearch").val().toString().toUpperCase();


    $("#tablaTecnicas td").each(function (index) {
        if (busqueda == $(this).html().toString().substr(0, $("#diagnosticoSearch").val().trim().length)) {
            $(this).parent().fadeIn(100);
            // $(this).delay(100).queue(function () {
            // $(this).parent().fadeIn(100, function () { $(this).dequeue(); });

            //});
        } else {
            $(this).parent().fadeOut(100);
            //$(this).delay(100).queue(function () {
            //  $(this).parent().fadeOut(100, function () { (this).dequeue(); });

            //});
        }
    });

    //alert(resultado);
    //$("#tablaTecnicas").css('height', alto + 50);
});

