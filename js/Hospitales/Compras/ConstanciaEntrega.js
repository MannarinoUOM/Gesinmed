var G_CDE_ID = 0;

function InitControls() {
    $(".date").mask("99/99/9999", { placeholder: "-" });
    $(".date").datepicker();
    $("#txtFechaReceta").val(FechaActual());
    SetearFechas();
    ListConstancias();
}

$("#chkQuirofano").click(function () {
    if ($(this).is(":checked")) {
        $("#div_fecha_quirofano").show();
        $("#div_fecha_quirofano").css("display", "inline-block");
    }
    else $("#div_fecha_quirofano").hide();
});

function SetearFechas() {
    var currentDt = new Date();
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = dd + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaDesde").val(p);
    $("#txtFechaHasta").val(d);
}

$(document).ready(function () {
    InitControls();
    $("#desdeaqui").click();
});

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
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente.length == 0) { alert("Paciente no encontrado."); $("#txtDNI").val(""); return false; }
    $.each(Paciente, function (index, paciente) {
        $("#afiliadoId").val(paciente.documento);
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#txtDNI").val(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#SeccionalId").val(paciente.Nro_Seccional);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
        $("#txtDNI").attr("disabled",true);
    });
}

$("#btnImprimir").click(function () {
    if ($("#txtFechaDesde").val().trim().length == 0) { alert("Ingrese Fecha desde."); return false; }
    if ($("#txtFechaHasta").val().trim().length == 0) { alert("Ingrese Fecha hasta."); return false; }
    Imprimir("../Impresiones/Compras/Impresion_ConstanciaEntrega.aspx?Desde=" + $("#txtFechaDesde").val() + "&Hasta=" + $("#txtFechaHasta").val());
});

function Imprimir(Pagina) {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
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

		}
	        );
}

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

$('#desdeaqui').click(function () {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 0 }, 500);
    $("#txtDNI").focus();
});

function Validar() {
    if ($("#CargadoNHC").html().trim().length == 0) { alert("Ingrese Paciente."); return false; }
    if ($("#afiliadoId").val() == 0) { alert("Ingrese Paciente."); return false; }
    if ($("#txtFechaReceta").val().trim().length == 0) { alert("Ingrese Fecha de receta."); return false; }
    if ($("#SeccionalId").val() <= 0) { alert("Paciente sin Seccional."); return false; }
    if ($("#CargadoDNI").html().trim().length == 0) { alert("Paciente sin documento."); return false; }

    if (!$("#chkQuirofano").is(":checked")) $("#txtFechaQuirofano").val("01/01/1900");

    if ($("#txtFechaQuirofano").val().trim().length == 0) $("#txtFechaQuirofano").val("01/01/1900");
    return true;
}

$("#btnGuardar").click(function () {
    if (!Validar()) return false;
    InsertarConstancia();
});

function InsertarConstancia() {
    var json = JSON.stringify({ "constancia": CargarDatos() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/COMPRAS_CONSTANCIA_ENTREGA_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function () {
            ListConstancias();
            LimpiarCampos();
        },
        error: errores
    });
}

function CargarDatos() {
    var objConstancia = {};
    objConstancia.COMPRAS_CDE_ID = G_CDE_ID;
    objConstancia.COMPRAS_CDE_FECHA_RECETA = $("#txtFechaReceta").val();
    objConstancia.COMPRAS_CDE_PAC_ID = $("#afiliadoId").val();
    objConstancia.COMPRAS_CDE_PACIENTE = $("#CargadoApellido").html().trim();
    objConstancia.COMPRAS_CDE_NRODOC = $("#CargadoDNI").html().trim();
    objConstancia.COMPRAS_CDE_SECC = $("#SeccionalId").val();
    objConstancia.COMPRAS_CDE_QUIROFANO = $("#chkQuirofano").is(":checked");
    objConstancia.COMPRAS_CDE_FECHA_QUIRO = $("#txtFechaQuirofano").val().trim();
    objConstancia.COMPRAS_CDE_ACTIVO = true;
    return objConstancia;
}

$("#btnLimpiar").click(function () {
    LimpiarCampos();
});

function LimpiarCampos() {
    G_CDE_ID = 0;
    $("#txtDNI").val('');
    
    $("#afiliadoId").val("0");
    $("#SeccionalId").val("0");
    $(".encabezado").html("");
    $("#txtDNI").removeAttr("disabled");
    $("#txtDNI").focus();
    ChequearQuiro(false);
}

$("#btnBuscar").click(function () {
    if ($("#txtFechaDesde").val().trim().length == 0) { alert("Ingrese Fecha desde."); return false; }
    if ($("#txtFechaHasta").val().trim().length == 0) { alert("Ingrese Fecha hasta."); return false; }
    ListConstancias();
});

function ListConstancias() {
    var json = JSON.stringify({ "Desde": $("#txtFechaDesde").val(), "Hasta": $("#txtFechaHasta").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/COMPRAS_CONSTANCIA_ENTREGA_LIST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#Total").html("REGISTROS: " + Resultado.d.length.toString());
            RenderizarTabla(Resultado.d);
        },
        error: errores
    });
}

function RenderizarTabla(Lista) {
    var Encabezado = "<table class='table table-condensed' style='width: 100%;'><thead><tr><th></th><th>Fecha Receta</th><th>Paciente</th><th>Nro. Doc.</th><th>Seccional</th><th>Fecha Quirúrgica</th></tr></thead><tbody>";
    var Contenido = "";
    $.each(Lista, function (i, Mov) {
        var _FECHA_QUIRO = Mov.COMPRAS_CDE_FECHA_QUIRO;
        if (Mov.COMPRAS_CDE_FECHA_QUIRO == "01/01/1900") _FECHA_QUIRO = "";
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + Mov.COMPRAS_CDE_ID + ");' class='btn btn-mini' title='Editar Constancia'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + Mov.COMPRAS_CDE_ID + ");' class='eliminar btn btn-mini btn-danger' title='Baja Constancia'><i class='icon-remove-circle icon-white'></i></a></td><td id='COMPRAS_CDE_FECHA_RECETA" + Mov.COMPRAS_CDE_ID + "'> " + Mov.COMPRAS_CDE_FECHA_RECETA + " </td><td>" + Mov.COMPRAS_CDE_PACIENTE + "</td><td id='COMPRAS_CDE_NRODOC" + Mov.COMPRAS_CDE_ID + "'>" + Mov.COMPRAS_CDE_NRODOC + "</td><td>" + Mov.COMPRAS_CDE_SECCIONAL_NOM + "</td><td style='display:none;' id='COMPRAS_CDE_QUIROFANO_" + Mov.COMPRAS_CDE_ID + "'>" + Mov.COMPRAS_CDE_QUIROFANO + "</td><td id='COMPRAS_CDE_FECHA_QUIRO_" + Mov.COMPRAS_CDE_ID + "'>" + _FECHA_QUIRO + "</td></tr>";
    });
    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);
}

function ChequearQuiro(opc) {
    if (opc) {
        $("#chkQuirofano").attr("checked", true);
        $("#div_fecha_quirofano").show();
        $("#div_fecha_quirofano").css("display", "inline-block");
    }
    else {
        $("#chkQuirofano").removeAttr("checked");
        $("#div_fecha_quirofano").hide();
    }
}

function Editar(Nro) {
    G_CDE_ID = Nro;
    $("#txtDNI").val($("#COMPRAS_CDE_NRODOC" + Nro).html());
    $("#txtDNI").attr("disabled", true);
    $("#txtFechaReceta").val($("#COMPRAS_CDE_FECHA_RECETA" + Nro).html());

    if ($("#COMPRAS_CDE_FECHA_QUIRO_" + Nro).html().trim().length == 0) ChequearQuiro(false);
    else ChequearQuiro(true); 

    $("#txtFechaQuirofano").val($("#COMPRAS_CDE_FECHA_QUIRO_" + Nro).html());
    Cargar_Paciente_Documento($("#txtDNI").val());
}

function Eliminar(Nro) {
    if (confirm("¿Desea eliminar la constancia?")) {
        G_CDE_ID = Nro;
        var json = JSON.stringify({ "CDE_ID": G_CDE_ID });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Compras/Compras.asmx/COMPRAS_CONSTANCIA_ENTREGA_BAJA",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            complete: function () {
                ListConstancias();
                LimpiarCampos();
            },
            error: errores
        });
    }
}

$("#btnCancelar").click(function () {
    LimpiarCampos();
});

$("#txtDNI").keydown(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13 || code == 9) { //Enter o TAB
        e.preventDefault();
        if ($(this).val().trim().length > 0)
            Cargar_Paciente_Documento($(this).val());
        else alert("Ingrese Nro. Doc.");
        return false;
    }
});
