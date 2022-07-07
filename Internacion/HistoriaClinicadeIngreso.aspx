<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HistoriaClinicadeIngreso.aspx.cs" Inherits="Internacion_HistoriaClinicadeIngreso" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .style1
        {
            width: 115px;
        }
        .style2
        {
            width: 73px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <div>HISTORIA CLINICA DE INGRESO Nº <asp:Label ID="lb_nhc" runat="server"></asp:Label></div>
    <div>APELLIDO Y NOMBRES <asp:Label ID="lb_ayn" runat="server" Width="400px"></asp:Label>EDAD: <asp:Label ID="lb_edad" runat="server"></asp:Label></div>
    <div>FECHA DE NACIMIENTO <asp:Label ID="lb_fn" runat="server" Width="200px"></asp:Label>DOCUMENTO DE IDENTIDAD: <asp:Label ID="lb_dni" runat="server"></asp:Label></div>
    <div>DOMICILIO <asp:Label ID="lb_domicilio" runat="server" Width="500px"></asp:Label>OBRA SOCIAL: <asp:Label ID="lb_OS" runat="server"></asp:Label></div>
    <div>FECHA DE INGRESO <asp:Label ID="lb_fi" runat="server" Width="200px"></asp:Label>HORA <asp:Label ID="lb_hora" runat="server" Width="200px"></asp:Label></div>
    <div>SERVICIO <asp:Label ID="lb_servicio" runat="server"></asp:Label></div>
    <div>SALA <asp:Label ID="lb_Sala" runat="server"></asp:Label> CAMA 
        <asp:Label ID="lb_Cama" runat="server"></asp:Label></div>
    <div>1- MOTIVO DE CONSULTA <br /> 
    <asp:TextBox ID="txt_motivoconsulta" Width="100%" runat="server" Height="100px" 
    TextMode="MultiLine"></asp:TextBox>
    </div>
    <br />
    <div>2- ENFERMEDAD ACTUAL <br /> 
    <asp:TextBox ID="txt_enfermedadactual" Width="100%" runat="server" Height="100px" 
    TextMode="MultiLine"></asp:TextBox>
    </div>


    <br />
    <div>3- ANTECEDENTES PATOLÓGICOS <br /> 
    <asp:TextBox ID="txt_antecedentespatologicos" Width="100%" runat="server" Height="100px" 
    TextMode="MultiLine"></asp:TextBox>
    </div>

    <table>
    <tr><td></td><td><label for="ck_Diabetes_Si">SI</label></td><td><label for="ck_Diabetes_No">NO</label></td><td></td><td></td><td><label for="ck_HTA_Si">SI</label></td><td><label for="ck_HTA_No">NO</label></td><td></td><td></td><td><label for="ck_Fumador_Si">SI</label></td><td><label for="ck_Fumador_No">NO</label></td><td></td><td></td><td>
        <label for="ck_EPOC_Si">SI</label></td><td><label for="ck_EPOC_No">NO</label></td><td></td><td></td><td><label for="ck_Etilismo_Si">SI</label></td><td><label for="ck_Etilismo_No">NO</label></td></tr>
    <tr><td>DIABETES:</td><td>
        <asp:RadioButton ID="ck_Diabetes_Si" runat="server" 
            GroupName="Diabetes" />
        </td><td>
            <asp:RadioButton GroupName="Diabetes" ID="ck_Diabetes_No" runat="server" />
        </td><td></td><td>HTA:</td><td><asp:RadioButton ID="ck_HTA_Si" runat="server" 
            GroupName="g_HTA" /></td><td><asp:RadioButton ID="ck_HTA_No" runat="server" 
            GroupName="g_HTA" /></td><td></td><td>FUMADOR</td><td><asp:RadioButton ID="ck_Fumador_Si" runat="server" 
            GroupName="g_Fumador" /></td><td><asp:RadioButton ID="ck_Fumador_No" runat="server" 
            GroupName="g_Fumador" /></td><td></td><td>
        EPOC</td><td><asp:RadioButton ID="ck_EPOC_Si" runat="server" 
            GroupName="g_EPOC" /></td><td><asp:RadioButton ID="ck_EPOC_No" runat="server" 
            GroupName="g_EPOC" /></td><td></td><td>ETILISMO</td><td><asp:RadioButton ID="ck_Etilismo_Si" runat="server" 
            GroupName="g_Etilismo" /></td><td><asp:RadioButton ID="ck_Etilismo_No" runat="server" 
            GroupName="g_Etilismo" /></td></tr>
    </table>

        <table>
    <tr><td></td><td><label for="ck_Disnea_Si">SI</label></td><td><label for="ck_Disnea_No">NO</label></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>
        </td><td></td><td></td><td></td></tr>
    <tr><td>DISNEA:</td><td><asp:RadioButton ID="ck_Disnea_Si" runat="server" 
            GroupName="g_Disnea" /></td><td><asp:RadioButton ID="ck_Disnea_No" runat="server" 
            GroupName="g_Disnea" /></td><td></td><td><label for="cb_Grado1">GRADO 1:</label></td><td>
        <asp:CheckBox ID="cb_Grado1" runat="server" />
        </td><td></td><td><label for="ck_Grado2">GRADO II:</label></td><td><asp:CheckBox ID="ck_Grado2" runat="server" /></td><td></td><td>
        <label for="ck_Grado3">GRADO III:</label></td><td><asp:CheckBox ID="ck_Grado3" runat="server" /></td><td></td><td><label for="ck_Reposo">REPOSO:</label></td><td>
        <asp:CheckBox ID="ck_Reposo" runat="server" /></td><td></td><td><label for="ck_DPN">DPN:</label></td><td>
        <asp:CheckBox ID="ck_DPN" runat="server" /></td><td></td><td><label for="ck_Optonea">ORTOPNEA:</label></td><td>
        <asp:CheckBox ID="ck_Optonea" runat="server" /></td><td></td></tr>
    </table>

    <table>
    <tr><td></td><td><label for="ck_Arrtimias_Si">SI</label></td><td><label for="ck_Arrtimias_No">NO</label></td><td></td><td></td><td>&nbsp;</td><td>&nbsp;</td><td></td><td></td></tr>
    <tr><td>ARRITMIAS:</td><td>
        <asp:RadioButton ID="ck_Arrtimias_Si" runat="server" GroupName="g_Arritmias" />
        </td><td>
            <asp:RadioButton ID="ck_Arrtimias_No" runat="server" GroupName="g_Arritmias"/>
        </td><td></td><td>CUAL:</td><td> 
            <asp:TextBox ID="txt_Cual" runat="server" Width="400px"></asp:TextBox> </td><td><label for="cb_Marcapasos">MARCAPASO:</label></td><td>
                <asp:CheckBox ID="cb_Marcapasos" runat="server" /></td><td>&nbsp;</td></tr>
    </table>

        <br />
    <div>EVENTOS CORONARIOS      <b>Especificar: </b> <br /> 
    <asp:TextBox ID="txt_eventoscoronarios" Width="100%" runat="server" Height="50px" 
    TextMode="MultiLine"></asp:TextBox>
    </div>
    <br />
      <table>    
    <tr><td>NEUROLÓGICOS:</td><td></td><td><label for="cb_NingunNeuro">NINGUNO:</label></td><td>
        <asp:CheckBox ID="cb_NingunNeuro" runat="server" /></td><td></td><td><label for="cb_AcvIsquemico">ACV 
        ISQUEMICO:</label></td><td>
        <asp:CheckBox ID="cb_AcvIsquemico" runat="server" /></td><td></td><td><label for="cb_AcvHemorragico">ACV HEMORRAGICO:</label></td><td>
        <asp:CheckBox ID="cb_AcvHemorragico" runat="server" /></td><td></td>
        <td><label for="cb_Convulsiones">CONVULSIONES:</label></td><td>
        <asp:CheckBox ID="cb_Convulsiones" runat="server" /></td><td></td>
        </tr>
    </table>

    <br />
        <table>
    <tr><td></td><td><label for="ck_Alergia_Medicamento_Si">SI</label></td><td><label for="ck_Alergia_Medicamento_No">NO</label></td><td></td><td></td><td>&nbsp;</td></tr>
    <tr><td>ALERGIAS A MEDICAMENTOS:</td><td>
        <asp:RadioButton ID="ck_Alergia_Medicamento_Si" runat="server" GroupName="g_Alergia_Medicamento" /></td><td>
        <asp:RadioButton ID="ck_Alergia_Medicamento_No" runat="server" GroupName="g_Alergia_Medicamento"/></td><td></td><td>CUALES:</td><td>
            <asp:TextBox ID="txt_CualesAlergiaMedicamentos" runat="server" Width="400px"></asp:TextBox></td></tr>
    </table>

    <br />
    <table>
    <tr><td></td><td></td><td><label for="ck_Conservada_Si">SI</label></td><td><label for="ck_Conservada_No">NO</label></td><td></td><td></td><td><label for="ck_Oliguria_Si">SI</label></td><td><label for="ck_Oliguria_No">NO</label></td><td></td><td></td><td><label for="ck_Poliuria_Si">SI</label></td><td><label for="ck_Poliuria_No">NO</label></td><td></td><td></td><td>
        <label for="ck_Anuria_Si">SI</label></td><td><label for="ck_Anuria_No">NO</label></td><td></td><td></td><td><label for="ck_Dialisis_Si">
        SI</label></td><td><label for="ck_Dialisis_No">NO</label></td></tr>
    <tr><td>DIURESIS:</td><td>CONSERVADA</td><td>
        <asp:RadioButton ID="ck_Conservada_Si" runat="server" GroupName="g_Conservada"/></td><td>
        <asp:RadioButton ID="ck_Conservada_No" runat="server" GroupName="g_Conservada"/></td><td></td><td>OLIGURIA:</td><td>
        <asp:RadioButton ID="ck_Oliguria_Si" runat="server"  GroupName="g_Oliguria" /></td><td>
        <asp:RadioButton ID="ck_Oliguria_No" runat="server"  GroupName="g_Oliguria" /></td><td></td><td>
        POLIURIA:</td><td>
        <asp:RadioButton ID="ck_Poliuria_Si" runat="server" GroupName="g_Poliuria"/></td><td>
        <asp:RadioButton ID="ck_Poliuria_No" runat="server" GroupName="g_Poliuria"/></td><td></td><td>
        ANURIA:</td><td>
        <asp:RadioButton ID="ck_Anuria_Si" runat="server" GroupName="g_Anuria"/></td><td>
        <asp:RadioButton ID="ck_Anuria_No" runat="server" GroupName="g_Anuria"/></td><td></td><td>DIALISIS:</td><td>
        <asp:RadioButton ID="ck_Dialisis_Si" runat="server" GroupName="g_Dialisis"/></td><td>
        <asp:RadioButton ID="ck_Dialisis_No" runat="server" GroupName="g_Dialisis"/></td></tr>
    </table>

    <br />
    <table>    
    <tr><td>CATARSIS:</td><td><label for="cb_Catarsis_Normal">NORMAL</label></td><td>
        <asp:CheckBox ID="cb_Catarsis_Normal" runat="server" /></td><td></td><td><label for="cb_Catarsis_Diarrea">DIARREA:</label></td><td>
        <asp:CheckBox ID="cb_Catarsis_Diarrea" runat="server" /></td><td></td><td><label for="cb_Catarsis_Constipacion">CONSTIPACIÓN:</label></td><td>
        <asp:CheckBox ID="cb_Catarsis_Constipacion" runat="server" /></td></tr>
    </table>

    <div>CIRUGIAS: <asp:TextBox ID="txt_cirugias" runat="server" Width="90%"></asp:TextBox></div>
    <div>TRAUMAS: <asp:TextBox ID="txt_traumas" runat="server" Width="90%"></asp:TextBox></div>
    <div>MEDICACIÓN ACTUAL: <br /><asp:TextBox ID="txt_medicacionactual" runat="server" 
            Height="50px" Width="100%"></asp:TextBox></div>
    <div>OTROS ANTECEDENTES: <br /><asp:TextBox ID="txt_otros_antecedentes" runat="server" 
            Height="100px" Width="100%"></asp:TextBox></div>

            <br />
    <div>4- EXAMEN FÍSICO <br /></div>

    <table>
    <tr><td><u>SENSORICO:</u></td><td><label for="cb_Sensorico_Lucido">LUCIDO:</label></td><td>
        <asp:CheckBox ID="cb_Sensorico_Lucido" runat="server" /></td><td></td><td><label for="cb_Sensorico_Vigil">VIGIL:</label></td><td>
        <asp:CheckBox ID="cb_Sensorico_Vigil" runat="server" /></td><td></td><td><label for="cb_Sensorico_Orientado">ORIENTADO:</label></td><td>
        <asp:CheckBox ID="cb_Sensorico_Orientado" runat="server" /></td><td></td><td><label for="cb_Sensorico_Desorientado">DESORIENTADO:</label></td><td>
        <asp:CheckBox ID="cb_Sensorico_Desorientado" runat="server" /></td><td></td><td><label for="cb_Sensorico_Somnoliento">SOMNOLIENTO:</label></td><td>
        <asp:CheckBox ID="cb_Sensorico_Somnoliento" runat="server" /></td><td></td><td><label for="cb_Sensorico_Excitado">EXCITADO:</label></td><td>
        <asp:CheckBox ID="cb_Sensorico_Excitado" runat="server" /></td><td></td></tr>
    </table>

    <table>
    <tr><td><u>ASPECTO GENERAL:</u></td><td><label for="cb_Aspecto_GravementeEnfermo">GRAVEMENTE ENFERMO:</label></td><td>
        <asp:CheckBox ID="cb_Aspecto_GravementeEnfermo" runat="server" /></td><td></td><td><label for="cb_Aspecto_Moderadamente">MODERADAMENTE ENFERMO:</label></td><td>
        <asp:CheckBox ID="cb_Aspecto_Moderadamente" runat="server" /></td><td></td><td><label for="cb_Aspecto_Levemente">LEVEMENTE ENFERMO:</label></td><td>
        <asp:CheckBox ID="cb_Aspecto_Levemente" runat="server" /></td><td></td></tr>
    </table>


    <table>
    <tr><td><u>PIEL:</u></td><td><label for="cb_Piel_Normal">NORMAL:</label></td><td>
        <asp:CheckBox ID="cb_Piel_Normal" runat="server" /></td><td></td><td><label for="cb_Piel_Caliente">CALIENTE:</label></td><td>
        <asp:CheckBox ID="cb_Piel_Caliente" runat="server" /></td><td></td>
    <td><label for="cb_Piel_Fria">FRIA:</label></td><td>
        <asp:CheckBox ID="cb_Piel_Fria" runat="server" /></td><td></td><td><label for="cb_Piel_Seca">SECA:</label></td><td>
        <asp:CheckBox ID="cb_Piel_Seca" runat="server" /></td><td></td><td><label for="cb_Piel_Sudorosa">SUDOROSA:</label></td><td>
        <asp:CheckBox ID="cb_Piel_Sudorosa" runat="server" /></td><td></td><td><label for="cb_Piel_Cianosis">CIANOSIS:</label></td><td>
        <asp:CheckBox ID="cb_Piel_Cianosis" runat="server" /></td><td></td><td><label for="cb_Piel_Livideces">LIVIDECES:</label></td><td>
        <asp:CheckBox ID="cb_Piel_Livideces" runat="server" /></td><td></td>
    <td><label for="cb_Piel_Palidez">PALIDEZ:</label></td><td>
        <asp:CheckBox ID="cb_Piel_Palidez" runat="server" /></td><td></td><td><label for="cb_Piel_Ictericia">ICTERICIA:</label></td><td>
        <asp:CheckBox ID="cb_Piel_Ictericia" runat="server" /></td><td></td><td><label for="cb_Piel_Pustulas">PUSTULAS:</label></td><td>
        <asp:CheckBox ID="cb_Piel_Pustulas" runat="server" /></td><td></td><td><label for="cb_Piel_flictenas">FLICTENAS:</label></td><td>
        <asp:CheckBox ID="cb_Piel_flictenas" runat="server" /></td><td></td>
    <td><label for="cb_Piel_Deshidratacion">DESHIDRATADA:</label></td><td>
        <asp:CheckBox ID="cb_Piel_Deshidratacion" runat="server" /></td><td></td>
    </tr>
    </table>
    <div>LOCALIZACION:
        <asp:TextBox ID="txt_Localizacion" runat="server"></asp:TextBox>
        </div>
    <div>ADENOPATIAS:<asp:TextBox ID="txt_Adenopatias" runat="server"></asp:TextBox>
        </div>    



    <br />
    <table>
    <tr><td>CUELLO:</td><td><label for="cb_Cuello_Soplo">Soplo carotideo:</label></td><td>
        <asp:CheckBox ID="cb_Cuello_Soplo" runat="server" />
        </td><td></td><td><label for="cb_Cuello_Tiroides">Tiroides:</label></td><td>
        <asp:CheckBox ID="cb_Cuello_Tiroides" runat="server" />
        </td><td></td><td><label for="cb_Cuello_Deformidad">Deformidades:</label></td><td>
        <asp:CheckBox ID="cb_Cuello_Deformidad" runat="server" />
        </td><td></td><td><label for="cb_Cuello_Tumoraciones">Tumoraciones:</label></td><td>
        <asp:CheckBox ID="cb_Cuello_Tumoraciones" runat="server" />
        </td></tr>
    </table>

    <br />
    <table>
    <tr><td>CARDIOVASCULAR:</td><td>Tension arterial:
        <asp:TextBox ID="txt_TensionArterial" runat="server"></asp:TextBox>
&nbsp;hg</td><td class="style2"> Pulso radial:</td><td><label for="ck_Pulso_Regular">Regular:</label></td><td>
        <asp:CheckBox ID="ck_Pulso_Regular" runat="server" />
        </td><td></td><td><label for="ck_Pulso_Irregular">Irregular:</label></td><td>
        <asp:CheckBox ID="ck_Pulso_Irregular" runat="server" />
        </td><td></td><td><label for="ck_Pulso_NosePalpa">No se palpa:</label></td><td>
        <asp:CheckBox ID="ck_Pulso_NosePalpa" runat="server" />
        </td><td></td></tr>
    </table>

    <table>
    <tr><td>Ruidos:</td><td><label for="cb_Ruidos_Netos">Netos:</label></td><td>
        <asp:CheckBox ID="cb_Ruidos_Netos" runat="server" />
        </td><td></td><td> <label for="cb_Ruidos_Desdoblado">Desdoblado:</label></td><td>
        <asp:CheckBox ID="cb_Ruidos_Desdoblado" runat="server" 
             />
        </td><td>Soplos: <label for="cb_Ruidos_Sistolico">Sistólico:</label> </td><td>
        <asp:CheckBox ID="cb_Ruidos_Sistolico" runat="server" />
        </td><td></td><td><label for="cb_Ruidos_Diastolico">Diastólico:</label></td><td>
        <asp:CheckBox ID="cb_Ruidos_Diastolico" runat="server" />
        </td><td></td><td><label for="cb_Ruidos_SistoDiastolico">Sisto-Diastólico:</label></td><td>
        <asp:CheckBox ID="cb_Ruidos_SistoDiastolico" runat="server" />
        </td><td></td><td>
        <label for="cb_Ruidos_Area">AREA:</label></td><td>
            <asp:CheckBox ID="cb_Ruidos_Area" runat="server" />
        </td></tr>
    </table>

    <div>Otras alteraciones: <br /><asp:TextBox ID="txt_OtrasAlteraciones" runat="server" 
            Height="50px" Width="100%"></asp:TextBox></div>

    <div>TORAX: <br /><asp:TextBox ID="txt_Torax" runat="server" 
            Height="50px" Width="100%"></asp:TextBox></div>

    <div>ABDOMEN: <br /><asp:TextBox ID="txt_Abdomen" runat="server" 
            Height="50px" Width="100%"></asp:TextBox></div>

    <div>GENITO URINARIO: <br /><asp:TextBox ID="txt_GenitoUrinario" runat="server" 
            Height="50px" Width="100%"></asp:TextBox></div>


     <table>
    <tr><td><u>NEUROLOGICO:</u></td><td><label for="cb_Neurologico_PupilasIguales">PUPILAS IGUALES:</label></td><td>
        <asp:CheckBox ID="cb_Neurologico_PupilasIguales" runat="server" />
        </td><td></td><td><label for="cb_Neurologico_Pulilas_Simetricas">SIMÉTRICAS::</label></td><td>
        <asp:CheckBox ID="cb_Neurologico_Pulilas_Simetricas" runat="server" />
        </td><td></td><td><label for="cb_Neurologico_Pulilas_Asimetricas">ASIMETRICAS:</label></td><td>
        <asp:CheckBox ID="cb_Neurologico_Pulilas_Asimetricas" runat="server" />
        </td><td></td>
    <td><label for="cb_Mioticas_Mioticas">MIOTICAS:</label></td><td>
        <asp:CheckBox ID="cb_Mioticas_Mioticas" runat="server" />
        </td><td></td><td><label for="cb_Mioticas_Anisocoria">ANISOCORIA:</label></td><td>
        <asp:CheckBox ID="cb_Mioticas_Anisocoria" runat="server" />
        </td><td></td>
    </tr>
    </table>


        <br />
    <table>
    <tr><td class="style1"></td><td></td><td>&nbsp;</td><td></td><td></td><td><label for="ck_Pupilas_Reactivas_Luz_Si">SI</label></td><td><label for="ck_Pupilas_Reactivas_Luz_No">NO</label></td><td></td><td></td><td>
        &nbsp;</td><td>&nbsp;</td></tr>
    <tr><td class="style1">&nbsp;</td><td><label for="cb_Pupilas_Deformidad">DEFORMIDAD:</label></td><td>
        <asp:CheckBox ID="cb_Pupilas_Deformidad" runat="server" />
        </td><td></td><td>REACTIVAS A LA LUZ:</td><td>
            <asp:RadioButton ID="ck_Pupilas_Reactivas_Luz_Si" GroupName="g_ck_Pupilas_Reactivas_Luz" runat="server" />
        </td><td>
            <asp:RadioButton ID="ck_Pupilas_Reactivas_Luz_No" GroupName="g_ck_Pupilas_Reactivas_Luz" runat="server" />
        </td><td></td><td>
        GLASGOW:</td><td>
            <asp:TextBox ID="txt_Glasgow" runat="server"></asp:TextBox>
        </td><td>/15</td></tr>
    </table>

    <div><asp:TextBox ID="txt_DebajodelGlasgow" runat="server" 
            Height="50px" Width="100%"></asp:TextBox></div>


            <br />
<div>MIEMBROS SUPERIORES: <br /><asp:TextBox ID="txt_MiembrosSuperiores" runat="server" 
            Height="50px" Width="100%"></asp:TextBox></div>

<br />
<div>MIEMBROS INFERIORES: <br /><asp:TextBox ID="txt_MiembrosInferiores" runat="server" 
            Height="50px" Width="100%"></asp:TextBox></div>


<br />
<div>DIAGNOSTICOS PRESUNTIVOS: <br /><asp:TextBox ID="txt_Diagnosticos_Presuntivos" runat="server" 
            Height="50px" Width="100%"></asp:TextBox></div>

<br />
<div>PLAN DE ESTUDIOS: <br /><asp:TextBox ID="txt_PlandeEstidios" runat="server" 
            Height="50px" Width="100%"></asp:TextBox></div>


<br />
<div><u>PLAN INCIAL DE TRATAMIENTO</u> (Sujetos a cambios según exámenes complementarios): <br /><asp:TextBox ID="txt_PlanTratamiento" runat="server" 
            Height="50px" Width="100%"></asp:TextBox></div>

<div>
    <asp:Button ID="txt_Guardar" runat="server" Text="Guardar" />
</div>

    </div>
    </form>
</body>
</html>
