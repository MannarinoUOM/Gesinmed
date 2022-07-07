<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Informes_de_Produccion.aspx.cs" Inherits="Informes_Informes_de_Produccion" %>

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
    parent.document.getElementById("DondeEstoy").innerHTML = "Listados > <strong>Listados</strong>";
</script>



</head>
<body>
    <form id="form1" runat="server">

    
    <div class="contenedor_1" style="width:850px; height:483px; margin-top:67px; margin-left:250px">
    <div class="contenedor_2"style="margin-left:77px; height:400px;width:700px" >
    
     <div class="titulo_seccion">
    <span  style=" text-align:center" id="titulo">Reportes de Producción</span>
    </div>

    <label style="margin-left:52px; margin-bottom:0px">Indicadores</label>
    <div class="contenedor_2" style="margin-left:50px; height:300px;width:600px; margin-top:0px">
   
    <div class="control-group" style="margin-top:30px">
<%--    <label style="display:inline; margin-left:16px">Tipo Listado</label>
    <select id="CbotipoListado" style=" margin-bottom:0px">
    <option value="0" >Egresos Mensuales</option>
      <option value="1" >Informe Fallecidos</option>
      <option value="2" >Egresos Por Servicio</option>
      <option value="3" >Ingresos Mensuales</option> 
      <option value="4" >Pacientes Guardia Por Especialidad</option>
      <option value="5">Informes de Producción</option>
    </select>--%>

    <div class="row" style="margin-left:20px; margin-bottom:10px">

    <input id="rdoTurnos" type="radio" checked="checked"/>
    <label for="rdoTurnos" style="display:inline">Cantidad Turnos Reservados por Usuarios</label>

     <input id="cboAgruparPeriodo" type="checkbox" style="margin-left:119px"/>
    <label for="cboAgruparPeriodo" style="display:inline; text-align:right">Agrupado por Período</label>

    </div>

    <div class="row" style="margin-left:20px; margin-bottom:10px">

    <input id="rdoHc" type="radio"/>
    <label for="rdoHc" style="display:inline">Cantidad Historia Clinica x Usuarios</label>
 
    <input id="cboInformeDia" type="checkbox" style="margin-left:167px" checked="checked"/>
    <label for="cboInformeDia" style="display:inline">Informes por día</label><br />
    </div>

    <div class="row" style="margin-left:20px; margin-bottom:10px">
    <input id="rdoIcd10" type="radio"/>
    <label for="rdoIcd10" style="display:inline">Ranking de diagnosticos ICD10 ambulatorio por Médico</label>
 
    <input id="cboAgruparMedico" type="checkbox" style="margin-left:40px" disabled/>
    <label for="cboAgruparMedico" style="display:inline; text-align:right">Agrupado por Médico</label>

    </div>
    </div>


  
 <%--           <div class="control-group" style=" float:right">
             <a id="btnListar" class="btn btn-info" style="width:100px; margin-right:127px; margin-top:0px; float:right">Listar</a>
             </div>--%>
             <label for="2" style="margin-top:20px; margin-bottom:0px; margin-left:80px">Rango de Fechas</label>
             <div id="2" class="contenedor_2" style="margin-left:80px; height:30px;width:440px; margin-top:0px">
       <label style="margin-left:32px; display:inline">Desde</label>
       <input id="txtDesde" type="text" maxlength="0" style="width:100px" />
       <label style="margin-left:19px; display:inline">Hasta</label>
       <input id="txtHasta" type="text" maxlength="0" style="width:100px; margin-left:2px; float:right; margin-right:70px"/>

       
    <%--  <div style=" width:565px; margin-top:31px">--%>
  
          <%--   <a id="btnListar" class="btn btn-info" style="width:100px; margin-right:127px; margin-top:0px; display:inline" href="javascript:history.go(-1)">Volver</a>
             <a  id="btnBuscar" class="btn btn-info">Buscar</a>--%>
             <%--<a id="btnBuscar" class="btn btn-info" style="width:100px; margin-left:175px; margin-top:0px; display:inline">Buscar</a>--%>

             <%--</div>--%>

             <%--</div>--%>
    </div>
    <div style=" width:565px; margin-top:31px">
            <a id="btnListar" class="btn btn-info" style="width:100px; margin-right:127px; margin-top:0px; margin-left:80px; display:inline" href="javascript:history.go(-1)">Volver</a>
            <a id="btnBuscar" class="btn btn-info" style="width:100px; margin-left:174px; margin-top:0px; display:inline">Buscar</a>
           </div>
    </div>
    </form>
</body>
<script src="../js/Hospitales/Informes/Informes_Produccion.js" type="text/javascript"></script>
</html>

