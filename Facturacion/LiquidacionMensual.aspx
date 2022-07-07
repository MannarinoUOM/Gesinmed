<%@ Page Language="C#" AutoEventWireup="true" CodeFile="LiquidacionMensual.aspx.cs" Inherits="Facturacion_LiquidacionMensual" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<title>Gestión Hospitalaria</title>

    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />


    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>

<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>

<script>
    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Listado de Liquidación Mensual</strong>";
</script>

</head>
<body>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
        <div class="clearfix">
            </div>
            <div style="height:200px;">
            

                        <div class="minicontenedor50 pagination-centered" style="width:750px;">
                        <div class="check_todos"><label class="checkbox">
                               Seleccione Mes a Liquidar
                            </label></div>
                            <div class="row" style="float:left; margin-left:5px;">
                             <input id="rdDetallado" name="grupo1" type="radio" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" checked="checked" /><label for="rdDetallado" style="display:inline; margin-left:5px; margin-right:5px;">Detallado</label>                            
                            </div><br />
                            <div class="row" style="float:left; margin-left:5px;">
                            <input id="rdDetallado_Ambu_Int" name="grupo1" type="radio" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" checked="checked" /><label for="rdDetallado_Ambu_Int" style="display:inline; margin-left:5px; margin-right:5px;">Detallado Ambulatorio/Internación</label>   
                            </div><br />
                             <div class="row" style="float:left; margin-left:5px;">
                            <input id="rdConsolidado" name="grupo1" type="radio" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" checked="checked" /><label for="rdConsolidado" style="display:inline; margin-left:5px; margin-right:5px;">Consolidado</label>   
                            </div>
                        </div>




                            <div style="margin-left: 20px;">
<div class="pull-left"> 
<span class="add-on">Mes: </span>
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

<div class="pull-left" style="margin-left: 20px;"> 
<span class="add-on">Año: </span>
<input type="text" id="txtAño" maxlength="4" class="span1" />
</div>



<div class="pull-left" style="margin-left: 20px;"><a id="btnBuscar" class="btn"><i class="icon-search"></i>&nbsp;Buscar</a></div>

</div>
</div>

</div>
</div>
    
</body>
    <script src="../js/Hospitales/Facturacion/LiquidacionMensual.js" type="text/javascript"></script>
</html>
