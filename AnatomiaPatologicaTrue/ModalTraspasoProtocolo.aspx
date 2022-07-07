<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ModalTraspasoProtocolo.aspx.cs" Inherits="AnatomiaPatologicaTrue_ModalTraspasoProtocolo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/Nutricion.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/fixedHeader.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="jquery.print.js"></script>
</head>
<body>
      <div id="avisos"  tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
  <div id="Div7"></div>    
  </div>
  <div class="modal-body">
  <div>
  </div>
    
    <div class="externo control-group" style="display:none; text-align:center">
    <label class="control-label" id="mensajes"></label>
    </div>

  <div class="modal-footer">
    <button onclick="aceptar()" class="btn btn-success" data-dismiss="modal" aria-hidden="true"><i class=" icon-edit icon-white"></i>&nbsp;Aceptar</button>    
    <button onclick="javascript:window.close();" class="btn btn-danger" data-dismiss="modal" aria-hidden="true"><i class="icon-remove-circle icon-white"></i>&nbsp;Cancelar</button> 
  </div>
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
    <script src="../js/jQueryBlink.js" type="text/javascript"></script>
    <script src="../js/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/PrincipalAdministracion.js"  type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/PrincipalBusquedaPaciente.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/tecnicasEspeciales.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/Busqueda.js" type="text/javascript"></script>
