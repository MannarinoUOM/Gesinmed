var Editando = 0;
var EditandoPos = 0;
var DiaId = 0;



$("#btn_Agregar").click(function () {


    var json = JSON.stringify({ "id": DiaId, "medicoId": $("#txtMedicoId").val(), "fechaInicio": $("#txtFechaInicio").val(), "fechaFin": $("#txtFechaFin").val(), "EspecialidadId": $("#cboEspecialidadDA :selected").val(), "Motivo": $("#txtMotivoAusencia").val() });

    
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/DiasNoAtencionEdicion.asmx/Guardar_Dias_No_Atencion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Guardado,
        error: errores
    });


    

});






$("#btn_Eliminar").click(function () {
    var json = JSON.stringify({ "Id": DiaId});
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/DiasNoAtencionEdicion.asmx/Eliminar_Dia_No_Atencion_Id",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Eliminado,
        error: errores
    });
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





function CargarEspecialidad(MedicoId) {
    var json = JSON.stringify({"MedicoId": MedicoId, "Tipo": 'A'});
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
        url: "../Json/Turnos/DiasNoAtencionEdicion.asmx/Dias_No_Atencion_Lista",
        data: '{MedicoId: "' + $("#txtMedicoId").val() + '", Especialidad: "' + $("#cboEspecialidadDA :selected").val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarTabla_Cargadas,
        error: errores
    });
}


function CargarTabla_Cargadas(Resultado) {
    var Encabezado = "<table class='table table-hover table-bordered table-condensed' style='width: 100%; cursor: pointer;'><thead><tr><th>Motivo</th><th>Desde</th><th>Hasta</th></tr></thead><tbody>";
    var Contenido = "";
    var Dias = Resultado.d;
    $.each(Dias, function (index, dias) {
        Contenido = Contenido + "<tr onclick='EditarDiasNoAtencion(" + dias.Id + ");'><td> " + dias.MotivoAusencia + " </td><td> " + dias.FechaDesde + " </td><td> " + dias.FechaHasta + " </td></tr>";
    });

    var Pie = "</tbody></table>";
    $("#TablaDiasAtencion").html(Encabezado + Contenido + Pie);

}

function EditarDiasNoAtencion(Id) {
    $("#btn_Eliminar").show();
    document.getElementById("cboEspecialidadDA").disabled = true;
    $("#btn_Agregar").html("Modificar");
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/DiasNoAtencionEdicion.asmx/Dias_No_Atencion_Id",
        data: '{Id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: EditarDiasNoAtencion_Cargadas,
        error: errores
    });
}


function EditarDiasNoAtencion_Cargadas(Resultado) {
    var Dias = Resultado.d;
    $.each(Dias, function (index, dias) {
        DiaId = dias.Id;
        $("#txtFechaInicio").val(dias.FechaDesde);
        $("#txtFechaFin").val(dias.FechaHasta);
        $("#txtMotivoAusencia").val(dias.MotivoAusencia);
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
        
        CargarEspecialidad($("#txtMedicoId").val());
        $("#btn_Eliminar").hide();

        $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
        $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });

        $("#txtFechaInicio").datepicker();
        $("#txtFechaFin").datepicker();

    });



    $("#btn_Cancelar").click(function () {
        document.getElementById("cboEspecialidadDA").disabled = false;
        $("#btn_Agregar").html("Agregar");
        DiaId = 0;
        $("#btn_Eliminar").hide();
        $("#txtFechaInicio").val('');
        $("#txtFechaFin").val('');
        $("#txtMotivoAusencia").val('');

    });