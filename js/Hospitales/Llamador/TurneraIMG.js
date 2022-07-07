var T = 99;
var TurneraId = 99;
var Voz = 0;

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

function checkTime(i)
{ if (i < 10) { i = "0" + i; } return i; }

function Cargar_Turnos_Cargadas(Resultado) {

    var Llamado = Resultado.d;
    if (Llamado.paciente != null && Llamado.paciente != '') {
        pauseVid();
        Sonido();
        $("#div_paciente_llamado").html(Llamado.paciente);
        $("#div_consultorio_llamado").html(Llamado.consultorio);
        $("#div_medico_llamado").html(Llamado.medico);


        //today=new Date();
        //h=today.getHours();
        //m=today.getMinutes();
        //s=today.getSeconds();
        //m=checkTime(m);
        //s=checkTime(s);


        //$("#marquee_sup").html("Último llamado: " + h + ":" + m + ":" + s + " - " + Llamado.paciente + " Con.:" + Llamado.consultorio.replace("Cons.", ""));

        //timeoutHandle = window.setTimeout(function () {
        //    var Mensaje_Superior = "Sr/Sra. Paciente tenga con usted el último recibo de sueldo.";
        //    $("#marquee_sup").html(Mensaje_Superior);
        //}, (1000 * 60 * 30));



        $("#TR19").html($("#TR18").html());
        $("#TR18").html($("#TR17").html());
        $("#TR17").html($("#TR16").html());
        $("#TR16").html($("#TR15").html());
        $("#TR15").html($("#TR14").html());

        $("#TR14").html($("#TR13").html());
        $("#TR13").html($("#TR12").html());

        $("#TR12").html($("#TR11").html());
        $("#TR11").html($("#TR10").html());
        $("#TR10").html($("#TR9").html());
        $("#TR9").html($("#TR8").html());
        $("#TR8").html($("#TR7").html());
        $("#TR7").html($("#TR6").html());
        $("#TR6").html($("#TR5").html());
        $("#TR5").html($("#TR4").html());
        $("#TR4").html($("#TR3").html());
        $("#TR3").html($("#TR2").html());
        $("#TR2").html($("#TR1").html());
        $("#TR1").html($("#TR0").html());


        $("#TR0").html("<td>" + Llamado.paciente + "<td/><td>" + Llamado.consultorio.replace("Cons.", "") + "<td/>");
        console.log($("#TR0").html());

        { $('.fondo_llamado').fadeIn(400).delay(3000); }


        if (Voz == 1) {
            var msg = new SpeechSynthesisUtterance(".................. " + Llamado.paciente + ". Consultorio " + Llamado.consultorio.replace("Cons.", ""));
            msg.lang = 'ar-AR';
            window.speechSynthesis.speak(msg);
        }

        $("#Paciente0").html(Llamado.paciente);
        if (Llamado.consultorio != null) {
            $("#Consultorio0").html(Llamado.consultorio.replace('CONSULTORIO', 'CONS. '));
        }

        $(".fondo_llamado").delay(4000).fadeOut(400, function () {
            playVid();
        });

    }
}

function Cargar_Turnos_Cargadas2(Resultado) {


    var Llamado = Resultado.d;
    if (Llamado.paciente != null && Llamado.paciente != '') {
        Sonido();
        $("#NombreGrande").html(Llamado.paciente);
        $("#ConsultorioGrande").html(Llamado.consultorio);
        $("#NombreDoctor").html(Llamado.medico);

        { $('.blackbox').fadeIn(400).delay(3000); }


        var msg = new SpeechSynthesisUtterance(".................. " + Llamado.paciente + ". Consultorio " + Llamado.consultorio.replace("Cons.", ""));
        msg.lang = 'ar-AR';
        window.speechSynthesis.speak(msg);


        $("#Paciente4").html($("#Paciente3").html()); $("#Consultorio4").html($("#Consultorio3").html());
        $("#Paciente3").html($("#Paciente2").html()); $("#Consultorio3").html($("#Consultorio2").html());
        $("#Paciente2").html($("#Paciente1").html()); $("#Consultorio2").html($("#Consultorio1").html());
        $("#Paciente1").html($("#Paciente0").html()); $("#Consultorio1").html($("#Consultorio0").html());


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

    if (GET["Voz"] != "" && GET["Voz"] != null) {
        Voz = GET["Voz"];
    }

});