<%@ Page Language="C#" AutoEventWireup="true" CodeFile="LoginSeccional.aspx.cs" Inherits="LoginSeccional" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>GesInMed - Login</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="css/login.css"/>
</head>
<body>
<div style="height:600px;overflow:hidden;">
    <div style="height:1000px;">
        <div class="contenedor_login">
            <asp:Literal ID="Literal1" runat="server"></asp:Literal>
                <div class="login_imagen">
                    <img src="img/logoanimado.gif" width="100" height="93" />
                </div>
                <img style="margin-bottom:10px;"src="img/login_wave-02.jpg" width="238" height="45" />
                <div id="dE" class="alert alert-error erroligin">
                </div>
                <div class="centrar1"><input id="Usuario" type="text" placeholder="Usuario" style="" class="login_input"/></div>
                    <div class="centrar1"><input id="Clave" type="password" placeholder="Contraseña" 
 class="login_input"/></div>
                        <a style="margin-left:10px; display:none;" href="#">olvide mi contraseña</a>
                        <a class="btn pull-right" style="margin:10px;" id="Ingresar">Ingresar</a>
                            <div class="clearfix"></div>
                        </div>
                </div>
           </div>

</body>
<script src="js/jquery-1.8.3.js" type="text/javascript">
</script><script src="js/bootstrap.js" type="text/javascript"></script>
<script type="text/javascript" language="javascript">
    $("#Ingresar").click(function () {
        $.ajax({
            type: "POST",
            url: "Usuarios.asmx/Ingreso",
            data: '{Usuario: "' + $("#Usuario").val() + '", Clave: "' + $("#Clave").val() + '", PC: "' + $("#PC").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: inicio,
            error: errores
        })
    });

    function errores(a) {
        a = JSON.parse(a.responseText);
        $("#dE").html(a.Message);
        $("#dE").show();
    }

    $("#Usuario").keypress(function (a) {
        $("#dE").hide();
        13 == a.which && $("#Clave").foscus()
    });

    $("#Clave").keypress(function (a) {
        $("#dE").hide(); 13 == a.which && $("#Ingresar").click()
    });

    function inicio(a) {
        a = a.d.split("="); switch (a[0]) {
            case "MIGUE": if ($("#Clave").val() == "1234") window.location = "Administracion/CambiarClave.aspx?Cambio=1"; else window.location = "migue.aspx"; break;
            //case "OK": if ($("#Clave").val() == "1234") window.location = "Administracion/CambiarClave.aspx?Cambio=1"; else window.location = "Inicio.aspx"; break;   
            //----------prueba para nuevo login--------------------------------------  
            case "OK": if ($("#Clave").val() == "1234") window.location = "Administracion/CambiarClave.aspx?Cambio=1"; else window.location = "Inicio2.aspx"; break;
            case "ERROR": $("#dE").html(a[1]), $("#dE").show(), $("#Usuario").val(""), $("#Clave").val(""), $("#Usuario").focus()
        }
    }

    $(document).ready(function () {
        $("#Usuario").focus()

        /*var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        if (!is_chrome) {
        $(".contenedor_login").hide();
        $(document.body).append('<div style="width:100%; text-align:center; font-size:30px;color:white; position:fixed; top:100px;"><b>Está usando un navegador no compatible con el sistema :( <br/><br/> Utilice el Chrome.</b></div>');
        }*/
    });

</script>
</html>












