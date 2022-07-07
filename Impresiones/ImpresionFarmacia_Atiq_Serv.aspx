<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionFarmacia_Atiq_Serv.aspx.cs" Inherits="Impresiones_ImpresionFarmacia_Atiq_Serv" %>

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
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
                Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
                WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\ImpresionFarmacia_Etiq_Serv.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Datos" Name="Datos" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

            <asp:SqlDataSource ID="Datos" runat="server" 
                ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
                SelectCommand="H2_FARMACIA_ENTREGA_PRINT_ETIQ" 
                SelectCommandType="StoredProcedure">
                <SelectParameters>
                    <asp:QueryStringParameter Name="EntregaId" QueryStringField="EntregaId" 
                        Type="Int64" />
                    <asp:QueryStringParameter Name="NroEntrega" QueryStringField="NroEntrega" 
                        Type="Int64" />
                    <asp:QueryStringParameter Name="EsIM" QueryStringField="EsIM" Type="Int32" />
                </SelectParameters>
            </asp:SqlDataSource>

    </div>
    </form>
        <%pdf_Click(); %>
</body>
</html>
