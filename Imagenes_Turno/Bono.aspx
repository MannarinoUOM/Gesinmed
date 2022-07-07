<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Bono.aspx.cs" Inherits="Imagenes_Turno_Bono" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />


<style>
.Imagenes_Paciente_Contenedor_Principal {width:100%; background-color:Black; height:80px; border-radius:5px; padding-top:5px; padding-left:5px; position:relative;}
.Imagenes_Paciente_Contenedor_Principal_Foto {width:70px; height:70px; border-radius:5px;}
.Contenedor_Informacion_Paciente {position:absolute; top:0px; left:85px; color:White; font-size:12px;}
.Contenedor_Turnos{margin-top:10px;}
.Turnos_Izquierdo{float:left; width:48%; height:100%; background-color: #C7C7C7; margin:5px; }
.Turnos_Derecho{float:left; width:49%; height:100%; background-color: #C7C7C7;  margin:5px;}
.Texto_Centrado{text-align:center;}

.libre {background-color:White;}
.ocupado{background-color:#58FA58;}
.sobreturno{background-color:#0080FF;}
.cancelado{background-color:#FA5858;}
.forzado{background-color:#FF8000;}

.atendido{background-color:#0B610B}
.llamado{background-color:#F7FE2E}
.ausente{background-color:#F5A9BC}
.recepcionado{background-color:#A9F5F2}

.mensaje_amarillo {background-color: Yellow; color: Black; padding: 0 5px; display:none;}
.mensaje_rojo {background-color: Red; color: Black; padding: 0 5px;display:none;}


#tabla_turnos_dias .libre:hover{background-color:#BFFFD9; cursor:pointer;}
.Contenedor_Info_Medico {background-color:#DEDEDE;width:100%;margin-top:5px;padding:5px;}

.borderless td, .borderless th {border: none;}

.div_izquierdo {float:left;}

.bloque {display:block;}

#tabla_turnos_dias tr{cursor:pointer;}
#tabla_turnos_semana span{cursor:pointer;}


.Contenedor_Info_Medico .btn{margin-bottom: 5px;}
.Links {cursor: pointer; text-decoration:none;}
.Links:hover {cursor: pointer; text-decoration:none;}

#fancybox-overlay {z-index: 10000;}
#fancybox-wrap {z-index: 10001;}
.manito {cursor:pointer;}
</style>


</head>
<body>
    <form id="form1" runat="server">
    <div class="container" style="padding-top:30px;" id="DivCarga">
    <div class="contenedor_1">
       

      <div class="contenedor_2" style="height: 282px;"> <div class="titulo_seccion">
      <span style="text-align:center; display:block;">Emisión de Bono</span></div>
            
      <input id="afiliadoId" style="display:none;"/>

      <table>      
      <tr><td style="width: 118px; text-align:right;">Código Turno</td><td><input type="text" id="txt_TurnoId" maxlength="10" placeholder="Código de barra"/><span id="SpanCargando"> <img id="IconoVencido" rel="tooltip" title="Espere..." src="../img/Espere.gif" /> </span></td></tr>

      <tr><td style="width: 118px; text-align:right;">Paciente: </td><td><input type="text" id="txt_paciente" maxlength="50" placeholder="Apellido y Nombre"/></td></tr>
      <tr><td style="width: 118px; text-align:right;">Documento: </td><td><input type="text" id="txt_documento" maxlength="8" placeholder="Documento"/></td></tr>
      <tr><td style="width: 118px; text-align:right;">NHC: </td><td><input type="text" id="txt_nhc" maxlength="10" placeholder="NHC"/></td></tr>

      </table>      

      <div style="text-align:center; margin-top: 20px;">
      <a class="btn btn-danger" href="Bono.aspx" tabindex="-1" id="btnCancelarPedidoTurno" style="">Cancelar</a>      
      </div>


    </div>
    </div>
    </div>
    <div class="clearfix"></div>


    <div class="container" style="padding-top:30px; display:none;" id="div_listapaciente">
    <div class="contenedor_1">
      <div class="titulo_seccion">
      <span style="text-align:center; display:block;">Seleccione Turno</span></div> 

            <div>
                <table class="table table-condensed">
                <thead>                
                <tr><td>Nro. Turno</td><td>Paciente</td><td>DNI</td><td>NHC</td><td>Fecha</td><td>Hora</td><td>Especialidad</td></tr>
                </thead>
                <tbody id="div_tabla_pacientes">
                    
                </tbody>                
                </table>
            </div>
      
          <div style="text-align:center; margin-top: 20px;">
      <a class="btn btn-danger" href="Bono.aspx" tabindex="-1" id="A1" style="">Cancelar</a>      
      </div>
    </div>
    </div>
    <div class="clearfix"></div>



    
    <div id="DatoTurno" style="display:none;">
        <div id="Contenedor" class="well">                        
            <div id="Contenedor_Datos_Paciente" class="Imagenes_Paciente_Contenedor_Principal"> 
                <div><img id="fotopaciente" class="Imagenes_Paciente_Contenedor_Principal_Foto" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></div>
                    <div id="Contenedor_Informacion_Paciente" class="Contenedor_Informacion_Paciente">
                <div>Paciente: <b><span id="span_Paciente"></span></b> <span id="span_Edad"></span> <a href="javascript:VerMas();" class="ver_mas_datos" tabindex="-1">Ver más</a> </div>
                <div>DNI: <b><span id="span_DNI"></span></b> <span id="span_NHC"></span> </div>                
                <div>Teléfono: <b><span id="span_Telefono"></span></b></div>
                <div><span id="span_TituloSeccional">Seccional: </span><b><span id="span_Seccional"></span></b> &nbsp;&nbsp;&nbsp; <b><span id="span_monotributista" class="mensaje_amarillo"></span></b> &nbsp;&nbsp;&nbsp; <b><span id="span_pagabono" class="mensaje_rojo"></span></b></div>                                
                    </div>
            </div>

            <div>
            Médico:<span id="span_medico"></span><br />
            Especialidad:<span id="span_especialidad"></span>
            </div>

            <div>
            <label for="ck_nopaga" style="display:inline-block;" >No Paga:</label> <input type="checkbox" id="ck_nopaga" style="margin-top: 0px;margin-bottom: 3px;" /> 
            <div id="div_nopaga" style="display:inline;">            
                <span id="span_barra_nopaga" style="display:none;">
                <span style="margin-left:30px;">Autorizado por:</span> <select id="cb_autorizantes"></select> <span style="margin-left:30px;">Motivo:</span> <select id="cb_motivo"></select> <span style="margin-left:30px;"> Otro:</span> <input type="text" id="txt_otro"/>            
                </span>
            </div>
            </div>

            <div>
            <b>Estudios a realizar:</b>
            <div style="max-height:200px; overflow:auto;">
            <table class="table table-condensed">
            <tr><td>Código</td><td>Práctica</td><td>Valor</td></tr>
            <tbody id="tabla"></tbody>            
            </table>
            </div>

            <div><b>Total: </b> <span id="span_total"></span><br />
            <div style="float:right;">
            <a id="btnConfirmarNuevoBono" class="btn btn-info">Confirmar</a>
            <a href="Bono.aspx" class="btn btn-danger">Cancelar</a>
            </div>
            <div style="clear:both;"></div>
            </div>

            </div>

            </div>
    </div>

    <div id="Mensaje_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="Mensaje_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Titulo Mensaje</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="Mensaje_Mensaje">           
         </div>
         <hr />
         <div style="float:right; margin-right:10px;">
            <a class="btn btn-info" id="Mensaje_btn_Aceptar">Aceptar</a>
            <a class="btn btn-danger" style="display:none;" id="Mensaje_btn_cancelar">Cancelar</a>
            <a class="btn btn-success" style="display:none;" id="Mensaje_btn_turno_forzado">Turno Forzado</a>
         </div>
         <div style="clear:both;"></div>
    </div>
</div>


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.validate.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>

    <script>
        $("#ck_nopaga").click(function () {
            if ($("#ck_nopaga").is(":checked")) {
                $("#span_barra_nopaga").show();
                $("#span_total").html("No paga");
            }
            else {
                if (obj_Paciente.PagaBono) {
                    $("#span_barra_nopaga").hide();
                    $("#span_total").html(" $" + Total);
                }
                else {
                    $("#span_barra_nopaga").hide();
                    $("#span_total").html("No paga");
                }
            }
        });


        function IMG_BONO_BUSCAR_PACIENTE() {
            var json = JSON.stringify({ "PACIENTE": $("#txt_paciente").val(), "DOCUMENTO": $("#txt_documento").val(), "NHC": $("#txt_nhc").val() });


            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_BONO_BUSCAR_PACIENTE",
                contentType: "application/json; charset=utf-8",
                data: json,
                dataType: "json",
                success: function (Resultado) {
                    var Pacientes = Resultado.d;
                    $("#div_tabla_pacientes").empty();
                    var datos = "";
                    $.each(Pacientes, function (index, paciente) {
                        datos = datos + "<tr class='manito' onclick='CargarTurno("+paciente.NROTURNO+");'><td>" + paciente.NROTURNO + "</td><td>" + paciente.PACIENTE + "</td><td>" + paciente.DNI + "</td><td>" + paciente.NHC + "</td><td>" + paciente.FECHA + "</td><td>" + paciente.HORA + "</td><td>" + paciente.ESPECIALIDAD + "</td></tr>";
                    });
                    $("#div_tabla_pacientes").html(datos);

                    $("#DivCarga").hide();
                    $("#div_listapaciente").show();
                    
                }
            });
        }


        function CargarTurno(Turno) {
            $("#div_listapaciente").hide();
            $("#txt_TurnoId").val(Turno);
            PrepararBono();
        }


        function Cargar_AutorizantesBono() {
            $.ajax({
                type: "POST",
                url: "../Json/DarTurnos.asmx/AutorizantesBono",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    var Autorizantes = Resultado.d;
                    $('#cb_autorizantes').append($('<option></option>').val("0").html("Seleccione autorizante"));
                    $.each(Autorizantes, function (index, autori) {
                        $('#cb_autorizantes').append($('<option></option>').val(autori.id).html(autori.autorizante));
                    });
                },
                error: errores
            });
        }

        function Cargar_MotivoAutorizantesBono() {
            $.ajax({
                type: "POST",
                url: "../Json/DarTurnos.asmx/MotivoAutorizaBono",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    var Autorizantes = Resultado.d;
                    $('#cb_motivo').append($('<option></option>').val("0").html("Seleccione motivo"));
                    $.each(Autorizantes, function (index, motivo) {
                        $('#cb_motivo').append($('<option></option>').val(motivo.id).html(motivo.motivo));
                    });
                },
                error: errores
            });
        }

        function errores(msg) {
            Impreso = 0;
            var jsonObj = JSON.parse(msg.responseText);
            alert('Error: ' + jsonObj.Message);
        }
        
        Cargar_AutorizantesBono();
        Cargar_MotivoAutorizantesBono();

        
        var Monotributista = false;
        var Total = 0;
        var Array_Turno_Practicas = [];
        var objeto_practica = {};

        function Cargar_Turno_Practicas() {
            var json = JSON.stringify({ "TurnoId": TurnoId, "Monotributista": Monotributista });
            //alert(Monotributista);
            Array_practicas = [];

            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_BONO_CARGAR_PRACTICAS",
                contentType: "application/json; charset=utf-8",
                data: json,
                dataType: "json",
                success: function (Resultado) {
                    var Practicas = Resultado.d;
                    $("#tabla").empty();
                    Total = 0;

                    $.each(Practicas, function (index, practica) {
                        objeto_practica = {};
                        objeto_practica.Codigo = practica.Practica_Codigo;
                        objeto_practica.Practica = practica.Practica_Nombre;
                        objeto_practica.Precio = practica.Valor;
                        objeto_practica.PrecioReal = practica.Valor;                        
                        objeto_practica.ComentarioPractica = "";
                        objeto_practica.PracticaId = practica.Practica_Codigo;
                        objeto_practica.Estado = 1;
                        Array_Turno_Practicas.push(objeto_practica);

                        $("#tabla").html($("#tabla").html() + "<tr><td>" + practica.Practica_Codigo + "</td><td>" + practica.Practica_Nombre + "</td><td>" + practica.Valor + "</td></tr>");
                        Total = Total + parseFloat(practica.Valor);
                    });
                    if (obj_Paciente.PagaBono) {
                        $("#span_total").html(" $" + Total);
                    }
                    else {
                        $("#span_total").html("No paga");
                    }

                    $("#DatoTurno").show();
                    $("#DivCarga").hide();
                },
                error: errores
            });
        }

        var TurnoId = 0;
                               
        $("#txt_paciente").keyup(function (e) { if (e.keyCode === 13) { IMG_BONO_BUSCAR_PACIENTE(); } });
        $("#txt_documento").keyup(function (e) { if (e.keyCode === 13) { IMG_BONO_BUSCAR_PACIENTE(); } });
        $("#txt_nhc").keyup(function (e) { if (e.keyCode === 13) { IMG_BONO_BUSCAR_PACIENTE(); } });


        $("#txt_TurnoId").keyup(function (e) {
            if (e.keyCode === 13) {
                PrepararBono();
            }
        });


        function PrepararBono() {
            var json = JSON.stringify({
                "TurnoId": $("#txt_TurnoId").val()
            });

            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/Imagenes/Imagenes.asmx/IMG_Turno_Info",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    //LimpiarDatos();
                    var dato = Resultado.d;

                    if (dato.IMG_TURNO_BONO_ID != null) {
                        ActualizarMensaje("Bono ya emitido", "¡¡Atención!! Este turno ya posee bono.");
                        return;
                    }

                    if (dato.IMG_TURNO_PACIENTE_ID == 0) {
                        ActualizarMensaje("Turno No Encontrado", "El turno con el código de barra ingresado no se encuentra en el sistema.");
                        return;
                    }

                    TurnoId = $("#txt_TurnoId").val();

                    if (dato.IMG_TURNO_ESTADO == -1) {
                        ActualizarMensaje("Turno Cancelado", "¡¡Atención!! Este turno ha sido cancelado.");
                        return;
                    }

                    if (dato.IMG_TURNO_ESTADO > 1) {
                        ActualizarMensaje("Turno ya utilizado", "¡¡Atención!! Este turno ya ha sido recepcionado.");
                        return;
                    }

                    $("#span_especialidad").html(dato.Especialidad);
                    $("#span_medico").html(dato.Medico);

                    obj_Turno = {};
                    obj_Turno.Medico = dato.IMG_TURNO_MEDICO;
                    obj_Turno.Especialidad = dato.IMG_TURNO_ESPECIALIDAD;

                    CargarPacienteID(dato.IMG_TURNO_PACIENTE_ID);

                },
                error: errores
            });
        }

        function CargarPacienteID(ID) {
            $.ajax({
                type: "POST",
                url: "../Json/DarTurnos.asmx/CargarPacienteID",
                data: '{ID: "' + ID + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Paciente_Cargado,
                error: errores
            });
        }


        var Afiliado_Id = 0;
        var obj_Paciente = {};
        var obj_Turno = {};

        function Paciente_Cargado(Resultado) {
            var Paciente = Resultado.d;
            var PError = false;

            if (Paciente.length == 0) {
                $("#SpanCargando").hide();
                ActualizarMensaje("Paciente no encontrado", "No se ha encontrado el paciente.");
                return;
            }

            if (Paciente.length == 1) {

                $.each(Paciente, function (index, paciente) {
                    if (paciente.Vencido) {
                        ActualizarMensaje("Baja", "Paciente dado de baja el día: " + paciente.FechaVencido);
                    }



                    $("#span_Paciente").html(paciente.Paciente);

                    $("#span_Edad").html("<b>( " + paciente.Edad_Format + ")</b>");
                    $("#span_DNI").html(paciente.documento_real);
                    $("#span_NHC").html(" NHC:<b>" + paciente.NHC_UOM + "</b>");
                    $("#span_Telefono").html(paciente.Telefono);
                    Afiliado_Id = paciente.documento;
                    $("#afiliadoId").val(paciente.documento);
                    obj_Paciente.PacienteId = paciente.documento;
                    obj_Paciente.dni = paciente.documento_real;
                    $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);
                    //alert(paciente.CUIT);
                    //if (paciente.cuil_titu != null && paciente.cuil_titu == "88888888888") {
                    if (paciente.CUIT != null && paciente.CUIT == "88888888888") {
                        Monotributista = true;
                        obj_Paciente.Monotributista = true;
                        $("#span_monotributista").html("MONOTRIBUTISTA");
                        $("#span_monotributista").show();
                    }
                    else {
                        Monotributista = false;
                        obj_Paciente.Monotributista = false;
                        $("#span_monotributista").hide();
                        $("#span_monotributista").html("");
                    }


                    if (paciente.PagaBono) {
                        obj_Paciente.PagaBono = true;
                        $("#span_pagabono").hide();
                        $("#span_pagabono").html("");
                    }
                    else {
                        obj_Paciente.PagaBono = false;
                        $("#span_pagabono").show();
                        $("#span_pagabono").html("NO PAGA BONO");
                    }



                    $("#span_Seccional").html(paciente.Seccional);
                    //$("#Cod_OS").val(paciente.OSId);
                    if (paciente.Nro_Seccional == 998) {
                        //$("#cbo_ObraSocial").show();
                        //$("#cboSeccional").hide();
                        $("#span_TituloSeccional").html("Ob. Social: ");
                        $("#span_Seccional").html(paciente.ObraSocial);
                    }

                    if (paciente.Observaciones != null && paciente.Observaciones != "") {
                        ActualizarMensaje("Comentario", paciente.Observaciones);
                    }

                    //Cargar_Paciente_Info();

                    //VerificarPMI(paciente.documento);

                    //Verifico si esta en el padron 10.0.0.1
                    $("#SpanCargando").show();
                    $("#btnVencimiento").hide();
                    //EstaVendico($("#txt_dni").val());

                    UltimoAporte_OK();


                });
            }
            else if (paciente.length > 1 && $("#afiliadoId").val().length == 0) {
                //$("#txtdocumento").val($("#txt_dni").val());
                BuscarPacientes_fancy();
                $("#txtPaciente").focus();
            }
        }


        function UltimoAporte_OK() {
            //if (Ultimo_OK == 1) { return false; }
            var json = JSON.stringify({ "Documento": obj_Paciente.dni });
            $.ajax({
                type: "POST",
                url: "../Json/Gente.asmx/UltimoAporte_OK",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    //Ultimo_OK = 1;
                    var ok = Resultado.d;
                    if (!ok) {
                        ActualizarMensaje("Error en el aporte", "No se registran aportes en los últimos 3 meses. Regularizar situación en AFILIACIONES.");
                        $("#IconoVencido").attr("src", "../img/Icono_ERROR.gif")

                        $("#IconoVencido").attr("data-original-title", "Problemas Aportes 3 meses");

                        if ($("[rel=tooltip]").length) {
                            $("[rel=tooltip]").tooltip();
                        }
                    }
                    else {
                        $("#IconoVencido").attr("src", "../img/Icono_OK.gif");
                        $("#IconoVencido").attr("title", "Afiliado Verificado");
                    }
                    $("#SpanCargando").show();
                    Cargar_Turno_Practicas();
                }
            });
        }

        function imgErrorPaciente(image) {
            image.onerror = "";
            image.src = "../img/silueta.jpg";
            return true;
        }









        function ActualizarMensaje(Titulo, Mensaje) {
            $("#Mensaje_Titulo").html(Titulo);
            $("#Mensaje_Mensaje").html(Mensaje);
            $("#Mensaje_Div").show();
        }

        $("#Mensaje_btn_Aceptar").click(function () { $("#Mensaje_Div").hide(); });



        var Impreso = 0;

        $("#btnConfirmarNuevoBono").click(function () {
            if (obj_Paciente.PacienteId == null || obj_Paciente.PacienteId == 0) { ActualizarMensaje("Error en el paciente", "Paciente no válido."); return false; }

            //if (VerificarImporte()) { alert("Paciente discapacitado. No se debe cobrar bono."); return false; }
            if ($("#ck_nopaga").is(":checked") && $("#cb_autorizantes :selected").val() == "0") { ActualizarMensaje("¿Quién autoriza?", "Seleccione Autorizante."); return false; }
            if ($("#ck_nopaga").is(":checked") && $("#cb_motivo :selected").val() == "0") { ActualizarMensaje("¿Motivo?", "Seleccione un motivo."); return false; }


            if (Impreso == 0) {
                Impreso = 1;

                TurnoAutorizanteId = $('#cb_autorizantes option:selected').val();
                TurnoPrimeraVez = false;
                TurnoEmiteComprobante = false;
                Recepcionaturno = false;
                TurnoEmiteComprobante = true;
                Recepcionaturno = false;
                ReservaTurnoAhora = false;
                EsAtencionSinTurno = false;

                var TurnoVerificado = null;
                var Comentario = $("#txt_otro").val();

                if ($("#ck_nopaga").is(":checked") || obj_Paciente.PagaBono == false) {
                    for (var i = 0, l = Array_Turno_Practicas.length; i < l; i++) {
                        Array_Turno_Practicas[i].PrecioReal = "0";
                        Array_Turno_Practicas[i].Precio = "0";
                    }
                }


                if (obj_Turno.Especialidad == 339) { obj_Turno.Especialidad = 249; }
                if (obj_Turno.Especialidad == 340) { obj_Turno.Especialidad = 219; }
                if (obj_Turno.Especialidad == 341) { obj_Turno.Especialidad = 217; }
                if (obj_Turno.Especialidad == 342) { obj_Turno.Especialidad = 248; }
                if (obj_Turno.Especialidad == 343) { obj_Turno.Especialidad = 167; }
                if (obj_Turno.Especialidad == 354) { obj_Turno.Especialidad = 166; }
                if (obj_Turno.Especialidad == 356) { obj_Turno.Especialidad = 217; }


                var json = JSON.stringify({ "objPracticas": Array_Turno_Practicas, "Documento": obj_Paciente.PacienteId, "EsPrimeraVez": false, "Verificado": '',
                    "EmiteComprobante": TurnoEmiteComprobante, "AutorizanteId": $('#cb_autorizantes option:selected').val(),
                    "MedicoId": obj_Turno.Medico,
                    "EspecialidadId": obj_Turno.Especialidad,
                    "EsAtencionSinTurno": EsAtencionSinTurno, "EsUrgencia": false, "ReservaTurnoAhora": ReservaTurnoAhora,
                    "FechaTurno": '01/01/1900', "Recepcionaturno": Recepcionaturno, "AutorizaBono": $("#cb_autorizantes :selected").val(), "MotivoAutorizaBono": $("#cb_motivo :selected").val(),
                    "Observaciones": $("#txt_otro").val().trim().toUpperCase()

                    ,"TLC": 0,"chkNobody": 0, "ImportePaga": 0.0, "S": 1 ,"observacion": "" // para teleconsulta y saldos que no esta contemplado en bonos de imagenes
                });
                $.ajax({
                    type: "POST",
                    url: "../Json/Bonos/NuevoBonos.asmx/GuardarPracticasBono",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: BonoGuardado,
                    error: errores
                });
            }
        });


        function BonoGuardado(Resultado) {
            var BonoDatos = Resultado.d;

            var json = JSON.stringify({ "TurnoId": TurnoId, "Bono": BonoDatos});
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_BONO_RELACIONAR_CON_TURNO",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado2) {
                    var url = '../Impresiones/ImpresionBono.aspx?' + BonoDatos
                    if (Monotributista) url = '../Impresiones/ImpresionBono_Mono.aspx?' + BonoDatos;
                    $.fancybox(
		                        {
		                            'autoDimensions': false,
		                            'href': url,
		                            'width': '75%',
		                            'height': '75%',
		                            'autoScale': false,
		                            'transitionIn': 'none',
		                            'transitionOut': 'none',
		                            'type': 'iframe',
		                            'hideOnOverlayClick': false,
		                            'enableEscapeButton': false,
		                            'onClosed': function () {
		                                window.location.href = "Bono.aspx";
		                            }
		                    });
                },
                error: errores
            });
                      

            
        }


        parent.document.getElementById("DondeEstoy").innerHTML = "Bonos > <strong>Bonos para Imágenes</strong>";
        $("#txt_TurnoId").focus();
    </script>

    </form>
    </body>
    </html>
