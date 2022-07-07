<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionBono.aspx.cs" Inherits="Impresiones_ImpresionBono" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <asp:TextBox ID="txtId" runat="server">1</asp:TextBox>
    <asp:TextBox ID="txtFecha" runat="server">26/07/2012</asp:TextBox>

    <div>
    
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\Bono.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteBono" Name="Practicas" />
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
    
        <asp:SqlDataSource ID="FuenteBono" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            
            
            
            SelectCommand="SELECT        BonoPractica.Fecha, BonoPractica.BonoId, BonoPractica.PracticaId, BonoPractica.Importe, BonoPractica.ImporteReal, BonoPractica.GeneralId, 
                         Practica.Descripcion AS Practica, Practica.Codigo
FROM            BonoPractica INNER JOIN
                         Practica ON BonoPractica.PracticaId = Practica.Id
WHERE        (CONVERT(char(10), BonoPractica.Fecha, 103) = @Fecha) AND (BonoPractica.BonoId = @Id)">
            <SelectParameters>
                <asp:ControlParameter ControlID="txtFecha" Name="Fecha" PropertyName="Text" 
                    Type="DateTime" />
                <asp:ControlParameter ControlID="txtId" Name="Id" PropertyName="Text" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    
    </div>
    </form>
    <%pdf_Click(); %>
</body>
</html>
