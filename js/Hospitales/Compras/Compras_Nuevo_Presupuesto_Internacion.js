var mostrarBtnArchivos = "inline";
var borrar = 1;
var nuevo = 0; // para no cargar las imagens de otros pedidos al generar uno nuevo
var PDT_ID = 0;


$(document).ready(function () {
    $("#imagenes").css('height', $(document).height() - ($(document).height() * 0.3));
    //alert($(document).height());
    //alert($(document).height() - ($(document).height() * 0.2));

    //////////carga combo proveedores
    List_Proveedores("Todos");
    //$("#contenedorReceta").addClass("elegirArchivoReceta");

    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });


    if (GET["nuevo"] != "" && GET["nuevo"] != null) { nuevo = GET["nuevo"]; }
    // carga solo para vista en auditoria
    if (GET["PDT_ID"] != "" && GET["PDT_ID"] != null) { PDT_ID = GET["PDT_ID"];}

    //alert($("#id_Expediente").val() + "/" + $("#id_Pedido").val() + "/" + $("#id_Presupuesto").val());
});


$("#seleccionarReceta").change(function () { $("#subirReceta").click();});
$("#seleccionarPresupuesto").change(function () { $("#subirPresupuesto").click(); });
//////////carga combo proveedores
function List_Proveedores(Todos) {
    $.ajax({
        type: "POST",
        data: '{Todos: "' + Todos + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $("#cbo_Proveedor").append($("<option></option>").val("0").html(""));
            $.each(Lista, function (index, Proveedor) {
                $("#cbo_Proveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
            });
        },
        error: errores,
        complete: cargarDatos()
    });
}
//////////carga combo proveedores


function cargarDatos() {
    if (PDT_ID > 0) {
        alert("0");
        borrar = 0;        
        $(".carga").attr('disabled', true);
        $(".cargaBtn").off();
        $(".cargaBtn").attr('disabled', true);
        mostrarBtnArchivos = "none";
        //$(".btn_borrar_img").live(function () { $(this).attr('display', 'none'); });
        $(".elegirArchivoReceta").attr('title', '');
        $(".elegirArchivoReceta").css('cursor', 'default');
        $(".elegirArchivoReceta").css('opacity', 10);
        traerDatosDET_presupuesto(PDT_ID);

        //$(".elegirArchivoReceta").click(function () { });
        //$(".elegirArchivoPresupuesto").click(function () { });


        $(".elegirArchivoReceta").off('click');
        $(".elegirArchivoPresupuesto").off('click');
    }
    //  carga para carga... en carga presupuesto
    else {
        alert("NO 0");
        //id del expediente...dhaaa
        $("#id_Expediente").val(parent.G_ExpId);
        //id del pedido...dhaaa
        $("#id_Pedido").val(parent.G_PedCAB);
        //id del presupuesto...dhaaa
        $("#id_Presupuesto").val(parent.G_PDT_ID);

        traerDatosDET_presupuesto(parent.G_PDT_ID);
        // alert(parent.G_PDT_ID);
        $(".elegirArchivoReceta").click(function () { if ($(this).hasClass("elegirArchivoReceta")) { if (parent.G_PDT_ID == 0) { alert("Debe guardar un presupuesto para poder adjuntar imagenes!"); return false; } else { $("#seleccionarReceta").click(); } } });
        $(".elegirArchivoPresupuesto").click(function () {
            if (parent.G_PDT_ID == 0) { alert("Debe guardar un presupuesto para poder adjuntar imagenes!"); return false; } else {
                $("#seleccionarPresupuesto").click();
            }
        });
    }
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


//////////////guardar presupuesto
$("#btnGuardarDET").click(function () {
    if (!ValidarDET()) return false;
    var json = JSON.stringify({ "PedidoDet": CargarObjDet() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/EXP_PEDIDOS_DET_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d > 0) {
                //                
                //                $("#btnLimpiarDET").click(); //Limpiar Campos
                parent.G_PDT_ID = Resultado.d;
                $("#id_Presupuesto").val(parent.G_PDT_ID);
                alert("Guardado");
                nuevo = 0;
                parent.CargarDetallesPED(parent.G_PedCAB);
            }
            else alert("Error al guardar detalle.");
        },
        error: errores
    });
});
//////////////guardar presupuesto


/////////////validar detalle
function ValidarDET() {
    if (parent.G_PedCAB <= 0) { alert("Seleccione Pedido."); return false; }

    if ($("#txtTipo").val().trim().length == 0) { alert("Ingrese Tipo."); return false; }
    if ($("#txtCantidad").val().trim().length == 0) { alert("Ingrese Cantidad."); return false; }
    if ($("#txtImporte").val().trim().length == 0) { alert("Ingrese Importe."); return false; }
    if ($("#cbo_Proveedor").val() == 0) { alert("Seleccione Proveedor."); return false; }
    
    return true;
}
/////////////validar detalle


////////////cargar objeto detalles del presupuesto
function CargarObjDet() {
    var DET = {};
    DET.PDT_ID = parent.G_PDT_ID; /// id del detalle del presupuesto
    DET.PDT_PED_ID = parent.G_PedCAB; //id del Pedido CAB ID
    DET.PDT_TIPO = $("#txtTipo").val();
    DET.PDT_CANTIDAD = 1; //$("#txtCantidad").val().trim();
    DET.PDT_SALDO = 1;// $("#txtCantidad").val().trim();
    DET.PDT_IMPORTE = $("#txtImporte").val().trim();
    DET.PDT_PROVEEDOR = $("#cbo_Proveedor :selected").val();
    DET.PDT_FEC_AUDIT = "01/01/1900";
    DET.PDT_ESTADO = 0;
    DET.PDT_INS = "NADA";

    //alert(DET.PDT_ID + "//" + DET.PDT_PED_ID + "//" + DET.PDT_TIPO + "//" + DET.PDT_CANTIDAD + "//" + DET.PDT_SALDO + "//" + DET.PDT_IMPORTE + "//" + DET.PDT_PROVEEDOR + "//" + DET.PDT_FEC_AUDIT + "//" + DET.PDT_ESTADO);
    return DET;
}
////////////cargar objeto detalles del presupuesto

///////////limpiar valores de controles detalle presupuesto
$("#btnLimpiarDET").click(function () {
    $(".detalles").val("");
    //parent.G_PDT_ID = 0;
});
///////////limpiar valores de controles detalle presupuesto


//////////trae datos del presupuesto
function traerDatosDET_presupuesto(G_PDT_ID) {
    alert("G_PDT_ID:" + G_PDT_ID);
    var json = JSON.stringify({ "PDT_ID": G_PDT_ID });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/EXP_PRESUPUESTO_TRAER_DATOS_DET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var obj = Resultado.d;
            $("#txtTipo").val(obj.tipo);
            $("#txtCantidad").val(obj.cantidad);
            $("#txtImporte").val(obj.importe);

            setTimeout(function () { $("#cbo_Proveedor").val(obj.proveedor); }, 555);


        },
        complete: function () {
            //si es unn remito nuevo no carga las imagenes
            // alert(G_PDT_ID);
            nuevo = 0;
            //alert(nuevo);
            if (nuevo != 1) { ListaDocumentacion_Exp(G_PDT_ID); }
        },
        error: errores
    });
 }


 //////////trae datos del presupuesto
function ListaDocumentacion_Exp(G_PDT_ID) {
    //alert("cargar docs");
     //alert("nuevo: " + nuevo);
     //$("#contenedorReceta").removeClass("elegirArchivoReceta");
     //$("#contenedorReceta").empty();
     var json = JSON.stringify({ "G_PDT_ID": G_PDT_ID, "tipo": 2});
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

                 var ruta = "documentacion_new/Compras_Adjuntos_Internacion/";

                 var fila = 1;
                 $.each(lista, function (index, item) {
                     // alert(lista.length);
                     var nombre_recortado = item.RutaArchivo.split("\\");
                     var nombre_corto = nombre_recortado[nombre_recortado.length - 1];
                     //$("#" + fila).attr('src', "../Compras_Internacion/" + item.RutaArchivo);
                     $("#" + fila).attr('src', item.rutaArchivoConfig + item.RutaArchivo);
                     $("#" + fila).css('width', '60px');
                     $("#" + fila).css('height', '60px');
                     $("#" + fila).removeClass("centrarImg");
                     $("#" + fila).removeClass("elegirArchivoReceta");
                     $("#" + fila).addClass("zoom");
                     $("#btnEli" + fila).css('display', mostrarBtnArchivos);
                     $("#btnEli" + fila).attr('data-id', item.IdDetalle);
                     //$("#btnDes" + fila).css('margin-left', '42%');
                     $("#btnDes" + fila).css('display', "inline");
                     //$("#btnDes" + fila).attr("href", ruta + item.RutaArchivo);
                     $("#btnDes" + fila).attr("href", "../Compras_Internacion/" + item.RutaArchivo);
                     $("#" + fila).after("<i class='icon-search lupa' style='display:none'></i>");
                     $(".lupa").show();
                     $(".lupa").click(function () { $(".zoom").click(); });
                     $("#" + fila).attr('title', '');

                     //$("#" + fila).css('height', "30%");
                     //                     switch (fila) {
                     //                         case 5:
                     //                             contenido += "<tr><td><img src='../Compras_Internacion/" + item.RutaArchivo + "' class='thumbnail'></img></td>"; fila = 1;
                     //                             break;

                     //                         case 4:
                     //                             contenido += "<td><img src='../Compras_Internacion/" + item.RutaArchivo + "' class='thumbnail'></img></td></tr>";
                     //                             break;

                     //                         default:
                     //                             contenido += "<td><img src='../Compras_Internacion/" + item.RutaArchivo + "' class='thumbnail'></img></td>";
                     //                             break;
                     //                     }



                     //contenido += "<td><img src='../Compras_Internacion/" + item.RutaArchivo + "' class='thumbnail' onerror='../img-icon.jpg'></img></td>";

                     fila += 1;


                     //                                          if (nombre_corto.substr(0, 1) == "1") {
                     //                                                              
                     //                                              ContenidoReceta = ContenidoReceta + "<tr><td style='padding:0px;width:300px; height:300px'>" +
                     //                                              //"<img id='imgSmile" + item.IdDetalle + "' src='" + ruta + item.RutaArchivo + "' class='contenedorImgIzquierdo thumbnail' style='margin-left:0px;padding-right:0px; padding-left:0px'/>" +
                     //                                      "<img id='imgSmile" + item.IdDetalle + "' src='../Compras_Internacion/" + item.RutaArchivo + "' class=' thumbnail' style='margin-left:0px;padding-right:0px; padding-left:0px'/>" +
                     //                                      "<a style='cursor:pointer; display:" + mostrarBtnArchivos + "' class=' btn_borrar_img  btn-mini' data-id='" + item.IdDetalle + "' title='Eliminar adjunto: " + nombre_corto + "'>&nbsp;<i class='icon-remove'></i></a>" + //eliminar
                     //                                      "<a style='cursor:pointer; display:" + mostrarBtnArchivos + "' class=' btn_subir_img btn-mini'  title='Subir nuevo adjunto'>&nbsp;<i class='icon-upload'></i></a>" + //subir nuevo
                     //                                      "<a style='cursor:pointer; width:10px;heigth:10px; display:inline; border:0px' class='btn_descargar_img btn-mini thumbnail' title='Descargar adjunto: " + nombre_corto + "' href='../Compras_Internacion/" + item.RutaArchivo + "' download>&nbsp;<i class='icon-download'></i></a>" + //descargar
                     //                                      "</td></tr>";

                     //                                          } else {
                     //                                              ContenidoPresupuesto = ContenidoPresupuesto + "<tr><td style='padding:0px'>" +
                     //                                              //"<img src='" + ruta + item.RutaArchivo + "' class='contenedorImgIzquierdo thumbnail' style='margin-left:0px;padding-right:0px; padding-left:0px'/>" +
                     //                                      "<img src='../Compras_Internacion/" + item.RutaArchivo + "' class='contenedorImgIzquierdo thumbnail' style='margin-left:0px;padding-right:0px; padding-left:0px'/>" +
                     //                                      "<a style='cursor:pointer; display:" + mostrarBtnArchivos + "' class='btn_borrar_img  btn-mini' data-id='" + item.IdDetalle + "' title='Eliminar adjunto: " + nombre_corto + "'>&nbsp;<i class='icon-remove'></i></a>" + //eliminar
                     //                                      "<a style='cursor:pointer; display:" + mostrarBtnArchivos + "' class=' btn_subir_img btn-mini'  title='Subir nuevo adjunto'>&nbsp;<i class='icon-upload'></i></a>" + //subir nuevo
                     //                                      "<a style='cursor:pointer; width:10px;heigth:10px; display:inline; border:0px' class='btn_descargar_img btn-mini thumbnail' title='Descargar adjunto: " + nombre_corto + "' href='../Compras_Internacion/" + item.RutaArchivo + "' download>&nbsp;<i class='icon-download'></i></a>" + //descargar
                     //                                      "</td></tr>";
                     //                                          }
                 });

                 //                                  if (ContenidoReceta != "") {
                 //                                      var finfilaReceta = "</table>";
                 //                                      $("#contenedorReceta").html(filaReceta + ContenidoReceta + finfilaReceta);
                 //                                  }

                 //                                  if (ContenidoPresupuesto != "") {
                 //                                      var finfilaPresupuesto = "</table>";
                 //                                      $("#contenedorPresupuesto").html(filaPresupuesto + ContenidoPresupuesto + finfilaPresupuesto);
                 //                                  }


                 //                 for (i = lista.length; i <= 11; i++) {
                 //                  
                 //                     switch (fila) {
                 //                         case 5:
                 //                            // alert("fila: " + fila + " || i: " + i );
                 //                             contenido += "<tr><td><img src='../img/Logo.png' class='thumbnail'></img></td>"; fila = 0;
                 //                             break;

                 //                         case 4:
                 //                         //alert("fila: " + fila + " || i: " + i );
                 //                             contenido += "<td><img src='../img/Logo.png' class='thumbnail'></img></td></tr>";

                 //                         default:
                 //                         //alert("fila: " + fila + " || i: " + i );
                 //                             contenido += "<td><img src='../img/Logo.png' class='thumbnail'></img></td>";
                 //                             break;

                 //                     }
                 //                     fila += 1;
                 //                 }

                 //                 pie = "</table>";

                 //                 $("#imagenes").html(encabezado + contenido + pie);
             }
         },
         error: errores
     });
 }
 //////////trae datos del presupuesto




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
     if (borrar == 1) {
         if (confirm("¿Desea dar de baja el adjunto?")) {
             var idArchivo = $(this).data("id");

             if (idArchivo > 0) BajaAdjunto(idArchivo);
             else alert("Archivo no válido.");
         }
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
             document.location = "../Compras/Compras_Nuevo_Presupuesto_Internacion.aspx";
         },
         error: errores
     });
 }
 //////////Dar de baja adjunto


 //////////subir nuevo adjunto
 $(".btn_subir_img").live("click", function () {
     if (parent.G_PDT_ID == 0) { alert("Debe guardar un presupuesto para poder adjuntar imagenes!"); return false; } else { $("#seleccionarReceta").click(); }
 });
  //////////subir nuevo adjunto

//  //////////Descargar  adjunto
 $(".btn_descargar_img").live("click", function () {
     if (parent.G_PDT_ID == 0) { alert("Debe guardar un presupuesto para poder adjuntar imagenes!"); return false; } //$("#seleccionarPresupuesto").click();
 });
  //  //////////Descargar adjunto



// $('#imgSmile3').on("hover", function () {
//     alert();
//     $(this).css("cursor", "pointer");
//     $(this).animate({ width: "500px" }, 'slow');
// });