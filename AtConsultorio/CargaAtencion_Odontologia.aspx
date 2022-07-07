<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargaAtencion_Odontologia.aspx.cs" Inherits="Odontologia_CargaAtencion_Odontologia" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link href="../css/Odontologia.css" rel="stylesheet" type="text/css" />
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/fixedHeader.dataTables.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="contenedor_1" style="width:775px; margin:auto; padding-bottom:0px; padding-top:0px; height:520px">
    <div class="contenedor_a " style=" margin-left:1.3%; height:460px; margin-top:1%">
 
    <input id="afiliadoId" type="hidden"/>
    <input id="TurnoId" type="hidden"/>
                        <div class="resumen_datos" style="margin-top: 0px;font-size:12px;">
                    <div class="datos_persona">
                        <div>
                            <img id="fotopaciente" class="avatar2" src="../img/silueta.jpg"></img>
                        </div>
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor: pointer;"
                                    onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                            <input id="Hidden1" value="" type="hidden"/>
                            <div>
                                Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>
                        </div>
                    </div>
                    <div class="pull-left" style="margin-left: 20px">
                        <div>
                            Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
                        <div>
                            Seccional/OS:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
                        <div>
                            Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
                    </div>
                    <div class="clearfix">
                    </div>
                </div>




    <div id="ModalTraspasoProtocolo2" class="modal hide fade" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true" style="width:850px; height:400px; left:40%">
    <div class="modal-header">
    <div style="height:30px; width:100%; text-align:center"><label id="lblFechaVisualizacion"  style="display:inline;width:30%; text-align:center"></label></div>   
    </div>
    <div id="panel" style=" width:800px; text-align:center; margin:auto; margin-top:0%; margin:1%; margin-right:2% ;position:relative">
    <div id="boca" style=" width:800px; text-align:center; background-color:Silver; margin:1%; margin-right:2%" class="contenedor_1">

    </div>
    </div>
    <div class="modal-footer" style=" margin-top:43%">
    <button onclick="javascript:window.close();" class="btn btn-danger" data-dismiss="modal" aria-hidden="true"><i class="icon-remove-circle icon-white"></i>&nbsp;Cerrar</button> 
    </div>
    </div>




    <div style=" margin:auto; margin-top:1%">
    <div style="width:700px; height:185px; margin:auto" class="contenedorArriba">
    <form class="form-inline" style="padding:1%">
    <div style="background-color:#333333" class="contenedorArriba form-group">
    <select id="cboCodigos" class="input-xlarge margenControl"></select><select id="cboPiezas" class="input-small margenControl"></select>
    <a id="txtCaras" class="margenControl btn" style="margin-top:5px; margin-bottom:5px; width:124px">Ubicación</a>
    <a id="btnAgregar" class=" btn btn-small margenControl">Agregar</a><a id="btnHoy" class=" btn btn-small margenControl">Hoy</a><br />
    <input id="txtObservacion" class=" margenControl" style="width:95%" type="text" placeholder="Observaciones" maxlength="200"/>
    </div>
    </form>
    <div style=" height:80px; overflow:auto" class="table-responsive">
    <table id="carga"><tr style='background-color:#CCCCCC'>
    <th class='celdaMediana'>Código</th>
    <th class='celdaChica' style="width:60px">Pieza</th>
    <th class='celdaChica' style="width:60px">Caras</th>
    <th class='celdaMediana'>Observación</th>
    <th class='celdaChica' style="width:60px">Eliminar</th>
    </tr></table></div>
    </div>
    <div style="width:700px;height:155px; margin:auto" class="contenedorAbajo">
    <div style=" height:150px; overflow:auto" id="consultas">
    <div>Consultas</div>
<%--    <table id="consultas"  class="table-hover"> <thead><tr style='background-color:#CCCCCC'><th>Consultas</th></tr></thead>
    <tr style="cursor:pointer"><td>12/2/2017</td></tr>
    <tr style="cursor:pointer"><td>10/4/2017</td></tr>
    </table>--%>

    </div>
    </div>
    </div>


    
     <div  style=" width:751px; height:40px; padding:0.5%; background-color:#CCCCCC; margin-top:1%">
     
     <a id="btnGuardar" class="btn btn-info pull-right" style="margin-right:1%"><i class="icon-ok"></i>&nbsp;Guardar</a>
     <a id="btnCancelar" class="btn btn-danger pull-right"  style="margin-right:1%"><i class="icon-remove"></i>&nbsp;Cerrar</a>
     <a id="btnVerOdontograma" class="btn btn-info pull-right" style="margin-right:1%"><i class=" icon-eye-open"></i>&nbsp;Odontograma</a>
     <div class="clearfix">
     </div>
     </div>

    </div>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.dataTables.js" type="text/javascript"></script>
<script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<script src="../js/Hospitales/Odontologia/CargaAtencion_Odontologia.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
