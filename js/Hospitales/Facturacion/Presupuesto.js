var Seccional_Id = 0;
var OS = 0;
var objList = new Array();
var objList2 = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var PresupuestoId = 0;
var MedicoId;
var EspecialidadId;
var ServicioId;

$("#desdeaqui").click(function () {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    $("#CargadoSeccional").html($("#cbo_Seccional :selected").text());
    $("#CargadoApellido").html($("#txtPaciente").val());
    $("#CargadoCentro").html($("#cbo_Centro :selected").text());
    $("#CargadoInstitucion").html($("#cbo_Institucion :selected").text());
    $("#CargadoMedico").html($("#cbo_Medicos :selected").text());
    $("#CargadoEspecialidad").html($("#cbo_Especialidad :selected").text());
    $("#CargadoServicio").html($("#cbo_Servicio :selected").text());
    Seccional_Id = $("#cbo_Seccional :selected").val();
    InstSecc = $("#cbo_Institucion :selected").val();
    MedicoId = $("#cbo_Medicos :selected").val();
    EspecialidadId = $("#cbo_Especialidad :selected").val();
    ServicioId = $("#cbo_Servicio :selected").val();
});


$(document).ready(function () {
    $("#txtNroParte").val("Provisorio");
    $("#txtNroParte").attr("disabled", "disabled");
    $("#txtFechaCarga").val(FechaActual());
    $("#txtFechaCarga").attr("disabled", "disabled");
    var Query = {};
    Query = GetQueryString();
    if (Query['NHC'] != null) {
        Cargar_Paciente_NHC(Query['NHC']);
    }
    if (Query['Presupuesto'] != undefined) {
        PresupuestoId = Query['Presupuesto'];
        CargarCabecera();

    }
    else {
        List_Servicios();
        List_Medicos();
        Especialidades_Lista();
        List_Seccionales();
        List_Centro();
        List_ObraSociales(true);
        ListarPracticas();
    }
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


function CargarCabecera() {
    var json = JSON.stringify({ "Nro_Presupuesto": PresupuestoId });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/List_Cabecera_byId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Cabecera_byId_Cargado,
        error: errores
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
    $.each(Paciente, function (index, paciente) {

        $("#txtNHC").attr('value', paciente.NHC);
        $("#txtPaciente").val(paciente.Paciente);
        Seccional_Id = paciente.Nro_Seccional;
        OS = paciente.OSId;
        List_Servicios();
        List_Medicos();
        Especialidades_Lista();
        List_Seccionales();
        List_Centro();
        List_ObraSociales(true);
        ListarPracticas();
    });
}

function List_Cabecera_byId_Cargado(Resultado) {
    var Cabecera = Resultado.d;
    if (Cabecera != null) {
        $("#txtNroParte").attr("disabled", "disabled");
        $("#txtPaciente").attr("disabled", "disabled");
        $("#txtFechaCarga").attr("disabled", "disabled");
        $("#cbo_Seccional").attr("disabled", "disabled");
        $("#cbo_Servicio").attr("disabled", "disabled");
        $("#cbo_Institucion").attr("disabled", "disabled");
        $("#cbo_Especialidad").attr("disabled", "disabled");
        $("#cbo_Centro").attr("disabled", "disabled");
        $("#cbo_Medicos").attr("disabled", "disabled");
        $("#btnPrint").show();
        $("#btnConfirmar").hide();
        $("#txtNroParte").val(Cabecera.Presupuesto_Id);
        $("#txtFechaCarga").val(Cabecera.Fecha);
        OS = Cabecera.InstitucionId;
        Seccional_Id = Cabecera.SeccionalId;
        $("#txtPaciente").val(Cabecera.Paciente);
        $("#CargadoApellido").html($("#txtPaciente").val());
        MedicoId = Cabecera.MedicoId;
        EspecialidadId = Cabecera.EspecialidadId;
        ServicioId = Cabecera.ServicioId;
        List_Servicios();
        MedicoPorEsp(EspecialidadId);
        Especialidades_Lista();
        List_Seccionales();
        List_Centro();
        List_ObraSociales(true);
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        CargarDetalles();
    }
    else {
        alert('No se encontro presupuesto');
    }
}

function CargarDetalles() {
    var json = JSON.stringify({ "Nro_Presupuesto": PresupuestoId });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/List_Detalles_byId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Detalles_byId_Cargado,
        error: errores
    });
}

function List_Detalles_byId_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>F.Práctica</th><th>F.Rendición</th><th>Tipo</th><th>Fact</th><th>Cantidad</th><th>Código</th><th>Práctica</th><th>Imp. Unit</th><th>Imp. Total</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, Detalle) {
        var Facturar = 'N';
        if (Detalle.Facturar) Facturar = 'S';
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.FechaPractica + " </td><td> " + Detalle.FechaRendicion + " </td><td> " + Detalle.Tipo + " </td><td> " + Facturar + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.PracticaId + " </td><td> " + Detalle.PracticaDesc + " </td><td> $" + Detalle.Precio + " </td><td> $" + Detalle.Total + " </td></tr>";
        objList[i] = Detalle;
        objList[i] = Detalle;
        objList[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
    });

    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);
}


function List_Seccionales() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Seccionales_Cargado,
        error: errores
    });
}

function List_Seccionales_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (PresupuestoId == 0) {
        $.each(Lista, function (index, Seccional) {
            $("#cbo_Seccional").append($("<option></option>").val(Seccional.Nro).html(Seccional.Seccional));
            if (Lista.length - 1 == index) {
                $('#cbo_Seccional').val(Seccional_Id);
                $("#CargadoSeccional").html($("#cbo_Seccional :selected").text());
            }
        });
    }
    else {
        $.each(Lista, function (index, Seccional) {
            $("#cbo_Seccional").append($("<option></option>").val(Seccional.Nro).html(Seccional.Seccional));
            if (Lista.length - 1 == index) {
                $('#cbo_Seccional').val(Seccional_Id);
                $("#CargadoSeccional").html($("#cbo_Seccional :selected").text());
            }
        });
        
    }
}

function List_Servicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Cargado,
        error: errores
    });
}

function List_Servicios_Cargado(Resultado) {
    var Servicios = Resultado.d;
    if (PresupuestoId == 0) {
        $.each(Servicios, function (index, Servicio) {
            $('#cbo_Servicio').append(
              $('<option></option>').val(Servicio.id).html(Servicio.descripcion)
            );
        });
    }
    else {
        $.each(Servicios, function (index, Servicio) {
            $('#cbo_Servicio').append(
              $('<option></option>').val(Servicio.id).html(Servicio.descripcion)
            );
            if (Servicios.length - 1 == index) {
                $('#cbo_Servicio').val(ServicioId);
                $("#CargadoServicio").html($("#cbo_Servicio :selected").text());
            }
        });
    }
}

function List_Medicos() {
    var json = JSON.stringify({ "Apellido": null, "MN": null, "MP": null, "objBusquedaLista": null });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (PresupuestoId == 0) {
        $.each(Lista, function (index, Medico) {
            $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        });
    }
    else {
        if (Lista.length - 1 == index) $('#cbo_Medicos').val(MedicoId);
    }
}

$("#cbo_Institucion").change(function () {
    if ($("#cbo_Institucion :selected").val() != "0") {
        $("#cbo_Seccional").val("998"); //Obra Social
        $("#cbo_Seccional").attr("disabled", "disabled");
        OS = $("#cbo_Institucion").val();
    }
    else {
        $("#cbo_Seccional").removeAttr("disabled");
        OS = $("#cbo_Institucion").val();
    }
});

function Especialidades_Lista() {
    var json = JSON.stringify({ "Todas": false, "Id": 0, "SoloTurnos": false });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidades_Lista_Cargado,
        error: errores
    });
}

function Especialidades_Lista_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Especialidad").append("<option value='0'></option>");
    if (PresupuestoId == 0) {
        $.each(Lista, function (index, Especialidad) {
            $("#cbo_Especialidad").append($("<option></option>").val(Especialidad.Id).html(Especialidad.Especialidad));
        });
    }
    else {
        $.each(Lista, function (index, Especialidad) {
            $("#cbo_Especialidad").append($("<option></option>").val(Especialidad.Id).html(Especialidad.Especialidad));
            if (Lista.length - 1 == index) {
                $('#cbo_Especialidad').val(EspecialidadId);
                $("#CargadoEspecialidad").html($("#cbo_Especialidad :selected").text());
            }
        });
    }
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function List_ObraSociales(Todas) {
    var json = JSON.stringify({ "Todas": Todas });
    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/ListObraSociales",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_ObraSociales_Cargado,
        error: errores
    });
}

function List_ObraSociales_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (PresupuestoId == 0) {
        $.each(Lista, function (index, Obra) {
            $("#cbo_Institucion").append($("<option></option>").val(Obra.id).html(Obra.OS));
            if (Lista.length - 1 == index) {
                $("#cbo_Institucion").val(OS);
                $("#CargadoInstitucion").html($("#cbo_Institucion :selected").text());
            }
        });
    }
    else {
        $.each(Lista, function (index, Obra) {
            $("#cbo_Institucion").append($("<option></option>").val(Obra.id).html(Obra.OS));
            if (Lista.length - 1 == index) {
                $("#cbo_Institucion").val(OS);
                $("#CargadoInstitucion").html($("#cbo_Institucion :selected").text());
            }
        });
    }
}

function List_Centro() {
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/Centro.asmx/CentroUnico",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Centro_Cargado,
        error: errores
    });
}

function List_Centro_Cargado(Resultado) {
    var Centro = Resultado.d;
    $("#cbo_Centro").append($("<option></option>").val(Centro.Id).html(Centro.RazonSocial));
    $("#CargadoCentro").html($("#cbo_Centro :selected").text());
}


function ValorPractica() {
    var InstSecc;
    if (Seccional_Id == 998) InstSecc = OS;
    else InstSecc = Seccional_Id;
    var json = JSON.stringify({ "InstSecc": InstSecc, "EspecialidadId": $("#cbo_Especialidad :selected").val(), "PracticaId": $("#cbo_Practica :selected").val(),
        "FechaParte": $("#txtFechaCarga").val()
    });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ValorPracticaporConvenio",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ValorPractica_Cargado,
        error: errores
    });
}

function ValorPractica_Cargado(Resultado) {
    var Valor = Resultado.d;
    if (Valor != null) {
        var val = Valor.ValorNN.replace(",", ".");
        $("#precio").val(val);
    } else {
        alert('La Práctica no está valorizada');
        $("#precio").val('');
    }
}

function ValorModulo() {
    var InstSecc;
    if (Seccional_Id == 998) InstSecc = OS;
    else InstSecc = Seccional_Id;
    var json = JSON.stringify({ "InstSecc": InstSecc, "ModuloId": $("#cbo_Practica :selected").val(), "FechaParte": $("#txtFechaCarga").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/Fact_Valor_Modulo_Convenio",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ValorModulo_Cargado,
        error: errores
    });
}

function ValorModulo_Cargado(Resultado) {
    var Valor = Resultado.d;
    if (Valor != null) {
        var val = Valor.ValorNN.replace(",", ".");
        $("#precio").val(val);
    } else {
        alert('El Módulo no está valorizado');
        $("#precio").val('');
    }
}

function Cargar_Modulos() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/ListadodeModulosTotal",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pracias_Cargadas,
        error: errores
    });
}

function Pracias_Cargadas(Resultado) {
    var Practicas = Resultado.d;
    $('#cbo_Practica').empty();
    $('#cbo_Practica').append($('<option></option>').val('0').html(''));
    $.each(Practicas, function (index, practicas) {
        $('#cbo_Practica').append(
              $('<option></option>').val(practicas.Codigo).html(practicas.Descripcion)
            );
        if (practicas.Codigo == $("#codigo").val()) $('#cbo_Practica').val($("#codigo").val());
    });
}

function MedicoPorEsp(Val) {
    var json = JSON.stringify({ "Especialidad": Val });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MedicosporEsp_Cargado,
        error: errores
    });
}

$("#cbo_Especialidad").change(function () {
    MedicoPorEsp($("#cbo_Especialidad :selected").val());
});

function MedicosporEsp_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medicos").empty();
    if (PresupuestoId == 0) {
        $.each(Lista, function (index, Medico) {
            $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        });
    }
    else {
        $.each(Lista, function (index, Medico) {
            $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
            if (Lista.length - 1 == index) {
                $("#cbo_Medicos").val(MedicoId);
                $("#CargadoMedico").html($("#cbo_Medicos :selected").text());
            }
        });
      

    }
}

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
    $('#cbo_Practica').empty();
    $('#cbo_Practica').append($('<option></option>').val('0').html(''));
    $.each(Practicas, function (index, Practica) {
        $('#cbo_Practica').append(
              $('<option></option>').val(Practica.Codigo).html(Practica.Practica)
            );
        if (Practica.Codigo == $("#codigo").val()) $('#cbo_Practica').val($("#codigo").val());
    });
}

$("#cbo_Practica").change(function () {
    $("#codigo").val($("#cbo_Practica :selected").val());
    if ($("#rdPractica").is(":checked"))
        ValorPractica();
    else ValorModulo();
});

$("#codigo").blur(function () {
    $("#cbo_Practica").val($("#codigo").val());
    if ($("#rdPractica").is(":checked"))
        ValorPractica();
    else ValorModulo();
});

$("#rdModulo").click(function () {
    Cargar_Modulos();
});

$("#rdPractica").click(function () {
    ListarPracticas();
});

$("#precio").blur(function () {
    if ($("#precio").val().length > 0 || $("#cantidad").val().length > 0)
        var total = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val());
    $("#total").val(total);
});

$("#btnAgregar_").click(function () {
    var Obj = {};
    var Modulo = false;
    var Practica = false;
    if ($("#rdPractica").is(":checked")) Practica = true;
    if ($("#rdModulo").is(":checked")) Modulo = true;
    Obj.PracticaId = $("#cbo_Practica :selected").val();
    Obj.FechaPractica = $("#txtFechaCarga").val();
    Obj.FechaRendicion = $("#txtFechaCarga").val();
    Obj.Tipo = 'I';
    Obj.Modulo = Modulo;
    Obj.Practica = Practica;
    Obj.Facturar = true;
    Obj.Cantidad = $("#cantidad").val();
    Obj.PracticaDesc = $("#cbo_Practica :selected").text();
    Obj.Precio = $("#precio").val();
    Obj.Total = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val());
    var Estado = 1;
    var Cual = Total;
    if (Editando == 1) {
        Cual = EditandoPos;
    }
    else {
        Total = Total + 1;
        Cual = Total;
    }
    Obj.Estado = Estado;
    objList[Cual] = Obj;
    RenderizarTabla();
    LimpiarCampos();
    Editando = 0;
    EditandoPos = -1;
});


function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>F.Práctica</th><th>F.Rendición</th><th>Tipo</th><th>Fact</th><th>Cantidad</th><th>Código</th><th>Práctica</th><th>Imp. Unit</th><th>Imp. Total</th></tr></thead><tbody>";
    var Contenido = "";
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        var Facturar = 'N';
        if (objList[i].Facturar) Facturar = 'S';
        if (objList[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objList[i].FechaPractica + " </td><td> " + objList[i].FechaRendicion + " </td><td> " + objList[i].Tipo + " </td><td> " + Facturar + " </td><td> " + objList[i].Cantidad + " </td><td> " + objList[i].PracticaId + " </td><td> " + objList[i].PracticaDesc + " </td><td> $" + objList[i].Precio + " </td><td> $" + objList[i].Total + " </td></tr>";
        }
    }
    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#codigo").attr("disabled", "disabled");
    $("#cbo_Practica").attr("disabled", "disabled");
    $("#rdModulo").attr('disabled', 'disabled');
    $("#rdPractica").attr('disabled', 'disabled');
    $("#codigo").val(objList[Nro].PracticaId);
    if (objList[Nro].Modulo) $("#rdModulo").attr('checked', 'checked');
    else $("#rdPractica").attr('checked', 'checked');
    if ($("#rdModulo").is(":checked"))
        Cargar_Modulos();
    else ListarPracticas();
    $("#cbo_Servicio").val(objList[Nro].ServicioId);
    $("#cbo_Especialidad").val(objList[Nro].EspecialidadId);
    $("#cbo_Medicos").val(objList[Nro].MedicoId);
    $("#cantidad").val(objList[Nro].Cantidad);
    $("#precio").val(objList[Nro].Precio);
    $("#total").val(objList[Nro].Total);
    $("#btnAgregar_").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelar_").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
}

function Eliminar(Nro) {
    objList[Nro].Estado = 0;
    RenderizarTabla();
    objList = $.grep(objList, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
}

$("#btnCancelar_").click(function () {
    LimpiarCampos();
});

function LimpiarCampos() {
    Editando = 0;
    EditandoPos = -1;
        $("#cantidad").val('');
        $("#codigo").val('');
        $("#cbo_Practica").val('0');
        $("#precio").val('');
        $("#total").val('');
        $("#rdModulo").removeAttr("checked", "");
        $("#rdPractica").removeAttr("checked", "");
        $("#btnAgregar_").html("<i class='icon-plus-sign icon-white'></i> Agregar");
        $("#btnCancelar_").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
        $("#codigo").removeAttr("disabled");
        $("#cbo_Practica").removeAttr("disabled");
        $("#rdInternacion").attr("checked", "checked");
        $("#rdPractica").attr("checked", "checked");
        $("#rdPractica").removeAttr("disabled");
        $("#rdModulo").removeAttr("disabled");
}

function SaveCabecera() { 
    var Cab = {};
    Cab.ServicioId = $("#cbo_Servicio :selected").val();
    Cab.Paciente = $("#CargadoApellido").html();
    Cab.SeccionalId = $("#cbo_Seccional :selected").val();
    Cab.InstitucionId = $("#cbo_Institucion :selected").val();
    Cab.EspecialidadId = $("#cbo_Especialidad :selected").val();
    Cab.MedicoId = $("#cbo_Medicos :selected").val();
    Cab.Incluye = $("#Incluye").val();
    Cab.NoIncluye = $("#noIncluye").val();
    Cab.Diagnostico = $("#diagnostico").val();
    var json = JSON.stringify({ "o": Cab});
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/PresupuestoInsertCab",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: PresupuestoInsertCab_Cargado,
        error: errores
    });
}

function PresupuestoInsertCab_Cargado(Resultado) {
    PresupuestoId = Resultado.d;
    var json = JSON.stringify({"List": objList, "PresupuestoId": PresupuestoId});
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/PresupuestoInsertDet",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: PresupuestoInsertDet_Cargado,
        error: errores
    });
}

function PresupuestoInsertDet_Cargado(Resultado) {
    var url = "../Impresiones/ImpresionPresupuesto.aspx?Id=" + PresupuestoId;
    Ventana(url);
}

$("#btnConfirmar").click(function () {
    SaveCabecera();

});

function Ventana(url) {

    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location = "Presupuestos.aspx";
            }
        });
}


$("#btnPrint").click(function () {
    if (PresupuestoId > 0) {
        var url = "../Impresiones/ImpresionPresupuesto.aspx?Id=" + PresupuestoId;
        Ventana(url);
    }
});

$("#btnBuscarPaciente").fancybox({
    'hideOnContentClick': true,
    'width': '75%',
    'height': '75%',
    'autoScale': false,
    'transitionIn': 'none',
    'transitionOut': 'none',
    'type': 'iframe'
});

$("a#inline").fancybox({
    'hideOnContentClick': true
});

function RecargarPagina(url) {
    document.location = "../Facturacion/Presupuestos.aspx" + url;
}