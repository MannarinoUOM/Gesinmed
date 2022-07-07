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

$(document).ready(function () {

    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    if (GET["PDT_ID"] != "" && GET["PDT_ID"] != null) {
        PDT_ID = GET["PDT_ID"];
        cargarDetalles(GET["PDT_ID"]);
    }


    if (GET["G_ExpIdenDetalle"] != "" && GET["G_ExpIdenDetalle"] != null) {
        G_ExpIdenDetalle = GET["G_ExpIdenDetalle"];
        
    }

    if (GET["P_ID"] != "" && GET["P_ID"] != null) {
        P_ID = GET["P_ID"];

    }

    //para guardar
    //cargarENTREGA_ID(GET["PDT_ID"]);
   
});

//function cargarENTREGA_ID(PDT_ID) {
//    var json = JSON.stringify({ "PDT_ID": PDT_ID });
// $.ajax({
//     type: "POST",
//     url: "../Json/Compras/ComprasInternacion.asmx/Compras_Traer_ENTREGA_ID_Internacion",
//     contentType: "application/json; charset=utf-8",
//     data: json,
//     dataType: "json",
//     success: function (Resultado) {
//         ENTREGA_ID = Resultado.d;
//     }
// });
//}


function cargarDetalles(PDT_ID) {
    //var resultado = "";


    var json = JSON.stringify({ "PDT_ID": PDT_ID, "TIPO": 2 });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/Compras_Traer_Entregas_DET_Internacion",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == "") { generarTablaVacia(); } else { cargarTablaDatos(Resultado.d); }
        }
        
    });
}

//para edicion
function cargarTablaDatos(lista) {
    // generar tabla con datos
    var encabezado = "<table class='table'  style='margin:auto; text-align:center; height:100%; width:100%'>" +
        "<thead class='thead-inverse'>" +
        "<tr>" +
        "<th style='width:100px'>Cantidad</th>" +
        "<th style='width:100px'>Insumo</th>" +
        "<th style='width:100px'>Observaciones</th>" +
        "<th style='width:3px; text-align:center'>Entregar</th>" +
        "</tr>" +
        "</thead>";
    var fila = "";

    $.each(lista, function (index, item) {
        //alert(item.ENTREGADO); 
        //alert(item.cantidad + "//" + item.insumo + "//" + item.id + "//" + item.observacion);
        var ultimo = ""
        var mostrarBtn = "inline"
        var mostrarChk = "inline";
        var bloquear = "";
        var color = "#F3F3F3";
        var editable = "contenteditable";
        if (index == lista.length - 1) { ultimo = "ultimo"; }
        if (index == 0) { mostrarBtn = "none"; }
        ENTREGA_ID = item.ENTREGA_ID;
        //alert(item.ENTREGADO);
        if (item.ENTREGADO == 1) { color = "#CCCCCC"; mostrarChk = "none"}
        bloquear = "disabled='disabled'";  editable = ""; mostrarBtn = "none"; entregados += 1; 

        fila += "<tr style='background-color:" + color + "'  id='tr" + idFila + "'>" +
        "<td class='verificar primero ancho numeroEntero dato saltar' " + editable + " id='cantidad" + idFila + "' data-tipo='cantidad' data-entregado='" + item.ENTREGADO + "' style='" + bloquear + ";background-color:" + color + "'>" + item.cantidad + "</td>" + // cantidad
        "<td class=' dropdown pasar' style='padding:0px'>" +
                     "<input onkeyup='buscar(" + idFila + ")'  id='insumoNombre" + idFila + "'  class='dropdown-toggle bloquear verificar insumo dato saltar' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true' style='border:none; width:100%;height:100%;margin:0px ;background-color:" + color + "' data-tipo='insumoN' value='" + item.insumo + "' " + bloquear + " data-entregado='" + item.ENTREGADO + "'/>" +
                       "<ul class='dropdown-menu' id='ul" + idFila + "'>" +
                         "<li style='overflow:auto;max-height:150px'>" +
                          "<table class='table table-hover' id='insumos" + idFila + "'>" +
                          "</table>" +
                         "</li>" +
                       "</ul>" +
                    "</div>" +
        "</td>" + // insumo nombre
        "<td class='ancho dato' contenteditable id='insumoId" + idFila + "' style='display:none' data-tipo='insumoId'>" + item.id + "</td>" + // insumo id
        "<td class='ancho idFila' contenteditable id='idfila" + idFila + "' style='display:none' >" + idFila + "</td>" + // id fila
        "<td style='max-width:100px' class='" + ultimo + " dato obs' " + editable + "  id='observaciones" + idFila + "' data-tipo='obs'>" + item.observacion + "</td>" + // observaciones
         "<td style='width:3px; text-align:center'><input id='entregar"+ idFila +"' type='checkbox' style='display:"+ mostrarChk +"' class='entregar'/></td>" + // entregar
       // "<td style='width:3px; text-align:center'><a onclick='eliminarDetlle(" + idFila + ")' id='btnEliminar" + idFila + "' class='btn btn-mini btn-danger' style='display:" + mostrarBtn + "'><i class='icon-remove-circle icon-white'></i></a></td>" + // eliminar 
        "<td style='display:none' id='ENTREGA_DETALLE_ID" + idFila + "' >" + item.ENTREGA_DETALLE_ID + "</td>" + // id entrega detalle
        "<td style='display:none' class='entregado' id='entregado" + idFila + "'>" + item.ENTREGADO + "</td>" + // entregado
        "<td style='display:none' class='entregado' id='PRECIO" + idFila + "'>" + item.PRECIO + "</td>" + // precio
        "</tr>";
        idFila += 1;
    });

    
    //alert(entregados + "//" + lista.length);
    var pie = "</table>";
    
    $("#detalles").html(encabezado + fila + pie);
    
    $(".primero").focus();
    $(".ancho").css('max-width', '100px');
    $(".ancho").css('max-width', '100px');

    
    //if (entregados == lista.length) { nuevaFila($(".ultimo").parent()); }
}



 // si es 0 elimino solo la fila sino voy a borrar detalle a la base de datos y recargo la pagina
function eliminarDetlle(id) {
    var r = confirm("Desea eliminar este item?");

    if(r)
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


// para cargar por primera vez
  function  generarTablaVacia(){   
   // if (resultado == "") {

//        var encabezado = "<table class='table'  style='margin:auto; text-align:center; height:100%; width:100%'>" +
//        "<thead class='thead-inverse'>" +
//        "<tr>" +
//        "<th style='width:100px'>Cantidad</th>" +
//        "<th style='width:100px'>Insumo</th>" +
//        "<th style='width:100px'>Observaciones</th>" +
//        "<th style='width:3px; text-align:center'>Eliminar</th>" +
//        "</tr>" +
//        "</thead>";
//        var fila = "<tr id='tr" + idFila + "'>" +
//        "<td class='verificar primero ancho numeroEntero dato saltar' contenteditable id='cantidad" + idFila + "' data-tipo='cantidad' data-entregado='0'></td>" + // cantidad
//        "<td class=' dropdown pasar' style='padding:0px'>" +
//                     "<input onkeyup='buscar(" + idFila + ")'  id='insumoNombre" + idFila + "'  class='dropdown-toggle verificar bloquear insumo dato saltar' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true' style='border:none; width:100%;height:100%;margin:0px ;background-color:#F3F3F3' data-tipo='insumoN'  data-entregado='0'/>" +
//                       "<ul class='dropdown-menu' id='ul" + idFila + "'>" +
//                         "<li style='overflow:auto;max-height:150px'>" +
//                          "<table class='table table-hover' id='insumos"+ idFila +"'>" +
//                          "</table>" +
//                         "</li>" +
//                       "</ul>" +
//                    "</div>" +
//        "</td>" + // insumo nombre
//        "<td class='ancho dato' contenteditable id='insumoId" + idFila + "' style='display:none' data-tipo='insumoId'>0</td>" + // insumo id
//        "<td class='ancho idFila' contenteditable id='idfila" + idFila + "' style='display:none' >" + idFila + "</td>" + // id fila
//        "<td style='max-width:100px' class='ultimo dato obs' contenteditable  id='observaciones" + idFila + "' data-tipo='obs'></td>" + // observaciones
//        "<td style='width:3px; text-align:center'><a onclick='eliminarDetlle(" + idFila + ")' id='btnEliminar" + idFila + "' class='btn btn-mini btn-danger' style='display:none'><i class='icon-remove-circle icon-white'></i></a></td>" + // eliminar
//        "<td style='display:none' class='entregado ' id='entregado" + idFila + "'>0</td>" + // entregado
//        "<td style='display:none' id='ENTREGA_DETALLE_ID" + idFila + "'>0</td>" + // id entrega detalle
//        "</tr>";

//        var pie = "</table>";

//        $("#detalles").html(encabezado + fila + pie);
   // }
//    $(".primero").focus();
//    $(".ancho").css('max-width', '100px');
//    $(".ancho").css('max-width', '100px');

      $("#detalles").html("<label style='font-size:x-large'><b>''PARA PODER EFECTUAR LA ENTREGA, PRIMERO DEBE INGRESAR EL REMITO CON LOS INSUMOS CORRESPONDIENTES.''</b></label>");
      $("#btnEntregar").hide();
}




function nuevaFila(fila) {
    $(".ultimo").removeClass("ultimo")
    idFila += 1;
    fila.after("<tr id='tr"+ idFila +"'>" +
    "<td class='verificar siguiente ancho numeroEntero dato saltar' contenteditable  id='cantidad" + idFila + "' data-tipo='cantidad' data-entregado='0'></td>" + // cantidad
        "<td class=' dropdown pasar' style='padding:0px'>" +
                     "<input  onkeyup='buscar(" + idFila + ")' id='insumoNombre" + idFila + "'  class='dropdown-toggle bloquear verificar insumo dato saltar' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true' style='border:none; width:100%;height:100%;margin:0px ;background-color:#F3F3F3' data-tipo='insumoN'  data-entregado='0'/>" +
                       "<ul class='dropdown-menu' id='ul" + idFila + "'>" +
                         "<li style='overflow:auto;max-height:150px'>" +
                          "<table class='table table-hover' id='insumos" + idFila + "'>" +
                          "</table>" +
                         "</li>" +
                       "</ul>" +
                    "</div>" +
        "</td>" + // insumo nombre
    "<td class='ancho dato' contenteditable id='insumoId" + idFila + "' style='display:none' data-tipo='insumoId'>0</td>" + // insumo id
    "<td class='ancho idFila' contenteditable id='idfila" + idFila + "' style='display:none' >" + idFila + "</td>" + // id fila
    "<td style='max-width:100px' class='ultimo dato obs' contenteditable id='observaciones" + idFila + "' data-tipo='obs'></td>" + // observacion
    "<td style='width:3px; text-align:center'><a onclick='eliminarDetlle(" + idFila + ")' id='btnEliminar" + idFila + "' class='btn btn-mini btn-danger'><i class='icon-remove-circle icon-white'></i></a></td>" + // eliminar
    "<td style='display:none' id='ENTREGA_DETALLE_ID" + idFila + "' >0</td>" + // id entrega detalle
    "<td style='display:none' class='entregado '  id='entregado" + idFila + "'>0</td>" + // entregado
    "</tr>");
    $(".ancho").css('max-width', '100px');
    $(".dropdown-menu").hide(); 
}



/////NUMERO ENTEROS
$(document).on('keypress', '.numeroEntero', function (e) {
    //alert(e.keyCode);
    //    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
    //            (e.keyCode == 65 && e.ctrlKey === true) ||
    //            (e.keyCode >= 35 && e.keyCode <= 40)) {
    //        return;
    //    }
    //    //48/57
    //    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    //        e.preventDefault();
    //    }
    //alert( $(this).html().toString().trim().length);
    if ((e.keyCode < 48 || e.keyCode > 57 || $(this).html().toString().trim().length > 5)) { e.preventDefault(); }
    //if (e.keyCode == 48) { alert(); }424
});

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

$("#tab").click(function () {  nuevaFila(fila); });

function buscar(idFila) {
    $("#insumoId" + idFila).html("0");
    $("#insumoNombre" + idFila).val().toUpperCase();
    if($("#insumoNombre" + idFila).val().toString().trim().length > 0 )
    {
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


function seleccion (id) {

    var idIns = $("#insumoName" + id).data("id");
    $("#insumoNombre" + idIns).val($("#insumoNameOculto" + id).html());
    $("#insumoId" + idIns).html($("#idInsumo" + id).html());
    //alert($("#insumoId" + idIns).val());


    //alert($("#insumoNombre" + idIns).val() + "//" + $("#insumoId" + idIns).val());
    $(".dropdown-menu").hide();
}


function verificarSiEntrega() {
    var retorno = false;
    $(".entregar").each(function (index, item) { if ($(this).is(':checked')) { retorno = true; return false; } })

    return retorno;
}

// reacargar pagina la finalizar
$("#btnEntregar").click(function () {
    entregar = 1;
   // alert(verificarSiEntrega());
    if (verificarSiEntrega()) { setTimeout($("#btnCerrar").click(), 1000); } else { alert("Seleccione algun insumo para entregar"); return false; }

});



// cierra y guarda
$("#btnCerrar").click(function () {
    var cuantos = new Array();
    var cantidad = 0;
    //var guardar = false;
    $(".saltar").each(function (index, item) {
        // alert($(this).data('entregado'));
        if ($(this).data('entregado') == 0) {
            cantidad += 1;
            if ($(this).prop("tagName") == "TD" && $(this).html().toString().trim().length == 0) { cuantos.push(1); }
            if ($(this).prop("tagName") == "INPUT" && $(this).val().toString().trim().length == 0) { cuantos.push(1); }
        }
    });
   // alert(cantidad + "//" + cuantos.length);
    //return false;
    if (cantidad == cuantos.length) { parent.$.fancybox.close(); } else { if (verificarDatos()) { guardarEntrega(); } else { alert("Faltan campos por completar!"); } }
    //cantidad insumoN

});


function guardarEntrega() {
//    alert(PDT_ID);
//    return false;
                                                           //EXPEDIENTE             //PEDIDO
    var json = JSON.stringify({ "ENTREGA_ID": ENTREGA_ID, "EXP_ID": parent.G_ExpId, "EXP_PED_ID": PDT_ID, "P_ID": P_ID }); //parent.P_ID });
    // parent.G_ExpId, "EXP_PED_ID": PDT_ID }); //parent.P_ID });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/Compras_Guardar_CAB_Entrega_Internacion",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            guadarEntregaDET(Resultado.d);           
        }
    });
}

$("#btnSalirSinEntregar").click(function () {
    parent.$.fancybox.close();0
    //$("#btnCerrar").click();
});

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
            //window.location.reload(true);
            //alert(entregar);
            if (entregar == 1) { //cerrar,recargar e imprimir solo entregados al momento
                //alert(Resultado.d);

                parent.imprimirEntrega(Resultado.d, parent.G_ExpId, 1)
                entregar = 0;
            } else { parent.$.fancybox.close(); }
        },
        complete: function () { entregar = 0; }
    });
}

function generarDetalles() {
    var lista = new Array();


//    $(".entregado").each(function (index, item) {
//        if ($(this).html() == 0) { idsEntregadosImp.push($(this).data("PDT_ID")); }
//        $(this).html("1");
//    });

    $(".idFila").each(function () {

        // si esta entregando solo guarda los que se esta entregando asi obtengo los id de lo que se entrego para imprimir
        if (entregar == 1) {
            if ($("#entregado" + $(this).html()).html() == 0) {
                if (($("#entregar" + $(this).html()).is(':checked')) == true) {
                    var obj = {};
                    obj.CANTIDAD = $("#cantidad" + $(this).html()).html();
                    obj.ID = $("#insumoId" + $(this).html()).html();
                    obj.OBSERVACION = $("#observaciones" + $(this).html()).html();
                    obj.INSUMO = $("#insumoNombre" + $(this).html()).val();
                    obj.ENTREGADO = 1;
                    obj.ENTREGA_DETALLE_ID = $("#ENTREGA_DETALLE_ID" + $(this).html()).html();
                    obj.PRECIO = $("#PRECIO" + $(this).html()).html();
                    //alert(obj.CANTIDAD + "//" + obj.ID + "//" + obj.OBSERVACION + "//" + obj.INSUMO + "//" + obj.ENTREGADO + "//" + obj.ENTREGA_DETALLE_ID);
                    lista.push(obj);
                }
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
                //alert(obj.CANTIDAD + "//" + obj.ID + "//" + obj.OBSERVACION + "//" + obj.INSUMO + "//" + obj.ENTREGADO + "//" + obj.ENTREGA_DETALLE_ID);
                lista.push(obj);
                //alert(lista.length);
            }
        }
    });
   
    return lista;
}


$("#form1").submit(function (e) {
    e.preventDefault();
});