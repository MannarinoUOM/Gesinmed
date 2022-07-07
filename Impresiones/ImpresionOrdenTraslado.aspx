﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionOrdenTraslado.aspx.cs" Inherits="Impresiones_ImpresionOrdenTraslado" %>

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
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\OrdendeTraslado.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteTraslado" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet3" />
                    <rsweb:ReportDataSource DataSourceId="firma" Name="firma" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteTraslado" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_AtConsultorio_Impresion_OrdenesTraslado" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="ID" QueryStringField="ID" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    <%PDF(); %>
    </form>
</body>
</html>
