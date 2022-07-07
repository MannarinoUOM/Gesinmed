<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionTurno.aspx.cs" Inherits="Impresiones_ImpresionTurno" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">

    <asp:TextBox ID="txtFecha" runat="server" Visible="False"></asp:TextBox>

    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    
    <div>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\Turno.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteTurnos" Name="Impresion_Turno" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuentePractica" Name="DataSet2" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource2" Name="DataSet3" />
                    <rsweb:ReportDataSource DataSourceId="FuenteTurnosFecha" Name="DataSet4" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteTurnos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Impresion_Turno" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="TurnoMedicoId" QueryStringField="MedicoId" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="TurnoEspecialidadId" 
                    QueryStringField="EspecialidadId" Type="Int32" />
                <asp:ControlParameter ControlID="txtFecha" Name="TurnoFecha" 
                    PropertyName="Text" Type="DateTime" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
        <asp:SqlDataSource ID="FuentePractica" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_PRACTICAS_POR_TURNO_PRINT" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="TurnoMedicoId" QueryStringField="MedicoId" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="TurnoEspecialidadId" 
                    QueryStringField="EspecialidadId" Type="Int32" />
                <asp:QueryStringParameter Name="TurnoFecha" QueryStringField="Fecha" 
                    Type="DateTime" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource2" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_TURNO_SUGERENCIAS_POR_TURNO_PRINT" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="TurnoMedicoId" QueryStringField="MedicoId" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="TurnoEspecialidadId" 
                    QueryStringField="EspecialidadId" Type="Int32" />
                <asp:QueryStringParameter Name="TurnoFecha" QueryStringField="Fecha" 
                    Type="DateTime" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteTurnosFecha" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_TURNO_LISTAR_FECHAS_BY_ID" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="TurnoIds" QueryStringField="Ids" 
                    Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    <%PDF(); %>
    </form>
</body>
</html>
