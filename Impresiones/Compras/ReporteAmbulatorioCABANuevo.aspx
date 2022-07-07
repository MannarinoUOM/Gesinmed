<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReporteAmbulatorioCABANuevo.aspx.cs" Inherits="Impresiones_Compras_ReporteAmbulatorioCABANuevo" %>

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
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\Compras\ReporteAmbulatorioCABANuevo.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Datos" Name="Datos" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="Datos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Reporte_Ambulatorio_CABA_Nuevo" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="desde" QueryStringField="desde" Type="String" 
                    DefaultValue="01/01/1900" />
                <asp:QueryStringParameter Name="hasta" QueryStringField="hasta" Type="String" 
                    DefaultValue="01/01/1900" />
                <asp:QueryStringParameter Name="afiliado" QueryStringField="afiliado" 
                    Type="String" DefaultValue=" " />
                <asp:QueryStringParameter Name="dni" QueryStringField="dni" Type="Int32" />
                <asp:QueryStringParameter Name="nhc" QueryStringField="nhc" Type="Int32" />
                <asp:QueryStringParameter Name="seccional" QueryStringField="seccional" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="pedido" QueryStringField="pedido" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="insumo" QueryStringField="insumo" 
                    Type="String" />
                <asp:QueryStringParameter Name="porcentajeAudita" 
                    QueryStringField="porcentajeAudita" Type="Int32" />
                <asp:QueryStringParameter Name="gastoUOM" QueryStringField="gastoUOM" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="remito" QueryStringField="remito" 
                    Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    </form>
</body>
</html>
  <% PDF(); %>