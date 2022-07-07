var i = 0;
var objTurno = new Array();
var objTurnos = new Array();

function Cargar_Especialidades(Todos, Id, SoloTurnos) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargadas,
        error: errores
    });
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

$("#btnVolver").click(function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
});

$('#txtFechaInicio, #txtFechaFin').change(function () {
    $("#ControlFechas").removeClass("error");
});

$('#cbo_Especialidad').change(function () {
    $("#Controlcbo_Especialidad").removeClass("error");
    Cargar_Medicos_por_Especialidad($(this).val(),'A');
});


$('#cbo_Medico').change(function () {
    $("#Controlcbo_Medico").removeClass("error");
});


function Cargar_Medicos_por_Especialidad(Especialidad,Tipo) {
    var json = JSON.stringify({ "Especialidad": Especialidad, "Tipo": Tipo, "TLC": 0 });
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

Cargar_Especialidades(true, 0, true);

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function Cargar_Turnos(Especialidad, Medico, FechaInicio, FechaFin) {

        $.ajax({
            type: "POST",
            url: "../Json/Turnos/ConfirmarAtencion.asmx/Buscar_Turnos",
            data: '{Especialidad: "' + Especialidad + '", Medico: "' + Medico + '", FechaInicio: "' + FechaInicio + '", FechaFin: "' + FechaFin + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $("#TablaTurnos").hide();
                $("#cargando").show();
            },
            complete: function () {
                $("#TablaTurnos").show();
                $("#cargando").hide();
            },
            success: Turnos_Cargados,
            error: errores
        });
    
}

function Marcar(i) {
    if ($("#TR" + i).hasClass('warning')) {
        $("#TR" + i).removeClass("warning");
        $("#TR" + i).addClass("swarning");
    }

    if ($("#TR" + i).hasClass('ColorResaltado')) {
        $("#TR" + i).removeClass("ColorResaltado");
        if ($("#TR" + i).hasClass('swarning')) {
            $("#TR" + i).removeClass("swarning");
            $("#TR" + i).addClass("warning");
        }
    }
    else {
        $("#TR" + i).addClass("ColorResaltado");
    }
}

function Turnos_Cargados(Resultado) {
    
    var Turnos = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    i = 0;
    var NHC = "";
    $("#TablaTurnos").empty();

    Tabla_Titulo = "<table id='TablaTurnos' class='table table-hover table-condensed' style='width: 100%; font-size:11px;'><thead><tr><th>&nbsp;</th><th>Fecha</th><th>Hora</th><th>HC</th><th>Paciente</th><th>Práctica</th><th>Teléfono</th></tr></thead><tbody>";
    $.each(Turnos, function (index, turnos) {
        NHC = "";
        i++;
        NHC = turnos.NHC;
        if (turnos.NHC == 0) { NHC = ""; }
        Tabla_Datos = Tabla_Datos + "<tr id='TR" + i + "' class='" + turnos.ClaseAtencion + "'";
        if (!turnos.EsConfirmado && turnos.MovitoCanceladoId == "0" && turnos.NHC != 0) {
            Tabla_Datos = Tabla_Datos + " onclick=Marcar('" + i + "');";
        }
        if (turnos.EsConfirmado) {
            Tabla_Datos = Tabla_Datos + "><td><input onclick='Desconfirmar(" + i + ")' title='Click para desconfirmar atencion' type='checkbox' id='chk" + i + "'></td";
            Tabla_Datos = Tabla_Datos + "><td id='tdfecha" + i + "'>" + turnos.Fecha + "</td><td id='tdhora" + i + "'>" + turnos.Hora + "</td><td>" + NHC + "</td><td>" + turnos.NombrePaciente + "</td><td>" + turnos.Practica + "</td><td>" + turnos.Telefono + "</td></tr>";
        }
        else Tabla_Datos = Tabla_Datos + "><td>&nbsp;</td><td id='tdfecha" + i + "'>" + turnos.Fecha + "</td><td id='tdhora" + i + "'>" + turnos.Hora + "</td><td>" + NHC + "</td><td>" + turnos.NombrePaciente + "</td><td>" + turnos.Practica + "</td><td>" + turnos.Telefono + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaTurnos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function Desconfirmar(index) {
    if ($("#chk" + index).is(":checked")) {
        var fecha = $("#tdfecha" + index).html() + " " + $("#tdhora" + index).html();
        var esp = $("#cbo_Especialidad :selected").val();
        var med = $("#cbo_Medico :selected").val();
        DesconfirmaTurno(fecha, esp, med);
    }
}

function DesconfirmaTurno(fecha, esp, med) {
    var json = JSON.stringify({ "Fecha": fecha, "Medico": med, "Especialidad": esp });
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/ConfirmarAtencion.asmx/DesconfirmarAtencion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            $('#btn_Buscar').click();
        },
        error: errores
    });
}


$('#btn_Buscar').click(function () {
    if ($('#cbo_Medico option:selected').val() == 0) { $("#Controlcbo_Medico").addClass("error"); return false; }
    if ($('#cbo_Especialidad option:selected').val() == 0) { $("#Controlcbo_Especialidad").addClass("error"); return false; }
    if (fecha1esmayora2()) { alert("La Fecha de inicio tiene que ser menor a la fecha final"); $("#ControlFechas").addClass("error"); return false; }
    $('html, body').animate({ scrollTop: $("#divResultado").offset().top - 130 }, 500);
    Cargar_Turnos($('#cbo_Especialidad option:selected').val(), $('#cbo_Medico option:selected').val(), $('#txtFechaInicio').val(), $('#txtFechaFin').val());
});


$('#btnGuardar').click(function () {
    var t = -1;
    for (var j = 0; j <= i; j++) {
        if ($("#TR" + j).hasClass('ColorResaltado')) {
            t++;
            var objTurno = {};
            objTurno.Fecha = $("#tdfecha" + j).html();
            objTurno.Hora = $("#tdhora" + j).html();
            objTurnos[t] = objTurno;
        }
    }


    var json = JSON.stringify({ "Turnos": objTurnos, "Medico": $('#cbo_Medico option:selected').val(), "Especialidad": $('#cbo_Especialidad option:selected').val() });

    $.ajax({
        type: "POST",
        url: "../Json/Turnos/ConfirmarAtencion.asmx/Guardar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Confirmacion_Guardada,
        error: errores
    });


});

function Confirmacion_Guardada() {
    alert("Confirmado.");
    $('#btn_Buscar').click();
}

$("#btnImprimir").click(function () {
    Ruta = '../Impresiones/ConfirmacionTurnos.aspx?especialidadId=' + $('#cbo_Especialidad option:selected').val() + '&medicoId=' + $('#cbo_Medico option:selected').val() + '&desde=' + $('#txtFechaInicio').val() + '&hasta=' + $('#txtFechaFin').val() + '&horadesde=00:00&horahasta=23:59&Libres=true&Tipo=1';
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

 $(document).ready(function () {
     $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
     $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
     $("#txtFechaInicio").datepicker();
     $("#txtFechaFin").datepicker();
     var currentDt = new Date();
     var mm = currentDt.getMonth() + 1;
     mm = (mm < 10) ? '0' + mm : mm;
     var yyyy = currentDt.getFullYear();
     var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
     var d = dia + '/' + mm + '/' + yyyy;
     $("#txtFechaInicio").val(d);
     $("#txtFechaFin").val(fecha_ultimo_dia_mes(mm, yyyy));
 });

