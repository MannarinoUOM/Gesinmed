<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Mail.aspx.cs" Inherits="Mail" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div style="text-align:center"><img src="img/email.gif" width="500px" /><div><h1 style="color:red">Enviando E-Mail. Espere, no cierre esta ventana.<asp:Button 
                ID="Button1" runat="server" onclick="Button1_Click" Text="Button" style="display:none"/>
            </h1></div></div>
    </div>
    </form>
</body>
</html>
    <script src="js/jquery-1.8.3.js" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            //setTimeout($("#Button1").click(), '99999999999999999999999');
            delay(4000);
            $("#Button1").click()
        });

        function delay(ms) {
            ms += new Date().getTime();
            while (new Date() < ms) { }
        }
 
    </script>