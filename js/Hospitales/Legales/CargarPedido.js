var Seccional = 0;
var idReq = 0;
var idDetalle = 0;

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

function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": "DU" });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    $.each(Paciente, function (index, paciente) {
        $("#afiliadoId").val(paciente.documento);
        $("#CargadoApellido").html(paciente.Paciente);
        $("#txtPaciente").val(paciente.Paciente);
        $("#txtTelefono").val(paciente.Telefono);
        $("#txt_dni").val(paciente.documento_real);
        $("#txtNHC").val(paciente.NHC_UOM);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);

        Seccional = paciente.Nro_Seccional;
        $('#cboSeccional').val(Seccional);
        $("#cbo_ObraSocial").val(paciente.OSId);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
        $("#desdeaqui").show();
    });
}

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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


function ListTipoDoc() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/ListTipoDoc",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, Tipo) {
                $('#cbo_TipoDOC').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
            });

        },
        error: errores
    });
}

function Cargar_Seccionales_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Seccionales_Listas_Cargadas,
        complete: function () {
            $('#cboSeccional').val(Seccional);
        },
        error: errores
    });

}

function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
    });
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

$(document).ready(function () {
    ListTipoDoc();
    Cargar_Seccionales_Lista();
    Tipo_Requerimiento_List(false);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    var GET = {};
    var NHC = "";
    var Documento = "";
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtFecha").datepicker();

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        Cargar_Paciente_NHC(NHC);
    }

    if (GET["Documento"] != "" && GET["Documento"] != null) {
        Documento = GET["Documento"];
        Cargar_Paciente_Documento(Documento);
        $("#txt_dni").val(Documento);
    }


    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }

    if (GET["IdReq"] != "" && GET["IdReq"] != null) {
        idReq = GET["IdReq"];
        $("#id_Requerimiento").val(idReq);
        CargarPedido(idReq);
    }


});


function CargarPedido(Req) {
    $.ajax({
        type: "POST",
        url: "../Json/Legales/Legales.asmx/Legales_Buscar_Cabecera",
        data: '{IdReq: "' + Req + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var obj = Resultado.d;
            $("#txtFecha").val(obj.Fecha);
            $("#txtPaciente").val(obj.Afiliado_Nombre);
            $("#afiliadoId").val(obj.AfiliadoId);
            $("#txtNHC").val(obj.NHC_UOM);
            $("#chkEsUOM").attr("checked", obj.Es_UOM);
            $("#chk_EsObito").is("checked", obj.EsObito);
            $("#chk_ART").is("checked", obj.EsART);
            if (obj.Es_UOM) CargarPacienteID(obj.AfiliadoId);
            else { $("#desdeaqui").show(); $("#txt_dni").val(obj.NHC_UOM); }
            $("#cbo_Req").val(obj.IdReqTipo);
            $("#btnBaja").show();
            CargarPedidoDetalle(idReq);
        },
        error: errores
    });
}

function CargarPedidoDetalle(Req) {
    $.ajax({
        type: "POST",
        url: "../Json/Legales/Legales.asmx/Legales_Buscar_Detalle",
        data: '{IdReq: "' + Req + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var obj = Resultado.d;
            idDetalle = obj.IdDetalle;
            $("#txtPedidopor").val(obj.PedidoPor);
            $("#txtNroNota").val(obj.NroNota);
            $("#chkEsSecuestro").attr("checked", obj.EsSecuestro);
            $("#chk_EsObito").attr("checked", obj.EsObito);
            $("#chk_ART").attr("checked", obj.EsART);
            $("#txtObservaciones").val(obj.Observaciones);
            $("#tab_adjuntos").show();
            $("#tab_mostrarAdjuntos").show();
        },
        error: errores
    });
}


function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

$("#btnBuscarPaciente").click(function () {
    BuscarPacientes_fancy();
});

function BuscarPacientes_fancy() {
    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': "../Turnos/BuscarPacientes.aspx?Express=0",
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
}

function RecargarPagina(url) {
    document.location = "../Legales/CargarPedido.aspx" + url;
}

$("#txt_dni").on('keydown', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13 || keyCode == 9) {
        e.preventDefault();
        if ($("#txt_dni").val().trim().length > 0)
            Cargar_Paciente_Documento($("#txt_dni").val());
    }
});

$("#txtNHC").on('keydown', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13 || keyCode == 9) {
        e.preventDefault();
        if ($("#txtNHC").val().trim().length > 0)
            Cargar_Paciente_NHC($("#txtNHC").val());
    }
});


function Tipo_Requerimiento_List(Todos) {
    $.ajax({
        type: "POST",
        url: "../Json/Legales/Legales.asmx/Tipo_Requerimiento_List",
        data: '{Todos: "' + Todos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Reqs = Resultado.d;
            $('#cbo_Req').append($('<option></option>').val("").html("Seleccione Requerimiento..."));
            $.each(Reqs, function (index, Req) {
                $('#cbo_Req').append($('<option></option>').val(Req.IdReqTipo).html(Req.Requerimiento));
            });
        },
        error: errores
    });
}

$("#btnConfirmar").click(function () {
    if (confirm("¿Desea confirmar el pedido?")) {
        if (!ValidarDatos()) return false;
        var json = JSON.stringify({ "o": CargarDatos(idReq) });
        $.ajax({
            type: "POST",
            url: "../Json/Legales/Legales.asmx/Legales_Cabecera_Insert",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                idReq = Resultado.d;
                if (idReq > 0) {
                    CargarDetalle(idReq, 0);
                    $("#id_Requerimiento").val(idReq);
                }
                else alert("Error al guardar pedido.");
            },
            error: errores
        });
    }
});

function ValidarDatos() {
    if ($("#txtFecha").val().trim().length == 0) { alert("Ingrese Fecha."); return false; }
    if ($("#cbo_Req :selected").val() == "") { alert("Seleccione Requerimiento."); return false; }
    if ($("#txtPedidopor").val().trim().length == 0 && $("#cbo_Req :selected").val() != "2") { alert("Complete Pedido Por."); return false; }
    return true;
}

function CargarDatos(idReq) {
    var obj = {};
    obj.IdReq = idReq;
    obj.Fecha = $("#txtFecha").val().trim();
    obj.Afiliado_Nombre = $("#CargadoApellido").html().trim();
    obj.AfiliadoId = $("#afiliadoId").val();
    obj.NHC_UOM = $("#txtNHC").val().trim();
    obj.Es_UOM = $("#chkEsUOM").is(":checked");
    obj.IdReqTipo = $("#cbo_Req :selected").val();
    obj.Baja = false;
    return obj;
}


///////////////////////////Detalles////////////////////////

function CargarDetalle() {
    var json = JSON.stringify({ "o": CargarDetalleObj(idReq, idDetalle) });
    $.ajax({
        type: "POST",
        url: "../Json/Legales/Legales.asmx/Legales_Detalles_Insert",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            if (idReq > 0) { alert("El pedido se ha guardado correctamente."); $("#tab_adjuntos").show(); $("#tab_mostrarAdjuntos").show();}
            else alert("Error al guardar pedido.");
        },
        error: errores
    });
}


function CargarDetalleObj(idReq,Detalle) {
    var obj = {};
    obj.IdReq = idReq;
    obj.IdDetalle = Detalle;
    obj.PedidoPor = $("#txtPedidopor").val().trim().toUpperCase();
    obj.NroNota = $("#txtNroNota").val().trim().toUpperCase();
    obj.EsSecuestro = $("#chkEsSecuestro").is(":checked");
    obj.EsObito = $("#chk_EsObito").is(":checked");
    obj.EsART = $("#chk_ART").is(":checked");
    obj.Observaciones = $("#txtObservaciones").val().trim().toUpperCase();
    return obj;
}


$("#chkEsUOM").change(function () {
    if ($("#chkEsUOM").is(":checked")) $("#desdeaqui").hide();
    else $("#desdeaqui").show();
});


$('#desdeaqui').click(function () {
    if (!$("#chkEsUOM").is(":checked")) {
        if (!ValidarEntrada()) return false;
        $("#CargadoApellido").html($("#txtPaciente").val());
        $("#CargadoDNI").html($("#txt_dni").val());
        $("#txtNHC").val($("#txt_dni").val());
        $("#CargadoNHC").html($("#txt_dni").val());
        $("#CargadoSeccional").html("NO UOM");
        $("#afiliadoId").val("0");
    }
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
});


function ValidarEntrada() {
    if ($("#txtPaciente").val().trim().length == 0) { alert("Ingrese nombre del paciente."); return false; }
    if ($("#txt_dni").val().trim().length == 0) { alert("Ingrese Nro. Documento."); return false; }
    return true;
}

$("#btnVolver").click(function () {
    if (idReq > 0) document.location = "BuscarPedido.aspx";
    else document.location = "CargarPedido.aspx";
});


function ListTipoDocumentacion(Todos) {
    var json = JSON.stringify({ "Todos": Todos });
    $.ajax({
        type: "POST",
        url: "../Json/Legales/Legales.asmx/Legales_TipoDoc_List",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#cbo_Tipos').append($('<option></option>').val("").html("Seleccione Documentacion..."));
            $.each(lista, function (index, Req) {
                $('#cbo_Tipos').append($('<option></option>').val(Req.IdDocumentacion).html(Req.Documentacion));
            });
        },
        error: errores
    });
}

$("#tab_mostrarAdjuntos").click(function () {
    //alert(idReq);
    ListaDocumentacion_Req(idReq);
});

function ListaDocumentacion_Req(idReq) {
    var json = JSON.stringify({ "IdReq": idReq });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Legales/Legales.asmx/Adjuntos_List",
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
                Contenido = Contenido + "<div class='span2'><div style='width:100px; height:120px;'><a href='" + ruta + item.RutaArchivo + "' class='thumbnail' download><img src='../img/pdf-thumbnail.png' alt='...'></a></div><p align='left' style='font-size:11px;'>" + nombre_corto + "<a style='cursor:pointer;' class='btn_borrar_img' data-id='" + item.IdDetalle + "' title='Eliminar adjunto'>&nbsp;<img src='../img/Icono_ERROR.gif'/></a></p></div>";
                //alert(item.RutaArchivo);
            });

            var finfila = "</div>";
            $("#fotos").html(fila + Contenido + finfila);
        },
        error: errores
    });
}

//Dar de baja adjunto//
$(".btn_borrar_img").live("click", function () {
    if (confirm("¿Desea dar de baja el adjunto?")) {
        var idArchivo = $(this).data("id");

        if (idArchivo > 0) BajaAdjunto(idArchivo);
        else alert("Archivo no válido.");
    }
});


function BajaAdjunto(idArchivo) {
    var json = JSON.stringify({ "idArchivo": idArchivo });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Legales/Legales.asmx/BajaAdjunto",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function () {
            alert("Adjunto dado de baja.");
            ListaDocumentacion_Req(idReq);
        },
        error: errores
    });
}

//Dar de baja Pedido//
$("#btnBaja").click(function () {
    if (confirm("¿Desea dar de baja el pedido?")){
        if (idReq > 0) BajaPedido();
        else alert("Nro. Pedido no válido.");
    } 
});

function BajaPedido() {
    var json = JSON.stringify({ "IdReq": idReq });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Legales/Legales.asmx/BajaPedido",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function () {
            alert("Pedido dado de baja.");
            location.href = "BuscarPedido.aspx";
        },
        error: errores
    });
}