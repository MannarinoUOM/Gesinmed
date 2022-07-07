<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Reporte_Hc_Supreme.aspx.cs" Inherits="Informes_Reporte_Hc_Supreme" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />

</head>
<body>
<div id="lightbox" style="display:none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top:0px; width:95%">
        <div class="contenedor_1" style="width:90%; height:600px; padding-top:10px;margin-left:auto; margin-right:auto; display:block" id="derivaciones">
            <div id="primero" class="contenedor_bono" style="height:370px; margin-left:30%">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg"  style="display:none"/>&nbsp;&nbsp;<span id="titulo" style=" text-align:center; display:block"></span></div>
                <form class="form-horizontal" style="margin-top:20px">
                <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC">
                      </select>          
                   </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        N°</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" placeholder="Nro. de documento sin puntos"  tabindex="1"/>
                        <input id="txtdocumento" type="hidden" />
                        <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
                        <input id="documentoImp" value="" class="ingreso" type="hidden"/>
                        <input id="discapacidad_val" value="" type="hidden"/>
                        <input id="verificarPMI" value="" type="hidden"/>
                        <input id="PMI_val" value="" type="hidden"/>
                        <input id="discapacidad_paga" value="" type="hidden"/>
                        <input id="discapacidad_paga2" value="" type="hidden"/>
                        <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
                        <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" type="text" placeholder="Ej: 99123456789"  tabindex="2"/>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtPaciente">
                        Paciente</label>
                    <div class="controls">
                        <input id="txtPaciente" placeholder="Apellido Nombre" type="text" class="span3"  tabindex="3"/>
                        <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn" style="display:inline"><i class="icon-search icon-black">
                        </i></a>
                    </div>
                </div>

        <div id="controlSeccional" class="control-group">
        
          <label class="control-label" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" />
          
              <select id="cboSeccional">
                <option value="0">Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" style="display:none;"></select>          

           </div>

        </div>
        
      
                <div class="control-group">
                    <div class="controls"> 
                        <a class="btn btn-danger"  id="btnCancelarPedidoTurno" style="display: none;">
                            Otro Paciente</a> <a class="btn" id="btnactualizar" style="display: none;">Actualizar</a>
                        <a id="desdeaqui" style="display: none;" class="btn btn-info">Siguiente</a>
                    </div>
                </div>
            </div>



            <div class="contenedor_1" style="width:90%; height:600px; padding-top:10px;margin-left:auto; margin-right:auto; display:inline" id="Div1">
            <div id="segundo" class="contenedor_bono" style="height:485px; margin-left:30%; display:none; padding-top:0px; padding-bottom:0px">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg"  style="display:none"/>&nbsp;&nbsp;<span id="Span1" style=" text-align:center; display:block">Ficha de Consumo</span></div>
<%--                <form class="form-horizontal" style="margin-top:20px">--%>
        
        <div id="tipo" class="control-group"  style="text-align:center">
        
          
          <div class="controls">
<%--              <label class="control-label" id="lblTipo" style="display:inline">Tipo</label>    --%>  
               <div style="height:245px; overflow:auto; margin:auto; width: 70%" class=" contenedor_migue">
               <table style="width:100%">
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkTodos">Todos</label></td><td style="text-align:left"><input id="checkTodos" type="checkbox" checked="checked"  style="margin-left:2px; height:80%; width:20%" class="todos sel"/></td></tr>
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkInternaciones">Internaciones</label></td><td style="text-align:left"><input id="checkInternaciones" type="checkbox" style="margin-left:2px; height:80%; width:20%"  class="opcion sel"/></td></tr>
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkCirugias">Cirugias</label></td><td style="text-align:left"><input id="checkCirugias" type="checkbox" style="margin-left:2px; height:80%; width:20%" class="opcion sel"/></td></tr>
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkInterconsultas">Interconsultas</label></td><td style="text-align:left"><input id="checkInterconsultas" type="checkbox" style="margin-left:2px; height:80%; width:20%" class="opcion sel"/></td></tr>
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkMH">Medicación Hospitalaria</label></td><td style="text-align:left"><input id="checkMH" type="checkbox" style="margin-left:2px; height:80%; width:20%" class="opcion sel"/></td></tr>
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkCA">Consultas Ambulatorio</label></td><td style="text-align:left"><input id="checkCA" type="checkbox" style="margin-left:2px; height:80%; width:20%" class="opcion sel"/></td></tr>
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkAL">Análisis de Laboratorio</label></td><td style="text-align:left"><input id="checkAL" type="checkbox" style="margin-left:2px; height:80%; width:20%" class="opcion sel"/></td></tr>
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkDI">Diagnóstico por Imágenes</label></td><td style="text-align:left"><input id="checkDI" type="checkbox" style="margin-left:2px; height:80%; width:20%" class="opcion sel"/></td></tr>
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkEndoscopia">Endoscopía</label></td><td style="text-align:left"><input id="checkEndoscopia" type="checkbox" style="margin-left:2px; height:80%; width:20%" class="opcion sel"/></td></tr>
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkAP">Anatomía Patológica</label></td><td style="text-align:left"><input id="checkAP" type="checkbox" style="margin-left:2px; height:80%; width:20%" class="opcion sel"/></td></tr>
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkAG">Atención en Guardia</label></td><td style="text-align:left"><input id="checkAG" type="checkbox" style="margin-left:2px; height:80%; width:20%" class="opcion sel"/></td></tr>
               <tr><td style="text-align:right; width:60%"><label style="margin-bottom:0px; font-size:medium" for="checkMA">Medicación Ambulatoria</label></td><td style="text-align:left"><input id="checkMA" type="checkbox" style="margin-left:2px; height:80%; width:20%" class="opcion sel"/></td></tr>
               </table>
                </div>        
       
           </div>

        </div>

           <div id="controlDesde" class="control-group" style="text-align:center">
        
          
          <div class="controls">
<label class="control-label"  style="display:inline">Desde</label>
                <input type="text" id="txtDesde"  class="fecha"/>
           </div>

        </div>

          <div id="controlHasta" class="control-group" style="text-align:center">     
          
        <div class="controls" style="display:inline">
        <label class="control-label"  style="display:inline; margin-left:6px">Hasta</label>
              <input type="text"" id="txtHasta" class="fecha"/>          
              </div>
           </div>

        
      
                <div class="control-group" style="text-align:center">
                    <div class="controls"> 
                        <a class="btn btn-danger"  id="btnOtroPaciente2">
                            Cancelar</a> 
                        <a id="btnBuscar" class="btn btn-info">Buscar</a>
                    </div>
                </div>
            </div>
            </div>
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
<script src="../js/Hospitales/Informes/Supreme_HC.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
