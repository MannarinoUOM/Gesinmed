<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Compras_RemitoProveedores_Internacion.aspx.cs" Inherits="Impresiones_Compras_Compras_RemitoProveedores_Internacion" %>

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
                WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\Compras\Compras_RemitoProveedores_Internacion.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDetalle" Name="DataSet2" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet3" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCabecera" Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDetalleADM" Name="DataSet4" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

            <asp:SqlDataSource ID="FuenteDetalleADM" runat="server" 
                ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
                SelectCommand="H2_COMPRAS_REMITO_PRINT_DET_ADM" 
                SelectCommandType="StoredProcedure">
                <SelectParameters>
                    <asp:QueryStringParameter Name="RemitoId" QueryStringField="RemitoId" 
                        Type="Int32" />
                </SelectParameters>
            </asp:SqlDataSource>

            <asp:SqlDataSource ID="FuenteCentro" runat="server" 
                ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
                SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
            </asp:SqlDataSource>
            <asp:SqlDataSource ID="FuenteDetalle" runat="server" 
                ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
                SelectCommand="H2_COMPRAS_REMITO_PRINT_DET_INTERNACION" 
                SelectCommandType="StoredProcedure">
                <SelectParameters>
                    <asp:QueryStringParameter DefaultValue="" Name="RemitoId" QueryStringField="Id" 
                        Type="Int32" />
                </SelectParameters>
            </asp:SqlDataSource>
            <asp:SqlDataSource ID="FuenteCabecera" runat="server" 
                ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
                SelectCommand="H2_COMPRAS_REMITO_PRINT_CAB_INTERNACION" 
                SelectCommandType="StoredProcedure">
                <SelectParameters>
                    <asp:QueryStringParameter DefaultValue="" Name="RemitoId" QueryStringField="Id" 
                        Type="Int32" />
                </SelectParameters>
            </asp:SqlDataSource>

    </div>
        <%PDF(); %>
    </form>
</body>
</html>
