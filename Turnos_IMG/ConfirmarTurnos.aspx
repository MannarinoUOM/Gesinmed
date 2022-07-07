<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ConfirmarTurnos.aspx.cs"
    Inherits="Turnos_ConfirmarTurnos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
</head>
<body>
    
    <div class="clearfix">
    </div>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Turnos <strong> > Pedidos de Turno</strong>";
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%; height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="resumen_datos">
                <!--Datos del paciente-->
                <div class="datos_paciente" style="font-size:12px;">
                    <div>
                        <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
                    <div class="datos_resumen_paciente">
                        <div>
                            Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                        <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                        <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                        <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
                        <div>
                        <input type="hidden" id="afiliadoId" />
                            <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp;
                        <span>Celular: <strong><span id="CargadoCelular"></span></strong></span>
                        </div>
                    </div>
                </div>
                <!--Datos del medico-->
                <div class="datos_medico" style="font-size:12px;">
                    <div>
                        <img id="fotomedico" class="avatar2" onerror="imgErrorMedico(this);" src="../img/silueta.jpg"/>
                    </div>
                    <div class="datos_resumen_paciente">
                        <div>
                            Doctor: <strong><span id="CargadoMedico"></span></strong>
                        </div>
                        <span>Especialidad: <strong><span id="CargadoEspecialidad"></span></strong></span>
                        <div>
                            Dia: <strong><span id="CagadoFecha"></span></strong>&nbsp;&nbsp;&nbsp; <span>Hora: <strong>
                                <span id="CagadoHora"></span></strong></span>
                        </div>
                    </div>
                </div>
                <div class="clearfix">
                </div>
            </div>
            <div class="contenedor_3" style="height:370px;">
                <div class="titulo_seccion">
                    <span id="TituloConfirmacion">Confirmación</span></div>
                <div class="">
                    <div class="contenedor_4 pagination-centered">
                        <div class="titulo_contenedor_4">
                            Observaciones del Turno</div>
                        <textarea class="comentario_mini" id="txtComentario" type="text" placeholder="Ingrese alguna observación..."></textarea>
                    </div>
                    <div class="contenedor_4" style="display:none;">
                        <div class="combos_2 pagination-centered">
                            <select id="cboAutorizante" style='width: 140px'>
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="pagination-centered">
                            <div class="btn-group" data-toggle="buttons-checkbox">
                                <button id="btnEmitebono" type="button" class="btn" style="display:none;">
                                    Emite bono</button>
                                <button id="btnEmitecoprobante" type="button" class="btn active">
                                    Emite comprobante</button>
                                <button id="btnRecepcionaturno" type="button" class="btn" style="display:none;">
                                    Recepciona turno</button>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
                    </div>
                </div>
                <div class="contenedor_5">

                    <div class="titulo_contenedor_4">
                        Ingreso de prácticas</div>
                    <div style="padding: 10px">
                        <div id="ControltxtCodigo" class="control-group">
                        <input id="txtCodigo" name="txtCodigo" type="text" class="span1" placeholder="Código">                        
                        <select id="cbo_Practicas" style="width: 215px">
                            <option value="0"></option>
                        </select>
                        </div>
                        <div id="ControltxtImporte" class="input-prepend inline control-group " style="display:none;">
                            <span class="add-on">$</span>
                            <input class="span1" id="txtImporte" placeholder="precio" maxlength="5" type="text">                            
                        </div>


                        <div id="ControltxtImporteReal" class="input-prepend inline control-group " style="display:none;">
                            <span style="margin-left: 10px" class="add-on">$</span>
                            <input class="span1" id="txtImporteReal" placeholder="p. real" type="text" disabled>
                        </div>

                        <div style="display:none;">
                            <input id="txtPracticaComentario" type="text" style="width: 265px" placeholder="Comentario de la práctica">
                        </div>
                        <div class="pull-right">
                            <button id="btnCancelarPractica" class="btn btn-danger btn-mini">
                                Cancelar</button>
                            <button id="btnAgregarPractica" class="btn btn-mini">
                                Agregar</button>
                        </div>
                        <div class="clearfix">
                        </div>
                    </div>

                </div>
                <!--Tabla de estudios-->
                <div style="padding: 0px 15px 0px 15px;">
                    <form class="form-horizontal" style="margin-bottom: 5px; float: left;">
                    <div class="clearfix">
                    </div>
                    <div id="TablaPracticas" class="tabla" style="height: 192px; width: 520px;">
                        <table class="table table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>
                                    </th>
                                    <th>
                                        Código
                                    </th>
                                    <th>
                                        Práctica
                                    </th>
                                    <th style="display:none;">
                                        Importe
                                    </th>
                                    <th style="display:none;">
                                        Importe real
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    </form>
                </div>
                <div class="clearfix">
                </div>
                <div class="pie_gris">
                    <div class="pull-right" style="padding: 5px">
                        <a id="btnVolver" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                        <button id="btnConfirmarTurno" class="btn btn-info">
                            <i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div id="ModalError" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <h3 id="myModalLabel">
                Error en Turno</h3>
        </div>
        <div class="modal-body">
            <p>
                <span id="DialogoError"></span>
            </p>
        </div>
        <div class="modal-footer">
            <button id="CerrarError" class="btn" data-dismiss="modal" aria-hidden="true">
                Cerrar</button>
        </div>
    </div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Turnos_IMG/ConfirmarTurnos.js" type="text/javascript"></script>
    <script>

        $('#desdeaqui').click(function () {
            $("#hastaaqui").fadeIn(1500);
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        });



        $('#uom_boton').toggle(
   function () {
       $('#barra_sup').animate({ top: "-93" }, 200);
       $('#lightbox').fadeOut(200);

   },
   function () {
       $('#barra_sup').animate({ top: "0" }, 200);
       $('#lightbox').fadeIn(200);
       $('#lightbox').height($('html').height());


   });

    </script>

</body>
</html>
