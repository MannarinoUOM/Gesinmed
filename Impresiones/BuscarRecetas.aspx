<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarRecetas.aspx.cs" Inherits="AtConsultorio_BuscarRecetas" %>


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
        parent.document.getElementById("DondeEstoy").innerHTML = "Turnos > <strong>Médicos</strong>";
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px; width:800px;">
        <div class="contenedor_1 pagination-centered" style="height:400px;">
            <div class="contenedor_a" style="height:350px;">
                <div class="titulo_seccion">
                    &nbsp;&nbsp;<span>Busqueda de Recetas</span></div>
                <div class="minicontenedor100">
        
        <form class="form-inline" style="margin: 0px">                
            
                    <div id="ControltxtImporteReal" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Nro. NHC:</span>
                            <input class="span2" maxlength="11" id="txtNHC" type="text">
                     </div>
                  
                    <div id="ControltxtAfiliado" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Afiliado:</span>
                            <input class="span4" maxlength="50" id="txtAfiliado" type="text">
                     </div>
         </form>               
                  <div class="clearfix"></div>               
         <br />
        
                        <div class="clearfix"></div>
                 <form class="form-inline" style="margin: 0px">                    
                           
                     <div id="Div3" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Fecha Ingreso:</span>
                     </div>

                    <div id="ControltxtFechaInicio" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Fecha Desde:</span>
                            <input class="span2" id="txtFechaInicio" maxlength="10" type="text">
                     </div>

                     <div id="ControltxtFechaFin" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Fecha Hasta:</span>
                            <input class="span2" id="txtFechaFin" maxlength="10" type="text">
                     </div>


         </form>    
                           <div class="clearfix"></div>
               
         <br />                    
                        <div class="clearfix"></div>
                 <form class="form-inline" style="margin: 0px">                    

                 <div id="Div4" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Fecha Entrega:</span>
                     </div>

                    <div id="Div1" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Fecha Desde:</span>
                            <input class="span2" id="txtFechaInicioEntregado" maxlength="10" type="text">
                     </div>

                     <div id="Div2" class="input-prepend inline control-group " style="display:inline-block;">
                            <span style="margin-left: 10px" class="add-on">Fecha Hasta:</span>
                            <input class="span2" id="txtFechaFinEntregado" maxlength="10" type="text">
                     </div>

                     <div>&nbsp;&nbsp;&nbsp;<a id="btnBuscar" class="btn btn-info" href="#" data-backdrop="static" role="button" data-toggle="modal">
                            <i class=" icon-search icon-white"></i>&nbsp;Buscar</a>
                      </div>

         </form>   
         
         <div class="clearfix"></div>
               
                </div>
                <div id="Resultado" class="tabla" style="height: 150px; width: 98%; margin-left: 1%">
                    <table id="TablaMedicos" class="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th>
                                    Protocolo
                                </th>
                                <th>
                                    Fecha Ingreso
                                </th>
                                <th>
                                    NHC
                                </th>
                                <th>
                                    Paciente
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
    <script src="../js/Hospitales/AtConsultorio/BuscarRecetas.js" type="text/javascript"></script>
    <!--Barra sup-->

</body>
</html>

