var fila = "";
var agregarFila = true;
var agregarFila2 = true;
var idFila = 1;
var ENTREGA_ID = 0;
var PDT_ID = 0;
var G_ExpIdenDetalle = 0; // id del expediente
var entregar = 0; // para ver si quiere entregar
var idsEntregadosImp = new Array();
var entregados = 0;
var maxIdFila = 0;
var P_ID = 0; //numero de pedido encabezado
var edicion = true;
var idFilaSeleccion = 0;

$(document).ready(function () {

    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    //id del deltalle del pedido
    if (GET["PDT_ID"] != "" && GET["PDT_ID"] != null) {
        ListaDocumentacion_Exp(GET["PDT_ID"]);
        //alert(GET["cargaRem"] + " cargaRem");
        PDT_ID = GET["PDT_ID"];
        //alert(PDT_ID + "PDT_ID");
        if (GET["cargaRem"] == "0") { generarTablaVacia(); } // cuando se carga por primera vez
        if (GET["cargaRem"] == "1") { cargarDetalles(GET["PDT_ID"]); } // cuando se carga con datos para solo ver
        if (GET["cargaRem"] == "2") { cargarTablaDatosPrevios(parent.detallesDesglose); } // cuando se carga con datos para seguir editando

 
    }

    //id del pedido
    if (GET["EXP_PED_ID"] != "" && GET["EXP_PED_ID"] != null) {
        P_ID = GET["EXP_PED_ID"];
    }

    // id del expediente
    if (GET["EXP_PED_EXP_ID"] != "" && GET["EXP_PED_EXP_ID"] != null) {
        G_ExpIdenDetalle = GET["EXP_PED_EXP_ID"];
    }

    // id del expediente
    if (GET["edicion"] != "" && GET["edicion"] != null) {
        edicion = GET["edicion"];
    }
});

function cargarTablaDatosPrevios(lista) {
    if (lista.length == 0) { generarTablaVacia(); } else {
        //alert("datos");
        // generar tabla con datos
        var encabezado = "<table class='table'  style='margin:auto; text-align:center; width:100%'>" +
        //"<thead class='thead-inverse' style='height:0px; display:none'>" +
        "<tr style='height:0px;padding-bottom:0px;padding-top:0px'>" +
        "<th style='width:40px;height:0px;padding-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:190px;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:40px;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:190px;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:40px; text-align:center;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "</tr>";
        //"</thead>";
        var fila = "";
        var sacarItems = new Array();
        $.each(lista, function (index, item) {
            //alert("item: " + item.PDT_ID + "//PDT_ID: " + PDT_ID);
            if (item.PDT_ID == PDT_ID) {

                var ultimo = ""
                var mostrarBtn = "inline"
                var bloquear = "";
                var color = "#F3F3F3";
                var editable = "contenteditable";
                if (index == lista.length - 1) { ultimo = "ultimo"; }
                if (index == 0) { mostrarBtn = "none"; }
                ENTREGA_ID = item.ENTREGA_ID;

                //si no se puede editar
                if (edicion === "false") { item.ENTREGADO = 1; $("#btnGuardar").hide(); }
                //si esta entregado
                if (item.ENTREGADO == 1) { bloquear = "disabled=disabled"; color = "#CCCCCC"; editable = ""; mostrarBtn = "none"; entregados += 1; }

                fila += "<tr style='background-color:" + color + "'  id='tr" + idFila + "'>" +
        "<td class='verificar primero ancho numeroEntero dato saltar' " + editable + " id='cantidad" + idFila + "' data-tipo='cantidad' data-entregado='" + item.ENTREGADO + "' style='" + bloquear + ";background-color:" + color + ";padding-bottom:0px' placeholder='Cantidad'>" + item.CANTIDAD + "</td>" + // cantidad
        "<td class=' dropdown pasar' style='padding-bottom:0px'>" +
                     "<input onkeyup='buscar(" + idFila + ")'  id='insumoNombre" + idFila + "'  class='dropdown-toggle bloquear verificar insumo dato saltar' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true' style='border:none; width:100%;height:100%;margin:0px ;padding-bottom:0px;background-color:" + color + "' data-tipo='insumoN' value='" + item.INSUMO + "' " + bloquear + " data-entregado='" + item.ENTREGADO + "' placeholder='Insumo'/>" +
                       "<ul class='dropdown-menu' id='ul" + idFila + "'>" +
                         "<li style='overflow:auto;max-height:150px'>" +
                          "<table class='table table-hover' id='insumos" + idFila + "'>" +
                          "</table>" +
                         "</li>" +
                       "</ul>" +
                    "</div>" +
        "</td>" + // insumo nombre
        "<td class='verificar ancho numeroEntero dato saltar' " + editable + " id='PRECIO" + idFila + "' data-tipo='precio' data-entregado='" + item.ENTREGADO + "' style='" + bloquear + ";background-color:" + color + ";padding-bottom:0px' placeholder='Precio'>" + item.PRECIO + "</td>" + // precio
        "<td class='ancho dato' contenteditable id='insumoId" + idFila + "' style='display:none;padding:0px' data-tipo='insumoId'>" + item.ID + "</td>" + // insumo id
        "<td class='ancho idFila' contenteditable id='idfila" + idFila + "' style='display:none;padding:0px' >" + idFila + "</td>" + // id fila
        "<td style='max-width:100px;padding:0px' class='" + ultimo + " dato obs' " + editable + "  id='observaciones" + idFila + "' data-tipo='obs' placeholder='Observaciones'>" + item.OBSERVACION + "</td>" + // observaciones
        "<td style='width:3px; text-align:center;padding:0px'><a onclick='eliminarDetlle(" + idFila + ")' id='btnEliminar" + idFila + "' class='btn btn-mini btn-danger' style='display:" + mostrarBtn + "' ><i class='icon-remove-circle icon-white'></i></a></td>" + // eliminar
        "<td style='display:none;padding:0px' id='ENTREGA_DETALLE_ID" + idFila + "' >" + item.ENTREGA_DETALLE_ID + "</td>" + // id entrega detalle
        "<td style='display:none;padding:0px' class='entregado' id='entregado" + idFila + "'>" + item.ENTREGADO + "</td>" + // entregado
        "</tr>";
                idFila += 1;
                //alert("lista: " + lista.length + "//parent: " + parent.detallesDesglose.length)
            } else { sacarItems.push(item); }
        });
        //alert(idFila);
        $("#observaciones" + (idFila - 1)).addClass("ultimo");
        //$.each(sacarItems, function (index, item) { alert("sacarItems: " + (item)); alert(parent.detallesDesglose[item]); delete parent.detallesDesglose.splice(item); });
        // $.each(parent.detallesDesglose, function (index, item) { if(item.PDT_ID == PDT_ID) {parent.detallesDesglose.splice(index , 1);} });
        // $.each(parent.detallesDesglose, function (index, item) { parent.detallesDesglose[index] = null; });
        //parent.detallesDesglose.length = 0;
        //alert(sacarItems.length + "sacarItems")
        parent.vaciarArray();
        //alert(parent.detallesDesglose.length + "longitud")
        parent.detallesDesglose = sacarItems;
        //alert(parent.detallesDesglose.length + "longitud")
        //$.each(parent.detallesDesglose, function (index, item) { alert("INSUMO: " + item.INSUMO); });
        //alert(parent.detallesDesglose.length + "longitud")
        //alert("quedan: " +  parent.detallesDesglose.length);
        var pie = "</table>";

        $("#carga").html(encabezado + fila + pie);

        $(".primero").focus();
        $(".ancho").css('max-width', '100px');
        $(".ancho").css('height', '35px');

        if (edicion === "true") {
            if (entregados == lista.length) { nuevaFila($(".ultimo").parent()); }
        } else { $(".btn-mini").hide(); }
    }
}

function ListaDocumentacion_Exp(PDT_ID) {

    var json = JSON.stringify({ "G_PDT_ID": PDT_ID, "tipo": 2 });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/Adjuntos_List_Internacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            if (lista.length > 0) {

                var encabezado = "<table class='table' style='margin-bottom:0px'>";
                var fila = "";
                var pie = "</table>";

                //var ruta = "http://10.10.8.66//documentacion_new/Compras_Adjuntos_Internacion/";
                var ruta = "../Compras_Internacion/";

                $.each(lista, function (index, item) {
                    //alert(item.RutaArchivo);
                    var nombre_recortado = item.RutaArchivo.split("\\");
                    var nombre_corto = nombre_recortado[nombre_recortado.length - 1];
                    fila += "<tr><td style='text-align:center'><img src='" + ruta + item.RutaArchivo + "'/></td></tr>";

                });
                $("#escaneos").html(encabezado + fila + pie);
            }
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


/////NUMERO ENTEROS 45 47
$(document).on('keypress', '.numeroEntero', function (e) {
   
    if (($.inArray(e.keyCode, [46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58]) == -1) || ($(this).html().length >= 9)) { e.preventDefault(); }
});


///////////////////////////////////////////////////////////////////////////////////
function cargarDetalles(PDT_ID) {
    //alert(PDT_ID);
    //alert(parent.remitoId);
    var json = JSON.stringify({ "PDT_ID": parent.remitoId, "TIPO": 1 });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/Compras_Traer_Entregas_DET_Internacion",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) { if (Resultado.d == "") { generarTablaVacia(); } else { cargarTablaDatos(Resultado.d); } }
    });
}


// para cargar por primera vez
function generarTablaVacia() {
    
//    var disponible = "";
//    if (!edicion) { $("#btnGuardar").hide(); disponible = ""; } else { $("#btnGuardar").show(); disponible = "contenteditable"; }
    var encabezado = "<table class='table'  style='margin:auto; text-align:center; width:100%'>" +
    //"<thead class='thead-inverse' style='height:0px; display:none'>" +
        "<tr style='height:0px;padding-bottom:0px;padding-top:0px'>" +
        "<th style='width:40px;height:0px;padding-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:190px;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:40px;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:190px;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:40px; text-align:center;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "</tr>";
    //"</thead>";
    var fila = "<tr id='tr" + idFila + "'>" +
        "<td class='verificar primero ancho2 numeroEntero dato saltar'  id='cantidad" + idFila + "' data-tipo='cantidad' data-entregado='0' contenteditable placeholder='Cantidad' style='width:50px'></td>" + // cantidad
        "<td class=' dropdown pasar' style='padding-bottom:0px; padding-right:0px; padding-left:0px; padding-top:0px;height:38px'>" +
                     "<input onkeyup='buscar(" + idFila + ")'  id='insumoNombre" + idFila + "'  class='dropdown-toggle verificar bloquear insumo dato saltar' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true' style='border:none; width:100%;height:100%;margin:0px ;background-color:#FFFFFF' data-tipo='insumoN'  data-entregado='0' placeholder='Insumo'/>" +
                       "<ul class='dropdown-menu' id='ul" + idFila + "'>" +
                         "<li style='overflow:auto;max-height:150px'>" +
                          "<table class='table table-hover' id='insumos" + idFila + "'>" +
                          "</table>" +
                         "</li>" +
                       "</ul>" +
                    "</div>" +
        "</td>" + // insumo nombre
        "<td class='verificar ancho numeroEntero dato saltar' contenteditable id='PRECIO" + idFila + "' data-tipo='precio' data-entregado='0' style='padding-bottom:0px' placeholder='Precio'></td>" + // precio
        "<td class='ancho dato' contenteditable id='insumoId" + idFila + "' style='display:none' data-tipo='insumoId'>0</td>" + // insumo id
        "<td class='ancho idFila' contenteditable id='idfila" + idFila + "' style='display:none' >" + idFila + "</td>" + // id fila
        "<td style='max-width:100px' class='ultimo dato obs' contenteditable  id='observaciones" + idFila + "' data-tipo='obs' placeholder='Observaciones'></td>" + // observaciones
        "<td style='width:3px; text-align:center'><a onclick='eliminarDetlle(" + idFila + ")' id='btnEliminar" + idFila + "' class='btn btn-mini btn-danger' ><i class='icon-remove-circle icon-white'></i></a></td>" + // eliminar
        "<td style='display:none' class='entregado ' id='entregado" + idFila + "'>0</td>" + // entregado
        "<td style='display:none' id='ENTREGA_DETALLE_ID" + idFila + "'>0</td>" + // id entrega detalle
        "</tr>";

    var pie = "</table>";

    $("#carga").html(encabezado + fila + pie);
    
    $(".primero").focus();
    $(".ancho2").css('max-width', '50px');
    $(".ancho").css('max-width', '100px');


}


//para edicion
function cargarTablaDatos(lista) {
    //alert();
    //alert("datos");
    // generar tabla con datos
    var encabezado = "<table class='table'  style='margin:auto; text-align:center; width:100%'>" +
    //"<thead class='thead-inverse' style='height:0px; display:none'>" +
        "<tr style='height:0px;padding-bottom:0px;padding-top:0px'>" +
        "<th style='width:40px;height:0px;padding-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:190px;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:40px;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:190px;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "<th style='width:40px; text-align:center;height:0px;paddin-bottom:0px;padding-top:0px'></th>" +
        "</tr>";
        //"</thead>";
    var fila = "";

    $.each(lista, function (index, item) {
        var ultimo = ""
        var mostrarBtn = "inline"
        var bloquear = "";
        var color = "#F3F3F3";
        var editable = "contenteditable";
        if (index == lista.length - 1) { ultimo = "ultimo"; }
        if (index == 0) { mostrarBtn = "none"; }
        ENTREGA_ID = item.ENTREGA_ID;

        //si no se puede editar
        if (edicion === "false") { item.ENTREGADO = 1; $("#btnGuardar").hide(); }
        //si esta entregado                                                                         //mostrarBtn = "none";
        if (item.ENTREGADO == 1) { bloquear = "disabled=disabled"; color = "#CCCCCC"; editable = ""; entregados += 1; mostrarBtn = "none"; }
        //alert(item.ENTREGADO);
        fila += "<tr style='background-color:" + color + "'  id='tr" + idFila + "'>" +
        "<td class='verificar primero ancho numeroEntero dato saltar' " + editable + " id='cantidad" + idFila + "' data-tipo='cantidad' data-entregado='" + item.ENTREGADO + "' style='" + bloquear + ";background-color:" + color + ";padding-bottom:0px' placeholder='Cantidad'>" + item.cantidad + "</td>" + // cantidad
        "<td class=' dropdown pasar' style='padding-bottom:0px'>" +
                     "<input onkeyup='buscar(" + idFila + ")'  id='insumoNombre" + idFila + "'  class='dropdown-toggle bloquear verificar insumo dato saltar' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true' style='border:none; width:100%;height:100%;margin:0px ;padding-bottom:0px;background-color:" + color + "' data-tipo='insumoN' value='" + item.insumo + "' " + bloquear + " data-entregado='" + item.ENTREGADO + "' placeholder='Insumo'/>" +
                       "<ul class='dropdown-menu' id='ul" + idFila + "'>" +
                         "<li style='overflow:auto;max-height:150px'>" +
                          "<table class='table table-hover' id='insumos" + idFila + "'>" +
                          "</table>" +
                         "</li>" +
                       "</ul>" +
                    "</div>" +
        "</td>" + // insumo nombre
        "<td class='verificar ancho numeroEntero dato saltar' " + editable + " id='PRECIO" + idFila + "' data-tipo='precio' data-entregado='" + item.ENTREGADO + "' style='" + bloquear + ";background-color:" + color + ";padding-bottom:0px' placeholder='Precio'>" + item.PRECIO + "</td>" + // precio
        "<td class='ancho dato' contenteditable id='insumoId" + idFila + "' style='display:none;padding:0px' data-tipo='insumoId'>" + item.id + "</td>" + // insumo id
        "<td class='ancho idFila' contenteditable id='idfila" + idFila + "' style='display:none;padding:0px' >" + idFila + "</td>" + // id fila
        "<td style='max-width:100px;padding:0px' class='" + ultimo + " dato obs' " + editable + "  id='observaciones" + idFila + "' data-tipo='obs' placeholder='Observaciones'>" + item.observacion + "</td>" + // observaciones
        "<td style='width:3px; text-align:center;padding:0px'><a onclick='eliminarDetlle(" + idFila + ")' id='btnEliminar" + idFila + "' class='btn btn-mini btn-danger' style='display:" + mostrarBtn + "' ><i class='icon-remove-circle icon-white'></i></a></td>" + // eliminar
        "<td style='display:none;padding:0px' id='ENTREGA_DETALLE_ID" + idFila + "' >" + item.ENTREGA_DETALLE_ID + "</td>" + // id entrega detalle
        "<td style='display:none;padding:0px' class='entregado' id='entregado" + idFila + "'>" + item.ENTREGADO + "</td>" + // entregado
        "</tr>";
        idFila += 1;
    });

   // $("#btnGuardar").show();
    //alert(entregados + "//" + lista.length);
    var pie = "</table>";

    $("#carga").html(encabezado + fila + pie);
    $("#btnCerrar").show();
    $(".primero").focus();
    $(".ancho").css('max-width', '100px');
    $(".ancho").css('height', '35px');

    if (edicion === "true") {
        if (entregados == lista.length) { nuevaFila($(".ultimo").parent()); }
    } else { $(".btn-mini").hide(); }
}


$("#btnCerrar").click(function () { parent.$.fancybox.close(); });
$("#btnCerrarSinGuardar").click(function () { parent.$.fancybox.close(); })



function nuevaFila(fila) {
    $(".ultimo").removeClass("ultimo")
    idFila += 1;
    fila.after("<tr id='tr" + idFila + "'>" +
    "<td class='verificar siguiente ancho numeroEntero dato saltar' contenteditable  id='cantidad" + idFila + "' data-tipo='cantidad' data-entregado='0' placeholder='Cantidad'></td>" + // cantidad
        "<td class=' dropdown pasar' style='padding:0px'>" +
                     "<input  onkeyup='buscar(" + idFila + ")' id='insumoNombre" + idFila + "'  class='dropdown-toggle bloquear verificar insumo dato saltar' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true' style='border:none; width:100%;height:40px;margin:0px ;background-color:#F3F3F3' data-tipo='insumoN'  data-entregado='0' placeholder='Insumo'/>" +
                       "<ul class='dropdown-menu' id='ul" + idFila + "'>" +
                         "<li style='overflow:auto;max-height:150px'>" +
                          "<table class='table table-hover' id='insumos" + idFila + "'>" +
                          "</table>" +
                         "</li>" +
                       "</ul>" +
                    "</div>" + 
        "</td>" + // insumo nombre
        "<td class='verificar ancho numeroEntero dato saltar' contenteditable id='PRECIO" + idFila + "' data-tipo='precio' data-entregado='0' style='padding-bottom:0px' placeholder='Precio'></td>" + // precio
    "<td class='ancho dato' contenteditable id='insumoId" + idFila + "' style='display:none' data-tipo='insumoId'>0</td>" + // insumo id
    "<td class='ancho idFila' contenteditable id='idfila" + idFila + "' style='display:none' >" + idFila + "</td>" + // id fila
    "<td style='max-width:100px' class='ultimo dato obs' contenteditable id='observaciones" + idFila + "' data-tipo='obs' placeholder='Observaciones'></td>" + // observacion
    "<td style='width:3px; text-align:center'><a onclick='eliminarDetlle(" + idFila + ")' id='btnEliminar" + idFila + "' class='btn btn-mini btn-danger'><i class='icon-remove-circle icon-white'></i></a></td>" + // eliminar
    "<td style='display:none' id='ENTREGA_DETALLE_ID" + idFila + "' >0</td>" + // id entrega detalle
    "<td style='display:none' class='entregado '  id='entregado" + idFila + "'>0</td>" + // entregado
    "</tr>");
    $(".ancho").css('max-width', '40px');
    $(".dropdown-menu").hide();
}


///////NUMERO ENTEROS
//$(document).on('keypress', '.numeroEntero', function (e) {
//    //alert(e.keyCode);
////    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190, 110]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 40)) {
////        return;
////    }

////    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
////        e.preventDefault();
////    }
//    if ($(this).html().length > 4) return false;

//    //if ((e.keyCode < 44 || e.keyCode > 57 || $(this).html().toString().trim().length > 5)) { e.preventDefault(); }
//    //if (e.keyCode == 48) { alert(); }424
//});// 47 45

$(document).on('keypress', '.ultimo', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();

        //alert(agregarFila);
        if (verificarDatos()) { fila = $(this).parent(); }


        if (verificarDatos()) { $("#tab").click(); } else { alert("Complete cantidad e insumo para agregar una nueva fila!"); }
        //$(".ultimo").removeClass("ultimo")
    }
});


function verificarDatos() {
    var i = 0;
    agregarFila = true;

    $(".verificar").each(function () {
        //alert($(this).prop("tagName"));
        i += 1;

        if ($(this).prop("tagName") == "TD" && $(this).html().toString().trim().length == 0) { agregarFila = false; return false; }
        if ($(this).prop("tagName") == "INPUT" && $(this).val().toString().trim().length == 0) { agregarFila = false; return false; }
    });
    return agregarFila;
}

$(document).bind('DOMNodeInserted', function () {
    if ($('.siguiente').length > 0) { $('.siguiente').focus(); }
    $(".siguiente").removeClass("siguiente")
});

$("#tab").click(function () { nuevaFila(fila); });

function buscar(idFila) {
    idFilaSeleccion = idFila;
    $("#insumoId" + idFila).html("0");
    $("#insumoNombre" + idFila).val().toUpperCase();
    if ($("#insumoNombre" + idFila).val().toString().trim().length > 0) {
        var json = JSON.stringify({ "busqueda": $("#insumoNombre" + idFila).val() });
        $.ajax({
            type: "POST",
            url: "../Json/Compras/ComprasInternacion.asmx/buscar_Insumo",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d != "") {
                    var lista = Resultado.d;
                    var encabezado = "<table><thead><tr><th><b>Seleccione Insumo</b></th></tr></thead>";
                    var fila = "";
                    var pie = "</table>";

                    $.each(lista, function (index, item) {
                        //alert($("#insumoNombre" + idFila).val().length);
                        var corte = $("#insumoNombre" + idFila).val().length;
                        var final = item.descripcion.toString().length;
                        var insumo = "<mark style='background-color:#CCCCCC'>" + (item.descripcion.toString().substring(0, corte)) + "</mark style='border-top-left-radius:10px'>" + (item.descripcion.toString().substring(corte, final));

                        //alert(item.descripcion.toString().substring(0, corte));
                        //alert(item.descripcion.toString().substring(corte, final));

                        fila += "<tr class='seleccion' style='cursor:pointer'><td onclick='seleccion(" + item.id + ")' id='insumoName" + item.id + "' data-id='" + idFila + "'>" + insumo + "</td><td id='idInsumo" + item.id + "' style='display:none'>" + item.id + "</td><td id='insumoNameOculto" + item.id + "' style='display:none'>" + item.descripcion + "</td></tr>";
                        if ($("#insumoNombre" + idFila).val().toString().trim() == item.descripcion.trim()) { $("#insumoId" + idFila).html(item.id); } ///////////si no lo selecciona
                    });
                    $("#insumos" + idFila).html(encabezado + fila + pie);
                    $("#ul" + idFila).show();
                }
            }
            //complete: reSeleccionar
        });
    } else { $("#insumos" + idFila).html(""); $(".dropdown-menu").hide(); }
    // $("#insumoId" + idFila).val("0");
}

$(".dato").click(function () { $(".dropdown-menu").hide(); })


function seleccion(id) {
    var idIns = idFilaSeleccion;  //$("#insumoName" + id).data("id");
    //alert("idIns" + idIns);
    $("#insumoNombre" + idIns).val($("#insumoNameOculto" + id).html());
    $("#insumoId" + idIns).html($("#idInsumo" + id).html());
    //alert($("#insumoId" + idIns).val());


    //alert($("#insumoNombre" + idIns).val() + "//" + $("#insumoId" + idIns).val());
    $(".dropdown-menu").hide();
}

// reacargar pagina la finalizar
$("#btnEntregar").click(function () {
    entregar = 1;

    //return false;
    setTimeout($("#btnCerrar").click(), 1000);

});


// guarda
$("#btnGuardar").click(function () {
    var cuantos = new Array();
    var cantidad = 0;
    $(".saltar").each(function (index, item) {
        if ($(this).data('entregado') == 0) {
            cantidad += 1;
            if ($(this).prop("tagName") == "TD" && $(this).html().toString().trim().length == 0) { cuantos.push(1); }
            if ($(this).prop("tagName") == "INPUT" && $(this).val().toString().trim().length == 0) { cuantos.push(1); }
        }
    });

    if (verificarDatos()) { guardarEntrega(); } else { alert("Faltan campos por completar!"); } 
    
});

function guardarEntrega() {

    //parent.ENTREGA_ID = ENTREGA_ID;
    parent.ENTREGA_ID = 0;
    parent.G_ExpIdenDetalle = G_ExpIdenDetalle;
    parent.P_ID = P_ID;
    parent.PDT_ID = PDT_ID;
    generarDetallesEnMemoria();
    parent.cargaRem = "2";
    var total = 0.0;
    var totalParent = 0.0;
    $(".numeroEntero").each(function (index, item) { if ($(this).attr("data-tipo") == "precio") { total += parseFloat($(this).html()); } })
   
    parent.$("#PDT_IMPORTE" + PDT_ID).html("$ " + total);
    parent.$("#cargaRem" + PDT_ID).html("2");
    parent.$(".verificarMoney").each(function (index, item) { if ($(this).html().trim().length != "") { totalParent += parseFloat($(this).html().replace("$", "")); } });
    parent.$("#Total").html("Importe Total: $" + totalParent.toFixed(2));
    parent.$.fancybox.close();

   


    //return false;                             //id del expediente                   //id del pedido       //id del detalle del pedido
//    var json = JSON.stringify({ "ENTREGA_ID": ENTREGA_ID, "EXP_ID": G_ExpIdenDetalle, "EXP_PED_ID": P_ID, "P_ID": PDT_ID }); //parent.P_ID });
//    $.ajax({
//        type: "POST",
//        url: "../Json/Compras/ComprasInternacion.asmx/Compras_Guardar_CAB_Entrega_Internacion",
//        contentType: "application/json; charset=utf-8",
//        data: json,
//        dataType: "json",
//        success: function (Resultado) {
//            guadarEntregaDET(Resultado.d);
//        }
//    });
}

$("#btnSalirSinEntregar").click(function () { $("#btnCerrar").click(); });

function guadarEntregaDET(ENT_ID) {
    //PEDIDO
    var json = JSON.stringify({ "ENTREGA_ID": ENT_ID, "PDT_ID": PDT_ID, "lista": generarDetalles() }); //parent.P_ID, "lista": generarDetalles() });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/Compras_Guardar_DET_Entrega_Internacion",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            parent.idsDesgloce = Resultado.d;
            //window.location.reload(true);
            if (entregar == 1) { //cerrar,recargar e imprimir solo entregados al momento
                parent.imprimirEntrega(Resultado.d, parent.G_ExpId, 1)
                entregar = 0;
            } else {
                var total = 0;
                var totalParent = 0;
                $(".numeroEntero").each(function (index, item) { if ($(this).attr("data-tipo") == "precio") { total += parseInt($(this).html()); } })
                parent.$("#PDT_IMPORTE" + PDT_ID).html(total.toString());
                parent.$(".verificarMoney").each(function (index, item) { totalParent += parseInt($(this).html()); });
                parent.$("#Total").html("Importe Total: $" + totalParent.toFixed(2).toString());
                parent.$.fancybox.close();
            } // parent.window.location.reload(true);
        },
        complete: function () { parent.cargaRem = 1; entregar = 0; }
    });
}

function generarDetalles() {
    var lista = new Array();


    $(".idFila").each(function () {

        // si esta entregando solo guarda los que se esta entregando asi obtengo los id de lo que se entrego para imprimir
        if (entregar == 1) {
            if ($("#entregado" + $(this).html()).html() == 0) {
                var obj = {};
                obj.cantidad = $("#cantidad" + $(this).html()).html();
                obj.ID = $("#insumoId" + $(this).html()).html();
                obj.observacion = $("#observaciones" + $(this).html()).html();
                obj.insumo = $("#insumoNombre" + $(this).html()).val();
                obj.ENTREGADO = 1;
                obj.ENTREGA_DETALLE_ID = $("#ENTREGA_DETALLE_ID" + $(this).html()).html();
                obj.PDT_ID = PDT_ID;
                //alert(obj.CANTIDAD + "//" + obj.ID + "//" + obj.OBSERVACION + "//" + obj.INSUMO + "//" + obj.ENTREGADO + "//" + obj.ENTREGA_DETALLE_ID);
                lista.push(obj);

            }


        } else {// si no esta entrgando guarda todo
            if ($("#entregado" + $(this).html()).html() == 0) {
                var obj = {};
                obj.CANTIDAD = $("#cantidad" + $(this).html()).html();
                obj.ID = $("#insumoId" + $(this).html()).html();
                obj.OBSERVACION = $("#observaciones" + $(this).html()).html();
                obj.INSUMO = $("#insumoNombre" + $(this).html()).val();
                obj.ENTREGADO = $("#entregado" + $(this).html()).html();
                obj.ENTREGA_DETALLE_ID = $("#ENTREGA_DETALLE_ID" + $(this).html()).html();
                obj.PRECIO = $("#PRECIO" + $(this).html()).html();
                obj.PDT_ID = PDT_ID;
                //alert(obj.PDT_ID);
                //alert(obj.CANTIDAD + "//" + obj.ID + "//" + obj.OBSERVACION + "//" + obj.INSUMO + "//" + obj.ENTREGADO + "//" + obj.ENTREGA_DETALLE_ID);
                lista.push(obj);
            }
        }
    });

    return lista;
}

function generarDetallesEnMemoria() {

    $(".idFila").each(function () {

        if ($("#entregado" + $(this).html()).html() == 0) {
            var obj = {};
            obj.CANTIDAD = $("#cantidad" + $(this).html()).html();
            obj.ID = $("#insumoId" + $(this).html()).html();
            obj.OBSERVACION = $("#observaciones" + $(this).html()).html();
            obj.INSUMO = $("#insumoNombre" + $(this).html()).val();
            obj.ENTREGADO = $("#entregado" + $(this).html()).html();
            obj.ENTREGA_DETALLE_ID = $("#ENTREGA_DETALLE_ID" + $(this).html()).html();
            //parseFloat(str.replace(',', '.').replace(' ', ''))
            obj.PRECIO = parseFloat($("#PRECIO" + $(this).html()).html().replace(',', '.').replace(' ', ''));
            obj.PDT_ID = PDT_ID;
            parent.detallesDesglose.push(obj);
            //alert(parseFloat($("#PRECIO" + $(this).html()).html().replace(',', '.').replace(' ', '')));
        }
    });
}



$("#form1").submit(function (e) {
    e.preventDefault();
});

// si es 0 elimino solo la fila sino voy a borrar detalle a la base de datos y recargo la pagina
function eliminarDetlle(id) {
    var r = confirm("Desea eliminar este item?");
    if (r)
        if ($("#ENTREGA_DETALLE_ID" + id).html() == 0) {
            //window.location.reload(true);

            $("#tr" + id).remove();
            //$("tr:last").css({ backgroundColor: "yellow", fontWeight: "bolder" });
            $(".obs:last").addClass("ultimo");
            //$("#observaciones" + id - 1).addClass("ultimo");
        } else {

            //elimino
            var json = JSON.stringify({ "ENTREGA_DETALLE_ID": $("#ENTREGA_DETALLE_ID" + id).html() });
            $.ajax({
                type: "POST",
                url: "../Json/Compras/ComprasInternacion.asmx/compras_eliminiar_entrega_detalle_internacion",
                contentType: "application/json; charset=utf-8",
                data: json,
                dataType: "json",
                success: function () {
                    $("#tr" + id).remove();
                    //    window.location.reload(true); 
                }
            });
        }
}