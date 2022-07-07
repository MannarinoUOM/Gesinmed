<%@ Page Language="C#" AutoEventWireup="true" CodeFile="NuevoBono.aspx.cs" Inherits="Bonos_NuevoBono" %>

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
        parent.document.getElementById("DondeEstoy").innerHTML = "Bonos > <strong>Nuevo Bono</strong>";
     
    </script>

    <style>
    .blink_text {

    animation:1s blinker linear infinite;
    -webkit-animation:1s blinker linear infinite;
    -moz-animation:1s blinker linear infinite;

     color: red;
    }

    @-moz-keyframes blinker {  
     0% { opacity: 1.0; }
     50% { opacity: 0.0; }
     100% { opacity: 1.0; }
     }

    @-webkit-keyframes blinker {  
     0% { opacity: 1.0; }
     50% { opacity: 0.0; }
     100% { opacity: 1.0; }
     }

    @keyframes blinker {  
     0% { opacity: 1.0; }
     50% { opacity: 0.0; }
     100% { opacity: 1.0; }
     }
    </style>
    
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1">
            <div class="contenedor_bono" style="height:400px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Nuevo Bono</span></div>
                <form class="form-horizontal">
                <div class="control-group" style="display:none;">
                    <label class="control-label">
                        Nro. Turno</label>
                    <div class="controls">
                        <input id="txtnroturno" type="text" placeholder="Nro. Turno">
                    </div>
                </div>
                <div id="controlcbo_TipoDOC" class="control-group">
                  <label class="control-label" for="cbo_TipoDOC">Tipo</label>
                  <div class="controls">
                      <select id="cbo_TipoDOC">
                      </select>          
                   </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        N°</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" class="numero" placeholder="Nro. de documento sin puntos">
                        <input id="txtdocumento" type="hidden" />
                        <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
                        <input id="discapacidad_val" value="" type="hidden"/>
                        <input id="verificarPMI" value="" type="hidden"/>
                        <input id="PMI_val" value="" type="hidden"/>
                        <input id="FechaPMI" value="" type="hidden" />
                        <input id="discapacidad_paga" value="" type="hidden"/>
                        <a id="btnVencimiento" href="#" rel="tooltip" title="Verificar Baja en Padrón" class="btn"><i class="icon-calendar icon-black"></i></a> 
                        <span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" class="numero" type="text" placeholder="Ej: 99123456789">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtPaciente">
                        Paciente</label>
                    <div class="controls">
                        <input id="txtPaciente" placeholder="Apellido Nombre" type="text" class="span3">
                        <a id="btnBuscarPaciente"  class="btn"><i class="icon-search icon-black">
                        </i></a>
                    </div>
                </div>
                <div id="controlTelefono" class="control-group">
                    <label class="control-label">Celular</label>
                    <div class="controls"><input id="txtTelefono"  maxlength="13" placeholder="Ej. 43625910" type="text"/></div>
                    <label id="msgCel" class="control-label blink_text" style="width:300px; margin-left:17%; color:Red; display:none; text-align:center">Datos en Base de Datos: 1234567890</label>
                </div>
                                
        <div id="controlSeccional" class="control-group">
        
          <label class="control-label" id="Titulo_Seccional_o_OS">Seccional</label>
          <div class="controls">
          
          <input type="hidden" id="Cod_OS" />
          <input type="hidden" id="afiliadoCuil" />
          <input type="hidden" id="afiliadoIdVPN" />
              <select id="cboSeccional">
                <option value="0">Sin Seccionalizar</option>
              </select>          

              <select id="cbo_ObraSocial" style="display:none;"></select>          

           </div>

        </div>

                </form>
       <div class="clearfix"></div>
                <div class="control-group">
                    <div class="controls pagination-centered"> 
                        <a class="btn btn-danger"  tabindex="-1" id="btnCancelarPedidoTurno" style="display: none;">Otro Paciente</a> 
                        <a class="btn" tabindex="-1" id="btnactualizar" style="display: none;">Actualizar</a>
                        <button class="btn btn-info" id="desdeaqui" tabindex="1" style="display: none;">Siguiente</button>
                        <a class="btn btn-primary" target="popup" onclick="window.open('http://www.sssalud.gob.ar/index/index.php?b_publica=Acceso+P%FAblico&user=GRAL&opc=bus650','SSS','width=800,height=600, left=100    ')">SSS</a>  
                        <div class="clearfix"></div>
                    </div>              
                </div>
            </div>
            <div class="clearfix">
            </div>
            <div id="hastaaqui">
                <div class="resumen_datos" style="height: 80px;">
                    <!--Datos del paciente-->
                    <div class="datos_paciente">
                        <div>
                            <img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
                        <div class="datos_resumen_paciente" style="font-size:12px;">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos" tabindex="-1">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>CELULAR PPAL: <strong><span id="CargadoTelefono"></span></strong></span>
                            <div>
                                <span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp;
                        <span>Celular: <strong><span id="CargadoCelular"></span></strong></span>                                
                            </div>
                            <div>
                                <span id="span_Discapacidad" style=" color:red; font-weight:bold; font-size:14px;"></span>
                                <span id="span_Estudiante"></span>
                            </div>
                        </div>
                    </div>
                    <!--Datos del medico-->
                    <div id="Datos_Medicos" class="datos_medico">
                        <div>
                            <img id="fotomedico" class="avatar2" onerror="imgErrorMedico(this);" src="../img/silueta.jpg"></img>
                        </div>
                        <div class="datos_resumen_paciente" style="font-size:12px;">
                            <div>
                                Doctor: <strong><span id="CargadoMedico"></span></strong>
                            </div>
                            <span>Especialidad: <strong><span id="CargadoEspecialidad"></span></strong></span>
                            <input id="perfil" type="hidden" runat=server/>
                            <div>
                                Dia: <strong><span id="CagadoFecha"></span></strong>&nbsp;&nbsp;&nbsp; <span>Hora: <strong>
                                    <span id="CagadoHora"></span></strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
                    </div>
                </div>
                <div class="contenedor_3">
                    <div class="">
                        <div class="contenedor_4 pagination-centered" style="height:160px;">
                            <div class="combos">
                                <div id="Controlcbo_Especialidad" class="control-group" style="display:inline-block;">
                                <select id="cbo_Especialidad">
                                    <option value="0">Especialidad</option>
                                </select>
                                </div>
                                <div id="Controlcbo_Medico" class="control-group" style="display:inline-block;">
                                <select id="cbo_Medico">
                                    <option value="0">Medico</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div class="contenedor_4" style="height:160px;">
                            <div class="combos_2 pagination-centered" style="margin-bottom: 10px;">
                               <div data-toggle="buttons-checkbox">
                                    <b>Reserva Turno Ahora </b><input type="checkbox" id="btnReservaTurnoAhora" />
                                    <span id="NroTurnoAhora" class="badge badge-info" style="display: none;">A00</span>
                                </div>
                                <select id="cboAutorizante" style="width: 140px; margin: 0px; padding: 0px; display:none;">
                                    <option value="0">Autorizado por...</option>
                                </select>
                                <select id="cboNoPagaAutoriza" style="width: 340px;  margin-top: 5px; padding: 0px; display:none;">
                                    <option value="0">Seleccione Autorizante...</option>
                                </select>
                                <select id="cboObservacionesNP" size="1" style="width: 340px; margin-top: 0px; margin-bottom:0px; padding: 0px; display:none;">
                                    <option value="0">Seleccione Motivo...</option>
                                </select>
                                <textarea id="txtObsNP" rows="1" style="width: 340px; margin-top: 5px; margin-bottom:0px; padding: 0px; display:none;"></textarea>
                                <div class="clearfix">
                                </div>
                            </div>
                            <div class="pagination-centered">
                                    Atención sin turno <input type="checkbox" id="btnAtencionSinTurno" />   
                                     Emite bono <input type="checkbox" id="btnEmitecoprobante" checked />
                                     <input type="checkbox" id="btnRecepcionaturno" style="display:none;" />
                            </div>
                        </div>
                        <div class="clearfix">
                        </div>
                    </div>
                    <div class="contenedor_5" style="width:350px">
<%--                        <div class="titulo_contenedor_4">
                            Ingreso de prácticas</div>--%>
                        <div style="padding: 10px">                            
                            <div id="ControltxtCodigo" class="control-group">
                            <input id="txtCodigo" type="text" class="span1 numero" maxlength="6" placeholder="Código">
                            <select id="cbo_Practicas" style="width: 215px">
                                <option value="0"></option>
                            </select>
                            </div>

                            <div class="input-prepend inline">
                                <div id="ControltxtImporte" class="input-prepend inline control-group " style="display:inline-block;">
                                <span class="add-on">$</span>
                                <input class="span1 numero" id="txtImporte" placeholder="precio" maxlength="5" type="text" />

                                <span style="margin-left: 10px" class="add-on">NP</span><input type="checkbox" id="chkVIP" style="margin-top:15px; margin-left:5px;" title="No paga bono"/>
                                <span style="margin-left: 3px" class="add-on">PP</span><input type="checkbox" id="chkNobody" style="margin-top:15px; margin-left:5px; margin-right:5px" title="Pago parcial"/>
                                <span class="add-on ImportePaga" style="display:none">$</span>
                                <input class="span1 numero ImportePaga" id="txtImportePaga" placeholder="Importe Paga" maxlength="5" type="text" style="width:90px; display:none"/>
                                </div>

                                <div id="ControltxtImporteReal" class="input-prepend inline control-group " style="display:none;"> <%--style="display:inline-block;">--%>
                                <span style="margin-left: 10px" class="add-on">$</span>
                                <input class="span1 numero" id="txtImporteReal" placeholder="p. real" type="text" style="margin-right:10px;" disabled />
                                </div>
                            </div>
                            <div>
                                <input id="txtPracticaComentario" maxlength="40" type="text" style="width: 265px" placeholder="Comentario de la práctica">
                            </div>
                            <div class="pull-right">
                                <button id="btnCancelarPractica" class="btn btn-danger btn-mini">
                                    <i class="icon-remove-circle icon-white"></i>Cancelar</button>
                                <button id="btnAgregarPractica" class="btn btn-mini">
                                    <i class="icon-plus-sign icon-white"></i>Agregar</button>
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
                        <div id="TablaPracticas" class="tabla" style="height: 192px; width: 500px;">
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
                                        <th>
                                            Importe
                                        </th>
                                        <th style="display:none">
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
                        <input type="hidden" value="0" id="totalBono"/>
                            <div class="box_informativo_a pull-left"><div style="padding-top:3px"><strong id="Total">TOTAL A PAGAR: $ 0</strong></div> </div>   
                            <div class="pull-right" style="padding: 3px 0px 3px 0px;">
                                <a class="btn" id="btnVolver"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
                                <button id="btnConfirmarNuevoBono" class="btn btn-info">
                                    <i class=" icon-ok icon-white"></i>&nbsp;Confirmar</button>
                            </div>
                        
                        
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

    <div id="ModalTurnos" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:650px; height:400px;">
        <div id="ListaTurnos" class="tabla" style="height:380px;width:95%; margin:15px;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Médico</th>
                    <th>Especialidad</th>
                    <th>Bono</th>
                  </tr>
                </thead>

              </table>
            </div>
    </div>


    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/Hospitales/ObraSociales/ObraSociales.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>
    <script src="../js/jQueryBlink.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Bonos/NuevoBono.js" type="text/javascript"></script>
    <script src="../js/Hospitales/PhoneValidate.js" type="text/javascript"></script>

            <!-- Modal -->
    <div id="ModalSaldos" style="width:75%; height:87% ;left:30%; top:45%" class="modal hide fade modal-dialog modal-l" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

 
            <iframe id="IframeSaldos" style="width:97%; height:95%; margin-left:15px; margin-top:10px" ></iframe>
 
    </div>

    <script type="text/javascript">

//        $('#desdeaqui').click(function () {
//            $("#hastaaqui").fadeIn(1500);
//            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
//        });



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
    <script type='text/javascript'>
        $(document).ready(function () {

            // si es perfil imagenes se bloquea el combo
            if ($("#perfil").val() == "83") {
                $("#cbo_Especialidad").val("381");
                $("#cbo_Especialidad").prop('disabled', true);

                //  Cargar_Practicas_by_Especialidad($("#cbo_Especialidad :selected").val()); 
            }
            // si es perfil imagenes se bloquea el combo

            if ($("[rel=tooltip]").length) {
                $("[rel=tooltip]").tooltip();
            }
        });
    </script>
</body>
</html>
