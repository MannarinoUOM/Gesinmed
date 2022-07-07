var sourceArr = [];
var mapped = {};


var Pedido_Id = 0;
var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var Servicio_Id_Aux = 120000088; //. por Default
var Modificar = 0;

$(document).ready(function () {
    $("#frm_input").validate({
        ignore: [],
        rules: {
            'cantidad': { required: true, number: true, range: [1, 9999] }
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
    var Query = {};
    Query = GetQueryString();
    Pedido_Id = Query['Id'];
    if (Pedido_Id > 0) {
        Modificar = 1;
        List_Depositos();
        LoadPedido();
    }
    else $("#CargadoNumero").html("Provisorio");
});

function SetearFecha() {
    $("#txtFechaVenc").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaVenc").datepicker();
    MostrarVenc(false);
}


$(".motivo_chk").click(function () {
    if ($("#vencimiento").is(":checked")) MostrarVenc(true);
    else MostrarVenc(false);


    if ($("#devolucion").is(":checked")) { $("#cboLote option:selected").html('Seleccione Lote'); $("#cboLote").attr('disabled', true); }
    else { $("#cboLote option:selected").html('Seleccione Lote'); $("#cboLote").attr('disabled', false); }
});

function MostrarVenc(Estado) {
    //    if (!Estado) { //Ocultar
    //        $(".contenedor_4 ").height('150px');
    //        $("#TablaMedicamentos").height('210px');
    //        $("#txtFechaVenc").hide();
    //        $("#lbl_txtFechaVenc").hide();
    //    }
    //    else { //Mostrar (motivo = vencimiento)
    //        $(".contenedor_4 ").height('180px');
    //        $("#TablaMedicamentos").height('180px');
    //        $("#txtFechaVenc").show();
    //        $("#lbl_txtFechaVenc").show();
    //    }
   // alert(Estado);

    if (!Estado) {
        $(".contenedor_4 ").height('150px');
        $("#TablaMedicamentos").height('150px');
        $("#txtFechaVenc").hide();
        $("#lbl_txtFechaVenc").hide();
    }
    else {
        $(".contenedor_4 ").height('180px');
        $("#TablaMedicamentos").height('120px');
        $("#txtFechaVenc").show();
        $("#lbl_txtFechaVenc").show();
    }


}

$("#txtFechaVenc").change(function () {
    $("#STO_VENCIMIENTO").val($("#txtFechaVenc").val());
});

$("#STO_VENCIMIENTO").change(function () {
    $("#txtFechaVenc").val($("#STO_VENCIMIENTO").val());
});

$("#vencimiento").change(function () {
    if ($(this).is(":checked")) MostrarVenc(true);
    else MostrarVenc(false);
});

function InitControls() {
    List_Servicios();
    SetearFecha();
    ListaMonoDrogras();
    List_by_Monodroga(0);
    $("#btnConfirmarPedido").attr("disabled", true);
}

$("#cantidad").blur(function () {
    $("#cantidad").removeClass("error");
});

function LoadPedido() {
    var json = JSON.stringify({ "Id": Pedido_Id, "Desde": null, "Hasta": null, "ServicioId": null });
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/BuscarDevSer",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedido_Cargado,
        error: errores,
        beforeSend: function () {
            $("#cargando2").show();
            $("#cont_datospac").hide();
        },
        complete: function () {
            $("#cargando2").hide();
            $("#cont_datospac").show();
            $("#hastaaqui").fadeIn(1500);
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
            $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
            LoadDetalles();
        }
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

function LoadPedido_Cargado(Resultado) {
    var PedidoCab = {};
    var Lista = Resultado.d;
    $.each(Lista, function (index, PedidoCab) {
        $("#CargadoNumero").html(PedidoCab.Pedido_Id);
        $("#CargadoServicio").html(PedidoCab.Servicio);
        $("#CargadoFecha").html(PedidoCab.Fecha);
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
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Presentación</th><th>Vencimiento</th><th>Cantidad</th><th>Observaciones</th><th>#</th></tr></thead><tbody>";
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
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Nombre + " </td><td> " + Detalle.Presentacion + " </td><td> " + Detalle.Vencimiento + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.Observacion + " </td>" +
        "<td><input class='entregar' id='" + i + "' type='checkbox'/></td></tr>";
        Total = Total + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}


$(".entregar").live('click', function () {
    if ($(this).is(':checked')) {
        objMedicamentos[$(this).attr('id')].chk = 1;
        console.log(objMedicamentos[$(this).attr('id')]);
    } else {
        objMedicamentos[$(this).attr('id')].chk = 0;
        console.log(objMedicamentos[$(this).attr('id')]);
    }
    if (objMedicamentos.length > 0) { $("#btnConfirmarPedido").removeAttr("disabled"); } else { $("#btnConfirmarPedido").Attr("disabled",true); }

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

$("#cbo_Servicio").change(function () {
    Servicio_Id_Aux = $(this).val();
});


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
    if (Insumo != null) {
        $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
        $("#precio_medicamento").html(parseFloat(Insumo.REM_PRECIO).toFixed(2));
        $("#precioultima_medicamento").html(parseFloat(Insumo.REM_PRECOMPRA).toFixed(2));
        $("#Presentacion").val(Insumo.Presentacion);
    }
    else {
        $("#stock_medicamento").html('0');
        $("#precio_medicamento").html('0');
        $("#precioultima_medicamento").html('0');
        $("#Presentacion").val("");
    }
    $("#cbo_Deposito").val(Insumo.STO_DEP_ID);
    $("#cbo_Deposito").attr('disabled', 'disabled');
}

function Validar_IngresoInsumo() {
    if ($("#Medicamento_val").html() == '0') { alert("Ingrese insumo."); return false; }
    if (Existe($("#Medicamento_val").html())) return false;
    if ($("#vencimiento").is(":checked") && $("#STO_VENCIMIENTO").val().trim().length == 0) {alert("Ingrese vencimiento.");return false; }
    return true;
}

$("#btnAgregarMedicamento").click(function () {

    if ($("#cboLote option:selected").text() == "Seleccione Lote") {

        $.each($("input[name='motivo']:checked"), function () {
            if($(this).attr('id') != 'devolucion')
                alert("Seleccione Lote"); return false;
        });

    }
    // if ($("#cboLote").val() == 0) { alert("Seleccione Lote"); return false; }

    var valid = $("#frm_input").valid();
    if (valid && Validar_IngresoInsumo()) {
        var Motivo;
        Codigo = $("#Medicamento_val").html();
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
        objMedicamento.Insumo_Id = Codigo;
        objMedicamento.Deposito_Id = Deposito;
        objMedicamento.Cantidad = Cantidad;
        objMedicamento.Precio = Precio;
        objMedicamento.Subtotal = Subtotal;
        objMedicamento.Estado = Estado;
        objMedicamento.Nombre = Nombre;
        objMedicamento.Observacion = Observaciones;
        objMedicamento.Motivo = Motivo;
        objMedicamento.Presentacion = $("#Presentacion").val();

        if (Editando == 1) { objMedicamento.chk = $("#txtEstadoIntemEntrega").val(); }

        //        if ($("#cbo_Lotes :selected").val() == "") objMedicamento.NroLote = "-1";
        //        else objMedicamento.NroLote = $("#cbo_Lotes :selected").val();

        // le pongo el valor del lote que se muestraa el nuevo
        if ($("#cboLote :selected").val() == "") objMedicamento.NroLote = "-1";
        else objMedicamento.NroLote = $("#cboLote :selected").val();


        objMedicamento.Vencimiento = $("#STO_VENCIMIENTO").val();
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
    if (objMedicamentos.length > 0) $("#btnConfirmarPedido").removeAttr("disabled");
    MostrarVenc(false);
    $("#txtFechaVenc").val("");
    $("#STO_VENCIMIENTO").val("");

    $("#devolucion").attr("checked", true);
    $("#txt_Medicamento").val('');
    $("#Medicamento_val").html('0');
    $("#cbo_Medicamento").val('');
    $("#txt_Medicamento").removeAttr("disabled");
    $("#cantidad").val('');
    $("#precio_medicamento").html('0');
    $("#Observaciones").val('');
    $("#stock_medicamento").html('0');
    $("#txtLotes").val('');
    
    $("#Presentacion").val("");
    $("#cbo_Lotes").empty();
    Editando = 0;
    EditandoPos = -1;
}

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Presentación</th><th>Vencimiento</th><th>Cantidad</th><th>Observaciones</th><th>#</th></tr></thead><tbody>";
    var Contenido = "";
    var chk;
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            if (objMedicamentos[i].chk == 1) { chk = "checked='checked'"; } else { chk = ""; }
            console.log(objMedicamentos[i]);
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Presentacion + " </td><td> " + objMedicamentos[i].Vencimiento + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> " + objMedicamentos[i].Observacion + " </td>" +
            "<td><input class='entregar' id='" + i + "' type='checkbox' "+ chk +" /></td></tr>";
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
    $("#cbo_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#txt_Medicamento").attr('disabled', 'disabled');
    $("#Medicamento_val").html(objMedicamentos[Nro].Insumo_Id);
    $("#cbo_Deposito").attr('disabled', 'disabled');
    var option = $(":radio[name='motivo'][value='" + objMedicamentos[Nro].Motivo + "']");
    if (option.length > 0)
        option[0].checked = true;
    if (objMedicamentos[Nro].Motivo == 1) MostrarVenc(true);
    else MostrarVenc(false);
    $("#STO_VENCIMIENTO").val(objMedicamentos[Nro].Vencimiento);
    $("#txtFechaVenc").val(objMedicamentos[Nro].Vencimiento);

    $("#txtLotes").val(objMedicamentos[Nro].NroLote);
    Get_Insumo_by_Id(objMedicamentos[Nro].Insumo_Id);
    List_Lotes_by_Insumo(objMedicamentos[Nro].Insumo_Id);
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    
    $("#Presentacion").val(objMedicamentos[Nro].Presentacion);
    $("#cbo_Medicamento option[value=" + objMedicamentos[Nro].Insumo_Id + "]").attr("selected", true);
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");

    $("#txtEstadoIntemEntrega").val(objMedicamentos[Nro].chk);
    console.log(objMedicamentos[Nro]);
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

function Validar() {
    if (objMedicamentos.length == 0) { alert("No hay Insumos en la Lista"); return false; }
    return true;
}

$("#btnConfirmarPedido").click(function () {
    if (!$(".entregar").is(':checked')) { alert("ATENCION!!! Seleccione algún insumo para su devolución"); return false; }

    if (confirm("¿Desea confirmar la devolucion?")) {
        if (!Validar()) return false;

        if (Modificar != 1)
            Insert_Devolucion();
        else
            Delete_Detalles();
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
    var json = JSON.stringify({ "IdPedido": IdPedido, "objMedicamentos": objMedicamentos, "Modifica": Modificar, "Servicio_Id": Servicio_Id_Aux });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Insert_DevPP_Det",
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
                window.location.href = "DevolucionporServicio.aspx";
            }
        });
    }

    $("#btnDevoluciones").click(function () {
        window.location = "BuscarDevSer.aspx";
    });


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
        $("#btnConfirmarPedido").attr("disabled", true);
        $("#cbo_Lotes").empty();
        $("#cbo_Lotes").append($("<option></option>").val('').html('LOTE'));
        $("#cbo_Medicamento").val($("#txt_Medicamento").val());
        $.each(Lotes, function (index, Lote) {
            $("#cbo_Lotes").append($("<option></option>").val(Lote.NROLOTE).html(Lote.NROLOTE));
            if ($("#txtLotes").val() == Lote.NROLOTE) $("#cbo_Lotes").val(Lote.NROLOTE);
        });
    }

    $("#cbo_Lotes").change(function () {
        $("#txtLotes").val($("#cbo_Lotes :selected").val());
        InsumoStockInfo();
    });

    function InsumoStockInfo() {
        var json = JSON.stringify({"IdInsumo": $("#Medicamento_val").html(), "NroLote": $("#txtLotes").val()});
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
                    $('#cbo_Monodroga').append($('<option></option>').val(mono.numero).html(mono.nombre));
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
            Get_Insumo_by_Id(mapped[selection]);
            List_Lotes_by_Insumo(mapped[selection]);

            $("#txt_Medicamento").val(selection); //nom
            $("#Medicamento_val").html(mapped[selection]); //id
            traeLoteInsumo(mapped[selection]);
        },
        minLength: 4,
        items: 10
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