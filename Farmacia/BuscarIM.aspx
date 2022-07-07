<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarIM.aspx.cs" Inherits="Farmacia_BuscarIM" %>

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
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />

</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:510px;"> <div class="titulo_seccion" id="titulo_bono">
      <span>Buscar Pedidos por Indicación Médica</span></div>
      <form id="frm_Main" name="frm_Main" style="margin: 5px 5px 5px 5px;">
        <div class="">
  
          <div class="contenedor_4 pagination-centered" style="height:150px; margin-top:5px;">
          
              <div id="controltxtNHC" class="control-group" style="display:inline; margin:25px 25px 0px 25px;">
                    <label for="txtNHC" style="display:inline; margin-top:10px;">NHC: </label>
                    <input type="text" id="txtNHC" name="txtNHC" placeholder="Ingrese NHC" class="input-medium" style="margin-top:10px;width:250px; margin-left:25px" />
              </div>
              <div id="controltxtNroPed" class="control-group" style="margin:0px 25px 0px 25px;">
                    <label for="txtNroPed" style="display:inline; margin-top:10px;">IM: </label>
                    <input type="text" id="txtNroPed" name="txtNroPed" placeholder="Ingrese Nro de Pedido" class="input-medium" style=" margin:7px 0px 8px 38px;width:250px;" />
              </div>
               <div id="controltxtNombre" class="control-group" style="margin:0px 25px 25px 25px;">
                    <label for="txtNombre" style="display:inline; margin-top:10px;">Paciente: </label>
                    <input type="text" id="txtNombre" name="txtNombre" placeholder="Ingrese Nombre" class="input-medium" style="margin-top:10px; width:250px;" />
              </div>
          
          </div>
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:150px; margin-top:5px;">
              
               <div id="controldesde" class="control-group" style="display:inline; margin:10px 10px 0px 10px;"><label for="desde" style="display:inline;">Desde: </label><input type="text" id="desde" name="desde" class="input-small" style="margin-top:10px;margin-left:11px"" /></div><br />
               <div id="controlhasta" class="control-group" style="display:inline; margin:0px 10px 10px 10px;"><label for="hasta" style="display:inline;">Hasta: </label><input type="text" id="hasta" name="hasta" class="input-small" style="margin-top:10px; margin-left:16px" /></div>
                <div class="combos" style="margin-left:10px;"><label for="cbo_Medicos" style="display:inline;">Médicos:</label>
                    <select id="cbo_Medicos" style="width:300px;">
                    <option value="0">Todos</option>
                    </select>
                </div>
          </div>

          <div class="minicontenedor100"">
          <input id="cbo_Todos_Especialidades" checked type="checkbox" style="display:inline; margin:5px;">Marcar todos
          <input id="chk_Ninguno" type="checkbox" style="display:inline; margin:5px;"/>Desmarcar todos
                    <div class="filtro_datos" style="width:850px;">
                        <div id="Servicio1" style="float: left; width: 50%;">
                        </div>
                        <div id="Servicio2" style="float: right; width: 50%;">
                        </div>
                    </div>
            </div>

          </form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:5px 15px 0px 15px;">
            
            <div class="clearfix"></div>
        <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
            <div id="TablaPedidos_div" class="tabla" style="height:140px;width:100%; margin-top:-5px;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Pedido</th>
                    <th>Fecha</th>
                    <th>NHC</th>
                    <th>Paciente</th>
                    <th>Servicio</th>
                    <th>Sala</th>
                    <th>Cama</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
    <div class="pull-right" style="height:90px;">
        <a id = "btnBuscar" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar</a>
        <a id = "btnCargar" class="btn btn-warning"><i class=" icon-ok icon-white"></i>&nbsp;Cargar Pedido</a>
    </div>
</div>
      </div>
    </div>
  </div>

<!--Pie de p�gina-->
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/Hospitales/Farmacia/BuscarIM.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Farmacia > <strong>Pedidos por Indicación Médica > Buscar Pedidos por Indicación Médica</strong>";
</script> 

</body>
</html>


