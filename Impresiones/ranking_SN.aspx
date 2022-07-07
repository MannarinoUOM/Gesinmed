<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ranking_SN.aspx.cs" Inherits="Impresiones_ranking_SN" %>

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
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\ranking_SN.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="datos" Name="datos" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

        <asp:SqlDataSource ID="datos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:SN %>" 
            SelectCommand="H2_INFORMES_RANKING_PRAC_POR_OS_FEC_TEST" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DbType="Date" Name="Desde" QueryStringField="desde" />
                <asp:QueryStringParameter DbType="Date" Name="Hasta" QueryStringField="hasta" />
                <asp:QueryStringParameter Name="OS" QueryStringField="os" Type="Int64" />
                <asp:QueryStringParameter Name="cantidad" QueryStringField="cantidad" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="ordena" QueryStringField="ordena" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="orden" QueryStringField="orden" Type="String" />
                <asp:QueryStringParameter Name="incluirOS" QueryStringField="incluiros" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="obrasSociales" QueryStringField="obrassociales" 
                    Type="String" />
                <asp:QueryStringParameter Name="incluirPractica" 
                    QueryStringField="incluirpractica" Type="Int32" />
                <asp:QueryStringParameter Name="practicas" QueryStringField="practicas" 
                    Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>

    </div>
    </form>
     <%if (Request.QueryString["PDF"] == "1") pdf(); %>
</body>
</html>
