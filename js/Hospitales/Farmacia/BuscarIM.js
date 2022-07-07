var objBusquedaLista;
var total_serv;

$(document).ready(function () {
    InitControls();
});

$("#txtNroPed").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtNroPed').attr('readonly') == undefined) {
            $("#btnBuscar").click();
        }
    }
});

function InitControls() {
    $("#txtNroPed").mask("9?99999999", { placeholder: "", clearOnLostFocus: true });
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    $("#hasta").mask("99/99/9999", { placeholder: "-" });
    List_Servicios();
    List_Medicos();
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#desde").val(p);
    $("#hasta").val(d);
}

$(function () {
    $("#desde").datepicker({
        onClose: function (selectedDate) {
            $("#hasta").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#hasta").datepicker({
        onClose: function (selectedDate) {
            $("#desde").datepicker("option", "maxDate", selectedDate);
        }
    });
});

$("#btnCargar").click(function () {
    document.location = "CargarIM.aspx";
});

function List_Servicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Cargado,
        error: errores
    });
}

function List_Servicios_Cargado(Resultado) {

    var Servicio = Resultado.d;
    $('#Servicio1').empty();
    $('#Servicio2').empty();

    total_serv = Servicio.length;
    var mitad1 = Math.ceil(total_serv / 2);
    var i = 0;

    for (i = 0; i < mitad1; i++) {
        $('#Servicio1').append('<label class="checkbox"><input class="checks" checked disabled onclick=Set() id="CBS' + i + '" type="checkbox" value="' + Servicio[i].id + '">' + Servicio[i].descripcion + '</label>');
    }

    for (i = mitad1; i <= (total_serv - 1); i++) {
        $('#Servicio2').append('<label class="checkbox"><input class="checks" checked disabled onclick=Set() id="CBS' + i + '" type="checkbox" value="' + Servicio[i].id + '">' + Servicio[i].descripcion + '</label>');
    }

}

function Set() {
    $("#cbo_Todos_Especialidades").removeAttr("checked");
    $("#chk_Ninguno").removeAttr("checked");
}

function List_Medicos() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivos",
        data: '{Especialidad: "' + 0 + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });

}

$("#cbo_Todos_Especialidades").click(function () {
    if ($(this).is(":checked")) {
        $(".checks").attr("checked", true);
        $(".checks").attr("disabled", true);
        $("#chk_Ninguno").removeAttr("checked");
    }
    else {
        $(".checks").removeAttr("checked");
        $(".checks").removeAttr("disabled");
    }
});



$("#chk_Ninguno").click(function () {
    if ($(this).is(":checked")) {
        $(".checks").removeAttr("checked");
        $(".checks").removeAttr("disabled");
        $("#cbo_Todos_Especialidades").removeAttr("checked");
    }
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnBuscar").click(function () {
    objBusquedaLista = "";
    for (var j = 0; j < total_serv; j++) {

        if ($('input[id=CBS' + j + ']').is(':checked')) {
            objBusquedaLista = objBusquedaLista + $('input[id=CBS' + j + ']:checked').val() + ",";
        }
    }
    Buscar_Pedidos();
});

function Buscar_Pedidos() {
    var MedicoId = $("#cbo_Medicos").val();
    var json = JSON.stringify({ "NHC": $('#txtNHC').val(), "Id": $('#txtNroPed').val(), "Apellido": $('#txtNombre').val(), "Desde": $('#desde').val(), "Hasta": $('#hasta').val(), "objBusquedaLista": objBusquedaLista, "MedicoId": MedicoId });
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/BuscarIM",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pedidos_Cargados,
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

function Pedidos_Cargados(Resultado) {
    Pedidos = Resultado.d;
    if (Pedidos != null) {
        var Tabla_Datos = "";

        Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Pedido</th><th>Fecha</th><th>NHC</th><th>Paciente</th><th>Servicio</th><th>Sala</th><th>Cama</th></tr></thead><tbody>";
        $.each(Pedidos, function (index, Pedido) {
            Tabla_Datos = Tabla_Datos + "<tr";
            Tabla_Datos = Tabla_Datos + " style='cursor:pointer; font-size:11px;' onclick=Ventana('CargarIM.aspx?IdPedido=" + Pedido.IM_Id + "');";
            Tabla_Datos = Tabla_Datos + "><td>" + Pedido.IM_Id + "</td><td>" + Pedido.Fecha + "</td><td>" + Pedido.NHC + "</td><td>" + Pedido.Nombre + "</td><td>" + Pedido.Servicio + "</td><td>" + Pedido.Cama + "</td><td>" + Pedido.Sala + "</td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    }
    else $("#TablaPedidos_div").empty();
}

function Ventana(url) {
    document.location = url;
}
