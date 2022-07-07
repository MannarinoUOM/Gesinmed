var listaDietas = new Array();
var comida = {};
var id = 0;
var comidaAux2 = {};
var comidaAux = {};


if ($("[rel=tooltip]").length) {
    $("[rel=tooltip]").tooltip();
}

var GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    GET[decode(arguments[1])] = decode(arguments[2]);
});

if (GET["tipoComida"] != "" ) {

    var tipoComida = GET["tipoComida"];
}

if (GET["idInternacion"] != "") {

    var idInternacion = GET["idInternacion"];
}

if (GET["como"] != "" && GET["como"] != null) {

    var como = GET["como"];
}

if (GET["indiceAseguir"] != "" && GET["indiceAseguir"] != null) {

    var indiceAseguir = GET["indiceAseguir"];
}

if (GET["queComida"] != "" && GET["queComida"] != null) {

    var queComida = GET["queComida"];
    if (queComida == 1) {
        $("#lblCodigoComida").html("Código Almuerzo");
        $("#lblCodigoComida").css('font-weight', 'bold');
        $("#lblCodigoComida2").html("Código Almuerzo");
        $("#lblCodigoComida2").css('font-weight', 'bold');
    }
    else {
        $("#lblCodigoComida").html("Código Cena");
        $("#lblCodigoComida").css('font-weight', 'bold');
        $("#lblCodigoComida2").html("Código Cena");
        $("#lblCodigoComida2").css('font-weight', 'bold');
    }
}

if (GET["idNutricion"] != "" && GET["idNutricion"] != null) {

    var idNutricion = GET["idNutricion"];
}


if (GET["cargarAux"] != "" && GET["cargarAux"] != null) {
    var cargarAux = GET["cargarAux"];
}
if (GET["fecha"] != "" && GET["fecha"] != null) {

    var fecha = GET["fecha"];
}
if (GET["deDondeCarga"] != "" && GET["deDondeCarga"] != null) {

    var deDondeCarga = GET["deDondeCarga"];
}
if (GET["idPaciente"] != "" && GET["idPaciente"] != null) {

    var idPaciente = GET["idPaciente"];
}

mostrarComidas();

function mostrarComidas() {
    $.ajax({
        type: "POST",
        url: "../Json/Nutricion/Nutricion.asmx/InternacionNutricionTraerDietas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MostarComidas,
        complete: function () {
            $("#ListaComidas").css('display', 'inherit');
            $("#ListaComidas2").css('display', 'inherit');
            $("#guardando").css('display', 'none');
            $("#leyenda").css('display', 'none');
        },
        error: errores
    });
    }

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    function MostarComidas(resultado, chekeado) {
        var lista = resultado.d;
        $("#titulo").css('display', 'inline-table');
        $("#titulo2").css('display', 'inline-table');
        $("#ListaComidas").empty();
        var Encabezado = "<table class='table table-hover table-condensed' style='overflow:hidden'><thead style='overflow:hidden'><tr>" +
        "<tr><th style='width:10px; display:none;scroll:none'></th>" +
        "<th style='width:300px; display:none'></th>" +
        "<th style='width:300px; display:none'></th></tr><th></th><th></th></thead><tbody>";
        var contenido = "";
        var Encabezado2 = "<table class='table table-hover table-condensed' style='overflow:hidden;margin-bottom:0px'><thead style='overflow:hidden'><tr>" +
        "<th style='width:10px; display:none;scroll:none'></th>" +
        "<th style='width:300px; display:none'></th>" +
        "<th style='width:300px; display:none'></th></tr><th></th><th></th></thead><tbody>";
        var contenido2 = "";
        var ids = 0;
        $.each(lista, function (index, comida) {
            switch (comida.quetabla) {

                case 1: // carga tabla de la izquierda
                    switch (tipoComida) {

                        case "almuerzo":

                            if (comida.id != 30) {
                                contenido = contenido + "<tr><td  style='width:15px; padding-bottom:2px;padding-top:2px' >" +
                                "<input id='check" + String(comida.id) + "' type='checkbox' onchange='Seleccionar(" + comida.id + ")' 'checked' style='width:10px;height:' class='AlmuerzoSeleccion'/></td>" +
                                "<td class='clase' style='width:300px;large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.apodo + "</td>" +
                                "<td class='clase' style='large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.descripcion + "</td>" +
                                "<td class='clase' style='display: none;' id='comidaId" + comida.id + "'>" + comida.id + "</td>" +
                                "<td class='clase' style='display: none;' id='comidaApodo" + comida.id + "'>" + comida.apodo + "</td>" +
                                "<td class='clase' style='display: none;' id='comidaTipificacion" + comida.id + "'>" + comida.tipificacion + "</td>" +
                                "<td class='clase' style='display: none;' id='comidaTipo" + comida.id + "'>" + comida.Es + "</td>";
                            }
                            break;

                        case "cena":
                            if (comida.id != 29)
                                contenido = contenido + "<tr class='clase'><td  style='width:15px; padding-bottom:2px;padding-top:2px' >" +
                                "<input id='check" + String(comida.id) + "' type='checkbox' onchange='Seleccionar(" + comida.id + ")' 'checked' style='width:10px;height:' class='CenaSeleccion'/></td>" +
                                "<td class='clase' style='width:300px;large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.apodo + "</td>" +
                                "<td class='clase' style='large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.descripcion + "</td>" +
                                "<td class='clase' style='display: none;' id='comidaId" + comida.id + "'>" + comida.id + "</td>" +
                                "<td class='clase' style='display: none;' id='comidaApodo" + comida.id + "'>" + comida.apodo + "</td>" +
                                "<td class='clase' style='display: none;' id='comidaTipificacion" + comida.id + "'>" + comida.tipificacion + "</td>" +
                                "<td class='clase' style='display: none;' id='comidaTipo" + comida.id + "'>" + comida.Es + "</td>";
                    }
                    break;

                case 2: // carga tabla de la derecha
                    switch (tipoComida) {

                        case "almuerzo":
                            if (comida.id != 30) {
                                if (comida.id == 29) { //style='background-color:#CC0033'
                                    contenido2 = contenido2 + "<tr class='clase'><td  style='width:15px; padding-bottom:2px;padding-top:2px' >" +
                                    "<input id='check" + String(comida.id) + "' type='checkbox' onchange='Seleccionar(" + comida.id + ")' 'checked' style='width:10px;height:'/></td>" +
                                    "<td class='clase' style='width:300px;large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.apodo + "</td>" +
                                    "<td class='clase' style='large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.descripcion + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaId" + comida.id + "'>" + comida.id + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaApodo" + comida.id + "'>" + comida.apodo + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaTipificacion" + comida.id + "'>" + comida.tipificacion + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaTipo" + comida.id + "'>" + comida.Es + "</td>";
                                } else {
                                    contenido2 = contenido2 + "<tr class='clase'><td  style='width:15px; padding-bottom:2px;padding-top:2px' >" +
                                    "<input id='check" + String(comida.id) + "' type='checkbox' onchange='Seleccionar(" + comida.id + ")' 'checked' style='width:10px;height:' class='AlmuerzoSeleccion'/></td>" +
                                    "<td class='clase' style='width:300px;large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.apodo + "</td>" +
                                    "<td class='clase' style='large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.descripcion + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaId" + comida.id + "'>" + comida.id + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaApodo" + comida.id + "'>" + comida.apodo + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaTipificacion" + comida.id + "'>" + comida.tipificacion + "</td><td style='display: none;' id='comidaTipo" + comida.id + "'>" + comida.Es + "</td>";
                                }
                            }

                            break;
                        case "cena":
                            if (comida.id != 29) {
                                if (comida.id == 30) {//  style='background-color:#CC0033'
                                    contenido2 = contenido2 + "<tr class='clase'><td  style='width:15px; padding-bottom:2px;padding-top:2px' >" +
                                    "<input id='check" + String(comida.id) + "' type='checkbox' onchange='Seleccionar(" + comida.id + ")' 'checked' style='width:10px;height:'/></td>" +
                                    "<td class='clase' style='width:300px;large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.apodo + "</td>" +
                                    "<td class='clase' style='large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.descripcion + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaId" + comida.id + "'>" + comida.id + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaApodo" + comida.id + "'>" + comida.apodo + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaTipificacion" + comida.id + "'>" + comida.tipificacion + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaTipo" + comida.id + "'>" + comida.Es + "</td>";
                                } else {
                                    contenido2 = contenido2 + "<tr class='clase'><td  style='width:15px; padding-bottom:2px;padding-top:2px' >" +
                                    "<input id='check" + String(comida.id) + "' type='checkbox' onchange='Seleccionar(" + comida.id + ")' 'checked' style='width:10px;height:' class='CenaSeleccion'/></td>" +
                                    "<td class='clase' style='width:300px;large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.apodo + "</td>" +
                                    "<td class='clase' style='large; padding-bottom:2px;padding-top:2px' onclick='Seleccionar(" + comida.id + ")'>" + comida.descripcion + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaId" + comida.id + "'>" + comida.id + "</td><td style='display: none;' id='comidaApodo" + comida.id + "'>" + comida.apodo + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaTipificacion" + comida.id + "'>" + comida.tipificacion + "</td>" +
                                    "<td class='clase' style='display: none;' id='comidaTipo" + comida.id + "'>" + comida.Es + "</td>";
                                }
                            }
                            break;
                    }
                    break;
            }
        });
var Pie = "</table>";
var Pie2 = "</table>";
$("#ListaComidas").html(Encabezado + contenido + Pie);
$("#ListaComidas2").html(Encabezado2 + contenido2 + Pie2);
$("#ListaComidas2").css('margin-bottom', '0px');
        cargarComidas(cargarAux);//// a este le tengo que decir de donde cargo. si de la temporal o la fja
    }

    function Seleccionar(id) {
        if (event.target.id == "") { $("#check" + id).attr('checked', !$("#check" + id).is(':checked')); }

        if ($("#check" + id).is(':checked')) {
            var comidaAux = {};
            comidaAux.id = $("#comidaId" + id).html();
            comidaAux.apodo = $("#comidaApodo" + id).html();
            comidaAux.tipificacion = $("#comidaTipificacion" + id).html();
            comidaAux.Es = tipoComida;
            comidaAux2 = comidaAux;

            var json = JSON.stringify({
                "idNutricion": idNutricion,
                "idInternacion": idInternacion,
                "idPaciente" : idPaciente,
                "fecha": fecha
            });

            NutricionGuardarEncabezadoYDetalle(json);

        }
        else {
            var c = {};
            c.id = id;
            c.Es = tipoComida;
            var json = JSON.stringify({
                "idNutricion": idInternacion,
                "fecha": fecha,
                "comida": c,
                "cuantos": "uno"
            });
            NutricionBorrarUnDetalle(json);
         }
     }
  

        $("#btnAceptar").click(function () {
            parent.location = "../AtInternados/Nutricion.aspx?como=" + como + "&indiceAseguir=" + indiceAseguir + "&cargarAux=" + cargarAux + "&queComida=" + queComida + "&idInternacion=" + idInternacion + "&idNutricion=" + idNutricion + "&cargarAux=" + cargarAux;
        });

        $("#btnCancelar").click(function () {
       
            var json = JSON.stringify({
                "Es": tipoComida,
                "idComida": 0,
                "como": "todos"
            });
            NutricionBorrarComidasTemporales(json);
            cargarAux = 0;
            parent.location = "../AtInternados/Nutricion.aspx?como=" + como + "&indiceAseguir=" + indiceAseguir + "&cargarAux=" + cargarAux + "&queComida=" + queComida + "&idInternacion=" + idInternacion + "&idNutricion=" + idNutricion;
        });

function cargarComidas(deDondeCarga) {//// a este le tengo que decir de donde cargo. si de la temporal o la fja

switch(deDondeCarga){
    case "1":
        var json = JSON.stringify({
            "idInternacion": idInternacion,
            "tipo": tipoComida
        });
        $.ajax({
            type: "POST",
            url: "../Json/Nutricion/Nutricion.asmx/NutricionTraerComidasTemporales",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            success: function (resultado) {
                listaDietas = resultado.d;
                $.each(listaDietas, function (index, item) {
                    $("#check" + (item.id - 1)).attr('checked', true);

                    if (item.id == 23) {
                        $("#check22").attr('checked', true);
                    }
                });
            },
            error: errores
        });
        break;
    case "0":
        var json = JSON.stringify({
            "idInternacion": idInternacion,
            "fecha": fecha,
            "tipo": tipoComida 
        });
        $.ajax({
            type: "POST",
            url: "../Json/Nutricion/Nutricion.asmx/cargarMenus",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            success: chekear,
            error: errores
        });
        break;
    }
}

function chekear (resultado) {
                listaDietas = resultado.d;
                $.each(listaDietas, function (index, item) {
                   // if (item.id == 35) { $(".clase").css('cursor','not-allowed');  }
                    $("#check" + (item.id)).attr('checked', true);

                    if (item.id == 23) {
                        $("#check22").attr('checked', true);
                    }
                });
            }

            function NutricionGuardarEncabezadoYDetalle(json) {
                $.ajax({
                    type: "POST",
                    url: "../Json/Nutricion/Nutricion.asmx/NutricionGuardarEncabezado",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: guardarDetalle,
                    error: errores
                });

    function guardarDetalle(resultado) {

        idNutricion = resultado.d;
        var json = JSON.stringify({
            "idNutricion": idNutricion,
            "fechaComida": fecha,
            "comida": comidaAux2        
        });
        $.ajax({
            type: "POST",
            url: "../Json/Nutricion/Nutricion.asmx/NutricionGuardarDetalle",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            complete: function () {
                parent.jQuery.fancybox.close();
            },
            error: errores
        });
    }
}

function NutricionBorrarDetalle(json) {
    $.ajax({
        type: "POST",
        url: "../Json/Nutricion/Nutricion.asmx/NutricionBorrarDetalle",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        complete: function () {
        },
        error: errores
    });
}

function NutricionBorrarUnDetalle(json) {
    $.ajax({
        type: "POST",
        url: "../Json/Nutricion/Nutricion.asmx/NutricionBorrarUnDetalle",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        complete: function () {
        },
        error: errores
    });
}