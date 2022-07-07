var EditandoId = 0;
var EspecialidadId = 0;

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

$(document).ready(function () {
    CargarConvenios();
    Cargar_Practicas();
    List_EspecialidadesTodas(); //Para valorizacion masiva...
});

$(".numeroDecimal").blur(function () {
    var e = $(this).val();
    if (!isNaN(Number(e)) && e != "")
        $(this).val(parseFloat(e).toFixed(2));
});

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

function BuscarNomencladoresMasivo(Todos) {
    var json = JSON.stringify({ "Todos": Todos, "ConvenioId": $("#cbo_ConvMasivo :selected").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/FACT_NOMENCLA_LIST",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Nomencladores = Resultado.d;
            $('#cbo_Nomencla_Masivo').empty();
            $('#cbo_NomencladorBase').empty();
            $('#cbo_Nomencla_Masivo').append($('<option></option>').val("0").html("Seleccione Nomenclador"));
            $('#cbo_NomencladorBase').append($('<option></option>').val("0").html("Seleccione Nomenclador"));
            $.each(Nomencladores, function (index, nom) {
                $('#cbo_Nomencla_Masivo').append($('<option></option>').val(nom.FACT_NOMENCLA_ID).html(nom.FACT_NOMENCLA_DESC));
                $('#cbo_NomencladorBase').append($('<option></option>').val(nom.FACT_NOMENCLA_ID).html(nom.FACT_NOMENCLA_DESC));
            });
        },
        error: errores
    });

}



 function CargarConvenios() {
     var json = JSON.stringify({ "Convenio": null });
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
    //$("#cbo_ConvMasivo").empty();
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


$("#cbo_convenios").change(function () {
    BuscarNomencladores(false);
    //ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val());
});

$("#cbo_ConvMasivo").change(function () {
    BuscarNomencladoresMasivo(false);
});

$("#cbo_Nomenclador").change(function () {
    ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val().trim(), $("#cbo_Nomenclador :selected").val());
});

function Cargar_Especialidades() {
    var json = JSON.stringify({ "CodigoId": $('#cboPracticas :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/Fac_PracticaEspecialidad_List_by_PracticaId",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargadas,
        error: errores,
        complete: function () { 
            $('#cbo_Especialidad').val(EspecialidadId);
        }
    });  
}

function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $('#cbo_Especialidad').append($('<option></option>').val("0").html("Seleccione Especialidad..."));
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append($('<option></option>').val(especialidades.Id).html(especialidades.Especialidad));
    });
}

function List_EspecialidadesTodas() {
    $.ajax({
        type: "POST",
        url: "../Json/Administracion/_Especialidades.asmx/ListEspecialidades",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Especialidad = Resultado.d;
            $('#cbo_EspMasivo').empty();
            $('#cbo_EspMasivo').append($('<option></option>').val("0").html("TODAS"));
            $.each(Especialidad, function (index, especialidades) {
                $('#cbo_EspMasivo').append($('<option></option>').val(especialidades.Id).html(especialidades.Especialidad_Nombre));
            });
        },
        error: errores
    });
}

function Cargar_Practicas() {
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Practicas_Listas_Total",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pracias_Cargadas,
        error: errores
    });
}

function Pracias_Cargadas(Resultado) {
    var Practicas = Resultado.d;
    $('#cboPracticas').empty();
    $('#cboPracticas').append($('<option></option>').val("0").html("Práctica"));
    $.each(Practicas, function (index, practicas) {
        $('#cboPracticas').append(
              $('<option></option>').val(practicas.Id).html(practicas.Practica)
            );
    });
}

$("#cboPracticas").change(function () {
    $("#txtCodigo").val($("#cboPracticas :selected").val());
    Cargar_Especialidades();

});

$("#txtCodigo").change(function () {
    var exists = 0 != $('#cboPracticas option[value=' + $("#txtCodigo").val() + ']').length;
    if (exists == 0) {
        $("#txtCodigo").val("");
        $("#txtCodigo").focus();
        ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val().trim(), $("#cbo_Nomenclador :selected").val());
        Cargar_Especialidades();
    }
    else {
        $("#cboPracticas option[value=" + $("#txtCodigo").val() + "]").attr("selected", true);
        ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val().trim(), $("#cbo_Nomenclador :selected").val());
        Cargar_Especialidades();
    }
});

$("#txtCodigo").blur(function () {
    if ($("#txtCodigo").val().trim().length > 0) {
        var exists = 0 != $('#cboPracticas option[value=' + $("#txtCodigo").val() + ']').length;
        if (exists == 0) {
            $("#txtCodigo").val("");
            $("#txtCodigo").focus();
            ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val().trim(), $("#cbo_Nomenclador :selected").val());
            Cargar_Especialidades();
        }
        else {
                $("#cboPracticas option[value=" + $("#txtCodigo").val() + "]").attr("selected", true);
                ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val().trim(), $("#cbo_Nomenclador :selected").val());
                Cargar_Especialidades();
        }
    }
});

function Validar() {
    if ($("#cboPracticas :selected").val() == "0") { alert("Seleccione Práctica."); return false; }
    if ($("#cbo_Especialidad :selected").val() == "0") { alert("Seleccione Especialidad."); return false; }
    if ($('#cbo_convenios option:selected').val() == "0") { alert("Seleccione Convenio."); return false; }
    if ($("#cbo_Nomenclador :selected").val() == "") { alert("Seleccione Nomenclador."); return false; }
    if ($("#txt_Vbono").val().trim().length == 0) $("#vbono").val('0');
    if ($("#txt_Vaa").val().trim().length == 0) $("#txt_Vaa").val('0');
    if ($("#txt_Vaci").val().trim().length == 0) $("#txt_Vaci").val('0');
    if ($("#txt_VNN").val().trim().length == 0) $("#txt_VNN").val('0');
    if ($("#txt_VG").val().trim().length == 0) $("#txt_VG").val('0');
    if ($("#txt_Honorario").val().trim().length == 0) $("#txt_Honorario").val('0');
    return true;
}

function Guardar() {
    if (!Validar()) return false;

            var json = JSON.stringify({
                "ConvenioId": $('#cbo_convenios option:selected').val(),
                "PracticaId": $("#txtCodigo").val().trim(),
                "EspecialidadId": $('#cbo_Especialidad option:selected').val(),
                "NomencladorId": $('#cbo_Nomenclador option:selected').val(),
                "vbono": $("#txt_Vbono").val().trim().replace(",","."),
                "vaa": $("#txt_Vaa").val().trim().replace(",", "."),
                "vaci": $("#txt_Vaci").val().trim().replace(",", "."),
                "vnn": $("#txt_VNN").val().trim().replace(",", "."),
                "vg": $("#txt_VG").val().trim().replace(",", "."),
                "vhono": $("#txt_Honorario").val().trim().replace(",", ".")
            });

            $.ajax({
                type: "POST",
                url: "../Json/Facturacion/AltasNomencladores.asmx/GuardarValorPracticas",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    alert("Guardado");
                    ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val().trim(), $("#cbo_Nomenclador :selected").val());
                    LimpiarCampos();
                },
                error: errores
            });
}

function LimpiarCampos() {
    $("#txt_Vbono").val('0');
    $("#txt_Vaa").val('0');
    $("#txt_Vaci").val('0');
    $("#txt_VNN").val('0');
    $("#txt_VG").val('0');
    $("#txt_Honorario").val('0');

    $("#txtCodigo").attr("disabled", false);
    $("#cboPracticas").attr("disabled", false);
    $("#cbo_convenios").attr("disabled", false);
    $("#cbo_Especialidad").attr("disabled", false);
    $("#cbo_Nomenclador").attr("disabled", false);
    EditandoId = 0;
}

function ListarPracticas(Convenio, Practica, NomencladorId) {
    if (NomencladorId.toString().length == 0) return false;
    var json = JSON.stringify({ "ConvenioId": Convenio, "PracticaId": Practica, "NomencladorId": NomencladorId});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/AltasNomencladores.asmx/Fact_EspecialidadPracticaConvenios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practicas_Listadas,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaBonos").hide();
            $("#thread").hide(); 
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaBonos").show();
            $("#thread").show(); 
        }
    });
}

function Practicas_Listadas(Resultado) {
    var Practicas = Resultado.d;
    $("#TablaPracticas").empty();
    var Tabla_Datos = "";
    $.each(Practicas, function (index, practicas) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + "><td class='mano' onclick=Editar(" + index + ");>" + practicas.convenio + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.especialidad + "</td><td id='nomencladorId" + index + "' style='display:none;'>" + practicas.nomencladorid + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.practicaid + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.practica + "</td><td style='display:none;'><input id='TxT_ConvenioId" + index + "' type='hidden' value='" + practicas.convenioid + "'/><input id='TxT_PracticaId" + index + "' type='hidden' value='" + practicas.practicaid + "'/><input id='TxT_EspecialidadId" + index + "' type='hidden' value='" + practicas.especialidadid + "'/><input id='VNN" + index + "' type='hidden' value='" + practicas.ValorNN + "'/><input id='I_Prac_VGastos" + index + "' value='" + practicas.ValorGastos + "' /><input id='I_Prac_VHono" + index + "' value='" + practicas.ValorHonorario + "' /><input id='I_Prac_VBono" + index + "' value='" + practicas.ValorBono + "' /><input id='I_Prac_ValorACA" + index + "' value='" + practicas.ValorACA + "' /><input id='I_Prac_ValorACI" + index + "' value='" + practicas.ValorACI + "' /></td><td>$" + practicas.ValorNN + "</td><td>&nbsp;&nbsp;<a class='btn btn-danger btn-mini' onclick=Quitar(" + index + ");>Quitar</a></td></tr>";
    });
    $("#TablaPracticas").html(Tabla_Datos);
}

function Editar(Id) {

    $("#txtCodigo").attr("disabled", true);
    $("#cboPracticas").attr("disabled", true);
    $("#cbo_convenios").attr("disabled", true);
    $("#cbo_Especialidad").attr("disabled", true);
    $("#cbo_Nomenclador").attr("disabled", true);
    EspecialidadId = $("#TxT_EspecialidadId" + Id).val();
    $("#txtCodigo").val($("#TxT_PracticaId" + Id).val());
    $("#cboPracticas option[value=" + $("#TxT_PracticaId" + Id).val() + "]").attr("selected", true);
    Cargar_Especialidades();
    $("#cbo_convenios option[value=" + $("#TxT_ConvenioId" + Id).val() + "]").attr("selected", true);
    $("#cbo_Nomenclador").val($("#nomencladorId" + Id).html());
    $("#txt_Vbono").val($("#I_Prac_VBono" + Id).val());
    $("#txt_Vaa").val($("#I_Prac_ValorACA" + Id).val());
    $("#txt_Vaci").val($("#I_Prac_ValorACI" + Id).val());
    $("#txt_VNN").val($("#VNN" + Id).val());
    $("#txt_VG").val($("#I_Prac_VGastos" + Id).val());
    $("#txt_Honorario").val($("#I_Prac_VHono" + Id).val());
}

function ValidarQuitar(Id) {
    if (Id <= 0) { alert("Seleccione Práctica."); return false; }
    if ($('#TxT_ConvenioId' + Id).val().length == 0) { alert("Seleccione Convenio."); return false; }
    if ($('#TxT_PracticaId' + Id).val().length == 0) { alert("Seleccione Práctica."); return false; }
    if ($('#TxT_EspecialidadId' + Id).val().length == 0) { alert("Seleccione Especialidad."); return false; }
    if ($('#nomencladorId' + Id).html().length == 0) { alert("Seleccione Nomenclador."); return false; }
    return true;
}

function Quitar(Id) {
    if (!ValidarQuitar(Id)) return false;
    if (confirm("¿Desea eliminar este valor?")) {
        var json = JSON.stringify({
            "ConvenioId": $('#TxT_ConvenioId' + Id).val(),
            "PracticaId": $('#TxT_PracticaId' + Id).val(),
            "EspecialidadId": $('#TxT_EspecialidadId' + Id).val(),
            "NomencladorId": $('#nomencladorId' + Id).html()
        });

        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/AltasNomencladores.asmx/QuitarValorPracticasConvenios",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val().trim(), $("#cbo_Nomenclador :selected").val());
                $("#Cancelar").click();
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

    $("#txtCodigo").attr("disabled", false);
    $("#cboPracticas").attr("disabled", false);
    $("#cbo_convenios").attr("disabled", false);
    $("#cbo_Especialidad").attr("disabled", false);
    $("#cbo_Nomenclador").attr("disabled", false);
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

function ValidarMasivo() {
    if ($("#cbo_ConvMasivo :selected").val() == '0') { alert("Seleccione Convenio."); return false; }
    if ($("#cbo_Nomencla_Masivo :selected").val() == "0") { alert("Seleccione Nomenclador."); return false; }
    if ($("#txtCodigoDesde").val().trim().length == 0) { alert("Ingrese rango de Código."); return false; }
    if ($("#txtCodigoHasta").val().trim().length == 0) { alert("Ingrese rango de Código."); return false; }
    if ($("#txtValor").val().trim().length == 0) { alert("Ingrese Valor de Cambio."); return false; }
    if ($("#rdPorcentaje").is(":checked") && $("#cbo_NomencladorBase :selected").val() == "0") { alert("Seleccione Nomenclador Base."); return false; }
    return true;
}

$("input[type=radio][name=TipoAumento]").change(function () {
    if ($(this).val() == "Porcentaje") $(".NomenclaBase").show();
    else $(".NomenclaBase").hide();
});

$("#btnActualizarMasivo").click(function () {
    if (!ValidarMasivo()) return false;

    var valor = 0;
    var porcentaje = 0;
    var nomencladorBase = 1;


    if ($("#rdValor").is(":checked")) valor = $("#txtValor").val().trim(); //Por valor
    else {
        porcentaje = 1.00 + (parseFloat($("#txtValor").val().trim()) / 100); //Por porcentaje
        nomencladorBase = $("#cbo_NomencladorBase :selected").val(); //Elijo nomenclador Base
    }

    var json = JSON.stringify({ "NomencladorId": $("#cbo_Nomencla_Masivo :selected").val(), "ConvenioId": $("#cbo_ConvMasivo :selected").val(),
        "EspecialidadId": $("#cbo_EspMasivo :selected").val(), "CodigoDesde": $("#txtCodigoDesde").val(), "CodigoHasta": $("#txtCodigoHasta").val(),
        "Porcentaje": porcentaje, "Valor": valor, "NomencladorBase": nomencladorBase
    });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ActualizarPracticasMasiva",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            ListarPracticas($("#cbo_ConvMasivo :selected").val(), 0, $("#cbo_Nomencla_Masivo :selected").val());
            alert('Valores Actualizados.');
        },
        error: errores
    });
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
    if ($("#cbo_Nomenclador :selected").val() == "") {alert("Seleccione Nomenclador."); return false;}
    Ventana('../Impresiones/Impresion_Facturacion_NomencladorValores.aspx?NomencladorId=' + $("#cbo_Nomenclador :selected").val());
});

$("#btnCancelarMasivo").click(function () {
    $(".masivo").val("");
    $(".masivo").removeAttr("checked");
});