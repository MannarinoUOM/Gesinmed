var sourceArr = [];
var mapped = {};


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

function Print() {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/PPP_Impresion.aspx?Id=' + Pedido_Id,
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

function EstaPendiente() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/PedidoPendiente",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: EstaPendiente_Cargado,
        error: errores
    });
}

function EstaPendiente_Cargado(Resultado) {
    var EstaPendiente = Resultado.d;
    if (EstaPendiente) { //El Pedido Esta Pendiente
        $("#btnConfirmarPedido").show();
        $("#btnImprimir").show();
    }
    else { //Pedido Completo
        $("#btnConfirmarPedido").hide();
        $("#btnImprimir").show();
        alert("El pedido ya ha sido entregado.");
    }
}

$("#btnImprimir").click(function () {
    Print();
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

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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
            RemoveClass();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    List_Servicios();
    ListaMonoDrogras();
    List_by_Monodroga(0);
    ListTipoDoc();
    var Query = {};
    $("#btnConfirmarPedido").attr("disabled", true);
    $("#desdeaqui").hide(); 
    Query = GetQueryString();
    Pedido_Id = Query['PedidoId'];
    if (Pedido_Id > 0) {
        Modificar = 1;
        LoadPedido();
        List_Depositos();
        $("#btnImprimir").show();
        $("#CargadoPedido").html(Pedido_Id);
    }
    else $("#CargadoFecha").html(FechaActual());
    if (Query['ID'] != null) { CargarPacienteID(Query['ID']);}
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("9999999?9", { placeholder: "-" });
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

$('#cbo_Monodroga').change(function () {
    List_by_Monodroga($("#cbo_Monodroga :selected").val());
});


$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {
        Get_StockbyId(mapped[selection]);
        $("#txt_Medicamento").val(selection); //nom
        $("#Medicamento_val").html(mapped[selection]); //id
    },
    minLength: 4,
    items: 10
});

$("#cantidad").blur(function () {

    $("#cantidad").removeClass("error");
});

function RemoveClass() {
    $("#controlcantidad").removeClass("error");
}

function LoadPedido() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/BuscarPPP_byPedidoid",
        data: '{Id: "' + Pedido_Id + '"}',
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
        $("#btnOtroPaciente").show();
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
    document.location = "../Farmacia/CargarPedidoporPaciente.aspx" + url;
}

function LoadPedido_Cargado(Resultado) {
    var PedidoCab = {};
    PedidoCab = Resultado.d;
    $("#CargadoDNI").html(PedidoCab.Documento);
    $("#CargadoNHC").html(PedidoCab.NHC);
    $("#CargadoTelefono").html(PedidoCab.Telefono);
    $("#CargadoServicio").html(PedidoCab.Servicio);
    $("#CargadoFecha").html(PedidoCab.Fecha);
    $('#fotopaciente').attr('src', '../img/Pacientes/' + PedidoCab.NHC + '.jpg');
    $("#CargadoApellido").html(PedidoCab.Paciente);
    $("#CargadoSala").html(PedidoCab.Sala);
    $("#CargadoCama").html(PedidoCab.Cama);
    Cargar_Paciente_NHC(PedidoCab.NHC);
    Servicio_Id_Aux = PedidoCab.Servicio_Id;
    LoadDetalles();
    EstaPendiente();
}

function LoadDetalles() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/BuscarPPP_byPedidoid_Det_para_ambulatorios",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedidoDet_Cargado,
        complete: function () {
            $("#cargando2").hide();
            $("#cont_datospac").show();
            $('#desdeaqui').click();
            $("#btnConfirmarPedido").removeAttr("disabled");
        },
        error: errores
    });
}

function LoadPedidoDet_Cargado(Resultado) {
    var Detalles = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {
        var Nombre = Detalle.Nombre + " - " + Detalle.Gramaje + Detalle.Medida + " - " + Detalle.Presentacion;
        Detalle.Nombre = Nombre;
        Detalle.Estado = 1;
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Nombre + " </td><td> " + Detalle.Cantidad + " </td></tr>";
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
           
           
        }

    }
});

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


            if (PError) {
                $("#btnOtroPaciente").show();
            }
            else {
                $("#btnOtroPaciente").show();
            }
            EstaInternado();

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
    $("#desdeaqui").show();
    InternacionId = 0;
    Servicio_Id_Aux = $("#cbo_Servicio :selected").val();
    $("#CargadoServicio").html($("#cbo_Servicio :selected").text());
    Sala_Id_Aux = 0;
    Cama_Id_Aux = 0;
    $("#botones").show();
    $("#cargando_botones").hide();
    return false;

    var Documento = $("#afiliadoId").val();
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Internacion_Pac_byDoc",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#botones").hide();
            $("#cargando_botones").show();
        },
        complete: function (){
            $("#botones").show();
            $("#cargando_botones").hide();
        },
        success: Cargar_PacienteInt_byDocumento_Cargado,
        error: errores
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

function Cargar_PacienteInt_byDocumento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente != null) {
        $("#desdeaqui").show();
        InternacionId = Paciente.InternacionId;
        Servicio_Id_Aux = Paciente.ServicioId;

        $("#CargadoCama").html(Paciente.Cama);
        $("#CargadoSala").html(Paciente.Sala);
        //$("#cbo_Servicio").val(Servicio_Id_Aux);
       // $("#CargadoServicio").html($("#cbo_Servicio :selected").text());

        //GetCama();
    }
    else {
        alert('Paciente No Internado');
        $("#desdeaqui").hide();
        $("#btnOtroPaciente").show();
    }

}

function GetCama() {
    var Cama = $("#CargadoCama").html();
    var Sala = $("#CargadoSala").html();
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Camas",
        data: '{IdCama: ' + parseInt(Cama) + ', Sala: ' + parseInt(Sala) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetCama_Cargado,
        error: errores
    });
}

function GetCama_Cargado(Resultado) {
    var Cama = Resultado.d;
    Cama_Id_Aux = $("#CargadoCama").html();
    $("#CargadoCama").html(Cama[0].descripcion);
    GetSala();
}

function GetSala() {
    var Sala = $("#CargadoSala").html();
    var ServicioId = $("#cbo_Servicio :selected").val();
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Salas",
        data: '{SalaId: ' + parseInt(Sala) + ', Servicio: ' + parseInt(ServicioId) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetSala_Cargado,
        error: errores
    });
}

function GetSala_Cargado(Resultado) {
    var Sala = Resultado.d;
    Sala_Id_Aux = $("#CargadoSala").html();
    $("#CargadoSala").html(Sala[0].descripcion);
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
        if (i == 0) {
            sourceArr.length = 0;
        }
        str = Medicamentos[i].REM_NOMBRE + ' - ' + Medicamentos[i].REM_GRAMAJE + Medida + ' - ' + Presentacion;
        mapped[str] = item.REM_ID;
        sourceArr.push(str);
        if (i == Medicamentos.length - 1) $("#cbo_Medicamento").removeAttr("disabled");
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
    var Insumo = null;
    Insumo = Resultado.d;
    if (Insumo != null) {
        if (Insumo.STO_CANTIDAD != '') $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
        else $("#stock_medicamento").html('0');
        if (Insumo.REM_PRECIO != '0') $("#precio_medicamento").html(parseFloat(Insumo.REM_PRECIO).toFixed(2));
        else $("#precio_medicamento").html('0.00');
        if (Insumo.REM_PRECOMPRA != '0') $("#precioultima_medicamento").html(parseFloat(Insumo.REM_PRECOMPRA).toFixed(2));
        else $("#precioultima_medicamento").html('0.00');
        $("#cbo_Deposito").val(Insumo.STO_DEP_ID);
        $("#cbo_Deposito").attr('disabled', 'disabled');
    }
}

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
    $("#cbo_Medicamento").val($("#txt_Medicamento").val());
    $("#cbo_Deposito").attr('disabled', 'disabled');

    if (Insumo != null) {
        $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
        $("#precio_medicamento").html(parseFloat(Insumo.REM_PRECIO));
        $("#cbo_Deposito").val(Insumo.STO_DEP_ID);
    }
    else {
        $("#stock_medicamento").html('0');
        $("#precio_medicamento").html(parseFloat('0'));
        $("#cbo_Deposito").val('0');
    }
}


$("#btnAgregarMedicamento").click(function () {
    var valid = $("#frm_Cantidad").valid();
    if (valid && $("#Medicamento_val").html() != '0') {
        RemoveClass();
        Codigo = $("#Medicamento_val").html();
        if (Existe(Codigo)) return;
        Nombre = $("#txt_Medicamento").val();
        Cantidad = parseInt($("#cantidad").val());
        Precio = parseFloat($("#precio_medicamento").html());
        Subtotal = parseFloat(parseInt($("#cantidad").val())) * parseFloat(Precio);
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
        objMedicamento.Insumo_Id = Codigo;
        objMedicamento.Deposito_Id = Deposito;
        objMedicamento.Cantidad = Cantidad;
        objMedicamento.Precio = Precio;
        objMedicamento.Subtotal = Subtotal;
        objMedicamento.Estado = Estado;
        objMedicamento.Nombre = Nombre;
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
    $("#cantidad").val('');
    $("#txt_Medicamento").val('');
    $("#cbo_Medicamento").val('');
    $("#Medicamento_val").html('0');
    $("#cbo_Deposito").removeAttr("disabled");
    $("#txt_Medicamento").removeAttr("disabled");
    $("#precio_medicamento").html('');
    $("#cbo_Deposito").val('');
    $("#stock_medicamento").html('');
    $("#precioultima_medicamento").html('');
    if (objMedicamento.length > 0)
    $("#btnConfirmarPedido").removeAttr("disabled");
    Editando = 0;
    EditandoPos = -1;
}

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td></tr>";
        }

    }
    if (objMedicamentos.length > 0) $("#btnConfirmarPedido").removeAttr("disabled");
    else $("#btnConfirmarPedido").attr("disabled",true);
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    $("#precio_medicamento").html(objMedicamentos[Nro].Precio);
    $("#cbo_Deposito").val(objMedicamentos[Nro].Deposito_Id);
    $("#txt_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#txt_Medicamento").attr('disabled', 'disabled');
    $("#btnConfirmarPedido").attr("disabled", true);
    $("#Medicamento_val").html(objMedicamentos[Nro].Insumo_Id);
    $("#cbo_Deposito").attr('disabled', 'disabled');
    Get_StockbyId(objMedicamentos[Nro].Insumo_Id);
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
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
                Insert_Pedido(); //Nuevo Remito
            else {
                Delete_Detalles(); //Modificar Remito  
            }
        }
        else alert("No hay Medicamentos en la Lista");
    }
});


function Delete_Detalles() {
    var json = JSON.stringify({ "PedidoId": Pedido_Id });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Delete_PPP_Detalles",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Detalles,
        error: errores
    });
}

    function Insert_Pedido() {
        var f = {};
        f.NHC = $("#afiliadoId").val();
        f.Servicio_Id = $("#cbo_Servicio :selected").val();
        f.Sala_Id = Sala_Id_Aux;
        f.Cama_Id = Cama_Id_Aux;
        f.Internacion_Id = InternacionId;

        var json = JSON.stringify({ "f": f });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/Farmacia.asmx/Insert_Pedidos_Pac_Cab",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Insert_Pedidos_Pac_Cab_Cargado,
            error: errores
        });

    }

    function Insert_Detalles() {

        var json = JSON.stringify({ "IdPedido": Pedido_Id, "objMedicamentos": objMedicamentos, "Modifica": Modificar });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/Farmacia.asmx/Insert_Pedidos_Pac_Det_PPP",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Insert_Pedidos_Pac_Det_Cargado,
            error: errores
        });
    }


    function Insert_Pedidos_Pac_Cab_Cargado(Resultado) {
        var IdPedido = Resultado.d;
        var json = JSON.stringify({ "IdPedido": IdPedido,"objMedicamentos": objMedicamentos });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/Farmacia.asmx/Insert_Pedidos_Pac_Det",
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
            'href': '../Impresiones/PPP_Impresion.aspx?Id=' + Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "CargarPedidoporPaciente.aspx";
            }
        });
    }


    $("#btnPedidos").click(function () {
        window.location = "BuscarPPP.aspx";

    });

    $("#btnOtroPaciente").click(function () {
        window.location = "CargarPedidoporPaciente.aspx";
    });


    function imgErrorPaciente(image) {
        image.onerror = "";
        image.src = "../img/silueta.jpg";
        return true;
    }
