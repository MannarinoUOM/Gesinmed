<%@ Page Language="C#" AutoEventWireup="true" CodeFile="VentaalPublico_Impresion.aspx.cs" Inherits="Impresion_VentaalPublico_Impresion" %>

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
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%" Height="600px">
            <LocalReport ReportPath="Impresiones\Imprimir_VentaalPublico.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteCentros" Name="DataSet4" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos1" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet2" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_FAR_PEDIDOS_PUBLICO_SELECT_PRINT_CAB" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="PED_ID" QueryStringField="Id" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteDatos1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_FAR_PEDIDOS_PUBLICO_SELECT_DETALLE" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="PED_ID" QueryStringField="Id" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentros" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" SelectCommand="SELECT        TOP (1) Centro.Id, Centro.RazonSocial, Centro.Calle, Centro.Nro, Centro.Piso, Centro.Depto, Centro.CP, Centro.LocalidadId, Centro.Provincia, Centro.Observaciones, 
                         Centro.Director, Centro.NroCuit, Centro.Observacioens2, Centro.Telefono, Centro.Fax, Localidades.Descripcion AS LocNombre
FROM            Centro INNER JOIN
                         Localidades ON Centro.LocalidadId = Localidades.Id
WHERE        (Centro.IsActive = '1')"></asp:SqlDataSource>
    </div>
    <%Crearpdf(); %>
    </form>
</body>
</html>
