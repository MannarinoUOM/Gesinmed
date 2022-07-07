<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RendicionAmbulatoria_MonicaSN.aspx.cs" Inherits="Facturacion_RendicionAmbulatoria_MonicaSN" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:490px;"> <div class="titulo_seccion" id="titulo_bono" style="display:none;">
      <span>Resumen de Prestaciones Ambulatoria (Monica)</span></div>
      <form id="frm_Main" name="frm_Main">
        <div class="tabbable" style="margin-left:10px;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Filtros</a></li>
            </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">
          <div style="padding:0px 15px 0px 15px; height:200px;">
        

        <div class="row">
              <div id="controlcbo_Institucion" class="span5">
                    <label for="cbo_Institucion" style="display:inline; margin-top:10px;">Obra Social: </label>
                    <select id="cbo_Institucion" name="cbo_Institucion" class="input-xlarge" style="margin-top:10px;">
                    </select>
              </div>
              <div id="controlcbo_Tipo" class="span5">
                    <label for="cbo_Tipo" style="display:inline; margin-top:10px;">Tipo: </label>
                    <select id="cbo_Tipo" name="cbo_Tipo" class="input-xlarge" style="margin-top:10px;">
                        <option value="0">Por Fecha</option>
                        <option value="1">Por Definición</option>
                    </select>
              </div>    
        </div>
        <div class="row">
            <div id="controltxtDesdeParte" class="span5">
                    <label for="txtDesdeParte" style="display:inline; margin-top:10px;">Fecha Desde: </label>
                    <input type="text" id="txtDesdeParte" name="txtDesdeParte" class="input-mini date" style="margin-top:10px; width:90px; margin-left:21px">
              </div> 
            <div id="controltxtHastaParte" class="span5">
                   <label for="txtHastaParte" style="display:inline; margin-top:10px;">Fecha Hasta: </label>
                    <input type="text" id="txtHastaParte" name="txtHastaParte" class="input-mini date" style="margin-top:10px;width:90px; margin-left:22px">
              </div>
        </div>
        <div class="row">
            <div id="controltxtDesdeRendicion" class="span5">
                    <label for="txtDesdeRendicion" style="display:inline; margin-top:10px;">Rendición Desde: </label>
                    <input type="text" id="txtDesdeRendicion" name="txtDesdeRendicion" class="input-mini" style="margin-top:10px; width:90px;">
              </div>
            <div id="controltxtHastaRendicion" class="span5">
                   <label for="txtHastaRendicion" style="display:inline; margin-top:10px;">Rendición Hasta: </label>
                    <input type="text" id="txtHastaRendicion" name="txtHastaRendicion" class="input-mini" style="margin-top:10px;width:90px;">
              </div>
        </div>
        </div>
    </div>
    
</div>
</div>
</form>
    

          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:15px 15px 0px 15px;">
            
            <div class="clearfix"></div>
            <div id="TablaPartes_div" class="tabla" style="height:240px;width:100%; margin-top:-70px;">
              <div id="cargando" style="text-align:center; display:none;">
                <br /><br /><br />
                <img src="../img/Espere.gif" /><br />Procesando...
              </div>
              <table id="tabla" class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th><input type="checkbox" id="chk_todos" /></th>      
                    <th>Rendición</th>
                    <th style="display:none;">&nbsp;</th>
                    <th>Fecha</th>
                    <th>Paciente</th>
                    <th>Gasto</th>
                  </tr>
                  <tbody id="trx"></tbody>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="box_informativo_a pull-left">
    <div style="padding-top:3px"><strong id="Total">Total : $ 0</strong></div>          
</div>
    <div class="pull-right">
        <button id = "btnBuscar" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
        <button id = "btnProcesar" class="btn btn-info" style="display:none;"><i class=" icon-ok-circle icon-white"></i>&nbsp;Procesar</button>
        <button id = "btnPrevia" class="btn btn-info" style="display:none;"><i class="icon-print icon-white"></i>&nbsp;Vista Previa</button>
    </div>
</div>
      </div>
    </div>
  </div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Facturacion/RendicionAmbulatoria_MonicaSN.js" type="text/javascript"></script>
 

<!--Barra sup--> 
<script type="text/javascript">

    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Resumen de Prestaciones Ambulatorias (Monica)</strong>";

</script> 

</body>
</html>




