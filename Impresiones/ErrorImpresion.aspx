<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ErrorImpresion.aspx.cs" Inherits="Impresiones_Patologia_ErrorImpresion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <h1 id="mensaje" style="width:100%; text-align:center"></h1>
        <img id="log" src="../img/desconexion.jpg" style=" margin-left:12%; display:none"/>
        <img id="pdf" src="../img/pdf%20error.jpg" style=" margin-left:30%; display:none; height:700px"/>
    </div>
    </form>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(document).ready(function () {
            var GET = {};
            $("#txtDiagnostico").attr('disabled', true);

            document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
                function decode(s) {
                    return decodeURIComponent(s.split("+").join(" "));
                }

                GET[decode(arguments[1])] = decode(arguments[2]);
            });

            if (GET["E"] != "" && GET["E"] != null) {
                switch (GET["E"]) {
                    case "1":
                        $("#mensaje").text("OCURRIO UN ERROR AL GENERAR LA IMPRESION. INTENTELO NUEVAMENTE.");
                        break;
                    case "2":
                        $("#mensaje").text("HA PERDIDO SESION. LOGUESE NUEVAMENTE.");
                        $("#log").show();
                        break;
                    case "3":
                        $("#mensaje").text("OCURRIO UN ERROR AL GENERAR EL PDF. INTENTELO NUEVAMENTE.");
                        $("#pdf").show();
                        break;
                }
            }
        });
    </script>