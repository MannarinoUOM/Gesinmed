<%@ Page Language="C#" AutoEventWireup="true" CodeFile="microorganismos.aspx.cs" Inherits="AnatomiaPatologicaTrue_microorganismos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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
   <div class="contenedor_3" style="height:50%;width:80%; margin-left:10%"> <div class="titulo_seccion" id="titulo">
      <span>Microorganismos</span></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
      
            <div id="tablaTecnicas" class="tabla" style="height:50%;width:100%">
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

      </div>

            <form id="frm_Main" name="frm_Main" style="margin-top:3%">
          <div class="contenedor_4 pagination-centered" style="height:30%; width:50%; display:none"">
               
                 <div class="control-group" style="display:inline; margin:10px 10px 0px 10px;">
                 <label for="txtCodigo" style="display:inline;">Código: </label>
                 <div   class="control-group" style="display:inline; margin:10px 10px 0px 10px;">
                 <input type="text" id="txtCodigo" maxlength="10" class="input-medium validar" style="margin-top:10px" ref="Código"/>
                 <label for="txtDescripcion" style="display:inline;">Descripción: </label>
                 <input type="text" id="txtDescripcion" maxlength="50" class="input-small validar" style="margin-top:10px; width:50%" ref="Descripción"/>
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
<script src="../js/Hospitales/AnatomiaPatologicaTrue/microorganismos.js" type="text/javascript"></script>
