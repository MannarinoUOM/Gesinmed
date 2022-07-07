<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionSeleccionDatosPreviaSN_Honorario.aspx.cs" Inherits="Impresiones_ImpresionSeleccionDatosPreviaSN_Honorario" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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
                <localreport reportpath="Impresiones\ImpresionHonorarioInternacion.rdlc">
                    <datasources>
                        <rsweb:ReportDataSource DataSourceId="FuenteDet" Name="DataSet1" />
                        <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet2" />
                    </datasources>
                </localreport>
            </rsweb:ReportViewer>
            <asp:SqlDataSource ID="FuenteDet" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_FACT_HONORARIO_INT_CAB_OS_VISTAPREVIA_SN" 
                SelectCommandType="StoredProcedure">
                <SelectParameters>
                    <asp:QueryStringParameter Name="NroPartesId" 
                        QueryStringField="Partes" Type="String" />
                </SelectParameters>
            </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    <%pdf_Click(); %>
    </form>
</body>
</html>
