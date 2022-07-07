var T = 1;
var TurneraId = 1;


function Cargar_Turnos() {
    $.ajax({
        type: "POST",
        data: '{TurneraId: "' + TurneraId + '"}',
        url: "../Json/Turnera/Turnera.asmx/CargarAC",
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
        $("#ConsultorioGrande").html(Llamado.consultorio);
        $("#NombreDoctor").html(Llamado.medico);
        
    { $('.blackbox').fadeIn(400).delay(3000); }


    var msg = new SpeechSynthesisUtterance(".................. " + Llamado.paciente + ". Consultorio " + Llamado.consultorio.replace("Cons.",""));
    msg.lang = 'ar-AR';    
    window.speechSynthesis.speak(msg) ;
    

    $("#Paciente4").html($("#Paciente3").html()); $("#Consultorio4").html($("#Consultorio3").html());
    $("#Paciente3").html($("#Paciente2").html()); $("#Consultorio3").html($("#Consultorio2").html());
    $("#Paciente2").html($("#Paciente1").html()); $("#Consultorio2").html($("#Consultorio1").html());
    $("#Paciente1").html($("#Paciente0").html());$("#Consultorio1").html($("#Consultorio0").html());


    $("#Paciente0").html(Llamado.paciente);    
    if (Llamado.consultorio != null) {
        $("#Consultorio0").html(Llamado.consultorio.replace('CONSULTORIO', 'CONS. '));
    }
    

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