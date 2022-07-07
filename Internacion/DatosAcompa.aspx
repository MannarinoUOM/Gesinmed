<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DatosAcompa.aspx.cs" Inherits="Internacion_DatosAcompa" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
  <div class="titulo_seccion">
                   <span>Datos del Acompañante</span></div>
   <div class="contenedor_3" style="height:250px;">
      <form id="frm_Main" name="frm_Main">
          <div style="padding:0px 15px 0px 15px; height:100px;">
            <div class="row" style="margin-left:5px;">
              <div id="controltxtNombre" class="span5">
                    <label for="txtNombre" style="display:inline; margin-top:10px;">Acompañante: </label>
                    <input type="text" name="txtNombre" id="txtNombre" />
              </div>
              <div id="controlcboTipo" class="span3">
                    <label for="cboTipo" style="display:inline; margin-top:10px;">Tipo: </label>
                    <select id="cboTipo" name="cboTipo" class="span2">
                    <option value="1">DNI</option>
                    <option value="2">LC</option>
                    <option value="3">LE</option>
                    </select>
              </div>
              <div id="controltxtDNI" class="span3">
                    <label for="txtDNI" style="display:inline; margin-top:10px;">Nro.: </label>
                    <input type="text" name="txtDNI" id="txtDNI" class="span2"/>
              </div>
            </div>
        
         <div class="row" style="margin-left:5px;">
              <div id="controltxtCalle" class="span5">
                    <label for="txtCalle" style="display:inline; margin-top:10px;">Domicilio: </label>
                    <input type="text" name="txtCalle" id="txtCalle" class="span4" />
              </div>
              <div id="controltxtNro" class="span3">
                    <label for="txtNro" style="display:inline; margin-top:10px;">Nº: </label>
                    <input type="text" name="txtNro" id="txtNro" class="span2" />
              </div>
              <div id="controltxtPiso" class="span3">
                    <label for="txtPiso" style="display:inline; margin-top:10px;">Piso y Dpto.: </label>
                    <input type="text" name="txtPiso" id="txtPiso" class="span2" style="width:100px;"/>
              </div>
            </div>

         <div class="row" style="margin-left:5px;">
              <div id="controltxtLocalidad" class="span4">
                    <label for="txtLocalidad" style="display:inline; margin-top:10px;">Localidad: </label>
                    <input type="text" name="txtLocalidad" id="txtLocalidad" class="span3" />
              </div>
              <div id="controltxtCP" class="span3">
                    <label for="txtCP" style="display:inline; margin-top:10px;">CP: </label>
                    <input type="text" name="txtCP" id="txtCP" class="span2" />
              </div>
               <div id="controltxtProv" class="span4">
                    <label for="txtProv" style="display:inline; margin-top:10px;">Provincia: </label>
                    <input type="text" name="txtProv" id="txtProv" class="span3" />
              </div>
            </div>

        <div class="row" style="margin-left:5px;">
              <div id="controltxtTelefono" class="span3">
                    <label for="txtTelefono" style="display:inline; margin-top:10px;">Telefono: </label>
                    <input type="text" name="txtTelefono" id="txtTelefono" class="span2" />
              </div>
            </div>

             <div class="row" style="margin-left:5px;">
              <div id="controltxtObs" class="span9">
                    <label for="txtObs" style="display:inline; margin-top:10px;">Observacion: </label>
                    <input type="text" name="txtObs" id="txtObs" class="span7" />
              </div>
              </div>
       

        </div>
     
</form>

<div class="pie_gris">
<div class="pull-right">
<button id = "btnCerrarAcompa" class="btn btn-danger"><i class=" icon-remove-circle icon-white"></i>&nbsp;Cerrar</button>
<button id = "btnGuardar" class="btn btn-success"><i class=" icon-ok-circle icon-white"></i>&nbsp;Guardar Datos</button>
</div>
</div>
      </div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Internacion/DatosAcompa.js" type="text/javascript"></script>


<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Datos del Acompañante</strong>";

</script> 

</body>
</html>




