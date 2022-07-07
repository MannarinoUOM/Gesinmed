<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Solicitud_Hemodinamia_Programada_Vaucher.aspx.cs" Inherits="AtConsultorio_Solicitud_Hemodinamia_Programada_Vaucher" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Gestión Hospitalaria</title>
<link href="../css/Odontologia.css" rel="stylesheet" type="text/css" />
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/fixedHeader.dataTables.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
</head>
<body>
    
   <div class="container">
   <div class="contenedor_1" style="margin-top:5%">
   <div class="contenedor_bono">
   <div class="titulo_seccion"><span id="paciente"></span></div>
   <form id="form1" runat="server" class="form-horizontal">

   <div class=" control-group">
   <label class="control-label">Servicio</label>
   <div class="controls">
   <select id="cboServicio" ></select>
   </div>
   </div>

   <div class=" control-group">
   <label class="control-label">Fecha de Intenación</label>
   <div class="controls">
   <input id="txtFecha" type="text" style="text-align:center"/>
   </div>
   </div>

   <div class=" control-group">
   <label class="control-label">Hora de Intenración</label>
   <div class="controls">
   <input id="txtHora" type="text" style="text-align:center"/>
   </div>
   </div>

   <div class=" control-group">
   <label class="control-label">Indicaciones p/ Enfermera</label>
   <div class="controls">
   <textarea id="txtIndicaciones" rows="6"  ></textarea>
   </div>
   </div>

   <div class=" control-group">
   <div class="controls">
   <a id="btnImprimir" class="btn btn-success"><i class="icon-print icon-white"></i>&nbsp;&nbsp;Imprimir</a>
   </div>
   </div>
   </form>
   </div>
   </div>
   </div>

</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.dataTables.js" type="text/javascript"></script>
<script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Hemodinamia/Consulta_Cirugia_Programada_Vaucher.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
