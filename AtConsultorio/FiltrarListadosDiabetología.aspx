<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FiltrarListadosDiabetología.aspx.cs" Inherits="AtConsultorio_ListadosDiabetología" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" /><link rel="stylesheet" type="text/css" href="../css/barra.css" /><link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>

<script>
    parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Listados de Diabetología</strong>";
</script>


</head>
<body>
    <form id="form1" runat="server">

    
    <div class="contenedor_1" style="width:660px; height:363px; margin-top:110px; margin-left:320px">
    <div class="contenedor_2" style="margin-left:125px; height:281px;width:400px">
    <div class="titulo_seccion">
    <span style="margin-left:52px">Listados de Diabetología</span>
    </div>
    <div class="control-group" style="margin-top:30px">
    <label style="display:inline; margin-left:16px">Tipo Diabetes</label>
    <select id="CbotipoDiabetes" style=" margin-bottom:0px">
    <option value="0" >Tipo Uno</option>
    <option value="1">Tipo Dos</option>
    <option value="2">Gestacional</option>
 <%--   <option value="3">Asistió  Taller</option>--%>
    </select>
    </div>

        <div class="control-group" style="margin-top:20px; margin-left:46px">
    <label style="display:inline; margin-left:25px">Filtro</label>
    <select id="CboFiltro">
    <option value="0">Complicaciones</option>
    <option value="1">Tratamiento</option>
    <option value="2">Exámenes Complementarios </option>
    <option value="3">Asistió Taller</option>
    </select>
    </div>
<%--      
       <div class="control-group" style="margin-top:30px; margin-left:26px">
       <div class="label">Seccional</div>
       <%--<div class="label" style="float:left">Seccional</div>
       <select id="cboSeccional">
     
       </select>
       </div>--%>
    
       <label style="margin-left:110px; display:inline">Desde</label>
       <input id="txtDesde" type="text" maxlength="0" style="width:100px" /><br />
       <label style="margin-left:112px; display:inline">Hasta</label>
       <input id="txtHasta" type="text" maxlength="0" style="width:100px; margin-left:2px"/>
  
            <div class="control-group" style=" float:right">
             <a id="btnListar" class="btn btn-info" style="width:100px; margin-right:127px; margin-top:0px; float:right">Listar</a>
             </div>

    </div>
    </div>

    </form>
</body>
<script src="../js/Hospitales/AtConsultorio/FiltrarListadosDiabetologias.js" type="text/javascript"></script>
</html>
