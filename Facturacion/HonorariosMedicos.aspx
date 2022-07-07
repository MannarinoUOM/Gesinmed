<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HonorariosMedicos.aspx.cs" Inherits="Facturacion_HonorariosMedicos" %>


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
    parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Honorarios de Médicos</strong>";
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
                                <input onclick="toggle_checks(this)" id="cbo_Todos_Med" type="checkbox">Marcar todos
                            </label></div>
                            <div class="filtro_datos" style="width:98%; height:65px">
                                <div id="FiltroMedicos" style="float: left;">
                                </div>                                
                            </div>
                        </div>


                        <div class="minicontenedor50 pagination-centered" style="width:375px; display:none;">
                        <div class="check_todos"><label class="checkbox">
                                <input onclick="Fm()" id="cbo_Todos_Medicos" value="0" type="checkbox" checked>Marcar todos
                            </label></div>
                            <div class="filtro_datos" style="width:98%; height:65px">                                                                                   
                            </div>
                        </div>

                        <div class="minicontenedor50 pagination-centered" style="width:250px; display:none;">
                        <div class="check_todos"><label class="checkbox">
                                <input onclick="Fp()" id="cbo_Todas_Practicas" value="0" type="checkbox" checked>Marcar todas
                            </label></div>
                            <div class="filtro_datos" style="width:98%; height:65px">                                                        
                                <div id="FiltroPracticas" style="float: left;">
                                    <asp:Literal ID="LPracticas" runat="server"></asp:Literal>
                                </div>                                
                            </div>
                        </div>


                        <form id ="frm" name="frm">
                            <div style="margin-left: 20px;">
<div id="controltxtFechaInicio" class="pull-left"> 
<span class="add-on">Fecha Desde: </span>
<input type="text" id="txtFechaInicio" name="txtFechaInicio" class="span2" /> 
</div>

<div id="controltxtFechaFin" class="pull-left" style="margin-left: 20px;"> 
<span class="add-on">Fecha Hasta: </span>
<input type="text" id="txtFechaFin" name="txtFechaFin" class="span2" />
</div>


<div class="pull-left" style="margin-left: 20px;"><a id="btnBuscar" class="btn"><i class="icon-search"></i>&nbsp;Buscar</a></div>

</div>
</form>
</div>

</div>
</div>
    <script src="../js/Hospitales/Facturacion/HonorariosMedicos.js" type="text/javascript"></script>
</body>
</html>
