<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ABMOSociales.aspx.cs" Inherits="Facturacion_ABMOSociales" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Altas y Edición de Obras Sociales</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 90px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Obra Social</span>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtCodigo">
                        Código</label>
                    <div class="controls">
                        <input id="txtCodigo" type="text" class="input-small" maxlength="8">
                        <span for="txtPracticas">Obra Social</span>
                        <input id="txtPracticas" type="text" class="input-medium" maxlength="15">                        
                        <a id="btn_Buscar" class="btn">Buscar <i class="icon-search"></i></a>
                    </div>
                </div>

            </div>
            <div class="clearfix">
            </div>
            <div class="contenedor_3" style="height:340px;">



                <div id="Resultado" class="tabla" style="height: 180px; width: 98%; margin-left: 1%">
                    <table id="TablaPracticas" class="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th>
                                    Código
                                </th>
                                <th>
                                    Obra Social
                                </th>
                                <th>
                                    CUIT
                                </th>
                                <th>
                                    Dirección
                                </th>
                                <th>
                                    Estado
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="minicontenedor100">
                <%--<div class="contenedor_5" style="width:95%; padding-top:5px;" >--%>
                    <div class="control-group">
                        <label class="control-label" for="txtCodigoEdicion">
                            Código</label>
                        <div class="controls">
                            <input id="txtCodigoEdicion" type="text" class="input-small" maxlength="8">
                            <span for="txtPracticaEdicion">Obra Social</span>
                            <input id="txtPracticaEdicion" maxlength="30" type="text" class="input-xlarge">

                            <a id="btnOcularPractica" class="btn btn-danger btn-mini" style="display:none;" >Práctica Activa</a>

                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="txtCUIT">
                            CUIT</label>
                        <div class="controls">
                            <input id="txtCUIT" type="text" class="input-small" maxlength="11">
                            <span for="txtDireccion">Dirección</span>
                            <input id="txtDireccion" maxlength="30" type="text" class="input-xlarge">                                                 

                        </div>
                    </div>

                    <div class="pie_gris" style="margin-left:-22px;"> 
                             <a id="btnAgregarPractica" class="btn btn-info pull-right">Guardar</a>
                             <a id="btn_Cancelar" class="btn pull-right">Cancelar</a>                    
                             <a id="btn_Nuevo" style="display:none;" class="btn pull-right">Nueva OS</a>                    
                    <div class="clearfix"></div>
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Facturacion/ABMOSociales.js" type="text/javascript"></script>

