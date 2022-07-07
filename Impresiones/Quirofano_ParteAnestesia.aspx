<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Quirofano_ParteAnestesia.aspx.cs" Inherits="Impresion_Quirofano_ParteAnestesia" %>

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
            Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\Quirofano_Parte_Anestesia_Impresion.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="FuenteEncabezado" Name="Encabezado1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteParte" Name="PreAnestesia" />
                    <rsweb:ReportDataSource DataSourceId="FuenteSignosVitales" 
                        Name="SignosVitales" />
                    <rsweb:ReportDataSource DataSourceId="FuenteMonitoreo" Name="Monitoreo" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteMonitoreo" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_QUIROFANO_PARTE_ANESTESIA_DETALLE_MONITOREO_CARGAR" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="CIRUGIA_ID" QueryStringField="Cirugia_id" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteSignosVitales" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_QUIROFANO_PARTE_ANESTESIA_CONTROL_SIGNOS_VITALES_CARGAR" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="CIRUGIA_ID" QueryStringField="Cirugia_id" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteParte" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Quirofano_Parte_Anestesia_Cargar" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DefaultValue="" Name="Cirugia_Id" 
                    QueryStringField="Cirugia_id" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteEncabezado" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_QUIROFANO_PARTE_ANESTESIA_CAB1" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DefaultValue="" Name="Cirugia_Id" 
                    QueryStringField="Cirugia_id" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
    </div>
    <%Crearpdf(); %>
    </form>
</body>
</html>
