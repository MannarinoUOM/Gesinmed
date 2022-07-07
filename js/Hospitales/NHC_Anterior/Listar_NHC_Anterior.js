

$(document).ready(function () {

    $("#btnCancelar").hide();

    var GET = {};
    var NHC = "";
    var Documento = "";

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        Cargar_Paciente_NHC(NHC);
        $("#txt_NHC").val(NHC);
    }


});

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    $.each(Paciente, function (index, paciente) {

        $("#txt_dni").prop("readonly", true);
        $("#txt_NHC").prop("readonly", true);

        $("#txt_dni").attr('value', paciente.documento);
        $("#txtPaciente").attr('value', paciente.Paciente);

        $("#txt_NHC").attr('value', paciente.NHC);
        $("#btnCancelar").show();
        $("#btn_BuscarRendicion").show();
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

function Cargar_Paciente_Documento(Documento) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}


function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {
        $("#txt_dni").prop("readonly", true);
        $("#txt_NHC").prop("readonly", true);

        $("#txt_dni").attr('value', paciente.documento);
        $("#txtPaciente").attr('value', paciente.Paciente);

        $("#txt_NHC").attr('value', paciente.NHC);

        $("#btn_BuscarRendicion").show();
        $("#btnCancelar").show();
    });
}

function Validar() {
    if ($('#txt_NHC').val().trim().length == 0 && $('#txt_dni').val().trim().length == 0 && $("#txtPaciente").val().trim().length == 0) {alert("Ingrese dato a buscar.");return false;}
    if ($("#txtPaciente").val().trim().length < 2) { alert("Ingrese al menos dos caracteres."); return false; }
    return true;
}


$("#btn_BuscarRendicion").click(function () {
    if (!Validar()) return;
    var NHC = $('#txt_NHC').val().trim();
    var Docu = $('#txt_dni').val().trim();
    if ($('#txt_NHC').val().trim().length == 0) NHC = 0;
    if ($('#txt_dni').val().trim().length == 0) Docu = 0;

    Ruta = '../Impresiones/Listar_NHC_Anterior.aspx?NHC=' + NHC + '&Documento=' + Docu + "&Apellido=" + $("#txtPaciente").val().trim();
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

