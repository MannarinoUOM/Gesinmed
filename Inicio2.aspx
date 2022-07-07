<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Inicio2.aspx.cs" Inherits="Inicio2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> 
    <title>Prueba</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="css/barra.css"/>
    <style type="text/css" media="screen, projection">
        @import url(http://assets.freshdesk.com/widget/freshwidget.css); 
    </style> 
    <link href="css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="css/jquery-ui.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" >
        var Nro_Box = -1;
        function imgErrorPaciente(image) {
            image.onerror = "";
            image.src = "img/silueta.jpg";
            return true;
        }

        function Abrir_popUP() {
            var ancho = 900;
            var alto = 600;
            var posicion_x = (screen.width / 2) - (ancho / 2);
            var posicion_y = (screen.height / 2) - (alto / 2);
            var pagina = "Pacientes/Alta.aspx";
            var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=508, height=365, top=85, left=140";
            window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
        }

        function AltaProvisoria() {
            var ancho = 900;
            var alto = 600;
            var posicion_x = (screen.width / 2) - (ancho / 2);
            var posicion_y = (screen.height / 2) - (alto / 2);
            var pagina = "Pacientes/NuevoAfiliado.aspx";
            var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=900, height=365, top=85, left=140";
            window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
        }

        function OError() {
            $("#barra_sup").hide();
        }

        function Perfil() {
            $('#uom_boton').click();
            $('#Pagina').attr('src', 'Administracion/CambiarClave.aspx');
            $('#Pagina').reload();
        }
    </script>

</head>

<body>
    <form id="form1" runat="server">
<div id="Advertencia" 
style="background-color:#1E00AE; width:100%; height:100%; display:none; position:absolute; z-index:99999; font-family:Consolas; font-weight:bold; font-size:20px; ">
    <div style="margin-left:45%; margin-top:100px;">
        <span style="text-align:center; background-color:#A9A9A9; color:#1E00AE; width:200px; display:block">
        GesInMed
        </span>
    </div>
    <div style="color:White; font-weight:bold; margin-top:100px; margin-left:100px;">
        Ha ocurrido un error con la sesión. Para continuar:<br /><br />
        Abra una pestaña del navegador y vuelva a iniciar sesión.<br /><br />
        Este mensaje desaparecerá automáticamente y podrá seguir con lo que estaba hace un instante.<br /><br />
        De no ser así comuniquese con sistemas al 229 o 349 de lunes a viernes de 9 a 20 hs.<br /><br /><br />
        Error: Perdida de conectividad.
    </div>
</div>

<div id="barra_sup">
    <div id="datos_usuario">
        <div class="pull-left"> 
            <img src="img/logo.png" id="logo_img" style="cursor:pointer;"/> 
            <span class="titulo_UOM">
            GESTIÓN INTEGRAL MÉDICA - <asp:Label ID="lblSeccional" runat="server" Text=""></asp:Label>
            </span>
        </div>
        <span class="pull-right">
            <a class="btn  cerrar_sesion" href="CerrarSession.aspx" ><i class="icon-off"></i>&nbsp;&nbsp;Cerrar sesión</a>
        </span> 
        <span class="pull-right">

        <a class="btn btn_ticket" href="#" onclick="AbrirTicket();" style="margin-top: 5px;"><i class="icon-tags"></i>&nbsp;&nbsp;Nuevo Ticket</a>
        <a class="btn cerrar_sesion" href="#" onclick="Perfil();"><i class="icon-user"></i>&nbsp;&nbsp;Cambiar Clave</a></span> </div>
        
        <div class="clearfix"></div>

        <div id="menu_principal">
        <ul class="nav nav-pills">
<!--muestra los menues-->



<!----------------------------------->
   <!--variables auxiliares para el control de los menues principales, para que no se repitan-->
   <%int cont = 0; %>
   <%int total = 0; %>
   
   <% foreach (var _listaMenuesDinamicoLista in menuesPrincipalLista)
       { %> 
       <% cont = total;%>
       <% total++;%>
       
        <!--preguntamos si debe crear este MENU principal por que el usuario tiene permiso de ver los submenues/items del menu-->
        <% foreach (var _listaTemp in submenuesDinamicoLista)
        { %> 
             
            <% if (_listaMenuesDinamicoLista.Cod.ToString() == _listaTemp.Principal && cont < total)
            { %>
            
            <% cont++;%>
                <div>
                    <li class="dropdown bmenu" id="Li1" style="margin-right:20px; float: left;"> 
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#"><%= _listaMenuesDinamicoLista.Nombre%><b class="caret"></b></a>
                        <ul class="dropdown-menu"> 

                        <!--recorre toda la tabla de permisos para los SUB MENUES de los usuarios (el admin puede ver todos los SUBmenues)-->
                       <% foreach (var _listaSubmenuesDinamicoLista in submenuesDinamicoLista)
                           { %>
                                <!--Verificamos que sea un item de submenu-->
                                <% if (_listaSubmenuesDinamicoLista.Principal != "")
                                { %>
                                    <% if (Convert.ToInt32(_listaSubmenuesDinamicoLista.Principal) == _listaMenuesDinamicoLista.Cod)
                                    { %>
                                        <li rel="<%= _listaSubmenuesDinamicoLista.LinkPaginas%>"><a href="#"><%= _listaSubmenuesDinamicoLista.Nombre%></a></li>
                                    <% }%>
                                <% }%>
                        <% }%>
                        </ul>
                    </li>
                </div>
            <% }%>
        <% }%> 
          
<% }%>
<!----------------------------------->


  <!--Fin del menu principal--> 
 
  <!--Barra superior de color-->
  <div class="barra_dondeestoy" style="cursor:pointer;">
    <div id="DondeEstoy"><strong>Inicio</strong></div>
  </div>
  <div id="uom_boton" class=" pull-right uom_boton">
    <div style="margin-top:-20px;"> <span class="avatar"><img src="img/Usuarios/<asp:Literal ID="LiteralUsuario" runat="server"></asp:Literal>.jpg" onerror="imgErrorPaciente(this);"/></span> <span class="nombre usuario"><asp:Literal ID="LiteralUsuario2" runat="server"></asp:Literal></span><img class="pull-right" src="img/show.png" style="margin-top:10px" >
    </div>
  </div>





</div>
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>
              <input type="hidden" id="cantidad" runat="server" />

  <iframe id="Pagina" style="padding-top:40px;" src="Principal.aspx" width="100%" frameborder="0" scrolling="no"></iframe>





<!--Pie de página-->
<div class="pie">
Desarrollado por <strong>Tres Componentes S.R.L.</strong> 
<div runat="server" id="Version" style=" margin-right:10px;float:right;"></div>
</div>



<script src="js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="js/bootstrap.js"></script> 
<script src="js/Hospitales/Mensajes.js" type="text/javascript"></script>
<script type="text/javascript" src="http://assets.freshdesk.com/widget/freshwidget.js"></script>
<script type="text/javascript" src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
<script src="js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script>
    $(document).ready(function () {
        $('#txt_Codigo').focus();

        $('#menu_principal li').click(function () {
            var url = $(this).attr('rel');
            if (url != undefined) {
                var Prin = $(this).attr('pric');
                $('li').removeClass("active");
                $('#' + Prin).addClass("active");
                $(this).addClass("active");
                $('#uom_boton').click();
                $('#Pagina').attr('src', url);
                $('#Pagina').reload();
            }
        });

        $.ajax({
            type: "POST",
            url: "../Json/Diabetes.asmx/TraerUsuarioExterno",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#liCargaDiabetes").attr('rel', 'http://10.10.8.71:8095/AtConsultorio/Buscar_Paciente.aspx' + "&medico=" + Resultado.d);
            },
            error: errores
        });

        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert('Error: ' + jsonObj.Message);
        }

    });
</script> 

<!--Barra sup--> 
<script>
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    });




    $('#uom_boton').click(function () {
        $("body").trigger("click")
    });

    $('#uom_boton').toggle(
   function () {
       $('#barra_sup').animate({ top: "-120" }, 200);
       $('#lightbox').fadeOut(200);
   },
   function () {
       $('#barra_sup').animate({ top: "0" }, 200);
       $('#lightbox').fadeIn(200);
       $('#lightbox').height($('html').height());
   });

</script>
<div id="Modal" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">    
    <h3 id="H2"></h3>
  </div>
  <div class="modal-body">

    <li>¿Desea visualizarlas?</li>
    </ul>
    <p></p>
    <p></p>
    <p></p>

  </div>
  <div class="modal-footer">
    <button onclick="si();" class="btn" data-dismiss="modal" aria-hidden="true">Si</button>    
    <button onclick="javascript:window.close();" class="btn" data-dismiss="modal" aria-hidden="true">No</button>   
  </div>
   </div> 
<script type='text/javascript'>
    $(document).ready(function () {
        IframeHeight();

        window.setInterval(function () {
            Mensajes();
        }, 35700);
		
		window.setInterval(function () {
			UsuarioActivo();
        }, 15000);

        <% if (v.PermisoSM("18")) { %>  
        window.setInterval(function () {
            Pedidos();
        }, 20000);
        <%} %>        
        
    });
    $(window).resize(IframeHeight);

    function IframeHeight() {
        var newHeight = $(window).height() - 40 + "px";
        $('#Pagina').css("height", newHeight);
        $('#Pagina').css("width", $(window).width() - 10 + "px");
    }

    $("#logo_img").click(function () {
       $('#uom_boton').click();
       $('#Pagina').attr('src', 'Principal.aspx');
       $("#DondeEstoy").empty();
       $("#DondeEstoy").html('<strong>Inicio</strong>');
       $('#Pagina').reload();
    });

    $(".barra_dondeestoy").click(function () {
        $('#uom_boton').click();
    });

        var cantidad = $("#cantidad").val();
        if (cantidad > 0) {
                $("#H2").html("Usted tiene Interconsultas Pendientes (" + cantidad + ").");
                $("#Modal").modal('show');

        }

    function si(){
       $('#Pagina').attr('src', "AtInternados/InterconsultaMedico.aspx");
       $('#uom_boton').click();
    }
</script>
<script>
    function AsignarBox() {
        alert("Usuario de GesInMed:\nLe informamos que ya no se debe asignar el nro. de box, el sistema lo asigna de manera automática.");
        return;
        var field;
        while (true) {
            var box = prompt("Ingrese el número de box desde el cual otorgará los turnos").toLowerCase();
            if (!box || /^(1|2|3|4|5|6|7|8|9|10|11|12)$/.test(box)) {
                boxes = "Boxes " + ("1|2|3|4|5|6|7|8|9|10|11|12".split("|").indexOf(box) + 1);

                $.ajax({
                    type: "POST",
                    url: "Json/Turnera/TurneraBonos.asmx/Asignar_Box_Bonos_Turnos",
                    data: '{Box: "' + box + '"}',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {
                        alert("Se le ha asignado el Box " + box);
                        Nro_Box = box;
                        $("#span_nro_box").html(box);
                    },
                    error: function () {
                        alert("No se ha podido asignar el box");
                    }
                });

                break;
            } else {
                alert("Ingrese un Box válido");
            }
        }
    }

    $('a.dropdown-toggle, .dropdown-menu a').on('touchstart', function (e) {
        e.stopPropagation();
    });

    function AbrirTicket() {
        $.fancybox(
		{
		    'autoDimensions': false,
		    'href': "https://gesinmed.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Soporte+GesInMed&submitTitle=Enviar&submitThanks=A+la+brevedad+sera+respondido%2C+caso+contrario+notifique+al+int%3A+229&screenshot=No",
		    'width': '70%',
		    'height': '90%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
    }
	
    </script>

    <asp:Literal ID="lit_java_script" runat="server"></asp:Literal>

</body>
</html>
<div class="NotiBoxContenedor"> 
    <input id="MensajeNumero" type="hidden" />
    <button type="button" class="close" onclick="javascript:CerrarNotiBoxContenedor();">&times;</button>
    <div id="NotiEncabezado" class="NotiBoxHeader"><i class="icon-info-sign icon-white"></i>&nbsp;&nbsp;&nbsp;<span id="NotiEncabezadoMensaje">Un poco de Humor :)</span></div>
    <div class="NotiAutor"><img id="NotiImagen" src="img/silueta.jpg" class="NotiAvatar"></img>&nbsp;por<div class="NotiNombre">Nombre de usuario</div></div>
    <div id="NotiMensaje" class="NotiBoxBody">        

    </div>
</div>

<!-- Modal INFORMACION IMPORTANTE-->
<div class="modal fade" id="MODAL_INFO" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">        
        <h4 class="modal-title" id="MODAL_INFO_TITULO">¡IMPORTANTE!</h4>
      </div>
      <div class="modal-body">
        <div id="MODAL_INFO_MENSAJE"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="CerrarNotiBoxContenedorImportante();">Aceptar</button>        
      </div>
    </div>
  </div>
</div>

</form>


