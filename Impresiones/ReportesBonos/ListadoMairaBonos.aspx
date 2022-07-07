<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListadoMairaBonos.aspx.cs" Inherits="Impresiones_ReportesBonos_ListadoMairaBonos" %>

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
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\ReportesBonos\ListadoMairaBonos.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Datos" Name="Datos" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="Datos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Listado_Maira_Bonos" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="desde" QueryStringField="desde" Type="String" />
                <asp:QueryStringParameter Name="hasta" QueryStringField="hasta" Type="String" />
                <asp:QueryStringParameter Name="especialidad" QueryStringField="especialidad" 
                    Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    </form>
</body>
</html>
