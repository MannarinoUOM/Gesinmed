var EditandoId = 0;
var objRangos = new Array();
var Total = -1;

$(document).ready(function () {
    $("#txtPracticaHasta").mask("9?99999", { placeholder: "-" });
    $("#txtPracticaDesde").mask("9?99999", { placeholder: "-" });
    CargarRangos();
    $("#frm_Main").validate({
        rules: {
            'txtPracticaHasta': { required: true },
            'txtPracticaDesde': { required: true }
        },
        messages: {
            'txtPracticaHasta': { required: '' },
            'txtPracticaDesde': { required: '' }

        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });

});

function CargarRangos() {
    //var json = JSON.stringify({ "objPracticas": objPracticas, "Documento": $("#txt_dni").val(), "EsPrimeraVez": false, "Verificado": '', "EmiteComprobante": TurnoEmiteComprobante, "AutorizanteId": $('#cboAutorizante option:selected').val(), "MedicoId": $('#cbo_Medico option:selected').val(), "EspecialidadId": $('#cbo_Especialidad option:selected').val(), "EsAtencionSinTurno": EsAtencionSinTurno, "EsUrgencia": false, "ReservaTurnoAhora": ReservaTurnoAhora, "FechaTurno": FechaTurno, "Recepcionaturno": Recepcionaturno });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/VerRangos",
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarRangos_Cargado,
        error: errores
    });

}

function CargarRangos_Cargado(Resultado) {
    var Convenios = Resultado.d;
    var Tabla_Datos = "";
    $("#TConvenios").empty();
    var i = 0;
    $.each(Convenios, function (index, conv) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " onclick=Editar(" + i + ");";
        Tabla_Datos = Tabla_Datos + "><td>" + conv.RangoId + "</td><td>" + conv.PracticaDesde + "</td><td>" + conv.PracticaHasta + "</td></tr>";
        objRangos[i] = conv;
        i = i + 1;
        Total = Total + 1;
    });

    $("#TConvenios").html(Tabla_Datos);
}

function Editar(Id) {
    $("#txtPracticaDesde").val(objRangos[Id].PracticaDesde);
    $("#txtPracticaHasta").val(objRangos[Id].PracticaHasta);
    EditandoId = Id;
    $("#btnQuitar").show();
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btnQuitar").click(function () {
    var json = JSON.stringify({ "Id": EditandoId });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/Delete_Rango",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Quitados,
        error: errores
    });
});

function Quitados(Resultado) {
        alert("Rango Quitado");
        CargarRangos();
        Limpiar();
}

function Limpiar() {
    $("#txtPracticaHasta").val('');
    $("#txtPracticaDesde").val('');
    $("#btnQuitar").hide();
    EditandoId = 0;
}

$("#btnCancelar").click(function () {
    Limpiar();
});

function RemoveClass() {
    $(".control-group").removeClass();
}

$("#btnGuardar").click(function () {
    //alert($("#frm_Main").valid());
    if ($("#frm_Main").valid()) {
        RemoveClass();
        var f = {};
        f.RangoId = EditandoId;
        f.PracticaDesde = $("#txtPracticaDesde").val();
        f.PracticaHasta = $("#txtPracticaHasta").val();
        var json = JSON.stringify({
            "f": f
        });

        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/AltasNomencladores.asmx/Insert_Rango",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: GuardarRango_Guardado,
            error: errores
        });
    }
});



function GuardarRango_Guardado(Resultado) {
    var d = Resultado.d;
    if (d > 0) {
        alert("Rango Guardado");
        Limpiar();
        CargarRangos();
    }
    else alert('Error al Guardar');
}

