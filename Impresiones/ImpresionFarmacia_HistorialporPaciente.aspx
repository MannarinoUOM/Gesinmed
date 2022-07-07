<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionFarmacia_HistorialporPaciente.aspx.cs" Inherits="Impresiones_ImpresionFarmacia_HistorialporPaciente" %>

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
            <LocalReport ReportPath="Impresiones\ImpresionFarmacia_HistorialporPaciente.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet2" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDatosPac" Name="DataSet3" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_FARMACIA_HISTORIAL_INSUMO_POR_PAC" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DbType="Date" Name="Desde" QueryStringField="Desde" />
                <asp:QueryStringParameter DbType="Date" Name="Hasta" QueryStringField="Hasta" />
                <asp:QueryStringParameter Name="PacienteId" QueryStringField="Id" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteDatosPac" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Personas_Gente_Local_ID" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Paciente_Id" QueryStringField="Id" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    <%Crearpdf(); %>
    </form>
</body>
</html>
