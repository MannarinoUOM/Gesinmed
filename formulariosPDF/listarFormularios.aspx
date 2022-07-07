<%@ Page Language="C#" AutoEventWireup="true" CodeFile="listarFormularios.aspx.cs" Inherits="formulariosPDF_listarFormularios" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />
</head>
<body>
    <form id="form1" runat="server" >

    </form>
</body>
</html>
        <script src="../js/bootstrap.js" type="text/javascript"></script>
        <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
        <script src="../js/bootstrap-alert.js" type="text/javascript"></script>    
        <script src="../js/jquery.validate.js" type="text/javascript"></script>
        <script src="../js/GeneralG.js" type="text/javascript"></script>
        <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>

<script type="text/jscript">
//$(document).ready(function () { alert(); });

    $(".seleccionar").live('click', function () {
       // alert($("#ruta" + $(this).attr('id')).html());

        $.fancybox({
            'hideOnContentClick': true,
            'width': '85%',
            'href': '//' + $("#ruta" + $(this).attr('id')).html(),
            'height': '85%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe'
            //'onClose': function () { $("#btnVolver").click(); }

        });
    });
</script>