<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consumo.aspx.cs" Inherits="Guardia_Consumo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
      <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />

</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Consumo General en Guardia</span></div>
      <form class="form-horizontal" >

         <div class="control-group">
          <label class="control-label" for="txtDesde">Desde</label>
          <div class="controls">
            <input type="text" id="txtDesde" name="txtDesde" maxlength="10"/>
        </div>
        </div>

        <div class="control-group">
          <label class="control-label" for="txtHasta">Hasta</label>
          <div class="controls">
            <input type="text" id="txtHasta" name="txtHasta" maxlength="10"/>
        </div>
        </div>

      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a id="btnImprimir" class="btn btn-info"><i class="icon-print"></i>&nbsp;Imprimir</a>
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
  </div>
</div>

<!--Pie de p�gina-->
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/Hospitales/Guardia/Consumo.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>


<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Guardia > <strong>Consumo General en Guardia</strong>";
</script> 

</body>
</html>


