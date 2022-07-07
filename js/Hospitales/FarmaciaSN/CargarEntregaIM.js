var Pedido_Id = 0;
var Sala_Id_Aux;
var Cama_Id_Aux;
var Medico_Id;
var Servicio_Id_Aux;
var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var objMedicamentos2 = {};
var Pendiente;
var Id_Internacion;
var TotalaSuministrar = 0;
var NroEntrega = 0;
var Documento;

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


$(document).ready(function () {
    $("#frm_Cantidad").validate({
        rules: {
            'cantidadent': { required: true, number: true, range: [1, 9999] }
        },
        messages: {
            'cantidadent': { required: '', number: '', range: '' }
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
    var Query = {};
    Query = GetQueryString();
    Pedido_Id = Query['Id'];
    Cargar_Medicamentos(false);
    $("#cbo_Medicamento").attr('disabled', 'disabled');
    $("#cantidad").attr('readonly', true);
    $("#btnConfirmarEntrega").attr("disabled", true);
    if (Pedido_Id > 0) {
        EstaPendiente();
        LoadPedido();
        $("#CargadoPedido").html(Pedido_Id);
    }
    else $("CargadoFecha").html(FechaActual());
});

$("#cantidadent").blur(function () {
    $("#controlcantidadent").removeClass("error");
});

$("#btnCancelarMedicamento").click(function () {
    LimpiarCampos();

});

function LoadPedido() {
    var json = JSON.stringify({"NHC": null, "Id": Pedido_Id, "Apellido": null, "Desde": null, "Hasta": null, "objBusquedaLista": null, "MedicoId": null});
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/BuscarIM",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedido_Cargado,
        error: errores,
        complete: function () {
            LoadDetalles();
            $("#cargando2").hide();
            $("#cont_datospac").show();
            $('#desdeaqui').click();
        },
        beforeSend: function () {
            $("#cargando2").show();
            $("#cont_datospac").hide();
        }
    });
}

function RemoveClass() {
    $("#controlcantidadent").removeClass("error");
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
    });

}


function LoadPedido_Cargado(Resultado) {
    var Lista;
    Lista = Resultado.d;
    $.each(Lista, function (index, PedidoCab) {
        $("#CargadoDNI").html(PedidoCab.Documento);
        Documento = PedidoCab.Documento;
        $("#CargadoNHC").html(PedidoCab.NHC);
        Cargar_Paciente_NHC(PedidoCab.NHC);
        $("#CargadoEntrega").html(PedidoCab.NroEntrega);
        $("#CargadoTelefono").html(PedidoCab.Telefono);
        $("#CargadoServicio").html(PedidoCab.Servicio);
        $("#CargadoFecha").html(PedidoCab.Fecha);
        $('#fotopaciente').attr('src', '../img/Pacientes/' + PedidoCab.NHC + '.jpg');
        $("#CargadoApellido").html(PedidoCab.Nombre);
        Sala_Id_Aux = PedidoCab.IdSala;
        Cama_Id_Aux = PedidoCab.IdCama;
        EstaInternado();
        Servicio_Id_Aux = PedidoCab.IdServicio;
        Medico_Id = PedidoCab.IdMedico;
        Id_Internacion = PedidoCab.IdInternacion;
    });
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function EstaInternado() {
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
        $("#CargadoCama").html(Paciente.Cama);
        $("#CargadoSala").html(Paciente.Sala);
    }

}

function GetCama() {
    var Cama = Cama_Id_Aux;
    var Sala = Sala_Id_Aux;
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Camas",
        data: '{IdCama: ' + parseInt(Cama) + ', Sala: ' + parseInt(Sala) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetCama_Cargado,
        error: errores,
        complete: function () {
            GetSala();
        }
    });
}

function GetCama_Cargado(Resultado) {
    var Cama = Resultado.d;
    $("#CargadoCama").html(Cama[0].descripcion);
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function GetSala() {
    var Sala = Sala_Id_Aux;
    var ServicioId = Servicio_Id_Aux;
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
    $("#CargadoSala").html(Sala[0].descripcion);
}


function LoadDetalles() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/BuscarIM_ENT_Det",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedidoDet_Cargado,
        error: errores
    });
}

function LoadPedidoDet_Cargado(Resultado) {
    var Detalles = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Unidades Pedidas</th><th>C/HS</th><th>Total de Unidades por día</th><th title='Unidades Entregadas'>Unidades Entregadas</th><th>Saldo</th><th>Unidades en Stock</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;

    $.each(Detalles, function (index, Detalle) {
        $("#btnHistorial").show();
        var Saldo = parseInt(Detalle.Total) - parseInt(Detalle.UnidadEnt);
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar'><i class='icon-edit'></i></a></td><td> " + Detalle.Nombre + " " + Detalle.Gramaje + Detalle.Medida + " - " + Detalle.Presentacion + " </td><td> " + Detalle.Cantidad + " </td><td>" + Detalle.Horas + " </td><td>" + Detalle.Total + " </td><td>" + Detalle.UnidadEnt + " </td><td>" + Saldo + " </td><td>" + Detalle.Stock + " </td></tr>";
        Detalle.Saldo = Saldo;
        objMedicamentos[i] = Detalle;
        objMedicamentos2[i] = Detalle;
        objMedicamentos[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    TotalaSuministrar = 0;
    $("#cantidad").val(TotalaSuministrar);
    $("#txt_CantidadAnterior").val(objMedicamentos[Nro].UnidadEnt);
    Get_StockbyId(objMedicamentos[Nro].Insumo_Id);
    $("#cbo_Medicamento option[value=" + objMedicamentos[Nro].Insumo_Id + "]").attr("selected", true);
    if (parseInt(objMedicamentos[Nro].Insumo_Id) > 0) {
        TotalaSuministrar = objMedicamentos[Nro].Total;
        $("#cantidad").val(TotalaSuministrar); 
        $("#cantidadent").val(objMedicamentos[Nro].UnidadEnt);
        $("#Observaciones").val(objMedicamentos[Nro].Observacion);
    }
    $("#cbo_Medicamento").attr('disabled', 'disabled');
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
        if (objMedicamentos[i].Insumo_Id == Algo && objMedicamentos[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado el Medicamento Nro: " + Algo);
            LimpiarCampos();
            $("#cbo_Medicamento").focus();
            return true;
        }
    }
    return false;
}

$("#cbo_Medicamento").change(function () {
    Get_StockbyId($('#cbo_Medicamento option:selected').val());
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
    if (Insumo != null)
        $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
    else $("#stock_medicamento").html('0');
}

$("#btnAgregarMedicamento").click(function () {
    var valid = $("#frm_Cantidad").valid();
    if (valid) {
        RemoveClass();
        //        if (parseInt($("#cantidadent").val()) <= parseInt(TotalaSuministrar)) {
        var cant = parseInt($("#cantidadent").val()) + parseInt($("#txt_CantidadAnterior").val());
        var stock = parseInt($("#stock_medicamento").html());

        if (parseInt(TotalaSuministrar) >= cant) {
            if (parseInt($("#cantidadent").val()) <= stock) {
                Codigo = $("#cbo_Medicamento :selected").val();
                Nombre = $("#cbo_Medicamento :selected").text();
                //Cantidad = parseInt($("#cantidad").val());
                //UnidadEnt = parseInt($("#cantidadent").val());
                UnidadEnt = cant;
                Observacion = $("#Observaciones").val().trim().toUpperCase();
                Stock = $("#stock_medicamento").html();
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
                objMedicamento.Cantidad = objMedicamentos[Cual].Cantidad;
                objMedicamento.Estado = Estado;
                objMedicamento.Nombre = Nombre;
                objMedicamento.Stock = Stock;
                objMedicamento.Observacion = Observacion;
                objMedicamento.UnidadEnt = UnidadEnt;
                objMedicamento.Horas = objMedicamentos[Cual].Horas;
                objMedicamento.Medida = objMedicamentos[Cual].Medida;
                objMedicamento.Total = objMedicamentos[Cual].Total;
                objMedicamento.Gramaje = objMedicamentos[Cual].Gramaje;
                if (objMedicamentos[Cual].Gramaje != "")
                    objMedicamento.CantEnt = parseFloat(objMedicamento.UnidadEnt) * parseFloat(objMedicamentos[Cual].Gramaje);
                else objMedicamento.CantEnt = parseFloat(objMedicamento.UnidadEnt);
                var Saldo = TotalaSuministrar - UnidadEnt;
                objMedicamento.Saldo = Saldo;
                objMedicamentos[Cual] = objMedicamento;
                RenderizarTabla();
                Editando = 0;
                EditandoPos = -1;
                $("#btnConfirmarEntrega").removeAttr("disabled");
                LimpiarCampos();
            }
            else alert('No hay suficiente stock.');
        }
        else alert('No se Puede Entregar Mas de lo Pedido.');
    }
});

function LimpiarCampos() {
    $("#stock_medicamento").html("0");
    $("#Observaciones").val("");
    $("#cantidadent").val("0");
    $("#cbo_Medicamento").val("0");
    $("#txt_CantidadAnterior").val('0');
    $("#cantidad").val('0');
    Editando = 0;
    EditandoPos = -1;
    TotalaSuministrar = 0;
}

function RenderizarTabla() {
    var Encabezado = "<table id='TablaMedicamentos' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Unidades Pedidas</th><th>C/HS</th><th>Total de Unidades por día</th><th title='Unidades Entregadas'>Unidades Entregadas</th><th>Saldo</th><th>Unidades en Stock</th></tr></thead><tbody>";
    var Contenido = "";
    for (var i = 0; i <= Total; i++) {
        if (objMedicamentos[i].Insumo_Id != 0)
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a></td><td> " + objMedicamentos[i].Nombre + " " + objMedicamentos[i].Gramaje + objMedicamentos[i].Medida + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td>" + objMedicamentos[i].Horas + " </td><td>" + objMedicamentos[i].Total + " </td><td>" + objMedicamentos[i].UnidadEnt + " </td><td>" + objMedicamentos[i].Saldo + " </td><td>" + objMedicamentos[i].Stock + " </td></tr>";
    else
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a></td><td> " + objMedicamentos[i].Indicacion + " </td><td> " + '' + " </td><td> " + '' + " </td><td>" + '' + " </td><td>" +''+ " </td><td>" +'' + " </td><td>" + '' + " </td><td>" + '' + " </td><td>" +'' + " </td></tr>";
    }

    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

$("#btnConfirmarEntrega").click(function () {
    if (confirm("¿Desea confirmar la entrega?")) {
        VerificarPendiente();
        GetNroEntregaForRemito();
    }
});

function VerificarPendiente() {
    Pendiente = false;
    for (var k = 0; k <= Total; k++) {
        if (objMedicamentos[k].Saldo != 0 && objMedicamentos[k].Insumo_Id > 0)
            Pendiente = true;
    }
}

function GetNroEntregaForRemito() {
    var json = JSON.stringify({ "IdIM": Pedido_Id });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/IM.asmx/Get_NroEntrega_for_Remito",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_IM_Ent,
        error: errores
    });
}

function Insert_IM_Ent(Resultado) {
    NroEntrega = Resultado.d;
    if (NroEntrega > 0) {
        var json = JSON.stringify({ "i": objMedicamentos, "Sala": Sala_Id_Aux, "Cama": Cama_Id_Aux, "Id": Pedido_Id, "Tipo": "IM", "NroEnt": NroEntrega });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/IM.asmx/Insert_IM_Ent",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Insert_IM_Ent_Cargado,
            error: errores
        });
    }
    else alert("Error al Ingresar Entrega");
}




function Insert_IM_Ent_Cargado(Resultado) {

    var json = JSON.stringify({ "Id": Pedido_Id, "Pendiente": Pendiente });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/UpdateIMPendiente",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Print,
        error: errores
    });
    }

    function Print() {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/EntregasIM.aspx?Id=' + Pedido_Id + "&Nro=" + NroEntrega,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "EntregasIM.aspx";
            }
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
        var EstaPendiente = Resultado.d;
        if (EstaPendiente) { //El Pedido Esta Pendiente
            $("#btnConfirmarEntrega").show();
//            $("#btnImprimir").hide();
        }
        else { //Pedido Completo
            $("#btnConfirmarEntrega").hide();
//            $("#btnImprimir").show();
        }
    }


    $("#EntregasModal").on('show', function () {
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/IM.asmx/VerHistorialEntregasIM",
            data: '{IMId: "' + $("#CargadoPedido").html() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Entregas = Resultado.d;
                var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro. Entrega</th><th>Fecha</th><th>Usuario</th></tr></thead><tbody>";
                var Contenido = "";
                $.each(Entregas, function (index, Entrega) {
                    Contenido = Contenido + "<tr onclick=LoadRemito(" + Entrega.NRO_ENTREGA + ")><td>" + Entrega.NRO_ENTREGA + " </td><td> " + Entrega.FECHA + " </td><td>" + Entrega.USUARIO + " </td></tr>";
                });
                var Pie = "</tbody></table>";
                $("#TablaEntregas_div").html(Encabezado + Contenido + Pie);
            },
            error: errores
        });
    });

    function LoadRemito(Entrega) {
        $.fancybox(
                {
                    'autoDimensions': false,
                    'href': '../Impresiones/EntregasIM.aspx?Id=' + $("#CargadoPedido").html() + "&Nro=" + Entrega,
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
                if (Insumo != null)
                    $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
                else $("#stock_medicamento").html('0');
            }