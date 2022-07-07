var sourceArr = [];
var mapped = {};
var ID = 0;
var Cargado = 0;
var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var Modificar=0;
var Sala_Id_Aux;
var Cama_Id_Aux;
var InternacionId = 0;
var Pedido_Id = 0;
var Servicio_Id_Aux;
var Medico_Id;
var V_Int = 0;
var Existe = 0;
var Entregado = 0;
var Nuevo = 0;
var Conf = 0;
var Qui = -1;

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

$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {
        Get_StockbyId(mapped[selection]);
        Get_Insumo_by_Id(mapped[selection]);
        $("#txt_Medicamento").val(selection); //nom
        $("#Medicamento_val").html(mapped[selection]); //id
    },
    minLength: 4,
    items: 10
});


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
    var Query = {};
    ListTipoDoc();
    Query = GetQueryString();
    ListaMonoDrogras();
    List_by_Monodroga(0);
    List_Medicos();
    InitControls();
    Pedido_Id = Query['IdPedido'];
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });
    if (Pedido_Id > 0) {
        Modificar = 1;
        LoadPedido();
        $("#CargadoPedido").html(Pedido_Id);
        return false;
    }
    if (Query['Int'] != null) {
        InternacionId = Query['Int'];
        V_Int = 1;
        parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Pacientes Internados > <strong>Pedido por Indicación Médica</strong>";
    }

    if (Query["Nuevo"] != "" && Query["Nuevo"] != null) Nuevo = 1;
    if (Query["Q"] != "" && Query["Q"] != null) {
        Qui = Query["Q"];

        //parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > Planificar Cirugía > <strong>Pedido por Indicación Médica</strong>";
    }

    if (Query["ID"] != "" && Query["ID"] != null) {
        ID = Query["ID"];
        $("#afiliadoId").val(ID);
        CargarPacienteID(ID);
        $("#CargadoFecha").html(FechaActual());
    }


	if (Qui > -1) {
        $("#btnVolver_Quiro_arriba").show();
        $("#btnOtroPaciente").hide();
    }
	
});

    $("#btnVolver_Quiro_arriba").click(function () {
        if (Qui > 0) {
            document.location = "../Quirofano/Planificar-Cirugia.aspx?Cirugia_Id=" + Qui;
        }
    });

$("#btnVolver").click(function () {
    if (V_Int == 1) document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + InternacionId;
    if (Qui > -1) document.location = "../Quirofano/Planificar-Cirugia.aspx?Cirugia_Id=" + Qui;
    else document.location = "CargarIM.aspx";
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

function Existe_IM_Hoy(NHC) {
    if (Pedido_Id == 0 || Existe == 1) return false;
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/ExisteIM_Hoy_by_NHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d > 0) {
                Pedido_Id = Resultado.d;
                Modificar = 1;
                Existe = 1;
                LoadPedido();
                EstaPendiente();
                $("#CargadoPedido").html(Pedido_Id);
            }
            else {
                $("#botones").show();
                $("#cargando_botones").hide();
                $("#tabla").show();
                $("#cargando2").hide();
            }
        },
        beforeSend: function () {
            $("#tabla").hide();
            $("#cargando2").show();
            //$("#botones").hide();
            //$("#cargando_botones").show();
        },
        error: errores
    });
}


function InitControls() {
    List_Depositos();
    List_Medidas();
    List_Via();
    List_Presentacion();
}

$("#txt_dni").change(function () {
    if ($('#txt_dni').val() != '--------') {
        if ($("#afiliadoId").val().length == 0)
        Cargar_Paciente_Documento($("#txt_dni").val());

    }
});

$("#txtNHC").change(function () {
    if ($("#txtNHC").val().length > 0)
        if ($("#afiliadoId").val().length == 0)
        Cargar_Paciente_NHC($("#txtNHC").val());
});


function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        complete: function () {
            if (Nuevo == 0)
            Existe_IM_Hoy(ID)
        },
        error: errores
    });
}

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        complete: function () {
            if (Pedido_Id > 0) return false;
            if (Nuevo == 0)
                Existe_IM_Hoy($("#afiliadoId").val());
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
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');
        $("#txtPaciente").focus();

        if (PError) {
            $("#desdeaqui").hide();
            $("#btnOtroPaciente").show();
        }
        else {
            $("#desdeaqui").show();
            $("#btnOtroPaciente").show();
        }
		
		if (Qui > -1) {        
        $("#btnOtroPaciente").hide();
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
    if (Cargado == 1) return false;
    var json = JSON.stringify({ "NHC": null, "Id": Pedido_Id, "Apellido": null, "Desde": null, "Hasta": null, "objBusquedaLista": null, "MedicoId": null });
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/BuscarIM",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedido_Cargado,
        beforeSend: function () {
            $("#tabla").hide();
            $("#cargando2").show();
            Cargado = 1;
        },
        error: errores
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
        $("#afiliadoId").val(PedidoCab.AfiliadoId);
        EstaPendiente();
        if (Pedido_Id > 0) Cargar_Paciente_NHC(PedidoCab.NHC);
        Sala_Id_Aux = PedidoCab.IdSala;
        Cama_Id_Aux = PedidoCab.IdCama;
        Servicio_Id_Aux = PedidoCab.IdServicio;
        Medico_Id = PedidoCab.IdMedico;
        
    });
    LoadDetalles();
}

function LoadDetalles() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/BuscarIM_Det",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedidoDet_Cargado,
        complete: function () {
            $("#tabla").show();
            $("#cargando2").hide();
            $("#cargando_botones").hide();
            $("#botones").show();            
        },
        error: errores
    });
}

function LoadPedidoDet_Cargado(Resultado) {
    var Detalles = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;font-size:9pt;'><thead><tr><th></th><th>Insumo/Indicación</th><th>Cantidad</th><th>Unidad</th><th>Presentación</th><th>Via</th><th>Frecuencia(Hs.)</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {
        if (Detalle.Insumo_Id > 0)
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Nombre + " </td><td> " + Detalle.Cantidad_gr + " </td><td> " + Detalle.Medida + " </td><td>" + Detalle.Presentacion + " </td><td>" + Detalle.Via + " </td><td>" + Detalle.Horas + " </td></tr>";
        else
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Indicacion + " </td><td> " + "" + " </td><td> " + Detalle.Medida + " </td><td>" + Detalle.Presentacion + " </td><td>" + " " + " </td><td>" + "" + " </td></tr>";
        Detalle.Estado = 1;
        objMedicamentos[i] = Detalle;
        //objMedicamentos[i].Estado = 1;
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
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".ingreso").val('');
        },
        complete: function () {
            if (Nuevo == 0)
            Existe_IM_Hoy($("#afiliadoId").val());
        },
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

            $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');


            if (PError) {
                $("#desdeaqui").hide();
                $("#btnOtroPaciente").show();
            }
            else {
                $("#desdeaqui").show();
                $("#btnOtroPaciente").show();
            }
			
			if (Qui > -1) {        
			$("#btnOtroPaciente").hide();
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
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Internacion_Pac_byDoc",
        data: '{Documento: "' +  $("#afiliadoId").val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_PacienteInt_byDocumento_Cargado,
        error: errores
    });
}

function EstaPendiente() {
    if (Entregado == 1) return false;
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
    Entregado = 1;
    var Pendiente = Resultado.d;
    if (Pendiente) {
        $("#btnImprimir").show();
        $("#btnConfirmarPedido").show();
    }
    else {
        $("#btnImprimir").show();
        $("#btnConfirmarPedido").hide();
        if (Conf == 1) return false;
        if (confirm("El pedido ya ha sido entregado para este paciente. \n¿Desea realizar un nuevo pedido?")) {
            document.location = "CargarIM.aspx?ID=" + $("#afiliadoId").val() + "&Nuevo=1";
            Conf = 1;
        } else Conf = 1;
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
        //InitControls();
        $("#btnOtroPaciente").show();
    }
    else {
        $("#btnOtroPaciente").show();
        $("#desdeaqui").hide();
        alert('Paciente No Internado');
    }
	
		if (Qui > -1) {        
			$("#btnOtroPaciente").hide();
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

    Cantidad_gr = parseFloat($("#cantidad").val());
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
        objMedicamento.Cantidad = 0;
        objMedicamento.Cantidad_gr = Cantidad_gr;
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
}

function CargarIndicacion() {
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
    objMedicamento.Insumo_Id = "0";
    objMedicamento.Presentacion_Id = "0";
    objMedicamento.Medida_Id = "0";
    objMedicamento.Via_Id = "2";
    objMedicamento.Presentacion = "";
    objMedicamento.Medida = "";
    objMedicamento.Via = "";
    objMedicamento.Cantidad = 0;
    objMedicamento.Cantidad_gr = 0;
    objMedicamento.Horas = "0";
    objMedicamento.Estado = Estado;
    objMedicamento.EnHoras = false;
    if ($("#ocultarIM").is(':checked')) {
        objMedicamento.Ocultar = true;
    }
    else objMedicamento.Ocultar = false;
    objMedicamento.Vademe = false;
    objMedicamento.Nombre = $("#Indicacion").val();
    objMedicamento.Observaciones = $("#Observaciones").val().trim().toUpperCase();
    objMedicamento.Indicacion = $("#Indicacion").val().trim().toUpperCase();
    objMedicamentos[Cual] = objMedicamento;
    RenderizarTabla();
    Editando = 0;
    EditandoPos = -1;
    LimpiarCampos();
}

$("#btnAgregarMedicamento").click(function () {
    var valid = false;
    Cantidad_gr = parseFloat($("#cantidad").val());
    Horas = $("#txtHoras").val();
    if ($("#Medicamento_val").html() != "0" && Cantidad_gr > 0 && Horas > 0) valid = true;
    if ($("#Indicacion").val().trim().length > 0 && $("#Medicamento_val").html() != "0") { CargarAmbos(); return; }
    if ($("#Indicacion").val().trim().length > 0 && $("#Medicamento_val").html() == "0") { CargarIndicacion(); return; }
    if (valid) {
        Codigo = $("#Medicamento_val").html();
        if (ExisteItem(Codigo)) return;
        Nombre = $("#txt_Medicamento").val().trim();
        Presentacion = $("#cbo_Presentacion :selected").text();
        Presentacion_Id = $("#cbo_Presentacion :selected").val();
        Medida = $("#cbo_Medida :selected").text();
        Medida_Id = $("#cbo_Medida :selected").val();
        Via = $("#cbo_Via :selected").text();
        Via_Id = $("#cbo_Via :selected").val();
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
        objMedicamento.Cantidad = 0;
        objMedicamento.Cantidad_gr = Cantidad_gr;
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
    $("#txt_Medicamento").val('');
    $("#cbo_Medicamento").val('');
    $("#Medicamento_val").html('0');
    $("#cbo_Monodroga").val('0');
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
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;font-size:9pt;'><thead><tr><th></th><th>Insumo/Indicación</th><th>Cantidad</th><th>Unidad</th><th>Presentación</th><th>Via</th><th>Frecuencia(Hs.)</th></tr></thead><tbody>";
    var Contenido = "";
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            if (objMedicamentos[i].Insumo_Id > 0)
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Cantidad_gr + " </td><td> " + objMedicamentos[i].Medida + " </td><td>" + objMedicamentos[i].Presentacion + " </td><td>" + objMedicamentos[i].Via + " </td><td>" + objMedicamentos[i].Horas + " </td></tr>";
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
        $("#cantidad").val(objMedicamentos[Nro].Cantidad_gr);
        $("#txt_Medicamento").val(objMedicamentos[Nro].Nombre);
        $("#cbo_Medicamento").val(objMedicamentos[Nro].Nombre);
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

function ExisteItem(Algo) {
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
    I.NHC = $("#afiliadoId").val();
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
                if (V_Int == 1) document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + InternacionId;
                else document.location = "CargarIM.aspx";
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
            'href': '../Impresiones/Print_Indicacion.aspx?Id=' + $("#CargadoPedido").html() ,//Pedido_Id,
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

    $("#btnImprimir").click(function () {
        Print();

    });

