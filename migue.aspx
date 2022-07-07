<%@ Page Language="C#" AutoEventWireup="true" CodeFile="migue.aspx.cs" Inherits="migue" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<%--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="css/bootstrap.css" type="text/css"/>
    <script type="text/javascript" src="js/bootstrap.js"></script
   <script type="text/javascript" src="js/jquery.min.js"></script>--%> 

<%--  <script type="text/javascript" src="js/jquery-3.3.1.slim.min.js"></script>
  <script type="text/javascript" src="js/popper.min.js" ></script>
  <script type="text/javascript" src="js/bootstrap.min.js" ></script>
  <script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
  

  <link rel="stylesheet" href="css/bootstrap.min.css" />
  <link rel="stylesheet" href="css/bootstrap-multiselect.css" type="text/css"/>--%>
 
 <script type="text/javascript" src="js/popper.min.js" ></script>
 <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css"/>
 <link rel="stylesheet" href="css/bootstrap.css" type="text/css"/>
<script type="text/javascript" src="js/jquery-3.6.0.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
    <link href="css/style-2.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" href="css/bootstrap-multiselect.css" type="text/css"/>

  </head>
<body>
    <form id="form1" runat="server">
<%--<iframe width="100%" height="100%" src="https://www.youtube.com/embed/9-rz0QzIxxE?controls=0&autoplay=1"  " frameborder="0" allowfullscreen></iframe>--%>

<%--<table class="table"><tr>--%>
<div  style="border-width:1px; float:left; margin:0px ;border-style:solid; border-radius:5px; border-color:#cccccc; border-top-right-radius:0px;border-bottom-right-radius:0px"><img width="50px" height="35px" src="https://xavierpalaciosm.files.wordpress.com/2013/04/facebook_negro.png" /></div>
<div style="border-width:1px; float:left; margin-left:0px ; border-style:solid; border-radius:0px; border-color:#cccccc; border-top-left-radius:0px;border-bottom-left-radius:0px"><img  width="47px" height="35px"  src="https://image.freepik.com/iconos-gratis/twitter-circular_318-10590.jpg"/></div>
<div style="border-width:1px; float:left; margin-left:0px ; border-style:solid; border-radius:0px; border-color:#cccccc; border-top-left-radius:0px;border-bottom-left-radius:0px"><img  width="47px" height="35px"  src="http://www.woman.es/img/youtubelink.png"/></div>
<div style="border-width:1px; float:left; margin-left:0px ; border-style:solid; border-radius:0px; border-color:#cccccc; border-top-left-radius:0px;border-bottom-left-radius:0px"><img  width="47px" height="35px"  src="http://www.blameonmeboutique.com/themes/pf_gentshop/img/whatsapp-icon.png"/></div>
<div style="border-width:1px; float:left; margin-left:0px ; border-style:solid; border-top-right-radius:5px;border-bottom-right-radius:5px; border-color:#cccccc; border-top-left-radius:0px;border-bottom-left-radius:0px"><img  width="47px" height="35px"  src="http://i65.tinypic.com/9j3xtu.jpg"/></div>
<%--</tr></table>--%>

<select id="cbo" multiple="multiple">
<option>opcion 1</option>
<option>opcion 2</option>
<option>opcion 3</option>
<option>opcion 4</option>
</select>

    </form>
</body>
</html>



<%--<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>--%>
<script type="text/javascript">
    $(document).ready(function () {
        $("#form1").css('width', $(window).width() - 20);
        $("#form1").css('height', $(window).height() - 20);
        $('#cbo').multiselect({

            nonSelectedText: 'Elija lote',
            nSelectedText: 'Seleccionados',
            allSelectedText: 'Todos',
            numberDisplayed: '1',
            buttonWidth: '100px'

        });


        $("#form1").append("<input type='text' id='texto' />");
        $("#form1").append("<h1 id='resultado'></h1>");
        $("#form1").append("<a class='btn' id='boton' >boton</a>");
        for (var i = 0; i <= 5; i++) {
            $("#form1").append("<input id='check" + i + "' type='checkbox'/>");
        }
        $("#texto").focus();

        //var Regex = /^[1]{2} ([0-9])/;
        //var Regex = /^1{1}([a-z]+){1}1$/;
        var RegexTel = /^1{2}([0-9]{8}$)/;
        var RegexNum = /^[\d]+$/;
        //var RegexNum = /^([0-9]{10})+$/;
        $("#texto").on('keypress', function (e) {
            //alert(String.fromCharCode(e.which));

            var r;
            if (RegexNum.test(String.fromCharCode(e.which)) && $("#texto").val().length <= 9) { r = "True"; $("#resultado").html(r); } else { r = "False"; $("#resultado").html(r); return false; }

        });


        $("#texto").on('focusout', function (e) { if (!RegexTel.test($("#texto").val())) { $("#resultado").html("Cargue el formato correcto para el celular"); } else { $("#resultado").html("Ok"); } });
        //                $("#boton").click(function () {
        //                    $("input[type = checkbox]:checked").each(function () {
        //                    
        //                        alert($(this).attr('id'));
        //                     });
        //                });
    });
//    $("#video").draggable();
</script>