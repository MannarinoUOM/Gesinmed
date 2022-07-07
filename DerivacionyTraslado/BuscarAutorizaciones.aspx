<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarAutorizaciones.aspx.cs" Inherits="DerivacionyTraslado_BuscarAutorizaciones" %>

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

      <div class="container" style="padding-top: 30px; width:80%">
      <input type="hidden" id="afiliadoId"/>
      <div class="contenedor_1">
                      <div class="resumen_datos" style="height: 80px;">
                    <!--Datos del paciente-->
                    <div class="datos_paciente">
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
                    </div>
                    <!--Datos del medico-->

                    <div class="clearfix">
                    </div>
                </div>
                 <div class="contenedor_3" style="width:97%; position:relative">
               <div class="contenedor_1" style="width:97%; position:relative; margin-bottom:6px; height:200px; margin-left:auto; margin-right:auto">
               <div class="container" style="width:97%; overflow:auto">
             <div class="modal-backdrop" style="width:97%; height:25px; background-position:center; position:static; background-color:Black; margin-left:2%; border-top-right-radius:10px; border-top-left-radius:10px">
            <label class="check inline" style="width:3%"></label>
            <label class="check inline" style="width:6%"><strong style="color:White; text-align:center">Número</strong></label>
            <label class="check inline" style="width:6%; text-align:center"><strong style="color:White">Fecha</strong></label>
            <label class="check inline" style="width:40%"><strong style="color:White">Comentarios</strong></label>
            <label class="check inline" style="width:35%"><strong style="color:White">Especialidad</strong></label>
            <label class="check inline" style="width:10%"><strong style="color:White">Adjuntos</strong></label>
            </div> 

               <div class=" contenedor_4" style="width:97%; height:182px;overflow:auto; border-top-right-radius:0px; border-top-left-radius:0px">

               <table id="TablaBusqueda" class="table table-condensed table-hover" style="height:10%">
               <thead>
               <tr>
               <td></td>
               </tr>
               </thead>
               </table>
               </div>
              </div>
               </div>
                     <div style="padding: 0px 15px 0px 15px;">
                     </div>
                    <div class="clearfix">
                    </div>
                  <div class="contenedor_1" style="width:97%; position:relative; margin-bottom:6px; height:120px; margin-left:auto; margin-right:auto">
               <div class="container" style="width:97%; overflow:no">
             <div class="modal-backdrop" style="width:100%; height:25px; background-position:center; position:inherit; background-color:Black; margin-left:auto; margin-right:auto;  border-top-left-radius:10px ; border-top-right-radius:10px">
            <label class="check inline" style="width:2%"></label>
            <label class="check inline" style="width:6%"><strong style="color:White">Código</strong></label>
            <label class="check inline" style="width:26%"><strong style="color:White; text-align:center">Descripción</strong></label>
            <label class="check inline" style="width:26%"><strong style="color:White">Tipo</strong></label>
            <label class="check inline" style="width:25%"><strong style="color:White">Prestador</strong></label>
            <label class="check inline" style="width:8%"><strong style="color:White">Cantidad</strong></label>
            <label class="check inline" style="width:6%"><strong style="color:White">Importe</strong></label>
            <%--<label class="check inline" style="width:8%"><strong style="color:White">Cantidad</strong></label><label  class="check inline" style="width:8%"><strong style="color:White">Importe</strong></label>--%>
            </div> 
             <div class=" contenedor_4" style="width:100%; height:100px;overflow:auto; margin-left:0px; border-top-left-radius:0px ; border-top-right-radius:0px">
               <table id="TablaDetalle" style="width:100%" class="table table-condensed">
               <thead>
               <tr>
               <td></td>
               </tr>
               </thead>
               </table>
               </div>
               </div> 
               </div>
                     
                           <div class="pie_gris">                                                    
                           <table style="width:99%; margin-left:1.5%; margin-right:1.5%">
                           <thead>
                           <tr>
                             <td style="width:10%"><button id="btnVolver" class="btn btn-info pull-left" style=" text-align:left">
                               <i class=" icon-arrow-left icon-white"></i>&nbsp;Volver</button></td>

                                 
                                   <td style="width:25%"><button id="BtnBorrar" class="btn btn-danger pull-left" style="text-align:center">
                                    <i class=" icon-remove-circle icon-white"></i>&nbsp;Borrar</button>
                                 </td>

                                 <td style="width:10%"><input id="txtNumeroCarga" class=" input-medium" type="text" style="text-align:center; margin-bottom:0px" placeholder="Nº de carga"/>
                                 </td>

                                   <td style="width:10%"><button id="BtnBuscar" class="btn" style="text-align:center">
                                    <i class=" icon-search icon-black"></i>&nbsp;Buscar</button>
                                 </td>

                                <td style="width:55%"><button id="btnPlantilla" class="btn btn-success pull-right" style="text-align:right; margin-left:1%">
                                <i class=" icon-ok icon-white"></i>&nbsp;Actualizar</button>
                                
                                <button id="BtnVerAutorizacionDetalle" class="btn btn-success pull-right" style="text-align:right">
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
    <script src="../js/Hospitales/DerivacionyTraslado/buscarAutorizacion.js" type="text/javascript"></script>
