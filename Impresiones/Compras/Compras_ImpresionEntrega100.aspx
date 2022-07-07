<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Compras_ImpresionEntrega100.aspx.cs" Inherits="Impresiones_Compras_Compras_ImpresionEntrega100" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" 
            Font-Names="Verdana" Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\Compras\Compras_ImpresionEntrega100.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet3" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCabecera" Name="DataSet2" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_COMPRAS_IMPRESION_REMITO_100" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="ENT_CAB_ID" QueryStringField="ENT_CAB_ID" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCabecera" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_COMPRAS_IMPRESION_REMITO_100_CAB" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="ENT_CAB_ID" QueryStringField="ENT_CAB_ID" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    </form>
    <% PDF();%>
</body>
</html>
