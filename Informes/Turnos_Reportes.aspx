<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Turnos_Reportes.aspx.cs" Inherits="Informes_Turnos_Reportes" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
    
</script> 
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"></div>
<form id="form1" class="form-horizontal">
<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="height:400px; width:90%; margin-left:5%;"> <div class="titulo_seccion">
      <span id="titulo"></span></div>
      <form class="form-horizontal">
       <div id="controlcbo_Listado" class="control-group" style="display:none;">
                  <label class="control-label" for="cbo_Listado">Listado</label>
                  <div class="controls">
                      <select id="cbo_Listado" class="span4" style="width:290px;">
                        <option value="">Seleccione Listado...</option>
                        <option value="1">Horarios Médicos</option>
                        <option value="2">Turnos Disponibles</option>
                        <option value="3">Ocupación de Consultorios</option>
                      </select>          
                   </div>
        </div>
        <div id="controlcbo_Orden" class="control-group" runat="server" style="display:none;">
                  <label class="control-label" for="cbo_Orden">Ordenado por</label>
                  <div class="controls">
                      <select id="cbo_Orden">
                        <option value="">Seleccione Listado...</option>
                        <option value="1">Especialidad</option>
                        <option value="2">Médico</option>
                      </select>          
                   </div>
        </div>
        <div id="controlTurnosDisp" style="display:none;" runat="server">
        <div class="control-group">
            <label class="control-label" for="cbo_Especialidad">Especialidad</label>
                  <div class="controls">
                      <select id="cbo_Especialidad">
                      </select>          
                  </div>
        </div>
                <div id="ControlFechas" class="control-group" runat="server">
                    <label class="control-label" for="txtFechaInicio">
                        Desde</label>
                    <div class="controls">
                        <input id="txtFechaInicio" type="text" class="date input-small">
                        <span for="txtFechaFin">Hasta</span>
                        <input id="txtFechaFin" type="text" class="date input-small">
                    </div>
                </div>
                <div id="controlchkDetallado" class="control-group" runat="server">
                    <label class="control-label" for="chkDetallado">
                        Detallado</label>
                    <div class="controls">
                        <input type="checkbox" id="chkDetallado" class="checkbox" />
                    </div>
                </div>
        </div>
        <div id="controlConsultoriosDiv" style="display:none;" runat="server">
                <div class="control-group" style="width: 40%; margin-left:95px; display:block;">
                    <label>Consultorios</label>
                    <div class="check_todos">
                            <label class="checkbox">
                                <input onclick="Ft(0)" id="cbo_Todos" type="checkbox" value="0" CHECKED />Marcar todos
                            </label>
                            <label class="checkbox">
                                <input onclick="Fdes(0)" id="cbo_DesTodos" type="checkbox" value="0"/>Desmarcar todos
                            </label>
                     </div>
                         <div class="filtro_datos" style="width:98%; height:130px;">                                                        
                             <div id="FiltroPracticas" style="float: left;">
                             </div>
                         </div>                                                        
                     </div>
                    <div class="control-group">
                    <label class="control-label" for="cbo_Dias">Días</label>
                      <div class="controls">
                              <select id="cbo_Dias">
                                <option value="-1">Todos</option>
                                <option value="1">Lunes</option>
                                <option value="2">Martes</option>
                                <option value="3">Miércoles</option>
                                <option value="4">Jueves</option>
                                <option value="5">Viernes</option>
                                <option value="6">Sábado</option>
                                <option value="0">Domingo</option>
                              </select>          
                       </div>
                    </div> 

        </div>
      </form>
      <div class="control-group pagination-centered">
          <div> 
                <a id="btnExcel" class="btn"><i class="icon-file"></i>&nbsp;Buscar(Excel)</a>
                <a id="btnImprimir" class="btn"><i class="icon-print"></i>&nbsp;Buscar(PDF)</a> 
                
                <a id="btnVolver" class="btn btn-info"  href="../Informes/ReportesDeTurnos.aspx?tipodeInforme=3"><i class=" icon-arrow-left"></i>&nbsp;Volver</a> 
          </div>
       
          
      
       </div>
    </div>
    <div class="clearfix"></div>

</div>
</form>
<!--Pie de pagina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/Hospitales/Informes/Turnos_Reportes.js" type="text/javascript"></script>
<!--Barra sup--> 

</body>
</html>
