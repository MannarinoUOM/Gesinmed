<%@ Page Language="C#" AutoEventWireup="true" CodeFile="cerrarReclamo.aspx.cs" Inherits="Reclamos_cerrarReclamo" %>

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
    <form id="form1" runat="server">
    <input id="afiliadoID" type="hidden"/>
    <input id="ReclamoId" type="hidden"/>
<div class="container">
  <div class="contenedor_1" >
    <div class="contenedor_a" style="position:relative;margin-left:5%;height:530px; width:90%">
      <h3>Cerrar Reclamo</h3>

      <div class="label_top_grupo">
            <div class="label_top">
              <div><b>Titulo</b></div>
              <input id="txtTitulo" maxlength="60" type="text" class="span4" disabled=disabled/>
            </div>
            <div class="label_top">
              <div><b>Servicio</b></div>
              <input id="txtServicio" type="text" class="span4" disabled=disabled/>
            </div>
         
             <div class="label_top">
              <div><b>Nº Reclamo</b></div>
              <input id="nReclamo" type="text" class="span2" disabled=disabled/>
            </div>
            
            <div class="label_top">
            <div><b>Reclamo</b></div>
            <textarea id="txtReclamo" style=" width:800px; height:123px" maxlength="500" disabled=disabled></textarea>
            </div>
   
            <div class="label_top">
                
   
            </div>

            <div class="label_top">
            <a id="btnVerAdjunto" class="btn btn-info"><i class="icon icon-eye-open"></i>&nbsp;Ver Adjunto</a>
            </div>

            <div class="label_top" style="margin-top:2%">
            <div><b>Evolución</b></div>
            <textarea id="txtSoluccion" style=" width:800px; height:123px" maxlength="500"></textarea>
            </div>
   
            <div class="clearfix"></div>
            </div>


      <div class="pie_gris">
       <a id="btnCerrarReclamo" class="btn btn-danger" style="margin-left:30px"><i class=" icon-exclamation-sign"></i>&nbsp;&nbsp;Dar por finalizado el reclamo</a>
        <div class="pull-right">
       <a id="btnImprmir" class="btn btn-info" style="margin-left:30px"><i class="icon-print"></i>&nbsp;&nbsp;Imprimir</a>
       <a id="btnGuardar" class="btn btn-info" style="margin-left:30px"><i class=" icon-hdd"></i>&nbsp;&nbsp;Guardar</a>
       <a id="btnVolver" class="btn btn-info pull-left" style="margin-left:30px" href="ReclamosBusqueda.aspx"><i class=" icon-arrow-left"></i>&nbsp;&nbsp;Volver</a>
        </div>
      </div>

      </div>
      </div>
      </div>
      
    </form>
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
    <script src="../js/Hospitales/reclamos/cerrarReclamo.js" type="text/javascript"></script>


<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Informes > Informes Administrativos > <strong>Cerrar Reclamo</strong>";
</script>  