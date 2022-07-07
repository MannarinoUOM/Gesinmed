var Servicio_Id_Aux;
var objMedicamentos = new Array(); //Lista de pedidos detalles
var objEntregados = new Array(); //Lista de pedidos entregados
var Contenido = "";
var Egr_Id = 0;
var NroEntrega = 0;
var RemitoId = "Provisorio";
var Pendiente = 0; //Bandera para saber si esta pendiente el pedido...


//Query String//
var Pedido_Id = 0;
var Desde;
var Hasta;
var ServId;
var NroEntregaDet;
var NroEntregaCab;
var Pend;
///////////////

//Modificacion//
var row_actual = -1;

//Autoseleccion en celdas//
$.fn.selectText = function () {
    var doc = document;
    var element = this[0];
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};
//////////////////////////////

//AutoComplete Insumos//
var sourceArr = [];
var mapped = {};

$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {
        $("#cbo_Medicamento").val(selection); //nom
        $("#medicamentoId").val(mapped[selection]); //id
        return selection;
    },
    minLength: 4,
    items: 10
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

$("#cbo_Medicamento").keypress(function (e) {
    if (e.keyCode == 13) {
        if (row_actual != -1) ModificarInsumo(row_actual);
    }
});

$("#btnActualizarInsumo").click(function () {
    if (row_actual != -1) ModificarInsumo(row_actual);
});

function ModificarInsumo(row) {
    var json = JSON.stringify({ "PedidoID": Pedido_Id, "InsumoID": row, "NuevoInsumoID": $("#medicamentoId").val(), "Cantidad_Pedida": $("#UnidadesPedidas" + row).html().trim() });
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/FARMACIA_PED_DET_UPDATE",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            LimpiarModificacionIns();
            LoadDetalles();
        },
        error: errores
    });
}

function LimpiarModificacionIns() {
    $("#cbo_Medicamento").val(""); //nom
    $("#medicamentoId").val(""); //id
    $("#btnActualizarInsumo").hide();
    row_actual = -1;
}

/////Fin AutoComplete Insumos////


$("#btnImprimirPedido").click(function () {
    if (Pedido_Id > 0) PrintPedido();
    else alert("Nro. de Pedido no válido.");
});

function PrintPedido() {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/PPS_Print.aspx?Id=' + Pedido_Id,
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

$(document).ready(function () {
    var Query = {};
    Query = GetQueryString();
    Pedido_Id = Query['Id'];
    NroEntregaCab = Query['Cab']; //Numero de remito cabecera
    Desde = Query['Desde'];
    Hasta = Query['Hasta'];
    ServId = Query['ServId'];
    NroEntregaDet = Query['Nro']; //Nro de Entrega
    //alert(Query['Pendiente']);
    if (Query['Pendiente'] != null && Query['Pendiente'] != undefined && Query['Pendiente'] == "2") { $("#btnEntregaRapida").hide(); }



    List_by_Monodroga(0);
    $("#btnConfirmarEntrega").show();
    if (Query['Pend'] != null && Query['Pend'] != undefined) Pend = 1;
    if (Pedido_Id > 0) {
        LoadPedido();
    }




});

$("#btnVolver").click(function () {
    //    if (Pendiente == 0) 
    //    window.location.href = "EntregasPPS.aspx?Desde=" + Desde + "&Hasta=" + Hasta + "&ServId=" + ServId;
    //    else window.location.href = "PedidosPendientes.aspx";
    //alert(Pend);
    if (Pend == 1)
        window.location.href = "PedidosPendientes.aspx";
    else
        window.location.href = "EntregasPPS.aspx?Desde=" + Desde + "&Hasta=" + Hasta + "&ServId=" + ServId;
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
        error: errores
    });
}

function LoadPedido() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Buscar_PPS_by_PedidoId",
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

function LoadPedido_Cargado(Resultado) {
    var PedidoCab = {};
    PedidoCab = Resultado.d;
    
    $("#CargadoServicio").html(PedidoCab.Servicio);
    $("#CargadoNumero").html(PedidoCab.Pedido_Id);
    $("#CargadoFecha").html(PedidoCab.Fecha);
    Servicio_Id_Aux = PedidoCab.Servicio_Id;
    NroEntregaCab = PedidoCab.EntregaCabID;
    Pendiente = PedidoCab.Pendiente;
  ///  alert(Pendiente);
    SetearControles();
    LoadDetalles();
    BajarPantalla();
}

function BajarPantalla() {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}

function SetearControles() { 
    if (Pendiente) {
        $("#btnConfirmarEntrega").show();
        $("#btnEntregaRapida").show();
    }
    else {
        $("#btnConfirmarEntrega").hide();
        $("#btnEntregaRapida").hide();
    }

    if (NroEntregaCab > 0) {
       // $("#btnHistorial").show(); lo oculto por supuesto mal funcionamiento
        $("#CargadoEntrega").html(NroEntregaCab);
    }
    else {
        $("#btnHistorial").hide();
        $("#CargadoEntrega").html("Provisorio");
    } 
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function LoadDetalles() {
  //  alert(Pedido_Id);
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/BuscarPPP_byPedidoid_Det",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var pedidos = Resultado.d;
            var Encabezado = "<table id='TablaInsumos' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Unidades Pedidas</th><th>Unidades Entregadas</th><th>Unidades Pendientes</th><th>Unidades en Stock</th><th>Observaciones</th><th>Imprime Etiqueta</th></tr></thead><tbody>";
            var Contenido = "";
            var insumo = 0;
            var combos = [];
            var indiceMed = 0;
            $.each(pedidos, function (index, Detalle) {
                // alert(index);
                // alert(Detalle.Nombre);
                if (insumo != Detalle.Insumo_Id) {
                    var check = "";
                    if (Detalle.Etiqueta) check = "checked";
                    Contenido = Contenido + "<tr data-index='" + indiceMed + "' id='row" + Detalle.Insumo_Id + "'><td style='display:none;' id='indice" + indiceMed + "'>" + Detalle.Insumo_Id + "</td><td><a id='Editar" + Detalle.Insumo_Id + "' onclick='Editar(" + Detalle.Insumo_Id + ");' class='btn btn-mini' rel='tooltip' title='Editar'><i class='icon-edit'></i></a></td><td style='display:none;' id='InsumoId" + Detalle.Insumo_Id + "'>" + Detalle.Insumo_Id + "</td><td id='Nombre" + Detalle.Insumo_Id + "'>" + Detalle.Nombre + " " + Detalle.Gramaje + Detalle.Medida + " - " + Detalle.Presentacion + "</td><td class='editable UnidadesPedidas' id='UnidadesPedidas" + Detalle.Insumo_Id + "' data-id='" + Detalle.Insumo_Id + "' contenteditable>" + Detalle.Cantidad + "</td>" +
                    //entregadas
                "<td class='editable UnidadesEntregadas' id='UnidadesEntregadas" + Detalle.Insumo_Id + "' data-id='" + Detalle.Insumo_Id + "' contenteditable>" + Detalle.Entregado + " </td>" +
                "<td id='cantidad_ent_inicial" + Detalle.Insumo_Id + "' style='display:none'>" + Detalle.Entregado + " </td>" +


                "<td class='UnidadesPendientes' id='UnidadesPendientes" + Detalle.Insumo_Id + "' data-id='" + Detalle.Insumo_Id + "'>" + Detalle.Saldo + " </td>" +

                    //"<td class='UnidadesStock' id='UnidadesStock" + Detalle.Insumo_Id + "' data-id=" + Detalle.Insumo_Id + ">" + Detalle.EnStock + " Unidades en Stock del Nro. de Lote:" + Detalle.NRO_LOTE + "</td>" +
                    //<option   value='0' >Seleccione Lote</option>
                "<td class='UnidadesStock' id='UnidadesStock" + Detalle.Insumo_Id + "' data-id=" + Detalle.Insumo_Id + "><select class='combo' id='cbo_" + Detalle.Insumo_Id + "'></select></td>" +

                "<td id='Observaciones" + Detalle.Insumo_Id + "' class='editableObs Observaciones' data-id='" + Detalle.Insumo_Id + "' contenteditable>" + Detalle.Observaciones + "</td><td><input id='chk_Etiqueta" + Detalle.Insumo_Id + "' data-id='" + Detalle.Insumo_Id + "' class='et_check' type='checkbox' " + check + "/></td></tr>";
                    objMedicamentos[indiceMed] = Detalle;
                    insumo = Detalle.Insumo_Id;
                    indiceMed += 1;
                }
                var opcion = {};
                opcion.descripcion = Detalle.EnStock + " - Nro. de Lote:" + Detalle.NRO_LOTE;
                opcion.valor = Detalle.NRO_LOTE;
                opcion.comboId = Detalle.Insumo_Id;
                opcion.VENCIMIENTO = Detalle.VENCIMIENTO;
                combos.push(opcion);
            });
            var Pie = "</tbody></table>";
            $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);

            $.each(combos, function (index, item) {
                //alert(item.descripcion);
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

            console.log(combos);
        },
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaMedicamentos").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaMedicamentos").show();
        },
        error: errores
    });
}

$(".combo").live('change', function () {
    //alert($($(this).attr('id') + ' option:selected').val());
    var id = $(this).attr('id');
    if ($("#" + id + " option:selected").data('vencimiento') == 1) { alert("Este lote está vencido"); }
});

/////////Eventos de tabla/////////

$(document).on('focus', '.editable', function () {
    $(this).selectText();
});

$(document).on('focus', '.editableObs', function () {
    $(this).selectText();
});


$(document).on('click', '.et_check', function () {
    var index = $(this).data("id");
   // alert(index);
    objMedicamentos[index].Etiqueta = $("#chk_Etiqueta" + index).is(":checked");
});

$(document).on('keydown', '.editable', function (e) {
    //Ver si lo ingresado es numero y maxima longitud de campo = 5//
    if (e.keyCode == 8) return; //Permitir Borrar

    if ($(this).html().trim().length > 5) e.preventDefault();

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
    /////
});

$(document).on('keydown', '.editableObs', function (e) {
    //Ver si lo ingresado es numero y maxima longitud de campo = 5//
    if (e.keyCode == 8) return; //Permitir Borrar

    if ($(this).html().trim().length > 30) e.preventDefault();
    /////
});



$(document).on('focusout', '.UnidadesEntregadas', function (e) {
    var id = $(this).data("id");
    var cantidad_ent = parseFloat($(this).html()); //Cantidad entrega

    if (cantidad_ent < $("#cantidad_ent_inicial" + $(this).data("id")).html()) {
        alert("Columna 'UNIDADES ENTREGADAS' sumar mentalmente las unidades entregadas con las que se van a entregar e ingresar ese valor.");
        $(this).html($("#cantidad_ent_inicial" + $(this).data("id")).html());
    } else {

        $("#UnidadesPendientes" + id).html($("#UnidadesPedidas" + id).html() - cantidad_ent);
        ModificarItem(id); //Actualizar campos en lista.
    }
    $("#mensaje").hide();

});



$(document).on('focusin', '.UnidadesEntregadas', function (e) {
    $("#mensaje").show();
});


function ModificarItem(id) {
    var index = $("#row" + id).data("index"); //Modificar lista de medicamentos a grabar en base.

    objMedicamentos[index].Entregado = parseInt($("#UnidadesEntregadas" + id).html().trim());
    objMedicamentos[index].Etiqueta = $("#chk_Etiqueta" + id).is(":checked");
    //objMedicamentos[index].Saldo = parseInt($("#Saldo" + id).html().trim());
    objMedicamentos[index].Observaciones = parseInt($("#Observaciones" + id).html().trim());

    //f.RED_REM_ID, f.INSUMO_ID, f.NRO_ENTREGA, f.CANTIDAD, (int)f.USUARIO_ID, f.OBSERVACIONES, NumTipo(Tipo).ToString(),f.Etiqueta

    $("#btnConfirmarEntrega").removeAttr("disabled"); //Habilitar boton para grabar
}

function Editar(row) {
    row_actual = row;
    Editando = 1;



    $("#cbo_Medicamento").val($("#Nombre" + row).html().trim());
    $("#medicamentoId").val(row);

    if ($("#UnidadesPendientes" + row).html() > 0) { $("#btnActualizarInsumo").show(); } else { $("#btnActualizarInsumo").hide(); }
    
}

/////////Fin Eventos de tabla/////////



$("#EntregasModal").on('show', function () {
    if (NroEntregaCab == 0) { alert("No hay entregas realizadas del pedido.") ; return false; }
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/VerHistorialdeEntrega",
        data: '{RemitoId: "' + NroEntregaCab + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Entregas = Resultado.d;
            var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro. Entrega</th><th>Fecha</th><th>Usuario</th></tr></thead><tbody>";
            var Contenido = "";
            $.each(Entregas, function (index, Entrega) {
                Contenido = Contenido + "<tr onclick=ModificarEntrega(" + Entrega.NRO_ENTREGA + ")><td>" + Entrega.NRO_ENTREGA + " </td><td> " + Entrega.FECHA + " </td><td>" + Entrega.USUARIO + " </td></tr>";
            });
            var Pie = "</tbody></table>";
            $("#TablaEntregas_div").html(Encabezado + Contenido + Pie);
        },
        error: errores
    });
});

function ModificarEntrega(NroEntregaDet) {
    window.location = "CargarEntregaPPS.aspx?Id=" + Pedido_Id + "&Cab=" + NroEntregaCab + "&Nro=" + NroEntregaDet + "&Desde=" + Desde + "&Hasta=" + Hasta + "&ServId=" + ServId;
}

function Imprimir_Etiq(Id, Nro) {
  $.fancybox(
                {
                    'autoDimensions': false,
                    'href': '../Impresiones/ImpresionFarmacia_Etiq.aspx?Id=' + Id + '&Nro=' + Nro,
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

function RenderizarTabla() {
    var Encabezado = "<table id='TablaInsumos' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Unidades Pedidas</th><th>Unidades Entregadas</th><th>Unidades Pendientes</th><th>Unidades en Stock</th><th>Observaciones</th><th>Imprime Etiqueta</th></tr></thead><tbody>";
    var Contenido = "";
    $.each(objMedicamentos, function (index, Detalle) {
        var check = "";
        if (Detalle.Etiqueta) check = "checked";
        Contenido = Contenido + "<tr data-index='" + index + "' id='row" + Detalle.Insumo_Id + "'><td style='display:none;' id='indice" + index + "'>" + Detalle.Insumo_Id + "</td><td><a id='Editar" + Detalle.Insumo_Id + "' onclick='Editar(" + Detalle.Insumo_Id + ");' class='btn btn-mini' rel='tooltip' title='Editar'><i class='icon-edit'></i></a></td><td style='display:none;' id='InsumoId" + Detalle.Insumo_Id + "'>" + Detalle.Insumo_Id + "</td><td id='Nombre" + Detalle.Insumo_Id + "'>" + Detalle.Nombre + " " + Detalle.Gramaje + Detalle.Medida + " - " + Detalle.Presentacion + "</td><td class='editable UnidadesPedidas' id='UnidadesPedidas" + Detalle.Insumo_Id + "' data-id='" + Detalle.Insumo_Id + "' contenteditable>" + Detalle.Cantidad + "</td><td class='editable UnidadesEntregadas' id='UnidadesEntregadas" + Detalle.Insumo_Id + "' data-id='" + Detalle.Insumo_Id + "' contenteditable>" + Detalle.Entregado + " </td>" +
        "<td class='UnidadesPendientes' id='UnidadesPendientes" + Detalle.Insumo_Id + "' data-id='" + Detalle.Insumo_Id + "'>" + Detalle.Saldo + " </td>" +
        "<td class='UnidadesStock' id='UnidadesStock" + Detalle.Insumo_Id + "' data-id=" + Detalle.Insumo_Id + ">" + Detalle.EnStock + "</td>" +
        "<td id='Observaciones" + Detalle.Insumo_Id + "' class='editableObs Observaciones' data-id='" + Detalle.Insumo_Id + "' contenteditable>" + Detalle.Observaciones + "</td><td><input id='chk_Etiqueta" + Detalle.Insumo_Id + "' data-id='" + Detalle.Insumo_Id + "' class='et_check' type='checkbox' " + check + "/></td></tr>";
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

$("#btnConfirmarEntrega").click(function () {
    if (confirm("¿Desea confirmar la entrega?")) {
        RecorrerTabla();
    }
});

function RecorrerTabla() {
    var len = $("#TablaInsumos tbody tr").length;
    $("#TablaInsumos tbody tr").each(function (i) {
        var index = $("#indice" + i).html();
       // alert(index);
        if ($("#InsumoId" + index).html() != 0) //Es insumo       
        {
            LoadObjEntrega($("#InsumoId" + index).html()); //Cargar Insumo en lista...
        }
        if (i == len - 1) GuardarListaEntrega(); //Ultimo elemento...
    });
}

function LoadObjEntrega(index) {
        var IdInsumo = $("#InsumoId"+index).html();
        var Entregados = {};
      //  if ($("#cbo_" + IdInsumo).val() != "0") {
            Entregados.Cant_Entrega = $("#UnidadesEntregadas" + IdInsumo).html();
            Entregados.CANTIDAD = $("#UnidadesEntregadas" + IdInsumo).html();
            Entregados.INSUMO_ID = IdInsumo;
            Entregados.OBSERVACIONES = $("#Observaciones" + IdInsumo).html();
            Entregados.RED_REM_ID = Pedido_Id;
            Entregados.Etiqueta = $("#chk_Etiqueta" + IdInsumo).is(":checked");
            Entregados.Lote = $("#cbo_" + IdInsumo).val();
            objEntregados[index] = Entregados;
      //  }
}

function GuardarListaEntrega() {

    console.log(objEntregados);
   // return false;

    if (objEntregados.length == 0) {alert("No hay insumos para entregar."); return false;}
//    alert(NroEntregaCab + "   " + NroEntregaDet);
//    return false;
    if (NroEntregaCab > 0 && NroEntregaDet > 0) GuardarModificacion(); //Modifica entrega
    else Insert_Egr_Cab(); //Nueva entrega de remito
}

function GuardarModificacion() {
    var json = JSON.stringify({ "NroEntregaCab": NroEntregaCab, "NroEntrega": NroEntregaDet });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/PPS_DeleteItems_Modifica",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            InsertarNuevosItems();
        },
        error: errores
    });
}

function InsertarNuevosItems() {
    //var json = JSON.stringify({ "objMedicamentos": objMedicamentos, "Tipo": "PPS", "NroEnt": NroEntregaDet, "Pedido_Id": Pedido_Id });
    var json = JSON.stringify({ "objEntregados": objEntregados, "Tipo": "PPS", "NroEnt": NroEntregaDet });
    $.ajax({
        data: json,
        //url: "../Json/Farmacia/Farmacia.asmx/PPS_Modificar_Items",
        url: "../Json/Farmacia/Farmacia.asmx/Insert_Egr_Det_Modifica",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            $.fancybox(
                {
                    'autoDimensions': false,
                    'href': '../Impresiones/EntregasPPPImpresion.aspx?Id=' + NroEntregaCab + "&Nro=" + NroEntregaDet + "&M=1", //Es modificacion
                    'width': '75%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'onClosed': function () {
                        window.location.href = "EntregasPPS.aspx?Desde=" + Desde + "&Hasta=" + Hasta + "&ServId=" + ServId;
                        
                    }
                });
        },
        error: errores
    });
}

function Insert_Egr_Cab() {
    var f = {};
    f.REM_SER_ID = Servicio_Id_Aux;
    f.PED_ID = Pedido_Id;

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
    console.log(objEntregados);
    var n = Resultado.d; 
        var json = JSON.stringify({ "objEntregados": objEntregados, "Tipo": "PPS", "NroEnt": n });
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
        success: function (Resultado) {
            NroEntrega = Resultado.d; //Es el numero de entrega de la entrega en cuestion
            Print();
        },
        error: errores
    });
}

    function Print() {
        $.fancybox({
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
                // window.location.href = "EntregasPPS.aspx?Desde=" + Desde + "&Hasta=" + Hasta + "&ServId=" + ServId;

                setTimeout(function () {
                    Imprimir_Etiq_New(Egr_Id, NroEntrega);
                }, 1000);
                //Imprimir_Etiq_New(Egr_Id, NroEntrega);
            }
        });
    }

    function Imprimir_Etiq_New(Id, Nro) {
        $.fancybox(
                {
                    'autoDimensions': false,
                    'href': '../Impresiones/ImpresionFarmacia_Atiq_Serv.aspx?EntregaId=' + Id + '&NroEntrega=' + Nro + "&EsIM=" + 0,
                    'width': '75%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'onClosed': function () {
                        if (Pend == 1) {
                            window.location.href = "PedidosPendientes.aspx";
                        } else {
                            window.location.href = "EntregasPPS.aspx?Desde=" + Desde + "&Hasta=" + Hasta + "&ServId=" + ServId;
                        }
                    }
                });
            }


       //     function hola() {alert("hola");};

    //Entrega rapida, para cerrar rapidamente el pedido...
    $("#btnEntregaRapida").click(function () {
        Entrega_Rapida();
    });


    function Entrega_Rapida() {
        $.each(objMedicamentos, function (index, Detalle) {

            var id = $("#indice" + index).html();
            //alert(id);
            if ($("#InsumoId" + id).html() != 0) {
                $("#UnidadesEntregadas" + id).html($("#UnidadesPedidas" + id).html());
                $("#UnidadesPendientes" + id).html("0");
                $("#chk_Etiqueta" + id).attr("checked", true);
            }
        });
    }

    /*function CargarEntrega_Auto(i) {
        var Nombre = objMedicamentos[i].Nombre;
        var Codigo = objMedicamentos[i].Insumo_Id;
        var Detalle_Id = objMedicamentos[i].Detalle_Id;

        var Entregados = {};
        Entregados.Cant_Entrega = objMedicamentos[i].Cantidad;
        Entregados.CANTIDAD = objMedicamentos[i].Cantidad;
        Entregados.INSUMO_ID = Codigo;
        Entregados.RED_DET_ID = Detalle_Id;
        Entregados.OBSERVACIONES = "";
        Entregados.RED_REM_ID = Pedido_Id;
        Entregados.Cant_Ini = 0;
        Entregados.Etiqueta = true;
        objEntregados[i] = Entregados;
    }*/