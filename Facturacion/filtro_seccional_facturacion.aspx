<%@ Page Language="C#" AutoEventWireup="true" CodeFile="filtro_seccional_facturacion.aspx.cs" Inherits="Facturacion_filtro_seccional_facturacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />

<style type"text/css">

span
{
    display: block;
    text-align:center;    
    }
      
    div {
           font-size:larger;
        } 
        
        .contenedor_2
        {
            height:60px;
            margin:17% 35%;
            }
        
        
</style>

</head>
<body>
    <form id="form1" runat="server">
    <div class="contenedor_2">
    <span>SELECIONE SECCIONAL</span>
    <span><select>
        <option value="0">Seleccione</option>
    <option value="1">Central</option>
        <option value="2">Lugano</option>
            <option value="3">Saavedra</option>
    </select></span>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    var T = "";
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    $(document).ready(function () {

        if (GET["T"] != "" && GET["T"] != null) {
            T = GET["T"];
            if (T == "1") { parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > Selección de datos para facturar > <strong>Selección Centro</strong>"; }
            if (T == "2") { parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > Proceso de Facturación > <strong>Selección Centro</strong>"; }
        }
    });

    // $(document).ready(function () { alert(); })
    $('select').on('change', function () {
        switch ($(this).val()) {
            case "1":
                if (T == "1") {
                    document.location = "../Facturacion_Cap/Selecciondedatos.aspx";
                    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > Selección de datos para facturar > <strong style='color:red'>CENTRAL</strong>";
                }
                if (T == "2") {
                    document.location = "../Facturacion_Cap/Facturacion.aspx";
                    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > Proceso de Facturación > <strong style='color:red'>CENTRAL</strong>";
                }
                break;
            case "2":
                if (T == "1") {

                    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > Selección de datos para facturar > <strong style='color:red'>LUGANO</strong>";
                    document.location = "http://10.0.0.26/Facturacion_Cap/Selecciondedatos.aspx";
                }
                if (T == "2") {

                    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > Proceso de Facturación > <strong style='color:red'>LUGANO</strong>";
                    document.location = "http://10.0.0.26/Facturacion_Cap/Facturacion.aspx";
                }
                break;
            case "3":
                if (T == "1") {

                    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > Selección de datos para facturar > <strong style='color:red'>SAAVEDRA</strong>";
                    document.location = "http://10.10.4.13/Facturacion_Cap/Selecciondedatos.aspx";
                }
                if (T == "2") {

                    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > Proceso de Facturación > <strong style='color:red'>SAAVEDRA</strong>";
                    document.location = "http://10.10.4.13/Facturacion_Cap/Facturacion.aspx";
                }
                break;
        }
    });
</script>