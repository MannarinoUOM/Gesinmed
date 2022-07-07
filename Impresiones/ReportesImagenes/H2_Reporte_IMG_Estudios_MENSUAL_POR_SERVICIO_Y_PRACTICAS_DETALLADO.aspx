﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="H2_Reporte_IMG_Estudios_MENSUAL_POR_SERVICIO_Y_PRACTICAS_DETALLADO.aspx.cs" Inherits="Impresiones_ReportesImagenes_H2_Reporte_IMG_Estudios_MENSUAL_POR_SERVICIO_Y_PRACTICAS_DETALLADO" %>

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
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\ReportesImagenes\H2_Reporte_IMG_Estudios_MENSUAL_POR_SERVICIO_Y_PRACTICAS_DETALLADO.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Datos" Name="Datos" />
                    <rsweb:ReportDataSource DataSourceId="Centro" Name="Centro" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="Centro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="Datos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Reporte_IMG_Estudios_MENSUAL_POR_SERVICIO_Y_PRACTICAS_DETALLADO" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="desde" QueryStringField="desde" Type="String" />
                <asp:QueryStringParameter Name="hasta" QueryStringField="hasta" Type="String" />
                <asp:QueryStringParameter Name="especialidadId" 
                    QueryStringField="especialidadId" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    </form>
         <%if (Request.QueryString["PDF"] == "1") pdf(); %>
</body>
</html>
