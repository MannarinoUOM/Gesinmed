<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Error.aspx.cs" Inherits="Error" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>UOM Error</title>
</head>

<style type="text/css">
A:link {text-decoration: none; color:Blue;}
A:visited {text-decoration: none; color:Blue;}
A:active {text-decoration: none; color:Blue;}
A:hover {text-decoration: underline; color: red;}
</style>

<script src="js/jquery-1.8.3.js" type="text/javascript"></script>

<body>
    <form id="form1" runat="server">
    <div id="Error" style="font-size: 15px; font-family: Arial, Helvetica, sans-serif;">        
        <div style="text-align:center;">
        <img src="img/pcerror.png" />
        <p>Por algun motivo se ha cerrado la sessión de usuario.</p>
        <p>Si esta pantalla aparece de manera continua, por favor comunicarse con Sistemas.</p>
        <p>Pulsa <a href="Login.aspx" target="_top">aquí</a> para iniciar nuevamente.</p>
        </div>
    </div>
    </form>
</body>
</html>

    <script>

        function Centro()
        {
        $('#Error').css({
        'position': 'fixed',
        'left': '50%',
        'top': '25%'
        });
        
        $('#Error').css({
            'margin-left': -$('#Error').width() / 2 + 'px',
            'margin-top': -$('#Error').height() / 2 + 'px'
        });
        }

    </script>

<script>
    Centro();
    parent.OError();
</script>