<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Facturacion.aspx.cs" Inherits="Facturacion_Facturacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:530px;">
      <form id="frm_Main" name="frm_Main">
          <div style="padding:0px 15px 0px 15px; height:70px;">
            <div class="row" style="margin-left:5px;">
            
              <div id="controlcbo_Centro" class="span8" style="display:none;">
                    <label for="cbo_Centro" style="display:inline; margin-top:10px;">Centro: </label>
                    <select id="cbo_Centro" name="cbo_Centro" class="input-xxlarge" style="margin-top:10px;">
                 
                    </select>
              </div>
            </div>
        
        <div class="contenedor_4 pagination-centered" style="height:60px;">
        <span class="box_informativo_a">Seleccione la Prefacturacion</span><br />
              <div id="controlAmbulatorio" class="span2">
                    <label for="Ambulatorio" style="display:inline; margin-top:10px;">Ambulatorio</label>
                    <input type="radio" name="rad" id="Ambulatorio" checked />
              </div>
               <div id="controlInternacion" class="span3">
                    <label for="Internacion" style="display:inline; margin-top:10px;">Internacion</label>
                    <input type="radio" name="rad" id="Internacion" />
              </div>
        </div>
        <div class="contenedor_4 pagination-centered" style="height:60px;">
        <span class="box_informativo_a">Procesar Por</span><br />
               <div id="controlfecha_practica" class="span2">
                    <label for="fecha_practica" style="display:inline; margin-top:10px;">Fecha de Practica</label>
                    <input type="radio" name="fecha" id="fecha_practica"/>
              </div>
               <div id="controlfecha_rendicion" class="span3" style="display:inline;">
                    <label for="fecha_rendicion" style="display:inline; margin-top:10px;">Fecha de Rendicion</label>
                    <input type="radio" name="fecha" id="fecha_rendicion" checked/>
              </div>
        </div>

       

        </div>
     
</form>

          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaPartes_div" class="tabla" style="height:220px;width:100%; margin-top:-10px; font-size:11px;">
               <div id="cargando" style="text-align:center; display:none;">
                <br /><br />
                <img src="../img/Espere.gif" /><br />Procesando...
              </div>
              <table id="tabla" class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>       
                    <th>Fec.Practica</th>
                    <th>Fec.Rendicion</th>
                    <th>Cantidad</th>
                    <th>Tipo</th>
                    <th>Codigo</th>
                    <th>Practica</th>
                  </tr>
                </thead>
                 <tbody id="trx"></tbody>
              </table>
            </div>
        </div>
        <div class="clearfix"></div>

        <div id="div_FechaFact" class="row" style="margin-left:5px; margin-top:5px;">
             <div id="controltxtFechaFact" class="span3">
                    <label for="txtFechaFact" style="display:inline; margin-top:10px;">Fecha Facturacion</label>
                    <input type="text" name="txtFechaFact" id="txtFechaFact" class="input-mini date" style="width:80px;" />
              </div>
               <div id="controltxtAnio" class="span2">
                    <label for="txtAnio" style="display:inline; margin-top:10px;">Año</label>
                    <input type="text" name="txtAnio" id="txtAnio" class="input-mini numero" maxlength="4" style="width:80px;" />
              </div>
                 <div id="controltxtMes" class="span4">
                    <label for="txtMes" style="display:inline; margin-top:10px;">Mes</label>
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

        <div class="minicontenedor50 pagination-centered" id="Seccionales" style="width:65%;">
                        <div class="check_todos"><label class="checkbox">
                                <input onchange="toggle_checks(this)" id="cbo_Todos_Seccional" value="0" type="checkbox">Seccionales
                            </label></div>
                            <div class="filtro_datos" style="width:98%; height:115px">                                                        
                                <div id="FiltroSeccionales" style="float: left;">
                                </div>
                                <div id="FiltroSeccionales2" style="float: right;">
                                </div>                                     
                            </div>
          </div>


        <div class="minicontenedor50 pagination-centered" id="Instituciones" style="width:400px; display:none;">
                        <div class="check_todos"><label class="checkbox">
                                <input onchange="toggle_checks_Ins(this)" id="cbo_Todos_Instituciones" value="0" type="checkbox">Instituciones
                            </label></div>
                            <div class="filtro_datos" style="width:98%; height:65px">                                                        
                                <div id="FiltroInstituciones" style="float: left;">
                                </div>                                
                            </div>
        </div>

<div class="pie_gris">
    <div class="pull-right">
        <button id = "btnBuscarRendicion" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar Rendicion</button>
        <button id = "btnPreFacturar" class="btn btn-success"><i class=" icon-ok-circle icon-white"></i>&nbsp;Pre-Facturar</button>
        <button id = "btnFacturar" class="btn btn-danger"><i class="icon-ok-circle icon-white"></i>&nbsp;Facturar</button>
        <button id = "btnPrint" class="btn btn-info"><i class=" icon-print icon-white"></i>&nbsp;Imprimir</button>
    </div>
</div>
      </div>
      <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:600px;height:300px;">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Confirmar Facturación</h3>
  </div>
  <div class="modal-body" style="margin-left:10px; margin-right:10px;">
        <textarea id="Observaciones" style="width:530px; height:180px;" placeholder="Ingrese Observaciones..."></textarea>
    </div>
    <div class="modal-footer">
                <a class="btn btn-danger" data-dismiss="modal"><i class="icon-remove"></i>&nbsp;Cancelar</a>
        <a id="btnConfirmar" class="btn btn-info"><i class="icon-ok"></i>&nbsp;Confirmar</a>
    </div>
    </div>
  </div>
<!--Pie de p�gina-->
   <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/Hospitales/Facturacion_Cap/Facturacion.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > Proceso de Facturación > <strong style='color:red'>CENTRAL</strong>";
</script> 
</body>
</html>




