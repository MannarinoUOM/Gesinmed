<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Ejemplo.aspx.cs" Inherits="Farmacia_Ejemplo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

 <div class="container">
      <input class="typeahead" id="combo" type="text" data-provide="typeahead" autocomplete="off">
    </div>
          <input type="hidden" id="diag_nombre" />
          <input type="hidden" id="id_val" />
<!--Pie de p�gina-->
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/Ejemplo.js" type="text/javascript"></script>
<!--Barra sup--> 
</body>
</html>

