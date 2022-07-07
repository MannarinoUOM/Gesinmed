<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionListar_por_Fechas_Egresos.aspx.cs" Inherits="Impresiones_ImpresionListar_por_Fechas_Egresos" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div>
    
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" 
            Font-Names="Verdana" Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\ImpresionListar_por_Fechas_Egresos.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Listado" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="Listado" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Internacion_ListadoporFechas_Egresos" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DbType="Date" Name="FInicio" 
                    QueryStringField="FInicio" />
                <asp:QueryStringParameter DbType="Date" DefaultValue="" Name="FFin" 
                    QueryStringField="FFin" />
                <asp:QueryStringParameter DefaultValue="" Name="Seccionales" 
                    QueryStringField="Seccionales" Type="String" />
                <asp:QueryStringParameter Name="OS" QueryStringField="OS" Type="String" />
                <asp:QueryStringParameter Name="TodasSeccionales" 
                    QueryStringField="TodasSeccionales" Type="Boolean" />
                <asp:QueryStringParameter Name="TodasOS" QueryStringField="TodasOS" 
                    Type="Boolean" />
            </SelectParameters>
        </asp:SqlDataSource>
    <%pdf_Click(null,null); %>
    </div>
    </form>
</body>
</html>

