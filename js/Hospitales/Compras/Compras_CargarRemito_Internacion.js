var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var objMedicamentosADM = new Array();
var remitoId = 0;
var internacionAdministracion = 0;
var TIPO_REM = "";
var editaDesglose = true; // para permitir editar el desgloce del remito
var cargaRem = 0;
var idsDesgloce = "";
// pasan de desglose al parent
var ENTREGA_ID = 0;
var G_ExpIdenDetalle = 0;
var P_ID = 0;
var PDT_ID = 0;
var detallesDesglose = new Array();
var modifico = 0;
var guardando = 0;

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

$("#btnVolver").click(function () {
    if (modifico == 0) {
        if (remitoId == 0)
            window.location = "Compras_CargarRemito_Internacion.aspx";
        else //Viene de buscar remito
            window.location = "MostrarRemitos_Internacion.aspx?Prov=" + query_prov + "&Desde=" + query_desde + "&Hasta=" + query_hasta + "&Letra=" + query_letra +
            "&N1=" + query_n1 + "&N2=" + query_n2;
     } else {
        if (confirm("ATENCION. No se han guardado los datos cargados.\n¿Desea volver a la pantalla inicial?")) {
            if (remitoId == 0)
                window.location = "Compras_CargarRemito_Internacion.aspx";
            else //Viene de buscar remito
                window.location = "MostrarRemitos_Internacion.aspx?Prov=" + query_prov + "&Desde=" + query_desde + "&Hasta=" + query_hasta + "&Letra=" + query_letra +
            "&N1=" + query_n1 + "&N2=" + query_n2;
        }
    }
});

var query_prov = 0;
var query_desde = "";
var query_hasta = "";
var query_letra = "";
var query_n1 = "";
var query_n2 = "";
var G_FARMACIA = 0;

$(document).ready(function () {
    var queryObj = {};
    queryObj = GetQueryString();
    if (queryObj["Farmacia"] != null) G_FARMACIA = 1;
    if (queryObj['Id'] != null) {
        remitoId = queryObj['Id'];
        query_prov = queryObj['Prov'];
        query_desde = queryObj['Desde'];
        query_hasta = queryObj['Hasta'];
        query_letra = queryObj['Letra'];
        query_n1 = queryObj['N1'];
        query_n2 = queryObj['N2'];
        TIPO_REM = queryObj['tipo'];
        LoadRemito(queryObj['Id']);
    }
    else InitControls();
});

function InitControls() {
    List_Proveedores('S');
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtLetra").mask("a", { placeholder: "-" });
    $("#txtFecha").datepicker();
    $("#btnConfirmarRemito").attr("disabled", false);
    $("#txtFecha").val(FechaActual());
    $("#txtFechaVenc").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaVenc").val(FechaActual());
    $("#txtFechaVenc").datepicker();
    List_Rubros(false);
    List_Depositos(true);
    Cargar_Medicamentos(true);
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


var sourceArr = [];
var mapped = {};

//$("#cbo_Medicamento").typeahead({
//    source: sourceArr,
//    updater: function (selection) {
//        Nombre_Alert = selection;
//        $("#txt_Medicamento").val(selection); //nom
//        $("#Medicamento_val").html(mapped[selection]); //id
//        CargarDatosInsumo($("#Medicamento_val").html());
//        return selection;
//    },
//    minLength: 4,
//    items: 10
//});

/**
fn CargarDatosInsumo
param @IdInsumo bool 
return Lista todos los insumos de compras (distintos a los de farmacia)
**/

function CargarDatosInsumo(IdInsumo) {
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/List_Insumo_byId",
        data: '{IdInsumo: "' + IdInsumo + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var obj_Insumo = Resultado.d;
            $("#txtPrecioCompra").val(obj_Insumo.INS_ULT_PRECIO);
            $("#txtStockActual").val(obj_Insumo.STO_CANTIDAD);
            $("#txtPrecioUnit").val(obj_Insumo.INS_ULT_PRECIO);
            $("#cbo_Rubro").val(obj_Insumo.INS_RUBRO);
        },
        error: errores
    });
}

/**
fn Cargar_Medicamentos
param @Todos bool 
return Lista todos los insumos de compras (distintos a los de farmacia)
**/

function Cargar_Medicamentos(Todos) {
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/List_InsumosCombo",
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
        if (i == 0) {
            sourceArr.length = 0;
        }
        str = Medicamentos[i].INS_DESCRIPCION;
        mapped[str] = item.INS_ID;
        sourceArr.push(str);
    });
}

function List_Rubros(Todos) {
    var json = JSON.stringify({ "Todos": Todos });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_RUBROS_LIST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#cbo_Rubro').append($('<option></option>').val("0").html("Seleccione Rubro..."));
            $.each(lista, function (index, Rubro) {
                $('#cbo_Rubro').append($('<option></option>').val(Rubro.COMPRAS_RUBROS_ID).html(Rubro.COMPRAS_RUBROS_DESC));
            });
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

/**
fn List_Depositos
param @Todos bool 
return Lista todos los depositos de compras
**/
function List_Depositos(Todos) {
    var json = JSON.stringify({ "Todos": Todos });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/List_Depositos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $("#cbo_Deposito").append($("<option></option>").val("0").html("Seleccione Depósito..."));
            $.each(Lista, function (index, Deposito) {
                $("#cbo_Deposito").append($("<option></option>").val(Deposito.ID).html(Deposito.DEPOSITO));
            });
        },
        error: errores
    });
}

/**
fn List_Proveedores
param @Todos bool 
return Lista todos los proveedores de compras (idem a los de farmacia)
**/
function List_Proveedores(Todos) {
    $.ajax({
        type: "POST",
        data: '{Todos: "' + Todos + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $("#cbo_Proveedor").append($("<option></option>").val("0").html("Seleccione Proveedor..."));
            $.each(Lista, function (index, Proveedor) {
                $("#cbo_Proveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
            });
        },
        error: errores,
        complete: function () {
            $("#desdeaqui").show();
            $("#btnRemitos").show();
            $("#cbo_Proveedor").val(ProveedorId);
            $("#CargadoProveedor").html($("#cbo_Proveedor :selected").text());
        }
    });
}

function ConCeros4(obj) {
    var num = $(obj).val();
    var numtmp = num;
    var largo = numtmp.length;
    if (largo == 4) return numtmp;
    var ceros = '';
    var pendientes = 4 - largo;
    for (i = 0; i < pendientes; i++) ceros += '0';
    $(this).val(ceros + numtmp);
}

function ConCeros8(obj) {
    var num = $(obj).val();
    var numtmp = num;
    var largo = numtmp.length;
    if (largo == 8) return numtmp;
    var ceros = '';
    var pendientes = 8 - largo;
    for (i = 0; i < pendientes; i++) ceros += '0';
    $(this).val(ceros + numtmp);
}


$("#txtNro1").blur(function () {
    var num = $(this).val();
    var numtmp = num;
    var largo = numtmp.length;
    if (largo == 4) return numtmp;
    var ceros = '';
    var pendientes = 4 - largo;
    for (i = 0; i < pendientes; i++) ceros += '0';
    $(this).val(ceros + numtmp);
});

$("#txtNro2").blur(function () {
    var num = $(this).val();
    var numtmp = num;
    var largo = numtmp.length;
    if (largo == 8) return numtmp;
    var ceros = '';
    var pendientes = 8 - largo;
    for (i = 0; i < pendientes; i++) ceros += '0';
    $(this).val(ceros + numtmp);
});

$("#txtFactura_Nro1").blur(function () {
    var num = $(this).val();
    var numtmp = num;
    var largo = numtmp.length;
    if (largo == 4) return numtmp;
    var ceros = '';
    var pendientes = 4 - largo;
    for (i = 0; i < pendientes; i++) ceros += '0';
    $(this).val(ceros + numtmp);
});

$("#txtFactura_Nro2").blur(function () {
    var num = $(this).val();
    var numtmp = num;
    var largo = numtmp.length;
    if (largo == 8) return numtmp;
    var ceros = '';
    var pendientes = 8 - largo;
    for (i = 0; i < pendientes; i++) ceros += '0';
    $(this).val(ceros + numtmp);
});

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

$("#txtLetra").blur(function () {
    $("#txtLetra").val($("#txtLetra").val().toUpperCase());
});

//Verifica que no exista el remito cargado en el sistema//
function ExisteRemito() {
    var cab = {};
    cab.REM_I_LETRA = $("#txtLetra").val();
    cab.REM_I_SUCURSAL = $("#txtNro1").val();
    cab.REM_I_NUMERO = $("#txtNro2").val();
    cab.REM_I_PRV_ID = $("#cbo_Proveedor :selected").val();

    var json = JSON.stringify({ "cab": cab });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/Existe_Remito",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var existe = Resultado.d;
           // if (existe) { RemitoExistente(); }
            //else {
             ExisteOrdenCompra($("#txtNumOrdenCompra").val());
             // }
        },
        error: errores
    });
}


function ExisteOrdenCompra(NordenCompra) {
    var json = JSON.stringify({ "NordenCompra": NordenCompra, "tipo": $("#cboTipo").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/Existe_Orden_Compra",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var existe = Resultado.d;
            if (existe == 1) {
               
//                if ($("#cboTipo").val() == 1) { MostrarDetalles($("#txtNumOrdenCompra").val()); }// detalles de internacion
//                 if ($("#cboTipo").val() == 2) { MostrarDetallesAdministracion($("#txtNumOrdenCompra").val()); } // detalles de administracion
                // ahora irian internacion y administracion por el mismo lado
                MostrarDetallesAdministracion($("#txtNumOrdenCompra").val());

            } else {
                ordenCompraInxistente(existe);
            }
        },
        error: errores
    });
}


//trae los detalles de las ordenes de compra de administracion
function MostrarDetallesAdministracion(NordenCompra) {

   // $("#btnPrecios").hide();
    var json = JSON.stringify({ "NordenCompra": NordenCompra });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/Traer_Detalles_Orden_Compra_administracion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            // alert(Resultado.d);
            cargarTablaAdministracion(Resultado.d);
        },
        error: errores
    });

    $("#CargadoProveedor").html($("#cbo_Proveedor option:selected").text().trim().toUpperCase());
    $("#CargadoFecha").html($("#txtFecha").val());
    $("#CargadoFactura").html($("#txtLetra").val() + '-' + $("#txtNro1").val() + '-' + $("#txtNro2").val());
    $("#CargadoFacturaRelacionada").html($("#txtFactura_Letra").val() + '-' + $("#txtFactura_Nro1").val() + '-' + $("#txtFactura_Nro2").val());
    $("#CargadoObservacion").html($("#txtObservaciones").val().trim().toUpperCase());
    $("#CargadoOrdenCompraVisible").html($("#cboTipo :selected").text() + "-" + $("#txtNumOrdenCompra").val().trim().toUpperCase());
    $("#CargadoOrdenCompra").html($("#txtNumOrdenCompra").val().trim().toUpperCase()); 
    $("#mostarExp").hide(); 
    $("#mostarPed").hide();
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}

//trae los detalles de las ordenes de compra de internacion
function MostrarDetalles(NordenCompra) {
    $("#btnPrecios").hide();
    var json = JSON.stringify({ "NordenCompra": NordenCompra });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/Traer_Detalles_Orden_Compra",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            // alert(Resultado.d);
            cargarTabla(Resultado.d);
        },
        error: errores,
        complete: function () {
            var totalParent = 0;
            $(".verificarMoney").each(function (index, item) {
                if ($(this).html() != "") {

                    totalParent += parseInt($(this).html()); 
                } 
            });
            $("#Total").html("Importe Total: $" + totalParent.toFixed(2));
        }
    });

    $("#CargadoProveedor").html($("#cbo_Proveedor option:selected").text().trim().toUpperCase());
    $("#CargadoFecha").html($("#txtFecha").val());
    $("#CargadoFactura").html($("#txtLetra").val() + '-' + $("#txtNro1").val() + '-' + $("#txtNro2").val());
    $("#CargadoFacturaRelacionada").html($("#txtFactura_Letra").val() + '-' + $("#txtFactura_Nro1").val() + '-' + $("#txtFactura_Nro2").val());
    $("#CargadoObservacion").html($("#txtObservaciones").val().trim().toUpperCase());
    $("#CargadoOrdenCompra").html($("#txtNumOrdenCompra").val().trim().toUpperCase());


    $.ajax({
        type: "POST",
        data: '{ordenComp: "' + $("#txtNumOrdenCompra").val().trim().toUpperCase() + '"}',
        url: "../Json/Compras/ComprasInternacion.asmx/traer_exp_ped_from_ord_comp",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Remito = Resultado.d;
            if (Remito != null) {
               // alert(Remito.EXP_ID == 0);
                if (Remito.EXP_ID == 0) { $("#mostarExp").hide(); } else { $("#CargadoExpediente").html(Remito.EXP_ID); }
                if (Remito.EXP_PED_ID == 0) { $("#mostarPed").hide(); } else { $("#CargadoPedido").html(Remito.EXP_PED_ID); }

            }
        },
        error: errores
    });
    


    $("#CargadoOrdenCompraVisible").html($("#cboTipo :selected").text() + "-" + $("#txtNumOrdenCompra").val().trim().toUpperCase());
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}

//internacion para cargar nuevo remito
function cargarTabla(lista) {

    if (cargaRem != 1 || cargaRem != 2) { cargaRem == 0; }
    internacionAdministracion = 0;
    //editaDesglose = false;
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var Tabla_Titulo = "<table class='table table-condensed' style='font-size:11px; text-align:center;'><thead style='text-aling:center'><tr style='text-aling:center'>" +
            "<th style='font-size:15px; width:35%'>Insumo</th>" +
            "<th style='font-size:15px; width:20%; text-aling:center'>Detalle</th>" +
            "<th style='font-size:15px; width:20%; text-aling:center'>Importe</th>" +


            "<th style='font-size:15px; width:10%;display:none'>Cantidad Pedida</th>" +
            "<th style='font-size:15px; width:15%; text-aling:center;display:none'>Cantidad Recibida</th>" +
            "<th style='font-size:15px; width:20%;display:none'>Cantidad Recibida </br> con Anterioridad</th>" +
            "<th style='font-size:15px; width:10%;display:none'>Saldo</th>" +
            "<th style='font-size:15px; width:15%; text-aling:center;display:none'>EXP_PED_ID</th>" +
            "<th style='font-size:15px; width:20%;display:none'>EXP_PED_EXP_ID</th>" +
            "</tr></thead><tbody>";
    $.each(lista, function (index, item) {

        internacionAdministracion = item.Tipo;
        var editable = "contenteditable";
        var color = "";
        var completo = 0;

        if (item.RED_CANTIDAD_SALDO == 0) {
            editable = "";
            color = "Gray";
            completo = 1;
        } else { objMedicamentos.push(item); }
        ////////// aca carga la lista
        if (item.Tipo == 1) {

            Tabla_Datos += "<tr style='text-aling:center; background-color:" + color + "'>" +
                        "<td style='cursor:default; text-aling:center; border-width:1.5px ;border-style:solid;  border-color:rgb(204,204,204)' id='PDT_INS" + item.PDT_ID + "'><a class='btn btn-mini' onclick='VerDocumentos(" + item.PDT_ID + ")'>Ver documentos</></td>" + // INSUMO BTN
                        "<td style='cursor:default; text-aling:center; border-width:1.5px ;border-style:solid;  border-color:rgb(204,204,204); text-aling:center' id='PDT_DESGLOSE" + item.PDT_ID + "' data-completo='" + completo + "'><a class='btn btn-mini' onclick='desglozar(" + item.PDT_ID + ")'>Detalle</a></td>" + //BOTON DESGLOSE
                        "<td style='cursor:default; text-aling:center; border-width:1.5px ;border-style:solid;  border-color:rgb(204,204,204); text-aling:center' id='PDT_IMPORTE" + item.PDT_ID + "' class='verificarMoney' data-nro='" + item.PDT_ID + "' data-completo='" + completo + "' data-longitud='9' ></td>" + //PRECIO POR UNIDAD NO HAY QUE TRAERLO EN REMITO NUEVO item.RED_PRECIO
                        "<td style='cursor:default; text-aling:center;display:none' id='EXP_PED_ID" + item.PDT_ID + "'>" + item.EXP_PED_ID + "</td>" + // ID DEL PEDIDO
                        "<td style='cursor:default;display:none'  id='EXP_PED_EXP_ID" + item.PDT_ID + "' >" + item.EXP_PED_EXP_ID + "</td>" + // ID DEL EXPEDIENTE
                        "<td style='cursor:default;display:none'  id='cargaRem" + item.PDT_ID + "' >0</td>" + // INDICA SI CARGA EL DESGLOCE DE MEMRIA O NO



            // NO VAN MAS
                        "<td style='cursor:default; text-aling:center;display:none' id='RED_CANTIDAD_PEDIDA" + item.PDT_ID + "'>" + item.RED_CANTIDAD_PEDIDA + "</td>" + // CANTIDAD PEDIDA
                        "<td style='cursor:default; text-aling:center; border-width:1.5px ;border-style:solid;  border-color:rgb(204,204,204); text-aling:center;display:none'  id='PDT_RECIBIDA" + item.PDT_ID + "' class='verificar' data-nro='" + item.PDT_ID + "'" + editable + " data-completo='" + completo + "'></td>" + // CANTIDAD A RECIBIR
                        "<td style='cursor:default; text-aling:center;display:none' id='RED_CANTIDAD_RECIBIDA" + item.PDT_ID + "' data-nro='" + item.PDT_ID + "'>" + item.RED_CANTIDAD_RECIBIDA + "</td>" + // CANTIDAD YA RECIBIDA                
                        "<td style='cursor:default; text-aling:center;display:none' id='PDT_SALDO" + item.PDT_ID + "'>" + item.RED_CANTIDAD_SALDO + "</td>" + //SALDO
                        "<td style='cursor:default; text-aling:center; display:none' id='PDT_SALDO_RESET" + item.PDT_ID + "' class='saldo_reset" + item.PDT_ID + "'>" + item.RED_CANTIDAD_SALDO + "</td></tr>"; // SALDO RESET

        } else { }

    });
    Tabla_Fin = "</tbody></table>";
    $("#TablaMedicamentos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

}

function vaciarArray() {detallesDesglose.length = 0; }

function desglozar(PDT_ID) {

    //alert($("#EXP_PED_ID" + PDT_ID).html() + "//" + $("#EXP_PED_EXP_ID" + PDT_ID).html() +"//"+ PDT_ID);

    $.fancybox({
        'href': "../Compras/desglocePresupuesto.aspx?PDT_ID=" + PDT_ID + "&EXP_PED_ID=" + $("#EXP_PED_ID" + PDT_ID).html() + "&EXP_PED_EXP_ID=" + $("#EXP_PED_EXP_ID" + PDT_ID).html() + "&edicion=" + editaDesglose + "&cargaRem=" + $("#cargaRem" + PDT_ID).html(),
        'width': '80%',
        'height': '100%',
        'autoScale': false,
        'transitionIn': 'elastic',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'preload': true,
        'showCloseButton': false,
        'onComplete': function f() {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function () {
                jQuery.fancybox.hideActivity();
            });
        }

    });
}


///// ver documentos del presupuesto con pantalla anterior
function VerDocumentos(PDT_ID) {
    $.fancybox({
        'href': "../Compras/Compras_Nuevo_Presupuesto_Internacion.aspx?PDT_ID=" + PDT_ID,
        'width': '60%',
        'height': '100%',
        'autoScale': false,
        'transitionIn': 'elastic',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'preload': true,
        'onComplete': function f() {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function () {
                jQuery.fancybox.hideActivity();
            });
        }

    });
}
///// ver documentos del presupuesto con pantalla anterior

//cargar remito administracion
function cargarTablaAdministracion(lista) {
    internacionAdministracion = 1;
    objMedicamentosADM = lista;
    console.log("pepe");
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var Tabla_Titulo = "<table class='table table-condensed' style='font-size:11px; text-align:center;'><thead style='text-aling:center'><tr style='text-aling:center;background-color:#CCCCCC'>" +
            "<th style='font-size:15px; width:25%'>Insumo</th>" +
            "<th style='font-size:15px; width:10%'>Precio de </br> Orden de </br> Compra </br> (por unidad)</th>" +
            "<th style='font-size:15px; width:15%; text-aling:center'>Precio de Compra </br> (por unidad)</th>" +
            "<th style='font-size:15px; width:5%'>Cantidad Pedida</th>" +
            "<th style='font-size:15px; width:5%; text-aling:center'>Cantidad Recibida</th>" +
            "<th style='font-size:15px; width:10%'>Cantidad Recibida </br> con Anterioridad</th>" +
            "<th style='font-size:15px; width:5%'>Saldo</th>" +
            "<th style='font-size:15px; width:25%'>Lote</th>" +
            "<th style='font-size:15px; width:10%'>Fecha </br> vencimiento</th>" +
            "</tr></thead><tbody>";
    $.each(lista, function (index, item) {
        //1 internacion 2 administracion
        internacionAdministracion = item.Tipo;
        var editable = "contenteditable";
        var editarPrecio = "contenteditable";
        var color = "";

        if (item.RED_CANTIDAD_SALDO == 0) {
            editable = "";
            color = "Gray";
        }

        var completo = 0;
        if (item.RED_CANTIDAD_SALDO == 0) {
            completo = 1;
            editable = "";
            color = "#F5B7B1";

        } else { objMedicamentos.push(item); }

        var facVal;
        var facVal2;
        var facVal3;
        facVal = $("#CargadoFacturaRelacionada").html().toString().replace(/-/g, "");
        facVal2 = facVal.replace(/0/g, "");
        facVal3 = facVal2.replace(/[A-Z]/g, "");
        //alert(facVal3.length);
        if (facVal3.length <= 0) { editarPrecio = ""; }

        if (item.Tipo == 2) { //si es tipo 2 viene de una orden de compra de administracion y se tiene que generar un remito de administracion
            //CARGA TABLA
            //var bloquear = "";

            Tabla_Titulo = Tabla_Titulo.replace("<th style='font-size:15px; width:25%'>Lote</th><th style='font-size:15px; width:10%'>Fecha </br> vencimiento</th>", "");

            if (item.COM_ADM_INS_PEDIR_CANTIDAD_SALDO == 0) { editable = ""; color = "#F5B7B1"; }
            Tabla_Datos += "<tr style='text-aling:center; background-color:" + color + "'>" +
                        "<td style='cursor:default; text-aling:center' id='PDT_INS" + item.COM_ADM_INS_PEDIR_ID + "'>" + item.COM_ADM_INS_PEDIR_INS_NOM + "</td>" + // INSUMO
                        "<td style='cursor:default'> $ " + item.COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL + "</td>" + // precio orden de compra adminisrtacion
                        "<td style='cursor:default; text-aling:center; border-width:1.5px ;border-style:solid;  border-color:rgb(204,204,204); text-aling:center' id='PDT_IMPORTE" + item.COM_ADM_INS_PEDIR_ID + "' class='verificarMoney' data-nro='" + item.COM_ADM_INS_PEDIR_ID + "'" + editarPrecio + " data-completo='" + completo + "'></td>" + //PRECIO POR UNIDAD
                        "<td style='cursor:default; text-aling:center' id='RED_CANTIDAD_PEDIDA" + item.COM_ADM_INS_PEDIR_ID + "'>" + item.COM_ADM_INS_PEDIR_CANT_PED + "</td>" + // CANTIDAD PEDIDA
                        "<td style='cursor:default; text-aling:center; border-width:1.5px ;border-style:solid;  border-color:rgb(204,204,204); text-aling:center'  id='PDT_RECIBIDA" + item.COM_ADM_INS_PEDIR_ID + "' class='verificar' data-nro='" + item.COM_ADM_INS_PEDIR_ID + "'" + editable + " data-completo='" + completo + "'></td>" + // CANTIDAD A RECIBIR
                        "<td style='cursor:default; text-aling:center' id='RED_CANTIDAD_RECIBIDA" + item.COM_ADM_INS_PEDIR_ID + "' data-nro='" + item.COM_ADM_INS_PEDIR_ID + "'>" + item.COM_ADM_INS_PEDIR_CANTIDAD_RECIBIDA + "</td>" + // CANTIDAD YA RECIBIDA                
                        "<td style='cursor:default; text-aling:center' id='PDT_SALDO" + item.COM_ADM_INS_PEDIR_ID + "'>" + item.COM_ADM_INS_PEDIR_CANTIDAD_SALDO + "</td>" + // SALDO

            "<td style='cursor:default; text-aling:center; display:none' id='PDT_SALDO_RESET" + item.COM_ADM_INS_PEDIR_ID + "' class='saldo_reset" + item.COM_ADM_INS_PEDIR_ID + "'>" + item.COM_ADM_INS_PEDIR_CANTIDAD_SALDO + "</td></tr>"; // SALDO RESET


        } else { //si es tipo 1 viene de una orden de compra de internacion y se tiene que generar un remito de internacion. se agrego el 29/4/21 porque los remitos se generaban todos de adminiostracion y en la busqueda salian con a y no con i cuando eran de internacion
            if (item.COM_ADM_INS_PEDIR_CANTIDAD_SALDO == 0) { editable = ""; color = "#F5B7B1"; }
            Tabla_Datos += "<tr style='text-aling:center; background-color:" + color + "'>" +
                        "<td style='cursor:default; text-aling:center' id='PDT_INS" + item.COM_ADM_INS_PEDIR_ID + "'>" + item.COM_ADM_INS_PEDIR_INS_NOM + "</td>" + // INSUMO
                        "<td style='cursor:default'> $ " + item.COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL + "</td>" + // precio orden de compra adminisrtacion
                        "<td style='cursor:default; text-aling:center; border-width:1.5px ;border-style:solid;  border-color:rgb(204,204,204); text-aling:center' id='PDT_IMPORTE" + item.COM_ADM_INS_PEDIR_ID + "' class='verificarMoney' data-nro='" + item.COM_ADM_INS_PEDIR_ID + "'" + editarPrecio + " data-completo='" + completo + "'></td>" + //PRECIO POR UNIDAD
                        "<td style='cursor:default; text-aling:center' id='RED_CANTIDAD_PEDIDA" + item.COM_ADM_INS_PEDIR_ID + "'>" + item.COM_ADM_INS_PEDIR_CANT_PED + "</td>" + // CANTIDAD PEDIDA
                        "<td style='cursor:default; text-aling:center; border-width:1.5px ;border-style:solid;  border-color:rgb(204,204,204); text-aling:center'  id='PDT_RECIBIDA" + item.COM_ADM_INS_PEDIR_ID + "' class='verificar' data-nro='" + item.COM_ADM_INS_PEDIR_ID + "'" + editable + " data-completo='" + completo + "'></td>" + // CANTIDAD A RECIBIR
                        "<td style='cursor:default; text-aling:center' id='RED_CANTIDAD_RECIBIDA" + item.COM_ADM_INS_PEDIR_ID + "' data-nro='" + item.COM_ADM_INS_PEDIR_ID + "'>" + item.COM_ADM_INS_PEDIR_CANTIDAD_RECIBIDA + "</td>" + // CANTIDAD YA RECIBIDA                
                        "<td style='cursor:default; text-aling:center' id='PDT_SALDO" + item.COM_ADM_INS_PEDIR_ID + "'>" + item.COM_ADM_INS_PEDIR_CANTIDAD_SALDO + "</td>" + // SALDO

                        "<td style='cursor:default; text-aling:center; max-width: 140px' id='PDT_LOTE" + item.COM_ADM_INS_PEDIR_ID + "' class='loteAdd' data-nro='" + item.COM_ADM_INS_PEDIR_ID + "' contenteditable ></td>" + // LOTE
                        "<td style='cursor:default; text-aling:center' ><input id='PDT_FECHA_VENCIMIENTO" + item.COM_ADM_INS_PEDIR_ID + "' class='fechaVTO ' style='border:0; width:70px' data-nro='" + item.COM_ADM_INS_PEDIR_ID + "' /></td>" + // FECHA VENCIMIENTO

            "<td style='cursor:default; text-aling:center; display:none' id='PDT_SALDO_RESET" + item.COM_ADM_INS_PEDIR_ID + "' class='saldo_reset" + item.COM_ADM_INS_PEDIR_ID + "'>" + item.COM_ADM_INS_PEDIR_CANTIDAD_SALDO + "</td></tr>"; // SALDO RESET
        }

    });
    Tabla_Fin = "</tbody></table>";
    $("#TablaMedicamentos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    //esconde el precio total del remito, no se necesita
    $(".box_informativo_a").hide();

}


$(document).on("mouseover", ".fechaVTO", function () {
    $(".fechaVTO").datepicker({
        changeMonth: true,
        changeYear: true
    });
});

$(document).on("keydown", ".fechaVTO", function (e) { if (e.keyCode != 8) return false; });

$(document).on("change", ".fechaVTO", function (e) {

    if ($(this).val().length < 10) { $(this).val(""); }
    else {
        var cad = $(this).data('nro');
        //alert(cad);
        $.each(objMedicamentosADM, function (index, item) {
            if (objMedicamentosADM[index].COM_ADM_INS_PEDIR_ID == cad) {
                //INGRESO DE FECHA DE VENCIMIENTO
                objMedicamentosADM[index].PDT_FECHA_VENCIMIENTO = $("#PDT_FECHA_VENCIMIENTO" + cad).val();
            }
        });
    }

    console.log(objMedicamentosADM);
});


$(document).on("keydown", ".verificar", function (e) {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
    if ($(this).html().length > 9) return false;
});



$(document).on("keydown", ".verificarMoney", function (e) {

    if ($(this).html().toString().indexOf(".", 0) > -1 && (e.keyCode == 190 || e.keyCode == 110)) { e.preventDefault(); }

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190, 110]) !== -1 ||
                        (e.keyCode == 65 && e.ctrlKey === true) ||
                        (e.keyCode >= 35 && e.keyCode <= 40)) {
        modifico = 1;
        return;
    }
    modifico = 1;
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
    if ($(this).html().toString().indexOf(".") > -1) {
        if ($(this).html().length >= ($(this).html().toString().indexOf(".", 0) + 3)) { e.preventDefault(); }
    }

});

//CALCULA POR EL OUT DEL PRECIO
$(document).on("focusout", ".verificarMoney", function (e) {
    //alert("on");
    var cad = $(this).data('nro');

    if (internacionAdministracion == 1) {
        $.each(objMedicamentos, function (index, item) {
            //alert($("#PDT_RECIBIDA" + cad).html());
            if (objMedicamentos[index].PDT_ID == cad) {
                //alert($("#PDT_IMPORTE" + cad).html());
                objMedicamentos[index].RED_CANTIDAD_PEDIDA = $("#RED_CANTIDAD_PEDIDA" + cad).html();
                //alert(objMedicamentos[index].RED_CANTIDAD_PEDIDA);
                objMedicamentos[index].RED_CANTIDAD_RECIBIDA = $("#PDT_RECIBIDA" + cad).html();
                //alert(objMedicamentos[index].RED_CANTIDAD_RECIBIDA);
                objMedicamentos[index].RED_PRECIO = $("#PDT_IMPORTE" + cad).html();
                //alert($("#PDT_IMPORTE" + cad).html());
                objMedicamentos[index].RED_CANTIDAD_SALDO = $("#PDT_SALDO" + cad).html();
                //alert(objMedicamentos[index].PDT_SALDO);
                objMedicamentos[index].RED_INS_ID = cad;

            }
        });
    } else {

        $.each(objMedicamentosADM, function (index, item) {
            if (objMedicamentosADM[index].COM_ADM_INS_PEDIR_ID == cad) {
                objMedicamentosADM[index].COM_ADM_INS_PEDIR_CANT_PED = $("#RED_CANTIDAD_PEDIDA" + cad).html();
                objMedicamentosADM[index].COM_ADM_CANTIDAD_RECIBIDA = $("#PDT_RECIBIDA" + cad).html();
                objMedicamentosADM[index].COM_ADM_CANTIDAD_SALDO = $("#PDT_SALDO" + cad).html();
                objMedicamentosADM[index].COM_ADM_INS_PRECIO = $("#PDT_IMPORTE" + cad).html();

            }
        });
    }
    /////aca actualizar la cantidad  en objMedicamentos para que se guarde
});



//CALCULA POR EL OUT DEL PRECIO
$(document).on("focusout", ".verificar", function (e) {
    //alert("on");
    var cad = $(this).data('nro');

        $.each(objMedicamentosADM, function (index, item) {
            if (objMedicamentosADM[index].COM_ADM_INS_PEDIR_ID == cad) {
                objMedicamentosADM[index].COM_ADM_INS_PEDIR_CANT_PED = $("#RED_CANTIDAD_PEDIDA" + cad).html();
                objMedicamentosADM[index].COM_ADM_CANTIDAD_RECIBIDA = $("#PDT_RECIBIDA" + cad).html();
                objMedicamentosADM[index].COM_ADM_CANTIDAD_SALDO = $("#PDT_SALDO" + cad).html();
                objMedicamentosADM[index].COM_ADM_INS_PRECIO = $("#PDT_IMPORTE" + cad).html();
            }
        });
    
    /////aca actualizar la cantidad  en objMedicamentos para que se guarde
});


    //AGREGA EL LOTE Y FECHA POR EL AOUT
    $(document).on("focusout", ".loteAdd", function (e) {
        //alert("on");
        var cad = $(this).data('nro');

        $.each(objMedicamentosADM, function (index, item) {
            if (objMedicamentosADM[index].COM_ADM_INS_PEDIR_ID == cad) {
                //INGRESO DE LOTE
                objMedicamentosADM[index].PDT_LOTE = $("#PDT_LOTE" + cad).html();
                //objMedicamentosADM[index].PDT_FECHA_VENCIMIENTO = $("#PDT_FECHA_VENCIMIENTO" + cad).val();
            }
        });

        /////aca actualizar el lote y fecha  en objMedicamentos para que se guarde
    });


//$(document).on("change", ".verificar", function (e) { alert(e); });

//$(".verificar").change(function (e) { alert(e); });
//if ($(this).html() == "" ) { $(this).html("0"); $("#PDT_SALDO" + cad).html($(".saldo_reset" + cad).html()); return false; }

//CALCULA POR EL OUT DE LA CANTIDAD
$(document).on("focusout", ".verificar", function (e) {

    var cad = $(this).data('nro');

    if (parseInt($("#PDT_RECIBIDA" + cad).html()) > parseInt($("#PDT_SALDO" + cad).html())) {
        alert("La cantidad a recibir no puede ser mayor al saldo")
        $("#PDT_RECIBIDA" + cad).html("");
        $("#PDT_SALDO" + cad).html($(".saldo_reset" + cad).html());
        return false;
    }

    if ($(this).html() == "") { //$(this).html("0"); 
        $("#PDT_SALDO" + cad).html($(".saldo_reset" + cad).html()); return false;
    }


    //alert($("#PDT_RECIBIDA" + cad).html() + "//" + $("#PDT_SALDO" + cad).html());
    $("#PDT_SALDO" + cad).html(parseInt($("#PDT_SALDO" + cad).html()) - parseInt($("#PDT_RECIBIDA" + cad).html()));
    
    //return false;

    if (internacionAdministracion == 1) {
        $.each(objMedicamentos, function (index, item) {
            if (objMedicamentos[index].PDT_ID == cad) {
                //alert($("#PDT_IMPORTE" + cad).html());
                objMedicamentos[index].RED_CANTIDAD_PEDIDA = $("#RED_CANTIDAD_PEDIDA" + cad).html();
                //alert(objMedicamentos[index].RED_CANTIDAD_PEDIDA);
                objMedicamentos[index].RED_CANTIDAD_RECIBIDA = $("#PDT_RECIBIDA" + cad).html();
                //alert(objMedicamentos[index].RED_CANTIDAD_RECIBIDA);
                objMedicamentos[index].RED_PRECIO = $("#PDT_IMPORTE" + cad).html();
                //alert($("#PDT_IMPORTE" + cad).html());
                objMedicamentos[index].RED_CANTIDAD_SALDO = $("#PDT_SALDO" + cad).html();
                //alert(objMedicamentos[index].PDT_SALDO);
                objMedicamentos[index].RED_INS_ID = cad;

            }
        });
    } else {

        $.each(objMedicamentosADM, function (index, item) {
            if (objMedicamentosADM[index].COM_ADM_INS_PEDIR_ID == cad) {
                objMedicamentosADM[index].COM_ADM_INS_PEDIR_CANT_PED = $("#RED_CANTIDAD_PEDIDA" + cad).html();
                objMedicamentosADM[index].COM_ADM_CANTIDAD_RECIBIDA = $("#PDT_RECIBIDA" + cad).html();
                objMedicamentosADM[index].COM_ADM_CANTIDAD_SALDO = $("#PDT_SALDO" + cad).html();
            }
        });
    }
    /////aca actualizar la cantidad  en objMedicamentos para que se guarde
});

function RemitoExistente() {
    alert("El nro. de remito ya existe.");
    return false;
}

function ordenCompraInxistente(existe) {
    switch (existe) {
        case 2:
            alert("Nro. de orden de compra inexistente.");
            break;

        case 3:
            alert("Nro. de orden de compra ya completado.");
            break;
    }
    return false;
}

$("#desdeaqui").click(function () {
    if (!ValidarCabecera()) return false;
    if (remitoId == 0) ExisteRemito(); //Valido si es un nuevo remito
});

function LimpiarCampos() {
    Editando = 0;
    EditandoPos = -1;
    $("#txt_Medicamento").val('');
    $("#cbo_Medicamento").removeAttr('disabled');
    $("#cbo_Medicamento").val('');
    $("#Medicamento_val").html('0');
    $("#cantidad").val('');
    $("#txtFechaVenc").val('');
    $("#txtLote").val('');
    $("#txtPrecioCompra").val('');
    $("#txtPrecioVenta").val('');
    $("#txtStockActual").val('');
    $("#txtPrecioUnit").val('');
    $("#cbo_Deposito").val('0');
    $("#cbo_Deposito").removeAttr("disabled");
    $("#txtFechaVenc").val(FechaActual());
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
}

function ValidarPrecios() {
    if (parseFloat($("#txtPrecioVenta").val()) < parseFloat($("#txtPrecioCompra").val()))
    { alert("El precio de venta es menor al precio de compra, para continuar cargando el remito ingrese $0.\nNo olvide corregir los precios."); return false; }
    return true;
}


//Verifica si existe el insumo en la lista de detalles//
function ExisteInsumo() {
    var Insumo = $("#Medicamento_val").html();
    for (var i = 0; i <= Total; i++) {
        if (objMedicamentos[i].Insumo_Id == Insumo && objMedicamentos[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado el Medicamento Nro: " + Insumo);
            LimpiarCampos();
            $("#cbo_Medicamento").focus();
            return true;
        }
    }
    return false;
}

//Valida el ingreso de un detalle//
function Validar_Detalle() {
    //if ($("#Medicamento_val").html() == '0') { alert("Seleccione Insumo."); return false; }
    if ($("#cbo_Medicamento").val().trim().length == 0) { alert("Seleccione Insumo."); return false; }
    if ($("#cantidad").val().trim().length == 0) { alert("Ingrese Cantidad."); return false; }
    if ($("#cbo_Deposito :selected").val() == 0) { alert("Ingrese Deposito."); return false; }
    if ($("#txtPrecioUnit").val().trim().length == 0) { alert("Ingrese Precio Unitario."); return false; }
    if ($("#txtPrecioUnit").val().trim() <= 0) { alert("Ingrese Precio Unitario."); return false; }
    if ($("#txtLote").val().trim().length == 0) { alert("Ingrese Lote."); return false; }
    if ($("#cbo_Rubro :selected").val() == 0) { alert("Ingrese Rubro."); return false; }
    if (!ValidarPrecios()) return false;
    if (ExisteInsumo()) return false;

    return true;
}

//Carga objeto detalle para insertarlo en la lista//
//Retorna el objeto//
function CargarObj() {
    var precioUnit = $("#txtPrecioUnit").val().replace(",", ".");
    $("#txtPrecioUnit").val(precioUnit);

    var objMedicamento = {};
    objMedicamento.RED_INS_ID = $("#Medicamento_val").html();
    objMedicamento.RED_DEP_ID = $("#cbo_Deposito :selected").val();
    objMedicamento.RED_CANTIDAD = parseInt($("#cantidad").val());

    if ($("#txtFechaVenc").val().trim().length == 0) objMedicamento.FechaVencimiento = "01/01/1900";
    else objMedicamento.FechaVencimiento = $("#txtFechaVenc").val();

    objMedicamento.NRO_LOTE = $("#txtLote").val().trim().toUpperCase();
    objMedicamento.RED_PRECIO = precioUnit;
    objMedicamento.Estado = 1;
    //objMedicamento.INSUMO = $("#txt_Medicamento").val();
    objMedicamento.INSUMO = $("#cbo_Medicamento").val();
    objMedicamento.PrecioUlt_Compra = $("#txtPrecioCompra").val();
    objMedicamento.StockActual = $("#txtStockActual").val();
    objMedicamento.RED_INS_RUBRO = $("#cbo_Rubro :selected").val();
    return objMedicamento;
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#cbo_Deposito").val(objMedicamentos[Nro].RED_DEP_ID);
    $("#cbo_Deposito").attr('disabled', 'disabled');
    $("#txt_Medicamento").val(objMedicamentos[Nro].INSUMO);
    $("#txt_Medicamento").attr('disabled', 'disabled');
    $("#cbo_Medicamento").attr('disabled', 'disabled');
    $("#cbo_Medicamento").val(objMedicamentos[Nro].INSUMO);
    $("#Medicamento_val").html(objMedicamentos[Nro].RED_INS_ID);
    CargarDatosInsumo(objMedicamentos[Nro].RED_INS_ID);
    $("#cantidad").val(objMedicamentos[Nro].RED_CANTIDAD);
    $("#txtStockActual").val(objMedicamentos[Nro].StockActual);
    $("#txtFechaVenc").val(objMedicamentos[Nro].FechaVencimiento);
    $("#txtLote").val(objMedicamentos[Nro].NRO_LOTE);
    $("#txtPrecioUnit").val(objMedicamentos[Nro].RED_PRECIO);
    $("#txtPrecioCompra").val(objMedicamentos[Nro].PrecioUlt_Compra);
    $("#cbo_Rubro").val(objMedicamentos[Nro].RED_INS_RUBRO);

    $("#cbo_Medicamento option[value=" + objMedicamentos[Nro].RED_INS_ID + "]").attr("selected", true);
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");


}

$("#btnAgregarMedicamento").click(function () {
    if (!Validar_Detalle()) return false;
    var Cual = Total;
    if (Editando == 1) {
        Cual = EditandoPos;
    }
    else {
        Total = Total + 1;
        Cual = Total;
    }

    objMedicamentos[Cual] = CargarObj();
    RenderizarTabla();
    LimpiarCampos();
});

$("#btnCancelarMedicamento").click(function () {
    LimpiarCampos();
});

$("#btnConfirmarRemito").click(function () {

    console.log(objMedicamentosADM);
    console.log(internacionAdministracion);
    //return false;
    if (guardando == 0) {
        guardando = 1;
        //alert(internacionAdministracion); //2 internacion 1 administracion
        //return false;
        if (confirm("¿Desea confirmar el ingreso del remito?")) {// aca grabar
            var sigue = true;
            var errorV = "";
            var errorVm = "";
            var vacios = 0;
            //        var l = new Array();
            // alert(internacionAdministracion);

            if (internacionAdministracion == 2) {
                $(".verificar").each(function (index) { if (($(this).html() == "" || $(this).html() == "0") && $(this).data("completo") == 0) { vacios += 1; } });
            }

            if (internacionAdministracion == 2) {
                if (vacios == objMedicamentosADM.length) { sigue = false; errorV = "Cantidad Recibida"; }
            }

            if (!sigue) {
                if (errorV != "" && errorVm != "") {
                    alert("Falta cargar: " + errorV + ", " + errorVm);
                }

                if (errorV == "") {
                    alert("Falta cargar: el " + errorVm);
                }

                if (errorVm == "") {
                    alert("Falta cargar: " + errorV);
                }
                return false;
            }

            if (internacionAdministracion == 2) {
                sigue = verificarDetalle();

            }


            //        if (internacionAdministracion == 1) {
            //            if (detallesDesglose.length == 0) { alert("Falta desglozar remito!"); return false; }

            //        }

            if (!sigue) { alert("Ingrese detalle"); return false; }

            //        if (internacionAdministracion == 1) {
            //            if (objMedicamentos.length == 0) { alert("No hay Insumos en la Lista"); return false; } else { Insert_Remito(); }
            //        }

            if (internacionAdministracion == 2 || internacionAdministracion == 1) {
                if (objMedicamentosADM.length == 0) { alert("Falta cargar 'Cantidad Recibida' "); return false; } else { Insert_Remito_ADM(); }
            }
        }
    }
});


function verificarDetalle() {
    var control = 0;
    var retorno = "";
    $(".verificarMoney").each(function (index, item) { control += parseInt($(this).html()); });
    if (control == 0) { retorno = false; } else { retorno = true; }
    return retorno;
}

//Valida ingreso de datos de la cabecera//
function ValidarCabecera() {
    if ($("#txtLetra").val().trim().length == 0) { alert("Ingrese Letra Remito."); return false; }
    if ($("#txtNro1").val().trim().length == 0) { alert("Ingrese Numero Remito."); return false; }
    if ($("#txtNro2").val().trim().length == 0) { alert("Ingrese Numero Remito."); return false; }
    //if ($("#txtFactura_Letra").val().trim().length == 0) { alert("Ingrese Letra de la Factura."); return false; }
    //if ($("#txtFactura_Nro1").val().trim().length == 0) { alert("Ingrese Numero de la Factura."); return false; }
    //if ($("#txtFactura_Nro2").val().trim().length == 0) { alert("Ingrese Numero de la Factura."); return false; }
    if ($("#cbo_Proveedor :selected").val() == 0) { alert("Ingrese Proveedor."); return false; }
    if ($("#txtNumOrdenCompra").val().trim().length == 0) { alert("Ingrese Numero Orden de Compra."); return false; }
    if ($("#cboTipo").val() == 0) { alert("Seleccione si es una orden de compra de 'Internación' o de 'Administración'."); return false; }
    return true;
}

//Carga Objeto cabecera del remito//
function CargarCebecera() {
    var cabecera = {};
    cabecera.REM_I_ID = remitoId;
    cabecera.REM_I_LETRA = $("#txtLetra").val().trim().toUpperCase();
    cabecera.REM_I_SUCURSAL = parseInt($("#txtNro1").val().trim());
    cabecera.REM_I_NUMERO = parseInt($("#txtNro2").val().trim());
    cabecera.REM_I_PRV_ID = parseInt($("#cbo_Proveedor :selected").val());
    cabecera.REM_I_OBS = $("#CargadoObservacion").html().trim().toUpperCase();
    cabecera.REM_I_FECHA = $("#txtFecha").val();
    cabecera.REM_I_LETRA_FACT = $("#txtFactura_Letra").val().trim().toUpperCase();
    cabecera.REM_TIPO = $("#cboTipo option:selected").html();
    if (isNaN(parseInt($("#txtFactura_Nro1").val().trim())))
        cabecera.REM_I_SUCURSAL_FACT = 0;
    else
        cabecera.REM_I_SUCURSAL_FACT = parseInt($("#txtFactura_Nro1").val().trim());

    if (isNaN(parseInt($("#txtFactura_Nro2").val().trim())))
        cabecera.REM_I_NUMERO_FACT = 0;
    else
        cabecera.REM_I_NUMERO_FACT = parseInt($("#txtFactura_Nro2").val().trim());

    cabecera.REM_I_NUMERO_ORDEN_COMPRA = parseInt($("#CargadoOrdenCompra").html().trim().toUpperCase());
    return cabecera;
}

//Inserta la cabecera del remito en tabla//
//Retorna el Id del remito//
function Insert_Remito() {
   // alert("remito");
    if (!ValidarCabecera()) return false;

    var json = JSON.stringify({ "cab": CargarCebecera() });
    $.ajax({
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/Insert_Remitos_Cabecera",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            remitoId = Resultado.d;
            if (remitoId > 0)
                { Insert_Remitos_Det(objMedicamentos, remitoId); }            
            else {
                alert('Error al Insertar Remito.');
                window.location = "Compras_CargarRemito_Internacion.aspx";
            }
        },
        error: errores
    });
}


//Inserta la cabecera del remito en tabla//
//Retorna el Id del remito//
function Insert_Remito_ADM() {
//    alert("remito");
//    return false;
    if (!ValidarCabecera()) return false;

    var json = JSON.stringify({ "cab": CargarCebecera() });
    $.ajax({
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/Insert_Remitos_Cabecera_ADM",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            remitoId = Resultado.d;
            if (remitoId > 0) Insert_Remitos_Det_ADM(objMedicamentosADM, remitoId);
            else {
                alert('Error al Insertar Remito.');
                window.location = "Compras_CargarRemito_Internacion.aspx";
            }
        },
        error: errores
    });
}

//Graba los detalles del remito en la tabla//
//Recibe la lista de detalles y el numero de remito (cabecera) creado//
function Insert_Remitos_Det(objMedicamentos, remitoId) {
    //alert("remito");
//saco de la lista de detalles del remito los que tienen un importe = 0 en la columna importe 
    $.each(objMedicamentos, function (index, item) { if (parseInt($("#PDT_IMPORTE" + item.PDT_ID).html()) == 0) { objMedicamentos.splice(1, index); } });

    var json = JSON.stringify({ "detalles": objMedicamentos, "NroRemito": remitoId });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/Insert_Remitos_Detalle",
        contentType: "application/json; charset=utf8",
        dataType: "json",
        success: function (Resultado) {
            var Id = Resultado.d;
            guardarDesgloceCAB();
        },
        error: errores
    });
}

function guardarDesgloceCAB() {
    //alert(ENTREGA_ID);
        var json = JSON.stringify({ "ENTREGA_ID": ENTREGA_ID, "EXP_ID": G_ExpIdenDetalle, "EXP_PED_ID": P_ID, "P_ID": PDT_ID }); //parent.P_ID });
        $.ajax({
            type: "POST",
            url: "../Json/Compras/ComprasInternacion.asmx/Compras_Guardar_CAB_Entrega_Internacion",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                guadarEntregaDET(Resultado.d);
            }
        });
}


function guadarEntregaDET(ENT_ID) {
    //alert("ENT_ID:" + ENT_ID + " PDT_ID:" + PDT_ID + " lista:" + detallesDesglose.length);
    var json = JSON.stringify({ "ENTREGA_ID": ENT_ID, "PDT_ID": PDT_ID, "lista": detallesDesglose }); //parent.P_ID, "lista": generarDetalles() });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/Compras_Guardar_DET_Entrega_Internacion",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            idsDesgloce = Resultado.d;
//            //window.location.reload(true);
//            if (entregar == 1) { //cerrar,recargar e imprimir solo entregados al momento
//                parent.imprimirEntrega(Resultado.d, parent.G_ExpId, 1)
//                entregar = 0;
//            } else {
//                var total = 0;
//                var totalParent = 0;
//                $(".numeroEntero").each(function (index, item) { if ($(this).attr("data-tipo") == "precio") { total += parseInt($(this).html()); } })
//                parent.$("#PDT_IMPORTE" + PDT_ID).html(total.toString());
//                parent.$(".verificarMoney").each(function (index, item) { totalParent += parseInt($(this).html()); });
//                parent.$("#Total").html("Importe Total: $" + totalParent.toString());
//                parent.$.fancybox.close();
            //            } // parent.window.location.reload(true);
            relacionarDesgloceRemito(remitoId);
        },
        complete: function () { cargaRem = 1; entregar = 0; }
    });
}

// relaciona los items del desgloce que se guardaron con el id del encabezado del remito recien creado
function relacionarDesgloceRemito(remitoId) {
    var json = JSON.stringify({ "idsDesgloce": idsDesgloce, "NroRemito": remitoId });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/relacionarDesgloceRemito",
        contentType: "application/json; charset=utf8",
        dataType: "json",
        error: errores,
        success: function () { ImprimirRemito(remitoId); }
    });
 }

//Graba los detalles del remito en la tabla//
//Recibe la lista de detalles y el numero de remito (cabecera) creado//
function Insert_Remitos_Det_ADM(objMedicamentosADM, remitoId) {
//objMedicamentosADM

    $(".verificar").each(function (index, item) {
        if ($(this).html().trim() != "" || $(this).html().trim() != "0") {
            //  objMedicamentosADM.splice(1, index);
            //         }
            //        // actualiza los items de la lista de detalles de ADM de los que tienen carga la cantidad por lo menos con el valor del td
            //        else {
            objMedicamentosADM[index].RED_CANTIDAD_RECIBIDA = parseInt($("#PDT_RECIBIDA" + objMedicamentosADM[index].COM_ADM_INS_PEDIR_ID).html());

            if ($("#PDT_IMPORTE" + objMedicamentosADM[index].COM_ADM_INS_PEDIR_ID).html() == "") {
                //alert("if");
                objMedicamentosADM[index].COM_ADM_INS_PRECIO = 0;
            } else {

                objMedicamentosADM[index].COM_ADM_INS_PRECIO = parseFloat($("#PDT_IMPORTE" + objMedicamentosADM[index].COM_ADM_INS_PEDIR_ID).html());
            }
        }
        if ($(this).html().trim() == "" || $(this).html().trim() == "0")
        { objMedicamentosADM[index].RED_CANTIDAD_RECIBIDA = 0; objMedicamentosADM[index].COM_ADM_CANTIDAD_RECIBIDA = 0; objMedicamentosADM[index].COM_ADM_INS_PRECIO = 0; }

       // alert(objMedicamentosADM[index].RED_CANTIDAD_RECIBIDA);
    }); 

    console.log(objMedicamentosADM);
//    $(".verificar").each(function (index, item) {
//        if ($(this).html().trim() == "" || $(this).html().trim() == "0") {
//           //alert(objMedicamentosADM[index].COM_ADM_INS_PRECIO + "//" + objMedicamentosADM[index].RED_CANTIDAD_RECIBIDA);
//            objMedicamentosADM.splice(1, index);
//        } 
//    });

    var json = JSON.stringify({ "detalles": objMedicamentosADM, "NroRemito": remitoId });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/Insert_Remitos_Detalle_ADM",
        contentType: "application/json; charset=utf8",
        dataType: "json",
        success: function (Resultado) {
            var Id = Resultado.d;
            if (Id > 0) ImprimirRemito(remitoId);
        },
        error: errores
    });
}

function ImprimirRemito(remitoId) {
    var ruta = "";
//    if (internacionAdministracion == 1) {
//     ruta = "../Impresiones/Compras/Compras_RemitoProveedores_Internacion.aspx?Id="; 
//     } else { ruta = "../Impresiones/Compras/Compras_RemitoProveedores_Administracion.aspx?RemitoId="; }
    ruta = "../Impresiones/Compras/Compras_RemitoProveedores_Administracion.aspx?RemitoId="; 
    $.fancybox({
        'autoDimensions': false,
        'href': ruta + remitoId,
        'width': '100%',
        'height': '80%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'onClosed': function () {
            window.location.href = "Compras_CargarRemito_Internacion.aspx";
        },
        'preload': true,
        'onComplete': function f() {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function () {
                jQuery.fancybox.hideActivity();
            });
        }
    });
}

var ProveedorId = 0;

function CargarControlesCab(Cabecera) {
    ProveedorId = Cabecera.REM_I_PRV_ID;
    $("#txtFecha").val(Cabecera.REM_I_FECHA);
    $("#txtLetra").val(Cabecera.REM_I_LETRA);
    //alert(Cabecera.EXP_ID);
    if (Cabecera.EXP_ID == 0) { $("#mostarExp").hide(); } else { $("#CargadoExpediente").html(Cabecera.EXP_ID); }
    if (Cabecera.EXP_PED_ID == 0) { $("#mostarPed").hide(); } else { $("#CargadoPedido").html(Cabecera.EXP_PED_ID); }
    
    $("#txtNro1").val(Completar4(Cabecera.REM_I_SUCURSAL.toString()));
    $("#txtNro2").val(Completar8(Cabecera.REM_I_NUMERO.toString()));

    $("#txtFactura_Letra").val(Cabecera.REM_I_LETRA_FACT);
    $("#txtFactura_Nro1").val(Completar4(Cabecera.REM_I_SUCURSAL_FACT.toString()));
    $("#txtFactura_Nro2").val(Completar8(Cabecera.REM_I_NUMERO_FACT.toString()));

    $("#txtObservaciones").val(Cabecera.REM_I_OBS);
    $("#txtNumOrdenCompra").val(Cabecera.REM_I_TIPO + " - " + Cabecera.REM_I_NUMERO_ORDEN_COMPRA); ///////////////////////////////////////

    $("#CargadoObservacion").html($("#txtObservaciones").val());
    $("#CargadoFecha").html($("#txtFecha").val());
    $("#CargadoFactura").html($("#txtLetra").val() + '-' + $("#txtNro1").val() + '-' + $("#txtNro2").val());
    $("#CargadoFacturaRelacionada").html($("#txtFactura_Letra").val() + '-' + $("#txtFactura_Nro1").val() + '-' + $("#txtFactura_Nro2").val());
    $("#CargadoOrdenCompra").html(Cabecera.REM_I_TIPO + " - " + Cabecera.REM_I_NUMERO_ORDEN_COMPRA);
    //alert($("#CargadoOrdenCompraVisible").html());
    // $("#CargadoOrdenCompraVisible").html($("#cboTipo :selected").text() + "-" + $("#txtNumOrdenCompra").val().trim().toUpperCase());
    $("#CargadoOrdenCompraVisible").html(Cabecera.REM_I_TIPO + " - " + Cabecera.REM_I_NUMERO_ORDEN_COMPRA);
}

function LoadRemito(Id) {
    $.ajax({
        type: "POST",
        data: '{RemitoId: "' + Id + '"}',
        url: "../Json/Compras/ComprasInternacion.asmx/Remito_List_Cab_Id",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            InitControls();
            var Remito = Resultado.d;
            if (Remito != null) {
                CargarControlesCab(Remito);
                Modificar = 1;
                $("#btnPrint").show();
                $("#div_inicio").hide();
                $("#btnBaja").show();
                $("#hastaaqui").show();
                remitoId = Id;
                LoadRemitoDetalle(Id);
            
            }
        },
        error: errores
    });
}

function LoadRemitoDetalle(Id) {
   // alert("aca");
    $.ajax({
        type: "POST",
        data: '{RemitoId: "' + Id + '"}',
        url: "../Json/Compras/ComprasInternacion.asmx/Remito_List_Det_Id",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Remitos_DetallebyId_Cargado,
        error: errores
    });
}
/////////////////////ver este
function List_Remitos_DetallebyId_Cargado(Resultado) {
   // alert("cargado");
    var editarPrecio = "contenteditable";
    var facVal;
    var facVal2;
    var facVal3;
    facVal = $("#CargadoFacturaRelacionada").html().toString().replace(/-/g, "");
    facVal2 = facVal.replace(/0/g, "");
    facVal3 = facVal2.replace(/[A-Z]/g, "");
    if (facVal3.length <= 0) { editarPrecio = ""; $("#btnPrecios").hide(); } else { $("#btnPrecios").show(); }

    $("#btnConfirmarRemito").hide();
    var Detalles = Resultado.d;
    var Encabezado = "";
    var Contenido = "";
    var i = 0;

    if (TIPO_REM == "A") {
    Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr>" +
    "<th></th>" +
    "<th>Insumo</th>" +    
    "<th>Cantidad de Unidades</th>" +
    "<th>Precio Compra (x unidad)</th>" +
    "<th>Total</th>" +
    "</tr></thead><tbody>";
    $("#btnPrecios").show();
}
if (TIPO_REM == 'I') {
        var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr>" +
        "<th></th>" +
        "<th>Insumo</th>" +
        "<th>Detalle</th>" +
        "<th>Importe</th>" +
        "<th>Total</th>"
        "</tr></thead><tbody>";
        //$("#btnPrecios").hide();
}

// administracion
$.each(Detalles, function (index, Detalle) {

    //alert(Detalle.RED_PRECIO);
    if (Detalle.InsumoInternacion == 0) {

        Contenido = Contenido + "<tr><td></td>" +
            "<td> " + Detalle.INSUMO + " </td>" +
            "<td> " + Detalle.RED_CANTIDAD + " </td>" +
            "<td " + editarPrecio + " class='verificarMoney' data-remid='" + Detalle.RED_REM_ID + "'  data-red_id='" + Detalle.RED_ID_REAL + "' '> $ " + Detalle.RED_PRECIOADM + " </td>" +
            "<td class='verificarMoneyTotal'> $ " + (Detalle.RED_PRECIOADM * Detalle.RED_CANTIDAD).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString() + " </td></tr>";

        objMedicamentos[i] = Detalle;
        objMedicamentos[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
       
    }
    // internacion
    else {// solo para visualizar

        cargaRem = 1;
        var cr = 0;
        if (Detalle.RED_PRECIO == 0) { cr = 2; } else { cr = 1; }
        editaDesglose = false;
        Contenido = Contenido + "<tr><td></td>" +
            "<td onclick='VerDocumentos(" + Detalle.InsumoInternacion + ")'><a class='btn btn-mini'>Ver documentos</></td>" +                                     //  remitoId
        "<td style='cursor:default; text-aling:center; text-aling:center' id='PDT_DESGLOSE" + Detalle.InsumoInternacion + "' ><a class='btn btn-mini' onclick='desglozar(" + Detalle.InsumoInternacion + ")'>Detalle</a></td>" + //BOTON DESGLOSE
            "<td style='display:none'> " + Detalle.RED_CANTIDAD + " </td>" +
            "<td style='display:none'> $" + Detalle.RED_PRECIO + " </td>" +
            "<td class='verificarMoney verificarMoneyTotal'> $" + Detalle.RED_PRECIO + " </td>" +
            "<td id='cargaRem" + Detalle.InsumoInternacion + "' style='display:none'>" + cr + "</td></tr>";
        objMedicamentos[i] = Detalle;
        objMedicamentos[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;

    }
});
var Pie = "</tbody></table>";

    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);

    var total = 0.0;
    var totalString = "";
    $(".verificarMoneyTotal").each(function (index, item) {

        totalString = $(this).html();
        totalString = totalString.replace("$", "");
        totalString = totalString.replace(/,/g, "");
       // alert('$' + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());

        if (parseFloat(totalString)) { total += parseFloat(totalString); }

    });

    $("#Total").html("Importe Total: $ " + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
}


$("#btnPrecios").click(function () {
    //alert($(this).html().toString().replace("$", "").trim());
    var lista = new Array();
    $(".verificarMoney").each(function () {
        if ($(this).html().toString().replace("$", "").trim() > 0) {
            var obj = {};
            obj.RED_PRECIO = $(this).html().toString().replace("$", "");
            obj.RED_ID = $(this).data('red_id');
            //            alert(obj.RED_PRECIO + "//" + obj.RED_ID);
            //            return false;
            lista.push(obj);
        }
    });

    if (lista.length > 0) {
        var json = JSON.stringify({ "lista": lista });
        $.ajax({
            data: json,
            url: "../Json/Compras/ComprasInternacion.asmx/actualizarPrecioRemito",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: errores,
            success: function () { modifico = 0; window.location.reload(true); }
        });
    } else { alert("Ingrese Precio Compra(x unidad)"); }
});

///// ver documentos del presupuesto con pantalla anterior
//function VerDocumentos(PDT_ID) {
//    alert(PDT_ID);
//    $.fancybox({
//        'href': "../Compras/Compras_Nuevo_Presupuesto_Internacion.aspx?PDT_ID=" + PDT_ID,
//        'width': '60%',
//        'height': '80%',
//        'autoScale': false,
//        'transitionIn': 'elastic',
//        'transitionOut': 'none',
//        'type': 'iframe',
//        'hideOnOverlayClick': false,
//        'enableEscapeButton': false,
//        'preload': true,
//        'onComplete': function f() {
//            jQuery.fancybox.showActivity();
//            jQuery('#fancybox-frame').load(function () {
//                jQuery.fancybox.hideActivity();
//            });
//        }

//    });
//}
///// ver documentos del presupuesto con pantalla anterior


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

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad de Unidades</th><th>Nro Lote</th><th>Precio Compra (x unidad)</th><th>Subtotal</th></tr></thead><tbody>";
    var Contenido = "";
  
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
          
            if (remitoId > 0) {
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' style='display:none;' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td>" +
                "<td> " + objMedicamentos[i].INSUMO + "</td>" +
                "<td> " + objMedicamentos[i].RED_CANTIDAD + " </td>" +
                "<td>" + objMedicamentos[i].NRO_LOTE + " </td>" +
                "<td> $ " + objMedicamentos[i].RED_PRECIO + " </td>" +
                "<td> $" + parseFloat(objMedicamentos[i].RED_PRECIO * objMedicamentos[i].RED_CANTIDAD).toFixed(2) + " </td></tr>";
            }
            else
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].INSUMO + "</td>" +
                "<td> " + objMedicamentos[i].RED_CANTIDAD + " </td>" +
                "<td>" + objMedicamentos[i].NRO_LOTE + " </td>" +
                "<td> $ " + objMedicamentos[i].RED_PRECIO + " </td>" +
                "<td> $" + parseFloat(objMedicamentos[i].RED_PRECIO * objMedicamentos[i].RED_CANTIDAD).toFixed(2) + " </td></tr>";
        }
    }
    if (objMedicamentos.length > 0) $("#btnConfirmarRemito").removeAttr("disabled");
    else $("#btnConfirmarRemito").attr("disabled", true);
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

$("#btnRemitos").click(function () {
    if (G_FARMACIA == 0)
        window.location = "MostrarRemitos_Internacion.aspx";
    else window.location = "MostrarRemitos_Internacion.aspx?Farmacia=1";
});

$("#btnPrint").click(function () {
    $.fancybox(
        {
            'autoDimensions': false,
            //            'href': '../Impresiones/Compras/Compras_RemitoProveedores_Internacion.aspx?Id=' + remitoId,
            'href': '../Impresiones/Compras/Compras_RemitoProveedores_Administracion.aspx?RemitoId=' + remitoId,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'preload': true,
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            }
        });
});

$("#btnBaja").click(function () {
    if (remitoId == 0) { alert("No se puede dar de baja remito."); return false; }
    if (confirm("¿Desea dar de baja el remito?")) {
        var json = JSON.stringify({ "RemitoId": remitoId });
        $.ajax({
            data: json,
            url: "../Json/Compras/ComprasInternacion.asmx/Remito_Baja",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: errores,
            success: function () {
                alert("Remito dado de baja.");
                window.location = "MostrarRemitos_Internacion.aspx";
            }
        });
    }
});



/// seleccion proveedor

function BuscarOrdendeCompraId_CAB(OrdenCAB) {

    //if ($('#cboTipo :selected').val() == 1) { BuscarOrdendeCompraId_CAB_Internacion(OrdenCAB); }
    //if ($('#cboTipo :selected').val() == 2) { BuscarOrdendeCompraId_CAB_Administracion(OrdenCAB); }
// ahora van las de adm e int juntas
    BuscarOrdendeCompraId_CAB_Administracion(OrdenCAB);
}

function BuscarOrdendeCompraId_CAB_Administracion(OrdenCAB) {
    var json = JSON.stringify({ "ORD_CAB_ID": OrdenCAB, "Desde": "01/01/1900", "Hasta": "01/01/1900", "ProveedorId": 0, "Tipo": $("#cboTipo").val(),
        "Estado": 0 });
    $.ajax({
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ORDEN_CAB_LIST",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores,
        success: function (Resultado) {
            CargarOrdenCompraCAB(Resultado.d);
        }
    });
}

function BuscarOrdendeCompraId_CAB_Internacion(OrdenCAB) {
    var json = JSON.stringify({ "ORD_CAB_ID": OrdenCAB, "Desde": "01/01/1900", "Hasta": "01/01/1900", "ProveedorId": 0, "Tipo": $("#cboTipo").val() });
    $.ajax({
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/COM_ORDEN_CAB_LIST",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores,
        success: function (Resultado) {
            CargarOrdenCompraCAB(Resultado.d);
        }
    });
}

function CargarOrdenCompraCAB(objOrdenCAB) {
    $.each(objOrdenCAB, function (index, obj) {
        if ($("#cbo_Proveedor :selected").val() != "0") {
            if (obj.ORDEN_COM_CAB_PRV_ID != $("#cbo_Proveedor :selected").val()) 
                alert("El número de orden de compra ingresado, no se corresponde con el proveedor seleccionado. Por lo cual, se ajustará automáticamente.");
        }
        //alert(obj.ORDEN_COM_CAB_PRV_ID);
        $("#cbo_Proveedor").val(obj.ORDEN_COM_CAB_PRV_ID);
        $("#cbo_Proveedor").attr("disabled", true);
    });

}

$("#txtNumOrdenCompra").change(function () {
    if ($(this).val().trim().length == 0) {
        $("#cbo_Proveedor").val(0);
        $("#cbo_Proveedor").attr("disabled", false);
        return false;
    }
    BuscarOrdendeCompraId_CAB($(this).val().trim());
});


$("#cboTipo").change(function () {
    if ($(this).val().trim().length == 0) {
        $("#cbo_Proveedor").val(0);
        $("#cbo_Proveedor").attr("disabled", false);
        return false;
    }

    if ($("#txtNumOrdenCompra").val().trim().length > 0)
    BuscarOrdendeCompraId_CAB($("#txtNumOrdenCompra").val().trim());
});

$("#txtFactura_Letra").change(function () {
    $(this).val($(this).val().toUpperCase());
});





function List_Proveedores(Todos) {
    $.ajax({
        type: "POST",
        data: '{Todos: "' + Todos + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $("#cbo_Proveedor").append($("<option></option>").val("0").html("Seleccione Proveedor..."));
            $.each(Lista, function (index, Proveedor) {
                $("#cbo_Proveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
            });
        },
        error: errores,
        complete: function () {
            $("#desdeaqui").show();
            $("#btnRemitos").show();
            $("#cbo_Proveedor").val(ProveedorId);
            $("#CargadoProveedor").html($("#cbo_Proveedor :selected").text());
        }
    });
}


