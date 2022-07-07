<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ValorizacionRangoConvenio.aspx.cs" Inherits="Facturacion_ValorizacionRangoConvenio" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Asignación de Valor a Rangos y Convenios</strong>";
     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="clearfix">
            </div>
            <div id="hastaaqui" style="display: inline;">
                <div class="contenedor_3" style="height:500px;">
                    <div class="titulo_seccion">
                        <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Asignación de Valor a Rangos y Convenios</span></div>
                    


                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaBonos" class="tabla" style="height: 140px; width: 890px;">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>
                                            Convenio
                                        </th>
                                        <th>
                                            Rango
                                        </th>
                                        <th>
                                            Valor Gasto
                                        </th>
                                        <th>
                                            Valor Honorario
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
                        <div class="minicontenedor100" style="height:320px;">
                            
                             <div class="row">
                            <div class="span6">
                                <div id="controlcbo_Nomencla" class="control-group">
                                <label for="cbo_Nomencla" style="display:inline;">Nomenclador: </label>
                                       <select id="cbo_Nomencla" class="span4"; style="width:210px; margin-left:16px">
                                        <option value="1">Nomenclador Actual</option>
                                    </select>
                                </div>
                            </div>
                            </div>   


                        <div class="row">
                            <div class="span6">
                                <div id="controlcbo_Convenios" class="control-group">
                                <label for="cbo_Convenios" style="display:inline;">Convenios: </label>
                                    <select id="cbo_Convenios" style="margin-left:32px; width:210px">
                                    <option value=""></option>
                                    </select>
                                </div>
                            </div>
                         </div>   
                         <div class="row">
                            <div class="span6">
                               <div id="controlcbo_Rango" class="control-group">
                                <label for="cbo_Rango" style="display:inline;">Rango: </label>
                                    <select id="cbo_Rango" name="cbo_Rango"; style="margin-left:57px ; width:195px">
                                    <option value=""></option>
                                    </select>
                                </div>
                            </div>
                         </div>
                          <div class="row">
                            <div class="span6">
                               <div id="controltxtValor" class="control-group">
                                <label for="txtValor" style="display:inline;">Valor Gasto: </label>
                                 <input type="text" id="txtValor" name="txtValor"; style="margin-left:24px; width:196px" />
                                </div>
                            </div>
                         </div>
                         <div class="row">
                            <div class="span6">
                               <div id="controltxtValorHonorario" class="control-group">
                                <label for="txtValorHonorario" style="display:inline;">Valor Honorario: </label>
                                 <input type="text" id="txtValorHonorario" name="txtValorHonorario"; style="width:195px" />
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
                            <a id="btnGuardar" class="btn btn-info"><i class=" icon-ok-circle"></i>&nbsp;Guardar</a>
                            <a id="btnCancelar" class="btn btn-danger"><i class="icon-remove"></i>&nbsp;Cancelar</a>
                            <a id="btnCopyNomenclador" class="btn btn-warning"><i class="icon-file"></i>&nbsp;Copiar Nomenclador</a>
                            <a id="btnPrint" class="btn btn"><i class="icon-print"></i>&nbsp;Imprimir</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/Facturacion/ValorRangoConvenio.js" type="text/javascript"></script>  


</body>
</html>

