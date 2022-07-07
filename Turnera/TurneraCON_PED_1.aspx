<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TurneraCON_PED_1.aspx.cs" Inherits="Turnera_TurneraCON_PED_1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Turnera 2.0</title>
<link href="../css/turnera.css" rel="stylesheet" type="text/css" />

<style>
.ContenedorTurnos {margin-left:0px;}
</style>

</head>
<body>

<div class="blackbox">
<div class="TurnoPrincipal rojo">
        <div id="NombreGrande"></div>
        <div id="ConsultorioGrande"></div>
        <div id="NombreDoctor" class="NombreDoctor"></div>
</div>
</div>

<div class="BloquePrincipal">
<div class="BloqueA">
<div class="Logo"><img src="../img/Turnera/logo.png"/></div>
</div>

<div class="ContenedorTurnos">
<div class="fondoturnos"><img src="../img/Turnera/fondoturnos.png"/></div>
    <div class="Turno rojo" >
        <div id="Paciente0" class="Dato1"></div>
        <div id="Consultorio0" class="Dato2"></div>
        <div class="clearfix"></div>
    </div>
    <div class="Turno">
    	<div class="turnosombra"></div>
        <div id="Paciente1" class="Dato1"></div>
        <div id="Consultorio1" class="Dato2"></div>
        <div class="clearfix"></div>
    </div>
    <div class="Turno">
    	<div class="turnosombra"></div>
        <div id="Paciente2" class="Dato1"></div>
        <div id="Consultorio2" class="Dato2"></div>
        <div class="clearfix"></div>
    </div>
    <div class="Turno">
    	<div class="turnosombra"></div>
        <div id="Paciente3" class="Dato1"></div>
        <div id="Consultorio3" class="Dato2"></div>
        <div class="clearfix"></div>
    </div>
    <div class="Turno">
    	<div class="turnosombra"></div>
        <div id="Paciente4" class="Dato1"></div>
        <div id="Consultorio4" class="Dato2"></div>
        <div class="clearfix"></div>
    </div>
</div>

</div>
<div class="Pie">
    <div class="Media">
<%--<iframe src="http://www.youtube.com/embed/MPj_uBA2Tps?rel=0&wmode=opaque&autoplay=1&loop=1" frameborder="0" allowfullscreen></iframe>    </div>--%>
<%--<iframe src="http://www.youtube.com/embed/AqXr_Li0NNM?rel=0&wmode=opaque&autoplay=1&loop=1" frameborder="0" allowfullscreen></iframe>    </div>--%>

</div>

<%--<div>
<video controls="controls" autoplay="autoplay">
  <source src="movie.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
</div>--%>



    <div class="BarraInferior">
        <div class="boxinformativo">
            <div class="hora" id="laHora"></div>
            <div class="tipoContenido"><div class="tituloNoticia">NOTICIAS</div><img src="../img/Turnera/mundi.png"/></div>
        </div>
<div class="contenedoriframe">
<iframe name="pagina" id="noticias" class="iframe" src="RSS.html" scrolling="no" border="0" frameborder="0" target="_blank"></iframe>
</div>

    </div>
</div>
</body>
</html>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/Llamador/TurneraCON_PED_1.js" type="text/javascript"></script>
<script src="../js/Hospitales/Llamador/scripts.js" type="text/javascript"></script>

<script>

    //    $(document).keypress(function (e) {
    //        { $('.blackbox').fadeIn(400); }
    //    });


    $(window).resize(function () {
        Acomodar();
    });

    function Acomodar() {
        $('.BloquePrincipal').height($('body').height() - 94);
    }


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


        $("#laHora").html(horaImprimible);

        setTimeout("mueveReloj()", 1000)
    }

    mueveReloj();
    window.setInterval(function () { Cargar_Turnos(); }, 10000);

    Acomodar();

    function Limpieza_Pantalla() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        //t = setTimeout('Refrescar_Pantalla()', (((30 - (m % 30) - ((s > 0) ? 1 : 0)) * 60) + (60 - s)) * 1000);
        //window.setInterval(function () { Refrescar_Pantalla()(); }, (((30 - (m % 30) - ((s > 0) ? 1 : 0)) * 60) + (60 - s)) * 1000);
        window.setInterval(function () { Refrescar_Pantalla(); }, 1000 * 60 * 60);
    }

    function Refrescar_Pantalla() {
        var hora = new Date();
        var hh = hora.getHours();
        var mm = hora.getMinutes();

        if (hh >= 22 && hh < 23) {
            if (mm >= 00 && mm <= 59) {
                window.location.href = 'http://10.10.8.71/Turnera/TurneraCON_PED_1.aspx';
            }
        }
    }

    Limpieza_Pantalla();

</script>
	



