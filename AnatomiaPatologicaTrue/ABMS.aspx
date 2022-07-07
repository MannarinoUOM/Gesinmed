<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ABMS.aspx.cs" Inherits="AnatomiaPatologica_ABM_Topografias" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="clearfix"></div>
  
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px; width:1000px;">
  <div class="contenedor_1" style="width:1000px;">
   <div class="contenedor_3" style="height:500px;width:970px;"> <div class="titulo_seccion" id="titulo">
      <span>ABM Topografías</span></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
      
            <div id="tablaTopografias" class="tabla" style="height:350px;width:100%;">
              <table class="table table-condensed">
               <div id="mensaje" style=" margin-top:0px; display:none"><label style=" font-size:x-large"><b>NO SE ENCONTRARON RESULTADOS</b></label></div> 
              </table>
              
                    <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                    </div>   
                
            </div>

        <div class="clearfix"></div>

<div class="pie_gris" style="margin-right:100px">
    <div id="ContenedorBusqueda" class="pull-left" style="margin-left:5%"><label style="display:inline">Búsqueda: </label><input id="busqueda" type="text"/> 
    <label style="display:inline">Por Código: <input id="2" type="radio" name="criterio" class="seleccion" style="text-transform:uppercase"/></label>
    <label style="display:inline">Por Descripción: <input id="1" type="radio" name="criterio" class="seleccion"/></label>
    <label style="display:inline">Todos: <input id="0" type="radio" name="criterio" checked="checked" class="seleccion"/></label></div>
    <div class="pull-right" style="height:90px;">

        <button id="btncancelarEdicion" class="btn btn-danger" style="display:none"><i class=" icon-thumbs-down icon-white"></i>&nbsp;Cancelar Edición</button>
        <button id="btnGuardar" class="btn btn-warning"><i class="icon-ok icon-white disparador"></i>&nbsp;Guardar</button>
    </div>
</div>
      </div>

            <form id="frm_Main" name="frm_Main" style="margin-top:3%">
          <div class="contenedor_4 pagination-centered" style="height:50px; width:96%">
               
                 <div class="control-group" style="display:inline; margin:10px 10px 0px 10px;">
                 <label for="txtCodigo" style="display:inline;">Código: </label>
                 <div   class="control-group" style="display:inline; margin:10px 10px 0px 10px;">
                 <input type="text" id="txtCodigo" maxlength="10" class="input-medium" style="margin-top:10px" ref="Código"/>
                 <label for="txtDescripcion" style="display:inline;">Descripción: </label>
                 <input type="text" id="txtDescripcion" maxlength="50" class="input-small" style="margin-top:10px; width:50%" ref="Descripción"/>
                     <label id="lblPrecio" for="txtPrecio" style="display:none;">Precio: </label>
                 <input type="text" id="txtPrecio" maxlength="10" class="input-small numeroDecimal" style="margin-top:10px; width:20%; display:none; text-align:center" ref="Precio" />
                 </div></div> 
          </div>

          </form>
          <div class="clearfix"></div>

    </div>
  </div>
<!--Pie de p�gina-->
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
    <script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AnatomiaPatologicaTrue/ABMS.js" type="text/javascript"></script>
