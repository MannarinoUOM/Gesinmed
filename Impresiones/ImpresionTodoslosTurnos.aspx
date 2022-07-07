<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionTodoslosTurnos.aspx.cs" Inherits="Impresiones_ImpresionTodoslosTurnos" %>

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
            <LocalReport ReportPath="Impresiones\ImpresionTodoslosTurnos.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteTurnos" Name="LosTurnos" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet3" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteTurnos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_VerTodos_Print" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DefaultValue="" Name="MedicosId" 
                    QueryStringField="MedicosId" Type="String" />
                <asp:QueryStringParameter Name="EspecialidadesId" 
                    QueryStringField="EspecialidadesId" Type="String" />
                <asp:QueryStringParameter DbType="Date" Name="FechaInicio" 
                    QueryStringField="FechaInicio" />
                <asp:QueryStringParameter DbType="Date" Name="FechaFin" 
                    QueryStringField="FechaFin" />
                <asp:QueryStringParameter Name="Todos" QueryStringField="Todos" 
                    Type="Boolean" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    </form>
</body>
</html>
<%pdf_crear(); %>