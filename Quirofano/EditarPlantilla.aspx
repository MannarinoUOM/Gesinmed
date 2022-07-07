<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EditarPlantilla.aspx.cs" Inherits="Quirofano_EditarPlantilla" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="titulo_seccion">
      <span>Editar Plantilla de Insumos de Quirófano</span></div>
              <div class="">
          <div class="contenedor_4 pagination-centered" style="height:100px;">
            
            <div id="Medicamento_val" style="display:none;">0</div>
            <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
            <div class="combos" style="margin-left:10px;">
                    <label for="cbo_Monodroga" style="display:inline; width:80px;" class="span1">Monodroga:</label>
                    <span id="cbo_Monodroga_val" style="display:none;">0</span>
                      <select id="cbo_Monodroga">
                      </select>
            </div>

             <div class="combos" style="margin-left:10px;">
                <label for="cbo_Medicamento" style="display:inline;width:80px;" class="span1">Insumo:</label>
                    <input type="text" id="cbo_Medicamento" data-provide="typeahead" autocomplete="off" style="width:200px;" />
             </div>

            
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:100px;">
              <form id="frm_Cantidad" class="form-inline" style="margin:10px 25px 0px 25px;">
               <div id="controlcantidad" class="control-group" style="display:inline;"><label for="cantidad">Cantidad: </label><input type="text" id="cantidad" name="cantidad" class="input-mini" /></div><br /><br />
               <input id="btnCancelarMedicamento" type="button" class="btn btn-danger btn-mini" value="Cancelar" />
               <input id="btnAgregarMedicamento" type="button" class="btn btn-mini" value="Agregar" />
              </form>
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>

                <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:300px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div  style="height:60px;width:100%;background-color:#CCCCCC;margin-top:5px;">
<div class="pull-right" style="padding:5px; height:60px;">
  <button id = "btnGuardar" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>
</div>
</div>

  </div>
</div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
<script src="../js/Hospitales/Quirofano/EditarPlantilla.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>


<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Editar Plantilla de Insumos de Quirófano</strong>";

</script> 

</body>
</html>
