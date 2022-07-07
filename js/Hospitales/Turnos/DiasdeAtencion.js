var Editando = 0;
var EditandoPos = 0;
var DiaId = 0;
var MedicoId = 0;



$("#btn_Agregar").click(function () {
    if ($("#cbo_Consultorio :selected").val() == "0") { alert("Seleccione un Consultorio"); return; }
    var json = JSON.stringify({ "id": DiaId, "medicoId": MedicoId, "diaDeAtencion": $("#cbo_DiaAtencion :selected").val(), "horaInicio": $("#txtHoraInicio").val(), "horaFin": $("#txtHoraFin").val(), "EspecialidadId": $("#cboEspecialidadDA :selected").val(), "Duracion": $("#txtDuracionTurno").val(), "ConsultorioId": $("#cbo_Consultorio :selected").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/DiasAtencionEdicion.asmx/Guardar_Dias_Atencion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Guardado,
        error: errores
    });
});






$("#btn_Eliminar").click(function () {
    if (confirm("¿Desea eliminar el día de atención seleccionado?")) {
        var json = JSON.stringify({ "Id": DiaId, "MedicoId": MedicoId });
        $.ajax({
            type: "POST",
            url: "../Json/Turnos/DiasAtencionEdicion.asmx/Eliminar_Dia_Id",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Eliminado,
            error: errores
        });
    }
});


function Eliminado() {
    alert("Eliminado");
    $("#btn_Cancelar").click();
    CargarTabla();
}


function Guardado(Resultado) {
    alert("Guardado");
    $("#btn_Cancelar").click();
    CargarTabla();
}





function CargarConsultorios() {
        $.ajax({
            type: "POST",
            url: "../Json/Turnos/Consultorios.asmx/Consultorio_Lista_DA",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: CargarConsultorios_Cargados,
            error: errores
        });
    }


    function CargarConsultorios_Cargados(Resultado) {
        
        var Consultorios = Resultado.d;
        $('#cbo_Consultorio').empty();
        $.each(Consultorios, function (index, consultorios) {
            if (consultorios.ConsultorioID == "0") $('#cbo_Consultorio').append('<option value="0">Seleccione un Consultorio</option>');
            else $('#cbo_Consultorio').append($('<option></option>').val(consultorios.ConsultorioID).html(consultorios.Consultorio));
        });
    }


//function CargarEspecialidad(MedicoeId) {
//    $.ajax({
//        type: "POST",
//        url: "../Json/Turnos/DiasAtencionEdicion.asmx/Especialidades_que_Atiende_el_Medico",
//        data: '{MedicoId: "' + MedicoeId + '"}',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: CargarEspecialidad_Cargadas,
//        error: errores
//    });
//}



function CargarEspecialidad(MedicoeId, Tipo) {
    var json = JSON.stringify({ "MedicoId": MedicoeId, "Tipo": Tipo })
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/DiasAtencionEdicion.asmx/Especialidades_que_Atiende_el_Medico_por_Tipo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarEspecialidad_Cargadas,
        error: errores
    });
}


function CargarEspecialidad_Cargadas(Resultado) {

    var Especialidad = Resultado.d;
    $('#cboEspecialidadDA').empty();
    $('#cboEspecialidadDA').append('<option value="0">Seleccione una Especialidad</option>');
    $.each(Especialidad, function (index, especialidades) {
        $('#cboEspecialidadDA').append(
              $('<option></option>').val(especialidades.EspecialidadId).html(especialidades.Especialidad)
            );
    });
}



function CargarTabla() {
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/DiasAtencionEdicion.asmx/Dias_Atencion_Lista",
        data: '{MedicoId: "' + MedicoId + '", Especialidad: "' + $("#cboEspecialidadDA :selected").val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarTabla_Cargadas,
        error: errores
    });
}


function CargarTabla_Cargadas(Resultado) {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%; cursor: pointer; '><thead><tr><th>Consultorio</th><th>Día</th><th>Inicio</th><th>Fin</th><th>Duración</th></tr></thead><tbody>";
    var Contenido = "";
    var Dias = Resultado.d;
    $.each(Dias, function (index, dias) {
        Contenido = Contenido + "<tr id='tr" + index + "' onclick='EditarDiasAtencion(" + index + ");'><td id='dias"+index+"' style='display:none;'> " + dias.Id + " </td><td> " + dias.Consultorio + " </td><td> " + dias.Dia + " </td><td> " + dias.Inicio + " </td><td> " + dias.Fin + " </td><td> " + dias.Duracion + " </td></tr>";
    });

    var Pie = "</tbody></table>";
    $("#TablaDiasAtencion").html(Encabezado + Contenido + Pie);

}

function EditarDiasAtencion(Index) {
    $("#btn_Eliminar").show();
    $("tr").css("background-color", 'white');
    $("#tr" + Index).css('background-color', '#D8D8D8');
    var Id = $("#dias" + Index).html();
    document.getElementById("cboEspecialidadDA").disabled = true;
    $("#cbo_DiaAtencion").attr("disabled", true);
    $("#btn_Agregar").html("Modificar");
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/DiasAtencionEdicion.asmx/Dias_Atencion_Id",
        data: '{Id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: EditarDiasAtencion_Cargadas,
        error: errores
    });
}


function EditarDiasAtencion_Cargadas(Resultado) {
    var Dias = Resultado.d;
    $.each(Dias, function (index, dias) {
        DiaId = dias.Id;
        $("#txtDuracionTurno").val(dias.Duracion);
        $("#txtHoraInicio").val(dias.Inicio);
        $("#txtHoraFin").val(dias.Fin);
        $('#cbo_DiaAtencion option').attr('selected', false);
        $("#cbo_DiaAtencion option[value=" + dias.Dia + "]").attr("selected", true);
        $('#cbo_Consultorio option').attr('selected', false);
        $("#cbo_Consultorio option[value=" + dias.ConsultorioId + "]").attr("selected", true);
    });
    
}


$("#cboEspecialidadDA").change(function () {
    CargarTabla();
});



    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);

    }

    $(document).ready(function () {

        CargarConsultorios();
        $("#btn_Eliminar").hide();

        $("#txtHoraInicio").mask("99:99", { placeholder: "-" });
        $("#txtHoraFin").mask("99:99", { placeholder: "-" });
        $("#txtDuracionTurno").mask("9?999");

        var GET = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }

            GET[decode(arguments[1])] = decode(arguments[2]);
        });

        if (GET["MedicoId"] != "") {
            MedicoId = GET["MedicoId"];
            CargarEspecialidad(MedicoId, 'A');
        }
        

    });

    $('#txtHoraInicio').change(function () {

        ErrorHora = false;
        var hora = $('#txtHoraInicio').val();
        if ($('#txtHoraInicio').val().length == 5) {

            var h1 = hora.charAt(0);
            var h2 = hora.charAt(1);
            var dp = hora.charAt(2);
            var m1 = hora.charAt(3);

            if ((h1 == 2 && h2 > 3) || (h1 > 2)) { ErrorHora = true; }
            if (m1 > 5) { ErrorHora = true; }
            if (dp != ":") { ErrorHora = true; }
            if (!ErrorHora) {
                CargarLosTurnos(0);
                SobreTurnoActivo();
            }
            else {
                $('#txtHoraInicio').val("");
            }
        }
    });

    $('#txtHoraFin').change(function () {

        ErrorHora = false;
        var hora = $('#txtHoraFin').val();
        if ($('#txtHoraFin').val().length == 5) {

            var h1 = hora.charAt(0);
            var h2 = hora.charAt(1);
            var dp = hora.charAt(2);
            var m1 = hora.charAt(3);

            if ((h1 == 2 && h2 > 3) || (h1 > 2)) { ErrorHora = true; }
            if (m1 > 5) { ErrorHora = true; }
            if (dp != ":") { ErrorHora = true; }
            if (!ErrorHora) {
                CargarLosTurnos(0);
                SobreTurnoActivo();
            }
            else {
                $('#txtHoraFin').val("");
            }
        }
    });


    $("#btn_Cancelar").click(function () {
        document.getElementById("cboEspecialidadDA").disabled = false;
        $("#cbo_DiaAtencion").removeAttr("disabled");
        $("#btn_Agregar").html("Agregar");
        DiaId = 0;
        $("#btn_Eliminar").hide();
        $("#txtDuracionTurno").val('');
        $("#txtHoraInicio").val('');
        $("#txtHoraFin").val('');
        $('#cbo_DiaAtencion option').attr('selected', false);
        $('#cbo_Consultorio option').attr('selected', false);
        $("#cbo_DiaAtencion option[value=-1]").attr("selected", true);
        $("#cbo_Consultorio option[value=0]").attr("selected", true);
        $("tr").css("background-color", 'white');
    });