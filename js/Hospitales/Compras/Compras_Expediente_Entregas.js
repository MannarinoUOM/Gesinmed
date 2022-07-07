var G_PedCAB = 0;
var G_PDT_ID = 0;
var G_ExpId = 0;
var G_PEE_ID = 0; //Entrega DET
var G_PEE_NUMERO_REM = 0; //Entrega CAB
var G_Impreso = false;
var G_DURACION = 0; //Duracion del Pedido

///Autocomplete
var sourceArr = [];
var mapped = {};


$("#PDT_INS_NOM").typeahead({
    source: sourceArr,
    updater: function (selection) {
        $("#PDT_INS_NOM").val(selection); //nom
        $("#PDT_INS_ID").val(mapped[selection]); //id
        return selection;
    },
    minLength: 4,
    items: 5
});


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


function InitControls() {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.date').mask("99/99/9999", { placeholder: "-" });
    $('.date').datepicker();
    $("#btnEliminarCAB").hide();
    $("#btnCopiarCAB").hide();
    $("#btnVerDetallesPedido").hide();
    $("#contDET").hide();
    Cargar_Medicamentos(false);
    List_Depositos(true);
    SetearFecha();
}

function SetearFecha() {
    var currentDt = new Date();
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;

    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;

    var yyyy = currentDt.getFullYear();
    var d = dd + '/' + mm + '/' + yyyy;
    $("#PEE_FEC_ENTREGA").val(d);
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
    if ($("#editar").val() == "0") { $(".ver_mas_datos").hide(); } // para farmacia externa
    
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
        "NroPedidoId": 0
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
    var json = JSON.stringify({ "EXP_ID": EXP_ID });
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

            Tabla_Titulo = "<table id='TablaPedidos' class='table table-condensed'><thead><tr><th>Nro. Ped.</th><th>Ingreso</th><th>Receta</th><th>Duración</th><th>Usuario</th></tr></thead><tbody>";
            $.each(cabeceras, function (index, exp) {
                var class_row = "";
                var leyenda = "";
                if (!exp.EXP_PENDIENTE) {
                    class_row = "warning ";
                    leyenda = "<b>PEDIDO ENTREGADO</b>";
                }
                //if (exp.EXP_PED_EDITABLE)
                    Tabla_Datos += "<tr class='" + class_row + "tr_CAB' id='tr" + exp.EXP_PED_ID + "' data-placement='bottom' title='"+leyenda+"' onclick='AbrirPedidoCab(" + exp.EXP_PED_ID + ")'><td>" + exp.EXP_PED_ID + "</td><td id='EXP_PED_FECHA" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_FECHA + "</td><td>" + exp.EXP_PED_FECHA_RECETA + "</td><td id='EXP_PED_DURACION" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_DURACION + "</td><td>" + exp.EXP_PED_USU_NOM + "</td><td id='EXP_PED_OBS" + exp.EXP_PED_ID + "' style='display:none;'>" + exp.EXP_PED_OBS + "</td><td style='display:none;' id='EXP_PED_URGENTE" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_URGENTE + "</th><td style='display:none;' id='EXP_PED_FECHA_RECETA" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_FECHA_RECETA + "</th><td id='EXP_ES_60_90DIAS" + exp.EXP_PED_ID + "' style='display:none;'>" + exp.EXP_PED_ES_60_90 + "</td></tr>";
                //else
                
                // Tabla_Datos += "<tr class='" + class_row + "tr_CAB' id='tr" + exp.EXP_PED_ID + "' data-placement='bottom' title='" + leyenda + "'><td>" + exp.EXP_PED_ID + " <p style='font-weight:bold;'>(" + exp.EXP_PED_ID_ORIGEN + ")</p></td><td id='EXP_PED_FECHA" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_FECHA + "</td><td>" + exp.EXP_PED_FECHA_RECETA + "</td><td id='EXP_PED_DURACION" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_DURACION + "</td><td>" + exp.EXP_PED_USU_NOM + "</td><td id='EXP_PED_OBS" + exp.EXP_PED_ID + "' style='display:none;'>" + exp.EXP_PED_OBS + "</td><td style='display:none;' id='EXP_PED_URGENTE" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_URGENTE + "</th><td style='display:none;' id='EXP_PED_FECHA_RECETA" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_FECHA_RECETA + "</th><td id='EXP_ES_60_90DIAS" + exp.EXP_PED_ID + "' style='display:none;'>" + exp.EXP_PED_ES_60_90 + "</td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaPedidos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        error: errores
    });
}

$('body').tooltip({
    selector: '.warning',
    html: true
});

function AbrirPedidoCab(PED_ID) {
    $(".tr_CAB").css("background-color", "white");
    $(".tr_CAB").removeClass("info");
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
    if ($("#tr" + PED_ID).hasClass("warning")) {
        $("#tr" + PED_ID).toggleClass("info");
    }
    else $("#tr" + PED_ID).css("background-color", "grey");
    $("#btnEliminarCAB").show();
    $("#btnCopiarCAB").show();
    $("#btnVerDetallesPedido").show();

    //G_DURACION = $("#EXP_ES_60_90DIAS" + PED_ID).html();
    G_DURACION = $("#EXP_PED_DURACION" + PED_ID).html(); 
    //alert(G_DURACION);
    CargarEntregaCAB_by_EXPID(G_PedCAB);
}

$("#btnLimpiarCAB").click(function () {
    $(".datoCAB").val("");
    $(".datoCAB").removeAttr("checked");
    $(".tr_CAB").css("background-color", "white");
    $("#btnEliminarCAB").hide();
    $("#btnCopiarCAB").hide();
    $("#btnVerDetallesPedido").hide();
    G_PedCAB = 0;
});

function CargarDetallesPED(PDT_PED_ID) {
    var json = JSON.stringify({ "PDT_PED_ID": PDT_PED_ID });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_PEDIDOS_ENTREGAS_DET_BY_PED_ID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#btnPrint100").hide();
            $("#btnPrint").hide();
        },
        success: function (Resultado) {
            var cabeceras = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            Tabla_Titulo = "<table id='TablaPedidoDetalles' class='table table-hover table-condensed' style='font-size:11px;'><thead><tr><th>Insumo</th><th>Cantidad Pedida</th><th>% Desc.</th><th>Fecha Entrega</th><th>Entrega</th><th>Saldo</th><th>Depósito</th><th>Usuario</th></tr></thead><tbody>";
            $.each(cabeceras, function (index, exp) {
                Tabla_Datos += "<tr class='tr_DET' id='tr" + exp.PDT_ID + "' onclick='MostrarDetalle(" + exp.PDT_ID + ")'><td style='display:none;' id='ROWINDEX_" + index + "'>" + exp.PDT_ID + "</td><td style='display:none;' id='PDT_ID" + exp.PDT_ID + "'>" + exp.PDT_ID + "</td><td style='display:none;' id='PEE_NUMERO_REM" + exp.PDT_ID + "'>" + exp.PEE_NUMERO_REM + "</td><td id='PDT_INS_NOM" + exp.PDT_ID + "'>" + exp.PDT_INS_NOM + "</td><td id='PDT_CANTIDAD" + exp.PDT_ID + "'>" + exp.PDT_CANTIDAD + "</td><td id='PDT_POR_DESC" + exp.PDT_ID + "'>" + exp.PDT_POR_DESC + "</td><td id='PEE_FEC_ENTREGA" + exp.PDT_ID + "'>" + MostrarFecha(exp.PEE_FEC_ENTREGA) + "</td><td id='PEE_CANT_ENTR" + exp.PDT_ID + "'>" + exp.PEE_CANT_ENTR + "</th><td id='PDT_SALDO" + exp.PDT_ID + "'>" + exp.PDT_SALDO + "</td><td id='DEPOSITO_DESC" + exp.PDT_ID + "'>" + exp.DEPOSITO_DESC + "</th><td style='display:none;' id='PEE_PRE_UNI" + exp.PDT_ID + "'>" + exp.PEE_PRE_UNI + "</th><td style='display:none;' id='INS_ULT_PRECIO" + exp.PDT_ID + "'>" + exp.INS_ULT_PRECIO + "</th><td id='PDT_USUARIO_NOM" + exp.PDT_ID + "'>" + exp.PDT_USUARIO_NOM + "</th><td style='display:none;' id='PDT_OBS" + exp.PDT_ID + "'>" + exp.PDT_OBS + "</th><td style='display:none;' id='PDT_INS_ID" + exp.PDT_ID + "'>" + exp.PDT_INS_ID + "</th><td style='display:none;' id='PEE_DEP_ID" + exp.PDT_ID + "'>" + exp.PEE_DEP_ID + "</th><td style='display:none;' id='PEE_ID" + exp.PDT_ID + "'>" + exp.PEE_ID + "</th><td style='display:none;' id='USU_MED" + exp.PDT_ID + "'>" + exp.USU_MED + "</td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaPedidoDetalles").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        complete: function () {
            if (!G_Impreso) { //Si todavia no fue impreso...
                Print_AnalizarDescuentos();
            }
        },
        error: errores
    });
}

function MostrarFecha(Fecha) {
    if (Fecha == '01/01/1900') Fecha = "";
    return Fecha;
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

function MostrarDetalle(PDT_ID) {
    G_PDT_ID = PDT_ID;
    G_PEE_ID = $("#PEE_ID" + PDT_ID).html();
    //G_PEE_NUMERO_REM = $("#PEE_NUMERO_REM" + PDT_ID).html(); 
    $(".tr_DET").css("background-color", "white");
    $("#tr" + PDT_ID).css("background-color", "grey");
    $("#PDT_INS_ID").val($("#PDT_INS_ID" + PDT_ID).html());
    $("#PDT_CANTIDAD").val($("#PDT_CANTIDAD" + PDT_ID).html());
    $("#PEE_CANT_ENTR").val($("#PEE_CANT_ENTR" + PDT_ID).html());
    $("#PEE_PRE_UNI").val($("#PEE_PRE_UNI" + PDT_ID).html());
    //$("#PEE_FEC_ENTREGA").val($("#PEE_FEC_ENTREGA" + PDT_ID).html()); 
    $("#PDT_OBS").val($("#PDT_OBS" + PDT_ID).html());
    $("#INS_ULT_PRECIO").val($("#INS_ULT_PRECIO" + PDT_ID).html());
    $("#PDT_INS_NOM").val($("#PDT_INS_NOM" + PDT_ID).html());
    $("#PDT_SALDO").val($("#PDT_SALDO" + PDT_ID).html());
    $("#cbo_Deposito").val($("#PEE_DEP_ID" + PDT_ID).html()); 
}

$("#btnLimpiarDET").click(function () {
    $(".tr_DET").css("background-color", "white");
    $(".detalles").val("");
    $(".detalles").removeAttr("checked");
    $(".detalles").html("");
    $("#cbo_Deposito").val("0");
    G_PDT_ID = 0;
    G_PEE_ID = 0;
});

function CargarObjDet() {
    var ent = {};
    ent.PEE_ID = G_PEE_ID; //Entrega DET
    ent.PEE_NUMERO_REM = G_PEE_NUMERO_REM; //Entrega CAB
    ent.PDT_ID = G_PDT_ID; //Detalle Pedido ID
    ent.PDT_PED_ID = G_PedCAB; //Pedido CAB ID
    ent.PDT_INS_ID = $("#PDT_INS_ID").val();
    ent.PDT_CANTIDAD = $("#PDT_CANTIDAD").val().trim(); //Cant Pedida
    ent.PEE_CANT_ENTR = $("#PEE_CANT_ENTR").val().trim(); //Cant Entregada
    ent.PDT_POR_DESC = $("#PDT_POR_DESC" + G_PDT_ID).html();
    //alert(ent.PDT_POR_DESC);
    ent.PDT_SALDO = $("#PDT_SALDO").val();
    ent.PEE_MARCA = false;
    ent.PEE_FEC_ENTREGA = $("#PEE_FEC_ENTREGA").val();
    ent.PEE_PRE_UNI = $("#PEE_PRE_UNI").val();
    ent.PEE_DEP_ID = $("#cbo_Deposito :selected").val();
    ent.PDT_OBS = $("#PDT_OBS").val().trim().toUpperCase();
    return ent;
}

function ValidarDET() {
    if (G_PedCAB <= 0) { alert("Seleccione Pedido."); return false; }
    
    //if (G_PEE_NUMERO_REM <= 0) { alert("No se ha generado cabecera."); return false; }
    if ($("#PDT_INS_ID").val().length == 0) { alert("Seleccione Insumo."); return false; }
    var DESC = $("#PDT_POR_DESC" + G_PDT_ID).html();
    if ($("#USU_MED" + G_PDT_ID).html() <= 0 && DESC == 0) { alert("Insumo no auditado."); return false; }
    
    if ($("#PEE_CANT_ENTR").val().trim().length == 0) { alert("Ingrese Cantidad."); return false; }
    if ($("#PEE_CANT_ENTR").val().trim() <= 0) { alert("Ingrese Cantidad Válida."); return false; }

    if (parseInt($("#PEE_CANT_ENTR").val()) > parseInt($("#PDT_SALDO").val())) { alert("No puede entregar mas de lo pedido."); return false; }

    if ($("#PEE_FEC_ENTREGA").val().trim().length == 0) { alert("Ingrese Fecha de entrega."); return false; }
    if ($("#PEE_PRE_UNI").val().trim().length == 0) { alert("Ingrese Precio Unitario."); return false; }
    if ($("#cbo_Deposito :selected").val() == "0") { alert("Ingrese Depósito."); return false; }
    if ($("#PDT_SALDO" + G_PDT_ID).html() <= 0) {alert("El insumo ya se ha entregado.");return false;}
    return true;
}

function CargarObjCAB() {
    var PedidoCAB = {};
    PedidoCAB.PEE_NUMERO_REM = G_PEE_NUMERO_REM; //Si = 0, nuevo, sino actualizo
    PedidoCAB.PEE_EXP_ID = G_ExpId;
    PedidoCAB.PEE_PED_ID = G_PedCAB;
    return PedidoCAB;
}

$("#btnGuardarDET").click(function () {
    if (!ValidarDET()) return false;
    var json = JSON.stringify({ "EntregaCAB": CargarObjCAB(), "EntregaDet": CargarObjDet() });

    console.log(CargarObjDet());
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_PEDIDOS_ENTREGAS_DET_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d > 0) {
                G_PEE_NUMERO_REM = Resultado.d; //Nro Remito Generado
                $("#btnLimpiarDET").click(); //Limpiar Campos
                G_Impreso = false;
                CargarDetallesPED(G_PedCAB);
            }
            else alert("Error al guardar detalle.");
        },
        error: errores
    });
});


$("#btnEliminarDET").click(function () {
    if (confirm("¿Desea eliminar insumo?")) {
        if (G_PEE_ID <= 0) { alert("El insumo no posee una entrega."); return false; }
        var json = JSON.stringify({ "PEE_ID": G_PEE_ID });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Compras/Compras.asmx/EXP_PEDIDOS_ENTREGAS_DET_DELETE",
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

$("#btnEntregarTodo").click(function () {
    if ($("#cbo_Deposito :selected").val() == "0") { alert("Seleccione Depósito."); return false; }
    if (confirm("¿Desea realizar la entrega total del pedido?")) {
        CargarListaEntregas();
    }
});

//Carga detalles de entrega de la tabla en un array//
var objListaEntregasDet = new Array();

//Inserta la cabecera y luego el detalle de la entrega//
function GuardarTodo() {
    var json = JSON.stringify({ "EntregaCAB": CargarObjCAB(), "ListaEntregas": objListaEntregasDet, "Es_a_60_90": G_DURACION });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_PEDIDOS_ENTREGAS_CAB_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d > 0) {
                alert("Se ha realizado la entrega.");
                G_PEE_NUMERO_REM = Resultado.d; //Guardo numero de entrega para hacer la impresion....
                G_Impreso = false;
                CargarDetallesPED(G_PedCAB);
            }
            else {
                alert("Error al guardar entrega.");
                $("#btnPrint").hide();
                $("#btnPrint100").hide();
            }
        },
        error: errores
    });
}

function CargarListaEntregas() {
    objListaEntregasDet = new Array();
    var Cant_Filas = $('.tr_DET').size();
    $('.tr_DET').each(function (index) {
        //var PDT_ID = $("#PDT_ID" + index).html();
        var PDT_ID = $("#ROWINDEX_" + index).html();
        var DESC = $("#PDT_POR_DESC" + index).html();
        if ($("#USU_MED" + PDT_ID).html() <= 0 && DESC == 0) { alert("Existe un insumo no auditado. No se puede realizar la entrega."); return false; }
        if ($("#PDT_SALDO" + PDT_ID).html() == 0) { alert("Existe un insumo que no tiene saldo. No se puede realizar la entrega."); return false; }
        if (Cant_Filas > 0) {
            objListaEntregasDet[index] = GenerarObjEntDetalle(PDT_ID);
            Cant_Filas--;
        }
        if (Cant_Filas == 0) GuardarTodo(); //Guardo cabecera y detalle
    });
}


//Genero objeto entrega de la tabla para insertarlo en el array//
function GenerarObjEntDetalle(PDT_ID) {
    var ent = {};
    G_PDT_ID = PDT_ID;
    ent.PDT_PED_ID = G_PedCAB; //Pedido CAB ID
    ent.PDT_ID = G_PDT_ID; //Detalle Pedido ID
    ent.PEE_ID = $("#PEE_ID" + PDT_ID).html(); //Entrega DET
    //ent.PEE_NUMERO_REM = G_PEE_NUMERO_REM; //Entrega CAB

    ent.PDT_INS_ID = $("#PDT_INS_ID" + PDT_ID).html();
    ent.PDT_CANTIDAD = $("#PDT_CANTIDAD" + PDT_ID).html();  //Cant Pedida
    ent.PEE_CANT_ENTR = $("#PDT_CANTIDAD" + PDT_ID).html(); //Cant Entregada
    ent.PDT_SALDO = $("#PDT_SALDO" + PDT_ID).html();
    ent.PEE_MARCA = false;
    ent.PEE_FEC_ENTREGA = $("#PEE_FEC_ENTREGA").val();
    ent.PEE_PRE_UNI = $("#PEE_PRE_UNI" + PDT_ID).html();
    //ent.PEE_DEP_ID = $("#PEE_DEP_ID" + PDT_ID).html();
    ent.PEE_DEP_ID = $("#cbo_Deposito :selected").val(); 
    ent.PDT_OBS = $("#PDT_OBS" + PDT_ID).html();
    return ent;
}

$("#btnVerCAB").click(function () {
    $("#btnLimpiarDET").click();
    $("#btnPrint100").hide();
    $("#btnPrint").hide();
    VerPantallaCabecera();
    CargarPedidosCAB_by_EXPID($("#CargadoNroExpediente").html());
});

$("#btnBuscarExp").click(function () {
    window.location = "Mostrar_Expedientes.aspx";
});

$("#btnVerExp").click(function () {
    if (G_ExpId > 0)
        window.location = "Compras_Expediente_Ficha.aspx?ExpId=" + G_ExpId;
});


$("#btnPedidosVolver").click(function () {
    if ($("#editar").val() == "0") { return false; } // para farmacia externa
    if (G_ExpId > 0)
        window.location = "Compras_Expediente_Pedidos.aspx?ExpId=" + G_ExpId;
});

$("#btnVerEntregasAnteriores").click(function () {
    if ($("#PDT_INS_ID").val() > 0) {
        $('#modal_historial_insumo').modal('show');
        VerHistorial();
    }
    else alert("Seleccione insumo.");
});

function VerHistorial() {
    var json = JSON.stringify({ "NroExpediente": G_ExpId, "InsumoID": $("#PDT_INS_ID").val().trim() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_ENTREGAS_HISTORIAL_INSUMO_100",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var cabeceras = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            Tabla_Titulo = "<table id='historial' class='table table-hover table-condensed' style='font-size:11px;'><thead><tr><th>Insumo</th><th>Cantidad Pedida</th><th>Nro. Pedido</th><th>Entrega</th><th>Fecha Entrega</th></tr></thead><tbody>";
            $.each(cabeceras, function (index, exp) {
                Tabla_Datos += "<tr class='tr_DET' id='tr" + exp.PDT_ID + "'></td><td>" + exp.Insumo + "</td><td>" + exp.CantidadPedida + "</td><td>" + exp.NroPedido + "</td><td>" + exp.CantidadEntregada + "</td><td>" + exp.FechaEntrega + "</td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaHistorial").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        error: errores
    });
}

//Verifico si el pedido ya tiene una entrega realizada//
function CargarEntregaCAB_by_EXPID(PED_CAB_ID) {
    var json = JSON.stringify({ "PED_CAB_ID": PED_CAB_ID});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/EXP_ENTREGA_CAB_BY_PED_CAB_ID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ent_cab = Resultado.d;
            if (ent_cab != null) {
                if (ent_cab.PEE_NUMERO_REM > 0) G_PEE_NUMERO_REM = ent_cab.PEE_NUMERO_REM;
                else G_PEE_NUMERO_REM = 0;

                if (ent_cab.PEE_IMPRESO_PERMISO) {
                    G_Impreso = false;
                    Print_AnalizarDescuentos();
                    return;
                }
                if (ent_cab.PEE_IMPRESO) {
                    G_Impreso = true;
                    $("#btnPrint").hide(); //La entrega ya fue impresa...
                    $("#btnPrint100").hide();
                }
                else {
                    G_Impreso = false;
                    Print_AnalizarDescuentos();
                }
            }
            else { //Pedido sin entregar...
                $("#btnPrint").hide();
                $("#btnPrint100").hide();
                G_Impreso = true;
            }
        },
        error: errores
    });
}


$("#btnPrint").click(function () {
    //alert(G_DURACION);
    if (G_PEE_NUMERO_REM > 0)
        Imprimir("../Impresiones/Compras/Compras_ImpresionEntrega.aspx?ENT_CAB_ID=" + G_PEE_NUMERO_REM + "&Duracion=" + G_DURACION + "&PED_CAB_ID=" + G_PedCAB);
    else alert("Error en numero de remito.");
});

$("#btnPrint100").click(function () {
    if (G_PEE_NUMERO_REM > 0)
        Imprimir("../Impresiones/Compras/Compras_ImpresionEntrega100.aspx?ENT_CAB_ID=" + G_PEE_NUMERO_REM); 
    else alert("Error en numero de remito.");
});


    function Imprimir(url) {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'onClosed': function () {
                Marcar_Impreso();
            },
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
    }

    function Marcar_Impreso() {
        var json = JSON.stringify({ "PEE_REMITO_CAB": G_PEE_NUMERO_REM });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Compras/Compras.asmx/COMPRAS_ENTREGAS_CAB_IMPRESO",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            complete: function () {
                //document.location = "Compras_Expediente_Entregas.aspx?ExpId="+ G_ExpId;
                
            },
            error: errores
        });
    }

    function Print_AnalizarDescuentos() {
        if (G_Impreso) { //Ya fue impreso...
            $("#btnPrint").hide();
            $("#btnPrint100").hide();
            return false;
        }
        $('.tr_DET').each(function (index) {
            //var PDT_ID = $("#PDT_ID" + PDT_ID).html();
            var PDT_ID = $("#ROWINDEX_" + index).html(); 
            if ($("#PEE_CANT_ENTR" + PDT_ID).html() > 0) //Si el insumo posee entregas
            {
                if ($("#PDT_POR_DESC" + PDT_ID).html() != 100) { $("#btnPrint").show(); } //Habilito impresion con desc
                if ($("#PDT_POR_DESC" + PDT_ID).html() == 100) { $("#btnPrint100").show(); } //Habilito impresion al 100%
            }
        });
    }
