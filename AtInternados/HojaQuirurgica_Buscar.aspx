<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HojaQuirurgica_Buscar.aspx.cs" Inherits="AtInternados_HojaQuirurgica_Buscar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>

<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />

<style>
.tit_iz{width:89px;display:inline-block;}
.manito{cursor:pointer;}
</style>


<body>
    <form id="form1" runat="server">
    
  <div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
     
    <div class="clearfix"></div>
    <div>
      <div class="resumen_datos" style="height:80px;">
        
        <div class="datos_persona">
        <div ><img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"/></div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a> <img id="IconoVencido2" class="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" />  </div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span> </div>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong></div>
        </div>
        
      </div>
      </div>


      <div class="contenedor_3" style="height:346px;">    
      
      <div id="div_busqueda">
      <div id="Aguarde_Momento" style="background-color:White; display:none; width:100%; height:440px; position:absolute;">
        <div style="color:Black; font-size: 20px; text-align:center; margin-top: 199px; ">
        Aguarde un momento <img src="../img/Espere.gif" />
        </div>
      </div>

              <form id="frm_" name="frm_">
              
              <div> 
                
              </div>

              

         </form>

     </div>
         
<div class="pie_gris">
  <a id = "btnNuevo" class="btn btn-info pull-right" data-toggle="myModal"><i class=" icon-ok icon-white"></i>&nbsp;Nuevo</a>  
  <a id="btnVolver" class="btn pull-right"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>   

</div>



      </div>
    </div>
  </div>
</div>

    </form>

    
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>

<script src="../js/Hospitales/AtInternados/HojaQuirurgica_Buscar.js" type="text/javascript"></script>

<script src="../js/General.js" type="text/javascript"></script>


<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $(".contenedor_2").hide();
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    //parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > Turnos > <strong>Planificar Cirugía</strong>";

</script> 

</body>
</html>
