<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Feriados.aspx.cs" Inherits="Administracion_Feriados" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="container">
  <div class="contenedor_1">

    <div class="contenedor_a" style="position:relative;margin-left:15px;height:530px">
        <h3>Feriados</h3>

<div style="margin-left:25px;color:#666666"><strong>Fecha :</strong> <input id="txt_Fecha" type="text" class="span2"> <strong>Descripción :</strong> <input id="txt_Descripcion" type="text" class="span3"> <a id="btn_txt_Agregar" class="btn btnCorrector btn-success" onclick="Guardar();">Agregar</a>&nbsp;<a class="btn btn-danger btnCorrector" onclick="Quitar();">Eliminar</a>&nbsp;<a class="btn btnCorrector" onclick="limpiar();">Cancelar</a> </div>
<div>
<div class="tabla pull-left" style="width:95%;margin-left:25px;height:400px">
<table class="table table-hover">
<tr>
<th>&nbsp;</th>
<th>Fecha</th>
<th width="80%">Descripción</th>
</tr>
<tbody id="TFeriados">
</tbody>

</table>
</div>


<div class="clearfix"></div>
</div>
      <div class="pie_gris"> 

      </div>
    </div>

  </div>
</div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script> 
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Administracion/Feriados.js" type="text/javascript"></script>

</body>
</html>
