<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AltoRiesgo.aspx.cs" Inherits="AtConsultorio_AltoRiesgo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <h4 style=" text-align:center">SELECCIONE ALGUNA PATOLOGÍA QUE DEFINA AL PACIENTE COMO CRÓNICO</h4>
            <a class="btn btn-danger" id="btnCerrar">Cerrar</a>
    <div class="container" style="width:80%; text-align:center">

    <div id="tabla" style="margin-left:10%">
                                                                                                
    </div>

    </div>
    </form>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<script type="text/javascript">
    var AfiliadoId = 0;
    var id = 0;
    $(document).ready(function () {
        var GET = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }

            GET[decode(arguments[1])] = decode(arguments[2]);
        });

        if (GET["AfiliadoId"] != "" && GET["AfiliadoId"] != null) { AfiliadoId = GET["AfiliadoId"]; }

        var json = JSON.stringify({ "AfiliadoId": AfiliadoId, "accion": 0 });
        $.ajax({
            type: "POST",
            url: "../Json/Gente.asmx/AltoRiesgoMOSTRAR",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: cargarTabla,
            error: errores
        });
    });
    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    function cargarTabla(Resultado) {
        var lista = Resultado.d;
        var encabezado = "<table class='table' style='width:90%'><tr><td><b>Código</b></td><td><b>Descripción</b></td></tr>";
        var fila = "";
        var pie = "</table>";
        var color = "";
        $.each(lista, function (index, item) {
            if (item.tiene == 1) { color = "background-color:Red"; } else { color = ""; }
            fila = fila + "<tr style='cursor:pointer; " + color + "' id='"+ item.codigo +"_TR'><td class='fila' id='" + item.codigo + "'>" + item.codigo + "</td><td class='fila' id='" + item.codigo + "'>" + item.descripcion + "</td></tr>";
        });

        $("#tabla").html(encabezado + fila + pie);
    }

    $(".fila").live("click", function () {

        // alert($(this).attr("id")); 
        id = $(this).attr("id");
        var json = JSON.stringify({ "AfiliadoId": AfiliadoId, "accion": 1, "Patologia": $(this).attr("id") });
        $.ajax({
            type: "POST",
            url: "../Json/Gente.asmx/AltoRiesgoABM",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: pintar,
            error: errores
        });

    });

    function pintar(Resultado) {
      //  alert(Resultado.d);
        if (Resultado.d == 0) {
            $("#" + id + "_TR").css("background-color", "Red");
            alert("Patología guardada");
        }
        else {
            $("#" + id + "_TR").css("background-color", "White");
            alert("Patología borrada");
        }
    }
  
    $("#btnCerrar").click(function () { parent.jQuery.fancybox.close(); });
</script>
