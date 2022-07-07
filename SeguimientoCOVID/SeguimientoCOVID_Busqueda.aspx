<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SeguimientoCOVID_Busqueda.aspx.cs" Inherits="SeguimientoCOVID_SeguimientoCOVID_Busqueda" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="container">

        <div class="titulo_seccion">Busqueda Seguimiento COVID</div>

    <form id="form1" runat="server">
    <div style="margin-top:10%">


               <div class="control-group">
               <label class="control-label">Desde</label>
                <div class="controls">
                    <input id="txtDesde" class="span2 fecha" type="text" />
                </div>
              </div>
               <div class="control-group">
               <label class="control-label">Hasta</label>
                <div class="controls">
                    <input id="txtHasta" class="span2 fecha" type="text" />
                </div>
              </div>
              <a class="btn" id="btnBuscarCarga">Buscar</a>
   


              <div class="contenedor_1" >
              <div style="overflow:auto; height:300px">
              <table class='table table-hover' id="resultado"><tr><td><b>Nombre</b></td><td><b>Dni</b></td><td><b>Fecha</b></td></tr></table>
              </div>
              </div>
    </div>
    </form>
    </div>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>   
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script> 
    <script src="../js/Hospitales/SeguimientoCOVID/SeguimientoCOVID.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>


    <script> parent.document.getElementById("DondeEstoy").innerHTML = "Guardia > <strong>Busqueda Seguimiento COVID</strong>"; </script>