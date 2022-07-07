<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Version_Comentario.aspx.cs" Inherits="Sistemas_Version_Comentario" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>GesInMed</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Sistemas > <strong>Versiones y Cambios</strong>";
     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: inline;">
                <div class="contenedor_3" style="height:530px;">
                                        <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaComentarios" class="tabla" style="height: 190px; width: 890px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                    <th></th>
                                        <th>
                                            Versión
                                        </th>
                                        <th>
                                            Fecha
                                        </th>
                                        <th>
                                            Comentario
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="TComentarios">
                                    
                                </tbody>
                            </table>
                        </div>

                        </form>
                    </div>         
                    <div class="clearfix">
                    </div>
                    <div class="">
                    <form id="frm_Main">
                        <div class="minicontenedor100">
                        <div class="row">
                            <div class="span10">
                                <div id="controltxtVersion" class="control-group">
                                <span class="span1" style="width:100px;"><label for="txtVersion" style="display:inline;">Version: </label></span>
                                    <input id="txtVersion" name="txtVersion" type="text" maxlength="8">
                                </div>
                            </div>
                         </div>   
                         <div class="row">
                                <div class="span4">
                                    <div id="controltxtFecha" class="control-group" style="width:364px">
                                     <span class="span1" style="width:100px;"><label for="txtFecha" style="display:inline;">Fecha: </label></span>
                                        <input id="txtFecha" name="txtFecha" type="text" maxlength="10">
                                    </div>
                                </div>
                        </div>
                        <div class="row">
                                <div class="span8">
                                    <div id="controltxtComentario" class="control-group">
                                    <span class="span1" style="width:100px;"><label for="txtComentario" style="display:inline;">Comentario: </label></span>
                                        <textarea id="txtComentario" name="txtComentario" class="span6" rows="8"></textarea>
                                    </div>
                                </div>
                         </div>
                        </div>
                        </form>
                       <div class="clearfix"></div>
                    </div>



                    <div class="pie_gris">
                        <div class="pull-right">
                            <a id="btnGuardar" class="btn btn-success"><i class=" icon-ok-circle"></i>&nbsp;Agregar</a>
                            <a id="btnCancelar" class="btn btn-danger"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/Sistemas/Version_Comentario.js" type="text/javascript"></script>
</body>
</html>
