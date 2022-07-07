<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AltaEdiciondeDiagnosticos.aspx.cs" Inherits="Quirofano_AltaEdiciondeDiagnosticos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Quirofano > <strong>Alta y Edición de Diagnósticos</strong>";
</script> 
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>
<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">    
                <div class="contenedor_3">
                            <div class="form-horizontal">
                                <input type="hidden" id="editando_id_diagnostico" value="0" />  
                                <div class="control-group">
                                  <label class="control-label">Filtro: </label>
                                  <div class="controls">
                                       <input type="text" id="txt_filtro_diagnostico"/>
                                  </div>
                                </div>
                                <div class="control-group">
                                  <label class="control-label">&nbsp;</label>
                                  <div class="controls">
                                       <select id="select_diagnosticos" style="width: 60%;"></select>  
                                  </div>
                                </div>
                                <div class="control-group">
                                  <label class="control-label">Diagnóstico: </label>
                                  <div class="controls">
                                        <input id="txt_diagnosticos_edicion" type="text" style="width: 60%;" maxlength="4000"/> 
                                  </div>
                                </div>
                            </div>
                        <div class="clearfix"></div>
                        <div class="pie_gris">
                            <div class="pull-right">
                                <a id="btn_diagnostico_eliminar" class="btn btn-danger"><i class="icon-trash icon-white"></i>&nbsp;Eliminar</a> 
                                <a id="btn_diagnostico_cancelar" class="btn btn-warning"><i class="icon-remove icon-white"></i>&nbsp;Cancelar</a>
                                <a id="btn_diagnostico_guardar" class="btn btn-info"><i class="icon-ok icon-white"></i>&nbsp;Agregar</a>
                            </div>   
                    </div>
                  </div>
  </div>
<!--Pie de pagina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/Quirofano/AltaEdiciondeDiagnosticos.js" type="text/javascript"></script>
<!--Barra sup--> 
</body>
</html>
