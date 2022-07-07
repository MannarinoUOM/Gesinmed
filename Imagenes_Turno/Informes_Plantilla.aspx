<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Informes_Plantilla.aspx.cs" Inherits="Imagenes_Turno_Informes_Plantilla" %>

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
            <select id="cbo_especialidad"></select>        
            <br />
            <input type="text" class="span4" maxlength="40" id="txt_titulo" placeholder="Título Informe" /><a id="btn_buscar" class="btn btn-info" style="margin-left:10px;">Crear</a>
            <br />            
         </div>
    </div>

    <div class="well">
    <div class="well" style="display:block; width:97%; height:500px; background-color:#F3EFFD; float:left; max-height: 500px; min-height:500px; overflow:auto; " id="div_listapacientes">
        <table class="table table-condensed">
        <theader>
            <tr><th>Id</th><th>Titulo</th></tr>            
        </theader>
        <tbody id="tabla_informes">
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
            <a class="btn btn-danger" style="display:none;" id="Mensaje_btn_cancelar">Cerrar</a>
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
        <span>Medico: <select id="cbo_medico"></select></span>
        <a class="btn" onclick="GuardarInforme();">Guardar</a>
        <a class="btn" onclick="CerrarInforme();">Cancelar</a>       
        
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
        
        function INFORME_LISTA_PACIENTES() {
            $("#CargaDeInforme_Titulo").html("Cargar Informe");
            $("#CargaDeInforme_Div").show();
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
            if ($("#cbo_especialidad").val() == "0") {
                ActualizarMensaje("Especialidad", "Falta seleccionar la especialidad.");
                return;
            }

            if ($("#txt_titulo").val() == "") {
                ActualizarMensaje("Nombre del informe", "Falta cargar el título del informe.");
                return;
            }
            $("#cbo_medico").val("0");
            $("#CargaDeInforme_Titulo").html($("#txt_titulo").val()); INFORME_LISTA_PACIENTES();

        });
        $("#Mensaje_btn_Aceptar").click(function () { $("#Mensaje_Div").hide(); });
        

    </script>

    
    <script src="../tinymce/jquery.tinymce.min.js" type="text/javascript"></script>
    <script src="../tinymce/tinymce.min.js" type="text/javascript"></script>

    <script>
        var Especialidad = 0;

        var editando = 0;
        function CargarPlantilla(id, este) {
            editando = id;            

            var row = $(este).closest("tr");        
            var tds = row.find("td:nth-child(2)");

            $("#txt_titulo").val(tds.html());
            $("#CargaDeInforme_Titulo").html(tds.html());
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
                    $("#cbo_medico").val(DATO.MEDICOID);
                    tinymce.activeEditor.setContent(DATO.INFORME);
                    $("#CargaDeInforme_Div").show();
                },
                error: errores
            });
        }


        
        function GuardarInforme() {
            INFORME = $("#text_contenido_ifr").contents().find("#tinymce").html();
            var json = JSON.stringify({ "Id": editando, "Titulo": $("#txt_titulo").val(), "Especialidad": $("#cbo_especialidad").val(), "Informe": INFORME, "MedicoID": $("#cbo_medico").val() });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/INFORME_GUARDAR_PLANTILLA",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {                    
                    ActualizarMensaje("Guardado", "Se ha guardado la plantilla.");
                    editando = 0;
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
                height: '100',
                menubar: false,
                force_br_newlines: true,
                force_p_newlines: false,
                forced_root_block: '',
                height: 350,
                browser_spellcheck: true,
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist | table',
                onPostRender: function () {
                    // Select the second item by default
                    //this.value('&nbsp;<em>Some italic text!</em>');                     
                },
                content_css: ['../tinymce/skins/lightgray/content.min.css']
            });
        });


        function CerrarInforme() {
            $("#cbo_medico").val("0");
            $("#CargaDeInforme_Div").hide();
            editando = 0;
        }

        $("#cbo_especialidad").change(function () {
            $("#tabla_informes").empty();
            Cargar_Titulo();
            editando = 0;
        });

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
            var Titulos = Resultado.d;
            datos = "";
            $.each(Titulos, function (index, titulo) {
                datos = datos + "<tr class='manito' onclick='CargarPlantilla(" + titulo.ID + ",  this);'><td>" + titulo.ID + "</td><td>" + titulo.TITULO + "</td></tr>";
            });
            $("#tabla_informes").html(datos);
        }

        parent.document.getElementById("DondeEstoy").innerHTML = "Imágenes > <strong>Edición Plantillas</strong>";

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

        function CargarMedicos() {
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_MEDICO_CON_FIRMA_LISTAR",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    var Medicos = Resultado.d;
                    $('#cbo_medico').empty();
                    $('#cbo_medico').append('<option value="0">Todos</option>');
                    $.each(Medicos, function (index, medicos) {
                        $('#cbo_medico').append($('<option></option>').val(medicos.ID).html(medicos.TITULO));
                    });
                },
                error: errores
            });

            
        }

        CargarListaDeEspecialidades();
        CargarMedicos();

    </script>
    <asp:Literal ID="scriptliteral" runat="server"></asp:Literal>

    </form>
</body>
</html>
