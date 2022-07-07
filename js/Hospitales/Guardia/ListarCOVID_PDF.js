var GET = {};
var afiliadoId = 0;

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    GET[decode(arguments[1])] = decode(arguments[2]);
});

$(document).ready(function () {

    if (GET["afiliadoId"] != "" && GET["afiliadoId"] != null) { afiliadoId = GET["afiliadoId"]; }
    cargarLista(afiliadoId);
});

function cargarLista(id) {
    var json = JSON.stringify({ "afiliadoId": id });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/SospechaCOVIDTraer",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var emcabezado = "<table class='table'><tr><td>Médico</td><td>Afiliado</td><td>Fecha</td></tr>";
            var fila = "";
            var pie = "</table>";
            $.each(Resultado.d, function (index, item) {
                fila = fila + "<tr style='cursor:pointer' class='fila' id='fila"+ item.id +"'><td>" + item.medico + "</td><td>"+ item.afiliado +"</td><td>" + item.fecha + "</td><td style='display:none' id='"+ item.id +"'>" + item.nombreArchivo + "</td></tr>";
            });

            $("#lista").html(emcabezado + fila + pie);
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$(".fila").live("click", function () {

    var id = "";
    id = $(this).attr('id').replace("fila", "");

    //alert($("#" + id).html());

    var Pagina = "../SospechaCOVID/" + $("#" + id).html();
    $.fancybox(
    		{
    		    'autoDimensions': false,
    		    'href': Pagina,
    		    'width': '100%',
    		    'height': '100%',
    		    'autoScale': false,
    		    'transitionIn': 'none',
    		    'transitionOut': 'none',
    		    'type': 'iframe',
    		    'hideOnOverlayClick': false,
    		    'enableEscapeButton': false
    		}
    	        );
});