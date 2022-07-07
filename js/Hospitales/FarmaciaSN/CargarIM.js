var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var objMedicamentos2 = {};
var Modificar=0;
var Sala_Id_Aux;
var Cama_Id_Aux;
var InternacionId;
var Pedido_Id;
var Servicio_Id_Aux;
var Medico_Id;
var Total2;

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

function List_Medicos() {
    var json = JSON.stringify({"EspId": 0});
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Medicos_Por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });

}

function List_Depositos() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamento_Deposito",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Depositos_Cargado,
        error: errores
    });
}

function List_Depositos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Deposito) {
        $("#cbo_Deposito").append($("<option></option>").val(Deposito.Id).html(Deposito.Deposito));
    });

}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_Presentacion() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamento_Presentacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Presentacion_Cargado,
        error: errores
    });
}

function List_Presentacion_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Presentacion) {
        $("#cbo_Presentacion").append($("<option></option>").val(Presentacion.Id).html(Presentacion.Presentacion));
    });

}

function List_Medidas() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamento_Medidas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medidas_Cargado,
        error: errores
    });
}

function List_Medidas_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medida) {
        $("#cbo_Medida").append($("<option></option>").val(Medida.Id).html(Medida.Medida));
    });

}

function List_Via() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Via",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Via_Cargado,
        error: errores
    });
}

function List_Via_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Via) {
        $("#cbo_Via").append($("<option></option>").val(Via.Id).html(Via.Via));
    });

}

$(document).ready(function () {
    $("#frm_Cantidad").validate({
        rules: {
            'cantidad': { required: true, number: true, range: [1, 9999] }
        },
        messages: {
            'cantidad': { required: '', number: '', range: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            //RemoveClass();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    var Query = {};
    Query = GetQueryString();
    Pedido_Id = Query['Id'];
    $("#txtNHC").mask("9999999999?9", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });
    if (Pedido_Id > 0) {
        Modificar = 1;
        LoadPedido();
        InitControls();
        EstaPendiente();
        $("#CargadoPedido").html(Pedido_Id);
    }
    if (Query['NHC'] != null) {
        Cargar_Paciente_NHC(Query['NHC']);
        $("#CargadoFecha").html(FechaActual());
    }
});


function InitControls() {
    List_Medicos();
    List_Depositos();
    List_Medidas();
    List_Via();
    List_Presentacion();
    Cargar_Medicamentos(false);
}

$("#cantidad").blur(function () {
    $("#controlcantidad").removeClass("error");
});

$("#txtNHC").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtNHC').attr('readonly') == undefined) {
            if ($('#txtNHC').val() != '-----------') {
                Cargar_Paciente_NHC($("#txtNHC").val());

            }
        }

    }
});

$("#txt_dni").blur(function () {
    if ($('#txt_dni').val() != '--------') {
        Cargar_Paciente_Documento($("#txt_dni").val());

    }
});

$("#txtNHC").blur(function () {
    if ($('#txtNHC').val() != '-----------') {
        Cargar_Paciente_NHC($("#txtNHC").val());

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
    var PError = false;


    $.each(Paciente, function (index, paciente) {

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento);
        $("#txtNHC").attr('value', paciente.NHC);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }
        $("#CargadoEdad").html(edad);

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

        if (PError) {
            $("#desdeaqui").hide();
            $("#btnOtroPaciente").show();
        }
        else {
            $("#desdeaqui").show();
            $("#btnOtroPaciente").show();
        }
        EstaInternado();
    });

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

function RecargarPagina(url) {
    document.location = "../Farmacia/CargarIM.aspx" + url;
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function LoadPedido() {
    var json = JSON.stringify({ "NHC": null, "Id": Pedido_Id, "Apellido": null, "Desde": null, "Hasta": null, "objBusquedaLista": null, "MedicoId": null });
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/BuscarIM",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedido_Cargado,
        error: errores,
        beforeSend: function () {
            $("#cargando2").show();
            $("#cont_datospac").hide();
        }
    });
}

function LoadPedido_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, PedidoCab) {
        $("#CargadoDNI").html(PedidoCab.Documento);
        $("#CargadoNHC").html(PedidoCab.NHC);
        $("#CargadoTelefono").html(PedidoCab.Telefono);
        $("#CargadoCama").html(PedidoCab.Cama);
        $("#CargadoSala").html(PedidoCab.Sala); 
        $("#CargadoServicio").html(PedidoCab.Servicio);
        $("#CargadoApellido").html(PedidoCab.Nombre);
        $("#CargadoFecha").html(PedidoCab.Fecha);
        Cargar_Paciente_NHC(PedidoCab.NHC);
        Sala_Id_Aux = PedidoCab.IdSala;
        Cama_Id_Aux = PedidoCab.IdCama;
        Servicio_Id_Aux = PedidoCab.IdServicio;
        Medico_Id = PedidoCab.IdMedico;
    });
    LoadDetalles();
}

function LoadDetalles() {
    $("#cargando2").hide();
    $("#cont_datospac").show();
    Animar(400);
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/BuscarIM_Det",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedidoDet_Cargado,
        error: errores
    });
}

function LoadPedidoDet_Cargado(Resultado) {
    var Detalles = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo/Indicación</th><th>Cantidad</th><th>Unidad</th><th>Presentación</th><th>Via</th><th>Horas</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {
        if (Detalle.Insumo_Id > 0)
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Nombre + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.Medida + " </td><td>" + Detalle.Presentacion + " </td><td>" + Detalle.Via + " </td><td>" + Detalle.Horas + " </td></tr>";
        else
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Indicacion + " </td><td> " + "" + " </td><td> " + Detalle.Medida + " </td><td>" + Detalle.Presentacion + " </td><td>" + " " + " </td><td>" + "" + " </td></tr>";
        objMedicamentos[i] = Detalle;
        objMedicamentos2[i] = Detalle;
        objMedicamentos[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

$("#txt_dni").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txt_dni').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txt_dni").val());
            EstaInternado();

        }

    }
});

function Cargar_Paciente_Documento(Documento) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}

function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.cuil);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }
        $("#CargadoEdad").html(edad);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $("#CargadoTelefono").html(paciente.Telefono);
        
        
        

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}

function EstaInternado() {
    var Documento = $("#txt_dni").val();
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Internacion_Pac_byDoc",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_PacienteInt_byDocumento_Cargado,
        error: errores
    });
}

function EstaPendiente() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/IMPendiente",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: EstaPendiente_Cargado,
        error: errores
    });
}

function EstaPendiente_Cargado(Resultado) {
    var Pendiente = Resultado.d;
    if (Pendiente) {
        $("#btnImprimir").show();
        $("#btnConfirmarPedido").show();
    }
    else {
        $("#btnImprimir").show();
        $("#btnConfirmarPedido").hide();
        alert("El pedido ya ha sido entregado.");
    }
}

function Cargar_PacienteInt_byDocumento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente != null) {
        $("#desdeaqui").show();
        $("#CargadoCama").html(Paciente.Cama);
        $("#CargadoSala").html(Paciente.Sala);
        $("#CargadoServicio").html(Paciente.Servicio);
        InternacionId = Paciente.InternacionId;
        Servicio_Id_Aux = Paciente.ServicioId;

        Sala_Id_Aux = Paciente.SalaId;
        Cama_Id_Aux = Paciente.CamaId;

        Medico_Id = $("#cbo_Medicos").val();
        InitControls();
        $("#btnOtroPaciente").show();
    }
    else {
        $("#btnOtroPaciente").show();
        $("#desdeaqui").hide();
        alert('Paciente No Internado');
    }

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

$("#cbo_Medicamento").change(function () {
    Get_Insumo_by_Id($('#cbo_Medicamento option:selected').val());
    Get_StockbyId($('#cbo_Medicamento option:selected').val());
});

function Get_StockbyId(Id) {
    $.ajax({
        type: "POST",
        data: "{Id: '" + Id + "'}",
        url: "../Json/Farmacia/Farmacia.asmx/Get_StockbyId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Get_StockbyId_Cargado,
        error: errores
    });
}

function Get_StockbyId_Cargado(Resultado) {
    var Insumo = Resultado.d;
    if (Insumo != null)
        $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
    else $("#stock_medicamento").html('0');
}

function Get_Insumo_by_Id(Id) {
    $.ajax({
        type: "POST",
        data: "{Id: '" + Id + "'}",
        url: "../Json/Farmacia/Farmacia.asmx/Get_Insumo_by_Id",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Get_Insumo_by_Id_Cargado,
        beforeSend: function () {
            $("#stock_medicamento").html('0');
        },
        error: errores
    });
}

function Get_Insumo_by_Id_Cargado(Resultado) {
    $("#cbo_Medida option[value=0]").attr("selected", true);
    $("#cbo_Presentacion option[value=0]").attr("selected", true);
    var Insumo = Resultado.d;
    $("#cbo_Medida option[value=" + Insumo.REM_UNIDADES + "]").attr("selected", true);
    $("#cbo_Presentacion option[value=" + Insumo.REM_PRESENTACION + "]").attr("selected", true);
}

function CargarAmbos() {
    Codigo = $("#Medicamento_val").html();
    Nombre = $("#txt_Medicamento").val();
    Cantidad = parseInt($("#cantidad").val());
    Presentacion = $("#cbo_Presentacion :selected").text();
    Presentacion_Id = $("#cbo_Presentacion :selected").val();
    Medida = $("#cbo_Medida :selected").text();
    Medida_Id = $("#cbo_Medida :selected").val();
    Via = $("#cbo_Via :selected").text();
    Via_Id = $("#cbo_Via :selected").val();
    Horas = $("#txtHoras").val();
    Observaciones = $("#Observaciones").val().trim().toUpperCase();
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
        objMedicamento.Insumo_Id = Codigo;
        objMedicamento.Presentacion = Presentacion;
        objMedicamento.Presentacion_Id = Presentacion_Id;
        objMedicamento.Medida = Medida;
        objMedicamento.Medida_Id = Medida_Id;
        objMedicamento.Via = Via;
        objMedicamento.Via_Id = Via_Id;
        objMedicamento.Cantidad = Cantidad;
        objMedicamento.Horas = Horas;
        objMedicamento.Estado = Estado;
        objMedicamento.Nombre = Nombre;
        if ($("#chk_Horas").is(':checked'))
            objMedicamento.EnHoras = true;
        else objMedicamento.EnHoras = false;
        if ($("#ocultarIM").is(':checked')) {
            objMedicamento.Ocultar = true;
        }
        else objMedicamento.Ocultar = false;
        if ($("#vademe").is(':checked'))
            objMedicamento.Vademe = true;
        else objMedicamento.Vademe = false;
        objMedicamento.Observaciones = Observaciones;
        objMedicamento.Indicacion = "";
        objMedicamentos[Cual] = objMedicamento;

        objMedicamento = {};
        objMedicamento.Insumo_Id = "0";
        objMedicamento.Presentacion_Id = "0";
        objMedicamento.Medida_Id = "0";
        objMedicamento.Via_Id = "2";
        objMedicamento.Presentacion = "";
        objMedicamento.Medida = "";
        objMedicamento.Via = "";
        objMedicamento.Cantidad = 0;
        objMedicamento.Horas = "0";
        objMedicamento.Estado = Estado;
        objMedicamento.EnHoras = false;
        if ($("#ocultarIM").is(':checked')) {
            objMedicamento.Ocultar = true;
        }
        else objMedicamento.Ocultar = false;
        objMedicamento.Vademe = false;
        objMedicamento.Nombre = $("#Indicacion").val();
        objMedicamento.Observaciones = Observaciones;
        objMedicamento.Indicacion = $("#Indicacion").val().trim().toUpperCase();
        Total = Total + 1;
        Cual = Total;
        objMedicamentos[Cual] = objMedicamento;
        RenderizarTabla();
        LimpiarCampos();
        Animar(400);
}

$("#btnAgregarMedicamento").click(function () {
    var valid = $("#frm_Cantidad").valid();
    if ($("#Indicacion").val().trim().length > 0 && $("#Medicamento_val").html() != "0") { CargarAmbos(); return; }
    if ($("#Indicacion").val().trim().length > 0 && $("#Medicamento_val").html() == "0") {
        valid = true;
        $("#controlcantidad").removeClass("error");
    }
    if (valid) {
        Codigo = $("#Medicamento_val").html();
        if ($("#Indicacion").val().trim().length == 0)
            if (Existe(Codigo)) return;
        Nombre = $("#txt_Medicamento").val();
        Cantidad = parseInt($("#cantidad").val());
        Presentacion = $("#cbo_Presentacion :selected").text();
        Presentacion_Id = $("#cbo_Presentacion :selected").val();
        Medida = $("#cbo_Medida :selected").text();
        Medida_Id = $("#cbo_Medida :selected").val();
        Via = $("#cbo_Via :selected").text();
        Via_Id = $("#cbo_Via :selected").val();
        Horas = $("#txtHoras").val();
        Observaciones = $("#Observaciones").val().trim().toUpperCase();
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
        if ($("#Indicacion").val().length == 0) {
            objMedicamento.Insumo_Id = Codigo;
            objMedicamento.Presentacion = Presentacion;
            objMedicamento.Presentacion_Id = Presentacion_Id;
            objMedicamento.Medida = Medida;
            objMedicamento.Medida_Id = Medida_Id;
            objMedicamento.Via = Via;
            objMedicamento.Via_Id = Via_Id;
            objMedicamento.Cantidad = Cantidad;
            objMedicamento.Horas = Horas;
            objMedicamento.Estado = Estado;
            objMedicamento.Nombre = Nombre;
            if ($("#chk_Horas").is(':checked'))
                objMedicamento.EnHoras = true;
            else objMedicamento.EnHoras = false;
            if ($("#ocultarIM").is(':checked')) {
                objMedicamento.Ocultar = true;
            }
            else objMedicamento.Ocultar = false;
            if ($("#vademe").is(':checked'))
                objMedicamento.Vademe = true;
            else objMedicamento.Vademe = false;
            objMedicamento.Observaciones = Observaciones;
            objMedicamento.Indicacion = "";
            objMedicamentos[Cual] = objMedicamento;
        }
        else {
            objMedicamento.Insumo_Id = "0";
            objMedicamento.Presentacion_Id = "0";
            objMedicamento.Medida_Id = "0";
            objMedicamento.Via_Id = "2";
            objMedicamento.Presentacion = "";
            objMedicamento.Medida = "";
            objMedicamento.Via = "";
            objMedicamento.Cantidad = 0;
            objMedicamento.Horas = "0";
            objMedicamento.Estado = Estado;
            objMedicamento.EnHoras = false;
            if ($("#ocultarIM").is(':checked')) {
                objMedicamento.Ocultar = true;
            }
            else objMedicamento.Ocultar = false;
            objMedicamento.Vademe = false;
            objMedicamento.Nombre = $("#Indicacion").val();
            objMedicamento.Observaciones = Observaciones;
            objMedicamento.Indicacion = $("#Indicacion").val().trim().toUpperCase();
            objMedicamentos[Cual] = objMedicamento;
        }

        RenderizarTabla();
        Editando = 0;
        EditandoPos = -1;
        LimpiarCampos();
        Animar(400);
    }
});

function Animar(alt) {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top + alt }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}

$("#btnSubir").click(function () {
    Animar(-60);
});

$("#btnCancelarMedicamento").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCampos();
});

function LimpiarCampos() {
    $("#txt_Medicamento").val('');
    $("#Medicamento_val").html('0');
    $("#txt_Medicamento").removeAttr("disabled");
    $("#cbo_Presentacion option[value=0]").attr("selected", true);
    $("#cantidad").val("");
    $("#cbo_Medida option[value=0]").attr("selected", true);
    $("#chk_Horas").attr("checked", true);  
    $("#ocultarIM").attr("checked", false);
    $("#vademe").attr("checked", false);
    $("#txtHoras").val("");
    $("#Observaciones").val("");
    $("#Indicacion").val("");
    if (objMedicamentos.length > 0) $("#btnConfirmarPedido").removeAttr("disabled"); 
}

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo/Indicación</th><th>Cantidad</th><th>Unidad</th><th>Presentación</th><th>Via</th><th>Horas</th></tr></thead><tbody>";
      
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            //alert(objMedicamentos[i].Insumo_Id);
            if (objMedicamentos[i].Insumo_Id > 0)
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> " + objMedicamentos[i].Medida + " </td><td>" + objMedicamentos[i].Presentacion + " </td><td>" + objMedicamentos[i].Via + " </td><td>" + objMedicamentos[i].Horas + " </td></tr>";
            else
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Indicacion + " </td><td> " + "" + " </td><td> " + objMedicamentos[i].Medida + " </td><td>" + objMedicamentos[i].Presentacion + " </td><td>" + objMedicamentos[i].Via + " </td><td>" + "" + " </td></tr>";
        }

    }

    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    if (objMedicamentos[Nro].Insumo_Id > 0) {
        Get_Insumo_by_Id(objMedicamentos[Nro].Insumo_Id);
        $("#cantidad").val(objMedicamentos[Nro].Cantidad);
        $("#txt_Medicamento").val(objMedicamentos[Nro].Nombre);
        $("#txt_Medicamento").attr('disabled', 'disabled');
        $("#Medicamento_val").html(objMedicamentos[Nro].Insumo_Id);
        if (objMedicamentos[Nro].EnHoras)
            $("#chk_Horas").attr("checked", true);
        else
            $("#chk_Horas").attr("checked", false);
        if (objMedicamentos[Nro].Ocultar)
            $("#ocultarIM").attr("checked", true);
        else $("#ocultarIM").attr("checked", false);
        if (objMedicamentos[Nro].Vademe)
            $("#vademe").attr("checked", true);
        else $("#vademe").attr("checked", false);
        $("#txtHoras").val(objMedicamentos[Nro].Horas);
        $("#Observaciones").val(objMedicamentos[Nro].Observaciones);
        $("#Indicacion").val("");
    }
    else {
        $("#cantidad").val("");
        $("#cbo_Medicamento option[value='0']").attr("selected", true);
        $("#cbo_Via option[value='2']").attr("selected", true);
        $("#cbo_Presentacion option[value='']").attr("selected", true);
        $("#chk_Horas").attr("checked", false);
        $("#ocultarIM").attr("checked", false);
        $("#vademe").attr("checked", false);
        $("#txtHoras").val('');
        $("#Observaciones").val('');
        $("#Indicacion").val(objMedicamentos[Nro].Indicacion);
    }
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
    Animar(-60);
}

function Eliminar(Nro) {
    objMedicamentos[Nro].Estado = 0;
    RenderizarTabla();
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
    if (objMedicamentos.length > 0) $("#btnConfirmarPedido").removeAttr("disabled");
    else $("#btnConfirmarPedido").attr("disabled", true);
}

function Existe(Algo) {
    for (var i = 0; i <= Total; i++) {
        if (objMedicamentos[i].Insumo_Id == Algo && objMedicamentos[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado el Medicamento Nro: " + Algo);
            LimpiarCampos();
            $("#cbo_Medicamento").focus();
            return true;
        }
    }
    return false;
}

$("#btnConfirmarPedido").click(function () {
    if (confirm("¿Desea confirmar el pedido?")) {
        if (objMedicamentos.length > 0) {
            if (Modificar != 1)
                Insert_Pedido();
            else Delete_Detalles();
        }
        else alert("Lista Vacia");
    }
});

function Delete_Detalles() {
    DeleteItem(Pedido_Id); //Borro detalles
}

function DeleteItem(Id) {
    var i = {};
    i.IM_Id = Id;
    var json = JSON.stringify({ "i": i });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/IM.asmx/Delete_IM_Det",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: DeleteItem_Cargado,
        error: errores
    });
}

function DeleteItem_Cargado() {
    Insert_Detalles(); //Lista nueva
}

function Insert_Pedido() {
    var I = {};
    I.NHC = $("#CargadoNHC").html();
    I.IdServicio = Servicio_Id_Aux;
    I.IdSala = Sala_Id_Aux;
    I.IdCama = Cama_Id_Aux;
    I.IdInternacion = InternacionId;
    I.IdMedico = $("#cbo_Medicos :selected").val();
    var json = JSON.stringify({ "I": I });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/IM.asmx/Insert_IM_Cab",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Pedidos_IM_Cab_Cargado,
        error: errores
    });

}

function Insert_Detalles() {
    var json = JSON.stringify({ "objMedicamentos": objMedicamentos, "Id": Pedido_Id, "Modificar": Modificar });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/IM.asmx/Insert_IM_Det",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Pedidos_Pac_Det_Cargado,
        error: errores
    });
}


function Insert_Pedidos_IM_Cab_Cargado(Resultado) {
    var Id = Resultado.d;
    var json = JSON.stringify({ "objMedicamentos": objMedicamentos, "Id": Id, "Modificar": Modificar });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/IM.asmx/Insert_IM_Det",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Pedidos_Pac_Det_Cargado,
        error: errores
    });
    }

function Insert_Pedidos_Pac_Det_Cargado(Resultado) {
    var Id = Resultado.d;
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Print_Indicacion.aspx?Id=' + Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "CargarIM.aspx";
            }
        });
    }

    $("#btnPedidos").click(function () {
        window.location = "BuscarIM.aspx";
    });

    function Print() {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Print_Indicacion.aspx?Id=' + Pedido_Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "CargarIM.aspx";
            }
        });

    }

    $("#btnImprimir").click(function () {
        Print();

    });
    