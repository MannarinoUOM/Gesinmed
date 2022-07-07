<%@ Page Language="C#" AutoEventWireup="true" CodeFile="LaboratorioComprobante.aspx.cs" Inherits="Impresiones_LaboratorioComprobante" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>

    <div>
    
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\ComprobanteLaboratorio.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="source_ImpresionCab" 
                        Name="Impresion_Laboratorio_Cab" />
                    <rsweb:ReportDataSource DataSourceId="sourceItems" 
                        Name="Impresion_Laboratorio_Item" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="sourceItems" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Laboratorio_Impresion_Items" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DefaultValue="16" Name="CodOrden" 
                    QueryStringField="Protocolo" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="source_ImpresionCab" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Laboratorio_Impresion_Cab" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DefaultValue="16" Name="Orden" 
                    QueryStringField="Protocolo" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
    
    </div>
    <%PDF(); %>
    </form>
</body>
</html>
