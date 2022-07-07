<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RelacionPracticaIndicaciones.aspx.cs" Inherits="Imagenes_Turno_RelacionPracticaIndicaciones" %>

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

<style>
.active {background-color:Yellow;}
.manito {cursor:pointer;}
</style>

</head>
<body>

<div id="CargaDeInforme_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9998;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:90%; height:80%; border-radius:5px;padding-bottom:10px;">
         <div id="CargaDeInforme_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Edición de Indicaciones</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="CargaDeInforme_Contenido">           
         
         <div>
    <span id="span_carga_paciente" style="font-size:20px;"></span><br />
    <div>        
        <a class="btn" onclick="GuardarPlantilla();">Guardar</a>
        <a class="btn" onclick="CerrarPlantilla();">Cancelar</a>       
        <a class="btn btn-danger" onclick="EliminarPlantilla();">Eliminar</a>       
        
    </div>

    <div>
    <span>TITULO:</span><input type="text" id="txt_titulo" /><br />
    <span>MENOR EDAD:</span><select id="cbo_edad">
        <option value="-1">Todos</option>
        <option value="0">No</option>
        <option value="1">Si</option></select><br />
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


    <form id="form1" runat="server">
    <div>
        <div class="Contenedor_Info_Medico well"><select id="cbo_especialidad"></select>
            <a href='#' id="btn_indicacion_nueva" class='btn btn-info'>Nueva</a>
        </div>
    </div>

    <div class="well">
    <div class="well" style="display:block; width:500px; height:500px; background-color:#F3EFFD; float:left; max-height: 500px; min-height:500px; overflow:auto; " id="div_practicas">
        
    </div>



    <div class="well" style="display:block; width:700px; height:500px; background-color:#F3EFFD; float:left; max-height: 500px; min-height:500px; overflow:auto;" id="div_indicaciones">
        
    </div>

    <div style="clear:both;"></div>

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

    <script src="../tinymce/jquery.tinymce.min.js" type="text/javascript"></script>
    <script src="../tinymce/tinymce.min.js" type="text/javascript"></script>

    <script>

        $("#cbo_especialidad").change(function () {            
                CargarListaDePracticas($("#cbo_especialidad :selected").val());                
        });


        

        function CargarListaDePracticas(EspecialidadId) {
            var json = JSON.stringify({ "PracticaId": 0, "EspecialidadId": EspecialidadId });
            $.ajax({
                type: "POST",
                url: "../Json/Practicas/Practicas.asmx/H2_IMAGENES_PRACTICAS_LISTAR",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Practicas_Listadas,
                error: errores
            });
        }


        var Array_Practicas = Array()
        function Practicas_Listadas(Resultado) {            
            datos = "";
            $("#div_practicas").empty();
            var lista = Resultado.d;
            $.each(lista, function (index, dato) {
                var Objeto_Practicas = {}
                Objeto_Practicas.Practica_Nombre = dato.PracticaNombre;
                Objeto_Practicas.Practica_Id = dato.PracticaCodigo;
                datos = datos + "<div><a class='manito pract_opciones' onclick='Cargar(" + dato.PracticaCodigo + ",this)'>" + dato.PracticaNombre + "</a></div>";
            });
            $("#div_practicas").html(datos);
        }







        var QuePractica = 0;
        function Cargar(Practica, este) {
            $(".pract_opciones").removeClass("active");
            $(este).addClass("active");
            QuePractica = Practica;
            var json = JSON.stringify({ "Practica": Practica });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_PREPARACION_LISTA",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Preparacion_Listadas,
                error: errores
            });
        }


        
        function Preparacion_Listadas(Resultado) {
            datos = "";
            $("#div_indicaciones").empty();
            var lista = Resultado.d;
            $.each(lista, function (index, dato) {
                check = "checked";
                if (!dato.ESTADO) {
                    check = "";
                }
                datos = datos + "<div><input type='checkbox' id='ck_" + dato.ID + "' onclick='CambiarEstado(" + dato.ID + ",this);' value='" + dato.ID + "' " + check + "/><label class='manito' for='ck_" + dato.ID + "' style='display:inline;'>" + dato.TITULO + "</label><a style='color:blue;' class='manito' onclick='CargarIndicacion(" + dato.ID + ")'> Editar</a></div>";
            });
            $("#div_indicaciones").html(datos);
        }

                
        function CambiarEstado(id, este) {
            var json = JSON.stringify({ "Practica": QuePractica, "PreparacionId": id });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_PREPARACION_ACTUALIZAR",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) { 
                },
                error: errores
            });
        }



        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert("Error " + jsonObj.Message);
        }


        parent.document.getElementById("DondeEstoy").innerHTML = "Imágenes > <strong>Indicaciones de Prácticas</strong>";


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



        $("#btn_indicacion_nueva").click(function () {
            EditandoId = 0;
            $("#txt_titulo").val("");
            $("#text_contenido").html("");
            tinymce.activeEditor.setContent("");
            $("#CargaDeInforme_Titulo").html("Nueva Indicación");
            $("#cbo_edad").val("-1");
            $("#CargaDeInforme_Div").show();
        });

        function CerrarPlantilla() {
            EditandoId = 0;
            $("#CargaDeInforme_Div").hide();
        }

        function EliminarPlantilla() {
            var json = JSON.stringify({ "ID": EditandoId });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/INDICACION_BORRAR",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {
                    EditandoId = 0;
                    Recargar();
                    $("#CargaDeInforme_Div").hide();
                },
                error: errores
            });
        }

        var EditandoId = 0;
        function GuardarPlantilla() {
            var EDAD = -1;
            var INFORME = $("#text_contenido_ifr").contents().find("#tinymce").html();
            if ($("#cbo_edad :selected").val() == "1") { EDAD = 1; }
            if ($("#cbo_edad :selected").val() == "0") { EDAD = 0; }
            var json = JSON.stringify({ "ID": EditandoId, "TITULO": $("#txt_titulo").val(), "CONTENIDO": INFORME, "EDAD": EDAD });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/INDICACION_GUARDAR",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {
                    EditandoId = 0;
                    Recargar();
                    $("#CargaDeInforme_Div").hide();
                },
                error: errores
            });
        }



        function Recargar() {
            var json = JSON.stringify({ "Practica": QuePractica });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_PREPARACION_LISTA",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Preparacion_Listadas,
                error: errores
            });
        }



        function CargarIndicacion(IndicacionId) {
            $("#txt_titulo").val("");
            $("#CargaDeInforme_Titulo").html("");
            $("#text_contenido").html("");
            var json = JSON.stringify({ "ID": IndicacionId });
            tinymce.activeEditor.setContent("");
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/INDICACION_CARGAR",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    DATO = Resultado.d;
                    EditandoId = IndicacionId;
                    if (DATO.IMG_MENOR_EDAD == -1) { $("#cbo_edad").val("-1"); }
                    if (DATO.IMG_MENOR_EDAD == 0) { $("#cbo_edad").val("0"); }
                    if (DATO.IMG_MENOR_EDAD == 1) { $("#cbo_edad").val("1"); }

                    $("#txt_titulo").val(DATO.IMG_INFO_TITULO);
                    tinymce.activeEditor.setContent(DATO.IMG_INFO_TEXTO);
                    $("#CargaDeInforme_Div").show();
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
                height: 300,
                browser_spellcheck: true,
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist',
                onPostRender: function () {
                    // Select the second item by default
                    //this.value('&nbsp;<em>Some italic text!</em>');                     
                },
                content_css: ['../tinymce/skins/lightgray/content.min.css']
            });
        });

    </script>

    </form>



</body>
</html>
