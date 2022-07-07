var id = 0;
var referencias = ["Extracción", "Trat. de Conducto", "Obtu. Composite", "Diente Ausente", "Obtu. Amalgama", "Paradentosis", "Corona", "Pivot. Perno", "Incurstación", "Puente", "Prot. Removible", "Ortodoncia", "Carie Curable", "Carie Incurable", "Obtu. SIlicato", "Cancelar"]
$(document).ready(function () {
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) { return decodeURIComponent(s.split("+").join(" ")); }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["id"] != null && GET["id"] != "") { id = GET["id"]; }

    cargarProcedimientos();
});


function cargarProcedimientos() {
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerProcedimientosOdontologicos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) { cargarTabla(Resultado.d); },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function cargarTabla(lista) {
    var encabezado = "<table style='margin:auto; margin-top:4%; cursor:pointer' class='table-hover'>" +
    "<tr style='background-color:#CCCCCC; text-align:center; cursor:default'><td colspan='4'><b>REFERENCIAS</b></td></tr>"
    var fila = "<tr>";
    var pie = "</tr><table/>";

    $.each(lista, function (index, item) {
       // var i = index + 1;
        if (index % 2 == 0) {
            fila += "</tr><tr><td  class='renglon' id='" + item.id + "'><img src='../img/Odontologia/odonto_" + item.id + ".png' /></td><td class='renglon' id='" + item.id + "'>" + item.descripcion + "</td>";
        } else { fila += "<td  class='renglon' id='" + item.id + "'><img src='../img/Odontologia/odonto_" + item.id + ".png' /></td><td class='renglon' id='" + item.id + "'>" + item.descripcion + "</td>"; }
    });
    $("#referencias").html(encabezado + fila + pie);
}

$(".renglon").live("click", function () {
    //alert(id);
    if ($(this).attr("id").toString() != 16) {
        parent.$("#" + id).attr('data-procedimiento', $(this).attr("id").toString());
        parent.$("#" + id).addClass("asignado");
    } else {
        parent.$("#" + id).attr('data-procedimiento', '0');
        parent.$("#" + id).removeClass("asignado");
    }


    if ($(this).attr("id") == 16) {
        parent.$("#img_" + id).attr("src", ""); parent.$("#img_" + id).hide();
        // le saco los colores a las partes si cancela el procedimiento
        parent.$(".diente").each(function (index, item) { if ($(this).data('pertece') == id) { $(this).removeClass("rojo"); $(this).removeClass("azul"); } });
    } else {
        parent.$("#img_" + id).attr("src", "../img/Odontologia/odonto_" + $(this).attr("id") + ".png"); parent.$("#img_" + id).show();
        // le saco los colores a las partes si coloca diente ausente
        if ($(this).attr("id") == 4 || $(this).attr("id") == 1) { parent.$(".diente").each(function (index, item) { if ($(this).data('pertece') == id) { $(this).removeClass("rojo"); $(this).removeClass("azul"); } }); }
    }

    //alert($(this).attr("id"));
    if ($(this).attr("id") == 4) { parent.$("#ausente_" + id).attr("src", "../img/Odontologia/x.png"); parent.$("#ausente_" + id).show(); } else { parent.$("#ausente_" + id).hide(); }
    if ($(this).attr("id") == 7) { parent.$("#corona_" + id).attr("src", "../img/Odontologia/O.png"); parent.$("#corona_" + id).show(); } else { parent.$("#corona_" + id).hide(); }
    parent.$.fancybox.close();
});