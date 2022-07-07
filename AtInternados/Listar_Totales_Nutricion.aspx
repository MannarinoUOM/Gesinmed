<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Totales_Nutricion.aspx.cs" Inherits="AtInternados_Listar_Totales_Nutricion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
         <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

            <%--<script type="text/javascript">
                parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Nutrición > <strong>Totales</strong>";
            </script> --%>
</head>
<body>
    <form id="form1" runat="server">
    <div>
     <div id="Primero" style="display:none; height:600">

          <div class="container" style="padding-top: 30px; height: 650px; margin-left:50px">
           
        <div class="contenedor_1" style="height:517px; margin-top:10px; width:1247px"">

            <div class="contenedor_3" style="height:500px; padding-bottom:0px; width:1220px">
                <div class="titulo_seccion" style="margin-top: 5px; width:560px">
                 <span> Listado de Comidas de Internados<label id="tituloInternados" style="display:inline; margin-bottom:0px; margin-top:3px; font-size:large"></label></span>
                 <label id="subrayado" style="display:none">(<u>Cantidad de Internados:</u></label>
                </div>

                    <div class="modal-backdrop" style="width:1220px; height:25px; background-position:center; position:inherit; background-color:Black">
            <label class="check inline" style="width:112px; margin-left:16px;margin-right:12px"><strong style="color:White">Servicio</strong></label><label class="check inline" style="width:89px; margin-left:56px"><strong style="color:White">Sala</strong></label><label class="check inline" style="width:55px; margin-left:72px"><strong style="color:White">Cama</strong></label><label class="check inline" style="width:63px; margin-left:0px"><strong style="color:White">NHC</strong></label>
            <label class="check inline" style="width:147px ; margin-left:0px"><strong style="color:White">Afiliado</strong></label><label  class="check inline" style="width:147px"><strong style="color:White">Almuerzo</strong></label><label  class="check inline" style="width:152px"><strong style="color:White">Cena</strong></label><label  class="check inline" style="width:147px"><strong style="color:White">Acomp. Almuerzo</strong></label><label  class="check inline"><strong style="color:White">Acomp. Cena</strong></label>
            </div> 

                   <div id="tablaPedidosTraidos" class="tabla" style="height: 386px; width: 98%; margin-left: 1%; margin-top:0px">
                    <table id="Table1" class="table table-bordered table-bordered"  style=" overflow:auto">
                        <thead style="height:0px">
                            <tr>
                           
                    <%--            <th style="width:210px">
                                    Servicio
                                </th>
                                <th style="width:210px">
                                    Sala
                                </th>
                                <th style="width:60px">Cama</th>
                         <th style="width:60px">NHC</th>
                         <th style="width:200px">Afiliado</th>
                         <th style="width:159px">Almuerzo</th>
                         <th style="width:159px">Cena</th>
                           
                            --%> </tr>
                        </thead>
                        <tbody>
                        </tbody>
         
                     <div id="Div2" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div> 
           </table>
           </div>


                                 <div style="height: 46px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">

               <div style="padding: 5px">
                            <a class="btn btn-info pull-right" style="margin-right:4px" id="btnImprimirInternados">
                            <i id="i5" class=" icon-print icon-white"></i>&nbsp;Imprimir Listado</a>

                             <a class="btn btn-info pull-lefth" id="btnSiguiente2" href="#myModal" style="vertical-align:middle">Totales</a>

                            <a class="btn btn-info pull-lefth" id="btnVolverInicio" style="display:none">
                            <i id="i3" class=" icon-arrow-up icon-white"></i>&nbsp;Anterior</a>

                   <%--         <a class="btn btn-info pull-lefth" id="btnVolver">
                            <i id="i2" class=" icon-arrow-left icon-white"></i>&nbsp;Volver a Pacientes</a>--%>
<%--                            <label for="txtFecha" style="display:inline; margin-left:40px">Fecha: </label>--%>
                            <input id="txtFecha" type="text" class="input-medium" style=" display:none; margin-bottom:0px"/>


<%--               <div id="btnComidos" class="reff Turnos_Libres">Servicio de Comidas Comidos</div>
               <div id="btnPendientes" class="reff Turnos_Ocupados" >Servicio de Comidas Pedientes</div>
               <div id="btnTodos" class="reff ref_0 reff_activo" style="margin-right:30px">Total de Internados</div>--%>

                            </div>
                            </div>
                            
                            </div>
                            </div>
                            </div>
                            
          </div> 
<%--////////////////////////////SEGUNDO//////////////////////////////////////////////////////////--%>
                    <div id="Segundo" style="display:none; height:600">

          <div class="container" style="padding-top: 30px; height: 650px;">
        <div class="contenedor_1" style="height:550px; margin-top:10px">
            <div class="contenedor_3" style="height:533px; padding-bottom:0px">
                <div class="titulo_seccion" style="margin-top: 5px; width:590px">
                     <span>Totales de Comidas del<label id="tituloTotales" style="display:inline; margin-bottom:0px; margin-top:3px; font-size:large"></label></span>
                 
                </div>
                   <div id="tablaTotales" class="tabla" style="height: 358px; width: 98%; margin-left: 1%; margin-top:0px">
                    <table id="table12" class="table table-bordered table-bordered"  style=" overflow:auto">
                        <thead>
                            <tr>
                           
                                <th style="width:248px">
                                    Tipificación
                                </th>
                                <th style="width:207px">
                                    Dietas
                                </th>
                                <th style="width:161px">Fecha de Pédido</th>
                         <th style="width:87px">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
         
                     <div id="Div4" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div> 
           </table>
           </div>

           <div style="height:50px; margin-top:6px" class="contenedor_1">
          <%-- <label class="label" style="margin-left:300px">Totales SIN:</label>
           <input class="input-mini" id="totalesSIN" type="text" disabled="disabled" style="text-align:center"/>

        <label class="label" style="margin-left:0px">Totales Comidas:</label>
           <input class="input-mini" id="totalesComidas" type="text" disabled="disabled" style="text-align:center"/>--%>

           <a id="btnPedidas" class="  reff" style="margin-right:262px; background-color:#58FA58; width:300px; float:right; display:none">Totales SIN() - Totales Comidas()</a>

           

          


           <div style="width:647px">
        <label class="label" style="margin-left:0px; display:none">Comidas Pedidas de Acompañantes:</label>
           <input class="input-mini" id="txtAcompañantes" type="text" disabled="disabled" style="text-align:center; display:none"/>
          



           <a id="btnComidos" class="  reff" style="margin-left:0px; background-color:#58FA58; width:350px; float:right">Comidas Pacientes() - Comidas Acompañantes() Comidas Pendientes()</a>
               <%--<a id="btnPendientes" class=" reff" style="margin-left:465px; background-color:#FA5858">Comidas Pedidas()</a>--%>
               <%--<div id="btnTodos" class=" alert-info reff" style="margin-left:130px">Total de Internados()</div>--%>
            </div>
           </div>
                                 <div style="height: 46px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">

               <div style="padding: 5px">
                            <a class="btn btn-info pull-right" style="margin-right:4px" id="btnImprimirTotales">
                            <i id="i4" class=" icon-print icon-white"></i>&nbsp;Imprimir totales</a>

                            <%-- <a class="btn btn-info pull-lefth" id="A2" href="#myModal" style="vertical-align:middle">
                            <i id="I6" class=" icon-arrow-down icon-white"></i>&nbsp;Siguiente</a>--%>

                         <%--   <a class="btn btn-info pull-lefth" id="btnVolverPrimero">
                            <i id="I3" class=" icon-arrow-up icon-white"></i>&nbsp;Volver</a>--%>
<%--                                      <a class="btn btn-info pull-right" style="margin-right:4px" id="btnImprimirInternados">
                            <i id="i5" class=" icon-print icon-white"></i>&nbsp;Imprimir pacientes</a>--%>

                

                            <a class="btn btn-info pull-lefth" id="btnVolver">Listado</a>

                            </div>
                            </div>
                            
                            </div>
                            </div>
                            </div>
                            
          </div>
   
    </form>
</body>
</html>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<%--<script src="../js/Hospitales/AtInternados/Listar_Totales_Dietas.js" type="text/javascript"></script>--%>


    <div id="ModalExistePaciente" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">    
    <h3 id="H2">Falta Cargarle Comidas a Pacientes!</h3>
  </div>
  <div class="modal-body">
<%--    <p>Tenga en cuenta que...</p>
    <ul>
    <li>Si continua modificando los datos, al actualizarlos, puede llegar a perderse toda la información del paciente anterior.</li>
    <br />--%>
    <li>¿Desea imprimir de todos modos?.</li>
    </ul>
    <p></p>
    <p></p>
    <p></p>

  </div>
  <div class="modal-footer">
    <button onclick="imprimir()" class="btn" data-dismiss="modal" aria-hidden="true">Si</button>    
    <button onclick="javascript:window.close();" class="btn" data-dismiss="modal" aria-hidden="true">No</button>
    <button onclick="cargar();"  id="btnCargarPacientes" class="btn" data-dismiss="modal" aria-hidden="true">Cargar Comidas Faltantes</button>    
  </div>
   </div>
   <script src="../js/Hospitales/AtInternados/Listar_Totales_Dietas.js" type="text/javascript"></script>
  <%-- <script type="text/jscript">
       function cargar() {
           document.location = "../AtInternados/Nutricion.aspx?como=" + "todos" + "&indiceAseguir=" + indiceAseguir + "&fecha=" + $("#txtFecha").val();
       }

       function imprimir() {

           $.fancybox({
               'autoDimensions': false,
               'href': "../Impresiones/Impresion_Nutricion_Listar_Totales.aspx?fecha=" + $("#txtFecha").val(),
               'width': '75%',
               'height': '75%',
               'autoScale': false,
               'transitionIn': 'elastic',
               'transitionOut': 'none',
               'type': 'iframe',
               'hideOnOverlayClick': false,
               'enableEscapeButton': false,
               'preload': true,
               'onComplete': function f() {
                   jQuery.fancybox.showActivity();
                   jQuery('#fancybox-frame').load(function () {
                       jQuery.fancybox.hideActivity();
                   });
               }

           });
       }
   
   </script>--%>