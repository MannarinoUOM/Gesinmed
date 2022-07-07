<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Compras_Nuevo_Presupuesto_Internacion.aspx.cs" Inherits="Compras_Compras_Nuevo_Presupuesto_Internacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/ComprasInternacion.css" rel="stylesheet" type="text/css" />
    
</head>
<body>
    <form id="contenedor" runat="server" style="margin:0px">
 <div id="imagenes"  style="width:90%; margin:auto">
 <table class='table' style='margin-bottom:0px;height:100%;width:100%'>
 <tr>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="1" border="0" style="margin:auto" title="Subir Imagen"/></td>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="2" border="0" style="margin:auto" title="Subir Imagen"/></td>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="3" border="0" style="margin:auto" title="Subir Imagen"/></td>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="4" border="0" style="margin:auto" title="Subir Imagen"/></td>
 </tr>
 <tr>
 <td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger btn_borrar_img' id="btnEli1" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes1" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
 <td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger btn_borrar_img' id="btnEli2" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes2" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
<td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger btn_borrar_img' id="btnEli3" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes3" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
 <td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger btn_borrar_img' id="btnEli4" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes4" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
 </tr>
 <tr>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="5" border="0" style="margin:auto" title="Subir Imagen"/></td>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="6" border="0" style="margin:auto" title="Subir Imagen"/></td>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="7" border="0" style="margin:auto" title="Subir Imagen"/></td>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="8" border="0" style="margin:auto" title="Subir Imagen"/></td>
 </tr>
  <tr>
<td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger btn_borrar_img' id="btnEli5" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes5" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
<td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger btn_borrar_img' id="btnEli6" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes6" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
 <td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger btn_borrar_img' id="btnEli7" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes7" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
 <td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger btn_borrar_img' id="btnEli8" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes8" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
 </tr>
 <tr>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="9" border="0" style="margin:auto"  title="Subir Imagen"/></td>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="10" border="0" style="margin:auto" title="Subir Imagen"/></td>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="11" border="0" style="margin:auto" title="Subir Imagen"/></td>
 <td style="height:50px;width:50px"><img src='../img/ComprasInternacion/subirArchivo.png' class='thumbnail centrarImg elegirArchivoReceta' height="50px" width="50px" id="12" border="0" style="margin:auto" title="Subir Imagen"/></td>
 </tr>
   <tr>
 <td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger btn_borrar_img' id="btnEli9" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes9" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
<td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger btn_borrar_img' id="btnEli10" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes10" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
<td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none"  class='btn-mini btn-danger btn_borrar_img' id="btnEli11" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes11" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
 <td style="height:5px; padding-left:10px; padding-right:10px; width:50px; text-align:center">
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger btn_borrar_img' id="btnEli12" title='Eliminar Imagen'><i class='icon-remove-circle'></i></a>
 <a style="cursor:pointer; display:none" class='btn-mini btn-danger' id="btnDes12" title='Descargar Imagen' download><i class='icon-download'></i></a>
 </td>
 </tr>
 </table>
 </div>
       
 <%--
    <div id="contenedorReceta" class="contenedorImgIzquierdo elegirArchivoReceta" style="overflow:auto"><img id="nuevaReceta" class="centrarImg" src="../img/ComprasInternacion/subirArchivo.png" /><div id="CargarReceta"  class="centrarAizq" ><a style="cursor:pointer" >Cargar <br /> Receta</a></div></div>
    <div id="contenedorPresupuesto" class="contenedorImgDerecho elegirArchivoPresupuesto" style="overflow:auto"><img id="nuevoPresupuesto" class="centrarImg" src="../img/ComprasInternacion/subirArchivo.png" /><div id="CargarPresupuesto"  class="centrarAder" ><a style="cursor:pointer" >Cargar <br /> Presupuesto</a></div></div>--%>

    <asp:FileUpload ID="seleccionarReceta" runat="server" AllowMultiple="true" style="display:none"/>
    <asp:FileUpload ID="seleccionarPresupuesto" runat="server" AllowMultiple="true" style="display:none"/>

    <asp:Button id="subirReceta" runat="server" onclick="btnSubir_Receta_Click" UseSubmitBehavior="false" style="display:none"/>
    <asp:Button id="subirPresupuesto" runat="server" onclick="btnSubir_Presupuesto_Click" UseSubmitBehavior="false" style="display:none"/>

    <input id="id_Expediente" type="hidden" runat="server"/> <!--id del expediente... dhaaa -->
    <input id="id_Pedido" type="hidden" runat="server"/> <!--id del expediente... dhaaa -->
    <input id="id_Presupuesto" type="hidden" runat="server"/> <!--id del expediente... dhaaa -->

<%--<div class="contControlesDown">--%>
<div class=" pie_gris_compras" style=" height:20%">
  <table >
    <tr>
    <td style="width:16%; text-align:right">
    <label class=" control-label" style="display:inline">Servicio</label></td>   
    <td style="width:16%"><input id="txtTipo" class="carga form-control input-large detalles" type="text" maxlength="100" style="margin-bottom:0px"/></td> 
    <td style="width:16%; text-align:right"><label class=" control-label" style="display:none">Cantidad</label></td>
    <td style="width:16%"><input id="txtCantidad" class="carga form-control input-mini numeroEntero cantidad detalles" name="4" type="text" style="margin-bottom:0px; display:none" value="1"/></td>
    <td style="width:20%; text-align:right"><label  class=" control-label" style="display:inline">Importe total</label></td>
    <td style="width:16%"><input id= "txtImporte" class="carga form-control input-mini cantidad numeroDecimal detalles" name="9"  type="text" style="margin-bottom:0px"/></td> 
    </tr>

    <tr>
    <td style="width:16%; text-align:right"><label  class=" control-label" style="display:inline">Proveedor</label></td> 
    <td style="width:16%"><select id="cbo_Proveedor" class="carga form-control  detalles"  style="margin-top:5px"></select></td> 
    <td style="width:16%"></td>
    <td style="width:16%"></td>
    <td style="width:16%"><a id="btnLimpiarDET" class="btn cargaBtn">Limpiar</a></td>
    <td style="width:16%"><a id="btnGuardarDET" class="btn btn-success cargaBtn">Guardar</a></td>
    </tr>
  </table>
  </div>
<%--</div>
--%>
 
    </form>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script> 
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script> 
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<script src="../js/Hospitales/Compras/Compras_Nuevo_Presupuesto_Internacion.js" type="text/javascript"></script>
</body>
</html>

