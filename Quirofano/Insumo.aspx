<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Insumo.aspx.cs" Inherits="Quirofano_Insumo" %>

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

<style>
.opciones_gris a{margin:0 10px 0 10px;}
</style>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
    <div class="contenedor_2" style="display:none;"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form class="form-horizontal" >
        <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC">
                      </select>          
            </div>
        </div>

        <div class="control-group">
          <label class="control-label">DNI</label>
          <div class="controls">
            <input id="txt_dni"type="text" placeholder="Ingrese el DNI sin puntos">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >NHC</label>
          <div class="controls">
            <input id="txtNHC" type="text" placeholder="Ej: 99123456789">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" placeholder="Apellido Nombre"type="text" class="span3">
            <a id="btnBuscarPaciente" href="BuscarPacientes.aspx" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="CargarPedidoporPaciente.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:350px;"> 
      
     <div id="div_AgregarInsumo" style="position:absolute; width: 917px; height: 361px; background-color:white;left:0; top:0; display:none;">
           <span style="margin-left:10px;">Nuevo Insumo</span>
           <input type="text" style="width:600px;margin-top: 10px;" id="txt_nuevo_insumo">

           <div id="div_busqueda" style="width: 612px; height:300px; background-color:white; position:absolute; left: 107px; overflow:scroll; overflow-x: hidden; display:none;">
            
           </div>

           <a class="btn" id="btn_aceptaragregar">Buscar</a><a class="btn" id="btn_cancelaragregar">Cancelar</a>
      </div>

        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:57px;width: 874px;">
            
            <div id="Medicamento_val" style="display:none;">0</div>
            <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
            <div class="combos" style="margin-left:10px;">
                                
            </div>

             <div class="combos opciones_gris" style="margin-left:10px;">
                <a href="javascript:Filtro(1);">Drogas</a><a href="javascript:Filtro(3);">Soluciones</a><a href="javascript:Filtro(4);">Suturas</a><a href="javascript:Filtro(2);">Descartables</a><a href="javascript:Filtro(0);">Todos</a>
                <span style="margin-left:80px;"><b>Filtro:</b> </span><span id="span_filtro"></span>
                <a href="javascript:Mostrar_AgregarMedicamento();" style="float:right;">Nuevo Insumo</a>
             </div>
           
          </div>

          <div class="clearfix"></div>
        </div>

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:250px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>

              </table>
            </div>



        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="padding:5px;">
  <a id="btnVolver" class="btn" style="display:none"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
  <a id="btn_cancelear_todo" class="btn btn-danger">Cancelar</a>
  <a id ="btn_imprimir" class="btn pull-right" style="display:none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
  <a id ="btnGuardar" class="btn pull-right"><i class="icon-print"></i>&nbsp;Guardar</a>
  
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
<script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <script src="../js/Hospitales/Quirofano/Insumo.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>


<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });




    

</script> 

</body>
</html>





