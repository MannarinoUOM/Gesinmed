<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TurneraIMG.aspx.cs" Inherits="Turnera_TurneraIMG" %>

<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script type='text/javascript' src='http://cdn.jsdelivr.net/jquery.marquee/1.3.9/jquery.marquee.min.js'></script>
    <script src="../js/Hospitales/Llamador/TurneraIMG.js" type="text/javascript"></script>
</head>

<style>
body {margin:0px; font-family: sans-serif; overflow: hidden; }
.fondo {background-color:#123878; display:block; width:100%; height:100%; position: relative;}
.pie {background-color:#1a59ab; width:100%; height:10%; bottom: 0; left: 0; position: absolute;}
.superior {background-color:#1a59ab; display:block; width:100%; height:10%;  top: 0; left: 0; position: absolute;}
.contenido {background-color:#123878; display:block; width:100%; height:80%; top: 10%; left: 0; position: absolute;}

.llamador_pantalla { top: 20%; width:80%; background-color:#1a59ab; position: absolute; z-index:10; left: 0;    right: 0;    margin-left: auto;    margin-right: auto; border-radius:10px; color:azure;}

.fuente_llamado {font-size:100px;}
.video {}

#div_consultorio_llamado {background-color:black; color:white; border-radius: 0 0 10px 10px;}

.letra_pasante {font-size:3em; color: azure;}
.hora { position:relative; }
.div_hora { 
		display: block;
		float: left;
		background-color: black;
		z-index: 10;
		position: absolute;		
		height:90%;
		padding-top: 1%;
		padding-left: 10px;
		padding-right: 10px;
}

#marquee_inf {white-space: nowrap;}

.marquee {
  width: 99%;
  overflow: hidden;  
  padding-top: 1%;  
}

.center {margin-left: auto;
    margin-right: auto;
    display: block }

.fondo_llamado {background-color:rgba(0, 0, 0, 0.49); width:100%; height:100%; display:none; position:relative; z-index:10}

.logoseparador_50 {width:50px;}
td {height:50px;}
tr {background-color:#d0d0d0;}
</style>



<div class="fondo">


	
<div class="fondo_llamado">
<div class="llamador_pantalla">
	<div class="fuente_llamado" id="div_paciente_llamado"> Nombre del paciente </div>
	<div class="fuente_llamado" id="div_medico_llamado"> El nombre del médico </div>	
	<div class="fuente_llamado" id="div_consultorio_llamado"> Consultorio 10 </div>	
</div>
</div>
	<div class="superior letra_pasante"> 
			<marquee id="marquee_sup" behavior="scroll" scrollamount="10" direction="left" width="100%" style="padding-top: 1%;">START Lorem ipsum dolor sit amet END</marquee>
	</div>
	<div class="contenido">
	
	

	<video id="VideoInformativo" height="100%" width="50%" autoplay loop>		
        <source src="http://10.10.8.71/Video/informativo.mp4" type="video/mp4">  		
		<source src="http://10.10.8.71/Video/Gripe.webm" type="video/webm" />
		<source src="http://10.10.8.71/Video/Gripe.ogv" type="video/ogg" />
	</video>	
	
    <div style="width:48%; float:right; ">
    <table style="font-size:30px; width:100%; border-spacing: 0px;">
    <tr id="TR0" style="background-color:#b2b4ff"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR1"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR2"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR3"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR4"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR5"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR6"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR7"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR8"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR9"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR10"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR11"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR12"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR13"><td></td><td></td><td></td><td></td></tr>
    <tr id="TR14"><td></td><td></td><td></td><td></td></tr>
    </table>
    </div>
	
	
	</div>
	<div class="pie letra_pasante">
		<div class="div_hora">
		<span class="hora"><span id="spanlahora">99:99</span> <span id="span_noticia_fuente"></span> </span>				
		</div>
		
		<div>
		
		
		
		<div class="marquee" id="marquee_inf">		
					
		</div>		
		</div>
	</div>
	

<script>

    var Llamados = []
    var llamado = {}

    llamado.nombre = "Gerardo";
    llamado.medico = "Dr. Sistemas";
    llamado.consultorio = "1";

    Llamados.push(llamado);



    var Mensaje_Superior = "Sr/Sra. Paciente tenga con usted el último recibo de sueldo.";
    $("#marquee_sup").html(Mensaje_Superior);

    var Mensaje_Inferior = "";
    $("#marquee_inf").html(Mensaje_Superior);


    var LasNoticias = "";

    function mueveReloj() {
        momentoActual = new Date()
        hora = momentoActual.getHours()
        minuto = momentoActual.getMinutes()
        segundo = momentoActual.getSeconds()

        str_segundo = new String(segundo)
        if (str_segundo.length == 1)
            segundo = "0" + segundo

        str_minuto = new String(minuto)
        if (str_minuto.length == 1)
            minuto = "0" + minuto

        str_hora = new String(hora)
        if (str_hora.length == 1)
            hora = "0" + hora

        if (segundo % 2 == 0) {
            horaImprimible = hora + "<span style='color:#1f1f1f;'>:</span>" + minuto;
        } else {
            horaImprimible = hora + "<span>:</span>" + minuto;
        }


        $("#spanlahora").html(horaImprimible);

        setTimeout("mueveReloj()", 1000)
    }

    mueveReloj();
    //window.setInterval(function () { Cargar_Turnos(); }, 5000);


    var Cual = Math.round(Math.random() * 6);    
    function CargarNoticiasRSS() {
        var Datoss = "";
        var Direccion = "";
        Cual++;
               
        
        if (Cual > 9) { Cual = 1; }
        if (Cual == 1) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/origen=2'; $("#span_noticia_fuente").html("Últimas Noticias"); }
        if (Cual == 2) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/categoria_id=131'; $("#span_noticia_fuente").html("Deportes"); }
        if (Cual == 3) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/categoria_id=120'; $("#span_noticia_fuente").html("Espectáculos"); }
        if (Cual == 4) { Direccion = 'http://www.minutouno.com/rss/tecnologia.xml'; $("#span_noticia_fuente").html("Tecnología"); }
        if (Cual == 5) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/categoria_id=272'; $("#span_noticia_fuente").html("Economía"); }
        if (Cual == 6) { Direccion = 'http://www.telam.com.ar/rss2/sociedad.xml'; $("#span_noticia_fuente").html("Sociedad"); }
        if (Cual == 7) { Direccion = 'http://www.telam.com.ar/rss2/cultura.xml'; $("#span_noticia_fuente").html("Cultura"); }
        if (Cual == 8) { Direccion = 'http://www.telam.com.ar/rss2/turismo.xml'; $("#span_noticia_fuente").html("Turismo"); }
        if (Cual == 9) { Direccion = 'http://www.telam.com.ar/rss2/ultimasnoticias.xml'; $("#span_noticia_fuente").html("Últimas Noticias"); }        
        
        var pubdt;
        $.ajax({ url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=30&output=json&q=' + encodeURIComponent(Direccion) + '&callback=?', dataType: 'json', success: function (data) {
            $.each(data.responseData.feed.entries, function (i, entry) {

                Datoss = Datoss + '<span class="RSSTitulo"><b>' + entry.title + ':</b> </span>';
                Datoss = Datoss + '<span class="RSSContenido">' + entry.content + ' </span>';

                Datoss = Datoss.replace(/<br+[^>]*>/gi, '');
                Datoss = Datoss.replace('<div>', '');

                Datoss = Datoss.replace(/["']/g, "");

                Datoss = Datoss.replace('</div>', '');
                Datoss = Datoss.replace('LA NACION', 'LA NOTICIA');
                Datoss = Datoss.replace(/<img src=+[^>]*>/gi, '');
                Datoss = Datoss + '<span class="RSSImg"><foto align="top" src="../img/LogoRSS.png" class="logoseparador_50"> </span>';                

            });
            Datoss = Datoss.replace(/<foto+/gi, '<img');
            LasNoticias = Datoss.replace(/["']/g, '');

            $("#marquee_inf").html(LasNoticias);
            $('.marquee').bind('finished', function () { $(this).marquee('destroy'); CargarNoticiasRSS(); }).marquee({ duration: 10000 });
        }
        });
    }


    CargarNoticiasRSS();

    function Algo() {
        Contador++;
        return Contador;
    }

    var vid = document.getElementById("VideoInformativo");

    function playVid() {
        vid.play();
    }

    function pauseVid() {
        vid.pause();
    }

    function Llamar() {
        pauseVid();
    }

    //$(".fondo_llamado").show();
    window.setInterval(function () { Cargar_Turnos(); }, 7000);

    
    var timeoutHandle = window.setTimeout(function () {
        var Mensaje_Superior = "Sr/Sra. Paciente tenga con usted el último recibo de sueldo.";
        $("#marquee_sup").html(Mensaje_Superior);
    }, (1000));
    

</script>	
	
</div>