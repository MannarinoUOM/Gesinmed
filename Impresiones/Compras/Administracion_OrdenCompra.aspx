<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Administracion_OrdenCompra.aspx.cs" Inherits="Impresiones_Compras_Administracion_OrdenCompra" %>

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
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" 
            Font-Names="Verdana" Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\Compras\Administracion_OrdenCompra.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteCAB" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDET" Name="DataSet2" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet3" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <asp:SqlDataSource ID="FuenteCAB" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_COM_ORDEN_CAB_LIST" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="ORD_CAB_ID" QueryStringField="ORD_CAB_ID" 
                    Type="Int64" />
                <asp:Parameter DbType="Date" DefaultValue="01/01/1900" 
                    Name="ORD_CAB_FECHA_DESDE" />
                <asp:Parameter DbType="Date" DefaultValue="01/01/1900" 
                    Name="ORD_CAB_FECHA_HASTA" />
                <asp:Parameter DefaultValue="0" Name="ORD_CAB_PRV_ID" Type="Int64" />
                <asp:QueryStringParameter DefaultValue="0" Name="ESTADO" 
                    QueryStringField="Estado" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteDET" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_COM_ORDEN_DET_LIST_BY_CAB" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="ORD_CAB_ID" QueryStringField="ORD_CAB_ID" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    <%PDF(); %>
    </form>
</body>
</html>
