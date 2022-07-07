var Pedido_Id = 0;
var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var objMedicamentos2 = {};
var Modificar=0;
var Total2;

$(document).ready(function () {
    $("#frm_Cantidad").validate({
        ignore: [],
        rules: {
            'cantidad': { required: true, number: true, range: [1, 99] }
        },
        messages: {
            'cantidad': { required: '', number: '', range: '' }
        },
        showErrors: function (errorMap, errorList) {
            // Nada
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            var msj = '';
            for (var i = 0; i < list.length; i++) {
                msj = msj + $(list[i]).attr("rel") + "\n";
            }
            alert(msj);
        }
    });
    $("#frm_input1").validate({
        ignore: [],
        rules: {
            'txtLotes': { required: true }
        },
        messages: {
            'txtLotes': { required: '' }
        },
        showErrors: function (errorMap, errorList) {
            // Nada
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            var msj = '';
            for (var i = 0; i < list.length; i++) {
                msj = msj + $(list[i]).attr("rel") + "\n";
            }
            alert(msj);
        }
    });
    InitControls();
    $("#btnConfirmarPedido").attr("disabled", true);
    var Query = {};
    Query = GetQueryString();
    if (Query['NHC'] != null) {
        Cargar_Paciente_NHC(Query['NHC']);
    }
    Pedido_Id = Query['Id'];
    if (Pedido_Id > 0) LoadPedido();
    else $("#CargadoNumero").html("Provisorio");
});

function InitControls() {
    List_Servicios();
    List_Depositos();
    $("#txtNHC").mask("9999999999?9", { placeholder: "-" });
    $("#txt_dni").mask("9999999?9", { placeholder: "-" });
    Cargar_Medicamentos(false);
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function LoadPedido() {
    Modificar = 1;
    var json = JSON.stringify({"NHC":null, "Id": Pedido_Id, "Apellido": null, "Desde": null, "Hasta": null, "objBusquedaLista": null});
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/BuscarDevPac",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedido_Cargado,
        complete: function () {
            LoadDetalles();
            $("#cargando2").hide();
            $("#cont_datospac").show();
            $("#hastaaqui").fadeIn(1500);
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
            $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        },
        beforeSend: function () {
            $("#cargando2").show();
            $("#cont_datospac").hide();
        },
        error: errores
    });
}

function LoadPedido_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, PedidoCab) {
        $("#CargadoNumero").html(Pedido_Id);
        Cargar_Paciente_NHC(PedidoCab.NHC);
        //LoadDetalles();
        $("#CargadoServicio").html(PedidoCab.Servicio);
    });
  

}

function LoadDetalles() {
    
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Buscar_Dev_PacDet",
        data: '{PedidoId: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedidoDet_Cargado,
        error: errores
    });
}

function LoadPedidoDet_Cargado(R) {
    var Detalles = R.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th><th>Observaciones</th></tr></thead><tbody>";
    Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {
        objMedicamento = {};
        objMedicamento.Insumo_Id = Detalle.Insumo_Id;
        objMedicamento.Deposito_Id = Detalle.Deposito_Id;
        objMedicamento.Cantidad = Detalle.Cantidad;
        objMedicamento.Estado = 1;
        objMedicamento.Nombre = Detalle.Nombre;
        objMedicamento.Motivo = Detalle.Motivo;
        objMedicamento.Observacion = Detalle.Observacion;
        objMedicamento.Precio = Detalle.Precio;
        objMedicamento.NroLote = Detalle.NroLote;
        Subtotal = parseFloat(Detalle.Precio) * parseInt(Detalle.Cantidad);
        objMedicamento.Subtotal = parseFloat(Detalle.Precio) * parseInt(Detalle.Cantidad);
        objMedicamentos[i] = objMedicamento;
        objMedicamentos2[i] = objMedicamento;
        objMedicamentos[i].Estado = 1;
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Nombre + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.Observacion + " </td></tr>";
        Total = Total + 1;
        Total2 = Total;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}


function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    var queryObj = {};
    for (var i = 0; i < querystring.length; i++) {
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        queryObj[name] = value;
    }
    return queryObj;
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
    var Lista = Resultado.d;
    $.each(Lista, function (index, Servicio) {
        $("#cbo_Servicio").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
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

function Cargar_Paciente_Documento(Documento) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores,
        complete: function () {
            EstaInternado();
        }
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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
        $("#CargadoServicio").html($("#cbo_Servicio :selected").text());

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

function Cargar_PacienteInt_byDocumento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente != null) {
        $("#desdeaqui").show();
        $("#CargadoServicio").html($("#cbo_Servicio :selected").text());
    }
    else {
        alert('Paciente No Internado');
        $("#desdeaqui").hide();
    }

}

$("#txt_dni").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txt_dni').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txt_dni").val());
            

        }

    }
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
        error: errores,
        complete: function () {
            EstaInternado();
        }
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
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
        }
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
    document.location = "../Farmacia/DevolucionporPaciente.aspx" + url;
}

$("#cbo_Medicamento").change(function () {
    Get_StockbyId($('#cbo_Medicamento option:selected').val());
    List_Lotes_by_Insumo($('#cbo_Medicamento option:selected').val());
});

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
    $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
    $("#precio_medicamento").html(parseFloat(Insumo.REM_PRECIO).toFixed(2));
    $("#precioultima_medicamento").html(parseFloat(Insumo.REM_PRECOMPRA).toFixed(2));
    $("#cbo_Deposito").val(Insumo.STO_DEP_ID);
    $("#cbo_Deposito").attr('disabled', 'disabled');
}

function List_Lotes_by_Insumo(Id) {
    $.ajax({
        type: "POST",
        data: "{Id: '" + Id + "'}",
        url: "../Json/Farmacia/Farmacia.asmx/List_Lotes_by_Insumo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Lotes_by_Insumo_Cargado,
        error: errores
    });
}

function List_Lotes_by_Insumo_Cargado(Resultado) {
    var Lotes = Resultado.d;
    $("#cbo_Lotes").empty();
    $("#cbo_Lotes").append($("<option></option>").val('').html('LOTE'));
    $.each(Lotes, function (index, Lote) {
        $("#cbo_Lotes").append($("<option></option>").val(Lote.NROLOTE).html(Lote.NROLOTE));
        if ($("#txtLotes").val() == Lote.NROLOTE) $("#cbo_Lotes").val(Lote.NROLOTE);
    });
}

$("#btnAgregarMedicamento").click(function () {
    var valid = $("#frm_Cantidad").valid();
    var valid1 = $("#frm_input1").valid();
    if (valid && valid1 && $("#Medicamento_val").html() != '0') {
        var Motivo;
        Codigo = $("#Medicamento_val").html();
        if (Existe(Codigo)) return;
        Nombre = $("#txt_Medicamento").val();
        Cantidad = parseInt($("#cantidad").val());
        Precio = parseFloat($("#precio_medicamento").html());
        Subtotal = parseFloat(parseInt($("#cantidad").val())) * parseFloat(Precio);
        Observaciones = $("#Observaciones").val().trim().toUpperCase();
        $.each($("input[name='motivo']:checked"), function () {
            Motivo = $(this).val();
        });
        var Deposito = $("#cbo_Deposito :selected").val();
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
        objMedicamento.NroLote = $("#cbo_Lotes :selected").val();
        objMedicamento.Insumo_Id = Codigo;
        objMedicamento.Deposito_Id = Deposito;
        objMedicamento.Cantidad = Cantidad;
        objMedicamento.Precio = Precio;
        objMedicamento.Subtotal = Subtotal;
        objMedicamento.Estado = Estado;
        objMedicamento.Nombre = Nombre;
        objMedicamento.Observacion = Observaciones;
        objMedicamento.Motivo = Motivo;
        objMedicamentos[Cual] = objMedicamento;
        RenderizarTabla();
        Editando = 0;
        EditandoPos = -1;
        LimpiarCampos();
    }
});



$("#btnCancelarMedicamento").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCampos();
});

function LimpiarCampos() {
    if (objMedicamentos.length > 0)
        $("#btnConfirmarPedido").removeAttr("disabled");
    $("#txt_Medicamento").val('');
    $("#Medicamento_val").html('0');
    $("#txt_Medicamento").removeAttr("disabled");
    $("#cantidad").val('');
    $("#precio_medicamento").html('0');
    $("#Observaciones").val('');
    $("#cbo_Medicamento").removeAttr('disabled');
    $("#stock_medicamento").html('0');
    $("#cbo_Lotes").empty();
    $("#txtLotes").val('');
    Editando = 0;
    EditandoPos = -1;
}

$("#cbo_Lotes").change(function () {
    $("#txtLotes").val($("#cbo_Lotes :selected").val());
});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th><th>Observaciones</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Nombre + " - Nro. Lote: " + objMedicamentos[i].NroLote + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> " + objMedicamentos[i].Observacion + " </td></tr>";
        }

    }
    if (objMedicamentos.length > 0) $("#btnConfirmarPedido").removeAttr("disabled");
    else $("#btnConfirmarPedido").attr("disabled", true);
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#btnConfirmarPedido").attr("disabled", true);
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    $("#precio_medicamento").html(objMedicamentos[Nro].Precio);
    $("#Observaciones").val(objMedicamentos[Nro].Observacion);
    $("#cbo_Deposito").val(objMedicamentos[Nro].Deposito_Id);
    $("#txt_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#txt_Medicamento").attr('disabled', 'disabled');
    $("#Medicamento_val").html(objMedicamentos[Nro].Insumo_Id);
    $("#cbo_Deposito").attr('disabled', 'disabled');
    var option = $(":radio[name='motivo'][value='" + objMedicamentos[Nro].Motivo + "']");
    if (option.length > 0)
        option[0].checked = true;
    List_Lotes_by_Insumo(objMedicamentos[Nro].Insumo_Id);
    $("#txtLotes").val(objMedicamentos[Nro].NroLote);
    Get_StockbyId(objMedicamentos[Nro].Insumo_Id);
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    $("#cbo_Medicamento option[value=" + objMedicamentos[Nro].Insumo_Id + "]").attr("selected", true);
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
}

function Eliminar(Nro) {
    objMedicamentos[Nro].Estado = 0;
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
    RenderizarTabla();
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

$("#btnConfirmarPedido").click(function () {
    if (confirm("¿Desea confirmar la devolucion?")) {
        if (objMedicamentos.length > 0) {
            if (Modificar != 1)
                Insert_Devolucion();
            else Delete_Detalles();
        }
        else alert("No hay Insumos en la Lista");
    }
});

//function Delete_Detalles() {
//    for (var j = 0; j <= Total2; j++) {
//        var json = JSON.stringify({ "InsumoId": objMedicamentos2[j].Insumo_Id, "Id": Pedido_Id });
//        $.ajax({
//            data: json,
//            url: "../Json/Farmacia/Farmacia.asmx/Delete_Dev_Det",
//            type: "POST",
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            error: errores
//        });
//    }
//    Insert_Dev_Pac_Cab_Cargado(1);
//}

function Delete_Detalles() {
    var json = JSON.stringify({ "Id": Pedido_Id });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Delete_Dev_Det",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Dev_Pac_Cab_Cargado,
        error: errores
    });
}


function Insert_Devolucion() {
    var f = {};
    f.NHC = $("#CargadoNHC").html();
    f.Servicio_Id = $("#cbo_Servicio :selected").val();
    f.Pedido_Id = Pedido_Id;
    var json = JSON.stringify({ "f": f });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Insert_DevPP_Cab",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Dev_Pac_Cab_Cargado,
        error: errores
    });

}


function Insert_Dev_Pac_Cab_Cargado(Resultado) {
    var IdPedido;
    if (Modificar != 1)
        IdPedido = Resultado.d;
    else IdPedido = Pedido_Id;
    var json = JSON.stringify({ "IdPedido": IdPedido, "objMedicamentos": objMedicamentos, "Modifica":Modificar });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Insert_DevPP_Det_Pac",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Dev_Pac_Det_Cargado,
        error: errores
    });
}

function Insert_Dev_Pac_Det_Cargado(Resultado) {

    var Id = Resultado.d;
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/ImprimirDevolucion.aspx?Id=' + Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "DevolucionporPaciente.aspx";
            }
        });
    }

    $("#btnDevoluciones").click(function () {
        window.location = "BuscarDevPac.aspx";
    });

    $("#btnOtroPaciente").click(function () {
        window.location.href = "DevolucionporPaciente.aspx";
    });

    function Get_StockbyId(Id) {
        $.ajax({
            type: "POST",
            data: "{Id: '" + Id + "'}",
            url: "../Json/Farmacia/Farmacia.asmx/Get_StockbyId",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Get_StockbyId_Cargado,
            beforeSend: function () {
                $("#stock_medicamento").html('0');
            },
            error: errores
        });
    }

    function Get_StockbyId_Cargado(Resultado) {
        var Insumo = Resultado.d;
        $("#btnConfirmarPedido").attr("disabled", true);
        if (Insumo != null) {
            $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
            $("#precio_medicamento").html(Insumo.REM_PRECIO);
            $("#precioultima_medicamento").html(Insumo.REM_PRECOMPRA);
            $("#cbo_Deposito").val(Insumo.STO_DEP_ID);
            $("#cbo_Deposito").attr('disabled', 'disabled');
        }
        else {
            $("#stock_medicamento").html('0');
            $("#precio_medicamento").html('0');
            $("#precioultima_medicamento").html('0');
        }
    }