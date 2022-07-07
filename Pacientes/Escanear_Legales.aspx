<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Escanear_Legales.aspx.cs" Inherits="Pacientes_Escanear_Legales" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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

             <%--<div>
             <span>Está por escanear la documentacion de: </span><br /><span id="span_paciente_nombre" style="font-size:25px;"><b>Paciente</b></span>
             </div>--%>

              <div>Tipo de Documento</div>
              <select id="cbo_Tipos" type="text" class="span4">
                <option value="">Seleccione Tipo...</option>
              </select>
              <input type="hidden" id="afiliadoId" value="0" />
             <a id="btnScan" class="btn btn-info">Escanear</a>
            </div>  
    </div>
    </form>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script> 
    <script type="text/javascript">
        function ListDocumentacionTipo() {
            $.ajax({
                type: "POST",
                url: "../Json/Legales/Legales.asmx/Legales_TipoDoc_List",
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


//        function CargarPacienteID(ID) {
//            $.ajax({
//                type: "POST",
//                url: "../Json/DarTurnos.asmx/CargarPacienteID",
//                data: '{ID: "' + ID + '"}',
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                success: function (Resultado) {
//                    var lista = Resultado.d;
//                    if (lista.length > 0) {
//                        $("#span_paciente_nombre").html(lista[0].Paciente);
//                    }
//                    else alert("Paciente no encontrado.");
//                },
//                error: errores
//            });
//        }



        $("#btnScan").click(function () {
            if ($("#afiliadoId").val() != "0" && $('#cbo_Tipos :selected').val()) {
                var_ = $('#cbo_Tipos :selected').val() + "-" + $("#afiliadoId").val();
                MyObject = new ActiveXObject("WScript.Shell");
                MyObject.Run("file://///10.10.8.71/Software/Escanear.exe " + var_);
            }
            else alert("Seleccione Documento");
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
//                CargarPacienteID(GET["Id"]);
            }
        });   
    </script>

</body>
</html>
