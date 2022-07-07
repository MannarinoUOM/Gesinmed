﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listados_Cantidad_De_Consultas_De_Guardia_X_Seccional_Obra_Social.aspx.cs" Inherits="Impresiones_Listados_Cantidad_De_Consultas_De_Guardia_X_Seccional_Obra_Social" %>

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

    <div style="width: 1185px; height: 365px">
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Height="100%" 
            style="margin-right: 5px" Width="100%">
            <LocalReport ReportPath="Impresiones\Listados_Cantidad_De_Consultas_De_Guardia_X_Seccional_Obra_Social.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource2" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="SqlDataSource2" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Listados_Cantidad_De_Pacientes_De_Guardia" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="DESDE" QueryStringField="desde" Type="String" />
                <asp:QueryStringParameter Name="HASTA" QueryStringField="hasta" Type="String" />
                <asp:QueryStringParameter Name="especialidad" QueryStringField="especialidad" 
                    Type="String" />
                <asp:QueryStringParameter Name="seccional" QueryStringField="seccional" 
                    Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
    </div>
    </form>
      <%if (Request.QueryString["PDF"] == "1") pdf(); %>
</body>
</html>