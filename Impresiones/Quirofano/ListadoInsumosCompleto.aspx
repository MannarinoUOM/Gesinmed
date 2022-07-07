﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListadoInsumosCompleto.aspx.cs" Inherits="Impresiones_Quirofano_ListadoInsumosCompleto" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

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
        <br />
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <localreport reportpath="Impresiones\Quirofano\ListadoInsumosCompleto.rdlc">
                <datasources>
                    <rsweb:ReportDataSource DataSourceId="ProtesisCAB" Name="INSUMOS" />
                </datasources>
            </localreport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="ProtesisCAB" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_QUIROFANO_INSUMO_EXTRA_LISTAR_DETALLE" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="INSUMOID" 
                    QueryStringField="INSUMOID" Type="Int64" />
                <asp:QueryStringParameter Name="SERVICIOID" QueryStringField="SERVICIOID" 
                    Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>        
    
    </div>
    </form>

    <%pdf_Click(); %>
</body>
</html>
