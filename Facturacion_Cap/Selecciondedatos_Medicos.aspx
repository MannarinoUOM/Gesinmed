<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Selecciondedatos_Medicos.aspx.cs" Inherits="Facturacion_Cap_Selecciondedatos_Medicos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:490px;"> <div class="titulo_seccion" id="titulo_bono" style="display:none;">
      <span>Selección de Datos para Facturar Honorario de Médicos</span></div>
      <form id="frm_Main" name="frm_Main">
        <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Médico/Especialidad</a></li>
                <li><a href="#tab2" data-toggle="tab">Fechas</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">
          <div style="padding:0px 15px 0px 15px; height:200px;">
        <div class="row">
              <div id="controlcbo_Especialidad" class="span5">
                    <label for="cbo_Especialidad" style="display:inline; margin-top:10px;">Especialidad: </label>
                    <select id="cbo_Especialidad" name="cbo_Especialidad" class="input-large" style="margin-top:10px;">
                    </select>
              </div>
              <div id="controlcbo_Medico" class="span5">
                    <label for="cbo_Medico" style="display:inline; margin-top:10px;">Medico: </label>
                    <select id="cbo_Medico" name="cbo_Medico" class="input-large" style="margin-top:10px;">
                    <option value="0"></option>
                    </select>
              </div>
        </div>

         <div class="row">
                        <div class="span5">
                            <div id="controltxtNroParte" class="control-group">
                                <label for="txtNroParte" style="display:inline;">NroParte: </label>
                                <input type="text" id="txtNroParte" name="txtNroParte" class="input-small" style="margin-top:10px;">
                            </div>
                        </div>

                          <div id="controlcbo_Estado" class="span5">
                           <label for="cbo_Estado" style="display:inline; margin-top:10px;">Estado: </label>
                             <select id="cbo_Estado" name="cbo_Estado" class="input-large" style="margin-top:10px;">
                            <option value="0">Sin Procesar</option>
                            <option value="1">Procesados</option>
                            <option value="2">Facturados</option>
                            </select>
                        </div>
                     
                     
            </div>
          <div class="row">
               <div class="span5">
                            <div id="controlambos" class="control-group">
                                <label for="ambos" style="display:inline; margin-right: 10px;">Ambos</label><input id="ambos" name="ambos" type="checkbox" class="input-xlarge" checked="checked" style="vertical-align:middle;" />
                                <label for="Ambulatorio" style="display:inline; margin-right: 10px; margin-left:5px;">Ambulatorio</label><input id="Ambulatorio" name="opc_tipo" type="radio" disabled="disabled" class="input-xlarge"  />
                                <label for="Internacion" style="display:inline; margin-right: 10px;margin-left:5px;">Internacion</label><input id="Internacion" name="opc_tipo" type="radio" disabled="disabled" class="input-xlarge"  />
                            </div>
                        </div>


              <div class="span5">
                            <div id="controlvalorizarauto" class="control-group">
                                <label for="valorizarauto" style="display:inline; margin-right: 10px; margin-top:5px;">Traer datos a Valorizar Automaticamente</label><input id="valorizarauto" name="valorizarauto" type="checkbox" class="input-xlarge" style="margin-top:5px;" />
                            </div>
              </div>
        

        </div>
    </div>

    </div>
   
   <div class="tab-pane" id="tab2">
        <div style="padding:0px 15px 0px 15px; height:200px;">
               <span class="box_informativo_a">Rango de Fechas del Parte</span>
        <div class="row" style="margin-left:5px;">
                 
            <div id="controltxtDesdeParte" class="span2" style="width:160px;">
                    <label for="txtDesdeParte" style="display:inline; margin-top:10px;">Desde: </label>
                    <input type="text" id="txtDesdeParte" name="txtDesdeParte" class="input-mini date" style="margin-top:10px; width:90px;">
              </div>
            <div id="controltxtHastaParte" class="span2" style="width:160px;">
                   <label for="txtHastaParte" style="display:inline; margin-top:10px;">Hasta: </label>
                    <input type="text" id="txtHastaParte" name="txtHastaParte" class="input-mini date" style="margin-top:10px;width:90px;">
              </div>
        </div>
         
         <span class="box_informativo_a">Rango de Fechas de la Práctica/Módulo</span>
        <div class="row" style="margin-left:5px;">
                 
            <div id="controltxtDesdePrac" class="span2" style="width:160px;">
                    <label for="txtDesdePrac" style="display:inline; margin-top:10px;">Desde: </label>
                    <input type="text" id="txtDesdePrac" name="txtDesdePrac" class="input-mini date" style="margin-top:10px;width:90px;">
              </div>
            <div id="controltxtHastaPrac" class="span2" style="width:160px;">
                   <label for="txtHastaPrac" style="display:inline; margin-top:10px;">Hasta: </label>
                    <input type="text" id="txtHastaPrac" name="txtHastaPrac" class="input-mini date" style="margin-top:10px;width:90px;">
              </div>
        </div>

        <span class="box_informativo_a">Rango de Fechas de Rendición del Parte</span>
        <div class="row" style="margin-left:5px;">
                 
            <div id="controltxtDesdeRend" class="span2" style="width:160px;">
                    <label for="txtDesdeRend" style="display:inline; margin-top:10px;">Desde: </label>
                    <input type="text" id="txtDesdeRend" name="txtDesdeRend" class="input-mini date" style="margin-top:10px;width:90px;">
              </div>
            <div id="controltxtHastaRend" class="span2" style="width:160px;">
                   <label for="txtHastaRend" style="display:inline; margin-top:10px;">Hasta: </label>
                    <input type="text" id="txtHastaRend" name="txtHastaRend" class="input-mini date" style="margin-top:10px;width:90px;">
              </div>
        </div>
        </div>
    </div>
    
</div>
</div>
</form>
    

          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 5px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaPartes_div" class="tabla" style="height:195px;width:100%; margin-top:-20px;">
              <div id="cargando" style="text-align:center; display:none;">
                <br /><br /><br />
                <img src="../img/Espere.gif" /><br />Procesando...
              </div>
              <table id="tabla" class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th><input type='checkbox' id='chkgral' onchange='toggle_checks(this)' rel='gral'></th>         
                    <th>NP</th>
                    <th>Fec.Practica</th>
                    <th>Fec.Parte</th>
                    <th>Fecha</th>
                    <th>Médico</th>
                    <th>Cantidad</th>
                    <th>Codigo</th>
                    <th>Practica</th>
                    <th>RV</th>
                  </tr>
                  <tbody id="trx"></tbody>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="span5 pull-left">
    <label for="txtHastaRend" style="display:inline;">Fecha de Rendicion: </label>
      <input type="text" id="txtFechaRendicion" name="txtFechaRendicion" class="input-mini date" style="width:90px;">
      <button id = "btnCambiarFecha" class="btn btn-info" style="margin-bottom:5px;" rel="tooltip" title="Modificar Fecha Rendicion"><i class=" icon-ok-circle icon-white"></i>&nbsp;</button>
</div>
<div class="span6 pull-right">
<button id = "btnBuscar" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
<button id = "btnNoRevalorizado" class="btn btn-danger"><i class="icon-ok-circle icon-white"></i>&nbsp;No Revalorizar</button>
<button id = "btnRevalorizado" class="btn btn-success"><i class="icon-ok-circle icon-white"></i>&nbsp;Revalorizar</button>
<button id = "btnProcesar" class="btn btn-info"><i class=" icon-ok-circle icon-white"></i>&nbsp;Procesar</button>
</div>
</div>
      </div>
    </div>
  </div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
        <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Facturacion_Cap/Selecciondedatos_Medicos.js" type="text/javascript"></script>

 

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Selección de Datos para Facturar Honorario de Médicos</strong>";

</script> 

</body>
</html>




