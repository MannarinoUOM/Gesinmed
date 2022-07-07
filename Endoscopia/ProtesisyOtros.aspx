<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ProtesisyOtros.aspx.cs" Inherits="Endoscopia_ProtesisyOtros" %>

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
                <a class="btn btn-danger" href="PlanificarCirugia.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a> 
                <a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> 
                <a id="desdeaqui" style="display:none;" class="btn btn-info">Siguiente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:120px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <div><span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;<span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span></div>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>&nbsp;&nbsp;&nbsp;<span>Urgencia:</span><span id="CargadoUrgencia"></span></div>
          <div><span>Endoscopista: <strong><span id="CargadoMedico"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Fecha: <strong><span id="CargadoFecha"></span></strong></span> </div>
          <div><span>Diagnóstico Preoperatorio: <strong><span id="CargadoDiagnostico"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Anestesista: <strong><span id="CargadoAnestesista"></span></strong></span> </div>
        <div><span>Anestesia: <strong><span id="CargadoAnestesia"></span></strong></span>&nbsp;&nbsp;&nbsp; <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong> </div>        
        </div>
        
        <input id="afiliadoId" type="hidden"/>

      </div>
      </div>
   <div class="contenedor_3" style="height:410px;"> 
      
      <div style="background-color:White; width:916px; height:442px; position:absolute; display:none;" id="Frm_Edicion"">
      <div class="contenedor_4 pagination-centered" style="height:85px; width:875px">
            <form class="form-inline" style="margin:10px 25px 0px 25px;">
            <div class="combos" style="margin-left:10px;">
                    
                    <label for="cbo_Monodroga" style="display:inline; width:109px; margin-top:5px;" class="span_servicio">Insumo/Protesis:</label>                    
                    <input type="text" id="txt_insumo_edicion" maxlength="200" />                     
                    
                    <input id="btn_edicion_aceptar" type="button" class="btn btn-mini" value="Aceptar" >
                    <input id="btn_edicion_cancelar" type="button" class="btn btn-danger btn-mini" value="Cancelar">                    

            </div>
            <div class="clearfix"></div>
                           
           </form>
          </div>
      </div>

      <div class="">
      <div class="contenedor_4 pagination-centered" style="height:85px; width:875px">
            <form id="frm_1" class="form-inline" style="margin:10px 25px 0px 25px;">
            <div class="combos" style="margin-left:10px;">
                    <div style="float:left;">
                    <label for="cbo_Monodroga" style="display:inline; width:80px;" class="span_servicio">Servicio:</label>                    
                      <input type="text" id="txt_servicio" />                      
            </div>
            <div style="float:left;">
                    <label for="txt_ortopedia" style="display:inline; width:80px; margin-left:100px;" class="span_servicio">Ortopedia:</label>                    
                    <input type="text" id="txt_ortopedia" style="width:200px;" />
                    </div>

            </div>

            <div class="clearfix"></div>

             <div class="combos" style="margin-left:10px;">
                   
                   <label for="MaterialUOM" style="display:inline;width:130px; margin-left:300px;" class="span1">Material de U.O.M.:</label>
                   <input type="checkbox" id="MaterialUOM" name="MaterialUOM" class="input-medium">              
                   
             </div>
               
           </form>
          </div>
      <div class="clearfix"></div>
      </div>




      <!--La parte de Insumos-->
      <div class="">
      <div class="contenedor_4 pagination-centered" style="height:210px; width:875px">
            <form id="from_2" class="form-inline" style="margin:10px 25px 0px 25px;">
            <div class="combos" style="margin-left:10px;">
                    <div style="float:left;">
                    <label for="cbo_insumos" style="display:inline; width:80px;" class="span_servicio">Insumos:</label>                    
                      <select id="cbo_insumos" style="display:none;"></select>
                      <input id="txt_insumo" />
            </div>

            <div style="float:left;">
                    <label for="txt_cantidad" style="display:inline; width:80px;" class="span_servicio">Cantidad:</label>                    
                    <input type="text" id="txt_cantidad" style="width:30px;" />
            </div>

            <input id="btnAgregarMedicamento" type="button" class="btn btn-mini" value="Agregar" style="margin-left:39px;">
            <input id="btnCancelarMedicamento" type="button" class="btn btn-danger btn-mini" value="Cancelar">
            <input id="btnEditarMedicamento" type="button" class="btn btn-mini" value="Editar" style="display:none;" >

             <div id="TablaMedicamentos" class="tabla" style="height:140px;width:100%; background-color:White;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo/Protesis</th>
                    <th>Cantidad</th>                  
                  </tr>
                </thead>

              </table>
            </div>
            <div class="clearfix"></div>

            </div>

            <div class="clearfix"></div>


               
           </form>
          </div>
      <div class="clearfix"></div>
      </div>


        <!--Parte de Observaciones-->
       <div class="">
      <div class="contenedor_4 pagination-centered" style="height:71px; width:875px">
            <form id="frm_3" class="form-inline" style="margin:10px 25px 0px 25px;">
                <textarea id="txt_observaciones" placeholder="Observaciones" style="width: 806px;margin-left: 10px;" maxlength="4000"></textarea>
            <div class="clearfix"></div>
               
           </form>
          </div>
      <div class="clearfix"></div>
      </div>







        

        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>

        </div>
        <div class="clearfix"></div>

<div  style="height:120px;width:100%;background-color:#CCCCCC;margin-top:5px;">
<div class="pull-right" style="padding:5px; height:120px;">
   <a id="btnVolver" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
   <a id="btn_cancelear_todo" class="btn btn-danger">Cancelar</a>
  <button id = "btnConfirmar" class="btn btn-info" style="display:none;"><i class=" icon-ok icon-white"></i>&nbsp;Guardar</button>
  <button id = "btn_imprimir" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Guardar e Imprimir</button>
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
<script src="../js/Hospitales/Endoscopia/ProtesisyOtros.js" type="text/javascript"></script>  
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
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



    parent.document.getElementById("DondeEstoy").innerHTML = "Endoscopía > Turnos > Planificar Endoscopía > <strong>EXTRAS (Prótesis y Otros)</strong>";

</script> 

</body>
</html>



