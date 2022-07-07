<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RendicionIntporOs.aspx.cs" Inherits="Facturacion_RendicionIntporOs" %>

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
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>

<script>
    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Rendicion de Internacion Por OS</strong>";
</script>

</head>
<body>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
        <div class="clearfix">
            </div>
            <div style="height:200px;">
            <div id="controlcbo_Institucion" style="margin-left: 20px;"> 
                <label class="control-label" for="cbo_Institucion">Institución</label>
                <div class="controls">
                    <select id="cbo_Institucion" name="cbo_Institucion" class="span6"></select>
                </div>
            </div>

<form id ="frm" name="frm">
<div>
              <div id="controltxtAnio" class="span2">
                    <label for="txtAnio" style="display:inline; margin-top:10px;">Año</label>
                    <input type="text" name="txtAnio" id="txtAnio" class="input-mini" maxlength="4" style="width:80px;" />
              </div>
                 <div id="controltxtMes" class="span4">
                    <label for="txtMes" style="display:inline; margin-top:10px;">Mes</label>
                    <select name="txtMes" id="txtMes" class="input-medium">
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
              </div>


</div>
</form>
</div>

<div class="span4" style="margin-top:-80px;">
       <input id="rdAmbu" name="grupoCab" type="radio" class="input-xlarge" checked="checked" style="vertical-align:middle; display:inline;" /><label for="rdAmbu" style="display:inline; margin-right:5px;""> Ambulatorio</label>
       <input id="rdInt" name="grupoCab" type="radio" class="input-xlarge" style="vertical-align:middle;" /><label for="rdInt" style="display:inline;"> Internación</label>
       <a id="btnBuscar" class="btn" style="margin-left:20px;"><i class="icon-search"></i>&nbsp;Buscar</a>
</div>



</div>
</div>
    <script src="../js/Hospitales/Facturacion/RendicionIntporOs.js" type="text/javascript"></script>
</body>
</html>

