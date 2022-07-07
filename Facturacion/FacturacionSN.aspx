<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FacturacionSN.aspx.cs" Inherits="Facturacion_FacturacionSN" %>

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
    <link rel="stylesheet" href="/resources/demos/style.css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:530px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Proceso de Facturación</span></div>
      <form id="frm_Main" name="frm_Main">
          <div style="padding:0px 15px 0px 15px; height:100px;">
            <div class="row">
                <div id="controltxtFechadia" class="span5">
                    <label for="txtFechadia" style="display:inline; margin-top:10px;">Fecha: </label>
                    <input type="text" id="txtFechadia" name="txtFechadia" class="input-mini date" style="margin-top:10px; width:90px;">
              </div>
              <div id="controltxtAnio" class="span5">
                    <label for="txtAnio" style="display:inline; margin-top:10px;">Periodo: </label>
                    <input type="text" id="txtAnio" name="txtAnio" class="input-mini date" style="width:90px;">
                    <select name="txtMes" id="txtMes" class="input-medium">
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
              </div>
            </div>
            
            <div class="row">
              
               <div id="controlcboFactura" class="span5">
                    <label for="cboFactura" style="display:inline; margin-top:10px;">Factura a: </label>
                    <select id="cboFactura" name="cboFactura" class="input-xlarge" style="margin-top:10px;">
                        <option value="0">Mutual</option>
                        <option value="1">Paciente</option>
                    </select>
              </div>


              <div id="controlcbo_Tipo" class="span6">
                    <label for="cbo_Tipo" style="display:inline; margin-top:10px;">Tipo: </label>
                    <select id="cbo_Tipo" name="cbo_Tipo" class="input-xlarge" style="margin-top:10px;">
                        <option value="0">Ambulatorio</option>
                        <option value="1">Internación</option>
                        <option value="2">Otros</option>
                    </select>
              </div>
            </div>
        
        <div class="row">
              <div id="controlcbo_OS" class="span5">
                    <label for="cbo_OS" style="display:inline; margin-top:10px;">Obra Social: </label>
                    <select id="cbo_OS" name="cbo_OS" class="input-xlarge" style="margin-top:10px;">
                 
                    </select>
              </div>


            <div id="controltxtHastaParte" class="span5" style="display:none;">
                   <label for="txtPaciente" style="display:inline; margin-top:10px;">Paciente: </label>
                    <input type="text" placeholder="Apellido y Nombre" id="txtPaciente" name="txtPaciente" class="input-large" maxlength="30" style="margin-top:10px;"/>
                    <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black"></i></a>
                    <input type="hidden" id="txtNHC" name="txtNHC" value="0"/>
              </div>
             
              <div id="controlcbo_Puestos" class="span5">
                    <label for="cbo_Puestos" style="display:inline; margin-top:10px;">Puesto: </label>
                    <select id="cbo_Puestos" name="cbo_Puestos" class="input-xlarge" style="margin-top:10px;">
                 
                    </select>
              </div>

        </div>
      
        </div>
     
</form>

          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:15px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaPartes_div" class="tabla" style="height:290px;width:100%;">
               <div id="cargando" style="text-align:center; display:none;">
                <br /><br />
                <img src="../img/Espere.gif" /><br />Procesando...
              </div>
              <table id="tabla" class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th><input type="checkbox" id="chk_todos" /></th>        
                    <th>Nro.Rendición</th>
                    <th>Paciente</th>
                    <th>Obra Social</th>
                    <th>Total</th>
                  </tr>
                  <tbody id="trx"></tbody>
                </thead>

              </table>
            </div>
        </div>

<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:900px;">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4>Datos de la Factura</h4>
  </div>
  <div class="modal-body" style="margin-left:10px; margin-right:10px;">
   <div class="row">   
      <div id="controltxtGastoTotal" class="span3">
                   <label for="txtGastoTotal" style="display:inline; margin-top:10px;">Gasto: </label>
                    <input type="text" id="txtGastoTotal" name="txtGastoTotal" class="input-medium totales" style="margin-top:10px;"/>
      </div>
      <div id="controltxtHonorarioTotal" class="span3">
                   <label for="txtHonorarioTotal" style="display:inline; margin-top:10px;">Hono.: </label>
                    <input type="text" id="txtHonorarioTotal" name="txtHonorarioTotal" class="input-medium totales" style="margin-top:10px;"/>
      </div>
      <div id="controltxtMedicamentosTotal" class="span3">
                   <label for="txtMedicamentosTotal" style="display:inline; margin-top:10px;">Medic.: </label>
                    <input type="text" id="txtMedicamentosTotal" name="txtMedicamentosTotal" class="input-medium totales" style="margin-top:10px;"/>
      </div>
      <div id="controltxtObservacion" class="span3">
                   <label for="txtObservacion" style="display:inline; margin-top:10px;">Observaciones: </label>
                   <textarea id="txtObservacion" placeholder="Ingrese Observacion..." style="height:70px; width:675px;">
                   </textarea>
      </div>
    </div>
    <div class="row">
      <div id="controltxtNroFactura" class="span5">
                   <label for="txtNroFactura" style="display:inline; margin-top:10px;">Nro. Fact: </label>
                    <input type="text" id="txtNroFactura" name="txtNroFactura" maxlength="13" class="input-medium" style="margin-top:10px;"/>
      </div>
    </div>
      <h4>Datos de la Obra Social</h4>
    <div class="row">
             <div id="controltxtNombreOs" class="span5">
                 <label for="txtNombreOs" style="display:inline; margin-top:10px;">Obra Social: </label>
                 <input type="text" id="txtNombreOs" name="txtNombreOs" class="input-medium" style="margin-top:10px;"/>
             </div>
             <div id="controltxtCUITOS" class="span5">
                 <label for="txtCUITOS" style="display:inline; margin-top:10px;">CUIT: </label>
                 <input type="text" id="txtCUITOS" name="txtCUITOS" class="input-medium" style="margin-top:10px;"/>
             </div>
             <div id="controltxtDireccion" class="span5">
                 <label for="txtDireccion" style="display:inline; margin-top:10px;">Dirección: </label>
                 <input type="text" id="txtDireccion" name="txtDireccion" class="input-medium" style="margin-top:10px;"/>
             </div>
    </div>
  </div>
  <div class="modal-footer">
    <div class="pull-right">
        <button id = "btnCancelarFact" class="btn btn-danger"><i class=" icon-remove icon-white"></i>&nbsp;Cancelar</button>
        <button id = "btnConfirmaFact" class="btn btn-success"><i class="icon-ok-circle icon-white"></i>&nbsp;Confirmar</button>
    </div>
  </div>
</div>


        <div class="clearfix"></div>

<div class="pie_gris">
    <div class="pull-right">
        <button id = "btnBuscarFacturas" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar Facturas</button>
        <button id = "btnBuscar" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
        <button id = "btnFacturar" class="btn btn-success"><i class="icon-ok-circle icon-white"></i>&nbsp;Facturar</button>
    </div>
</div>
      </div>


<!--Pie de p�gina-->
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/Hospitales/Facturacion/FacturacionSN.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
 

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Proceso de Facturación</strong>";

</script> 

</body>
</html>




