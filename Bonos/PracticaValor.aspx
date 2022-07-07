<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PracticaValor.aspx.cs" Inherits="Bonos_PracticaValor" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <title></title>
</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Altas y Edición de Prácticas</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 90px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Buscar Práctica</span>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtCodigo">
                        Código</label>
                    <div class="controls">
                        <input id="txtCodigo" type="text" class="input-small" placeholder="Todos">
                        <span for="txtPracticas">Práctica</span>
                        <input id="txtPracticas" type="text" class="input-medium" placeholder="Todas">                        
                        <a id="btn_Buscar" class="btn"> <i class="icon-search"></i>&nbsp;Buscar</a>
                    </div>
                </div>

            </div>
            <div class="clearfix">
            </div>
            <div class="contenedor_3" style="height:340px;">


              <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>    
                <div id="Resultado" style="height:250px;width:98%; overflow:auto;">
                    <table id="TablaPracticas" class="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th>
                                    Código
                                </th>
                                <th>
                                    Práctica
                                </th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="pie_gris" style="height:100px;">
                <%--<div class="contenedor_5" style="width:95%; padding-top:5px;" >--%>
                    <div class="control-group">
                        <label class="control-label" for="txtCodigoEdicion">
                            Código</label>
                        <div class="controls">
                            <input id="txtCodigoEdicion" type="text" class="input-small"/>
                            <span for="txtPracticaEdicion">Práctica</span>
                            <input id="txtPracticaEdicion" maxlength="50" type="text" class="input-xlarge" style="margin-right:20px;"/>

                            <%--<a id="btnOcularPractica" class="btn btn-danger btn-mini" style="display:none;">Práctica Activa</a>--%>
                            Activa &nbsp;&nbsp;&nbsp;<input id="chkActiva" type="checkbox" />
                        </div>
                    </div>
                    <div class="control-group" style="display:none;">
                        <label class="control-label" for="txtPrecioFEdicion">
                            Precio a Facturar</label>
                        <div class="controls">
                        <div class="input-prepend">
                            <span class="add-on">$</span><input class="span1" id="txtPrecioFEdicion" type="text" value="0">
                            </div>

                            <span for="txtPrecioGEdicion">
                            Precio GUARDIA</span>
                            <div class="input-prepend">
                        <span class="add-on">$</span><input class="span1" id="txtPrecioGEdicion" type="text" value="0">
                        </div>
                        </div>
                    </div>

              <%--      <div class="pie_gris" style="margin-left:-22px;"> --%>
                             <a id="btnAgregarPractica" class="btn btn-info pull-right" style="display:none;">Modificar</a>
                             <a id="btn_Cancelar" class="btn pull-right">Cancelar</a>                    
                             <a id="btn_Nuevo" class="btn pull-right">Nueva Práctica</a>                    
<%--                    <div class="clearfix"></div>
                    </div>--%>
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
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Bonos/PracticaValor.js" type="text/javascript"></script>

