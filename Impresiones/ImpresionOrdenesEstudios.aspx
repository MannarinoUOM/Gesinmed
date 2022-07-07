<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionOrdenesEstudios.aspx.cs" Inherits="Impresiones_ImpresionOrdenesEstudios" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<body>
    
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div>
    
        <asp:TextBox ID="txtProtocolo" runat="server"></asp:TextBox>

        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\Ordenes.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteOrdenes" Name="Ordenes" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDetalles" Name="Detalles" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet3" />
                    <rsweb:ReportDataSource DataSourceId="firma" Name="firma" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="firma" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Traer_Firma_medico" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="medicoId" QueryStringField="MedicoId" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteDetalles" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Ordenes_Estudios_Det_Impresion" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:ControlParameter ControlID="txtProtocolo" Name="protocolo" 
                    PropertyName="Text" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteOrdenes" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Ordenes_Estudios_Cab_Impresion" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:ControlParameter ControlID="txtProtocolo" DefaultValue="0" 
                    Name="protocolo" PropertyName="Text" Type="Int64" />
                <asp:QueryStringParameter Name="IntId" QueryStringField="IntId" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    </form>
    <%Crearpdf(); %>
</body>
</html>
