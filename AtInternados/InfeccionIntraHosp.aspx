<%@ Page Language="C#" AutoEventWireup="true" CodeFile="InfeccionIntraHosp.aspx.cs" Inherits="AtInternados_InfeccionIntraHosp" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link rel="stylesheet" type="text/css" href="../css/hestilo.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>

<body>

<script>
    function imgErrorPaciente(image) {
        image.onerror = "";
        image.src = "../img/silueta.jpg";
        return true;
    }
</script>

<div class="container">
  <div class="contenedor_1">
    <div class="contenedor_a" style="position:relative;margin-left:15px;height:530px">
      <div style="padding:15px;">

<div class="pull-left minicontenedor50" style="width:40%">
        <div class="pull-left" style="width:310px; height: 145px;">
            Desde: <input type="text" id="txtDesde" name="txtDesde" class="input-small date" maxlength="10"/>
            Hasta: <input type="text" id="txtHasta" name="txtHasta" class="input-small date" maxlength="10"/>
            Paciente: <input type="text" id="txtNombre" name="txtNombre" class="input-large" maxlength="30"/>
            Nro. HC: <input type="text" id="txtNHC" name="txtNHC" class="input-large numero" style="margin-left:5px;" maxlength="15" />
            Nro. Doc: <input type="text" id="txtDNI" name="txtDNI" class="input-medium numero" style="width:210px;" maxlength="8"/> 
        </div>       
</div>

<div class="pull-right TablaBuscar50" style="width:50%">
        <div class="AUbuscar pull-left" style="width:300px">

        

        <label class="checkbox" style="width:100px;display:inline-block">
        <input id="cbo_Todos" value="" type="checkbox" checked/>Marcar todos</label>

        <label class="checkbox" style="width:112px;display:inline-block">
        <input id="cbo_Ninguno" value="" type="checkbox"/>Desmarcar todos</label>
          
          <div class="pull-right" style="display:none;">
            <span class="pull-left">Médico:</span>
            <select id="cbo_Medico" class="pull-left"></select>
          </div>
            
          
        </div>
        <div class="tabla pull-left" style="margin-top:0;height:120px" >
          <form name="frm">
          <table class="table table-hover">
            <thead>
            <th width="20px"></th>
            <th width="900px">Servicio</th>
                </thead>
            <tbody id="TServicios">
              
            </tbody>
          </table>
          </form>
</div>          
        </div>

<div class="clearfix"></div>        
<div id="Tabla" class="tabla" style="height:320px;">
          
          <div class="hsuper_menu" style="height:350px; margin-top:-30px;">
          <button id="btnCerrar" class="btn btn-mini" style="margin-left:810px; margin-top:1px;"><i class="icon-remove-circle"></i>&nbsp;&nbsp;Cerrar</button>
           <div class="resumen_datos hsuper_menu_datos" style="margin-top:0px; height:78px; width:780px" >
              <div class="datos_persona">
                <div><img id = "fotopaciente" class="avatar2" src="../img/silueta.jpg" onerror="imgErrorPaciente(this);"/></div>
                <div class="datos_resumen_paciente">
                  <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                  <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                  <div>Seccional: <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
                  <div>Servicio: <strong><span id="CargadoServicio"></span></strong>&nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="CargadoSala"></span></strong></span> <span>Cama: <strong><span id="CargadoCama"></span></strong></span> </div>  <%--//manuel//////////////////////////////--%>
                  <input type="hidden" id="afiliadoId" />
                  <input type="hidden" id="ProtocoloImpresion" />
                </div>
              </div>
            </div>

            <div class="hsuper_botones" style="width:50%;margin-top:-15px;">
                <div href="#" onclick="javascript:InfHCPaciente();" style="display:none;"><strong>1</strong>. Antecedentes de Ingreso</div>
                <div href="#" onclick="javascript:HC();"><strong>1</strong>. Historia Clínica Detallada</div>
                <div href="#" onclick="javascript:IM();"><strong>2</strong>. Pedido por Indicación Médica</div>
                <div href="#" onclick="javascript:Evolucion();"><strong>3</strong>. Evolución</div>
                <div href="#" onclick="javascript:Epicrisis();"><strong>4</strong>. Epicrisis</div>
                <div href="#" onclick="javascript:Interconsulta();"><strong>5</strong>. Solicitar Interconsulta</div>
                <div href="#" onclick="javascript:HojaEnfermeria();"><strong>6</strong>. Hoja de Enfermería</div>
                 <div href="#" onclick="javascript:Nutricion();"><strong>7</strong>. Nutrición</div>
                 <div href="#" onclick="javascript:altaMedica();"><strong>8</strong>. Alta Médica</div>
            </div>

            <div class="hsuper_botones" style="margin-top:-15px;">
                <div href="#" onclick="Receta();" id="opcion4"><strong>9</strong>. Recetas</div>
                <div href="#" onclick="CertificadoMedico();" id="opcion6"><strong>10</strong>. Certificado Médico</div>            
                <div href="#" onclick="CargadeEstudios();" id="opcion5"><strong>11</strong>. Ordenes de Estudios</div>
                <div href="#" onclick="AltaComplejidad();" id="opcion55"><strong>12</strong>. Estudios de Alta Complejidad</div>
                <div href="#" onclick="HojaQuirurgica();" id="opcion13"><strong>13</strong>. Hoja Quirurgica</div>
                <div href="#" onclick="PaseUTIaPiso();" id="opcionUTIaPiso" style="display:none;"><strong>14</strong>. Pase UTI a Piso</div>
                <div href="#" onclick="PaseGuardiaaUTI();" id="opcionGuardiaaUTI" style="display:none;"><strong>15</strong>. Pase de Dia de Guardia a UTI</div>
                <div href="#" onclick="PaseCama();" id="opcionPaseCama"><strong>16</strong>. Pase de Cama</div>
            </div>


          </div>

<table class="table table-hover" style=" font-size:12px;">
            <thead>
            <th width="40px">Servicio</th>
            <th width="40px">Sala</th>
            <th width="40px">Cama</th>
            <th width="40px">Nro. H.C.</th>
            <th width="40px">Afiliado</th>
           <%-- <th>Seccional</th>            
            <th>F. Ingreso</th>--%>
            <th>I/I</th>
            <th>Cultivo</th>
            <th>Germen</th>
            <th>ISQ</th>
            <%--<th>Diagnostico Ingreso</th>--%>
            </thead>
            <tbody id="TInternados">
             
            </tbody>
          </table>
          </div>


      </div>
      <div class="pie_gris">
        <div class="pull-right">
            <a id="btnImprimir" class="btn" style="margin-left:30px"><i class="icon-print"></i>&nbsp;&nbsp;Imprimir</a>
          <a id="btnBuscar" class="btn btn-info" style="margin-left:30px"><i class="icon-search"></i>&nbsp;&nbsp;Buscar</a>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/AtInternados/InfeccionIntraHosp.js" type="text/javascript"></script>
<!--Barra sup--> 
<script>
    parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Infección Intrahospitalaria</strong>";
</script>  
</body>
</html>
