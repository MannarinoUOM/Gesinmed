<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Consultas_Diabeticos.aspx.cs" Inherits="Pacientes_Previa" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />

        <script type="text/javascript">
            parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Diabetología</strong> > <strong>Pacientes</strong> > <strong>Consultas Médicas</strong>";
</script> 
</head>
<body>
 <div class="clearfix">
    </div>

    <form id="form1" runat="server" class="form-horizontal" style="overflow:auto">
    <div class="container" style="padding-top: 30px; height: 670px;">
        <div class="contenedor_1">
            <div class="contenedor_3" style="height:438px; padding-bottom:0px">
                <div class="titulo_seccion" style="margin-top: 5px;">
                    <span>Consultas Médicas</span>
                 
                </div>
          <div class="datos_principales_contenedor">
        <div id="datos_webcam" class="datos_principales">
          <div class="datos_principales_form" style="margin-left:0px">


               <div class="datos_persona">
        <div ><img id="fotopaciente" class=" avatar2" ></img> </div>
        <div class="datos_resumen_paciente">
         <%-- <div>Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor:pointer" onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>--%>
         <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
        <%--  <div>Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>--%>
        <div>Seccional/OS:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
        <div>Nº Cuil:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoCuil"></span></strong></span></div>
        </div>        
      </div>
        <div class="pull-left" style="margin-left:0px; margin-top:40px"> 
      <%--  <div>Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>--%>
        
        <div>Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
         <div>Nº Carnet:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoCarnet"></span></strong></span></div>
        </div>
        <div class="clearfix"></div>
            
          </div>
          <div class="webcam_box_contenedor" style="margin-top:81px">

    <div id="webcam2contenedor" style="width:300px">
<br/>
<div class="webcam2box">

<div class="webcam2menu">
<a class="mano" id="SacarFoto">Tomar</a>
<a class="mano" id="btn_minimizarwebcam">Aceptar</a>
</div>
</div>

</div>        
            </div>
        </div>
      </div>
                <div id="Resultado" class="tabla" style="height: 200px; width: 98%; margin-left: 1%">
                    <table id="TablaConsultas" class="table table-bordered table-bordered">
                        <thead>
                            <tr>
                           
                                <th>
                                    Fecha de Consulta
                                </th>
                                <th>
                                    Fecha modificación de Consulta
                                </th>
                                <th>
                                   Paciente
                                </th>
                            
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>

                     <div id="cargando" style="text-align:center; display:list-item;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div> 

                </div>
                
                <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
              <%-- <div class="pull-right" style="padding: 5px">--%>
               <div style="padding: 5px">

                            <a class="btn btn-info pull-lefth" id="BtnVolver" href="javascript:history.go(-1)">
                            <i id="i" class=" icon-arrow-left icon-white"></i>&nbsp;Volver</a>

                            <a class="btn btn-info pull-lefth" id="btnCancelar" href="Buscar_Paciente.aspx">
                            <i id="btnCancel" class=" icon-off icon-white"></i>&nbsp;Cancelar</a>

                            <a class="btn btn-info pull-right" id="btnNuevo1" href="#myModal" onclick="NuevaConsulta()">
                            <i id="btnNuevo" class=" icon-plus icon-white"></i>&nbsp;Nueva Consulta</a>

                            <a class="btn btn-info pull-right" style="margin-right:4px" id="btnRecetas">
                            <i id="I1" class=" icon-list-alt icon-white"></i>&nbsp;Recetas</a>

                    </div>
                </div>
            </div>
        </div>
    </div>
       
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/AtConsultorio/AtencionDiabeticos.js" type="text/javascript"></script>


    <div id="ModalExistePaciente" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true" style="width:610px">
  <div class="modal-header">    
    <h3 id="H2">Doctores:</h3>
  </div>
  <div class="modal-body">
<%--    <p>Tenga en cuenta que...</p>
    <ul>
    <li>Si continua modificando los datos, al actualizarlos, puede llegar a perderse toda la información del paciente anterior.</li>
    <br />--%>
    <li>A partir del 1/7/2015, la SSSalud, ha cambiado la norma que regula los tratamientos de<br />
    diabetología, con una nueva planilla de carga.<br />
    Se han migrado los datos de lo anterior, al nuevo estándar sugerido.<br />
    Por favor, corrobore la información cargada, sobre todo en la Solapa de <b>"Tratamientos"</li>
    </ul>
    <p></p>
    <p></p>
    <p></p>

  </div>
  <div class="modal-footer">
  <%--  <button onclick="imprimir()" class="btn" data-dismiss="modal" aria-hidden="true">Si</button>    
    <button onclick="javascript:window.close();" class="btn" data-dismiss="modal" aria-hidden="true">No</button>--%>
    <button onclick="javascript:window.close();"  id="btnCargarPacientes" class="btn" data-dismiss="modal" aria-hidden="true" style="width:150px;margin-right:200px">Ok</button>    
  </div>
   </div>