<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listado.aspx.cs" Inherits="Guardia_Listado" %>

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
    <link rel="stylesheet" type="text/css" href="../css/hestilo.css"/>
</head>

<body>
<div class="clearfix"></div>
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:570px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Pacientes del Día</span><div class="pull-right" style="margin-top:-10px; margin-right:20px;"><label for="desde" style="display:inline;">Fecha: </label><input type="text" id="desde" maxlength="10" name="desde" class="input-small" style="margin-top:10px;" /></div></div>
      <form id="frm_Main" name="frm_Main">
        <div class="">
  
          <div class="contenedor_4 pagination-centered" style="height:50px; margin-top:5px; display:none;">
                         <div id="controldesde" class="control-group" style="display:inline; margin:10px 10px 0px 10px;"><input type="text" id="txtHoraIni" maxlength="5" name="txtHoraIni" class="input-mini" disabled style="margin-top:10px; display:none;" /></div>
               <div id="controlhasta" class="control-group" style="margin:0px 10px 10px 10px; display:none;"><label for="hasta" style="display:inline;">Hasta: </label><input type="text" id="hasta" name="hasta" maxlength="10" class="input-small" disabled style="margin-top:10px; margin-left:5px" /><input type="text" id="txtHoraFin" maxlength="5" name="txtHoraFin" class="input-mini" disabled style="margin-top:10px;" /></div>
        

               <div id="controlcbo_Estado" class="control-group" style="margin:0px 25px 0px 25px; display:none;">
                            <label for="cbo_Estado" style="display:inline;">Estado:</label>
                            <select id="cbo_Estado" name="cbo_Estado" class="span4" style="width:170px; margin-left:9px"">
                                <option value="88">Todos</option>
                                <option value="3">Transitorio</option>
                                <option value="99">Ausente</option>
                                <option value="2">Atendido</option>
                                <option value="1">En Consultorio</option>
                                <option value="0">En Espera</option>
                            </select>
               </div>
          
          </div>
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:50px; margin-top:5px; display:none;">
              

          </div>

          <div class="minicontenedor100">

                    <div class="filtro_datos" style="margin-top:10px;height:130px;">
                        <div id="Esp1" style="float: left; width: 50%;">
                        </div>
                        <div id="Esp2" style="float: right; width: 50%;">
                        </div>
                    </div>
                                    <div class="reff reff_0">Todos</div>
                                    <div class="reff Turnos_Libres">Espera</div>
                                    <div class="reff Turnos_Ocupados">Llamado</div>
                                    <div class="reff Turnos_Sobreturno">Atendido</div>
                                    <div class="reff Turnos_Cancelado">Ausente</div>

              <div id="controltxtPaciente" class="control-group" style="margin:0px 25px 0px 25px; display:block;float:right">
              <label for="txtPaciente" style="display:inline; margin-top:10px;">Apellido: </label>
              <input type="text" id="txtPaciente" name="txtPaciente" placeholder="Apellido y Nombre" maxlength="20" class="input-medium" style="margin-top:10px; margin-left:3px; width:154px" />
              <a class="btn btn-info" onclick="actualizar()">Buscar</a>
              <input id="afiliadoId" value="" type="hidden" />
              </div>
            </div>
            <a id="pedidos" onclick="PedidoEnfermeria();" class="btn btn-warning" style="margin-top:-160px; margin-left:720px; margin-bottom:0px">Pedidos a Enfermeria</a>

          </form>
        

        <script type="text/javascript">
            function actualizar() {$("#btnActualizar").click(); }
        </script>

          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>

            <div id="ta" class="tabla" style="height:280px;width:100%; margin-top:-20px;">
          <div class="hsuper_menu" style="height:350px;">
          <button class="btn btn-mini" id="OcultarMenu" style="margin-left:820px"><i class="icon-remove-circle"></i>&nbsp;&nbsp;Cerrar</button>
           <div class="resumen_datos hsuper_menu_datos" style="margin-top:0px; width:82%;" >
           <div class="datos_persona span9">
            <div><img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
            <div class="datos_resumen_paciente">
              <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
              <div><span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span></div>
              <div><span>Seccional: <strong><span id="CargadoSeccional"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Telefono: <strong><span id="CargadoTelefono"></span></strong></span></div>
            </div>
            </div>
                    <div class="span4">
                        <div class="span1" style="margin-top:30px; margin-left:0px; display:none">Médico: </div>
                            <select id="cbo_Medicos" class="span3" style="margin-top:20px; display:none"></select>
                    </div>
                    <div class="span4">
                        <div class="span1" style="margin-top:30px; margin-left:0px;">Box: </div>
                            <select id="cbo_Boxes" class="span2" style="margin-top:20px;"></select>
                    </div>
            </div>

            <div class="hsuper_botones" style="width:50%;margin-top:5px;">
                <div href="#" id="btnLlamar"><strong>1</strong>. Llamar</div>
                <div href="#" id="btnVolverLlamar"><strong>2</strong>. Volver a Llamar</div>
                <div href="#" id="btnOcupar" style="display:none;"><strong>3</strong>. Ocupar</div>
                <div href="#" onclick="Receta();" id="btnReceta" class="pos"><strong>4</strong>. Recetas</div>            
                <div href="#" onclick="OrdenesInternacion();" id="btnOrdenInt" class="pos"><strong>5</strong>. Orden de Internación</div>
                <div href="#" onclick="SolicituddeTraslado();" id="btnOrdenTras" class="pos"><strong>6</strong>. Orden de Traslado</div>
                <div href="#" onclick="CargadeEstudios();" id="opcion5"><strong>7</strong>. Ordenes de Estudios</div>


            </div>
            <div class="hsuper_botones" style="width:40%;margin-top:5px;">
                 <div href="#" id="btnTerminar"><strong>8</strong>. Finalizar Atención</div>
                 <div href="#" onclick="CertificadoMedico();" id="btnCertificado" class="pos"><strong>9</strong>. Certificado</div>
                 <div href="#" id="btnModificarAt"><strong>10</strong>. Modificar Atención</div>
                <div href="#" id="btnAusente"><strong>11</strong>. Ausente</div>
                <div href="#" id="btnVerHC"><strong>12</strong>. Historia Clinica</div>
                <div href="#" id="Div1" class="pos" onclick="patologiasCronicas();"><strong>13</strong>. Patologías crónicas</div>
                <div href="#" id="altaComp_IMG" class="pos" ><strong>20</strong>. Estudios Alta complejidad Imágenes</div>
                <div href="#" id="Div2" onclick="sospechaCovid();" ><strong>21</strong>. Sospecha Covid</div>
            </div>
          </div>  

                <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>

              <table id="TablaPedidos_div" class="table table-hover table-condensed" style="font-size:12px;">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Bono</th>
                    <th>Recep.</th>
                    <th>Atencion</th>
                    <th>Nro. HC</th>
                    <th>Afiliado</th>
                    <th>Medico Atendio</th>
                    <th>Especialidad</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div style="margin-left:20px; margin-top:10px;" class="pull-left">Actualizar lista <input type="checkbox" id="chkActualiza" style="margin-bottom:5px;"  checked/></div>
<button id ="btnActualizar" class="btn btn-info pull-right" style="margin-top:0px;"><i class="icon-search icon-white"></i>&nbsp;Actualizar</button>
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
<script src="../js/Hospitales/Guardia/Listado.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">

    parent.document.getElementById("DondeEstoy").innerHTML = "Guardia > <strong>Pacientes del Día</strong>";

</script> 

</body>
</html>
