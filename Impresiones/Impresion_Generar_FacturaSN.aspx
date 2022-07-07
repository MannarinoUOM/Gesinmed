<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Impresion_Generar_FacturaSN.aspx.cs" Inherits="Impresiones_Impresion_Generar_FacturaSN" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" 
        Font-Names="Verdana" Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
        WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
        <LocalReport EnableExternalImages="True" 
            ReportPath="Impresiones\Impresion_Generar_FacturaSN.rdlc">
            <DataSources>
                <rsweb:ReportDataSource DataSourceId="Fuente" Name="DataSet1" />
            </DataSources>
        </LocalReport>
    </rsweb:ReportViewer>
    <asp:SqlDataSource ID="Fuente" runat="server" 
        ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
        SelectCommand="H2_FACT_EMITE_FACTURA_PRINT_SN" 
        SelectCommandType="StoredProcedure">
        <SelectParameters>
            <asp:QueryStringParameter Name="Id" QueryStringField="Id" 
                Type="Int64" />
        </SelectParameters>
    </asp:SqlDataSource>
    <%pdf_Click(); %>
    </form>
</body>
</html>
