<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Escanear.aspx.cs" Inherits="Imagenes_Turno_Escanear" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Escanear Documentación</title>

    <asp:Literal ID="Literal1" runat="server"></asp:Literal>

    <script>       

        var var_ = turno + "-" + paciente;
        MyObject = new ActiveXObject("WScript.Shell");
        MyObject.Run("file://///10.10.8.71/Software/Escanear_IMAGENES.exe " + var_);            

        setTimeout(wait, 1000);

        function wait() {
            self.close();
        }                

    </script>

</head>
<body>
    <form id="form1" runat="server">
    <div style="font-size:60px; color:Gray; font-family:Arial;">
        Escaneando...
    </div>
    </form>
</body>
</html>
