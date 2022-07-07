<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GastosAdministraciónInternacion.aspx.cs" Inherits="Impresiones_ReportesCompras_GastosAdministraciónInternacion" %>

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
            <LocalReport ReportPath="Impresiones\ReportesCompras\GastosAdministraciónInternacion.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Centro" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="Datos" Name="Datos" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

        <asp:SqlDataSource ID="Datos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Gastos_de_Administración_e_Internacion" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="DESDE" QueryStringField="desde" Type="String" />
                <asp:QueryStringParameter Name="HASTA" QueryStringField="hasta" Type="String" />
                <asp:QueryStringParameter Name="PROVEEDOR" QueryStringField="prv" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="TIPO_ORDEN" QueryStringField="tipo" 
                    Type="String" />
                <asp:QueryStringParameter Name="NRO_ORDEN" QueryStringField="orden" 
                    Type="Int32" />
                <asp:QueryStringParameter DefaultValue=" " Name="INSUMO" 
                    QueryStringField="insumo" Type="String" />
                <asp:QueryStringParameter DefaultValue=" " Name="REMITO" 
                    QueryStringField="remito" Type="String"  />
                <asp:QueryStringParameter DefaultValue=" " Name="FACTURA" 
                    QueryStringField="factura" Type="String"  />
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
<%if (Request.QueryString["PDF"] == "1") pdf(); %>