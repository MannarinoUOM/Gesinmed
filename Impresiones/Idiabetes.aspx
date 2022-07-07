<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Idiabetes.aspx.cs" Inherits="Impresiones_Idiabetes" %>

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
            <LocalReport ReportPath="Impresiones\Idiabetes.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteDiabetes" 
                        Name="Idiabetes" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="centro" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

           <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
              ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
              SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
          </asp:SqlDataSource>

           <asp:SqlDataSource ID="FuenteDiabetes" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_AtConsultorio_Diabetes_Imprimir" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="ID" QueryStringField="ID" Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>

    </div>
    </form>
     <%pdf(); %>
</body>
</html>
