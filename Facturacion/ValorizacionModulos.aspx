<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ValorizacionPracticas.aspx.cs" Inherits="Facturacion_ValorizacionPracticas" %>



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
.ttb1{background-color:#FFF;height:278px;width:500px;margin-left:15px;margin-right:15px;overflow:inherit;overflow-x:hidden}
.pp1{background-color:#666666;padding:5px;color:#FFF;}
.pp1 input[type=text]{width:50px;margin:0px 10px 0px 5px}
.pp1 input[type=checkbox]{margin:0px 10px 5px 20px }
.pp1 label{display:inline}

</style>

<body>

<div class="container">
  <div class="contenedor_1" style="position:relative;min-height:500px">

<h3>Valorización y Asignación de Módulos</h3>
<div class="ttb1" style="width:900px;margin-left:auto;margin-right:auto">
               <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>
    <div id="TablaPedidos_div">                      
        <table class="table table-hover">
            <thead>
                <th>Convenio</th>
                <th>Código</th>
                <th>Módulo</th>
                <th>Gasto</th>
                <th>Honorario</th>
                <th></th>
                <tbody id="TablaPracticas">

                </tbody>
            </thead>
        </table>
    </div>
</div>      
      <div>
        <ul class="nav nav-tabs" data-tabs="tabs">
          <li class="active"><a data-toggle="tab" id="atab1" href="#tab1">Datos de la práctica a ingresar</a></li>
           <li style="display:none;"><a data-toggle="tab" id="atab2" href="#tab2">Valorizacion Masiva</a></li>
        </ul>
      </div>

      <!--DATOS DE LA PRACTICA A INGRESAR-->
      <div id="my-tab-content" class="tab-content" style="height:120px;">
        <div class="tab-pane active fade in DP" id="tab1">
          <div class="pull-left">
            <form class="form-horizontal" >
              
               <div class="control-group">
                <label class="control-label">Nomenclador</label>
                <div class="controls cch1">
                    <select id="cbo_Nomencla" class="span8">
                        <option value="1">Nomenclador Actual</option>
                    </select>
                </div>
              </div>

              <div class="control-group">
                <label class="control-label">Convenio</label>
                <div class="controls cch1">
                    <select id="cbo_convenios" class="span8">
                    <option value="0"></option>
                    </select>
                </div>
              </div>


              <div  class="control-group">
                <label class="control-label">Código</label>
                <div class="controls">
                  <input class="span2" id="txtCodigo" type="text">
                	<span style="margin-left:20px">Módulo</span> <select id="cboPracticas" class="span6"></select>
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
                    <select id="cbo_ConvMasivo" class="span8"></select>
                </div>
              </div>


              <div  class="control-group">
                <label class="control-label">Cod. Desde</label>
                <div class="controls">
                  <input class="span2" id="txtCodigoDesde" type="text">
                	<span style="margin-left:20px">Cod. Hasta</span> <input class="span2" id="txtCodigoHasta" type="text">
                </div>
              </div>

              <div class="control-group" style=" margin-left:50px;">
               <span style="margin-left:20px; margin-right:10px;">Valor</span>
                  <input id="rdValor" name="grupo1" type="radio" class="input-xlarge"/>
                  <span style="margin-left:20px; margin-right:10px;">Porcentaje</span><input id="rdPorcentaje" name="grupo1" type="radio" class="input-xlarge"/>
                  <span style="margin-left:20px; margin-right:10px;">&nbsp;</span><input id="txtValor" name="txtValor" type="text" class="span1"/>
                  <span style="margin-left:240px; margin-right:10px; margin-top:50px;">&nbsp;</span><a id="btnActualizarMasivo" class="btn btn-info">Actualizar</a> 
                  <a id="btnCancelarMasivo" class="btn">Cancelar</a>
              </div>

            </form>
          </div>
          
        

          <div class="clearfix"></div>
    
          
        </div>



        <!--CONTACTO Y DOMICILIO-->
        
      </div>
<form id="frm_Valores">
<div class="pp1">

<div id="controltxt_Vbono" class="control-group" style="display:inline; display:none;">
V. Bono <input type="text" id="txt_Vbono" name="txt_Vbono" class="span2" value="0" />
</div>
<div id="controltxt_Vaa" class="control-group" style="display:inline; display:none;">
A Car. Afiliado <input type="text" id="txt_Vaa" name="txt_Vaa" class="span2" value="0"/>
</div>
<div id="controltxt_Vaci" class="control-group" style="display:inline; display:none;">
A Car. Sec. / Ins. <input type="text" id="txt_Vaci" name="txt_Vaci" class="span2" value="0"/>
</div>
<div id="controltxt_VNN" class="control-group" style="display:inline;">
V.Facturacion <input type="text" id="txt_VNN" name="txt_VNN" class="span2" title="Valor Facturacion" style="width:60px;" rel="tooltip" value="0.00"/>
</div>
<%--V. Guardia <input type="text" id="txt_VGuardia" class="span2"/>--%>
<div id="controltxt_VG" class="control-group" style="display:inline;display:none;">
V. Gastos <input type="text" id="txt_VG" name="txt_VG" class="span2" value="0"/>
</div>
<div id="controltxt_Honorario" class="control-group" style="display:inline;">
Honorario <input type="text" id="txt_Honorario" name="txt_Honorario" class="span2" value="0.00"/>
</div>

</div>
</form>
      <div class="pie_gris" id="pie">
        <a id="btn_Actualizar" class="btn btn-info pull-right" onclick="javascript:Guardar();">Actualizar</a> 
        <a id="Cancelar" class="btn pull-right">Cancelar</a>
        <a id="btnPrint" class="btn btn pull-right"><i class="icon-print"></i>&nbsp;Imprimir</a>
        <div class="clearfix"></div>
      </div>
  </div>
</div>

    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
<%--    <script src="../js/General.js" type="text/javascript"></script>--%>
    <script src="../js/Hospitales/Facturacion/ValorizacionModulos.js" type="text/javascript"></script>
    <script src="../js/jQuery-validate.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript">
            parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Valorización y Asignación de Módulos</strong>";
     
    </script>

</body>
</html>



 


    
