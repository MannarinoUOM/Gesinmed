<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cargar_Recetas_Diabetes.aspx.cs" Inherits="AtConsultorio_Cargar_Recetas_Diabetes" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
       <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />

        <script type="text/javascript">
            parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Atención Diabetología</strong> > <strong>Pacientes Existentes</strong> > <strong>Consultas Médicas</strong> > <strong>Recetas</strong>";
</script> 

</head>
<body>
 <div class="clearfix">
    </div>

  <form id="form1" runat="server" class="form-horizontal" style="overflow:auto">
    <div class="container" style="padding-top: 7px; height: 670px;">
        <div class="contenedor_1">
            <div class="contenedor_3" style="height:550px">
                <div class="titulo_seccion" style="margin-top: 5px;">
                    <span>Recetas</span>
                 
                </div>
          <div class="datos_principales_contenedor">
        <div id="datos_webcam" class="datos_principales">
          <div class="datos_principales_form" style="margin-left:0px">


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
                <div id="Resultado" class="tabla" style="height: 340px; width: 98%; margin-left: 1%">
           <%--         <table id="TablaRecetas" class="table table-bordered table-bordered">
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
                    </table>--%>

         <%--            <div id="cargando" style="text-align:center; display:list-item;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div> --%>


                        <div class="control-group">
                        
<div class="titulo_contenedor_4" style="margin-top:0px">
<%--<div class="control-group"><div class="label_top">Fármaco</div><div class="label_top">Presentación</div><div class="label_top">Dosis</div><div class="label_top">Mg x Día/UI</div><div class="label_top">Antigüedad(Año)</div></div>--%>
 <label class="check inline" style="width:112px; margin-left:143px;margin-right:23px"><strong>Fármacos</strong></label><label class="check inline" style="width:89px; margin-left:78px"><strong>Presentación</strong></label><label class="check inline" style="width:112px; margin-left:25px"><strong>Dosis</strong></label><label class="check inline" style="width:89px; margin-left:0px"><strong>Mg x día/U I</strong></label></div>
<div id="controlesLocos" class="Error" style=" margin-bottom:0px">

<select id="cbo_farmacos"  style="width:210px; margin-left:147px">
            
</select>

<input id="txtPresentacion" class="input-mini" type="text"/>
<input id="txtDosis"  class="input-mini" type="text" style="margin-left:36px"/>
<input id="txtmg"  class="input-mini" type="text" style="margin-left:34px"/>
<%--<input id="txtAntiguedad" class="input-mini"  type="text" style="margin-left:27px"/>--%>


<div id="btnAgregarFarmaco" class="btn btn-info" style=" margin-bottom:10px; margin-left:42px">Agregar</div>
</div>
<div id="mostrar" style="display:none; width:430px"> <input id="txtOtroNombre" class="input-mini" type="text"  placeholder="Ingrese Otro Farmaco" style="width:196px; margin-left:147px"/> </div>

<div class="titulo_contenedor_4" style=" overflow:auto; height:185px">
<table id="farmacosLista" class="table tabbable">
<%--<tr><td></td></tr>--%>
</table>
</div>

</div>

<div class="control-group" style="margin-bottom:0px">
<label class="check inline " style="margin-left:45px"><strong>Observaciones</strong>
<input id="txtObservsaciones" style="width:660px"  type="text"/></label>

<label style="margin-left:190px" class="check inline"><strong>Medico</strong>
<input id="txtMedico" type="text"/></label>

<label style="margin-left:40px" class="check inline"><strong>Vigencia</strong>
<select id="cboVigencia" style="width:90px">

<option value="0">30 Días</option>
<option value="1">60 Días</option>
<option value="2">90 Días</option>

</select></label>
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
                            <a id="btnImprimir"  style=" margin-right:5px; display:none" class="btn btn-info pull-right"><i id="imprimir" class=" icon-print"></i>&nbsp;Imprimir</a>
                          

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