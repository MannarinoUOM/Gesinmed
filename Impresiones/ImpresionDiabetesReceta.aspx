<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionDiabetesReceta.aspx.cs" Inherits="Impresiones_ImpresionDiabetesReceta" %>

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
            <LocalReport ReportPath="Impresiones\ImpresionDiabetesReceta.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource4" 
                        Name="ImpresionReceta" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
  
        <asp:SqlDataSource ID="SqlDataSource4" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_AtConsultorio_Diabetes_Imprimir_Receta" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="idReceta" QueryStringField="idReceta" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource3" runat="server"></asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource2" runat="server"></asp:SqlDataSource>
  
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_AtConsultorio_Diabetes_Imprimir_Receta" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="idReceta" 
                    QueryStringField="idReceta" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>

        <rsweb:ReportViewer ID="ReportViewer2" runat="server">
        </rsweb:ReportViewer>


    </div>
    </form>
     <%pdf(); %>
</body>
</html>
