var i = 0;
var objTurno = new Array();
var objTurnos = new Array();
var Ruta = "";



$(document).ready(function () {
    $("#txtFecha_desde").datepicker();
    $("#txtFecha_hasta").datepicker();
    ListTipoDoc();
    $("#btn_BuscarRendicion").hide();
    $("#btnCancelar").hide();

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFecha_desde").val(p);
    $("#txtFecha_hasta").val(d);


    var GET = {};
    var NHC = "";
    var Documento = "";

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

//    if (GET["NHC"] != "" && GET["NHC"] != null) {
//        NHC = GET["NHC"];
//        Cargar_Paciente_NHC(NHC);
//        $("#txt_NHC").val(NHC);
//    }

    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID($("#afiliadoId").val());
    }


});

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

            $("#txt_dni").attr('value', paciente.documento_real);
            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#afiliadoId").val(paciente.documento);
            $("#txt_NHC").attr('value', paciente.NHC_UOM);

            $("#btn_BuscarRendicion").show();
            $("#btnCancelar").show();
        });
}

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

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

$('#cbo_TipoDOC').change(function () {
    if ($("#txt_dni").val() != "") Cargar_Paciente_Documento($("#txt_dni").val());
});




function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#txt_NHC").change(function () {
    if ($("#txt_NHC").val().length > 0)
        Cargar_Paciente_NHC($("#txt_NHC").val());
});
    
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
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}


function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {

            $("#txt_dni").attr('value', paciente.documento_real);
            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#afiliadoId").val(paciente.documento);
            $("#txt_NHC").attr('value', paciente.NHC_UOM);

            $("#btn_BuscarRendicion").show();
            $("#btnCancelar").show();
        });
    }
    else if (Paciente.length > 1) {
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


$("#btn_BuscarRendicion").click(function () {

    if ($("#txtFecha_desde").val().length < 8) {
        alert("Falta fecha de Inicio");
        return false;
    }

    if ($("#txtFecha_hasta").val().length < 8) {
        alert("Falta fecha de Fin");
        return false;
    }

    if ($("#txt_NHC").val().trim() == 0) {
        alert("Falta ingresar el CUIL");
        return false;
    }

    Ruta = '../Impresiones/Impresion_TotalesBonosPorUsuarios.aspx?NHC=' + $('#afiliadoId').val() + '&Desde=' + $('#txtFecha_desde').val() + "&Hasta=" + $("#txtFecha_hasta").val();
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Ruta,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
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

function RecargarPagina(url) {
    document.location = "../Bonos/RendicionPracticasPorPacientes.aspx" + url;
}
