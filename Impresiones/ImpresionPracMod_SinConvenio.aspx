<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionPracMod_SinConvenio.aspx.cs" Inherits="Impresiones_ImpresionPracMod_SinConvenio" %>

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
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <localreport reportpath="Impresiones\ImpresionPracMod_SinConvenio.rdlc" EnableExternalImages="true">
                <datasources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet2" />
                </datasources>
            </localreport>
        </rsweb:ReportViewer>

        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_FACT_PRACTICAS_MODULOS_SIN_CONVENIO" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Seccional" 
                    QueryStringField="SeccionalId" Type="Int64" />
                <asp:QueryStringParameter Name="Institucion" 
                    QueryStringField="InstitucionId" Type="Int64" />
                <asp:QueryStringParameter Name="Practica" 
                    QueryStringField="Practica" Type="Boolean" />
                <asp:QueryStringParameter DbType="Date" Name="FechaDesde" 
                    QueryStringField="Desde" />
                <asp:QueryStringParameter Name="FechaHasta" QueryStringField="Hasta" 
                    DbType="Date" />
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
