var objMedicamentos = Array();
var objMedicamentos2 = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objDescartables = Array();
var objDescartables2 = Array();
var Total_1 = -1;
var Editando_1 = 0;
var EditandoPos_1 = 0;
var Id = 0;
var Existe = 0;
var Paso = 0;
var NoCerrar = 0;

$(document).ready(function () {
    $("#frm_Medicamentos").validate({
        rules: {
            'cantidadMed': { required: true, number: true, range: [1, 999] },
            'precioMed': { required: true, number: true },
            'subtotalMed': { required: true, number: true },
            'fechapracMed': { required: true, dateES: true }
        },
        messages: {
            'cantidadMed': { required: '', number: '', range: '' },
            'precioMed': { required: '', number: '' },
            'subtotalMed': { required: '', number: '' },
            'fechapracMed': { required: '', dateES: '' }

        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });

    $("#frm_Descartables").validate({
        rules: {
            'cantidad_desc': { required: true, number: true, range: [1, 999] },
            'precio_desc': { required: true, number: true },
            'subtotal_desc': { required: true, number: true },
            'fechaprac_desc': { required: true, dateES: true }
        },
        messages: {
            'cantidad_desc': { required: '', number: '', range: '' },
            'precio_desc': { required: '', number: '' },
            'subtotal_desc': { required: '', number: '' },
            'fechaprac_desc': { required: '', dateES: '' }

        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    $("#CargadoRendicion").val(FechaActual());
    $("#CargadoRendicion").mask("99/99/9999", { placeholder: "-" });
    $("#fechaprac_desc").mask("99/99/9999", { placeholder: "-" });
    $("#fechaprac").mask("99/99/9999", { placeholder: "-" });
    $("#txtNHC").mask("9999999999?9", { placeholder: "-" });
    $("#txtDNI").mask("9999999?9", { placeholder: "-" });
    $("#fechaprac").datepicker();
    $("#CargadoRendicion").datepicker();
    $("#fechaprac_desc").datepicker();
    Cargar_Medicamentos(false);
    ListaMonoDrogras();
    List_Descartables();
    var Query = {};
    Query = GetQueryString();
    if (Query['Id'] != 0) {
        Id = Query['Id'];
        Busqueda();
        NoCerrar = 1;
    }
    else {
        Id = 0;
        $("#CargadoFechaparte").html(Query['Fecha']);
        $("#CargadoParte").html("Provisorio");
        Cargar_Paciente_NHC(Query['NHC']);
    }
});

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}


function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;

    alert(paciente.Paciente);
    $.each(Paciente, function (index, paciente) {

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }
        $("#CargadoEdad").html(edad);
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.NHC);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        //$("#CargadoFechaparte").html(FechaActual());
        //$("#CargadoParte").html("Provisorio");
        //p.ObraSocial = row.OS;
        //OS = paciente.OSId;
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');


    });

}

function Busqueda() {
    var json = JSON.stringify({ "NHC": null, "InstitucionId": null, "Afiliado": null, "SeccionalId": null, "NroParte": Id, "DesdeParte": null, "HastaParte": null, "DesdePrac": null, "HastaPrac": null, "DesdeRend": null, "HastaRend": null, "EspecialidadId": null, "MedicoId": null });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ListPartes",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListPartes_Cargado,
        error: errores
    });
}


function Cargar_Medicamentos(Todos) {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista",
        data: '{Todos: "' + Todos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        error: errores
    });
}

function Cargar_Medicamentos_Cargado(Resultado) {
    var Medicamento = Resultado.d;
    $.each(Medicamento, function (index, Medicamento) {
        if (Medicamento.Medida != null) {
            var Medida = Medicamento.Medida;
        }
        else {
            var Medida = '';
        }
        $('#cbo_Medicamento').append(
              $('<option></option>').val(Medicamento.REM_ID).html(Medicamento.REM_NOMBRE + ' - ' + Medicamento.REM_GRAMAJE + Medida + ' - ' + Medicamento.Presentacion)
            );
    });

}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function ListPartes_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista == null) {
        alert('Nro. Parte Inexistente');
        document.location = "BusquedadePartes.aspx";
    }
    $.each(Lista, function (index, Parte) {
        $("#CargadoParte").html(Parte.NroParte);
        $("#CargadoNHC").html(Parte.NHC);
        $("#CargadoFechaparte").html(Parte.Fecha);
        $("#CargadoApellido").html(Parte.Paciente);
        $("#CargadoSeccional").html(Parte.Seccional);
        Cargar_Paciente_NHC(Parte.NHC);
        LoadCabeceraMedicamentos();
    });
}

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;


    $.each(Paciente, function (index, paciente) {

        $("#txtDNI").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);
        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }
        $("#CargadoEdad").html(edad);
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtDNI").attr('value', paciente.documento);
        $("#txtNHC").attr('value', paciente.NHC);
        Seccional_Id = paciente.Nro_Seccional;
        $("#cbo_Seccional").val(Seccional_Id);
        $("#cbo_Seccional").attr('disabled', 'disabled');
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
        }

    });

}

$("#cbo_Monodroga").change(function () {
    $("#precio").val('');
    ObtenerPrecio();
});

function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    // declare object
    var queryObj = {};
    // loop through each name-value pair and populate object
    for (var i = 0; i < querystring.length; i++) {
        // get name and value
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        // populate object
        queryObj[name] = value;
    }
    return queryObj;
}


$("#btnAgregarDesc").click(function () {
    if ($("#frm_Descartables").valid()) {
        $(".control-group").removeClass();
        objDescartable = {};
        if ($("#chkFacturado_desc").is(":checked"))
            objDescartable.Facturarlo = true;
        else
            objDescartable.Facturarlo = false;
        if ($("#chkEstadisticas_desc").is(":checked"))
            objDescartable.Estadisticas = true;
        else
            objDescartable.Estadisticas = false;
        if ($("#chkAPE_desc").is(":checked"))
            objDescartable.APE = true;
        else
            objDescartable.APE = false;

        if ($("#rdAmbulatorio_desc").is(":checked"))
            objDescartable.Ambulatorio = true;
        else
            objDescartable.Ambulatorio = false;

        if ($("#rdInternacion_desc").is(":checked"))
            objDescartable.Internacion = true;
        else
            objDescartable.Internacion = false;
        objDescartable.Descripcion = $("#cbo_Descartable :selected").text();
        objDescartable.InsumoId = $("#cbo_Descartable :selected").val();
        objDescartable.Cantidad = $("#cantidad_desc").val();
        objDescartable.Precio = $("#precio_desc").val();
        objDescartable.FechaPractica = $("#fechaprac_desc").val();
        objDescartable.Total = $("#subtotal_desc").val();
        var Estado = 1;
        var Cual = Total_1;
        if (Editando_1 == 1) {
            Cual = EditandoPos_1;
        }
        else {
            Total_1 = Total_1 + 1;
            Cual = Total_1;
        }
        objDescartable.Estado = Estado;
        objDescartables[Cual] = objDescartable;
        RenderizarTabla_desc();
        LimpiarCampos_desc();
        Editando_1 = 0;
        EditandoPos_1 = -1;
    }
});

function RenderizarTabla_desc() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Descripcion</th><th>Cantidad</th><th>Importe</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total_1; i++) {
        //Estado = 0 es Borrado
        if (objDescartables[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar_desc(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Descartable'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar_desc(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Descartable'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objDescartables[i].Descripcion + " </td><td> " + objDescartables[i].Cantidad + " </td><td> $" + objDescartables[i].Precio + " </td><td> $" + objDescartables[i].Total + " </td></tr>";
        }
    }
    var Pie = "</tbody></table>";
    $("#Tabla_Medicamentos_Desc").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

function Editar_desc(Nro) {
        Editando_1 = 1;
        EditandoPos_1 = Nro; 
        $("#cbo_Descartable").attr("disabled", "disabled");
        $("#cbo_Descartable").val(objDescartables[Nro].InsumoId);
        $("#cantidad_desc").val(objDescartables[Nro].Cantidad);
        $("#precio_desc").val(objDescartables[Nro].Precio);
        $("#fechaprac_desc").val(objDescartables[Nro].FechaPractica);
        $("#subtotal_desc").val(objDescartables[Nro].Total);
        if (objDescartables[Nro].Facturarlo)
            $("#chkFacturado_desc").attr("checked", "checked");
        if (objDescartables[Nro].Estadisticas)
            $("#chkEstadisticas_desc").attr("checked", "checked");
        if (objDescartables[Nro].APE)
            $("#chkAPE_desc").attr("checked", "checked");
        if (objDescartables[Nro].Ambulatorio)
            $("#rdAmbulatorio_desc").attr("checked", "checked");
        if (objDescartables[Nro].Internacion)
            $("#rdInternacion_desc").attr("checked", "checked");
        $("#btnAgregarDesc").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
        $("#btnCancelarDesc").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
}

function Eliminar_desc(Nro) {
    objDescartables[Nro].Estado = 0;
    RenderizarTabla_desc();
    objDescartables = $.grep(objDescartables, function (value) {
        return value.Estado != 0;
    });
    Total_1 = Total_1 - 1;
}

$("#precio_desc").blur(function () {
    if ($("#cantidad_desc").val() != null && $("#cantidad_desc").val() != undefined) {
        var tot = parseFloat($("#precio_desc").val()) * parseFloat($("#cantidad_desc").val());
        $("#subtotal_desc").val(tot.toFixed(2));
    }
    else $("#subtotal_desc").val('');
});

$("#cantidad_desc").blur(function () {
    if ($("#precio_desc").val() != null && $("#precio_desc").val() != undefined) {
        var tot = parseFloat($("#precio_desc").val()) * parseFloat($("#cantidad_desc").val()) * desc;
        $("#subtotal_desc").val(tot.toFixed(2));
    }
    else $("#subtotal_desc").val('');
});

function LimpiarCampos_desc() {
    $("#cbo_Descartable").removeAttr("disabled");
    $("#cbo_Descartable").val('');
    $("#cantidad_desc").val('');
    $("#precio_desc").val('');
    $("#fechaprac_desc").val('');
    $("#subtotal_desc").val('');
    $("#btnAgregarDesc").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarDesc").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#chkFacturado_desc").removeAttr("checked");
    $("#chkEstadisticas_desc").removeAttr("checked");
    $("#chkAPE_desc").removeAttr("checked");
    $("#rdAmbulatorio_desc").removeAttr("checked");
    $("#rdInternacion_desc").removeAttr("checked");
}

$("#btnCancelarDesc").click(function () {
    Editando_1 = 0;
    EditandoPos_1 = -1;
    $("#btnAgregarDesc").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarDesc").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCampos_desc();
});


////Medicamentos////

function RemoveClass() {
    $(".control-group").removeClass("error");
}

$("#btnAgregar").click(function () {
    if ($("#frm_Medicamentos").valid()) {
        RemoveClass();
        objMedicamento = {};
        if ($("#rdAmbulatorio").is(":checked")) {
            objMedicamento.Ambulatorio = true;
            objMedicamento.Internacion = false;
        }
        else {
            objMedicamento.Ambulatorio = false;
            objMedicamento.Internacion = true;
        }
        if ($("#chkFacturado").is(":checked"))
            objMedicamento.Facturarlo = true;
        else
            objMedicamento.Facturarlo = false;
        if ($("#chkEstadisticas").is(":checked"))
            objMedicamento.Estadisticas = true;
        else
            objMedicamento.Estadisticas = false;
        if ($("#chkAPE").is(":checked"))
            objMedicamento.APE = true;
        else
            objMedicamento.APE = false;
        //objMedicamento.NroParte = $("#CargadoParte").val();
        objMedicamento.Medicamento = $("#cbo_Medicamento :selected").val();
        objMedicamento.Monodroga = $("#cbo_Monodroga :selected").val();
        objMedicamento.Medicamento_Nombre = $("#cbo_Medicamento :selected").text();
        objMedicamento.Monodroga_Nombre = $("#cbo_Monodroga :selected").text();
        objMedicamento.Cantidad = $("#cantidad").val();
        objMedicamento.Precio = $("#precio").val();
        objMedicamento.FechaPractica = $("#fechaprac").val();
        objMedicamento.Total = $("#subtotal").val();
        var Estado = 1;
        var Cual = Total;
        if (Editando == 1) {
            Cual = EditandoPos;
        }
        else {
            Total = Total + 1;
            Cual = Total;
        }
        objMedicamento.Estado = Estado;
        objMedicamentos[Cual] = objMedicamento;
        RenderizarTabla();
        LimpiarCampos();
        Editando = 0;
        EditandoPos = -1;
    }
});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Medicamento</th><th>Monodroga</th><th>Cantidad</th><th>Importe</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Medicamento_Nombre + " </td><td> " + objMedicamentos[i].Monodroga_Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> $" + objMedicamentos[i].Precio + " </td><td> $" + objMedicamentos[i].Total + " </td></tr>";
        }
    }
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    if (objMedicamentos[Nro].Ambulatorio)
        $("#rdAmbulatorio").attr("checked", "checked");
    else
        $("#rdInternacion").attr("checked", "checked");
    $("#chkFacturado").attr("checked", "checked");
    $("#cbo_Medicamento").attr("disabled", "disabled");
    $("#cbo_Medicamento").val(objMedicamentos[Nro].Medicamento);
    $("#cbo_Monodroga").val(objMedicamentos[Nro].Monodroga);
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    $("#precio").val(objMedicamentos[Nro].Precio);
    $("#fechaprac").val(objMedicamentos[Nro].FechaPractica);
    $("#subtotal").val(objMedicamentos[Nro].Total);
    if (objMedicamentos[Nro].Facturarlo)
        $("#chkFacturado").attr("checked", "checked");
    if (objMedicamentos[Nro].Estadisticas)
        $("#chkEstadisticas").attr("checked", "checked");
    if (objMedicamentos[Nro].APE)
        $("#chkAPE").attr("checked", "checked");
    $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelar").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
}

function Eliminar(Nro) {
    objMedicamentos[Nro].Estado = 0;
    RenderizarTabla();
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total= Total - 1;
}

$("#precio").blur(function () {
    if ($("#cantidad").val() != null && $("#cantidad").val() != undefined) {
        var tot = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val());
        $("#subtotal").val(tot.toFixed(2));
    }
    else $("#subtotal").val('');
});

$("#cantidad").blur(function () {
    if ($("#precio").val() != null && $("#precio").val() != undefined) {
        var tot = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val()) * desc;
        $("#subtotal").val(tot.toFixed(2));
    }
    else $("#subtotal").val('');
});

function LimpiarCampos() {
    $("#cbo_Medicamento").removeAttr("disabled");
    $("#cbo_Medicamento").val('0');
    $("#cbo_Monodroga").val('0');
    $("#cantidad").val('');
    $("#precio").val('');
    $("#fechaprac").val('');
    $("#subtotal").val('');
    $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelar").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#chkFacturado").removeAttr("checked");
    $("#chkEstadisticas").removeAttr("checked");
    $("#chkAPE").removeAttr("checked");
}

$("#btnCancelar").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelar").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCampos();
});

function Insert() {
    if (Id > 0) {
        var f = {};
        f.NroParte = Id;
        f.FechaParte = $("#CargadoFechaparte").html();
        f.FechaRendicion = $("#CargadoRendicion").val();
        f.NHC = $("#CargadoNHC").html();
        var json = JSON.stringify({ "m": f });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/InsertMedicamentosCab",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: InsertMedicamentosCab_Cargado,
            error: errores
        });
    }
    else {
        GetNuevoId();
    }
}

function GetNuevoId() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/GetNroParte",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetNroParte_Cargado,
        error: errores
    });
}

function GetNroParte_Cargado(Resultado) { 
    var n = Resultado.d;
    if (n > 0) {
        Id = n;
        var f = {};
        f.NroParte = Id;
        f.FechaParte = $("#CargadoFechaparte").html();
        f.FechaRendicion = $("#CargadoRendicion").val();
        f.NHC = $("#CargadoNHC").html();
        var json = JSON.stringify({ "m": f });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/InsertMedicamentosCab",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: InsertMedicamentosCab_Cargado,
            error: errores
        });
    }
    else alert("Error al Cargar Partes");
}

$("#btnConfirmar").click(function () {
    if (objDescartables.length > 0 || objMedicamentos.length > 0) {
    if (!Existe) {
        Insert();
    }
    else DeleteDetalles();
    }
    else alert('Ingrese Algun Medicamento o Descartable');
});

function InsertMedicamentosCab_Cargado(Resultado) {
    var r = Resultado.d;
    if (r > 0) {
        if (objDescartables.length > 0) {
            var json2 = JSON.stringify({ "objDescartables": objDescartables, "NroParte" : Id });
            $.ajax({
                type: "POST",
                url: "../Json/Facturacion/Facturacion.asmx/InsertDescartablesDet",
                data: json2,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: InsertDescartablesDet_Cargado,
                error: errores
            });
        }
        if (objMedicamentos.length > 0) {
            var json = JSON.stringify({ "objMedicamentos": objMedicamentos, "NroParte": Id });
            $.ajax({
                type: "POST",
                url: "../Json/Facturacion/Facturacion.asmx/InsertMedicamentosDet",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: InsertMedicamentosDet_Cargado,
                error: errores
            });
        }
    }
}

function Insert_Detalles_Nuevos() {
    if (objDescartables.length > 0) {
        var json2 = JSON.stringify({ "objDescartables": objDescartables, "NroParte": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/InsertDescartablesDet",
            data: json2,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: InsertDescartablesDet_Cargado,
            error: errores
        });
    }
    if (objMedicamentos.length > 0) {
        var json = JSON.stringify({ "objMedicamentos": objMedicamentos, "NroParte": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/InsertMedicamentosDet",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: InsertMedicamentosDet_Cargado,
            error: errores
        });
    }
}

function InsertMedicamentosDet_Cargado() {
    alert('Medicamentos Insertados Correctamente');
    //alert(Id);
    if (objDescartables.length > 0) {
        if (Paso > 0) {
            parent.$.fancybox.close();
        }
        else Paso = Paso + 1;
    }
    else {
        parent.$.fancybox.close();
    }
}

function InsertDescartablesDet_Cargado() {
    alert('Descartables Insertados Correctamente');
    if (objMedicamentos.length > 0) {
        if (Paso > 0) {
            parent.$.fancybox.close();
        }
        else Paso = Paso + 1;
    }
    else {
        parent.$.fancybox.close();
    }
}

function LoadCabeceraMedicamentos() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_Medicamentos_Cab",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadCabeceraMedicamentos_Cargado,
        error: errores
    });
}

function LoadCabeceraMedicamentos_Cargado(Resultado) {
    var Cabecera = Resultado.d;
    if (Cabecera != null) {
        $("#CargadoParte").html(Cabecera.NroParte);
        $("#CargadoNHC").html(Cabecera.NHC);
        $("#CargadoFechaparte").html(Cabecera.FechaParte);
        $("#CargadoSeccional").html(Cabecera.Seccional);
        $("#CargadoRendicion").val(Cabecera.FechaRendicion);
        $("#CargadoRendicion").attr("disabled","disabled");
        LoadDetalles();
        LoadDetallesDesc();
        Existe = 1;
    }
}

function LoadDetalles() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_Medicamentos_Det",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadDetalles_Cargado,
        error: errores
    });
}

function LoadDetalles_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Medicamento</th><th>Monodroga</th><th>Cantidad</th><th>Importe</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, Detalle) {
        var Tot = Detalle.Precio * Detalle.Cantidad;
        objMedicamentos[i] = Detalle;
        objMedicamentos2[i] = Detalle;
        objMedicamentos[i].Total = Tot;
        objMedicamentos[i].Estado = 1;
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Medicamento_Nombre + " </td><td> " + objMedicamentos[i].Monodroga_Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> $" + objMedicamentos[i].Precio + " </td><td> $" + objMedicamentos[i].Total + " </td></tr>";
        Total = Total + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

function LoadDetallesDesc() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_Descartables_Det",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadDetallesDesc_Cargado,
        error: errores
    });
}

function ListaMonoDrogras() {
    var Id = 0;
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/MonoDrogas",
        data: '{Numero: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var MonoDrogas = Resultado.d;
            $('#cbo_Monodroga').empty();
            $('#cbo_Monodroga').append('<option value="0"></option>');
            $.each(MonoDrogas, function (index, mono) {
                $('#cbo_Monodroga').append(
              $('<option></option>').val(mono.numero).html(mono.nombre)
            );
                //if (mono.numero == Monodroga) $('#cbo_Monodroga').val(Monodroga);
            });
        },
        error: errores
    });
}

$("#cbo_Medicamento").change(function () {
    $("#cbo_Monodroga").val('0');
});

function ObtenerPrecio() { 
var json = JSON.stringify({"MonodrogaId": $('#cbo_Monodroga :selected').val() , "InsumoId": $("#cbo_Medicamento").val() });
     $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/Fact_PrecioMax_Monodroga",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var precio = Resultado.d;
            $('#precio').empty();
            $('#precio').val(precio);
        },
        error: errores
    });
}

function LoadDetallesDesc_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Descripcion</th><th>Cantidad</th><th>Importe</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, Detalle) {
        var Tot = Detalle.Precio * Detalle.Cantidad;

        objDescartables[i] = Detalle;
        objDescartables2[i] = Detalle;
        objDescartables[i].Total = Tot;
        objDescartables[i].Estado = 1;
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar_desc(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Descartable'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar_desc(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Descartable'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objDescartables[i].Descripcion + " </td><td> " + objDescartables[i].Cantidad + " </td><td> $" + objDescartables[i].Precio + " </td><td> $" + objDescartables[i].Total + " </td></tr>";
        Total_1 = Total_1 + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#Tabla_Medicamentos_Desc").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

function DeleteDetalles() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/Delete_Descartables_Det",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Delete_Descartables_Det_Cargado,
        error: errores
    });
}

function Delete_Descartables_Det_Cargado(Resultado) {
    if (Resultado.d > 0) {
        var json = JSON.stringify({ "NroParte": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/Delete_Medicamentos_Det",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Delete_Medicamentos_Det_Cargado,
            error: errores
        });
    }
}

function Delete_Medicamentos_Det_Cargado(Resultado) {
    if (Resultado.d > 0) {
        Insert_Detalles_Nuevos();
    }
}

function List_Descartables_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Insumo) {
        $("#cbo_Descartable").append($("<option></option>").val(Insumo.REM_ID).html(Insumo.REM_NOMBRE + "-" + Insumo.REM_GRAMAJE + Insumo.Medida));
    });
   
}

function List_Descartables() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ListInsumosDescartables",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Descartables_Cargado,
        error: errores
    });
}

function Get_Insumo_by_Id(Id) {
    $.ajax({
        type: "POST",
        data: "{Id: '" + Id + "'}",
        url: "../Json/Farmacia/Farmacia.asmx/Get_Insumo_by_Id",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Get_Insumo_by_Id_Cargado,
        error: errores
    });
}

function Get_Insumo_by_Id_Cargado(Resultado) {
    var Insumo = Resultado.d;
    $("#precio_desc").val(Insumo.REM_PRECIO);
}

$("#cbo_Descartable").change(function () {
    Get_Insumo_by_Id($("#cbo_Descartable :selected").val());
});








