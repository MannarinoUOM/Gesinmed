var afiliadoId = 0;
var presupuestoN = 0;

$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["afiliadoId"] != "" && GET["afiliadoId"] != null) {
        afiliadoId = GET["afiliadoId"];
        if (afiliadoId > 0) { $("#btnBuscar").click(); }
        $("#txtDni").val(GET["dni"]);
        $("#txtNhc").val(GET["nhc"]);
        $("#txtPaciente").val(GET["nombre"]);
    }
});

$("#btnBuscar").click(function () {
    $("#txtPaciente").val("");
    var NPresupuesto = 0;
    if ($("#txtNPresupuesto").val() != "") NPresupuesto = $("#txtNPresupuesto").val();

    var nombre = "";
    var json = JSON.stringify({ "afiliadoId": afiliadoId, "nombre": nombre, "documento": $("#txtDni").val(), "nhc": $("#txtNhc").val(), "Npresupuesto": NPresupuesto, "saldados": $("#chkSaldados").is(':checked') });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Odontologia.asmx/BuscarPresupuestosOdontologia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (NPresupuesto > 0) { cargarTabla(Resultado.d, NPresupuesto); } else { cargarTabla(Resultado.d, NPresupuesto); }
            
        },
        error: errores
    });
    afiliadoId = 0;
});

function cargarTabla(lista, NPresupuesto) {
    var encabezado = "<table class='table table-hover'><thead><tr style='background-color:Black; color:White'>" +
    "<th style='width:15%' align='center'><b>&nbsp;Nº Presupuesto</b></th>" +
    "<th style='width:64%' align='left'><b>Médico</b></th>" +
    "<th style='width:11%' align='center'><b>Valor</b></th>" +
    "<th style='width:10%' align='center'><b>Saldo</b></th></tr></thead>";
    var fila = "";
    var pie = "</table>";

    $.each(lista, function (index, item) {
        item.valor = parseFloat(item.valor, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
        item.saldo = parseFloat(item.saldo, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();

        item.valor = formatear(item.valor);
        item.saldo = formatear(item.saldo);
        //item.valor = item.valor.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        //item.saldo = item.saldo.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        fila += "<tr class='fila' id='fila" + item.Npresupuesto + "' style='cursor:pointer' onclick='seleccionar(" + item.Npresupuesto + ")'><td align='center'>" + item.Npresupuesto + "</td>" +
        "<td align='left'>" + item.medico + "</td>" +
        "<td class='moneda' align='center'>" + item.valor + "</td>" +
        "<td class='moneda' align='center' id='saldo" + item.Npresupuesto + "'>" + item.saldo + "</td>" +
        "<td class='moneda' align='center' id='medicoId" + item.Npresupuesto + "' style='display:none'>" + item.medicoId + "</td>" +
        "<td class='moneda' align='center' id='afiliadoId" + item.Npresupuesto + "' style='display:none'>" + item.afiliadoId + "</td>" +
        "<td id='nombre" + item.Npresupuesto + "' style='display:none'>" + item.nombre + "</td>" +
        "<td id='documento" + item.Npresupuesto + "' style='display:none'>" + item.documento + "</td>" +
        "<td id='nhc" + item.Npresupuesto + "' style='display:none'>" + item.nhc + "</td></tr>";
        if (NPresupuesto > 0) { $("#txtPaciente").val(item.nombre); $("#txtDni").val(item.documento); $("#txtNhc").val(item.nhc); }

    });

    $("#listaPresupuesto").html(encabezado + fila + pie);
   // $(".moneda").each(function (index, item) { $(this).mask('0.000,00', { reverse: true }); });  
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function seleccionar(Npresupuesto) {
    $(".fila").css("background-color", "White");
    $("#txtPaciente").val($("#nombre" + Npresupuesto).html());
    $("#txtDni").val($("#documento" + Npresupuesto).html());
    $("#txtNhc").val($("#nhc" + Npresupuesto).html());
    $("#txtNPresupuesto").val(Npresupuesto);

    $("#fila" + Npresupuesto).css("background-color", "Red");
    presupuestoN = Npresupuesto;
//    document.location = "../Odontologia/Presupuesto_Odontologia.aspx?cmp=1&Np=" + Npresupuesto + "&saldo=" + $("#saldo" + Npresupuesto).html() + "&medicoId=" + $("#medicoId" + Npresupuesto).html() + "&afiliadoId=" + $("#afiliadoId" + Npresupuesto).html();
}

$("#btnVer").click(function () {
    if (presupuestoN > 0) {
        document.location = "../Odontologia/Presupuesto_Odontologia.aspx?cmp=1&Np=" + presupuestoN + "&saldo=" + $("#saldo" + presupuestoN).html() + "&medicoId=" + $("#medicoId" + presupuestoN).html() + "&afiliadoId=" + $("#afiliadoId" + presupuestoN).html();
    }
});

function reemplazar(valor) {
    valor = valor.replace(".", "");
    valor = valor.replace(",", ".");
    return valor;
}

function formatear(valor) {
    //    valor = valor.replace(".", ",");
    //    valor = valor.replace(",", ".");
    //    return valor;

    var retorno = "";
    $.each(valor, function (index, item) {
        switch (item) {
            case ",":
                retorno += ".";
                break;
            case ".":
                retorno += ",";
                break;
            default:
                retorno += item;
                break;
        }
    });
    return retorno;
}

$("#btnLimpiar").click(function () { $(".limpiar").val(""); $(".fila").css("background-color", "white"); presupuestoN = 0; });