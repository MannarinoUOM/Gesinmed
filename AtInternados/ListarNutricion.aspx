<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListarNutricion.aspx.cs" Inherits="AtInternados_ListarNutricion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<head id="Head1" runat="server">
    <title></title>
         <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

            <script type="text/javascript">
                parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Nutrición > <strong>Totales</strong>";
</script> 
</head>
<body style="overflow-y: scroll; overflow-y: hidden;">

 <form id="form2" runat="server" class="form-horizontal" style="overflow:hidden">
 <div id="Primero" style="height:600">
    <div class="container" style="padding-top: 0px; height: 650px;">
        <div class="contenedor_1" style="height:550px; margin-top:20px">
            <div class="contenedor_3" style="height:532px; padding-bottom:0px">
                <div class="titulo_seccion" style="margin-top: 5px;">
                    <span>Comida Acompañante</span>
                 
                </div>

                <div id="Resultado" class="tabla" style="height: 325px; width: 98%; margin-left: 1%; margin-top:0px">
                    <table id="tablaPedidos" class="table table-hover table-condensed"  style=" overflow:auto">
                        <thead>
                            <tr>
                           
                                 <th style="width:202px">
                                    Tipificación
                                </th>
                                <th style="width:100px">
                                    Dietas
                                </th>
                                <th style="width:161px">Fecha de Pédido</th>
                         <th style="width:87px">Cantidad</th>
                         <th style="width:125px"></th>
                            </tr>
                            <tr></tr>
                        </thead>
                        <tbody>
                        </tbody>
         
                     <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div> 
           </table>
           </div>



                <div style="height: 93px; width: 915px; background-color:rgb(51, 51, 51); margin-top: 5px">
                <label class="checkbox inline" style="margin-left:90px; color:White">Dietas: <select id="cboDietas"></select></label>
                <label class="checkbox inline"  style="margin-left:38px; color:White">Fecha Actual: <input id="txtFechaActual" type="text" maxlength="10" style="text-align:center"/></label>
               <label class="checkbox inline" style="margin-left:70px; color:White">Tificación: <input id="txtTipificacion" type="text" disabled="disabled" maxlength="1000"/></label>
                <label class="checkbox inline" style="margin-left:16px; color:White">Cantidad Pedido: <input id="txtCantidad" type="text" maxlength="3" style="text-align:center"/></label>
  

        <a class="btn btn-info pull-lefth" id="btnAgregar"  style=" vertical-align:middle; margin-bottom:6px; margin-top:5px; margin-left:56px">Agregar</a><br /> 
                                                  
    <%--   <a class="btn btn-info pull-lefth" id="btnQuitar"  style=" vertical-align:middle; width:51px; margin-left:56px" disabled="disabled">Quitar</a> --%>

                </div>

                
                <div style="height: 46px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">

               <div style="padding: 5px">

                         <%--       <a class="btn btn-info pull-lefth" id="btnAgregar"  style=" vertical-align:middle">
                            <i id="icoVolver" class=" icon-plus icon-white"></i>&nbsp;Agregar</a> --%>  
                      <%--      <a class="btn btn-info pull-lefth" id="btnAgregar"  style=" vertical-align:middle">
                            Agregar</a> 
                                                  
                         <%--      <a class="btn btn-info pull-lefth" id="btnQuitar"  style=" vertical-align:middle" disabled="disabled">
                            <i id="i6" class=" icon-minus icon-white"></i>&nbsp;Quitar</a> --%>
                         <%--   <a class="btn btn-info pull-lefth" id="btnQuitar"  style=" vertical-align:middle" disabled="disabled">
                            Quitar</a> --%>

                            <a class="btn btn-info pull-right" id="btnGuardar" style="display:inherit; vertical-align:middle"">
                            <i id="btnNuevo" class=" icon-hdd icon-white"></i>&nbsp;Guardar</a>

                             
                            <a class="btn btn-info pull-right" style="margin-right:4px;vertical-align:middle" id="btnImprimirPedidos" disabled="disabled">
                            <i id="imp" class=" icon-print icon-white"></i>&nbsp;Imprimir</a>

                            <a class="btn btn-info pull-lefth" id="btnSiguiente1" href="#myModal" style="vertical-align:middle;margin-right:4px">
                            <i id="sig" class=" icon-arrow-down icon-white"></i>&nbsp;Siguiente</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div><%-- FINALIZA EL PRIMERO---------------------------------------------------------------------------------------------------------------------%>
          <div id="Segundo" style="display:none; height:600">

          <div class="container" style="padding-top: 30px; height: 650px;">
        <div class="contenedor_1" style="height:537px; margin-top:10px">
            <div class="contenedor_3" style="height:520px; padding-bottom:0px">
                <div class="titulo_seccion" style="margin-top: 5px; width:510px">
                     <img src="../img/2.jpg" />&nbsp;&nbsp;<span>Servicio de Comidas Internados<label id="tituloInternados" style="display:inline; margin-bottom:0px; margin-top:3px">hola</label></span>
                 
                </div>
                   <div id="tablaPedidosTraidos" class="tabla" style="height: 410px; width: 98%; margin-left: 1%; margin-top:0px">
                    <table id="Table1" class="table table-bordered table-bordered"  style=" overflow:auto">
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
                            <i id="i5" class=" icon-print icon-white"></i>&nbsp;Imprimir</a>

                             <a class="btn btn-info pull-lefth" id="btnSiguiente2" href="#myModal" style="vertical-align:middle">
                            <i id="I1" class=" icon-arrow-down icon-white"></i>&nbsp;Siguiente</a>

                            <a class="btn btn-info pull-lefth" id="btnVolverInicio">
                            <i id="i3" class=" icon-arrow-up icon-white"></i>&nbsp;Volver</a>

                            </div>
                            </div>
                            
                            </div>
                            </div>
                            </div>
                            
          </div>  <%--FINALIZA SEGUNDO-----------------------------------------------------------------------------------------------------------------%>


           <div id="Tercero" style="display: none; height:600">

          <div class="container" style="padding-top: 30px; height: 650px;">
        <div class="contenedor_1" style="height:502px; margin-top:30px">
            <div class="contenedor_3" style="height:493px; padding-bottom:0px">
                <div class="titulo_seccion" style="margin-top: 5px; width:480px">
                    <img src="../img/3.jpg" />&nbsp;&nbsp;<span>Servicio de Comidas Totales<label id="tituloTotales" style="display:inline; margin-bottom:0px; margin-top:3px">hola</label></span>
               <%--     <span>Dietas Internados(<label id="Label1">hola</label>)</span>--%>
                </div>
                   <div id="tablaTotales" class="tabla" style="height: 384px; width: 98%; margin-left: 1%; margin-top:0px">
                    <table id="Table2" class="table table-bordered table-bordered"  style=" overflow:auto">
                        <thead>
                            <tr>
                           
                                <th>
                                    Tipificación
                                </th>
                                <th>
                                    Dietas
                                </th>
                                <th>Fecha de Pedido</th>
                         <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
         
                     <div id="Div5" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div> 
           </table>
           </div>


                                 <div style="height: 46px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">

               <div style="padding: 5px">
                           
                            <a class="btn btn-info pull-right" style="margin-right:4px" id="btnImprimirTotales">
                            <i id="i2" class=" icon-print icon-white"></i>&nbsp;Imprimir</a>

                             <a class="btn btn-info pull-lefth" style="margin-right:4px" id="btnVolverInternados">
                            <i id="i4" class=" icon-arrow-up icon-white"></i>&nbsp;Volver</a>

                            <a class="btn btn-info pull-lefth" style="margin-right:4px" id="btnVolverCargarPedidos">
                            <i id="i7" class=" icon-arrow-up icon-white"></i>&nbsp;Volver a Cargar Pedidos</a>

                            </div>
                            </div>
                            
                            </div>
                            </div>
                            </div>
                            
          </div> <%--FINALIZA TERCERO-----------------------------------------------------------------------------------------------------------------%>



    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<%--<script src="../js/Hospitales/Internacion/CargarDietas.js" type="text/javascript"></script>--%>
<script src="../js/Hospitales/AtInternados/CargarDietas.js" type="text/javascript"></script>
