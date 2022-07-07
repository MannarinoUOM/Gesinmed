<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CrearNomencladores.aspx.cs" Inherits="Facturacion_Cap_CrearNomencladores" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Crear Nomenclador</strong>";
     
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
                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                           <div id="cargando" style="text-align:center; display:none;">
                                <br /><br />
                                <img src="../img/Espere.gif" /><br />
                                Cargando...
                            </div>
                        <div id="TablaBonos" class="tabla" style="height: 220px; width: 890px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                            Nomenclador
                                        </th>
                                        <th>
                                            Convenio
                                        </th>
                                        <th>
                                            Fecha Desde
                                        </th>
                                        <th>
                                            Fecha Hasta
                                        </th>
                                        <th>
                                            Descripcion
                                        </th>
                                        <th>
                                            Baja
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
                            <div class="span10">
                                <div id="controlFACT_CONVENIO_ID" class="control-group">
                                <label for="FACT_CONVENIO_ID" style="display:inline;">Convenios: </label>
                                    <select id="FACT_CONVENIO_ID" name="FACT_CONVENIO_ID" class="input-xlarge datos"></select>
                                </div>
                            </div>
                         </div>   
                         <div class="row">
                                <div class="span4">
                                    <div id="controlFACT_NOMENCLA_DESDE" class="control-group">
                                     <label for="FACT_NOMENCLA_DESDE" style="display:inline;">Desde: </label>
                                        <input id="FACT_NOMENCLA_DESDE" name="FACT_NOMENCLA_DESDE" type="text" class="input-small date datos" maxlength="10">
                                    </div>
                                </div>
                                <div class="span3">
                                    <div id="controlFACT_NOMENCLA_HASTA" class="control-group">
                                    <label for="FACT_NOMENCLA_HASTA" style="display:inline;">Hasta: </label>
                                        <input id="FACT_NOMENCLA_HASTA" name="FACT_NOMENCLA_HASTA" type="text" class="input-small date datos" maxlength="10">
                                    </div>
                                </div>
                                <div class="span10">
                                    <div id="controlFACT_NOMENCLA_DESC" class="control-group">
                                    <label for="FACT_NOMENCLA_DESC" style="display:inline;">Descripcion: </label>
                                        <input id="FACT_NOMENCLA_DESC" name="FACT_NOMENCLA_DESC" type="text" class="input-large datos" maxlength="30">
                                    </div>
                                </div>
                            <div class="span3">
                                <div id="controlFACT_NOMENCLA_BAJA">
                                    <label for="FACT_NOMENCLA_BAJA" style="display:inline;">Baja 
                                    <input type="checkbox" id="FACT_NOMENCLA_BAJA" value="" /></label>
                                </div>
                            </div>
                        </div>
                        </div>
                        </form>
                                                <div class="clearfix"></div>
                    </div>



                    <div class="pie_gris">
                        <div class="pull-right">
                            <a id="btnQuitar" class="btn btn-danger" style="display:none;"><i class=" icon-remove-circle"></i>&nbsp;Quitar</a>
                            <a id="btnCancelar" class="btn"><i class=" icon-remove"></i>&nbsp;Cancelar</a>
                            <a id="btnGuardar" class="btn btn-success"><i class=" icon-ok-circle"></i>&nbsp;Guardar</a>
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
<script src="../js/Hospitales/Facturacion_Cap/CrearNomencladores.js" type="text/javascript"></script>
</body>
</html>
