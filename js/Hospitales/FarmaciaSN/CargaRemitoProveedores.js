var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var Modificar = 0;
var objMedicamentos2 = new Array();
var Total2 = -1;
var remitoId = 0;

$(document).ready(function () {
    $("#frm_main").validate({
        rules: {
            'txtFecha': { required: true, dateES: true }
        },
        messages: {
            'txtFecha': { required: '', dateES: '' }
        }
    });

    $("#frm_cantidad").validate({
        rules: {
            'txtFechaVenc': { required: true, dateES: true },
            'txtPrecioCompra': { required: true, number: true },
            'cantidad': { required: true, number: true, range: [1, 10000] },
            'txtLote': { required: true }
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
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtLetra").mask("a", { placeholder: "-" });
    $("#txtFecha").datepicker();
    Cargar_Medicamentos(false);
    List_Depositos();
    List_Proveedores('S');
    $("#btnConfirmarRemito").attr("disabled", true);
    $("#txtFecha").val(FechaActual());
    $("#txtFechaVenc").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaVenc").val(FechaActual());
    $("#txtFechaVenc").datepicker();
    var queryObj = {};
    queryObj = GetQueryString();
    if (queryObj['Id'] != null) {
        remitoId = queryObj['Id'];
        Modificar = 1;
        $("#btnPrint").show();
        LoadRemito(queryObj['Id']);
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

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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

function List_Proveedores(Todos) {
    $.ajax({
        type: "POST",
        data: '{Todos: "' + Todos + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Proveedores_Cargado,
        error: errores,
        complete: function () {
            $("#desdeaqui").show();
            $("#btnRemitos").show();
        }
    });
}

function List_Proveedores_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Proveedor) {
        $("#cbo_Proveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
    });

}

function ConCeros4(Cifras) {
    var num = $("#txtNro1").val();
    var numtmp = num;
    var largo = numtmp.length;
    if (largo == 4) return numtmp;
    var ceros = '';
    var pendientes = 4 - largo;
    for (i = 0; i < pendientes; i++) ceros += '0';
    $("#txtNro1").val(ceros + numtmp);
}

function ConCeros8(Cifras) {
    var num = $("#txtNro2").val();
    var numtmp = num;
    var largo = numtmp.length;
    if (largo == 8) return numtmp;
    var ceros = '';
    var pendientes = 8 - largo;
    for (i = 0; i < pendientes; i++) ceros += '0';
    $("#txtNro2").val(ceros + numtmp);
}


 $("#txtNro1").blur(function () {
     ConCeros4();
 });

 $("#txtNro2").blur(function () {
     ConCeros8();
 });

 $("#desdeaqui").click(function () {
     $("#CargadoProveedor").html($("#cbo_Proveedor option:selected").text());
     $("#CargadoFecha").html($("#txtFecha").val());
     $("#CargadoFactura").html($("#txtLetra").val() + '-' + $("#txtNro1").val() + '-' + $("#txtNro2").val());
     $("#CargadoObservacion").html($("#txtObservaciones").val());
 });

 function Existe(Algo) {
     var Lote = $("#txtLote").val().trim().toUpperCase();
     var Insumo = $("#Medicamento_val").html();
     for (var i = 0; i <= Total; i++) {
         if (objMedicamentos[i].Insumo_Id == Insumo && objMedicamentos[i].NroLote == Lote && objMedicamentos[i].Estado == 1 && Editando != 1) {
             alert("Ya ha cargado el Medicamento Nro: " + Insumo + " - Nro. Lote: " + Lote);
             LimpiarCampos();
             $("#cbo_Medicamento").focus();
             return true;
         }
     }
     return false;
 }

 $("#txtLetra").blur(function () {
     $("#txtLetra").val($("#txtLetra").val().toUpperCase());
 });

 function LimpiarCampos() {
     if (objMedicamentos.length > 0)
         $("#btnConfirmarRemito").removeAttr("disabled");
     $("#txt_Medicamento").val('');
     $("#Medicamento_val").html('0');
     if (remitoId == 0) $("#txt_Medicamento").removeAttr("disabled");
     $("#cantidad").val('');
     $("#txtFechaVenc").val('');
     $("#txtLote").val('');
     $("#txtPrecioCompra").val('');
     Editando = 0;
     EditandoPos = -1;
     $("#txtFechaVenc").val(FechaActual());
 }

 $("#btnAgregarMedicamento").click(function () {
     var precio = ($("#txtPrecioCompra").val()).replace(",", ".");
     $("#txtPrecioCompra").val(precio);
     var valid = $("#frm_cantidad").valid();
     if (valid && $("#Medicamento_val").html() != '0') {
         if (Existe()) return;
         Codigo = $("#Medicamento_val").html();
         Nombre = $("#txt_Medicamento").val();
         Cantidad = parseInt($("#cantidad").val());
         Deposito = $("#cbo_Deposito :selected").val();
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
         objMedicamento.FechaVencimiento = $("#txtFechaVenc").val();
         objMedicamento.NroLote = $("#txtLote").val().trim().toUpperCase();
         objMedicamento.Precio_Compra = ($("#txtPrecioCompra").val()).replace(",", ".");
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



 $("#btnConfirmarRemito").click(function () {
     if (confirm("¿Desea confirmar el ingreso del remito?")) {
         if (objMedicamentos.length > 0) {
             if (Modificar == 0)
                 Insert_Remito(); //Nuevo Remito
             else Delete_Detalles();
         }
         else alert("No hay Medicamentos en la Lista");
     }
 });


 function Delete_Detalles(){ //Es modificacion de Remito
    var QueryString = {};
    QueryString = GetQueryString();
    var Id = QueryString['Id'];
    DeleteItem(Id);
 }

 function DeleteItem(Id) {
         var json = JSON.stringify({ "Id": Id });
         $.ajax({
             data: json,
             url: "../Json/Farmacia/Farmacia.asmx/Delete_Remitos_Det",
             type: "POST",
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             error: errores,
             success: function () {
                 Insert_Remitos_Det(Id, objMedicamentos); 
             }
         });
 }

 function Insert_Remito() {
             var f = {};
             if (remitoId == 0) {
                 f.Remito_Id = 0;
                 f.Letra = $("#txtLetra").val();
                 f.Sucursal = $("#txtNro1").val();
                 f.Numero = $("#txtNro2").val();
                 f.Proveedor = $("#cbo_Proveedor :selected").val();
                 f.Observaciones = $("#CargadoObservacion").html();
                 var json = JSON.stringify({ "f": f });
                 $.ajax({
                     data: json,
                     url: "../Json/Farmacia/Farmacia.asmx/Insert_Remitos_Cab",
                     type: "POST",
                     contentType: "application/json; charset=utf-8",
                     dataType: "json",
                     success: Insert_Remitos_Cab_Cargado,
                     error: errores
                 });
             }
             else Insert_Remitos_Det(remitoId, objMedicamentos);  //modificacion
 }

 function Insert_Remitos_Cab_Cargado(Resultado) {
     var Id = Resultado.d;
     if (Id > 0) Insert_Remitos_Det(Id, objMedicamentos);
     else alert('Error al Insertar Remito');
 }

 function Insert_Remitos_Det(Id, objMedicamentos) {
     var json = JSON.stringify({ "Id": parseInt(Id), "objMedicamentos": objMedicamentos });
     $.ajax({
         type: "POST",
         data: json,
         url: "../Json/Farmacia/Farmacia.asmx/Insert_Remitos_Det",
         contentType: "application/json; charset=utf8",
         dataType: "json",
         success: Insert_Remitos_Det_Cargado,
         error: errores
     });
 }



 function Insert_Remitos_Det_Cargado(Resultado) {
     var Id = Resultado.d;
     if (Id > 0) {
         $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/RemitoProveedores.aspx?Id=' + Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "CargaRemitoProveedores.aspx";
            }
        });
     }
     else alert("Error");
 }



 function LoadRemito(Id) {
     $.ajax({
         type: "POST",
         data: '{Id: "' + Id + '"}',
         url: "../Json/Farmacia/Farmacia.asmx/List_RemitoCab_byRemId",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: List_RemitoCab_byRemId_Cargado,
         error: errores
     });
 }

 function List_RemitoCab_byRemId_Cargado(Resultado) {
     var Remito = Resultado.d;
     $("#div_inicio").hide();
     $("#hastaaqui").show();
     $("#CargadoObservacion").html(Remito.Observaciones);
     $("#CargadoProveedor").html(Remito.Proveedor);
     $("#CargadoFecha").html(Remito.Fecha);
     $("#CargadoFactura").html(Remito.Letra + '-' + Completar4(Remito.Sucursal) + '-' + Completar8(Remito.Numero));
     $("#CargadoObservacion").html(Remito.Observaciones);
     Modificar = 1;
     LoadRemitoDetalle();
 }

 function Completar4(Cifras) {
     var num = Cifras;
     var numtmp = num;
     var largo = numtmp.length;
     if (largo == 4) return numtmp;
     var ceros = '';
     var pendientes = 4 - largo;
     for (i = 0; i < pendientes; i++) ceros += '0';
        return ceros + numtmp;
 }

 function Completar8(Cifras) {
     var num = Cifras;
     var numtmp = num;
     var largo = numtmp.length;
     if (largo == 8) return numtmp;
     var ceros = '';
     var pendientes = 8 - largo;
     for (i = 0; i < pendientes; i++) ceros += '0';
     return ceros + numtmp;
 }

 function LoadRemitoDetalle() {
     var queryObj = {};
     queryObj = GetQueryString();
     var Id = queryObj['Id'];
     $.ajax({
         type: "POST",
         data: '{Id: "' + Id + '"}',
         url: "../Json/Farmacia/Farmacia.asmx/List_Remitos_DetallebyId",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: List_Remitos_DetallebyId_Cargado,
         error: errores
     });
 }

 function List_Remitos_DetallebyId_Cargado(Resultado){
     var Detalles = Resultado.d;
     var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th><th>Nro Lote</th><th>Precio Compra</th><th>Fecha Vencimiento</th></tr></thead><tbody>";
     var Contenido = "";
     var i = 0;
     $.each(Detalles, function (index, Detalle) {
         Detalle.Nombre = Detalle.Nombre + "-" + Detalle.Gramaje + "-" + Detalle.Medida;
         Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' style='display:none;' class='eliminar btn btn-mini btn-danger' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Nombre + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.NroLote + " </td><td> $" + Detalle.Precio_Compra + " </td><td> " + Detalle.FechaVencimiento + " </td></tr>";
         objMedicamentos[i] = Detalle;
         objMedicamentos2[i] = Detalle;
         objMedicamentos[i].Estado = 1;
         objMedicamentos[i].Deposito = Detalle.Deposito_Id;
         Total = Total + 1;
         Total2 = Total2 + 1;
         i = i + 1;
     });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function Eliminar(Nro) {
    objMedicamentos[Nro].Estado = 0;
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
    RenderizarTabla();
    if (objMedicamentos.length > 0) $("#btnConfirmarRemito").removeAttr("disabled");
    else $("#btnConfirmarRemito").attr("disabled", true);
}



function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#btnConfirmarRemito").attr("disabled", true);
    //$("#precio_medicamento").html(objMedicamentos[Nro].Precio);
    $("#cbo_Deposito").val(objMedicamentos[Nro].Deposito_Id);
    $("#cbo_Deposito").attr('disabled', 'disabled');
    $("#txt_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#txt_Medicamento").attr('disabled', 'disabled');
    $("#Medicamento_val").html(objMedicamentos[Nro].Insumo_Id);
    //Get_Insumo_by_Id(objMedicamentos[Nro].Insumo_Id);
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);

    $("#txtFechaVenc").val(objMedicamentos[Nro].FechaVencimiento);
    $("#txtLote").val(objMedicamentos[Nro].NroLote);
    $("#txtPrecioCompra").val(objMedicamentos[Nro].Precio_Compra);


    $("#cbo_Medicamento option[value=" + objMedicamentos[Nro].Insumo_Id + "]").attr("selected", true);
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");

}

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th><th>Nro Lote</th><th>Precio Compra</th><th>Fecha Vencimiento</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            if (remitoId > 0) {
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' style='display:none;' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Nombre + "(" + objMedicamentos[i].Insumo_Id + ") </td><td> " + objMedicamentos[i].Cantidad + " </td><td>" + objMedicamentos[i].NroLote + " </td><td> $ " + objMedicamentos[i].Precio_Compra + " </td><td>" + objMedicamentos[i].FechaVencimiento + " </td></tr>";
            }
            else
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Nombre + "(" + objMedicamentos[i].Insumo_Id + ") </td><td> " + objMedicamentos[i].Cantidad + " </td><td>" + objMedicamentos[i].NroLote + " </td><td> $ " + objMedicamentos[i].Precio_Compra + " </td><td>" + objMedicamentos[i].FechaVencimiento + " </td></tr>";
        }
    }
    if (objMedicamentos.length > 0) $("#btnConfirmarRemito").removeAttr("disabled");
    else $("#btnConfirmarRemito").attr("disabled", true);
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

$('#desdeaqui').click(function () {
    var valid = $("#frm_main").valid();
    if (valid) {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    }
});

$("#btnRemitos").click(function () {
    window.location = "MostrarRemitos.aspx";
});

$("#btnPrint").click(function () {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/RemitoProveedores.aspx?Id=' + remitoId,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "CargaRemitoProveedores.aspx";
            }
        });
});