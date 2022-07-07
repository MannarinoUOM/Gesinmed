<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Practica_Duracion.aspx.cs" Inherits="Imagenes_Turno_Practica_Duracion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />

<style>
.modificado {background-color: #B7FDD2}
</style>

</head>
<body>
    <form id="form1" runat="server">
    <div>
    <div id="Contenedor" class="well">
    Especialidad: <select id="cb_especialidad"></select>

    <div style="overflow:auto; max-height:622px;">
    <table class="table table-condensed">
    <tr><td>Código</td><td>Práctica</td><td>Duración</td><td>Abreviación</td><td>Se Informa</td></tr>
    <tbody id="Tabla">
               
    </tbody>
    </table>
    </div>

    <div>
        <a class="btn btn-info" onclick="Guardar();">Guardar</a> <a href="Practica_Duracion.aspx" class="btn btn-danger" style="margin-right:5px;">Cancelar</a>
    </div>

    </div>
    </div>

    </form>
</body>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.validate.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>


<script>
    $("#Tabla input").live("change",function () {
        $(this).parent().parent().addClass("modificado");
    });

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
        $('#cb_especialidad').append($('<option>', { value: 0, text: "Seleccione Especialidad" }));
        $.each(lista, function (index, dato) {
            $('#cb_especialidad').append($('<option>', { value: dato.Id, text: dato.Especialidad }));
        });
    }

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert("Error", jsonObj.Message);
    }


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

        
    function Practicas_Listadas(Resultado) {        
        $("#Tabla").empty();
        var lista = Resultado.d;        
        var registro = "";
        $.each(lista, function (index, dato) {
            var seInforma = "";
            if (dato.SeInforma) { seInforma = "checked"; }

            registro = registro + "<tr><td>" + dato.PracticaCodigo + "</td><td>" + dato.PracticaNombre + "</td><td><input style='width:20px;' type='text' class='duracion' id='txt_" + dato.PracticaCodigo + "' value='" + dato.PracticaDuracion + "' /></td><td><input style='width:200px;' type='text' class='abreviacion' id='txt_abre_" + dato.PracticaCodigo + "' value='" + dato.Abreviacion + "' /></td> <td><input style='width:20px;' type='checkbox' class='informa' id='txt_informa_" + dato.PracticaCodigo + "' " + seInforma + " /></td> </tr>";

            $('#cbo_practica_nombre').append($('<option>', { value: dato.PracticaCodigo, text: dato.PracticaNombre }));
        });

        $("#Tabla").html(registro);

    }



    CargarListaDeEspecialidades();
    $("#cb_especialidad").change(function () {
        CargarListaDePracticas($("#cb_especialidad").val());
    });


    function Guardar() {
        
        var Array_Practicas = [];        

        $('.modificado input[type=text]').each(function () {
            if ($(this).hasClass("duracion") || $(this).hasClass("indicacion") || $(this).hasClass("informa")) {
                var Objeto_Practicas = {};
                var ss = $(this).attr('id').replace("txt_", "").replace("abre_", "").replace("informa_", "");

                Objeto_Practicas.PracticaCodigo = ss;
                Objeto_Practicas.PracticaDuracion = $("#txt_" + ss).val();
                Objeto_Practicas.Abreviacion = $("#txt_abre_" + ss).val();
                Objeto_Practicas.SeInforma = $("#txt_informa_" + ss).is(":checked");                
                Array_Practicas.push(Objeto_Practicas);
            }                       

        });

      

        var json = JSON.stringify({ "Practicas": Array_Practicas, "EspecialidadId": $("#cb_especialidad").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/H2_IMG_Practica_Duracion_Actualizar_2",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                alert("Prácticas actualizadas");
            },
            error: errores
        });
    }









    parent.document.getElementById("DondeEstoy").innerHTML = "Imágenes > <strong>Modificar duración de prácticas</strong>";

</script>

</html>
