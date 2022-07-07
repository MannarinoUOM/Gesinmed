<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Recetas_Diabeticos.aspx.cs" Inherits="AtConsultorio_ListarRecetasDiabeticos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
     <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />

        <script type="text/javascript">
            parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Diabetología</strong> > <strong>Pacientes</strong> > <strong>Consultas Médicas</strong> > <strong>Recetas</strong>";
</script> 
</head>
<body>
 <div class="clearfix">
    </div>

    <form id="form1" runat="server" class="form-horizontal" style="overflow:auto">
    <div class="container" style="padding-top: 7px; height: 670px;">
        <div class="contenedor_1" style="height:455px">
            <div class="contenedor_3" style="height:408px">
                <div class="titulo_seccion" style="margin-top: 5px;">
                    <span>Recetas</span>
                 
                </div>
          <div class="datos_principales_contenedor">
        <div id="datos_webcam" class="datos_principales">
<%--          <div class="datos_principales_form" style="margin-left:0px">


               <div class="datos_persona">
        <div ><img id="fotopaciente" class=" avatar2" ></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor:pointer; visibility:hidden" onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span style="visibility:hidden">NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>        
      </div>
        <div class="pull-left" style="margin-left:20px"> 
        <div>Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
        <div>Seccional:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
        <div>Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
        </div>
        <div class="clearfix"></div>
            
          </div>--%>
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

    <div id="webcam2contenedor" style="width:300px;">
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
                    <table id="TablaRecetas" class="table table-bordered table-bordered">
                        <thead>
                            <tr>
                           
                                <th>
                                    Fecha
                                </th>
                             
                                <th>
                                    Fecha Modificación
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

                            <a class="btn btn-info pull-right" id="btnNuevaReceta" href="#myModal">
                            <i id="btnNuevo" class=" icon-plus icon-white"></i>&nbsp;Nueva Receta</a>

                          

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
<script src="../js/Hospitales/AtConsultorio/ListarRecetasDiabeticos.js" type="text/javascript"></script>
<%--<script src="../js/Hospitales/AtConsultorio/AtencionDiabeticos.js" type="text/javascript"></script>--%>
<%--<script type="text/jscript">
    function NuevaReceta() {

        document.location = "../AtConsultorio/Cargar_Recetas_Diabetes.aspx";

    }

</script>--%>