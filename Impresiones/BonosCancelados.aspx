<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BonosCancelados.aspx.cs" Inherits="Impresiones_BonosCancelados" %>

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
            <LocalReport ReportPath="Impresiones\BonosCancelados.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Datos" Name="BonosCancelado" />
                    <rsweb:ReportDataSource DataSourceId="Centro" Name="DataSet3" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="Datos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Bono_Buscar_Con_Cancelados_Print" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Afiliado" QueryStringField="Afiliado" 
                    Type="String" />
                <asp:QueryStringParameter Name="Desde" QueryStringField="Desde" 
                    Type="DateTime" />
                <asp:QueryStringParameter Name="Hasta" QueryStringField="Hasta" 
                    Type="DateTime" />
                <asp:QueryStringParameter Name="nroHC" QueryStringField="NHC" Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="Centro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    <%PDF(); %>
    </form>
</body>
</html>
