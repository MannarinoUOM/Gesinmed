<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Selecciondedatos.aspx.cs" Inherits="Facturacion_Selecciondedatos" %>

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
   <div class="contenedor_3" style="height:490px;">
      <form id="frm_Main" name="frm_Main">
          <div style="padding:0px 15px 0px 15px; ">
            <div class="row">
               <div class="span4">
                <div id="controlambos" class="control-group" style="margin-top:15px;">
                                <label for="ambos" style="display:none; margin-right: 10px;">Ambos</label><input id="ambos" name="ambos" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:none;" />
                                <label for="Ambulatorio" style="display:inline; margin-right: 10px; margin-left:5px;">Ambulatorio</label><input id="Ambulatorio" name="opc_tipo" type="radio" checked="checked" class="input-xlarge"  />
                                <label for="Internacion" style="display:inline; margin-right: 10px;margin-left:5px;">Internacion</label><input id="Internacion" name="opc_tipo" type="radio" class="input-xlarge"  />
                </div>
                </div>
                <div id="controltxtDesdeParte" class="span2" style="width:160px;">
                    <label for="txtDesdeParte" style="display:inline; margin-top:10px;">Desde: </label>
                    <input type="text" id="txtDesdeParte" name="txtDesdeParte" class="input-mini date" style="margin-top:10px; width:90px;">
                </div>
                <div id="controltxtHastaParte" class="span2" style="width:160px;">
                   <label for="txtHastaParte" style="display:inline; margin-top:10px;">Hasta: </label>
                    <input type="text" id="txtHastaParte" name="txtHastaParte" class="input-mini date" style="margin-top:10px;width:90px;">
                </div>  
                        <div class="box_informativo_a pull-left" style="margin-top:10px;"><div style="padding-top:3px"><strong id="Total">Registros:</strong></div> </div> 
            </div>  
          
                
        <div class="row">
              <div id="controltxtNHC" class="span4">
                    <label for="txtNHC" style="display:inline; margin-top:10px;">NHC: </label>
                    <input type="text" id="txtNHC" name="txtNHC" maxlength="13" class="input-medium numero" style="margin-top:10px;margin-left:30px;">
              </div>
            <div id="controltxtPaciente" class="span3">
                   <label for="txtPaciente" style="display:inline; margin-top:10px;">Paciente: </label>
                    <input type="text" maxlength="30" id="txtPaciente" name="txtPaciente" class="input-medium" style="margin-top:10px;width:140px;">
              </div>
               <div id="controlcbo_Servicio" class="span4">
               <label for="cbo_Servicio" style="display:inline; margin-top:10px;">Servicio: </label>
                   <select id="cbo_Servicio" name="cbo_Servicio" class="input-large" style="margin-top:10px; margin-left:10px;">
                      <option value="0"></option>
                   </select>
              </div> 
        </div>

        <div class="row">
              <div id="controlcbo_Seccional" class="span4">
                    <label for="cbo_Seccional" style="display:inline; margin-top:10px;">Seccional: </label>
                    <select id="cbo_Seccional" name="cbo_Seccional" class="input-large" style="margin-top:10px;">
                        <option value="0"></option>
                    </select>
              </div>  
              <div id="controlcbo_Estado" class="span3">
                   <label for="cbo_Estado" style="display:inline; margin-top:10px;">Estado: </label>
                   <select id="cbo_Estado" name="cbo_Estado" class="input-medium" style="margin-top:10px; margin-left:10px;">
                        <option value="0">Sin Procesar</option>
                        <option value="1">Procesados</option>
                        <option value="2">Facturados</option>
                    </select>
              </div>
              <div id="controlcbo_Order" class="span4">
               <label for="cbo_Order" style="display:inline; margin-top:10px;">Orden: </label>
                   <select id="cbo_Order" name="cbo_Order" class="input-large" style="margin-top:10px; margin-left:10px;">
                        <option value="0">Por Paciente</option>
                        <option value="1">Por Fecha Practica</option>
                        <option value="2">Por Fecha Facturacion</option>
                        <option value="3">Por Nro. Parte</option>
                        <option value="4">Por Práctica</option>
                        <option value="5">Por Seccional</option>
                    </select>
              </div> 
        </div>

        <div class="row" style=" margin-left: 0px; margin-top:-20px; margin-bottom:-10px; display:none;">
              <div class="span5" style="display:none;">
                            <div id="controlvalorizarauto" class="control-group">
                                <label for="valorizarauto" style="display:inline; margin-right: 10px; margin-top:5px;">Traer datos a Valorizar Automaticamente</label><input id="valorizarauto" name="valorizarauto" type="checkbox" class="input-xlarge" style="margin-top:5px;" />
                            </div>
              </div>
        
        </div>

        </div>
</form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:15px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaPartes_div" class="tabla" style="height:290px;width:100%; margin-top:-10px; font-size:11px; overflow-x: scroll;">
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
                    <th>NHC</th>
                    <th>Afiliado</th>
                    <th>Seccional</th>
                    <th>Cantidad</th>
                    <th>Código</th>
                    <th>Práctica</th>
                    <th>Especialidad</th>
                    <th>Médico</th>
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
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/Hospitales/Facturacion_Cap/Selecciondedatos.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > Seleccion de Datos Para Facturar > <strong style='color:red'>CENTRAL</strong>";
</script> 
</body>
</html>



