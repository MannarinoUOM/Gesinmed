<%@ Page Language="C#" AutoEventWireup="true" CodeFile="VerTodoslosTurnos.aspx.cs" Inherits="Turnos_VerTodoslosTurnos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>Gestión Hospitalaria</title>

    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />


    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>

<script>
    parent.document.getElementById("DondeEstoy").innerHTML = "Turnos > <strong>Informe de Turnos por Médico o Especialidad</strong>";
</script>

</head>
<body>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
        <div class="clearfix">
            </div>
            <div style="height:400px;">
            

                        <div class="minicontenedor50 pagination-centered">
                        <div class="check_todos"><label class="checkbox">
                                <input onclick="Fe()" id="cbo_Todos_Especialidades" value="0" type="checkbox" checked>Marcar todos
                            </label>
                            <label class="checkbox">
                                <input id="chk_DesE" value="0" type="checkbox">Desmarcar todos
                            </label></div>
                            <div class="filtro_datos" style="width:98%; height:150px">
                                <div id="FiltroEspecialidad" style="float: left;">
                                    <asp:Literal ID="LEspecialidad" runat="server"></asp:Literal>
                                </div>                                
                            </div>
                        </div>


                        <div class="minicontenedor50 pagination-centered">
                        <div class="check_todos"><label class="checkbox">
                                <input onclick="Fm()" id="cbo_Todos_Medicos" value="0" type="checkbox" checked>Marcar todos
                            </label>
                            <label class="checkbox">
                                <input id="chk_DesM" value="0" type="checkbox">Desmarcar todos
                            </label></div>
                            <div class="filtro_datos" style="width:98%; height:150px">                                                        
                                <div id="FiltroMedico" style="float: left;">
                                    <asp:Literal ID="LMedicos" runat="server"></asp:Literal>
                                </div>                                
                            </div>
                        </div>



 <div class="row" style="margin-left:15px;">
<div class="span4"> 
<span class="add-on">Fecha Desde: </span>
<input type="text" id="txtFechaInicio" class="span2"/> 
</div>

<div class="span4"> 
<span class="add-on">Fecha Hasta: </span>
<input type="text" id="txtFechaFin" class="span2"/>
</div>

<div class="pull-left" style="margin-left: 20px;"><a id="btnBuscar" class="btn" onclick="ChequearTodo();"><i class="icon-print"></i>&nbsp;Imprimir</a></div>

</div>

<div class="row" style="margin-left:15px;">
    <div class="span4"> 
    Imprimir todo:
    <input type="radio" id="chkTodo" class="span2" style="margin-left:-40px; margin-bottom:5px;" name="opc" /> 
    </div>

    <div class="span4"> 
    Imprimir sin cancelados:
    <input type="radio" id="chkSinCancelados" class="span2" style="margin-left:-40px;margin-bottom:5px;" name="opc" checked/>
    </div>
</div>

</div>

</div>
</div>

<script src="../js/Hospitales/Turnos_IMG/VerTodoslosTurnos.js" type="text/javascript"></script>
</body>
</html>

