$(document).ready(function () {

    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    //id del deltalle del pedido
    if (GET["REM_ID"] != "" && GET["REM_ID"] != null) {
        //alert(GET["REM_ID"]);

        $("#id_Expediente").val(0);
        //id del pedido...dhaaa
        $("#id_Pedido").val(0);
        //id del presupuesto...dhaaa
        $("#id_Presupuesto").val(GET["REM_ID"]);
        ListaDocumentacion_Exp(GET["REM_ID"]);
    }

});

$(".elegirArchivoReceta").click(function () { if ($(this).hasClass("elegirArchivoReceta")) { $("#seleccionarReceta").click(); } });
$(".elegirArchivoPresupuesto").click(function () { $("#seleccionarPresupuesto").click(); });

$("#seleccionarReceta").change(function () { $("#subirReceta").click(); });
$("#seleccionarPresupuesto").change(function () { $("#subirPresupuesto").click(); });


//////////trae datos del presupuesto
function ListaDocumentacion_Exp(G_PDT_ID) {

    //$("#contenedorReceta").removeClass("elegirArchivoReceta");
    //$("#contenedorReceta").empty();
    var json = JSON.stringify({ "G_PDT_ID": G_PDT_ID, "tipo": 3 });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/Adjuntos_List_Internacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            //si se abre un presupuesto que ya contiene adjuntos se borra la pantalla por defecto y se carga esta

            if (lista.length > 0) {

                // saco el manejador del click al contenedor por defecto
                $("#contenedorReceta").off();

                //                 //para cargar la tabla de recetas
                var filaReceta = "";
                var ContenidoReceta = "";
                var finfilaReceta = "";

                //                 //para cargar la tabla de presupuestos
                var filaPresupuesto = "";
                var ContenidoPresupuesto = "";
                var finfilaPresupuesto = "";

                var filaReceta = "<table class='table table-hover' style='margin-bottom:0px'>";
                var filaPresupuesto = "<table class='table table-hover' style='margin-bottom:0px'>";



                var encabezado = "<table class='table table-hover' style='margin-bottom:0px'><tr>";
                var contenido = "";
                var pie = "";
               //var ruta = "http://10.10.8.66//documentacion_new/Compras_Adjuntos_Internacion/";

                var ruta = "../Compras_Internacion/";


                var fila = 1;
                $.each(lista, function (index, item) {
                    //alert(item.RutaArchivo);
                    var nombre_recortado = item.RutaArchivo.split("\\");
                    var nombre_corto = nombre_recortado[nombre_recortado.length - 1];
                    $("#" + fila).attr('src', "../Compras_Internacion/" + item.RutaArchivo); // produccion
                    //$("#" + fila).attr('src', ruta + item.RutaArchivo); // desarrollo
                    $("#" + fila).css('width', '60px');
                    $("#" + fila).css('height', '60px');
                    $("#" + fila).removeClass("centrarImg");
                    $("#" + fila).removeClass("elegirArchivoReceta");
                    $("#" + fila).addClass("zoom");
                    $("#btnEli" + fila).css('display', "inline");
                    $("#btnEli" + fila).attr('data-id', item.IdDetalle);
                    //$("#btnDes" + fila).css('margin-left', '42%');
                    $("#btnDes" + fila).css('display', "inline");
                    $("#btnDes" + fila).attr("href", ruta + item.RutaArchivo); // desarrollo
                    $("#btnDes" + fila).attr("href", "../Compras_Internacion/" + item.RutaArchivo);  // produccion
                    $("#" + fila).after("<i class='icon-search lupa' style='display:none'></i>");
                    $(".lupa").show();
                    $(".lupa").click(function () { $(".zoom").click(); });
                    $("#" + fila).attr('title', '');

                    fila += 1;
                }); // each
            } 
        },
        error: errores

    }); // ajax
    
}// funcion ListaDocumentacion_Exp
//////////trae datos del presupuesto


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


///zoom

$(".zoom").live("click", function () {
    //$("#fancybox-overlay").click(function () { return false; });
    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': "../Compras/zoomComprasInternacion.aspx?image=" + $(this).attr('src'),
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'type': 'iframe'
    });

});
///zoom


//////////Dar de baja adjunto
$(".btn_borrar_img").live("click", function () {
        if (confirm("¿Desea dar de baja el adjunto?")) {
            var idArchivo = $(this).data("id");

            if (idArchivo > 0) BajaAdjunto(idArchivo);
            else alert("Archivo no válido.");
        }
});


function BajaAdjunto(idArchivo) {
    var json = JSON.stringify({ "idArchivo": idArchivo });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/BajaAdjuntoPresupuesto",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function () {
            //ListaDocumentacion_Exp(parent.G_PDT_ID);
            alert("Adjunto dado de baja.");
           // document.location = "../Compras/scan_Rem_Comp_Internacion.aspx";
            window.location.reload(true);
        },
        error: errores
    });
}
//////////Dar de baja adjunto


//////////subir nuevo adjunto
$(".btn_subir_img").live("click", function () {
    if (parent.G_PDT_ID == 0) { alert("Debe generar una presupuesto para poder adjuntar imagenes!"); return false; } else { $("#seleccionarReceta").click(); }
});
//////////subir nuevo adjunto

//  //////////Descargar  adjunto
$(".btn_descargar_img").live("click", function () {
    if (parent.G_PDT_ID == 0) { alert("Debe generar una presupuesto para poder adjuntar imagenes!"); return false; } //$("#seleccionarPresupuesto").click();
});
//  //////////Descargar adjunto
