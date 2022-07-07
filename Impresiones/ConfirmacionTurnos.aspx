<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ConfirmacionTurnos.aspx.cs" Inherits="Impresion_ConfirmacionTurnos" %>

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

    <div runat="server" visible="false">
        <asp:TextBox ID="txtespecialidadId" runat="server"></asp:TextBox>
        <asp:TextBox ID="txtmedicoId" runat="server"></asp:TextBox>
        <asp:TextBox ID="txtdesde" runat="server"></asp:TextBox>
        <asp:TextBox ID="txthasta" runat="server"></asp:TextBox>
        <asp:TextBox ID="txthoradesdemilitar" runat="server"></asp:TextBox>
        <asp:TextBox ID="txthorahastamilitar" runat="server"></asp:TextBox>
        <asp:TextBox ID="txtLibres" runat="server"></asp:TextBox>
        <asp:TextBox ID="txtTitulo" runat="server"></asp:TextBox>
        
    </div>
    <div>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
            Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\ConfirmacionTurnos.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="FuenteEncabezado" Name="Encabezado" />
                    <rsweb:ReportDataSource DataSourceId="fuenteDatos" Name="CancelacionTurnos" />
                    <rsweb:ReportDataSource DataSourceId="FuenteCentro" Name="DataSet3" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>

        <asp:SqlDataSource ID="fuenteDatos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turno_SearchHasta" SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:ControlParameter ControlID="txtmedicoId" Name="MedicoId" 
                    PropertyName="Text" Type="Int32" />
                <asp:ControlParameter ControlID="txtespecialidadId" Name="EspecialidadId" 
                    PropertyName="Text" Type="Int32" />
                <asp:ControlParameter ControlID="txtdesde" Name="FechaDesde" 
                    PropertyName="Text" Type="DateTime" />
                <asp:ControlParameter ControlID="txthasta" Name="FechaHasta" 
                    PropertyName="Text" Type="DateTime" />
                <asp:ControlParameter ControlID="txthoradesdemilitar" Name="HoraDesde" 
                    PropertyName="Text" Type="Int32" />
                <asp:ControlParameter ControlID="txthorahastamilitar" Name="HoraHasta" 
                    PropertyName="Text" Type="Int32" />
                
                <asp:Parameter DefaultValue="true" Name="Reservados" Type="Boolean" />
                
                <asp:QueryStringParameter Name="Libres" 
                    QueryStringField="Libres" Type="Boolean" />
                
                <asp:Parameter DefaultValue="-1" Name="Dia" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteEncabezado" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Encabezados_Confirmacion_Atencion" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:ControlParameter ControlID="txtTitulo" Name="Titulo" PropertyName="Text" 
                    Type="String" />
                <asp:ControlParameter ControlID="txtdesde" Name="FechaDesde" 
                    PropertyName="Text" Type="String" />
                <asp:ControlParameter ControlID="txthasta" Name="FechaHasta" 
                    PropertyName="Text" Type="String" />
                <asp:ControlParameter ControlID="txtespecialidadId" Name="Espacialidadid" 
                    PropertyName="Text" Type="Int32" />
                <asp:ControlParameter ControlID="txtmedicoId" Name="Medicoid" 
                    PropertyName="Text" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="FuenteCentro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
    </div>
    </form>
    <%PDF(); %>
</body>
</html>
