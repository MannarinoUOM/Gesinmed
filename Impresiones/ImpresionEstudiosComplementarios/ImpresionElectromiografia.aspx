<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionElectromiografia.aspx.cs"
    Inherits="Impresiones_ImpresionElectromiografia" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div style="height: 362px">
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt"
            InteractiveDeviceInfos="(Collection)" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt"
            Width="697px">
            <LocalReport ReportPath="EstudiosComplementarios\Electromiografia.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Fuente_Centro" Name="FuenteCentro" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1_Selecting1" Name="DataSetElectromiografia" />
                    <rsweb:ReportDataSource DataSourceId="firma" Name="firma" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="firma" runat="server" ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>"
            SelectCommand="H2_Traer_Firma_medico" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="medicoId" QueryStringField="MedicoId" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="Fuente_Centro" runat="server" ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>"
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource1_Selecting1" runat="server" ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>"
            SelectCommand="Impresion_Electromiografia" SelectCommandType="StoredProcedure"
            OnSelecting="SqlDataSource1_Selecting">
            <SelectParameters>
                <asp:QueryStringParameter Name="Id_Afiliado" QueryStringField="Id_Afiliado" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    </form>
    <%PDF(); %>
</body>
</html>
