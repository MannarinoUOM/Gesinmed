<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Nutricion.aspx.cs" Inherits="Internacion_Nutricion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
         <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

<%--        <script type="text/javascript">
            parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Pacientes Internados</strong> > <strong>Nutrición</strong>";
</script> --%>

</head>
<body>
 <div class="clearfix">
    </div>

    <form id="form1" runat="server" class="form-horizontal" style="overflow:auto" name="f">
    <div class="container" style="padding-top: 30px; height: 670px;">
        <div class="contenedor_1" style="height:534px">
            <div class="contenedor_3" style="height:520px; padding-bottom:0px">
                <div class="titulo_seccion" style="margin-top: 0px; margin-bottom:0PX; height:40PX">
                   <span style="float:left; margin-top:7PX"> Nutrición</span>
                  <div><label class="checkbox inline" style="color:Black; margin-left:0px">Fecha: <input id="txtFecha" type="text"  placeholder="Ingrese una Fecha" style="text-align:center; display:inline"/></label></div>
              
               
                </div>
          <div class="datos_principales_contenedor">
        <div id="datos_webcam" class="datos_principales" style="margin-top:0px; margin-bottom:0px">
          <div class="datos_principales_form" style="margin-left:0px">


               <div class="datos_persona">
        <div ><img id="fotopaciente" class=" avatar2" ></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span></strong>
<%--          <a style="cursor:pointer" onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a>--%>
          </div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; 
        <%--  <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>--%>
          <div>Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>        
      </div>
        <div class="pull-left" style="margin-left:20px"> 
<%--        <div>Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>--%>
        <div>Seccional:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
<%--        <div>Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>--%>
<span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
        <div>Usuario:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoMedico"></span></strong></span></div>
        </div>
           <div class="pull-left" style="margin-left:10px"> 
        <div>Servicio:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoServicio"></span></strong></span></div>
        <div>Sala:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSala"></span></strong></span></div>
        <div>Cama:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoCama"></span></strong></span></div>
        
        </div>
        <div class="clearfix"></div>
            
          </div>

        </div>
      </div>
                <div id="Resultado" class="tabla" style="height: 170px; width: 98%; margin-left: 1%; margin-top:0px">
                    <table id="TablaConsultas" class="table table-bordered table-bordered"  style=" overflow:auto">
                        <thead>
                            <tr>
                           
                                <th style="width:100px; overflow:auto; text-align:center">
                                    Medicamento
                                </th>
                                <th style="width:100px; overflow:auto; text-align:center">
                                    Indicación
                                </th>
                         
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
         
                     <div id="cargando" style="text-align:center; display:list-item;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div> 
           </table>
           </div>

           <div id="Div1" class="tabla" style="height: 77px; width: 98%; margin-left: 1%; margin-top:0px; overflow:auto">
              <%--                  <table id="tablaMenu" class="table table-bordered table-bordered"  style=" overflow:auto">
                        <thead>
                            <tr>
                                <th style="width:110px">
                                    Código Almuerzo
                                </th>
                   <%--             <th style="width:210px">
                                   Descripción Almuero
                                </th>--%>
                        <%--      <th  style="width:110px">Código Cena</th>--%>
                          <%--    <th style="width:210px">Descripción Cena</th>--%>
           <%--                 </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>--%>
                    <label class="checkbox inline">Almuerzo: <input id="txtAlmuerzo" type="text" style="width:750px; cursor:pointer" placeholder="SELECCIONE ALMUERZO"/></label>
                   <label class="checkbox inline" style="margin-left:24px">Cena: <input id="txtCena" type="text" style="width:750px; cursor:pointer" placeholder="SELECCIONE CENA"/></label>
                </div>

                <div style="height: 40px; width: 909px; background-color:rgb(243, 243, 243); margin-top: 5px">
                <label class="checkbox inline" style="margin-left:40px; color:Black; display:none">Código Almuerzo: <select id="cboAlmuerzo"></select></label>
                <label class="checkbox inline"  style="margin-left:38px; color:Black;display:none">Código Cena: <select id="cboCena"></select></label>
                 
               <%-- <a class="btn btn-info pull-right" id="btnAgregar" href="#myModal" style="margin-right:7px; margin-top:5px;display:none">Agregar</a>--%>
                <a class="btn btn-info pull-right" id="btnQuitar" href="#myModal" style="margin-right:7px; margin-top:4px; width:51;display:none"">Quitar</a>
               <%--<label class="checkbox inline" style="color:Black; margin-left:10px">Descripción Almuerzo: <input id="txtDescAlm" type="text" maxlength="1000"/></label>
                <label class="checkbox inline" style="color:Black">Descripción Cena: <input id="txtDesCen" type="text" maxlength="1000"/></label>--%>
              <%--  <label class="checkbox inline" style="color:Black; margin-left:105px">Fecha: <input id="txtFecha" type="text"  placeholder="Ingrese una Fecha" style="text-align:center"/></label>--%>

                <div class="control-group" style="width:700px; height:40px; margin-left:333px">
               <a class="btn btn-info pull-left" id="btnLimpiar" href="#myModal" style="margin-right:7px; margin-top:5px; width:150px; margin-left:20px">Limpiar Campos</a>
                <label style="display:inline; margin-right:30px; margin-left:111px; text-align:right">Acompañante</label>
                <label style="display:inline">Sí</label>
               <input id="cboSi" type="checkbox"/>
               <label style="display:inline">No</label>
               <input id="cboNo"  type="checkbox" checked="checked" disabled="disabled"/>
               <a id="btnEditarAcompañante" class="btn btn-info" style="display:none">Editar</a>
              
                </div>
                </div>

                
                <div style="height: 46px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
              <%-- <div class="pull-right" style="padding: 5px">--%>
               <div style="padding: 5px">

                           <%-- <a class="btn btn-info pull-lefth" id="BtnVolver" href="javascript:history.go(-1)">
                            <i id="i" class=" icon-arrow-left icon-white"></i>&nbsp;Volver</a>--%>

                           <%-- <a class="btn btn-info pull-lefth" id="btnVolver" href="javascript:history.go(-1)">
                            <i id="icoVolver" class=" icon-arrow-left icon-white"></i>&nbsp;Volver</a>--%>


                            <a id="btnVolverAlPaciente" class="btn"><i class="icon-th-list"></i>&nbsp;Volver al Paciente</a>

                             <a id="btnSiguiente" class="btn btn-info" style="display:none"><i class=" icon-arrow-down icon-white"></i>&nbsp;Paciente Próximo</a>
                              <a id="btnAnterior" class="btn btn-info" style="display:none"><i class=" icon-arrow-up icon-white"></i>&nbsp;Paciente Anterior</a>

                            <a class="btn btn-info pull-right" id="btnGuardar" href="#myModal" style="display:none;margin-right:6px">
                            <i id="btnNuevo" class=" icon-hdd icon-white"></i>&nbsp;Guardar</a>

                              <a class="btn btn-info pull-right" id="btnGuardar2" href="#myModal" style="display:none;margin-right:6px">
                            <i id="I1" class=" icon-hdd icon-white"></i>&nbsp;Guardar</a>

                                <a class="btn btn-info pull-right" id="btnListadoDeComidas" href="#myModal" style="margin-right:6px; display:none">
                            &nbsp;Listado</a>

                               <a class="btn btn-info pull-right" id="btnVerTotales" href="#myModal" style="margin-right:6px">Totales</a>
                 <%--              <a class="btn btn-info pull-right" id="btnAgregar" href="#myModal" style="display:none; margin-right:7px">
                            <i id="I1" class=" icon-plus icon-white"></i>&nbsp;Agregar</a>--%>
                <%--            <a class="btn btn-info pull-right" style="margin-right:4px" id="btnRecetas">
                            <i id="I1" class=" icon-list-alt icon-white"></i>&nbsp;Recetas</a>--%>

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
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<%--<script src="../js/Hospitales/AtInternados/MostrarComidas.js" type="text/javascript"></script>--%>
<script src="../js/Hospitales/AtInternados/Menus.js" type="text/javascript"></script>
<%--<script src="../js/Hospitales/AtInternados/Nutricion.js" type="text/javascript"></script>--%>
