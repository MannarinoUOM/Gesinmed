<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listados_Informes_De_Produccion_Ranking_ICD10_Ambulatorio_X_Seccional.aspx.cs" Inherits="Impresiones_Listados_Informes_De_Produccion_Ranking_ICD10_Ambulatorio_X_Seccional" %>

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
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\Listados_Informes_De_Produccion_Ranking_ICD10_Ambulatorio_X_Seccional.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource2" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

        <asp:SqlDataSource ID="SqlDataSource2" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Listados_Informes_De_Produccion_Ranking_ICD10_Ambulatorio_X_Seccional" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="DESDE" QueryStringField="desde" Type="String" />
                <asp:QueryStringParameter Name="HASTA" QueryStringField="hasta" Type="String" />
                <asp:QueryStringParameter Name="seccional" QueryStringField="seccional" 
                    Type="String" />
                <asp:QueryStringParameter Name="TodosMenorMayor" 
                    QueryStringField="TodosMenorMayor" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>

    </div>
    </form>
      <%if (Request.QueryString["PDF"] == "1") pdf(); %>
</body>
</html>
