<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CreacionPractica.aspx.cs" Inherits="Facturacion_CreacionPractica" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<style>
.cch1{margin-top:5px}
.ttb1{background-color:#FFF;height:150px;width:500px;margin-left:15px;margin-right:15px;overflow:inherit;overflow-x:hidden}
.pp1{background-color:#666666;padding:5px;color:#FFF;}
.pp1 input[type=text]{width:50px;margin:0px 10px 0px 5px}
.pp1 input[type=checkbox]{margin:0px 10px 5px 20px }
.pp1 label{display:inline}
</style>

<body>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Alta de Prácticas</strong>";
    </script>
<div class="container">
  <div class="contenedor_1" style="position:relative;min-height:580px">

<h3>Alta de Prácticas</h3>
<div class="ttb1" style="width:900px; height:200px;margin-left:auto;margin-right:auto">
    <div id="cargando" style="text-align:center; display:none;">
        <br /><br />
        <img src="../img/Espere.gif" /><br />
        Cargando Prácticas...
    </div>    
<table class="table table-hover" id="tablapracticas" style="font-size:12px;">
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
          <li class="active"><a data-toggle="tab" href="#tab1">Datos de la práctica a ingresar</a></li>
          <li><a data-toggle="tab" href="#tab2">Especialidades</a></li>
        </ul>
      </div>

      <div id="my-tab-content" class="tab-content" style="height:240px">
        <div class="tab-pane active fade in DP" id="tab1">
          <div class="pull-left">
            <form class="form-horizontal" >
              <div  class="control-group">
                <label class="control-label">Código</label>
                <div class="controls">
                  <input class="span2 numero" id="txtCodigo" type="text" maxlength="6">
                	<span style="margin-left:20px">Descripción</span> <input id="txtPracticas" class="span6" type="text">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label"><button type="button" id="btnSugerenciasEstado" class="btn" data-toggle="button">Sugerencias</button></label>
                <div class="controls cch1">
                    <select id="cbo_sugerencias" class="span9">
                    </select>
                </div>
              </div>
             <div class="control-group">
                   <label for="cbo_complejidad" style="display:inline; margin-left:67px;">Complejidad</label>
                  <select id="cbo_complejidad" class="span2"></select>
                  <label for="cbo_carencia" style="display:inline;margin-left:20px;">Carencia</label>
                  <select id="cbo_carencia" class="span2" style="margin-left:38px;"></select>
            </div>

            </form>
          </div>
          
          <div class="clearfix"></div>

<form class="form-horizontal DP pull-left" style="margin-top:-14px;">
<div class="control-group">
                <label  class="control-label">Tope anual</label>
                <div class="controls">
                  <input id="txt_topeanual" maxlength="3" class="span2 numero" type="text" value="0"/>
                  <span style="margin-left:20px">Tope mensual</span>&nbsp;
                  <input id="txt_topemensual" class="span2 numero" type="text" maxlength="3" value="0"/>
                </div>
              </div>
<div class="control-group">
                <label class="control-label"><input id="ck_noafectavglobal" type="checkbox"></label>
                <div class="controls cch1">
                  No afecta valorizacion global
                </div>
              </div>
</form>          
          
        </div>
        
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
          
          <div class="pull-left" style="40%">
          <div class="label_top">Especialidad</div>
          <div><select class="span5" id="cbo_Especialidad" type="text"></select></div>
           <a class="btn" onclick="javascript:AgregarEsp();">Agregar</a>

          </div>
        </div>
      </div>

<div class="pp1" style="display:none;">
<form id="frm_Valores">
<div id="controltxt_VNN" class="control-group" style="display:inline;">
    V.Facturacion <input type="text" id="txt_VNN" name="txt_VNN" class="span2 numero" value="0"/>
</div>
<div id="controltxt_VGuardia" class="control-group" style="display: none;">
    V. Guardia <input type="text" id="txt_VGuardia" name="txt_VGuardia" class="span2 numero" value="0"/>
</div>
<div id="controltxt_VG" class="control-group" style="display:inline;">
    V. Gastos <input type="text" id="txt_VG" name="txt_VG" class="span2 numero" value="0"/>
</div>
<div id="controltxt_Honorario" class="control-group" style="display:inline;">
    V. hono. <input type="text" id="txt_Honorario" name="txt_Honorario" class="span2 numero" value="0"/>
</div>
<label><input id="cbo_SFOS" type="checkbox"/><span>Se facturó O.S.</span></label>
<label><input id="cbo_CH" type="checkbox"/><span>Cobra por honorarios</span></label>
</form>
</div>

      <div class="pie_gris">
        <a id="btn_Actualizar" class="btn btn-info pull-right" onclick="javascript:Guardar();"><i class="icon-ok"></i>&nbsp;Confirmar</a> 
        <a id="Cancelar" class="btn btn-danger pull-right"><i class="icon-remove"></i>&nbsp;Cancelar</a>
        <a id="btnSugerencias" class="btn pull-right"><i class="icon-plus"></i>&nbsp;Sugerencias</a>
        <div class="clearfix"></div>
      </div>
  </div>
</div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Facturacion_Cap/CreacionPractica.js" type="text/javascript"></script>
     <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
</body>
</html>



 


    
