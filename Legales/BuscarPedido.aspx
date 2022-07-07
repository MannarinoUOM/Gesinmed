<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarPedido.aspx.cs" Inherits="Legales_BuscarPedido" %>

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
    <div class="clearfix">
    </div>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Legales > <strong>Buscar Pedidos</strong>";
     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1" style="height:550px;">
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: inline; height:550px;">
                <div class="contenedor_3" style="height:500px;">
                    <div class="">
                        <div class="minicontenedor50">
                            <div class="controls">
                                <span for="txtFechaInicio">Fecha Desde</span>
                                <input id="txtFechaInicio" type="text" class="input-small">

                                <span for="txtFechaFin" style="margin-left:0px">Fecha Hasta</span>
                                <input id="txtFechaFin" type="text" class="input-small">
                            </div>
                            <div class="controls">
                                <span for="TxtNroDoc">Nro. Documento.</span>
                                <input id="TxtNroDoc" type="text" class="input-small numero">
                                <span for="txtNroHC">Nro. H.C.</span>
                                <input id="txtNroHC" type="text" class="input-small numero">
                            </div>
                            <div class="controls">
                                <span for="txtAfiliado">Paciente</span>
                                <input id="txtAfiliado" type="text" class="input-xlarge">
                            </div>
                        </div>
                        <div class="minicontenedor50">
                             <div class="controls">
                                <span for="txtNroNota">Nro. Nota</span>
                                <input id="txtNroNota" type="text" class="input-small">
                                <span for="chkEsSecuestro">Es Secuestro</span>
                                <input id="chkEsSecuestro" type="checkbox" style="margin-top:-5px;"/>
                                <span for="chkEsObito">Es Obito</span>
                                <input id="chkEsObito" type="checkbox" style="margin-top:-5px;"/>
                                <span for="chkEsART">Es ART</span>
                                <input id="chkEsART" type="checkbox" style="margin-top:-5px;"/>
                            </div>
                             <div class="controls">
                                <span for="cbo_TipoReq">Tipo Req</span>
                                <select id="cbo_TipoReq" class="span4"></select>
                            </div>
                             <div class="controls">
                                <span for="txtPedidopor">Pedido por</span>
                                <input id="txtPedidopor" type="text" class="input-xlarge">
                            </div>
                        </div>
                        <div class="clearfix">
                        </div>
                    </div>
                    <div style="padding: 0px 15px 0px 15px;">
<%--                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">--%>
                        <div class="clearfix">
                        </div>
                         <div id="cargando" style="text-align:center; display:none;">
                            <br /><br />
                            <img src="../img/Espere.gif" /><br />
                            Cargando...
                        </div>
                        <div id="TablaPedidos" class="tabla" style="height: 320px; width: 890px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                            Fecha
                                        </th>
                                        <th>
                                            Paciente
                                        </th>
                                        <th>
                                            NHC
                                        </th>
                                        <th>
                                            Pedido por
                                        </th>
                                        <th>
                                            Tipo Req.
                                        </th>
                                        <th>
                                            N° Nota
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
<%--                        </form>--%>
                    </div>
                    <div class="clearfix">
                    </div>
                    <div class="pie_gris">
                        <div class="pull-right" style="padding: 5px">
                            <a id="btnBuscar" class="btn"><i class="icon-search"></i>&nbsp;Buscar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/Hospitales/Legales/BuscarPedido.js" type="text/javascript"></script>
</body>
</html>
