<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Impresion_Fact_Modulos_por_Conv_Nomencla.aspx.cs" Inherits="Impresiones_Impresion_Fact_Modulos_por_Conv_Nomencla" %>

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
        <LocalReport ReportPath="Impresiones\Impresion_Fact_Modulos_por_Conv_Nomencla.rdlc">
            <DataSources>
                <rsweb:ReportDataSource DataSourceId="Fuente" Name="DataSet1" />
                <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="Centro" />
            </DataSources>
        </LocalReport>
    </rsweb:ReportViewer>
    <asp:SqlDataSource ID="Fuente" runat="server" 
        ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
        SelectCommand="H2_FACT_MODULOS_PRINT_SN" 
        SelectCommandType="StoredProcedure">
        <SelectParameters>
            <asp:QueryStringParameter Name="Convenio" QueryStringField="Convenio" 
                Type="Int64" />
            <asp:QueryStringParameter Name="Nomenclador" QueryStringField="Nomenclador" 
                Type="String" />
        </SelectParameters>
    </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
        ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
        SelectCommand="H2_Turnos_Centro_Unico" 
        SelectCommandType="StoredProcedure">
    </asp:SqlDataSource>
    <%pdf_Click(); %>
    </form>
</body>
</html>

