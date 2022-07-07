<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionAtConsultorioHistorial.aspx.cs" Inherits="Impresiones_ImpresionAtConsultorioHistorial" %>

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
    
        <asp:TextBox ID="txtFecha1" runat="server" Visible="False">01/06/2010</asp:TextBox>
        <asp:TextBox ID="txtFecha2" runat="server" Visible="False">01/06/2012</asp:TextBox>
        <asp:TextBox ID="txtMedicoId" runat="server" Visible="False">0</asp:TextBox>
        <asp:TextBox ID="txtNHC" runat="server" Visible="False">-</asp:TextBox>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\HistorialAtConsultoio.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteHistorialGuardia" 
                        Name="HistorialGuardia" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

        <asp:SqlDataSource ID="FuenteHistorialGuardia" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_AtConsultorio_Historial_Lista" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:ControlParameter ControlID="txtFecha1" Name="Fecha1" PropertyName="Text" 
                    Type="DateTime" />
                <asp:ControlParameter ControlID="txtFecha2" Name="Fecha2" PropertyName="Text" 
                    Type="DateTime" />
                <asp:ControlParameter ControlID="txtMedicoId" Name="MedicoId" 
                    PropertyName="Text" Type="Int32" />
                <asp:ControlParameter ControlID="txtNHC" Name="NHC" PropertyName="Text" 
                    Type="String" DefaultValue="-" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    </form>

        <%Crearpdf(); %>

</body>
</html>
