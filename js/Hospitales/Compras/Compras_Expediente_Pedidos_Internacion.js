var G_PedCAB = 0; //id del pedido???
var G_PDT_ID = 0; //id del presupuesto???
var G_ExpId = 0; //id del expedientE???
var areaId = 0;
var idCirugia = -1;// si es cero crea una cirugia ficticia aunque no sea necesario
var Guardo = 0;
///Autocomplete
var sourceArr = [];
var mapped = {};
var areaIdTraido = 0;
var listaPedidos = [];
var idsPedidos = [];
var pedidoCabId = 0;
var idEmcabezadoSeleccionado = 0;
var P_ID = 0;
var fechaCirugiaNew = "";
var cirugiaNew = "";
var motivoNew = "";
var cirujanoNew = 0;
var especialidadNew = 0;


$("#btnEditarInsumos").click(function () {
    LimpiarControlesInsumo();
    VerInsumos(true);
    $('#modal_historial_insumo').modal('show');
});

function VerInsumos(Todos) {
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/List_InsumosCombo",
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
                Tabla_Datos += "<tr style='text-align:left;' class='tr_insumos' data-id='" + ins.INS_ID + "' id='tr" + ins.INS_ID + "'></td><td id='td_desc" + ins.INS_ID + "' style='text-align:left;'>" + ins.INS_DESCRIPCION + "</td><input type='hidden' id='INS_RUBRO" + index + "' data-id='" + ins.INS_RUBRO + "' /></tr>";
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

$("#btnEntregas").click(function () {
    if (G_ExpId > 0)
    window.location = "Compras_Entregas_NEW_Internacion.aspx?ExpId=" + G_ExpId + "&afiliadoId=" + $("#afiliadoId").val() + "&PED_ID=" + P_ID;
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

function BuscarPorcentaje_Insumo(INS_ID, NRO_DOC) {
    var json = JSON.stringify({ "INS_ID": INS_ID, "NRO_DOC": NRO_DOC });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/COMPRAS_PEDIDOS_DESCUENTO_INSUMO_PAC",
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


function InitControls() {
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
    List_Proveedores('N');
    Cargar_Servicios_Pedido();
}


function Cargar_Servicios_Pedido() {
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/COMPRASSERVICIOTIPO",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var servicios = Resultado.d;
            $("#cboArea").append(new Option("Seleccione", 0));
            $.each(servicios, function (index, item) {
                //$("#listaServicios").append("<li><a id='" + item.id + "' class='tipoPedido' href='#' onclick='seleccionar(" + item.id + ")'>" + $.trim(item.descripcion) + "</a></li>");               
                $("#cboArea").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () {
            cargarCombo("cboMedico", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosCentListado", 2, "");
        },
        error: errores
    });
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
        Guardo = GET["GUardo"];

        if(Guardo == "")
            Buscar_Expedientes(GET["ExpId"], 0, "", 0, GET["AfiliadoId"], "", "", true, true, true, true);
        else
            Buscar_Expedientes(GET["ExpId"], 0, "", 0, 0, "", "", true, true, true, true);
    }
    if (GET["G_PedCAB"] != "" && GET["G_PedCAB"] != null) {
        G_PedCAB = GET["G_PedCAB"];
    }

    if (GET["area"] != "" && GET["area"] != null) {
        areaId = GET["area"];
    }

    if (GET["AfiliadoId"] != "" && GET["AfiliadoId"] != null) {
        $("#afiliadoId").val(GET["AfiliadoId"]);
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
        url: "../Json/Compras/ComprasInternacion.asmx/Expediente_Buscar",
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
            });
        },
        error: errores
    });
}

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
        url: "../Json/Compras/ComprasInternacion.asmx/EXP_PED_CAB_LIST_EXPID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var cabeceras = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            var fechaCirugia = "";
            var color = "";

            Tabla_Titulo = "<table style='' id='TablaPedidos' class='table table-condensed'><thead><tr style='font-size:small'><th>Nro. Pedido<t/h><th>Fecha Intervención</th><th>Cirugía Realizada</th><th>Motivo Suspensión</th></tr></thead><tbody>";
            $.each(cabeceras, function (index, exp) {
                
                if (exp.fechaInternvension == "01/01/1900") { fechaCirugia = ""; } else { fechaCirugia = exp.fechaInternvension; }

                if (exp.entregado == 1) { color = "Yellow"; } else { color = "white"; }

                Tabla_Datos += "<tr data-placement='bottom' class='tr_CAB' id='tr" + exp.EXP_PED_ID + "' onclick='AbrirPedidoCab(" + exp.EXP_PED_ID + ")' style=' background-color:" + color + "' data-color='"+ color +"'>" +

                "<td id='EXP_PED_ID" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_ID + "</td>" +
                "<td id='EXP_PED_FECHA_INTERVENSION" + exp.EXP_PED_ID + "'>" + fechaCirugia + "</td>" +
                "<td id='EXP_PED_CIRUGIA" + exp.EXP_PED_ID + "'>" + exp.cirugias + "</td>" +
                "<td id='EXP_PED_DURACION" + exp.EXP_PED_ID + "'>" + exp.motivo + "</td>" +

                "<td id='EXP_PED_FECHA_NUEVA_CIRUGIA" + exp.EXP_PED_ID + "' style='display:none'></td>" + // fehca nueva cirugia de donde sale?
                "<td id='EXP_PED_OBS" + exp.EXP_PED_ID + "' style='display:none'></td>" + // auditor
                "<td id='EXP_PED_FECHA" + exp.EXP_PED_ID + "' style='display:none'>" + exp.EXP_PED_FECHA + "</td>" +
                "<td id='EXP_PED_AREA" + exp.EXP_PED_ID + "' style='display:none'>" + exp.area + "</td>" +
                "<td style='display:none;' id='borrar_S_N" + exp.EXP_PED_ID + "'>" + exp.borrar_S_N + "</td>" +
                "<td style='display:none;' id='EXP_PED_MED" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_MED + "</td>" +
                "<td style='display:none;' id='EXP_PED_AREA_ID" + exp.EXP_PED_ID + "'>" + exp.areaId + "</td>" +
                "<td style='display:none;' id='EXP_PED_FEC_AUTORIZ" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_FEC_AUTORIZ + "</td>" +
                "<td style='display:none;'>" + exp.EXP_PED_USU_AA_NOM + "</td>" +
                "<td style='display:none;' id='EXP_PED_URGENTE" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_URGENTE + "</td>" +
                "<td style='display:none;' id='EXP_PED_FECHA_RECETA" + exp.EXP_PED_ID + "'>" + exp.EXP_PED_FECHA_RECETA + "</td></tr>";

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

//$('body').tooltip({
//    selector: '.tr_CAB',
//    html: true
//});

function ponerSuColor(){
    $(".tr_CAB").each(function (index, item) {
        $(this).css("background-color", $(this).data("color"));
    });
}

function AbrirPedidoCab(PED_ID) {
    P_ID = PED_ID;
    areaIdTraido = $("#EXP_PED_AREA_ID" + PED_ID).html();
    idEmcabezadoSeleccionado = PED_ID;

    ponerSuColor();
   // $(".tr_CAB").css("background-color", "white");
    G_PedCAB = PED_ID;
    $("#EXP_PED_ID").val(PED_ID);

    $("#EXP_PED_FECHA").val($("#EXP_PED_FECHA" + PED_ID).html());/////<<<<<<<<<<<<

    if ($("#EXP_PED_FECHA_INTERVENSION" + PED_ID).html() != "") {$("#btnFechaCirugia").html($("#EXP_PED_FECHA_INTERVENSION" + PED_ID).html()); }

    $(".bloquear").attr('disabled', true);


    
    $("#cboMedico").val($("#EXP_PED_MED" + PED_ID).html());
    $("#txtFechaAutorizacion").val($("#EXP_PED_FEC_AUTORIZ" + PED_ID).html());
    $("#EXP_PED_DURACION").val($("#EXP_PED_DURACION" + PED_ID).html());
    $("#EXP_PED_OBS").val($("#EXP_PED_OBS" + PED_ID).html());
    $("#EXP_PED_FECHA_RECETA").val($("#EXP_PED_FECHA_RECETA" + PED_ID).html());
    $("#cboArea").val(areaIdTraido);
    if ($("#EXP_PED_URGENTE" + PED_ID).html() == "true")
        $("#EXP_PED_URGENTE").attr("checked", true);
    else $("#EXP_PED_URGENTE").removeAttr("checked");
    $("#tr" + PED_ID).css("background-color", "grey");
    $("#btnEliminarCAB").show();
    $("#btnLimpiarCAB").show();
    $("#btnGuardarCAB").hide();
    $("#btnVerDetallesPedido").show();
    $("#btnEntregas").show();
}

$("#btnLimpiarCAB").click(function () {

    //alert($("#tr" + P_ID).data("color"));

    //$("#tr" + P_ID).css("background-color", $("#tr" + P_ID).data("color"));
    ponerSuColor();
    $(".datoCAB").val("");
    $(".datoCAB").removeAttr("checked");
    $("#EXP_PED_DURACION").val("30");
    //$(".tr_CAB").css("background-color", "white");
    $("#btnEliminarCAB").hide();
    $("#btnCopiar").hide();
    $("#btnVerDetallesPedido").hide();
    $("#btnLimpiarCAB").hide();
    $("#btnGuardarCAB").show();
    $("#cbo_Rubro").val("");
    $("#btn60dias").hide();
    $("#btn90dias").hide();
    $("#EXP_PED_FECHA").val(FechadelDia());
    $("#btnFechaCirugia").html("Seleccione");
    $("#cboArea").val(0);
    $(".bloquear").attr('disabled', false);
    $("#btnEntregas").hide();
    G_PedCAB = 0;
});


$("#btnEliminarCAB").click(function () {
    //alert($("#borrar_S_N" + idEmcabezadoSeleccionado).html()); return false;

//    if ($("#borrar_S_N" + idEmcabezadoSeleccionado).html() == "0") {
//        alert("Este pedido no se puede borrar porque que ya fue enviado al proveedor.");
//        return false;
//    }



    var json = JSON.stringify({ "EXP_PED_ID": G_PedCAB });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/COMPRAS_CHEKEAR_SI_BORRA_PRESUPUESTO_INTERNACION",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
     
            if (Resultado.d == 0) {
                alert("No se puede borrar! (orden de compra ya generada o presupuesto ya auditado.)");
                return false;
            } else {

                if (confirm("¿Desea eliminar el pedido?")) {
                    EliminarPedido(G_PedCAB);
                }
            }
        },
        error: errores
    });
});

function EliminarPedido(NroPedidoCAB) {
    var json = JSON.stringify({ "NroPedidoCAB": NroPedidoCAB });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/COMPRAS_EXP_PEDIDOS_CAB_BAJA",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            alert("Pedido dado de baja.");
            window.location = "Compras_Expediente_Pedidos_Internacion.aspx?ExpId=" + $("#CargadoNroExpediente").html();
        },
        error: errores
    });
}


var Es_a_60_90 = false;

//$("#btnCopiar").click(function () {
//    if ($("#EXP_PED_ID").val().trim().length == 0) { alert("Seleccione un pedido."); return false; }
//    if (confirm("¿Desea copiar el pedido?")) {
//        Es_a_60_90 = false;
//        CopiarPedido($("#EXP_PED_ID").val().trim());
//    }
//});

//$("#btn60dias").click(function () {
//    if ($("#EXP_PED_ID").val().trim().length == 0) { alert("Seleccione un pedido."); return false; }
//    if (confirm("¿Desea copiar el pedido a 60 días?")) {
//        $("#EXP_PED_DURACION").val("60"); //Duracion = 60 dias...
//        Es_a_60_90 = true;
//        CopiarPedido($("#EXP_PED_ID").val().trim());
//    }
//});

//var Contador_pedidos = 0;

//$("#btn90dias").click(function () {
//    if ($("#EXP_PED_ID").val().trim().length == 0) { alert("Seleccione un pedido."); return false; }
//    if (confirm("¿Desea copiar el pedido a 90 días?")) {
//        if (Contador_pedidos == 0) $("#EXP_PED_DURACION").val("60"); //Duracion = 60 dias, primera copia

//        Es_a_60_90 = true;
//        CopiarPedido_x_dos($("#EXP_PED_ID").val().trim());
//    }
//});

function CopiarPedido(PedidoID) {
    //H2_COMPRAS_EXP_PEDIDOS_CAB_COPIAR
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
    //alert(idCirugia);
    var PedidoCAB = {};
    if ($("#EXP_PED_ID").val().trim().length == 0) PedidoCAB.EXP_PED_ID = 0;
    else PedidoCAB.EXP_PED_ID = $("#EXP_PED_ID").val();
    PedidoCAB.EXP_PED_EPA_ID = 0; //(Sin Entrega)
    PedidoCAB.EXP_PED_FECHA = $("#EXP_PED_FECHA").val();
    PedidoCAB.EXP_PED_FECHA_RECETA = $("#EXP_PED_FECHA_RECETA").val();
    PedidoCAB.EXP_PED_OBS = $("#EXP_PED_OBS").val().trim().toUpperCase();
    //PedidoCAB.EXP_PED_DURACION = $("#EXP_PED_DURACION").val();
    PedidoCAB.EXP_PED_DURACION = 0;
    PedidoCAB.EXP_PED_FEC_AUTORIZ = "01/01/1900";
    PedidoCAB.EXP_PED_MED = $("#cboMedico").val();

    PedidoCAB.EXP_PED_URGENTE = $("#EXP_PED_URGENTE").is(":checked");
    PedidoCAB.EXP_PED_EXP_ID = $("#CargadoNroExpediente").html();
    PedidoCAB.EXP_PED_FEC_AUDIT = "01/01/1900"; //Valor por default
    PedidoCAB.EXP_PED_ESTADO = true; //Activo por default
    PedidoCAB.idCirugia = idCirugia;
    PedidoCAB.fechaCirugiaNew = fechaCirugiaNew;
    PedidoCAB.cirugiaNew = cirugiaNew;
    PedidoCAB.motivoNew = motivoNew;
    PedidoCAB.cirujanoNew = cirujanoNew;
    PedidoCAB.especialidadNew = especialidadNew;
    //PedidoCAB.areaId = areaId;
    PedidoCAB.areaId = $("#cboArea").val();
    return PedidoCAB;
}

function ValidarCAB() {
    if ($("#EXP_PED_FECHA").val().trim().length == 0) { alert("Ingrese fecha de pedido."); return false; }
    //if ($("#txtFechaAutorizacion").val().trim().length == 0) { alert("Ingrese fecha de Autorización."); return false; }
    //if ($("#btnFechaCirugia").text() == "Seleccione") { alert("Ingrese fecha de Intervención."); return false; }
    if ($("#cboMedico").val() == 80001742) { alert("Seleccione Médico."); return false; }
    if ($("#EXP_PED_FECHA_RECETA").val().trim().length == 0) { alert("Fecha de prescripción médica."); return false; }
    if ($("#cboArea").val() == 0) { alert("Seleccione servicio."); return false; }
    return true;
}

$("#btnGuardarCAB").click(function () {
    if (!ValidarCAB()) return false; //Validar datos ingresados para CAB

    var json = JSON.stringify({ "PedidoCAB": CargarObjCAB() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/EXP_PEDIDOS_CAB_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            G_PedCAB = Resultado.d;
            if (G_PedCAB > 0) {
                alert("Guardado.");
                window.location = "Compras_Expediente_Pedidos_Internacion.aspx?ExpId=" + $("#CargadoNroExpediente").html() + "&G_PedCAB=" + G_PedCAB + "&Guardo=1";
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
        url: "../Json/Compras/ComprasInternacion.asmx/EXP_PED_DET_LIST_ID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var cabeceras = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            var chekeado = "";
            Tabla_Titulo = "<table id='TablaPedidoDetalles' class='table table-condensed' style='font-size:11px; text-align:center;'>" +
            "<thead><tr>" +
            "<th style='width:8%'></th>" +
            "<th style='width:10%; font-size:large'><b>Nro. Pedido</b></th>" +

            "<th style='width:25%; font-size:large'><b>Proveedor</b></th>" +
            "<th style='width:8%; font-size:large'><b>Servicio</b></th>" +
            "<th style='width:8%; font-size:large; display:none'><b>Cantidad</b></th>" +
            "<th style='width:8%; font-size:large'><b>Importe Total</b></th>" +

            "<th style='width:20%; font-size:large'><b>Receta y Presupuesto</b></th>" +
            "<th style='width:20%; font-size:large'><b>O. de Compra</b></th>" +
            "</tr></thead><tbody>";
            $.each(cabeceras, function (index, exp) {
                var estadoColor = "";
                var mostrarBtnEliminar = "";
                var mostrarCheckElimiar = "";
                var cursor = "";
                //alert(exp.PDT_ESTADO);
                switch (exp.PDT_ESTADO) {
                    case -1:
                        chekeado = "";
                        estadoColor = "white";
                        mostrarBtnEliminar = "inline";
                        mostrarCheckElimiar = "none";
                        cursor = "pointer";
                        break;
                    case 0:
                        estadoColor = "yellow";
                        mostrarBtnEliminar = "none";
                        mostrarCheckElimiar = "inline";
                        cursor = "default";
                        chekeado = "checked='checked'";
                        break;
                    case 1:
                        estadoColor = "yellow";
                        mostrarBtnEliminar = "none";
                        mostrarCheckElimiar = "none";
                        cursor = "default";
                        break;
                    case 2:
                        estadoColor = "yellow";
                        mostrarBtnEliminar = "none";
                        mostrarCheckElimiar = "none";
                        cursor = "pointer";
                        chekeado = "";
                        idsPedidos.push(exp.PDT_ID);
                        break;
                }
             
                Tabla_Datos += "<tr style='background-color:" + estadoColor + "' class='tr_DET' id='trDet" + exp.PDT_ID + "' >" +
                "<td  style='cursor:" + cursor + "'><a id='btnEliminar" + exp.PDT_ID + "' onclick='BorrarDetalle(" + exp.PDT_ID + ")' class='btn btn-mini btn-danger' style='display:" + mostrarBtnEliminar + ";width:100%'><i class='icon-remove-circle'></i>&nbsp;Eliminar</a>" + /// boton eliminar presupuesto
                "<td onclick='MostrarDetalle(" + exp.PDT_ID + ")' id='PDT_ID" + exp.PDT_ID + "'  style='cursor:" + cursor + "'>" + EXP_PED_ID + "</td>" + /// numero de pedido
                "<td onclick='MostrarDetalle(" + exp.PDT_ID + ")' style='cursor:" + cursor + "'>" + exp.PDT_PROVEEDOR_NAME + "</td>" + // proveedor
                "<td onclick='MostrarDetalle(" + exp.PDT_ID + ")' style='cursor:" + cursor + "'>" + exp.PDT_TIPO + "</td>" + // servicio
                "<td onclick='MostrarDetalle(" + exp.PDT_ID + ")' style='cursor:" + cursor + "; display:none'>" + exp.PDT_CANTIDAD + "</td>" + // cantidad
                "<td onclick='MostrarDetalle(" + exp.PDT_ID + ")' style='cursor:" + cursor + "'>$ " + exp.PDT_IMPORTE * exp.PDT_CANTIDAD + "</td>" + // importe
                "<td  id='PDT_PRESUPUESTO" + exp.PDT_ID + "' style='cursor:" + cursor + "'><a id='btnVerPresupuesto" + exp.PDT_ID + "' onclick='VerPresupuesto(" + exp.PDT_ID + ")' class='btn btn-mediuim btn-primary' style='width:100%'>Ver Receta y Presupuesto</a></td>" + // boton presupuesto
                "<td onclick='MostrarDetalle(" + exp.PDT_ID + ")' style='cursor:" + cursor + "; display:none'><input id='PDT_PEDIDO" + exp.PDT_ID + "' type='checkbox' style='display:" + mostrarCheckElimiar + "' onclick='borrarPedido(" + exp.PDT_ID + ")' " + chekeado + "/></td>" + // orden de compra generada check
                "<td onclick='MostrarDetalle(" + exp.PDT_ID + ")' style='cursor:" + cursor + "'><label style='display:" + mostrarCheckElimiar + "'><b>GENERADA</b></label></td>" + // orden de compra generada


                "<td style='display:none;' id='PDT_ESTADO" + exp.PDT_ID + "'>" + exp.PDT_ESTADO + "</td>" +
                "<td style='display:none;' id='PDT_COLOR" + exp.PDT_ID + "'>0</td>" +
                "<td style='display:none;' id='borrar_S_N" + exp.PDT_ID + "'>" + exp.borrar_S_N + "</td>" + ///
                "<td style='display:none;' id='PDT_FEC_AUDIT" + exp.PDT_ID + "'>" + exp.PDT_FEC_AUDIT + "</td>" +
                "<td style='display:none;' id='PDT_USU_AUDIT_NOM" + exp.PDT_ID + "'>" + exp.PDT_USU_AUDIT_NOM + "</th>" +
                "<td style='display:none;' id='PDT_OBS" + exp.PDT_ID + "'>" + exp.PDT_OBS + "</th>" +
                "<td style='display:none;' id='PDT_INS_ID" + exp.PDT_ID + "'>" + exp.PDT_INS_ID + "</th>" +
                "<td style='display:none;' id='PDT_SALDO" + exp.PDT_ID + "'>" + exp.PDT_SALDO + "</th>" +
                "<td style='display:none;' id='PDT_PROVEEDOR_ID" + exp.PDT_ID + "'>" + exp.PDT_PROVEEDOR + "</th></tr>";

            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaPedidoDetalles").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        error: errores
    });
}


function VerPresupuesto(PDT_ID) {

    G_PDT_ID = PDT_ID;
    //alert(G_PDT_ID);
    $.fancybox({
        'href': "../Compras/Compras_Nuevo_Presupuesto_Internacion.aspx",
        'width': '60%',
        'height': '90%',
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


function EditarDetalle(id) {
//    alert(G_PDT_ID);
//    alert($("#PDT_INS_NOM" + id).html());
//    alert($("#PDT_TIPO" + id).html());
//    alert($("#PDT_CANTIDAD" + id).html());
//    alert($("#PDT_PROVEEDOR" + id).html());
//    alert($("#PDT_PROVEEDOR_ID" + id).html());
//    alert($("#PDT_IMPORTE" + id).html());

    G_PDT_ID = id;
    $("#txtInsumo").val($("#PDT_INS_NOM" + id).html());
    $("#txtTipo").val($("#PDT_TIPO" + id).html());
    $("#txtCantidad").val($("#PDT_CANTIDAD" + id).html());
    $("#cbo_Proveedor").val($("#PDT_PROVEEDOR_ID" + id).html());
    $("#txtImporte").val($("#PDT_IMPORTE" + id).html());
}


function borrarPedido(id) {
    // alert($("#borrar_S_N" + id).html());

    var json = JSON.stringify({ "PDT_ID": id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/COMPRAS_CHEKEAR_PRESUPUESTO_ENVIADO_INTERNACION",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {

            if (resultado.d == 1) {
                var respuesta = confirm("Esta seguro que desea borrar el pedido?");
                if (respuesta) {
                    var json = JSON.stringify({ "id": id });
                    $.ajax({
                        type: "POST",
                        data: json,
                        url: "../Json/Compras/ComprasInternacion.asmx/EXP_PEDIDOS_DESPEDIR_INTERNACION",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (resultado) {
                            //alert(resultado.d);
                            if (resultado.d == 0) { pedidoCabId = 0; }
                            CargarDetallesPED(G_PedCAB);
                        },
                        error: errores
                    });
                } else { $("#PDT_PEDIDO" + id).attr('checked', true); }
            } else {
                alert("Este insumo no se puede borrar por que ya fué generada la orden de compra.");
                $("#PDT_PEDIDO" + id).attr('checked', true);
            }
        },
        error: errores
    });

}

//    if ($("#borrar_S_N" + id).html() == 1) {
//      
//}



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
        window.location = "Compras_Expediente_Ficha_Internacion.aspx?ExpId=" + G_ExpId;
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

//verifica si el insumo seleccionado ya tiene una orden de compra generada por medio del estado del control checbox.
//caso contario verifica si esta auditado para poder continuar
function MostrarDetalle(PDT_ID) {

    if (!$("#PDT_PEDIDO" + PDT_ID).is(':checked')) { recordar_seleccion(PDT_ID); }
    ///if ($("#PDT_COLOR" + PDT_ID).html() == 1) {  }
   
}

////////////////////////////////////////////
function recordar_seleccion(PDT_ID) {
    // saca item de presupuesto para la seleccion de consideracion
    if ((jQuery.inArray(PDT_ID, idsPedidos)) >= 0) {

        chekearAuditoria(PDT_ID);// si esta en amarillo sin check verifico si esta auditado

    } else {
        // mete item de presupuesto para la seleccion de consideracion
        //alert("mete");
        var json = JSON.stringify({ "id": PDT_ID });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Compras/ComprasInternacion.asmx/RECORDARSELECCION",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {

                idsPedidos.push(PDT_ID);
                $("#trDet" + PDT_ID).css("background-color", "yellow");
                $("#PDT_COLOR" + PDT_ID).html(1);
                $("#btnEliminar" + PDT_ID).hide();
                $("#btnEditar" + PDT_ID).hide();

            },
            error: errores
        });
    }
}
///////////////////////////////////////////////////////////////////
function chekearAuditoria(PDT_ID) {
    //var auditado = 0;
    var json = JSON.stringify({ "PDT_ID": PDT_ID });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/COMPRAS_CHEKEAR_AUDITORIA_INTERNACION",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            if (resultado.d == 0) {
                //alert("saca");
                var json = JSON.stringify({ "id": PDT_ID });
                $.ajax({
                    type: "POST",
                    data: json,
                    url: "../Json/Compras/ComprasInternacion.asmx/RECORDARSELECCION",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {

                        idsPedidos.splice((jQuery.inArray(PDT_ID, idsPedidos)), 1);
                        $("#trDet" + PDT_ID).css("background-color", "white");
                        $("#PDT_COLOR" + PDT_ID).html(0);
                        $("#btnEliminar" + PDT_ID).show();
                        $("#btnEditar" + PDT_ID).show();
                    },
                    error: errores
                });
            } else {

                // id del item del detalle del presupuesto
                //G_PDT_ID = PDT_ID;
                alert("Este insumo ya ha sido auditado por lo tanto no se puede deseleccionar");
                return false;
            }
        },
        error: errores
    });
}          

////////////////////////////////////////////////////////////////////////////

$("#btnPedir").click(function () {
    //    alert(idsPedidos.length);
    //    return false;

    if (idsPedidos.length == 0) { alert("Seleccione algún insumo."); return false; }

    //$.each(idsPedidos, function (index, item) { alert("anterior: " + item); });

    //    var json = JSON.stringify({ "idsPedidos": idsPedidos.toString() });
    //    $.ajax({
    //        type: "POST",
    //        data: json,
    //        url: "../Json/Compras/ComprasInternacion.asmx/COMPRAS_CHEKEAR_AUDITORIA_INTERNACION_TODOS",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (resultado) {
    //            var lista = resultado.d;
    //            idsPedidos.length = 0;
    //            $.each(lista, function (index, item) { idsPedidos.push(item.id); });
    //        },
    //        error: errores,
    //        complete: function () {
    //    $.each(idsPedidos, function (index, item) { alert("posterior: " + item); }); 


//    alert("G_PedCAB//" + G_PedCAB + "//ORDEN_COM_CAB_ID//" + pedidoCabId + "//ORDEN_COM_CAB_SECTOR//" + areaIdTraido + "//ORDEN_COM_CAB_PRV_ID//" + 0 + "//idsPedidos//" + idsPedidos.toString());
//    return false;

    if (idsPedidos.length > 0) {
        var f = new Date();

        var json = JSON.stringify({ "G_PedCAB": G_PedCAB, "ORDEN_COM_CAB_ID": pedidoCabId, "ORDEN_COM_CAB_SECTOR": areaIdTraido, "ORDEN_COM_CAB_ENVIADO": true, "ORDEN_COM_CAB_PRV_ID": 0, "idsPedidos": idsPedidos.toString() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Compras/ComprasInternacion.asmx/COMORDENCABINSERTINTERNACION",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                alert("Se ha generado la orden de compra para los presupuestos seleccionados.");
                CargarDetallesPED(G_PedCAB);
            },
            complete: function () { idsPedidos.length = 0; },
            error: errores
        });
    } //else { alert("Los pedidos seleccionados no han sido auditados aun."); }
    //   }
    // });

});


function relacionarPedioOrdenCompra(id) {
    var idsPedidosString = "";
    idsPedidosString = idsPedidos.join(',');
     var json = JSON.stringify({ "idCAB_PRIMARIO": G_PedCAB, "idCAB_ORDEN": id, "idsDET_ITEMS": idsPedidosString });
     $.ajax({
         type: "POST",
         data: json,
         url: "../Json/Compras/ComprasInternacion.asmx/RELACIONARPEDIDOORDENCOMPRA",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function () {
             
             CargarDetallesPED(G_PedCAB);
         },
         //complete: function () { idsPedidos.length = 0 },
         error: errores
     });
 }


 $("#btnLimpiarDET").click(function () {
//     $(".tr_DET").each(function (index, item) { alert($(this).attr('id')); });
//     return false;
//     $(".tr_DET").css("background-color", "white");
     $(".detalles").val("");
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
    DET.PDT_INS = $("#txtInsumo").val().trim().toUpperCase();
    DET.PDT_CANTIDAD = $("#txtCantidad").val().trim();
    DET.PDT_SALDO = $("#txtCantidad").val().trim();
    DET.PDT_TIPO = $("#txtTipo").val();
    DET.PDT_PROVEEDOR = $("#cbo_Proveedor :selected").val();
    DET.PDT_FEC_AUDIT = "01/01/1900";
    if ($("#txtImporte").val().trim().length == 0) {DET.PDT_IMPORTE = 0; } else {
        DET.PDT_IMPORTE = $("#txtImporte").val().trim();
    }
    DET.PDT_ESTADO = 0;
    return DET;
}

//function ValidarDET() {
//    if (G_PedCAB <= 0) { alert("Seleccione Pedido."); return false; }
//    if ($("#txtInsumo").val().trim().length == 0) { alert("Ingrese Insumo."); return false; }
//    if ($("#txtTipo").val().trim().length == 0) { alert("Ingrese Tipo."); return false; }
//    if ($("#txtCantidad").val().trim().length == 0) { alert("Ingrese Cantidad."); return false; }
//    if ($("#txtProveedor").val() == 0) { alert("Ingrese Proveedor."); return false; }
//    if ($("#cbo_Proveedor").val() == 0) { alert("Ingrese Proveedor."); return false; }
//    return true;
//}

$("#btnGuardarDET").click(function () {
    if (!ValidarDET()) return false;
    var json = JSON.stringify({ "PedidoDet": CargarObjDet() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/EXP_PEDIDOS_DET_INSERT",
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

function BorrarDetalle(id) {
var r = confirm("Desea eliminar el presupuesto?")

if (r) {
    var json = JSON.stringify({ "PDT_ID": id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/EXP_PEDIDOS_DET_DELETE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            CargarDetallesPED(G_PedCAB);
            $("#btnLimpiarDET").click(); //Limpiar Campos
        },
        error: errores
    });
}
}

///Generar Nuevo Presupuesto///
$("#btnGenerarNuevo").click(function () {
    G_PDT_ID = 0; 

    $.fancybox({
        'href': "../Compras/Compras_Nuevo_Presupuesto_Internacion.aspx?nuevo=1",
        'width': '60%',
        'height': '90%',
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
    window.location = "Mostrar_Expedientes_Internacion.aspx";
});

$("#btnVerExp").click(function () {
    if (G_ExpId > 0)
        window.location = "Compras_Expediente_Ficha_Internacion.aspx?ExpId=" + G_ExpId;
});


$("#btnFechaCirugia").click(function () {

    $.fancybox({
        'href': "../Compras/cirugiasComprasInternacion.aspx",
        'width': '100%',
        'height': '90%',
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
        },
        'onClosed': function () {
            if ((fechaCirugiaNew.length > 0) && (cirugiaNew.length > 0)) {
                idCirugia = 0;
                $("#btnFechaCirugia").text(fechaCirugiaNew);
                if (cirujanoNew > 0) {
                    $("#cboMedico").val(cirujanoNew);
                    $("#cboMedico").attr('disabled', true);
                }
            }
        }
    });
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
             $("#cbo_Proveedor").append($("<option></option>").val("0").html(""));
             $.each(Lista, function (index, Proveedor) {
                 $("#cbo_Proveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
             });
         },
         error: errores,
         complete: function () {
             $("#desdeaqui").show();
             $("#btnRemitos").show();
             //$("#cbo_Proveedor").val(ProveedorId);
             $("#CargadoProveedor").html($("#cbo_Proveedor :selected").text());
         }
     });
 }




