<%@ Page Language="C#" AutoEventWireup="true" CodeFile="escaneoImprimir.aspx.cs" Inherits="DerivacionyTraslado_escaneoImprimir" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div style="padding-left:0%; padding-top:1.5%">
    <img width="900px" height="1150px" id="archivo" style="display:none"/>
    <embed src="" width="900" height="1150" type="application/pdf" id="pdf" style="display:none">
    <%--src="22-169980-0001.jpg"--%>
    </div>
    </form>
</body>
</html>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function () {

            var GET = {};

            document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
                function decode(s) {
                    return decodeURIComponent(s.split("+").join(" "));
                }

                GET[decode(arguments[1])] = decode(arguments[2]);
            });

            if (GET["ruta"] != "" && GET["ruta"] != null) {

                var r = GET["ruta"];
                if (r.substr(-3, r.length - 3).toUpperCase() == "PDF") {
                    $("#pdf").attr("src", GET["ruta"]);
                    $("#pdf").show();
                } else {
                    $("#archivo").attr("src", GET["ruta"]);
                    $("#archivo").show();
                }
            }


            window.print().delay(5000);

        });
    </script>