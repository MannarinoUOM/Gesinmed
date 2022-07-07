var G_PedCAB = 0;
var G_PDT_ID = 0;
var G_ExpId = 0;

///Autocomplete
var sourceArr = [];
var mapped = {};

$("#btnEditarInsumos").click(function () {
    LimpiarControlesInsumo();
    VerInsumos(true);
    $('#modal_historial_insumo').modal('show');
});

function VerInsumos(Todos) {
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/List_InsumosCombo",
        data: '{Todos: "' + Todos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Insumos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $("#TablaHistorial").empty();
            Tabla_Titulo = "<table id='historial' class='table table-condensed' style='font-size:11px;'><thead><tr><th style='text-align:left;'>Insumo</th></tr></thead><tbody>";
            $.each(Insumos, function (index, ins) {
                Tabla_Datos += "<tr style='text-align:left;' class='tr_insumos' data-id='" + ins.INS_ID + "' id='tr" + ins.INS_ID + "'></td><td id='td_desc" + ins.INS_ID + "' style='text-align:left;'>" + ins.INS_DESCRIPCION + "</td><input type='hidden' id='INS_RUBRO"+index+"' data-id='"+ins.INS_RUBRO+"' /></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaHistorial").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

        },
        error: errores
    });
}

$("#txtInsumo").keypress(function () {
    if (G_INSUMO_ID == 0) //Si no hay insumo seleccionado que busque...
        if ($(this).val().trim().length >= 4) VerInsumos_Desc($(this).val().trim().toUpperCase());
});

$("#btnLimpiar").click(function () {
    $("#txtInsumo").val("");
    G_INSUMO_ID = 0;
    $(".tr_insumos").css("background-color", "#FFFFFF");
    VerInsumos(true);
});

function VerInsumos_Desc(Descripcion) {
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/List_InsumosCombo_by_Desc",
        data: '{Descripcion: "' + Descripcion + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Insumos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $("#TablaHistorial").empty();
            Tabla_Titulo = "<table id='historial' class='table table-condensed' style='font-size:11px;'><thead><tr><th style='text-align:left;'>Insumo</th></tr></thead><tbody>";
            $.each(Insumos, function (index, ins) {
                Tabla_Datos += "<tr style='text-align:left;' class='tr_insumos' data-id='" + ins.INS_ID + "' id='tr" + ins.INS_ID + "'></td><td id='td_desc" + ins.INS_ID + "' style='text-align:left;'>" + ins.INS_DESCRIPCION + "</td><input type='hidden' id='INS_RUBRO" + index + "' data-id='" + ins.INS_RUBRO + "' /></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaHistorial").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

        },
        error: errores
    });
}

var G_INSUMO_ID = 0; //Insumo seleccionado para modificar

$(document).on("click", ".tr_insumos", function () {
    G_INSUMO_ID = $(this).data("id");
    $("#tr" + G_INSUMO_ID).css("background-color", "#EEEEEE");
    $(".tr_insumos").css("background-color", "#FFFFFF");
    $("#tr" + G_INSUMO_ID).css("background-color", "#EEEEEE");
    $("#txtInsumo").val($("#td_desc" + G_INSUMO_ID).html());
    $("#cboRubro").val($("#INS_RUBRO" + G_INSUMO_ID).data("id"));
});

//Solo modifica la descripcion//
function GuardarInsumo() {
    var json = JSON.stringify({ "INS_ID": G_INSUMO_ID, "INS_DESCRIPCION": $("#txtInsumo").val().trim().toUpperCase(), "INS_RUBRO": $("#cboRubro :selected").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/COMPRAS_INSUMOS_UPDATE",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            VerInsumos(true);
            LimpiarControlesInsumo();
            Cargar_Medicamentos(false);
        },
        error: errores
    });
}

function LimpiarControlesInsumo() {
    $("#txtInsumo").val("");
    G_INSUMO_ID = 0;
    $(".tr_insumos").css("background-color", "#FFFFFF");
}

function ValidarInsumo() {
    if ($("#cboRubro :selected").val() == 0) { alert("Ingrese Rubro."); return false; }
    if ($("#txtInsumo").val().trim().length == 0) { alert("Ingrese Insumo."); return false; }
    return true;
}

$("#btnGuardar").click(function () {
    if (!ValidarInsumo()) return false;
    if (confirm("¿Desea guardar el insumo?")) {
        GuardarInsumo();
    }
});

$("#PDT_INS_NOM").typeahead({
    source: sourceArr,
    updater: function (selection) {
        $("#PDT_INS_NOM").val(selection); //nom
        $("#PDT_INS_ID").val(mapped[selection]); //id
        BuscarPorcentaje_Insumo($("#PDT_INS_ID").val(), $("#CargadoDNI").html());
        $("#PDT_CANTIDAD").focus();
        return selection;
    },
    minLength: 4,
    items: 10
});

function BuscarPorcentaje_Insumo(INS_ID,NRO_DOC) {
    var json = JSON.stringify({ "INS_ID": INS_ID, "NRO_DOC": NRO_DOC });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/COMPRAS_PEDIDOS_DESCUENTO_INSUMO_PAC",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#PDT_POR_DESC").val(Resultado.d);
            //alert(Resultado.d);
        },
        error: errores
    });
    
}

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


function InitControls(){
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.date').mask("99/99/9999", { placeholder: "-" });
    $('.date').datepicker();
    $("#btnEliminarCAB").hide();
    $("#btnCopiar").hide();
    $("#btnVerDetallesPedido").hide();
    $("#contDET").hide();


    $("#EXP_PED_FECHA").val(FechadelDia());

    List_Rubros(false);
    Cargar_Medicamentos(false);
}

function FechadelDia() {
    var currentDt = new Date();
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;

    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;

    var yyyy = currentDt.getFullYear();
    var d = dd + '/' + mm + '/' + yyyy;
    return d;
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
            $('#cboRubro').append($('<option></option>').val("0").html("Seleccione Rubro...")); 
            $.each(lista, function (index, Rubro) {
                $('#cbo_Rubro').append($('<option></option>').val(Rubro.COMPRAS_RUBROS_ID).html(Rubro.COMPRAS_RUBROS_DESC));
                $('#cboRubro').append($('<option></option>').val(Rubro.COMPRAS_RUBROS_ID).html(Rubro.COMPRAS_RUBROS_DESC));
            });
        },
        error: errores
    });
}

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


$(document).ready(function () {
    InitControls();
    
    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    if (GET["ExpId"] != "" && GET["ExpId"] != null) {
        G_ExpId = GET["ExpId"];
        Buscar_Expedientes(GET["ExpId"], 0, "", 0, 0, "", "", true, true, true, true);
    }
    if (GET["G_PedCAB"] != "" && GET["G_PedCAB"] != null) {
        G_PedCAB = GET["G_PedCAB"];
    }

});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function Buscar_Expedientes(EXP_ID, EXP_ESTADO, EXP_NOMBRE, EXP_DIAG_ID, EXP_NRO_DOC, EXP_VENC_FECHA_DESDE,
        EXP_VENC_FECHA_HASTA, EXP_CERT_CASAM, EXP_CERT_DNI, EXP_CERT_DISC, EXP_CERT_SUELDO) {

    if (EXP_ID.length == 0) EXP_ID = 0;
    if (EXP_NRO_DOC.length == 0) EXP_NRO_DOC = 0;
    if (EXP_VENC_FECHA_DESDE.length == 0) EXP_VENC_FECHA_DESDE = "01/01/1900";
    if (EXP_VENC_FECHA_HASTA.length == 0) EXP_VENC_FECHA_HASTA = "01/01/1900";

    var json = JSON.stringify({ "EXP_ID": EXP_ID, "EXP_ESTADO": EXP_ESTADO, "EXP_NOMBRE": EXP_NOMBRE, "EXP_DIAG_ID": EXP_DIAG_ID, "EXP_NRO_DOC": EXP_NRO_DOC,
        "EXP_VENC_FECHA_DESDE": EXP_VENC_FECHA_DESDE, "EXP_VENC_FECHA_HASTA": EXP_VENC_FECHA_HASTA, "EXP_CERT_CASAM": EXP_CERT_CASAM,
        "EXP_CERT_DNI": EXP_CERT_DNI, "EXP_CERT_DISC": EXP_CERT_DISC, "EXP_CERT_SUELDO": EXP_CERT_SUELDO, "SeccionalesIds": null, "PatologiasIds": null,
        "NroPedidoId" : 0
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/Expediente_Buscar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var expedientes = Resultado.d;
            $.each(expedientes, function (index, exp) {
                $("#CargadoNroExpediente").html(exp.EXP_ID);
                $("#CargadoDNI").html(exp.EXP_NRO_DOC);
                $("#CargadoSeccional").html(exp.EXP_SECCIONAL);
                $("#CargadoApellido").html(exp.EXP_NOMBRE);
                $("#CargadoVtoExpte").html(exp.EXP_VENC_FECHA);
                $("#CargadoPatologia").html(exp.EXP_PATOLOGIAS);
                $("#CargadoFechaNac").html(exp.EXP_FEC_NAC);
                CargarPedidosCAB_by_EXPID(exp.EXP_ID);
                Cargar_Paciente_Documento(exp.EXP_NRO_DOC);
                $('#fotopaciente').attr('src', '../fotoPerfil/' + exp.Foto);
            });
        },
        error: errores
    });
}

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": "DU" });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Paciente = Resultado.d;
            $.each(Paciente, function (index, paciente) {
                $("#afiliadoId").val(paciente.documento);
                $("#CargadoNHC").html(paciente.NHC_UOM);
            });
        },
        error: errores
    });
}




function CargarPedidosCAB_by_EXPID(EXP_ID) { 
    var json = JSON.stringify({"EXP_ID": EXP_ID});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_PED_CAB_LIST_EXPID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var cabeceras = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            Tabla_Titulo = "<table style='' id='TablaPedidos' class='table table-condensed'><thead><tr><th>Nro. Ped.</th><th>Ingreso</th><th>Duración</th><th>Usuario</th></tr></thead><tbody>";
            $.each(cabeceras, function (index, exp) {
                Tabla_Datos += "<tr data-placement='bottom' title='" + exp.INSUMOS + "' class='tr_CAB' id='tr" + exp.EXP_PED_ID + "' onclick='AbrirPedidoCab(" + exp.EXP_PED_ID + ")'><td>" + exp.EXP_PED_ID + "</td><td id='EXP_PED_FECHA" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_FECHA + "</td><td id='EXP_PED_DURACION" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_DURACION + "</td><td>" + exp.EXP_PED_USU_NOM + "</td><td id='EXP_PED_OBS" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_OBS + "</td><td style='display:none;' id='EXP_PED_FEC_AUTORIZ" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_FEC_AUTORIZ + "</td><td style='display:none;'>" + exp.EXP_PED_USU_AA_NOM + "</th><td style='display:none;' id='EXP_PED_URGENTE" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_URGENTE + "</th><td style='display:none;' id='EXP_PED_FECHA_RECETA" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_FECHA_RECETA + "</th></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaPedidos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        complete: function () {
            if (G_PedCAB > 0) {
                AbrirPedidoCab(G_PedCAB);
                $("#btnVerDetallesPedido").click();
            }
        },
        error: errores
    });
}

$('body').tooltip({
    selector: '.tr_CAB',
    html: true
});

function AbrirPedidoCab(PED_ID) {
    $(".tr_CAB").css("background-color", "white");
    G_PedCAB = PED_ID;
    $("#EXP_PED_ID").val(PED_ID);
    $("#EXP_PED_FECHA").val($("#EXP_PED_FECHA" + PED_ID).html());
    $("#EXP_PED_FEC_AUTORIZ").val($("#EXP_PED_FEC_AUTORIZ" + PED_ID).html());
    $("#EXP_PED_DURACION").val($("#EXP_PED_DURACION" + PED_ID).html());
    $("#EXP_PED_OBS").val($("#EXP_PED_OBS" + PED_ID).html());
    $("#EXP_PED_FECHA_RECETA").val($("#EXP_PED_FECHA_RECETA" + PED_ID).html());
    if ($("#EXP_PED_URGENTE" + PED_ID).html() == "true")
        $("#EXP_PED_URGENTE").attr("checked", true);
    else $("#EXP_PED_URGENTE").removeAttr("checked");
    $("#tr" + PED_ID).css("background-color", "grey");
    $("#btnEliminarCAB").show();
    $("#btnCopiar").show();
    $("#btnVerDetallesPedido").show();
    if ($("#EXP_PED_DURACION" + PED_ID).html() == 30) {
        $("#btn90dias").show();
        $("#btn60dias").show();
        $("#btnCopiar").show();
    }
    else {
        $("#btn90dias").hide();
        $("#btn60dias").hide();
        $("#btnCopiar").hide();
    }
}

$("#btnLimpiarCAB").click(function () {
    $(".datoCAB").val("");
    $(".datoCAB").removeAttr("checked");
    $("#EXP_PED_DURACION").val("30");
    $(".tr_CAB").css("background-color", "white");
    $("#btnEliminarCAB").hide();
    $("#btnCopiar").hide();
    $("#btnVerDetallesPedido").hide();
    $("#cbo_Rubro").val("");
    $("#btn60dias").hide();
    $("#btn90dias").hide();
    $("#EXP_PED_FECHA").val(FechadelDia());
    G_PedCAB = 0;
});


$("#btnEliminarCAB").click(function () {
    if (confirm("¿Desea eliminar el pedido?")) {
        EliminarPedido(G_PedCAB);
    }
});

function EliminarPedido(NroPedidoCAB) {
    var json = JSON.stringify({ "NroPedidoCAB": NroPedidoCAB });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/COMPRAS_EXP_PEDIDOS_CAB_BAJA",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            alert("Pedido dado de baja.");
            window.location = "Compras_Expediente_Pedidos.aspx?ExpId=" + $("#CargadoNroExpediente").html();
        },
        error: errores
    });
}

var Es_a_60_90 = false;

$("#btnCopiar").click(function () {
    if ($("#EXP_PED_ID").val().trim().length == 0) { alert("Seleccione un pedido."); return false; }
    if (confirm("¿Desea copiar el pedido?")) {
        Es_a_60_90 = false;
        CopiarPedido($("#EXP_PED_ID").val().trim());
    }
});

$("#btn60dias").click(function () {
    if ($("#EXP_PED_ID").val().trim().length == 0) { alert("Seleccione un pedido."); return false; }
    if (confirm("¿Desea copiar el pedido a 60 días?")) {
        $("#EXP_PED_DURACION").val("60"); //Duracion = 60 dias...
        Es_a_60_90 = true;
        CopiarPedido($("#EXP_PED_ID").val().trim());
    }
});

var Contador_pedidos = 0;

$("#btn90dias").click(function () {
    if ($("#EXP_PED_ID").val().trim().length == 0) { alert("Seleccione un pedido."); return false; }
    if (confirm("¿Desea copiar el pedido a 90 días?")) {
        if (Contador_pedidos == 0) $("#EXP_PED_DURACION").val("60"); //Duracion = 60 dias, primera copia

        Es_a_60_90 = true;
        CopiarPedido_x_dos($("#EXP_PED_ID").val().trim());
    }
});

function CopiarPedido(PedidoID) {
    //H2_COMPRAS_EXP_PEDIDOS_CAB_COPIAR
    var json = JSON.stringify({ "PedidoId": PedidoID, "Duracion":  $("#EXP_PED_DURACION").val(), "Es_a_60_90": Es_a_60_90});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_PEDIDOS_COPIAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            G_PedCAB = Resultado.d;
            if (G_PedCAB > 0) {
                alert("Pedido copiado.");
                window.location = "Compras_Expediente_Pedidos.aspx?ExpId=" + $("#CargadoNroExpediente").html() + "&G_PedCAB=" + G_PedCAB;
            }
        },
        error: errores
    });
}

function CopiarPedido_x_dos(PedidoID) {
    //H2_COMPRAS_EXP_PEDIDOS_CAB_COPIAR, copia el pedido original por dos, a 60 y a 90 dias....
    var json = JSON.stringify({ "PedidoId": PedidoID, "Duracion": $("#EXP_PED_DURACION").val(), "Es_a_60_90": Es_a_60_90 });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_PEDIDOS_COPIAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            G_PedCAB = Resultado.d;
            if (G_PedCAB > 0) {
                Contador_pedidos++;
                if (Contador_pedidos == 1) {
                    $("#EXP_PED_DURACION").val("90"); //Duracion = 90 dias, segunda copia
                    CopiarPedido_x_dos(PedidoID);
                }
                if (Contador_pedidos == 2) { //Si copia dos veces el pedido (uno a 60 y otro a 90 dias)...
                    alert("Pedido copiado.");
                    window.location = "Compras_Expediente_Pedidos.aspx?ExpId=" + $("#CargadoNroExpediente").html() + "&G_PedCAB=" + G_PedCAB;
                }
            }
        },
        error: errores
    });
}

function CargarObjCAB() {
    var PedidoCAB = {};
    if ($("#EXP_PED_ID").val().trim().length == 0) PedidoCAB.EXP_PED_ID = 0;
    else PedidoCAB.EXP_PED_ID = $("#EXP_PED_ID").val();
    PedidoCAB.EXP_PED_EPA_ID = 0; //(Sin Entrega)
    PedidoCAB.EXP_PED_FECHA = $("#EXP_PED_FECHA").val();
    PedidoCAB.EXP_PED_FECHA_RECETA = $("#EXP_PED_FECHA_RECETA").val();
    PedidoCAB.EXP_PED_OBS = $("#EXP_PED_OBS").val().trim().toUpperCase();
    PedidoCAB.EXP_PED_DURACION = $("#EXP_PED_DURACION").val();
    PedidoCAB.EXP_PED_FEC_AUTORIZ = $("#EXP_PED_FEC_AUTORIZ").val();
    PedidoCAB.EXP_PED_URGENTE = $("#EXP_PED_URGENTE").is(":checked");
    PedidoCAB.EXP_PED_EXP_ID = $("#CargadoNroExpediente").html();
    PedidoCAB.EXP_PED_FEC_AUDIT = "01/01/1900"; //Valor por default
    PedidoCAB.EXP_PED_ESTADO = true; //Activo por default
    return PedidoCAB;
}

function ValidarCAB() {
    if ($("#EXP_PED_FECHA").val().trim().length == 0) { alert("Ingrese fecha de pedido."); return false; }
    if ($("#EXP_PED_FEC_AUTORIZ").val().trim().length == 0) { alert("Ingrese fecha de autorización."); return false; }
    if ($("#EXP_PED_DURACION").val().trim().length == 0) { alert("Ingrese duración."); return false; }
    if ($("#EXP_PED_FECHA_RECETA").val().trim().length == 0) { alert("Ingrese fecha de receta."); return false; }
    return true;
}

$("#btnGuardarCAB").click(function () {
    if (!ValidarCAB()) return false; //Validar datos ingresados para CAB

    var json = JSON.stringify({ "PedidoCAB": CargarObjCAB() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_PEDIDOS_CAB_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            G_PedCAB = Resultado.d;
            if (G_PedCAB > 0) {
                alert("Guardado.");
                window.location = "Compras_Expediente_Pedidos.aspx?ExpId=" + $("#CargadoNroExpediente").html() + "&G_PedCAB=" + G_PedCAB;
            }
            else alert("Error al grabar cabecera.");
        },
        error: errores
    });
});

function CargarDetallesPED(EXP_PED_ID) {
    var json = JSON.stringify({ "PDT_ID": EXP_PED_ID });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_PED_DET_LIST_ID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var cabeceras = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            Tabla_Titulo = "<table id='TablaPedidoDetalles' class='table table-condensed' style='font-size:11px; text-align:center;'><thead><tr><th>Nro. Pedido</th><th>Insumo</th><th>Cantidad</th><th>% Desc.</th><th>Ingreso</th><th>Usuario</th></tr></thead><tbody>";
            $.each(cabeceras, function (index, exp) {
                Tabla_Datos += "<tr class='tr_DET' id='tr" + exp.PDT_ID + "' onclick='MostrarDetalle(" + exp.PDT_ID + ")'><td>" + G_PedCAB + "</td><td id='PDT_INS_NOM" + exp.PDT_ID + "'>" + exp.PDT_INS_NOM + "</td><td id='PDT_CANTIDAD" + exp.PDT_ID + "'>" + exp.PDT_CANTIDAD + "</td><td id='PDT_POR_DESC" + exp.PDT_ID + "'>" + exp.PDT_POR_DESC + "</td><td>" + $("#EXP_PED_FECHA").val() + "</td><td>" + exp.PDT_USUARIO_NOM + "</td><td style='display:none;' id='PDT_NOENTREGAR" + exp.PDT_ID + "'>" + NoEntregar(exp.PDT_NOENTREGAR) + "</td><td style='display:none;' id='PDT_FEC_AUDIT" + exp.PDT_ID + "'>" + exp.PDT_FEC_AUDIT + "</td><td style='display:none;' id='PDT_USU_AUDIT_NOM" + exp.PDT_ID + "'>" + exp.PDT_USU_AUDIT_NOM + "</th><td style='display:none;' id='PDT_OBS" + exp.PDT_ID + "'>" + exp.PDT_OBS + "</th><td style='display:none;' id='PDT_INS_ID" + exp.PDT_ID + "'>" + exp.PDT_INS_ID + "</th></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaPedidoDetalles").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        error: errores
    });
}

//Opciones CAB//
$("#btnVerDetallesPedido").click(function () {
    if ($("#EXP_PED_ID").val() > 0) {
        CargarDetallesPED($("#EXP_PED_ID").val());
        VerPantallaDetalles();
    }
    else alert("Seleccione Pedido.");
});

$("#btnVolverFicha").click(function () {
    if (G_ExpId > 0)
    window.location = "Compras_Expediente_Ficha.aspx?ExpId=" + G_ExpId; 
});
//////

function VerPantallaDetalles() {
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top + 810 }, 500);
    $("#contCAB").hide();
    $("#contDET").show();
}

function NoEntregar(PDT_ENTREGAR) {
    var No_Entregar = 'N';
    if (PDT_ENTREGAR == "true") No_Entregar = 'S';
    return No_Entregar;
}

var Auditado_med = false;

function MostrarDetalle(PDT_ID) {
    G_PDT_ID = PDT_ID;
    $(".tr_DET").css("background-color", "white");
    $("#tr" + PDT_ID).css("background-color","grey");
    $("#PDT_INS_ID").val($("#PDT_INS_ID" + PDT_ID).html());
    $("#PDT_CANTIDAD").val($("#PDT_CANTIDAD" + PDT_ID).html());
    $("#PDT_POR_DESC").val($("#PDT_POR_DESC" + PDT_ID).html());
    if ($("#PDT_NOENTREGAR" + PDT_ID).html() == 'N')
        $("#PDT_NOENTREGAR").attr("checked", true);
    else $("#PDT_NOENTREGAR").removeAttr("checked");
    $("#PDT_OBS").val($("#PDT_OBS" + PDT_ID).html());
    //$("#PDT_PLAN").val($("#PDT_PLAN" + PDT_ID).html());
    if ($('#PDT_USU_AUDIT_NOM' + PDT_ID).html().trim().length == 0) Auditado_med = false;
    else Auditado_med = true;
    $("#PDT_INS_NOM").val($("#PDT_INS_NOM" + PDT_ID).html());
}

$("#btnLimpiarDET").click(function () {
    $(".tr_DET").css("background-color", "white");
    $(".detalles").val("");
    $(".detalles").removeAttr("checked");
    $(".detalles").html("");
    G_PDT_ID = 0;
});

$("#PDT_CANTIDAD").keypress(function (event) {
    if (event.which == 13) {
        $("#btnGuardarDET").click();
    }
});

function CargarObjDet() {
    var DET = {};
    DET.PDT_ID = G_PDT_ID;
    DET.PDT_PED_ID = G_PedCAB; //Pedido CAB ID
    DET.PDT_INS_ID = $("#PDT_INS_ID").val();
    DET.PDT_CANTIDAD = $("#PDT_CANTIDAD").val().trim();
    DET.PDT_POR_DESC = $("#PDT_POR_DESC").val();
    DET.PDT_NOENTREGAR = $("#PDT_NOENTREGAR").is(":checked");
    DET.PDT_SALDO = 0;
    DET.PDT_USU_AUDIT = 0;
    DET.PDT_FEC_AUDIT = "01/01/1900";
    DET.PDT_OBS = $("#PDT_OBS").val().trim().toUpperCase();
    DET.PDT_PLAN = 0;
    return DET;
}

function ValidarDET() {
    
    if (G_PedCAB <= 0) { alert("Seleccione Pedido."); return false; }
    if ($("#PDT_INS_ID").val().length == 0) { alert("Seleccione Insumo."); return false; }
    if ($("#PDT_CANTIDAD").val().trim().length == 0) { alert("Ingrese Cantidad."); return false; }
    if (Auditado_med) { alert("Pedido con auditoria administrativa. No se permite modificación."); return false; }
    //if ($("#PDT_POR_DESC").val().trim().length == 0) { alert("Ingrese Descuento."); return false; }
    return true;
}

$("#btnGuardarDET").click(function () {
    if (!ValidarDET()) return false;
    var json = JSON.stringify({ "PedidoDet": CargarObjDet() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_PEDIDOS_DET_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d > 0) {
                CargarDetallesPED(G_PedCAB);
                $("#btnLimpiarDET").click(); //Limpiar Campos
            }
            else alert("Error al guardar detalle.");
        },
        error: errores
    });
});


$("#btnEliminarDET").click(function () {
    if (confirm("¿Desea eliminar insumo?")) {
        if (G_PDT_ID <= 0) { alert("Seleccione insumo."); return false; }
        //if (Auditado_med) { alert("Pedido con auditoria médica. No se permite modificación."); return false; }
        var json = JSON.stringify({ "PDT_ID": G_PDT_ID });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Compras/Compras.asmx/EXP_PEDIDOS_DET_DELETE",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                CargarDetallesPED(G_PedCAB);
                $("#btnLimpiarDET").click(); //Limpiar Campos
            },
            error: errores
        });
    }
});


///Autorizaciones///

$("#btnAutorizarPED").click(function () {
    if (confirm("¿Desea autorizar insumo?")) {
        if (G_PDT_ID <= 0) { alert("Seleccione insumo."); return false; }
        var json = JSON.stringify({ "Tarea": 1, "PDT_PED_ID": G_PedCAB, "PDT_ID": G_PDT_ID, "PDT_OBS": $("#PDT_OBS").val().trim().toUpperCase() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Compras/Compras.asmx/EXP_PEDIDOS_DET_AUDITAR",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                CargarDetallesPED(G_PedCAB);
                $("#btnLimpiarDET").click(); //Limpiar Campos
            },
            error: errores
        });
    }
});

//Sacar Auditar
$("#btnCancelarAutorizacion").click(function () {
    if (confirm("¿Desea deshacer autorización?")) {
        if (G_PDT_ID <= 0) { alert("Seleccione insumo."); return false; }
        var json = JSON.stringify({ "Tarea": 0, "PDT_PED_ID": G_PedCAB, "PDT_ID": G_PDT_ID, "PDT_OBS": "" });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Compras/Compras.asmx/EXP_PEDIDOS_DET_AUDITAR",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                CargarDetallesPED(G_PedCAB);
                $("#btnLimpiarDET").click(); //Limpiar Campos
            },
            error: errores
        });
    }
});


function VerPantallaCabecera() {
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 840 }, 500);
    $("#contCAB").show();
    $("#contDET").hide();
}

///Botones de barra inferior///

$("#btnVerCAB").click(function () {
    $("#btnLimpiarDET").click();
    VerPantallaCabecera();
});

$("#btnBuscarExp").click(function () {
    window.location = "Mostrar_Expedientes.aspx";
});

$("#btnVerExp").click(function () {
    if (G_ExpId > 0)
    window.location = "Compras_Expediente_Ficha.aspx?ExpId=" + G_ExpId;
});


