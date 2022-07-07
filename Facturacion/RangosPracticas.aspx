<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RangosPracticas.aspx.cs" Inherits="Facturacion_RangosPracticas" %>


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
        parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Altas y Edición de Rangos</strong>";
     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: inline;">
                <div class="contenedor_3" style="height:460px;">
                    <div class="titulo_seccion">
                        <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Altas y Edición de Rangos</span></div>
                    


                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaBonos" class="tabla" style="height: 240px; width: 890px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                            Rango
                                        </th>
                                        <th>
                                            Practica Desde
                                        </th>
                                        <th>
                                            Practica Hasta
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="TConvenios">
                                    
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
                            <div class="span6">
                                <div id="controltxtPracticaDesde" class="control-group">
                                <label for="txtPracticaDesde" style="display:inline;">Practica Desde: </label>
                                    <input id="txtPracticaDesde" name="txtPracticaDesde" type="text" class="input-xlarge" maxlength="6">
                                </div>
                            </div>
                         </div>   
                         <div class="row">
                            <div class="span6">
                                <div id="controltxtPracticaHasta" class="control-group">
                                <label for="txtPracticaHasta" style="display:inline;">Practica Hasta: </label>
                                    <input id="txtPracticaHasta" name="txtPracticaHasta" type="text" class="input-xlarge" maxlength="6"; style="margin-left:4px">
                                </div>
                            </div>
                         </div>    
                        </div>
                        </form>
                                                <div class="clearfix"></div>
                    </div>



                    <div class="pie_gris">
                        <div class="pull-right" style="padding: 5px; margin-bottom:5px;">
                            <a id="btnQuitar" class="btn btn-danger" style="display:none;"><i class=" icon-remove-circle"></i>&nbsp;Quitar</a>
                            <a id="btnGuardar" class="btn"><i class=" icon-ok-circle"></i>&nbsp;Guardar</a>
                            <a id="btnCancelar" class="btn"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Facturacion/RangosPracticas.js" type="text/javascript"></script>


</body>
</html>

