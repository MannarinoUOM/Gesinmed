<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Endoscopia_Turnos_Planilla.aspx.cs" Inherits="Impresiones_Endoscopia_Turnos_Planilla" %>

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
        <asp:TextBox ID="txtFecha" runat="server"></asp:TextBox>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\Endoscopia_Turnos_Planilla.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteQuirofano" Name="Quirofano" />
                    <rsweb:ReportDataSource DataSourceId="FuenteTarde" Name="TurnoTarde" />
                    <rsweb:ReportDataSource DataSourceId="FuenteSinHora" Name="SinHora" />
                    <rsweb:ReportDataSource DataSourceId="CentroSQL" Name="Centro" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="CentroSQL" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteQuirofano" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Endoscopia_Lista_Imprimir" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:Parameter DefaultValue="0" Name="id" Type="Int32" />
                <asp:ControlParameter ControlID="txtFecha" DbType="Date" DefaultValue="" 
                    Name="fecha" PropertyName="Text" />
                <asp:Parameter DefaultValue="False" Name="dadodebaja" Type="Boolean" />
                <asp:Parameter DefaultValue="1" Name="turno" Type="Int32" />
                <asp:QueryStringParameter DefaultValue="0" Name="cuales" 
                    QueryStringField="cuales" Type="Int32" />
                <asp:QueryStringParameter DefaultValue="" Name="Tipo" QueryStringField="Tipo" 
                    Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>

        <asp:SqlDataSource ID="FuenteTarde" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Endoscopia_Lista_Imprimir" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:Parameter DefaultValue="0" Name="id" Type="Int32" />
                <asp:ControlParameter ControlID="txtFecha" DbType="Date" DefaultValue="" 
                    Name="fecha" PropertyName="Text" />
                <asp:Parameter DefaultValue="False" Name="dadodebaja" Type="Boolean" />
                <asp:Parameter DefaultValue="2" Name="turno" Type="Int32" />
                <asp:QueryStringParameter DefaultValue="0" Name="cuales" 
                    QueryStringField="cuales" Type="Int32" />
                <asp:QueryStringParameter DefaultValue="" Name="Tipo" QueryStringField="Tipo" 
                    Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>

        <asp:SqlDataSource ID="FuenteSinHora" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Endoscopia_Lista_Imprimir" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:Parameter DefaultValue="0" Name="id" Type="Int32" />
                <asp:ControlParameter ControlID="txtFecha" DbType="Date" DefaultValue="" 
                    Name="fecha" PropertyName="Text" />
                <asp:Parameter DefaultValue="False" Name="dadodebaja" Type="Boolean" />
                <asp:Parameter DefaultValue="3" Name="turno" Type="Int32" />
                <asp:QueryStringParameter DefaultValue="0" Name="cuales" 
                    QueryStringField="cuales" Type="Int32" />
                <asp:QueryStringParameter DefaultValue="" Name="Tipo" QueryStringField="Tipo" 
                    Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    </form>
     <% if(Request.QueryString["PDF"] == "1")  Crearpdf(); %>
</body>
</html>
