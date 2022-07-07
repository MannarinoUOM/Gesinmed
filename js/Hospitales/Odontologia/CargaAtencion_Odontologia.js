var dientes = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38, 55, 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75]
var codPasar = [0801]
var color = "";
var procedimientos = new Array();
var procedimientosHistorial = new Array();
var id = 0;
//var estadoOdontograma = "Ir a Historial";
var estadoOdontograma = "Editar";
var fechaConsulta = "";
var carasIdS = [];
var carasInicial = [];
var padding = "6px"
var XHC = 0;

$(document).ready(function () {

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        CargarPacienteID(NHC);

        if (GET["F"] != "" && GET["F"] != null) {
            fechaConsulta = GET["F"];
            //alert(fechaConsulta);
        }
        CargarConsultasHistorial(NHC);
    }


    if (GET["XHC"] != "" && GET["XHC"] != null) {
     //   alert("paso");
        XHC = GET["XHC"];

        if (XHC == "0") { traerTunoId(); }
        if (XHC == "1") { soloVer(); }
     //   alert(XHC);
    }


    cargarMapa();
    cargarPiezas();
    cargarCodigos();
    //cargarCaras();

    //    $('#btnGuardar').toggle(

    //    /* 
    //    Primer click.
    //    Función que descubre un panel oculto
    //    y cambia el texto del botón.
    //    */
    //        function (e) {
    //            $('#boca').show("slide", { direction: "left" }, 1000);
    //            $(this).text('Cerrar el panel');
    //            e.preventDefault();
    //        }, // Separamos las dos funciones con una coma

    //    /* 
    //    Segundo click.
    //    Función que oculta el panel
    //    y vuelve a cambiar el texto del botón.
    //    */
    //        function (e) {
    //            $('#boca').hide("slide", { direction: "left" }, 1000); ;
    //            $(this).text('Mostrar el panel');
    //            e.preventDefault();
    //        }

    //    );


});

//$("#btn_q_odonto").live("click", function () {
//    
//    if (estadoOdontograma == "Ir a Historial") {
//        padding = "6px";
//        estadoOdontograma = "Ir a Editar";
//        //$(this).attr('title', "hola");
//        $("#lblFechaVisualizacion").html("<b>Odontograma Editar</b>");
//        cargarMapa(); traerConsultaOdontogramaEdicion($("#TurnoId").val());
//    } else { padding = "0px"; estadoOdontograma = "Ir a Historial"; cargarMapa(); traerUltimoOdontograma(); $("#lblFechaVisualizacion").html("<b>Odontograma Historial</b>"); }
//});

$("#btn_q_odonto").live("click", function () {
    color = "";
    if (estadoOdontograma == "Historial") {
        //alert("if");
        padding = "6px";
        estadoOdontograma = "Editar";
        $("#lblFechaVisualizacion").html("<b>Odontograma Historial</b>");
        cargarMapa(); traerUltimoOdontograma();
    } else {
        //alert("else");
        padding = "0px";
        estadoOdontograma = "Historial";
        $("#lblFechaVisualizacion").html("<b>Odontograma Editar</b>");
        cargarMapa(); traerConsultaOdontogramaEdicion($("#TurnoId").val());
    }
});


$(".diente").live("click", function () {
    if (!$(this).hasClass("bloquear")) {
        if ($(this).hasClass("rojo") && color == "rgb(255, 0, 0)") { $(this).removeClass("rojo"); $(this).removeClass("azul"); } else if (!$(this).hasClass("rojo") && color == "rgb(255, 0, 0)") { $(this).addClass("rojo"); } else if ($(this).hasClass("rojo") && color == "rgb(0, 0, 255)") { $(this).addClass("azul"); }
        if ($(this).hasClass("azul") && color == "rgb(0, 0, 255)") { $(this).removeClass("azul"); $(this).removeClass("rojo"); } else if (!$(this).hasClass("azul") && color == "rgb(0, 0, 255)") { $(this).addClass("azul"); } else if ($(this).hasClass("azul") && color == "rgb(255, 0, 0)") { $(this).addClass("rojo"); }
    }
});


$('#btnGuardar').click(function () {
    //alert($("#TurnoId").val());
    var count = 0;
    $.each(procedimientos, function (index, item) { if (item.eliminado == 1) { count += 1; } });
    if (count == procedimientos.length) { alert("Cargue algun procedimiento para guardar"); return false; } else {
        var json = JSON.stringify({ "TurnoId": $("#TurnoId").val(), "procedimientos": procedimientos });
        $.ajax({
            type: "POST",
            url: "../Json/Odontologia.asmx/GuardarOdontologiaDet",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                //verificarConsultaG();
               // alert("paso");
                GuardarConsultaG();
            },
            complete: function () { guardarOdontograma(); },
            error: errores
        });
    }

});


function guardarOdontograma() {
    var dientes = new Array();
    var partes = new Array();
    var cuantosAsignados = 0;
    $(".asignado").each(function (index, item) {
        var diente = {};
        diente.TurnoId = $("#TurnoId").val();
        diente.id = $(this).attr("id");
        diente.procedimiento = $(this).data("procedimiento");
        dientes.push(diente);

        $(".diente").each(function (index, item) {
            if ($(this).data("pertece") == diente.id && $(this).css("background-color") != "rgb(216, 216, 216)") {
                var parte = {};
                parte.TurnoId = $("#TurnoId").val();
                parte.diente = diente.id;
                parte.color = $(this).css("background-color");
                parte.seccion = $(this).data("parte");
                partes.push(parte);
            }
        });
        cuantosAsignados += 1;
    });
    //alert(cuantosAsignados);
    //    $.each(dientes, function (index, item) {
    //        alert("id: " + item.id + "procedimiento: " + item.procedimiento);
    //        $.each(partes, function (index, item) { alert("color: " + item.color + "seccion: " + item.seccion); });

    //    });
    if (cuantosAsignados > 0) {
        var json = JSON.stringify({ "dientes": dientes, "partes": partes, "TurnoId": $("#TurnoId").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Odontologia.asmx/GuardarOdontogramaCab",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            complete: function () {
                parent.$("#opcionFA").show();
                parent.$.fancybox.close();
            },
            error: errores
        });
    } else {
        parent.$("#opcionFA").show();
        parent.$.fancybox.close();
    }
}

$(".asignar").live("click", function () {
    if (!$(this).hasClass("bloquear")) {
        $.fancybox({
            'href': "../Odontologia/Seleccion_Referencia_Odontologia.aspx?id=" + $(this).attr("id"),
            'width': '60%',
            'height': '60%',
            'autoScale': false,
            'transitionIn': 'elastic',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'preload': true,
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            }

        });
    }
});

$(".color").live("click", function () {
    //alert(estadoOdontograma);
    if (estadoOdontograma == "Historial") {
        if (!$(this).hasClass("seleccion")) {
            $(".color").removeClass("seleccion");
            $(".color").css({ opacity: "1" });
            $(".color").css("cursor", "pointer");
            $(this).addClass("seleccion");
            $(this).css({ opacity: ".5" });
            $(this).css("cursor", "default");
            color = $(this).css("background-color");
        }
    }
});


function cargarPiezas() {
    $("#cboPiezas").append(new Option("Pieza", 0));
    $.each(dientes, function (index, item) {
        $("#cboPiezas").append(new Option(item, item));
    });
}


function cargarCodigos() {

    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerNomencladorOdontologico",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#cboCodigos").append(new Option("Código", 0));
            $.each(Resultado.d, function (index, item) {
                $("#cboCodigos").append(new Option(item.descripcion, item.codigo));
            });
        },
        error: errores
    });

}

////function cargarCaras() {

////    $.ajax({
////        type: "POST",
////        url: "../Json/Odontologia.asmx/TraerCarasOdontologia",
////        contentType: "application/json; charset=utf-8",
////        dataType: "json",
////        success: function (Resultado) {
////            $.each(Resultado.d, function (index, item) {
////               // $("#txtCaras").append(new Option(item.descripcion, item.id));
////            });
////        },
////        error: errores
////    });

////}

function traerTunoId() {

    //var json = JSON.stringify({ "Fecha": parent.$("#txtFecha").val(), "Medico": parent.$("#cbo_Medico").val(), "Especialidad": parent.$("#cboEspecialidadDA").val(), "Afiliado": parent.$("#afiliadoId").val() });
    var json = JSON.stringify({ "Fecha": fechaConsulta, "Medico": parent.$("#cbo_Medico").val(), "Especialidad": parent.$("#cboEspecialidadDA").val(), "Afiliado": parent.$("#afiliadoId").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerTurnoIdOdontologia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) { $("#TurnoId").val(Resultado.d); traerConsultaDelDia(Resultado.d); },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function cargarMapa() {

    var cabeza = "<table>";
    var fila = "<tr style='text-aling:center'>";
    var pie = "</tr></table>";
    var filaMenor = 0;
    var lineaH = "";
    var lineaV = "";
    $.each(dientes, function (index, item) {


        if ((index + 1) < 33) {
            if ((index + 1) % 16 == 1) {
                if ((index + 1) == 1) { lineaH = "lineaH"; } else { lineaH = ""; }
                fila +=
    "</tr><tr style='text-aling:center' class='" + lineaH + "'><td style='position:relative'>" +
    "<a id='" + item + "' class='btn btn-mini asignar' style='width:40px; padding:0px' data-procedimiento='0' ><label style='font-size:9px; width:10px;height:10px;display:inline-table'>" + item + "|</label><img class='imgProcedimiento' id='img_" + item + "' width='15px' height='15px' style='display:none'/></a>" +
    "<div id='ausente_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/x.png' style=' float:rigth'/></div>" +
    "<div id='corona_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/O.png' style=' float:rigth; opacity: 0.2; filter: alpha(opacity=20); margin-top:4%'/></div>" +
    "<div class='part_izq diente' data-pertece='" + item + "' data-parte='1'></div>" +
    "<div style='display:inline-block; margin:0px'>" +
    "<div class='part_cen diente' data-pertece='" + item + "' data-parte='2'></div>" +
    "<div class='part_cen diente' data-pertece='" + item + "' data-parte='3'></div>" +
    "<div class='part_cen diente' data-pertece='" + item + "' data-parte='4'></div>" +
    "</div>" +
    "<div class='part_der diente' data-pertece='" + item + "' data-parte='5'></div></td>";

            }
            else {
                if (item == 11 || item == 41) { lineaV = "lineaV"; } else { lineaV = ""; }
                fila +=
    "<td class='" + lineaV + "' style='position:relative'>" +
    "<a id='" + item + "'  class='btn btn-mini asignar'  style='width:40px; padding:0px' data-procedimiento='0' ><label style='font-size:9px; width:10px;height:10px;display:inline-table'>" + item + "|</label><img class='imgProcedimiento' id='img_" + item + "' width='15px' height='15px' style='display:none'/></a>" +
    "<div id='ausente_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/x.png' style=' float:rigth'/></div>" +
    "<div id='corona_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/O.png' style=' float:rigth; opacity: 0.2; filter: alpha(opacity=20); margin-top:4%'/></div>" +
    "<div class='part_izq diente' data-pertece='" + item + "' data-parte='1'></div>" +
    "<div style='display:inline-block; margin:auto'>" +
    "<div class='part_cen diente' data-pertece='" + item + "' data-parte='2'></div>" +
    "<div class='part_cen diente' data-pertece='" + item + "' data-parte='3'></div>" +
    "<div class='part_cen diente' data-pertece='" + item + "' data-parte='4'></div>" +
    "</div>" +
    "<div class='part_der diente' data-pertece='" + item + "' data-parte='5'></div></td>";
            }
        }
        if ((index + 1) == 33) { fila += "</tr><tr>"; }
        if ((index + 1) > 33) {
            filaMenor += 1;
            if (filaMenor % 10 == 1) {
                //if ((index + 1) == 34) { lineaH = "lineaH"; } else { lineaH = ""; }
                lineaH = "lineaH";
                if (item >= 75 && item <= 85) { lineaH = ""; }
                fila += "</tr><tr><td></td><td></td><td></td><td class='" + lineaH + "' style='position:relative'>" +
                "<a  id='" + item + "' class='btn btn-mini asignar'  style='width:40px; font-size:xx-small; padding:0px' data-procedimiento='0' ><label style='font-size:9px; width:10px;height:10px;display:inline-table'>" + item + "|</label><img class='imgProcedimiento' id='img_" + item + "' width='15px' height='15px' style='display:none'/></a>" +
                "<div id='ausente_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/x.png' style=' float:rigth'/></div>" +
                "<div id='corona_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/O.png' style=' float:rigth; opacity: 0.2; filter: alpha(opacity=20); margin-top:4%'/></div>" +
                            "<div class='part_izq diente' data-pertece='" + item + "' data-parte='1'></div>" +
                            "<div style='display:inline-block; margin:0px'>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='2'></div>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='3'></div>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='4'></div>" +
                            "</div>" +
                            "<div class='part_der diente' data-pertece='" + item + "' data-parte='5'></div></td>";
            } else {
                if (item == 51 || item == 81) { lineaV = "lineaV"; } else { lineaV = ""; }

                switch ((index + 1)) {
                    case 43:
                        //alert(item);

                        fila += "<td class='" + lineaH + "' style='position:relative'>" +
                        "<a  id='" + item + "' class='btn btn-mini asignar'  style='width:40px; font-size:xx-small; padding:0px' data-procedimiento='0' ><label style='font-size:9px; width:10px;height:10px;display:inline-table'>" + item + "|</label><img class='imgProcedimiento' id='img_" + item + "' width='15px' height='15px' style='display:none'/></a>" +
                        "<div id='ausente_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/x.png' style=' float:rigth'/></div>" +
                        "<div id='corona_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/O.png' style=' float:rigth; opacity: 0.2; filter: alpha(opacity=20); margin-top:4%'/></div>" +
                            "<div class='part_izq diente' data-pertece='" + item + "' data-parte='1'></div>" +
                            "<div style='display:inline-block; margin:0px'>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='2'></div>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='3'></div>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='4'></div>" +
                            "</div>" +
                            "<div class='part_der diente' data-pertece='" + item + "' data-parte='5'></div></td><td></td><td></td><td>" +
                            "<div style='width:40px; height:20px; background-color:Red; cursor:pointer' class='color'></div>" +
                            "<div style='width:40px; height:20px; background-color:Blue; cursor:pointer' class='color'></div>" +
                            "<a id='btn_q_odonto' class='btn btn-mini pull-left' style='padding-left:" + padding + "; padding-right:" + padding + "'>" + estadoOdontograma + "</a></td>";

                        break;
                    case 53:

                        fila += "<td class='" + lineaH + " " + lineaV + "' style='position:relative'>" +
                        "<a  id='" + item + "' class='btn btn-mini asignar'  style='width:40px; font-size:xx-small; padding:0px' data-procedimiento='0' ><label style='font-size:9px; width:10px;height:10px;display:inline-table'>" + item + "|</label><img class='imgProcedimiento' id='img_" + item + "' width='15px' height='15px' style='display:none'/></a>" +
                        "<div id='ausente_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/x.png' style=' float:rigth'/></div>" +
                        "<div id='corona_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/O.png' style=' float:rigth; opacity: 0.2; filter: alpha(opacity=20); margin-top:4%'/></div>" +
                            "<div class='part_izq diente' data-pertece='" + item + "' data-parte='1'></div>" +
                            "<div style='display:inline-block; margin:0px'>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='2'></div>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='3'></div>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='4'></div>" +
                            "</div>" +
                            "<div class='part_der diente' data-pertece='" + item + "' data-parte='5'></div></td><td></td><td></td><td></td>";
                        break;
                    default:
                        //alert(item);
                        if (item > 84) { lineaH = ""; }
                        fila += "<td class='" + lineaH + " " + lineaV + "' style='position:relative'>" +
                        "<a  id='" + item + "' class='btn btn-mini asignar'  style='width:40px; font-size:xx-small; padding:0px' data-procedimiento='0' ><label style='font-size:9px; width:10px;height:10px;display:inline-table'>" + item + "|</label><img class='imgProcedimiento' id='img_" + item + "' width='15px' height='15px' style='display:none'/></a>" +
                        "<div id='ausente_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/x.png' style=' float:rigth'/></div>" +
                        "<div id='corona_" + item + "' style='position:absolute; display:none'><img src='../img/Odontologia/O.png' style=' float:rigth; opacity: 0.2; filter: alpha(opacity=20); margin-top:4%'/></div>" +
                            "<div class='part_izq diente' data-pertece='" + item + "' data-parte='1'></div>" +
                            "<div style='display:inline-block; margin:0px'>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='2'></div>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='3'></div>" +
                            "<div class='part_cen diente' data-pertece='" + item + "' data-parte='4'></div>" +
                            "</div>" +
                            "<div class='part_der diente' data-pertece='" + item + "' data-parte='5'></div></td>";
                        break;
                }
            }
        }
    });
    $("#boca").html(cabeza + fila + pie);
    //alert(XHC);
    if (XHC == 1) { $("#btn_q_odonto").hide(); }
}

function traerConsultaDelDia(TurnoId) {
    //alert(TurnoId);
    var json = JSON.stringify({ "TurnoId": TurnoId });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerConsultaDelDiaOdontologia",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            //alert("termino");
            procedimientos.length = 0;
            procedimientos = Resultado.d;
            //alert("longi " + procedimientos.length);
            cargarProcedimientos(procedimientos, 0);
        },
        error: errores
    });

}

function traerConsultaSeleccionada(TurnoId) {
    //alert(TurnoId);
    var json = JSON.stringify({ "TurnoId": TurnoId });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerConsultaDelDiaOdontologia",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            //alert("termino");
            procedimientosHistorial.length = 0;
            procedimientosHistorial = Resultado.d;
            //alert("longi " + procedimientos.length);
            cargarProcedimientos(procedimientosHistorial, 1);
            $("#lblFechaVisualizacion").html("<b>Odontograma del " + $("#fecha" + TurnoId).html() + "</b>");
        },
        complete: traerConsultaOdontograma(TurnoId),
        error: errores
    });

}

$("#btnAgregar").click(function () {

    //alert($.inArray(parseInt($("#cboCodigos option:selected").val()), codPasar));

    console.log("codPasar: " + codPasar);
    if ($("#cboCodigos").val() == 0) { alert("Seleccione un código"); return false; }
    if ($.inArray(parseInt($("#cboCodigos option:selected").val()), codPasar) == -1)
    { if ($("#cboPiezas").val() == 0) { alert("Seleccione una pieza"); return false; } }


    //if (carasIdS.length == 0) { alert("Seleccione al menos una cara"); return false; }

    var obj = {};
    obj.id = 0;
    obj.codigo = $("#cboCodigos option:selected").val();
    obj.pieza = $("#cboPiezas").val();
    //obj.caras = $("#txtCaras").val();

    if (carasIdS.length > 0) {
        obj.caras = carasIdS.join(",");
        obj.caraDescripcion = carasInicial.join("+");
    }

    //obj.caraDescripcion = $("#txtCaras option:selected").text();
    obj.observacion = $("#txtObservacion").val();
    obj.eliminado = 0;
    procedimientos.push(obj);
    // alert(procedimientos.length);
    cargarProcedimientos(procedimientos, 0);

    $("#cboCodigos").val(0);
    $("#cboPiezas").val(0);
    $("#txtCaras").text("Ubicación");
    $("#txtObservacion").val("");
    carasIdS.length = 0;
    carasInicial.length = 0;
});

function cargarProcedimientos(lista,borrar) {
    var encabezado = "<table class='table table-condensed' style='table-layout:fixed;width:250px'><thead><tr style='background-color:#CCCCCC'>" +
    "<th class='celdaChica' style='width:60px'>Código</th><th class='celdaChica'  style='width:60px'>Pieza</th><th class='celdaMediana'  style='width:100px'>Caras</th><th class='celdaMediana'>Observación</th><th class='celdaChica' style='width:60px'>Eliminar</th></tr></thead><tbody>";
    var fila = "";
    var pie = "</tbody></table>"
    var mostrar = ""; // $("#btnHoy").hide();  $("#btnHoy").show();
    if (borrar == 1) { mostrar = "none"; $("#btnAgregar").hide(); } else { mostrar = "inline"; $("#btnAgregar").show(); }
    $.each(lista, function (index, item) {
        if (item.eliminado == 0) {
            if (item.caraDescripcion == undefined) { item.caraDescripcion = ""; }
            var pieza = "";
            if (item.pieza == 0) { pieza = ""; } else { pieza = item.pieza; }
            fila += "<tr style='; border-bottom-color:#CCCCCC; border-bottom-width:2px; border-bottom-style:solid'><td>" + item.codigo + "</td><td>" + pieza + "</td><td>" + item.caraDescripcion + "</td><td>" + item.observacion + "</td><td><a class='btn btn-danger btn-mini' style='display:" + mostrar + "' onclick='borrar(" + index + ")' title='Eliminar'><i class='icon-remove-circle'></i></a></td><td id='id" + index + "' style='display:none'>" + item.id + "</td></tr>";
        }
    });
    $("#carga").html(encabezado + fila + pie);
}

function borrar(index) {
    var id = $("#id" + index).html();
    //alert("iddddd "  + id);
    procedimientos[index].eliminado = 1; cargarProcedimientos(procedimientos,0);
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/EliminarDetalleOdontologia",
        data: '{id: "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores
    });
}

$("#btnCancelar").click(function () {
    if (XHC == 1) { parent.$("#cargando").hide(); }
    parent.$.fancybox.close();
});




function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Cargado,
        complete: traerUltimoOdontograma,
        error: errores
    });
}

function Cargar_Paciente_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {

        if (paciente.NHC != null && paciente.NHC != '') {
            //$("#desdeaqui").show();
            //TieneUltimo(paciente.NHC);
        }

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);
        $("#afiliadoId").val(paciente.documento);
        $("#txt_dni").attr('value', paciente.documento_real);
        NHC = paciente.documento;
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        //CargarHC(paciente.documento);

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);

        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);

        $("#CargadoFechaNac").html(paciente.fecha_nacimiento);
        $("#CargadoPatologia").html(paciente.fecha_nacimiento);

        if (paciente.localidad != null) { $("#CargadoLocalidad").html(paciente.localidad.substring(0, 15)); }
        
        if (paciente.Nro_Seccional != "999") {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else {
            $("#CargadoSeccional").html("Sin Seccionalizar");
        }

        if (paciente.Nro_Seccional != 998) {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else $("#CargadoSeccional").html(paciente.ObraSocial);

        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

    });
}


$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

function CargarConsultasHistorial(AfiliadoId) {
    // var json = JSON.stringify({ "AfiliadoId": AfiliadoId, "fecha": parent.$("#txtFecha").val() });
    //alert(fechaConsulta);
    var json = JSON.stringify({ "AfiliadoId": AfiliadoId, "fecha": fechaConsulta, "odonto": XHC });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerConsultasOdontologicas",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {

            var cabeza = "<table class='table-hover'><tr><td><b>Historial de Consultas</b></td></tr>";
            var fila = "";
            var pie = "</table>";
            $.each(Resultado.d, function (index, item) {
                //alert(item.odonto);
                if (item.odonto == 1) {
                    fila += "<tr style='cursor:pointer; background-color:Red' onclick='traerConsultaSeleccionada(" + item.turnoId + ")'><td id='fecha" + item.turnoId + "'>" + item.fecha + "</td></tr>";
                } else {
                    fila += "<tr style='cursor:pointer' onclick='traerConsultaSeleccionada(" + item.turnoId + ")'><td id='fecha" + item.turnoId + "'>" + item.fecha + "</td></tr>";
                }
            });

            $("#consultas").html(cabeza + fila + pie);
        },
        error: errores
    });
}

function verificarConsultaG() {
    //alert("verifica");
    // var json = JSON.stringify({ "AfiliadoId": $("#afiliadoId").val(), "fecha": parent.$("#txtFecha").val(), "MedicoId": parent.$("#cbo_Medico").val() });
    var json = JSON.stringify({ "AfiliadoId": $("#afiliadoId").val(), "fecha": fechaConsulta, "MedicoId": parent.$("#cbo_Medico").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerConsultaGOdontologia",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            //alert("consultag " + Resultado.d);
            if (Resultado.d == 0) { GuardarConsultaG(); }

        },
        error: errores
    });
}

function GuardarConsultaG() {
    var json = JSON.stringify({ "AfiliadoId": $("#afiliadoId").val(), "fecha": parent.$("#txtFecha").val(), "medico": parent.$("#cbo_Medico").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/InsertarConsultaGOdontologia",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            //alert("Guardado");
        },
        error: errores
    });
}


function traerUltimoOdontograma() {
    var TunosIds = "";
    var json = JSON.stringify({ "AfiliadoId": $("#afiliadoId").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerUltimoOdontogramaCab",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            //alert(Resultado.d);
            //if (Resultado.d == undefined) { $("#lblFechaVisualizacion").html("<b>Odontograma de hoy</b>"); } else { $("#lblFechaVisualizacion").html("<b>Odontograma Historial</b>"); }
            if (estadoOdontograma == "Historial") { $("#lblFechaVisualizacion").html("<b>Odontograma Editar</b>"); } else { $("#lblFechaVisualizacion").html("<b>Odontograma Historial</b>"); }
            $.each(Resultado.d, function (index, item) {
                //alert("TurnoId: " + item.TurnoId + " id: " + item.id + " procedimiento: " + item.procedimiento); 
                //alert($("#" + item.id).text());
                TunosIds += item.TurnoId + ",";
                //alert(TunosIds);
                $("#img_" + item.id).attr("src", "../img/Odontologia/odonto_" + item.procedimiento + ".png");
                $("#img_" + item.id).show();
                if (Resultado.d.length == index + 1) { TraerUltimoOdontogramaPartes(TunosIds); }
            });
        },
        complete: function () { $(".asignar").addClass("bloquear"); $(".asignar").css("cursor", "default"); $(".diente").addClass("bloquear"); },
        error: errores
    });
}

function TraerUltimoOdontogramaPartes(TunosIds) {
    //alert("este" + TunosIds);return false;
    var json = JSON.stringify({ "TurnosIds": TunosIds });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerUltimoOdontogramaDet",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            $.each(Resultado.d, function (index, item1) {
                //alert("TurnoId: " + item.TurnoId + " seccion: " + item.seccion + " color: " + item.color + " diente: " + item.diente); 
                //"<div class='part_izq diente' data-pertece='" + item + "' data-parte='1'></div>" +
                $(".diente").each(function (index, item2) {
                    if ($(this).data("pertece") == item1.diente && $(this).data("parte") == item1.seccion) { $(this).css("background-color", item1.color); }
                    
                });
            });
        },
        //complete: function () { $(".diente").addClass("bloquear"); },
        error: errores
    });
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function traerConsultaOdontograma(TurnoId) {
    //alert();
    //$("·diente").css("background-color", "rgb(204, 204, 204");
    //var TunosIds = "";
    var json = JSON.stringify({ "TurnoId": TurnoId });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerOdontogramaConsultaCab",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            $('img').attr("src", "");
            $.each(Resultado.d, function (index, item) {
                //alert("TurnoId: " + item.TurnoId + " id: " + item.id + " procedimiento: " + item.procedimiento); 
                //alert($("#" + item.id).text());
                //TunosIds += item.TurnoId + ",";
                //alert(TunosIds);

                $("#img_" + item.id).attr("src", "../img/Odontologia/odonto_" + item.procedimiento + ".png");
                $("#img_" + item.id).show();
                if (Resultado.d.length == index + 1) { TraerConsultaOdontogramaPartes(TurnoId); }   
            });
        },
        complete: function () { $(".asignar").addClass("bloquear"); $(".asignar").css("cursor", "default"); },
        error: errores
    });
}

function TraerConsultaOdontogramaPartes(TurnoId) {
    //alert("este" + TunosIds);return false;
    var json = JSON.stringify({ "TurnoId": TurnoId });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerOdontogramaConsultaDet",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            $(".diente").css("background-color", "#D8D8D8");
            $.each(Resultado.d, function (index, item1) {
                //alert("TurnoId: " + item.TurnoId + " seccion: " + item.seccion + " color: " + item.color + " diente: " + item.diente); 
                //"<div class='part_izq diente' data-pertece='" + item + "' data-parte='1'></div>" +

                $(".diente").each(function (index, item2) {
                    if ($(this).data("pertece") == item1.diente && $(this).data("parte") == item1.seccion) { $(this).css("background-color", item1.color); }
                    else { $(this).css("background-color", "#D8D8D8"); }
                });
            });
        },
        error: errores
    });
}

$("#btnHoy").click(function () {
    cargarProcedimientos(procedimientos);
});




//////////////////////traer odontograma para edicion
function traerConsultaOdontogramaEdicion(TurnoId) {
    //var TunosIds = "";
    var json = JSON.stringify({ "TurnoId": TurnoId });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerOdontogramaConsultaCab",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            $('.imgProcedimiento').attr("src", "");
            $.each(Resultado.d, function (index, item) {
                //alert("TurnoId: " + item.TurnoId + " id: " + item.id + " procedimiento: " + item.procedimiento); 
                //alert($("#" + item.id).text());
                //TunosIds += item.TurnoId + ",";
                //alert(item.procedimiento);
                $("#" + item.id).attr('data-procedimiento', item.procedimiento);
                $("#" + item.id).addClass("asignado");
                $("#img_" + item.id).attr("src", "../img/Odontologia/odonto_" + item.procedimiento + ".png");
                $("#img_" + item.id).show();
                TraerConsultaOdontogramaPartesEdicion(TurnoId);
                //if (Resultado.d.length == index + 1) { TraerConsultaOdontogramaPartesEdicion(TurnoId); }
            });
        },
        // complete: function () { $(".asignar").addClass("bloquear"); $(".asignar").css("cursor", "default"); },
        error: errores
    });
}

function TraerConsultaOdontogramaPartesEdicion(TurnoId) {
    //alert();
    //alert("este" + TunosIds);return false;
    var json = JSON.stringify({ "TurnoId": TurnoId });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerOdontogramaConsultaDet",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            $(".diente").removeClass("rojo");
            $(".diente").removeClass("zaul");
            var color = "";
            //$(".diente").addClass("azul");
            //$(".diente").css("background-color", "#D8D8D8");
            $.each(Resultado.d, function (index, item1) {
                //alert("TurnoId: " + item.TurnoId + " seccion: " + item.seccion + " color: " + item.color + " diente: " + item.diente); 
                //"<div class='part_izq diente' data-pertece='" + item + "' data-parte='1'></div>" +

                $(".diente").each(function (index, item2) {
                    if (item1.color == "rgb(255, 0, 0)") { color = "rojo" }
                    if (item1.color == "rgb(0, 0, 255)") { color = "azul" }

                    if ($(this).data("pertece") == item1.diente && $(this).data("parte") == item1.seccion) { $(this).addClass(color); }

                });
            });
        },
        error: errores
    });
}

$("#txtCaras").click(function () {
    $.fancybox({
        'href': "../Odontologia/Seleccion_Caras_Odontologia.aspx",
        'width': '10%',
        'height': '40%',
        'autoScale': false,
        'transitionIn': 'elastic',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'preload': true,
        'onComplete': function f() {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function () {
                jQuery.fancybox.hideActivity();
            });
        },
        'onClosed': function () {
        if(carasInicial.length > 0)
            $("#txtCaras").text(carasInicial.join("+"));
        }

    });
});

$("#btnVerOdontograma").click(function () { $("#ModalTraspasoProtocolo2").modal('show'); });


function soloVer() {
    $("#cboCodigos").hide();
    $("#cboPiezas").hide();
    $("#txtCaras").hide();
    $("#btnAgregar").hide();
    $("#btnHoy").hide();
    $("#btnGuardar").hide();
    $("#txtObservacion").hide();
}

