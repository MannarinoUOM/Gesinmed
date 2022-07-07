var EditandoId = 0;
var UltimoAct = 0;

function List_NomenclaSN() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ListNomencladoresSN",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_NomenclaSN_Cargado,
        error: errores
    });
}

function List_NomenclaSN_Cargado(Resultado) {
    var Nomencladores = Resultado.d;
    $.each(Nomencladores, function (index, Nomencla) {
        $('#cbo_Nomencla').append(
              $('<option></option>').val(Nomencla.Fecha).html("Nomenclador hasta: " + Nomencla.Fecha)
            );
    });
}

$("#btnPrint").click(function () {
    var url = "../Impresiones/Impresion_Fact_Modulos_por_Conv_Nomencla.aspx?Nomenclador=" + $('#cbo_Nomencla :selected').val() + "&Convenio=" + $('#cbo_convenios :selected').val();
    Ventana(url);
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

$(document).ready(function () {
    $("#frm_Valores").validate({
        rules: {
            'txt_VNN': { required: true },
            'txt_VG': { required: true },
            'txt_Honorario': { required: true },
            'txt_Vbono': { required: true },
            'txt_Vaa': { required: true },
            'txt_Vaci': { required: true }
        },
        messages: {
            'txt_VNN': { required: '' },
            'txt_VG': { required: '' },
            'txt_Honorario': { required: '' },
            'txt_Vbono': { required: '' },
            'txt_Vaa': { required: '' },
            'txt_Vaci': { required: '' }

        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });

    CargarConvenios();
    ListModulos();
    List_NomenclaSN();
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
});

function ListModulos() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_Modulos_SN",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListModulos_Cargado,
        error: errores
    });
}

function ListModulos_Cargado(Resultado) {
    var Modulos = Resultado.d;
    $("#cboPracticas").empty();
    $("#cboPracticas").append($("<option></option>").val('').html("Seleccione Modulo..."));
    $.each(Modulos, function (index, Modulo) {
        $("#cboPracticas").append($("<option></option>").val(Modulo.Codigo).html(Modulo.Codigo + '-' + Modulo.Descripcion));
    });
}

function CargarConvenios() {
    var json = JSON.stringify({"Convenio": null});
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/VerlosConvenios",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConvenios_Cargado,
        error: errores
    });

}

function CargarConvenios_Cargado(Resultado) {
    var Convenios = Resultado.d;
    //$("#cbo_convenios").empty();
    $("#cbo_ConvMasivo").empty();
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


$("#cboPracticas").change(function () {
    $("#txtCodigo").val($("#cboPracticas :selected").val());
});

$("#txtCodigo").change(function () {
    var exists = 0 != $('#cboPracticas option[value=' + $("#txtCodigo").val() + ']').length;
    if (exists == 0) {
        $("#txtCodigo").val("");
        $("#txtCodigo").focus();
        ListarModulos($("#cbo_convenios :selected").val(), 0, $('#cbo_Nomencla :selected').val());
    }
    else {
        $("#cboPracticas option[value=" + $("#txtCodigo").val() + "]").attr("selected", true);
        ListarModulos($("#cbo_convenios :selected").val(), $("#txtCodigo").val(), $('#cbo_Nomencla :selected').val());
    }
});

function RemoveClass() {
    $(".control-group").removeClass("error");
}

function Guardar() {
    if (confirm("¿Desea confirmar la valorización?")) {
        if ($("#frm_Valores").valid()) {
            RemoveClass();
            if ($("#cboPracticas :selected").val() != "0") {
                var json = JSON.stringify({
                    "ConvenioId": $('#cbo_convenios option:selected').val(),
                    "ModuloId": $('#cboPracticas option:selected').val(),
                    "vbono": $("#txt_Vbono").val(),
                    "vaa": $("#txt_Vaa").val(),
                    "vaci": $("#txt_Vaci").val(),
                    "vnn": $("#txt_VNN").val(),
                    "vg": $("#txt_VG").val(),
                    "vhono": $("#txt_Honorario").val(),
                    "Nomenclador": $('#cbo_Nomencla :selected').val()
                });

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
            else {
                alert('Seleccione Un Módulo');
            }
        }
    }
}

function Guardado() {
    alert("Guardado");
    UltimoAct = $('#cboPracticas :selected').val();
    LimpiarControls();
    ListarModulos($('#cbo_convenios option:selected').val(), 0, $('#cbo_Nomencla :selected').val());
}

function ListarModulos(Convenio,Codigo,Nomenclador) {
    var json = JSON.stringify({"ConvenioId": Convenio, "Codigo": Codigo, "Nomenclador": Nomenclador });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/AltasNomencladores.asmx/Fact_ListadoModulosConvenios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practicas_Listadas,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaPedidos_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaPedidos_div").show();
        }
    });
}

function Practicas_Listadas(Resultado) {
    var Practicas = Resultado.d;
    $("#TablaPracticas").empty();

    var Tabla_Datos = "";

    $.each(Practicas, function (index, practicas) {
        Tabla_Datos = Tabla_Datos + "<tr";
        if (UltimoAct == practicas.moduloid)
            Tabla_Datos = Tabla_Datos + " style='background-color:#EAEAEA'><td class='mano' onclick=Editar(" + index + ");>" + practicas.convenio + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.moduloid + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.modulo + "</td><td style='display:none;'><input id='TxT_ConvenioId" + index + "' type='hidden' value='" + practicas.convenioid + "'/><input id='TxT_ModuloId" + index + "' type='hidden' value='" + practicas.moduloid + "'/><input id='VNN" + index + "' type='hidden' value='" + practicas.ValorNN + "'/><input id='I_Prac_VGastos" + index + "' value='" + practicas.ValorGastos + "' /><input id='I_Prac_VHono" + index + "' value='" + practicas.ValorHonorario + "' /><input id='I_Prac_VBono" + index + "' value='" + practicas.ValorBono + "' /><input id='I_Prac_ValorACA" + index + "' value='" + practicas.ValorACA + "' /><input id='I_Prac_ValorACI" + index + "' value='" + practicas.ValorACI + "' />   </td><td>$" + practicas.ValorNN + "</td><td>$" + practicas.ValorHonorario + "</td><td>&nbsp;&nbsp;<a class='btn btn-danger btn-mini' onclick=Quitar(" + index + ");>Quitar</a></td></tr>";
        else Tabla_Datos = Tabla_Datos + "><td class='mano' onclick=Editar(" + index + ");>" + practicas.convenio + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.moduloid + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.modulo + "</td><td style='display:none;'><input id='TxT_ConvenioId" + index + "' type='hidden' value='" + practicas.convenioid + "'/><input id='TxT_ModuloId" + index + "' type='hidden' value='" + practicas.moduloid + "'/><input id='VNN" + index + "' type='hidden' value='" + practicas.ValorNN + "'/><input id='I_Prac_VGastos" + index + "' value='" + practicas.ValorGastos + "' /><input id='I_Prac_VHono" + index + "' value='" + practicas.ValorHonorario + "' /><input id='I_Prac_VBono" + index + "' value='" + practicas.ValorBono + "' /><input id='I_Prac_ValorACA" + index + "' value='" + practicas.ValorACA + "' /><input id='I_Prac_ValorACI" + index + "' value='" + practicas.ValorACI + "' />   </td><td>$" + practicas.ValorNN + "</td><td>$" + practicas.ValorHonorario + "</td><td>&nbsp;&nbsp;<a class='btn btn-danger btn-mini' onclick=Quitar(" + index + ");>Quitar</a></td></tr>";
    });
    $("#TablaPracticas").html(Tabla_Datos);
}

function Editar(Id) {

    $("#txtCodigo").attr("disabled", true);
    $("#cboPracticas").attr("disabled", true);
    $("#cbo_convenios").attr("disabled", true);

    $("#cbo_convenios option[value=" + $("#TxT_ConvenioId"+Id).val() + "]").attr("selected", true);
    $("#txtCodigo").val($("#TxT_ModuloId" + Id).val());
    $("#cboPracticas option[value=" + $("#TxT_ModuloId" + Id).val() + "]").attr("selected", true);
    
    $("#txt_Vbono").val($("#I_Prac_VBono" + Id).val());
    $("#txt_Vaa").val($("#I_Prac_ValorACA" + Id).val());
    $("#txt_Vaci").val($("#I_Prac_ValorACI" + Id).val());
    $("#txt_VNN").val($("#VNN" + Id).val().replace(",","."));
    $("#txt_VG").val($("#I_Prac_VGastos" + Id).val());
    $("#txt_Honorario").val($("#I_Prac_VHono" + Id).val());

}

function Quitar(Id) {
    if (confirm("¿Desea quitar la valorización del módulo?")) {
        var json = JSON.stringify({
            "ConvenioId": $('#TxT_ConvenioId' + Id).val(),
            "ModuloId": $('#TxT_ModuloId' + Id).val(),
            "Nomenclador": $('#cbo_Nomencla :selected').val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/AltasNomencladores.asmx/QuitarValorModulosConvenios",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                LimpiarControls();
                ListarModulos($('#TxT_ConvenioId' + Id).val(), 0, $('#cbo_Nomencla :selected').val());
            },
            error: errores
        });
    }
}

$("#Cancelar").click(function () {

    $("#txt_Vbono").val("0");
    $("#txt_Vaa").val("0");
    $("#txt_Vaci").val("0");
    $("#txt_VNN").val("0.00");
    $("#txt_VG").val("0");
    $("#txt_Honorario").val("0");
    $("#txtCodigo").val('');
    $("#cboPracticas").val('0');
    //$("#cbo_convenios").val('0');

    $("#txtCodigo").attr("disabled", false);
    $("#cboPracticas").attr("disabled", false);
    $("#cbo_convenios").attr("disabled", false);
    $("#cbo_Especialidad").attr("disabled", false);
    EditandoId = 0;
});

function LimpiarControls() {
    $("#txt_Vbono").val("0");
    $("#txt_Vaa").val("0");
    $("#txt_Vaci").val("0");
    $("#txt_VNN").val("0.00");
    $("#txt_VG").val("0");
    $("#txt_Honorario").val("0");
    $("#txtCodigo").val('');
    $("#cboPracticas").val('0');
    //$("#cbo_convenios").val('0');

    $("#txtCodigo").attr("disabled", false);
    $("#cboPracticas").attr("disabled", false);
    $("#cbo_convenios").attr("disabled", false);
    $("#cbo_Especialidad").attr("disabled", false);
    EditandoId = 0;
}

$("#atab2").click(function () {
    $("#frm_Valores").hide();
    $("#pie").hide();
});

$("#atab1").click(function () {
    $("#frm_Valores").show();
    $("#pie").show();
});

$("#btnActualizarMasivo").click(function () {
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
    ListarModulos($("#cbo_ConvMasivo :selected").val(), $("#txtCodigo").val());
});

$("#cbo_convenios").change(function () {
    ListarModulos($("#cbo_convenios :selected").val(), $("#txtCodigo").val(), $('#cbo_Nomencla :selected').val());
});

$("#txtCodigo").change(function () {
    ListarModulos($("#cbo_convenios :selected").val(), $("#txtCodigo").val(), $('#cbo_Nomencla :selected').val());
});

$("#txtCodigo").blur(function () {
    ListarModulos($("#cbo_convenios :selected").val(), $("#txtCodigo").val(), $('#cbo_Nomencla :selected').val());
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

$("#cbo_Nomencla").change(function () {
    ListarModulos($("#cbo_convenios :selected").val(), $("#txtCodigo").val(), $('#cbo_Nomencla :selected').val());
});
