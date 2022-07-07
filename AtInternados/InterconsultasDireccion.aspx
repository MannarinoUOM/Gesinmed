<%@ Page Language="C#" AutoEventWireup="true" CodeFile="InterconsultaMedico.aspx.cs" Inherits="AtInternados_InterconsultaMedico" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../css/hestilo.css"/>
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
      <div class="contenedor_3" style="height:500px;">
      
        <div class="">
        <div class="row" style="margin-left:5px;">
             <div id="controltxtNHC" class="span4">
                <label for="txtNHC" style="display:inline; margin-top:10px;">Nro. HC: </label>
                <input id="txtNHC" type="text" class="span3 numero" maxlength="15"/>
            </div>
             <div id="controlchkTodos" class="span2" style="margin-top:10px;">
                <label for="chkTodos" style="display:inline; margin-right:5px;">Mostrar Todo: </label>
                <input type="checkbox" id="chkTodos" style="margin-top:-3px;"/>
             </div>
              <div id="controldesde" class="span2" style="width:160px;">
                    <label for="desde" style="display:inline; margin-top:10px;">Desde: </label>
                    <input type="text" id="desde" name="desde" class="input-mini date" style="margin-top:10px; width:90px;">
                </div>
                <div id="controlhasta" class="span2" style="width:160px;">
                   <label for="hasta" style="display:inline; margin-top:10px;">Hasta: </label>
                    <input type="text" id="hasta" name="hasta" class="input-mini date" style="margin-top:10px;width:90px;">
                </div>  
        </div>

         <div class="row" style="margin-left:5px;">
          <div id="controltxtPaciente" class="span4">
                <label for="txtPaciente" style="display:inline; margin-top:10px; margin-right:5px;">Afiliado: </label>
                <input id="txtPaciente" type="text" class="span3" maxlength="30"/>
            </div>
          <div id="controlcbo_Especialidad" class="span7">
                <label for="cbo_Especialidad" style="display:inline; margin-top:10px;">Especialidad: </label>
                <select id="cbo_Especialidad" class="span4" style="width:400px; margin-left:10px"></select>
            </div>
        </div>
       <div class="row" style="margin-left:10px;"> 
            <div class="reff ref_4 Turnos_Libres">Pendientes</div>
            <div class="reff ref_1 Turnos_Ocupados">Vistos</div>
            <div class="reff ref_2 Turnos_Cancelado">Cancelados</div>
            <div class="reff ref_3 Turnos_Sobreturno">Atendidos</div>        

        </div>

       <div style="padding:0px 15px 15px 15px;">
            
            <div class="clearfix"></div>
        <div id="Tabla" class="tabla" style="height:345px; overflow: auto;">
              <table class="table table-hover" style=" font-size:11px;">
                <thead>
                  <tr>
                    <th></th>
                    <th>Med. Solicitante</th>
                    <th>Esp. Interconsulta</th>
                    <th>Med. Interconsulta</th>
                    <th>Fecha</th>
                    <th>Motivo</th>
                    <th>Nro. HC</th>
                    <th>Afiliado</th>
                    <th>Servicio</th>
                    <th>Cama</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody id="TInterconsultas">                </tbody>
              </table>
        </div>
        <div class="clearfix"></div>
        </div>
        <div id="div_controles" style="display:none;">
       <div id="controlcbo_Medico" class="span6">
                <label for="cbo_Medico" style="display:inline; margin-top:10px;">Médico: </label>
                <select id="cbo_Medico" class="span5" style="margin-left:53px; width:330px "></select>
       </div>

       <div id="control_txtMedicoExt" class="span8">
                <label for="txtMedicoExt" style="display:inline; margin-top:10px;">Médico Externo: </label>
                <input id="txtMedicoExt" class="span5" type="text" maxlength="30"/>
       </div>

       <div class="row" style="margin-left:0px;">
            <div id="controltxt_Observacion" class="span12">
                <label for="txt_Observacion" style="display:inline; margin-top:10px; margin-right:18px;">Observación: </label>
                <textarea id="txt_Observacion" style="height:60px; width:750px;" class="span8" disabled="disabled"></textarea>
            </div>
        </div>
        </div>
        <div class="pie_gris">
            <div class="pull-right" style="margin-bottom:5px;">
              <a id="btnCancelar" class="btn btn-danger"><i class="icon-remove-circle icon-white"></i>&nbsp;Cancelar</a>
              <a id="btnConfirmar" class="btn btn-info"><i class="icon-ok icon-white"></i>&nbsp;Guardar</a>
              <a id="btnBuscar" class="btn"><i class="icon-search"></i>&nbsp;Buscar</a>
              <a id="btnImprimir" class="btn btn-info" style="display:none;"><i class="icon-print icon-white"></i>&nbsp;Imprimir</a>
            </div>
        </div>

      </div>
  </div>
</div>

<!--Pie de p�gina-->
<script type="text/javascript" src="../js/jquery-1.8.3.js"></script> 
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/Hospitales/AtInternados/InterconsultasDireccion.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Interconsultas Dirección</strong>";
</script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</body>
</html>

