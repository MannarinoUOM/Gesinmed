
var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var remitoId = 0;

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
    if (confirm("ATENCION. No se han guardado los datos cargados.\n¿Desea volver a la pantalla inicial?")) {
        if (remitoId == 0)
            window.location = "Compras_CargarRemito.aspx";
        else //Viene de buscar remito
            window.location = "MostrarRemitos.aspx?Prov=" + query_prov + "&Desde=" + query_desde + "&Hasta=" + query_hasta + "&Letra=" + query_letra +
            "&N1=" + query_n1 + "&N2=" + query_n2;
    }
});

var query_prov = 0;
var query_desde = "";
var query_hasta = "";
var query_letra = "";
var query_n1 = "";
var query_n2 = "";

$(document).ready(function () {
    var queryObj = {};
    queryObj = GetQueryString();
    if (queryObj['Id'] != null) {
        remitoId = queryObj['Id'];
        query_prov = queryObj['Prov'];
        query_desde = queryObj['Desde'];
        query_hasta = queryObj['Hasta'];
        query_letra = queryObj['Letra'];
        query_n1 = queryObj['N1'];
        query_n2 = queryObj['N2'];
        LoadRemito(queryObj['Id']);
    }
    else InitControls();
});

function InitControls() {
    List_Proveedores('S');
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtLetra").mask("a", { placeholder: "-" });
    $("#txtFecha").datepicker();
    $("#btnConfirmarRemito").attr("disabled", true);
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

$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {
        Nombre_Alert = selection;
        $("#txt_Medicamento").val(selection); //nom
        $("#Medicamento_val").html(mapped[selection]); //id
        CargarDatosInsumo($("#Medicamento_val").html());
        return selection;
    },
    minLength: 4,
    items: 10
});

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
    var json = JSON.stringify({"Todos": Todos});
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
        url: "../Json/Compras/Compras.asmx/Existe_Remito",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var existe = Resultado.d;
            if (existe) RemitoExistente();
            else MostrarDetalles();
        },
        error: errores
    });
}

function MostrarDetalles() {
    $("#CargadoProveedor").html($("#cbo_Proveedor option:selected").text().trim().toUpperCase());
    $("#CargadoFecha").html($("#txtFecha").val());
    $("#CargadoFactura").html($("#txtLetra").val() + '-' + $("#txtNro1").val() + '-' + $("#txtNro2").val());
    $("#CargadoObservacion").html($("#txtObservaciones").val().trim().toUpperCase());
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}

function RemitoExistente() {
    alert("El nro. de remito ya existe.");
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
    if ($("#Medicamento_val").html() == '0') { alert("Seleccione Insumo."); return false; }
    if ($("#cantidad").val().trim().length == 0) { alert("Ingrese Cantidad."); return false; }
    if ($("#cbo_Deposito :selected").val() == 0) { alert("Ingrese Deposito."); return false; }
    if ($("#txtPrecioUnit").val().trim().length == 0) { alert("Ingrese Precio Unitario."); return false; }
    if ($("#txtPrecioUnit").val().trim() <= 0) { alert("Ingrese Precio Unitario."); return false; }
    if ($("#txtLote").val().trim().length == 0) { alert("Ingrese Lote."); return false; }
    if ($("#cbo_Rubro :selected").val() == 0) {alert("Ingrese Rubro.");return false;}
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
    objMedicamento.INSUMO = $("#txt_Medicamento").val();
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
    if (confirm("¿Desea confirmar el ingreso del remito?")) {
        if (objMedicamentos.length == 0) { alert("No hay Medicamentos en la Lista"); return false; }
        Insert_Remito();
    }
});

//Valida ingreso de datos de la cabecera//
function ValidarCabecera() {
    if ($("#txtLetra").val().trim().length == 0) {alert("Ingrese Letra.");return false;}
    if ($("#txtNro1").val().trim().length == 0) { alert("Ingrese Numero."); return false; }
    if ($("#txtNro2").val().trim().length == 0) { alert("Ingrese Numero."); return false; }
    if ($("#txtFactura_Letra").val().trim().length == 0) { alert("Ingrese Letra de la Factura."); return false; }
    if ($("#txtFactura_Nro1").val().trim().length == 0) { alert("Ingrese Numero de la Factura."); return false; }
    if ($("#txtFactura_Nro2").val().trim().length == 0) { alert("Ingrese Numero de la Factura."); return false; }
    if ($("#cbo_Proveedor :selected").val() == 0) { alert("Ingrese Proveedor."); return false; }
    //if ($("#txtObservaciones").val().trim().length == 0) { alert("Ingrese Observaciones."); return false; }
    return true;
}

//Carga Objeto cabecera del remito//
function CargarCebecera() {
    var cabecera = {};
    cabecera.REM_I_ID = remitoId;
    cabecera.REM_I_LETRA = $("#txtLetra").val().trim().toUpperCase();
    cabecera.REM_I_SUCURSAL = $("#txtNro1").val().trim();
    cabecera.REM_I_NUMERO = $("#txtNro2").val().trim();
    cabecera.REM_I_PRV_ID = $("#cbo_Proveedor :selected").val();
    cabecera.REM_I_OBS = $("#CargadoObservacion").html().trim().toUpperCase();
    cabecera.REM_I_FECHA = $("#txtFecha").val();
    cabecera.REM_I_LETRA_FACT = $("#txtFactura_Letra").val().trim().toUpperCase();
    cabecera.REM_I_SUCURSAL_FACT = $("#txtFactura_Nro1").val().trim();
    cabecera.REM_I_NUMERO_FACT = $("#txtFactura_Nro2").val().trim();
    return cabecera;
}

//Inserta la cabecera del remito en tabla//
//Retorna el Id del remito//
function Insert_Remito() {
    if (!ValidarCabecera()) return false;

        var json = JSON.stringify({ "cab": CargarCebecera() });
        $.ajax({
            data: json,
            url: "../Json/Compras/Compras.asmx/Insert_Remitos_Cabecera",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                remitoId = Resultado.d;
                if (remitoId > 0) Insert_Remitos_Det(objMedicamentos, remitoId);
                else {
                    alert('Error al Insertar Remito.');
                    window.location = "Compras_CargarRemito.aspx";
                }
            },
            error: errores
        });
}

//Graba los detalles del remito en la tabla//
//Recibe la lista de detalles y el numero de remito (cabecera) creado//
function Insert_Remitos_Det(objMedicamentos, remitoId) {
    var json = JSON.stringify({ "detalles": objMedicamentos, "NroRemito": remitoId });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/Insert_Remitos_Detalle",
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
        $.fancybox({
            'autoDimensions': false,
            'href': '../Impresiones/Compras/Compras_RemitoProveedores.aspx?Id=' + remitoId,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "Compras_CargarRemito.aspx";
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
    $("#txtNro1").val(Completar4(Cabecera.REM_I_SUCURSAL.toString()));
    $("#txtNro2").val(Completar8(Cabecera.REM_I_NUMERO.toString()));

    $("#txtFactura_Letra").val(Cabecera.REM_I_LETRA_FACT);
    $("#txtFactura_Nro1").val(Completar4(Cabecera.REM_I_SUCURSAL_FACT.toString()));
    $("#txtFactura_Nro2").val(Completar8(Cabecera.REM_I_NUMERO_FACT.toString()));

    $("#txtObservaciones").val(Cabecera.REM_I_OBS);
    $("#CargadoObservacion").html($("#txtObservaciones").val());
    $("#CargadoFecha").html($("#txtFecha").val());
    $("#CargadoFactura").html($("#txtLetra").val() + '-' + $("#txtNro1").val() + '-' + $("#txtNro2").val());
    $("#CargadoFacturaRelacionada").html($("#txtFactura_Letra").val() + '-' + $("#txtFactura_Nro1").val() + '-' + $("#txtFactura_Nro2").val());
}

function LoadRemito(Id) {
    $.ajax({
        type: "POST",
        data: '{RemitoId: "' + Id + '"}',
        url: "../Json/Compras/Compras.asmx/Remito_List_Cab_Id",
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
    $.ajax({
        type: "POST",
        data: '{RemitoId: "' + Id + '"}',
        url: "../Json/Compras/Compras.asmx/Remito_List_Det_Id",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Remitos_DetallebyId_Cargado,
        error: errores
    });
}

function List_Remitos_DetallebyId_Cargado(Resultado) {
    var Detalles = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad de Unidades</th><th>Nro Lote</th><th>Vencimiento</th><th>Precio Compra (x unidad)</th><th>Subtotal</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' style='display:none;' class='eliminar btn btn-mini btn-danger' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.INSUMO + " </td><td> " + Detalle.RED_CANTIDAD + " </td><td> " + Detalle.NRO_LOTE + " </td><td> " + Detalle.FechaVencimiento + " </td><td> $" + Detalle.RED_PRECIO + " </td><td> $" + Detalle.RED_PRECIO * Detalle.RED_CANTIDAD + " </td></tr>";
        objMedicamentos[i] = Detalle;
        objMedicamentos[i].Estado = 1;
        Total = Total + 1;
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

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad de Unidades</th><th>Nro Lote</th><th>Precio Compra (x unidad)</th><th>Subtotal</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            if (remitoId > 0) {
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' style='display:none;' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].INSUMO + "</td><td> " + objMedicamentos[i].RED_CANTIDAD + " </td><td>" + objMedicamentos[i].NRO_LOTE + " </td><td> $ " + objMedicamentos[i].RED_PRECIO + " </td><td> $" + parseFloat(objMedicamentos[i].RED_PRECIO * objMedicamentos[i].RED_CANTIDAD).toFixed(2) + " </td></tr>";
            }
            else
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].INSUMO + "</td><td> " + objMedicamentos[i].RED_CANTIDAD + " </td><td>" + objMedicamentos[i].NRO_LOTE + " </td><td> $ " + objMedicamentos[i].RED_PRECIO + " </td><td> $" + parseFloat(objMedicamentos[i].RED_PRECIO * objMedicamentos[i].RED_CANTIDAD).toFixed(2) + " </td></tr>";
        }
    }
    if (objMedicamentos.length > 0) $("#btnConfirmarRemito").removeAttr("disabled");
    else $("#btnConfirmarRemito").attr("disabled", true);
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

$("#btnRemitos").click(function () {
    window.location = "MostrarRemitos.aspx";
});

$("#btnPrint").click(function () {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Compras/Compras_RemitoProveedores.aspx?Id=' + remitoId,
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
            url: "../Json/Compras/Compras.asmx/Remito_Baja",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: errores,
            success: function () {
                alert("Remito dado de baja.");
                window.location = "MostrarRemitos.aspx";
            }
        });
    }
});