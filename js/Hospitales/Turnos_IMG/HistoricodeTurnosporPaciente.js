var objTurnos = "";
var objUltimo = {};
var arr_turnos = new Array();

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

$(document).ready(function () {
    Cargar_Seccionales_Lista();
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    ListTipoDoc();
    Cargar_Especialidades(true, 0, true);
    var GET = {};
    var NHC = "";

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });
    $("#txtNHC").focus();
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });
    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        Cargar_Paciente_NHC(NHC);
    }

    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }
    if (GET["T"] != "" && GET["T"] != null) {
        $("#btnVolver").hide();
    }
    $("#txtFechaInicio").datepicker();
    $("#txtFechaFin").datepicker();
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val('01/06/2014');
    $("#txtFechaFin").val(fecha_ultimo_dia_mes(mm, yyyy));

});


$("#txtNHC").keydown(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13 || code == 9) { //Enter o TAB
        if ($("#txtNHC").val().trim().length == 0) return false;
        Cargar_Paciente_NHC($("#txtNHC").val());
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



function RecargarPagina(url) {
    document.location = "../Turnos_img/HistoricodeTurnosporPaciente.aspx" + url;
}

function CambiarPagina(url) {
    document.location = url;
}

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});


function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        complete: function () {
            $("#desdeaqui").focus();
        },
        error: errores
    });
}



function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        complete: function () {
            $("#desdeaqui").focus();
        },
        error: errores
    });
}

function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}


function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {
        $("#btnCancelarPedidoTurno").show();

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento_real);
        $("#txtNHC").attr('value', paciente.NHC_UOM);
        $("#txtTelefono").attr('value', paciente.Telefono);
        $("#afiliadoId").val(paciente.documento);
        //$("#txtPaciente").focus();

        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);


        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        $("#CargadoEdad").html(AnioActual.getFullYear() - AnioNacimiento.getFullYear());
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoCelular").html(paciente.Celular);
        $("#CargadoSeccional").html($("#cboSeccional :selected").text());

        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            Cargar_ObraSociales_Cargar(paciente.OSId);
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }

        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.Foto + '.jpg');

        if (PError) {
            $("#btn_Imprimir").hide();
            $("#desdeaqui").hide();
        }
        else {
            $("#btn_Imprimir").show();
            $("#desdeaqui").show();
        }

    });
}

function Cargar_Especialidades(Todos, Id, SoloTurnos) {
    $('#cbo_Especialidad').append('<option value="0">Todas</option>');    
    $('#cbo_Especialidad').append($('<option></option>').val(343).html("ECOGRAFIA"));
    $('#cbo_Especialidad').append($('<option></option>').val(339).html("MAMOGRAFIA"));
    $('#cbo_Especialidad').append($('<option></option>').val(341).html("RADIOLOGIA"));
    $('#cbo_Especialidad').append($('<option></option>').val(340).html("RESONANCIA MAGNETICA"));
    $('#cbo_Especialidad').append($('<option></option>').val(342).html("TOMOGRAFIA"));  
}

//function Cargar_Especialidades(Todos, Id, SoloTurnos) {
//    $.ajax({
//        type: "POST",
//        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
//        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: Especialidad_Cargadas,
//        error: errores
//    });
//}

function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $('#cbo_Especialidad').append('<option value="0">Todas</option>');
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
    });
}

$("#btn_Imprimir").click(function () {
    if ($("#afiliadoId").val().trim().length > 0)
        Imprimir("../Impresiones/ImpresionHistoricoTurnosporPaciente.aspx?NHC=" + $("#afiliadoId").val() + "&Desde=" + $("#txtFechaInicio").val() + "&Hasta=" + $("#txtFechaFin").val() + "&EspId=" + $("#cbo_Especialidad :selected").val());
    else alert("Ingrese Paciente.");
});

function Imprimir(Pagina) {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'preload': true,
		    'onComplete': function f() {
		        jQuery.fancybox.showActivity();
		        jQuery('#fancybox-frame').load(function () {
		            jQuery.fancybox.hideActivity();
		        });
		    }

		}
	        );
}


function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {
            $("#btnCancelarPedidoTurno").show();
            $("#txt_dni").prop("readonly", true);
            $("#txtNHC").prop("readonly", true);

            //$("#txtPaciente").focus();
            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.NHC_UOM);
            $("#txtTelefono").attr('value', paciente.Telefono);
            $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

            $("#afiliadoId").val(paciente.documento);

            if ($("#txtTelefono").val().length < 5) {
                $("#controlTelefono").addClass("error");
                PError = true;
            }
            if (paciente.Nro_Seccional == 999) {
                $("#controlSeccional").addClass("error");
                PError = true;
            }


            $("#CargadoApellido").html(paciente.Paciente);

            var AnioActual = new Date();
            var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


            var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
            if (AnioNacimiento.getFullYear() == 0) {
                edad = S / FN;
            }
            $("#CargadoEdad").html(edad);
            $("#CargadoDNI").html(paciente.documento_real);
            $("#CargadoNHC").html(paciente.NHC_UOM);
            $("#CargadoTelefono").html(paciente.Telefono);
            $("#CargadoCelular").html(paciente.Celular);
            $("#CargadoSeccional").html($("#cboSeccional :selected").text());

            $("#Cod_OS").val(paciente.OSId);
            if (paciente.Nro_Seccional == 998) {
                $("#cbo_ObraSocial").show();
                $("#cboSeccional").hide();
                $("#Titulo_Seccional_o_OS").html("Ob. Social");
                $("#CargadoSeccionalTitulo").html("Ob. Social");
                Cargar_ObraSociales_Cargar(paciente.OSId);
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }

            $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

            if (PError) {
                $("#btn_Imprimir").hide();
                $("#desdeaqui").hide();
            }
            else {
                $("#btn_Imprimir").show();
                $("#desdeaqui").show();
            }

        });
    } else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
    }
}

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



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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


$("#btnBuscarPaciente").fancybox({
    'hideOnContentClick': true,
    'width': '75%',
    'height': '75%',
    'autoScale': false,
    'transitionIn': 'none',
    'transitionOut': 'none',
    'type': 'iframe'
});


function CargarTurnos() {
    var json = JSON.stringify({ "NHC": $("#afiliadoId").val(), "Desde": $("#txtFechaInicio").val(), "Hasta": $("#txtFechaFin").val(), "EspId": $("#cbo_Especialidad :selected").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/DarTurnos.asmx/TurnosPaciente_IMG",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#TablaTurnos").hide();
            $("#cargando").show();
        },
        success: function (Resultado) {
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            var color = "";
            Tabla_Titulo = "<table id='TablaTurnos' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>&nbsp;</th><th>Fecha</th><th>Hora</th><th>Especialidad</th><th>Médico</th><th>Observación</th><th>Estado</th></tr></thead><tbody>";
            var lista = Resultado.d;
            $.each(lista, function (index, turnos) {

                arr_turnos[index] = turnos;

                if (turnos.estado == "CANCELADO") {
                    color = "style='background-color:red;'"
                }
                else {
                    color = "";
                }

                Tabla_Datos = Tabla_Datos + "<tr " + color + " ><th><input type='checkbox' id='chk" + index + "' onclick=func() class='checks' value='" + turnos.turnoid + "'/> </th><td>" + turnos.fecha + "</td><td>" + turnos.hora + "</td><td>" + turnos.especialidad + "</td><td>" + turnos.medico + "</td><td>" + turnos.observaciones + "</td><td>" + turnos.estado + "</td></tr>";
            });
            Tabla_Fin = "</tbody></table>";
            $("#TablaTurnos").empty();
            $("#TablaTurnos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        complete: function () {
            $("#TablaTurnos").show();
            $("#cargando").hide();
        },
        error: errores
    });
    }

    $("#desdeaqui").click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        CargarTurnos();
    });

    function func() {
        objTurnos = "";
        var i = -1;
        objUltimo = {};
        $(".checks").each(function (index, obj) {
            if ($(obj).is(":checked")) {
                i = index; //ultimo chequeado
                objTurnos = objTurnos + "," + $(obj).val();
            }
        });
        objUltimo = arr_turnos[i];
    }

    $("#btn_Turnos").click(function () {
        if (objTurnos.length > 0) {
            var Pagina = "../Impresiones/ImpresionTurno.aspx?MedicoId=" + objUltimo.medicoid + "&EspecialidadId=" + objUltimo.especialidadid + "&Fecha=" + objUltimo.fecha + " " + objUltimo.hora + "&Ids=" + objTurnos;
            Imprimir(Pagina);
        }
        else alert("Seleccione algún turno.");
    });

