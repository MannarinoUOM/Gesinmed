<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Busqueda.aspx.cs" Inherits="Farmacia_Esquina_Busqueda" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Entrega de Insumos</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: inline;">
                <div class="contenedor_3" style="height:490px">
                    <div class="">
                        <div class="minicontenedor50 pagination-centered" style="width:200px;">
                        
                                <div class="check_todos">
                                    <label class="checkbox">
                                        <input id="chk_Seccionales" type="checkbox" CHECKED />Marcar todos
                                    </label>
                                    <label class="checkbox">
                                        <input id="chk_Seccionales_Des" type="checkbox"/>Desmarcar todos
                                    </label>
                                </div>

                                <div class="filtro_datos" style="width:98%; height:120px;">                                                        
                                    <div id="FiltroSeccionales" style="float: left;width:180px; height:120px;">                               
                                    </div>                                
                                </div>
                        </div>

                        <div class="minicontenedor50 pagination-centered" style="width:200px;">                       
                            <div class="check_todos">
                               <label class="checkbox">
                                    <input id="chk_Patologias" type="checkbox" value="0" CHECKED />Marcar todos
                               </label>
                              <label class="checkbox">
                                    <input id="chk_Patologias_Des" type="checkbox" value="0"/>Desmarcar todos
                              </label>
                            </div>

                            <div class="filtro_datos" style="width:98%; height:120px;">                                                        
                                <div id="FiltroPatologias" style="float: left;width:180px; height:120px;">                             
                                </div>                                
                            </div>
                        </div>
                        <div class="minicontenedor50" style="width:400px; margin-left:5px;">
                            <div class="controls">
                                <span for="txtNroExpediente">Nro. Expte.</span>
                                <input id="txtNroExpediente" type="text" class="input-mini numero" style="margin-left:16px" maxlength="7"/>
                                <span for="txtRemito">Nro. Remito</span>
                                <input id="txtRemito"  type="text" style="width:124px;" class="numero" maxlength="8"/>
                            </div>
                            <div class="controls">
                                <span for="txtPaciente">Paciente</span>
                                <input id="txtPaciente" type="text" style="margin-left:29px;width:283px" maxlength="40"/>
                            </div>
                            <div class="controls">
                                <span for="cbo_Discapacidad">Discapacidad</span>
                                <select id="cbo_Discapacidad" class="input-xlarge" style="width: 297px;"></select>
                            </div>
                            <div class="controls">
                                <span for="txtNroPedido">Nro. Pedido</span>
                                <input id="txtNroPedido" type="text" class="input-small numero" style="margin-left:11px" maxlength="10">
                                <span for="txtNroDoc" style=" margin-left:18px">Nro. Doc.</span>
                                <input id="txtNroDoc" type="text" class="input-small numero" style="margin-left: 5px;" maxlength="8">
                            </div>
                            <div id="ControlFechas" class="controls control-group" style="margin-bottom: 0px;">
                                <span for="txtVencimientoDesde">Fecha Desde</span>
                                <input id="txtVencimientoDesde" type="text" class="input-small date" style="margin-left:0px;">
                                <span for="txtVencimientoHasta" style="margin-left:2px">Fecha Hasta</span>
                                <input id="txtVencimientoHasta" type="text" class="input-small date">
                            </div>
                        </div>
                        <div class="minicontenedor50" style="width:95%; margin-left:10px; margin-top:5px;">
<%--                            <span style="width:100px;">Con Casam. o Nac.</span> <input type="checkbox" id="chkDocu_CasaNam" style="margin-top:0px; margin-right:15px;"/>
                            <span style="width:100px;">Con DNI</span> <input type="checkbox" id="chkDocu_DNI" style="margin-top:0px; margin-right:15px;"/>
                            <span style="width:100px;">Con Discapacidad</span> <input type="checkbox" id="chkDocu_Discapacidad" style="margin-top:0px; margin-right:15px;"/>    
                            <span style="width:100px;">Con Rec. Sueldo</span> <input type="checkbox" id="chkDocu_RecSueldo" style="margin-top:0px; margin-right:15px;"/> --%>
                            <button style="margin-right:30px; cursor:default" type="button" class="btn btn-primary pull-right" id="lbl_CantidadReg">0</button>
                        </div>
                         
                        <div class="clearfix">
                        </div>
                    </div>
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaBonos" class="tabla" style="height: 200px; width: 890px;">
                         <div id="cargando" style="text-align:center; display:none;">
                            <br /><br />
                            <img src="../img/Espere.gif" /><br />
                            Cargando...
                        </div>       
                            <table id="table_b" class="table table-hover table-condensed" style="font-size:11px;"> 
                                <thead>
                                    <tr>
                                        <th>
                                           Nro. Expte.
                                        </th>
                                        <th>
                                           Nro. Pedido
                                        </th>
                                        <th>
                                           Nro. Remito
                                        </th>
                                        <th>
                                            Apellido y Nombre
                                        </th>
                                        <th>
                                            Nro. Doc.
                                        </th>
                                        <th>
                                            Patolog?a
                                        </th>
                                        <th>
                                            Seccional
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        </form>
                    </div>
                    <div class="clearfix">
                    </div>
                    <div class="pie_gris">
                        <div class="pull-right">
                            <a id="btnBuscar" class="btn btn-info"><i class=" icon-search"></i>&nbsp;Buscar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/Farmacia_Esquina/Busqueda.js" type="text/javascript"></script>
<%--<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > Internacion > <strong>Buscar Expedientes</strong>";
</script> --%>
</body>
</html>
