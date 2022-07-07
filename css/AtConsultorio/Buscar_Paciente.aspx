    <%@ Page Language="C#" AutoEventWireup="true" CodeFile="Buscar_Paciente.aspx.cs" Inherits="AtConsultorio_Buscar_Turno_Paciente" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%--<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">--%>
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />

<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Diabetología</strong>";
</script> 

</head>
<body>

    <form id="form1" runat="server" style=" height:450px; margin-bottom:0px">
    <div class="clearfix"></div>
        
<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>
<form id="form2" class="form-horizontal">
<div class="container" style="padding-top:30px; margin-top:10px">
  <div class="contenedor_1" style="margin-top:0px">
    <div class="contenedor_2" style="height:280px;"> <div class="titulo_seccion">
      <span style="margin-left:140px">Diabetología</span></div>
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
            <input id="txt_dni" name="txt_dni" type="text" maxlength="11"  onkeydown="validarEntradas1()" onkeyup="validarEnter(event, this)" placeholder="Nro. de documento sin puntos" />
            <input id="txtdocumento" type="hidden" />
            <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
            <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
            <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
          </div>
        </div>

        <div class="control-group">
        <label class="control-label" for="txtNHC" style="float:left; width:55px; margin-left:70px">NHC</label>
        <div class="controls">
        <input id="txtNHC" name="txtNHC" type="text" maxlength="20" onkeydown="validarEntradas2()" onkeyup="validarEnter(event,this)" placeholder="NHC" style ="margin-left:4px"/>
        </div>
        </div>

        <div class="control-group">
           <label class="control-label" for="txtPaciente" style="float:left; width:55px; margin-left:70px">Paciente</label>
         <input id ="txtPaciente" name="txtPaciente" type="text" maxlength="60" onkeydown="validarEntradas3()"  onkeyup="validarEnter(event, this)" placeholder="Apellido Nombre" style="margin-left:4px" />
        </div>

        <div class="control-group">
          <div class="pagination-centered">
           
            <a id="btnBuscarPaciente" class="btn btn-info" style="margin:auto;display:none">Siguiente</a> 
            <a id="btnListarSemaforo" onclick="ListarSemaforo()" class=" btn btn-warning">Ver Pacientes Existentes</a> 
            </div>
        </div>
        
    </form>

    <script type="text/javascript">
        function ListarSemaforo() {
            document.location = "Listar_Pacientes_Existentes.aspx?Semaforo=1";
        }
        function validarEntradas1() {

            if ($("#txt_dni").val().trim().length != 0) {
                $("#txtPaciente").attr('disabled', true);
                $("#txtNHC").attr('disabled', true);
                $("#btnBuscarPaciente").show();
            }
            else {
                $("#txtPaciente").attr('disabled', false);
                $("#txtNHC").attr('disabled', false);
                $("#btnBuscarPaciente").hide();
             
            }
        }

        function validarEntradas2() {
            if ($("#txtNHC").val().trim().length != 0) {
                $("#txt_dni").attr('disabled', true);
                $("#txtPaciente").attr('disabled', true);
                $("#btnBuscarPaciente").show();
            }
            else {
                $("#txt_dni").attr('disabled', false);
                $("#txtPaciente").attr('disabled', false);
                $("#btnBuscarPaciente").hide();
            }
        }
            function validarEntradas3() {
            if ($("#txtPaciente").val().trim().length != 0) {
                $("#txt_dni").attr('disabled', true);
                $("#txtNHC").attr('disabled', true);
                $("#btnBuscarPaciente").show();
            }
            else {
                $("#txt_dni").attr('disabled', false);
                $("#txtNHC").attr('disabled', false);
                $("#btnBuscarPaciente").hide();
            } 

 }
    </script>
    </div>
    </div>
    </div>
    
  
    </form> 
    </form>
          <div class="contenedor_2" style="height:120px; width:800px; margin-left:270px; padding-bottom:10px; padding-top:10px; padding-left:10px; padding-right:10px">

        <div style="text-align:left;font-size:small; line-height:1pt"><label style="margin-bottom:0px; margin-top:0px"><b>Compañeros:</b></label></div><br />
        <div class="control-group" style="margin-left:auto; margin-right:auto; width:550px; height:70px; vertical-align:middle">
        <div style=" font-size:small; line-height:2pt; text-align:left">A partir del 1/7/2015, la SSSalud, ha cambiado la norma que regula los tratamientos de</div><br />

         <div style=" font-size:small; line-height:2pt; text-align:left">diabetología, con una nueva planilla de carga.</div><br />
        
        <div style=" font-size:small; line-height:2pt; text-align:left">Se han migrado los datos de lo anterior, al nuevo estándar sugerido.</div><br />
        
        <div style=" font-size:small; line-height:2pt; text-align:left">Por favor, corrobore la información cargada, sobre todo en la Solapa de <b>"Tratamientos"</div></b>
         </div>       
         </div>
    </body>
</html>

    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script> 
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AtConsultorio/Buscar_Paciente.js" type="text/javascript"></script> 
    