

var EditantoId = 0;

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

    $("#txt_fecha").datepicker();
    $("#txt_fecha").mask("99/99/9999", { placeholder: "-" });
    $("#title").html("Crear Nuevo Usuario");
    $(".datos").attr("disabled",true);
    parent.document.getElementById("DondeEstoy").innerHTML = "Administración > Usuarios > <strong>Crear Nuevo Usuario</strong>";
    if (GET["ID"] != "" && GET["ID"] != null) {
        EditantoId = GET["ID"];
        CargarUsuario(GET["ID"]);
        $("#TFoto").show();
        $("#btnEditar").show();
        $("#title").html("Editar Usuario");
        $(".datos").removeAttr("disabled");
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > Usuarios > <strong>Editar Usuario</strong>";
    }
    else {
        CargarPerfil();
    }
    $("#txt_fecha").val('31/12/2099');
});


$("#txt_Nombre").change(function () {
    if (EditantoId == 0) {
        $("#txt_Nombre").val($("#txt_Nombre").val().trim().toUpperCase());
        var str = $("#txt_Nombre").val().split(' ');
        var Nombre = "";
        for (j = 0; j < str.length; j++) {
            if (j == 0) Nombre += str[0];
            else Nombre = str[j].substring(0, 1) + Nombre;
        }
        $("#txtUsuario").val(Nombre);
        $("#P1").val('1234');
        $("#P2").val('1234');
    }
});

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
            $('#cbo_perfil').append($('<option></option>').val("-1").html("Seleccione Perfil..."));
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


function CargarUsuario(EditantoId) {
    $.ajax({
        type: "POST",
        data: '{Id: "' + EditantoId + '"}',
        url: "../Json/Administracion/Administracion.asmx/Usuario_Id",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Usuario = Resultado.d;
            if (Usuario.id != null) {
                $("#cbo_tipo option[value=" + Usuario.tipo + "]").attr("selected", true);
            }

            $("#txt_Nombre").val(Usuario.nombre);
            $("#txt_fecha").val(Usuario.vencimiento);
            $("#txt_interno").val(Usuario.interno);
            $("#span_seccional").html(Usuario.seccional);
            $("#span_Usuario").html(Usuario.usuario);
            $("#txtUsuario").val(Usuario.usuario);
            $('#ck_activo').attr('checked', Usuario.activo);
            $('#FotoUsuario').attr('src', '../img/usuarios/' + Usuario.usuario + '.jpg');

            CargarPerfil(Usuario.nroperfil);

        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function Guardar() {
    if (confirm("¿Desea guardar el usuario?")) {
        if (Validar()) {
            var json = JSON.stringify({
                "nombre": $('#txt_Nombre').val()
        , "Id": EditantoId
        , "tipo": $('#cbo_tipo option:selected').val()
        , "activo": $("#ck_activo").is(':checked')
        , "interno": $('#txt_interno').val()
        , "fvencimiento": $('#txt_fecha').val()
        , "Clave1": $('#P1').val()
        , "Clave2": $('#P2').val()
        , "NroPerfil": $('#cbo_perfil option:selected').val()
        , "usuario": $('#txtUsuario').val()
            });

            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/Administracion/Administracion.asmx/Usuario_Guardar",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: GuardadoU,
                error: errores
            });
        }
    }
}

$("#btnGuardar").click(function () {
    Guardar();
});

function GuardadoU(Resuesta) {
    if (Resuesta.d != -1) {
        alert("Usuario Guardado");
        self.location = "BuscarUsuarios.aspx";
    }
    else {
        alert("El nombre de usuario ya existe, intente con otro nombre de usuario.");
        $(".datos").removeAttr("disabled");
        $("#P1").attr("disabled", true);
        $("#P2").attr("disabled", true);
    }
}



 function ErrorFoto(theImage) {
	      theImage.onerror = null;
	      theImage.src = "../img/silueta.jpg";
	  }


 webcam.set_hook('onComplete', 'my_completion_handler');

   
   function AbrirCamara() {      
           $('#datos_webcam').animate({ height: "350" }, 200);      
   }

    $("#btn_minimizarwebcam").click(
   function () {
       $('#datos_webcam').animate({ height: "100" }, 200);
   });

   $("#SacarFoto").click(
   function () {
       if ($("#txtUsuario").val() != "") {
       take_snapshot();
   }
   else {
       alert("Falta Guardar el Usuario");
   }
   });
   

    function take_snapshot() {
        // take snapshot and upload to server
        webcam.set_api_url('Foto.aspx?USUARIO=' + $("#txtUsuario").val());
        webcam.snap();
    }

    function my_completion_handler(msg) {
        // extract URL out of PHP output
        if (msg.match(/(http\:\/\/\S+)/)) {
            var image_url = RegExp.$1;
            // show JPEG image in page
            $("#FotoUsuario").attr('src', image_url);              

            // reset camera for another shot
            webcam.reset();
        }
        else alert("Error: " + msg);
    }


    $("#btnCancelar").click(function () {
        if (EditantoId != 0) {
            self.location = "UsuarioModificar.aspx?ID=" + EditantoId;
        }
        else {
            self.location = "UsuarioModificar.aspx";
        }
    });

    function Permisos() {
        self.location = "AdministrarPermisos.aspx?ID=" + EditantoId + "&Usuario=1" + "&NUsu=" + $("#txtUsuario").val(); //$("#span_Usuario").html();
    }

    $('#webcam2foto').click(
   function () {
       $('#webcam2contenedor').animate({ width: "300" }, 200);
   });

    $('#webcam2aceptar').click(
   function () {
       $('#webcam2contenedor').animate({ width: "0" }, 200);
   });

   function Validar() {
       if ($("#cbo_perfil :selected").val() == "-1") { alert("Seleccione perfil."); return false; }
       if ($("#txtUsuario").val() == "") { alert("Falta Cargar el nombre del usuario."); return false; }
       if ($("#txt_Nombre").val() == "") { alert("Falta Cargar el apellido y nombre del usuario."); return false; }
       if ($("#txt_fecha").val() == "") { alert("Falta Cargar el vencimiento del usuario."); return false; }
       return true;
   }