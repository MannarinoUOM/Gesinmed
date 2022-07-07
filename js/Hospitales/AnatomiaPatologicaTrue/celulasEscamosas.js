var tecnicasSeparadas = "";

//$(document).ready(function () {
//    //    var ids = "";
//    //    ids = parent.$("#idsTecnicas").val();
//    $.each(parent.idsAdecuacion, function (index, item) {
//        alert(item);
//    });
//    //alert(parent.idsAdecuacion);
//    //$.each(parent.$("#idsTecnicas").val(), function (index, item) {
//    //  item.val();
//    //});
//});

var json = JSON.stringify({ "tipo": 6 });
$.ajax({
    type: "POST",
    url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: json,
    success: function (Resultado) {
        //alert(parent.idsAdecuacion);
        var lista = Resultado.d;
        $("#tablaTecnicas").empty();
        var Encabezado = "<table class='table table-condensed' style='width: 100%;overflow:auto'><thead></thead><tbody>";
        var Contenido = "";
        //alert("mostrar " + parent.idsAdecuacion);
        $.each(lista, function (index, item) {
            var color = "";
            if ((jQuery.inArray(item.id, parent.idsEscamosas)) >= 0)
                color = "#CEF6CE";

            Contenido = Contenido + "<tr style='height:20px' id='fila" + item.id + "'>" +
           "<td style='width:100%;cursor:pointer;background-color:" + color + "' id='descripcion" + item.id + "'  onclick='seleccionar2(" + item.id + ")'>" + item.descripcion + "</div></td>"

        });
        var Pie = "</tbody></table>";
        $("#tablaTecnicas").html(Encabezado + Contenido + Pie);
    }
});

function seleccionar2(id) {
    //alert(parent.HallazgosNoNeoplasicos);
    //alert(parent.idsHallazgos);
    //    alert(parent.adecuacionMuestra);
    //    alert(parent.idsAdecuacion);
    // parent.tecnicas.lenght == 0;
    parent.bPreguntar = true;
    //alert(parent.bPreguntar);
    tecnicasSeparadas = "";
    if ((jQuery.inArray(id, parent.idsEscamosas)) >= 0) {
        parent.idsEscamosas.splice(jQuery.inArray(id, parent.idsEscamosas), 1);
        $("#descripcion" + id).css('background-color', '');
        $.each(parent.escamosas, function (index, item) {

            if (item != undefined)
                if (item.toString().toLowerCase().trim() == $("#descripcion" + id).html().toString().toLowerCase().trim()) {
                    parent.escamosas.splice(index, 1);
                }

        });
        //parent.$("#txtTecnicasEspeciales").val(parent.tecnicas);
            tecnicasSeparadas = parent.escamosas.join("   +   ");
            parent.$("#cboCelulasEscamosas").val(tecnicasSeparadas);
    } else {
        parent.idsEscamosas.push(id);
        $("#descripcion" + id).css('background-color', '#CEF6CE');
        //var item = $("#descripcion" + id).html().toUpperCase();
        //item.css('font-weight', 'bold');
        //$("#descripcion" + id).css('font-weight', 'bold');
        parent.escamosas.push($("#descripcion" + id).html().toUpperCase());
        tecnicasSeparadas = parent.escamosas.join("   +   ");
        parent.$("#cboCelulasEscamosas").val(tecnicasSeparadas);
    }
    //alert(tecnicasSeparadas);
    //parent.tecnicas =  parent.tecnicas.split(" + ");
    // if (parent.tecnicas.lenght == 0) { $("#chkTecnicasEspeciales").attr('checked', false); } else { $("#chkTecnicasEspeciales").attr('checked', true); }
    //    alert(parent.idsHallazgos);
    //    alert(parent.HallazgosNoNeoplasicos);
}


 
 

