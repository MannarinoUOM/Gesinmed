<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ABM_Proveedores.aspx.cs" Inherits="Farmacia_ABM_Proveedores" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Altas y Edición de Proveedores</strong>";
     
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
                        <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Altas y Edición de Proveedores</span></div>
                    


                    <div style="padding: 0px 15px 0px 15px;">
                        <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                        <div class="clearfix">
                        </div>
                        <div id="TablaBonos" class="tabla" style="height: 170px; width: 890px; font-size:11px;">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th></th>
                                        <th>
                                            Proveedor
                                        </th>
                                        <th>
                                            Rubro
                                        </th>
                                        <th>
                                            Telefono
                                        </th>
                                        <th>
                                            Contacto
                                        </th>
                                        <th>
                                            Dirección
                                        </th>
                                        <th>
                                            CUIT
                                        </th>
                                        <th>
                                            Localidad
                                        </th>
                                         <th>
                                            Celular
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
                            <div class="span5">
                                <div id="controltxtProveedor" class="control-group">
                                <span class="span1" style="width:100px;"><label for="txtProveedor" style="display:inline;">Proveedor: </label></span>
                                    <input id="txtProveedor" name="txtProveedor" type="text"  rel='Ingrese Proveedor'>
                                </div>
                            </div>
                            <div class="span4">
                                    <div id="controltxtRubro" class="control-group" style="width:364px">
                                     <span class="span1" style="width:80px;"><label for="txtRubro" style="display:inline;">Rubro: </label></span>
                                        <input id="txtRubro" name="txtRubro" type="text"  rel='Ingrese Rubro'>
                                    </div>
                                </div>
                         </div>   
                         <div class="row">
                                <div class="span5">
                                    <div id="controltxtDireccion" class="control-group">
                                    <span class="span1" style="width:100px;"><label for="txtDireccion" style="display:inline;">Dirección: </label></span>
                                        <input id="txtDireccion" name="txtDireccion" type="text"  rel='Ingrese Direccion'>
                                    </div>
                                </div>
                                <div class="span5">
                                    <div id="controltxtLocalidad" class="control-group">
                                    <span class="span1" style="width:80px;"><label for="txtLocalidad" style="display:inline;">Localidad: </label></span>
                                        <input id="txtLocalidad" name="txtLocalidad" type="text"  rel='Ingrese Localidad'>
                                    </div>
                                </div>
                                
                        </div>
                        <div class="row">
                                <div class="span5">
                                    <div id="controltxtTelefono" class="control-group" style="width:364px">
                                     <span class="span1" style="width:100px;"><label for="txtTelefono" style="display:inline;">Teléfono: </label></span>
                                        <input id="txtTelefono" name="txtTelefono" type="text"  rel='Ingrese Telefono'/>
                                    </div>
                                </div>

                                <div class="span4">
                                    <div id="controltxtCUIT" class="control-group">
                                    <span class="span1" style="width:80px;"><label for="txtCUIT" style="display:inline;">CUIT: </label></span>
                                        <input id="txtCUIT" name="txtCUIT" type="text" class="input-small" rel='Ingrese CUIT'/>
                                    </div>
                                </div>
                         </div>
                         <div class="row">
                                <div class="span5">
                                    <div id="controltxtContacto" class="control-group" style="width:364px">
                                     <span class="span1" style="width:100px;"><label for="txtContacto" style="display:inline;">Contacto: </label></span>
                                        <input id="txtContacto" name="txtContacto" type="text"  rel='Ingrese Contacto'/>
                                    </div>
                                </div>

                                 <div class="span4">
                                    <div id="controltxtCelular" class="control-group">
                                    <span class="span1" style="width:80px;"><label for="txtCelular" style="display:inline;">Celular: </label></span>
                                        <input id="txtCelular" name="txtCelular" class="input-small" type="text"  rel='Ingrese Celular'/>
                                    </div>
                                </div>
                        </div>

                        </div>
                        </form>
                                                <div class="clearfix"></div>
                    </div>



                    <div class="pie_gris">
                        <div class="pull-right" style="padding: 5px; margin-bottom:5px;">
                            <a id="btnQuitar" class="btn btn-danger" style="display:none;"><i class=" icon-remove-circle"></i>&nbsp;Eliminar</a>
                            <a id="btnGuardar" class="btn btn-success"><i class=" icon-ok-circle"></i>&nbsp;Agregar</a>
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
    <script src="../js/Hospitales/Farmacia/ABM_Proveedores.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>



</body>
</html>
