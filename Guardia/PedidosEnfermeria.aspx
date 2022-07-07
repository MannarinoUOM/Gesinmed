<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PedidosEnfermeria.aspx.cs" Inherits="Guardia_PedidosEnfermeria" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
 <link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:530px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Pedidos a Enfermería por Paciente</span> <div id="controldesde" class="control-group" style="display:inline; margin:10px 10px 0px 320px;"><label for="desde" style="display:inline;">Fecha: </label><input type="text" disabled id="desde" name="desde" class="input-small" style="margin-top:10px;" /><input type="text" id="txtHoraIni" name="txtHoraIni" class="input-mini" style="margin-top:10px; display:none;" /></div></div>
      <form id="frm_Main" name="frm_Main">
        <div class=""> 
          </div>
          </form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
                        <div style="display:block; margin-left:10px;">
                            <div id="btn_Todos" class="reff reff_0 reff_activo">Todos</div>
                            <div id="btn_Libres" class="reff Turnos_Ocupados">Atendidos</div>
                            <div id="btn_SobreT" class="reff Turnos_Libres">Pendientes</div>
                        </div> 
            <div class="clearfix"></div>
                             <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>
            <div id="TablaPedidos_div" class="tabla" style="height:400px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Fecha Pedido</th>
                    <th>NHC</th>
                    <th>Afiliado</th>
                    <th>Box</th>
                    <th>Médico</th>
                    <th>Fecha Entrega</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<button id = "btnActualizar" style="margin-top:0px;" class="btn btn-info pull-right"><i class=" icon-search icon-white"></i>&nbsp;Actualizar</button>
</div>

<div id="myModal" class="modal hide fade"  style="height:80%;"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-body" style="height:100%; overflow-y: hidden;">

        <div class="resumen_datos" style="height:70px;">
        
        <div class="datos_persona">
        <div><img id = "fotopaciente" class="avatar2"  src="../img/silueta.jpg"></img></div>
        <input type="hidden" value="" id="afiliadoId" />
        <div class="datos_resumen_paciente" style="font-size:12px;">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <div><span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span></div>
          <div><span>Seccional: <strong><span id="CargadoSeccional"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Telefono: <strong><span id="CargadoTelefono"></span></strong></span></div>
        </div>
        
      </div>
      </div>

      <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Prácticas</a></li>
                <li><a href="#tab2" data-toggle="tab">Medicamentos</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">
                <div style="padding:0px 15px 0px 15px; height:190px;">
            <div id="Tabla_Practicas" class="tabla" style="height:160px;width:100%;font-size:12px;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Código</th>
                    <th>Práctica</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>

              </table>
            </div>
            <form id="frm_Cantidad" class="form-inline" style="margin:10px 5px 0px 5px;">
                    <div id="controlCargadoPractica" class="control-group" style="display:inline;display:none;"><div class="span1" id="CargadoPractica"></div></div>
                    <div id="controlCargadoCodigo" class="control-group" style="display:inline; display:none;"><div class="span1" id="CargadoCodigo"></div></div>
                   <div id="controlcantidad" class="control-group" style="display:inline;"><label for="cantidad">Cantidad: </label><input type="text" id="cantidad" name="cantidad" class="input-mini numero" style="margin-bottom:10px;" maxlength="2" /></div>
              </form>
               <div class="pull-right" style="margin-top:-10px;">
                   <a id="btnCancelarPractica" style="display:none;" class="btn btn-danger"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                   <a id="btnAgregarPractica" class="btn btn-success"><i class="icon-ok"></i>&nbsp;Agregar</a>
                   <a id="btnPracticas" class="btn btn-info"><i class="icon-ok"></i>&nbsp;Guardar</a>
                   <a id="btnPrint" class="btn"><i class="icon-print"></i>&nbsp;Imprimir</a>
                   <a class="btn Volver"><i class="icon-arrow-left"></i>&nbsp;Volver</a>
                </div>

                </div>
               
            </div>

            <div class="tab-pane" id="tab2">
                <div style="padding:0px 15px 0px 15px; height:200px;">
            <div id="Tabla_Medicamentos" class="tabla"  style="height:160px;width:100%; font-size:12px;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Medicación</th>
                    <th>Monodroga</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>

              </table>
            </div>

            <form id="frm_Cantidad_m" class="form-inline" style="margin:10px 5px 0px 5px;">
                <div id="controlCargadoCodigom" class="control-group" style="display:inline;display:none;"><div class="span1" id="CargadoCodigom"></div></div>
                <div id="controlCargadoMedicamento" class="control-group" style="display:inline;display:none;"><div class="span1" id="CargadoMedicamento"></div></div>
                <div id="controlCargadoMonodroga" class="control-group" style="display:inline; display:none;"><div class="span1" id="CargadoMonodroga"></div></div>
                <div id="controlcantidadm" class="control-group" style="display:inline;"><label for="cantidadm">Cantidad: </label><input type="text" id="cantidadm" name="cantidadm" class="input-mini numero" style="margin-bottom:10px;" maxlength="2"/></div>
            </form>

               <div class="pull-right" style="margin-top:-10px;">
                   <a id="btnCancelarMedicamento" style="display:none;" class="btn btn-danger"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                   <a id="btnAgregarMedicamento" class="btn btn-success"><i class="icon-ok"></i>&nbsp;Agregar</a>
                   <a id="btnMedicamentos" class="btn btn-info"><i class="icon-ok"></i>&nbsp;Guardar</a>
                   <a id="btnPrint_" class="btn"><i class="icon-print"></i>&nbsp;Imprimir</a>
                   <a class="btn Volver"><i class="icon-arrow-left"></i>&nbsp;Volver</a>
               </div>

              </div>
            </div>

          </div>
            </div>
        
  </div>
</div>


      </div>
    </div>
  </div>

<!--Pie de p�gina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Guardia/PedidosEnfermeria.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Guardia > <strong>Pedidos a Enfermería por Paciente</strong>";
</script> 

</body>
</html>

