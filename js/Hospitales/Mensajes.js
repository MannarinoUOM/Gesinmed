
function Mensajes() {
    $.ajax({
        type: "POST",
        url: "Json/Mensajes/Mensajes.asmx/RevisarMensajes",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Mensajes_Cargados,
        error: Merrores
    });   
}

function Mensajes_Cargados(Resultado) {
    var Mensajes = Resultado.d;
    if (Mensajes.mensaje != null && Mensajes.encabezado != null) 
   {       
       if (!Mensajes.importante) {
           $("#NotiEncabezadoMensaje").html(Mensajes.encabezado);
           $("#NotiMensaje").html(Mensajes.mensaje);
           $(".NotiNombre").html(Mensajes.UsuarioEnviado);
           $("#NotiImagen").attr('src', 'img/usuarios/' + Mensajes.UsuarioEnviado + '.jpg');
           $("#MensajeNumero").val(Mensajes.numero);
           AbrirNotiBoxContenedor();
       }
       else {
           var Firma = "<br/><br/><img width='150px' src='img/Firmas_IMG/" + Mensajes.UsuarioEnviado + ".jpg'/>";  
           $("#MensajeNumero").val(Mensajes.numero);
           $("#MODAL_INFO_TITULO").html(Mensajes.encabezado);
           $("#MODAL_INFO_MENSAJE").html(Mensajes.mensaje + Firma);
           AbrirNotiBoxContenedorImportante();
       }
    }

}

function Pedidos() {
    $.ajax({
        type: "POST",
        url: "Json/Mensajes/Mensajes.asmx/Pedidos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Mensajes_Cargados,
        error: Merrores
    }); 
}

function Merrores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    var ErrordelMensajet = jsonObj.Message;
}

    function AbrirNotiBoxContenedor() {
        $(".NotiBoxContenedor").fadeIn(900);
    }

    function CerrarNotiBoxContenedor() {
        $(".NotiBoxContenedor").fadeOut(600);
        MensajeLeido();
    }


    function AbrirNotiBoxContenedorImportante() {        
        $('#MODAL_INFO').modal('show');
    }

    function CerrarNotiBoxContenedorImportante() {
        $('#MODAL_INFO').modal('hide');
        MensajeLeido();
    }


    $("#NotiImagen").error(function () {
        alert("E");
        $('#NotiImagen').attr('src', '/img/silueta.jpg');
    });


    function MensajeLeido() {
        $.ajax({
            type: "POST",
            data: '{Numero: "' + $("#MensajeNumero").val() + '"}',
            url: "Json/Mensajes/Mensajes.asmx/MensajeLeido",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: Merrores
        });
    }

    function Responder(Respuesta) {
        $.ajax({
            type: "POST",
            data: '{Numero: "' + $("#MensajeNumero").val() + '", Respuesta: "'+Respuesta+'"}',
            url: "Json/Mensajes/Mensajes.asmx/MensajeResponder",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: Merrores
        });
    }


	    function UsuarioActivo() {
        $.ajax({
            type: "POST",
            url: "Json/Usuarios/Usuarios.asmx/Activo",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Respuesta) {
                if (Respuesta.d != true) {
                    $("#Advertencia").show();
                }
                else {
                    $("#Advertencia").hide();
                }
            }
        });
    }
