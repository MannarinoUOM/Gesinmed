<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Internaciones_AmbulatorioSN.aspx.cs" Inherits="Internacion_Internaciones_AmbulatorioSN" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Ingresos Ambulatorios</strong>";
     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div id="Inicio" class="contenedor_bono" style="height:420px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Datos del paciente</span></div>
                <form class="form-horizontal">
                <div class="control-group">
                    <label class="control-label">
                        DNI</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" placeholder="Ingrese el DNI sin puntos">
                        <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
                        <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" type="text" placeholder="Ej: 99123456789">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtPaciente">
                        Paciente</label>
                    <div class="controls">
                        <input id="txtPaciente" placeholder="Apellido Nombre" type="text" class="span3">
                        <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black">
                        </i></a>
                    </div>
                </div>
                <div id="controlTelefono" class="control-group">
                    <label class="control-label">
                        Teléfono</label>
                    <div class="controls">
                        <input id="txtTelefono" maxlength="13" placeholder="Ej. 43625910" type="text">
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
                </form>
                <div class="control-group">
                    <div class="controls pagination-centered">
                        <a id="btnBuscar" class="btn" href="BuscarInternacion_Ambulatoria_SN.aspx">Buscar Ambulatorios</a>
                        <a id="btnModificar" style="display: none;" class="btn btn-info"><span id="btnModificar_nombre">Opciones</span></a>    
                        
                    </div>
                    <div class="controls pagination-centered">
                        
                        <a id="desdeaqui" style="display: none; margin-top:5px;" class="btn btn-success"><span id="desdeaqui_nombre">Siguiente</span></a>
                    </div>
                </div>
            </div>
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: none;">
                <div class="resumen_datos">
                    <!--Datos del paciente-->
                    <div class="datos_paciente">
                        <div>
                            <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span>(<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                            <div>
                                <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>
                            </div>
                        </div>
                    </div>
                    <!--Datos del medico-->
                    <div id="Datos_Medicos" class="datos_medico">
                        <div class="datos_resumen_paciente">
                            <div>
                                Nro. Internación: <strong><span id="NroInternacion"></span></strong>
                            </div>
                            <div style="margin-top: 5px;">
                                Fecha: <strong><span id="FechaInternacion">
                                    <input id="txtFechaInternacion" type="text" style="background: black; width: 90px;
                                        color: White; border: 0;" />
                                </span></strong><span>Hora: <strong><span id="HoraInternacion">
                                    <input id="txtHoraInternacion" type="text" class="span1" style="background: black;
                                        color: White; border: 0;" />
                                </span></strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
                    </div>
                </div>
                <div class="contenedor_3" style="height:280px; margin-bottom:10px;">
                    <div id="pServicio">
                    </div>
                    <div class="titulo_seccion">
                        <img src="../img/2.jpg" />&nbsp;&nbsp;<span>Servicio</span></div>
                    <!--Tabla de estudios-->
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaServicio" class="tabla" style="height: 192px; width: 870px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Servicios
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        </form>
                    </div>
                    <div class="clearfix">
                    </div>
                    <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
                        <div class="pull-right" style="padding: 5px">
                            <a onclick="Vl('Inicio')" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                        </div>
                    </div>
                </div>
                <div class="clearfix">
                </div>
                <div class="contenedor_3" style="height:280px; margin-bottom:10px;">
                    <div id="pSala">
                    </div>
                    <div class="titulo_seccion">
                        <img src="../img/3.jpg" />&nbsp;&nbsp;<span>Sala</span></div>
                    <!--Tabla de estudios-->
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaSalas" class="tabla" style="height: 192px; width: 870px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Sala
                                        </th>
                                        <th>
                                            Libre
                                        </th>
                                        <th>
                                            Ocupada
                                        </th>
                                        <th>
                                            Total
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        </form>
                    </div>
                    <div class="clearfix">
                    </div>
                    <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
                        <div class="pull-right" style="padding: 5px">
                            <a onclick="Vl('pServicio')" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                        </div>
                    </div>
                </div>
                <div class="contenedor_3" style="height:280px; margin-bottom:10px;">
                    <div id="pCama">
                    </div>
                    <div class="titulo_seccion">
                        <img src="../img/4.jpg" />&nbsp;&nbsp;<span>Cama</span></div>
                    <!--Tabla de estudios-->
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaCama" class="tabla" style="height: 192px; width: 870px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            Cama
                                        </th>
                                        <th>
                                            Paciente
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        </form>
                    </div>
                    <div class="clearfix">
                    </div>
                    <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
                        <div class="pull-right" style="padding: 5px">
                            <a onclick="Vl('pSala')" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div id="ModalError" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <h3 id="myModalLabel">
                Error en Turno</h3>
        </div>
        <div class="modal-body">
            <p>
                <span id="DialogoError"></span>
            </p>
        </div>
        <div class="modal-footer">
            <button id="CerrarError" class="btn" data-dismiss="modal" aria-hidden="true">
                Cerrar</button>
        </div>
    </div>
    <div id="InternacionModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true" style="width:650px;">
        <div class="modal-header">
            <div class="resumen_datos">
                <div class="datos_persona">
                    <div>
                        <img id="ImgPacienteMini" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img>
                    </div>
                    <div class="datos_resumen_paciente">
                        <div>
                            Paciente: <strong><span id="lblNombre"></span></strong><span>&nbsp;NHC: <strong><span id="lblNHC">
                                </span></strong></span>
                        </div>
                        <div>
                            <span><b>Fecha:</b> <input type="text" id="lblFecha" name="lblFecha" style="width:72px; height:16px;"/>&nbsp;&nbsp; Hora: 
                            <input type="text" id="lblHora" name="lblHora" style="width:36px; height:16px;"/></span>
                        </div>
                        <div>
                            <span><span id="lblServicio_c"><strong></strong></span>
                                <span id="lblSala_c"><strong></strong></span><b></b><span id="lblCama_c">
                                    <strong></strong></span><a id="btnCambiar" class="btn btn-mini" style="display:none;">Cambiar</a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ul class="nav nav-tabs" data-tabs="tabs">
                    <li style="display:none;"><a data-toggle="tab" href="#Principal">Internación</a></li>
                    <li class="active" id="li_preImpresos"><a data-toggle="tab" href="#PreImpresos">Pre Impresos</a></li>
                    <li style="display:none;"><a data-toggle="tab" href="#otros">Otros</a></li>
                </ul>
            </div>
            <div id="my-tab-content" class="tab-content">
                <div class="tab-pane fade in" id="Principal">
                    <div>
                        <div class="titulo_datos">
                            <strong>Diagnostico Presuntivo</strong></div>
                    </div>
                    <form class="form-inline">
                    <div>
                        <span>Hosp. Por:</span><select id="cbo_Hospor" class="span2" style="width:180px;"></select>
                        <span>Motivo:</span><select id="cbo_Motivo" class="span2" style="width:180px;"></select>
                    </div>
                    </form>
                    <form class="form-inline">
                    <input id="txtDiagnostico" type="text" style="width: 90%;" placeholder="Diagnostico">
                    </form>
                    <form class="form-inline">
                    <span>Especialidad:</span><select id="cbo_Especialidad" class="span2" style="width:180px;"></select>
                    <span>Médico:</span><select id="cbo_Medico" class="span2" style="width:180px;"></select>
                    </form>
                    <form class="form-inline">
                    <input id="txtObservaciones" type="text" style="width: 90%;" placeholder="Observaciones">
                    </form>
                </div>

                <div class="tab-pane active fade in" id="PreImpresos">
                    <div>
                        <span>Seleccione Formulario:</span>
                        <select id="cbo_PreImp" class="span3">
                            <option value="3" selected>Informe de Hospitalización</option>
                        </select>
                       <a id="btnAceptarPre" class="btn btn-info" aria-hidden="true">Imprimir</a>
                    </div>
                </div>


                <div class="tab-pane fade" id="otros">
                <div>
                        <span>Teléfono Habitación:</span><input id="txtFelefono" type="text" class="span3" placeholder="Teléfono">
                        <div id="Aislar">
                            <span>Estado Actual:</span><a id="btnAislar" class="btn btn-mini"> Disponible </a>
                            <span>Motivo:</span><input id="txt_Motivo" type="text" class="span3" maxlength="200" placeholder="Motivo">
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer">
            <a class="btn" id="btnVerEvolucion" style="display: none;">Ver Evolución</a> <a id="Cerrar" class="btn" href="BuscarInternacion_Ambulatoria_SN.aspx" aria-hidden="true">Volver</a> 
            <a id="btnGuardarInternacion" class="btn btn-info" data-dismiss="modal" aria-hidden="true" style="display:none;">Guardar Internación</a>
            <a id="btnEliminarInternacion" class="btn btn-danger">Eliminar Ambulatorio</a>
            <a id="btnDatosAcom" class="btn" style="display:none;">Acompañante</a>
        </div>
    </div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/Hospitales/ObraSociales/ObraSociales.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>
    
    <script src="../js/Hospitales/Internacion/Internacion_AmbulatorioSN.js" type="text/javascript"></script>

    <script>





        $('#uom_boton').toggle(
   function () {
       $('#barra_sup').animate({ top: "-93" }, 200);
       $('#lightbox').fadeOut(200);

   },
   function () {
       $('#barra_sup').animate({ top: "0" }, 200);
       $('#lightbox').fadeIn(200);
       $('#lightbox').height($('html').height());


   });

    </script>
</body>
</html>
