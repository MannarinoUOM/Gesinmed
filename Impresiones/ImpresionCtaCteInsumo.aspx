<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionCtaCteInsumo.aspx.cs" Inherits="Impresiones_ImpresionCtaCteInsumo" %>

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
            Font-Names="Verdana" Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\ImpresionCtaCteInsumo.rdlc" EnableExternalImages="true">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="DataSet2" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
    </div>
    <asp:SqlDataSource ID="FuenteDatos" runat="server" 
        ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
        SelectCommand="H2_INSUMOS_CTACTE_LIST_MOV_BYINSUMO" 
        SelectCommandType="StoredProcedure">
        <SelectParameters>
            <asp:QueryStringParameter Name="InsumoId" QueryStringField="InsumoId" 
                Type="Int32" />
            <asp:QueryStringParameter DbType="Date" Name="Desde" QueryStringField="Desde" />
            <asp:QueryStringParameter DbType="Date" Name="Hasta" QueryStringField="Hasta" />
            <asp:QueryStringParameter Name="ConInventario" QueryStringField="Inventario" 
                Type="Boolean" />
        </SelectParameters>
    </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
        ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
        SelectCommand="H2_Turnos_Centro_Unico" 
        SelectCommandType="StoredProcedure">
    </asp:SqlDataSource>
            <%  if (Request.QueryString["Excel"].Equals("0"))
                    Crearpdf(); %>
    </form>
</body>
</html>
