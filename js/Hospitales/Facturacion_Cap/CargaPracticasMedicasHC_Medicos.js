var objPractica = Array();
var objPracticas2 = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objPracticas = new Array();
var Seccional_Id;
var Id = 0;
var Guardar = 0;
var Existe = 0;


$.validator.setDefaults({
    ignore: ""
});

$(document).ready(function () {
    $("#frm_Inicio").validate({
        rules: {
            'txtNroParte': { required: true, number: true },
            'txtFechaCarga': { required: true, dateES: true }
        },
        messages: {
            'txtNroParte': { required: '', number: '' },
            'txtFechaCarga': { required: '', dateES: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    $("#frm_Internacion").validate({
        rules: {
            'fechapractica': { required: true, dateES: true },
            'fecharendicion': { required: true, dateES: true },
            'cantidad': { required: true, number: true, range: [1, 999] },
            'porcentaje': { required: true, number: true },
            'precio': { required: true, number: true },
            'total': { required: true, number: true }
        },
        messages: {
            'fechapractica': { required: '', dateES: '' },
            'fecharendicion': { required: '', dateES: '' },
            'cantidad': { required: '', number: '', range: '' },
            'porcentaje': { required: '', number: '' },
            'precio': { required: '', number: '' },
            'total': { required: '', number: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    InitControls();
    var Query = {};
    Query = GetQueryString();
    $("#btnImprimir").hide();
    if (Query['Id'] != null) {
        Id = Query['Id'];
        CargarCabecera();
        EstaProcesadoParte();
        InitControls_DetPartes();
        //$("#btnBaja").show();
    }
});

function InitControls() {
    ListMedicos(0);
    List_Centro();
    Especialidades_Lista();
    $("#txtNroParte").val("Provisorio");
    $("#txtNroParte").attr("disabled", "disabled");
    $("#txtFechaCarga").val(FechaActual());
    $("#txtFechaCarga").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaCarga").datepicker();
    $("#fechapractica").datepicker();
    $("#fecharendicion").datepicker();
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

function ListModulosEnc() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ListModulosEnc",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListModulosEnc_Cargado,
        error: errores
    });
}

function ListModulosEnc_Cargado(Resultado) {
    $('#cbo_ModulosEnc').empty();
    $('#cbo_ModulosEnc').append($('<option value="0"></option>'));
    Modulos_Cargar();
    var List = Resultado.d;
    if (List != null)
        List.forEach(BindModuloEnc);
}

function BindModuloEnc(item) {
    $('#cbo_ModulosEnc').append(
              $('<option></option>').val(item.EncabezadoId).html(item.Descripcion)
            );
}

$('#cbo_ModulosEnc').change(function () {
    Modulos_Cargar();
});

function Modulos_Cargar() {
    $("#codigo").val('');
    $('#cbo_Modulo').empty();
    $('#txtModulo').val('');
    var json = JSON.stringify({ "EncabezadoId": $("#cbo_ModulosEnc :selected").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/ListaModulosbyEnc",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Modulos_CargadosEnc,
        error: errores
    });
}

function Modulos_CargadosEnc(Resultado) {
    var List = Resultado.d;
    if (List != null)
        List.forEach(BindModulos);
}

function BindModulos(item) {
    $('#cbo_Modulo').append(
              $('<option title="' + item.DescDetallado + '"></option>').val(item.moduloid).html(item.modulo)
            );
}



$("#btnBaja").click(function () {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/Baja_ParteMedicos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: BajaParte,
        error: errores
    });
});

function EstaProcesadoParte() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/EstaProcesadoParteMedicos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: EstaProcesadoParteCargado,
        error: errores
    });
}

function EstaProcesadoParteCargado(Resultado) {
    var r = Resultado.d;
    if (r > 0) { //Procesado, no se puede modificar parte y ni darlo de baja.
        $("#btnBaja").hide();
        $("#btnConfirmar").hide();
    }
    else { //No procesado, se puede modificar parte y ni darlo de baja.
        $("#btnBaja").show();
        $("#btnConfirmar").show();
    }
}

function BajaParte(Resultado) {
    var r = Resultado.d;
    if (r > 0) {
        alert("Parte Dado de baja");
        window.location = "BusquedadePartes_Medicos.aspx";
    }
    else alert("PARTE PROCESADO, NO PUEDE DARSE DE BAJA");
}

function CargarCabecera() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/ListPartesMedicoCab",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListPartesCab_Cargado,
        error: errores
    });
}

function ListPartesCab_Cargado(Resultado) {
    var Cabecera = Resultado.d;
    if (Cabecera != null) {
        $("#txtNroParte").val(Cabecera.NroParte);
        $("#txtFechaCarga").val(Cabecera.Fecha);
        $("#cbo_Centro").val(Cabecera.CentroId);
        $("#cbo_Medico").val(Cabecera.MedicoId);
        if (Cabecera.Ambulatorio)
            $("#rdAmbu").attr("checked", "checked");
        else {
            $("#rdInter").attr("checked", "checked");
        }
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        $("#CargadoCentro").html($("#cbo_Centro :selected").text());
        $("#CargadoMedico").html($("#cbo_Medico :selected").text());
        $("#CargadoFecha").html($("#txtFechaCarga").val());
        CargarDetalles();
        $("#btnImprimir").show();
    }
}

function CargarDetalles() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/ListPartesDetMedicos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListPartesDet_Cargado,
        error: errores
    });
}


function Calcular_Descuento2(e) {
    Descuento = parseFloat(e);
    var porc = parseFloat(100);
    var desc = (porc - Descuento) / porc;
    return desc;
}

function ListPartesDet_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>F.Práctica</th><th>F.Rendición</th><th>Tipo</th><th>Fact</th><th>Cantidad</th><th>Código</th><th>Práctica</th><th>%</th><th>Imp. Unit</th><th>Imp. Total</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, Detalle) {
        tipo = ''; fact = 'N';
        if (Detalle.Ambulatorio) tipo = 'A';
        else tipo = 'I';
        if (Detalle.Facturarlo) fact = 'S';

        var desc = Calcular_Descuento2(Detalle.Porcentaje);
        Detalle.Total = parseFloat(Detalle.Precio) * desc * Detalle.Cantidad;
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Practica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Practica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.FechaPractica + " </td><td> " + Detalle.FechaRendicion + " </td><td> " + tipo + " </td><td> " + fact + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.PracticaId + " </td><td> " + Detalle.PracNombre + " </td><td> " + Detalle.Porcentaje + " </td><td> $" + Detalle.Precio + " </td><td> $" + Detalle.Total + " </td></tr>";
        objPracticas[i] = Detalle;
        objPracticas2[i] = Detalle;
        objPracticas[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
    });

    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);
}

function Calcular_Descuento2(Descuento) {
    var d = parseFloat(Descuento);
    var porc = parseFloat(100);
    var desc = d / porc;
    return desc;
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
    $.each(Servicios, function (index, Servicio) {
        $('#cbo_Servicio').append(
              $('<option></option>').val(Servicio.id).html(Servicio.descripcion)
            );
    });
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

$("#codigo").change(function () {
    if ($("#codigo").val().length > 0)
        if ($("#rdPractica").is(":checked")) {
            ValorPractica();
        }
        else ValorModulo();
});

$("#cbo_Practica").change(function () {
    $("#codigo").val($("#cbo_Practica :selected").val());
    if ($("#rdPractica").is(":checked"))
        ValorPractica(); //Cambiar valor practica y modulo por la relacion medico-esp-convenio
    else ValorModulo();
});

$("#codigo").blur(function () {
    $("#cbo_Practica").val($("#codigo").val());
    if ($("#codigo").val().length > 0)
        if ($("#rdPractica").is(":checked"))
            ValorPractica();
        else ValorModulo();
});


    function ListMedicos(Especialidad) {
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
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });

}

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
    $.each(Lista, function (index, Especialidad) {
        $("#cbo_Especialidad").append($("<option></option>").val(Especialidad.Id).html(Especialidad.Especialidad));
    });
}


$("#cbo_Especialidad").change(function () {
    var json = JSON.stringify({ "Especialidad": $("#cbo_Especialidad :selected").val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MedicosporEsp_Cargado,
        error: errores
    });
});

function MedicosporEsp_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medicos").empty();
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}

$("#rdModulo").click(function () {
    ListModulosEnc();
    $("#controlcbo_ModulosEnc").show(); $("#controlcbo_Especialidad").hide();
    $("#controlcbo_Modulo").show(); $("#controlcbo_Practica").hide();
    var obj = document.getElementById('tabPrac');
    obj.innerHTML = "Módulo";
});


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
}


$("#cantidad").blur(function () {
    $("#controlcantidad").removeClass("error");
});

$("#descuento").blur(function () {
    $("#controldescuento").removeClass("error");
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}



function ExisteCodigo(Algo) {
    for (var i = 0; i <= Total; i++) {
        if (objPracticas[i].PracticaId == Algo && objPracticas[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado la Practica Nro: " + Algo);
            //LimpiarCampos();
            //$("#cbo_Practica").focus();
            return true;
        }
    }
    return false;
}

function LimpiarCamposP() {
    $("#fechapractica").val('');
    $("#fecharendicion").val('');
    //$("#cbo_Servicio").val('');
    $("#cbo_Servicio").attr("disabled","disabled");
    $("#cantidad").val('');
    $("#porcentaje").val('100');
    $("#codigo").val('');
    $("#cbo_Practica").val('0');
    $("#txtModulo").val('');
    $("#precio").val('');
    $("#total").val('');
    $("#chkFacturado").removeAttr("checked", "");
    $("#rdModulo").removeAttr("checked", "");
    $("#rdPractica").removeAttr("checked", "");
    $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelar").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#codigo").removeAttr("disabled");
    $("#cbo_Practica").removeAttr("disabled");
    $("#rdPractica").attr("checked", "checked");
    ListarPracticas();
    $('#controlcbo_Especialidad').show();
    $('#cbo_ModulosEnc').removeAttr("disabled");
    $('#controlcbo_ModulosEnc').hide();
    $('#controlcbo_Practica').show();
    $('#controlcbo_Modulo').hide();
    $("#txtModulo").removeAttr("disabled");
    var obj = document.getElementById('tabPrac');
    obj.innerHTML = "Práctica";
}

function Calcular_Descuento(porcentaje) {
    Descuento = parseFloat(porcentaje);
    var porc = parseFloat(100);
    //var desc = (porc - Descuento) / porc;
    var desc = Descuento / porc;
    return desc;
}

$("#btnAgregar").click(function () {
    if ($("#frm_Internacion").valid()) {
        $(".control-group").removeClass();
        if (ExisteCodigo($("#codigo").val())) return;
        objPractica = {};
        if ($("#rdAmbu").is(":checked")) {
            objPractica.Ambulatorio = true;
            objPractica.Internacion = false;
        }
        else {
            objPractica.Ambulatorio = false;
            objPractica.Internacion = true;
        }
        if ($("#rdModulo").is(":checked")) {
            objPractica.Modulo = true;
            objPractica.Practica = false;
        }
        else {
            objPractica.Modulo = false;
            objPractica.Practica = true;
            if ($("#cbo_Especialidad :selected").val() == "0") {
                alert("Ingrese Especialidad");
                return;
            }
        }
        var desc = Calcular_Descuento($("#porcentaje").val());
        objPractica.FechaPractica = $("#fechapractica").val();
        objPractica.FechaRendicion = $("#fecharendicion").val();
        objPractica.ServicioId = $("#cbo_Servicio :selected").val();
        objPractica.Serv_Nombre = $("#cbo_Servicio :selected").text();
        objPractica.EspecialidadId = $("#cbo_Especialidad :selected").val();
        objPractica.Esp_Nombre = $("#cbo_Especialidad :selected").text();
        objPractica.Cantidad = $("#cantidad").val();
        objPractica.Porcentaje = $("#porcentaje").val();
        objPractica.PracticaId = $("#codigo").val();
        if (objPractica.Practica) {
            objPractica.Prac_Nombre = $("#cbo_Practica :selected").text();
        }
        else {
            objPractica.Prac_Nombre = $("#txtModulo").val();
            objPractica.ModuloEnc = $("#cbo_ModulosEnc :selected").val();
        }
        objPractica.Precio = parseFloat($("#precio").val());
        objPractica.Total = parseInt($("#cantidad").val()) * parseFloat($("#precio").val()) * desc;
        if ($("#chkFacturado").is(":checked"))
            objPractica.Facturarlo = true;
        else objPractica.Facturarlo = false;
        var Estado = 1;
        var Cual = Total;
        if (Editando == 1) {
            Cual = EditandoPos;
        }
        else {
            Total = Total + 1;
            Cual = Total;
        }
        objPractica.Estado = Estado;
        objPracticas[Cual] = objPractica;
        RenderizarTablaP();
        LimpiarCamposP();
        Editando = 0;
        EditandoPos = -1;

    }
});

$("#btnAgregar_").click(function () {
    if ($("#frm_Internacion").valid()) {
        if (ExisteCodigo($("#codigo").val())) return;
        objPractica = {};
        $(".control-group").removeClass();
        if ($("#rdAmbu").is(":checked")) {
            objPractica.Ambulatorio = true;
            objPractica.Internacion = false;
        }
        else {
            objPractica.Ambulatorio = false;
            objPractica.Internacion = true;
        }
        if ($("#rdModulo").is(":checked")) {
            objPractica.Modulo = true;
            objPractica.Practica = false;
        }
        else {
            objPractica.Modulo = false;
            objPractica.Practica = true;
            if ($("#cbo_Especialidad :selected").val() == "0") {
                alert("Ingrese Especialidad");
                return;
            }
        }
        var desc = Calcular_Descuento($("#porcentaje").val());
        objPractica.FechaPractica = $("#fechapractica").val();
        objPractica.FechaRendicion = $("#fecharendicion").val();
        objPractica.ServicioId = $("#cbo_Servicio :selected").val();
        objPractica.Serv_Nombre = $("#cbo_Servicio :selected").text();
        objPractica.EspecialidadId = $("#cbo_Especialidad :selected").val();
        objPractica.Esp_Nombre = $("#cbo_Especialidad :selected").text();
        objPractica.Cantidad = $("#cantidad").val();
        objPractica.Porcentaje = $("#porcentaje").val();
        objPractica.PracticaId = $("#codigo").val();
        if (objPractica.Practica) {
            objPractica.Prac_Nombre = $("#cbo_Practica :selected").text();
        }
        else {
            objPractica.Prac_Nombre = $("#txtModulo").val();
            objPractica.ModuloEnc = $("#cbo_ModulosEnc :selected").val();
        }
        objPractica.Precio = $("#precio").val();
        objPractica.Total = parseInt($("#cantidad").val()) * parseFloat($("#precio").val()) * desc;
        if ($("#chkFacturado").is(":checked"))
            objPractica.Facturarlo = true;
        else objPractica.Facturarlo = false;
        var Estado = 1;
        var Cual = Total;
        if (Editando == 1) {
            Cual = EditandoPos;
        }
        else {
            Total = Total + 1;
            Cual = Total;
        }
        objPractica.Estado = Estado;
        objPracticas[Cual] = objPractica;
        RenderizarTablaP();
        LimpiarCamposP();
        Editando = 0;
        EditandoPos = -1;
    }
});

$("#cantidad").blur(function () {
    if ($("#precio").val() != null && $("#precio").val() != undefined && $("#porcentaje").val() != null && $("#porcentaje").val()) {
        var desc = Calcular_Descuento($("#porcentaje").val());
        var tot = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val()) * desc;
        $("#total").val(tot.toFixed(2));
    }
    else $("#total").val('');
});

$("#porcentaje").blur(function () {
    if ($("#precio").val() != null && $("#precio").val() != undefined && $("#cantidad").val() != null && $("#cantidad").val()) {
        var desc = Calcular_Descuento($("#porcentaje").val());
        var tot = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val()) * desc;
        $("#total").val(tot.toFixed(2));
    }
    else $("#total").val('');
});

$("#precio").blur(function () {
    if ($("#cantidad").val() != null && $("#cantidad").val() != undefined && $("#porcentaje").val() != null && $("#porcentaje").val()) {
        var desc = Calcular_Descuento($("#porcentaje").val());
        var tot = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val()) * desc;
        $("#total").val(tot.toFixed(2));
    }
    else $("#total").val('');
});

$("#btnCancelar_").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#codigo").removeAttr("disabled");
    $("#cbo_Practica").removeAttr("disabled");
    $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelar").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#btnAgregar_").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelar_").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCamposP();
});

$("#btnCancelar").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#codigo").removeAttr("disabled");
    $("#cbo_Practica").removeAttr("disabled");
    $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelar").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#btnAgregar_").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelar_").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCamposP();
});

function RenderizarTablaP() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>F.Práctica</th><th>F.Rendición</th><th>Tipo</th><th>Fact</th><th>Cantidad</th><th>Código</th><th>Práctica</th><th>%</th><th>Imp. Unit</th><th>Imp. Total</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        tipo = ''; fact = 'N';
        if (objPracticas[i].Ambulatorio) tipo = 'A';
        else tipo = 'I';
        if (objPracticas[i].Facturarlo) fact = 'S';
        if (objPracticas[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Practica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Practica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objPracticas[i].FechaPractica + " </td><td> " + objPracticas[i].FechaRendicion + " </td><td> " + tipo + " </td><td> " + fact + " </td><td> " + objPracticas[i].Cantidad + " </td><td> " + objPracticas[i].PracticaId + " </td><td> " + objPracticas[i].Prac_Nombre + " </td><td> " + objPracticas[i].Porcentaje + " </td><td> $" + objPracticas[i].Precio + " </td><td> $" + objPracticas[i].Total + " </td></tr>";
        }
    }
    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

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

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#codigo").attr("disabled", "disabled");
    $("#cbo_Practica").attr("disabled", "disabled");
    $("#codigo").val(objPracticas[Nro].PracticaId);
    if (objPracticas[Nro].Ambulatorio) $("#rdAmbulatorio").attr('checked', 'checked');
    else $("#rdInternacion").attr('checked', 'checked');
    if (objPracticas[Nro].Modulo) $("#rdModulo").attr('checked', 'checked');
    else $("#rdPractica").attr('checked', 'checked');
    if ($("#rdModulo").is(":checked")) {
        var obj = document.getElementById('tabPrac');
        obj.innerHTML = "Módulo";
        $('#cbo_ModulosEnc').val(objPracticas[Nro].ModuloEnc);
        $('#cbo_ModulosEnc').attr("disabled", "disabled");
        $('#controlcbo_ModulosEnc').show();
        $('#controlcbo_Practica').hide();
        $('#controlcbo_Especialidad').hide();
        $('#controlcbo_Modulo').show();
        $("#txtModulo").val(objPracticas[Nro].Prac_Nombre);
        $("#txtModulo").attr("disabled", "disabled");
        $("#cbo_Modulo option").each(function () {
            if ($(this).val() == $("#codigo").val()) {
                $("#txtModulo").attr("title", $(this).attr("title"));
            }
        });
    }
    else {
        var obj = document.getElementById('tabPrac');
        obj.innerHTML = "Práctica";
        ListarPracticas();
        $('#controlcbo_Especialidad').show();
        $('#cbo_ModulosEnc').removeAttr("disabled");
        $('#controlcbo_ModulosEnc').hide();
        $('#controlcbo_Practica').show();
        $('#controlcbo_Modulo').hide();
    }
    $("#fechapractica").val(objPracticas[Nro].FechaPractica);
    $("#fecharendicion").val(objPracticas[Nro].FechaRendicion);
    $("#cbo_Servicio").val(objPracticas[Nro].ServicioId);
    $("#cbo_Especialidad").val(objPracticas[Nro].EspecialidadId);
    $("#cantidad").val(objPracticas[Nro].Cantidad);
    $("#porcentaje").val(objPracticas[Nro].Porcentaje);
    $("#precio").val(objPracticas[Nro].Precio);
    $("#cantidad").val(objPracticas[Nro].Cantidad);
    $("#total").val(objPracticas[Nro].Total);
    if (objPracticas[Nro].Facturarlo)
        $("#chkFacturado").attr("checked", "checked");
    $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelar").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
    $("#cbo_Servicio").removeAttr("disabled");
}

function Eliminar(Nro) {
    objPracticas[Nro].Estado = 0;
    RenderizarTablaP();
    objPracticas = $.grep(objPracticas, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
    LimpiarCamposP();
}

$("#desdeaqui").click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        $("#CargadoFecha").html($("#txtFechaCarga").val());
        $("#CargadoCentro").html($("#cbo_Centro :selected").text());
        $("#CargadoMedico").html($("#cbo_Medico :selected").text());
        InitControls_DetPartes();
});


function InitControls_DetPartes() {
    List_Servicios();
    ListarPracticas();
    List_Medicos();
    Especialidades_Lista();
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function ValorPractica() {
    var json = JSON.stringify({ "EspecialidadId": $("#cbo_Especialidad :selected").val(), "MedicoId": $("#cbo_Medico :selected").val(),
        "FechaParte": $("#txtFechaCarga").val(), "Codigo": $("#codigo").val()
    });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ValorHonoMedicoporConvenio",
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
        var val = Valor.ValorHonorario.replace(",", ".");
        $("#precio").val(val);
    } else {
        alert('La Práctica no está valorizada');
        $("#precio").val('');
        $("#total").val('');
    }
}

function ValorModulo() {
    if ($("#codigo").val().length > 0) {
        var InstSecc;
        if (Seccional_Id == 998) InstSecc = OS;
        else InstSecc = Seccional_Id;
        var json = JSON.stringify({ "InstSecc": InstSecc, "ModuloId": $("#codigo").val(), "FechaParte": $("#txtFechaCarga").val() });
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
}

function ValorModulo_Cargado(Resultado) {
    var Valor = Resultado.d;
    if (Valor != null) {
        var val = Valor.ValorNN.replace(",", ".");
        $("#precio").val(val);
        $("#cbo_Modulo option").each(function () {
            if ($(this).val() == $("#codigo").val()) {
                $("#txtModulo").val($(this).text());
                $("#txtModulo").attr("title", $(this).attr("title"));
            }
        });

    } else {
        $("#cbo_Modulo option").each(function () {
            if ($(this).val() == $("#codigo").val()) {
                $("#txtModulo").val($(this).text());
                $("#txtModulo").attr("title", $(this).attr("title"));
            }
        });
        alert('El Módulo no está valorizado');
        $("#precio").val('');
        $("#total").val('');
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

function Cargar_Modulos2() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/ListadodeModulosTotal",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Modulos_Cargados,
        error: errores
    });
}

function Modulos_Cargados(Resultado) {
    var Practicas = Resultado.d;
    $('#cbo_Modulo').empty();
    $('#cbo_Modulo').append($('<option></option>').val('0').html(''));
    $.each(Practicas, function (index, practicas) {
        $('#cbo_Modulo').append(
              $('<option></option>').val(practicas.Codigo).html(practicas.Descripcion)
            );
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

$("#rdPractica").click(function () {
    ListarPracticas();
    $("#controlcbo_Modulo").hide(); $("#controlcbo_Practica").show();
    $("#controlcbo_ModulosEnc").hide(); $("#controlcbo_Especialidad").show();
    var obj = document.getElementById('tabPrac');
    obj.innerHTML = "Práctica";
});

$("#cbo_Modulo").blur(function () {
    $("#codigo").val($("#cbo_Modulo").val());
});


function errores(msg) {
    alert('Error: ' + msg.responseText);
}


/////////////////////////////////////////////////Guardar Datos//////////////////////////////////////////////////////

$("#btnConfirmar").click(function () {
    if (Guardar == 0) {
        Guardar = 1;
        if (Id > 0) DeleteDetalles();
        else GuardarCabecera();
    }
});

function GuardarCabecera() {
    var f = {};
    f.NroParte = Id;
    f.Fecha = $("#txtFechaCarga").val();
    f.MedicoId = $("#cbo_Medico :selected").val();
    f.CentroId = $("#cbo_Centro :selected").val();
    f.Internacion = $("#rdInt").is(":checked");
    f.Ambulatorio = $("#rdAmbu").is(":checked");
    var json = JSON.stringify({ "f": f });

    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/InsertParteCabMedicos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: InsertParteCabMedicos_Cargado,
        error: errores
    });
}

    function InsertParteCabMedicos_Cargado(Resultado) {
    var NroParte = Resultado.d;
    Id = NroParte;
    if (NroParte > 0 && objPracticas.length > 0) {
        var json = JSON.stringify({ "objPracticas": objPracticas, "NroParte": NroParte });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/InsertParteDetMedicos",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: InsertParteDet_Cargado,
            error: errores
        });
    }
}

function InsertParteDet_Cargado(Resultado) {
    alert("Parte Cargado Correctamente");
    window.location = "CargaPracticasMedicasHC_Medicos.aspx";
}

function DeleteDetalles() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/DeleteParteDetMedicos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: DeleteParteDetMedicos_Cargado,
        error: errores
    });
}

function DeleteParteDetMedicos_Cargado() {
    GuardarCabecera();
}

$("#btnImprimir").click(function () {
    var url = "../Impresiones/ImpresionRendicionIndInt_Medicos.aspx?Id=" + Id;
    Ventana(url);
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
            'enableEscapeButton': false
        });
}
