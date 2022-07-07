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
    parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Listado de Diabetología</strong>";
</script>


</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    <div class="contenedor_1" style="width:700px; height:340px; margin-top:120px; margin-left:320px">
    <div class="contenedor_2" style="margin-left:125px; height:250px">
    <div class="titulo_seccion">
    <span style="margin-left:75px">Listado Diabetología</span>

    <div class="control-group" style="margin-top:30px">
    <div class="label">Tipo Diabetes</div>
    <select id="CbotipoDiabetes">
    <option value="0" >Tipo Uno</option>
    <option value="1">Tipo Dos</option>
    <option value="2">Gestacional</option>
 <%--   <option value="3">Asistió  Taller</option>--%>
    </select>
    </div>

        <div class="control-group" style="margin-top:30px; margin-left:46px">
    <div class="label">Filtro</div>
    <select id="CboFiltro">
    <option value="0">Complicaciones</option>
    <option value="1">Tratamiento</option>
    <option value="2">Exámenes Complementarios </option>
    <option value="3">Asistió Taller</option>
    </select>
    </div>

            <div class="control-group" style="margin-top:30px; margin-left:130px">

    <a id="btnListar" class="btn btn-info" style="width:100px">Listar</a>
    </div>

    </div>
    </div>
    </div>


    </div>
    </form>
</body>
<script src="../js/Hospitales/AtConsultorio/FiltrarListadosDiabetologias.js" type="text/javascript"></script>
</html>
