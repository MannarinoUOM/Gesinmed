<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Descontar_Stock.aspx.cs" Inherits="Farmacia_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
       <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />

</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1" style="height:500px">
   <div class="contenedor_3" style="height:450px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Ajustar Stock</span></div>
       <form id="frm_Medicamentos">
        <div class="row">
             <div class="combos" style="margin-left:40px;">
                <div id="Medicamento_val" style="display:none;">0</div>
                <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
                <label for="cbo_Medicamento" style="display:inline;width:80px;" class="span1">Insumo:</label>
                    <input type="text" id="cbo_Medicamento" data-provide="typeahead" autocomplete="off" style="width:600px;" />
             </div> 
        </div>
        <div class="row">
            <div class="span6" style="margin-left:50px; margin-top:0px;">
                <div id="controlote" class="control-group">
                    <label for="lote" style="display:inline;">Nro. de Lote:</label>
                    <select id="cbo_Lotes" class="input-large" style="margin-left:5px;">
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="span6" style="margin-left:50px; margin-top:0px;">
                <div id="Div1" class="control-group">
                    <label for="lblFechaVencimiento" style="display:inline;">Vencimiento: </label>
                       <span id="lblFechaVencimiento" style="margin-left:5px;"></span>
                </div>
            </div>
            <div class="span6" style="margin-left:50px; margin-top:0px;">
                <div id="Div2" class="control-group">
                    <label for="lblStock" style="display:inline;">Stock: </label>
                       <span id="lblStock" style="margin-left:5px;"></span>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="span4" style="margin-left:50px; margin-top:0px;">
                <div id="controlcantidad" class="control-group">
                <label for="cantidad" style="display:inline;">Cantidad:</label>
                  <input type="text" id="cantidad" name="cantidad" class="input-small numero" maxlength="6" style="margin-left:25px"/>
                  </div>
            </div>
        </div>
        <div id="div_Motivo" class="row">
        <h3 style="margin-left:50px;">Motivo</h3>
            
            <div class="span5 negativo" style="margin-left:50px; margin-top:10px;">
             Rotura
               <input id="chkRotura" type="radio" name="check" style="margin-top:-3px; margin-left:5px;" class="opcion"/>
            </div>
            
            <div class="span5 negativo" style="margin-top:10px; margin-left:10px;">
            Vencimiento
               <input id="chkVencimiento" type="radio" style="margin-top:-3px;margin-left:5px;" name="check" class="opcion"/>
            </div>
            
            <div class="span5 negativo" style="margin-left:50px; margin-top:10px;">
             Devolución
               <input id="chkDevolucion" type="radio" name="check" style="margin-top:-3px; margin-left:5px;" class="opcion"/>
            </div>

             <div class="span5" style="margin-left:50px; margin-top:10px;">
             Arqueo
               <input id="chkArqueo" type="radio" name="check" style="margin-top:-3px; margin-left:5px;" class="opcion"/>
               <label id="lblArqueo" style="display:none">La cantidad del insumo que se está ajustando en el stock, ¿Se agrega o se descuenta del stock actual?</label>
               <div id="opcion" style="display:none"><label style="display:inline">Agregar &nbsp<input type="radio" style="margin-top:0px" name="opcion" id="rdoSuma" checked=checked/></label>&nbsp&nbsp<label style="display:inline">Descontar &nbsp<input type="radio" style="margin-top:0px" name="opcion" id="rdoResta"/></label></div>
            </div>
        </div>

        <div class="pie_gris">
               <a id="btnCargar" class="btn btn-info pull-right"><i class="icon-ok icon-white"></i>&nbsp;Confirmar</a>
               <a id="btnCancelar" class="btn btn-danger pull-right"><i class="icon-remove icon-white"></i>&nbsp;Cancelar</a>
        </div>
        </form>
        
      </div>
    </div>
  </div>

<!--Pie de p�gina-->
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/Hospitales/Farmacia/Descontar_Stock.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Ajustar Stock</strong>";
</script> 
</body>
</html>


