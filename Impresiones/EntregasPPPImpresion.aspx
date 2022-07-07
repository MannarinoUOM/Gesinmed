<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EntregasPPPImpresion.aspx.cs" Inherits="Impresiones_EntregasPPPImpresion" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

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
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" 
            Font-Names="Verdana" Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\ENTREGAS.rdlc" EnableExternalImages="true">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCab" Name="DataSet2" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDet3" Name="DataSet5" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCab" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_LIST_EGR_CAB_PRINT" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="RemitoID" QueryStringField="Id" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteDet3" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_LIST_EGR_DET_PRINT3" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="RemitoId" QueryStringField="Id" Type="Int32" />
                <asp:QueryStringParameter Name="NroEntrega" QueryStringField="Nro" 
                    Type="Int32" />
                <asp:QueryStringParameter DefaultValue="0" Name="Modifica" QueryStringField="M" 
                    Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    <%PDF(); %>
    </form>
</body>
</html>
