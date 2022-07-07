<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionesHCTotales.aspx.cs" Inherits="Impresiones_ImpresionesHCTotales" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

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
            <LocalReport ReportPath="Impresiones\ImpresionHistoriaClinicaTotal.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="fuenteHCTotales" Name="ImpresionHC" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="fuenteHCTotales" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Historia_Clinica_Total" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="NHC" QueryStringField="NHC" Type="Int64" 
                    DefaultValue="0" />
                <asp:QueryStringParameter Name="FechaDesde" QueryStringField="FechaDesde" 
                    Type="DateTime" DefaultValue="01/01/1900" />
                <asp:QueryStringParameter Name="FechaHasta" QueryStringField="FechaHasta" 
                    Type="DateTime" DefaultValue="01/01/2100" />
                <asp:QueryStringParameter Name="EspecialidadesIds" 
                    QueryStringField="Especialidades" Type="String" DefaultValue="0" />
                <asp:QueryStringParameter Name="Diabetologia" QueryStringField="Diabetologia" 
                    Type="Boolean" DefaultValue="false" />
                <asp:QueryStringParameter DefaultValue="false" Name="Internacion" 
                    QueryStringField="Internacion" Type="Boolean" />
                <asp:QueryStringParameter DefaultValue="false" Name="Cirugia" 
                    QueryStringField="Cirugia" Type="Boolean" />
                <asp:QueryStringParameter DefaultValue="" Name="Neonatologia" 
                    QueryStringField="Neonatologia" Type="Boolean" />
            </SelectParameters>
        </asp:SqlDataSource>
        
    </div>
    <%PDF(); %>
    </form>
</body>
</html>
