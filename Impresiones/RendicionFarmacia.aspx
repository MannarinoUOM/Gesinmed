<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RendicionFarmacia.aspx.cs" Inherits="Impresion_RendicionFarmacia" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:GridView ID="grv_RendicionVentas" runat="server" Height="350px" 
            onrowdatabound="grv_RendicionVentas_RowDataBound" Font-Size="11pt">
        </asp:GridView>
        <asp:Label ID="lblRendicion" runat="server" Text=""></asp:Label>
    </div>
    </form>
</body>
</html>
