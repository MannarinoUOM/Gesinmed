<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Nutrcion_Acompañante.aspx.cs" Inherits="AtInternados_Nutrcion_Acompañante" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

       <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

            <script type="text/javascript">
                parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Nutrición > <strong>Totales</strong>";
</script> 

</head>
<body>
    <form id="form1" runat="server">
     <div id="Primero" style="height:600">
    <div class="container" style="padding-top: 0px; height: 650px;">
        <div class="contenedor_1" style="height:350px; margin-top:120px">
            <div class="contenedor_3" style="height:332px; padding-bottom:0px">
                <div class="titulo_seccion" style="margin-top: 5px;">
                    <span>Comida Acompañante</span>
                 
                </div>

                <div id="Resultado" class="tabla" style="height: 200px; width: 98%; margin-left: 1%; margin-top:0px">
                    <table id="tablaPedidos" class="table table-hover table-condensed"  style=" overflow:auto">
                        <thead>
                            <tr>
                           
                                 <th style="width:440px; text-align:left">
                                    CÓDIGO ALMUERZO
                                </th>
                          <%--      <th style="width:100px">
                                    TIPIFICACIÓN
                                </th>--%>
                                <th style="width:440px; text-align:left">CÓDIGO CENA</th>
                    <%--     <th style="width:87px">TIPIFICACIÓN</th>--%>
                 <%--        <th style="width:125px"></th>--%>
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

            

                <div style="height: 40px; width: 915px; background-color:rgb(51, 51, 51); margin-top: 5px">
                <label class="checkbox inline" style="margin-left:40px; color:White">Código Almuerzo: <select id="cboAlmuerzo"></select></label>
                <label class="checkbox inline"  style="margin-left:38px; color:White">Código Cena: <select id="cboCena" style="text-align:center"></select></label>
             <%--  <label class="checkbox inline" style="margin-left:70px; color:White">Tificación: <input id="txtTipificacion" type="text" disabled="disabled" maxlength="1000"/></label>
                <label class="checkbox inline" style="margin-left:16px; color:White>Cantidad Pedido: <input id="txtCantidad" type="text" maxlength="3" style="text-align:center"/></label>--%>"
  

        <a class="btn btn-info pull-lefth" id="btnAgregar"  style=" vertical-align:middle; margin-bottom:6px; margin-top:5px; margin-left:56px">Agregar</a><br /> 
                                                  
    <%--   <a class="btn btn-info pull-lefth" id="btnQuitar"  style=" vertical-align:middle; width:51px; margin-left:56px" disabled="disabled">Quitar</a> --%>

                </div>

                
                <div style="height: 40px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">

               <div style="padding: 5px">

                            <a class="btn btn-info pull-lefth" id="btnCancelar"  style=" vertical-align:middle">
                            Cancelar</a> 

                            <a class="btn btn-info pull-right" id="btnGuardar" style="vertical-align:middle">
                            <i id="btnNuevo" class=" icon-hdd icon-white"></i>&nbsp;Guardar</a>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <div>
    
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
<%--<script src="../js/Hospitales/Internacion/CargarDietas.js" type="text/javascript"></script>--%>
<%--<script src="../js/Hospitales/AtInternados/CargarDietas.js" type="text/javascript"></script>--%>
<script src="../js/Hospitales/Nutricion/nutricionAcompañante.js" type="text/javascript"></script>