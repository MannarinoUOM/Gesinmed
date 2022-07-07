<%@ Page Language="C#" AutoEventWireup="true" CodeFile="IMG_Impresion_ListadoTurnos.aspx.cs" Inherits="Impresiones_Impresiones_IMG_IMG_Impresion_ListadoTurnos" %>

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
            Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\Impresiones_IMG\IMG_Impresion_ListadoTurnos.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Listadoturnos" Name="TurnoListado" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="Listadoturnos" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_IMG_TURNOS_AT_CONSULTORIO_LISTAR_HORARIO" 
            SelectCommandType="StoredProcedure">
            <SelectParameters>
                <asp:QueryStringParameter Name="Especialidad" QueryStringField="E" 
                    Type="Int32" />
                <asp:QueryStringParameter Name="Medico" QueryStringField="M" Type="Int32" />
                <asp:QueryStringParameter Name="DiaInicio" QueryStringField="DI" 
                    Type="String" />
                <asp:QueryStringParameter Name="DiaFin" QueryStringField="DF" Type="String" />
                <asp:QueryStringParameter Name="TipoOrden" QueryStringField="TO" Type="Int32" />
                <asp:QueryStringParameter Name="HNC" QueryStringField="NHC" Type="String" />
                <asp:QueryStringParameter Name="Paciente" QueryStringField="P" Type="String" />
                <asp:QueryStringParameter Name="Documento" QueryStringField="D" Type="String" />
                <asp:QueryStringParameter DefaultValue="00:00" Name="HoraInicio" 
                    QueryStringField="HI" Type="String" />
                <asp:QueryStringParameter DefaultValue="23:59" Name="HoraFin" 
                    QueryStringField="HF" Type="String" />
            </SelectParameters>
        </asp:SqlDataSource>
    </div>
    <%pdf(); %>
    </form>
</body>
</html>
