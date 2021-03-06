<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Internacion_GastosExtraBuscarExcel.aspx.cs" Inherits="Impresiones_Compras_Internacion_GastosExtraBuscarExcel" %>

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
            <LocalReport ReportPath="Impresiones\Compras\Internacion_GastosExtraBuscarExcel.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_COM_GASTOS_EXT_CAB_BUSCAR" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="COM_GASTOS_EXT_CAB_ID" QueryStringField="Id" 
                    Type="Int64" DefaultValue="" />
                <asp:QueryStringParameter Name="Paciente" QueryStringField="Paciente" 
                    Type="String" DefaultValue=" " />
                <asp:QueryStringParameter Name="NHC" QueryStringField="NHC" Type="String" 
                    DefaultValue=" " />
                <asp:QueryStringParameter DbType="Date" Name="Desde" QueryStringField="Desde" 
                    DefaultValue="" />
                <asp:QueryStringParameter DbType="Date" Name="Hasta" QueryStringField="Hasta" />
                <asp:QueryStringParameter Name="Seccional" QueryStringField="Seccional" 
                    Type="Int32" DefaultValue="" />
                <asp:QueryStringParameter Name="Insumo" QueryStringField="Insumo" 
                    Type="String" DefaultValue=" " />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    </form>
</body>
</html>
