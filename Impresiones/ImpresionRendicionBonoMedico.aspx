<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionRendicionBonoMedico.aspx.cs" Inherits="Impresiones_ImpresionRendicionBonoMedico" %>

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
            <LocalReport ReportPath="Impresiones\ImpresionRendicionBonoMedico.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteRendicionBono" 
                        Name="DataSet1" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="Centro" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

        <asp:SqlDataSource ID="FuenteRendicionBono" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Bono_RendicionImprimir_Medicos" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Fecha" QueryStringField="Fecha" 
                    Type="DateTime" DefaultValue="01/01/1990" />
                <asp:QueryStringParameter DefaultValue="0" Name="Usuario" QueryStringField="U" 
                    Type="Int32" />
                <asp:QueryStringParameter DefaultValue="" Name="Medico" QueryStringField="Medico" 
                    Type="Int32" />
                <asp:QueryStringParameter DefaultValue="" Name="Tipo" QueryStringField="Tipo" 
                    Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
                        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>

        
    </div>
    </form>
    <%PDF(); %>
</body>
</html>