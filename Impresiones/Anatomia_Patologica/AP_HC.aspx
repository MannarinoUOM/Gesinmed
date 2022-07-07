<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AP_HC.aspx.cs" Inherits="Impresiones_Anatomia_Patologica_AP_HC" %>

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
            Font-Size="8pt" InteractiveDeviceInfos="(Colección)" 
            WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt">
            <LocalReport ReportPath="Impresiones\Anatomia_Patologica\AP_HC.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="Centro" Name="Centro" />
                    <rsweb:ReportDataSource DataSourceId="AnatomiaPatologica" 
                        Name="AnatomiaPatologica" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:SqlDataSource ID="AnatomiaPatologica" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" SelectCommand="SELECT 
[PAT_NUMERO]
,S.[hc_uom_central] as SOC_NRO_HC
,MED.APELLIDOYNOMBRE as MED_APELLIDO_NOMBRE
,E.DESCRIPCION 
,S.[APELLIDO] as SOC_APELLIDO_NOMBRES
,MAT.PMAT_DESCRIPCION
,PRO.PPRO_DESCRIPCION
,MET.PMET_DESCRIPCION
,[PAT_ESPECIALES]
,[PAT_MACRO]
,[PAT_MICRO]
,[PAT_DIAG]
,PDIA_DESCRIPCION
,[PAT_FECHA_SALIDA]
  FROM [Hospital].[dbo].[PATOLOGIA_ESTUDIO] as P 
  left join [Padron].[dbo].[Gente] as S on P.PAT_SOC_ID = S.[documento]
  left join [Hospital].[dbo].[Especialidad] as E on E.id = P.PAT_ESP_ID 
  left join [Hospital].[dbo].[Medico] as MED on MED.id = P.PAT_MED_ID
  left join [Hospital].[dbo].[PATOLOGIA_MATERIAL] as MAT on MAT.PMAT_ID = P.PAT_MAT_ID
  left join [Hospital].[dbo].[PATOLOGIA_PROCEDIMIENTO] as PRO on PRO.PPRO_ID = P.PAT_PRO_ID
  left join [Hospital].[dbo].[PATOLOGIA_METODOS] AS MET on MET.PMET_ID = P.PAT_MET_ID
  left join [Hospital].[dbo].[PATOLOGIA_DIAGNOSTICOS] as DIAG on DIAG.PDIA_ID = P.PAT_DIA_ID  
  where PAT_NUMERO = @PAT_NUMERO
  ">
            <SelectParameters>
                <asp:QueryStringParameter Name="PAT_NUMERO" QueryStringField="Protocolo" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:SqlDataSource ID="Centro" runat="server" 
            ConnectionString="<%$ ConnectionStrings:HospitalConnectionString %>" 
            SelectCommand="H2_Turnos_Centro_Unico" SelectCommandType="StoredProcedure">
        </asp:SqlDataSource>
    </div>

    <%Crearpdf();%>

    </form>
</body>
</html>
