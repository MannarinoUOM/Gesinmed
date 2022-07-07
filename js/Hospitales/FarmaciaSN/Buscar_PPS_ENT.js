$(document).ready(function () {
    $("#frm_Main").validate({
        rules: {
            'desde': { dateES: true },
            'hasta': { dateES: true },
            'txtNroPed': {number: true}
        },
        messages: {
            'desde': { dateES: ' ' },
            'hasta': { dateES: ' ' },
            'txtNroPed': { number: ' ' }
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
    $("#txtNroPed").mask("9?99999999", { placeholder: "", clearOnLostFocus: true });

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
    List_Servicios();
});

$("#txtNroPed").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtNroPed').attr('readonly') == undefined) {
            $("#btnBuscar").click();
        }
    }
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

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
    var Lista = Resultado.d;
    $.each(Lista, function (index, Servicio) {
        $("#cbo_Servicio").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
    });

}

$("#btnBuscar").click(function () {
    var valid = $("#frm_Main").valid();
    if (valid) {
        var json = JSON.stringify({ "Id": $('#txtNroPed').val(), "Desde": $('#desde').val(), "Hasta": $('#hasta').val(), "ServicioId": $('#cbo_Servicio :selected').val() });
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/BuscarPPS_ENT",
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
});

function Pedidos_Cargados(Resultado) {
    Pedidos = Resultado.d;
    var Tabla_Datos = "";
    Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Pedido</th><th>Servicio</th><th>Usuario</th><th>Fecha</th></tr></thead><tbody>";
    $.each(Pedidos, function (index, Pedido) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('CargarEntregaPPS.aspx?Id=" + Pedido.Pedido_Id + "');";
        Tabla_Datos = Tabla_Datos + "><td>" + Pedido.Pedido_Id + "</td><td>" + Pedido.Servicio + "</td><td>" + Pedido.Usuario + "</td><td>" + Pedido.Fecha + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

}

function Ventana(url) {
    document.location = url;
}