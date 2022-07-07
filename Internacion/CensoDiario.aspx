<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CensoDiario.aspx.cs" Inherits="Internacion_CensoDiario" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
<link rel="stylesheet" type="text/css" href="../css/barra.css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="clearfix"> </div>
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Censo Diario de Camas</strong>";
     
    </script>
<div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);"> </div>
<div class="container" style="padding-top: 30px;">
  <div class="contenedor_1">
    <div class="clearfix"> </div>
    <div id="hastaaqui" style="display: inline;">

      <div class="contenedor_3" style=" height:500px;">
        <div class="titulo_seccion"> <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Censo Diario de Camas</span></div>
            <div style="font-size:15px;font-weight:bold;margin-left:15px;margin-bottom:10px;color:#666666" for="txtFechaInicio">Fecha hoy</span> <span id="txtFechaInicio"></div>

        <div class="">
          <div class="minicontenedor100" style="height:350px;">
          <div class="check_todos">
            <label class="checkbox">
                <input onclick="Ft(0)" id="cbo_Todos" type="checkbox" value="0" CHECKED />Marcar todos
            </label>
            <label class="checkbox">
                <input onclick="Fdes(0)" id="cbo_DesTodos" type="checkbox" value="0"/>Desmarcar todos
            </label>
          </div>
            <div class="filtro_datos check_todos_barra" style="width:98%;height:250px">
        
              

              <div id="FiltroServicios" style="float: left;"> </div>
            </div>
          </div>
                 <div id="cargando" style="text-align:center; display:none">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
                                <div class="pie_gris">
                    <a id="btn_Buscar_Censo" style="margin-right:10px;" class="btn btn-info pull-right"><i class="icon-search icon-white"></i>&nbsp;Buscar</a>
                </div>
            </div>

        </div>


        </div>

      </div>
    </div>


<!-- Modal -->
<div id="ModalError" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
  <div class="modal-header">
    <h3 id="myModalLabel"> Error en Turno</h3>
  </div>
  <div class="modal-body">
    <p> <span id="DialogoError"></span> </p>
  </div>
  <div class="modal-footer">
    <button id="CerrarError" class="btn" data-dismiss="modal" aria-hidden="true"> Cerrar</button>
  </div>
</div>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script> 
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/GeneralG.js" type="text/javascript"></script> 
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script> 
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/Hospitales/Internacion/CensoDiario.js" type="text/javascript"></script>
</body>
</html>
