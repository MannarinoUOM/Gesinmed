<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Informe_Cargar.aspx.cs" Inherits="Imagenes_Turno_Informe_Cargar" %>

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
.audio {background-color: #9F8DE5;}
.desgrabado {background-color: #A72B9C;}
.corregido {background-color: #A7932B;}
.validado {background-color: #5AA72B;}

table .btn {margin-bottom: 0px;}

</style>

<body>
    <form id="form1" runat="server">
    
    <div>
        <div class="Contenedor_Info_Medico well">
            <select id="cbo_especialidad">
            </select>        
            <br />
            <input type="text" class="span2" id="txt_fecha_desde" /><input type="text" class="span2" style="margin-left: 10px;" id="txt_fecha_hasta" /><a id="btn_buscar" class="btn btn-info" style="margin-left:10px;">Buscar</a>
        
        
            <br />
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
            <tr><th>Fecha</th><th>Nro. Turno</th><th>Paciente</th><th>Médico</th></th><th>Escaneado</th><th>Estado</th><th></th></tr>            
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
    <div>
        <select id="cbo_plantilla"></select><a class="btn" onclick="CargarPlantilla();">Cargar Plantilla</a>
        <a class="btn" onclick="GuardarInforme();">Guardar</a>
        <a class="btn" onclick="CerrarInforme();">Cancelar</a>
        <a class="btn" id="btn_desvalidar" style="display:none;" onclick="Desvalidar();">Desvalidar</a>
        
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
    function VerEscaneado(TurnoId) {
        var json = JSON.stringify({
            "TurnoId": TurnoId
        });

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
                    Auxi = Auxi + "<div style='overflow:auto; max-height:400px;'><div style='border:1px; border-style:solid;margin-bottom:20px;'><a href='http:\\\\10.10.8.71\\" + dato.Archivo + "' target='_blank'><img src='http:\\\\10.10.8.71\\" + dato.Archivo + "' style='width:460px;'/></a></div></div";
                });
                ActualizarMensaje("Escaneado", Auxi);
            },
            error: errores
        });
    };





    function INFORME_LISTA_PACIENTES() {
        var json = JSON.stringify({
            "EspecialidadId": $("#cbo_especialidad :selected").val(), "DiaInicio": $("#txt_fecha_desde").val(), "DiaFin": $("#txt_fecha_hasta").val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/H2_IMG_INFORME_LISTA_PACIENTES",
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
                    if (dato.Escaneado) {
                        LinkImg = "<a onclick='VerEscaneado(" + dato.IMG_TURNO_ID + ");'>Ver</a>";
                    }

                    botones = "";

                    color = "class='sininformar';";

                    if (dato.IMG_INFORME_ESTADO_ID == "0") { cont_sininformar++; botones = "<a class='btn' onclick='Audio(" + dato.IMG_TURNO_ID + ");' title='Audio'>A</a>"; }
                    if (dato.IMG_INFORME_ESTADO_ID == "10") { cont_audio++; color = "class='audio';"; botones = "<a onclick='Desgrabar(" + dato.IMG_TURNO_ID + ");' class='btn' title='Desgrabar'>D</a><a onclick='Corregir(" + dato.IMG_TURNO_ID + ");' class='btn' title='Corregir'>C</a>"; }
                    if (dato.IMG_INFORME_ESTADO_ID == "20") { cont_desgrabado++; color = "class='desgrabado';"; botones = "<a onclick='Corregir(" + dato.IMG_TURNO_ID + ");' class='btn' title='Corregir'>C</a><a onclick='Validar(" + dato.IMG_TURNO_ID + ");' class='btn' title='Validar'>V</a><a style='margin-left:5px;' class='manito' onclick='Imprimir(" + dato.IMG_TURNO_ID + ");' title='Imprimir'><img src='logoPdf.gif' /></a>"; }
                    if (dato.IMG_INFORME_ESTADO_ID == "30") { cont_corregido++; color = "class='corregido';"; botones = "<a class='btn' onclick='Audio(" + dato.IMG_TURNO_ID + ");' title='Audio'>A</a><a class='btn'  onclick='Desgrabar(" + dato.IMG_TURNO_ID + ");' title='Desgrabar'>D</a>"; }
                    if (dato.IMG_INFORME_ESTADO_ID == "40") { cont_validado++; color = "class='validado';"; botones = "<a onclick='Validar(" + dato.IMG_TURNO_ID + ");' class='btn' title='Modificar'>M</a><a style='margin-left:5px;' class='manito' onclick='Imprimir(" + dato.IMG_TURNO_ID + ");' title='Imprimir'><img src='logoPdf.gif' /></a>"; }

                    Auxi = Auxi + "<tr " + color + "><td>" + dato.IMG_TURNO_FECHA + "</td><td>" + dato.IMG_TURNO_ID + "</td><td>" + dato.apellido + "</td><td>"+dato.Medico+"</td><td>" + LinkImg + "</td><td>" + dato.IMG_INFORME_ESTADO_DESCRIPCION + "</td><td>" + botones + "</td></tr>";
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





    function Imprimir(Id) {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Impresiones_IMG/IMG_Informe.aspx?TurnoId=' + Id,
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


    $("#btn_buscar").click(function () { INFORME_LISTA_PACIENTES();  });
    $("#Mensaje_btn_Aceptar").click(function () { $("#Mensaje_Div").hide(); });


    function Audio(TurnoId) {
        desgrabando = false;
        CambiarEstado(TurnoId, 10);
    }

    desgrabando = false;
    function Desgrabar(TurnoId) {
        desgrabando = true;
        //CambiarEstado(TurnoId, 20);
        TurnoCargado = TurnoId;
        Cargar_Titulo();
        CargarInforme(TurnoId);
        $("#CargaDeInforme_Titulo").html("Cargar Informe");
        $("#CargaDeInforme_Div").show();
        $("#btn_desvalidar").hide();
    }

    function Corregir(TurnoId) {
        desgrabando = false;
        CambiarEstado(TurnoId, 30);
    }

    function Validar(TurnoId) {
        desgrabando = false;
        TurnoCargado = TurnoId;
        Cargar_Titulo();
        CargarInforme(TurnoId);
        $("#CargaDeInforme_Titulo").html("Cargar Informe");
        $("#CargaDeInforme_Div").show();
        $("#btn_desvalidar").show();
    }

    function Desvalidar() {
        desgrabando = false;
        CambiarEstado(TurnoCargado, 20);
        CerrarInforme();
    }



    function CambiarEstado(Turno, Estado) {
        var json = JSON.stringify({
            "TurnoId": Turno, "Estado": Estado
        });

        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/INFORME_CAMBIAR_ESTADO",
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

                 
         function CargarInforme(TurnoId) {
             var json = JSON.stringify({ "TurnoId": TurnoId });
                tinymce.activeEditor.setContent("");
                $.ajax({
                    type: "POST",
                    url: "../Json/Imagenes/Imagenes.asmx/CARGAR_INFORME",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (Resultado) {
                        DATO = Resultado.d;
                        if (DATO.INFORME != null) {
                            tinymce.activeEditor.setContent(DATO.INFORME);
                        }
                        CargarTurnoxId(TurnoId);
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
                 url: "../Json/Imagenes/Imagenes.asmx/INFORME_GUARDAR",
                 data: json,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (Resultado) {
                     ActualizarMensaje("Guardado", "Se ha guardado el informe.");
                     if (desgrabando)
                     {
                         CambiarEstado(TurnoCargado, 20);
                     }
                     else
                     {
                        CambiarEstado(TurnoCargado, 40);
                     }
                     CerrarInforme();
                 },
                 error: errores
             });
         }




         $(document).ready(function () {
             tinymce.init({
                 selector: 'textarea',
                 plugins: ["paste", "nonbreaking"],
                 paste_as_text: true,
                 nonbreaking_force_tab: true,
                 height: '100',
                 menubar: false,
                 force_br_newlines: true,
                 force_p_newlines: false,
                 forced_root_block: '',
                 height: 350,
                 browser_spellcheck: true,
                 toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist',
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
                     $("#span_carga_paciente").html("Paciente: <b>" + dato.Paciente + "</b>");
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
             }

             //1 Sin Validar
             if (Cual == 1) {
                 sininformar.show();
                 audio.hide();
                 desgrabado.hide();
                 corregido.hide();
                 validado.hide();
             }

             //2 audio
             if (Cual == 2) {
                 sininformar.hide();
                 audio.show();
                 desgrabado.hide();
                 corregido.hide();
                 validado.hide();
             }

             //3 desgrabado
             if (Cual == 3) {
                 sininformar.hide();
                 audio.hide();
                 desgrabado.show();
                 corregido.hide();
                 validado.hide();
             }

             //4 corregido
             if (Cual == 4) {
                 sininformar.hide();
                 audio.hide();
                 desgrabado.hide();
                 corregido.show();
                 validado.hide();
             }

             //5 validado
             if (Cual == 5) {
                 sininformar.hide();
                 audio.hide();
                 desgrabado.hide();
                 corregido.hide();
                 validado.show();
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

         CargarListaDeEspecialidades();

    </script>
    <asp:Literal ID="scriptliteral" runat="server"></asp:Literal>

    </form>
</body>
</html>
