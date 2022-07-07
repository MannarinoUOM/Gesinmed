$(document).ready(function () {
    Tipo_Requerimiento_List(true);
    $("#txtFechaInicio").datepicker();
    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").datepicker();
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val(p);
    $("#txtFechaFin").val(d);
});

$(function () {
    $("#txtFechaInicio").datepicker({
        onClose: function (selectedDate) {
            $("#txtFechaFin").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#txtFechaFin").datepicker({
        onClose: function (selectedDate) {
            $("#txtFechaInicio").datepicker("option", "maxDate", selectedDate);
        }
    });
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
            $('#cbo_TipoReq').append($('<option></option>').val("0").html("Todos"));
            $.each(Reqs, function (index, Req) {
                $('#cbo_TipoReq').append($('<option></option>').val(Req.IdReqTipo).html(Req.Requerimiento));
            });
        },
        complete: function () {
            BuscarPedidos($("#txtNroHC").val().trim(), $("#TxtNroDoc").val().trim(), $("#txtAfiliado").val().trim(),
            $("#txtNroNota").val().trim(), $("#cbo_TipoReq :selected").val(), $("#txtPedidopor").val().trim(),
            $("#txtFechaInicio").val().trim(), $("#txtFechaFin").val().trim(), $("#chkEsSecuestro").is(":checked"),
            $("#chkEsObito").is(":checked"), $("#chkEsART").is(":checked"));
        },        
        error: errores
    });
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


function BuscarPedidos(NHC, NroDoc, Paciente, NroNota, TipoReq, PedidoPor, Desde, Hasta, EsSecuestro, EsObito, EsART) {
    if (NroDoc.trim().length == 0) NroDoc = "0";
    if (Desde.trim().length == 0) Desde = "01/01/1900";
    if (Hasta.trim().length == 0) Hasta = "01/01/1900";
     
    var json = JSON.stringify({"NHC": NHC, "NroDoc": NroDoc, "Paciente": Paciente, "NroNota": NroNota, "TipoReq": TipoReq, "PedidoPor": PedidoPor, "Desde": Desde,
        "Hasta": Hasta, "EsSecuestro": EsSecuestro, "EsObito": EsObito, "EsART": EsART
    });
    $.ajax({
        type: "POST",
        url: "../Json/Legales/Legales.asmx/Legales_Buscar_Requerimientos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Reqs = Resultado.d;
            var Tabla_Datos = "";
            Tabla_Titulo = "<table id='TablaPedidos' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Fecha</th><th>Paciente</th><th>NHC</th><th>Pedido por</th><th>Tipo Req.</th><th>N° Nota</th></tr></thead><tbody>";
            $.each(Reqs, function (index, Pedido) {
                Tabla_Datos = Tabla_Datos + "<tr onclick=AbrirPedido(" + Pedido.IdReq + ");"
                Tabla_Datos = Tabla_Datos + " style='cursor:pointer; font-size:11px;'";
                Tabla_Datos = Tabla_Datos + "><td>" + Pedido.Fecha + "</td><td>" + Pedido.Afiliado_Nombre + "</td><td>" + Pedido.NHC_UOM + "</td><td>" + Pedido.PedidoPor + "</td><td>" + Pedido.Requerimiento + "</td><td>" + Pedido.NroNota + "</td></tr>";
            });

            Tabla_Fin = "</tbody></table>";
            $("#TablaPedidos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        error: errores
    });
}

function AbrirPedido(IdReq) {
    window.location = "CargarPedido.aspx?IdReq=" + IdReq;
}


$("#btnBuscar").click(function () {
    BuscarPedidos($("#txtNroHC").val().trim(), $("#TxtNroDoc").val().trim(), $("#txtAfiliado").val().trim(),
        $("#txtNroNota").val().trim(), $("#cbo_TipoReq :selected").val(), $("#txtPedidopor").val().trim(),
        $("#txtFechaInicio").val().trim(), $("#txtFechaFin").val().trim(), $("#chkEsSecuestro").is(":checked"),
        $("#chkEsObito").is(":checked"), $("#chkEsART").is(":checked"));
});


