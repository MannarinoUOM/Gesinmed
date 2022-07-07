<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Filtrar_Listados.aspx.cs" Inherits="Informes_Filtrar_Listados" %>

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
<link href="../css/deshabilitar.css" rel="stylesheet" type="text/css" />


</head>
<body>
    <form id="form1" runat="server">
    
    
    <div class="contenedor_1" style="width:770px; height:292px; margin-top:150px; margin-left:auto; margin-right:auto">
    <div id="contenedorFiltros" class="contenedor_2" style="margin-left:30px; height:400px;width:710px">
    <div class="titulo_seccion" style="text-align:center; margin-left:0px">
    <span style=" text-align:center" id="titulo">Nombre Listado</span>
    </div>
    <div class="control-group" style="margin-top:30px; display:none">
    <label style="display:inline; margin-left:16px">Tipo Listado</label>
    <select id="CbotipoListado" style=" margin-bottom:0px">
    </select>
    </div>

    <div class="meses" style="text-align:center; display:none">
    <label style="display:inline">Mes</label><select id="cboMes"></select>
    <label style="display:inline">Año</label><select id="cboAno"></select>
    </div>

    <div id="fechas">
       <label style="display:inline; margin:50px" class="texto">Fecha</label><label style="margin-left:50px; display:inline" class="texto">Desde
       <input id="txtDesde" class="deshabilitar" type="text" maxlength="0" style="width:100px; text-align:center" disabled="disabled" /></label>

       <label style="margin-left:50px; display:inline" class="texto">Hasta
       <input id="txtHasta"  class="deshabilitar" type="text" maxlength="0" style="width:100px; margin-left:2px ; text-align:center" disabled="disabled"/></label>
  </div>

  <div>
  <label style="display:inline; margin:50px" id="lblSeccional">Seccional</label><select class="deshabilitar" id="cboSeccionales" style="margin-left:86px" disabled="disabled"></select>
  </div>

  <div>
  <label style="display:inline; margin:50px" id="lblEspecialidad">Especialidad</label><select class="deshabilitar" id="cboEspecialdades" style="margin-left:20px" disabled="disabled"></select>
  <label style="display:none; margin:5px" id="lblPrestador">Prestador</label><select class="deshabilitar input-medium" id="CboPrestador" style="margin-left:5px; display:none" disabled="disabled"></select>
  </div>

  <div id="Detallado" style="display:none">
            <div class="control-group" style="margin-left:50px">
            <label  id="lblDetallado" style="display:inline" for="CboDetallado">Detallado</label>
             <input id="CboDetallado" type="checkbox" ; style="margin-left:0px"/>
            
             </div>
</div>
  <div id="Graficos" style="display:none">
            <div  class="control-group">
               <a id="BtnBarras" class="btn" style="margin-left:190px"><i class=" icon-list"></i>&nbsp;Gráfico de Barras</a>
               <a id="BtnTorta" class="btn"><i class=" icon-adjust"></i>&nbsp;Gráfico de Torta</a>
             </div>
</div>

  <div id="TodosMenoresMayores" style="display:none">
            <div  class="control-group" style="text-align:center">
               <label style="display:inline; width:5%; margin:auto" for="rdoMenores">Menores </label><input id="rdoMenores" type="radio" name="edades" style="margin:auto"/>
               <label style="display:inline; width:5%; margin:auto" for="rdoMayores">Mayores </label><input id="rdoMayores" type="radio" name="edades" style="margin:auto"/>
               <label style="display:inline; width:5%; margin:auto" for="rdoTodos">Todos </label><input id="rdoTodos" type="radio" name="edades" style="margin:auto" checked="checked"/>
             </div>
</div>

<div id="seccionalesGrilla" class="contenedor_2" style="height:50%; padding:0px; border:none; display:none; text-align:center; margin-left:130px; overflow-x:no">
            <table style="width:110%; height:100%; background-color:White; text-align:center">
            <thead style="background-color:Gray">
            <tr><th style="width:100%;border-top-left-radius:10px;border-top-right-radius:10px"><label style="color:White"><b>Seccionales</b></label></th></tr>
            </thead>
            <tr style="width:100%; height:10px">
            <td style="width:24%"><div style=" height:100%; overflow:auto"><table id="Seccionales"></table></div></td>
            <td style="width:1%"></td>
            </tr>
            </table>
</div>


   <div class="control-group">
                    <div class="controls">
                        <a id="btnListarExcel" class="btn" style="margin-left:190px"><i class="icon-file"></i>&nbsp;Buscar (Excel)</a>
                        <a id="btnListarPDF" class="btn"><i class="icon-print"></i>&nbsp;Buscar (PDF)</a>
                        <a id="btnVolver" class="btn btn-info"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                    </div>
                </div>

    </div>
    </div>

    </form>
</body>
<script src="../js/Hospitales/Informes/Filtrar_Listados_Por_Separado.js" type="text/javascript"></script>
<script src="../js/Hospitales/Informes/administrarListados.js" type="text/javascript"></script>
</html>

