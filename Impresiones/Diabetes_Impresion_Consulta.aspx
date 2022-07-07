<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Diabetes_Impresion_Consulta.aspx.cs" Inherits="Impresiones_Diabetes_Impresion_Consulta" %>

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
            <LocalReport ReportPath="Impresiones\Diabetes_Impresion_Consulta.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource1" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource2" 
                        Name="DiagnosticoYclinica" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource4" Name="Tratamiento" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource5" Name="Complicaciones" />
                    <rsweb:ReportDataSource DataSourceId="SqlDataSource6" 
                        Name="TratamientoResultados" />
                    <rsweb:ReportDataSource DataSourceId="Cabecera" 
                        Name="Cabecera" />
                    <rsweb:ReportDataSource DataSourceId="DiagnosticoYClinicaCabecera" 
                        Name="DiagnosticoYClinicaCabecera" />
                    <rsweb:ReportDataSource DataSourceId="Estudios" Name="Estudios" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="Estudios" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Diabetes_Mostrar_Estudios" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Diabetes_Gral_Id" QueryStringField="IdConsulta" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="DiagnosticoYClinicaCabecera" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Diabetes_Mostrar_Diagnostico_Y_Clinica_Cabecera" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Diabetes_Gral_Id" QueryStringField="IdConsulta" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="Cabecera" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Diabetes_Mostrar_Cabecera" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Diabetes_Gral_Id" QueryStringField="IdConsulta" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource7" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Diabetes_Mostrar_Cabecera" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Diabetes_Gral_Id" QueryStringField="IdConsulta" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource6" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Diabetes_Mostrar_Tratamiento_Resultados" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Diabetes_Gral_Id" QueryStringField="IdConsulta" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource5" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Diabetes_Mostrar_Complicaciones" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Diabetes_Gral_Id" QueryStringField="IdConsulta" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource4" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Diabetes_Mostrar_Tratamiento" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Diabetes_Gral_Id" QueryStringField="IdConsulta" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource2" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Diabetes_Mostrar_Diagnostico_Y_Clinica" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Diabetes_Gral_Id" QueryStringField="IdConsulta" 
                    Type="Int64" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
    </div>
    </form>
     <%--<%if (Request.QueryString["PDF"] == "1") pdf(); %>--%>
     <%pdf(); %>
</body>
</html>
