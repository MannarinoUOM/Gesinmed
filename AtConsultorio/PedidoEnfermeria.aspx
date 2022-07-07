<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PedidoEnfermeria.aspx.cs" Inherits="AtConsultorio_PedidoEnfermeria" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>

    <div class="container" style="width:590px;">
                <div class="contenedor_1" style="width:600px;">
                <div class="contenedor_3" style="height:450px; width:580px;">
                    <div class="titulo_seccion">
                        <span>Pedidos a Enfermería</span></div>
                    <div>

                                        <!--Tabla de estudios-->
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaPedidos" class="tabla" style="height: 220px; width: 98%;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                            
                                        </th>
                                        <th>
                                            
                                        </th>
                                        <th>
                                            Fecha
                                        </th>
                                        <th>
                                            Pedido
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        </form>
                        </div>

                        <div class="clearfix"></div>

                        <div class="minicontenedor100" style="margin-top:10px; height:160px;">
                               <div id="Controlchecks" class="control-group">
                                <span>Ver Pendientes </span>
                                    <input type="radio" id="rdPedientes" name="radios" class="radio" checked />
                                    &nbsp;&nbsp;&nbsp;<span>Ver Entregados </span>
                                    <input type="radio" id="rdEntregados" name="radios" class="radio" />
                                </div>

                                <div id="Controlcbo_Consultorio" class="control-group" style="display:inline-block;">
                                <span>Consultorio: </span>
                                <select id="cbo_Consultorio" class="span6">
                                    <option value="0">CONSULTORIO</option>
                                </select>
                                </div>
                                    
                                <div id="ControlPedido" class="control-group" style="display:inline-block;">
                                <span style="margin-right:28px;">Pedido: </span>
                                <input id="txtPedido" type="text" class="span6" maxlength="50"/>
                                </div>

                                <div class="pull-right control-group" style="margin-top:10px; margin-right:10px;">
                                    <a id="btn_Guardar" class="btn btnCorrector btn-info"><i class="icon-ok"></i>&nbsp;Agregar</a>
                                    <a id="btnFinalizar" class="btn btnCorrector btn-danger"><i class="icon-remove"></i>&nbsp;Finalizar</a>
                                    <a id="btn_Cancelar" style="display:none;" class="btn btnCorrector">Cancelar</a>
                                </div>
                            
                        </div>
                        

                        
                    </div>

                                          <div class="clearfix">
                    </div>

  
                </div>
                </div>
            </div>
       
    </div>
    </form>

    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/Hospitales/AtConsultorio/Enfermeria.js" type="text/javascript"></script>

</body>
</html>
