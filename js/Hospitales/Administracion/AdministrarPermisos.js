parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Editar Permisos</strong>";

var Usuario = 0;
var EditantoId = 0;
var objSecciones = new Array();
var max = 0;
$(document).ready(function () {

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


    if (GET["ID"] != "" && GET["ID"] != null) {
        EditantoId = GET["ID"];
        CargarSecciones();
        CargarSeccionesDet();
        //NombreUsuario();
    }
    if (GET["Usuario"] != "" && GET["Usuario"] != null) {
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > Usuarios > Editar Usuario > <strong>Editar Permisos</strong>";
        Usuario = 1;
    }

    if (GET["NUsu"] != "" && GET["NUsu"] != null) {
      $("#spanAyN").html(GET["NUsu"]);  
    }
});

function CargarSecciones() {
    var json = JSON.stringify({
        "Nombre": $('#txtBuscar').val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Cargar_secciones",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarSecciones_Encontrados,
        error: errores
    });
}

function NombreUsuario() {
    var json = JSON.stringify({
        "UsuarioId": EditantoId
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Nombre_Usuario_Id",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: NombreUsuario_Encontrados,
        error: errores
    });
}


function NombreUsuario_Encontrados(Resultado) {
    $("#spanAyN").html(Resultado.d);
}


function CargarSecciones_Encontrados(Resultado) {
    var Secciones = Resultado.d;
    $('#TSecciones').empty();
    var Datos = "";
    $.each(Secciones, function (index, sec) {    
        Datos = Datos + "<tr onclick='javascript:Renderizar(" + sec.cod + ",this);' ><td>" + sec.cod + "</td><td>" + sec.nombre + "</td></tr>";
    });
    $('#TSecciones').html(Datos);
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarSeccionesDet() {
    var json = JSON.stringify({
        "UsuarioId": EditantoId
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Cargar_secciones_det",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarSeccionesDet_Encontrados,
        error: errores
    });
}

function CargarSeccionesDet_Encontrados(Resultado) {
    var Secciones = Resultado.d;
    $.each(Secciones, function (index, sec) {
        if (sec.cod > max) { max = sec.cod; }
        var objS = {};
        objS.cod = sec.cod;
        objS.nombre = sec.nombre;
        objS.estado = sec.estado;
        objS.principal = sec.principal;
        objS.clase = sec.clase;
        objSecciones[sec.cod] = objS;

    });
}

function Renderizar(Principal, tabla) {
    $("#TSecciones tr").each(function (index) {
        $(this).removeClass("info");
    });
    $(tabla).addClass("info");
    var Datos = "";
    $('#TSeccionesDentro').empty();
    for (i = 0; i <= max; i++) {
        if (typeof (objSecciones[i]) != 'undefined') {
            if (objSecciones[i].principal == Principal) {
                Datos = Datos + "<tr onclick='javascript:Marcar(" + objSecciones[i].cod + ");' class='" + objSecciones[i].clase + "' ><td>";
                if(objSecciones[i].clase != 'info')
                {
                Datos = Datos + "<input id='ck" + objSecciones[i].cod + "' value='" + objSecciones[i].cod + "' type='checkbox'";                 
                if (objSecciones[i].estado) { Datos = Datos + " checked "; } 
                Datos = Datos + " >";
                }
                Datos = Datos + " </td><td>" + objSecciones[i].cod + "</td><td>" + objSecciones[i].nombre + "</td></tr>";
            }
        }
    }
    $('#TSeccionesDentro').html(Datos);
}

function Marcar(Cod) {
    objSecciones[Cod].estado = $("#ck" + Cod).is(':checked');
}

$("#btnGuardar").click(function () {
    var A = "";
    var i = 0;
    for (i = 0; i <= max; i++) {
        if (typeof (objSecciones[i]) != 'undefined')
        {
            if (objSecciones[i].estado) {
                A = A + "|" + objSecciones[i].cod + "|";
            }
        }
    }
    var json = JSON.stringify({
        "UsuarioId": EditantoId,
        "Permisos": A,
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Guardar_Permisos_Especiales",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(){
        alert("Permisos Actualizados");
        },
        error: errores
    });

});

function volver() {
    if (Usuario == 0) self.location = "UsuarioModificar.aspx?ID=" + EditantoId;
    else self.location = "UsuarioModificar.aspx?ID=" + EditantoId;
 }