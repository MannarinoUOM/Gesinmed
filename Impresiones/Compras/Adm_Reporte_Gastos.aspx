<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Adm_Reporte_Gastos.aspx.cs" Inherits="Impresiones_Compras_Adm_Reporte_Gastos" %>

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
            <LocalReport ReportPath="Impresiones\Compras\Adm_Reporte_Gastos.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_COM_ADM_REPORTE_FINAL" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DbType="Date" Name="Desde" QueryStringField="Desde" />
                <asp:QueryStringParameter DbType="Date" Name="Hasta" QueryStringField="Hasta" />
                <asp:QueryStringParameter Name="Insumo" QueryStringField="Insumo" 
                    Type="String" />
                <asp:QueryStringParameter Name="PRV_ID" QueryStringField="PRV_ID" 
                    Type="Int32" />
                <asp:QueryStringParameter DefaultValue=" " Name="OrdenCompra" 
                    QueryStringField="OrdenCompra" Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    <%if (Request.QueryString["PDF"] == "1") PDF(); %>
    </form>
</body>
</html>
