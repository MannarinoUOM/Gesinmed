<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Impresion_Pase_Guardia_UTI.aspx.cs" Inherits="Impresiones_Impresion_Pase_Guardia_UTI" %>

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
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="100%" 
            Font-Names="Verdana" Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\Impresion_Pase_Guardia_UTI.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDatos" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
    </div>
    <asp:SqlDataSource ID="FuenteDatos" runat="server" 
        ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
        SelectCommand="H2_GUARDIA_PASE_GUARDIA_UTI_IMPRIMIR" 
        SelectCommandType="StoredProcedure">
        <SelectParameters>
            <asp:QueryStringParameter Name="Pase_Guardia_UTI_Id" QueryStringField="Id" 
                Type="Int64" />
        </SelectParameters>
    </asp:SqlDataSource>
    </form>
    <%Crearpdf(); %>
</body>
</html>
