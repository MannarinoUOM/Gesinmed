parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Perfiles</strong>";

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
        CargarPerfil(EditantoId);
    }
    else
    {
        CargarPerfil('');
    }
});



function CrearNuevo() {    
    var json = JSON.stringify({
        "NroPerfil": 0
        ,"Perfil": $('#txt_nuevoperfil').val()
        ,"Secciones": ''
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Guardar_Perfil",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CrearNuevo_Creado,
        error: errores
    });
}

function CrearNuevo_Creado(Resultado)
{
     var Secciones = Resultado.d;
     EditantoId = Secciones;
     CargarSecciones();
     CargarSeccionesDet();
     CargarPerfil(Secciones);
     $("#myModal").modal('hide');
     alert("Perfil Creado");
     self.location = "AdministracionEditarPerfiles.aspx?ID=" + EditantoId;         
}

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
        "Perfil": EditantoId
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Cargar_secciones_perfil_det",
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
                Datos = Datos + "<tr onclick='javascript:Marcar(" + objSecciones[i].cod + ");'><td>";
                Datos = Datos + "<input id='ck" + objSecciones[i].cod + "' value='" + objSecciones[i].cod + "' type='checkbox'";                 
                if (objSecciones[i].estado) { Datos = Datos + " checked "; } 
                Datos = Datos + " >";                
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
        "NroPerfil": EditantoId
        , "Perfil": ''
        , "Secciones": A
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Guardar_Perfil",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(){
        alert("Perfil Actualizado");
        },
        error: errores
    });

});

function volver() {
    self.location = "AdministracionEditarPerfiles.aspx?ID=" + EditantoId;
 }

 function CargarPerfil(Perfil) {
    $.ajax({
        type: "POST",
        data: '{Id: "0"}',
        url: "../Json/Administracion/Administracion.asmx/Perfiles_Listar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Perfiles = Resultado.d;
            $('#cbo_perfil').empty();
            $('#cbo_perfil').append(
              $('<option></option>').val("0").html("Selecione un perfil")
            );
            $.each(Perfiles, function (index, per) {
                $('#cbo_perfil').append(
              $('<option></option>').val(per.id).html(per.perfil)
            );
            });
            if (Perfil != '' && Perfil != null) {
                $("#cbo_perfil option[value=" + Perfil + "]").attr("selected", true);
            }


        },
        error: errores
    });
}

$("#cbo_perfil").change(function(){
    EditantoId = $("#cbo_perfil option:selected").val();
    CargarSecciones();
    CargarSeccionesDet();
    CargarPerfil(EditantoId);
});


$("#btnNuevo").click(function () {
$('#myModal').on('shown', function () {
    $("#txt_nuevoperfil").focus(); 
});

$("#btnaceptar").click(function () {
      CrearNuevo();
});

    $("#myModal").modal('show');           
});


