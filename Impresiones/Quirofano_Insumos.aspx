<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Quirofano_Insumos.aspx.cs" Inherits="Impresion_Quirofano_Insumos" %>

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
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" 
            Font-Names="Verdana" Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\Quirofano_Impresion_Insumo.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="CentroDAL" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="Cabecera" Name="Cabecera" />
                    <rsweb:ReportDataSource DataSourceId="DetalleDAL" Name="Detalle" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="Cabecera" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_QUIROFANO_INSUMO_IMPRESION_CABECERA" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="CirugiaId" QueryStringField="CirugiaId" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="DetalleDAL" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_QUIROFANO_INSUMOS_IMPRESION_DETALLE" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Cirugia_Id" QueryStringField="CirugiaId" 
                    Type="Int64" />
                <asp:QueryStringParameter Name="Tipo" QueryStringField="Tipo" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="CentroDAL" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
    </div>
    <%PDF(); %>
    </form>
</body>
</html>
