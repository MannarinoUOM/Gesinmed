var NroParte = 0;


$(document).ready(function () {
    $("#txtDesdeParte").mask("99/99/9999", { placeholder: "-" });
    $("#txtHastaParte").mask("99/99/9999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = fecha_ultimo_dia_mes(mm, yyyy);
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtDesdeParte").val(p);
    $("#txtHastaParte").val(d);
    $("#txtDesdeParte").datepicker();
    $("#txtHastaParte").datepicker();
    List_Partes();
});


function List_Partes() {
    var json = JSON.stringify({"Desde":  $("#txtDesdeParte").val() , "Hasta": $("#txtHastaParte").val()});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/GenerarHono_List",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Partes_Cargado,
        beforeSend: function () {
            $("#tabla").hide();
            $("#cargando").show();
        },
        complete: function () {
            $("#tabla").show();
            $("#cargando").hide();
        },
        error: errores
    });
}

function List_Partes_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista.length > 0) {
        var Contenido = "";
        $("#trx").empty();
        $.each(Lista, function (index, Detalle) {
            var Paciente_ = Detalle.Paciente.toUpperCase().trim();
            if (Paciente_.length > 15) Paciente_ = Paciente_.substring(0, 15);
            Contenido = Contenido + "<tr onclick='GenerarHono(" + Detalle.NroParte + ")'><td> " + Detalle.NroParte + " </td><td> " + Detalle.Fecha + " </td><td> " + Detalle.NHC + " </td><td> " + Paciente_ + " </td><td> " + Detalle.ObraSocial + " </td><td> " + Detalle.FechaImpreso + " </td><td id='txtNroOrdenInt" + Detalle.NroParte + "' style='display:none;'>" + Detalle.NroOrdenInt + "</td></tr>";
        });
        var Pie = "</tbody></table>";
        $("#trx").html(Contenido);
    }
}

$("#btnBuscar").click(function () {
    List_Partes();
});

function toggle_checks(chk) {
    if ($(chk).is(":checked")) {
        $(".checkstable").attr("checked", "checked");
        $(".checkstable").addClass("active");
    }
    else {
        $(".checkstable").removeAttr("checked");
        $(".checkstable").removeClass("active");
    }
}

function toggle_check(chk) {
    if ($(chk).is(":checked")) {
        $(chk).attr("checked", "checked");
        $(chk).addClass("active");
    }
    else {
        $(chk).removeAttr("checked");
        $(chk).removeClass("active");
    }
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function GenerarHono(List) {
    $("#myModal").modal({
        keyboard: false,
        backdrop: 'static'
    });
    NroParte = List;
    $("#txtNroOrden").val($("#txtNroOrdenInt" + NroParte).html().trim());
}

$("#btnGuardarOrden").click(function () {
    if ($("#txtNroOrden").val().trim().length > 0) {
        var json = JSON.stringify({ "NroParte": NroParte, "NroOrdenInt": $("#txtNroOrden").val() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Facturacion/Facturacion.asmx/Insert_Fact_HonoMedicos_NroOrdenInt",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: MostrarBonos,
            complete: function () {
                $('#myModal').modal('hide');
            },
            error: errores
        });
    }
    else alert("Ingrese Nro. Orden");
});


function MostrarBonos() {
        var url = "../Impresiones/ImpresionGenerarHonoMed.aspx?Id=" + NroParte;
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
                'enableEscapeButton': false,
                'onClosed': function () {
                    window.location = '../Facturacion/GenerarBonosHonoMed.aspx';
                }
            });
}