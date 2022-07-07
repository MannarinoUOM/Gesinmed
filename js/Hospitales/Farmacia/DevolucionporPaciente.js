var sourceArr = [];
var mapped = {};

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
    InitControls();
    $("#btnConfirmarPedido").attr("disabled", true);
    var Query = {};
    Query = GetQueryString();
    if (Query['ID'] != null) {
        CargarPacienteID(Query['ID']);
    }
    Pedido_Id = Query['PedidoId'];
    if (Pedido_Id > 0) LoadPedido();
    else $("#CargadoNumero").html("Provisorio");
});

function List_by_Monodroga(MonoId) {
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


function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function ListTipoDoc() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/ListTipoDoc",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, Tipo) {
                $('#cbo_TipoDOC').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
            });

        },
        error: errores
    });
}

$('#cbo_TipoDOC').change(function () {
    if ($("#txt_dni").val() != "") Cargar_Paciente_Documento($("#txt_dni").val());
});

$(".motivo_chk").click(function () {
    if ($("#vencimiento").is(":checked")) MostrarVenc(true);
    else MostrarVenc(false);
});

function MostrarVenc(Mostrar) {
    if (Mostrar) {
        $(".contenedor_4 ").height('180px');
        $("#TablaMedicamentos").height('180px');
    $("#div_vencimiento").show(); }
else {
    $(".contenedor_4 ").height('150px');
    $("#TablaMedicamentos").height('210px');
        $("#txtVencimiento").val("");
        $("#div_vencimiento").hide();
    }
}

function InitControls() {
    ListTipoDoc();
    List_Servicios();
    List_Depositos();
    ListaMonoDrogras();
    List_by_Monodroga(0);
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("9999999?9", { placeholder: "-" });
    $("#txtVencimiento").mask("99/99/9999", { placeholder: "-" });
    $("#txtVencimiento").datepicker();
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
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
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
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Presentación</th><th>Vencimiento</th><th>Cantidad</th><th>Observaciones</th></tr></thead><tbody>";
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
        objMedicamento.Vencimiento = Detalle.Vencimiento;
        objMedicamento.Presentacion = Detalle.Presentacion;
        Subtotal = parseFloat(Detalle.Precio) * parseInt(Detalle.Cantidad);
        objMedicamento.Subtotal = parseFloat(Detalle.Precio) * parseInt(Detalle.Cantidad);
        objMedicamentos[i] = objMedicamento;
        objMedicamentos[i].Estado = 1;
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Nombre + " </td><td> " + Detalle.Presentacion + " </td><td> " + Detalle.Vencimiento + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.Observacion + " </td></tr>";
        Total = Total + 1;
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
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
    $.each(Paciente, function (index, paciente) {
        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);

        $("#txt_dni").val(paciente.documento_real);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);
        $("#cbo_TipoDOC").val(paciente.TipoDoc);
        $("#CargadoSeccional").html(paciente.Seccional);

        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

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
    else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
    }
}

function BuscarPacientes_fancy() {
    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': "../Turnos/BuscarPacientes.aspx?Express=0",
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
}

function EstaInternado() {
    var Documento = $("#afiliadoId").val();
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

$("#txt_dni").change(function () {
    if ($('#txt_dni').val() != '--------') {
        Cargar_Paciente_Documento($("#txt_dni").val());

    }
});

$("#txtNHC").change(function () {
    if ($('#txtNHC').val() != '-----------') {
        Cargar_Paciente_NHC($("#txtNHC").val());

    }
});

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        complete: function () {
            EstaInternado();
        },
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
        $("#txt_dni").attr('value', paciente.documento_real);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#afiliadoId").val(paciente.documento);
        $("#cbo_TipoDOC").val(paciente.TipoDoc);
        $("#CargadoEdad").html(paciente.Edad_Format);

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
        $("#txtPaciente").focus();

        if (PError) {
            $("#desdeaqui").hide();
            $("#btnOtroPaciente").show();
        }
        else {
            $("#desdeaqui").show();
            $("#btnOtroPaciente").show();
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
    $("#Presentacion").val(Insumo.Presentacion);
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
    $("#cbo_Medicamento").val($("#txt_Medicamento").val());
    $.each(Lotes, function (index, Lote) {
        $("#cbo_Lotes").append($("<option></option>").val(Lote.NROLOTE).html(Lote.NROLOTE));
        if ($("#txtLotes").val() == Lote.NROLOTE) $("#cbo_Lotes").val(Lote.NROLOTE);
    });
}

function ValidarDetallesIng() {
    if (!$("#frm_Cantidad").valid()) return false;
    if ($("#Medicamento_val").html() == '0') { alert("Ingrese Insumo."); return false; }
    if ($("#txtVencimiento").val().trim().length == 0 && $("#vencimiento").is(":checked")) { alert("Ingrese fecha de vencimiento."); return false; }
    if (Existe($("#Medicamento_val").html())) return false;
    return true;
}

function CargarObjDetalle() {
    var objMedicamento = {};
    var Motivo;
    $.each($("input[name='motivo']:checked"), function () {
        Motivo = $(this).val();
    });
    objMedicamento.Presentacion = $("#Presentacion").val();


   // objMedicamento.NroLote = "-1";

  // le asigno el lote del combo
    if ($("#cboLote :selected").val() == "") objMedicamento.NroLote = "-1";
    else objMedicamento.NroLote = $("#cboLote :selected").val();


    objMedicamento.Vencimiento = $("#STO_VENCIMIENTO").val();
    objMedicamento.Insumo_Id = $("#Medicamento_val").html();
    objMedicamento.Nombre = $("#txt_Medicamento").val();
    objMedicamento.Deposito_Id = $("#cbo_Deposito :selected").val();
    objMedicamento.Cantidad = parseInt($("#cantidad").val());
    objMedicamento.Precio = parseFloat($("#precio_medicamento").html());
    objMedicamento.Subtotal = parseFloat(parseInt($("#cantidad").val())) * objMedicamento.Precio;
    objMedicamento.Estado = 1;
    objMedicamento.Observacion = $("#Observaciones").val().trim().toUpperCase();
    objMedicamento.Motivo = Motivo;
    return objMedicamento;
}

$("#btnAgregarMedicamento").click(function () {

    if ($("#cboLote").val() == 0) { alert("Seleccione Lote"); return false; }

    if (!ValidarDetallesIng()) return false;

    var Cual = Total;
    if (Editando == 1) {
        Cual = EditandoPos;
    }
    else {
        Total = Total + 1;
        Cual = Total;
    }

    objMedicamentos[Cual] = CargarObjDetalle();
    RenderizarTabla();
    LimpiarCampos();
});



$("#btnCancelarMedicamento").click(function () {
    LimpiarCampos();
});

function LimpiarCampos() {
    if (objMedicamentos.length > 0)
        $("#btnConfirmarPedido").removeAttr("disabled");
    $("#txt_Medicamento").val('');
    $("#Medicamento_val").html('0');
    $("#cbo_Medicamento").val('');
    $("#txt_Medicamento").removeAttr("disabled");
    $("#cantidad").val('');
    $("#precio_medicamento").html('0');
    $("#Observaciones").val('');
    $("#cbo_Medicamento").removeAttr('disabled');
    $("#stock_medicamento").html('0');
    $("#cbo_Lotes").empty();
    $("#txtLotes").val('');
    $("#STO_VENCIMIENTO").val("");
    $("#Presentacion").val("");
    $("#txtVencimiento").val("");
    $("#devolucion").attr("checked",true); //Sobrante
    MostrarVenc(false);
    Editando = 0;
    EditandoPos = -1;
}

$("#cbo_Lotes").change(function () {
    $("#txtLotes").val($("#cbo_Lotes :selected").val());
    InsumoStockInfo();
});

function InsumoStockInfo() {
    var json = JSON.stringify({ "IdInsumo": $("#Medicamento_val").html(), "NroLote": $("#txtLotes").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Insumo_StockInfo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var obj = Resultado.d;
            $("#STO_VENCIMIENTO").val(obj.STO_VENCIMIENTO);
        },
        error: errores
    });
}

$("#txtVencimiento").change(function () {
    $("#STO_VENCIMIENTO").val($(this).val());
});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Vencimiento</th><th>Cantidad</th><th>Observaciones</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Nombre + "</td><td> " + objMedicamentos[i].Vencimiento + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> " + objMedicamentos[i].Observacion + " </td></tr>";
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
    $("#cbo_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#txt_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#txt_Medicamento").attr('disabled', 'disabled');
    $("#Medicamento_val").html(objMedicamentos[Nro].Insumo_Id);
    $("#cbo_Deposito").attr('disabled', 'disabled');
    var option = $(":radio[name='motivo'][value='" + objMedicamentos[Nro].Motivo + "']");
    if (option.length > 0)
        option[0].checked = true;

    if (objMedicamentos[Nro].Motivo == 1) MostrarVenc(true);
    else MostrarVenc(false);

    $("#txtLotes").val(objMedicamentos[Nro].NroLote);
    $("#STO_VENCIMIENTO").val(objMedicamentos[Nro].Vencimiento);
    $("#txtVencimiento").val($("#STO_VENCIMIENTO").val());
    $("#Presentacion").val(objMedicamentos[Nro].Presentacion);
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
    f.NHC = $("#afiliadoId").val();
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

    $('#cbo_Monodroga').change(function () {
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista_by_Mono",
            data: '{MonoId: "' + $("#cbo_Monodroga :selected").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_Medicamentos_Cargado,
            error: errores
        });
    });

    $("#cbo_Medicamento").typeahead({
        source: sourceArr,
        updater: function (selection) {
            //Get_Insumo_by_Id(mapped[selection]);
            //List_Lotes_by_Insumo(mapped[selection]);

            $("#txt_Medicamento").val(selection); //nom
            $("#Medicamento_val").html(mapped[selection]); //id
            traeLoteInsumo(mapped[selection]);
            return selection;
        },
        minLength: 4,
        items: 10
    });

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
            if (i == 0) {
                sourceArr.length = 0;
            }
            str = Medicamentos[i].REM_NOMBRE + ' - ' + Medicamentos[i].REM_GRAMAJE + Medida + ' - ' + Presentacion;
            mapped[str] = item.REM_ID;
            sourceArr.push(str);
            if (i == Medicamentos.length - 1) $("#cbo_Medicamento").removeAttr("disabled");
        });
    }

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


    function traeLoteInsumo(idInsumo) {
        $('#cboLote').empty();
        $('#cboLote').append($('<option></option>').val(0).html("Seleccione Lote"));
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/FARMACIALISTLOTESBYINSUMO",
            data: '{idInsumo: "' + idInsumo + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $.each(Resultado.d, function (index, item) {
                    $('#cboLote').append($('<option></option>').val(item.NROLOTE).html(item.NROLOTE));
                });
            },
            error: errores
        });
    }