<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListadoCOVID.aspx.cs" Inherits="Guardia_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />


<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />

</head>
<body>
    <form id="form1" runat="server">
    <div class=" container" style=" padding-top:14%">
    <div class="contenedor_bono" style="height:160px; text-align:center">
    <div class="titulo_seccion">Listado COVID</div>
    <div class="control-group">
    <label style="display:inline">Desde</label>
    <input id="txtDesde" type="text" class="input-medium; desde1" style="text-align:center"/>
    </div>
    <div class="control-group">
    <label style="display:inline">Hasta</label>
    <input id="txtHasta" type="text" class="input-medium; hasta1" style="text-align:center"/>
    </div>
    <a class="btn btn-info" id="btnBuscar">Buscar</a>
    
    </div>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>

<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Guardia > <strong>Listado COVID</strong>";

    $("#btnBuscar").click(function () {
        if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") { alert("Ingrese un rango de fecha"); return false; } else {
            $.fancybox({
                'autoDimensions': false,
                'href': "../Impresiones/RepostesCOVID/ListadoCOVID_PDF.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val(),
                'width': '75%',
                'height': '75%',
                'autoScale': false,
                'transitionIn': 'none',
                'transitionOut': 'none',
                'type': 'iframe',
                'hideOnOverlayClick': false
            });
        }
    });
     
</script>