parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Relación Usuario - Médicos</strong>";

var UsuarioId = 0;
var MedicoId = 0;
var T = true;

function CargarMedicos() {
var json = JSON.stringify({
    "Usuario": UsuarioId
   , "Todos": T
   ,"Medico": $("#txtMedico").val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/RelacionUsuarioMedicoCargar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MedicosCargar_Cargados,
        error: errores
    });
}

function MedicosCargar_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $('#TablaMedicos').empty();
    var Datos = "";
    $.each(Medicos, function (index, medico) {
        Datos = Datos + "<tr id='M" + medico.Id + "' class='" + medico.Especialidad + "' onclick='javascript:Actualizar(" + medico.Id + ");' ><td>" + medico.Id + "</td><td style='display:none;'><img src='../img/medicos/" + medico.Id + ".jpg' onError='ErrorFoto(this)' class='AUfoto'/></td><td class='AUusuario'><div class='AUdatos'><div class='AUnombre'>" + medico.Medico + "</div></div></td><td>&nbsp;</td></tr>";
    });
    $('#TablaMedicos').html(Datos);

}


function Actualizar(Id) {

//txtMedicoId es un txt hidden

    var json = JSON.stringify({
        "Usuario": UsuarioId
        ,"Medico": Id
        ,"Estado": $("#M"+Id).hasClass("info")
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Relacion_Usuaro_Medico_Cambiar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Actualiza_Actualizado,
        error: errores
    });
}

function Actualiza_Actualizado(Resultado)
{
    CargarMedicos();
}

function Buscar() {
    var json = JSON.stringify({
        "Nombre": $('#txtUsuario').val()
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
        $.each(Usuarios, function (index, usu) {
            Datos = Datos + "<tr id='U" + usu.id + "' onclick='javascript:Cargar_Usuario(" + usu.id + ");' ><td>" + usu.id + "</td><td style='display:none;'><img src='../img/usuarios/" + usu.usuario + ".jpg' onError='ErrorFoto(this)' class='AUfoto'/></td><td class='AUusuario'><div class='AUdatos'><div class='AUnombre'>" + usu.nombre + "</div><div class='AUnick'>" + usu.usuario + "</div></div></td></tr>";
        });
    $('#TablaUsuarios').html(Datos);
}

$("#txtUsuario").keyup(function () {
        Buscar();
    });

    $("#txtMedico").keyup(function () {
        CargarMedicos();
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
        UsuarioId = Id;
        $("#TablaUsuarios tr").removeClass("info");
        $("#U" + Id).addClass("info");
        CargarMedicos();
    }


    Buscar();

    $("#rdTodos").click(function () {
        if ($("#rdTodos").is(":checked")) { T = true; $("#txtMedico").removeAttr("disabled"); }
        else T = false;
        CargarMedicos();
    });

    $("#rdSeleccionado").click(function () {
        if ($("#rdSeleccionado").is(":checked")) { T = false; $("#txtMedico").attr("disabled", true); }
        else T = true;
        CargarMedicos();

    });