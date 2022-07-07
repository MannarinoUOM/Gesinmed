<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarRemitosFacturas.aspx.cs" Inherits="Impresiones_Compras_BuscarRemitosFacturas" %>

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
            <LocalReport ReportPath="Impresiones\Compras\BuscarRemitosFacturas.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Centro" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="Datos" Name="Datos" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="Datos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_COMPRAS_LIST_REMITOS_INTERNACION" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DbType="Date" Name="Desde" QueryStringField="Desde" />
                <asp:QueryStringParameter DbType="Date" Name="Hasta" QueryStringField="Hasta" />
                <asp:QueryStringParameter Name="ProveedorId" QueryStringField="ProveedorId" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="Letra" QueryStringField="Letra" Type="String" />
                <asp:QueryStringParameter Name="Sucursal" QueryStringField="Sucursal" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="Numero" QueryStringField="Numero" 
                    Type="Int32" />
                <asp:QueryStringParameter DefaultValue="" Name="Letra_Fact" 
                    QueryStringField="Letra_Fact" Type="String" />
                <asp:QueryStringParameter DefaultValue="" Name="Sucursal_Fact" 
                    QueryStringField="Sucursal_Fact" Type="Int32" />
                <asp:QueryStringParameter Name="Numero_Fact" QueryStringField="Numero_Fact" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="Ncompra" QueryStringField="Ncompra" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="Farmacia" QueryStringField="Farmacia" 
                    Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="Centro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
    </div>
    </form>
</body>
</html>
 <%if (Request.QueryString["PDF"] == "1") PDF(); %>