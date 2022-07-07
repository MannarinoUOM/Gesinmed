<%@ Page Language="C#" AutoEventWireup="true" CodeFile="zoomComprasInternacion.aspx.cs" Inherits="Compras_zoomComprasInternacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server" style="height:100%; margin:0px">
    <div class="container" style="width:100%; height:100%">
    <img id="imgZoom" style="margin:auto" height="50%" width="100%"/>
    </div>
    </form>
</body>
</html>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>


<script type="text/javascript">
    $(document).ready(function () {

        var GET = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }

            GET[decode(arguments[1])] = decode(arguments[2]);

        });

        if (GET["image"] != "" && GET["image"] != null) {
            //var url = GET["image"];
            $("#imgZoom").attr('src', GET["image"]);
        }

        //alert(parent.$(document).width());
        //alert(parent.$(document).height());
        //$("#imgZoom").css('height', parent.$(document).width() - 200);
        //$("#imgZoom").css('width', parent.$(document).height() - 200);

    });
</script>