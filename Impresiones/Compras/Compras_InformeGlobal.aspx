<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Compras_InformeGlobal.aspx.cs" Inherits="Impresiones_Compras_Compras_InformeGlobal" %>

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
            Font-Names="Verdana" Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\Compras\Compras_InformeGlobal.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet3" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_COMPRAS_INFORME_GLOBAL_LIST" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DbType="Date" Name="FechaRemito_Desde" 
                    QueryStringField="FechaRemito_Desde" />
                <asp:QueryStringParameter DbType="Date" Name="FechaRemito_Hasta" 
                    QueryStringField="FechaRemito_Hasta" />
                <asp:QueryStringParameter Name="NroExp_Desde" QueryStringField="NroExp_Desde" 
                    Type="Int64" />
                <asp:QueryStringParameter Name="NroExp_Hasta" QueryStringField="NroExp_Hasta" 
                    Type="Int64" />
                <asp:QueryStringParameter Name="Insumo" QueryStringField="Insumo" 
                    Type="String" />
                <asp:QueryStringParameter Name="NroPedido_Desde" 
                    QueryStringField="NroPedido_Desde" Type="Int64" />
                <asp:QueryStringParameter Name="NroPedido_Hasta" 
                    QueryStringField="NroPedido_Hasta" Type="Int64" />
                <asp:QueryStringParameter Name="Pendientes" QueryStringField="Pendientes" 
                    Type="Boolean" />
                <asp:QueryStringParameter Name="Entregados" QueryStringField="Entregados" 
                    Type="Boolean" />
                <asp:QueryStringParameter Name="Paciente" QueryStringField="Paciente" 
                    Type="String" />
                <asp:QueryStringParameter Name="Seccional" QueryStringField="Seccional" 
                    Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    </form>
</body>
</html>
