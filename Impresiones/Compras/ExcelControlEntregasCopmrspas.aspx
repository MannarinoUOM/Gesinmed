<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ExcelControlEntregasCopmrspas.aspx.cs" Inherits="Impresiones_Compras_ExcelControlEntregasCopmrspas" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
         <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>

        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" 
             Font-Size="8pt" InteractiveDeviceInfos="(Collection)" 
             WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
            <LocalReport ReportPath="Impresiones\Compras\ExcelControlEntregasCopmrspas.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Datos" Name="Datos" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
    
         <asp:SqlDataSource ID="Datos" runat="server" 
             ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
             SelectCommand="H2_COMPRAS_INFORME_GLOBAL_LIST" 
             SelectCommandType="StoredProcedure">
             <SelectParameters>
                 <asp:QueryStringParameter DbType="Date" Name="FechaRemito_Desde" 
                     QueryStringField="FechaRemito_Desde" />
                 <asp:QueryStringParameter DbType="Date" Name="FechaRemito_Hasta" 
                     QueryStringField="FechaRemito_Hasta" />
                 <asp:QueryStringParameter Name="Nro_Remito_Desde" 
                     QueryStringField="Nro_Remito_Desde" Type="Int64" />
                 <asp:QueryStringParameter Name="Nro_Remito_Hasta" 
                     QueryStringField="Nro_Remito_Hasta" Type="Int64" />
                 <asp:QueryStringParameter DefaultValue=" " Name="Insumo" 
                     QueryStringField="Nom_Insumo" Type="String" />
                 <asp:QueryStringParameter Name="NroPedido_Desde" 
                     QueryStringField="NroPedido_Desde" Type="Int64" />
                 <asp:QueryStringParameter Name="NroPedido_Hasta" 
                     QueryStringField="NroPedido_Hasta" Type="Int64" />
                 <asp:QueryStringParameter Name="Pendientes" QueryStringField="Pendientes" 
                     Type="Boolean" />
                 <asp:QueryStringParameter Name="Entregados" QueryStringField="Entregados" 
                     Type="Boolean" />
                 <asp:QueryStringParameter DefaultValue=" " Name="Paciente" 
                     QueryStringField="Paciente" Type="String" />
                 <asp:QueryStringParameter Name="Seccional" QueryStringField="Seccional" 
                     Type="Int32" />
                 <asp:QueryStringParameter Name="Deposito" QueryStringField="Deposito" 
                     Type="Int32" />
             </SelectParameters>
         </asp:SqlDataSource>
    
    </div>
    </form>
</body>
</html>
