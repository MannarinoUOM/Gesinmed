<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BonoResumenporSeccional.aspx.cs" Inherits="Impresion_BonoResumenporSeccional" %>

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
    
    </div>

    <div>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\BonoResumenporSeccional.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="fuentePracticas" Name="Practicas" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="fuentePracticas" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Bono_Rendicion_Seccional" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Seccional" QueryStringField="Sl" Type="Int32" />
                <asp:QueryStringParameter DbType="Date" Name="FechaInicio" 
                    QueryStringField="Fi" />
                <asp:QueryStringParameter DbType="Date" Name="FechaFin" QueryStringField="Ff" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>

    </form>
    <%pdf_Click(null, null); %>
</body>
</html>
