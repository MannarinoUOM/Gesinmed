var EditandoId = 0;

$(document).ready(function () {
    CargarConvenios();
    Cargar_Modulos();
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

$(".numeroDecimal").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        if (e.keyCode == 190) {
            if ($(this).val().indexOf('.') == -1 && $(this).val().trim().length > 0) return;
            else e.preventDefault();
        }
        else return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$(".numeroDecimal").blur(function () {
    var e = $(this).val();
    if (!isNaN(Number(e)) && e != "")
        $(this).val(parseFloat(e).toFixed(2));
});

$("#cbo_convenios").change(function () {
    BuscarNomencladores(false);
});


/*
Nuevo Combo para elegir nomenclador, cargo los del convenioId = 10 (Intrared)
Segun con que nomenclador factura, carga el precio de cada practica/modulo
*/

function BuscarNomencladores(Todos) {
    var json = JSON.stringify({ "Todos": Todos, "ConvenioId": $("#cbo_convenios :selected").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/FACT_NOMENCLA_LIST",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Nomencladores = Resultado.d;
            $('#cbo_Nomenclador').empty();
            $('#cbo_Nomenclador').append($('<option></option>').val("").html("Seleccione Nomenclador"));
            $.each(Nomencladores, function (index, nom) {
                $('#cbo_Nomenclador').append($('<option></option>').val(nom.FACT_NOMENCLA_ID).html(nom.FACT_NOMENCLA_DESC));
            });
        },
        error: errores
    });

}

function CargarConvenios() {
    var json = JSON.stringify({"Convenio": null});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/AltasNomencladores.asmx/VerlosConvenios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConvenios_Cargado,
        error: errores
    });

}

function CargarConvenios_Cargado(Resultado) {
    var Convenios = Resultado.d;
    $("#cbo_convenios").empty();
    $("#cbo_ConvMasivo").empty();
    $('#cbo_convenios').append($('<option></option>').val("").html("Seleccione Convenio..."));
    $.each(Convenios, function (index, conv) {
        $('#cbo_convenios').append(
              $('<option></option>').val(conv.id).html(conv.convenios)
            );
        $('#cbo_ConvMasivo').append(
              $('<option></option>').val(conv.id).html(conv.convenios)
            );        
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}



function Cargar_Modulos() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/ListadodeModulosTotal",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pracias_Cargadas,
        error: errores
    });
}

function Pracias_Cargadas(Resultado) {
    var Practicas = Resultado.d;
    $.each(Practicas, function (index, practicas) {
        $('#cboPracticas').append(
              $('<option></option>').val(practicas.Codigo).html(practicas.Descripcion)
            );
    });
}

$("#cboPracticas").change(function () {
    $("#txtCodigo").val($("#cboPracticas :selected").val());
});

$("#txtCodigo").change(function () {
    if ($("#txtCodigo").val().trim().length > 0) {
        var exists = 0 != $('#cboPracticas option[value=' + $("#txtCodigo").val() + ']').length;
        if (exists == 0) {
            $("#txtCodigo").val("");
            $("#txtCodigo").focus();
            ListarModulos($("#cbo_Nomenclador :selected").val(), $('#cbo_convenios :selected').val(), 0);
        }
        else {
            $("#cboPracticas option[value=" + $("#txtCodigo").val() + "]").attr("selected", true);
            ListarModulos($("#cbo_Nomenclador :selected").val(), $('#cbo_convenios :selected').val(), 0);
        }
    }
});

function LoadDatos() {
    var obj = {};
    obj.convenioid = $('#cbo_convenios :selected').val();
    obj.nomencladorid = $("#cbo_Nomenclador :selected").val();
    obj.moduloid = $('#cboPracticas :selected').val();
    obj.ValorBono = $("#txt_Vbono").val().trim();
    obj.ValorACA = $("#txt_Vaa").val().trim();
    obj.ValorACI = $("#txt_Vaci").val().trim();
    obj.ValorNN = $("#txt_VNN").val().trim();
    obj.ValorGastos = $("#txt_VG").val().trim();
    obj.ValorHonorario = $("#txt_Honorario").val().trim();
    return obj;
}

function Validar() {
    if ($('#cbo_convenios :selected').val() == '0') { alert("Seleccione un convenio."); return false; }
    if ($("#cbo_Nomenclador :selected").val() == "") { alert("Seleccione Nomenclador."); return false; }
    if ($('#cboPracticas :selected').val() == '0') { alert("Seleccione un módulo."); return false; }
    if ($('#txt_Vbono').val().trim().length == 0) $('#txt_Vbono').val('0');
    if ($('#txt_Vaa').val().trim().length == 0) $('#txt_Vaa').val('0');
    if ($('#txt_Vaci').val().trim().length == 0) $('#txt_Vaci').val('0');
    if ($('#txt_VNN').val().trim().length == 0) $('#txt_VNN').val('0');
    if ($('#txt_VG').val().trim().length == 0) $('#txt_VG').val('0');
    if ($('#txt_Honorario').val().trim().length == 0) $('#txt_Honorario').val('0');
    return true;
}

function Guardar() 
{
    if (!Validar()) return false;

            var json = JSON.stringify({"modulo": LoadDatos() });
            $.ajax({
                type: "POST",
                url: "../Json/Facturacion/AltasNomencladores.asmx/GuardarValorModulosConvenios",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Guardado,
                error: errores
            });
}

function Guardado() {
    alert("Guardado");
    ListarModulos($("#cbo_Nomenclador :selected").val(), $('#cbo_convenios :selected').val(), 0);
    LimpiarControls();
}

function LimpiarControls(){
    $("#txt_Vbono").val("0");
    $("#txt_Vaa").val("0");
    $("#txt_Vaci").val("0");
    $("#txt_VNN").val("0");
    $("#txt_VG").val("0");
    $("#txt_Honorario").val("0");
    $("#txtCodigo").val('');
    $("#cboPracticas").val('0');
    $("#cbo_Nomenclador").val("");

    $("#txtCodigo").attr("disabled", false);
    $("#cboPracticas").attr("disabled", false);
    $("#cbo_convenios").attr("disabled", false);
    $("#cbo_Especialidad").attr("disabled", false);
    $("#cbo_Nomenclador").removeAttr("disabled");
    EditandoId = 0;
}

function ListarModulos(Nomenclador, Convenio, Codigo) {
    if (Nomenclador.trim().length == 0) return false;
    var json = JSON.stringify({ "NomencladorId": Nomenclador, "ConvenioId": Convenio, "Codigo": Codigo });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/AltasNomencladores.asmx/Fact_ListadoModulosConvenios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Modulos_Listados,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaBonos").hide();
            $("#Tabla").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaBonos").show();
            $("#Tabla").show();
        }
    });
}

function Modulos_Listados(Resultado) {
    var Practicas = Resultado.d;
    $("#TablaPracticas").empty();

    var Tabla_Datos = "";

    $.each(Practicas, function (index, practicas) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + "><td class='mano' onclick=Editar(" + index + ");>" + practicas.convenio + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.moduloid + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.modulo + "</td><td style='display:none;'><input id='TxT_ConvenioId" + index + "' type='hidden' value='" + practicas.convenioid + "'/><input id='TxT_ModuloId" + index + "' type='hidden' value='" + practicas.moduloid + "'/><input id='TxT_NomencladorId" + index + "' type='hidden' value='" + practicas.nomencladorid + "'/><input id='VNN" + index + "' type='hidden' value='" + practicas.ValorNN + "'/><input id='I_Prac_VGastos" + index + "' value='" + practicas.ValorGastos + "' /><input id='I_Prac_VHono" + index + "' value='" + practicas.ValorHonorario + "' /><input id='I_Prac_VBono" + index + "' value='" + practicas.ValorBono + "' /><input id='I_Prac_ValorACA" + index + "' value='" + practicas.ValorACA + "' /><input id='I_Prac_ValorACI" + index + "' value='" + practicas.ValorACI + "' /></td><td>$" + parseFloat(practicas.ValorNN).toFixed(2) + "</td><td>&nbsp;&nbsp;<a class='btn btn-danger btn-mini' onclick=Quitar(" + index + ");>Quitar</a></td></tr>";
    });
    $("#TablaPracticas").html(Tabla_Datos);
}

function Editar(Id) {

    $("#txtCodigo").attr("disabled", true);
    $("#cboPracticas").attr("disabled", true);
    $("#cbo_convenios").attr("disabled", true);
    $("#cbo_Nomenclador").attr("disabled", true);

    $("#cbo_convenios option[value=" + $("#TxT_ConvenioId"+Id).val() + "]").attr("selected", true);
    $("#txtCodigo").val($("#TxT_ModuloId" + Id).val());
    $("#cboPracticas option[value=" + $("#TxT_ModuloId" + Id).val() + "]").attr("selected", true);
    $("#cbo_Nomenclador").val($("#TxT_NomencladorId" + Id).val());

    $("#txt_Vbono").val($("#I_Prac_VBono" + Id).val());
    $("#txt_Vaa").val($("#I_Prac_ValorACA" + Id).val());
    $("#txt_Vaci").val($("#I_Prac_ValorACI" + Id).val());
    $("#txt_VNN").val($("#VNN" + Id).val());
    $("#txt_VG").val($("#I_Prac_VGastos" + Id).val());
    $("#txt_Honorario").val($("#I_Prac_VHono" + Id).val());

}

function ValidarQuitar(Id) {
    if (Id < 0) {alert("Seleccione Modulo.");return false;}
    if ($("#TxT_NomencladorId" + Id).val() == "") { alert("Seleccione Nomenclador."); return false; }
    if ($('#TxT_ConvenioId' + Id).val().trim().length == 0) { alert("Seleccione Convenio."); return false; }
    if ($('#TxT_ModuloId' + Id).val().trim().length == 0) { alert("Seleccione Modulo."); return false; }
    return true;
}

function Quitar(Id) {
    if (!ValidarQuitar(Id)) return false;
    if (confirm("¿Desea eliminar este valor?")) {
        var json = JSON.stringify({
            "NomencladorId": $("#TxT_NomencladorId" + Id).val(),
            "ConvenioId": $('#TxT_ConvenioId' + Id).val(),
            "ModuloId": $('#TxT_ModuloId' + Id).val()
        });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/AltasNomencladores.asmx/QuitarValorModulosConvenios",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                ListarModulos($("#TxT_NomencladorId" + Id).val(), $('#TxT_ConvenioId' + Id).val(), 0);
            },
            error: errores
        });
    }
}

$("#Cancelar").click(function () {
    $("#txt_Vbono").val("0");
    $("#txt_Vaa").val("0");
    $("#txt_Vaci").val("0");
    $("#txt_VNN").val("0");
    $("#txt_VG").val("0");
    $("#txt_Honorario").val("0");
    $("#txtCodigo").val('');
    $("#cboPracticas").val('0');
    $("#cbo_Nomenclador").val("");

    $("#txtCodigo").attr("disabled", false);
    $("#cboPracticas").attr("disabled", false);
    $("#cbo_convenios").attr("disabled", false);
    $("#cbo_Especialidad").attr("disabled", false);
    $("#cbo_Nomenclador").removeAttr("disabled");
    EditandoId = 0;
});


$("#atab2").click(function () {
    $("#frm_Valores").hide();
    $("#pie").hide();
});

$("#atab1").click(function () {
    $("#frm_Valores").show();
    $("#pie").show();
});

$("#btnActualizarMasivo").click(function () {
    return false;
    var valor;
    var porcentaje;
    if ($("#rdValor").is(":checked")) {
        valor = $("#txtValor").val();
        porcentaje = 0;
    }
    else {
        valor = 0;
        porcentaje = $("#txtValor").val();
    }
    var json = JSON.stringify({ "ConvenioId": $("#cbo_ConvMasivo :selected").val(), "CodigoDesde": $("#txtCodigoDesde").val(), "CodigoHasta": $("#txtCodigoHasta").val(), "Porcentaje": porcentaje, "Valor": valor });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ActualizarModulosMasiva",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ActualizarMasivo_Cargado,
        error: errores
    });
});

function ActualizarMasivo_Cargado() {
    alert('Actualizados');
    window.location = "ValorizacionModulos.aspx";
}


$("#cbo_ConvMasivo").change(function () {
    //ListarModulos($("#cbo_Nomenclador :selected").val(), $("#cbo_convenios :selected").val(), 0);
    ListarModulos($("#cbo_Nomenclador :selected").val(), $("#cbo_convenios :selected").val(), $("#cboPracticas :selected").val());
});

$("#cbo_Nomenclador").change(function () {
    ListarModulos($("#cbo_Nomenclador :selected").val(), $("#cbo_convenios :selected").val(), 0);
});

$("#txtCodigo").change(function () {
    ListarModulos($("#cbo_Nomenclador :selected").val(), $("#cbo_convenios :selected").val(), 0);
});

$("#txtCodigo").blur(function () {
  //  ListarModulos($("#cbo_Nomenclador :selected").val(), $("#cbo_convenios :selected").val(), 0);
    ListarModulos($("#cbo_Nomenclador :selected").val(), $("#cbo_convenios :selected").val(), $("#cboPracticas :selected").val());
});

$("#cboPracticas").change(function () {
    //  ListarModulos($("#cbo_Nomenclador :selected").val(), $("#cbo_convenios :selected").val(), 0);
    ListarModulos($("#cbo_Nomenclador :selected").val(), $("#cbo_convenios :selected").val(), $("#cboPracticas :selected").val());
});

$("#txt_VNN").focusin(function () {
    $("#txt_VNN").val('');
});

$("#txt_VNN").focusout(function () {
    if ($("#txt_VNN").val() == '') $("#txt_VNN").val('0.00');
});

$("#txt_VNN").blur(function () {
    var e = $("#txt_VNN").val();
    if (!isNaN(Number(e)) && e != "")
        $("#txt_VNN").val(parseFloat(e).toFixed(2));
});

function Ventana(url) {
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
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
}

$("#btn_Imprimir").click(function () {
    if ($("#cbo_Nomenclador :selected").val() == "") { alert("Seleccione Nomenclador."); return false; }
    Ventana('../Impresiones/Impresion_Facturacion_NomencladorModulos.aspx?NomencladorId=' + $("#cbo_Nomenclador :selected").val());
});