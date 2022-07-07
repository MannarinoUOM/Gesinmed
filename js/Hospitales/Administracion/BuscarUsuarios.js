parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Usuarios</strong>";

function Buscar() {
    var json = JSON.stringify({
        "Nombre": $('#txtBuscar').val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Usuario_Buscar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Usuarios_Encontrados,
        error: errores
    });
}

function Usuarios_Encontrados(Resultado) {
    var Usuarios = Resultado.d;
    $('#TablaUsuarios').empty();
    var Datos = "";
        $.each(Usuarios, function (index, usu) {Datos = Datos + "<tr onclick='javascript:Cargar_Usuario(" + usu.id + ");' ><td>" + usu.id + "</td><td style='display:none;'><img src='../img/usuarios/" + usu.usuario + ".jpg' onError='ErrorFoto(this)' class='AUfoto'/></td><td class='AUusuario'><div class='AUdatos'><div class='AUnombre'>" + usu.nombre + "</div><div class='AUnick'> Usuario: " + usu.usuario + "</div></div></td><td>" + usu.tipo + "</td></tr>";});
    $('#TablaUsuarios').html(Datos);
}

$("#txtBuscar").keyup(function () {
        Buscar();
    });

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    function ErrorFoto(theImage) {
        theImage.onerror = null;
        theImage.src = "../img/silueta.jpg";
    }

    function Cargar_Usuario(Id) {
        self.location = "UsuarioModificar.aspx?ID=" + Id;
    }

    Buscar();