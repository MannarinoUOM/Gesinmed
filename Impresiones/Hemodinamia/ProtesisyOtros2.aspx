﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ProtesisyOtros2.aspx.cs" Inherits="Impresion_ProtesisyOtros2" %>

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
            <LocalReport ReportPath="Impresiones\Quirofano\Protesisyotros.rdlc" 
                EnableExternalImages="true">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="ProtesisCAB" 
                        Name="Protesis_y_Otros_CAB" />
                    <rsweb:ReportDataSource DataSourceId="FuenteProtesis" Name="PyO" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="ProtesisCAB" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Hemodinamia_Impresion_Protesis_y_Otros" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DefaultValue="" Name="Cirugia_id" 
                    QueryStringField="Id" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteProtesis" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Hemodinamia_ProtesisyOtros_Impresion_Det" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="CirugiaID" QueryStringField="Id" Type="Int64" 
                    DefaultValue="" />
            </SelectParameters>
        </asp:SqlDataSource>
    
    </div>
    </form>

    <%pdf_Click(); %>

</body>
</html>
