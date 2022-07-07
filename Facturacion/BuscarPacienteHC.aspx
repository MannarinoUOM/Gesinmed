<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarPacienteHC.aspx.cs" Inherits="HC_Buscar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gesti�n Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />


<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Historia Cl�nica</strong>";
</script> 


<link href="../css/barra.css" rel="stylesheet" type="text/css" />


</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>
<form id="form1" class="form-horizontal">
<div class="container" style="padding-top:30px;">
  <div class="contenedor_1" style="height:450px">
    <div class="contenedor_2" style="height:370px;"> <div class="titulo_seccion">
      <img src="../img/1.jpg"/>&nbsp;&nbsp;<span>Datos del paciente</span></div>
      <form class="form-horizontal" >
       <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC">
                      </select>          
                   </div>
        </div>
        <div class="control-group" id="Controltxt_dni">
          <label class="control-label">N�</label>
          <div class="controls">
            <input id="txt_dni" name="txt_dni" type="text" class="numero" maxlength="8" placeholder="Nro de documento sin puntos">
            <input id="txtdocumento" type="hidden" />
            <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
            <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padr�n" class="btn"><i class="icon-calendar icon-black"></i></a> 
            <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" >NHC</label>
          <div class="controls">
            <input id="txtNHC" type="text" maxlength="11" placeholder="Ej: 99123456789" class="numero">
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="txtPaciente">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" maxlength="60" placeholder="Apellido Nombre"type="text" class="span3">
            <a id="btnBuscarPaciente" href="../Turnos/BuscarPacientes.aspx?Express=0" class="btn"><i class="icon-search icon-black"></i></a> </div>
        </div>
        <div id="controlTelefono" class="control-group">
          <label class="control-label">Tel�fono</label>
          <div class="controls">
            <input id="txtTelefono" maxlength="13" placeholder="Ej. 43625910" type="text">
          </div>
        </div>
        <div id="controlSeccional" class="control-group">
        
          <label class="control-label" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" value="998"/>

          <%--para ver dbt--%>
          <input type="hidden" id="afiliadoCuil"/>
          <input type="hidden" id="afiliadoIdVPN"/>  
           <%--para ver dbt--%>


              <select id="cboSeccional">
                <option value="0">Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" style="display:none;"></select>          

           </div>

        </div>
        
      </form>

      
      <div class="control-group pagination-centered">
          <div> 
                <a class="btn btn-danger" href="BuscarPacienteHC.aspx" id="btnCancelarPedidoTurno" style="display:none;">Cancelar</a> 
                <%--<a class="btn" id="btnactualizar" style="display:none;">Actualizar</a> --%>
                <a id="desdeaqui" style="display:none;" class="btn btn-info" onclick="CargarPaciente();">Detallada</a> 
                <a id="btn_HC_detalle" style="display:none;" class="btn btn-info">Completa</a>
                <a id="btnCaratula" style="display:none;" class="btn btn-info">Caratula</a> 
          </div>
       </div>

    </div>
    <div class="clearfix"></div>

  </div>
</div>
</form>
<!--Pie de pagina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.validate.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/ObraSociales/ObraSociales.js" type="text/javascript"></script>
<script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>
<%--<script src="../js/Hospitales/Turnos.js" type="text/javascript"></script>--%>
    <script src="../js/Hospitales/Facturacion/BuscarHC.js" type="text/javascript"></script>

<script>
    function CargarPaciente() {
        var d = new Date(); var month = d.getMonth() + 1; var day = d.getDate(); var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();

        var afiliadoCuil = 0;
        if ($("#afiliadoCuil").val() != "") { afiliadoCuil = $("#afiliadoCuil").val(); }
        window.location.href = "HistoriaClinica.aspx?NHC=" + $("#afiliadoId").val() + "&Cons=1" + "&C=" + Compras + "&afiliadoCuil=" + afiliadoCuil + "&Desde=" + output + "&Hasta=" + output;
    }

//    function RecargarPagina(url) {
//        document.location = "../HistoriaClinica/BuscarPacienteHC.aspx?NHC=" + url;        
//    }



</script>

<!--Barra sup--> 


</body>
</html>
