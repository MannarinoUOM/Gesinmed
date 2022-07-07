<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RelacionPracticaNomenclador.aspx.cs" Inherits="Imagenes_Turno_RelacionPracticaNomenclador" %>

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
    <form id="form1" runat="server">
    <div>
        
        <div class="Contenedor_Info_Medico well">
            <span>Especialidad: </span><select id="cbo_especialidad"></select>
        </div>
    </div>

    <div class="well">
    <div style="display:block; width:545px; height:30px; background-color:#F3EFFD; float:left;" >
    Prácticas        
    </div>
    <div style="display:block; width:740px; height:30px; background-color:#F3EFFD; float:left;" >
    Prácticas Hospitales    
    </div>

    <div class="well" style="display:block; width:500px; height:500px; background-color:#F3EFFD; float:left; max-height: 500px; min-height:500px; overflow:auto; " id="div_practicas">
        
    </div>
    
    <div class="well" style="display:block; width:700px; height:500px; background-color:#F3EFFD; float:left; max-height: 500px; min-height:500px; overflow:auto;" id="div_nomenclador">
        <div>
        Práctica Nomenclador: <select id="cbo_nomenclador"></select>
        <a onclick='Agregar()' class='btn btn-info'>Agregar</a>
        <br />
        <div class="well" style="display:block; width:90%; height:200px; background-color:#F3EFFD; float:left; max-height: 200px; min-height:200px; overflow:auto; " id="div_practicas_cargadas">
        
        </div>
        </div>
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

    <script>

        $("#cbo_especialidad").change(function () {
            CargarListaDePracticas($("#cbo_especialidad :selected").val());
            CargarNomenclador();
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
                datos = datos + "<div><a class='manito pract_opciones' onclick='Cargar(" + dato.PracticaCodigo + ",this)'>" + dato.PracticaCodigo + "-" + dato.PracticaNombre + "</a></div>";
            });
            $("#div_practicas").html(datos);
        }



              




        var QuePractica = 0;
        function Cargar(Practica, este) {
            $("#div_practicas_cargadas").html("Cargando...");
            $(".pract_opciones").removeClass("active");
            $(este).addClass("active");
            QuePractica = Practica;
            Recargar(Practica);
        }

        function Recargar(Practica) {
            var json = JSON.stringify({ "Especialidad": $("#cbo_especialidad").val(), "Practica": Practica });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_RELACION_PRACTICA_NOMENCLADOR_LISTAR",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: RelacionsCargadas,
                error: errores
            });
        }



        function RelacionsCargadas(Resultado) {
            datos = "";
            $("#div_practicas_cargadas").empty();
            var lista = Resultado.d;
            $.each(lista, function (index, dato) {
                var Objeto_Practicas = {}
                Objeto_Practicas.Practica_Nombre = dato.PracticaNombre;
                Objeto_Practicas.Practica_Id = dato.PracticaCodigo;
                datos = datos + "<div><a class='manito btn btn-danger' onclick='Eliminar(" + dato.ID + ")'>Eliminar</a> " + dato.COD_NOMENCLADOR + "-" + dato.PRACTICA + "</div>";
            });
            $("#div_practicas_cargadas").html(datos);
        }
        


        function Agregar() {
            var id = $("#cbo_nomenclador").val();
            var json = JSON.stringify({ "Practica": QuePractica, "Nomenclador": id, "Especialidad": $("#cbo_especialidad").val() });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_RELACION_PRACTICA_NOMENCLADOR_AGREGAR",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {
                    Recargar(QuePractica);
                },
                error: errores
            });
        }

        function Eliminar(id) {
            var json = JSON.stringify({ "ID": id });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_RELACION_PRACTICA_NOMENCLADOR_ELIMINAR",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {
                    Recargar(QuePractica);
                },
                error: errores
            });
        }


        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert("Error " + jsonObj.Message);
        }


        parent.document.getElementById("DondeEstoy").innerHTML = "Imágenes > <strong>Relación Prácticas con Nomenclador</strong>";


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
            CargarNomenclador();
        }


        function CargarNomenclador() {            
            if ($("#cbo_especialidad :selected").val() != "0") {
                var json = JSON.stringify({ "Especialidad": $("#cbo_especialidad :selected").val() });
                $.ajax({
                    type: "POST",
                    url: "../Json/Imagenes/Imagenes.asmx/IMG_PRACTICAS_X_ESPECIALIDAD",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (Resultado) {
                        $('#cbo_nomenclador').empty();
                        var lista = Resultado.d;
                        $('#cbo_nomenclador').append($('<option>', { value: 0, text: "Seleccione Especialidad" }));
                        $.each(lista, function (index, dato) {
                            $('#cbo_nomenclador').append($('<option>', { value: dato.ID, text: dato.ID + " - " + dato.PRACTICA }));
                        });
                    },
                    error: errores
                });
            }
        }

        CargarListaDeEspecialidades();
        

        



        

    </script>

    </form>



</body>
</html>
