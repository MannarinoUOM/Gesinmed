<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionFarmacia_Etiq.aspx.cs" Inherits="Impresiones_ImpresionFarmacia_Etiq" %>

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
            <LocalReport ReportPath="Impresiones\ImpresionFarmacia_Etiq.rdlc" EnableExternalImages="True">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_FARMACIA_ENTREGA_PRINT_ETIQ_2" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="EntregaId" QueryStringField="Id" Type="Int64" 
                    DefaultValue="" />
                <asp:QueryStringParameter Name="NroEntrega" QueryStringField="Nro" 
                    Type="Int64" />
                <asp:QueryStringParameter DefaultValue="0" Name="EsIM" QueryStringField="EsIM" 
                    Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    <%pdf_Click(); %>
    </form>
</body>
</html>
