<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionDiabeticaListados.aspx.cs" Inherits="Impresiones_ImpresionDiabeticaListados" %>

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
            <LocalReport ReportPath="Impresiones\ImpresionDiabeticaListados.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDiabetes" Name="Filtro0" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

           <asp:SqlDataSource ID="FuenteDiabetes" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_AtConsultorio_Diabetes_Listados_Filtro_0" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="tipo" QueryStringField="tipo" Type="string" />
                <asp:QueryStringParameter Name="filtro" QueryStringField="filtro" Type="string" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    </form>
</body>
</html>
