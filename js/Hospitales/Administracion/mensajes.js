$(document).ready(function () {
    TraerMensaje();
    cargarPerfiles();
});

function TraerMensaje() {
    //var json = JSON.stringify({ "afiliadoCuil": afiliadoCuil });
    $.ajax({
        type: "POST",
        url: "../Json/Administracion/Administracion.asmx/TraerMensaje",
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $.each(Resultado.d, function (index, item) {
                $("#txtTitulo").val(item.encabezado);
                $("#txtEnvia").val(item.UsuarioEnviado);
                $("#txtFecha").val(item.fecha);
                $("#txtMensaje").val(item.mensaje);
            });
        },
        complete: TraerUsuariosNotificadosMensaje(),
        error: errores
    });
}

function TraerUsuariosNotificadosMensaje() {
    //var json = JSON.stringify({ "afiliadoCuil": afiliadoCuil });
    $.ajax({
        type: "POST",
        url: "../Json/Administracion/Administracion.asmx/TraerUsuariosNotificadosMensaje",
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var encabezado = "<table class='table'><td><b>Usuario</b></td><td><b>Fecha</b></td>";
            var fila = "";
            var pie = "</table>";
            $.each(Resultado.d, function (index, item) {
                fila += "<tr><td>" + item.UsuarioNotificado + "</td><td>" + item.fecha + "</td></tr>" 
            });
            $("#listado").html(encabezado + fila + pie);
        },
        error: errores
    });
}

$("#btnGuardar").click(function () {
    if ($("#txtTitulo").val().trim().lenght <= 0) { alert("Ingrese un título para el mensaje."); return false; }
    if ($("#txtEnvia").val().trim().lenght <= 0) { alert("Ingrese quien envia el mensaje."); return false; }
    if ($("#txtMensaje").val().trim().lenght <= 0) { alert("Ingrese un mensaje."); return false; }

    var json = JSON.stringify({ "mensaje": $("#txtMensaje").val(), "encabezado": $("#txtTitulo").val(), "enviadoPor": $("#txtEnvia").val(), "perfil": $("#cboPerfil").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Administracion/Administracion.asmx/GenerarMensaje",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            alert("Mensaje Generado.");
        },
        error: errores
    });
});

$("#btnEliminar").click(function () {
    var r = confirm("Desea eliminar el mensaje?");

    if (r) {
        $.ajax({
            type: "POST",
            url: "../Json/Administracion/Administracion.asmx/LimpiarMensaje",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                alert("Mensaje Eliminado.");
                TraerMensaje();
            },
            error: errores
        });
    }
});

$("#mostrar").live("click", function () { TraerUsuariosNotificadosMensaje(); });


function cargarPerfiles() {
    $.ajax({
        type: "POST",
        data: '{Id: "0"}',
        url: "../Json/Administracion/Administracion.asmx/Perfiles_Listar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Perfiles = Resultado.d;
            $('#cboPerfil').empty();
            $('#cboPerfil').append(
              $('<option></option>').val("0").html("Todos los Perfiles")
            );
            $.each(Perfiles, function (index, per) {
                $('#cboPerfil').append(
              $('<option></option>').val(per.id).html(per.perfil)
            );
            });
//            if (Perfil != '' && Perfil != null) {
//                $("#cboPerfil option[value=" + Perfil + "]").attr("selected", true);
//            }
        },
        error: errores
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}