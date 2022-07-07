<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ControlStock.aspx.cs" Inherits="Impresion_ControlStock" %>

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

    <div>
    
        <asp:TextBox ID="TextBox1" runat="server" Visible="False"></asp:TextBox>
        <asp:TextBox ID="TextBox2" runat="server" Visible="False"></asp:TextBox>
        <br />
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\ControlStock.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteControl" Name="Control" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="DataSet1" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="FuenteControl" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Farmacia_Control_de_Stock" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:ControlParameter ControlID="TextBox1" Name="Nombre" PropertyName="Text" 
                    Type="String" />
                <asp:ControlParameter ControlID="TextBox2" Name="idpresentacion" 
                    PropertyName="Text" Type="Int32" />
                <asp:QueryStringParameter Name="Todos" QueryStringField="Todos" 
                    Type="Boolean" />
            </SelectParameters>
        </asp:SqlDataSource>
         <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
    
    </div>
    <% pdf_Click(null,null);%>
    </form>
</body>
</html>
