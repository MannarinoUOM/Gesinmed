<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listado_Diabetes_Examenes_Complementarios.aspx.cs" Inherits="Impresiones_ImpresionDiabeticaListados2" %>

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
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\Listado_Diabetes_Examenes_Complementarios.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Centro" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="Datos" Name="Datos" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

           <asp:SqlDataSource ID="Datos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Listado_Diabetes_Examenes_Complementarios" 
            SelectCommandType="StoredProcedure">
               <SelectParameters>
                   <asp:QueryStringParameter Name="desde" QueryStringField="desde" Type="String" />
                   <asp:QueryStringParameter Name="hasta" QueryStringField="hasta" Type="String" />
                   <asp:QueryStringParameter Name="tipo" QueryStringField="tipo" Type="Int32" />
               </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="Centro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>

           <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>

           <asp:SqlDataSource ID="FuenteDiabetes" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_AtConsultorio_Diabetes_Listados_Filtro_2" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="tipo" QueryStringField="tipo" Type="string" />
                <asp:QueryStringParameter Name="filtro" QueryStringField="filtro" Type="string" />
                <asp:QueryStringParameter Name="desde" QueryStringField="desde" 
                    Type="DateTime" />
                <asp:QueryStringParameter Name="hasta" QueryStringField="hasta" 
                    Type="DateTime" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    </form>
          <%if (Request.QueryString["PDF"] == "1") pdf(); %>
</body>
</html>
