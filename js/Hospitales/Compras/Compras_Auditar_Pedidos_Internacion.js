var oTabla;

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
    }
});

function Buscar_Pedidos(FechaDesde, FechaHasta, NroPedDesde, NroPedHasta, Insumo_nom, Paciente, Seccional, ConAuditoriaMed) {
    if (FechaDesde.length == 0) FechaDesde = '01/01/1900';
    if (FechaHasta.length == 0) FechaHasta = '01/01/1900';
    if (NroPedDesde.length == 0) NroPedDesde = 0;
    if (NroPedHasta.length == 0) NroPedHasta = 0;
    if (FechaHasta.length == 0) FechaHasta = '01/01/1900';

    var json = JSON.stringify({ "FechaDesde": FechaDesde, "FechaHasta": FechaHasta, "NroPedDesde": NroPedDesde, "NroPedHasta": NroPedHasta, "Insumo_nom": Insumo_nom,
        "Paciente": Paciente, "Seccional": Seccional, "ConAuditoriaMed": ConAuditoriaMed
    });

    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/COMPRAS_AUDITAR_PEDIDOS_LIST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            var Pedidos = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $.each(Pedidos, function (index, exp) {
                var _Urg = "No";
                if (exp.Urgente) _Urg = "Si";
        
                Tabla_Datos += "<tr id='tr" + index + "' rel='" + index + "' class='fila'>" +
                "<td><input data-pedido='" + exp.NroPed + "' data-id='" + index + "'  data-PedidoDetId='" + exp.PedidoDetId + "'  id='chk" + index + "' class='checks' type='checkbox' value='" + exp.PedidoDetId + "' style='height:20px;width:20px'/></td>" +
                "<td><a class='btn btn-mini'  onclick='DatosExpediente(" + exp.NroPed + ")'>Ver datos</></td>" +
                "<td id='EXP_ID" + exp.NroPed + "' style='display:none;'>" + exp.ExpId + "</td>" +
                "<td>" + exp.Afiliado + "</td>" +
                "<td id='EXP_PED_FECHA" + exp.NroPed + "'>" + exp.NroPed + "</td>" +
                "<td onclick='VerDocumentos(" + exp.PedidoDetId + ")'><a class='btn btn-mini'>Ver documentos</></td>" +
                "<td >" + exp.FReceta + "</td>" +

                "<td >" + exp.FAuditado + "</td>" +
                "<td >" + exp.Auditor + "</td>" +
                "<td >" + exp.FIngreso + "</td>" +
                "<td >" + exp.Usu_Ing + "</td>" +
                "<td >" +
                "<td id='PDT_ESTADO" + exp.PedidoDetId + "' style='display:none'>" + exp.PDT_ESTADO + "</td>";

            });
            Tabla_Fin = "</tbody></table>";
            $("#example").html(Tabla_Datos + Tabla_Fin);
            $("#lbl_CantidadReg").html(Pedidos.length);
        },
        beforeSend: function () {
            $("#cargando").show();
            $(".datosEXP").hide();
            $("#TablaPedidos").hide();
            $("#lbl_CantidadReg").html("0");
            $(".input-exp").val("");
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaPedidos").show();

            $(".datosEXP").show();
            $("#example").DataTable();
            $(".sorting_asc").click();
            $(".sorting_desc").click();
        },
        error: errores
    });
}


///// ver documentos del presupuesto con pantalla anterior
function VerDocumentos(PDT_ID) {

    $.fancybox({
        'href': "../Compras/Compras_Nuevo_Presupuesto_Internacion.aspx?PDT_ID=" + PDT_ID,
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
///// ver documentos del presupuesto con pantalla anterior


//$(document).on('click', '.checks', function () {

//    var index = $(this).data("id");
//    var nroped = $(this).data("pedido");
//    var pedidodetid = $(this).data("pedidodetid");

//    var json = JSON.stringify({ "id": pedidodetid });
//    //    alert($(this).attr('checked'));

//    $.ajax({
//        type: "POST",
//        url: "../Json/Compras/ComprasInternacion.asmx/COMPRAS_COMPROBAR_AUDITORIA",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        data: json,
//        success: function (resultado) {
//            if (resultado.d == 0) {
//                alert("No se puede cancelar la auditoría del insumo seleccionado debido a que ya fué generada la orden de compra.");
//                $("#chk" + index).attr("checked", false);
//                $("#tr" + index).css('background-color', 'white');
//            } else {
//                ChangeColor($("#tr" + index));
//                CargarExpediente_Pie(nroped);

//            }
//        },
//        error: errores
//    });
//});
var ult_index = {};

function ChangeColor(obj) {
    $(ult_index).css("background-color", "white");
    ult_index = obj;
     $(obj).css("background-color", "#999999");
}

function DatosExpediente(NroPed) {
    if (NroPed > 0) CargarExpediente_Pie(NroPed);
    else alert("Nro. de Pedido no válido.");
}

function CargarExpediente_Pie(NroPed) {
    if ($("#EXP_ID" + NroPed).html() > 0)
        Buscar_Expedientes($("#EXP_ID" + NroPed).html(), 0, "", 0, 0, "", "", true, true, true, true);
    else alert("Nro. Expediente no válido.");
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
                $("#txtNroExpediente").val(exp.EXP_ID);
                $("#txtDNI").val(exp.EXP_NRO_DOC);
                $("#txtSeccional").val(exp.EXP_SECCIONAL);
                $("#txtApellido").val(exp.EXP_NOMBRE);
                $("#txtVencExp").val(exp.EXP_VENC_FECHA);
                $("#txtPatologia").val(exp.EXP_PATOLOGIAS);
                $("#txtFecha").val(exp.EXP_FEC_NAC);
                $("#txtObservaciones").val(exp.EXP_OBS);
            });
        },
        error: errores
    });
}


$("#btnDeseleccionar").click(function () {
    $("#txtNroExpediente").val("");
    $("#txtDNI").val("");
    $("#txtSeccional").val("");
    $("#txtApellido").val("");
    $("#txtVencExp").val("");
    $("#txtPatologia").val("");
    $("#txtFecha").val("");
    $("#txtObservaciones").val("");

    $(".fila").css("background-color", "White");

});


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_Seccionales() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Seccionales_Cargado,
        complete: function () {
            Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#txtNroPedidoDesde").val(), $("#txtNroPedidoHasta").val(), $("#medicamento").val().trim(),
            $("#Paciente").val().trim(), $("#cbo_Seccional :selected").val(), $("#chk_SinAuditoriaMed").is(":checked"));
        },
        error: errores
    });
}

function List_Seccionales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Seccional").append($("<option></option>").val("0").html("Seleccione Seccional..."));
    $.each(Lista, function (index, Seccional) {
        $("#cbo_Seccional").append($("<option></option>").val(Seccional.Nro).html(Seccional.Seccional));
    });

}

function InitControls() {
    $('.date').mask("99/99/9999", { placeholder: "-" });
    $('.date').datepicker();
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaDesde").val(p);
    $("#txtFechaHasta").val(d);
    List_Seccionales();
    LoadDataTable();
}

function LoadDataTable() {
    oTabla = $('#example').DataTable({
        "bAutoWidth": false,
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "140px",
        "sScrollX": "100%",
        "sScrollXInner": "400%",
        "sScrollYInner": "100%",
        "bScrollCollapse": true,
        fixedHeader: {
            header: true,
            footer: false
        }
    });
}



$("#btnBuscar").click(function () {
    Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#txtNroPedidoDesde").val(), $("#txtNroPedidoHasta").val(), $("#medicamento").val().trim(),
            $("#Paciente").val().trim(), $("#cbo_Seccional :selected").val(), $("#chk_SinAuditoriaMed").is(":checked"));
});

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
////Opciones Pie////

//Confirmar Auditoria//
var objPedidosDet = "";

$("#btnConfirmar").click(function () {
    if (confirm("¿Desea confirmar la auditoria de los insumos seleccionados?")) {
        //if ($("#txt_PorcentajeNuevo").val().trim().length == 0) { alert("Ingrese Porcentaje."); return false; }
        objPedidosDet = "";
        $(".checks").each(function () {
            if ($(this).is(":checked")) objPedidosDet += $(this).val() + ",";
        });
        objPedidosDet.slice(0, -1);
        if (objPedidosDet.length == 0) { alert("No hay pedidos seleccionados."); return false; }
        ConfirmarAuditoria(true); //Confirma
    }
});

function verificarBajaAuditoria(PDT_IDS) {
    var retorno;
    var json = JSON.stringify({ "PDT_IDS": PDT_IDS });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/verificar_Baja_Auditoria",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) { retorno = Resultado.d; alert(retorno); },
        error: errores
    });
    return retorno;
}

$(".checks").click(function () { });



$("#btnCancelar").click(function () {

    if (confirm("¿Desea cancelar la auditoria de los insumos seleccionados?")) {
        objPedidosDet = "";
        idsPedidosEnviados = "";

        $(".checks").each(function () { if ($(this).is(":checked")) objPedidosDet += $(this).val() + ","; });

        objPedidosDet.slice(0, -1);
        if (objPedidosDet.length == 0) { alert("No hay pedidos seleccionados."); return false; }
        else {
            var json = JSON.stringify({ "PDT_IDS": objPedidosDet });
            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/Compras/ComprasInternacion.asmx/verificar_Baja_Auditoria",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) { if (Resultado.d) {  ConfirmarAuditoria(false); } else { alert("La seleccion contiene algún presupuesto con orden de compra generada y no se puede cancelar."); } },
                error: errores
            }); 
        }


        //if (verificarBajaAuditoria) { alert("cancela"); /*ConfirmarAuditoria(false);*/ } else { alert("La seleccion contiene algún presupuesto con orden de compra generada y no se puede cancelar."); }

    }
});

function ConfirmarAuditoria(Confirma) {
  
    //  var Porcentaje_Nuevo = $("#txt_PorcentajeNuevo").val().trim();
    var Porcentaje_Nuevo = 100;
   if (!Confirma) Porcentaje_Nuevo = 0; //Cancela Auditoria

    var json = JSON.stringify({ "objDetallesIds": objPedidosDet, "Confirma": Confirma, "Porcentaje": Porcentaje_Nuevo });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/ComprasInternacion.asmx/COMPRAS_CONFIRMAR_AUDITORIA",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            if (Resultado.d > 0) {
                var msj = "Se desconfirmaron " + Resultado.d + " pedidos.";
                if (Confirma == 1) msj = "Se confirmaron " + Resultado.d + " pedidos.";
                alert(msj);
                Buscar_Pedidos($("#txtFechaDesde").val(), $("#txtFechaHasta").val(), $("#txtNroPedidoDesde").val(), $("#txtNroPedidoHasta").val(), $("#medicamento").val().trim(),
                $("#Paciente").val().trim(), $("#cbo_Seccional :selected").val(), $("#chk_SinAuditoriaMed").is(":checked"));
            }
            else alert("No se han modificado los pedidos.");
        },
        error: errores
    });
}

///Opciones//

$("#btnPedidos").click(function () {
    if ($("#txtNroExpediente").val() > 0)
        window.location = "Compras_Expediente_Pedidos.aspx?ExpId=" + $("#txtNroExpediente").val();
});

$("#btnVerExp").click(function () {
    if ($("#txtNroExpediente").val() > 0)
        window.location = "Compras_Expediente_Ficha.aspx?ExpId=" + $("#txtNroExpediente").val();
});

$("#btnHC").click(function () {
    if ($("#txtDNI").val().trim().length > 0)
        window.location = "../HistoriaClinica/BuscarPacienteHC.aspx?C=2&DNI=" + $("#txtDNI").val();
});


$("#btnVerDocu").click(function () {
    if ($("#txtNroExpediente").val() > 0) {
        $("#myModal").modal({ backdrop: 'static', keyboard: false });
        ListaDocumentacion_Exp($("#txtNroExpediente").val()); //Muestra los escaneos del expediente
    }
});

$("#btnCerrarModal").click(function () {
    $("#myModal").modal("hide");
});

function ListaDocumentacion_Exp(ExpId) {
    var json = JSON.stringify({ "ExpId": ExpId });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/Adjuntos_List",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            var fila = "";
            var Contenido = "";
            var finfila = "";
            var ruta = "http://10.10.8.66//documentacion_new/";
            var fila = "<div class='row' style='margin-left:10px; margin-top:10px;max-height:300px; height:300px: overflow:auto'>";
            $.each(lista, function (index, item) {
                var nombre_recortado = item.RutaArchivo.split("\\");
                var nombre_corto = nombre_recortado[nombre_recortado.length - 1];
                Contenido = Contenido + "<div class='span3'><div style='width:100px; height:60px;'><a href='" + ruta + item.RutaArchivo + "' class='thumbnail' download><img style='width: 40px;' src='../img/img-icon.jpg' alt='...'></a></div><p align='left' style='font-size:11px;'>" + nombre_corto + "</p></div>";
                //alert(item.RutaArchivo);
            });
            if (lista.length == 0) Contenido = Contenido + "<div class='span2'><p><b>El paciente no posee documentación.</b></p></div>";
            var finfila = "</div>";
            $("#fotos").html(fila + Contenido + finfila);
        },
        error: errores
    });
}