<%@ Page Language="C#" AutoEventWireup="true" CodeFile="bonosHistorial.aspx.cs" Inherits="Bonos_bonosHistorial" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript">

    $(document).ready(function () {
        var GET = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }

            GET[decode(arguments[1])] = decode(arguments[2]);
        });


        if (GET["afiliado"] != "" && GET["afiliado"] != null) {

            $.ajax({
                type: "POST",
                url: "../Json/Bonos/Bonos.asmx/traerHistorialMovimoentosCC",
                data: '{afiliado: "' + GET["afiliado"] + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    $.each(Resultado.d, function (index, item) {
                        alert(item.hc);
                    });
                },
                error: errores
            });
        }
    });

    function errores(msg) {
        Impreso = 0;
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

</script>

