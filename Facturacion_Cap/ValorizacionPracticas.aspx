<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ValorizacionPracticas.aspx.cs" Inherits="Facturacion_ValorizacionPracticas" %>



<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
        <link href="../css/barra.css" rel="stylesheet" type="text/css" />

</head>

<style>
.cch1{margin-top:5px}
.ttb1{background-color:#FFF;height:278px;width:500px;margin-left:15px;margin-right:15px;overflow:inherit;overflow-x:hidden}
.pp1{background-color:#666666;padding:5px;color:#FFF;}

.pp2 input[type=text]{width:80px;margin:0px 10px 0px 5px}
.pp1 input[type=text]{width:50px;margin:0px 10px 0px 5px}

.pp1 input[type=checkbox]{margin:0px 10px 5px 20px }
.pp1 label{display:inline}

</style>

<body>

<div class="container">
  <div class="contenedor_1" style="position:relative;min-height:560px;">
<div class="ttb1" style="width:900px;margin-left:auto;margin-right:auto; height:239px;">
 <div id="cargando" style="text-align:center; display:none;">
                                <br /><br />
                                <img src="../img/Espere.gif" /><br />
                                Cargando...
    </div>        
<div id="TablaBonos" style="font-size:12px;">
    <table class="table table-hover">
        <thead id="thread">
            <th>Convenio</th>
            <th>Especialidad</th>
            <th>Código</th>
            <th>Práctica</th>
            <th>Valor</th>
            <th></th>
        </thead>
        <tbody id="TablaPracticas">

        </tbody>
    </table>
</div>
</div>    
<br/>    
      <div>
        <ul class="nav nav-tabs" data-tabs="tabs">
          <li class="active"><a data-toggle="tab" id="atab1" href="#tab1">Datos de la práctica a ingresar</a></li>
          <li><a data-toggle="tab" id="atab2" href="#tab2">Valorizacion Masiva</a></li>
        </ul>
      </div>
      <div id="my-tab-content" class="tab-content" style="height:211px;">
        <div class="tab-pane active fade in DP" id="tab1">
          <div class="pull-left">
            <form class="form-horizontal">
              

              <div class="control-group">
                <label class="control-label">Convenio</label>
                <div class="controls cch1">
                    <select id="cbo_convenios" class="span8">
                    <option value="">Seleccione Convenio...</option>
                    </select>
                </div>
              </div>

              <div class="control-group">
                <label class="control-label">Nomenclador</label>
                <div class="controls cch1">
                    <select id="cbo_Nomenclador" class="span8">
                    <option value="">Seleccione Nomenclador...</option>
                    </select>
                </div>
              </div>


              <div  class="control-group">
                <label class="control-label">Código</label>
                <div class="controls">
                  <input class="span2 numero" id="txtCodigo" type="text" maxlength="6">
                	<span style="margin-left:20px">Práctica</span> <select id="cboPracticas" class="span6"></select>
                </div>
              </div>

              <div  class="control-group">
                <label class="control-label">Especialidad</label>
                <div class="controls">
                  <select class="span8" id="cbo_Especialidad"></select>                  
                </div>
              </div>
            </form>
          </div>
          
          <div class="clearfix"></div>
    
          
        </div>

       <div class="tab-pane fade in DP" id="tab2">
          <div class="pull-left">
            <form class="form-horizontal" >
              
              <div class="control-group">
                <label class="control-label">Convenio</label>
                <div class="controls cch1">
                    <select id="cbo_ConvMasivo" class="span8 masivo">
                    <option value="">Seleccione Convenio...</option>
                    </select>
                </div>
              </div>

              <div class="control-group">
                <label class="control-label">Nomenclador</label>
                <div class="controls cch1">
                    <select id="cbo_Nomencla_Masivo" class="span8 masivo">
                    <option value="">Seleccione Nomenclador...</option>
                    </select>
                </div>
              </div>


              <div  class="control-group">
                <label class="control-label">Especialidad</label>
                <div class="controls cch1">
                    <select id="cbo_EspMasivo" class="span8 masivo"></select>
                </div>
              </div>

              <div class="control-group" style=" margin-left:50px;">
               <span style="margin-left:20px; margin-right:2px;">Cod. Desde</span>
                  <input id="txtCodigoDesde" name="principal" type="text" class="input-small numero masivo" maxlength="6" style="margin-right: 8px;"/>
                  <span style="margin-left:20px; margin-right:2px;">Cod. Hasta</span>
                  <input id="txtCodigoHasta" name="principal" type="text" class="input-small numero masivo" maxlength="6"/>
                  <span style="margin-left:20px; margin-right:2px;" class="NomenclaBase">Base</span>
                  <select id="cbo_NomencladorBase" class="input-medium span3 NomenclaBase" style="width: 240px;">
                    <option value="0">Seleccione Base...</option>
                  </select>
              </div>

              <div class="control-group" style=" margin-left:50px;">
               <span style="margin-left:20px; margin-right:10px;">Valor Fijo</span>
                  <input id="rdValor" name="TipoAumento" type="radio" class="input-xlarge masivo" value="Valor"/>
                  <span style="margin-left:20px; margin-right:10px;">Porcentaje (%)</span><input id="rdPorcentaje" name="TipoAumento" type="radio" class="input-xlarge masivo" value="Porcentaje" checked/>
                  <span style="margin-left:20px; margin-right:10px;">Valor</span><input id="txtValor" name="txtValor" type="text" class="span2 numeroDecimal masivo" maxlength="10"/>
                  <span style="margin-left:200px; margin-right:10px; margin-top:50px;">&nbsp;</span><a id="btnActualizarMasivo" class="btn btn-info">Actualizar</a> 
                  <a id="btnCancelarMasivo" class="btn btn-danger">Cancelar</a>
              </div>

            </form>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
<form id="frm_Valores">
<div class="pp1">
<div id="controltxt_Vbono" class="control-group" style="display:inline;">
Bono <input type="text" id="txt_Vbono" name="txt_Vbono" class="span2 numeroDecimal" value="0"/>
</div>
<div id="controltxt_Vaa" class="control-group" style="display:inline;">Monotributo <input type="text" id="txt_Vaa" name="txt_Vaa" class="span2 numeroDecimal" value="0"/>
</div>
<div id="controltxt_Vaci" class="control-group" style="display:inline;">
A Car. Sec. / Ins. <input type="text" id="txt_Vaci" name="txt_Vaci" class="span2 numeroDecimal" value="0"/>
</div>
<div id="controltxt_VNN" class="control-group" style="display:inline;">
Fact <input type="text" id="txt_VNN" name="txt_VNN" style="width:80px;" class="span2 numeroDecimal" title="Valor Facturado" rel="tooltip" value="0"/>
</div>
<div id="controltxt_VG" class="control-group" style="display:inline;">
Gastos <input type="text" id="txt_VG" name="txt_VG" style="width:80px;" class="span2 numeroDecimal" value="0"/>
</div>
<div id="controltxt_Honorario" class="control-group" style="display:inline;">
Hon <input type="text" id="txt_Honorario" name="txt_Honorario" class="span2 numeroDecimal" value="0"/>
</div>
</div>
</form>
      <div class="pie_gris" id="pie">
        <a id="btn_Actualizar" class="btn btn-info pull-right" onclick="javascript:Guardar();"><i class="icon-ok"></i>&nbsp;Actualizar</a> 
        <a id="Cancelar" class="btn btn-danger pull-right"><i class="icon-remove-circle"></i>&nbsp;Cancelar</a>
        <a id="btn_Imprimir" class="btn pull-right"><i class="icon-print"></i>&nbsp;Imprimir</a> 
        <div class="clearfix"></div>
      </div>
  </div>
</div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/General.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/Hospitales/Facturacion_Cap/ValorizacionPracticas.js" type="text/javascript"></script>
    <script type="text/javascript">        parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Valorización y Asignación de Práctica a Convenios</strong>";</script>
</body>
</html>



 


    
