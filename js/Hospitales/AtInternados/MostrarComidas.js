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
        url: "../Json/AtConsultorio/AtConsultorio.asmx/InternacionNutricionTraerDietas",
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
       // $("#ListaComidas").css('display', 'none');
        $("#ListaComidas").empty();
        //        var Encabezado = "<table class='table table-hover table-condensed' style='auto; text-align:center'><thead><tr><th style='width:300px;scroll:none'>Código Almuerzo</th><th>  </th><th>Tipificación</th></tr>";
        var Encabezado = "<table class='table  table-hover' style='overflow:hidden'><thead style='overflow:hidden'><tr><th style='width:10px; display:none;scroll:none'></th><th style='width:300px; display:none'></th><th style='width:300px; display:none'></th></tr><th></th><th></th></thead><tbody>";
        var contenido = "";
        var Encabezado2 = "<table class='table  table-hover' style='overflow:hidden'><thead style='overflow:hidden'><tr><th style='width:10px; display:none;scroll:none'></th><th style='width:300px; display:none'></th><th style='width:300px; display:none'></th></tr><th></th><th></th></thead><tbody>";
        var contenido2 = "";
        var ids = 0;
        //ids = ids + 1 alert
        $.each(lista, function (index, comida) {
//            alert(comida.id);
            switch (comida.quetabla) {
                case 1:
                    switch (tipoComida) {

                        case "almuerzo":
                            if (comida.id != 30) {
                                contenido = contenido + "<tr><td  style='width:15px; padding-bottom:2px;padding-top:2px' ><input id='check" + String(comida.id) + "' type='checkbox' onchange='CargarListaComidas(" + comida.id + ")' 'checked' style='width:10px;height:'/></td><td  style='width:300px;large; padding-bottom:2px;padding-top:2px' onclick='checkClick(" + comida.id + ")'>" + comida.apodo + "</td><td  style='large; padding-bottom:2px;padding-top:2px' onclick='checkClick(" + comida.id + ")'>" + comida.descripcion +
                        "</td><td style='display: none;' id='comidaId" + comida.id + "'>" + comida.id + "</td><td style='display: none;' id='comidaApodo" + comida.id + "'>" + comida.apodo + "</td><td style='display: none;' id='comidaTipificacion" + comida.id + "'>" + comida.tipificacion + "</td><td style='display: none;' id='comidaTipo" + comida.id + "'>" + comida.Es + "</td>";
                            }
                            break;
                        case "cena":
                            if (comida.id != 29) {
                                //                        contenido = contenido + "<tr><td  style='cursor:auto'>" + comida.apodo + "</td><td  style='cursor:auto'><input id='check" + String(index) + "' type='checkbox' onclick='CargarListaComidas(" + index + ")' 'checked' style='width:30px;height:30px'/></td><td  style='cursor:auto'>" + comida.id +
                                //                        "</td><td style='display: none;' id='comidaId" + index + "'>" + comida.id + "</td><td style='display: none;' id='comidaApodo" + index + "'>" + comida.apodo + "</td><td style='display: none;' id='comidaTipificacion" + index + "'>" + comida.tipificacion + "</td><td style='display: none;' id='comidaTipo" + index + "'>" + comida.Es + "</td>";
                                contenido = contenido + "<tr><td  style='width:15px; padding-bottom:2px;padding-top:2px' ><input id='check" + String(comida.id) + "' type='checkbox' onchange='CargarListaComidas(" + comida.id + ")' 'checked' style='width:10px;height:'/></td><td  style='width:300px;large; padding-bottom:2px;padding-top:2px' onclick='checkClick(" + comida.id + ")'>" + comida.apodo + "</td><td  style='large; padding-bottom:2px;padding-top:2px' onclick='checkClick(" + comida.id + ")'>" + comida.descripcion +
                        "</td><td style='display: none;' id='comidaId" + comida.id + "'>" + comida.id + "</td><td style='display: none;' id='comidaApodo" + comida.id + "'>" + comida.apodo + "</td><td style='display: none;' id='comidaTipificacion" + comida.id + "'>" + comida.tipificacion + "</td><td style='display: none;' id='comidaTipo" + comida.id + "'>" + comida.Es + "</td>";
                            }
                            break;
                    }
                    break;
                case 2:
                    switch (tipoComida) {

                        case "almuerzo":
                            if (comida.id != 30) {
                                contenido2 = contenido2 + "<tr><td  style='width:15px; padding-bottom:2px;padding-top:2px' ><input id='check" + String(comida.id) + "' type='checkbox' onchange='CargarListaComidas(" + comida.id + ")' 'checked' style='width:10px;height:'/></td><td  style='width:300px;large; padding-bottom:2px;padding-top:2px' onclick='checkClick(" + comida.id + ")'>" + comida.apodo + "</td><td  style='large; padding-bottom:2px;padding-top:2px' onclick='checkClick(" + comida.id + ")'>" + comida.descripcion +
                        "</td><td style='display: none;' id='comidaId" + comida.id + "'>" + comida.id + "</td><td style='display: none;' id='comidaApodo" + comida.id + "'>" + comida.apodo + "</td><td style='display: none;' id='comidaTipificacion" + comida.id + "'>" + comida.tipificacion + "</td><td style='display: none;' id='comidaTipo" + comida.id + "'>" + comida.Es + "</td>";
                            }
                            break;
                        case "cena":
                            if (comida.id != 29) {
                                //                        contenido = contenido + "<tr><td  style='cursor:auto'>" + comida.apodo + "</td><td  style='cursor:auto'><input id='check" + String(index) + "' type='checkbox' onclick='CargarListaComidas(" + index + ")' 'checked' style='width:30px;height:30px'/></td><td  style='cursor:auto'>" + comida.id +
                                //                        "</td><td style='display: none;' id='comidaId" + index + "'>" + comida.id + "</td><td style='display: none;' id='comidaApodo" + index + "'>" + comida.apodo + "</td><td style='display: none;' id='comidaTipificacion" + index + "'>" + comida.tipificacion + "</td><td style='display: none;' id='comidaTipo" + index + "'>" + comida.Es + "</td>";
                                contenido2 = contenido2 + "<tr><td  style='width:15px; padding-bottom:2px;padding-top:2px' ><input id='check" + String(comida.id) + "' type='checkbox' onchange='CargarListaComidas(" + comida.id + ")' 'checked' style='width:10px;height:'/></td><td  style='width:300px;large; padding-bottom:2px;padding-top:2px' onclick='checkClick(" + comida.id + ")'>" + comida.apodo + "</td><td  style='large; padding-bottom:2px;padding-top:2px' onclick='checkClick(" + comida.id + ")'>" + comida.descripcion +
                        "</td><td style='display: none;' id='comidaId" + comida.id + "'>" + comida.id + "</td><td style='display: none;' id='comidaApodo" + comida.id + "'>" + comida.apodo + "</td><td style='display: none;' id='comidaTipificacion" + comida.id + "'>" + comida.tipificacion + "</td><td style='display: none;' id='comidaTipo" + comida.id + "'>" + comida.Es + "</td>";
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
        cargarComidas(cargarAux);//// a este le tengo que decir de donde cargo. si de la temporal o la fja
    }
    function checkClick(index) {
        if ($("#check" + index).is(':checked')) {
            $("#check" + index).attr('checked', false);
            //alert("checkeo");
            $("#ListaComidas").slideUp(300).delay(800).fadeOut(400);
            $("#ListaComidas2").slideUp(300).delay(800).fadeOut(400);

//            $("#guardando").css('display', 'block');
//            $("#leyenda").css('display', 'block');
    
        } else {
           // alert("descheckeo");
             $("#check" + index).attr('checked', 'true');
             $("#ListaComidas").slideUp(300).delay(800).fadeOut(400);
             $("#ListaComidas2").slideUp(300).delay(800).fadeOut(400);
//             $("#guardando").css('display', 'block');
//             $("#leyenda").css('display', 'block');
         }

         $("#guardando").delay(800).show(0);
         $("#leyenda").delay(800).show(0);
        CargarListaComidas(index);
       
    }
    function CargarListaComidas(index) {
//        $("#guardando").show();
//        $("#leyenda").show();
        var check = 0;
        
       // $("#ListaComidas").css('display', 'none');

        if ($("#check" + index).is(':checked')) {
            check = 1;
            var comidaAux = {};
            comidaAux.id = $("#comidaId" + index).html();
            comidaAux.apodo = $("#comidaApodo" + index).html();
            comidaAux.tipificacion = $("#comidaTipificacion" + index).html();
            comidaAux.Es = tipoComida;
            comidaAux2 = comidaAux;
            if (comidaAux.id == 29) {
                var json = JSON.stringify({
                    //"Es": "almuerzo",
                    "idNutricion": idInternacion,
                    "fecha": fecha,
                    "comida": comidaAux,
                    "cuantos": "todos"
                });
                NutricionBorrarUnDetalle(json)
                for (i = 1; i < (comidaAux.id - 1); i++) {
                    $("#check" + i).attr('checked', false);
                }
            }

            if (comidaAux.id == 30) {
                var json = JSON.stringify({
                    //"Es": "cena",
                    "idNutricion": idInternacion,
                    "fecha": fecha,
                    "comida": comidaAux,
                    "cuantos": "todos"
                });
                NutricionBorrarUnDetalle(json)
                for (i = 1; i < (comidaAux.id - 1); i++) {
                    $("#check" + i).attr('checked', false);
                }
            }

            if (comidaAux.id < 29) {
            switch(comidaAux.Es){
                case "almuerzo":
                    var c = {};
                    c.id = 29;
                    c.Es = "almuerzo"
                    var json = JSON.stringify({
                        "idNutricion": idInternacion,
                        "fecha": fecha,
                        "comida": c,
                        "cuantos": "uno"
                    });
                    NutricionBorrarUnDetalle(json);
                    $("#check29").attr('checked', false);
                    break;
                case "cena":
                    var c = {};
                    c.id = 30;
                    c.Es = "cena"
                    var json = JSON.stringify({
                        "idNutricion": idInternacion,
                        "fecha": fecha,
                        "comida": c,
                        "cuantos": "uno"
                    });
                    NutricionBorrarUnDetalle(json);
                    $("#check30").attr('checked', false);
                    break;
            }

        } // fin witch
            var json = JSON.stringify({
                "idNutricion": idNutricion,
                "idInternacion": idInternacion,
                "idPaciente": idPaciente,
                "fecha": fecha
            });
            //alert("mas");
            NutricionGuardarEncabezadoYDetalle(json);
            //$("#ListaComidas").slideUp(300).delay(800).fadeIn(400);
        }

         //if ($("#check" + index).is(':unchecked'))
        else {
            var comidaAux = {};
            comidaAux.id = $("#comidaId" + index).html();
            comidaAux.apodo = $("#comidaApodo" + index).html();
            comidaAux.tipificacion = $("#comidaTipificacion" + index).html();
            comidaAux.Es = tipoComida;
            var json = JSON.stringify({
                "idNutricion": idInternacion,
                "fecha": fecha,
                "comida": comidaAux,
                "cuantos": "uno"
            });
//                        alert(comidaAux.id + "/" +
//                        comidaAux.apodo  + "/" +
//                        comidaAux.tipificacion + "/" +
            //                        comidaAux.Es + "/" + fecha + "/" + idInternacion);
            //alert("uno");
            NutricionBorrarUnDetalle(json);

        }
//        alert();
//        $("#guardando").css('display', 'none').delay(400);
//        $("#leyenda").css('display', 'none').delay(400);
//        $("#guardando").delay(400);
        //        $("#leyenda").delay(400);
        $("#guardando").delay(800).hide(0);
        $("#leyenda").delay(800).hide(0);

        $("#ListaComidas").slideUp(300).delay(800).fadeIn(400);
        $("#ListaComidas2").slideUp(300).delay(800).fadeIn(400);

    }
  

        $("#btnAceptar").click(function () {
            parent.location = "../AtInternados/Nutricion.aspx?como=" + como + "&indiceAseguir=" + indiceAseguir + "&cargarAux=" + cargarAux + "&queComida=" + queComida + "&idInternacion=" + idInternacion + "&idNutricion=" + idNutricion + "&cargarAux=" + cargarAux;
        });

        $("#btnCancelar").click(function () {
        alert(tipoComida);
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
            url: "../Json/AtConsultorio/AtConsultorio.asmx/NutricionTraerComidasTemporales",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            success: function (resultado) {
//                alert("temporales");
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
            //tipoComida                                                                   //////////////////////////////////////////////////////////////////////////////
        });
        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/cargarMenus",
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
//   alert("fijas");
                listaDietas = resultado.d;
               // alert(listaDietas.length);
                $.each(listaDietas, function (index, item) {
                                  // alert(item);
                    $("#check" + (item.id)).attr('checked', true);

                    if (item.id == 23) {
                        $("#check22").attr('checked', true);
                    }
                });
            }

            function NutricionGuardarEncabezadoYDetalle(json) {
               // $("#ListaComidas").css('display', 'none');
                $.ajax({
                    type: "POST",
                    url: "../Json/AtConsultorio/AtConsultorio.asmx/NutricionGuardarEncabezado",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: guardarDetalle,
//                    complete: function () {
//                        guardarDetalle();
//                    },
                    error: errores
                });

    function guardarDetalle(resultado) {

       // alert(comidaAux2.id + "/" + comidaAux2.apodo + "/" + comidaAux2.tipificacion + "/" + comidaAux2.Es);       /////////////////////////////////////////////////////////////////////////////comidaAux2

        idNutricion = resultado.d;
        var json = JSON.stringify({
            "idNutricion": idNutricion,
            "fechaComida": fecha,
            "comida": comidaAux2        
        });
//        alert(comidaAux2.id + "/" +
//            comidaAux2.apodo + "/" +
//            comidaAux2.tipificacion + "/" +
//            comidaAux2.Es);

        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/NutricionGuardarDetalle",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //                        success: function () {
            //                                            alert("Guardado");
            //                            $("#ListaComidas").css('display', 'inherit');
            //                        },
            complete: function () {
                //  comidaAux2.id = 0;
               // $("#ListaComidas").css('display', 'inherit');
                // $("#ListaComidas").slideUp(300).delay(800).fadeIn(400);

            },
            error: errores
        });
    }
}

function NutricionBorrarDetalle(json) {
   // $("#ListaComidas").css('display', 'none');
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/NutricionBorrarDetalle",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        complete: function () {
           // $("#ListaComidas").css('display', 'inherit');
            // $("#fancybox-wrap").attr('hideOnOverlayClick', false);
           // $("#ListaComidas").slideUp(300).delay(800).fadeIn(400);
        },
        error: errores
    });
}

function NutricionBorrarUnDetalle(json) {
   // $("#ListaComidas").css('display','none');
    //$('#hideOnOverlayClick').hide();
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/NutricionBorrarUnDetalle",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        complete: function () {
            //$("#ListaComidas").css('display', 'inherit');
            // $("#fancybox-wrap").attr('hideOnOverlayClick', false);
            //$("#ListaComidas").slideUp(300).delay(800).fadeIn(400);
        },
        error: errores
    });
}