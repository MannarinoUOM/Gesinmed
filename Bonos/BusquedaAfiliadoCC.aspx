<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BusquedaAfiliadoCC.aspx.cs" Inherits="Bonos_BusquedaAfiliadoCC" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
   <div class="clearfix">
    </div>
    <script type="text/javascript">        parent.document.getElementById("DondeEstoy").innerHTML = "Bonos > <strong>Cuenta Corriente Afiliados</strong>"; </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color:rgb(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="contenedor_bono" style="height:400px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Cuenta Corriente Afiliados</span></div>
                <form class="form-horizontal">
                <div class="control-group" style="display:none;">
                    <label class="control-label">
                        Nro. Turno</label>
                    <div class="controls">
                        <input id="txtnroturno" type="text" placeholder="Nro. Turno">
                    </div>
                </div>
                <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC">
                      </select>          
                   </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        N°</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" class="numero" placeholder="Nro. de documento sin puntos">
                        <input id="txtdocumento" type="hidden" />
                        <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
                        <input id="discapacidad_val" value="" type="hidden"/>
                        <input id="verificarPMI" value="" type="hidden"/>
                        <input id="PMI_val" value="" type="hidden"/>
                        <input id="FechaPMI" value="" type="hidden" />
                        <input id="discapacidad_paga" value="" type="hidden"/>
                        <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
                        <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" class="numero" type="text" placeholder="Ej: 99123456789">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtPaciente">
                        Paciente</label>
                    <div class="controls">
                        <input id="txtPaciente" placeholder="Apellido Nombre" type="text" class="span3">
                        <a id="btnBuscarPaciente"  class="btn"><i class="icon-search icon-black">
                        </i></a>
                    </div>
                </div>
                <div id="controlTelefono" class="control-group">
                    <label class="control-label">
                        Teléfono</label>
                    <div class="controls">
                        <input id="txtTelefono"  maxlength="13" placeholder="Ej. 43625910" type="text">
                    </div>
                </div>
        
        <div id="controlSeccional" class="control-group">
        
          <label class="control-label" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" />
          <input type="hidden" id="afiliadoCuil" />
          <input type="hidden" id="afiliadoIdVPN" />
              <select id="cboSeccional">
                <option value="0">Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" style="display:none;"></select>          

           </div>

        </div>

                </form>
       <div class="clearfix"></div>
                <div class="control-group">
                    <div class="controls pagination-centered"> 
                        <a class="btn btn-danger" href="BusquedaAfiliadoCC.aspx?CC=1&sector=CUENTA CORRIENTE AFILIADOS" tabindex="-1" id="btnCancelarPedidoTurno" style="display: none;">Otro Paciente</a> 
                        <a class="btn" tabindex="-1" id="btnactualizar" style="display: none;">Actualizar</a>
                        <button class="btn btn-info" id="desdeaqui2" tabindex="1" style="display: none;">Siguiente</button>
                        <a class="btn btn-primary" target="popup" onclick="window.open('http://www.sssalud.gob.ar/index/index.php?b_publica=Acceso+P%FAblico&user=GRAL&opc=bus650','SSS','width=800,height=600, left=100    ')">SSS</a>  
                        <div class="clearfix"></div>
                    </div>              
                </div>
            </div>
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="width:1100px; height:600px">
            <iframe  id="IframeSaldos" style="width:97%; height:95%; margin-left:15px; margin-top:10px; border:none"></iframe>
            </div>
            </div>
            </div>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/Hospitales/ObraSociales/ObraSociales.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>
    <script src="../js/jQueryBlink.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Bonos/NuevoBono.js" type="text/javascript"></script>
    <script src="../js/Hospitales/PhoneValidate.js" type="text/javascript"></script>

        <script type="text/javascript">

            $('#desdeaqui2').click(function () {
                $('.contenedor_bono').fadeOut(1500);
                $(".container").animate({ height: "700px" }, 200);
                $(".container").animate({ margin: "0px 0px 0px 200px" }, 200);
                var pagina = "administrarSaldos.aspx?NHC=" + $("#afiliadoId").val() + "&S=3" + "&P=1" + "&sector=CUENTA CORRIENTE AFILIADOS";
                document.location = pagina;
                // $("#IframeSaldos").attr("src", pagina);
                $(".contenedor_1").animate({ height: "560px" }, 200);
                $(".contenedor_1").animate({ width: "1100px" }, 200);
                $("#hastaaqui").fadeIn(1500);
                $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
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
            if ($("[rel=tooltip]").length) {
                $("[rel=tooltip]").tooltip();
            }
        });
    </script>