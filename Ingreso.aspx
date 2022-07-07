<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Ingreso.aspx.cs" Inherits="Inicio" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> 
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="css/barra.css"/>



<script type="text/javascript" >
    
    function imgErrorPaciente(image) {
        image.onerror = "";
        image.src = "img/silueta.jpg";
        return true;
    }

    function Abrir_popUP() {
        var ancho = 815;
        var alto = 600;
        var posicion_x = (screen.width / 2) - (ancho / 2);
        var posicion_y = (screen.height / 2) - (alto / 2);  
        var pagina="Pacientes/Alta.aspx";
        var opciones="toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=508, height=365, top=85, left=140";
        window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
        }

        function AltaProvisoria() {
            var ancho = 815;
            var alto = 600;
            var posicion_x = (screen.width / 2) - (ancho / 2);
            var posicion_y = (screen.height / 2) - (alto / 2);
            var pagina = "Pacientes/NuevoAfiliado.aspx";
            var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=508, height=365, top=85, left=140";
            window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
        }

        function OError() {
            $("#barra_sup").hide();
        }


</script>


</head>

<body>
<div id="barra_sup">
  <div id="datos_usuario">
    <div class="pull-left"> <img src="img/logo.png"/> <span class="titulo_UOM">UOM GESTIÓN HOSPITALARIA - 
        <asp:Label ID="lblSeccional" runat="server" Text=""></asp:Label></span></div>
    <span class="pull-right"><a class="btn  cerrar_sesion" href="CerrarSession.aspx" ><i class="icon-off"></i>&nbsp;&nbsp;Cerrar sesión</a></span> <span class="pull-right"><a class="btn cerrar_sesion" href="#" style="display:none;" ><i class="icon-user"></i>&nbsp;&nbsp;Editar usuario</a></span> </div>
  <div class="clearfix"></div>
     <div id="menu_principal">
    <ul class="nav nav-pills">
      <li class="bmenu active" rel="Principal.aspx"><a href="#"></i>Inicio</a></li>
      <% Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();%>
       <% if (v.PermisoMenu("1")) { %>
      <li class="dropdown bmenu" id="Farmacia"> <a class="dropdown-toggle" data-toggle="dropdown" href="#">Farmacia<b class="caret"></b></a>
        <ul class="dropdown-menu">
        <% if (v.PermisoSM("15")) { %>  <li pric="Farmacia" rel="Farmacia/MostrarInsumos.aspx"><a href="#">Altas</a></li> <%} %>
        <% if (v.PermisoSM("10")) { %>  <li pric="Farmacia" rel="Farmacia/CargarPPS.aspx"><a href="#">Pedidos Servicios</a></li><%} %>
        <% if (v.PermisoSM("10")) { %>  <li pric="Farmacia" rel="Farmacia/CargarPedidoporPaciente.aspx"><a href="#">Pedidos Pacientes</a></li><%} %>
        <% if (v.PermisoSM("13")) { %>  <li pric="Farmacia" rel="Farmacia/CargarIM.aspx"><a href="#">Pedidos IM</a></li><%} %>
        <% if (v.PermisoSM("11")) { %>  <li pric="Farmacia" rel="Farmacia/EntregasIM.aspx"><a href="#">Entregas IM</a></li><%} %>
        <% if (v.PermisoSM("11")) { %>  <li pric="Farmacia" rel="Farmacia/EntregasPPS.aspx"><a href="#">Entregas Servicio</a></li><%} %>
        <% if (v.PermisoSM("11")) { %>  <li pric="Farmacia" rel="Farmacia/EntregasPPP.aspx"><a href="#">Entregas Pacientes</a></li><%} %>
        <% if (v.PermisoSM("12")) { %>  <li pric="Farmacia" rel="Farmacia/DevolucionporServicio.aspx"><a href="#">Devoluciones Servicios</a></li><%} %>
        <% if (v.PermisoSM("12")) { %>  <li pric="Farmacia" rel="Farmacia/DevolucionporPaciente.aspx"><a href="#">Devoluciones Pacientes</a></li><%} %>
        <% if (v.PermisoSM("14")) { %>  <li pric="Farmacia" rel="Farmacia/CargaRemitoProveedores.aspx"><a href="#">Remitos de proveedores</a></li><%} %>
        <% if (v.PermisoSM("16")) { %>  <li pric="Farmacia" rel="Farmacia/ControlStock.aspx"><a href="#">Control de stock</a></li><%} %>
        <% if (v.PermisoSM("17")) { %>  <li pric="Farmacia" rel="Farmacia/BonoContribucion.aspx"><a href="#">Bono contribución</a></li><%} %>
        <% if (v.PermisoSM("19")) { %>  <li pric="Farmacia" rel="Farmacia/RendicionBonoContribucion.aspx"><a href="#">Rendicion Bono Contribución</a></li><%} %>
        </ul>
      </li>
      <%} %>

      <% if (v.PermisoMenu("2"))
         { %>
      <li class="dropdown bmenu" id="Turnos"> <a class="dropdown-toggle" data-toggle="dropdown" href="#">Turnos<b class="caret"></b></a>
        <ul class="dropdown-menu">
          <% if (v.PermisoSM("20")) { %><li pric="Turnos" rel="Turnos/Centro.aspx" ><a href="#">Centro de Salud</a></li><%} %>
          <% if (v.PermisoSM("21")) { %><li pric="Turnos" rel="Turnos/Medicos.aspx"><a href="#">Médicos</a></li><%} %>
          <% if (v.PermisoSM("22")) { %><li pric="Turnos" rel="Turnos/GeneraciondeTurnos.aspx"><a href="#">Generación de Turnos</a></li><%} %>
          <% if (v.PermisoSM("23")) { %><li pric="Turnos" rel="Turnos/DarTurnos.aspx"><a>Pedidos de Turno</a></li><%} %>
          <% if (v.PermisoSM("24")) { %><li pric="Turnos" rel="Turnos/ConfirmarAtencion.aspx"><a href="#">Confirmar Turnos</a></li><%} %>
          <% if (v.PermisoSM("25")) { %><li pric="Turnos" rel="Turnos/CancelacionDeTurnos.aspx"><a href="#">Cancelar Turnos</a></li><%} %>
          <% if (v.PermisoSM("25")) { %><li pric="Turnos" rel="Turnos/QuitarTurnos.aspx"><a href="#">Eliminar Turnos</a></li><%} %>
          <%--<li class="divider"></li>
          <li pric="Turnos"><a href="#">Ayuda</a></li>--%>
        </ul>
      </li>
      <%} %>

      <% if (v.PermisoMenu("3"))
         { %>
      <li class="dropdown bmenu" id="Bonos"> <a class="dropdown-toggle" data-toggle="dropdown" href="#">Bonos <b class="caret"></b></a>
        <ul class="dropdown-menu">
           <% if (v.PermisoSM("30")) { %><li pric="Bonos" rel="Bonos/NuevoBono.aspx"><a>Nuevo Bono</a></li><%} %>
           <% if (v.PermisoSM("30")) { %><li pric="Bonos" rel="Bonos/BuscarBonos.aspx"><a>Buscar Bonos</a></li><%} %>
           <% if (v.PermisoSM("31")) { %><li pric="Bonos" rel="Bonos/RendicionBono.aspx"><a>Rendición de Bonos</a></li><%} %>
           <% if (v.PermisoSM("32")) { %><li pric="Bonos" rel="Bonos/RendicionBonoSeccional.aspx"><a>Rendicion de Bonos por Seccional</a></li><%} %>
           <% if (v.PermisoSM("33")) { %><li pric="Bonos" rel="Bonos/PracticaValor.aspx"><a>Práctica Valor</a></li><%} %>
           <% if (v.PermisoSM("34")) { %><li pric="Bonos" rel="Bonos/CancelarBono.aspx"><a>Cancelación de Bonos</a></li><%} %>
        </ul>
      </li>
      <%} %>

      <% if (v.PermisoMenu("4"))
         { %>
      <li class="dropdown bmenu" id="Internacion"> <a class="dropdown-toggle" data-toggle="dropdown" href="#">Internación<b class="caret"></b></a>
        <ul class="dropdown-menu">
          <% if (v.PermisoSM("40")) { %><li pric="Internacion" rel="Internacion/ServicioSalaCama.aspx"><a href="#">Servicio - Sala - Cama</a></li><%} %>
          <% if (v.PermisoSM("41")) { %><li pric="Internacion" rel="Internacion/Internaciones.aspx"><a href="#">Ingreso</a></li><%} %>
          <% if (v.PermisoSM("42")) { %><li pric="Internacion" rel="Internacion/Egreso.aspx"><a href="#">Egreso</a></li><%} %>
          <% if (v.PermisoSM("43")) { %><li pric="Internacion" rel="Internacion/CensoDiario.aspx"><a href="#">Censo Diario</a></li><%} %>
        </ul>
      </li>
      <%} %>

      <% if (v.PermisoMenu("5"))
         { %>
      <li class="dropdown bmenu" id="AtConsultorio"> <a class="dropdown-toggle" data-toggle="dropdown" href="#">At.Consultorio<b class="caret"></b></a>
        <ul class="dropdown-menu">
          <% if (v.PermisoSM("50")) { %><li pric="AtConsultorio" rel="AtConsultorio/PacientesDelDia.aspx"><a href="#">Pacientes del Día</a></li><%} %>
          <% if (v.PermisoSM("51")) { %><li pric="AtConsultorio" rel="HistoriaClinica/HistoriaClinica.aspx"><a href="#">Ver historia Clínica</a></li><%} %>
          <% if (v.PermisoSM("52")) { %><li pric="AtConsultorio" rel="AtConsultorio/RecepciondePacientes.aspx"><a href="#">Recepción de pacientes</a></li><%} %>
          <% if (v.PermisoSM("53")) { %><li pric="AtConsultorio" rel="AtConsultorio/Enfermeria_Entregar.aspx"><a href="#">Entrega de pedido</a></li><%} %>
          <% if (v.PermisoSM("55")) { %><li pric="AtConsultorio" rel="AtConsultorio/Historial_Llamado.aspx"><a href="#">Historial de llamados</a></li><%} %>
        </ul>
      </li>
      <%} %>

      <% if (v.PermisoMenu("6"))
         { %>
      <li class="dropdown bmenu" id="Guardia"> <a class="dropdown-toggle" data-toggle="dropdown" href="#">Guardia<b class="caret"></b></a>
        <ul class="dropdown-menu">
          <% if (v.PermisoSM("61")) { %><li pric="Guardia"><a href="#">Lista de pacientes</a></li><%} %>
          <% if (v.PermisoSM("62")) { %><li pric="Guardia"><a href="#">Historial guardia</a></li><%} %>
          <% if (v.PermisoSM("996")) { %><li pric="Guardia"><a href="#">Box guardia</a></li><%} %>
        </ul>
      </li>
      <%} %>

      <% if (v.PermisoMenu("8"))
         { %>
      <li class="dropdown bmenu" id="AtInternacion"> <a class="dropdown-toggle" data-toggle="dropdown" href="#">At.Internación <b class="caret"></b></a>
        <ul class="dropdown-menu">
          <% if (v.PermisoSM("81")) { %><li pric="AtInternacion"><a href="#">Lista de pacientes</a></li><%} %>
        </ul>
      </li>
      <%} %>

      <% if (v.PermisoMenu("9"))
         { %>
      <li class="dropdown bmenu" id="Quirofano"> <a class="dropdown-toggle" data-toggle="dropdown" href="#">Quirofano<b class="caret"></b></a>
        <ul class="dropdown-menu">
          <% if (v.PermisoSM("91")) { %><li pric="Quirofano" rel="Quirofano/CargadeTurnos.aspx"><a href="#">Turnos</a></li><%} %>
        </ul>
      </li>
      <%} %>

      
      <% if (v.PermisoMenu("9"))
         { %>
      <li class="dropdown bmenu" id="Li1"> <a class="dropdown-toggle" data-toggle="dropdown" href="#">Quirofano<b class="caret"></b></a>
        <ul class="dropdown-menu">
          <% if (v.PermisoSM("91")) { %><li pric="Endoscopía" rel="Endoscopia/CargadeTurnos.aspx"><a href="#">Turnos</a></li><%} %>
        </ul>
      </li>
      <%} %>


      <% if (v.PermisoMenu("99"))
         { %>
      <li class="dropdown bmenu" id="Administracion"> <a class="dropdown-toggle" data-toggle="dropdown" href="#">Administración<b class="caret"></b></a>
        <ul class="dropdown-menu">
          <% if (v.PermisoSM("990")) { %><li pric="Administracion" rel="Administracion/BuscarUsuarios.aspx"><a href="#">Usuarios</a></li><%} %>
          <% if (v.PermisoSM("991")) { %><li pric="Administracion" rel="Administracion/AdministracionEditarPerfiles.aspx"><a href="#">Perfiles de usuarios</a></li><%} %>
          <% if (v.PermisoSM("993")) { %><li pric="Administracion"><a href="#">Tablas de sistema</a></li><%} %>
          <% if (v.PermisoSM("994")) { %><li pric="Administracion"><a href="#">Relación usuario - medicos</a></li><%} %>
          <% if (v.PermisoSM("997")) { %><li pric="Administracion"><a href="#">Administración Turnera</a></li><%} %>
          <% if (v.PermisoSM("998")) { %><li pric="Administracion"><a href="#">Configuración Turnos</a></li><%} %>
          <% if (v.PermisoSM("999")) { %><li pric="Administracion" rel="Administracion/Feriados.aspx"><a href="#">Feriados</a></li><%} %>
          <% if (v.PermisoSM("995")) { %><li pric="Administracion"><a href="javascript:AltaProvisoria();">Alta Provisoria</a></li><%} %>
          <%--<li class="divider"></li>
          <li pric="Administracion"><a href="#">Ayuda</a></li>--%>
        </ul>
      </li>
      <%} %>

      <li class="bmenu"><a href="javascript:Abrir_popUP();"></i>Padrón UOM</a></li>


    </ul>
  </div>
  <!--Fin del menu principal--> 
  
  <!--Barra superior de color-->
  <div class="barra_dondeestoy">
    <div id="DondeEstoy"><strong>Inicio</strong></div>
  </div>
  <div id="uom_boton" class=" pull-right uom_boton">
    <div style="margin-top:-20px;"> <span class="avatar"><img src="img/Usuarios/<asp:Literal ID="LiteralUsuario" runat="server"></asp:Literal>.jpg" onerror="imgErrorPaciente(this);"/></span> <span class="nombre usuario"><asp:Literal ID="LiteralUsuario2" runat="server"></asp:Literal></span><img class="pull-right" src="img/show.png" style="margin-top:10px" >
    </div>
  </div>
</div>
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>


  

  <iframe id="Pagina" style="padding-top:20px;" src="" width="100%" frameborder="0" scrolling="no"></iframe>





<!--Pie de página-->
<div class="pie">
Desarrollado por <strong>Tres Componentes</strong>
</div>



<script src="js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="js/bootstrap.js"></script> 
<script src="js/Hospitales/Mensajes.js" type="text/javascript"></script>
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
       $('#barra_sup').animate({ top: "-93" }, 200);
       $('#lightbox').fadeOut(200);
   },
   function () {
       $('#barra_sup').animate({ top: "0" }, 200);
       $('#lightbox').fadeIn(200);
       $('#lightbox').height($('html').height());
   });

</script> 
<script type='text/javascript'>
    $(document).ready(function () {
        IframeHeight();

        window.setInterval(function () {
            Mensajes();
        }, 35700);

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


</script>
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


