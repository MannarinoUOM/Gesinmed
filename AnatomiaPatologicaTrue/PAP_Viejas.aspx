<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PAP_Viejas.aspx.cs" Inherits="AnatomiaPatologicaTrue_PAP_Viejas" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
       <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/Nutricion.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/fixedHeader.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="container" style="padding-top:0px; width:82%; height:800px; margin-top:5%">
<div class="contenedor_1" style="height:auto; margin-top:auto">

<%--            <div id="resultados" class="tabla" style="height:50%;width:100%">
              <table class="table table-condensed">
               <div id="mensaje" style=" margin-top:0px; display:none"><label style=" font-size:x-large"><b>NO SE ENCONTRARON RESULTADOS</b></label></div> 
              </table>
              
                    <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                    </div>   
                
            </div>--%>

            <%--<div id="mensaje" style="display:none"><span>NO SE ENCONTRARON RESULTADOS</span></div>--%>

            <table id="resultados"  class="display mano" cellspacing="0" width="100%">                 
              <thead>					
                  <tr>
                    <th>&nbsp;</th>
                    <th>Seccional</th>
                    <th>Protocolo</th>
                    <th>Paciente</th>
                    <th  class="txtDesdeSalidaS" >Tipo Doc</th>
                    <th  class="txtFechaNotificacionDesdeS">Documento</th>
                    <th  class="txtFechaDiagnosticoDesdeS">NHC</th>
                    <th  class="txtDniS">Médico</th>
                    <th  class="txtNhc">Fecha Carga</th>
                    <th  class="txtSeccionalS">Fecha Entrega</th>
                    <th  class="cboMuestraAdecuacionS">Condición Muestra</th>
                    <th  class="cboCategoriaGeneralS">Evaluación Hormonal</th>
                    <th  class="cboSalaPerifericaS">Vinculable</th>
                    <th  class="cboHallazgosS">Diagnóstico</th>
                    <th  class="cboMicroorganismosS">Glandulares</th>
                    <th  class="cboCelulasGlandularesS">Escamosas</th>
                    <th  class="txtSeccionalS">Comentario Diag.</th>
                    <th  class="cboMuestraAdecuacionS">Comentarios</th>
                    <th  class="cboCategoriaGeneralS">Otros Elementos</th>
                    <th  class="cboSalaPerifericaS">Superficiales</th>
                    <th  class="cboHallazgosS">Intermedias</th>
                    <th  class="cboMicroorganismosS">Parabasales</th>
                    <th  class="cboCelulasGlandularesS">Aspecto</th>
                    <th  class="cboCelulasEscamosasS">Presencia</th>
                    <th  class="cboCelulasEscamosasS">Elementos</th>
                  </tr>
                 </thead> 
                            </table>


</div>
</div>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jQueryBlink.js" type="text/javascript"></script>
    <script src="../js/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
<script src="../js/Hospitales/AnatomiaPatologicaTrue/PAP_Viejas.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
