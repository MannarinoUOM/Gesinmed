<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Reportes_PracticasporMedicos.aspx.cs" Inherits="Impresiones_Reportes_PracticasporMedicos" %>

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
            <LocalReport ReportPath="Impresiones\Reportes_PracticasporMedicos.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet2" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_INFORMES_PRACTICAS_POR_MEDICO" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DbType="Date" Name="Desde" QueryStringField="Desde" />
                <asp:QueryStringParameter DbType="Date" Name="Hasta" QueryStringField="Hasta" />
                <asp:QueryStringParameter Name="Especialidad" QueryStringField="EspId" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="Medico" QueryStringField="MedId" Type="Int32" />
                <asp:QueryStringParameter Name="SeccionalesIds" 
                    QueryStringField="SeccionalesIds" Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    </form>
    <%if (Request.QueryString["PDF"] == "1") pdf_Click(); %>
</body>
</html>
