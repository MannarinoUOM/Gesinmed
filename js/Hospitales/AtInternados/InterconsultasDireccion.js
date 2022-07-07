
var Medico = 0;
var Esp = 0;
var objConsultas = new Array();
var Total = -1;
var Editando = 0;
var EditandoPos = -1;
var InterID = -1;

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

$(document).ready(function () {
    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });
    List_Medicos();
    Especialidades_Lista();

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + '02' + '/' + '2016';
    $("#desde").val(p);
    $("#hasta").val(d);
    $(".date").mask("99/99/9999", { placeholder: "-" });
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


function Especialidades_Lista() {
    var json = JSON.stringify({ "Todas": false, "Id": 0, "SoloTurnos": false });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidades_Lista_Cargado,
        complete: function () {
            List_Interconsultas();
        },
        error: errores
    });
}

function Especialidades_Lista_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Especialidad").append("<option value='0'></option>");
    $.each(Lista, function (index, Especialidad) {
        $("#cbo_Especialidad").append($("<option></option>").val(Especialidad.Id).html(Especialidad.Especialidad));
    });
}


function List_Medicos() {
    var json = JSON.stringify({ "EspId": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Medicos_Por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medico").append($("<option></option>").val("0").html(""));
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnConfirmar").click(function () {
    if (InterID <= 0) { alert("Seleccione una interconsulta."); return false; }
    if ($("#txt_Observacion").val().trim().length == 0) { alert("Ingrese Observación."); return false; }

    var json = JSON.stringify({ "Id": InterID, "MedicoInter": $("#cbo_Medico :selected").val(),
        "Observacion": $("#txt_Observacion").val().trim().toUpperCase(), "MedicoExterno": $("#txtMedicoExt").val().trim().toUpperCase()
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/Interconsultas_Update",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Interconsulta_Guardada,
        error: errores
    });
});

function Interconsulta_Guardada() {
    alert("Interconsulta Guardada Correctamente");
    LimpiarCampos();
    List_Interconsultas();
}

function List_Interconsultas() {
    var NHC = $("#txtNHC").val().trim();
    if ($("#txtNHC").val().trim().length == 0) NHC = 0;
    var json = JSON.stringify({ "NHC": NHC, "Medico": 0, "EspId": $('#cbo_Especialidad :selected').val(), 
    "Desde": $("#desde").val(), "Hasta": $("#hasta").val(), "Todos": $("#chkTodos").is(":checked"),
    "Afiliado": $("#txtPaciente").val().trim()
});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/Interconsultas_by_Fecha",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Interconsultas_Load,
        error: errores
    });
}

function List_Interconsultas_Load(Resultado) {
    var Interconsultas = Resultado.d;
    $("#TInterconsultas").empty();
    var Encabezado = "";
    var Contenido = "";
    if (Interconsultas.length > 0) {
        var i = 0;
        $.each(Interconsultas, function (index, Detalle) {
            Contenido = Contenido + "<tr onclick='Editar(" + i + ")' class='" + Detalle.RowClass + "'><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Interconsulta'><i class='icon-edit'></i></a></td><td style='display:none;' id='IDInter" + i + "'>" + Detalle.IdInterconsulta + "</td><td> " + Detalle.MedicoSolDesc + " </td><td> " + Detalle.EspecialidadInterDesc + " </td><td>" + Detalle.MedicoInterDesc + "</td><td> " + Detalle.Fecha + " </td><td> " + Detalle.Motivo + " </td><td> " + Detalle.HC_UOM + " </td><td> " + Detalle.Afiliado + " </td><td> " + Detalle.Servicio + " </td><td> " + Detalle.Cama + " </td><td> " + Detalle.Observacion + " </td><td id='NHC" + i + "' style='display:none;'>" + Detalle.NHC + "</td><td id='Index" + Detalle.IdInterconsulta + "' style='display:none;'>" + i + "</td></tr>";
            objConsultas[i] = Detalle;
            Total = Total + 1;
            i = i + 1;
        });
    }
    $("#TInterconsultas").html(Contenido);
}

function Editar(Id) {
    InterID = $("#IDInter" + Id).html();
    Editando = 1;
    EditandoPos = Id;
    $("#txt_Observacion").removeAttr("disabled");
    $("#cbo_Medico").removeAttr("disabled");
    $("#txtMedicoExt").removeAttr("disabled");

    $("#txt_Observacion").val(objConsultas[Id].Observacion);
    $("#cbo_Medico").val(objConsultas[Id].MedicoInter);
    $("#txtMedicoExt").val(objConsultas[Id].MedicoExterno);
    $("#txt_Observacion").focus();
    $("#btnImprimir").show();
    $("#div_controles").show();
    $("#Tabla").css("height", "170px");
}


function LimpiarCampos() {
    Editando = 0;
    EditandoPos = -1;
    InterID = -1;
    $("#txt_Observacion").val('');
    $("#txt_Observacion").attr("disabled", "disabled");
    $("#cbo_Medico").val('');
    $("#cbo_Medico").attr("disabled", "disabled");
    $("#txtMedicoExt").val('');
    $("#txtMedicoExt").attr("disabled", "disabled");
    $("#btnImprimir").hide();
    $("#div_controles").hide();
    $("#Tabla").css("height", "345px");
}

$("#btnBuscar").click(function () {
    List_Interconsultas();
});

$("#btnCancelar").click(function () {
    LimpiarCampos();
});


$("#btnImprimir").click(function () {
    if (InterID > 0) {
        var Pagina = "../Impresiones/ImpresionInterconsulta.aspx?Id=" + InterID;
        $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
    }
});