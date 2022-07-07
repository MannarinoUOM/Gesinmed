<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Presupuestos.aspx.cs" Inherits="Facturacion_Presupuestos" %>

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
    <div class="contenedor_2" style="height:530px; width:700px; margin: 10px 40px 10px 40px;"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos Generales del Presupuesto</span></div>
      <form class="form-horizontal" id="frm_Inicio" >
        <div class="control-group" id="controltxtNroParte">
          <label class="control-label">Nro. Parte</label>
          <div class="controls">
            <input id="txtNroParte" name="txtNroParte" type="text" maxlength="8" placeholder="Nro.Parte">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >Fecha de Carga</label>
          <div class="controls">
            <input id="txtFechaCarga" name="txtFechaCarga" type="text">
          </div>
        </div>

         <div class="control-group">
          <label class="control-label" for="cbo_Servicio">Servicio</label>
          <div class="controls">
            <select id="cbo_Servicio" name="cbo_Servicio"></select>
        </div>
        </div>

        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" name="txtPaciente" placeholder="Ingrese Paciente" maxlength="60" type="text" class="span3">
            <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx" class="btn"><i class="icon-search icon-black"></i></a>
        </div>
        </div>

        <div class="control-group">
          <label class="control-label" for="cbo_Seccional">Seccional</label>
          <div class="controls">
            <select id="cbo_Seccional" name="cbo_Seccional" class="span5">
            <option value="0"></option>
            </select>
        </div>
        </div>

          <div class="control-group">
          <label class="control-label" for="cbo_Institucion">Institución</label>
          <div class="controls">
            <select id="cbo_Institucion" name="cbo_Institucion" class="span5">
            <option value="0"></option>
            </select>
        </div>
        </div>

         <div class="control-group">
            <label for="cbo_Especialidad" class="control-label">Especialidad</label>
            <div class="controls">    
                <select id="cbo_Especialidad" name="cbo_Especialidad" class="span5"></select>
            </div>
         </div>
         <div class="control-group">
            <label for="cbo_Medicos" class="control-label">Medicos</label>
         <div class="controls">   
            <select id="cbo_Medicos" name="cbo_Medicos" class="span5"></select>
         </div>
         </div>

      
        <div class="control-group">
          <label class="control-label" for="cbo_Centro">Centro</label>
          <div class="controls">
            <select id="cbo_Centro" name="cbo_Centro" class="span5"></select>
        </div>
        </div>
      </form>

      <div class="control-group">
          <div class="controls pagination-centered"> 
                <a class="btn btn-danger" href="CargaPracticasMedicasHC.aspx" id="btnCancelarPedidoTurno" style="display:none;">Otro Paciente</a>
                <a id="btnBuscar" class="btn btn-warning" href="BuscarPresupuesto.aspx"><i class="icon-search"></i>Buscar Presupuesto</a> 
                <a id="desdeaqui" class="btn btn-info">Siguiente</a> 
          </div>
        </div>

    </div>
    <div class="clearfix"></div>
    <div id="hastaaqui">
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona" >
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span></strong>&nbsp;&nbsp;&nbsp; <span>Servicio: <strong><span id="CargadoServicio"></span></strong></span></div>
          <span>Especialidad: <strong><span id="CargadoEspecialidad"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Médico: <strong><span id="CargadoMedico"></span></strong></span>
          <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Institución: <strong><span id="CargadoInstitucion"></span></strong></span> </div>
          <div>Centro: <strong><span id="CargadoCentro"></span></strong>&nbsp;&nbsp;&nbsp; </div>
        </div>
        
      </div>
      </div>
      <div class="contenedor_3" style="height:410px;"> <div class="titulo_seccion" id="titulo_bono">
      <img src="../img/2.jpg"/>&nbsp;&nbsp;<span>Prácticas a presupuestar</span></div>
      
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaPracticas" class="tabla" style="height:110px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>F.Práctica</th>
                    <th>F.Rendición</th>
                    <th>Tipo</th>
                    <th>Fact</th>
                    <th>Cantidad</th>
                    <th>Código</th>
                    <th>Práctica</th>
                    <th>Imp. Unit</th>
                    <th>Imp. Total</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="tabbable" style="margin-left:10px; margin-top:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Módulos/Prácticas</a></li>
                <li><a href="#tab2" data-toggle="tab">Incluye/No Inc.</a></li>
            </ul>

             <form id="frm_Internacion">
          <div class="tab-content" style="height:180px;">
         

            <div class="tab-pane active" id="tab1" style="height:180px;">
            
                 <div class="row">
                        <div class="span5">
                            <div id="controlrdInternacion" class="control-group">
                                    <input id="rdInternacion" name="grupo1" type="radio" class="input-xlarge" checked="checked" style="vertical-align:middle;" /><label for="rdInternacion" style="display:inline; margin-left:5px; margin-right:5px;">Internación</label>
                                </div>
                        </div>
                </div>
                <div class="row">
                         <div class="span2">
                            <div id="controlrdPractica" class="control-group">
                                    <input id="rdPractica" name="grupo2" checked="checked" type="radio" class="input-xlarge" style="vertical-align:middle;" /><label for="rdPractica" style="display:inline; margin-left:5px; margin-right:5px;">Práctica</label>
                                </div>
                        </div>

                      <div class="span2">
                        <div id="controlrdModulo" class="control-group">
                             <input id="rdModulo" name="grupo2" type="radio" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" /><label for="rdModulo" style="display:inline; margin-left:5px; margin-right:5px;">Módulo</label>
                        </div>
                    </div>
                       <div class="span2">
                            <div id="controlcantidad" class="control-group">
                            <label for="cantidad" style="display:inline;">Cantidad: </label><input id="cantidad" name="cantidad" type="text" class="input-mini">
                            </div>
                        </div>
                   <div class="span2">
                          <div id="controlcodigo" class="control-group">
                            <label for="codigo" style="display:inline;">Código: </label><input id="codigo" name="codigo" type="text" class="input-mini">
                            </div>
                        </div>
                    </div>
                <div class="row">
                     
                         <div class="span5">
                            <label for="cbo_Practica" style="display:inline;">Práctica: </label><select id="cbo_Practica" name="cbo_Practica"></select>
                        </div>

                         <div class="span2">
                        <div id="controlprecio" class="control-group">
                            <label for="precio" style="display:inline;">Precio: </label><input id="precio" name="precio" type="text" class="input-mini">
                        </div>    
                        </div>
                          <div class="span2">
                          <div id="controltotal" class="control-group">
                            <label for="total" style="display:inline;">Total: </label><input id="total" name="total" type="text" class="input-mini">
                            </div>
                        </div>

                  </div>
                    <div class="row">

                        <div style="margin-right:50px; margin-bottom:10px; margin-top:-10px;">
                       <input id="btnCancelar_" type="button" class="btn btn-danger btn-mini pull-right" style="margin-right:10px;" value="Cancelar" />
                            <input id="btnAgregar_" type="button" class="btn btn-mini pull-right" style="margin-right:10px;" value="Agregar" />
                            </div>
                    </div>
                    
         </div>
         <div class="tab-pane" id="tab2">
         <div class="row">
           <div class="span8">
                          <div id="controldiagnostico" class="control-group">
                            <label for="diagnostico" style="display:inline;">Diagnóstico: </label><input id="diagnostico" name="diagnostico" type="text" class="input-xxlarge">
                            </div>
           </div>
          </div>


         <div class="row">
            <div id="controlIncluye" class="control-group span5">
            <label for="Incluye" style="display:inline;">Inc</label>
            <textarea id="Incluye" class="span4"></textarea>
            </div>

             <div id="controlnoIncluye" class="control-group span5">
            <label for="noIncluye" style="display:inline;">No Inc</label>
            <textarea id="noIncluye" class="span4"></textarea>
            </div>


         </div>

          </div>
         
          </div>
          </form> 
        </div>
                 

 <div class="clearfix"></div>
<div class="pie_gris">
  <a id = "btnConfirmar" class="btn btn-info pull-right"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
  <a href="Presupuestos.aspx" class="btn pull-right "><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
   <a id="btnPrint" class="btn pull-right " style="display:none;"><i class=" icon-print"></i>&nbsp;Imprimir</a>
</div>
<div class="clearfix"></div>
      </div>
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
<script src="../js/Hospitales/Facturacion/Presupuesto.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">

    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Presupuesto</strong>";

</script> 

</body>
</html>


