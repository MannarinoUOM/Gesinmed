    <%@ Page Language="C#" AutoEventWireup="true" CodeFile="Buscar_Paciente.aspx.cs" Inherits="AtConsultorio_Buscar_Turno_Paciente" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Atención Diabetología</strong>";
</script> 


<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>
<form id="form2" class="form-horizontal">
<div class="container" style="padding-top:30px; margin-top:160px">
  <div class="contenedor_1">
    <div class="contenedor_2" style="height:223px;"> <div class="titulo_seccion">
      <%--<img src="../img/1.jpg"/>&nbsp;&nbsp;--%>
      <span style="margin-left:87px">Atención Diabetología</span></div>
      <form class="form-horizontal" >
         <div id="controlcbo_TipoDOC" class="control-group">
     
          <div class="controls">
               <label class="control-label" for="cbo_TipoDOC" style="float:left; width:55px; margin-left:70px">Tipo</label>
              <select id="cbo_TipoDOC">
              </select>          
           </div>
        </div>
        <div class="control-group" id="Controltxt_dni">
          <label class="control-label" style="float:left; width:55px; margin-left:70px">Nº</label>
          <div class="controls">
            <input id="txt_dni" name="txt_dni" type="text" maxlength="11"  onchange="validarEntradas()" onkeyup="validarEnter(event, this)" placeholder="Nro. de documento sin puntos">
            <input id="txtdocumento" type="hidden" />
            <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
            <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
            <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
          </div>
        </div>

        <div class="control-group">
          <label class="control-label" for="txtPaciente" style="float:left; width:55px; margin-left:70px">Paciente</label>
          <div class="controls">
            <input id ="txtPaciente" type="text" maxlength="60" onchange="validarEntradas()"  onkeyup="validarEnter(event, this)" placeholder="Apellido Nombre" class="span3 ingreso"; style="margin-left:4px">
            <a id="btnBuscarPaciente" class="btn" style="margin-left:124px" ><i class="icon-search icon-black"></i>Buscar</a> 
            <a id="btnListarSemaforo" onclick="ListarSemaforo()" class="btn" style="hidden:visible"><i class="icon-th-list icon-black"></i>Listar Pacientes</a> 
            </div>
        </div>
    </form>
<%--    onkeyup="validarEnter(event, this)"--%>
    <script type="text/javascript">
        function ListarSemaforo() {
            document.location = "Listar_Pacientes_Existentes.aspx?Semaforo=1";
        }
//            function limitar() {
//                $("#txtPaciente").change(function () { alert("hola"); });


function validarEntradas() {

    if ($("#txtPaciente").val().trim().length != 0) {
        $("#txt_dni").attr('disabled', true);}
    else { $("#txt_dni").attr('disabled', false); }

    if ($("#txt_dni").val().trim().length != 0) {
        $("#txtPaciente").attr('disabled', true);
    }
    else { $("#txtPaciente").attr('disabled', false); }
            
            
            }
        
    
    </script>

    </form>
    </form>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script> 

    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AtConsultorio/Buscar_Paciente.js" type="text/javascript"></script> 
</body>
</html>
