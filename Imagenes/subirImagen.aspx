<%@ Page Language="C#" AutoEventWireup="true" CodeFile="subirImagen.aspx.cs" Inherits="Imagenes_subirImagen" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
      <%--  <asp:Label ID="mensaje" runat="server" style="color:Lime; display:none" Text="ARCHIVO ADJUNTADO"></asp:Label>--%>
        <asp:FileUpload ID='btnAdjuntarReclamo' runat='server' AllowMultiple='true'/>
        <asp:Button ID='btnSubir' onclick="btnSubir_Click" runat='server' Text='Subir Archivo' UseSubmitBehavior='false'/>
        <input type="hidden" id="turnoId" runat="server"/>
        
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script type="text/javascript">
    $(document).ready(function () {
        var GET = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }

            GET[decode(arguments[1])] = decode(arguments[2]);
        });

        if (GET["turnoId"] != "" && GET["turnoId"] != null) {
             $("#turnoId").val(GET["turnoId"]);
        }
     });
</script>