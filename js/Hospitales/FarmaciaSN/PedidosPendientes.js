var actualizar = 0;
$(document).ready(function () {
    $("#frm_Main").validate({
        rules: {
            'desde': { required: true, dateES: true },
            'hasta': { required: true, dateES: true }
        },
        messages: {
            'desde': { required: '', dateES: '' },
            'hasta': { required: '', dateES: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    $("#hasta").mask("99/99/9999", { placeholder: "-" });
    $("#desde").datepicker();
    $("#hasta").datepicker();
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#desde").val(p);
    $("#hasta").val(d);
    $("#btnActualizar").click();
});

$("#desde").change(function () {
    if ($("#frm_Main").valid()) {
        actualizar = 0;
        Limpiar();
        if ($("#rdPacientes").is(":checked") == true)
            Count_Pedidos_Pac();
        if ($("#rdIM").is(":checked") == true)
            Count_Pedidos_IM();
        if ($("#rdServicio").is(":checked") == true)
            Count_Pedidos_Serv();
        $("#controldesde").removeClass("error");
        $("#controlhasta").removeClass("error");
    }
});

$("#hasta").change(function () {
    if ($("#frm_Main").valid()) {
        actualizar = 0;
        Limpiar();
        if ($("#rdPacientes").is(":checked") == true)
            Count_Pedidos_Pac();
        if ($("#rdIM").is(":checked") == true)
            Count_Pedidos_IM();
        if ($("#rdServicio").is(":checked") == true)
            Count_Pedidos_Serv();
        $("#controlhasta").removeClass("error");
        $("#controldesde").removeClass("error");
    }
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#rdPacientes").click(function () {
    if ($("#frm_Main").valid()) {
        Limpiar(); actualizar = 0;
        Count_Pedidos_Pac();
    }
});
$("#rdIM").click(function () {
    if ($("#frm_Main").valid()) {
        Limpiar(); actualizar = 0;
        Count_Pedidos_IM();
    }
});

$("#rdServicio").click(function () {
    if ($("#frm_Main").valid()) {
        Limpiar(); actualizar = 0;
        Count_Pedidos_Serv();
    }
});

function Count_Pedidos_Pac() {
    var json = JSON.stringify({"Desde":  $("#desde").val(), "Hasta": $("#hasta").val()});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Pendientes_Pac",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Count_Pedidos_Pac_Cargados,
        error: errores
    });

}

function Count_Pedidos_IM() {
    var json = JSON.stringify({ "Desde": $("#desde").val(), "Hasta": $("#hasta").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Pendientes_IM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Count_Pedidos_IM_Cargados,
        error: errores,
        complete: function () {
            if (actualizar == 1)
            Count_Pedidos_Serv();
        }

    });

}

function Count_Pedidos_Serv() {
    var json = JSON.stringify({ "Desde": $("#desde").val(), "Hasta": $("#hasta").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Pendientes_Serv",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Count_Pedidos_Serv_Cargados,
        error: errores,
        complete: function () {
            if (actualizar == 1) Count_Pedidos_Pac();
        }
    });

}

function Limpiar() {
    $("#TotalServicio").empty();
    $("#TotalPacientes").empty();
    $("#TotalIM").empty();
}

function Count_Pedidos_Pac_Cargados(Resultado){
    Pedidos = Resultado.d;
    var Count = Pedidos.length;
    $("#TotalPacientes").html("Cantidad de Pedidos Pendientes: " + Count);
    $("#TablaPedidos_div").empty();
//    if (actualizar != 1) {
        var Tabla_Datos = "";
        Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Pedido</th><th>Paciente</th></thead><tbody>";
        $.each(Pedidos, function (index, Pedido) {
            Tabla_Datos = Tabla_Datos + "<tr";
            Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('CargarEntregaPPP.aspx?Id=" + Pedido.Pedido_Id + "');";
            Tabla_Datos = Tabla_Datos + "><td>" + Pedido.Pedido_Id + "</td><td>" + Pedido.Paciente + "</td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
//   }
}

function Count_Pedidos_IM_Cargados(Resultado) {
    Pedidos = Resultado.d;
    var Count = Pedidos.length;
    $("#TotalIM").html("Cantidad de Pedidos Pendientes: " + Count);
    $("#TablaPedidos_div").empty();
    if (actualizar != 1) {
        var Tabla_Datos = "";
        Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Pedido</th><th>Paciente</th></thead><tbody>";
        $.each(Pedidos, function (index, Pedido) {
            Tabla_Datos = Tabla_Datos + "<tr";
            Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('CargarEntregaIM.aspx?Id=" + Pedido.Pedido_Id + "');";
            Tabla_Datos = Tabla_Datos + "><td>" + Pedido.Pedido_Id + "</td><td>" + Pedido.Paciente + "</td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    }
}

function Count_Pedidos_Serv_Cargados(Resultado) {
    Pedidos = Resultado.d;
    var Count = Pedidos.length;
    $("#TotalServicio").html("Cantidad de Pedidos Pendientes: " + Count);
    $("#TablaPedidos_div").empty();
    if (actualizar != 1) {
        var Tabla_Datos = "";
        Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Pedido</th><th>Servicio</th></thead><tbody>";
        $.each(Pedidos, function (index, Pedido) {
            Tabla_Datos = Tabla_Datos + "<tr";
            Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('CargarEntregaPPS.aspx?Id=" + Pedido.Pedido_Id + "');";
            Tabla_Datos = Tabla_Datos + "><td>" + Pedido.Pedido_Id + "</td><td>" + Pedido.Servicio + "</td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    }

}

function Ventana(url) {
    document.location = url;
}

$("#btnActualizar").click(function () {
    if ($("#frm_Main").valid()) {
        actualizar = 1;
        $("#rdPacientes").attr("checked", true);
        Count_Pedidos_IM();
        $("#controlhasta").removeClass("error");
        $("#controldesde").removeClass("error");
    }
});
