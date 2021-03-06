var Pedido_Id = 0;
var Sala_Id_Aux;
var Cama_Id_Aux;
var Servicio_Id_Aux;
var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var objMedicamentos2 = {};
var Entregados = {};
var objEntregados = new Array();
var objEntregados2 = {};
var Contenido = "";
var Pendiente;
var Egr_Id = 0;
var NroEntrega = 0;
var RemitoId = "Provisorio";
var Pend = 0;
var Nombre_Alert = "";
var combos = [];
var indiceCheckCantidadEntregar = 0;
var combosRecordarSeleccion = []; // para que recuerde la seleccion del usuario cuando se actualiza con el boton agregar


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
    if (Query['Pend'] != null && Query['Pend'] != undefined) Pend = 1;
    
    $("#btnConfirmarEntrega").attr("disabled", true);
    $("#cbo_Medicamento").attr('disabled', 'disabled');
    $("#cantidad").attr('readonly', true);
    if (Pedido_Id > 0) LoadPedido();
    else $("#CargadoFecha").html(FechaActual());
});

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
        },
        complete: function () {
            $("#cargando2").hide();
            $("#cont_datospac").show();
            $('#desdeaqui').click();
        }
    });
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function RemoveClass() {
    $("#controlcantidadent").removeClass("error");
}

function LoadPedido_Cargado(Resultado) {
    var PedidoCab = {};
    PedidoCab = Resultado.d;
    $("#CargadoPedido").html(Pedido_Id);
    $("#CargadoDNI").html(PedidoCab.Documento);
    $("#CargadoNHC").html(PedidoCab.NHC);
    $("#CargadoTelefono").html(PedidoCab.Telefono);
    $("#CargadoServicio").html(PedidoCab.Servicio);
    $("#CargadoFecha").html(PedidoCab.Fecha);
    $('#fotopaciente').attr('src', '../fotoPerfil/' + PedidoCab.foto);
    $("#CargadoApellido").html(PedidoCab.Paciente);
    $("#CargadoSala").html(PedidoCab.Sala);
    $("#CargadoCama").html(PedidoCab.Cama);
    Sala_Id_Aux = PedidoCab.Sala_Id;
    Cama_Id_Aux = PedidoCab.Cama_Id;
    Servicio_Id_Aux = PedidoCab.Servicio_Id;
    Cargar_Paciente_NHC(PedidoCab.NHC);
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    LoadDetalles();
    EstaPendiente();
}

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

$("#btnImprimir").click(function () {
    Print();

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
        $("#btnConfirmarEntrega").show();
//        $("#btnImprimir").hide();
    }
    else { //Pedido Completo
        $("#btnConfirmarEntrega").hide();
//        $("#btnImprimir").show();
    }
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function LoadDetalles() {
    $.ajax({                                 //antes usaba este BuscarPPP_byPedidoid_Det pero en pedidos repetia insumos poque incluia el cambio de lote
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/BuscarPPP_byPedidoid_Det_Entregas",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedidoDet_Cargado,
        error: errores
    });
}

function LoadPedidoDet_Cargado(R) {
    //alert("cargado");
    var Detalles = R.d;
    console.log(Detalles);
    Contenido = "";
    var i = 0;
    var f = 0; // para contar las iteraciones de la lista general que viene repetida por el agregado del lote y cerrar la tabla html
    var insumo = 0;
    var insumos = [];
    $.each(Detalles, function (index, Detalle) {
        var opcion = {};
        opcion.descripcion = Detalle.EnStock + " - Nro. de Lote:" + Detalle.NRO_LOTE;
        opcion.valor = Detalle.NRO_LOTE;
        opcion.comboId = Detalle.Insumo_Id;
        opcion.VENCIMIENTO = Detalle.VENCIMIENTO;
        combos.push(opcion);


        //  alert( Detalle.Pedido_Id+ "InsumoId"+ Detalle.Insumo_Id );

        Get_StockbyId(Detalle.Insumo_Id);
        var json = JSON.stringify({ "DetalleId": Detalle.Pedido_Id, "InsumoId": Detalle.Insumo_Id });
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/Buscar_Egr_Det",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Ent = Resultado.d;
                Detalle.Nombre = Detalle.Nombre + "-" + Detalle.Gramaje + Detalle.Medida + "-" + Detalle.Presentacion;
                // alert(Detalles.length);
                // alert(i);
                //alert("insumo: " + insumo + "//" + "detalle: " + Detalle.Insumo_Id);
                //alert(Ent);
                if (Ent != null) {
                    //alert("if");
                    //  if (insumo != Detalle.Insumo_Id) {// se fija si trae repetido el insumo(por el combo agregado de lote), para no generar filas demas

                    if ($.inArray(Detalle.Insumo_Id, insumos) == -1) {
                        insumo = Detalle.Insumo_Id;
                        insumos.push(Detalle.Insumo_Id);

                        $("#CargadoEntrega").html(Ent.RED_REM_ID);
                        // $("#btnHistorial").show(); lo oculto 20/8/20
                        Ent.Cant_Ini = Ent.CANTIDAD;
                        var Saldo = parseInt(Detalle.Cantidad) - parseInt(Ent.CANTIDAD);
                        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a></td><td> " + Detalle.Nombre + " </td><td> " + Detalle.Cantidad + " </td><td> " + Ent.CANTIDAD + " </td><td> " + Saldo + " </td>" +
                        "<td><select class='combo' id='cbo_" + Detalle.Insumo_Id + "'></select></td><td> " + Ent.OBSERVACIONES + " </td></tr>";
                        objMedicamentos[i] = Detalle;
                        objMedicamentos[i].Estado = 1;
                        objEntregados[i] = Ent;
                        Total = Total + 1;
                        i = i + 1;
                    }
                }
                else {
                    //alert("else");
                    // if (insumo != Detalle.Insumo_Id) {// se fija si trae repetido el insumo(por el combo agregado de lote), para no generar filas demas
                    if ($.inArray(Detalle.Insumo_Id, insumos) == -1) {
                        insumo = Detalle.Insumo_Id;
                        insumos.push(Detalle.Insumo_Id);
                        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a></td><td> " + Detalle.Nombre + " </td><td> " + Detalle.Cantidad + " </td><td> " + '0' + " </td><td> " + parseInt(Detalle.Cantidad) + " </td><td><select class='combo' id='cbo_" + Detalle.Insumo_Id + "'></select></td><td> " + ' ' + " </td></tr>";
                    }
                }

                //  alert(f + "//" + Detalles.length)
                if (f == Detalles.length - 1) {
                    //  alert(i + "//" + parseInt(Detalles.length) - parseInt(1));
                    Contenido = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Unidades Pedidas</th><th>Unidades Entregadas</th><th>Unidades Pendientes</th><th>Unidades en Stock</th><th>Observaciones</th></tr></thead><tbody>" + Contenido + "</tbody></table>";
                    $("#TablaMedicamentos").html(Contenido);
                    //  alert(Contenido);
                    $.each(combos, function (index, item) {
                 
                        switch (item.VENCIMIENTO) {
                            case "1":
                                $("#cbo_" + item.comboId).append('<option data-vencimiento="1" style="background-color:#2B2929; color:white" value="' + item.valor + '">' + item.descripcion + '</option>');
                                break;
                            case "180":
                                $("#cbo_" + item.comboId).append('<option style="background-color:#F73409" value="' + item.valor + '">' + item.descripcion + '</option>');
                                break;
                            case "181":
                                $("#cbo_" + item.comboId).append('<option  value="' + item.valor + '">' + item.descripcion + '</option>');
                                break;
                        }
                    });
                }

                f = f + 1;
                objMedicamentos[i] = Detalle;
                objMedicamentos[i].Estado = 1;
                objEntregados[i] = Ent;
                Total = Total + 1;
                i = i + 1;

            },
            error: errores,
            beforeSend: function () {
                $("#cargando").show();
                $("#TablaMedicamentos").hide();
            },
            complete: function () {
                $("#cargando").hide();
                $("#TablaMedicamentos").show();
            }
        });
    });
   // console.log(objEntregados);
    // alert(Contenido);
}




//" + Detalle.EnStock + " 


function Editar(Nro) {
    $("#mensaje").show();
    //alert(Nro);
    //lo uso para verificar que el insumo que esta en ese indice de la lista y se quiere agregar cantida a editar
    //se mayor a la ya entregada para que funcione bien la entrega sn valores negativos
    indiceCheckCantidadEntregar = 0;
    indiceCheckCantidadEntregar = Nro;

    //console.log(objMedicamentos);
   // console.log(objMedicamentos[Nro]);

   // console.log(objEntregados);

    Editando = 1;
    EditandoPos = Nro;
    $("#cbo_Medicamento").attr('disabled', 'disabled');
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    Nombre_Alert = objMedicamentos[Nro].Nombre;
    Get_StockbyId(objMedicamentos[Nro].Insumo_Id);
    $("#cantidadent").val("0");
    $("#txt_CantidadAnterior").val('0');
    $("#Observaciones").val("");
    $("#cbo_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#medicamentoId").val(objMedicamentos[Nro].Insumo_Id);
                           //CANTIDAD
    if (objEntregados[Nro].Cantidad >= 0) {
        $("#txt_CantidadAnterior").val(objEntregados[Nro].Cant_Ini);
        $("#chk_Etiqueta").attr("checked", objEntregados[Nro].Etiqueta);
                                                //CANTIDAD
        $("#cantidadent").val(objEntregados[Nro].Cantidad);
        $("#Observaciones").val(objEntregados[Nro].OBSERVACIONES);
        var StockFut = parseInt($("#stock_medicamento").html()) - objEntregados[Nro].CANTIDAD;
        $("#stock_futuro").html(StockFut);
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
        beforeSend: function () {
            $("#stock_medicamento").html('0');
        },
        error: errores
    });
}

function Get_StockbyId_Cargado(Resultado) {
    var Insumo = Resultado.d;
    if (Insumo != null) {
       $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
      //  if (parseInt(Insumo.STO_MINIMO) > parseInt(Insumo.STO_CANTIDAD) && Nombre_Alert.length > 0) { alert("Insumo por debajo del stock mínimo."); Nombre_Alert = ""; }
    }
    else {
        $("#stock_medicamento").html('0');
        $("#stock_futuro").html('0');
    }
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

$("#medicamentoId").change(function () {
    Get_StockbyId($('#medicamentoId').val());
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
}

$("#btnAgregarMedicamento").click(function () {
    //alert(indiceCheckCantidadEntregar);
    //console.log(objEntregados);
    console.log(objMedicamentos);
    //return false;
    //alert(objMedicamento[indiceCheckCantidadEntregar].Cantidad);
    //alert(objEntregados[indiceCheckCantidadEntregar].Cantidad);
    //alert((objMedicamentos[indiceCheckCantidadEntregar].Cantidad) + "//" + (parseFloat($("#cantidadent").val())));
    // verifica que lo que se ingresa en el campo cantidad a ent es la suma de lo que se entrego mas lo que se quiere entregar ahora para que no genere numeros negativos y funcione la entrega
    //    if (objMedicamentos[indiceCheckCantidadEntregar].Cantidad < (parseFloat($("#cantidadent").val()))) {
    //        // alert("Sume la cantidad ya entregada mas lo que quiere entregar e ingrese ese valor"); 
    //        return false;
    //    }

    if (objMedicamentos[indiceCheckCantidadEntregar].Saldo == 0) { return false; } //else { alert("si"); }


    //alert(($("#cantidadent").val() + "//" + objMedicamentos[indiceCheckCantidadEntregar].Entregado));

    if ($("#cantidadent").val() <= objMedicamentos[indiceCheckCantidadEntregar].Entregado) { return false; }

    var valid = $("#frm_Cantidad").valid();
    if (valid) {
        //alert("paso");
        RemoveClass();
        //var cant = parseInt($("#cantidadent").val()) + parseInt($("#txt_CantidadAnterior").val());

        // alert($("#cantidadent").val() + "//" + $("#cantidad").val() + "//" + $("#stock_medicamento").html());
        var cant = parseInt($("#cantidadent").val());
        var stock = parseInt($("#stock_medicamento").html());
        if (parseInt($("#cantidad").val()) >= cant) {
            //if (parseInt($("#cantidadent").val()) <= stock) {
            Cantidad = parseInt($("#cantidad").val());
            Cant_Ent = cant;
            Observaciones = $("#Observaciones").val().trim().toUpperCase();
            EnStock = $("#stock_medicamento").html();
            var Estado = 1;
            var Cual = Total;
            if (Editando == 1) {
                Cual = EditandoPos;
            }
            else {
                Total = Total + 1;
                Cual = Total;
            }
            Detalle_Id = objMedicamentos[Cual].Detalle_Id;
            Nombre = objMedicamentos[Cual].Nombre;
            Codigo = objMedicamentos[Cual].Insumo_Id;
            objMedicamento = {};
            Entregados = {};
            objMedicamento.Insumo_Id = Codigo;
            objMedicamento.Cantidad = Cantidad;
            objMedicamento.Estado = Estado;
            objMedicamento.Nombre = Nombre;
            objMedicamento.EnStock = EnStock;
            objMedicamentos[Cual] = objMedicamento;
            Entregados.CANTIDAD = Cant_Ent;
            Entregados.Cant_Entrega = parseInt($("#cantidadent").val()); //Lo que entrego del insumo en la entrega
            Entregados.INSUMO_ID = Codigo;
            Entregados.RED_DET_ID = Detalle_Id;
            Entregados.OBSERVACIONES = Observaciones;
            Entregados.RED_REM_ID = Pedido_Id;
            Entregados.Etiqueta = $("#chk_Etiqueta").is(":checked");

            console.log("objEntregados" + objEntregados);
            objEntregados[Cual] = Entregados;
            RenderizarTabla();
            Editando = 0;
            EditandoPos = -1;
            $("#btnConfirmarEntrega").removeAttr("disabled");
            LimpiarCampos();

            $("#mensaje").hide();
            //  }
            //  else alert("No hay suficiente stock.");
        }
        else alert("Cantidad Entregada Supera a Cantidad Pedida.");
    }
});

function LimpiarCampos() {
    $("#stock_medicamento").html("0");
    $("#stock_futuro").html('0');
    $("#cantidad").val('');
    $("#Observaciones").val("");
    $("#cantidadent").val("0");
    $("#cbo_Medicamento").val('');
    $("#medicamentoId").val('0');
    $("#txt_CantidadAnterior").val("0");
    //$("#chk_Etiqueta").removeAttr("checked");
    Editando = 0;
    EditandoPos = -1;
}

$("#btnCancelarMedicamento").click(function () {
    LimpiarCampos();
    Editando = 0;
    EditandoPos = -1;
});

function RenderizarTabla() {
    //alert("renderizar");
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Unidades Pedidas</th><th>Unidades Entregadas</th><th>Unidades Pendientes</th><th>Unidades en Stock</th><th>Observaciones</th></tr></thead><tbody>";
    Contenido = "";
    var insumo = 0;
    console.log(objEntregados);
   // alert("total: " + Total);
    for (var i = 0; i <= Total; i++) {
        //      alert(objEntregados[i]);

        if (insumo != objMedicamentos[i].Insumo_Id) {// valida que el insumo no este repetido por el agregado del lote
            insumo = objMedicamentos[i].Insumo_Id;
            if (objEntregados[i] != null) {
                //alert(objEntregados[i].Insumo_Id);
                var saldo = objMedicamentos[i].Cantidad - objEntregados[i].CANTIDAD;                                                                                                                                                                                                                                    //  " + objMedicamentos[i].EnStock + "                 
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a></td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> " + objEntregados[i].CANTIDAD + " </td><td> " + saldo + " </td><td><select class='combo' id='cbo_" + objMedicamentos[i].Insumo_Id + "'></select></td><td> " + objEntregados[i].OBSERVACIONES + " </td></tr>";
            }
            else                                                                                                                                                                                                                                                                                                                       //         " + objMedicamentos[i].EnStock + "
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a></td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> " + '0' + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td><select class='combo' id='cbo_" + objMedicamentos[i].Insumo_Id + "'></select></td><td> " + '' + " </td></tr>";
        }
    }
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
    $.each(combos, function (index, item) {
        //alert(item.descripcion);
        $("#cbo_" + item.comboId).append('<option value="' + item.valor + '">' + item.descripcion + '</option>');
    });


    $.each(combosRecordarSeleccion, function (index, item1) {
        $(".combo").each(function (index, item2) {
            if ($(this).attr('id') == item1.id)
                $(this).val(item1.seleccion);
        });
    });

    console.log(combos);
}

$("#btnConfirmarEntrega").click(function () {
if (confirm("¿Desea confirmar la entrega?")){
    VerificarPendiente();
    Insert_Egr_Cab();
    }
});

function VerificarPendiente() {
    var Pedido = 0;
    var Entregado = 0;
    for (var k = 0; k <= Total; k++) {
        Pedido = Pedido + parseInt(objMedicamentos[k].Cantidad);
        if (objEntregados[k] != null)
            Entregado = Entregado + parseInt(objEntregados[k].CANTIDAD);
        else
            Entregado = Entregado + 0;
    }
    if (Entregado >= Pedido) Pendiente = false;
    else Pendiente = true;
}

function Insert_Egr_Cab() {
    var f = {};
    f.REM_SER_ID = Servicio_Id_Aux;
    f.REM_SOC_ID = $("#afiliadoId").val();
    f.PED_ID = Pedido_Id;
    f.CAMA_ID = Cama_Id_Aux;
    f.SALA_ID = Sala_Id_Aux;
    var json = JSON.stringify({ "f": f });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Insert_Egr_Cab",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetNroEntregaForRemito,
        error: errores
    });
}

function GetNroEntregaForRemito(Resultado) {
    Egr_Id = Resultado.d;
    if (Egr_Id > 0) {
        var json = JSON.stringify({ "RemitoId": Egr_Id });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/Farmacia.asmx/GetNroEntregaforRemito",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Insert_Remitos_Cab_Cargado,
            error: errores
        });
    }
}

function Insert_Remitos_Cab_Cargado(Resultado) {
    var n = Resultado.d;
    console.log(objEntregados);
    $(".combo").each(function (index, item) {
        var id = $(this).attr("id").replace("cbo_", "");
        var lote = $(this).val();
        $.each(objEntregados, function (index, item) {
          //  alert(index);
            if (objEntregados[index] != null && objEntregados[index].INSUMO_ID == id)
            { objEntregados[index].lote = lote; }
        });
    });
    console.log(objEntregados);
   // return false;
        var json = JSON.stringify({ "objEntregados": objEntregados, "Tipo": "PPP", "NroEnt": n });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/Farmacia.asmx/Insert_Egr_Det",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: LastNroEntrega,
            error: errores
        });
}

function LastNroEntrega () {
    var json = JSON.stringify({ "RemitoId": Egr_Id });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/GetLastEntregaId",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Egr_Det_Cargado,
        error: errores
    });
}

function Insert_Egr_Det_Cargado(Resultado) {
    NroEntrega = Resultado.d; //Es el numero de entrega de la entrega en cuestion
    var json = JSON.stringify({ "Id": Pedido_Id, "Pendiente": Pendiente });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/UpdatePedidoPendiente",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Print,
        error: errores
    });
}

$("#EntregasModal").on('show', function () {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/VerHistorialdeEntrega",
        data: '{RemitoId: "' + $("#CargadoEntrega").html() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Entregas = Resultado.d;
            var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;height:30px'><thead><tr><th>Nro. Entrega</th><th>Fecha</th><th>Usuario</th></tr></thead><tbody>";
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
 //   alert("load");
    $.fancybox(
                {
                    'autoDimensions': false,
                    'href': '../Impresiones/EntregasPPPImpresion.aspx?Id=' + $("#CargadoEntrega").html() + "&Nro=" + Entrega,
                    'width': '75%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'onClosed': function () {
                        if ($("#chk_Etiqueta").is(':checked')) {
                            setTimeout(function () { Imprimir_Etiq($("#CargadoEntrega").html(), Entrega, 0); }, 1000);
                        } else { window.location.href = "EntregasPPP.aspx"; }
                    },
                    'enableEscapeButton': false
                });
}

function Imprimir_Etiq(Id, Nro, New) {

        $.fancybox(
                {
                    'autoDimensions': false,
                    'href': '../Impresiones/ImpresionFarmacia_Etiq.aspx?Id=' + Id + '&Nro=' + Nro + "&EsIM=" + New,
                    'width': '75%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'onClosed': function () {
                        //if (New == 1) window.location.href = "EntregasPPP.aspx"; //New = 1 nueva entrega
                        window.location.href = "EntregasPPP.aspx";
                    }
                });
    
}


function Print(Resultado) {
  //  alert("print");
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/EntregasPPPImpresion.aspx?Id=' + Egr_Id + "&Nro=" + NroEntrega,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                //   window.location.href = "EntregasPPP.aspx"; //nueva entrega

                if ($("#chk_Etiqueta").is(':checked')) {
                    setTimeout(function () { Imprimir_Etiq(Egr_Id, NroEntrega, -1); }, 1000);
                } else { window.location.href = "EntregasPPP.aspx"; }
            }
        });
    }

    $("#btnVolver").click(function () {
        if (Pend == 0) window.location.href = "EntregasPPP.aspx";
        else window.location.href = "PedidosPendientes.aspx";
    });

    // para que recuerde la seleccion del usuario cuando se actualiza con el boton agregar
    $(".combo").live("change", function () {

        var id = $(this).attr('id');
        if ($("#" + id + " option:selected").data('vencimiento') == 1) { alert("Este lote está vencido"); }
        return false;

        var flag = 0;
        var cboId = $(this).attr('id')
        var indiceEditar;
        $.each(combosRecordarSeleccion, function (index, item) {
            //alert(cboId + "//" + item.id);
            if (cboId == item.id) { flag = 1; indiceEditar = index; }
        });

        //saca, modifica
        if (flag == 1) {
            combosRecordarSeleccion[indiceEditar].seleccion = $(this).val();
        }
        // agrega
        else {
            var opc = {};
            opc.id = $(this).attr('id');
            opc.seleccion = $(this).val();
            combosRecordarSeleccion.push(opc);
        }
        console.log(combosRecordarSeleccion);
    });



