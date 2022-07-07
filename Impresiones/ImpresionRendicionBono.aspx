<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionRendicionBono.aspx.cs" Inherits="Impresiones_ImpresionRendicionBono" %>

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
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\RendicionBono.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteRendicionBono" 
                        Name="Impresion_Rendicion_Bono" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="Remitos" Name="Remitos" />
                    <rsweb:ReportDataSource DataSourceId="Resumen" Name="Resumen" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="Resumen" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Bono_RendicionImprimir_Resumen_Recibos" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Fecha" QueryStringField="Fecha" 
                    Type="DateTime" />
                <asp:QueryStringParameter DefaultValue="1" Name="NroBonoDesde" 
                    QueryStringField="Desde" Type="Int32" />
                <asp:QueryStringParameter DefaultValue="1000" Name="NroBonoHasta" 
                    QueryStringField="Hasta" Type="Int32" />
                <asp:QueryStringParameter Name="Usuario" QueryStringField="U" Type="Int32" />
                <asp:QueryStringParameter Name="Terminal" QueryStringField="Terminal" 
                    Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="Remitos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Pagos_Parciales_y_de_Deuda_Anterior" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="USUARIO" QueryStringField="U" Type="Int32" />
                <asp:QueryStringParameter Name="FECHA" QueryStringField="Fecha" Type="String" />
                <asp:QueryStringParameter Name="TERMINAL" QueryStringField="Terminal" 
                    Type="String" />
                <asp:QueryStringParameter Name="ORDEN" QueryStringField="Orden" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="Totales" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_calcular_totales_recibo_bonos" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="usuario" QueryStringField="U" Type="Int32" />
                <asp:QueryStringParameter Name="fecha" QueryStringField="Fecha" Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteRendicionBono" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Bono_RendicionImprimir" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Fecha" QueryStringField="Fecha" 
                    Type="DateTime" DefaultValue="01/01/1990" />
                <asp:QueryStringParameter DefaultValue="1" Name="NroBonoDesde" 
                    QueryStringField="Desde" Type="Int32" />
                <asp:QueryStringParameter DefaultValue="1000" Name="NroBonoHasta" 
                    QueryStringField="Hasta" Type="Int32" />
                <asp:QueryStringParameter DefaultValue="0" Name="Usuario" QueryStringField="U" 
                    Type="Int32" />
                <asp:QueryStringParameter DefaultValue="" Name="Terminal" 
                    QueryStringField="Terminal" Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
                <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
    </div>
    </form>
    <%if (Request.QueryString["PDF"] == "1") PDF(); %>
</body>
</html>
