<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarEstudiosAltaComplejidad.aspx.cs" Inherits="AtConsultorio_BuscarEstudiosAltaComplejidad" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Buscar Ordenes de Estudio de Alta Complejidad</strong>";
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px; width:800px;">
        <div class="contenedor_1 pagination-centered" style="height:450px;">
            <div class="contenedor_a" style="height:400px;">
                <div class="titulo_seccion">
                    &nbsp;&nbsp;<span>Búsqueda de Ordenes de Estudio de Alta Complejidad</span></div>
                <div class="minicontenedor100">
        
        <form class="form-inline" style="margin: 0px">                    
                    <div id="ControltxtNHC" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Nro. NHC:</span>
                            <input class="span2" maxlength="11" id="txtNHC" type="text" style="width:150px;">
                     </div>
                  
                    <div id="ControltxtAfiliado" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Afiliado:</span>
                            <input class="span3" maxlength="60" id="txtAfiliado" type="text" style="width:260px;">
                     </div>
         </form>               
                  <div class="clearfix"></div>
         <br />
                       
                        <div class="clearfix"></div>
                 <form class="form-inline" style="margin: 0px">                    
                    <div id="ControltxtFechaInicio" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Fecha Desde:</span>
                            <input class="span2" id="txtFechaInicio" maxlength="10" type="text">
                     </div>

                     <div id="ControltxtFechaFin" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Fecha Hasta:</span>
                            <input class="span2" id="txtFechaFin" maxlength="10" type="text">
                     </div>

                     <div>&nbsp;&nbsp;&nbsp;<a id="btnBuscar" class="btn btn-info" href="#" data-backdrop="static" role="button" data-toggle="modal">
                            <i class=" icon-search icon-white"></i>&nbsp;Buscar</a>
                            <a id="btnVolver" class="btn">
                            <i class=" icon-arrow-left" icon-white"></i>&nbsp;Volver</a>
                      </div>

         </form>    
         
         <div class="clearfix"></div>
               
                </div>
                <div id="Resultado" class="tabla" style="height: 250px; width: 98%; margin-left: 1%">
                    <table id="TablaMedicos" class="table table-hover table-condensed" style="height:250px;">
                        <thead>
                            <tr>
                                <th>
                                    Fecha
                                </th>
                                <th>
                                    Nro. HC
                                </th>
                                <th>
                                    Paciente
                                </th>
                                 <th>
                                    Médico
                                </th>                                   
                            </tr>
                        </thead>                        
                <tbody id="TablaResultado">
                </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
    <!-- Modal -->

    <!--Pie de p?gina-->
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AtConsultorio/BuscarEstudiosAltaComplejidad.js" type="text/javascript"></script>
    <!--Barra sup-->
    <script type="text/javascript">
        $('#desdeaqui').click(function () {
            $("#hastaaqui").fadeIn(1500);
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
            $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
            $('#cbo_Especialidad').focus();
        });
    </script>
</body>
</html>
