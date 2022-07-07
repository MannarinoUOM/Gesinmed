<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Adjuntar.aspx.cs" Inherits="Pacientes_Adjuntar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <title></title>
</head>
<body>
<form id="form1" runat="server">
    <div>
            <div class="label_top" style="margin-left:10px;">

             <div>
             <span>Está por Adjuntar la documentacion de: </span><br /><span id="span_paciente_nombre" style="font-size:25px;"><b>Paciente</b></span>
             </div>

              <div>Tipo de Documento</div>
              <select id="cbo_Tipos" type="text" class="span4" runat="server">
                <option value="">Seleccione Tipo...</option>
              </select>
              <input type="hidden" id="afiliadoId" value="0" runat="server"/>
              <input type="hidden" id="txtTipo" runat="server"/>
             <a id="btnIniciar" class="btn btn-info">Adjuntar</a>
            <asp:FileUpload ID="btnAdjuntar" runat="server" AllowMultiple="true" style="display:none"/>
            <asp:Button ID="btnSubir" runat="server" Text="Button" onclick="btnSubir_Click" style="display:none" UseSubmitBehavior="false"/>
            </div>  
    </div>
    </form>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script> 
    <script type="text/javascript">
        function ListDocumentacionTipo() {
            $.ajax({
                type: "POST",
                url: "../Json/Documentacion.asmx/ListDocumentacionTipo",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    var lista = Resultado.d;
                    $.each(lista, function (index, item) {
                        $('#cbo_Tipos').append($('<option></option>').val(item.id).html(item.descripcion));
                    });
                },
                error: errores
            });
        }

        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert('Error: ' + jsonObj.Message);
        }


        function CargarPacienteID(ID) {
            $.ajax({
                type: "POST",
                url: "../Json/DarTurnos.asmx/CargarPacienteID",
                data: '{ID: "' + ID + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    var lista = Resultado.d;
                    if (lista.length > 0) {
                        $("#span_paciente_nombre").html(lista[0].Paciente);
                    }
                    else alert("Paciente no encontrado.");
                },
                error: errores
            });
        }



        $("#btnIniciar").click(function () {
            if ($("#afiliadoId").val() != "0" && $('#cbo_Tipos :selected').val()) {
                $("#btnAdjuntar").click();
            }
            else alert("Seleccione Documento");
        });

        $("#btnAdjuntar").change(function () {
            if ($("#btnAdjuntar").val() != "") {
                $("#btnSubir").click();
            }
        });


        $(document).ready(function () {
            ListDocumentacionTipo();
            var GET = {};
            document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
                function decode(s) {
                    return decodeURIComponent(s.split("+").join(" "));
                }
                GET[decode(arguments[1])] = decode(arguments[2]);
            });
            if (GET["Id"] != "" && GET["Id"] != null) {
                $("#afiliadoId").val(GET["Id"]);
                CargarPacienteID(GET["Id"]);
            }
        });

        $("#cbo_Tipos").change(function () { $("#txtTipo").val($(this).val());  });
         
    </script>