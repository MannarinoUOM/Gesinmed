<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Compras_Entregas_Internacion.aspx.cs" Inherits="Impresiones_Compras_Compras_Entregas_Internacion" %>

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
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\Compras\Compras_Entregas_Internacion.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource3" Name="DataSet3" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="Entregas" Name="Entregas" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

   
        <asp:SqlDataSource ID="Entregas" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Compras_DET_Entrega_Impresion_Internacion" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Ids" QueryStringField="Ids" Type="String" />
                <asp:QueryStringParameter Name="entrega" QueryStringField="entrega" 
                    Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>

   
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Compras_CAB_Entrega_Impresion_Internacion" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="G_ExpId" QueryStringField="G_ExpId" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource3" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>

    </div>
        <%PDF(); %>
    </form>
</body>
</html>
