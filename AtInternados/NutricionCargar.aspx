<%@ Page Language="C#" AutoEventWireup="true" CodeFile="NutricionCargar.aspx.cs" Inherits="AtInternados_NutricionCargar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
             <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
        <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <%--<form id="form1" runat="server">--%>
<%--    <div>--%>
 <div style="display:none" id="titulo"><label style="float:left; margin-left:10px" id="lblCodigoComida"><strong></strong></label><label style="margin-left:254px"><strong>Tipificación</strong></label></div>
 <div style="display:none; margin-left:0px" id="titulo2"><label style="float:left; margin-left:106px" id="lblCodigoComida2"><strong></strong></label><label style="margin-left:389px"><strong>Tipificación</strong></label></div>

          <div id="ListaComidas" class="tabla" style="height:auto; width: 49%; margin-left: 0%; margin-top:0px; display:none; float:left">
                    <table id="TablaConsultas2" class="table table-bordered table-bordered tab-content"  style=" overflow:auto; display:none">
                        <thead>
                            <tr>
                           
                                <th style="width:100px; overflow:auto; text-align:center">
                                    Medicamento
                                </th>
                                <th style="width:100px; overflow:auto; text-align:center">
                                    Indicación
                                </th>
                         
                            </tr>
                        </thead>
                        <tbody>
                      
                        </tbody>
         
           </table>
           </div>
       
             <div id="guardando" style="text-align:center; display:none ; margin-top:240px" >
                    <br />
                    <img src="../img/esperar.gif" /><br />
                    <label id="leyenda" style="display:none">Guardando...</label>
                </div> 
                    
                 <div id="ListaComidas2" class="tabla" style="height:412px; width: 49%; margin-left: 0%; margin-top:0px; display:none; float:right">
                    <table id="Table1" class="table table-bordered table-bordered tab-content"  style=" overflow:auto; display:none">
                        <thead>
                            <tr>
                           
                                <th style="width:100px; overflow:auto; text-align:center">
                                    Medicamento
                                </th>
                                <th style="width:100px; overflow:auto; text-align:center">
                                    Indicación
                                </th>
                         
                            </tr>
                        </thead>
                        <tbody>
                      
                        </tbody>
         
               <%--      <div id="Div2" style="text-align:center; display:block" >
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div> --%>
           </table>
           </div>

               <%--      <div id="guardando" style="text-align:center; display:none ; margin-top:240px" >
                    <br />
                    <img src="../img/esperar.gif" /><br />
                    <label id="leyenda" style="display:none">Guardando...</label>
                </div> --%>
<%--    </div>--%>
<%--    <div class="contenedor_1" style="padding-left:10px; padding-right:10px">
    <a id="btnCancelar" class="btn btn-info" style="display:none">Cerrar</a>
  <a id="btnAceptar" class="btn btn-info"  >Aceptar</a>
</div>--%>

 <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<%--<script src="../js/Hospitales/AtInternados/Menus.js" type="text/javascript"></script> --%>
<script src="../js/Hospitales/AtInternados/MostrarComidas.js" type="text/javascript"></script>
    
<%--    </form>--%>
</body>
</html>

