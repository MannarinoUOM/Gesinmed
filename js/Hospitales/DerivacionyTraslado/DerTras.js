var sourceArr = [];
var mapped = {};
var idDYT = 0;
var icd10ID = "";
var Documento = 0;

cargarMedicoDT();
cargarEspecialidadDT();
cargarCentros();
cargarSolicitado();
cargaTraslado();
cargaPrestacion();
cargaSeguimiento();
cargarEstado();
cargarRechazos();




    $('input.typeahead').typeahead({
        updater: function (item) {
            $("#txtICD10").val(item); //nom
            //$("#id_val").val(mapped[item]); //id
            icd10ID = mapped[item];
            return item;
        },
        minLength: 4,
        items: 50,
        hint: true,
        highlight: true,
        source: function (query, process) {
            var json = JSON.stringify({ "str": query });
            $.ajax({
                url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10Detalles_Autocomplete",
                type: 'POST',
                dataType: "json",
                data: json,
                contentType: "application/json; charset=utf-8",
                success: function (Resultado) {
                    var lista = Resultado.d;
                    $.each(lista, function (i, icd) {
                        if (i == 0) {
                            sourceArr.length = 0;
                        }
                        str = icd.Descripcion;
                        mapped[str] = icd.Codigo;
                        sourceArr.push(str);
                    });
                    return process(sourceArr);
                }
            });
      }  
});

$("#BtnVolverDT").click(function () {
    $("#primero").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#primero").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#primero').height()));
    //$('#cbo_Especialidad').focus();
    $("#autorizaciones").hide();
    $("#txt_dni").focus();
});

function cargarMedicoDT() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerMedicosComboDT",
        contentType: "application/json; charset=utf-8",
        data: '{id: "' + 0 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboMedicoOrigen").append(new Option("Seleccione", 0));
            $("#cboMedicoDestino").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboMedicoOrigen").append(new Option(item.Medico, item.Id));
                $("#cboMedicoDestino").append(new Option(item.Medico, item.Id));
            });
        }
    });
}

function cargarEspecialidadDT() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerEspecialidadesComboDT",
        contentType: "application/json; charset=utf-8",
        data: '{id: "' + 0 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboEspecialidadOrigen").append(new Option("Seleccione", 0));
            $("#cboEspecialidadDestino").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboEspecialidadOrigen").append(new Option(item.Especialidad, item.Id));
                $("#cboEspecialidadDestino").append(new Option(item.Especialidad, item.Id));
            });
        }
    });
}

function cargarCentros() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 21 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboOrigen").append(new Option("Seleccione", 0));
            $("#cboDestino").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboOrigen").append(new Option(item.descripcion, item.id));
                $("#cboDestino").append(new Option(item.descripcion, item.id));
            });
        }
    });
}

function cargarSolicitado() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 24 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboSolicitado").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboSolicitado").append(new Option(item.descripcion, item.id));
            });
        }
    });
}
    function cargaTraslado() {
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
            contentType: "application/json; charset=utf-8",
            data: '{tipo: "' + 23 + '"}',
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $("#cboTrasladado").append(new Option("Seleccione", 0));
                $.each(lista, function (index, item) {
                    $("#cboTrasladado").append(new Option(item.descripcion, item.id));
                });
            }
        });
    }

function cargaPrestacion() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 22 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboPrestacion").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboPrestacion").append(new Option(item.descripcion, item.id));
            });
        }
    });
}

function cargaSeguimiento() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 27 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboSeguimiento").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboSeguimiento").append(new Option(item.descripcion, item.id));
            });
        }
    });
}

function cargarEstado() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 25 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboEstadoDT").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboEstadoDT").append(new Option(item.descripcion, item.id));
            });
        }
    });
}

function cargarRechazos() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 26 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboRechazos").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboRechazos").append(new Option(item.descripcion, item.id));
            });
        }
    });
}
$(".fechas").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true
});

$(".fechas").keydown(function () { return false; });

$("#horaPedido").mask("99:99", { placeholder: "-" });

$("#BtnGuardarDT").click(function () {

    var DYT = {};
    //    alert($("#txtdocumento").val());
    //    return false;
    if ($("#radio_desde").is(':checked')) { DYT.tipo = "D"; } else { DYT.tipo = "H"; }
    DYT.pacienteId = $("#afiliadoId").val(); // traer el id del paciente  con el hiden documento
    DYT.fechaPedido = $("#fechaPedido").val();
    DYT.horaPedido = $("#horaPedido").val();
    DYT.solicitanteId = $('#cboSolicitado option:selected').val();
    DYT.centroOrigen = $('#cboOrigen option:selected').val();
    DYT.especialidadOrigen = $('#cboEspecialidadOrigen option:selected').val();
    DYT.medicoOrigen = $('#cboMedicoOrigen option:selected').val();
    DYT.motivo = $("#txtMotivo").val();
    DYT.centroDestino = $('#cboDestino option:selected').val();
    DYT.especialidadDestino = $('#cboEspecialidadDestino option:selected').val();
    DYT.medicoDestino = $('#cboMedicoDestino option:selected').val();
    DYT.traslado = $('#cboTrasladado option:selected').val();
    DYT.prestacion = $('#cboPrestacion option:selected').val();
    DYT.seguimiento = $('#cboSeguimiento option:selected').val();
    DYT.fechaInternacion = $("#txtFechaInternacion").val();
    DYT.fechaAlta = $("#txtFechaAlta").val();
    DYT.estado = $('#cboEstadoDT option:selected').val();
    DYT.rechazos = $('#cboRechazos option:selected').val();
    DYT.diagnostico = icd10ID; // $("#txtICD10").val(); traer el id del diagnostico
    DYT.observaciones = $("#txtObservacionesDT").val(); // graba per no edita

    var json = JSON.stringify({ "id": idDYT, "item": DYT });
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/GuardarActulizarDYT",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            idDYT = Resultado.d;
            alert("guardado");
            document.location = "";
        }
    });

});

//function TraerTodasDYTPaciente() {
//    $.ajax({
//        type: "POST",
//        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerTodasDYTPaciente",
//        contentType: "application/json; charset=utf-8",
//        data: '{idPaciente: "' + $("#afiliadoId").val() + '"}',
//        dataType: "json",
//        success: function (Resultado) {
//            var lista = Resultado.d;
//            $("#tablaHistorial").empty();
//            var Contenido = "";
//            var Pie = "";
//            var Encabezado = "";
//            Encabezado = "<table class='tabla table-hover table-condensed' style='width: 100%;'><thead style='height:0px'><tr><th style='padding:0px; text-align:center; width:2%'></th><th style='padding:0px; text-align:center; width:5%'></th><th  style='width:5%'></th><th style='padding:0px; text-align:center; width:10%'></th><th style='padding:0px; text-align:center; width:10%;color:Black'></th><th style='padding:0px; text-align:center; width:10%;color:Black' ></th><th style='padding:0px; text-align:center; width:38%;color:Black'></th><th style='padding:0px; text-align:center; width:10%;color:Black'></th><th style='padding:0px; text-align:center; width:10%;color:Black'></th></tr></thead><tbody>";
//            $.each(lista, function (index, item) {
//                Contenido = Contenido + "<tr  class='filas' id='" + item.id + "'><td onclick='Generar(" + item.id + ") style='cursor:pointer'>" + (index + 1) + "</td><td style='cursor:pointer; font-size:x-small' onclick='Generar(" + item.id + ")'> " + item.fechaPedido + " </td><td style='cursor:pointer; font-size:x-small' onclick='Generar(" + item.id + ")'>" + item.horaPedido + "</td><td style='cursor:pointer; font-size:x-small' onclick='Generar(" + item.id + ")'>" + item.usuario + "</td><td style='cursor:pointer; font-size:x-small' onclick='Generar(" + item.id + ")'>" + item.origenNombre + "</td><td style='cursor:pointer; font-size:x-small' onclick='Generar(" + item.id + ")'>" + item.destinoNombre + "</td><td style='cursor:pointer; font-size:x-small' onclick='Generar(" + item.id + ")'>" + item.motivo + "</td><td style='cursor:pointer; font-size:x-small' onclick='Generar(" + item.id + ")'>" + item.estadoNombre + "</td><td style='cursor:pointer; font-size:x-small' onclick='Generar(" + item.id + ")'>" + item.rechazosNombre + "</td>";
//            });
//            Pie = "</tbody></table>";
//            $("#tablaHistorial").html(Encabezado + Contenido + Pie);
//        }
//    });

//}


//function Generar(id) {
//    $(".filas").css('background-color', '#dddddd');
//    $("#" + id).css('background-color', 'aqua');
//    $.ajax({
//        type: "POST",
//        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerUnaDYT",
//        contentType: "application/json; charset=utf-8",
//        data: '{idDYT: "' + id + '"}',
//        dataType: "json",
//        success: function (Resultado) {
//            var item = Resultado.d;
//            switch (item.tipo) {
//                case "D":
//                    $("#radio_desde").attr('checked', true);
//                    break;
//                case "H":
//                    $("#radio_hasta").attr('checked', true);
//                    break;
//            }

//            $("#fechaPedido").val(item.fechaPedido);
//            $("#horaPedido").val(item.horaPedido);
//            $('#cboSolicitado').val(item.solicitanteId);
//            $('#cboOrigen').val(item.centroOrigen);
//            $('#cboEspecialidadOrigen').val(item.especialidadOrigen);
//            $('#cboMedicoOrigen').val(item.medicoOrigen);
//            $("#txtMotivo").val(item.motivo);
//            $('#cboDestino').val(item.centroDestino);
//            $('#cboEspecialidadDestino').val(item.especialidadDestino);
//            $('#cboMedicoDestino').val(item.medicoDestino);
//            $('#cboTrasladado').val(item.traslado);
//            $('#cboPrestacion').val(item.prestacion);
//            $('#cboSeguimiento').val(item.seguimiento);
//            $("#txtFechaInternacion").val(item.fechaInternacion);
//            $("#txtFechaAlta").val(item.fechaAlta);
//            $('#cboEstadoDT').val(item.estado);
//            $('#cboRechazos').val(item.rechazos);
//            alert(item.diagnostico);
//            $("txtICD10").val(item.diagnostico);
//            $("#txtObservacionesDT").val(item.observaciones);
//        }
//    });
//}