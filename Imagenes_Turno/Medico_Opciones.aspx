<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Medico_Opciones.aspx.cs" Inherits="Imagenes_Turno_Medico_Opciones" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />


<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />

<style>
.modificado {background-color: #B7FDD2}
.btn {margin-bottom: 5px;}


</style>

</head>
<body>
    <form id="form1" runat="server">    
        <div id="Contenedor" class="well">
        
        <div>
        Especialidad: <select id="cb_especialidad"></select> 
        <span style="margin-left:20px;">Médico:</span> <select id="cb_medico"></select><br />
        
        <a class="btn btn-info" href="javascript:Cargar_DiaDeAtencion_por_Medico_y_Especialidad();Mostrar(1);">Días de atención</a>
        <a class="btn btn-info" href="javascript:Cargar_DiaDeNoAtencion_por_Medico_y_Especialidad();Mostrar(2);">Días de no atención</a>
        <a class="btn btn-info" href="javascript:Cargar_DiaDeAtencionExtraordinario_por_Medico_y_Especialidad();Mostrar(3);">Días extraordinarios</a>
        </div>

        <hr />

        <div id="div_dia_atencion" style="display:none;">
        <div><b>Días de atención</b></div>
            Día de la semana: <select id="cb_da_dia" style="width: 98px;">
                <option value="0">Domingo</option>
                <option value="1">Lunes</option>
                <option value="2">Martes</option>
                <option value="3">Miércoles</option>
                <option value="4">Jueves</option>
                <option value="5">Viernes</option>
                <option value="6">Sábado</option>                
            </select>            
            <span style="margin-left:20px;">Hora Inicio:</span> <input type="text" id="txt_da_hora_inicio" maxlength="5" style="width:45px;"/>
            <span style="margin-left:20px;">Hora Fin:</span> <input type="text" id="txt_da_hora_fin"  maxlength="5" style="width:45px;"/>
            <span style="margin-left:20px;">Duración por turno:</span> <input type="text" id="txt_da_duracion" maxlength="2" style="width:45px;"/>
            <a id="btn_da_aceptar" class="btn btn-info">Aceptar</a>
            <a id="btn_da_cancelar" class="btn btn-danger">Cancelar</a>
            <a id="btn_da_eliminar" class="btn btn-danger" style="display:none;">Eliminar</a>

            <div style="max-height:400px; overflow:auto;">
            <table class="table table-condensed">
                <tr><td></td><td>Día de la semana</td><td>Hora Inicio</td><td>Hora Fin</td><td>Duración por turno</td></tr>
                <tbody id="tabla_diasatencion"></tbody>
            </table>
            </div>

        </div>



        <div id="div_dia_no_atencion" style="display:none;">
        <div><b>Días de no atención</b></div>           
            <span>Fecha Desde:</span> <input type="text" id="txt_dna_fechadesde" maxlength="10" style="width:76px;"/>
            <span style="margin-left:20px;">Hora Inicio:</span> <input type="text" id="txt_dna_hora_inicio" maxlength="5" style="width:45px;"/>

            <span style="margin-left:100px;">Fecha Hasta:</span> <input type="text" id="txt_dna_fechahasta" maxlength="10" style="width:76px;"/>
            <span style="margin-left:20px;">Hora Inicio:</span> <input type="text" id="txt_dna_hora_fin" maxlength="5" style="width:45px;"/><br />

            <span style="margin-left:20px;">Motivo: </span> <input type="text" id="txt_dna_motivo" maxlength="200" style="width:200px;"/>
            
            <a id="btn_dna_aceptar" class="btn btn-info">Aceptar</a>
            <a id="btn_dna_cancelar" class="btn btn-danger">Cancelar</a>
            <a id="btn_dna_eliminar" class="btn btn-danger" style="display:none;">Eliminar</a>

            <div style="max-height:400px; overflow:auto;">
            <table class="table table-condensed">
                <tr><td></td><td>Fecha Desde</td><td>Hora Inicio</td><td>Fecha Hasta</td><td>Hora Fin</td><td>Motivo</td></tr>
                <tbody id="tabla_diasnoatencion"></tbody>
            </table>
            </div>

        </div>



        <div id="div_dia_extraordinario" style="display:none;">     
        <div><b>Días extraordinarios</b></div>                   
            
            Día de la semana: <select id="cb_extraordinario_dia" style="width: 98px;">
                <option value="0">Domingo</option>
                <option value="1">Lunes</option>
                <option value="2">Martes</option>
                <option value="3">Miércoles</option>
                <option value="4">Jueves</option>
                <option value="5">Viernes</option>
                <option value="6">Sábado</option>                
            </select> <br />

            <span>Fecha Desde:</span> <input type="text" id="txt_extraordinario_fechadesde" maxlength="10" style="width:76px;"/>
            <span style="margin-left:20px;">Hora Inicio:</span> <input type="text" id="txt_extraordinario_hora_inicio" maxlength="5" style="width:45px;"/>

            <span style="margin-left:100px;">Fecha Hasta:</span> <input type="text" id="txt_extraordinario_fechahasta" maxlength="10" style="width:76px;"/>
            <span style="margin-left:20px;">Hora Fin:</span> <input type="text" id="txt_extraordinario_hora_fin" maxlength="5" style="width:45px;"/><br />

            <span style="margin-left:20px;">Duración por turno:</span> <input type="text" id="txt_extraordinario_duracion" maxlength="2" style="width:45px;"/>
                        
            <a id="btn_extraordinario_aceptar" class="btn btn-info">Aceptar</a>
            <a id="btn_extraordinario_cancelar" class="btn btn-danger">Cancelar</a>
            <a id="btn_extraordinario_eliminar" class="btn btn-danger" style="display:none;">Eliminar</a>

            <div style="max-height:400px; overflow:auto;">
            <table class="table table-condensed">
                <tr><td></td><td>Día de la semana</td><td>Fecha Desde</td><td>Hora Inicio</td><td>Fecha Hasta</td><td>Hora Fin</td><td>Duración por turno</td></tr>       
                <tbody id="tabla_diasextraordinario"></tbody>         
            </table>
            </div>

        </div>


        <div>
            
        </div>


        </div>
    </form>
</body>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.validate.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>


<script>
    
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





    CargarListaDeEspecialidades();
    


    $("#cb_especialidad").change(function () {
        if ($("#cb_especialidad").val() != "0") {
            Cargar_Medicos_por_Especialidad($("#cb_especialidad :selected").val(), "A");            
        }    
    });

    function Cargar_Medicos_por_Especialidad(Especialidad, Tipo) {
        var json = JSON.stringify({ "Especialidad": $("#cb_especialidad").val(), "Tipo": "A", "TLC": 0 });
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
        $('#cb_medico').empty();
        $('#cb_medico').append('<option value="0">Medicos</option>');
        $.each(Medicos, function (index, medicos) {
            $('#cb_medico').append($('<option></option>').val(medicos.Id).html(medicos.Medico));
        });
    }






    function Guardar() {
        var Objeto_Turno_Practicas = {};
        var Array_Turno_Practicas = [];

        $('.modificado input[type=text]').each(function () {
            Objeto_Turno_Practicas.PracticaCodigo = $(this).attr('id').replace("txt_", "");
            Objeto_Turno_Practicas.PracticaDuracion = $(this).val();
            Array_Turno_Practicas.push(Objeto_Turno_Practicas);
        });


        var json = JSON.stringify({ "Practicas": Array_Turno_Practicas, "EspecialidadId": $("#cb_especialidad").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/H2_IMG_Practica_Duracion_Actualizar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                alert("Prácticas actualizadas");
            },
            error: errores
        });


    }




    //DIA DE ATENCION
    function Cargar_DiaDeAtencion_por_Medico_y_Especialidad() {
        var json = JSON.stringify({ "EspecialidadId": $("#cb_especialidad").val(), "MedicoId": $("#cb_medico").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/ListarDiaAtencion",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ListadoDiaAtencion_Cargado,
            error: errores
        });
    }

    function diaselasemana(dia) {
        var diasemana = "";
        if (dia == 1) return "Lunes";
        if (dia == 2) return "Martes";
        if (dia == 3) return "Miércoles";
        if (dia == 4) return "Jueves";
        if (dia == 5) return "Viernes";
        if (dia == 6) return "Sábado";
        if (dia == 7 || dia == 0) return "Domingo";
    }

    var DiaAtencionId = 0;

    function ListadoDiaAtencion_Cargado(Resultado) {
        var Dias = Resultado.d;
        $('#tabla_diasatencion').empty();
        $.each(Dias, function (index, dia) {
            $("#tabla_diasatencion").html($("#tabla_diasatencion").html() + "<tr><td><a class='EditarDiaAtencion'>Editar</a></td><td>" + diaselasemana(dia.Dia) + "</td><td>" + dia.Inicio + "</td><td>" + dia.Fin + "</td><td>" + dia.Duracion + "</td><td style='display:none;'>" + dia.Dia + "</td><td style='display:none;'>" + dia.Id + "</td></tr>");
        });
    }


    $(".EditarDiaAtencion").live("click", function () {        
        $("#txt_da_hora_inicio").val($(this).parent().parent().children('td').eq(2).text());
        $("#txt_da_hora_fin").val($(this).parent().parent().children('td').eq(3).text());
        $("#txt_da_duracion").val($(this).parent().parent().children('td').eq(4).text());

        //Invisible
        $("#cb_da_dia").val($(this).parent().parent().children('td').eq(5).text()); //Dia
        DiaAtencionId = $(this).parent().parent().children('td').eq(6).text(); //Id          
        $("#btn_da_eliminar").show();
    });


    $("#btn_da_cancelar").click(function () {
        DiaAtencionId = 0;
        $("#btn_da_eliminar").hide();
        $("#txt_da_hora_inicio").val("");
        $("#txt_da_hora_fin").val("");
        $("#txt_da_duracion").val("");
    });




    $("#btn_da_aceptar").click(function () {
        var objeto = {};
        objeto.Dia = $("#cb_da_dia").val();
        objeto.Fin = $("#txt_da_hora_fin").val();
        objeto.Inicio = $("#txt_da_hora_inicio").val();
        objeto.Duracion = $("#txt_da_duracion").val();
        objeto.Medico = $("#cb_medico").val();
        objeto.Especialidad = $("#cb_especialidad").val();
        objeto.Id = DiaAtencionId;

        var json = JSON.stringify({ "dia": objeto });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/ModificarDiaAtencion",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#btn_da_cancelar").click();
                Cargar_DiaDeAtencion_por_Medico_y_Especialidad();
            },
            error: errores
        });
    });



    $("#btn_da_eliminar").click(function () {
        var json = JSON.stringify({ "Id": DiaAtencionId });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/EliminarDiaAtencion",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#btn_da_cancelar").click();
                Cargar_DiaDeAtencion_por_Medico_y_Especialidad();
            },
            error: errores
        });
    });










    //DIA DE NO ATENCION
    function Cargar_DiaDeNoAtencion_por_Medico_y_Especialidad() {
        var json = JSON.stringify({ "EspecialidadId": $("#cb_especialidad").val(), "MedicoId": $("#cb_medico").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/ListarDiaNoAtencion",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ListadoDiaNoAtencion_Cargado,
            error: errores
        });
    }

    
    var DiaNoAtencionId = 0;

    function ListadoDiaNoAtencion_Cargado(Resultado) {
        var Dias = Resultado.d;

        $('#tabla_diasnoatencion').empty();
        $.each(Dias, function (index, dia) {
            $("#tabla_diasnoatencion").html($("#tabla_diasnoatencion").html() + "<tr><td><a class='EditarDiaNoAtencion'>Editar</a></td><td>" + dia.FechaDesde + "</td><td>" + dia.HoraDesde + "</td><td>" + dia.FechaHasta + "</td><td>" + dia.HoraHasta + "</td><td>" + dia.MotivoAusencia + "</td><td style='display:none;'>" + dia.Id + "</td></tr>");
        });
    }


    $(".EditarDiaNoAtencion").live("click", function () {
        
        $("#txt_dna_fechadesde").val($(this).parent().parent().children('td').eq(1).text());
        $("#txt_dna_hora_inicio").val($(this).parent().parent().children('td').eq(2).text());
        $("#txt_dna_fechahasta").val($(this).parent().parent().children('td').eq(3).text());
        $("#txt_dna_hora_fin").val($(this).parent().parent().children('td').eq(4).text());
        $("#txt_dna_motivo").val($(this).parent().parent().children('td').eq(5).text());

        //Invisible        
        DiaNoAtencionId = $(this).parent().parent().children('td').eq(6).text(); //Id          
        $("#btn_dna_eliminar").show();
    });


    $("#btn_dna_cancelar").click(function () {
        DiaNoAtencionId = 0;
        $("#btn_dna_eliminar").hide();
        $("#txt_dna_hora_inicio").val("");
        $("#txt_dna_fechadesde").val("");        
        $("#txt_dna_fechahasta").val("");
        $("#txt_dna_hora_fin").val("");
        $("#txt_dna_motivo").val("");
    });




    $("#btn_dna_aceptar").click(function () {
        var objeto = {};

        objeto.FechaDesde = $("#txt_dna_fechadesde").val();
        objeto.FechaHasta = $("#txt_dna_fechahasta").val();
        objeto.HoraDesde = $("#txt_dna_hora_inicio").val();
        objeto.HoraHasta = $("#txt_dna_hora_fin").val();
        objeto.MotivoAusencia = $("#txt_dna_motivo").val();
        objeto.Medico = $("#cb_medico").val();
        objeto.Especialidad = $("#cb_especialidad").val();
        objeto.Id = DiaNoAtencionId;

        var json = JSON.stringify({ "dia": objeto });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/ModificarDiaNoAtencion",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#btn_dna_cancelar").click();
                Cargar_DiaDeNoAtencion_por_Medico_y_Especialidad();
            },
            error: errores
        });
    });



    $("#btn_dna_eliminar").click(function () {
        var json = JSON.stringify({ "Id": DiaNoAtencionId });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/EliminarDiaNoAtencion",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#btn_da_cancelar").click();
                Cargar_DiaDeNoAtencion_por_Medico_y_Especialidad();
            },
            error: errores
        });
    });



    //Días extraordinarios

    function Cargar_DiaDeAtencionExtraordinario_por_Medico_y_Especialidad() {
        var json = JSON.stringify({ "EspecialidadId": $("#cb_especialidad").val(), "MedicoId": $("#cb_medico").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/ListarDiaExtraordinario",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ListadoDiaAtencionExtraordinario_Cargado,
            error: errores
        });
    }

    
    var DiaExtraordinarioId = 0;

    function ListadoDiaAtencionExtraordinario_Cargado(Resultado) {
        var Dias = Resultado.d;
        $('#tabla_diasextraordinario').empty();
        $.each(Dias, function (index, dia) {
            $("#tabla_diasextraordinario").html($("#tabla_diasextraordinario").html() + "<tr><td><a class='EditarDiaAtencionExtraordinario'>Editar</a></td><td>" + diaselasemana(dia.Dia) + "</td><td>" + dia.Inicio + "</td><td>" + dia.HoraInicio + "</td><td>" + dia.Fin + "</td><td>" + dia.HoraFin + "</td><td>" + dia.Duracion + "</td><td style='display:none;'>" + dia.Dia + "</td><td style='display:none;'>" + dia.Id + "</td></tr>");
        });
    }


    $(".EditarDiaAtencionExtraordinario").live("click", function () {
        $("#txt_extraordinario_fechadesde").val($(this).parent().parent().children('td').eq(2).text());
        $("#txt_extraordinario_hora_inicio").val($(this).parent().parent().children('td').eq(3).text());
        $("#txt_extraordinario_fechahasta").val($(this).parent().parent().children('td').eq(4).text());
        $("#txt_extraordinario_hora_fin").val($(this).parent().parent().children('td').eq(5).text());
        $("#txt_extraordinario_duracion").val($(this).parent().parent().children('td').eq(6).text());

        //Invisible
        $("#cb_extraordinario_dia").val($(this).parent().parent().children('td').eq(7).text()); //Dia
        DiaExtraordinarioId = $(this).parent().parent().children('td').eq(8).text(); //Id          
        $("#btn_extraordinario_eliminar").show();
    });


    $("#btn_extraordinario_cancelar").click(function () {
        DiaExtraordinarioId = 0;
        $("#btn_extraordinario_eliminar").hide();
        $("#txt_extraordinario_fechadesde").val("");
        $("#txt_extraordinario_hora_inicio").val("");
        $("#txt_extraordinario_fechahasta").val("");
        $("#txt_extraordinario_hora_fin").val("");
        $("#txt_extraordinario_duracion").val("");
    });




    $("#btn_extraordinario_aceptar").click(function () {
        var objeto = {};
        objeto.Dia = $("#cb_extraordinario_dia").val();
        objeto.Inicio = $("#txt_extraordinario_fechadesde").val();
        objeto.Fin = $("#txt_extraordinario_fechahasta").val();
        objeto.HoraInicio = $("#txt_extraordinario_hora_inicio").val();
        objeto.HoraFin = $("#txt_extraordinario_hora_fin").val();

        objeto.Duracion = $("#txt_extraordinario_duracion").val();
        objeto.Medico = $("#cb_medico").val();
        objeto.Especialidad = $("#cb_especialidad").val();
        objeto.Id = DiaExtraordinarioId;

        var json = JSON.stringify({ "dia": objeto });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/ModificarDiaExtraordinario",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#btn_extraordinario_cancelar").click();
                Cargar_DiaDeAtencionExtraordinario_por_Medico_y_Especialidad();
            },
            error: errores
        });
    });



    $("#btn_extraordinario_eliminar").click(function () {
        var json = JSON.stringify({ "Id": DiaExtraordinarioId });
        $.ajax({
            type: "POST",
            url: "../Json/Imagenes/Imagenes.asmx/EliminarDiaExtraordinario",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#btn_extraordinario_cancelar").click();
                Cargar_DiaDeAtencionExtraordinario_por_Medico_y_Especialidad();
            },
            error: errores
        });
    });


    function Mostrar(cual) {
        if (cual == 1) {
            $("#div_dia_atencion").show();
            $("#div_dia_no_atencion").hide();
            $("#div_dia_extraordinario").hide();
        }

        if (cual == 2) {
            $("#div_dia_atencion").hide();
            $("#div_dia_no_atencion").show();
            $("#div_dia_extraordinario").hide();
        }

        if (cual == 3) {
            $("#div_dia_atencion").hide();
            $("#div_dia_no_atencion").hide();
            $("#div_dia_extraordinario").show();
        }
    }



    parent.document.getElementById("DondeEstoy").innerHTML = "Imágenes > <strong>Modificar días de atención</strong>";

    $("#txt_da_hora_inicio").mask("99:99", { placeholder: "__:__" });
    $("#txt_da_hora_fin").mask("99:99", { placeholder: "__:__" });
    $("#txt_da_duracion").mask("99", { placeholder: "__" });


    $("#txt_dna_fechadesde").datepicker();
    $("#txt_dna_hora_inicio").mask("99:99", { placeholder: "__:__" });
    $("#txt_dna_fechahasta").datepicker();
    $("#txt_dna_hora_fin").mask("99:99", { placeholder: "__:__" });


    $("#txt_extraordinario_fechadesde").datepicker();
    $("#txt_extraordinario_hora_inicio").mask("99:99", { placeholder: "__:__" });
    $("#txt_extraordinario_fechahasta").datepicker();
    $("#txt_extraordinario_hora_fin").mask("99:99", { placeholder: "__:__" });
    $("#txt_extraordinario_duracion").mask("99", { placeholder: "__" });


</script>

</html>
