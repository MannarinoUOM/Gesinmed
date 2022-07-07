<%@ Page Language="C#" AutoEventWireup="true" CodeFile="evoluciónEspecialista.aspx.cs" Inherits="AtInternados_evoluciónEspecialista" %>

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
    <span class="TituloLasNovedades" style=" width:100%; text-align:center; margin-left:32%; top:200px">Practica en cama</span>
    <div class="contenedor_4" style="width:940px; height:200px ;padding:10px; margin-left:0px">
    <div class="contenedor_3" style="padding:0px; height:200px">

    <%--DATOS AFILIADO--%>
    <input id="afiliadoId" type="hidden"/>
                <div class="resumen_datos" style="height: 80px;">
              <div class="datos_persona">
                <div><img id = "fotopaciente" class="avatar2" src="../img/silueta.jpg" onerror="imgErrorPaciente(this);"/></div>
                <div class="datos_resumen_paciente">
                  <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                  <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                  <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
                  <div class="ocultar" >Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="CargadoSala"></span></strong></span> <span>Cama: <strong><span id="CargadoCama"></span></strong></span> </div>  
                  <input type="hidden" id="Hidden1" />
                  <input type="hidden" id="ProtocoloImpresion" />
                </div>
                </div>
                </div>
<%--DATOS AFILIADO--%>

    <div style="height:300px">

    <%--<table class='table' style=" margin-bottom:0px "><tr style='background-color:black; color:white'><td style='width:10%' >Fecha Movimiento</td><td style='width:5%' >Hora</td><td style='width:10%' >Sector</td><td style='width:15%' >Número Bono<br />Comprobante</td><td style='width:10%' >Importe</td><td style='width:10%' >Especialidad</td><td style='width:30%' >Observaciones</td></tr></table>--%>
    <div style="height:85%; overflow:no">
    &nbsp;&nbsp;&nbsp;&nbsp;<b>Práctica</b> <span><select id="cboPracticas"></select></span>
    <div id="resumen">
    <textarea id="txtEvolucion" style="width:95%; height:230px; margin:15px; display:none" placeholder="Cargar PRÁCTICA ESPECIALISTA aqui" maxlength="5000"></textarea>
    </div>
    </div>

    </div>
    <div class="pie_gris">
    <a id="btnCerrar" class="btn btn-info pull-right">Cerrar</a>
    <a id="btnGuardar" class="btn btn-info pull-right">Guardar</a>
    <a id="btnEstado" class="btn btn-warning pull-right" style="display:none" data-estado="0">Estado</a>
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
        var guardar = 1;
        var idCarga = 0;
        var tipo = 0; //1 internacion, 2 consultorio
        $(document).ready(function () {
            var GET = {};

            document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
                function decode(s) {
                    return decodeURIComponent(s.split("+").join(" "));
                }
                GET[decode(arguments[1])] = decode(arguments[2]);
            });


            if (GET["NHC"] != "" && GET["NHC"] != null && GET["NHC"] != undefined) { CargarPacienteID(GET["NHC"]); }
            if (GET["INT"] != "" && GET["INT"] != null && GET["INT"] != undefined) {
                CargarAtInternacion(GET["INT"]); TraerPracticaEpecialista(GET["INT"]);
            }
            if (GET["tipo"] != "" && GET["tipo"] != null && GET["tipo"] != undefined) { tipo = GET["tipo"]; }
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
               // alert(paciente.cama);
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
            if (tipo == 2) { $(".ocultar").hide(); }
        }

        function CargarAtInternacion(Id) {
            // alert(Id);
            IntID = Id;

            if(IntID == -1){  $(".TituloLasNovedades").html("Práctica en consultorio"); }

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

            if (IntID == 0 || IntID == null) { alert("No se pudo obtener la internación. Ciere y vuelva a intentarlo."); return false; }
            if ($("#afiliadoId").val() == "") { alert("No se pudo obtener el afiliado. Ciere y vuelva a intentarlo."); return false; }
            //if ($("#txtEvolucion").val().trim().length <= 0) { alert("Cargue alguna evolución!."); return false; }
            if ($("#cboPracticas").val() == 0) { alert("Seleccione alguna Practia!."); return false; }
            if (guardar == 0) { alert("Solo se puede cargar una evolución por día y editarla dentro de las siguientes 4 horas!."); return false; }
            // alert(idPermiso);
            if (IntID == -1) { $("#txtEvolucion").val($("#cboPracticas option:selected").html() + " (en consultorio)"); }
            if (tipo == 2 && IntID != -1) { $("#txtEvolucion").val("PRACTICA EN CAMA "); }
            var json = JSON.stringify({ "id": idPermiso, "internacionId": IntID, "afiliadoId": $("#afiliadoId").val(), "practicaId": $("#cboPracticas").val(), "evolucion": $("#txtEvolucion").val() });
            //alert($("#txtEvolucion").val());
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/GuardarEvolucionEspecialista",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: json,
                success: function (Resultado) {
                    if (Resultado.d == -1) { alert("Solo puede ser editado por quien lo creo!."); }
                    else {
                        if (idPermiso == 0) { alert("Guardado!."); } else { alert("Practica en cama modificada!."); }
                        idPermiso = Resultado.d;
                    }
                },
                complete: function () {
                    // guardar = 0;

                },
                error: errores
            });
        });

        $("#btnCerrar").click(function () { parent.$.fancybox.close(); });

        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert('Error: ' + jsonObj.Message);
        }

        function TraerPracticaEpecialista(id) {
           // var json = JSON.stringify({ "internacionId": intId });
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/TraerPracticaEpecialista",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                // data: json,
                success: function (Resultado) {
                    $("#cboPracticas").empty();
                    $("#cboPracticas").append("<option value='0'>Seleccione</option>");
                    $.each(Resultado.d, function (index, item) {
                        $("#cboPracticas").append("<option value='" + item.id + "'>" + item.practica + "</option>");
                    });
                    //alert("sdfs " +id);
                    TraerEvolucionEpecialista(id);
                },
                error: errores
            });
        }


        function TraerEvolucionEpecialista(intId) {
            var json = JSON.stringify({ "internacionId": intId });
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/TraerEvolucionEspecialista",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: json,
                success: function (Resultado) {
                    if (Resultado.d.length > 0) {
                        $.each(Resultado.d, function (index, item) {
                           // alert(item.edita);
                            idPermiso = item.id;
                            if (item.edita == 1) { guardar = 1; }
                            if (item.edita == 0) { guardar = 0; }
                            $("#cboPracticas").val(item.practicaId);
                           // $("#txtEvolucion").val(item.evolucion);
                        });
                    }
                },
                error: errores
            });
        }

    </script>