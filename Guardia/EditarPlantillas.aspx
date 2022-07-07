<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EditarPlantillas.aspx.cs" Inherits="Guardia_EditarPlantillas" %>

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


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:530px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Editar Plantilla de Guardia</span></div>

        
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div class="tabbable" style="margin-left:10px;">

            <ul class="nav nav-tabs" data-tabs="tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Insumos</a></li>
                <li><a href="#tab2" data-toggle="tab">Prácticas</a></li>
            </ul>

<div class="tab-content">
<div class="tab-pane active fade in" id="tab1">
        <div style="padding:15px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos_div" class="tabla" style="height:330px;width:100%; margin-top:-10px;">
              <table class="tab-pane fade in">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>

              </table>
               <div id="cargando" style="text-align:center; display:inline-table; margin-left:400px ">   
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
            </div>
        </div>

           
        <form id="frm_Medicamentos">
        <div class="row">
             <div class="span5" style="margin-left:30px; margin-top:10px; display:none;">
                <label for="cbo_Monodroga" style="display:inline;">Monodroga:</label>
                      <select id="cbo_Monodroga">
                      </select>
            </div>
            <div class="span8" style="margin-left:40px; margin-top:10px;">
                <label for="cbo_Medicamento" style="display:inline;">Insumo:</label>
                      <select id="cbo_Medicamento" style="width:500px;">
                        <option value="0">Seleccione Insumo</option>
                      </select>
            </div>
            <div class="span2" style="margin-top:10px; margin-left:-20px;">
                <label for="cantidad" style="display:inline;">Cantidad: </label><input type="text" id="cantidad" name="cantidad" class="input-mini numero" maxlength="2" />
            </div>
        </div>
        <div class="pull-right" style=" margin-right:15px;">
            <input id="btnCancelarMedicamento" type="button" class="btn btn-danger" value="Cancelar" />
            <input id="btnAgregarMedicamento" type="button" class="btn btn-success" value="Agregar" />
        </div>
        </form>
        <div class="clearfix"></div>

        <div class="pie_gris">
            <button id = "btnGuardarMedicamentos" class="btn btn-info pull-right"><i class=" icon-ok icon-white"></i>&nbsp;Guardar Medicamentos</button>
        </div>
</div>
<div class="tab-pane fade in" id="tab2">
      <div style="padding:15px 15px 0px 15px;">
            <div id="Tabla_Practicas" class="tabla" style="height:330px;width:100%; margin-top:-10px;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Codigo</th>
                    <th>Práctica</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <form id="Practicas_frm">
            <div class="row">
                <div class="span2" style="margin-top:10px; margin-left:30px;" id="controltxtCodigo">
                    <label for="txtCodigo" style="display:inline;">Código: </label><input type="text" id="txtCodigo" name="txtCodigo" class="input-mini" maxlength="6" />
                </div>
                <div class="span4" style="margin-left:50px; margin-top:10px;">
                    <label for="cbo_Practicas" style="display:inline;">Prácticas:</label>
                          <select id="cbo_Practicas">
                          </select>
                </div>
                <div class="span2" style="margin-top:10px;" id="controlcantidad_p">
                    <label for="cantidad_p" style="display:inline;">Cantidad: </label><input type="text" id="cantidad_p" name="cantidad_p" class="input-mini numero" maxlength="2" />
                </div>
            </div>
            <div class="row" style="margin-right:15px;">
                 <div class="pull-right">
                     <input id="btnCancelarPractica" type="button" class="btn btn-danger" value="Cancelar" />
                     <input id="btnAgregarPractica" type="button" class="btn btn-success" value="Agregar" />   
                </div>
            </div>
        </form>
        <div class="pie_gris">
            <button id = "btnGuardarPracticas" class="btn btn-info pull-right"><i class=" icon-ok icon-white"></i>&nbsp;Guardar Practicas</button>
        </div>       
 </div>
</div>
</div>
</div>
      </div>
    </div>

<!--Pie de p�gina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Guardia/EditarPlantillas.js" type="text/javascript"></script>   
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Editar Plantilla de Insumos y Prácticas de Guardia</strong>";
</script> 

</body>
</html>
