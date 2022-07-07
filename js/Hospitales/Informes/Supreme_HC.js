Cargar_Seccionales_Lista();
ListTipoDoc();

parent.document.getElementById("DondeEstoy").innerHTML = "<strong>Informes > Ficha de Consumo</strong>";
$("#titulo").html("Ficha de Consumo");

$(document).ready(function () {
    $(".opcion").attr('checked', true);
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    $("#txt_dni").focus();
    var GET = {};
    var NHC = "";
    var Documento = "";
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    $("#txt_dni").focus();
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });

    $("#txtDesde").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        onClose: function (selectedDate) {
            $("#txtHasta").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#txtHasta").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        onClose: function (selectedDate) {
            $("#txtDesde").datepicker("option", "minDate", selectedDate);
        }
    });
    $(".fecha").mask("99/99/9999", { placeholder: "-" });
    $('.fecha').datepicker('setDate', 'today');
    $(".fecha").css('text-align', 'center');
    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }
});


function ListTipoDoc() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/ListTipoDoc",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, Tipo) {
                $('#cbo_TipoDOC').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
            });
        },
        error: errores
    });
}

function Cargar_Seccionales_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Seccionales_Listas_Cargadas,
        error: errores
    });

}

function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
    });
}

$("#txtNHC").on('keypress', function (event) {
    if ($("#desdeaqui").is(":visible") && event.keyCode == 13)
    { $("#desdeaqui").click(); }
});

$("#txt_dni").on('keypress', function (event) {
    if ($("#desdeaqui").is(":visible") && event.keyCode == 13)
    { $("#desdeaqui").click(); }
});

$("#txtPaciente").on('keypress', function (event) {
    if ($("#desdeaqui").is(":visible") && event.keyCode == 13)
    { $("#desdeaqui").click(); }
});

function errores(msg) {
    Impreso = 0;
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnCancelarPedidoTurno").click(function () { document.location = "Reporte_Hc_Supreme.aspx"; });

function BuscarPacientes_fancy() {
    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': "../Turnos/BuscarPacientes.aspx?Express=0",
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
}

$("#btnBuscarPaciente").fancybox({
    'hideOnContentClick': true,
    'width': '75%',
    'height': '75%',
    'autoScale': false,
    'transitionIn': 'none',
    'transitionOut': 'none',
    'type': 'iframe'
});

function RecargarPagina(url) {
    document.location = "../Informes/Reporte_Hc_Supreme.aspx" + url;
}

$("#txt_dni").keypress(function (event) {
    if (event.which == 13) {


        if ($('#txt_dni').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txt_dni").val());
        }
    }
});

$("#txt_dni").change(function () {
    Cargar_Paciente_Documento($("#txt_dni").val());
});

function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/Cargar_Paciente_Documento_Entrega_De_Resultados", ///////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        //complete: cargarEstudios,
        error: errores
    });
}


function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {

            $("#btnCancelarPedidoTurno").show();

            $("#txtnroturno").prop("readonly", true);

            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.NHC_UOM);
            $("#txtTelefono").attr('value', paciente.Telefono);
            $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

            $("#btnOtorgados").css('display', 'inline');

            if (paciente.Nro_Seccional == 999) {
                $("#controlSeccional").addClass("error");
                PError = true;
            }

            $("#afiliadoId").val(paciente.documento);
            $("#documentoImp").val(paciente.documento_real);
            $("#cbo_TipoDOC").val(paciente.TipoDoc);

            if (PError) {
                $("#desdeaqui").hide();
            }
            else {

                $("#desdeaqui").show();
            }

            pacienteId = paciente.documento;

        });
    }
    else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
        $("#txtPaciente").focus();
    }
}

$("#txtNHC").change(function () {
    if ($("#txtNHC").val().length > 0)
        Cargar_Paciente_NHC($("#txtNHC").val());
});

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/CargarPacienteNHC_UOM_Entrega_De_Resultados",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
        //complete: cargarEstudios
    });
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {

        $("#btnCancelarPedidoTurno").show();
        $("#afiliadoId").val(paciente.documento);
        $("#documentoImp").val(paciente.documento_real);
        $("#txtnroturno").prop("readonly", true);
        $("#btnOtorgados").css('display', 'inline');
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento_real);
        $("#txtNHC").attr('value', paciente.NHC_UOM);
        $("#txtTelefono").attr('value', paciente.Telefono);
        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

        if (paciente.Nro_Seccional == "999") {
            $("#controlSeccional").addClass("error");
            PError = true;
        }

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {

            $("#desdeaqui").show();
        }

    });

}

function CargarPacienteID(ID) {

    $.ajax({
        type: "POST",
        url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/CargarPacienteID_Entrega_De_Resultados", ////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
       //complete: cargarEstudios
    });
}

$('#desdeaqui').click(function () {

        $("#segundo").fadeIn(1500);
        $("#primero").hide();
        $('html, body').animate({ scrollTop: $("#segundo").offset().top - 100 }, 600);
        $('.container').height($('html').height() + ($('#autorizaciones').height() -
        				$('.pie').height() -
        				$('#autorizaciones').height()));

        $("#derivaciones").height(760);
        $(".ocultar").show();
        $(".derecha").removeClass('pull-left');

});


$("#btnOtroPaciente2").click(function () {
    document.location = "Reporte_Hc_Supreme.aspx"
});

$("#btnBuscar").click(function () {
    var comprobar = [];
    if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") { alert("Ingrese fechas!"); return false; }
    $(".sel").each(function () {
        if (!$(this).is(':checked'))
        { comprobar.push(1); }
    });

    if (comprobar.length == 12) { alert("Seleccione alguna opción."); return false; }
    imprimir("../Impresiones/Ficha_de_Consumo.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&afiliadoId=" + $("#afiliadoId").val() + "&documento=" + $("#documentoImp").val() +
    "&todos=" + $("#checkTodos").is(':checked') +
    "&checkInternaciones=" + $("#checkInternaciones").is(':checked') +
    "&checkCirugias=" + $("#checkCirugias").is(':checked') +
    "&checkInterconsultas=" + $("#checkInterconsultas").is(':checked') +
    "&checkMH=" + $("#checkMH").is(':checked') +
    "&checkCA=" + $("#checkCA").is(':checked') +
    "&checkAL=" + $("#checkAL").is(':checked') +
    "&checkDI=" + $("#checkDI").is(':checked') +
    "&checkEndoscopia=" + $("#checkEndoscopia").is(':checked') +
    "&checkAP=" + $("#checkAP").is(':checked') +
    "&checkAG=" + $("#checkAG").is(':checked') +
    "&checkMA=" + $("#checkMA").is(':checked') +
    "&HC=" + $("#txtNHC").val() +
    "&PDF=1", 0);
});

$(".todos").click(function () {
    if ($(this).is(':checked')) { $(".opcion").attr('checked', true); } else { $(".opcion").attr('checked', false); }
});

$(".opcion").click(function () {
    if (!$(this).is(':checked')) { $(".todos").attr('checked', false); }
});