<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DevolucionporServicio.aspx.cs" Inherits="Farmacia_DevolucionporServicio" %>


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
  <div class="contenedor_1">
      <div id="cargando2" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>
    <div id="cont_datospac" class="contenedor_2"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos de la Devolución</span></div>
      <form class="form-horizontal" >
         <div class="control-group">
          <label class="control-label" for="cbo_Servicio">Servicio</label>
          <div class="controls">
            <select id="cbo_Servicio"></select>
            
        </div>
        </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a id="desdeaqui" class="btn btn-info">Siguiente</a>
                <a id="btnDevoluciones" class="btn btn-warning">Buscar Devoluciones</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui" style="height:500px">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
        <div>Nro. Devolución: <strong><span id="CargadoNumero"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        <div>Fecha: <strong><span id="CargadoFecha"></span></strong>&nbsp;&nbsp;&nbsp;</div>
          <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:350px;">
        <div class="">
          <div class="contenedor_4" style="height:150px;">
                <form id="frm_input1" class="form-horizontal" role="form" style="margin-left:-20px;">
                  
                  <div class="form-group" style="margin:5px; display:none;">
                    <label style="margin-right:5px;" class="col-sm-2 control-label">Monodroga</label>
                    <div class="col-sm-10">
                    <span id="cbo_Monodroga_val" style="display:none;">0</span>
                      <select id="cbo_Monodroga" class="form-control">
                      </select>
                    </div>
                  </div>
                  
                  
                  <div class="form-group" style="margin:5px;">
                     <label for="cbo_Medicamento" class="col-sm-2 control-label" style="margin-right:5px;">Insumo</label>
                    <div class="col-sm-10">
                        <input type="text" id="cbo_Medicamento" data-provide="typeahead" autocomplete="off" class="form-control" />
                    </div>
                  </div>

                   <div class="form-group" style="margin:5px;">
                     <label for="cboLote" class="col-sm-2 control-label" style="margin-right:5px;">Nro. de Lote</label>
                       <div class="col-sm-10">
                        <select  id="cboLote" class="form-control" disabled="disabled"></select>
                      </div>
                   </div>

                  <div class="form-group" style="margin:5px;">
                    <label for="cbo_Deposito" style="margin-right:5px;" class="col-sm-2 control-label">Depósito</label>
                    <div class="col-sm-10">
                        <select id="cbo_Deposito" class="form-control">
                        </select>
                    </div>
                  </div>
                  <div class="form-group" style="margin:5px;">
                    <label id="lbl_txtFechaVenc" for="txtFechaVenc" style="margin-right:5px; display:none" class="col-sm-2 control-label">Vencimiento</label>
                    <input type="text" maxlength="10" id="txtFechaVenc" style="display:none" />
                    <div class="col-sm-10">
                        <select id="cbo_Lotes" class="form-control" style="display:none;">
                        </select>
                        
                        <input type="hidden" name="txtLotes" id="txtLotes" rel='Ingrese Numero de Lote' />
                    </div>
                  </div>
                  <div class="form-group" style="margin:5px;">
                    <label for="Observaciones" style="margin-right:5px;" class="col-sm-2 control-label">Observaciones</label>
                    <div class="col-sm-10">
                        <input type="text" id="Observaciones" name="Observaciones" class="form-control" maxlength="30"/>
                    </div>
                  </div>
                </form>
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:150px;">
              <form id="frm_input" class="form-inline" style="margin:10px 25px 0px 25px;">
                    <div id="Medicamento_val" style="display:none;">0</div>
                    <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
                    <input type="hidden" id="STO_VENCIMIENTO" value="" />
                     <input type="hidden" id="Presentacion" value="" />
               <label for="controlmotivo" style="text-decoration:underline; font-weight:bold;">Motivo de la Devolución: </label><div id="controlmotivo">
                Sobrante &nbsp;&nbsp; <input type="radio" name="motivo" id="devolucion" value="3" checked="checked" class="motivo_chk" /> &nbsp;&nbsp;
                Vencimiento &nbsp;&nbsp; <input type="radio" name="motivo" id="vencimiento" value="1" class="motivo_chk" /> &nbsp;&nbsp;
                Rotura &nbsp;&nbsp; <input type="radio" name="motivo"  id="rotura" value="2" class="motivo_chk" /> &nbsp;&nbsp;
              </div>
              <br />
               <div id="controlcantidad" class="control-group" style="display:inline;">
               <input type="text" id="txtEstadoIntemEntrega" style="display:none"/>
                    <label for="cantidad">Cantidad</label>
                    <input type="text" id="cantidad" name="cantidad" class="input-mini numero" maxlength="3" rel='Ingrese Cantidad'/>
               </div><br />

               <input id="btnAgregarMedicamento" type="button" class="btn btn-success btn pull-right" style="margin-left:10px;" value="Agregar" />
               <input id="btnCancelarMedicamento" type="button" class="btn btn-danger btn pull-right" style="margin-right:10px;" value="Cancelar" />

              </form>
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:150px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Presentación</th>
                    <th>Vencimiento</th>
                    <th>Cantidad</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="height:120px;">
  <a href="DevolucionporServicio.aspx" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <a id = "btnConfirmarPedido" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
</div>
</div>
      </div>
    </div>
  </div>
</div>

<!--Pie de p�gina-->
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Farmacia/DevolucionporServicio.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        List_Depositos();
        $("#CargadoServicio").html($("#cbo_Servicio :selected").text());
        $("#CargadoFecha").html(FechaActual());
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Devoluciones por Servicio</strong>";

</script> 

</body>
</html>


