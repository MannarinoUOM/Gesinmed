<%@ Page Language="C#" AutoEventWireup="true" CodeFile="IMG_Informe_Rapido.aspx.cs" Inherits="Impresiones_Impresiones_IMG_Informe_Rapido" %>

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
    <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
        Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
        WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
        <LocalReport ReportPath="Impresiones\Impresiones_IMG\IMG_Informe.rdlc">
            <DataSources>
                <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="Informe" />
                <rsweb:ReportDataSource DataSourceId="SqlDataSource2" Name="InfoCabecera" />
            </DataSources>
        </LocalReport>
    </rsweb:ReportViewer>
    <asp:SqlDataSource ID="SqlDataSource2" runat="server" 
        ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
        SelectCommand="H2_IMG_IMPRESION_INFORMERAPIDO_CABECERA" 
        SelectCommandType="StoredProcedure">
        <SelectParameters>
            <asp:QueryStringParameter Name="TurnoId" QueryStringField="TurnoId" 
                Type="Int64" />
        </SelectParameters>
    </asp:SqlDataSource>
    <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
        ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
        SelectCommand="H2_IMG_CARGARINFORME_RAPIDO" 
        SelectCommandType="StoredProcedure">
        <SelectParameters>
            <asp:QueryStringParameter Name="TURNO_PRACTICA_ID" 
                QueryStringField="TurnoId" Type="Int64" />
        </SelectParameters>
    </asp:SqlDataSource>
    <div>
    
    <%pdf(); %>

    </div>
    </form>
</body>
</html>
