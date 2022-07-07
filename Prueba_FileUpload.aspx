<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Prueba_FileUpload.aspx.cs" Inherits="Prueba_FileUpload" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:FileUpload ID="File_NHC" runat="server" AllowMultiple="true" />
        <asp:Button ID="btnSubirFile_NHC" runat="server" Text="Subir" 
            onclick="btnSubir_Click" />
        <br />
        <p id="lbl_File_NHC" runat="server" style="font-weight:bold; color: Green;"></p>
        <br />
    </div>
    </form>
</body>
</html>
