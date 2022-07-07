<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionGuardiaHistorial.aspx.cs" Inherits="Impresion_ImpresionGuardiaHistorial" %>

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
            <LocalReport ReportPath="Impresiones\HistorialGuardia.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteHistorialGuardia" 
                        Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet2" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

        <asp:SqlDataSource ID="FuenteHistorialGuardia" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Guardia_Historial_List" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Fecha1" QueryStringField="Desde" 
                    Type="DateTime" />
                <asp:QueryStringParameter Name="Fecha2" QueryStringField="Hasta" 
                    Type="DateTime" />
                <asp:QueryStringParameter Name="MedicoId" QueryStringField="Medico" DefaultValue="0" 
                    Type="Int32" />
                <asp:QueryStringParameter DefaultValue=" " Name="NHC" QueryStringField="NHC" 
                    Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>

    </div>
    </form>

        <%Crearpdf(); %>

</body>
</html>
