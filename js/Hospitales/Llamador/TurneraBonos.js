var T = 8;
var TurneraId = 11;

//var msg = new SpeechSynthesisUtterance("la base de datos de virus ha sido actualizada.");


function Cargar_Turnos() {
    $.ajax({
        type: "POST",
        data: '{TurneraId: "' + TurneraId + '"}',
        url: "../Json/Turnera/TurneraBonos.asmx/H2_Turnera_Turnos_Leer",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Turnos_Cargadas,
        error: errores
    });
}

function Cargar_Turnos_Cargadas(Resultado) {

    
    var Llamado = Resultado.d;
    if (Llamado.paciente != null && Llamado.paciente != '') {
        Sonido();
        $("#NombreGrande").html(Llamado.paciente);
        $("#NombreDoctor").html("");
        $("#ConsultorioGrande").html(Llamado.box);


        var msg = new SpeechSynthesisUtterance(".................. " + Llamado.paciente + ". " + Llamado.box);
        msg.lang = 'ar-AR';
        window.speechSynthesis.speak(msg);

    { $('.blackbox').fadeIn(400); }
    

    $("#Paciente4").html($("#Paciente3").html()); $("#Consultorio4").html($("#Consultorio3").html());
    $("#Paciente3").html($("#Paciente2").html()); $("#Consultorio3").html($("#Consultorio2").html());
    $("#Paciente2").html($("#Paciente1").html()); $("#Consultorio2").html($("#Consultorio1").html());
    $("#Paciente1").html($("#Paciente0").html());$("#Consultorio1").html($("#Consultorio0").html());

    //$("#Paciente0").html(Llamado.paciente); $("#Consultorio0").html(Llamado.consultorio.replace('CONSULTORIO','CONS. '));
    $("#Paciente0").html(Llamado.paciente.substring(0,25)); $("#Consultorio0").html(Llamado.box);

    $(".blackbox").delay(4000).fadeOut(400);

    }

}

function Sonido() { 
    //Solo funciona con Chrome      
    var Sonido = new Audio('../sonido/llamador.mp3');
        Sonido.play();
    }

function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        //alert('Error: ' + jsonObj.Message);
        console.log('Error: ' + jsonObj.Message);
    }

    function Recargar() {
        $('#noticias').attr("src", $('#noticias').attr("src"));
    }


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

        if (GET["TurneraId"] != "" && GET["TurneraId"] != null) {
            TurneraId = GET["TurneraId"];            
        }

    });