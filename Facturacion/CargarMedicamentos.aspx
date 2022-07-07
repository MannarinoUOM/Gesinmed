<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargarMedicamentos.aspx.cs" Inherits="Facturacion_CargarMedicamentos" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="clearfix"></div>
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona" >
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div style="display:inline;">Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div><div class="span3 pull-right" style="margin-left:100px;"><strong>F.Rendicion: </strong><input type="text" id="CargadoRendicion" name="CargadoRendicion" class="input-small"></div>  
          <div><span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span></div>
          <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div>Fecha Parte: <strong><span id="CargadoFechaparte"></span></strong>&nbsp;&nbsp;&nbsp; <span>Nro.Parte: <strong><span id="CargadoParte"></span></strong></span> </div>
                  
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:350px;">
      <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Medicamentos</a></li>
                <li><a href="#tab2" data-toggle="tab">Descartables</a></li>
            </ul>
          <div class="tab-content" style="height:335px;">
            <div class="tab-pane active" id="tab1" style="height:335px;">
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 15px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:80px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Medicación</th>
                    <th>Monodroga</th>
                    <th>Cantidad</th>
                    <th>Importe</th>
                    <th>Total</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>
        <form id="frm_Medicamentos"> 
                 <div class="row">
                    <div class="span5">
                        <div id="controlrdAmbulatorio" class="control-group">
                             <input id="rdAmbulatorio" name="grupo1" type="radio" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="rdAmbulatorio" style="display:inline; margin-left:5px; margin-right:5px;">Ambulatorio</label>
                        </div>
                    </div>
                        <div class="span5">
                            <div id="controlrdInternacion" class="control-group">
                                    <input id="rdInternacion" name="grupo1" type="radio" class="input-xlarge" checked="checked" style="vertical-align:middle;" /><label for="rdInternacion" style="display:inline; margin-left:5px; margin-right:5px;">Internación</label>
                                </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span5">
                            <div id="controlcbo_Medicamento" class="control-group">
                            <label for="cbo_Medicamento" style="display:inline;">Medicamento: </label><select id="cbo_Medicamento" name="cbo_Medicamento"></select>
                            </div>
                        </div>
                          <div class="span5">
                            <div id="controlcbo_Monodroga" class="control-group">
                            <label for="cbo_Monodroga" style="display:inline;">Monodroga: </label><select id="cbo_Monodroga" name="cbo_Monodroga"></select>
                            </div>
                        </div>
                    </div>

                     <div class="row">
                        <div class="span3">
                            <div id="controlcantidad" class="control-group">
                            <label for="cantidad" style="display:inline;">Cantidad: </label><input id="cantidad" name="cantidad" type="text" class="input-mini">
                            </div>
                        </div>
                          <div class="span3">
                             <div id="cpntrolprecio" class="control-group">
                            <label for="precio" style="display:inline;">Precio: </label><input id="precio" name="precio" type="text" class="input-mini">
                            </div>
                        </div>
                         <div class="span3">
                            <div id="controlsubtotal" class="control-group">
                            <label for="subtotal" style="display:inline;">Subtotal: </label><input id="subtotal" name="subtotal" type="text" class="input-mini">
                            </div>
                        </div>
                          <div class="span3">
                            <div id="controlfechaprac" class="control-group">
                            <label for="fechaprac" style="display:inline;">Fecha Prac: </label><input id="fechaprac" name="fechaprac" type="text" class="input-small">
                            </div>
                        </div>
                        <div class="span2">
                        <div id="controlchkFacturado" class="control-group">
                             <input id="chkFacturado" name="chkFacturado" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="chkFacturado" style="display:inline; margin-left:5px; margin-right:5px;">Facturarlo</label>
                        </div>
                         </div>
                        <div class="span2">
                            <div id="controlchkEstadisticas" class="control-group">
                                    <input id="chkEstadisticas" name="chkEstadisticas" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkEstadisticas" style="display:inline; margin-left:5px; margin-right:5px;">Estadisticas</label>
                                </div>
                        </div>
                         <div class="span2">
                            <div id="controlchkAPE" class="control-group">
                                    <input id="chkAPE" name="chkAPE" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkAPE" style="display:inline; margin-left:5px; margin-right:5px;">APE</label>
                                </div>
                        </div>
                         <div class="span2">
                            <input id="btnCancelar" type="button" class="btn btn-danger btn-mini" value="Cancelar" />
                            <input id="btnAgregar" type="button" class="btn btn-mini" value="Agregar" />
                        </div>

                    </div>
                </form>
         </div>
         
         <div class="tab-pane" id="tab2">
                 <div style="padding:0px 15px 15px 15px;">
                        
                    <div class="clearfix"></div>
                    <div id="Tabla_Medicamentos_Desc" class="tabla" style="height:135px;width:100%;">
                      <table class="table table-hover table-condensed">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Descripcion</th>
                            <th>Cantidad</th>
                            <th>Importe</th>
                            <th>Total</th>
                          </tr>
                        </thead>

                      </table>
                    </div>
                </div>
            <div class="clearfix"></div>

            <form id="frm_Descartables"> 
                    <div class="row">
                    <div class="span5">
                        <div id="controlcbo_Descartable" class="control-group">
                        
                            <label for="cbo_Descartable" style="display:inline;">Descartable: </label><select id="cbo_Descartable" name="cbo_Descartable" class="input-xlarge"></select>
                        </div>
                    </div>
                     <div class="span2">
                        <div id="controlrdAmbulatorio_desc" class="control-group">
                             <input id="rdAmbulatorio_desc" name="desc" type="radio" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="rdAmbulatorio_desc" style="display:inline; margin-left:5px; margin-right:5px;">Ambulatorio</label>
                        </div>
                    </div>
                        <div class="span2">
                            <div id="controlrdInternacion_desc" class="control-group">
                                    <input id="rdInternacion_desc" name="desc" type="radio" class="input-xlarge" checked="checked" style="vertical-align:middle;" /><label for="rdInternacion_desc" style="display:inline; margin-left:5px; margin-right:5px;">Internación</label>
                                </div>
                        </div>
                    </div>


                     <div class="row">
                        <div class="span2">
                            <div id="controlcantidad_desc" class="control-group">
                            
                                <label for="cantidad_desc" style="display:inline;">Cantidad: </label><input id="cantidad_desc" name="cantidad_desc" type="text" class="input-mini">
                            </div>
                        </div>
                        <div class="span2">
                            <div id="controlprecio_desc" class="control-group">
                            
                                <label for="precio_desc" style="display:inline;">Precio: </label><input id="precio_desc" name="precio_desc" type="text" class="input-mini">
                            </div>
                        </div>
                         <div class="span2">
                            <div id="controlsubtotal_desc" class="control-group">
                            
                                <label for="subtotal_desc" style="display:inline;">Subtotal: </label><input id="subtotal_desc" name="subtotal_desc" type="text" class="input-mini">
                            </div>
                        </div>
                        <div class="span3">
                            <div id="controlfechaprac_desc" class="control-group">
                          
                            <label for="fechaprac_desc" style="display:inline;">Fecha Prac: </label><input id="fechaprac_desc" name="fechaprac_desc" type="text" class="input-small">
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span2">
                        <div id="controlchkFacturado_desc" class="control-group">
                             <input id="chkFacturado_desc" name="chkFacturado" type="checkbox" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="chkFacturado" style="display:inline; margin-left:5px; margin-right:5px;">Facturarlo</label>
                        </div>
                         </div>
                        <div class="span2">
                            <div id="controlchkEstadisticas_desc" class="control-group">
                                    <input id="chkEstadisticas_desc" name="chkEstadisticas_desc" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkEstadisticas_desc" style="display:inline; margin-left:5px; margin-right:5px;">Estadisticas</label>
                                </div>
                        </div>
                         <div class="span2">
                            <div id="controlchkAPE_desc" class="control-group">
                                    <input id="chkAPE_desc" name="chkAPE" type="checkbox" class="input-xlarge" style="vertical-align:middle;" /><label for="chkAPE" style="display:inline; margin-left:5px; margin-right:5px;">APE</label>
                                </div>
                        </div>

                        <div class="span2">
                            <input id="btnCancelarDesc" type="button" class="btn btn-danger btn-mini" value="Cancelar" />
                            <input id="btnAgregarDesc" type="button" class="btn btn-mini" value="Agregar" />
                        </div>
                    </div>
            </form>
          </div>
          </div>
        </div>
                 

 <div class="clearfix"></div>
<%--<div id="Total" style="float:left; color:Red; font-size:medium; font-weight:bold; margin: 5px 5px 5px 5px;">Total $ </div>--%>
<div class="pie_gris">
  <a id = "btnConfirmar" class="btn btn-info pull-right"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
  <a href="BusquedadePartes.aspx" class="btn pull-right" style="display:none;"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>

</div>
<div class="clearfix"></div>
      </div>
  </div>
</div>

<!--Pie de p?gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>

<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Facturacion/CargaMedicamentos.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">

    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Carga de Medicamentos</strong>";

</script> 

</body>
</html>

