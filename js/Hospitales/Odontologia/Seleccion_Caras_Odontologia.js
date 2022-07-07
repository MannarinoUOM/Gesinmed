$(document).ready(function () {
    cargarCaras();
});

function cargarCaras() {
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerCarasOdontologia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var cabeza = "<table class='table-hover'>";
            var fila = "";
            var pie = "</table>";
            $.each(Resultado.d, function (index, item) {
                //alert(jQuery.inArray(item.id, parent.carasIdS));

                if (jQuery.inArray(item.id, parent.carasIdS) > -1)
                { fila += "<tr id='fila" + item.id + "' style='cursor:pointer' onclick='seleccion(" + item.id + ")' class='seleccionCara'><td>" + item.descripcion + "</td></tr>"; }
                else
                { fila += "<tr id='fila" + item.id + "' style='cursor:pointer' onclick='seleccion(" + item.id + ")'><td>" + item.descripcion + "</td></tr>"; }
            });
            $("#tabla").html(cabeza + fila + pie);
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function seleccion(id) {
    if (!$("#fila" + id).hasClass("seleccionCara")) {
        parent.carasIdS.push(id);
        parent.carasInicial.push($("#fila" + id).html().toString().substring(4, 5));
        $("#fila" + id).addClass("seleccionCara");
    }
    else {
        //alert(parent.carasInicial.indexOf($("#fila" + id).html().toString().substring(4, 5)));
        parent.carasIdS.splice(parent.carasIdS.indexOf(id), 1);


        parent.carasInicial.splice(parent.carasInicial.indexOf($("#fila" + id).html().toString().substring(4, 5)), 1);
        if (parent.carasInicial.length == 0) { parent.$("#txtCaras").text("Ubicación"); }      
        $("#fila" + id).removeClass("seleccionCara");
    }

}

//function pintarCaras() {
//    $.each(parent.carasIdS, function (index, item) {
//        //alert($("#fila" + item).html())
//        alert(item);
//    }); }
//$("#fila" + item).addClass("seleccionCara"); }); }