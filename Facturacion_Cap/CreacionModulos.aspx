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
<div class="ttb1" style="width:900px;margin-left:auto;margin-right:auto">
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
      <div>
        <ul class="nav nav-tabs" data-tabs="tabs">
          <li class="active"><a data-toggle="tab" href="#tab1">Datos del módulo a ingresar</a></li>          
        </ul>
      </div>
      <div id="my-tab-content" class="tab-content" style="height:71px">
        <div class="tab-pane active fade in DP" id="tab1">
          <div class="pull-left">
            <form class="form-horizontal" >
              <div  class="control-group">
                <label class="control-label">Código</label>
                <div class="controls">
                  <input class="span2 numero" id="txtCodigo" type="text" maxlength="8">
                	<span style="margin-left:20px">Descripción</span> <input id="txtPracticas" class="span6" type="text" maxlength="60">
                </div>
              </div>
            </form>
          </div>
          
          <div class="clearfix"></div>
          
        </div>
        <div class="tab-pane fade in" id="tab2">
<div class="pull-left ttb1">
<table class="table">
<thead>
<th>Codigo</th>
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
          
          <div class="pull-left" style="40%">
          <div class="label_top">Especialidad</div>
          <div><select class="span5" id="cbo_Especialidad" type="text"></select></div>
           <a class="btn" onclick="javascript:AgregarEsp();">Agregar</a>

          </div>
        </div>
      </div>
<form id="frm_Valores">
    <div class="pp1">
    <div id="controltxt_VNN" class="control-group" style="display:inline;">
    V.N.N. <input type="text" id="txt_VNN" name="txt_VNN" class="span2 numeroDecimal" value="0"/>
    </div>
    <div id="controltxt_VG" class="control-group" style="display:inline;">
    Gastos <input type="text" id="txt_VG" name="txt_VG" class="span2 numeroDecimal" value="0"/>
    </div>
    <div id="controltxt_Honorario" class="control-group" style="display:inline;">
    Honorarios <input type="text" id="txt_Honorario" name="txt_Honorario" class="span2 numeroDecimal" value="0"/>
    </div>
    <label><input id="cbo_SFOS" type="checkbox"/><span>Se facturó O.S.</span></label>
    <label><input id="cbo_CH" type="checkbox"/><span>Cobra por honorarios</span></label>
    </div>
</form>
      <div class="pie_gris">
        <a id="btn_Actualizar" class="btn btn-info pull-right" onclick="javascript:Guardar();"><i class="icon-ok"></i>&nbsp;Confirmar</a> 
        <a id="Cancelar" class="btn btn-danger pull-right"><i class="icon-remove"></i>&nbsp;Cancelar</a>
      </div>
  </div>
</div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Facturacion_Cap/CreacionModulos.js" type="text/javascript"></script>
</body>
</html>

    
