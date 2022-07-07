<%@ Page Language="C#" AutoEventWireup="true" CodeFile="OrdenCompra_Internacion.aspx.cs" Inherits="Impresiones_Compras_OrdenCompra_Internacion" %>

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
            Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\Compras\OrdenCompra_Internacion.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource3" Name="DataSet3" />
                    <rsweb:ReportDataSource DataSourceId="ruta" Name="ruta" />
                    <rsweb:ReportDataSource DataSourceId="cirugia" Name="Cirugia" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>


        <asp:SqlDataSource ID="cirugia" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_COM_ORDEN_IMPRESION_DATOS_INTERNACION" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter DefaultValue="" Name="OrdenCompId" 
                    QueryStringField="ORD_CAB_ID" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="ruta" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_COM_RUTA_IMG_INTERNACION" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="idOrdenCompra" QueryStringField="ORD_CAB_ID" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource3" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_COM_ORDEN_CAB_LIST_INTERNACION" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="ORD_CAB_ID" QueryStringField="ORD_CAB_ID" 
                    Type="Int64" />
                <asp:Parameter DbType="Date" DefaultValue="01/01/1900" 
                    Name="ORD_CAB_FECHA_DESDE" />
                <asp:Parameter DbType="Date" DefaultValue="01/01/1900" 
                    Name="ORD_CAB_FECHA_HASTA" />
                <asp:Parameter DefaultValue="0" Name="ORD_CAB_PRV_ID" Type="Int64" />
                <asp:Parameter DefaultValue="1" Name="TIPO" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>


    </div>
       <%PDF(); %>
    </form>
</body>
</html>
