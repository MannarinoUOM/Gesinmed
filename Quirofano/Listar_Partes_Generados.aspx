<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Partes_Generados.aspx.cs" Inherits="Quirofano_Listar_Partes_Generados" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title></title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Quirofano > <strong>Partes Quirúrgicos</strong>";
</script> 
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="container" style="margin-top:3%">
    <div class="titulo_seccion" style="text-align:center">Partes Quirúrgicos</div>
    <div class="contenedor_a" style="height:500px; overflow:auto">
    <div id="tabla">
    
    </div>
    </div>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>


<script type="text/javascript">
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/TraerPartesQuirurgicosGenerados",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Respuesta) {
                var r = Respuesta.d;
                var encabezado = "<table class=' table ; table-hover'><tr style='background-color:#F7F4F3' ><td><b>Usuario</b></td><td><b>Fecha</b></td></tr>";
                var fila = "";
                var pie = "</table>";

                $.each(r, function (index, item) { fila = fila + "<tr style='cursor:pointer' class='seleccionar' id='"+ item.id +"'><td >" + item.usuarioName + "</td><td>" + item.fecha + "</td><td id='ruta"+ item.id +"' style='display:none'>"+ item.ruta +"</td></tr>"; });
                $("#tabla").html(encabezado + fila + pie);
            },
            error: errores
        });
    });


    function errores(msg) {
        alert('Error: ' + msg.responseText);
    }

    $(".seleccionar").live("click", function () {
        //alert($("#ruta" + $(this).attr('id')).html());


        $.fancybox(
        {
            'autoDimensions': false,
            'href': $("#ruta" + $(this).attr('id')).html(),
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });

    });

</script>
