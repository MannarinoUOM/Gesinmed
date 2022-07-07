<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PlanillaAnestesia.aspx.cs" Inherits="Quirofano_PlanillaAnestesia" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/arbol.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<%--<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">--%>
<link rel="stylesheet" href="../css/jquery-ui.css"/>
<link rel="stylesheet" href="../css/style.css"/>
</head>
<body>
<input id="afiliadoId" value="" type="hidden" />
    <form id="form1" runat="server">
    <div class="container" style="margin-top:1%;">
    <div style="height:650px; width:1000px; overflow:auto">
    <div class="contenedor_1" style="padding-bottom:0px">
    <%------------------DATOS AFILIADO-----------------%>
     <div class="resumen_datos" style="height:80px;">  
     <div class="datos_persona">
     <div ><img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"/></div>
     <div class="datos_resumen_paciente">
     <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a> <img id="IconoVencido2" class="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif"  style="display:none"/> <a id="cambiar_paciente" href="javascript:CambiarPacientePopUp();" style="color:Red;display:none;"><b>Cambiar Paciente</b></a> </div>
     <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span> &nbsp;&nbsp;&nbsp; <span style="display:none;">Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span style="display:none;">Cama: <strong><span id="Cargado_Cama"></span></strong></span>
     <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
     <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>
     </div>      
     </div>
     </div>
    <%------------------DATOS AFILIADO-----------------%>

    <%------------------PERSONALES-----------------%>
    <div style="background-color:Black; width:98%; color:White; margin-left:1%"><b>PERSONALES</b></div>
    <div class="contenedor_2" style="width:98%; height:110px; margin-left:1%;">
    <label style="display:inline; margin-left:1%" ><b>Anestesiologo Dr </b></label><select class="medico" id="txtAnestesiologo" style="width:340px"></select>
    <label style="display:inline; margin-left:1%" ><b>Cirujano </b></label><select class="medico" id="txtCirujano" style="width:369px"></select>
    <label style="display:inline; margin-left:1%" ><b>Cardiologo </b></label><select class="medico" id="txtCardiologo" style="width:340px"></select>
    <label style="display:inline; margin-left:1%" ><b>Obstetra </b></label><select class="medico" id="txtObstetra" style="width:409px"></select>
    <label style="display:inline; margin-left:1%" ><b>Ayudante </b></label><select class="medico" id="txtAyudante" style="width:400px"></select>
    <label style="display:inline; margin-left:1%" for="prioridadU" ><b>URGENCIA </b></label><input type="radio" name="prioridad" id="prioridadU" data-prioridad="1"/>
    <label style="display:inline; margin-left:1%" for="prioridadP" ><b>PROGRAMADA </b></label><input type="radio" name="prioridad" id="prioridadP" data-prioridad="0" checked="checked"/>
    </div>
    <%------------------PERSONALES-----------------%>


    <%------------------DATOS PARTE-----------------%>
    <div style="background-color:Black; width:98%; color:White; margin-left:1%"><b>DATOS DEL PARTE ANESTESICO</b></div>
    <div class="contenedor_2" style="width:98%; height:150px; margin-left:1%">
    <label style="display:inline; margin-left:1%" ><b>Inicio anestesia </b></label><input type="text" id="txtInicio" style="width:180px; text-align:center" maxlength="5" />
    <label style="display:inline; margin-left:1%" ><b>Fin anestesia </b></label><input type="text" id="txtFin" style="width:180px; text-align:center" maxlength="5" />
    <label style="display:inline; margin-left:1%" ><b>ABT Profilaxis </b></label><input type="text" id="txtProfilaxis" style="width:180px" />
    <label style="display:inline; margin-left:1%" ><b>Diagnostico </b></label><input type="text" id="txtDiagnostico" style="width:810px"/>
    <label style="display:inline; margin-left:1%" ><b>Peso del Paciente </b></label><input type="text" id="txtProgramada" style="width:100px"  maxlength="7" /><br />
    <label style="display:inline; margin-left:1%" ><b>Intervención quirúrgica realizada </b></label><input type="text" id="txtRealizada" style="width:670px" />
    </div>
    <%------------------DATOS PARTE-----------------%>


    <%------------------EVENTOS INTRAOPERATORIOS-----------------%>
  <div style="width:700px; margin-left:2%"><%--border: 1px solid #CED5D8; --%>
  <table style="width:700px">
  <tr>
  <td style="width:30%">ASA: <label id="valorAsa" style="display:inline; font-weight:bold" >0</label><br /><div id="slider" style="width:200px"></div></td>
  <td style="width:15%"><label style="display:inline;" for="CheckProtesis">Protesis dentarias</label> <input type="checkbox" style="margin-top:0px" id="CheckProtesis"/></td>
  <td style="width:15%"><label style="display:inline;" for="CheckLentes">Lentes contacto</label> <input type="checkbox" style="margin-top:0px" id="CheckLentes"/></td>
  <td style="width:20%"><label style="display:inline;" for="CheckProteccion">Protección ocular y de cubitos</label> <input type="checkbox" style="margin-top:0px" id="CheckProteccion"/></td>
  </tr>
  <tr>
  <td colspan="3" ><b>ANESTESIA: </b>
  <label style="display:inline;" for="CheckGral">GRAL</label> <input type="checkbox" style="margin-top:0px" id="CheckGral"/>&nbsp;&nbsp;
  <label style="display:inline;" for="CheckNla">NLA</label> <input type="checkbox" style="margin-top:0px" id="CheckNla"/>&nbsp;&nbsp;
  <label style="display:inline;" for="CheckRegional">REGIONAL</label> <input type="checkbox" style="margin-top:0px" id="CheckRegional"/>&nbsp;&nbsp;
  <label style="display:inline;" for="CheckIntub">INTUB. TRAQ</label> <input type="checkbox" style="margin-top:0px" id="CheckIntub"/>&nbsp;&nbsp;
  <label style="display:inline;" for="CheckMasc">MASC. LARING</label> <input type="checkbox" style="margin-top:0px" id="CheckMasc"/></td> 
  <td style="width:10%" ><label style="display:inline;" for="txtNumAnestesia">N°</label> <input type="text" style="margin-top:0px; text-align:center" id="txtNumAnestesia" class="input-mini ; numeroDecimal " maxlength="7"/></td>
  <td style="width:10%" ><label style="display:inline;" for="CheckBalon">Balón</label> <input type="checkbox" style="margin-top:0px" id="CheckBalon"/></td>
  </tr>
  <tr>
  <td ><b>VENTILACION: </b><label style="display:inline;" for="CheckEspontanea">Espontanea</label> <input type="checkbox" style="margin-top:0px" id="CheckEspontanea"/></td>
  <td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label style="display:inline;" for="CheckAsistida">Asistida</label> <input type="checkbox" style="margin-top:0px" id="CheckAsistida"/></td>
  <td ><label style="display:inline;" for="CheckControlada">Controlada</label> <input type="checkbox" style="margin-top:0px" id="CheckControlada"/></td>
  <td ><label style="display:inline;" for="CheckManual">Manual</label> <input type="checkbox" style="margin-top:0px" id="CheckManual"/></td>
  <td ><label style="display:inline;" for="CheckMecanica">Mecanica</label> <input type="checkbox" style="margin-top:0px" id="CheckMecanica"/></td>
  </tr>
  <tr>
  <td ><b>MONITOREO: </b><label style="display:inline;" for="CheckECG">E.C.G</label> <input type="checkbox" style="margin-top:0px" id="CheckECG"/></td>
  <td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label style="display:inline;" for="CheckSAT">SAT.O2.</label> <input type="checkbox" style="margin-top:0px" id="CheckSAT"/></td>
  <td ><label style="display:inline;" for="CheckETCO2">ETCO2</label> <input type="checkbox" style="margin-top:0px" id="CheckETCO2"/></td>
  <td ><label style="display:inline;" for="CheckPANI">PANI</label> <input type="checkbox" style="margin-top:0px" id="CheckPANI"/></td>
  <td ><label style="display:inline;" for="CheckTAI">TAI</label> <input type="checkbox" style="margin-top:0px" id="CheckTAI"/></td>
  </tr>
  <tr>
  <td colspan="3" >VENOPUNTURA <input type="text" id="txtVenopuntura" style="display:inline; width:400px" /></td><td colspan="2">CIRCUITO <input type="text" id="txtCircuito" style="display:inline; width:260px" /></td>
  </tr>
  <tr>
  <td colspan="5"><b>EVENTOS INTRAOPERATORIOS</b></td>
  </tr>
  <tr>
  <td colspan="5">Premedic. (Hora y Dosis) <input type="text" id="txtPremedic" style="width:80%" /></td>
  </tr>
  <tr>
  <td colspan="5">Induc. (Hora y Dosis) <input type="text" id="txtInduc" style="width:82.5%" /></td>
  </tr>
  <tr>
  <td>Mantenim. / Finaliz. (Hora y Dosis)</td><td colspan="4" ><textarea style="width:700px" id="txtMantenim"></textarea></td>
  </tr>
  <tr>
  <td>Tecnica anestesica </td><td colspan="4"><input type="text" id="txtTecnica" style="width:700px" /></td>
  </tr>
  </table>
  </div>  
    <%------------------EVENTOS INTRAOPERATORIOS-----------------%>


    <%------------------GRILLA-----------------%>
    <div style="overflow-x:auto; height:700px; margin:1%">
    <div style="height:700px; width:2200px; text-align:center;  text-align:center; margin:auto">

    <div id="marcoGrilla"></div>

    </div>
    </div>
    &nbsp;&nbsp;&nbsp;DESCRIPCION DE LA ANESTESIA&nbsp;&nbsp;&nbsp<textarea id="txtDescAnestesia" type="text" style="width:950px; margin-left:10px"></textarea>
    <div style="margin-left:8%; margin-top:1%; height:40px">
    <table><tr>
    <td><span style="background-color:#FF5733; cursor:pointer; padding: 5px 10px 5px 10px" class="tipo" data-tipo="." ><b>. Punto</b></span></td>
    <td><span style="background-color:#FFFB33; cursor:pointer; padding: 5px 10px 5px 10px" class="tipo" data-tipo="-" ><b>- Guion</b></span></td>
    <td><span style="background-color:#33FF76; cursor:pointer; padding: 5px 10px 5px 10px" class="tipo" data-tipo="v" ><b>v Tilde</b></span></td>
    <td><span style="background-color:#33CCFF; cursor:pointer; padding: 5px 10px 5px 10px" class="tipo" data-tipo="x" ><b>x Equis</b></span></td>
    <td><span style="background-color:#F3A9F1; cursor:pointer; padding: 5px 10px 5px 10px" class="tipo" data-tipo="^" ><b>^ Triangulo</b></span></td>
    <td><span style="background-color:#DC9C3F; cursor:pointer; padding: 5px 10px 5px 10px; position:static" class="tipo" data-tipo="*" ><b>* F.C. Y TAD</b></span></td>
    <td><span style="background-color:transparent; cursor:pointer; padding: 5px 10px 5px 10px; border: 2px solid Gray" class="tipo" data-tipo="" ><b>  Borrar</b></span></td>
    </tr></table>
    </div>
    <%------------------GRILLA-----------------%>

    <%------------------ESTADO DEL PACIENTE-----------------%>
    <div style="background-color:Black; width:98%; color:White; margin-left:1%"><b>ESTADO DEL PACIENTE AL FINALIZAR EL ACTO ANESTESICO - OPERATORIO</b></div>
    <table style=" border: 1px solid #CED5D8; margin-left:2%; width:97%">
    <tr>
    <td style=" border: 1px solid #CED5D8" colspan="2">Aldrete (Actividad, Circulacion, Respiracio, Conciencia, SatO2): <input class="input-medium" id="txtAcrcs"/> Pts. <input class="input-medium" id="txtPts"/></td><td style=" border: 1px solid #CED5D8" colspan="3"><label style="display:inline" for="chkAst">Aspirac. secrec. traqueales </label><input type="checkbox" id="chkAst"/></td>
    </tr>
    <tr>
    <td style=" border: 1px solid #CED5D8"><label style="display:inline" for="chkDepresionR">Depresión respiratoria </label><input type="checkbox" id="chkDepresionR"/></td><td><label  style="display:inline" for="chkObedece">Obedece ordenes </label><input type="checkbox" id="chkObedece"/></td><td style=" border: 1px solid #CED5D8"><label style="display:inline" for="chkAsf">Aspirac. secrec. faringeas </label><input type="checkbox" id="chkAsf"/></td>
    </tr>
    <tr>
    <td style=" border: 1px solid #CED5D8"><label style="display:inline" for="chkDepresionO" >Depresión oculatoria </label><input type="checkbox" id="chkDepresionO"/></td><td style=" border: 1px solid #CED5D8"><label style="display:inline" for="chkConversa">Conversa </label><input type="checkbox" id="chkConversa"/></td><td style=" border: 1px solid #CED5D8"><label style="display:inline" for="chkNvpo" ></label><label style="display:inline" for="chkNvpo" >NVPO </label><input type="checkbox" id="chkNvpo"/></td>
    </tr>
    <tr>
    <td style=" border: 1px solid #CED5D8" colspan="3"><b>Pasa a:</b>&nbsp; 
    <label style="display:inline" for="chkRecup" >Recup. </label><input type="checkbox" id="chkRecup"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <label style="display:inline" for="chkHabit" >Habit. </label><input type="checkbox" id="chkHabit"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <label style="display:inline" for="chkNro" >Nro. </label><input type="checkbox" id="chkNro"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <label style="display:inline" for="chkUti" >UTI/UCO </label><input type="checkbox" id="chkUti"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     a las <input class="input-mini" id="txtAlas" style="text-align:center" maxlength="5" /> Hs. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Condición/Motivo: <input id="txtMotivo" /></td>
    </tr>
    </table>
    &nbsp;&nbsp;&nbsp;&nbsp;<label style="display:inline" >Observaciones: </label><input type="text" style="width:85%" id="txtObservaciones"/><br />
    &nbsp;&nbsp;&nbsp;&nbsp;<label style="display:inline" >Pasa a: </label><input type="text" style="width:90%" id="txtPasa"/>
    <%------------------ESTADO DEL PACIENTE-----------------%>     
   
    <%------------------BOTONES-----------------%>   
    <div style=" background-color:Gray; height:35px; padding-top:5px; padding-right:5px; border-bottom-right-radius:10px;border-bottom-left-radius:10px">
    <a class="btn btn-info pull-right" id="btnGuardar" style="margin-left:2px" >Guardar</a>
    <a class="btn pull-right" id="btnCargar" style="display:none" >Cargar</a>
    <a class="btn pull-right" id="btnVolver" style="display:inline" ><i class="icon-arrow-left"></i>&nbsp;Volver</a>
    <a class="btn pull-right" id="btnImprimir" style="display:none; margin-right:3px" ><i class="icon-print"></i>&nbsp;Imprimir</a>
    </div>
    <%------------------BOTONES-----------------%>
    
</div>
</div>
</div>
</form>
</body>
</html>



<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/Hospitales/Quirofano/anestesia.js" type="text/javascript"></script>
<%--<script src="https://code.jquery.com/jquery-1.12.4.js" type="text/javascript"></script>--%>
<script src="../js/jquery-ui.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery.mask.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>

<%--<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > Turnos > Planificar Cirugía > <strong>Parte Anestesia</strong>";
</script> --%>