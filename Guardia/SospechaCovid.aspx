<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SospechaCovid.aspx.cs" Inherits="Guardia_SospechaCovid" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<%--<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">--%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/hestilo.css"/>

</head>
<body>
    <form id="form1" runat="server">

    <div>
        <asp:FileUpload ID='btnAdjuntarReclamo' runat='server' AllowMultiple='false'/>
        <asp:Button ID='btnSubir' onclick="btnSubir_Click" runat='server' Text='Subir Archivo' UseSubmitBehavior='false'/>
        <input type="hidden" id="turnoId" runat="server"/>   
    </div>


                 <%--src="../sospecha%20covid%20pdf/Ficha%20Coronavirus%20OK.pdf"--%>
            <%--<iframe id="contenedor" src="../sospecha%20covid%20pdf/Ficha%20Coronavirus%20OK.pdf"  width="100%" height="570px" type="application/pdf" runat="server"></iframe>--%>
        
<%--            <div style="overflow:auto;height:570px; position:relative; overflow:auto;">
            <div style="background-image:url('../sospecha%20covid%20pdf/sospecha%20COVID%20hoja%201.png'); background-position:center; background-repeat:no-repeat; height:1300px">--%>
            
           
    <input  type="hidden" id="afiliadoId" runat="server"/>
    <input  type="hidden" id="MedicoId" runat="server"/>
<%--    <input  type="hidden" id="archivoCopia" runat="server"/>--%>
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
<script src="../js/html2canvas.min.js" type="text/javascript"></script>



<script type="text/javascript">

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    $(document).ready(function () {

      //  $("#pdf").attr("src", $("#archivoCopia").val());

        if (GET["MedicoId"] != "" && GET["MedicoId"] != null) { $("#MedicoId").val(GET["MedicoId"]); }
        if (GET["NHC"] != "" && GET["NHC"] != null) { $("#afiliadoId").val(GET["NHC"]); }

        //        alert($("#afiliadoId").val());
        //        alert($("#MedicoId").val());

         });


//Definimos el botón para escuchar su click, y también el contenedor del canvas
//const $boton = document.querySelector("#save"), // El botón que desencadena
//  $objetivo = document.querySelector("#contenedor"),//document.body, // A qué le tomamos la foto
//  $contenedorCanvas = document.querySelector("#contenedorCanvas"); // En dónde ponemos el elemento canvas

//// Agregar el listener al botón
//$boton.addEventListener("click", () => {
//  html2canvas($objetivo) // Llamar a html2canvas y pasarle el elemento
//    .then(canvas => {
//      // Cuando se resuelva la promesa traerá el canvas
//      $contenedorCanvas.appendChild(canvas); // Lo agregamos como hijo del div
//    });
//});

        $("#save").click(function () {
////            var c = document.getElementById('canvas');
////            var t = c.getContext('2d');
////            /* then use the canvas 2D drawing functions to add text, etc. for the result */
////            window.open('', document.getElementById('canvas').toDataURL());

// Check for the various File API support.
//if (window.File && window.FileReader && window.FileList && window.Blob) {
//  // Great success! All the File APIs are supported.
//  alert("ok");
//} else {
//  alert('The File APIs are not fully supported in this browser.');
//}

       });
   
</script>