<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionRendicion.aspx.cs" Inherits="Impresiones_ImpresionRendicion" %>

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
            <LocalReport ReportPath="Impresiones\ImpresionRendicion.rdlc" 
                EnableExternalImages="true">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet2" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_FACT_PRINT_RENDICION" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Ambulatorio" DefaultValue="" 
                    QueryStringField="Ambu" Type="Boolean" />
                <asp:QueryStringParameter Name="Internacion" DefaultValue="" 
                    QueryStringField="Inter" Type="Boolean" />
                <asp:QueryStringParameter Name="PorPractica" DefaultValue="" 
                    QueryStringField="Practica" Type="Boolean" />
                <asp:QueryStringParameter DbType="Date" Name="Fecha" 
                    QueryStringField="Periodo" />
                <asp:QueryStringParameter Name="SeccionalIds" QueryStringField="SeccionalIds" 
                    Type="String" />
                <asp:QueryStringParameter DefaultValue="" Name="PreFacturacion" 
                    QueryStringField="PreFacturacion" Type="Boolean" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    <%if(Request.QueryString["Excel"].Equals("0")) %>
    <%pdf_Click(); %>
    </form>
</body>
</html>
