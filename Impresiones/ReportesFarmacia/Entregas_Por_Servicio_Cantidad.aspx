<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Entregas_Por_Servicio_Cantidad.aspx.cs" Inherits="Impresiones_ReportesFarmacia_Entregas_Por_Servicio_Cantidad" %>

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
            <LocalReport ReportPath="Impresiones\ReportesFarmacia\Entregas_Por_Servicio_Cantidad.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Centro" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="Datos" Name="Datos" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

        <asp:SqlDataSource ID="Datos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Entregas_Por_Servicio_Cantidad" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DbType="Date" Name="Desde" QueryStringField="desde" />
                <asp:QueryStringParameter DbType="Date" Name="Hasta" QueryStringField="hasta" />
                <asp:QueryStringParameter Name="ServicioId" QueryStringField="servicio" 
                    Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="Centro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>

    </div>
    </form>
    <%if (Request.QueryString["PDF"] == "1") pdf(); %>
</body>
</html>
