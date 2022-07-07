var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var objPractica = Array();
var Total_p = -1;
var Editando_p = 0;
var EditandoPos_p = 0;
var objPracticas = new Array();


$(document).ready(function () {
    $("#Practicas_frm").validate({
        rules: {
            'cantidad_p': { required: true, number: true, range: [0, 99] }
        },
        messages: {
            'cantidad_p': { required: '', number: '', range: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    $("#frm_Medicamentos").validate({
        rules: {
            'cantidad': { required: true, number: true, range: [0, 99] },
            'monodroga': { required: true }
        },
        messages: {
            'cantidad': { required: '', number: '', range: '' },
            'monodroga': { required: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    //ListaMonoDrogras();
    LoadPlantilla();
    ListarPracticas();
    LoadPlantillaPrac();
    List_by_Monodroga(0);
});

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function ListaMonoDrogras() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/MonoDrogas",
        data: '{Numero: "' + 0 + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var MonoDrogas = Resultado.d;
            $('#cbo_Monodroga').empty();
            $('#cbo_Monodroga').append('<option value="0">Seleccione Monodroga...</option>');
            $.each(MonoDrogas, function (index, mono) {
                $('#cbo_Monodroga').append(
              $('<option></option>').val(mono.numero).html(mono.nombre)
            );
            });
        },
        error: errores
    });
}


function List_by_Monodroga(MonoId) {
    //if (MonoId == 0) { alert("Seleccione Monodroga"); $("#cbo_Medicamento").empty(); return; }
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista_by_Mono",
        data: '{MonoId: "' + MonoId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        beforeSend: function () {
            $("#cbo_Medicamento").attr("disabled", true);
        },
        complete: function () {
            $("#cbo_Medicamento").removeAttr("disabled");
        },
        error: errores
    });
}

function Cargar_Medicamentos_Cargado(Resultado) {
    var Medicamentos = Resultado.d;
    $.each(Medicamentos, function (i, item) {
      if (Medicamentos[i].Medida != null) {
            var Medida = Medicamentos[i].Medida;
        }
        else {
            var Medida = '';
        }
        if (Medicamentos[i].Presentacion != null) {
            var Presentacion = Medicamentos[i].Presentacion;
        }
        else {
            var Presentacion = '';
        }
        $('#cbo_Medicamento').append($('<option></option>').val(Medicamentos[i].REM_ID).html(Medicamentos[i].REM_NOMBRE + ' - ' + Medicamentos[i].REM_GRAMAJE + Medida + ' - ' + Presentacion));
        if (i == Medicamentos.length - 1) $("#cbo_Medicamento").removeAttr("disabled");
    });
}

$('#cbo_Monodroga').change(function () {
    $("#cbo_Medicamento").empty();
    List_by_Monodroga($("#cbo_Monodroga :selected").val());
});


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function LoadPlantilla() {
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/List_Plantilla_Med",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPlantilla_Cargado,
        error: errores
    });
}

function LoadPlantilla_Cargado(Resultado) {
    var Detalles = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Medicamento + " </td><td> " + Detalle.Cantidad + " </td></tr>";
        objMedicamentos[i] = Detalle;
        objMedicamentos[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos_div").html(Encabezado + Contenido + Pie);
}


$("#btnAgregarMedicamento").click(function () {
    var valid = $("#frm_Medicamentos").valid();
    if (valid) {
        if ($("#cbo_Medicamento :selected").val() != '0') {
            Codigo = $("#cbo_Medicamento :selected").val();
            if (Existe(Codigo)) return;
            Nombre = $("#cbo_Medicamento :selected").text();
            Cantidad = parseInt($("#cantidad").val());
            Monodroga = $("#cbo_Monodroga :selected").val();
            Monodroga_Nombre = $("#cbo_Monodroga :selected").text();
            var Estado = 1;
            var Cual = Total;
            if (Editando == 1) {
                Cual = EditandoPos;
            }
            else {
                Total = Total + 1;
                Cual = Total;
            }
            objMedicamento = {};
            objMedicamento.Id = Codigo;
            objMedicamento.Cantidad = Cantidad;
            objMedicamento.Monodroga = Monodroga;
            objMedicamento.Estado = Estado;
            objMedicamento.Medicamento = Nombre;
            objMedicamento.Monodroga_Nombre = Monodroga_Nombre;
            objMedicamentos[Cual] = objMedicamento;
            RenderizarTabla();
            Editando = 0;
            EditandoPos = -1;
            LimpiarCampos();
        }
        else { alert('Seleccione Un Medicamento'); return; }
    }
});



$("#btnCancelarMedicamento").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCampos();
});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Medicamento</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Medicamento + " </td><td> " + objMedicamentos[i].Cantidad + " </td></tr>";
        }

    }

    var Pie = "</tbody></table>";
    $("#TablaMedicamentos_div").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

function LimpiarCampos() {
    $("#cantidad").val('');
    $("#cbo_Medicamento").val(0);
    $("#cbo_Medicamento").removeAttr('disabled');
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    $("#cbo_Monodroga").val(objMedicamentos[Nro].Monodroga);
    $("#cbo_Medicamento option[value=" + objMedicamentos[Nro].Id + "]").attr("selected", true);
    $("#cbo_Medicamento").attr('disabled', "disabled");
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
}

function Eliminar(Nro) {
    objMedicamentos[Nro].Estado = 0;
    RenderizarTabla();
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
}

function Existe(Algo) {
    for (var i = 0; i <= Total; i++) {
        if (objMedicamentos[i].Id == Algo && objMedicamentos[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado el Medicamento Nro: " + Algo);
            LimpiarCampos();
            $("#cbo_Medicamento").focus();
            return true;
        }
    }
    return false;
}

$("#btnGuardarMedicamentos").click(function () {
    DeletePlantilla();

});

function DeletePlantilla() {
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/Guardia_Plantilla_Med_Delete",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Medicamentos,
        error: errores
    });
}

function Insert_Medicamentos() {
    var json = JSON.stringify({"objMedicamentos": objMedicamentos});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Guardia/Guardia.asmx/List_Plantilla_Med_Insert",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Medicamentos_Cargado,
        error: errores
    });
}

function Insert_Medicamentos_Cargado(Resultado) {
    alert('Plantilla de Medicamentos Actualizada');
}

////////////////////////////////////////////////////////////////Practicas

function ListarPracticas() {
    var json = JSON.stringify({ "Practica": ' ', "Codigo": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Practicas_Listas_Total",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practicas_Listadas,
        error: errores
    });
}

function Practicas_Listadas(Resultado) {
    var Practicas = Resultado.d;
    $.each(Practicas, function (index, Practica) {
        $('#cbo_Practicas').append(
              $('<option></option>').val(Practica.Codigo).html(Practica.Practica)
            );
    });
}

$("#btnAgregarPractica").click(function () {
    var valid = $("#Practicas_frm").valid();
    if (valid) {
        if ($("#cbo_Practicas :selected").val() != '0') {
            var Codigop = $("#cbo_Practicas :selected").val();
            if (Existe_p(Codigop)) return;
            var Nombrep = $("#cbo_Practicas :selected").text();
            var Cantidadp = parseInt($("#cantidad_p").val());
            var Estado = 1;
            var Cual = Total_p;
            if (Editando_p == 1) {
                Cual = EditandoPos_p;
            }
            else {
                Total_p = Total_p + 1;
                Cual = Total_p;
            }
            objPractica = {};
            objPractica.Codigo = Codigop;
            objPractica.Cantidad = Cantidadp;
            objPractica.Estado = Estado;
            objPractica.Descripcion = Nombrep;
            objPracticas[Cual] = objPractica;
            RenderizarTabla_p();
            Editando_p = 0;
            EditandoPos_p = -1;
            LimpiarCampos_p();
        }
        else { alert('Seleccione Una Práctica'); return; }
    }
});

$("#txtCodigo").change(function () {
    if ($("#txtCodigo").val().trim().length > 0)
        $("#cbo_Practicas").val($("#txtCodigo").val());
});

$("#btnCancelarPractica").click(function () {
    Editando_p = 0;
    EditandoPos_p = -1;
    $("#btnAgregarPractica").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCampos_p();
});

function RenderizarTabla_p() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Codigo</th><th>Practica</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total_p; i++) {
        //Estado = 0 es Borrado
        if (objPracticas[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar_p" + i + "' onclick='Editar_p(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Practica'><i class='icon-edit'></i></a><a id='Elminar_p" + i + "'onclick='Eliminar_p(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Practica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objPracticas[i].Codigo + " </td><td> " + objPracticas[i].Descripcion + " </td><td> " + objPracticas[i].Cantidad + " </td></tr>";
        }

    }

    var Pie = "</tbody></table>";
    $("#Tabla_Practicas").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

function LimpiarCampos_p() {
    $("#cantidad_p").val('');
    $("#cbo_Practicas").val('0');
    $("#cbo_Practicas").removeAttr('disabled');
    $("#txtCodigo").removeAttr('disabled');
    $("#txtCodigo").val('');
}

function Editar_p(Nro) {
    Editando_p = 1;
    EditandoPos_p = Nro;
    $("#cantidad_p").val(objPracticas[Nro].Cantidad);
    $("#cbo_Practicas option[value=" + objPracticas[Nro].Codigo + "]").attr("selected", true);
    $("#txtCodigo").val(objPracticas[Nro].Codigo);
    $("#cbo_Practicas").attr('disabled', "disabled");
    $("#txtCodigo").attr('disabled', "disabled");
    $("#btnAgregarPractica").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
}

function Eliminar_p(Nro) {
    objPracticas[Nro].Estado = 0;
    RenderizarTabla_p();
    objPracticas = $.grep(objPracticas, function (value) {
        return value.Estado != 0;
    });
    Total_p = Total_p - 1;
}

function Existe_p(Algo) {
    for (var i = 0; i <= Total_p; i++) {
        if (objPracticas[i].Codigo == Algo && objPracticas[i].Estado == 1 && Editando_p != 1) {
            alert("Ya ha cargado la Practica Nro: " + Algo);
            LimpiarCampos_p();
            $("#cbo_Practicas").focus();
            return true;
        }
    }
    return false;
}

$("#btnGuardarPracticas").click(function () {
    DeletePracticas();

});

function DeletePracticas() {
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/Guardia_Plantilla_Prac_Delete",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Practicas,
        error: errores
    });
}

function Insert_Practicas() {
    var json = JSON.stringify({ "objPracticas": objPracticas });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Guardia/Guardia.asmx/List_Plantilla_Prac_Insert",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Practicas_Cargado,
        error: errores
    });
}

function Insert_Practicas_Cargado(Resultado) {
    alert('Plantilla de Practicas Actualizada');
}

function LoadPlantillaPrac() {
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/List_Plantilla_Prac",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPlantillaPrac_Cargado,
        error: errores
    });
}

function LoadPlantillaPrac_Cargado(Resultado) {
    var Detalles = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Codigo</th><th>Practica</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {
        Contenido = Contenido + "<tr><td><a id='Editar_p" + i + "' onclick='Editar_p(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Practica'><i class='icon-edit'></i></a><a id='Elminar_p" + i + "'onclick='Eliminar_p(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Practica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Codigo + " </td><td> " + Detalle.Descripcion + " </td><td> " + Detalle.Cantidad + " </td></tr>";
        objPracticas[i] = Detalle;
        objPracticas[i].Estado = 1;
        Total_p = Total_p + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#Tabla_Practicas").html(Encabezado + Contenido + Pie);
}

