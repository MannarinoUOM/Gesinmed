<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PaseCama.aspx.cs" Inherits="AtInternados_PaseCama" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link rel="stylesheet" type="text/css" href="../css/hestilo.css"/>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

</head>

<body>
<div class="container">
  <div class="contenedor_1">
    <div class="contenedor_a" style="position:relative;margin-left:15px;height:560px">
<div class="resumen_datos">
        
        <div class="datos_persona">
        <div><img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);"></img></div>
        <div class="datos_resumen_paciente" style="font-size:12px;">
            <input type="hidden" id="afiliadoId" value="" />
          <div>Paciente:  <strong><span id="SPaciente"></span>&nbsp;&nbsp;(<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <div>DNI: <strong><span id="CargadoDNI"></span></strong>&nbsp;&nbsp;NHC: <strong><span id="CargadoNHC"></span></strong>
          &nbsp;&nbsp;Seccional: <strong><span id="CargadoSeccional"></span></strong></div>
          <span>Servicio: <strong><span id="SServicio"></span></strong></span>&nbsp;&nbsp;
          <span>Sala: <strong><span id="SSala"></span></strong></span>&nbsp;&nbsp;<span>Cama: <strong><span id="SCama"></span></strong></span>
        </div>
        
      </div>
        
      </div>	
    

      <div>

<div id="contenedor" class="table" style="margin:5px; width:98%; height:435px;">
        <div id="evoluciones" class="tabla" style="height:425px">
          <table class="table table-hover">
            <thead style="font-size:12px;">
            <th width="16px"></th>
            <th width="100px">Fecha</th>
            <th width="400px">Movimiento</th>
                </thead>
            <tbody id="TEvoluciones" style="font-size:12px;">
            </tbody>
          </table>
</div>          
        </div>

<div id="divEvo" class="row ingreso" style="margin-left:5px; display:none;">
      Movimiento: <textarea id="txtDescripcion" rows="7" style="width:87%; margin-left:20px;" placeholder="Ingrese Movimiento..."></textarea>
</div>
<div class="row ingreso_botonera" style="margin-right:15px;display:none;">
            <a id="btnGuardar" class="btn btn-success pull-right ingreso" style="margin-left:10px;">Guardar</a>
            <a id="btnEliminar" class="btn btn-danger pull-right ingreso" style="margin-left:10px;display:none;">Eliminar</a>
            <a id="btnCancelar" class="btn pull-right ingreso_cancelar" style="margin-left:10px;">Cancelar</a>
</div>   
<div class="clearfix"></div>        

<div class="pie_gris">
  <a id="btnNueva" class="btn btn-info pull-right"><i class="icon-plus-sign"></i>&nbsp;&nbsp;Nueva</a>
  <a id="btnVolver" class="btn pull-right"><i class="icon-th-list"></i>&nbsp;Volver al Paciente</a>
  <a id="btnIngeso" class="btn pull-right" style="display:none;"><i class=" icon-inbox"></i>&nbsp;&nbsp;Comprobante de Internación</a>
</div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/Hospitales/AtInternados/PaseCama.js" type="text/javascript"></script>
<script>
    parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Pacientes Internados > <strong>Pase de Cama</strong>";
</script> 