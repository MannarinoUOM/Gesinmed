var actualizar = 0;
var Cantidad_Estado = [0, 0]; //Entregados,Pendientes
var mensajes = ["Estamos procesando tu solicitud...", "Solo falta un poco mas...", "Un poco mas...", "La paciencia es un árbol de raíz amarga pero de frutos muy dulces ;) ..."];

function Contadores() {
    $("#btn_Libres").html("Pendientes (" + Cantidad_Estado[0] + ")");
    $("#btn_SobreT").html("Entregados (" + Cantidad_Estado[1] + ")");
    var Totales = Cantidad_Estado[0] + Cantidad_Estado[1];
    $("#btn_Todos").html("Todos (" + Totales + ")");
}

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

function Buscar() {
    if ($("#rdPacientes").is(":checked") == true)
        Count_Pedidos_Pac();
    if ($("#rdIM").is(":checked") == true)
        Count_Pedidos_IM();
    if ($("#rdServicio").is(":checked") == true)
        Count_Pedidos_Serv();
}

$("#btn_Libres").click(function () {
    $(".reff").removeClass("reff_activo");
    $("#btn_Libres").addClass("reff_activo");
    Buscar();
});

$("#btn_SobreT").click(function () {
    $(".reff").removeClass("reff_activo");
    $("#btn_SobreT").addClass("reff_activo");
    Buscar();
});

$("#btn_Todos").click(function () {
    $(".reff").removeClass("reff_activo");
    $("#btn_Todos").addClass("reff_activo");
    Buscar();
});


function Count_Pedidos_Pac() {
    $("#cargando").show();
    $("#TablaPedidos_div").hide();
    jQuery("#frm_Main input:radio").attr('disabled', true);
    jQuery("#frm_Main input:text").attr('disabled', true);

    $("#mensaje").text("Cargando...");

    setTimeout(function () {
        $("#mensaje").text(mensajes[1]);

        setTimeout(function () {
            $("#mensaje").text(mensajes[2]);

            setTimeout(function () {
                $("#mensaje").text(mensajes[3]);

                setTimeout(function () {
                    $("#mensaje").text(mensajes[4]);

                }, 6000);
            }, 6000);
        }, 6000);
    }, 6000);

    var Pendiente = 0;
    if ($("#btn_Todos").hasClass("reff_activo")) Pendiente = 0;// busca todos 
    if ($("#btn_Libres").hasClass("reff_activo")) Pendiente = 1;// busca pendientes
    if ($("#btn_SobreT").hasClass("reff_activo")) Pendiente = 2;// busca entregados
    var json = JSON.stringify({"Desde":  $("#desde").val(), "Hasta": $("#hasta").val(), "Pendiente": Pendiente});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/Pendientes_Pac",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Count_Pedidos_Pac_Cargados,
        error: errores,
        complete: function () {
            Contadores();
        }
    });

}

function Count_Pedidos_IM() {
    $("#cargando").show();
    $("#TablaPedidos_div").hide();
    jQuery("#frm_Main input:radio").attr('disabled', true);
    jQuery("#frm_Main input:text").attr('disabled', true);
    $("#mensaje").text("Cargando...");

    setTimeout(function () {
        $("#mensaje").text(mensajes[1]);

        setTimeout(function () {
            $("#mensaje").text(mensajes[2]);

            setTimeout(function () {
                $("#mensaje").text(mensajes[3]);

                setTimeout(function () {
                    $("#mensaje").text(mensajes[4]);

                }, 6000);
            }, 6000);
        }, 6000);
    }, 6000);

    var Pendiente = 0;
    if ($("#btn_Todos").hasClass("reff_activo")) Pendiente = 0;
    if ($("#btn_Libres").hasClass("reff_activo")) Pendiente = 1;
    if ($("#btn_SobreT").hasClass("reff_activo")) Pendiente = 2;
    var json = JSON.stringify({ "Desde": $("#desde").val(), "Hasta": $("#hasta").val(), "Pendiente": Pendiente });
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
            Contadores();
        }

    });

}

function Count_Pedidos_Serv() {
    $("#cargando").show();
    $("#TablaPedidos_div").hide();
    jQuery("#frm_Main input:radio").attr('disabled', true);
    jQuery("#frm_Main input:text").attr('disabled', true);

    $("#mensaje").text("Cargando...");

    setTimeout(function () {
        $("#mensaje").text(mensajes[1]);

        setTimeout(function () {
            $("#mensaje").text(mensajes[2]);

            setTimeout(function () {
                $("#mensaje").text(mensajes[3]);

                setTimeout(function () {
                    $("#mensaje").text(mensajes[4]);

                }, 6000);
            }, 6000);
        }, 6000);
    }, 6000);

    var Pendiente = 0;
    if ($("#btn_Todos").hasClass("reff_activo")) Pendiente = 0;//busca todos
    if ($("#btn_Libres").hasClass("reff_activo")) Pendiente = 1;// busca pendientes
    if ($("#btn_SobreT").hasClass("reff_activo")) Pendiente = 2;// busca entregados
    var json = JSON.stringify({ "Desde": $("#desde").val(), "Hasta": $("#hasta").val(), "Pendiente": Pendiente });
    alert();
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
            Contadores();
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
    $("#TotalPacientes").html("Cantidad de Pedidos: " + Count);
    $("#TablaPedidos_div").empty();
    Cantidad_Estado = [0, 0]; //Entregados,Pendientes
        var Tabla_Datos = "";
        Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Pedido</th><th>Servicio</th><th>Fecha</th><th>Paciente</th><th>Nro. HC</th></thead><tbody>";
        $.each(Pedidos, function (index, Pedido) {
            var clase = "Turnos_Libres"; //Pendientes
            if (Pedido.Estado == 2) { clase = "Turnos_Ocupados"; Cantidad_Estado[1]++; } //Entregados
            else Cantidad_Estado[0]++;
            Tabla_Datos = Tabla_Datos + "<tr class='"+ clase +"'";
            Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('CargarEntregaPPP.aspx?Pend=1&Id=" + Pedido.Pedido_Id + "');";
            Tabla_Datos = Tabla_Datos + "><td>" + Pedido.Pedido_Id + "</td><td>" + Pedido.Servicio + "</td><td>" + Pedido.Fecha + "</td><td>" + Pedido.Paciente + "</td><td>" + Pedido.NHC + "</td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        $("#cargando").hide();
        $("#TablaPedidos_div").show();
        jQuery("#frm_Main input:radio").attr('disabled', false);
        jQuery("#frm_Main input:text").attr('disabled', false);
}

function Count_Pedidos_IM_Cargados(Resultado) {    
    Pedidos = Resultado.d;
    var Count = Pedidos.length;
    $("#TotalIM").html("Cantidad de Pedidos: " + Count);
    $("#TablaPedidos_div").empty();
    Cantidad_Estado = [0, 0]; //Entregados,Pendientes
    if (actualizar != 1) {
        var Tabla_Datos = "";
        Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Pedido</th><th>Servicio</th><th>Sala</th><th>Cama</th><th>Fecha</th><th>Paciente</th><th>Nro. HC</th></thead><tbody>";
        $.each(Pedidos, function (index, Pedido) {
            var clase = "Turnos_Libres"; //Pendientes
            if (Pedido.Estado == 2) { clase = "Turnos_Ocupados"; Cantidad_Estado[1]++; } //Entregados
            else Cantidad_Estado[0]++;
            Tabla_Datos = Tabla_Datos + "<tr class='" + clase + "'";
            Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('CargarEntregaIM.aspx?Pend=1&Id=" + Pedido.Pedido_Id + "');";
            Tabla_Datos = Tabla_Datos + "><td>" + Pedido.Pedido_Id + "</td><td>" + Pedido.Servicio + "</td><td>" + Pedido.Sala + "</td><td>" + Pedido.Cama + "</td><td>" + Pedido.Fecha + "</td><td>" + Pedido.Paciente + "</td><td>" + Pedido.NHC + "</td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        $("#cargando").hide();
        $("#TablaPedidos_div").show();
        jQuery("#frm_Main input:radio").attr('disabled', false);
        jQuery("#frm_Main input:text").attr('disabled', false);
    }
}

function Count_Pedidos_Serv_Cargados(Resultado) {
    Pedidos = Resultado.d;
    var Count = Pedidos.length;
    $("#TotalServicio").html("Cantidad de Pedidos: " + Count);
    $("#TablaPedidos_div").empty();
    Cantidad_Estado = [0, 0]; //Entregados,Pendientes
    if (actualizar != 1) {
        var Tabla_Datos = "";
        Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Pedido</th><th>Fecha</th><th>Servicio</th><th>Usuario</th></thead><tbody>";
        $.each(Pedidos, function (index, Pedido) {
            var clase = "Turnos_Libres"; //Pendientes
            if (Pedido.Estado == 2) { clase = "Turnos_Ocupados"; Cantidad_Estado[1]++; } //Entregados
            else Cantidad_Estado[0]++;
            Tabla_Datos = Tabla_Datos + "<tr class='" + clase + "'";
            Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('CargarEntregaPPS.aspx?Pend=1&Id=" + Pedido.Pedido_Id + "');";
            Tabla_Datos = Tabla_Datos + "><td>" + Pedido.Pedido_Id + "</td><td>" + Pedido.Fecha + "</td><td>" + Pedido.Servicio + "</td><td>" + Pedido.Usuario + "</td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        $("#cargando").hide();
        $("#TablaPedidos_div").show();
        jQuery("#frm_Main input:radio").attr('disabled', false);
        jQuery("#frm_Main input:text").attr('disabled', false);
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
