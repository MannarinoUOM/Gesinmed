<%@ Page Language="C#" AutoEventWireup="true" CodeFile="VerControlesRemotos.aspx.cs" Inherits="AtInternados_VerControlesRemotos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div id="resultado">
    
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>


<script type="text/javascript">
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/TraerControlesRemotos",
            // data: '{AfiliadoId: "' + $("#afiliadoId").val() + '" , celular: "' + $("#txtCelular").val() + '"}',
            contentType: "application/json; charset=utf-8",
            // dataType: "json",
            success: function (Resultado) {
                var encabezado = "<table class='table'><tr style='background-color:gray'><th>Afiliado</th><th>Fecha</th></tr>";
                var fila = "";
                var pie = "</table>";

                $.each(Resultado.d, function (index, item) {
                    fila += "<tr style='cursor:pointer' class='mostrar' id='" + item.id + "' >" +
                    "<td>" + item.apellido + "</td>" +
                    "<td>" + item.fecha + "</td>" +
                    "<td id='ruta"+ item.id +"' style='display:none'>" + item.ruta + "</td>" +
                    "<td id='afiliadoId" + item.id + "' style='display:none'>" + item.afiliadoId + "</td></tr>"
                });

                $("#resultado").html(encabezado + fila + pie);
            },
            error: errores
        });

    });

    $(".mostrar").live("click", function () {
        window.open("../Internacion/consentimientoFirma.aspx?ruta=" + $("#ruta" + $(this).attr("id")).html(), "_blank");
    });

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }
</script>