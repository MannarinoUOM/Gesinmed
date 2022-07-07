var objBusquedaLista = "";

$("#btnExcel").click(function () {
    var PDF = 0;
    if ($("#cbo_Listado :selected").val() == "") { alert("Seleccione un listado."); return; }
    if ($("#cbo_Listado :selected").val() == "1" && $("#cbo_Orden :selected").val() == "") { alert("Seleccione un criterio de orden."); return; }
    if ($("#cbo_Listado :selected").val() == "1" && $("#cbo_Orden :selected").val() == "1") { Imprimir("../Impresiones/Reportes_Turno_HorariosMedicos.aspx?PDF=" + PDF); return; } //Horarios por Especialidad
    if ($("#cbo_Listado :selected").val() == "1" && $("#cbo_Orden :selected").val() == "2") { Imprimir("../Impresiones/Reportes_Turnos_HorariosMedico_Med.aspx?PDF=" + PDF); return; } //Horarios por Medico
    if ($("#cbo_Listado :selected").val() == "2") { ValidarDisponibilidad(PDF); return; } //Disponibilidad de Turnos
    if ($("#cbo_Listado :selected").val() == "3") { VerificarTodo(PDF); return; } //Ocupacion de Consultorios
});
$("#btnImprimir").click(function () {
    var PDF = 1;
    if ($("#cbo_Listado :selected").val() == "") { alert("Seleccione un listado."); return; }
    if ($("#cbo_Listado :selected").val() == "1" && $("#cbo_Orden :selected").val() == "") { alert("Seleccione un criterio de orden."); return; }
    if ($("#cbo_Listado :selected").val() == "1" && $("#cbo_Orden :selected").val() == "1") { Imprimir("../Impresiones/Reportes_Turno_HorariosMedicos.aspx?PDF=" + PDF); return; } //Horarios por Especialidad
    if ($("#cbo_Listado :selected").val() == "1" && $("#cbo_Orden :selected").val() == "2") { Imprimir("../Impresiones/Reportes_Turnos_HorariosMedico_Med.aspx?PDF=" + PDF); return; } //Horarios por Medico
    if ($("#cbo_Listado :selected").val() == "2") { ValidarDisponibilidad(PDF); return; } //Disponibilidad de TurnFFos
    if ($("#cbo_Listado :selected").val() == "3") { VerificarTodo(PDF); return; } //Ocupacion de Consultorios
});

$("#cbo_Listado").change(function () {
    if ($("#cbo_Listado :selected").val() == "") { OcultarDivs(); return; }
    if ($("#cbo_Listado :selected").val() == "1") { $("#controlcbo_Orden").show(); $("#controlTurnosDisp").hide(); $("#controlConsultoriosDiv").hide(); return; }
    if ($("#cbo_Listado :selected").val() == "2") { $("#controlcbo_Orden").hide(); $("#controlTurnosDisp").show(); $("#controlConsultoriosDiv").hide(); return; }
    if ($("#cbo_Listado :selected").val() == "3") { $("#controlConsultoriosDiv").show(); $("#controlcbo_Orden").hide(); $("#controlTurnosDisp").hide(); return; }
});

$(document).ready(function () {
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["id"] != "" && GET["id"] != null) {
        switch (GET["id"]) {
            case "1": $("#controlcbo_Orden").show();
                $("#controlTurnosDisp").hide();
                $("#controlConsultoriosDiv").hide();
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong> Reportes de Turnos </strong>";
                $("#titulo").html("(Turnos) Horarios Médicos");
                $("#cbo_Listado").val("1");
                break;
            case "2": $("#controlTurnosDisp").show();
                $("#controlcbo_Orden").hide();
                $("#controlConsultoriosDiv").hide();
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong> Reportes de Turnos </strong>";
                $("#titulo").html("(Turnos) Turnos Disponibles");
                $("#cbo_Listado").val("2");
                break;
            case "3": $("#controlConsultoriosDiv").show();
                $("#controlcbo_Orden").hide();
                $("#controlTurnosDisp").hide();
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong> Reportes de Turnos </strong>";
                $("#titulo").html("(Turnos) Ocupación de Consultorios");
                $("#cbo_Listado").val("3");
                break;
        }
    }
    Cargar_Especialidades(true, 0, true);
    CargarConsultorios();
    $(".date").datepicker();
    $(".date").mask("99/99/9999", { placeholder: "" });
    $("#txtFechaInicio").val(Hoy());
});

function OcultarDivs() {
    $("#controlcbo_Orden").hide();
    $("#controlTurnosDisp").hide();
    $("#controlConsultoriosDiv").hide();
}

function ValidarDisponibilidad(PDF) {
    if ($("#txtFechaFin").val().trim().length == 0 || $("#txtFechaInicio").val().trim().length == 0) {alert("Verifique la fecha ingresada."); return; }
    if ($("#chkDetallado").is(":checked")) Imprimir("../Impresiones/Reportes_Turno_Disponibilidad.aspx?Desde=" + $("#txtFechaInicio").val() + "&Hasta=" + $("#txtFechaFin").val() + "&EspId=" + $('#cbo_Especialidad :selected').val() + "&PDF" + PDF); //Detallado
    else Imprimir("../Impresiones/Reportes_Turno_Disponibilidad_NoDet.aspx?Desde=" + $("#txtFechaInicio").val() + "&Hasta=" + $("#txtFechaFin").val() + "&EspId=" + $('#cbo_Especialidad :selected').val() + "&PDF" + PDF); //No Detallado
}


function Hoy() {
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    return d;
}

function CargarConsultorios() {
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/Consultorios.asmx/Consultorio_Lista_E",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConsultorios_Cargados,
        error: errores
    });
}


function CargarConsultorios_Cargados(Resultado) {
    var Practicas = Resultado.d;
    $('#FiltroPracticas').empty();
    $.each(Practicas, function (index, p) {
        $('#FiltroPracticas').append('<label style="text-align:left;" class="checkbox"><input class="checks" onclick="F_uno(' + p.ConsultorioID + ')"  id="Pr' + p.ConsultorioID + '" type="checkbox" value="' + p.ConsultorioID + '" checked>' + p.Consultorio + '</label>');
    });
}

function Fdes(Id) {
    $("#FiltroPracticas input").each(function () {
        $(this).removeAttr('disabled');
        $(this).removeAttr('checked', 'checked');
        $("#cbo_Todos").removeAttr('checked');
    });
}

function F_uno(Id) {
    $("#cbo_DesTodos").removeAttr('checked');
    $("#cbo_Todos").removeAttr('checked');
}

function Ft(Id) {
    $("#FiltroPracticas input").each(function () {
        if ($("#cbo_Todos").is(":checked")) {
            $(this).attr('checked', 'checked');
            $("#cbo_DesTodos").removeAttr('checked');
        }
        else {
            $(this).removeAttr('checked', 'checked');
        }
    });
}

function VerificarTodo(PDF) {
    objBusquedaLista = "";
    $(".checks").each(function () {
        if ($(this).is(":checked"))
            objBusquedaLista = objBusquedaLista + $(this).val() + ",";
    });
    if (objBusquedaLista.length == 0) { alert("Seleccione Consultorio."); return; }
    if ($("#cbo_Dias :selected").val() == "-1") { Imprimir("../Impresiones/Reporte_Turnos_OcupacionConsultorioTodos.aspx?Ids=" + objBusquedaLista + "&PDF=" + PDF); return; } //Todos los Dias.
    else Imprimir("../Impresiones/Reporte_Turnos_OcupacionConsultorio.aspx?NDia=" + $("#cbo_Dias :selected").text() + "&Dia=" + $("#cbo_Dias :selected").val() + "&Ids=" + objBusquedaLista + "&PDF=" + PDF);   //Imprimir
}

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

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $('#cbo_Especialidad').append('<option value="0">Todas...</option>');
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
    });
}

function Imprimir(Pagina) {
    $.fancybox({
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'preload': true,
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'onComplete': function f() {
		        jQuery.fancybox.showActivity();
		        jQuery('#fancybox-frame').load(function () {
		            jQuery.fancybox.hideActivity();
		        });
		    }
		});
}