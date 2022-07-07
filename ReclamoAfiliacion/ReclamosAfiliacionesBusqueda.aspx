<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReclamosAfiliacionesBusqueda.aspx.cs" Inherits="ReclamoAfiliacion_ReclamosAfiliacionesBusqueda" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>

<div class="container">
  <div class="contenedor_1">
    <div class="contenedor_a" style="position:relative;margin-left:15px;height:530px">
      <h3>Buscar Reclamos Afiliaciones</h3>
	
            

      <div style="padding:15px;">

<div class="pull-left minicontenedor50" style="width:40%">
        <div class="pull-left" style="width:300px; height: 150px;">

        Paciente: <input type="text" id="txtNombre" name="txtNombre" class="input-large" maxlength="30" style=" margin-left:11px; width:196px"/>
        Nro. HC: <input type="text" id="txtNHC" name="txtNHC" class="input-large numero" style="margin-left:17px; width:196px" maxlength="15" />
        Nro. Doc: <input type="text" id="txtDNI" name="txtDNI" class="input-medium numero" style="margin-left:11px; width:196px" maxlength="8" />
        Seccional: <select id="cboSeccional" class="input-large" style="margin-left:5px; text-align:center"></select> <br />
          
        </div>       
</div>

<div class=" minicontenedor50" style="width:50%">
             <div class="pull-right" style="width:410px; height: 150px;">

        Fecha de reclamo: <input type="text" id="txtFechaReclamo"  class="input-large" maxlength="30" style="margin-left:20px; text-align:center"/> <br />
        Fecha de resolución: <input type="text" id="txtFechaResolucion" class="input-large numero" style="margin-left:5px; text-align:center" maxlength="15" /> <br />
        Servicio: <select  id="cboServicio"  class="input-large" style="margin-left:86px; width:227px"></select> <br />
        No resueltos: <input type="checkbox" id="chkResueltos" checked="checked"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Más de 72 HS: <input type="checkbox" id="chk72"/>
            
          
        </div> 
        </div>

<div class="clearfix"></div>        
<div id="Tabla" class="tabla" style="height:250px;">
<table class="table table-hover" style=" font-size:12px;">
            <thead>
            <th width="65px">Afiliado</th>
            <th width="65px">Fecha Inicio</th>
            <th width="65px">Titulo</th>
            <th width="105px">Servicio</th>
                </thead>
            <tbody id="tReclamos">
             
            </tbody>
          </table>
                    <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                    </div>   
          </div>


      </div>
      <div class="pie_gris">
        <div class="pull-right">
       <a id="btnBuscar" class="btn btn-info" style="margin-left:30px"><i class="icon-search"></i>&nbsp;&nbsp;Buscar</a>
   
        </div>
      </div>
    </div>
  </div>
</div> 

<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Informes > Informes Administrativos > <strong>Buscar Reclamos Afiliaciones</strong>";
</script>  

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
    <script src="../js/Hospitales/ReclamosAfiliaciones/reclamosAfiliacionesBusqueda.js" type="text/javascript"></script>

