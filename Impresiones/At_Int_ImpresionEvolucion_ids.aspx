<%@ Page Language="C#" AutoEventWireup="true" CodeFile="At_Int_ImpresionEvolucion_ids.aspx.cs" Inherits="Impresiones_At_Int_ImpresionEvolucion_ids" %>

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
            <LocalReport ReportPath="Impresiones\At_Int_ImpresionEvolucion_ids.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Fuente_Centro" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="FuenteEvolucion" Name="Evolucion" />
                    <rsweb:ReportDataSource DataSourceId="firma" Name="firma" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
    
        <asp:SqlDataSource ID="firma" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Traer_Firma_medico" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="medicoId" QueryStringField="MedicoId" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
    
        <asp:SqlDataSource ID="FuenteEvolucion" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_AtInternados_Impresion_Evolucion" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Id" QueryStringField="Ids" Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
    
        <asp:SqlDataSource ID="Fuente_Centro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
    
    </div>
    <%pdf(); %>
    </form>
</body>
</html>
