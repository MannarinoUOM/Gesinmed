var tecnicasSeparadas = "";

//$(document).ready(function () {
////    var ids = "";
////    ids = parent.$("#idsTecnicas").val();
//    alert(parent.idsTecnicas);
//    //$.each(parent.$("#idsTecnicas").val(), function (index, item) {
//    //  item.val();
//    //});
//});

var json = JSON.stringify({ "tipo": 0, "busqueda": "" });
$.ajax({
    type: "POST",
    url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/traerTecnicas",
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
            if ((jQuery.inArray(item.id, parent.idsTecnicas)) >= 0)
                color = "#CEF6CE";

            Contenido = Contenido + "<tr style='height:20px' id='fila" + item.id + "'>" +
           "<td style='width:100%;cursor:pointer;background-color:" + color + "' id='descripcion" + item.id + "'  onclick='seleccionar(" + item.id + ")'>" + item.descripcion + "</div></td>"

        });
        var Pie = "</tbody></table>";
        $("#tablaTecnicas").html(Encabezado + Contenido + Pie);
    }
});

function seleccionar(id) {
    // parent.tecnicas.lenght == 0;
   parent.bPreguntar = true;
   //alert(parent.bPreguntar);
   tecnicasSeparadas = "";
    if ((jQuery.inArray(id, parent.idsTecnicas)) >= 0) {
        parent.idsTecnicas.splice(jQuery.inArray(id, parent.idsTecnicas), 1);
        $("#descripcion" + id).css('background-color', '');
        $.each(parent.tecnicas, function (index, item) {
            if (item == $("#descripcion" + id).html().toUpperCase()) {
                parent.tecnicas.splice(index, 1);
                //alert("igulaes");
            }
        });
        //parent.$("#txtTecnicasEspeciales").val(parent.tecnicas);
        tecnicasSeparadas = parent.tecnicas.join("   +   ");
        parent.$("#txtTecnicasEspeciales").val(tecnicasSeparadas);
    } else {
        parent.idsTecnicas.push(id);
        $("#descripcion" + id).css('background-color', '#CEF6CE');
       //var item = $("#descripcion" + id).html().toUpperCase();
        //item.css('font-weight', 'bold');
        //$("#descripcion" + id).css('font-weight', 'bold');
        parent.tecnicas.push($("#descripcion" + id).html().toUpperCase());
        tecnicasSeparadas = parent.tecnicas.join("   +   ");
        parent.$("#txtTecnicasEspeciales").val(tecnicasSeparadas);
    }
    //alert(tecnicasSeparadas);
   //parent.tecnicas =  parent.tecnicas.split(" + ");
   // if (parent.tecnicas.lenght == 0) { $("#chkTecnicasEspeciales").attr('checked', false); } else { $("#chkTecnicasEspeciales").attr('checked', true); }
}


 
 

