﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReporteInternacionCABA.aspx.cs" Inherits="Impresiones_Compras_ReporteInternacionCABA" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
            <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
                Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
                WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\Compras\ReporteInternacionCABA.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

            <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
                ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
                SelectCommand="H2_Reporte_Compras_Internacion" 
                SelectCommandType="StoredProcedure">
                <SelectParameters>
                    <asp:QueryStringParameter DbType="Date" Name="Desde" QueryStringField="Desde" />
                    <asp:QueryStringParameter DbType="Date" Name="Hasta" QueryStringField="Hasta" />
                    <asp:QueryStringParameter Name="tipo" QueryStringField="Filtro" 
                        Type="Int32" />
                    <asp:QueryStringParameter Name="afiliado" QueryStringField="afiliado" 
                        Type="String" />
                </SelectParameters>
            </asp:SqlDataSource>

    </div>
     <%if (Request.QueryString["PDF"] == "1") PDF(); %>
    </form>
</body>
</html>
