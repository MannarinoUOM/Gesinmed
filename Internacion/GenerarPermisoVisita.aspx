<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GenerarPermisoVisita.aspx.cs" Inherits="Internacion_GenerarPermisoVisita" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
<div class="container" style="padding-top:2%; margin-left:17%; margin-top:4%">
    <div class="contenedor_4" style="width:940px; height:470px ;padding:10px; margin-left:0px">
    <div class="contenedor_3" style="padding:0px; height:100%">

    <%--DATOS AFILIADO--%>
    <input id="afiliadoId" type="hidden"/>
                <div class="resumen_datos" style="height: 80px;">
              <div class="datos_persona">
                <div><img id = "fotopaciente" class="avatar2" src="../img/silueta.jpg" onerror="imgErrorPaciente(this);"/></div>
                <div class="datos_resumen_paciente">
                  <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                  <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                  <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
                  <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="CargadoSala"></span></strong></span> <span>Cama: <strong><span id="CargadoCama"></span></strong></span> </div>  
                  <input type="hidden" id="Hidden1" />
                  <input type="hidden" id="ProtocoloImpresion" />
                </div>
                </div>
                </div>
<%--DATOS AFILIADO--%>

    <div style="height:300px">

    <%--<table class='table' style=" margin-bottom:0px "><tr style='background-color:black; color:white'><td style='width:10%' >Fecha Movimiento</td><td style='width:5%' >Hora</td><td style='width:10%' >Sector</td><td style='width:15%' >Número Bono<br />Comprobante</td><td style='width:10%' >Importe</td><td style='width:10%' >Especialidad</td><td style='width:30%' >Observaciones</td></tr></table>--%>
    <div style="height:85%; overflow:no">
    <label id="lblEstado" style="font-weight:bold; margin-left:15px; display:inline"></label>
    <label for="chkPermanente" style="display:inline; margin-right:2%" class=" pull-right">PERMANENTE  <input style="margin-top:0px" id="chkPermanente" type="checkbox" /> </label>
    <div id="resumen">
    <textarea id="txtPermiso" style="width:95%; height:230px; margin:15px" placeholder="Cargar permiso aqui" maxlength="5000"></textarea>
    </div>
    </div>

    </div>
    <div class="pie_gris">
    <a id="btnCerrar" class="btn btn-info pull-right">Cerrar</a>
    <a id="btnGuardar" class="btn btn-info pull-right">Guardar</a>
    <a id="btnEstado" class="btn btn-warning pull-right" style="display:none" data-estado="0">Estado</a>
    <a id="btnImprimirPermiso" class="btn btn-info pull-right" style="display:none" >Imprimir</a>
    </div>
    </div>
    </div>
    </div>
    </form>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AtInternados/ListaPacientesInternados.js" type="text/javascript"></script>

    <script type="text/javascript">
        var idPermiso = 0;
        $(document).ready(function () {
            var GET = {};

            document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
                function decode(s) {
                    return decodeURIComponent(s.split("+").join(" "));
                }
                GET[decode(arguments[1])] = decode(arguments[2]);
            });


            if (GET["NHC"] != "" && GET["NHC"] != null && GET["NHC"] != undefined) { CargarPacienteID(GET["NHC"]); }
            if (GET["INT"] != "" && GET["INT"] != null && GET["INT"] != undefined) { CargarAtInternacion(GET["INT"]); TraerPermisosVisita(GET["INT"]); }
            
        });


        function CargarPacienteID(ID) {
            NHCActual = ID;
      
            $.ajax({
                type: "POST",
                url: "../Json/DarTurnos.asmx/CargarPacienteID",
                data: '{ID: "' + ID + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Cargar_Paciente_NHC_Cargado,
                error: errores
            });
        }

        function Cargar_Paciente_NHC_Cargado(Resultado) {
            var Paciente = Resultado.d;
            var PError = false;
          

            $.each(Paciente, function (index, paciente) {

                $("#CargadoApellido").html(paciente.Paciente);
                var AnioActual = new Date();
                var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));
                $("#CargadoEdad").html(AnioActual.getFullYear() - AnioNacimiento.getFullYear());
                $("#CargadoDNI").html(paciente.documento_real);
                $("#afiliadoId").val(paciente.documento);

                $("#CargadoNHC").html(paciente.NHC_UOM);
                $("#CargadoTelefono").html(paciente.Telefono);
                $("#CargadoSeccional").html(paciente.Seccional);
                $("#CargadoServicio").html(parent.$("#CargadoServicio").html());
                $("#CargadoCama").html(parent.$("#CargadoCama").html());
                $("#CargadoSala").html(parent.$("#CargadoSala").html());

                //alert(paciente.Foto);
                $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

            });

        }

        function CargarAtInternacion(Id) {
           // alert(Id);
            IntID = Id;
            servicio = $("#servicio" + Id).html(); /// manuel
            var ServicioId = $("#servicioId" + Id).html();

            if (ServicioId == 120000001 || ServicioId == 120000016 || ServicioId == 120000017) EsUTI = 1;
            else EsUTI = 0;

            if (EsUTI == 1) $("#opcionUTIaPiso").show();
            else $("#opcionUTIaPiso").hide();

            sala = $("#sala" + Id).html(); /// manuel
            cama = $("#cama" + Id).html(); /// manuel
            CargarPacienteID($("#int" + Id).html(), Id);
            $(".hsuper_menu").toggleClass("hsuper_menu_Accion");
            $(".hsuper_menu").css("margin-left", "-10px");
        }

        $("#btnGuardar").click(function () {
            var permanente;
            if ($("#chkPermanente").is(":checked")) { permanente = 1; } else { permanente = 0; }
           
            if (IntID == 0 || IntID == null) { alert("No se pudo obtener la internación. Cieere y vuelva a intentarlo."); return false; }
            if ($("#afiliadoId").val() == "") { alert("No se pudo obtener el afiliado. Cieere y vuelva a intentarlo."); return false; }
            if ($("#txtPermiso").val().trim().length <= 0) { alert("Cargue algun permiso!."); return false; }

            var json = JSON.stringify({ "idInternacion": IntID, "afiliadoId": $("#afiliadoId").val(), "permiso": $("#txtPermiso").val(), "permanente": permanente });
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/GuardarPermisoVisita",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: json,
                success: function (Resultado) { idPermiso = Resultado.d; },
                complete: function () {
                    $("#btnEstado").removeClass("btn-info");
                    $("#btnEstado").addClass("btn-success");
                    $("#btnEstado").show();
                    // $("#btnImprimirPermiso").show();
                    $("#btnEstado").data('estado', '1');
                    alert("Guardado!.");
                },
                error: errores
            });
        });

        $("#btnCerrar").click(function () { parent.$.fancybox.close(); });

        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert('Error: ' + jsonObj.Message);
        }

        function TraerPermisosVisita(intId) {
            var json = JSON.stringify({ "internacionId": intId, "nombre": "" });
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/TraerPermisosVisita",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: json,
                // success: CargarServicios_Cargados,
                success: function (Resultado) {
                    $.each(Resultado.d, function (index, item) {
                        if (item.permanente == 1) { $("#chkPermanente").attr('checked', true); } else { $("#chkPermanente").attr('checked', false); }
                        idPermiso = item.id;
                        $("#txtPermiso").val(item.permiso);
                        $("#lblEstado").text("Creado por: " + item.usuarioName + " el " + item.fecha);
                    });

                    if (Resultado.d.length > 0) {
                        $("#btnEstado").removeClass("btn-info");
                        $("#btnEstado").addClass("btn-success");
                        //$("#btnEstado").data('estado', '1');
                        $("#btnEstado").show();
                        //  $("#btnImprimirPermiso").show();
                    }
                },
                error: errores
            });
        }



        $("#btnEstado").click(function () {
            if (idPermiso == 0 || idPermiso == null) { alert("No se pudo obtener la internación. Cieere y vuelva a intentarlo."); return false; }

            var json = JSON.stringify({ "id": idPermiso, "estado": 0 });
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/ActualizarEstadoPermisoVisita",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: json,
                // success: CargarServicios_Cargados,
                success: function (Resultado) {
                    if (Resultado.d == 1) {
                        $("#btnEstado").hide();
                     //   $("#btnImprimirPermiso").show();
                        $("#btnGuardar").hide();
                        $("#txtPermiso").attr("disabled", true);
                        $("#chkPermanente").attr('disabled', true);
                        alert("Se ha cambiado el estado!.");
                    }
                },
                error: errores
            });
        });


        $("#btnImprimirPermiso").click(function () {
            $.fancybox({
                'hideOnContentClick': false,
                'width': '85%',
                'href': "../Turnos/BuscarPacientes.aspx?Express=0",
                'height': '85%',
                'autoScale': false,
                'transitionIn': 'none',
                'transitionOut': 'none',
                'type': 'iframe'
            });
        });

    </script>
