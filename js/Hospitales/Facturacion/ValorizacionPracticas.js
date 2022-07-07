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

$('#cbo_Nomencla').change(function () {
if ($("#cbo_convenios :selected").val() != "0")
    ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val(), $("#cbo_Nomencla :selected").val());
});

$("#btnPrint").click(function () {
    var url = "../Impresiones/Impresion_Fact_Practicas_por_Conv_Nomencla.aspx?Nomenclador=" + $('#cbo_Nomencla :selected').val() + "&Convenio=" + $('#cbo_convenios :selected').val();
    Ventana(url);
});

$(document).ready(function () {
    $("#frm_Valores").validate({
        rules: {
            'txt_VNN': { required: true },
            'txt_Vbono': { required: true },
            'txt_Vaa': { required: true }
        },
        messages: {
            'txt_VNN': { required: '' },
            'txt_Vbono': { required: '' },
            'txt_Vaa': { required: '' }

        }

    });
    CargarConvenios();
    Cargar_Especialidades(true, 0, false);
    //Cargar_Practicas(0,0);
    Cargar_Practicas_total();
    List_NomenclaSN();
    $("#txt_Vbono").attr("disabled", true);
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
});

$("#txt_VNN").blur(function () {
     var e = $("#txt_VNN").val();
     if (!isNaN(Number(e)) && e != "")
         $("#txt_VNN").val(parseFloat(e).toFixed(2));
 });

  $("#txt_Vbono").blur(function () {
     var e = $("#txt_Vbono").val();
     if (!isNaN(Number(e)) && e != "")
         $("#txt_Vbono").val(parseFloat(e).toFixed(2));
 });

 $("#txt_Vaa").blur(function () {
     var e = $("#txt_Vaa").val();
     if (!isNaN(Number(e)) && e != "")
         $("#txt_Vaa").val(parseFloat(e).toFixed(2));
 });

 $("#txt_VNN").focusin(function () {
     $("#txt_VNN").val('');
 });

 $("#txt_VNN").focusout(function () {
     if ($("#txt_VNN").val() == '') $("#txt_VNN").val('0.00');
 });

 $("#txt_Vaa").focusin(function () {
     $("#txt_Vaa").val('');
 });

 $("#txt_Vaa").focusout(function () {
     if ($("#txt_Vaa").val() == '') $("#txt_Vaa").val('0.00');
 });

 $("#txt_Vbono").focusin(function () {
     $("#txt_Vbono").val('');
 });

 $("#txt_Vbono").focusout(function () {
     if ($("#txt_Vbono").val() == '') $("#txt_Vbono").val('0.00');
 });

function CargarConvenios() {
    var json = JSON.stringify({"Convenio": ""});
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


$("#cbo_convenios").change(function () {
    ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val(), $("#cbo_Nomencla :selected").val());
});

function Cargar_Especialidades(Todos, Id, SoloTurnos) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargadas,
        error: errores
    });
}

function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
    });
}


//function Cargar_Practicas(Codigo, Id) {
//    var json = JSON.stringify({ "Codigo": Codigo, "Id":  Id});
//    $.ajax({
//        type: "POST",
//        url: "../Json/Facturacion/Facturacion.asmx/Lista_Practicas_Facturacion_por_OS",
//        data: json,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: Pracias_Cargadas,
//        error: errores
//    });
//}

function Cargar_Practicas_total() {
    var json = JSON.stringify({ "Practica": null, "Codigo": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Practicas/Practicas.asmx/Practicas_Listar_Facturacion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practicas_Combo,
        error: errores
    });
}

function Practicas_Combo(Resultado) {
    var Practicas = Resultado.d;
    $('#cboPracticas').empty();
    $('#cboPracticas').append($('<option></option>').val("0").html("Práctica"));
    $.each(Practicas, function (index, practicas) {
        $('#cboPracticas').append(
              $('<option></option>').val(practicas.Codigo).html(practicas.Codigo + '-' + practicas.descripcion)
            );
    });
}



$("#cboPracticas").change(function () {
    $("#txtCodigo").val($("#cboPracticas :selected").val());
});

$("#txtCodigo").change(function () {
    var exists = 0 != $('#cboPracticas option[value=' + $("#txtCodigo").val() + ']').length;
    if (exists == 0) {
        $("#txtCodigo").val("");
        $("#txtCodigo").focus();
        ListarPracticas($("#cbo_convenios :selected").val(), 0, $("#cbo_Nomencla :selected").val());
    }
    else {
        $("#cboPracticas option[value=" + $("#txtCodigo").val() + "]").attr("selected", true);
        ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val(), $("#cbo_Nomencla :selected").val());
    }
});

$("#txtCodigo").blur(function () {
    if ($("#txtCodigo").val().length > 0) {
        var exists = 0 != $('#cboPracticas option[value=' + $("#txtCodigo").val() + ']').length;
        if (exists == 0) {
            $("#txtCodigo").val("");
            $("#txtCodigo").focus();
            ListarPracticas($("#cbo_convenios :selected").val(), 0, $("#cbo_Nomencla :selected").val());
        }
        else {
            $("#cboPracticas option[value=" + $("#txtCodigo").val() + "]").attr("selected", true);
            ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val(), $("#cbo_Nomencla :selected").val());
        }
    }
});

function RemoveClass() {
    $(".control-group").removeClass("error");
}


function Guardar() {
    if (confirm("¿Desea guardar la valorización?")) {
        if ($("#frm_Valores").valid()) {
            RemoveClass();
            if ($("#txt_Vaa").val() != "0.00" && $("#txt_VNN").val() != "0.00") { alert("Ingrese Unidades Sanatoriales o Valor NN solamente"); return; }
            if ($("#cboPracticas :selected").val() != "0") {
                var json = JSON.stringify({
                    "ConvenioId": $('#cbo_convenios option:selected').val(),
                    "PracticaId": $("#txtCodigo").val(),
                    "EspecialidadId": 161,
                    "vbono": $("#txt_Vbono").val(),
                    "vaa": $("#txt_Vaa").val(),
                    "vaci": $("#txt_Vaci").val(),
                    "vnn": $("#txt_VNN").val(),
                    "vg": $("#txt_VG").val(),
                    "vhono": $("#txt_Honorario").val(),
                    "Nomenclador": $("#cbo_Nomencla :selected").val()
                });

                $.ajax({
                    type: "POST",
                    url: "../Json/Facturacion/AltasNomencladores.asmx/GuardarValorPracticas",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {
                        ListarPracticas($('#cbo_convenios option:selected').val(), 0, $("#cbo_Nomencla :selected").val());
                        UltimoAct = $("#txtCodigo").val();
                        LimpiarCampos();
                        alert("Guardado");
                    },
                    error: errores
                });

            }
            else {
                alert('Seleccione Una Práctica');
            }
        }
        else alert('Verifique los campos');
    }
}

function LimpiarCampos() {
    //$('#cbo_convenios').val('');
    $("#txtCodigo").val('');
    $('#cbo_Especialidad').val(161);
    $("#txt_Vbono").val('0.00');
    $("#txt_Vaa").val('0.00');
    $("#txt_Vaci").val('0.00');
    $("#txt_VNN").val('0.00');
    $("#txt_VG").val('0.00');
    $("#txt_Honorario").val('0.00');
    $("#txtCodigo").val('');
    $("#cboPracticas").val('0');
    //$("#cbo_convenios").val('0');


    $("#txtCodigo").attr("disabled", false);
    $("#cboPracticas").attr("disabled", false);
    $("#cbo_convenios").attr("disabled", false);
    $("#cbo_Especialidad").attr("disabled", false);
    EditandoId = 0;
}

function ListarPracticas(Convenio, Practica, Nomenclador) {
    var json = JSON.stringify({"ConvenioId": Convenio, "PracticaId": Practica, "Nomenclador": Nomenclador});
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
            $("#TablaPedidos_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaPedidos_div").show();
        }
    });
}

$("#btn_Actualizar").click(function () {
    Guardar();
});

function Practicas_Listadas(Resultado) {
    var Practicas = Resultado.d;
    $("#TablaPracticas").empty();

    var Tabla_Datos = "";

    $.each(Practicas, function (index, practicas) {
        Tabla_Datos = Tabla_Datos + "<tr";
        if (UltimoAct == practicas.practicaid)
            Tabla_Datos = Tabla_Datos + " style='background-color:#EAEAEA'><td class='mano' onclick=Editar(" + index + ");>" + practicas.convenio + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.practicaid + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.practica + "</td><td style='display:none;'><input id='TxT_ConvenioId" + index + "' type='hidden' value='" + practicas.convenioid + "'/><input id='TxT_PracticaId" + index + "' type='hidden' value='" + practicas.practicaid + "'/><input id='TxT_EspecialidadId" + index + "' type='hidden' value='" + practicas.especialidadid + "'/><input id='VNN" + index + "' type='hidden' value='" + practicas.ValorNN + "'/><input id='I_Prac_VGastos" + index + "' value='" + practicas.ValorGastos + "' /><input id='I_Prac_VHono" + index + "' value='" + practicas.ValorHonorario + "' /><input id='I_Prac_VBono" + index + "' value='" + practicas.ValorBono + "' /><input id='I_Prac_ValorACA" + index + "' value='" + practicas.ValorACA + "' /><input id='I_Prac_ValorACI" + index + "' value='" + practicas.ValorACI + "' />   </td><td> $" + practicas.ValorNN + "</td><td> $" + practicas.ValorHonorario + "</td><td>&nbsp;&nbsp;<a class='btn btn-danger btn-mini' onclick=Quitar(" + index + ");>Quitar</a></td></tr>";
        else Tabla_Datos = Tabla_Datos + "><td class='mano' onclick=Editar(" + index + ");>" + practicas.convenio + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.practicaid + "</td><td class='mano' onclick=Editar(" + index + ");>" + practicas.practica + "</td><td style='display:none;'><input id='TxT_ConvenioId" + index + "' type='hidden' value='" + practicas.convenioid + "'/><input id='TxT_PracticaId" + index + "' type='hidden' value='" + practicas.practicaid + "'/><input id='TxT_EspecialidadId" + index + "' type='hidden' value='" + practicas.especialidadid + "'/><input id='VNN" + index + "' type='hidden' value='" + practicas.ValorNN + "'/><input id='I_Prac_VGastos" + index + "' value='" + practicas.ValorGastos + "' /><input id='I_Prac_VHono" + index + "' value='" + practicas.ValorHonorario + "' /><input id='I_Prac_VBono" + index + "' value='" + practicas.ValorBono + "' /><input id='I_Prac_ValorACA" + index + "' value='" + practicas.ValorACA + "' /><input id='I_Prac_ValorACI" + index + "' value='" + practicas.ValorACI + "' />   </td><td> $" + practicas.ValorNN + "</td><td> $" + practicas.ValorHonorario + "</td><td>&nbsp;&nbsp;<a class='btn btn-danger btn-mini' onclick=Quitar(" + index + ");>Quitar</a></td></tr>";
    });
    //alert(Tabla_Datos);
    $("#TablaPracticas").html(Tabla_Datos);
}

function Editar(Id) {

    $("#txtCodigo").attr("disabled", true);
    $("#cboPracticas").attr("disabled", true);
    $("#cbo_convenios").attr("disabled", true);
    $("#cbo_Especialidad").attr("disabled", true);

    $("#cbo_convenios option[value=" + $("#TxT_ConvenioId"+Id).val() + "]").attr("selected", true);
    $("#txtCodigo").val($("#TxT_PracticaId" + Id).val());
    $("#cboPracticas option[value=" + $("#TxT_PracticaId" + Id).val() + "]").attr("selected", true);
    $("#cbo_Especialidad option[value=" + 161 + "]").attr("selected", true);
    //$("#cbo_Especialidad option[value=" + $("#TxT_EspecialidadId" + Id).val() + "]").attr("selected", true);

    $("#txt_Vbono").val($("#I_Prac_VBono" + Id).val());
    $("#txt_Vaa").val(parseFloat($("#I_Prac_ValorACA" + Id).val()).toFixed(2));
    $("#txt_Vaci").val($("#I_Prac_ValorACI" + Id).val());
    $("#txt_VNN").val($("#VNN" + Id).val());
    $("#txt_VG").val($("#I_Prac_VGastos" + Id).val());
    $("#txt_Honorario").val($("#I_Prac_VHono" + Id).val());

}

function Quitar(Id) {
    if (confirm("¿Desea quitar la valorización?")) {
        var json = JSON.stringify({
            "ConvenioId": $('#TxT_ConvenioId' + Id).val(),
            "PracticaId": $('#TxT_PracticaId' + Id).val(),
            "EspecialidadId": $('#TxT_EspecialidadId' + Id).val(),
            "Nomenclador": $("#cbo_Nomencla :selected").val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/AltasNomencladores.asmx/QuitarValorPracticasConvenios",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                LimpiarCampos();
                ListarPracticas($('#TxT_ConvenioId' + Id).val(), 0, $("#cbo_Nomencla :selected").val());
            },
            error: errores
        });
    }
}

$("#Cancelar").click(function () {

    $("#txt_Vbono").val("0.00");
    $("#txt_Vaa").val("0.00");
    $("#txt_Vaci").val("0.00");
    $("#txt_VNN").val("0.00");
    $("#txt_VG").val("0.00");
    $("#txt_Honorario").val("0.00");
    $("#cbo_Especialidad").val(161);
    $("#txtCodigo").val('');
    $("#cboPracticas").val('0');
    //$("#cbo_convenios").val('0');


    $("#txtCodigo").attr("disabled", false);
    $("#cboPracticas").attr("disabled", false);
    $("#cbo_convenios").attr("disabled", false);
    $("#cbo_Especialidad").attr("disabled", false);
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
    var json = JSON.stringify({"ConvenioId": $("#cbo_ConvMasivo :selected").val(), "CodigoDesde": $("#txtCodigoDesde").val(), "CodigoHasta": $("#txtCodigoHasta").val(), "Porcentaje": porcentaje, "Valor": valor});
    $.ajax({
    type: "POST",
    url: "../Json/Facturacion/Facturacion.asmx/ActualizarPracticasMasiva",
    data: json,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: ActualizarMasivo_Cargado,
    error: errores
    });
});

function ActualizarMasivo_Cargado()
{
    alert('Actualizados');
    window.location = "ValorizacionPracticas.aspx";
}


$("#cbo_ConvMasivo").change(function () {
    ListarPracticas($("#cbo_ConvMasivo :selected").val(), 0, $("#cbo_Nomencla :selected").val());
});

$("#cbo_Nomencla").change(function () {
    if ($("#txtCodigo").val().length > 0)
    ListarPracticas($("#cbo_convenios :selected").val(), $("#txtCodigo").val(), $("#cbo_Nomencla :selected").val());
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