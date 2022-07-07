﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listado_Control_Facturacion.aspx.cs" Inherits="Impresiones_Quirofano_Listado_Control_Facturacion" %>

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


        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%" Height="550px">
            <LocalReport ReportPath="Impresiones\Quirofano\Listado_Control_Facturacion.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Centro" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="Datos" Name="Datos" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>



        <asp:SqlDataSource ID="Datos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Listado_Control_Facturacion" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="desde" QueryStringField="desde" Type="String" />
                <asp:QueryStringParameter Name="hasta" QueryStringField="hasta" Type="String" />
                <asp:QueryStringParameter Name="tipo" QueryStringField="tipo" Type="Int32" />
                <asp:QueryStringParameter Name="prioridad" QueryStringField="prioridad" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="T" QueryStringField="T" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="Centro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>



    </div>
    </form>
</body>
</html>
    <%if (Request.QueryString["PDF"] == "1") pdf_Click(); %>