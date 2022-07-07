<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Medicos.aspx.cs" Inherits="Turnos_Medicos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
        <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/FirmaMedico.css" rel="stylesheet" type="text/css" />
    <style>
    .black_overlay{
			display: none;
			position: absolute;
			top: 0%;
			left: 0%;
			width: 100%;
			height: 100%;
			background-color: black;
			z-index:1001;
			-moz-opacity: 0.8;
			opacity:.80;
			filter: alpha(opacity=80);
		}
		.white_content 
		{
		    font-size:25px;
			display: none;
			position: absolute;
			top: 25%;
			left: 25%;
			width: 50%;
			height: 50%;
			padding: 16px;
			border: 16px solid rgba(0,128,192,0.7);
			background-color: white;
			z-index:1002;
			overflow: auto;
		}
		#div_coordenar
		{
		    display:none;
		    }
    </style>

</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Médicos</strong>";
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>

    <div id="light" class="white_content">
        <div id="light_mensaje">
        Se ha guardado correctamente el médico y se ha creado el usuario <b><span id="span_usuario_generado"></span></b> con la clave provisoria <b>"1234"</b><br /><br /><br />
        
        <div style="width:100%">
        Si usted desea coordinar una capacitación para el médico ingresado, por favor seleccione "Solicitar"; de lo contrario presione "Cancelar"<br /><br />
        <div style="width:40%;margin:0 auto;" >
            <a class="btn btn-danger" style="font-size:25px !important;width: 100px;" href = "javascript:void(0)" onclick = "document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'">Cancelar</a>

            <a class="btn btn-success" style="font-size:25px !important;width: 100px;"
            href = "javascript:void(0)" onclick = "document.getElementById('light_mensaje').style.display='none';document.getElementById('div_coordenar').style.display='block';"
            >Solicitar</a> 
            
        </div>        
        </div> 
        </div>       

        <div id="div_coordenar" style="font-size:20px;width:100%">
        
            Se solicita la presencia de un integrante de GesInMed para capacitar al dr./dra. <span id="span_medicoingresado"></span>.<br /><br />
            El dr./dra. se encontrará el <input type="text" id="txt_fechacoordinar" style="width: 83px;" maxlength="10"/>
            , en el consultorio <input type="text" id="txt_consultoriocoordinar" style="width: 50px;" maxlength="3" /> ubicado en el 
            <select id="cbo_hospital">
                <option value="0">Seleccione un edificio...</option>
                <option value="NUEVO">Edificio Nuevo</option>
                <option value="VIEJO">Edificio Viejo</option>
            </select> 
            , entre las <input type="text" id="txt_horacoordinar_inicio" style="width: 50px;" maxlength="5"/> hs. y las <input type="text" id="txt_horacoordinar_fin" style="width: 50px;" maxlength="5"/> hs. <br />
            <div style="width:40%;margin:0 auto;" >
            <a class="btn btn-success" style="font-size:20px !important; width:80px;" onclick = "javascript:Enviar_Coordinacion();">Enviar</a> 
            <a class="btn btn-danger" style="font-size:20px !important; width:80px;" href = "javascript:void(0)" onclick = "document.getElementById('light').style.display='none';document.getElementById('div_coordenar').style.display='none';document.getElementById('fade').style.display='none'">Cancelar</a>            
            </div>
            <br /><br />
            <span id="span_errorcoordinar" style="color:Red;"></span>

            <div style="text-align:center; color:Red;"><b>¡IMPORTANTE!</b></div><br />
            <b>La capacitación debe solicitase con un mínimo de 48 hs. de anticipación. <br />Si, excepcionalmente, fuera necesaria una inmediata respuesta comunicarse <br />de lunes a viernes entre las 10:00 a 18:00 hs. al interno 229/292</b>
            <br /><br />

        </div>
        

        </div>
		<div id="fade" class="black_overlay"></div>

    <div class="container" style="padding-top: 30px;">
        <div class="contenedor_1 pagination-centered">
            <div class="contenedor_a" style="height:500px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Médicos</span></div>
                <div class="minicontenedor100">
                <input id="cbo_Todos_Especialidades" checked type="checkbox" style="display:inline; margin:5px;">Marcar todas
                <input id="chk_Ninguno" type="checkbox" style="display:inline; margin:5px;"/>Desmarcar todos
                    <div class="filtro_datos">
                        <div id="Especialidad1" style="float: left; width: 50%;">
                        </div>
                        <div id="Especialidad2" style="float: right; width: 50%;">
                        </div>
                    </div>
                    <form class="form-inline" style="margin: 0px">                    
                    <input id="txtNombre" type="text" class="input-small span4" placeholder="Apellido y nombre" runat="server">                                        
                    <input id="txtMN" type="text" class="input-small span2" placeholder="Matricula nacional" runat="server">
                    <input id="txtMP" type="text" class="input-small span2" placeholder="Matricula provincial" runat="server">
                    <a class="btn" id="btnBuscarMedico"><i class="icon-search"></i>&nbsp;&nbsp;Buscar</a>
                    </form>
                </div>
                
                <div id="Resultado" class="tabla" style="height: 227px; width: 98%; margin-left: 1%">
                <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
                    <table id="TablaMedicos" class="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th>
                                    Estado
                                </th>
                                <th>
                                    Apellido y Nombre
                                </th>
                                  <th>
                                    Especialidad
                                </th>
                            </tr>
                        </thead>
                    
                    </table>
                </div>
                <div style="height: 40px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
                    <div class="pull-right" style="padding: 5px">
                        <a class="btn btn-info" id="btnNuevo1" href="#myModal" data-backdrop="static" role="button" data-toggle="modal">
                            <i id="btnNuevo" class=" icon-plus icon-white"></i>&nbsp;Nuevo</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <div class="titulo_seccion" style="margin-left:5px;">
                   <span>Médicos</span>
            </div>
            <div class="resumen_datos">
                <div class="datos_persona">
                    <div>
                        <img id="FotoMedico" class="avatar2" src="../img/silueta.jpg"></img>
                    </div>
                    <div class="datos_resumen_paciente">
                        <div>
                            Doctor/a <span id="lblNombre"><strong></strong></span>
                        </div>
                        <span>DNI: <span id="lblDni"><strong></strong></span></span><%--<span>MN: <span id="lblMN">
                            <strong></strong></span>&nbsp;&nbsp; MP: <span id="lblMP"><strong></strong></span>
                        </span>--%>
                    </div>
                </div>
            </div>
            <div>
                <ul class="nav nav-tabs" style="background-color:Grey;" data-tabs="tabs">
                    <li class="active">
                    <a id="tbDP" class="pestaña" data-toggle="tab" href="#datos1">Datos Personales</a></li>
<%--                <li><a id="tbD" data-toggle="tab" href="#datos2">Domicilio y Teléfono</a></li>--%>
                    <li><a id="tbE" class="pestaña" data-toggle="tab" href="#datos3">Datos Profesionales</a></li>
                    <li><a id="tbO" class="pestaña" data-toggle="tab" href="#datos4">Observaciones</a></li>
                    <li><a id="tbB" class="pestaña" data-toggle="tab" href="#datos5">Baja</a></li>
                    <li><a id="tbF" class="pestaña" data-toggle="tab" href="#datos6">Firma Digital</a></li>
                </ul>
            </div>
            <div id="my-tab-content" class="tab-content">
                <div class="tab-pane active fade in" id="datos1">
                    <form class="form-inline">
                    <div id="ControltxtMedico" class="control-group" style="display:inline-block;">
                    <input id="txtMedico" type="text" class="span3" placeholder="Apellido y Nombre" rel="tooltip" title="Apellido y Nombre">
                    </div>
                    <div style="display:inline-block;">
                    <select id="cbo_Sexo" class="span2" rel="tooltip" title="Sexo" style="width:75px;">
                        <option value="0">Sexo</option>
                            <option value="1">M</option>
                            <option value="2">F</option>
                    </select>
                    </div>
                    <div id="ControltxtDNI" class="control-group" style="display:inline-block;">
                    <input id="txtDNI" type="text" class="span2" placeholder="DNI" maxlength="8" rel="tooltip" title="DNI" style="width:80px;">
                    </div>
                    <div id="ControltxtCUIT" class="control-group" style="display:inline-block;">
                    <input id="txtCUIT" type="text" class="span2" placeholder="CUIL" maxlength="11" rel="tooltip" title="CUIL">
                    </div>
                    <div id="ControltxtFechaNacimiento" class="control-group" style="display:inline-block;">
                    <input id="txtFechaNacimiento" type="text" class="span2" placeholder="Fecha Nac" maxlength="10" rel="tooltip" title="Fecha Nacimiento" style="width:80px;">
                    </div>

                    </form>
                    <form class="form-inline">


                    </form>
                    <div class="control-group">
                        <a id="btnRendicion" type="button" class="btn" style="display:none;">
                            Aplica rendición</a>
                        <a id="btnHonorario"" type="button" class="btn" style="display:none;">
                            Rinde honorarios</a>
                        
                    </div>
                    <form class="form-inline">
                    <div id="ControltxtCalle" class="control-group" style="display:inline-block;">
                    <input id="txtCalle" type="text" class="span3" placeholder="Calle" rel="tooltip" title="Calle">
                    </div>
                    <div id="ControltxtNumero" class="control-group" style="display:inline-block;">
                        <input id="txtNumero" type="text" class="span2" maxlength="8" placeholder="Nro." rel="tooltip" title="Número" style="width:65px;margin-left:10px;">
                    </div>
                    <div class="control-group" style="display:inline-block;">
                    <input id="txtPiso" type="text" class="span2" maxlength="8" placeholder="Piso" rel="tooltip" title="Piso" style="width:65px;">
                    <input id="txtDpto" type="text" class="span2" maxlength="8" placeholder="Depto." rel="tooltip" title="Depto." style="width:75px;">
                    </div>
                    </form>
                    <form class="form-inline">
                    <select id="cbo_Localidad" class="span3" rel="tooltip" title="Localidad"></select>
                    <input id="txtProvincia" type="text" class="span3" placeholder="Provincia" rel="tooltip" title="Provincia" style="width:150px;margin-left:10px;">
                    <input id="txtCP" type="text" maxlength="8" class="span2" placeholder="CP" rel="tooltip" title="Código Postal" style="width:75px;">
                    </form>
                    <form class="form-inline">
<%--                        <div class="titulo_datos">
                            <div class="span3" style="margin-left:5px;">
                                <strong>Teléfono</strong>
                            </div>
                            <div class="span3" style="margin-left:10px;">
                                <strong>E-Mail</strong>
                            </div>
                        </div>--%>
                        <input id="txtTelefono" type="text" class="span3" placeholder="Teléfono" rel="tooltip" title="Teléfono">
                        <input id="txtEmail" type="text" class="span3" placeholder="Correo electrónico" rel="tooltip" title="Correo electrónico" style="width:245px; margin-left:10px;">
                    </form>
                       <input id="btnEnTurnos" type="checkbox" name="btnEnTurnos" class="input-xlarge" style="vertical-align:middle; display:inline; margin-right:5px;" checked="checked"/>
                        <label for="btnEnTurnos" style="display:inline; margin-left:5px; margin-right:5px;">Mostrar En Turnos</label>
                        <span class="help-inline">Sobreturnos máximos por día&nbsp;&nbsp;</span><input id="txtSobreturnos" type="text"
                        style="margin: 0; width: 20px;" value="99" maxlength="2">
                         <span class="help-inline">Cantidad de Turnos de Urgencia&nbsp;&nbsp;</span><input id="txtUrgenciaCant" type="text"
                        style="margin: 0; width: 20px;" value="0" maxlength="2">
                </div>
                <div class="tab-pane fade" id="datos2">
                    <div class="titulo_datos">
                        <strong>Domicilio</strong></div>
                   
                </div>
                <div class="tab-pane fade" id="datos3">
                    <form class="form-inline">
                    <select id="cbo_Especialidad" rel="tooltip" title="Especialidad">
                    </select>
                    <div class="btn-group" data-toggle="buttons-checkbox">
                        <a id="btnG" type="button" class="btn">
                            <strong>G</strong>uardia</a>
                        <a id="btnA" type="button" class="btn">
                            <strong>C</strong>onsultorio</a>
                        <a id="btnI" type="button" class="btn">
                            <strong>I</strong>nternación</a>
                        <a id="btnQ" type="button" class="btn">
                            <strong>Q</strong>uirófano</a>
                    </div>
                    </form>
                    <form class="form-inline">
                    
                    <input id="txt_MN" type="text" class="span3" style="width:180px;" placeholder="Nro. Matricula Nacional" rel="tooltip" title="Matricula Nacional">
                    <input id="txt_MP" type="text" class="span3" style="width:180px;" placeholder="Nro. Matricula Provincial" rel="tooltip" title="Matricula Provincial">
                    
                    <div class="pull-right" style="display: inline-block">
                        <a href="#" rel="tooltip" id="btnQuitar" style="display:none" title="Quitar" class="btn btn-danger"><i class="icon-remove icon-white">
                        </i></a><a href="#" id="btnCancelar" class="btn"><i class="icon-arrow-left"></i>&nbsp;&nbsp;Cancelar</a>
                        <a id="btnAgregar" class="btn"><i class="icon-ok"></i>&nbsp;&nbsp;Agregar</a>
                    </div>
                    </form>
                    <div class="tabla" style="height: 105px">
                        <table id="TablaEspecialidades" class="table table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>
                                        Mat. Nac.
                                    </th>
                                    <th>
                                        Mat. Prov.
                                    </th>
                                    <th>
                                        Especialidad
                                    </th>
                                    <th>
                                        Tipo
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="tab-pane fade" id="datos4">
                    <div class="titulo_datos">
                        <strong>Observaciones</strong></div>
                    <div class="pagination-centered">
                        <textarea id="txtObservaciones" rows="3" type="text" class="span6" rel="tooltip" title="Observaciones"></textarea>
                    </div>
                </div>
                <div class="tab-pane fade" id="datos5">
                    <div class="titulo_datos">
                        <strong>Fecha de baja</strong></div>
                    <form class="form-inline">
                    <input id="txtFechaBaja" type="text" class="span2" placeholder="" rel="tooltip" title="Fecha Baja">
                    <legend id="lgn_baja" style="display:none; font-size:small;"> *Para remover la baja borre la fecha de la misma.</legend>
                    <legend id="lgn_bloqueado" style="display:none; font-size:small;"> *El médico no puede ser dado de baja, ya que posee turnos asignados.</legend>
                    </form>
                    <div class="titulo_datos">
                        <strong>Motivo</strong></div>
                    <form class="form-inline">
                    <textarea id="txtMotivo" rows="2" type="text" class="span6" placeholder="" rel="tooltip" title="Motivo Baja"></textarea>
                    </form>
                </div>
                
                <div class="tab-pane fade" id="datos6">

                <form enctype="multipart/form-data" runat="server" id="frm" method="post">
                <div style="position:relative; float:right; width:60%; text-align:center"> 
                <img id="sinArchivo" src="../img/icono-archivo-png-3.png" width="30%" height="30%" style="position:absolute" class="seleccion firma bloquear" data-toggle="tooltip" title="Seleccionar Archivo"/>
                <input id="rutaFirma" type="hidden" runat="server"/>
                <img id="btnBorrar" src="../img/equis.png" style="position:absolute; margin-left:30% ;float:right; cursor:pointer; display:none" height="40px" width="40px" data-toggle="tooltip" title="Eliminar Firma"/>
                <img src="../img/carga.gif" width="100%" height="100%" style="display:none" />
                </div>

                <%--Responsive<img src="html/imagenes/prueba.jpg" style="max-width:100%;width:auto;height:auto;">--%>

                <div style="position:relative; float:left; width:40%">
<%--               <select id="cboEspeciaidadParaFirma" placeholder="Especialidad para Firma" runat="server" name="especialidad"></select><br />--%>
                   <input type="text" id="txtMatriculaFirmaNacional" maxlength="6" placeholder="Matrícula Nacional para Firma" class="enteros firma bloquear" runat="server"/><br />
                   <input type="text" id="txtMatriculaFirmaProvincial" maxlength="6" placeholder="Matrícula Provincial para Firma" class="enteros firma bloquear" runat="server"/><br />
                   <input type="text" id="txtEspecialidad" maxlength="50" placeholder="Nombre Especialidad para Firma" runat="server" class="firma bloquear"/>
                   <input type="text" id="txtFechaEscaneo" runat="server" style="display:none"/>

             <%--       <input type="file" id="file" name="archivo" class="input-file" size="5120" >--%>


                   <a type="button" name="btnSubir"  id="btnSubir" class="btn btn-info"  style="display:none"><i class=" icon-adjust icon-hdd icon-white"></i>&nbsp;&nbsp;Guardar</a>

                   <input type="file" runat="server"  name="btnSubirFirma" id="btnSubirFirma"  style="display:none" accept="image/jpeg" class="input-file" size="5120"/><br />  

                   <asp:Button ID="btnUploadFimra" runat="server" Text="Button" onclick="btnUploadFimra_Click" style="display:none" UseSubmitBehavior="false"/> 
                   <input type="hidden" runat="server" id="medicoId"/>
                   <input type="hidden" runat="server" id="firmaId" value="0"/>   
                   <input type="hidden" runat="server" id="usuarioId"/>  
<%--               <input type="hidden" runat="server" id="especialidadId"/>   
                   <input type="hidden" runat="server" id="especialidadNombre"/>  --%>        
                </div>

                <%--<input type="text" id="txtNombreConfirma" runat="server" maxlength="24" class="bloquear"/>--%>

                <div style=" float:right"><label for="confirmarFirma" style="display:inline"><b>Yo, <input type="text" id="txtNombreFirma" maxlength="30" placeholder="Nombre para Firma" runat="server" class="firma bloquear"/></b><b> doy fe de que la firma escaneada en esta pantalla del sistema Ges.In.Med. es mi firma de puño y letra.</b> </label><input type="checkbox" id="confirmarFirma" runat="server" class="bloquear"/> </div>  
                </form>      

                </div>

                

            </div>
            <script >
                jQuery(document).ready(function ($) {
                    $('#tabs').tab();
                });
            </script>
            <script>
                $(function () {
                    $('#myTab a:last').tab('show');
                })
            </script>
        </div>
        <div class="modal-footer">
           <%-- <a class="btn" id="btnTLC" style="display:inline"><i class="icon-globe"></i>&nbsp;Teleconsulta</a>--%>
            <a class="btn" id="btnImprimirComprobante" style="display:none"><i class="icon-print"></i>&nbsp;Reimprimir</a>
            <a class="btn" id="btnDiadeAtencion">Días de Atención</a>
            <a class="btn" id="btnDiadeNoAtencion">Días de NO Atención</a>
            <a id="Cerrar" class="btn" data-dismiss="modal" aria-hidden="true">Cerrar</a>
            <a id="btnGrabarMedico" class="btn btn-info">Guardar cambios</a>
        </div>
    </div>
    <!--Pie de p?gina-->
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/Hospitales/Turnos/Medicos.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/CUIL.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Turnos/FirmaMedicos.js" type="text/javascript"></script>
    <!--Barra sup-->
    <script>
        $('#desdeaqui').click(function () {
            $("#hastaaqui").fadeIn(1500);
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
            $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
            $('#cbo_Especialidad').focus();
        });


        $(window).resize(function () {
            //$('.container').height($(screen).height() + ($('.contenedor_1').height() + $('#hastaaqui').height()));
            //$('.container').height(3000);
        });



        function CheckTime(str) {
            hora = str;
            if (hora == '') {
                return false;
            }
                        
            if (hora.length > 5) {
                $("#span_errorcoordinar").html("Introdujo una cadena mayor a 8 caracteres");
                return false;
            }
            if (hora.length != 5) {
                $("#span_errorcoordinar").html("Introducir HH:MM");
                return false;
            }
            //99:00
            a = hora.charAt(0); //<=2 
            b = hora.charAt(1); //<4 
            c = hora.charAt(2); //: 
            d = hora.charAt(3); //<=5 
                        
            if ((a == 1 && b > 9) || (a > 2)) {
                $("#span_errorcoordinar").html("El valor que introdujo en la Hora no corresponde, introduzca un digito entre 00 y 19");
                return;
            }

            if (a == 0 && b < 9) {
                $("#span_errorcoordinar").html("El valor que introdujo en la Hora no corresponde, introduzca un digito entre 09 y 19");
                return;
            }

            if (a == 0 && b == 9 && d < 3) {
                $("#span_errorcoordinar").html("El valor que introdujo en el horario no corresponde, el horario comienza de 9:30");
                return;
            }

            if (a == 1 && b == 9 && d > 2) {
                $("#span_errorcoordinar").html("El valor que introdujo en el horario no corresponde, el horario finaliza a las 19:30");
                return;
            }

            
            if (d > 5) {
                $("#span_errorcoordinar").html("El valor que introdujo en los minutos no corresponde, introduzca un dígito entre 00 y 59");
                return;
            }
                        
            if (c != ':') {
                $("#span_errorcoordinar").html("Introduzca el caracter ':' para separar la hora, los minutos y los segundos");
                return;
            }

            EnviarEmail($("#txt_fechacoordinar").val(), $("#txt_consultoriocoordinar").val(), $("#cbo_hospital option:selected").val(), $("#txt_horacoordinar").val());
                        
        }


        function EnviarEmail(fecha, consultorio, hospital, horainicio, horafin) {
            var json = JSON.stringify({
                "fecha": fecha
                , "consultorio": consultorio
                , "hospital": hospital
                , "horainicio": horainicio
                , "horafin": horafin
                , "medico": $("#txtNombre").val()
            });

            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/Medicos.asmx/SolicitarSoporte",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {
                    if (resultado.d) {
                        alert("Médico guardado.");
                        document.getElementById('light').style.display = 'none';
                        document.getElementById('light_mensaje').style.display = 'block';
                        document.getElementById('div_coordenar').style.display = 'none';
                        document.getElementById('fade').style.display = 'none';
                    }
                    else {
                        alert("No se ha podido enviar la solicitud para la capacitación.");
                    }

                },
                error: errores
            });
        }


        function Enviar_Coordinacion() {
            $("#span_errorcoordinar").html("");

            if ($("#txt_horacoordinar_inicio").val() == "") {
                $("#span_errorcoordinar").html("<b>¡ATENCIÓN!: Si no selecciona una fecha no podemos coordenar una capacitación.</b>");
                return;
            }

            if ($("#txt_horacoordinar_fin").val() == "") {
                $("#span_errorcoordinar").html("<b>¡ATENCIÓN!: Si no selecciona una fecha no podemos coordenar una capacitación.</b>");
                return;
            }
                       
            if ($("#txt_consultoriocoordinar").val() == "") {
                $("#span_errorcoordinar").html("<b>¡ATENCIÓN!: Si no ingresa un consultorio no vamos a saber donde ir a capacitar al médico.</b>");
                return;
            }

            if ($("#cbo_hospital option:selected").val() == "0") {
                $("#span_errorcoordinar").html("<b>¡ATENCIÓN!: Si no selecciona el edificio no vamos a saber a cual ir a capacitar al médico.</b>");
                return;
            }

            if ($("#txt_horacoordinar").val() == "") {
                $("#span_errorcoordinar").html("<b>¡ATENCIÓN!: Si no ingresa una hora no vamos a saber a cuando ir a capacitar al médico.</b>");
                return;
            }

            //CheckTime($("#txt_horacoordinar_inicio").val());
            //CheckTime($("#txt_horacoordinar_fin").val());


            hora = $("#txt_horacoordinar_inicio").val();
            if (hora == '') {
                return false;
            }

            if (hora.length > 5) {
                $("#span_errorcoordinar").html("Introdujo una cadena mayor a 8 caracteres");
                return false;
            }
            if (hora.length != 5) {
                $("#span_errorcoordinar").html("Introducir HH:MM");
                return false;
            }
            //99:00
            a = hora.charAt(0); //<=2 
            b = hora.charAt(1); //<4 
            c = hora.charAt(2); //: 
            d = hora.charAt(3); //<=5 

            if ((a == 1 && b > 9) || (a >= 2)) {
                $("#span_errorcoordinar").html("El valor que introdujo en la Hora no corresponde, introduzca una hora entre las 10 a 19 hs.");
                return;
            }

            if (a == 0 && b <= 9) {
                $("#span_errorcoordinar").html("El valor que introdujo en la Hora no corresponde, introduzca una hora entre las 10 a 19 hs.");
                return;
            }

            //if (a == 0 && b == 9 && d < 3) {
            //    $("#span_errorcoordinar").html("El valor que introdujo en el horario no corresponde, el horario comienza a las 10:00");
            //    return;
            //}

            if (a == 1 && b == 9 && d >= 2) {
                $("#span_errorcoordinar").html("El valor que introdujo en el horario no corresponde, el horario finaliza a las 19:30");
                return;
            }


            if (d > 5) {
                $("#span_errorcoordinar").html("El valor que introdujo en los minutos no corresponde, introduzca un dígito entre 00 y 59");
                return;
            }

            if (c != ':') {
                $("#span_errorcoordinar").html("Introduzca el caracter ':' para separar la hora, los minutos y los segundos");
                return;
            }


            


            hora = $("#txt_horacoordinar_fin").val();
            if (hora == '') {
                return false;
            }

            if (hora.length > 5) {
                $("#span_errorcoordinar").html("Introdujo una cadena mayor a 8 caracteres");
                return false;
            }
            if (hora.length != 5) {
                $("#span_errorcoordinar").html("Introducir HH:MM");
                return false;
            }
            //99:00
            a = hora.charAt(0); //<=2 
            b = hora.charAt(1); //<4 
            c = hora.charAt(2); //: 
            d = hora.charAt(3); //<=5 

            //if ((a == 1 && b > 9) || (a > 2)) {
            //    $("#span_errorcoordinar").html("El valor que introdujo en la Hora no corresponde, introduzca un digito entre 00 y 19");
            //    return;
            //}

            //if (a == 0 && b < 9) {
            //    $("#span_errorcoordinar").html("El valor que introdujo en la Hora no corresponde, introduzca un digito entre 09 y 19");
            //    return;
            //}

            //if (a == 0 && b == 9 && d < 3) {
            //    $("#span_errorcoordinar").html("El valor que introdujo en el horario no corresponde, el horario comienza de 9:30");
            //    return;
            //}

            if ((a == 1 && b > 9) || (a >= 2)) {
                $("#span_errorcoordinar").html("El valor que introdujo en la Hora no corresponde, introduzca una hora entre las 10 a 19 hs.");
                return;
            }

            if (a == 0 && b <= 9) {
                $("#span_errorcoordinar").html("El valor que introdujo en la Hora no corresponde, introduzca una hora entre las 10 a 19 hs.");
                return;
            }

            if (a == 1 && b == 9 && d >= 2) {
                $("#span_errorcoordinar").html("El valor que introdujo en el horario no corresponde, el horario finaliza a las 19:30");
                return;
            }


            if (d > 5) {
                $("#span_errorcoordinar").html("El valor que introdujo en los minutos no corresponde, introduzca un dígito entre 00 y 59");
                return;
            }

            if (c != ':') {
                $("#span_errorcoordinar").html("Introduzca el caracter ':' para separar la hora, los minutos y los segundos");
                return;
            }





            EnviarEmail($("#txt_fechacoordinar").val(), $("#txt_consultoriocoordinar").val(), $("#cbo_hospital option:selected").val(), $("#txt_horacoordinar_inicio").val(), $("#txt_horacoordinar_fin").val());
            

            
            
        }

    </script>
</body>
</html>
