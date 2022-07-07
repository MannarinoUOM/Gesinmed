<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Principal.aspx.cs" Inherits="Principal" %>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">    
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="css/barra.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="js/JPantalla.js" type="text/javascript"></script>



    <title></title>

<style>

.btn-novedades {
	-moz-box-shadow:inset 0px 1px 0px 0px #bbdaf7;
	-webkit-box-shadow:inset 0px 1px 0px 0px #bbdaf7;
	box-shadow:inset 0px 1px 0px 0px #bbdaf7;
	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #79bbff), color-stop(1, #378de5) );
	background:-moz-linear-gradient( center top, #79bbff 5%, #378de5 100% );
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#79bbff', endColorstr='#378de5');
	background-color:#79bbff;
	-moz-border-radius:6px;
	-webkit-border-radius:6px;
	border-radius:6px;
	border:1px solid #84bbf3;
	display:inline-block;
	color:#ffffff;
	font-family:arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:1px 1px 0px #528ecc; 
}.btn-novedades:hover {
	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #378de5), color-stop(1, #79bbff) );
	background:-moz-linear-gradient( center top, #378de5 5%, #79bbff 100% );
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#378de5', endColorstr='#79bbff');
	background-color:#378de5;
}.btn-novedades:active {
	position:relative;
	top:1px;
}

.responsive {
  width: 100%;
  max-width: 400px;
  height: auto;
}

body{font-family:Verdana, Geneva, sans-serif}
</style>
</head>
<body>
    <div>
 
        <div id="Novedades" class="DivNovedades" style="overflow-x:hidden; overflow-y:auto; padding-top:1%; position: relative">

          <div style="width:800px;margin-left:auto;margin-right:auto">

          <div style="position: relative; top: 200px;left: 330px">
          <a href="#TituloLasNovedades" style="display:none; padding-bottom:200px; margin-top:70px" class="btn-novedades">Ver Novedades</a>
          </div>
			
            <img style="margin-bottom:1%" src="img/Novedades/logoGris.jpg"/>
            <div class="TituloNov" style="width:60%; margin:auto; padding-bottom:1%"><asp:Literal ID="LSeccional" runat="server"></asp:Literal></div>
            <div class="BienvenidoUsuario" style=" height:70px"><asp:Literal ID="LUsuario" runat="server"></asp:Literal></div>
              
            <asp:Literal ID="lscript" runat="server"></asp:Literal>

            
            


            <!-- bloque donde muestra mensajes de contactos-->
<div class="box_gris_novedades" style="position:absolute; left:20px; top:110px;">
<div style="color:#696969">
<a class="btn btn-danger" href="COVID19/COVID19.htm">Información del COVID 19</a>
<span style=" display:inline-block; margin-bottom:2px; font-size:medium">
<b style="text-align:center; font-size:18px; color:#000000;">Soporte Técnico e Insumos </b>
<p style="text-align:center; font-size:14px; font-weight: bold;">(Toners, Impresores, Internet, Arya)</p>
<p style="text-align:center; font-size:14px">INT: 262</p>
<br/>
<b style="text-align:center; font-size:18px; color:#000000;">GesInMed</b>
<p style="text-align:center; font-size:14px; font-weight: bold;">Sistema Hospitalario</p>
<p style="text-align:center; font-size:14px">INT: 229/292/349</p>
</span>
<div style="font-size:14px; text-align:center;">
<p style="text-align:center; font-size:16px; font-weight: bold;">Horario de atención</p>
<p style="text-align:center; font-size:16px;">Lunes a viernes de 8-18 hs.</p>
<p style="text-align:center; font-size:16px; font-weight: bold;">Urgencias fuera de hora</p>
<p style="text-align:center; font-size:16px;">Por Whatsapp al 1140146992</p>
<a class="btn btn-primary" href="Internos/Internos Telefónicos.htm" style="margin-bottom:10000px"><i class="icon-white icon-bullhorn"></i> Ver Internos</a>
</div>
</div>
</div>
<!--fin del bloque de contacto por servicio de ayuda o soporte-->


<div class="box_gris_novedades_2" style="position:absolute; right:10px; top:110px;">
<div style="color:#696969">
<span style=" display:inline-block; margin:auto; font-size:large; width:90%; padding-top:4%">
<b style="text-align:center; font-size:15px; color:Red;">
<%--Señores Médicos.Se ha puesto operativo, en el Menú de Internación, PUNTO 19. El envío automatico al sector IMAGENES de Ordenes de Alta Complejidad. y dicho sector, las recibirá en forma Automática una vez realizadas. Gracias--%>
Se solicita a todos los profesionales del policlinico central que al generar órdenes de prácticas de estudios de imágenes (RX TC RMN ECO Y MAMO) lo hagan en el submenu correspondiente en el punto 20 ALTA COMPLEJIDAD  IMÁGENES. Esta acción posibilita que la orden así realizada sea posible verla directamente en el sector de imágenes para poder generar el turno sin desplazamiento de personal ni afiliados dentro del policlínico tal como se recomienda en las disposiciones COVID 19. Esto es valido para ordenes generadas en guardia, internacion y consultorios externos. Los profesionales que estén haciendo uso de atención por telemedicina también pueden realizar la orden por este método.

</b>

</span>
</div>
</div>








            <div class="TituloLasNovedades" id="TituloLasNovedades" style="width:40%; margin:auto; height:30px; margin-top:60px">Versiones y Cambios</div>
            <asp:Literal ID="LNovedades" runat="server"></asp:Literal>
            <span id="Nombre" runat="server" style="display:none;"></span>

            <br /><br /><br /><br />

        </div></div>
    </div>
        <script src="js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
        <link href="css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script>

       parent.$("#liCargaDiabetes").attr('rel', 'http://10.10.8.71:8095/AtConsultorio/Buscar_Paciente.aspx' + "?medico=" + Nombre_Usuario + "&tipoCarga=1");

       $("#Nombre").html(Nombre_Usuario);

//       $(document).ready(function () {
//           //alert(); 

//           $.ajax({
//               url: "json/firmaDigital.asmx/VerificarDeclaracionFirmaConfirmada",
//               type: "POST",
//               contentType: "application/json; charset=utf-8",
//               dataType: "json",
//               success: function (Resultado) {

//                   var tipo = (Resultado.d.toString().substring(0, 1));
//                   var medicoId = (Resultado.d.toString().substring(2, Resultado.d.toString().lenght));
//                   //alert(medicoId);
//                   switch (tipo) {
//                       case '1': // no confirmada
//                           $.fancybox({

//                               'autoDimensions': false,
//                               'href': 'Impresiones/Firma/ComprobanteFirmaConfirmadaLOGIN.aspx?medicoId=' + medicoId,
//                               'width': '75%',
//                               'height': '75%',
//                               'autoScale': false,
//                               'transitionIn': 'none',
//                               'transitionOut': 'none',
//                               'type': 'iframe',
//                               'hideOnOverlayClick': false,
//                               'enableEscapeButton': false,
//                               'onClosed': function () {
//                                   var r = confirm("CONFIRMA LA DECLARACION DE FIRMA?");
//                                   if (r) {
//                                       $.ajax({
//                                           type: "POST",
//                                           url: "../Json/firmaDigital.asmx/ConfirmarFirmaLogin",
//                                           data: '{id: "' + medicoId + '"}',
//                                           contentType: "application/json; charset=utf-8",
//                                           dataType: "json",
//                                           error: errores
//                                       });
//                                   }
//                               }
//                           });
//                           break;

//                       case '3': //medico sin firma escaneada
//                           alert("Envie un WhatsApp al núumero +54 9 11 4434-3251 con una foto de su firma y sello");
//                           break;
//                   }
//               },
//               error: errores
//           });
//       });

       function errores(msg) {
           var jsonObj = JSON.parse(msg.responseText);
           alert('Error: ' + jsonObj.Message);
       }

       $(document).ready(function () {
          // alert(window.innerHeight);
           $("#Novedades").css('height', window.innerHeight - 30);
       });

    </script>

</body>
</html>

