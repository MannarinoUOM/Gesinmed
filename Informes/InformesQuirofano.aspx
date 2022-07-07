<%@ Page Language="C#" AutoEventWireup="true" CodeFile="InformesQuirofano.aspx.cs" Inherits="Informes_InformesQuirofano" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<title>Gestión Hospitalaria</title>

    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />


    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>

<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>

<script>
    parent.document.getElementById("DondeEstoy").innerHTML = "Bonos > <strong>Informes de Quirófano</strong>";
</script>

</head>
<body>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
        <div class="clearfix">
            </div>
            <div style="height:290px;">
            
                        
                        <div class="minicontenedor50 pagination-centered" style="width:180px; height:265px;">
                        <div class="check_todos"><label class="checkbox">
                                <input id="cbo_Todos_Seccional" type="checkbox">Seccionales
                            </label></div>
                            <div class="filtro_datos_sec" style="width:98%; height:65px;">                                                        
                                <div id="FiltroSec" style="float: left; height:200px;width:200px ; overflow-x:hidden; overflow-y: auto;">
                                </div>                                
                            </div>
                        </div>

                        <div class="minicontenedor50 pagination-centered" style="width:180px;height:265px;">
                        <div class="check_todos"><label class="checkbox">
                                <input id="cbo_Todos_Institucion" value="0" type="checkbox">Instituciones
                            </label></div>
                            <div class="filtro_datos_ins" style="width:98%; height:65px;">
                                <div id="FiltroIns" style="float: left;height:200px;width:200px ; overflow-x:hidden; overflow-y: auto;">
                                </div>                                
                            </div>
                        </div>

                        <div class="minicontenedor50 pagination-centered" style="width:180px;height:265px;">
                        <div class="check_todos"><label class="checkbox">
                                <input id="cbo_Todas_Especialidad" value="0" type="checkbox">Especialidades
                            </label></div>
                            <div class="filtro_datos_esp" style="width:98%; height:65px;">                                                        
                                <div id="FiltroEsp" style="float: left;height:200px;width:200px ; overflow-x:hidden; overflow-y: auto;">
                                </div>                                
                            </div>
                        </div>

                        <div class="minicontenedor50 pagination-centered" style="width:180px;height:265px;">
                        <div class="check_todos"><label class="checkbox">
                                <input id="cbo_Todas_Cirugias" value="0" type="checkbox">Cirugias
                            </label></div>
                            <div class="filtro_datos_cir" style="width:98%; height:65px;">                                                        
                                <div id="FiltroCir" style="float: left;height:200px;  width:200px ;overflow-x:hidden; overflow-y: auto;">
                                </div>                                
                            </div>
                        </div>

</div>
<div class="minicontenedor50" style="width:450px;float:left; margin:0px;margin-top:-30px;">
    <span class="box_informativo_a">Rango de Fechas</span>
        <div class="row" style="margin-left:5px;">   
            <div id="controltxtFechaInicio" class="span5" style="width:160px;">
                    <label for="txtFechaInicio" style="display:inline; margin-top:10px;">Desde: </label>
                    <input type="text" id="txtFechaInicio" name="txtFechaInicio" class="input-mini date" style="margin-top:10px; width:90px;">
              </div>
            <div id="controltxtFechaFin" class="span5" style="width:160px;">
                   <label for="txtFechaFin" style="display:inline; margin-top:10px;">Hasta: </label>
                    <input type="text" id="txtFechaFin" name="txtFechaFin" class="input-mini date" style="margin-top:10px;width:90px;">
              </div>
        </div>

    <span class="box_informativo_a">Detallados</span>
        <div class="row">   
            <div id="controlchkRealizadas" class="span5" style="width:250px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkRealizadas" name="detallados" type="radio">Cirugias Realizadas
                    </label>
              </div>
         </div>
     <span class="box_informativo_a">Ordenado Por...</span>
        <div class="row">
            <div id="controlchkSeccional" class="span5" style="width:150px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkSeccionalOs" name="ordenado" type="radio">Secc./OS
                    </label>
              </div>
                <div id="controlchkEspecialidad" class="span5" style="width:150px;">
                        <label class="checkbox" style="font-size:smaller;">
                                <input id="chkEspecialidad" name="ordenado" type="radio">Especialidad
                        </label>
                </div>
        </div>
        <div class="row">
              <div id="controlchkAnestesista" class="span5" style="width:150px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkAnestesista" name="ordenado" type="radio">Anestesista
                    </label>
              </div>
                <div id="controlchkCirujano" class="span5" style="width:150px;">
                        <label class="checkbox" style="font-size:smaller;">
                                <input id="chkCirujano" name="ordenado" type="radio">Cirujano
                        </label>
                </div>
        </div>

        <div class="row">   
            <div id="controlchkCirugiasEspHoras" class="span8" style="width:250px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkCirugiasEspHoras" name="detallados" type="radio">Cirugias por Esp.(Horas)
                    </label>
              </div>
         </div>
         <div class="row">   
            <div id="controlchkCirugiasProfHoras" class="span8" style="width:250px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkCirugiasProfHoras" name="detallados" type="radio">Cirugias por Prof.(Horas)
                    </label>
              </div>
         </div>
         <div class="row">   
            <div id="controlchkCirugiasSusp" class="span8" style="width:350px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkCirugiasSusp" name="detallados" type="radio">Cirugias Suspendidas(Horas)
                    </label>
              </div>
         </div>
         <div class="row">   
            <div id="controlchkExtras" class="span5" style="width:250px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkExtras" type="radio" name="detallados">Extras Utilizados por Pac.
                    </label>
              </div>
         </div>

  </div>
  <div class="minicontenedor50" style="width:452px; height:285px;float:right; margin:0px; margin-top:-30px;">
     <span class="box_informativo_a">Agrupados</span>
        <div class="row">   
            <div id="controlchkCirugiasSecc" class="span5" style="width:350px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkCirugiasSecc" name="agrupados" type="radio">Cirugias Por Secc.
                    </label>
              </div>
         </div>
         <div class="row">   
            <div id="controlchkCirugiasEspA" class="span5" style="width:350px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkCirugiasEspA" name="agrupados" type="radio">Cirugias Por Esp.
                    </label>
              </div>
         </div>
          <div class="row">   
            <div id="controlchkCirugiasEspAH" class="span5" style="width:350px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkCirugiasEspAH" name="agrupados" type="radio">Cirugias Por Esp.(Horas)
                    </label>
              </div>
         </div>
          <div class="row">   
            <div id="controlchkCirugiasProfA" class="span5" style="width:350px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkCirugiasProfA" name="agrupados" type="radio">Cirugias Por Prof.
                    </label>
              </div>
         </div>
          <div class="row">   
            <div id="controlchkCirugiasProfAH" class="span5" style="width:350px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkCirugiasProfAH" name="agrupados" type="radio">Cirugias Por Prof.(Horas)
                    </label>
              </div>
         </div>
         <div class="row">   
            <div id="controlchkCirugiasAmbuInt" class="span5" style="width:350px;">
                    <label class="checkbox" style="font-size:smaller;">
                                <input id="chkCirugiasAmbuInt" name="agrupados" type="radio">Cirugias Por Ambu-Internacion
                    </label>
              </div>
         </div>

          <div id="controlbtnBuscar" class="span2" style="margin-top:70px; margin-left:300px;">
                  <button id = "btnBuscar" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar</button>
              </div>
  </div>

    </div>

</div>
</div>
    <script src="../js/Hospitales/Informes/InformesQuirofano.js" type="text/javascript"></script>    
</body>
</html>
