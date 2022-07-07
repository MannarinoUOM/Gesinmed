<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Autorizacion70100.aspx.cs" Inherits="Impresiones_Autorizacion70100" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:TextBox ID="txtProtocolo" runat="server" Visible="False">9</asp:TextBox>

        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\AutorizacionX3.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteMedicamentos" Name="Medicamentos" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCabecera" Name="Cabecera" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet2" />
                    <rsweb:ReportDataSource DataSourceId="firma" Name="firma" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
    
        <asp:SqlDataSource ID="firma" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Traer_Firma_medico" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="medicoId" QueryStringField="idm" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
    
        <asp:SqlDataSource ID="FuenteCabecera" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_AtConsultorio_Recetas_Impresion_70100_CAB" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:ControlParameter ControlID="txtProtocolo" Name="Protocolo" 
                    PropertyName="Text" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
    
        <asp:SqlDataSource ID="FuenteMedicamentos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_AtConsultorio_Recetas_Cargar_DET_70100" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:ControlParameter ControlID="txtProtocolo" Name="Protocolo" 
                    PropertyName="Text" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    </form>
     <%pdf(); %>
</body>
</html>
