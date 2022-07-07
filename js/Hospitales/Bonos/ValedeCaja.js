var BonoOK = false;

$(document).ready(function () {
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtFecha").datepicker();
    $("#txtFecha").attr('disabled',true);
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    $("#txtFecha").val(d);
    CargarConceptos();
});

function CargarConceptos() {
    $.ajax({
        type: "POST",
        url: "../Json/Bonos/Bonos.asmx/Bono_CajaVale_Conceptos_List",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, Concepto) {
                $('#cbo_Concepto').append($('<option></option>').val(Concepto.id).html(Concepto.descripcion));
            });
        },
        error: errores
    });
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

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarDatos() {
    var obj = {};
    obj.fecha = $("#txtFecha").val();
	obj.concepto = $('#cbo_Concepto :selected').val();
    obj.importe = $("#txtImporte").val();
    obj.observaciones = $("#txtObservaciones").val().trim().toUpperCase();
    if ($("#txtNroBono").val().trim().length == 0) obj.bonoid_rel = 0;
    else {
        obj.bonoid_rel = $("#txtNroBono").val().trim();
        obj.observaciones = "Nro. Bono: " + $("#txtNroBono").val().trim() + " - " + $("#lblFechaBono").html() + " - " + $("#lblUsuarioBono").html() + "\n" + $("#txtObservaciones").val().trim().toUpperCase();
    }
    return obj;
}

function Validar() {
    if ($("#txtFecha").val().length == 0) { alert("Ingrese fecha."); return false; }
    if ($("#cbo_Concepto :selected").val() == "") { alert("Ingrese concepto."); return false; }
    if ($("#txtImporte").val().length == 0) { alert("Ingrese importe."); return false; }
    if (parseInt($("#txtImporte").val()) == 0) { alert("Ingrese importe."); return false; }
    if ($("#cbo_Concepto :selected").val() == "2" && !BonoOK) { alert("Verifique Nro. de Bono."); return false; }
    return true;
}

$("#txtNroBono").keydown(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13 || code == 9) { //Enter o TAB
        if ($("#txtNroBono").val().trim().length == 0) return false;
        CargarBonoInfo();
    }
});

$("#txtNroBono").change(function () {
    if ($("#txtNroBono").val().trim().length == 0) return false;
    CargarBonoInfo();
});

function CargarBonoInfo() {
    var json = JSON.stringify({ "NroBono": $("#txtNroBono").val().trim() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Bonos/Bonos.asmx/BonoInfo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Bono = Resultado.d;
            if (Bono.Fecha != null) {
                $("#lblFechaBono").html("Fecha:" + Bono.Fecha);
                $("#lblUsuarioBono").html("Usuario: " + Bono.Nombre_Usuario);
                $("#txtImporte").val(parseInt(Bono.Importe.toString().replace(",", ".")));
                BonoOK = true;
                $("#txtImporte").attr("disabled", true);
                $("#txtImporte").focus();
            }
            else { alert("El bono no existe."); LimpiarCamposBono(); }
        },
        error: errores
    });
}


$("#btnGuardar").click(function () {
    if (!Validar()) return false;

    var json = JSON.stringify({ "b": CargarDatos() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Bonos/Bonos.asmx/Bono_CajaVale_Insert",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var NroBono = Resultado.d;
            if (NroBono > 0) Ventana('../Impresiones/Bono_CajaVale.aspx?NroBono='+NroBono);
        },
        error: errores
    });
});

function Ventana(Pagina){
    $.fancybox({
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
        },
        'onClosed': function () {
            document.location = 'Bonos_ValeCaja.aspx';
        }
    });
}

function LimpiarCamposBono() {
    $("#txtNroBono").val("");
    $("#lblFechaBono").html("");
    $("#lblUsuarioBono").html("");
    $("#txtImporte").removeAttr("disabled");
    BonoOK = false;
}

$("#cbo_Concepto").change(function () {
    if ($(this).val() == "2") $("#div_NroBono").show();
    else {
        $("#div_NroBono").hide();
        LimpiarCamposBono();
    }
});