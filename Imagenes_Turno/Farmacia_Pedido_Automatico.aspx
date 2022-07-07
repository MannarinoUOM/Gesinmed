<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Farmacia_Pedido_Automatico.aspx.cs" Inherits="Imagenes_Turno_Farmacia_Pedido_Automatico" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>        

    <style>
    .Amarillo {background-color:Yellow;}
    </style>

</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   
    <div class="clearfix"></div>
    <div>

      <div class="contenedor_3" style="height:410px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Pedido a farmacia</span></div>

      <div id="div_fechas">
      <span style="display:inline-block; margin-left:15px;">Desde</span>
      <input type="text" id="txt_fecha1" style="width: 89px;" />

      <span style="display:inline-block; margin-left:15px;">Hasta</span>
      <input type="text" id="txt_fecha2" style="width: 89px;"/>
      

      <a id="btn_cargar" class="btn btn-info" style="margin-bottom: 10px;">Cargar</a>
      </div>

       <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaMedicamentos" class="tabla" style="height:207px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>Insumo</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody id="tabla_contenido">                
                </tbody>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>






      
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:100px;width: 95%;">
            
             <div id="div_insumo" class="combos" style="margin-left:10px;">
                    <input type="text" id="txt_filtro" placeholder="Filtro Insumo" />
                    <label for="cbo_Medicamento" style="display:inline;width:80px;" class="span1">Insumo:</label>
                    <select id="cbo_Medicamento" style="width:500px;margin-bottom: 10px;"></select>
             </div>
            
            <div class="combos" style="margin-left:10px;">
                <label for="txt_cantidad" style="display:inline;width:80px;" class="span1">Cantidad:</label>
                <input type="text" id="txt_cantidad" name="cantidad" class="input-mini" style="margin-bottom: 0px;" />

                <a id="btn_agregar" class="btn">Agregar</a><a id="btn_cancelar" class="btn" style="margin-left: 5px;">Cancelar</a>
            </div>

            
                        
          </div>
          
          <div class="clearfix"></div>
        </div>

       

<div class="pie_gris">
<div class="pull-right" style="padding:5px; height:120px;">
  <a href="Farmacia_Pedido_Automatico.aspx" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Cancelar</a>  
  <a id ="btnConfirmarPedido" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Confirmar</a>
</div>
</div>
      </div>
    </div>
  </div>
</div>

<!--Pie de p�gina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.validate.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>
<script src="../js/Hospitales/Imagenes/Farmacia_Pedido_Automatico.js" type="text/javascript"></script>



<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));

        $("#CargadoServicio").html($("#cbo_Servicio :selected").text());
        if ($("#CargadoServicio").html() == "GUARDIA" && $("#CargadoPedido").html() == "Provisorio") CargarPlantilla();
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Imágenes > <strong>Pedido a farmacia</strong>";

</script> 

</body>
</html>



