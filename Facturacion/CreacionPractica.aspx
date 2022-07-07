<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CreacionPractica.aspx.cs" Inherits="Facturacion_CreacionPractica" %>



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
<div class="ttb1" style="width:900px;margin-left:auto;margin-right:auto">
    <div id="cargando" style="text-align:center; display:none;">
        <br /><br />
        <img src="../img/Espere.gif" /><br />
        Cargando Prácticas...
    </div>    
<table class="table table-hover" id="tablapracticas">
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
          <li style="display:none;"><a data-toggle="tab" href="#tab2">Especialidades</a></li>
        </ul>
      </div>

      <!--DATOS DE LA PRACTICA A INGRESAR-->
      <div id="my-tab-content" class="tab-content" style="height:221px">
        <div class="tab-pane active fade in DP" id="tab1">
          <div class="pull-left">
            <form class="form-horizontal" >
              <div  class="control-group">
                <label class="control-label">Código</label>
                <div class="controls">
                  <input class="span2" id="txtCodigo" type="text">
                	<span style="margin-left:20px">Descripción</span> <input id="txtPracticas" class="span6" type="text">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label"><button type="button" id="btnSugerenciasEstado" class="btn" data-toggle="button">Sugerencias</button></label>
                <div class="controls cch1">
                    <select id="cbo_sugerencias" class="span8"; style="width:705px"></select>
                </div>
              </div>
             <div class="row" style="margin-left:15px;">
                <div class="span4">
                   <label for="cbo_complejidad" style="display:inline; margin-left:33px">Complejidad</label>
                  <select id="cbo_complejidad" class="input-small"; style="width:138px"></select>
                </div>
                 <div class="span6">
                  <label for="cbo_carencia" style="display:inline;">Carencia</label>
                  <select id="cbo_carencia" class="input-medium"></select>
                </div>
            </div>

            </form>
          </div>
          
          <div class="clearfix"></div>

<form class="form-horizontal DP pull-left" style="margin-top:-14px;">
<div class="control-group">
                <label  class="control-label">Tope anual</label>
                <div class="controls">
                  <input id="txt_topeanual" maxlength="11" class="span2" type="text" value="0">
                  <span style="margin-left:20px">Tope mensual</span>&nbsp;
                  <input id="txt_topemensual" class="span2" type="text" value="0"; style="width:136px; margin-left:4px"/>
                </div>
              </div>
<div class="control-group">
                <label class="control-label"><input id="ck_noafectavglobal" type="checkbox"></label>
                <div class="controls cch1" >
                  No afecta valorizacion global
                </div>
              </div>
</form>          
          
        </div>
        
        <!--CONTACTO Y DOMICILIO-->
        <div class="tab-pane fade in" id="tab2">
<div class="pull-left ttb1">
<table class="table">
<thead>
<%--<th>Codigo</th>--%>
<th>Descripción</th>
<%--<th>Def</th>
<th>Turno</th>--%>
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
          
          <%--<label class="checkbox"><input type="checkbox">Especialidad por defecto</label>
          <label class="checkbox"><input type="checkbox">Para turnos</label>--%>
          
           <a class="btn" onclick="javascript:AgregarEsp();">Agregar</a>

          </div>
        </div>
      </div>

<div class="pp1" style="display:none;">
<form id="frm_Valores">
<div id="controltxt_VNN" class="control-group" style="display:inline;">
    V.Facturacion <input type="text" id="txt_VNN" name="txt_VNN" class="span2" value="0"/>
</div>
<div id="controltxt_VGuardia" class="control-group" style="display: none;">
    V. Guardia <input type="text" id="txt_VGuardia" name="txt_VGuardia" class="span2" value="0"/>
</div>
<div id="controltxt_VG" class="control-group" style="display:inline;">
    V. Gastos <input type="text" id="txt_VG" name="txt_VG" class="span2" value="0"/>
</div>
<div id="controltxt_Honorario" class="control-group" style="display:inline;">
    V. hono. <input type="text" id="txt_Honorario" name="txt_Honorario" class="span2" value="0"/>
</div>
<label><input id="cbo_SFOS" type="checkbox"/><span>Se facturó O.S.</span></label>
<label><input id="cbo_CH" type="checkbox"/><span>Cobra por honorarios</span></label>
</form>
</div>

      <div class="pie_gris">
        <a id="btn_Actualizar" class="btn btn-info pull-right" onclick="javascript:Guardar();">Actualizar</a> 
        <a id="Cancelar" class="btn pull-right">Cancelar</a>
        <a id="btnSugerencias" class="btn pull-right">Sugerencias</a>
        <div class="clearfix"></div>
      </div>
  </div>
</div>

    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Facturacion/CreacionPractica.js" type="text/javascript"></script>
    <script src="../js/jQuery-validate.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />


</body>
</html>



 


    
