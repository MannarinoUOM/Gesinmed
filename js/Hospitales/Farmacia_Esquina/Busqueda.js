var G_Seccionales_Ids;
var G_Patologias_Ids;

$(document).ready(function () {
    InitControls();
});


function InitControls() {
    $(".date").mask("99/99/9999", { placeholder: "-" });
    $(".date").datepicker();

    Cargar_Seccionales_Lista("");
    ListPatologias(0);
    List_Diagnosticos(false);
}

function Cargar_Seccionales_Lista(Cod) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Practicas = Resultado.d;
            $('#FiltroSeccionales').empty();
            $.each(Practicas, function (index, p) {
                $('#FiltroSeccionales').append('<label style="text-align:left; font-size:10px;"><input id="Pr' + p.Nro + '" class="chk_seccional" onclick="Click_Checkbox_Sec()" type="checkbox" value="' + p.Nro + '" checked>' + p.Seccional.toString().toUpperCase() + '</label>');
            });
        },
        error: errores
    });
}

function ListPatologias(Id) {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/Patologia.asmx/Patologia_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $('#FiltroPatologias').empty();
            $.each(Lista, function (index, p) {
                $('#FiltroPatologias').append('<label style="text-align:left; font-size:10px;"><input id="Pr' + p.id + '" onclick="Click_Checkbox_Pat()" type="checkbox" value="' + p.id + '" checked>' + p.patologias + '</label>');
            });
        },
        error: errores
    });
}

function List_Diagnosticos(Todos) {
    var json = JSON.stringify({ "Todos": Todos });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/Expediente_Diagnostico_List",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $("#cbo_Discapacidad").empty();
            $('#cbo_Discapacidad').append($('<option></option>').val("0").html("Seleccione Discapacidad..."));
            $.each(Lista, function (index, diag) {
                $('#cbo_Discapacidad').append($('<option></option>').val(diag.Diagnostico_Id).html(diag.Diagnostico_Desc));
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

$("#btnBuscar").click(function () {
    Recorrer_ChkSeccionales();
    Recorrer_ChkPatologias();
    Buscar_Expedientes($('#txtNroExpediente').val(), $('#txtRemito').val(), $('#txtPaciente').val().trim(),
    $('#cbo_Discapacidad :selected').val(), $('#txtNroDoc').val(), $('#txtVencimientoDesde').val(), $('#txtVencimientoHasta').val(),
    $('#txtNroPedido').val());
});

function Buscar_Expedientes(EXP_ID, EXP_REMITO, EXP_NOMBRE, EXP_DIAG_ID, EXP_NRO_DOC, EXP_VENC_FECHA_DESDE,
        EXP_VENC_FECHA_HASTA, NRO_PEDIDO) {

    if (EXP_ID.length == 0) EXP_ID = 0;
    if (EXP_REMITO.length == 0) EXP_REMITO = 0;
    if (EXP_NOMBRE.trim.length == "") EXP_NOMBRE = "";
    if (EXP_NOMBRE.length == 0) EXP_DIAG_ID = 0;
    if (EXP_NRO_DOC.length == 0) EXP_NRO_DOC = 0;
    if (EXP_VENC_FECHA_DESDE.length == 0) EXP_VENC_FECHA_DESDE = "01/01/1900";
    if (EXP_VENC_FECHA_HASTA.length == 0) EXP_VENC_FECHA_HASTA = "01/01/1900";
    if (NRO_PEDIDO.length == 0) NRO_PEDIDO = 0;


    var obj = {};

    obj.EXP_ID = EXP_ID;
    obj.EXP_REMITO = EXP_REMITO;
    obj.EXP_NOMBRE = EXP_NOMBRE;
    obj.EXP_DIAG_ID = EXP_DIAG_ID;
    obj.EXP_NRO_DOC = EXP_NRO_DOC;
    obj.EXP_VENC_FECHA_DESDE = EXP_VENC_FECHA_DESDE;
    obj.EXP_VENC_FECHA_HASTA = EXP_VENC_FECHA_HASTA;
    obj.NRO_PEDIDO = NRO_PEDIDO;
    obj.SeccionalesIds = G_Seccionales_Ids;
    obj.PatologiasIds = G_Patologias_Ids;

    var json = JSON.stringify({ "obj": obj });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia_Esquina.asmx/buscar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var expedientes = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            Tabla_Titulo = "<table id='TablaBonos' class='table table-hover table-condensed'><thead><tr><th>Nro. Expte.</th><th>Apellido y Nombre</th><th>Entrega</th><th>Nro. Doc.</th><th>Patologia</th><th>Seccional</th><th>Descuento</th></tr></thead><tbody>";
            $.each(expedientes, function (index, exp) {

                if (exp.ENT_FEC_ENT == '01/01/1900') exp.ENT_FEC_ENT = "";
                if (exp.EXP_NRO_DOC == 0) exp.EXP_NRO_DOC = "";

                Tabla_Datos += "<tr onclick='AbrirExpediente(" + exp.PDT_PED_ID + ")'><td>" + exp.PDT_PED_ID + "</td><td>" + exp.EXP_NOMBRE + "</td><td>" + exp.ENT_FEC_ENT + "</td><td>" + exp.EXP_NRO_DOC + "</td><td>" + exp.EXP_PATOLOGIAS + "</td><td>" + exp.EXP_SECCIONAL + "</td><td>" + exp.DESCUENTO + "%</th></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#table_b").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
            $("#lbl_CantidadReg").html(expedientes.length);
        },
        beforeSend: function () {
            $("#table_b").hide();
            $("#cargando").show();
            $("#lbl_CantidadReg").html("");
        },
        complete: function () {
            $("#table_b").show();
            $("#cargando").hide();
        },
        error: errores
    });
}

function Recorrer_ChkSeccionales() {
    G_Seccionales_Ids = "";
    $('input', $("#FiltroSeccionales")).each(function () {
        if ($(this).is(":checked"))
            G_Seccionales_Ids += $(this).val() + ",";
    });
    G_Seccionales_Ids = G_Seccionales_Ids.slice(0, -1);
}

function Recorrer_ChkPatologias() {
    G_Patologias_Ids = "";
    $('input', $("#FiltroPatologias")).each(function () {
        if ($(this).is(":checked"))
            G_Patologias_Ids += $(this).val() + ",";
    });
    G_Patologias_Ids = G_Patologias_Ids.slice(0, -1);
}

///Check todas seccionales///
$("#chk_Seccionales").click(function () {
    if ($("#chk_Seccionales").is(":checked")) {
        $("#chk_Seccionales_Des").attr("checked", false);
        $('input', $("#FiltroSeccionales")).each(function () {
            $(this).attr("checked", true);
        });
    }
});

///Check ninguna seccional///
$("#chk_Seccionales_Des").click(function () {
    if ($("#chk_Seccionales_Des").is(":checked")) {
        $("#chk_Seccionales").attr("checked", false);
        $('input', $("#FiltroSeccionales")).each(function () {
            $(this).attr("checked", false);
        });
    }
});


//Click en algun check de la lista seccionales//
function Click_Checkbox_Sec() {
    $("#chk_Seccionales_Des").removeAttr("checked"); //Desmarcar todos
    $("#chk_Seccionales").removeAttr("checked"); //Marcos todos
}



///Check todas patologias///
$("#chk_Patologias").click(function () {
    if ($("#chk_Patologias").is(":checked")) {
        $("#chk_Patologias_Des").attr("checked", false);
        $('input', $("#FiltroPatologias")).each(function () {
            $(this).attr("checked", true);
        });
    }
});

///Check ninguna patologias///
$("#chk_Patologias_Des").click(function () {
    if ($("#chk_Patologias_Des").is(":checked")) {
        $("#chk_Patologias").attr("checked", false);
        $('input', $("#FiltroPatologias")).each(function () {
            $(this).attr("checked", false);
        });
    }
});

//Click en algun check de la lista seccionales//
function Click_Checkbox_Pat() {
    $("#chk_Patologias_Des").removeAttr("checked"); //Desmarcar todos
    $("#chk_Patologias").removeAttr("checked"); //Marcos todos
}
