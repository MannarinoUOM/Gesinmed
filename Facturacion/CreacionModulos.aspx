<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CreacionModulos.aspx.cs" Inherits="Facturacion_CreacionModulos" %>



<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />

</head>

<style>
.cch1{margin-top:5px}
.ttb1{background-color:#FFF;height:300px;width:500px;margin-left:15px;margin-right:15px;overflow:inherit;overflow-x:hidden}
.pp1{background-color:#666666;padding:5px;color:#FFF;}
.pp1 input[type=text]{width:50px;margin:0px 10px 0px 5px}
.pp1 input[type=checkbox]{margin:0px 10px 5px 20px }
.pp1 label{display:inline}

</style>

<body>
 <script type="text/javascript">
     parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Alta de Módulos</strong>";
     
    </script>
<div class="container">
  <div class="contenedor_1" style="position:relative;min-height:580px">

<h3>Alta de Módulos</h3>
<div class="ttb1" style="width:900px; height:300px;margin-left:auto;margin-right:auto">
    <div id="cargando" style="text-align:center; display:none;">
                <br /><br /><br />
        <img src="../img/Espere.gif">Cargando Módulos...<br />
    </div>    
<table class="table table-hover" id="tablamodulos">

<thead>
<th>Código</th>
<th>Descripción</th>
<th></th>
<tbody id="TablaEspecialidades">

</tbody>
</thead>
</table>
</div>    
<br/> 

    <form class="form-horizontal" id="frm_Valores">
              <div  class="control-group">
                <label class="control-label">Código</label>
                <div class="controls">
                  <input class="span2" id="txtCodigo" type="text" rel='Ingrese Código'>
                	<span>Descripción</span> <input id="txtPracticas" class="span6" type="text" rel='Ingrese Descripción'>
                </div>
              </div>
             <div  class="control-group" style="margin-left:-55px;">
                <div class="controls">
                	<span>Módulo</span> 
                    <select id="cboPracticas" class="span6"; style="margin-left:5px">
                    </select>
                </div>
              </div>
           
   
      <div style="display:none;">
        <ul class="nav nav-tabs" data-tabs="tabs">
          <li class="active"><a data-toggle="tab" href="#tab1">Datos de la práctica a ingresar</a></li>          
        </ul>
      </div>



      <!--DATOS DE LA PRACTICA A INGRESAR-->
      <div id="my-tab-content" class="tab-content" style="height:90px;display:none;">
        <div class="tab-pane active fade in DP" id="tab1">
            
          
          <div class="clearfix"></div>
          
        </div>
        
        <!--CONTACTO Y DOMICILIO-->
        <div class="tab-pane fade in" id="tab2">
<div class="pull-left ttb1">
<table class="table">
<thead>
<th>Descripción</th>
<th></th>
<tbody id="TablaEspecialidadesCargar">
<tr>
	<td></td>
	<td></td>
</tr>
</tbody>
</thead>
</table>
</div>
          
          <div class="pull-left">
          <div class="label_top">Especialidad</div>
          <div class="span5"><select id="cbo_Especialidad" type="text"></select></div>
         
          
           <a class="btn" onclick="javascript:AgregarEsp();">Agregar</a>

          </div>
        </div>
      </div>

    <div class="pp1" style="display:none;">
    <div id="controltxt_VNN" class="control-group" style="display:inline;">
    V.N.N. <input type="text" id="txt_VNN" name="txt_VNN" class="span2" value="0"/>
    </div>
    <div id="controltxt_VG" class="control-group" style="display:inline;">
    V. Gastos <input type="text" id="txt_VG" name="txt_VG" class="span2" value="0"/>
    </div>
    <div id="controltxt_Honorario" class="control-group" style="display:inline;">
    V. hono. <input type="text" id="txt_Honorario" name="txt_Honorario" class="span2" value="0"/>
    </div>
    <label><input id="cbo_SFOS" type="checkbox"/><span>Se facturó O.S.</span></label>
    <label><input id="cbo_CH" type="checkbox"/><span>Cobra por honorarios</span></label>
    </div>

      <div class="pie_gris">
        <a id="btn_Actualizar" class="btn btn-info pull-right" onclick="javascript:Guardar();">Actualizar</a> 
        <a id="Cancelar" class="btn pull-right">Cancelar</a>
        <div class="clearfix"></div>
      </div>
       </form>
  </div>
</div>

    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Facturacion/CreacionModulos.js" type="text/javascript"></script>
    <script src="../js/jQuery-validate.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />


</body>
</html>



 


    
