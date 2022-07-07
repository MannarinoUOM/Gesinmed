<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Sugerencias.aspx.cs" Inherits="Facturacion_Sugerencias" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <title></title>
</head>
<body>
    <div class="clearfix">
    </div>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top:30px; height:300px; width:690px;">
        <div class="contenedor_1" style="width:670px;">

            <div class="clearfix">
            </div>
            <div class="contenedor_3" style="height:300px;width:620px;">



                <div id="Resultado" class="tabla" style="height:200px; width:98%; margin-left:1%; font-size:12px;">
                    <table id="TablaPracticas" class="table table-hover table-condensed">
                        <thead>
                            <tr>                                
                                <th>
                                    Descripción
                                </th>
                                
                            </tr>
                            <tbody id="TablaResultados">
                                
                            </tbody>
                        </thead>
                    </table>                    
                </div>
                <div style="clear:both"></div>
                
                <div class="minicontenedor100" style="margin-top:10px;">

                <div>
                <span>Sugerencias</span>
                <textarea id="txtSugerencias" class="span6"></textarea>
                </div>
                </div>
                    <div class="pie_gris">                              
                             <a id="btnAgregarPractica" class="btn btn-info pull-right"><i class="icon-ok"></i>&nbsp;Guardar</a>
                             <a id="btn_Cancelar" class="btn pull-right">&nbsp;Cancelar</a>                    
                             <a id="btnEliminar" class="btn btn-danger pull-right" style="display:none;"><i class="icon-remove"></i>&nbsp;Eliminar</a>
                    </div>
 
            </div>

               
            
        </div>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/Facturacion_Cap/Sugerencias.js" type="text/javascript"></script>


