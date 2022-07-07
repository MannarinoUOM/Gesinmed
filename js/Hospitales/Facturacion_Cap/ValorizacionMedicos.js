var EditandoId = 0;
var MedicoId = 0;

$(document).ready(function () {
    $("#frm_Valores").validate({
        rules: {
            'txt_VNN': { required: true, money: true }
        },
        messages: {
            'txt_VNN': { required: '', money: '' }
        }

    });
    CargarConvenios();
    Cargar_Especialidades(true, 0, false);
    ListarHono(0, 0);
    Cargar_Practicas();
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
});


function Cargar_Medicos_por_Especialidad(Especialidad) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        error: errores
    });

}

function Medicos_por_Especialidad_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $('#cbo_Medico').empty();
    $('#cbo_Medico').append('<option value="0">Seleccione Médico</option>');
    $.each(Medicos, function (index, medicos) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
        if (MedicoId == medicos.Id) $('#cbo_Medico').val(medicos.Id);
    });
}


$("#txt_VNN").blur(function () {
    var e = $("#txt_VNN").val();
    if (!isNaN(Number(e)) && e != "")
        $("#txt_VNN").val(parseFloat(e).toFixed(2));
});

function CargarConvenios() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/VerlosConvenios",
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConvenios_Cargado,
        error: errores
    });

}

function CargarConvenios_Cargado(Resultado) {
    var Convenios = Resultado.d;
    $("#cbo_convenios").empty();
    $("#cbo_ConvMasivo").empty();
    $.each(Convenios, function (index, conv) {
        $('#cbo_convenios').append(
              $('<option></option>').val(conv.id).html(conv.convenios)
            );
        $('#cbo_ConvMasivo').append(
              $('<option></option>').val(conv.id).html(conv.convenios)
            );
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#cbo_convenios").change(function () {
    ListarHono($("#cbo_convenios :selected").val(), 0);
});

function Cargar_Especialidades(Todos, Id, SoloTurnos) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargadas,
        error: errores
    });
}

function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
    });
}

function RemoveClass() {
    $(".control-group").removeClass("error");
}


function Guardar() {
    if ($("#frm_Valores").valid()) {
        RemoveClass();
        //        if ($("#txt_Vaa").val() != "0.00" && $("#txt_VNN").val() != "0.00") {alert("Ingrese Unidades Sanatoriales o Valor NN solamente");return;}
        if ($("#cbo_Medico :selected").val() != "0") {
            var json = JSON.stringify({
                "ConvenioId": $('#cbo_convenios option:selected').val(),
                "MedicoId": $("#cbo_Medico :selected").val(),
                "EspecialidadId": $('#cbo_Especialidad option:selected').val(),
                "Vhono": $("#txt_VNN").val(),
                "Codigo": $("#cboPracticas :selected").val()
            });

            $.ajax({
                type: "POST",
                url: "../Json/Facturacion/AltasNomencladores.asmx/GuardarValorHonorario",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    ListarHono(0, 0);
                    alert("Guardado");
                    LimpiarCampos();
                },
                error: errores
            });

        }
        else {
            alert('Seleccione Una Práctica');
        }
    }
    else alert('Verifique los campos');
}

function LimpiarCampos() {
    $("#txt_VNN").val("0.00");
    $("#cboPracticas").attr("disabled", false);
    $("#cbo_convenios").attr("disabled", false);
    $("#cbo_Especialidad").attr("disabled", false);
    $("#cbo_Medico").attr("disabled", false);
    EditandoId = 0;
}

function ListarHono(Convenio, Medico) {
    var json = JSON.stringify({ "ConvenioId": Convenio, "MedicoId": Medico });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/AltasNomencladores.asmx/Fact_HonoMedicosConvenios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListarHono_Cargado,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaBonos").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaBonos").show();
        }
    });
}

function ListarHono_Cargado(Resultado) {
    var Medicos = Resultado.d;
    $("#TablaPracticas").empty();
    var Tabla_Datos = "";
    $.each(Medicos, function (index, Medico) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + "><td class='mano' onclick=Editar(" + index + ");>" + Medico.convenio + "</td><td class='mano' onclick=Editar(" + index + ");>" + Medico.especialidad + "</td><td class='mano' onclick=Editar(" + index + ");>" + Medico.medico + "</td><td class='mano' onclick=Editar(" + index + ");>" + Medico.practicaid + "</td><td class='mano' onclick=Editar(" + index + ");>" + Medico.practica + "</td><td style='display:none;'><input id='TxT_ConvenioId" + index + "' type='hidden' value='" + Medico.convenioid + "'/><input id='TxT_MedicoId" + index + "' type='hidden' value='" + Medico.medicoId + "'/><input id='TxT_EspecialidadId" + index + "' type='hidden' value='" + Medico.especialidadid + "'/><input id='TxT_CodigoId" + index + "' type='hidden' value='" + Medico.practicaid + "'/><input id='I_Prac_VHono" + index + "' value='" + Medico.ValorHonorario + "' /></td><td>&nbsp;&nbsp;<a class='btn btn-danger btn-mini' onclick=Quitar(" + index + ");>Quitar</a></td></tr>";
    });
    $("#TablaPracticas").html(Tabla_Datos);
}

function Editar(Id) {
    $("#cbo_Medico").attr("disabled", true);
    $("#cbo_convenios").attr("disabled", true);
    $("#cbo_Especialidad").attr("disabled", true);
    $("#cbo_convenios option[value=" + $("#TxT_ConvenioId" + Id).val() + "]").attr("selected", true);
    $("#cbo_Especialidad option[value=" + $("#TxT_EspecialidadId" + Id).val() + "]").attr("selected", true);
    $("#txtCodigo").val($("#TxT_CodigoId" + Id).val());
    $("#cboPracticas").val($("#txtCodigo").val());
    MedicoId = $("#TxT_MedicoId" + Id).val();
    Cargar_Medicos_por_Especialidad($('#cbo_Especialidad :selected').val());
    $("#txt_VNN").val($("#I_Prac_VHono" + Id).val());
}

function Quitar(Id) {
    var json = JSON.stringify({
        "ConvenioId": $('#TxT_ConvenioId' + Id).val(),
        "EspecialidadId": $('#TxT_EspecialidadId' + Id).val(),
        "MedicoId": $('#TxT_MedicoId' + Id).val(),
        "Codigo": $("#TxT_CodigoId" + Id).val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/QuitarHonoMedicosConvenios",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            ListarHono(0, 0);
        },
        error: errores
    });
}

$("#Cancelar").click(function () {
    LimpiarCampos();
});


$("#atab1").click(function () {
    $("#frm_Valores").show();
    $("#pie").show();
});

$('#cbo_Especialidad').change(function () {
    Cargar_Medicos_por_Especialidad($('#cbo_Especialidad :selected').val());
});


function Cargar_Practicas() {
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Practicas_Listas_Total",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pracias_Cargadas,
        error: errores
    });
}

function Pracias_Cargadas(Resultado) {
    var Practicas = Resultado.d;
    $('#cboPracticas').empty();
    $('#cboPracticas').append($('<option></option>').val("0").html("Práctica"));
    $.each(Practicas, function (index, practicas) {
        $('#cboPracticas').append(
              $('<option></option>').val(practicas.Id).html(practicas.Practica)
            );
    });
}

$("#cboPracticas").change(function () {
    $("#txtCodigo").val($("#cboPracticas :selected").val());
});

$("#txtCodigo").change(function () {
    var exists = 0 != $('#cboPracticas option[value=' + $("#txtCodigo").val() + ']').length;
    if (exists == 0) {
        $("#txtCodigo").val("");
        $("#txtCodigo").focus();
        ListarHono(0, 0);
    }
    else {
        $("#cboPracticas option[value=" + $("#txtCodigo").val() + "]").attr("selected", true);
        ListarHono(0, $("#txtCodigo").val());
    }
});

$("#txtCodigo").blur(function () {
    var exists = 0 != $('#cboPracticas option[value=' + $("#txtCodigo").val() + ']').length;
    if (exists == 0) {
        $("#txtCodigo").val("");
        $("#txtCodigo").focus();
        ListarHono(0, 0);
    }
    else {
        $("#cboPracticas option[value=" + $("#txtCodigo").val() + "]").attr("selected", true);
        ListarHono(0, $("#txtCodigo").val());
    }
});
