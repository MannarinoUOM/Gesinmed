<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Quirofano_Datos_Internacion.aspx.cs" Inherits="Impresiones_Quirofano_Datos_Internacion" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

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
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\Quirofano_Datos_Internacion.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteCabecera" 
                        Name="Datos_Quirurgico_Cabecera" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDetalle" 
                        Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteCabecera" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Quirofano_impresion_Datos_intervencion" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DefaultValue="0" Name="Cirugia_id" 
                    QueryStringField="Cirugia_id" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteDetalle" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Quirofano_impresion_Datos_intervencion_items_totales" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DefaultValue="0" Name="Cirugia_id" 
                    QueryStringField="Cirugia_id" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    <%Crearpdf(); %>
    </form>
</body>
</html>

