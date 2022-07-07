    <%@ Page Language="C#" AutoEventWireup="true" CodeFile="Buscar_Derivacion_y_Traslado.aspx.cs" Inherits="DerivacionyTraslado_Buscar_Derivacion_y_Traslado" %>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

    <html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        <title>Gestión Hospitalaria</title>
        <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="../css/barra.css" />
        <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
        <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
        <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
    <div class="container" style="padding-top: 30px; width:80%; height:97%">
    <%--      <div class="contenedor_1">--%>
    <%--                      <div class="resumen_datos" style="height: 80px;">
                        <!--Datos del paciente-->
    <%--                    <div class="datos_paciente">
                            <div>
                                <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
                            <div class="datos_resumen_paciente">
                                <div>
                                    Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                                <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                                <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                                <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                                <div>
                                    <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>                                
                                </div>
                                <div>
                                    <span id="span_Discapacidad" style=" color:#FFFF00; font-weight:bold;"></span>
                                    <span id="span_Estudiante"></span>
                                </div>
                            </div>
                        </div>--%>
                        <!--Datos del medico-->

           <%--             <div class="clearfix">
                        </div>
                    </div>--%>
                   <div class="contenedor_3" style="width:97%; height:536px; position:relative; padding-top:9px">
                   <div class="contenedor_1" style="width:97%; position:relative; margin-bottom:6px; height:32%; margin-left:auto; margin-right:auto; padding-bottom:8px; padding-top:8px">
                <div class="container" style="width:97%; height:97%; overflow:no">

                <div class="modal-backdrop" style="width:97%; height:25px; background-position:center; position:static; background-color:Black; margin-left:2%; border-top-left-radius:10px; border-top-right-radius:10px;">
                <label class="check inline" style="width:2%"></label>
                <label class="check inline" style="width:12%"><strong style="color:White">Fecha Ingreso</strong></label>
                <label class="check inline" style="width:8%"><strong style="color:White; text-align:center">Hora</strong></label>
                <label class="check inline" style="width:30%"><strong style="color:White">Apellido Nombre</strong></label>
                <label class="check inline" style="width:20%"><strong style="color:White">Origen</strong></label>
                <label class="check inline" style="width:20%"><strong style="color:White">Destino</strong></label>
                <label class="check inline" style="width:8%"><strong style="color:White">Estado</strong></label>
                </div> 

                   <div class=" contenedor_migue_2" style="width:97%; height:86%;overflow:auto; border-top-left-radius:0px; border-top-right-radius:0px">

                   <table id="TablaBusqueda" class="table table-condensed table-hover" style="height:10%">

                   </table>
                   </div>
                  </div>
                   </div>
                         <div style="padding: 0px 15px 0px 15px;">
                         </div>
                        <div class="clearfix">
                        </div>
                      <div class="contenedor_1" style="width:97%; position:relative; margin-bottom:6px; height:56%; margin-left:auto; margin-right:auto">
                   <div class="container" style="width:97%; height:99%; overflow:no">
     
                 <%--<div class=" contenedor_4" style="width:97%; height:67%;overflow:auto; margin-left:auto; margin-right:auto">--%>
                   <table id="TablaDetalle" style="width:98%; margin-left:auto; margin-right:auto; margin-bottom:5px">
                   <tr>
                   <td><label style="display:inline" for="rdoAmbos"><strong>Ambos </strong></label><input id="rdoAmbos" type="radio" name="donde" checked="checked"/></td>
                   <td><label style="display:inline" for="rdoDesde"><strong>Desde el Policlínico </strong></label><input  id="rdoDesde" type="radio" name="donde"/></td>
                   <td><label style="display:inline" for="rdoHasta"><strong>Hasta el Policlínico </strong></label><input  id="rdoHasta" type="radio" name="donde"/></td>
                   <td><label style="display:inline" ><strong>Desde </strong></label><input  id="TxtDesde" type="text"  style="width:75px; text-align:center" class="fechas"/></td>
                   <td><label style="display:inline"><strong>Hasta </strong></label><input id="txtHasta" type="text"  style="width:75px; text-align:center" class="fechas"/></td>
                   <td style="text-align:right"><label style="display:inline"><strong>Nro Hc </strong></label><input id="txtHC" type="text" class="input-medium numero" style="text-align:center" maxlength="20"/></td>
                   </tr>
                   </table>


                    <table id="Table1" style="width:98%; margin-left:auto; margin-right:auto; margin-bottom:5px">
                   <tr>
                   <td style="width:127px"><label style="display:inline"><strong>Centro Origen </strong></label></td> <td><select id="cboCentroOrigenDYT"></select></td>
                   <td style="width:97px; text-align:right"><label style="display:inline; width:100px"><strong>Esp Origen</strong></label></td> <td><select id="cboEspecialidadOrigenDYT" style="width:200px"></select></td>
                   <td style="width:101px"><label style="display:inline; width:100px"><strong>Solicitado Por</strong></label></td> <td><select id="cboSolicitadoDYT" style="width:200px"></select></td>
                   </tr>
                   </table>

                   <table id="Table2" style="width:98%; margin-left:auto; margin-right:auto; margin-bottom:5px">
                   <tr>
                   <td style="width:127px"><label style="display:inline"><strong>Centro Destino </strong></label></td> <td><select id="cboCentroDestinoDYT"></select></td>
                   <td style="width:101px; text-align:right"><label style="display:inline"><strong>Esp Destino </strong></label></td> <td><select id="cboEspecialidadDestinoDYT" style="width:200px"></select></td>
                   <td style="width:101px"><label style="display:inline"><strong>Méd Destino </strong></label></td> <td><select id="cboMedicoDestinoDYT" style="width:200px"></select></td>
                   </tr>
                   </table>

                   <table id="Table3" style="width:98%; margin-left:auto; margin-right:auto; margin-bottom:5px">
                   <tr>
                   <td style="width:127px"><label style="display:inline"><strong>Trasladado Por </strong></label></td> <td><select  id="cboTrasladadoDYT"style="width:90%"></select></td>
                   <td><label style="display:inline"><strong>Prestación </strong></label></td> <td><select id="cboPrestacionDYT" style="width:295px"></select></td>
                   </tr>
                   <tr>
                   <td><label style="display:inline"><strong>Seguimiento De </strong></label></td> <td><select  id="cboSeguimientoDYT"style="width:90%"></select></td>
                   <td><label style="display:inline"><strong>Rechazos </strong></label></td> <td><select id="cboRechazosDYT"></select></td>
                   </tr>
                   <tr>
                   <td><label style="display:inline"><strong>Estado </strong></label></td> <td><select id="cboEstadoDYT"></select></td>
                   <td></td>
                   </tr>
                   </table>

                   <table id="Table4" style="width:98%; margin-left:auto; margin-right:auto">
                   <tr>
                   <td style="width:32.5%"><label style="display:inline"><strong>Informe Agrupado </strong></label>
                   <select  id="cboAgrupadoDYT" style="width:60%">
                   <option value="0">Seleccione</option>
                   <option value="1">Trasladado Por</option>
                   <option value="2">Estado</option>
                   <option value="3">Seguimiento De</option>
                   <option value="4">Centro de Destino</option>
                   <option value="5">Centro de Origen</option>
                   <option value="6">Presentación</option>
                   <option value="7">Rechazos</option>
                   </select>
                   </td>
                    <td style="width:50%">
                   <button id="BtnImprimirDYT" class="btn btn-info pull-left" style="text-align:center; margin-bottom:10px"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
                   <label style="display:none" for="chkDetalleDYT"><strong>Con Detalle </strong></label><input  id="chkDetalleDYT" type="checkbox" style="display:none"/>
                   </td>
                   </tr>
                   </table>
             <%-- </div>--%>
                  </div> 
                   </div>

                               <div class="pie_gris">                                                    
                               <table style="width:99%; margin-left:1.5%; margin-right:1.5%">
                               <thead>
                               <tr>
                                 <td style="width:10%"><button id="btnVolverDYT" class="btn btn-info pull-left" style=" text-align:left">
                                   <i class=" icon-arrow-left icon-white"></i>&nbsp;Volver</button></td>

                                     <td style="width:10%">
                               <%--      <button id="BtnImprimirDYT" class="btn btn-info pull-left" style="text-align:center">
                                        <i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>--%>
                                     </td> 
                                    <td style="width:20%"><button id="BtnBorrarDYT" class="btn btn-danger" style="text-align:center; display:none">
                                        <i class=" icon-remove-circle icon-white"></i>&nbsp;Borrar</button>
                                     </td>

                                      <td style="width:30%"><button id="BtnBuscarDYT" class="btn pull-right" style="text-align:center">
                                        <i class=" icon-search icon-black"></i>&nbsp;Buscar</button>
                                     </td>

                                    <td style="width:10%"><button id="btnPlantillaDYT" class="btn btn-success pull-right" style="text-align:right; display:none">
                                    <i class=" icon-ok icon-white"></i>&nbsp;Generar Nueva Solicitud a Partir de...</button>
                                    
                                    <button id="btnVer" class="btn btn-success pull-right" style="text-align:right">
                                    <i class=" icon-eye-open icon-white"></i>&nbsp;Ver</button>
                                    </td>
                                    </tr>
                                    </thead>
                                    </table>
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
        <script src="../js/Hospitales/DerivacionyTraslado/buscarDYT.js" type="text/javascript"></script>
