var EditandoId = 0;
var objRangos = new Array();
var Total = -1;



$(document).ready(function () {
    CargarConvenios();
    CargarRangos();
    CargarValorporConv();
    $("#frm_Main").validate({
        rules: {
            'txtValor': { required: true, money: true }
        },
        messages: {
            'txtValor': { required: '', money: '' }

        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            RemoveClass();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
});


function RemoveClass() {
    $(".control-group").removeClass();
}


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
    $.each(Convenios, function (index, Conv) {
        $('#cbo_Rango').append(
              $('<option></option>').val(Conv.RangoId).html(Conv.PracticaDesde + '-' + Conv.PracticaHasta)
            );
    });
}

function CargarConvenios() {
    //var json = JSON.stringify({ "objPracticas": objPracticas, "Documento": $("#txt_dni").val(), "EsPrimeraVez": false, "Verificado": '', "EmiteComprobante": TurnoEmiteComprobante, "AutorizanteId": $('#cboAutorizante option:selected').val(), "MedicoId": $('#cbo_Medico option:selected').val(), "EspecialidadId": $('#cbo_Especialidad option:selected').val(), "EsAtencionSinTurno": EsAtencionSinTurno, "EsUrgencia": false, "ReservaTurnoAhora": ReservaTurnoAhora, "FechaTurno": FechaTurno, "Recepcionaturno": Recepcionaturno });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/VerlosConvenios",
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConvenios_Cargado,
        error: errores
    });

}

function CargarConvenios_Cargado(Resultado) {
    var Convenios = Resultado.d;
    $.each(Convenios, function (index, Conv) {
        $('#cbo_Convenios').append(
              $('<option></option>').val(Conv.id).html(Conv.convenios)
            );
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnGuardar").click(function () {
    if ($("#frm_Main").valid() && $('#cbo_Convenios').val() != "" && $('#cbo_Rango').val()) {
        RemoveClass();
        var f = {};
        f.RangoId = $('#cbo_Rango :selected').val();
        f.ConvenioId = $('#cbo_Convenios :selected').val();
        f.Valor = $("#txtValor").val();
        var json = JSON.stringify({ "f": f });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/AltasNomencladores.asmx/InsertRangoValores",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: InsertRangoValores_Cargado,
            error: errores
        });
    }
    else alert('Verifique los campos');
});

function InsertRangoValores_Cargado() {
    alert("Valor Asignado");
    CargarValorporConv();
    Limpiar();
}

function CargarValorporConv() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/VerRangosporConvenio",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarValorporConv_Cargado,
        error: errores
    });
}

function CargarValorporConv_Cargado(Resultado) {
    var Convenios = Resultado.d;
    var Tabla_Datos = "";
    $("#TConvenios").empty();
    var i = 0;
    $.each(Convenios, function (index, conv) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " onclick=Editar(" + i + ");";
        Tabla_Datos = Tabla_Datos + "><td>" + conv.ConvenioDesc + "</td><td>" + conv.RangoDesc + "</td><td>" + conv.Valor + "</td></tr>";
        objRangos[i] = conv;
        i = i + 1;
        Total = Total + 1;
    });

    $("#TConvenios").html(Tabla_Datos);
}

function Editar(Id) {
    $("#cbo_Rango").val(objRangos[Id].RangoId);
    $("#cbo_Convenios").val(objRangos[Id].ConvenioId);
    $("#txtValor").val(objRangos[Id].Valor);
    EditandoId = Id;
    $("#btnQuitar").show();
}

function Limpiar() {
    $("#cbo_Rango").val('');
    $("#cbo_Convenios").val('');
    $("#txtValor").val('');
    $("#btnQuitar").hide();
    EditandoId = 0;
}

$("#btnCancelar").click(function () {
    Limpiar();
});

$("#btnQuitar").click(function () {
    var json = JSON.stringify({ "IdRango": objRangos[EditandoId].RangoId, "ConvenioId": objRangos[EditandoId].ConvenioId });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/Delete_RangoValoresConv",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Quitados,
        error: errores
    });
});

function Quitados(Resultado) {
    alert("Valor Quitado");
    CargarValorporConv();
    Limpiar();
}
