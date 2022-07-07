<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Informe_Practica_Cargar.aspx.cs" Inherits="Imagenes_Turno_Informe_Practica_Cargar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<style>
.active {background-color:Yellow;}
.manito {cursor:pointer;}
.btn {margin-bottom: 5px;}
.sininformar {background-color: #E9EEC5; color:Black;} 
.todos {background-color: #dcdcdc; color:Black;} 
.audio {background-color: #9F8DE5; color: White; }
.desgrabado {background-color: #6AEFED; color: Black; }
.corregido {background-color: #A7932B; color: White; }
.validado {background-color: #57d650; color: Black; }

table .btn {margin-bottom: 0px;}

</style>

<body>

    <form id="form1" runat="server">
    
    <div>
        <div class="Contenedor_Info_Medico well">
            <span>Especialidad:</span>
            <select id="cbo_especialidad">
            </select>        

            <span style="margin-left: 40px;">Médico:</span>
            <select id="cbo_Medico">
                <option value="0">TODOS</option>
            </select>     

            <span style="margin-left: 40px;">Médico a Informar:</span>
            <select id="cbo_Medico_Validar">
                <option value="0">TODOS</option>
            </select>     

            <label for="ck_mostrarsolopacientesdelmedico" style="display: inline-block;"> <--- Mostrar sólo pacientes del médico</label>
            <input type="checkbox" id="ck_mostrarsolopacientesdelmedico"/>

            <br />
            <span>Desde:</span><input type="text" class="span2" id="txt_fecha_desde" /> <span style="display:inline-block;margin-left:20px;">Hasta:</span><input type="text" class="span2" style="margin-left: 10px;" id="txt_fecha_hasta" />
            <span>Tipo Orden:</span>
            <select id="cbo_tipoorden">
                <option value="0">Todas</option>
                <option value="1">Ambulatorio</option>
                <option value="2">Guardia</option>
                <option value="3">Internación</option>
            </select>
            <a id="btn_buscar" class="btn btn-info" style="margin-left:10px;">Buscar</a><br />
            <div>
                <span class="badge todos manito" onclick="VerLista(0);">Todos</span>
                <span class="badge sininformar manito" onclick="VerLista(1);">Sin Informar</span>
                <span class="badge audio manito" onclick="VerLista(2);">Audio</span>
                <span class="badge desgrabado manito" onclick="VerLista(3);">Desgrabado</span>
                <span class="badge corregido manito" onclick="VerLista(4);">Corregir</span>
                <span class="badge validado manito" onclick="VerLista(5);">Validado</span>
            </div>
         </div>
    </div>

    <div class="well">
    <div class="well" style="display:block; width:97%; height:500px; background-color:#F3EFFD; float:left; max-height: 500px; min-height:500px; overflow:auto; " id="div_listapacientes">
        <table class="table table-condensed">
        <theader>
            <tr><th>Fecha</th><th>Tipo</th><th>Nro. Turno</th><th>Paciente</th><th>Médico</th><th>Estudio</th><th>Esc.</th><th>Com.</th><th>MI</th><th>MV</th><th>Estado</th><th></th></tr>            
        </theader>
        <tbody id="tabla_atencion">
            </tbody>
        
        </table>
    </div>


    <div style="clear:both;"></div>

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

    <div id="CargaDeInforme_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:90%; height:80%; border-radius:5px;padding-bottom:10px;">
         <div id="CargaDeInforme_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Titulo Mensaje</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="CargaDeInforme_Contenido">           
         
         <div>
    <span id="span_carga_paciente" style="font-size:20px;"></span><br />
    <span id="span_medico_informa" style="font-size:20px;"></span><br />    
    <div>
        <select id="cbo_plantilla"></select><a class="btn" onclick="CargarPlantilla();">Cargar Plantilla</a>
        <a class="btn" onclick="GuardarInforme();">Guardar</a>
        <a class="btn" onclick="CerrarInforme();">Cancelar</a>
        <a class="btn" id="btn_desvalidar" style="display:none;" onclick="Desvalidar();">Desvalidar</a>
<%--        <a class="btn" id="btnEmail" style="display:inline;" onclick="enviarEmail()">Enviar E-Mail</a>--%>
        <br />

        <span>AUDIO:</span>
        <select id="cbo_audio" style="margin-top: 0px;">            
        </select>
        
        <div id="span_audio" style="display:-webkit-inline-box; height:25px;">
            <audio id="audio_cargado" controls>El navegador no soporta audio.</audio>
        </div>

        
        
    </div>
    <div>        
        <textarea rows="15" cols="80" id="text_contenido"></textarea>
    </div>
    </div>

         </div>
         <hr />
         <div style="float:right; margin-right:10px;">            
         </div>
         <div style="clear:both;"></div>
    </div>
    </div>






    <div id="Audio_DIV" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:90%; height:80%; border-radius:5px;padding-bottom:10px;">
         <div id="Audio_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Audio</div>
         <hr />
         <div>
            <input type="file" id="Audio_Archivo"/> <a id="Audio_Subir" class="btn">Subir Audio</a>
         </div>
         <div style="margin:5px 10px 5px 10px;" id="Audio_Contenido">
         </div>
         <hr />
         <div style="float:right; margin-right:10px;">
            <a class="btn btn-warning" id="Audio_EstadoAnterior">Volver a estado Sin Informar</a>            
            <a class="btn btn-info" id="Audio_Aceptar">Cerrar</a>            
         </div>
         <div style="clear:both;"></div>
    </div>
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
    <script src="../js/Hospitales/ObraSociales/ObraSociales.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Gente/Vencimiento.js" type="text/javascript"></script>

    <script>
        var turnoParaEmail;
        var turnoParaInforme;

    function VerComentario(Comentario) {
        ActualizarMensaje("Comentario", Comentario);
    }

    function VerEscaneado(TurnoId) {
        var json = JSON.stringify({
            "TurnoId": TurnoId
        });
        //alert($("#ipConfiguracion").val());
        console.log($("#ipConfiguracion").val());
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/H2_IMG_ESCANEAR_CARGAR",
            data: json,            
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Auxi = "";
                var Datos = Resultado.d;
                $.each(Datos, function (index, dato) {
//                    Auxi = Auxi + "<div style='overflow:auto; max-height:400px;'><div style='border:1px; border-style:solid;margin-bottom:20px;'><a href='http:\\\\" + $("#ipConfiguracion").val() + "\\" + dato.Archivo + "' target='_blank'><img src='http:\\\\" + $("#ipConfiguracion").val() + "\\" + dato.Archivo + "' style='width:460px;'/></a></div></div";
//                    //Auxi = Auxi + "<div style='overflow:auto; max-height:400px;'><div style='border:1px; border-style:solid;margin-bottom:20px;'><a href='http:\\\\10.10.8.72\\" + dato.Archivo + "' target='_blank'><img src='http:\\\\10.10.8.72\\" + dato.Archivo + "' style='width:460px;'/></a></div></div";
                //                });
                        if (dato.esAdjunto == 1) {

                            var tipoEtiqueta = "";
                            var formato = dato.Archivo.substr(-3, dato.Archivo.length).toLowerCase();
                            if (formato == "pdf") { tipoEtiqueta = "embed"; } else { tipoEtiqueta = "img" }
                            Auxi = Auxi + "<div style='overflow:auto; max-height:400px;'><div style='border:1px; border-style:solid;margin-bottom:20px;'><a href='" + dato.Archivo + "' target='_blank'>VER ARCHIVO<" + tipoEtiqueta + "  onclick='mostrarPDF(" + dato.Archivo + ")'  src='" + dato.Archivo + "' style='width:460px;'/></a></div></div";
                        }

                        else { Auxi = Auxi + "<div style='overflow:auto; max-height:400px;'><div style='border:1px; border-style:solid;margin-bottom:20px;'><a href='http://gesinmed.policlinicocentral.org.ar/" + dato.Archivo + "' target='_blank'><img src='http://gesinmed.policlinicocentral.org.ar/" + dato.Archivo + "' style='width:460px;'/></a></div></div"; }

                    });
                ActualizarMensaje("Escaneado", Auxi);
            },
            error: errores
        });
    };





    function INFORME_LISTA_PACIENTES() {
        var SoloMedicoSeleccionado = false;
        if ($("#ck_mostrarsolopacientesdelmedico").is(':checked'))
        {
            SoloMedicoSeleccionado = true;
        }

        var json = JSON.stringify({
            "EspecialidadId": $("#cbo_especialidad :selected").val(), "DiaInicio": $("#txt_fecha_desde").val(), "DiaFin": $("#txt_fecha_hasta").val(), "MedicoID": $("#cbo_Medico :selected").val(),
            "SoloMedicoSeleccionado": SoloMedicoSeleccionado, "MedicoValidar": $("#cbo_Medico_Validar :selected").val(), "TipoOrden": $("#cbo_tipoorden :selected").val()
        });

        //$("#tabla_atencion").html("<tr><td>Buscando...</td></tr>");

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/H2_IMG_INFORME_LISTADO",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Auxi = "";
                var Datos = Resultado.d;

                var cont_sininformar = 0;
                var cont_audio = 0;
                var cont_desgrabado = 0;
                var cont_corregido = 0;
                var cont_validado = 0;

                $.each(Datos, function (index, dato) {
                    LinkImg = "";
                    LinkCom = "";

                    if (dato.comentario != "" && dato.comentario != null) {
                        LinkCom = "<a class='manito' onclick='VerComentario(" + '"' + dato.comentario + '"' + ");'>Ver</a>";                        
                    }

                    if (dato.Escaneado) {
                        LinkImg = "<a class='manito' onclick='VerEscaneado(" + dato.IMG_TURNO_ID + ");'>Ver</a>";
                    }

                    botones = "";

                    color = "class='sininformar';";

                    //if (dato.IMG_INFORME_ESTADO_ID == "0") { cont_sininformar++; botones = "<a class='btn' onclick='Audio(" + dato.TurnoDetalleId + ", " + dato.IMG_TURNO_ID + ");' title='Audio'>A</a><a class='btn' onclick='AbrirArya(" + dato.TurnoDetalleId + ", " + dato.IMG_TURNO_ID + ")' title='Abrir Arya'>A</a>"; }
                    if (dato.IMG_INFORME_ESTADO_ID == "0") { cont_sininformar++; botones = "<a class='btn' onclick='AbrirArya(" + dato.TurnoDetalleId + ", " + dato.IMG_TURNO_ID + ")' title='Abrir Arya'>A</a>"; }
                    if (dato.IMG_INFORME_ESTADO_ID == "10") { cont_audio++; color = "class='audio';"; botones = "<a onclick='Desgrabar(" + dato.TurnoDetalleId + ", " + dato.IMG_TURNO_ID + ");' class='btn' title='Desgrabar'>D</a><a onclick='Corregir(" + dato.TurnoDetalleId + "," + dato.IMG_TURNO_ID + ");' class='btn' title='Corregir'>C</a>"; }
                    if (dato.IMG_INFORME_ESTADO_ID == "20") { cont_desgrabado++; color = "class='desgrabado';"; botones = "<a onclick='Corregir(" + dato.TurnoDetalleId + "," + dato.IMG_TURNO_ID + ");' class='btn' title='Corregir'>C</a><a onclick='Validar(" + dato.TurnoDetalleId + "," + dato.IMG_TURNO_ID + ");' class='btn' title='Validar'>V</a><a style='margin-left:5px;' class='manito' onclick='Imprimir(" + dato.TurnoDetalleId + ");' title='Imprimir'><img src='logoPdf.gif' /></a>"; }
                    //if (dato.IMG_INFORME_ESTADO_ID == "30") { cont_corregido++; color = "class='corregido';"; botones = "<a class='btn' onclick='Audio(" + dato.TurnoDetalleId + ", " + dato.IMG_TURNO_ID + ");' title='Audio'>A</a><a class='btn'  onclick='Desgrabar(" + dato.TurnoDetalleId + "," + dato.IMG_TURNO_ID + ");' title='Desgrabar'>D</a><a style='margin-left:5px;' class='manito' onclick='Imprimir(" + dato.TurnoDetalleId + ");' title='Imprimir'><img src='logoPdf.gif' /></a>"; }
                    if (dato.IMG_INFORME_ESTADO_ID == "30") { cont_corregido++; color = "class='corregido';"; botones = "<a class='btn' onclick='AbrirArya(" + dato.TurnoDetalleId + ", " + dato.IMG_TURNO_ID + ");' title='Abrir Arya'>A</a><a class='btn'  onclick='Desgrabar(" + dato.TurnoDetalleId + "," + dato.IMG_TURNO_ID + ");' title='Desgrabar'>D</a><a style='margin-left:5px;' class='manito' onclick='Imprimir(" + dato.TurnoDetalleId + ");' title='Imprimir'><img src='logoPdf.gif' /></a>"; }
                    if (dato.IMG_INFORME_ESTADO_ID == "40") { cont_validado++; color = "class='validado';"; botones = "<a onclick='Modificar(" + dato.TurnoDetalleId + "," + dato.IMG_TURNO_ID + ");' class='btn' title='Modificar'>M</a><a style='margin-left:5px;' class='manito' onclick='Imprimir(" + dato.TurnoDetalleId + ");' title='Imprimir'><img src='logoPdf.gif' /></a>"; }

                    Auxi = Auxi + "<tr " + color + "><td>" + dato.IMG_TURNO_FECHA + "</td><td>" + dato.IMG_TURNO_TIPO + "</td><td><input type='checkbox' class='cb_estudio' onclick='ActualizarListadoEnviar();' data-estudio='" + dato.IMG_TURNO_ID + "-" + dato.TurnoDetalleId + "' />" + dato.IMG_TURNO_ID + "</td><td>" + dato.apellido + "</td><td>" + dato.Medico + "</td><td>" + dato.estudios + "</td><td>" + LinkImg + "</td><td>" + LinkCom + "</td><td>" + dato.MI + "</td><td>" + dato.MV + "</td><td>" + dato.IMG_INFORME_ESTADO_DESCRIPCION + "</td><td>" + botones + "</td></tr>";
                });
                $("#tabla_atencion").html(Auxi);

                var spanes = $('span');
                var total = Number(cont_sininformar) + Number(cont_audio) + Number(cont_desgrabado) + Number(cont_corregido) + Number(cont_validado);
                spanes.filter('.todos').html("Todos (" + total + ")");
                spanes.filter('.sininformar').html("Sin Informar (" + cont_sininformar + ")");
                spanes.filter('.audio').html("Audio (" + cont_audio + ")");
                spanes.filter('.desgrabado').html("Desgrabado (" + cont_desgrabado + ")");
                spanes.filter('.corregido').html("Corregir (" + cont_corregido + ")");
                spanes.filter('.validado').html("Validado (" + cont_validado + ")");



                VerLista(listando);
            },
            error: errores
        });
    };


    function AbrirArya(TurnoDetalleId, IMG_TURNO_ID) {

        var cantidad = 0;
        var T_ID = "";
        var TodosIguales = true;
        $('.cb_estudio').each(function () {
            if (this.checked) {
                if (T_ID == "") { T_ID = $(this).data("estudio").split("-")[0]; }
                if (T_ID != $(this).data("estudio").split("-")[0]) { TodosIguales = false; }                
                cantidad++;
            }
        });

        if (!TodosIguales) {
            ActualizarMensaje("Diferentes Turnos", "No se puede hacer multiple seleccion con diferentes números de turnos.");
            return;
        }



        if ($("#cbo_Medico_Validar").val() != "0") {        
        
        var json = JSON.stringify({
            "TurnoDetalleId": TurnoDetalleId
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/OBTENER_NA_X_TURNODETALLEID",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Datos = Resultado.d;
                console.log(Datos);
                if (Datos == "") {
                    ActualizarMensaje("Estudio no encontrado", "No se ha encontrado un estudio vinculado al estudio solicitado, revise manualmente si el paciente posee el estudio realizado en el Arya.");
                }

                if (cantidad > 0) {
                    var Datos = "";
                    $('.cb_estudio').each(function () {
                        if (this.checked) {
                            Datos = Datos + $(this).data("estudio") + ",";
                        }
                    });
                    Audio_Lista(TurnoDetalleId, IMG_TURNO_ID, Datos);
                }
                else {
                    Audio(TurnoDetalleId, IMG_TURNO_ID);
                }
                window.location = "com.pixeon.launch://10.10.8.169:80/arya?login=rayos&password=rayos&PatientId=&AccessionNumber=" + Datos;
            },
            error: errores
        });

    }
    else {
        ActualizarMensaje("¿Médico?", "Falta seleccionar el médico a informar");
        return;
    }

    }

    function Imprimir(Id) {
        $.fancybox(
        {
            'autoDimensions': false,
            //'href': '../Impresiones/Impresiones_IMG/IMG_Informe.aspx?TurnoId=' + Id,
            'href': '../Impresiones/Impresiones_IMG/IMG_Informe_html.aspx?TurnoId=' + Id,            
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                //window.location.href = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
            }
        });
    }


    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        ActualizarMensaje("Error", jsonObj.Message);
    }


    function ActualizarMensaje(Titulo, Mensaje) {
        $("#Mensaje_Titulo").html(Titulo);
        $("#Mensaje_Mensaje").html(Mensaje);
        $("#Mensaje_Div").show();
    }


    $("#btn_buscar").click(function () {
        if ($("#ck_mostrarsolopacientesdelmedico").is(':checked') && ($("#cbo_Medico_Validar").val() == 0)) {
            ActualizarMensaje("¿Médico?", "Falta seleccionar médico para filtrar.");
        }
        else {
            INFORME_LISTA_PACIENTES();
        }
    });

    $("#Mensaje_btn_Aceptar").click(function () { $("#Mensaje_Div").hide(); });


//    function Audio(TurnoId) {
//        if ($("#cbo_Medico_Validar").val() != "0") {
//            desgrabando = false;
//            CambiarEstado(TurnoId, 10);
//        }
//        else {
//            ActualizarMensaje("¿Médico?", "Falta seleccionar el médico a informar");
//            return;
//        }
//    }


    

    desgrabando = false;
    function Desgrabar(TurnoPractica, TurnoCabecera) {

        var cantidad = 0;       
        $('.cb_estudio').each(function () {
            if (this.checked) {                
                cantidad++;
            }
        });

        if (cantidad > 0) {
            ActualizarMensaje("Destilde los items marcados", "No se permite que al desgrabar haya items seleccionados.");            
            return;
        }

        desgrabando = true;
        ListarAudios_CBO(TurnoPractica);
        //CambiarEstado(TurnoId, 20);
        TurnoCargado = TurnoPractica;
        Cargar_Titulo();
        CargarInforme(TurnoPractica, TurnoCabecera);        
        $("#CargaDeInforme_Titulo").html("Cargar Informe");
        $("#CargaDeInforme_Div").show();
        $("#btn_desvalidar").hide();
    }

    function Corregir(TurnoPractica, TurnoCabecera) {
        desgrabando = false;

        var cantidad = 0;
        var Datos = "";
        $('.cb_estudio').each(function () {
            if (this.checked) {
                Datos = Datos + $(this).data("estudio") + ",";
                cantidad++;
            }
        });


        if (cantidad == 0) {
            CambiarEstado(TurnoPractica, 30);
        }
        else {
            CambiarEstado_Lista(Datos, 30);                             
        }
    }

    function Modificar(TurnoPractica, TurnoCabecera) {
        if ($("#cbo_Medico_Validar").val() == "0") {
            ActualizarMensaje("¿Médico?", "Falta seleccionar el médico que lo valida.");
        }
        else {

            var cantidad = 0;
            var T_ID = "";
            var TodosIguales = true;
            $('.cb_estudio').each(function () {
                if (this.checked) {
                    if (T_ID == "") { T_ID = $(this).data("estudio").split("-")[0]; }
                    if (T_ID != $(this).data("estudio").split("-")[0]) { TodosIguales = false; }
                    cantidad++;
                }
                // el id del turno para saber a que afiliado enviar email al guardar
                turnoParaEmail = TurnoCabecera;
                turnoParaInforme = TurnoPractica;
            });

            if (!TodosIguales) {
                ActualizarMensaje("Diferentes Turnos", "No se puede hacer multiple seleccion con diferentes números de turnos.");
                return;
            }

            if (cantidad == 0) {
                ListarAudios_CBO(TurnoPractica);
                desgrabando = false;
                TurnoCargado = TurnoPractica;
                Cargar_Titulo();
                CargarInforme(TurnoPractica, TurnoCabecera);
                $("#CargaDeInforme_Titulo").html("Cargar Informe");
                $("#CargaDeInforme_Div").show();
                $("#btn_desvalidar").show();
            }
            else {

                var Datos = "";
                $('.cb_estudio').each(function () {
                    if (this.checked) {
                        Datos = Datos + $(this).data("estudio") + ",";
                    }
                });

                CambiarEstado_Lista(Datos, 20);
                desgrabando = false;
            }
        } 
    }


    function Validar(TurnoPractica, TurnoCabecera) {
        if ($("#cbo_Medico_Validar").val() == "0") {
            ActualizarMensaje("¿Médico?", "Falta seleccionar el médico que lo valida.");
        }
        else {

            var cantidad = 0;
            var T_ID = "";
            var TodosIguales = true;
            $('.cb_estudio').each(function () {
                if (this.checked) {
                    //if (T_ID == "") { T_ID = $(this).data("estudio").split("-")[0]; }
                    //if (T_ID != $(this).data("estudio").split("-")[0]) { TodosIguales = false; }
                    cantidad++;
                }
            });

            //if (!TodosIguales) {
            //    ActualizarMensaje("Diferentes Turnos", "No se puede hacer multiple seleccion con diferentes números de turnos.");
            //    return;
            //}

            if (cantidad == 0) {
                ListarAudios_CBO(TurnoPractica);
                desgrabando = false;
                TurnoCargado = TurnoPractica;
                Cargar_Titulo();
                CargarInforme(TurnoPractica, TurnoCabecera);
                $("#CargaDeInforme_Titulo").html("Cargar Informe");
                $("#CargaDeInforme_Div").show();
                $("#btn_desvalidar").show();
            }
            else {

                var Datos = "";
                $('.cb_estudio').each(function () {
                    if (this.checked) {
                        Datos = Datos + $(this).data("estudio") + ",";
                    }
                });

                CambiarEstado_Lista(Datos, 40);                
                desgrabando = false;                   
            }
        }
    }

    function Desvalidar() {
        desgrabando = false;
        CambiarEstado(TurnoCargado, 20);
        CerrarInforme();
    }


    function CambiarEstado_Lista(Lista, Estado) {
        var json = JSON.stringify({
            "Listado": Lista,
            "Estado": Estado,
            "MedicoInforma": $("#cbo_Medico_Validar :selected").val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/INFORME_CAMBIAR_PRACTICA_ESTADO_LISTA",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                // ENVIAR CORREO
               $("#btn_buscar").click();
            },
            error: errores
        });
    }

    function CambiarEstado(Turno, Estado) {
        var json = JSON.stringify({
            "TurnoId": Turno, "Estado": Estado, "MedicoInforma": $("#cbo_Medico_Validar :selected").val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/INFORME_CAMBIAR_PRACTICA_ESTADO",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#btn_buscar").click();
            },
            error: errores
        });
    };

    </script>

    
    <script src="../tinymce/jquery.tinymce.min.js" type="text/javascript"></script>
    <script src="../tinymce/tinymce.min.js" type="text/javascript"></script>

    <script>
         var Especialidad = 0;

         function Cargar_Titulo() {
             var json = JSON.stringify({ "ESPECIALIDAD_ID": $("#cbo_especialidad :selected").val() });
             $.ajax({
                 type: "POST",
                 url: "../Json/Imagenes/Imagenes.asmx/INFORME_CARGAR_TITULOS",
                 data: json,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: Titulos_Cargados,
                 error: errores
             });

         }


         function Titulos_Cargados(Resultado) {
             var Medicos = Resultado.d;
             $('#cbo_plantilla').empty();
             $('#cbo_plantilla').append('<option value="0">Seleccione Plantilla</option>');
             $.each(Medicos, function (index, medicos) {
                 $('#cbo_plantilla').append($('<option></option>').val(medicos.ID).html(medicos.TITULO));
             });
         }

         function errores(msg) {
             var jsonObj = JSON.parse(msg.responseText);
             ActualizarMensaje("Error", jsonObj.Message);
         }

         

         function CargarPlantilla() {
             
             id = $("#cbo_plantilla :selected").val();
             $("#text_contenido").html("");
             var json = JSON.stringify({ "PLANTILLAID": id });
             tinymce.activeEditor.setContent("");
             $.ajax({
                 type: "POST",
                 url: "../Json/Imagenes/Imagenes.asmx/CARGAR_INFORME_DETALLE",
                 data: json,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (Resultado) {
                     DATO = Resultado.d;                     
                     tinymce.activeEditor.setContent(DATO.INFORME);                     
                 },
                 error: errores
             });
         }

                 
         function CargarInforme(TurnoId, Cabecera) {
             var json = JSON.stringify({ "TurnoId": TurnoId });
                tinymce.activeEditor.setContent("");
                $.ajax({
                    type: "POST",
                    url: "../Json/Imagenes/Imagenes.asmx/CARGAR_INFORME_PRACTICA",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (Resultado) {
                        DATO = Resultado.d;
                        if (DATO.INFORME != null) {
                            tinymce.activeEditor.setContent(DATO.INFORME);
                        }
                        CargarTurnoxId(Cabecera);
                        CargarMedicoInforma(TurnoId);
                    },                    
                    error: errores
                });
             }



         var TurnoCargado = 0;
         function GuardarInforme() {
             INFORME = $("#text_contenido_ifr").contents().find("#tinymce").html();
             var json = JSON.stringify({ "TurnoId": TurnoCargado, "estado": 40, "informe": INFORME });
             $.ajax({
                 type: "POST",
                 url: "../Json/Imagenes/Imagenes.asmx/INFORME_PRACTICA_GUARDAR",
                 data: json,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (Resultado) {
                     ActualizarMensaje("Guardado", "Se ha guardado el informe.");
                     if (desgrabando) {
                         CambiarEstado(TurnoCargado, 20);
                     }
                     else {
                         CambiarEstado(TurnoCargado, 40);
                     }
                     window.open('../Mail.aspx?id=' + turnoParaEmail + "&id2=" + turnoParaInforme);                        
                     CerrarInforme();
                 },
                 error: errores
             });
         }




         $(document).ready(function () {
             tinymce.init({
                 selector: 'textarea',
                 plugins: ["paste", "nonbreaking", "table"],
                 paste_as_text: true,
                 nonbreaking_force_tab: true,
                 menubar: false,
                 force_br_newlines: true,
                 force_p_newlines: false,
                 forced_root_block: '',
                 height: 150,
                 browser_spellcheck: true,
                 toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist | table',
                 onPostRender: function () {
                     // Select the second item by default
                     //this.value('&nbsp;<em>Some italic text!</em>');                     
                 },
                 content_css: ['../tinymce/skins/lightgray/content.min.css']
             });
         });


         function CargarTurnoxId(Turno_Id) {
             //Cargar turnos...

             var json = JSON.stringify({
                 "TurnoId": Turno_Id
             });

             $.ajax({
                 type: "POST",
                 data: json,
                 url: "../Json/Imagenes/Imagenes.asmx/IMG_Turno_Info",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (Resultado) {
                     var dato = Resultado.d;
                     $("#span_medico_informa").html("");
                     $("#span_carga_paciente").html("Paciente: <b>" + dato.Paciente + "</b>");                     
                 },
                 error: errores
             });
         }


         function CargarMedicoInforma(Turno_Id) {
             //Cargar turnos...

             var json = JSON.stringify({
                 "TurnoDetalleId": Turno_Id
             });
             $("#span_medico_informa").html("");
             $.ajax({
                 type: "POST",
                 data: json,
                 url: "../Json/Imagenes/Imagenes.asmx/IMG_INFORME_MEDICOVALIDA_X_ID",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (Resultado) {
                     var dato = Resultado.d;
                     if (dato != "") {
                         $("#span_medico_informa").html("Médico Informa: <b>" + dato + "</b>");
                     }
                 },
                 error: errores
             });
         }


         function CerrarInforme() {
             $("#CargaDeInforme_Div").hide();
         }


         $("#txt_fecha_desde").datepicker();
         $("#txt_fecha_hasta").datepicker();

         var listando = 0;
         function VerLista(Cual) {
             listando = Cual;
             var rows = $('table tr');
             var sininformar = rows.filter('.sininformar');
             var audio = rows.filter('.audio');
             var desgrabado = rows.filter('.desgrabado');
             var corregido = rows.filter('.corregido');
             var validado = rows.filter('.validado');

             //0 Todos
             if (Cual == 0) {
                 sininformar.show();
                 audio.show();
                 desgrabado.show();
                 corregido.show();
                 validado.show();
                 $(".cb_estudio").hide();
             }

             //1 Sin Validar
             if (Cual == 1) {
                 sininformar.show();
                 audio.hide();
                 desgrabado.hide();
                 corregido.hide();
                 validado.hide();
                 $(".cb_estudio").show();
             }

             //2 audio
             if (Cual == 2) {
                 sininformar.hide();
                 audio.show();
                 desgrabado.hide();
                 corregido.hide();
                 validado.hide();
                 $(".cb_estudio").show();
             }

             //3 desgrabado
             if (Cual == 3) {
                 sininformar.hide();
                 audio.hide();
                 desgrabado.show();
                 corregido.hide();
                 validado.hide();
                 $(".cb_estudio").show();
             }

             //4 corregido
             if (Cual == 4) {
                 sininformar.hide();
                 audio.hide();
                 desgrabado.hide();
                 corregido.show();
                 validado.hide();
                 $(".cb_estudio").show();
             }

             //5 validado
             if (Cual == 5) {
                 sininformar.hide();
                 audio.hide();
                 desgrabado.hide();
                 corregido.hide();
                 validado.show();
                 $(".cb_estudio").show();
             }
         }

         parent.document.getElementById("DondeEstoy").innerHTML = "Imágenes > <strong>Cargar Informes</strong>";

         function CargarListaDeEspecialidades() {
             var json = JSON.stringify({ "PracticaId": 0, "EspecialidadId": 0 });
             $.ajax({
                 type: "POST",
                 url: "../Json/Imagenes/Imagenes.asmx/Imagenes_Especialidades",
                 data: json,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: Especialidades_Listadas,
                 error: errores
             });
         }

         function Especialidades_Listadas(Resultado) {
             var lista = Resultado.d;
             $('#cbo_especialidad').append($('<option>', { value: 0, text: "Seleccione Especialidad" }));
             $.each(lista, function (index, dato) {
                 $('#cbo_especialidad').append($('<option>', { value: dato.Id, text: dato.Especialidad }));
             });
         }



         $("#cbo_especialidad").change(function () {
             Cargar_Medicos_por_Especialidad($("#cbo_especialidad :selected").val(), "A");
         });

         function Cargar_Medicos_por_Especialidad(Especialidad, Tipo) {
             var json = JSON.stringify({ "Especialidad": $("#cbo_especialidad").val(), "Tipo": "A", "TLC": 0 });
             $.ajax({
                 type: "POST",
                 url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivosTipo",
                 data: json,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: Medicos_por_Especialidad_Cargados,
                 error: errores
             });

         }

         function Medicos_por_Especialidad_Cargados(Resultado) {
             var Medicos = Resultado.d;
             $('#cbo_Medico').empty();
             $('#cbo_Medico').append('<option value="0">TODOS</option>');
             $.each(Medicos, function (index, medicos) {
                 $('#cbo_Medico').append($('<option></option>').val(medicos.Id).html(medicos.Medico));
             });
         }




         //url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivosTipo",
         function Cargar_Todos_Los_Medicos() {             
             $.ajax({
                 type: "POST",                 
                 url: "../Json/Imagenes/Imagenes.asmx/IMG_MEDICO_CON_FIRMA_LISTAR",                 
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: TodosLosMedicos_Cargados,
                 error: errores
             });

         }

         function TodosLosMedicos_Cargados(Resultado) {
             var Medicos = Resultado.d;
             $('#cbo_Medico_Validar').empty();
             $('#cbo_Medico_Validar').append('<option value="0">Seleccione un médico</option>');   
             $.each(Medicos, function (index, medicos) {
                 $('#cbo_Medico_Validar').append($('<option></option>').val(medicos.ID).html(medicos.TITULO));
             });
         }

         Cargar_Todos_Los_Medicos();

         CargarListaDeEspecialidades();

         var IMGTurnoDetalleID = 0;
         var IMGTurnoID = 0;

         function Audio(TurnoDetalleId, IMG_TURNO_ID) {
             if ($("#cbo_Medico_Validar").val() != "0") {
                 CambiarEstado(TurnoDetalleId, 10);
                 ListarAudios(TurnoDetalleId) 
                 IMGTurnoDetalleID = TurnoDetalleId;
                 IMGTurnoID = IMG_TURNO_ID; 
                 desgrabando = false;                 
                 //TurnoCargado = TurnoPractica;                 
                 //CargarInforme(TurnoPractica, TurnoCabecera);                 
                 $("#Audio_DIV").show();                                  
             }
             else {
                 ActualizarMensaje("¿Médico?", "Falta seleccionar el médico a informar");
                 return;
             }
         }


         function Audio_Lista(TurnoDetalleId, IMG_TURNO_ID, Lista) {
             if ($("#cbo_Medico_Validar").val() != "0") {
                 CambiarEstado_Lista(Lista, 10);                 
                 IMGTurnoDetalleID = TurnoDetalleId;
                 IMGTurnoID = IMG_TURNO_ID;
                 desgrabando = false;                 
                 $("#Audio_DIV").show();
             }
             else {
                 ActualizarMensaje("¿Médico?", "Falta seleccionar el médico a informar");
                 return;
             }
         }


         function SubirAudio() {
             var fileUpload = $("#Audio_Archivo").get(0);
             var files = fileUpload.files;

             var data = new FormData();
             for (var i = 0; i < files.length; i++) {
                 data.append(files[i].name, files[i]);
             }

             var TurnoId = IMGTurnoID;
             var DetalleID = IMGTurnoDetalleID;

             $.ajax({
                 url: "SubirAudio.ashx?TurnoId=" + TurnoId + "&DetalleID=" + DetalleID,
                 type: "POST",
                 data: data,
                 contentType: false,
                 processData: false,
                 success: function (result) {
                     $("#Audio_Archivo").val('');
                     ListarAudios(DetalleID);
                     TurnoId = 0;
                     DetalleID = 0;
                     ActualizarMensaje("Audio Subido", "Audio Actualizado");
                 },
                 error: function (err) {
                     ActualizarMensaje("Error", err);
                 }
             });
         }


         $("#Audio_Subir").click(function () {
             SubirAudio();
         });

         $("#Audio_Aceptar").click(function () {
             $("#Audio_DIV").hide();
         });

         
         


         function ListarAudios(TURNO_DETALLE_ID) {
             var json = JSON.stringify({ "TURNO_DETALLE_ID": TURNO_DETALLE_ID });
             $.ajax({
                 type: "POST",
                 url: "../Json/Imagenes/Imagenes.asmx/IMG_AUDIO_LISTAR",
                 data: json,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (Resultado) {
                     $("#Audio_Contenido").html("");
                     var Audios = Resultado.d;
                     var Auxi = "<table class='table'><tr><td></td><td>Audio</td><td>ID</td><td>Fecha</td></tr>";
                     $('#cbo_audio').empty();
                     $.each(Audios, function (index, audio) {
                         ElAudio = "<audio controls><source src='" + audio.Ruta + "' type='audio/wav'>El Navegador no soporta el audio.</audio>";                         
                         Auxi = Auxi + "<tr><td><a class='btn' onclick='Audio_Eliminar(" + audio.Audio_ID + "," + TURNO_DETALLE_ID + ");' >Eliminar</a></td><td>" + ElAudio + "</td><td>" + audio.Audio_ID + "</td><td>" + audio.Fecha + "</td></tr>";
                     });
                     Auxi = Auxi + "</table>";
                     $("#Audio_Contenido").html(Auxi);
                 },
                 error: errores
             });

         }




         function ListarAudios_CBO(TURNO_DETALLE_ID) {
             var json = JSON.stringify({ "TURNO_DETALLE_ID": TURNO_DETALLE_ID });
             $.ajax({
                 type: "POST",
                 url: "../Json/Imagenes/Imagenes.asmx/IMG_AUDIO_LISTAR",
                 data: json,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (Resultado) {                     
                     var Audios = Resultado.d;
                     $('#cbo_audio').empty();
                     $('#cbo_audio').append($('<option></option>').val("").html("Seleccione un audio"));                         
                     $.each(Audios, function (index, audio) {
                         ElAudio = "<audio controls><source src='" + audio.Ruta + "' type='audio/wav'>El Navegador no soporta el audio.</audio>";
                         $('#cbo_audio').append($('<option></option>').val(audio.Ruta).html(audio.Fecha + " - " + audio.Audio_ID));                         
                     });                                          
                 },
                 error: errores
             });

         }





         function Audio_Eliminar(AudioID, DetalleID) {
             var json = JSON.stringify({ "ID": AudioID });
             $.ajax({
                 type: "POST",
                 url: "../Json/Imagenes/Imagenes.asmx/IMG_AUDIO_ELIMINAR",
                 data: json,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (Resultado) {
                     ListarAudios(DetalleID);                     
                     ActualizarMensaje("Audio Eliminado", "El Audio ha sido eliminado");
                 },
                 error: errores
             });
         }


         $("#cbo_audio").change(function () {
             $("#audio_cargado").attr("src", $("#cbo_audio").val());
         });


         function ActualizarListadoEnviar() {
            var Datos = "";
            $('.cb_estudio').each(function () {
                if (this.checked) {                    
                    Datos = Datos + $(this).data("estudio") + ",";
                }
            });
            //alert(Datos);          
        }

        $("#Audio_EstadoAnterior").click(function () {
            var DetalleID = IMGTurnoDetalleID;
            CambiarEstado(DetalleID, 0);
            $("#Audio_DIV").hide();
        });

//        function enviarEmail() {
//            $("#btnEnviarCorreo").click();
//        }

    </script>
    <asp:Literal ID="scriptliteral" runat="server"></asp:Literal>
    <input id="ipConfiguracion" runat="server" type="hidden"/>   

    </form>
</body>
</html>
