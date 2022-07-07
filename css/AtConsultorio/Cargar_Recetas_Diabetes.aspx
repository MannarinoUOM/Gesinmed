<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cargar_Recetas_Diabetes.aspx.cs" Inherits="AtConsultorio_Cargar_Recetas_Diabetes" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
       <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />

<%--        <script type="text/javascript">
            parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Diabetología</strong> > <strong>Pacientes Existentes</strong> > <strong>Consultas Médicas</strong> > <strong>Recetas</strong>";
</script> --%>

</head>
<body>
 <div class="clearfix">
    </div>

  <form id="form1" runat="server" class="form-horizontal" style="overflow:auto">
    <div class="container" style="padding-top: 7px; height: 670px;">
        <div class="contenedor_1" style="height:522px">
            <div class="contenedor_3" style="height:475px">
                <div class="titulo_seccion" style="margin-top: 5px; margin-bottom:0px">
                    <span>Recetas</span>
                 
                </div>
          <div class="datos_principales_contenedor">
        <div id="datos_webcam" class="datos_principales">
    <%--      <div class="datos_principales_form" style="margin-left:0px">


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
                <div id="Resultado" class="tabla" style="height: 294px; width: 98%; margin-left: 1%; margin-top:0px;overflow-y:auto"">


                        <div class="control-group">
                        
<div class="titulo_contenedor_4" style="margin-top:0px">
<%--<div class="control-group"><div class="label_top">Fármaco</div><div class="label_top">Presentación</div><div class="label_top">Dosis</div><div class="label_top">Mg x Día/UI</div><div class="label_top">Antigüedad(Año)</div></div>--%>
 <label class="check inline" style="width:112px; margin-left:7px;margin-right:23px"><strong>Fármacos</strong></label><label class="check inline" style="width:89px; margin-left:80px"><strong>Presentación</strong></label><label class="check inline" style="width:78px; margin-left:84px"><strong>Dosis</strong></label><label class="check inline" style="width:89px; margin-right:198px; margin-left:10px"><strong>Mg x día/U I</strong></label></div>
<div id="controlesLocos" class="Error" style=" margin-bottom:0px; background-color:rgb(243, 243, 243)">

<select id="cbo_farmacos"  style="width:210px; margin-left:12px">
    
</select>

<input id="txtPresentacion"  style="display:none; width:136px" type="text"/>
<select id="cboPresentacion" style=" width:74px; width:150px; padding-right:0px">
<option value="5">Cartuchos 3ml. x 5</option></select>
<input id="txtDosis"  class="input-mini" type="text" style="margin-left:20px"/>
<input id="txtmg"  class="input-mini" type="text" style="margin-left:8px"/>
<%--<input id="txtAntiguedad" class="input-mini"  type="text" style="margin-left:27px"/>--%>


<div id="btnAgregarFarmaco" class="btn btn-info" style=" margin-bottom:10px; margin-left:82px; width:84px">Agregar</div>
</div>
<div id="mostrar" style="display:none; width:879.688; background-color:rgb(243, 243, 243)"> <input style="display:none;width:196px; margin-left:12px" type="text" id="txtOtroNombre"  placeholder="Ingrese Otro Fármaco"/> </div>

<div id="contieneTabla" class="titulo_contenedor_4" style="overflow:auto; height:140px">
<table id="farmacosLista" class="table tabbable">
<%--<tr><td></td></tr>--%>
</table>
</div>

</div>

<div class="control-group" style="margin-bottom:0px; background-color:rgb(243, 243, 243)">
<label class="check inline " style="margin-left:45px; margin-top:4px"><strong>Observaciones</strong>
<input id="txtObservsaciones" style="width:660px"  type="text"/></label>

<label style="margin-left:290px" class="check inline"><strong>Medico</strong>
<input id="txtMedico" type="text" disabled="disabled"/></label>

<%--<label style="margin-left:40px" class="check inline"><strong>Vigencia</strong>
<select id="cboVigencia" style="width:90px">

<option value="0">30 Días</option>
<option value="1">60 Días</option>
<option value="2">90 Días</option>

</select></label>--%>
        </div>

                </div>
                
                <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
              <%-- <div class="pull-right" style="padding: 5px">--%>
               <div style="padding: 5px">

                            <a class="btn btn-info pull-lefth" id="BtnVolver" href="javascript:history.go(-1)">
                            <i id="i" class=" icon-arrow-left icon-white"></i>&nbsp;Volver</a>

                            <a class="btn btn-info pull-lefth" id="btnCancelar" href="Buscar_Paciente.aspx">
                            <i id="btnCancel" class=" icon-off icon-white"></i>&nbsp;Cancelar</a>
                            
                            <a class="btn btn-info pull-right" id="btnGuardar">
                            <i id="btnNuevo" class="  icon-hdd icon-white"></i>&nbsp;Guardar</a>
                            <a id="btnImprimir"  style=" margin-right:5px" class="btn btn-info pull-right" disabled="true"><i id="imprimir" class=" icon-print"></i>&nbsp;Imprimir</a>
                          

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
<%--<script src="../js/Hospitales/AtConsultorio/ListarRecetasDiabeticos.js" type="text/javascript"></script>--%>
<script src="../js/Hospitales/AtConsultorio/Cargar_Recetas_Diabetes.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>