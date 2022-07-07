var i = 0;
var posEliminar = 0;
var posEliminarP = 0;
var objTurnos = new Array();

function Cargar_Especialidades(Todos, Id, SoloTurnos) {
//    $.ajax({
//        type: "POST",
//        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
//        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: Especialidad_Cargadas,
//        error: errores
    //    });

    $('#cbo_Especialidad').empty();

    $('#cbo_Especialidad').append('<option value="343">ECOGRAFIA</option>');
    $('#cbo_Especialidad').append('<option value="339">MAMOGRAFIA</option>');
    $('#cbo_Especialidad').append('<option value="341">RADIOLOGIA</option>');
    $('#cbo_Especialidad').append('<option value="340">RESONANCIA MAGNETICA</option>');
    $('#cbo_Especialidad').append('<option value="342">TOMOGRAFIA</option>'); 

    //$('#cbo_Especialidad').append('<option value="326">IMAGENES</option>');
    Cargar_Medicos_por_Especialidad(343, "A");
}

function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $('#cbo_Especialidad').append('<option value="0">Especialidad</option>');
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
    });
}

$('#cbo_Especialidad').change(function () {
    Cargar_Medicos_por_Especialidad($(this).val(),'A');
});

function Cargar_Medicos_por_Especialidad(Especialidad,Tipo) {
    var json = JSON.stringify({ "Especialidad": Especialidad, "Tipo": Tipo });
    $.ajax({
        type: "POST",
        //url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivos",
        //data: '{Especialidad: "' + Especialidad + '"}',
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivosTipo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        error: errores
    });

}

function Medicos_por_Especialidad_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $('#cbo_Medico').empty();
    $('#cbo_Medico').append('<option value="0">Medicos</option>');
    $.each(Medicos, function (index, medicos) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
    });
}

Cargar_Especialidades(true, 343, true);

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$('#btnLibres').click(function () {
    if($("#btnLibres").is(":checked"))
        Cargar_Turnos($('#cbo_Especialidad option:selected').val(), $('#cbo_Medico option:selected').val(), $('#txtFechaInicio').val(), $('#txtFechaFin').val(), $("#btnLibres").is(":checked"));
});

$('#btn_Buscar').click(function () {
    if ($('#cbo_Especialidad option:selected').val() == 0) { $("#Controlcbo_Especialidad").addClass("error"); return false; }
    //if (fecha1esmayora2()) { alert("La Fecha de inicio tiene que ser menor a la fecha final"); $("#ControlFechas").addClass("error"); return false; }
    Cargar_Turnos($('#cbo_Especialidad option:selected').val(), $('#cbo_Medico option:selected').val(), $('#txtFechaInicio').val(), $('#txtFechaFin').val(), $("#btnLibres").is(":checked"));

});

$("#txtFechaInicio").datepicker();
$("#txtFechaFin").datepicker();


$("#chkTodos").click(function () {
    if ($("#chkTodos").is(":checked")) {
        $(".turnos").each(function (index) {
            if (!$(this).hasClass("confirmado") && !$(this).hasClass("error")) { //Si no esta confirmado o cancelado, lo marco para cancelar
                $(this).removeClass("warning");
                $(this).removeClass("success");
                $(this).removeClass("info");
                $(this).addClass("Turnos_Seleccionado");
            }
        });
    }
    else {
        Cargar_Turnos($('#cbo_Especialidad option:selected').val(), $('#cbo_Medico option:selected').val(), $('#txtFechaInicio').val(), $('#txtFechaFin').val(), $("#btnLibres").is(":checked"));
    }
});

function Cargar_Turnos(Especialidad, Medico, FechaInicio, FechaFin, Libres) {
    var json = JSON.stringify({ "Especialidad": Especialidad, "Medico": Medico, "FechaInicio": FechaInicio, "FechaFin": FechaFin, "HoraInicio": $('#txtHoraInicio').val(), "HoraFin": $('#txtHoraFin').val(), "Libres": Libres });
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/CancelarTurnos.asmx/Buscar_Turnos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            //$("#TablaTurnos").hide();
            //$("#cargando").show();
        },
        success: Turnos_Cargados,
        complete: function () {
            //$("#TablaTurnos").show();
            //$("#cargando").hide();
        },
        error: errores
    });
}

function Turnos_Cargados(Resultado) {

    var Turnos = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var NHC = "";
    $("#TablaTurnos").empty();

    Tabla_Titulo = "<table id='TablaTurnos' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>&nbsp;</th><th>Fecha</th><th>Hora</th><th>Médico</th><th>HC</th><th>Paciente</th><th>Teléfono</th></tr></thead><tbody>";
    $.each(Turnos, function (index, turnos) {
        NHC = "";
        if (turnos.Clase != "error") Tabla_Datos = Tabla_Datos + "<tr title='Click para cancelar turno' id='TR" + index + "'"; 
        else Tabla_Datos = Tabla_Datos + "<tr title='Click para descancelar turno' id='TR" + index + "' class='turnos " + turnos.Clase + "'";

        if (turnos.EsConfirmado) Tabla_Datos = Tabla_Datos + " class='turnos confirmado " + turnos.Clase + "' onclick=Confirmado('" + index + "');"; //T confirmado
        else if (turnos.Clase != "error") Tabla_Datos = Tabla_Datos + " class='turnos " + turnos.Clase + "' onclick=Confirmado('" + index + "');"; //Sin Confirmar (Sobret o comun)

        if (turnos.Clase == "error") Tabla_Datos = Tabla_Datos + " onclick=DescancelarTurno('" + index + "');";

        if (!turnos.EsConfirmado && turnos.MovitoCanceladoId == "0" && turnos.NombrePaciente != "") {
            if (turnos.Clase != "info")
                 Tabla_Datos = Tabla_Datos + " onclick=Cancelar('" + index + "');"; //Comunes
            else Tabla_Datos = Tabla_Datos + " onclick=CancelarSobre('" + index + "');"; //SobreTurnos
        }
        else {
            if (turnos.NombrePaciente == "" && turnos.Clase != "error") {
                Tabla_Datos = Tabla_Datos + " onclick=NoCancelar('" + index + "');";
            }
        }
        NHC = turnos.NHC;
        if (turnos.NHC == 0) { NHC = ""; }
        if (turnos.Clase != "error")
            Tabla_Datos = Tabla_Datos + "><td>&nbsp;</td><td id='tdfecha" + index + "'>" + turnos.Fecha + "</td><td id='tdhora" + index + "'>" + turnos.Hora + "</td><td style='display:none;' id='tdMedicoId" + index + "'>" + turnos.MedicoId + "</td><td>" + turnos.NombreMedico + "</td><td>" + NHC + "</td><td id='tdPaciente" + index + "'>" + turnos.NombrePaciente + "</td><td>" + turnos.Telefono + "</td><td id='tdDocumento" + index + "' style='display:none;'>" + turnos.AfiliadoID + "</td><td id='tdClase" + index + "' style='display:none;'>" + turnos.Clase + "</td></tr>";
        else Tabla_Datos = Tabla_Datos + "><td><input type='checkbox' id='chk" + index + "' checked/></td><td id='tdfecha" + index + "'>" + turnos.Fecha + "</td><td id='tdhora" + index + "'>" + turnos.Hora + "</td><td style='display:none;' id='tdMedicoId" + index + "'>" + turnos.MedicoId + "</td><td>" + turnos.NombreMedico + "</td><td>" + NHC + "</td><td id='tdPaciente" + index + "'>" + turnos.NombrePaciente + "</td><td>" + turnos.Telefono + "</td><td id='tdDocumento" + index + "' style='display:none;'>" + turnos.AfiliadoID + "</td><td id='tdClase" + index + "' style='display:none;'>" + turnos.Clase + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaTurnos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    $('html, body').animate({ scrollTop: $("#Resultado").offset().top - 140 }, 500);
}

function Confirmado(id) {
    if ($("#TR" + id).hasClass("warning")) {
        $("#TR" + id).addClass("Turnos_Seleccionado");
        $("#TR" + id).removeClass("warning");
        return;
    }

    if ($("#TR" + id).hasClass("Turnos_Seleccionado")) {
        $("#TR" + id).removeClass("Turnos_Seleccionado");
        $("#TR" + id).addClass($("#tdClase"+id).html());
        return;
    }
    if (!$("#TR" + id).hasClass("Turnos_Seleccionado") && !$("#TR" + id).hasClass("confirmado")) {
        $("#TR" + id).addClass("Turnos_Seleccionado");
        $("#TR" + id).removeClass("success");
        $("#TR" + id).removeClass("info");
        return;
    }
    alert("El turno seleccionado no se puede cancelar debido a que ya fue confirmado.");
}

function DescancelarTurno(id) 
{
    var json = JSON.stringify({ "medicoId": $('#cbo_Medico :selected').val(), "especialidadId": $('#cbo_Especialidad option:selected').val(), "documento": $("#tdDocumento" + id).html(), "fecha": $("#tdfecha" + id).html() + " " + $("#tdhora" + id).html() });
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/CancelarTurnos.asmx/DescancelarTurno",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            $("#chk" + id).removeAttr("checked");
            $("#btn_Buscar").click();
        },
        error: errores
    });
}

function NoCancelar(id) {
    if ($("#TR" + id).hasClass("error")) {
        return false;
    }

    if (!$("#TR" + id).hasClass("Turnos_Seleccionado")) {
        $("#TR" + id).removeClass("warning");
        $("#TR" + id).addClass("Turnos_Seleccionado");
    }
    else {
        $("#TR" + id).addClass("warning");
        $("#TR" + id).removeClass("Turnos_Seleccionado");
    }
}

function Cancelar(id) {
    if (!$("#TR" + id).hasClass("Turnos_Seleccionado")) {
        $("#TR" + id).removeClass("success");
        $("#TR" + id).addClass("Turnos_Seleccionado");
    }
    else {
        $("#TR" + id).addClass("success");
        $("#TR" + id).removeClass("Turnos_Seleccionado");
    }
}

function CancelarSobre(id) {
    ///Sobreturno
    if (!$("#TR" + id).hasClass("Turnos_Seleccionado")) {
        $("#TR" + id).removeClass("info");
        $("#TR" + id).addClass("Turnos_Seleccionado");
    }
    else {
        $("#TR" + id).addClass("info");
        $("#TR" + id).removeClass("Turnos_Seleccionado");
    }
}

function Validar() {
    if ($("#cboMotivo :selected").val() == "") { alert("Seleccione motivo."); return false; }
    if ($(".Turnos_Seleccionado").size() == 0) { alert("Seleccione un turno."); return false; }
    return true;
}


$("#btn_Cancelar").click(function () {
    objTurnos = new Array();
    var index = 0;
    if (!Validar()) return false;
    $(".turnos").each(function (i, val) {
        if ($(val).hasClass("Turnos_Seleccionado")) {
            var obj = {};
            obj.Fecha = $("#tdfecha" + i).html() + " " + $("#tdhora" + i).html();
            obj.MedicoId = $("#tdMedicoId" + i).html();
            objTurnos[index] = obj;
            index++; //indice de array turnos
        }
    });
    CancelarTurnos();
});

function CancelarTurnos() {
    var json = JSON.stringify({ "objTurnos": objTurnos, "EspecialidadId": $('#cbo_Especialidad option:selected').val(), "Motivo": $("#cboMotivo :selected").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/CancelarTurnos.asmx/CancelarTurno_Varios",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Eliminado,
        error: errores
    });
}


$('#btn_porEntidad').click(function () {
    $('#OpcionesModal').modal('hide')
    Eliminar(1);    
});

$('#btn_porMedico').click(function () {
    $('#OpcionesModal').modal('hide')
    Eliminar(2);
});

$('#btn_porPaciente').click(function () {
    $('#OpcionesModal').modal('hide')
    Eliminar(3);
});

$('#btn_QuitarTurnoPermanente').click(function () {
    $('#QuitarTurnosModal').modal('hide')
    EliminarPermanente();
});



function Eliminar(Motivo) {
    var json = JSON.stringify({ "medicoId": $('#cbo_Medico option:selected').val(), "especialidadId": $('#cbo_Especialidad option:selected').val(), "fecha": $("#tdfecha" + posEliminar).html() + " " + $("#tdhora" + posEliminar).html(), "Motivo": Motivo });
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/CancelarTurnos.asmx/CancelarTurno",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Eliminado,
        error: errores
    });
}

function EliminarPermanente() {
    var json = JSON.stringify({ "FechayHora": $("#tdfecha" + posEliminarP).html() + " " + $("#tdhora" + posEliminarP).html(), "Medico": $('#cbo_Medico option:selected').val(), "Especialidad": $('#cbo_Especialidad option:selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/QuitarTurnos.asmx/QuitarTurno",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: EliminadoP,
        error: errores
    });
}

function Eliminado(Resultado) {
    $('#btn_Buscar').click();
    $("#btn_Imprimir").click();
    objTurnos = new Array();
}

function EliminadoP(Resultado) {
    posEliminarP = 0;
    $('#btn_Buscar').click();
}


$("#btn_Imprimir").click(function () {
    var desde = $('#txtFechaInicio').val() + " " + $('#txtHoraInicio').val();
    var hasta = $('#txtFechaFin').val() + " " + $('#txtHoraFin').val();
    Ruta = '../Impresiones/Turnos_Cancelados.aspx?especialidadId=' + $('#cbo_Especialidad option:selected').val() + '&medicoId=' + $('#cbo_Medico option:selected').val() + '&desde=' + $('#txtFechaInicio').val() + '&hasta=' + $('#txtFechaFin').val();
    Imprimir(Ruta);
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

$(document).ready(function () {

    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
    $("#txtHoraInicio").mask("99:99", { placeholder: "-" });
    $("#txtHoraFin").mask("99:99", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val(d);
    $("#txtFechaFin").val(fecha_ultimo_dia_mes(mm, yyyy));
});


$("#txtHoraInicio").change(function () {
    VerificarHora("txtHoraInicio");
});

$("#txtHoraFin").change(function () {
    VerificarHora("txtHoraFin");
});

$("#cbo_Especialidad").change(function () {
    $("#Controlcbo_Especialidad").removeClass("error");
});

$("#cbo_Medico").change(function () {
    $("#Controlcbo_Medico").removeClass("error");
});



function VerificarHora(ObjHora) {

    ErrorHora = false;
    var hora = $('#' + ObjHora).val();
    if ($('#' + ObjHora).val().length == 5) {

        var h1 = hora.charAt(0);
        var h2 = hora.charAt(1);
        var dp = hora.charAt(2);
        var m1 = hora.charAt(3);

        if ((h1 == 2 && h2 > 3) || (h1 > 2)) { ErrorHora = true; }
        if (m1 > 5) { ErrorHora = true; }
        if (dp != ":") { ErrorHora = true; }
        if (ErrorHora) {
            $('#' + ObjHora).val("");
        }
    }
}

function fecha1esmayora2() {
    var fechaInicio = document.getElementById("txtFechaInicio");
    var fechaFin = document.getElementById("txtFechaFin");
    var anio = parseInt(fechaInicio.value.substring(6, 10));
    var mes = fechaInicio.value.substring(3, 5);
    var dia = fechaInicio.value.substring(0, 2);
    var c_anio = parseInt(fechaFin.value.substring(6, 10));
    var c_mes = fechaFin.value.substring(3, 5);
    var c_dia = fechaFin.value.substring(0, 2);

    if (c_anio * 10000 + c_mes * 1000 + c_dia >= anio * 10000 + mes * 1000 + dia)
        return (false);
    else {
        return (true);
    }
}

$("#btnVolver").click(function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
});
